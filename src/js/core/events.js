import {
  setStyle
} from './../shared/utils'

export default (zoomist) => {
  const { parent, data } = zoomist
  const { container, wrapper } = data
  
  window.addEventListener('resize', function() {
    const containerWidth = parent.offsetWidth * container.widthPercentage
    const containerHeight = containerWidth / container.ratio

    container.width = containerWidth
    container.height = containerHeight

    setStyle(zoomist.container, {
      width: containerWidth,
      height: containerHeight
    })
  })
}