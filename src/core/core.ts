import {
  QueryElement,
  ZoomistOptions,
  ZoomistData,
  ZoomistEvents,
  ZoomistMethods,
  ZoomistStates,
  EventTypes,
  ZoomistModules,
  ZoomistHTMLElement,
  ZoomistTransfrom
} from '../types'
import {
  isElementExist,
  isPlainObject,
  getElement,
  getPointer,
  setObject,
  setStyle,
  roundToTwo,
  minmax,
  useError,
  useWarn,
  getBoundingRect,
  getPinchHypot,
  createElement,
  setAttributes,
  isNull,
  getTouchesCenter
} from '../shared/utils'
import {
  NAME,
  IS_TOUCH,
  CLASS_CONTAINER,
  CLASS_IMAGE,
  CLASS_WRAPPER,
  EVENT_TOUCH_START,
  EVENT_TOUCH_MOVE,
  EVENT_TOUCH_END,
  EVENT_WHEEL,
  CSSVAR_IMAGE_TRANSLATE_X,
  CSSVAR_IMAGE_TRANSLATE_Y,
  CSSVAR_IMAGE_SCALE,
  CSSVAR_SLIDER_VALUE,
  CLASS_SLIDER,
  CLASS_SLIDER_TRACK,
  CLASS_SLIDER_BAR,
  CLASS_SLIDER_BUTTON,
  CLASS_ZOOMER,
  CLASS_ZOOMER_IN,
  CLASS_ZOOMER_OUT,
  CLASS_ZOOMER_RESET,
  CLASS_ZOOMER_BUTTON,
  ATTR_SLIDER_BUTTON,
  ATTR_ZOOMER_IN,
  ATTR_ZOOMER_OUT,
  ATTR_ZOOMER_RESET
} from '../shared/constants'
import {
  DEFAULT_OPTIONS,
  ZOOMIST_EVENTS,
  ZOOMIST_MODULES,
  SLIDER_OPTIONS,
  ZOOMER_OPTIONS,
  SLIDER_AUTO_GENERATED,
  ZOOMER_AUTO_GENERATED
} from './options'
import {
  zoomerIconIn,
  zoomerIconOut,
  zoomerIconReset
} from './template'
import { ZOOMIST_METHODS } from './methods'


const { defineProperty } = Object


// define Zoomist prototype
interface Zoomist extends ZoomistMethods {}


// class Zoomist
class Zoomist {
  element: HTMLElement;
  options: ZoomistOptions;
  wrapper!: HTMLElement;
  image!: HTMLElement;
  mounted!: boolean;
  data!: ZoomistData;
  transform!: ZoomistTransfrom;
  states!: ZoomistStates;
  controller!: AbortController;
  __events__!: ZoomistEvents;
  __modules__!: ZoomistModules;


  constructor(element: QueryElement, options?: Partial<ZoomistOptions>) {
    if (!element) useError('The first argument is required.')
    if (!isElementExist(element)) useError(`Element ${element} is not exist.`)

    this.element = getElement(element)
    this.options = Object.assign({}, DEFAULT_OPTIONS, isPlainObject(options) && options)

    this.init()
  }

  // check zoomist-image is exist
  init() {
    const { element } = this
    const { options: { bounds, minScale, maxScale, initScale } } = this
    if ((element as ZoomistHTMLElement)[NAME]) return;

    (element as ZoomistHTMLElement)[NAME] = this

    const wrapper: HTMLElement | null = element.querySelector(`.${CLASS_WRAPPER}`)
    const image: HTMLElement | null = element.querySelector(`.${CLASS_IMAGE}`)
    if (!wrapper) return useWarn(`${NAME} needs a ".${CLASS_WRAPPER}" element.`)
    if (!image) return useWarn(`${NAME} needs a ".${CLASS_IMAGE}" element.`)

    this.options.minScale = bounds && minScale < 1 ? 1 : minScale
    this.options.maxScale = Math.max(maxScale, minScale)
    this.options.initScale = minmax(initScale || minScale, minScale, maxScale)

    this.wrapper = wrapper
    this.image = image

    this.#create()
  }

  // create initial data
  #create() {
    const { element, image, options } = this
    const { draggable, pinchable } = options
    const { offsetWidth: containerWidth, offsetHeight: containerHeight } = element
    const { offsetWidth: originImageWidth, offsetHeight: originImageHeight } = image
    const { width: imageWidth, height: imageHeight } = getBoundingRect(image)
    if (!originImageWidth || !originImageHeight) return useWarn(`The width or height of ${CLASS_IMAGE} should not be 0.`)

