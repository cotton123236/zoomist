import {
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
  CLASS_ZOOMER_OUT
} from './../shared/constants'
import {
  isElementExist,
  getElement,
  upperFirstLetter
} from './../shared/utils'
import {
  sliderEvents,
  zoomerEvents
} from './events'
import {
  sliderTemp
} from './template'

export default {
  createModules() {
    const { options } = this

    MODULES.forEach(module => {
      if (options[module]) this[`create${upperFirstLetter(module)}`]()
    })
  },
  createSlider() {
    const { element, options } = this
    options.slider = Object.assign(DEFAULT_SLIDER_OPTIONS, options.slider)
    
    const { slider } = options
    
    if (options.maxRatio) Object.assign(options.slider, {maxRatio: options.maxRatio})
    if (slider.direction !== 'horizontal' && slider.direction !== 'vertical') slider.direction = 'horizontal'

    // mount
    if (slider.mounted) slider.sliderMain.remove()

    const isCustomEl = slider.el && isElementExist(slider.el)
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
  createZoomer() {
    const { element, options } = this
    options.zoomer = Object.assign(DEFAULT_ZOOMER_OPTIONS, options.zoomer)

    const { zoomer } = options

    // mount
    if (zoomer.mounted && zoomer.zoomerEl) zoomer.sliderMain.remove()

    const isCustomInEl = zoomer.inEl && isElementExist(zoomer.inEl)
    const isCustomOutEl = zoomer.outEl && isElementExist(zoomer.outEl)
    const zoomerInEl = isCustomInEl ? getElement(zoomer.inEl) : document.createElement('div')
    const zoomerOutEl = isCustomOutEl ? getElement(zoomer.outEl) : document.createElement('div')
    if (!isCustomInEl) zoomerInEl.classList.add(CLASS_ZOOMER_IN)
    if (!isCustomOutEl) zoomerOutEl.classList.add(CLASS_ZOOMER_OUT)

    zoomer.zoomerInEl = zoomerInEl
    zoomer.zoomerOutEl = zoomerOutEl

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
  }
}