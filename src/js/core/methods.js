import {
  setStyle,
  setObject,
  getNewObject,
  getTransformX,
  getTransformY,
  minmax
} from './../shared/utils'

export default {
  /**
   * get container (element) data
   * @returns {Object}
   */
  getContainerData() {
    return getNewObject(this.data.containerData)
  },

  /**
   * get image data
   * @returns {Object}
   */
  getImageData() {
    return getNewObject(this.data.imageData)
  },

  /**
   * zoom
   * @param {Number} 
   */
  zoom(zoomRatio, pointer) {
    const { image, data, options, ratio } = this

    if (options.bounds && ratio === 1 && zoomRatio < 0) return;
    if (options.maxRatio && ratio === options.maxRatio && zoomRatio > 0) return;

    const { originImageData } = data
    const containerData = this.getContainerData()
    const imageData = this.getImageData()
    const imageRect = image.getBoundingClientRect()

    const calcRatio = ratio * (zoomRatio + 1)
    const newRatio = options.bounds && calcRatio < 1 ? 1 : options.maxRatio && calcRatio > options.maxRatio ? options.maxRatio : calcRatio
    const newZoomRatio = newRatio / ratio - 1

    const newWidth = originImageData.width * newRatio
    const newHeight = originImageData.height * newRatio
    const newLeft = (containerData.width - newWidth) / 2
    const newTop = (containerData.height - newHeight) / 2
    const distanceX = pointer ? ( imageData.width / 2 - pointer.clientX + imageRect.left ) * newZoomRatio + getTransformX(image) : 0
    const distanceY = pointer ? ( imageData.height / 2 - pointer.clientY + imageRect.top ) * newZoomRatio + getTransformY(image) : 0
    const transformX = options.bounds ? minmax(distanceX, newLeft, -newLeft) : distanceX
    const transformY = options.bounds ? minmax(distanceY, newTop, -newTop) : distanceY
    
    const newData = {
      width: newWidth,
      height: newHeight,
      left: newLeft,
      top: newTop
    }
    
    setObject(data.imageData, newData)
    
    setStyle(image, Object.assign({}, newData, {
      transform: `translate(${transformX}px, ${transformY}px)`
    }))

    this.ratio = newRatio
  }
}