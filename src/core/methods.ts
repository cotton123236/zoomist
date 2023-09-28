import { Zoomist } from './core'
import {
  EventTypes,
  MoveToKeywordsX,
  MoveToKeywordsY,
  ZoomistEvents,
  ZoomistHTMLElement,
  ZoomistMethods
} from './../types'
import {
  getBoundingRect,
  isFunction,
  roundToTwo,
  minmax,
  isNumber,
  setObject,
  isPlainObject
} from './../shared/utils'
import {
  MOVE_TO_KEYWORDS_X,
  MOVE_TO_KEYWORDS_Y,
  NAME
} from '../shared/constants';
import { DEFAULT_OPTIONS } from './options';


export const ZOOMIST_METHODS: ZoomistMethods & ThisType<Zoomist> = {
  on(event, handler) {
    if (!handler || !isFunction(handler)) return this;

    const { __events__ } = this

    event.split(' ').forEach(evt => {
      const eventName = evt as EventTypes
      if (!__events__[eventName]) __events__[eventName] = [];
      (__events__[eventName] as NonNullable<ZoomistEvents[typeof eventName]>).push(handler as any)
    })

    return this
  },

  emit(event, ...args) {
    const { __events__ } = this

    if (!__events__[event]) return this;

    (__events__[event] as NonNullable<ZoomistEvents[typeof event]>).forEach(handler => {
      if (isFunction(handler)) (handler as any).apply(this, args)
    })

    return this
  },

  zoom(ratio, pointer) {
    const { scale: oldScale } = this.transform
    const scale = this.useFixedRatio(roundToTwo(oldScale * (ratio + 1)))

    if (oldScale === scale) return this

    this.zoomTo(scale, pointer)

    return this
  },

  zoomTo(ratio, pointer = true) {
    const { image, transform: { scale, translateX: oldTranslateX, translateY: oldTranslateY }, options: { bounds } } = this
    ratio = this.useFixedRatio(ratio)
    if (ratio === scale) return this

    this.transform.scale = ratio

    this.emit('zoom', this, this.transform.scale)

    if (!pointer) return this

    pointer = typeof pointer === 'boolean' ? this.getContainerCenterClient() : pointer

    const { clientX, clientY } = pointer
    const { top: imageTop, left: imageLeft, width: imageWidth, height: imageHeight } = getBoundingRect(image)
    const { width: widthDiff, height: heightDiff } = this.getImageDiff()
    const scaleDiff = ratio / scale - 1
    const distanceX = (imageWidth / 2 - clientX + imageLeft) * scaleDiff + oldTranslateX
    const distanceY = (imageHeight / 2 - clientY + imageTop) * scaleDiff + oldTranslateY
    const translateX = bounds ? minmax(distanceX, widthDiff, -widthDiff) : distanceX
    const translateY = bounds ? minmax(distanceY, heightDiff, -heightDiff) : distanceY

    setObject(this.transform, {
      translateX,
      translateY
    })

    return this
  },

  move(params) {
    const { options: { bounds }, transform: { translateX: oldTranslateX, translateY: oldTanslateY } } = this
    const { x, y } = params
    const { width: widthDiff, height: heightDiff } = this.getImageDiff()

    if (isNumber(x)) {
      const distanceX = oldTranslateX + x
      const translateX = bounds ? minmax(distanceX, widthDiff, -widthDiff) : distanceX
      this.transform.translateX = translateX
    }

    if (isNumber(y)) {
      const distanceY = oldTanslateY + y
      const translateY = bounds ? minmax(distanceY, heightDiff, -heightDiff) : distanceY
      this.transform.translateY = translateY
    }

    return this
  },

  moveTo(params) {
    const { options: { bounds } } = this
    const { x, y } = params
    const { width: widthDiff, height: heightDiff } = this.getImageDiff()

    // x is number | string-number
    if (isNumber(x)) {
      const parseX = Number(x)
      const translateX = bounds ? minmax(parseX, widthDiff, -widthDiff) : parseX
      this.transform.translateX = translateX
    }

    // x is one of keywords
    if (MOVE_TO_KEYWORDS_X.some(item => item === x)) {
      const keywordsValue = {
        left: -widthDiff,
        right: widthDiff,
        center: 0
      }
      const translateX = keywordsValue[x as MoveToKeywordsX]
      this.transform.translateX = translateX
    }

    // y is number | string-number
    if (isNumber(y)) {
      const parseY = Number(y)
      const translateY = bounds ? minmax(parseY, heightDiff, -heightDiff) : parseY
      this.transform.translateY = translateY
    }

    // y is one of keywords
    if (MOVE_TO_KEYWORDS_Y.some(item => item === y)) {
      const keywordsValue = {
        top: -heightDiff,
        bottom: heightDiff,
        center: 0
      }
      const translateY = keywordsValue[y as MoveToKeywordsY]
      this.transform.translateY = translateY
    }

    return this
  },

  slideTo(value) {
    const { options: { minScale, maxScale } } = this
    const scale = (maxScale - minScale) * value / 100 + minScale

    this.zoomTo(scale)

    return this
  },

  reset() {
    const { options: { initScale } } = this

    setObject(this.transform, {
      scale: initScale!,
      translateX: 0,
      translateY: 0
    })

    this.emit('reset', this)
    
    return this
  },

  destroy(cleanStyle = false) {
    const { element, image, controller } = this

    if (!this.mounted) return null;

    this.emit('beforeDestroy', this)

    controller.abort()
    this.destroyModules()

    if (cleanStyle && image) {
      this.reset()
      image.removeAttribute('style')
    }

    (element as ZoomistHTMLElement)[NAME] = null

    this.mounted = false
    this.emit('destroy', this)

    return null
  },

  update(options) {
    const { element, controller } = this

    this.emit('beforeUpdate', this);

    (element as ZoomistHTMLElement)[NAME] = null

    this.mounted = false

    controller.abort()
    this.destroyModules()

    if (options) {
      this.options = Object.assign({}, DEFAULT_OPTIONS, isPlainObject(options) && options)
    }

    this.init()

    this.emit('update', this)

    return this
  },

  getImageData() {
    return { ...this.data.imageData }
  },

  getContainerData() {
    return { ...this.data.containerData }
  },

  getSliderValue() {
    const { __modules__: { slider } } = this

    return slider && slider.value ? slider.value : null
  },


  // private methods
  getImageDiff() {
    const { width: containerWidth, height: containerHeight } = this.getContainerData()
    const { width: imageWidth, height: imageHeight } = this.getImageData()

    return {
      width: (containerWidth - imageWidth) / 2,
      height: (containerHeight - imageHeight) / 2
    }
  },

  // private methods
  getContainerCenterClient() {
    const { element } = this
    const { top, left, width, height } = getBoundingRect(element)
    return {
      clientX: left + width / 2,
      clientY: top + height / 2
    }
  },

  // private methods
  getScaleRatio() {
    const { transform: { scale }, options: { minScale, maxScale } } = this

    return (scale - minScale) / (maxScale - minScale)
  },

  // private methods
  useFixedRatio(ratio) {
    const { options: { minScale, maxScale } } = this

    return minmax(ratio, minScale, maxScale)
  },
}