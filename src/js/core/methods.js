import {
  getNewObject,
  getPointer,
  setStyle
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
    const { image, data } = this
    const imageData = this.getImageData()
    const imageRect = image.getBoundingClientRect()

    const newWidth = imageData.width * (ratio + 1)
    const newHeight = imageData.height * (ratio + 1)
    const distX = pointer ? (pointer.clientX - imageRect.left) / imageData.width : 0.5
    const distY = pointer ? (pointer.clientY - imageRect.top) / imageData.height : 0.5
    const newLeft = (imageData.width - newWidth) * distX + imageData.left
    const newTop = (imageData.height - newHeight) * distY + imageData.top

    data.imageData.width = newWidth
    data.imageData.height = newHeight
    data.imageData.left = newLeft
    data.imageData.top = newTop

    setStyle(image, {
      width: newWidth,
      height: newHeight,
      left: newLeft,
      top: newTop,
    })
    // console.log(this.getImageData())
  }
}