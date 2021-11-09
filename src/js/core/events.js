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
  CLASS_ZOOMER_DISABLE
} from './../shared/constants'


export default (zoomist) => {
  const { element, wrapper, image, options, data } = zoomist
  const { containerData, imageData, originImageData } = data
  
  // set image size on window resize
  const resize = () => {
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
    if (e.which !== 1) return;
    
    setObject(dragData, {
      startX: getPointer(e).x,
      startY: getPointer(e).y,
      transX: getTransformX(image),
      transY: getTransformY(image)
    })

    zoomist.dragging = true
    document.addEventListener(EVENT_TOUCH_MOVE, dragMove)
    document.addEventListener(EVENT_TOUCH_END, dragEnd)
  }
  const dragMove = (e) => {
    if (!zoomist.dragging) return;

    const pageX = getPointer(e).x
    const pageY = getPointer(e).y
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
    const transformX = pageX - dragData.startX + dragData.transX
    const transformY = pageY - dragData.startY + dragData.transY

    image.style.transform = `translate(${transformX}px, ${transformY}px)`
  }
  const dragEnd = () => {
    zoomist.dragging = false

    document.removeEventListener(EVENT_TOUCH_MOVE, dragMove)
    document.removeEventListener(EVENT_TOUCH_END, dragEnd)
  }

  wrapper.addEventListener(EVENT_TOUCH_START, dragStart)


  // set zomm on mousewheel event
  zoomist.wheeling = false

  const wheel = (e) => {
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
  }

  element.addEventListener(EVENT_WHEEL, wheel)
}


// slider events
export const sliderEvents = (zoomist) => {
  const { slider } = zoomist.options

  // events
  slider.sliding = false
  const isHorizontal = slider.direction === 'horizontal'

  const slideHandler = (e) => {
    const rect = slider.sliderMain.getBoundingClientRect()

    const mousePoint = isHorizontal ? getPointer(e).clientX : getPointer(e).clientY
    const sliderTotal = isHorizontal ? rect.width : rect.height
    const sliderStart = isHorizontal ? rect.left : rect.top
    const percentage = minmax(roundToTwo(( mousePoint - sliderStart ) / sliderTotal), 0, 1)
    const ratio = ( slider.maxRatio - 1 ) * percentage + 1

    zoomist.zoomTo(ratio)
  }
  const slideStart = (e) => {
    slideHandler(e)

    slider.sliding = true
    document.addEventListener(EVENT_TOUCH_MOVE, slideMove)
    document.addEventListener(EVENT_TOUCH_END, slideEnd)
  }
  const slideMove = (e) => {
    if (!slider.sliding) return;

    slideHandler(e)
  }
  const slideEnd = (e) => {
    slider.sliding = false

    document.removeEventListener(EVENT_TOUCH_MOVE, slideMove)
    document.removeEventListener(EVENT_TOUCH_END, slideEnd)
  }
  slider.sliderMain.addEventListener(EVENT_TOUCH_START, slideStart)
}


// zoomer events
export const zoomerEvents = (zoomist) => {
  const { options } = zoomist
  const { zoomer, zoomRatio, bounds, maxRatio } = options

  zoomer.zoomerInEl.addEventListener('click', () => {
    zoomist.zoom(zoomRatio)
    console.log(zoomist.ratio, maxRatio)
    // if (zoomist.ratio === maxRatio) zoomer.zoomerInEl.classList.add(CLASS_ZOOMER_DISABLE)
  })
  zoomer.zoomerOutEl.addEventListener('click', () => {
    zoomist.zoom(-zoomRatio)
    // if (bounds && zoomist.ratio === 1) zoomer.zoomerOutEl.classList.add(CLASS_ZOOMER_DISABLE)
  })
}