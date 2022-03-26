import {
  setStyle,
  setObject,
  getPointer,
  getTransformX,
  getTransformY,
  roundToTwo,
  minmax
} from './../shared/utils'
import {
  EVENT_TOUCH_START,
  EVENT_TOUCH_MOVE,
  EVENT_TOUCH_END,
  EVENT_RESIZE,
  EVENT_WHEEL,
} from './../shared/constants'


export default (zoomist) => {
  const { element, wrapper, image, options, data } = zoomist
  const { containerData, imageData, originImageData } = data
  
  // set image size on window resize
  const resize = () => {
    if (containerData.width === element.offsetWidth) return;

    const widthRatio = element.offsetWidth / containerData.width
    const heightRatio = element.offsetHeight / containerData.height

    const originImageWidth = originImageData.width * widthRatio
    const originImageHeight = originImageData.height * heightRatio
    const originImageLeft = originImageData.left * widthRatio
    const originImageTop = originImageData.top * heightRatio

    const imageWidth = imageData.width * widthRatio
    const imageHeight = imageData.height * heightRatio
    const imageLeft = imageData.left * widthRatio
    const imageTop = imageData.top * heightRatio
    const transformX = getTransformX(image) * widthRatio
    const transformY = getTransformY(image) * heightRatio

    setObject(containerData, {
      width: element.offsetWidth,
      height: element.offsetHeight
    })

    setObject(originImageData, {
      width: originImageWidth,
      height: originImageHeight,
      left: originImageLeft,
      top: originImageTop
    })

    setObject(imageData, {
      width: imageWidth,
      height: imageHeight,
      left: imageLeft,
      top: imageTop
    })

    setStyle(zoomist.image, {
      width: imageWidth,
      height: imageHeight,
      left: imageLeft,
      top: imageTop,
      transform: `translate(${transformX}px, ${transformY}px)`
    })

    zoomist.emit('resize')
  }

  window.addEventListener(EVENT_RESIZE, resize)


  // set image drag event
  zoomist.dragging = false
  zoomist.data.dragData = {
    startX: 0,
    startY: 0,
    transX: 0,
    transY: 0
  }

  if (options.fill === 'contain' && options.bounds) options.bounds = false

  const { dragData } = data

  const dragStart = (e) => {
    if (!options.draggable) return;
    if (e.which === 2 || e.which === 3) return;

    const isPinch = e.touches && e.touches.length === 2

    setObject(dragData, {
      startX: isPinch ? (e.touches[0].pageX + e.touches[1].pageX) / 2 : getPointer(e).x,
      startY: isPinch ? (e.touches[0].pageY + e.touches[1].pageY) / 2 : getPointer(e).y,
      transX: getTransformX(image),
      transY: getTransformY(image)
    })

    zoomist.dragging = true

    zoomist.emit('dragStart', {x: dragData.transX, y: dragData.transY}, e)

    document.addEventListener(EVENT_TOUCH_MOVE, dragMove)
    document.addEventListener(EVENT_TOUCH_END, dragEnd)
  }
  const dragMove = (e) => {
    if (!zoomist.dragging) return;

    const isPinch = e.touches && e.touches.length === 2

    const pageX = isPinch ? (e.touches[0].pageX + e.touches[1].pageX) / 2 : getPointer(e).x
    const pageY = isPinch ? (e.touches[0].pageY + e.touches[1].pageY) / 2 : getPointer(e).y
    if(options.bounds) {
      const minPageX = dragData.startX - ( dragData.transX - imageData.left )
      const maxPageX = dragData.startX - ( dragData.transX + imageData.left )
      const minPageY = dragData.startY - ( dragData.transY - imageData.top )
      const maxPageY = dragData.startY - ( dragData.transY + imageData.top )
      if (pageX < minPageX) dragData.startX += pageX - minPageX
      if (pageX > maxPageX) dragData.startX += pageX - maxPageX
      if (pageY < minPageY) dragData.startY += pageY - minPageY
      if (pageY > maxPageY) dragData.startY += pageY - maxPageY
    }
    const transformX = roundToTwo(pageX - dragData.startX + dragData.transX)
    const transformY = roundToTwo(pageY - dragData.startY + dragData.transY)

    image.style.transform = `translate(${transformX}px, ${transformY}px)`

    zoomist.emit('drag', {x: transformX, y: transformY}, e)
  }
  const dragEnd = (e) => {
    zoomist.dragging = false

    setObject(dragData, {
      transX: getTransformX(image),
      transY: getTransformY(image)
    })

    zoomist.emit('dragEnd', {x: dragData.transX, y: dragData.transY}, e)

    document.removeEventListener(EVENT_TOUCH_MOVE, dragMove)
    document.removeEventListener(EVENT_TOUCH_END, dragEnd)
  }

  // set image pinch event
  zoomist.pinching = false
  zoomist.data.pinchData = {
    dist: 0,
    startX: 0,
    startY: 0
  }

  const pinchStart = (e) => {
    if (!options.pinchable) return;
    if (!e.touches || e.touches.length !== 2) return;

    const { pinchData } = zoomist.data

    setObject(pinchData, {
      dist: Math.hypot(e.touches[0].pageX - e.touches[1].pageX, e.touches[0].pageY - e.touches[1].pageY),
      startX: e.touches[0].clientX,
      startY: e.touches[0].clientY
    })

    // zoomist.dragging = false
    zoomist.pinching = true

    zoomist.emit('pinchStart', e)

    document.addEventListener(EVENT_TOUCH_MOVE, pinchMove)
    document.addEventListener(EVENT_TOUCH_END, pinchEnd)
  }
  const pinchMove = (e) => {
    if (!zoomist.pinching) return;

    const { pinchData } = zoomist.data

    const pinchDist = Math.hypot(e.touches[0].pageX - e.touches[1].pageX, e.touches[0].pageY - e.touches[1].pageY)
    const zoomRatio = roundToTwo((pinchDist - pinchData.dist) / 100)
    const pointer = {
      clientX: (e.touches[0].clientX + e.touches[1].clientX) / 2,
      clientY: (e.touches[0].clientY + e.touches[1].clientY) / 2
    }

    zoomist.zoom(zoomRatio, pointer)

    pinchData.dist = pinchDist

    zoomist.emit('pinch', e)
  }
  const pinchEnd = (e) => {
    zoomist.pinching = false

    zoomist.emit('pinchEnd', e)

    document.removeEventListener(EVENT_TOUCH_MOVE, pinchMove)
    document.removeEventListener(EVENT_TOUCH_END, pinchEnd)
  }

  // touch start handler
  const touchStart = (e) => {
    dragStart(e)
    pinchStart(e)
  }

  wrapper.addEventListener(EVENT_TOUCH_START, touchStart)


  // set zomm on mousewheel event
  zoomist.wheeling = false

  const wheel = (e) => {
    if (!options.wheelable) return;
    e.preventDefault()

    const { zoomRatio } = options

    if (zoomist.wheeling) return;

    // prevent wheeling too fast
    zoomist.wheeling = true
    setTimeout(() => { zoomist.wheeling = false }, 30)

    let delta
    if (e.deltaY) delta = e.deltaY > 0 ? -1 : 1
    else if (e.wheelDelta) delta = e.wheelDelta / 120
    else if (e.detail) delta = e.detail > 0 ? -1 : 1

    zoomist.zoom(delta * zoomRatio, getPointer(e))

    zoomist.emit('wheel', e)
  }

  wrapper.addEventListener(EVENT_WHEEL, wheel)
}


