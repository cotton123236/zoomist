import {
  setStyle,
  getPointer,
  getTransformX,
  getTransformY
} from './../shared/utils'
import {
  EVENT_TOUCH_START,
  EVENT_TOUCH_MOVE,
  EVENT_TOUCH_END
} from './../shared/constants'


export default (zoomist) => {
  const { element, image, options, data } = zoomist
  const { containerData, imageData } = data
  
  // set image size on window resize
  window.addEventListener('resize', function() {
    const containerWidthRatio = element.offsetWidth / containerData.width
    const containerHeightRatio = element.offsetHeight / containerData.height
    const imageWidth = imageData.width * containerWidthRatio
    const imageHeight = imageData.height * containerHeightRatio
    const imageLeft = imageData.left * containerWidthRatio
    const imageTop = imageData.top * containerHeightRatio

    containerData.width = element.offsetWidth
    containerData.height = element.offsetHeight

    imageData.width = imageWidth
    imageData.height = imageHeight
    imageData.left = imageLeft
    imageData.top = imageTop

    setStyle(zoomist.image, {
      width: imageWidth,
      height: imageHeight,
      left: imageLeft,
      top: imageTop,
    })
  })

  // set image move event
  zoomist.isDrag = false
  zoomist.data.dragData = {
    startX: 0,
    startY: 0,
    transX: 0,
    transY: 0
  }

  if (options.fill === 'contain' && options.bounds) options.bounds = false

  const { dragData } = data
  const dragging = (e) => {
    if (!zoomist.isDrag) return;

    const pageX = getPointer(e).x
    const pageY = getPointer(e).y
    const distanceX = pageX - dragData.startX + dragData.transX
    const distanceY = pageY - dragData.startY + dragData.transY
    const transformX = options.bounds ? Math.min(Math.max(distanceX, imageData.left), -imageData.left) : distanceX
    const transformY = options.bounds ? Math.min(Math.max(distanceY, imageData.top), -imageData.top) : distanceY
    
    image.style.transform = `translate(${transformX}px, ${transformY}px)`
  }
  const dragend = () => {
    zoomist.isDrag = false
    document.removeEventListener(EVENT_TOUCH_MOVE, dragging)
    document.removeEventListener(EVENT_TOUCH_END, dragend)
  }

  element.addEventListener(EVENT_TOUCH_START, function(e) {
    if (!options.draggable) return;

    dragData.startX = getPointer(e).x
    dragData.startY = getPointer(e).y
    dragData.transX = getTransformX(zoomist.image)
    dragData.transY = getTransformY(zoomist.image)
    
    zoomist.isDrag = true
    document.addEventListener(EVENT_TOUCH_MOVE, dragging)
    document.addEventListener(EVENT_TOUCH_END, dragend)
  })

}