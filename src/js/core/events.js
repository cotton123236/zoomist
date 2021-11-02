import {
  setStyle
} from './../shared/utils'

export default (zoomist) => {
  const { element, data } = zoomist
  const { container, image } = data
  
  window.addEventListener('resize', function() {
    const containerWidthRatio = element.offsetWidth / container.width
    const containerHeightRatio = element.offsetHeight / container.height
    const imageWidth = image.width * containerWidthRatio
    const imageHeight = image.height * containerHeightRatio
    const imageLeft = image.left * containerWidthRatio
    const imageTop = image.top * containerHeightRatio

    container.width = element.offsetWidth
    container.height = element.offsetHeight

    image.width = imageWidth
    image.height = imageHeight
    image.left = imageLeft
    image.top = imageTop

    setStyle(zoomist.image, {
      width: imageWidth,
      height: imageHeight,
      left: imageLeft,
      top: imageTop,
    })
  })
}