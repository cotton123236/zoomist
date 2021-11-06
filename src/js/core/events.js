import {
  setStyle,
  setObject,
  getPointer,
  getTransformX,
  getTransformY,
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
  const { element, image, options, data } = zoomist
  const { containerData, imageData, originImageData, maxImageData } = data
  
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

    if (maxImageData) {
      const maxImageWidth = maxImageData.width * widthRatio
      const maxImageHeight = maxImageData.height * heightRatio
      const maxImageLeft = maxImageData.left * widthRatio
      const maxImageTop = maxImageData.top * heightRatio

      setObject(maxImageData, {
        width: maxImageWidth,
        height: maxImageHeight,
        left: maxImageLeft,
        top: maxImageTop
      })
    }
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

  const dragstart = (e) => {
    if (!options.draggable) return;

    setObject(dragData, {
      startX: getPointer(e).x,
      startY: getPointer(e).y,
      transX: getTransformX(image),
      transY: getTransformY(image)
    })

    zoomist.dragging = true
    document.addEventListener(EVENT_TOUCH_MOVE, dragging)
    document.addEventListener(EVENT_TOUCH_END, dragend)
  }
  const dragging = (e) => {
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
  const dragend = () => {
    zoomist.dragging = false

    document.removeEventListener(EVENT_TOUCH_MOVE, dragging)
    document.removeEventListener(EVENT_TOUCH_END, dragend)
  }

  element.addEventListener(EVENT_TOUCH_START, dragstart)


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