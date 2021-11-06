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
  zoom(ratio, pointer) {
    const { image, data, options } = this
    const { originImageData, maxImageData } = data
    const containerData = this.getContainerData()
    const imageData = this.getImageData()
    const imageRect = image.getBoundingClientRect()

    const calcWidth = imageData.width * (ratio + 1)
    const calcHeight = imageData.height * (ratio + 1)

    const isInBounds = options.bounds && calcWidth <= originImageData.width
    const isOverMax = options.maxRatio && calcWidth >= maxImageData.width

    const newWidth = isInBounds ? originImageData.width : isOverMax ? maxImageData.width : calcWidth
    const newHeight = isInBounds ? originImageData.height : isOverMax ? maxImageData.height : calcHeight
    const newLeft = isInBounds ? originImageData.left : isOverMax ? maxImageData.left : (containerData.width - calcWidth) / 2
    const newTop = isInBounds ? originImageData.top : isOverMax ? maxImageData.top : (containerData.height - calcHeight) / 2
    const distanceX = pointer ? ( imageData.width / 2 - pointer.clientX + imageRect.left ) * ratio + getTransformX(image) : 0
    const distanceY = pointer ? ( imageData.height / 2 - pointer.clientY + imageRect.top ) * ratio + getTransformY(image) : 0
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
  }
}