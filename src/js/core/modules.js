import {
  isElementExist,
  getElement
} from './../shared/utils'
import {
  sliderTemp
} from './template'

export default {
  
  createSlider() {
    const { options } = this
    const { slider } = options

    const sliderEl = slider.el && isElementExist(slider.el) ? getElement(slider.el) : document.createElement('div')

    console.log(sliderEl)
  }
}