    this.transform = {
      scale: 0,
      translateX: 0,
      translateY: 0
    }

    this.data = {
      imageData: {
        originWidth: originImageWidth,
        originHeight: originImageHeight,
        width: imageWidth,
        height: imageHeight
      },
      containerData: {
        width: containerWidth,
        height: containerHeight
      }
    }

    if (IS_TOUCH && (draggable || pinchable)) {
      this.data.touchData = {
        hypot: 0,
        startX: 0,
        startY: 0,
        prevX: 0,
        prevY: 0,
        imageTop: 0,
        imageLeft: 0,
        widthDiff: 0,
        heightDiff: 0
      }
    }

    if (!IS_TOUCH && draggable) {
      this.data.dragData = {
        startX: 0,
        startY: 0
      }
    }

    // handle events
    this.__events__ = { ...ZOOMIST_EVENTS }

    if (options.on) {
      for (const [k, v] of Object.entries(options.on)) {
        this.__events__[k as EventTypes] = [v as any]
      }
    }

    // handle modules
    this.__modules__ = { ...ZOOMIST_MODULES }

    if (options.slider) {
      const optionsSlider = options.slider === true ? SLIDER_AUTO_GENERATED : options.slider
      this.__modules__.slider = {
        options: Object.assign({}, SLIDER_OPTIONS, optionsSlider)
      }
    }
    if (options.zoomer) {
      const optionsZoomer = options.zoomer === true ? ZOOMER_AUTO_GENERATED : options.zoomer
      this.__modules__.zoomer = {
        options: Object.assign({}, ZOOMER_OPTIONS, optionsZoomer)
      }
    }

    // add AbortController
    this.controller = new AbortController()