// slider events
export const sliderEvents = (zoomist) => {
  const { slider } = zoomist.__modules__

  // events
  slider.sliding = false
  const isHorizontal = slider.direction === 'horizontal'

  const slideHandler = (e) => {
    const rect = slider.sliderMain.getBoundingClientRect()

    const mousePoint = isHorizontal ? getPointer(e).clientX : -getPointer(e).clientY
    const sliderTotal = isHorizontal ? rect.width : rect.height
    const sliderStart = isHorizontal ? rect.left : -rect.bottom
    const percentage = minmax(roundToTwo(( mousePoint - sliderStart ) / sliderTotal), 0, 1)

    const minRatio = zoomist.ratio < 1 ? zoomist.ratio : 1
    const maxRatio = zoomist.ratio > slider.maxRatio ? zoomist.ratio : slider.maxRatio
    const ratio = ( maxRatio - minRatio ) * percentage + minRatio

    zoomist.zoomTo(ratio)
  }
  const slideStart = (e) => {
    slideHandler(e)

    slider.sliding = true

    zoomist.emit('slideStart', zoomist.getSliderValue(), e)

    document.addEventListener(EVENT_TOUCH_MOVE, slideMove)
    document.addEventListener(EVENT_TOUCH_END, slideEnd)
  }
  const slideMove = (e) => {
    if (!slider.sliding) return;

    slideHandler(e)

    zoomist.emit('slide', zoomist.getSliderValue(), e)
  }
  const slideEnd = (e) => {
    slider.sliding = false

    zoomist.emit('slideEnd', zoomist.getSliderValue(), e)

    document.removeEventListener(EVENT_TOUCH_MOVE, slideMove)
    document.removeEventListener(EVENT_TOUCH_END, slideEnd)
  }

  slider.sliderMain.addEventListener(EVENT_TOUCH_START, slideStart)
  slider.sliderMain.event = slideStart
}


// zoomer events
export const zoomerEvents = (zoomist) => {
  const { zoomRatio } = zoomist.options
  const { zoomer } = zoomist.__modules__

  const zoomInHandler = () => zoomist.zoom(zoomRatio)
  const zoomOutHandler = () => zoomist.zoom(-zoomRatio)

  zoomer.zoomerInEl.addEventListener('click', zoomInHandler)
  zoomer.zoomerOutEl.addEventListener('click', zoomOutHandler)
  zoomer.zoomerInEl.event = zoomInHandler
  zoomer.zoomerOutEl.event = zoomOutHandler
}