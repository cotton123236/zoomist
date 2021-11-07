import {
  DEFAULT_SLIDER_OPTIONS
} from './options'
import {
  CLASS_SLIDER,
  CLASS_SLIDER_MAIN,
  CLASS_SLIDER_BAR,
  CLASS_SLIDER_BUTTON
} from './../shared/constants'
import {
  isElementExist,
  getElement
} from './../shared/utils'
import {
  sliderTemp
} from './template'

export default {
  
  createSlider() {
    const { element, options } = this

    options.slider = Object.assign(DEFAULT_SLIDER_OPTIONS, options.slider)

    const { slider } = options

    const sliderEl = slider.el && isElementExist(slider.el) ? getElement(slider.el) : document.createElement('div')
    if (!slider.el || !isElementExist(slider.el)) {
      sliderEl.classList.add(CLASS_SLIDER)
    }

    sliderEl.innerHTML = sliderTemp

    slider.el = sliderEl
    slider.sliderMain = sliderEl.querySelector(`.${CLASS_SLIDER_MAIN}`)
    slider.sliderBar = sliderEl.querySelector(`.${CLASS_SLIDER_BAR}`)
    slider.sliderButton = sliderEl.querySelector(`.${CLASS_SLIDER_BUTTON}`)


    sliderEl.addEventListener('click', function(e) {
      console.log('test')
      e.stopPropagation()
    })


    element.append(sliderEl)

    console.log(sliderEl)
  }
}