    this.#mount()
  }

  // mount elements and bind events
  #mount() {
    if (this.mounted) return;

    const { element, image, options: { minScale, maxScale, initScale }, __modules__: { slider, zoomer } } = this
    const zoomist = this

    setStyle(image, {
      transform: `
        translate(var(${CSSVAR_IMAGE_TRANSLATE_X}, 0px), var(${CSSVAR_IMAGE_TRANSLATE_Y}, 0px))
        scale(var(${CSSVAR_IMAGE_SCALE}, 0))`
    })

    // define scale
    defineProperty(this.transform, 'scale', {
      get() {
        return zoomist.transform.__scale__
      },
      set(val: number) {
        const scale = zoomist.useFixedRatio(val)
        if (isNull(scale) || zoomist.transform.__scale__ === scale) return;

        zoomist.transform.__scale__ = scale

        setStyle(image, { [CSSVAR_IMAGE_SCALE]: scale.toString() })

        setObject(zoomist.data.imageData, {
          width: getBoundingRect(image).width,
          height: getBoundingRect(image).height,
        })

        // set slider value
        if (slider) {
          const sliderValue = Math.round(zoomist.getScaleRatio() * 100)
          slider.value = sliderValue
        }

        // set zoomer buttons status
        if (zoomer && zoomer.options.disabledClass) {
          const { zoomerInEl, zoomerOutEl, zoomerResetEl, options: { disabledClass } } = zoomer

          if (zoomerInEl) {
            zoomerInEl.classList[scale === maxScale ? 'add' : 'remove'](disabledClass)
            setAttributes(zoomerInEl, { 'aria-disabled': scale === maxScale ? 'true' : 'false' })
          }
          if (zoomerOutEl) {
            zoomerOutEl.classList[scale === minScale ? 'add' : 'remove'](disabledClass)
            setAttributes(zoomerOutEl, { 'aria-disabled': scale === minScale ? 'true' : 'false' })
          }
          if (zoomerResetEl) {
            zoomerResetEl.classList[scale === initScale ? 'add' : 'remove'](disabledClass)
            setAttributes(zoomerResetEl, { 'aria-disabled': scale === initScale ? 'true' : 'false' })
          }
        }
      }
    })

    // define translateX
    defineProperty(this.transform, 'translateX', {
      get() {
        return zoomist.transform.__translateX__
      },
      set(val: number) {
        const translateX = roundToTwo(val)
        if (isNull(translateX) || zoomist.transform.__translateX__ === translateX) return;

        zoomist.transform.__translateX__ = translateX

        setStyle(image, { [CSSVAR_IMAGE_TRANSLATE_X]: `${translateX}px` })
      },
    })

    // define translateY
    defineProperty(this.transform, 'translateY', {
      get() {
        return zoomist.transform.__translateY__
      },
      set(val: number) {
        const translateY = roundToTwo(val)
        if (isNull(translateY) || zoomist.transform.__translateY__ === translateY) return;

        zoomist.transform.__translateY__ = translateY

        setStyle(image, { [CSSVAR_IMAGE_TRANSLATE_Y]: `${translateY}px` })
      },
    })

    // interaction events
    this.#interact()

    // create modules
    this.#createModules()

    // set initial value
    setObject(this.transform, {
      scale: initScale!,
      translateX: 0,
      translateY: 0
    })

    element.classList.add(CLASS_CONTAINER)

    this.mounted = true

    this.emit('ready', this)
  }

  // resize, drag, pinch, wheel
  #interact() {
    const { wrapper, options, controller: { signal } } = this
    const { draggable, pinchable, wheelable } = options

    this.states = {}

    // if wheelable
    if (wheelable) {
      this.states.wheeling = false

      const useWheel = (e: WheelEvent) => this.#useWheel(e)

      wrapper.addEventListener(EVENT_WHEEL, useWheel, { signal })
    }

    // if is mobile device && (draggable || pinchable)
    if (IS_TOUCH && (draggable || pinchable)) {
      draggable && (this.states.dragging = false)
      pinchable && (this.states.pinching = false)

      const useTouch = (e: TouchEvent) => this.#useTouch(e)

      wrapper.addEventListener('touchstart', useTouch, { signal })
    }

    // if is mouse event && draggable
    if (!IS_TOUCH && draggable) {
      this.states.dragging = false

      const useDrag = (e: MouseEvent) => this.#useDrag(e)

      wrapper.addEventListener('mousedown', useDrag, { signal })
    }

    // resize observer
    this.#useResizeObserver()
  }

  // on wheel
  #useWheel(e: WheelEvent) {
    const { options } = this
    const { zoomRatio } = options

    e.preventDefault()

    if (this.states.wheeling) return;

    // prevent wheeling too fast
    this.states.wheeling = true
    setTimeout(() => { this.states.wheeling = false }, 30)

    const delta = (e.deltaY || e.detail) > 0 ? -1 : 1

    this.zoom(delta * zoomRatio, getPointer(e))

    this.emit('wheel', this, this.transform.scale, e)
  }

  // on drag (mouse)
  #useDrag(e: MouseEvent) {
    const { data, transform } = this
    const { dragData, imageData } = data

    if (!dragData || !imageData) return;

    // dragStart
    const dragStart = (e: MouseEvent) => {
      if (e && e.button !== 0) return;

      setObject(dragData, {
        startX: getPointer(e).clientX,
        startY: getPointer(e).clientY,
      })

      this.states.dragging = true

      this.emit('dragStart', this, { x: transform.translateX, y: transform.translateY }, e)

      document.addEventListener(EVENT_TOUCH_MOVE, dragMove)
      document.addEventListener(EVENT_TOUCH_END, dragEnd)
    }

    // dragMove
    const dragMove = (e: MouseEvent | TouchEvent) => {
      if ((e as TouchEvent).touches) return;
      if (!this.states.dragging) return;

      const clientX = getPointer(e).clientX
      const clientY = getPointer(e).clientY
      const translateX = clientX - dragData.startX + transform.translateX
      const translateY = clientY - dragData.startY + transform.translateY

      this.moveTo({ x: translateX, y: translateY })

      setObject(dragData, {
        startX: getPointer(e).clientX,
        startY: getPointer(e).clientY
      })

      this.emit('drag', this, { x: translateX, y: translateY }, e)
    }

    // dragEnd
    const dragEnd = (e: MouseEvent | TouchEvent) => {
      if ((e as TouchEvent).touches) return;

      this.states.dragging = false

      this.emit('dragEnd', this, { x: transform.translateX, y: transform.translateY }, e)

      document.removeEventListener(EVENT_TOUCH_MOVE, dragMove)
      document.removeEventListener(EVENT_TOUCH_END, dragEnd)
    }

    dragStart(e)
  }

  // on touch (pinch and touchmove)
  #useTouch(e: TouchEvent) {
    const { data, transform, options: { maxScale, minScale, draggable, pinchable } } = this
    const { touchData, imageData } = data

    if (!touchData || !imageData) return;

    // touchStart
    const touchStart = (e: TouchEvent) => {
      const touches = e.touches
      if (!touches) return;

      const { top: imageTop, left: imageLeft } = getBoundingRect(this.image)
      const { width: widthDiff, height: heightDiff } = this.getImageDiff()

      setObject(touchData, {
        hypot: getPinchHypot(touches),
        startX: getTouchesCenter(touches).clientX,
        startY: getTouchesCenter(touches).clientY,
        prevX: 0,
        prevY: 0,
        imageTop,
        imageLeft,
        widthDiff,
        heightDiff
      })

      if (draggable) {
        this.states.dragging = true
        this.emit('dragStart', this, { x: transform.translateX, y: transform.translateY }, e)
      }

      if (pinchable && touches.length === 2) {
        this.states.pinching = true
        this.emit('pinchStart', this, transform.scale, e)
      }

      document.addEventListener('touchmove', touchMove)
      document.addEventListener('touchend', touchEnd)
    }

    // touchMove
    const touchMove = (e: TouchEvent) => {
      const touches = e.touches
      if (!touches) return;

      const { states: { dragging, pinching } } = this
      const { top: imageTop, left: imageLeft } = getBoundingRect(this.image)
      const { width: widthDiff, height: heightDiff } = this.getImageDiff()

      const hypot = getPinchHypot(touches)
      const hypotScale = hypot ? hypot / touchData.hypot : 1
      const scaleTo = this.useFixedRatio(hypotScale * transform.scale)
      const clientX = getTouchesCenter(touches).clientX + touchData.prevX
      const clientY = getTouchesCenter(touches).clientY + touchData.prevY

      if (pinching && touches.length === 2) {
        this.zoomTo(scaleTo, false)
      }

      if (dragging) {
        const scaleDiff = scaleTo !== maxScale && scaleTo !== minScale && pinchable ? hypotScale : 1
        const translateX = roundToTwo((clientX - touchData.imageLeft) - (widthDiff - touchData.widthDiff) - ((touchData.startX - touchData.imageLeft) * scaleDiff) + transform.translateX)
        const translateY = roundToTwo((clientY - touchData.imageTop) - (heightDiff - touchData.heightDiff) - ((touchData.startY - touchData.imageTop) * scaleDiff) + transform.translateY)

        this.moveTo({ x: translateX, y: translateY })
      }

      setObject(touchData, {
        hypot: hypot,
        startX: clientX,
        startY: clientY,
        imageTop,
        imageLeft,
        widthDiff,
        heightDiff
      })

      pinching && touches.length === 2 && this.emit('pinch', this, transform.scale, e)
      dragging && this.emit('drag', this, { x: transform.translateX, y: transform.translateY }, e)
    }

    // touchEnd
    const touchEnd = (e: TouchEvent) => {
      const touches = e.touches
      if (!touches) return;

      const { states: { dragging, pinching } } = this

      if (dragging && !touches.length) {
        this.states.dragging = false
        this.emit('dragEnd', this, { x: transform.translateX, y: transform.translateY }, e)
      }

      if (pinching && touches.length < 2) {
        this.states.pinching = false
        this.emit('pinchEnd', this, transform.scale, e)
      }

      if (dragging && touches.length === 1) {
        const clientX = getPointer(e).clientX
        const clientY = getPointer(e).clientY

        setObject(touchData, {
          prevX: touchData.startX - clientX,
          prevY: touchData.startY - clientY
        })
      }

      if (!touches.length) {
        document.removeEventListener('touchmove', touchMove)
        document.removeEventListener('touchend', touchEnd)
      }
    }

    touchStart(e)
  }

  // resize observer on element
  #useResizeObserver() {
    const { element, image, transform } = this

    const observer = new ResizeObserver(() => {
      const { offsetWidth: containerWidth, offsetHeight: containerHeight } = element
      const { width: containerDataWidth, height: containerDataHeight } = this.getContainerData()
      if (containerWidth === containerDataWidth && containerHeight === containerDataHeight) return;

      const oldTanslateX = transform.translateX
      const oldTanslateY = transform.translateY

      if (oldTanslateX) {
        const translateX = containerWidth / containerDataWidth * oldTanslateX

        this.transform.translateX = translateX
      }

      if (oldTanslateY) {
        const translateY = containerHeight / containerDataHeight * oldTanslateY

        this.transform.translateY = translateY
      }

      const { offsetWidth: originImageWidth, offsetHeight: originImageHeight } = image
      const { width: imageWidth, height: imageHeight } = getBoundingRect(image)

      setObject(this.data.containerData, {
        width: containerWidth,
        height: containerHeight
      })

      setObject(this.data.imageData, {
        originWidth: originImageWidth,
        originHeight: originImageHeight,
        width: imageWidth,
        height: imageHeight,
      })

      this.emit('resize', this)
    })

    observer.observe(element)
  }

  // check modules and create
  #createModules() {
    const { slider, zoomer } = this.__modules__

    if (slider) {
      this.#createSlider()
    }

    if (zoomer) {
      this.#createZoomer()
    }
  }

  // destory modules
  destroyModules() {
    const { slider, zoomer } = this.__modules__

    if (slider) {
      this.destroySlider()
    }

    if (zoomer) {
      this.destroyZoomer()
    }
  }

  // mount slider
  #createSlider() {
    const { element, __modules__: { slider } } = this
    if (!slider || slider.mounted) return;

    const { options: { el, direction } } = slider
    const isAutoGenerated = el === `.${CLASS_SLIDER}`
    if (!el || (!isAutoGenerated && !isElementExist(el))) return;

    const sliderEl = isAutoGenerated ? createElement('div', CLASS_SLIDER) : getElement(el)
    const sliderTrack = createElement('div', CLASS_SLIDER_TRACK)
    const sliderBar = createElement('span', CLASS_SLIDER_BAR)
    const sliderButton = createElement('span', CLASS_SLIDER_BUTTON, { ...ATTR_SLIDER_BUTTON, 'aria-orientation': direction})

    sliderEl.classList.add(`${CLASS_SLIDER}-${direction}`)

    defineProperty(slider, 'value', {
      get() {
        return slider.__value__
      },
      set(val: number) {
        if (slider.__value__ === val) return;

        slider.__value__ = val

        setStyle(sliderEl, { [CSSVAR_SLIDER_VALUE]: val.toString() })
        setAttributes(sliderButton, { 'aria-valuenow': val.toString() })
      }
    })

    setObject(slider, {
      value: this.getScaleRatio() * 100,
      controller: new AbortController(),
      sliding: false,
      sliderEl,
      sliderTrack,
      sliderButton,
    })

    this.#useSlider()

    sliderTrack.append(sliderBar, sliderButton)
    sliderEl.append(sliderTrack)

    if (isAutoGenerated) element.append(sliderEl)

    slider.mounted = true
  }

  // slider events
  #useSlider() {
    const { options: { minScale, maxScale }, __modules__: { slider } } = this
    if (!slider) return;

    const { options: { direction }, controller, sliderEl, sliderTrack } = slider

    if (!sliderEl || !sliderTrack) return;

    const isVertical = direction === 'vertical'
    
    const getScale = (e: MouseEvent | TouchEvent): number => {
      const wrapperRect = getBoundingRect(sliderTrack)
      const total = wrapperRect[isVertical ? 'height' : 'width']
      const start = wrapperRect[isVertical ? 'bottom' : 'left']
      const pointer = getPointer(e)[isVertical ? 'clientY' : 'clientX']
      const value = roundToTwo(minmax((pointer - start) * (isVertical ? -1 : 1) / total, 0, 1))

      const scale = (maxScale - minScale) * value + minScale

      return scale
    }

    // slideStart
    const slideStart = (e: MouseEvent | TouchEvent) => {
      if (e instanceof MouseEvent && e.button !== 0) return;

      slider.sliding = true

      const scale = getScale(e)

      this.zoomTo(scale)
      this.emit('slideStart', this, this.getSliderValue()!, e)

      document.addEventListener(EVENT_TOUCH_MOVE, slideMove)
      document.addEventListener(EVENT_TOUCH_END, slideEnd)
    }

    // slideMove
    const slideMove = (e: MouseEvent | TouchEvent) => {
      if (!slider.sliding) return;

      const scale = getScale(e)

      this.zoomTo(scale)
      this.emit('slide', this, this.getSliderValue()!, e)
    }

    // slideEnd
    const slideEnd = (e: MouseEvent | TouchEvent) => {
      this.emit('slideEnd', this, this.getSliderValue()!, e)

      slider.sliding = false

      document.removeEventListener(EVENT_TOUCH_MOVE, slideMove)
      document.removeEventListener(EVENT_TOUCH_END, slideEnd)
    }

    sliderEl.addEventListener(EVENT_TOUCH_START, slideStart, { signal: controller?.signal })
  }

  // destroy slider
  destroySlider() {
    const { __modules__: { slider } } = this

    if (!slider || !slider.mounted) return;

    const { options: { el }, controller } = slider
    const isAutoGenerated = el === `.${CLASS_SLIDER}`

    if (isAutoGenerated) {
      slider.sliderEl?.remove()
    }
    else {
      slider.sliderTrack?.remove()
    }

    controller?.abort()

    slider.mounted = false
  }

  // mount zoomer
  #createZoomer() {
    const { element, __modules__: { zoomer } } = this
    if (!zoomer || zoomer.mounted) return;

    const { options: { el, inEl, outEl, resetEl } } = zoomer
    const zoomerButtons = [inEl, outEl, resetEl]

    const createZoomerEl = (
      target: string | HTMLElement | null,
      tag: string,
      className: string,
      attr?: Record<string, string>,
      icon?: string
    ) => {
      const isAutoGenerated = target === `.${className}`
      if (!target || (!isAutoGenerated && !isElementExist(target))) return null;
      className = zoomerButtons.includes(target) ? `${className} ${CLASS_ZOOMER_BUTTON}` : className
      return isAutoGenerated ? createElement(tag, className, attr, icon) : getElement(target)
    }

    const zoomerEl = createZoomerEl(el, 'div', CLASS_ZOOMER)
    const zoomerInEl = createZoomerEl(inEl, 'button', CLASS_ZOOMER_IN, ATTR_ZOOMER_IN, zoomerIconIn)
    const zoomerOutEl = createZoomerEl(outEl, 'button', CLASS_ZOOMER_OUT, ATTR_ZOOMER_OUT, zoomerIconOut)
    const zoomerResetEl = createZoomerEl(resetEl, 'button', CLASS_ZOOMER_RESET, ATTR_ZOOMER_RESET, zoomerIconReset);
    
    setObject(zoomer, {
      controller: new AbortController(),
      zoomerEl,
      zoomerInEl,
      zoomerOutEl,
      zoomerResetEl
    })

    if (zoomerEl) {
      zoomerInEl && zoomerEl.append(zoomerInEl)
      zoomerOutEl && zoomerEl.append(zoomerOutEl)
      zoomerResetEl && zoomerEl.append(zoomerResetEl)
      el === `.${CLASS_ZOOMER}` && element.append(zoomerEl)
    }

    this.#useZoomer()

    zoomer.mounted = true
  }

  // zoomer event
  #useZoomer() {
    const { options: { zoomRatio }, __modules__: { zoomer } } = this
    const zoomist = this
    if (!zoomer) return;

    const { controller, zoomerInEl, zoomerOutEl, zoomerResetEl } = zoomer

    zoomerInEl && zoomerInEl.addEventListener('click', () => {
      zoomist.zoom(zoomRatio)
    }, { signal: controller?.signal })
    zoomerOutEl && zoomerOutEl.addEventListener('click', () => {
      zoomist.zoom(-zoomRatio)
    }, { signal: controller?.signal })
    zoomerResetEl && zoomerResetEl.addEventListener('click', () => {
      zoomist.reset()
    }, { signal: controller?.signal })
  }

  // destroy zoomer
  destroyZoomer() {
    const { __modules__: { zoomer } } = this

    if (!zoomer || !zoomer.mounted) return;

    const { options: { el, inEl, outEl, resetEl }, controller, zoomerEl, zoomerInEl, zoomerOutEl, zoomerResetEl } = zoomer

    const destoryZoomerEl = (
      target: string | HTMLElement | null,
      className: string,
      el: HTMLElement | null | void
    ) => {
      const isAutoGenerated = target === `.${className}`
      if (isAutoGenerated) {
        el?.remove()
      }
    };

    [
      { target: el, className: CLASS_ZOOMER, el: zoomerEl },
      { target: inEl, className: CLASS_ZOOMER_IN, el: zoomerInEl },
      { target: outEl, className: CLASS_ZOOMER_OUT, el: zoomerOutEl },
      { target: resetEl, className: CLASS_ZOOMER_RESET, el: zoomerResetEl }
    ].forEach(item => destoryZoomerEl(item.target, item.className, item.el))

    controller?.abort()

    zoomer.mounted = false
  }
}


Object.assign(Zoomist.prototype, ZOOMIST_METHODS)


export default Zoomist
