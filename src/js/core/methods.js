import {
  setStyle,
  setObject,
  getNewObject,
  getTransformX,
  getTransformY,
  roundToTwo,
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
   * zoomRatio - zoomin when pass a positive number, zoomout when pass a negative number
   * pointer - a object which return from getPoiner()
   * @param {Number, Object} 
   */
  zoom(zoomRatio, pointer) {
    const { image, data, options, ratio } = this

    if (options.bounds && ratio === 1 && zoomRatio < 0) return;
    if (options.maxRatio && ratio === options.maxRatio && zoomRatio > 0) return;

    const { originImageData } = data
    const containerData = this.getContainerData()
    const imageData = this.getImageData()
    const imageRect = image.getBoundingClientRect()

    const calcRatio = roundToTwo(ratio * (zoomRatio + 1))
    const newRatio = options.bounds && calcRatio < 1 ? 1 : options.maxRatio && calcRatio > options.maxRatio ? options.maxRatio : calcRatio
    const newZoomRatio = newRatio / ratio - 1

    const newWidth = originImageData.width * newRatio
    const newHeight = originImageData.height * newRatio
    const newLeft = (containerData.width - newWidth) / 2
    const newTop = (containerData.height - newHeight) / 2
    const distanceX = pointer ? ( imageData.width / 2 - pointer.clientX + imageRect.left ) * newZoomRatio + getTransformX(image) : getTransformX(image)
    const distanceY = pointer ? ( imageData.height / 2 - pointer.clientY + imageRect.top ) * newZoomRatio + getTransformY(image) : getTransformY(image)
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

    if (options.slider) {
      const { slider } = options
      const ratioPercentage = roundToTwo(1 - ( slider.maxRatio - newRatio ) / ( slider.maxRatio - 1 )) * 100
      
      this.slideTo(ratioPercentage)
    }

    return this
  },

  /**
   * zoomTo (zoom to a specific ratio)
   * zoomRatio - zoomin when pass a number more than 1, zoomout when pass a number less than 1
   * @param {Number} 
   */
  zoomTo(zoomRatio) {
    const { ratio } = this

    if (zoomRatio !== ratio) {
      const calcRatio = zoomRatio / ratio - 1
      this.zoom(calcRatio)
    }

    return this
  },

  /**
   * slideTo (only work on the slider)
   * value - a numer between 0-100
   * @param {Number}
   */
  slideTo(value) {
    const { options } = this

    if (!options.slider) return;

    const { slider } = options

    const position = slider.direction === 'horizontal' ? 'left' : 'top'
    const distance = minmax(value, 0, 100)

    slider.sliderButton.style[position] = `${distance}%`

    return this
  }
}