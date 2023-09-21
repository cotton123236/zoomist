import {
  DEFAULT_ROTATOR_OPTIONS,
  DEFAULT_SLIDER_OPTIONS,
  DEFAULT_ZOOMER_OPTIONS
} from './options'
import {
  MODULES,
  CLASS_SLIDER,
  CLASS_SLIDER_MAIN,
  CLASS_SLIDER_BAR,
  CLASS_SLIDER_BUTTON,
  CLASS_ZOOMER,
  CLASS_ZOOMER_IN,
  CLASS_ZOOMER_OUT,
  CLASS_ZOOMER_DISABLE,
  CLASS_ROTATOR,
  CLASS_ROTATOR_RIGHT
} from './../shared/constants'
import {
  isElementExist,
  getElement,
  upperFirstLetter
} from './../shared/utils'
import {
  rotatorEvents,
  sliderEvents,
  zoomerEvents
} from './events'
import {
  sliderTemp,
  inZoomerIcon,
  outZoomerIcon,
  rightRotatorIcon
} from './template'

export default {
  /**
   * create all modules
   */
  createModules() {
    const { options } = this

    this.__modules__ = {}
    MODULES.forEach(module => {
      if (options[module]) this[`create${upperFirstLetter(module)}`]()
    })
  },

  /**
   * create slider module
   */
  createSlider() {
    const { element, options, __modules__ } = this
    __modules__.slider = Object.assign({}, DEFAULT_SLIDER_OPTIONS, options.slider)
    
    const { slider } = __modules__
    
    if (options.maxRatio) Object.assign(slider, { maxRatio: options.maxRatio })
    if (slider.direction !== 'horizontal' && slider.direction !== 'vertical') slider.direction = 'horizontal'
    slider.value = 0

    // mount
    if (slider.mounted) slider.sliderMain.remove()

    const isCustomEl = slider.isCustomEl = slider.el && isElementExist(slider.el)
    const sliderEl = isCustomEl ? getElement(slider.el) : document.createElement('div')
    if (!isCustomEl) sliderEl.classList.add(CLASS_SLIDER)
    sliderEl.innerHTML = sliderTemp

    slider.sliderEl = sliderEl
    slider.sliderMain = sliderEl.querySelector(`.${CLASS_SLIDER_MAIN}`)
    slider.sliderBar = sliderEl.querySelector(`.${CLASS_SLIDER_BAR}`)
    slider.sliderButton = sliderEl.querySelector(`.${CLASS_SLIDER_BUTTON}`)
    slider.sliderMain.classList.add(`${CLASS_SLIDER}-${slider.direction}`)

    // events
    sliderEvents(this)

    slider.mounted = true

    // render
    if (!isCustomEl) element.append(sliderEl)
  },

  /**
   * destroy slider module
   */
  destroySlider() {
    const { slider } = this.__modules__

    if (!slider || !slider.mounted) return;

    if (slider.isCustomEl) slider.sliderMain.remove()
    else slider.sliderEl.remove()

    slider.mounted = false
  },

  /**
   * create zoomer module
   */
  createZoomer() {
    const { element, options, __modules__ } = this
    __modules__.zoomer = Object.assign({}, DEFAULT_ZOOMER_OPTIONS, options.zoomer)

    const { zoomer } = __modules__

    // mount
    if (zoomer.mounted && zoomer.zoomerEl) zoomer.sliderMain.remove()

    const isCustomInEl = zoomer.isCustomInEl = zoomer.inEl && isElementExist(zoomer.inEl)
    const isCustomOutEl = zoomer.isCustomOutEl = zoomer.outEl && isElementExist(zoomer.outEl)
    const zoomerInEl = isCustomInEl ? getElement(zoomer.inEl) : document.createElement('div')
    const zoomerOutEl = isCustomOutEl ? getElement(zoomer.outEl) : document.createElement('div')
    if (!isCustomInEl) {
      zoomerInEl.classList.add(CLASS_ZOOMER_IN)
      zoomerInEl.innerHTML = inZoomerIcon
    }
    if (!isCustomOutEl) {
      zoomerOutEl.classList.add(CLASS_ZOOMER_OUT)
      zoomerOutEl.innerHTML = outZoomerIcon
    }

    zoomer.zoomerInEl = zoomerInEl
    zoomer.zoomerOutEl = zoomerOutEl

    if (zoomer.disableOnBounds) {
      const { bounds, maxRatio } = options

      if (bounds && this.ratio === 1) zoomerOutEl.classList.add(CLASS_ZOOMER_DISABLE)
      if (this.ratio === maxRatio) zoomerInEl.classList.add(CLASS_ZOOMER_DISABLE)
    }

    // events
    zoomerEvents(this)

    zoomer.mounted = true

    // render
    if (!isCustomInEl || !isCustomOutEl) {
      const zoomerEl = document.createElement('div')
      zoomerEl.classList.add(CLASS_ZOOMER)

      if (!isCustomInEl) zoomerEl.append(zoomerInEl)
      if (!isCustomOutEl) zoomerEl.append(zoomerOutEl)

      zoomer.zoomerEl = zoomerEl

      element.append(zoomerEl)
    }
  },

  /**
   * destroy zoomer module
   */
  destroyZoomer() {
    const { zoomer } = this.__modules__

    if (!zoomer || !zoomer.mounted) return;

    const unbindZoomer = (target) => {
      target.removeEventListener('click', target.event)
      target.event = undefined
      target.classList.remove(CLASS_ZOOMER_DISABLE)
    }

    if (zoomer.isCustomInEl) unbindZoomer(zoomer.zoomerInEl)
    else zoomer.zoomerInEl.remove()
    if (zoomer.isCustomOutEl) unbindZoomer(zoomer.zoomerOutEl)
    else zoomer.zoomerOutEl.remove()
    if (zoomer.zoomerEl) zoomer.zoomerEl.remove()

    zoomer.mounted = false
  },

  /**
   * create rotator module
   */
  createRotator() {
    const { element, options, __modules__ } = this
    __modules__.rotator = Object.assign({}, DEFAULT_ROTATOR_OPTIONS, options.rotator)

    const { rotator } = __modules__

    // mount
    if (rotator.mounted) rotator.sliderMain.remove()

    const isCustomRightEl = rotator.isCustomRightEl = rotator.rightEl && isElementExist(rotator.rightEl)
    const rotatorRightEl = isCustomRightEl ? getElement(rotator.rightEl) : document.createElement('div')

    if (!isCustomRightEl) {
      rotatorRightEl.classList.add(CLASS_ROTATOR_RIGHT)
      rotatorRightEl.innerHTML = rightRotatorIcon
    }

    rotator.rotatorRightEl = rotatorRightEl;

    // events
    rotatorEvents(this)

    rotator.mounted = true

    // render
    if (!isCustomRightEl) {
      const rotatorEl = document.createElement('div')
      rotatorEl.classList.add(CLASS_ROTATOR)

      rotatorEl.append(rotatorRightEl)

      rotator.rotatorEl = rotatorEl

      element.append(rotatorEl)
    }
  },

  /**
   * destroy rotator module
   */
  destroyRotator() {
    const { rotator } = this.__modules__

    if (!rotator || !rotator.mounted) return;

    if (rotator.isCustomEl) rotator.rotatorMain.remove()
    else rotator.rotatorEl.remove()

    rotator.mounted = false
  },
}