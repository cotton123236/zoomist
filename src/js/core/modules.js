import {
  DEFAULT_SLIDER_OPTIONS
} from './options'
import {
  CLASS_SLIDER,
  CLASS_SLIDER_MAIN,
  CLASS_SLIDER_BAR,
  CLASS_SLIDER_BUTTON,
  EVENT_TOUCH_START,
  EVENT_TOUCH_MOVE,
  EVENT_TOUCH_END
} from './../shared/constants'
import {
  isElementExist,
  getElement,
  getPointer,
  roundToTwo,
  minmax
} from './../shared/utils'
import {
  sliderTemp
} from './template'

export default {
  createSlider() {
    const { options } = this
    options.slider = Object.assign(DEFAULT_SLIDER_OPTIONS, options.slider)
    
    const { slider } = options
    
    if (options.maxRatio) Object.assign(options.slider, {maxRatio: options.maxRatio})
    if (slider.direction !== 'horizontal' && slider.direction !== 'vertical') slider.direction = 'horizontal'
    
    this.mountSlider()
  },
  mountSlider() {
    const { options } = this
    const { slider } = options
    
    if (slider.mounted) return;

    const sliderEl = slider.el && isElementExist(slider.el) ? getElement(slider.el) : document.createElement('div')
    if (!slider.el || !isElementExist(slider.el)) {
      sliderEl.classList.add(CLASS_SLIDER)
    }
    sliderEl.innerHTML = sliderTemp

    slider.el = sliderEl
    slider.sliderMain = sliderEl.querySelector(`.${CLASS_SLIDER_MAIN}`)
    slider.sliderBar = sliderEl.querySelector(`.${CLASS_SLIDER_BAR}`)
    slider.sliderButton = sliderEl.querySelector(`.${CLASS_SLIDER_BUTTON}`)
    slider.sliderMain.classList.add(`${CLASS_SLIDER}-${slider.direction}`)
  
    // events
    slider.sliding = false
    const isHorizontal = slider.direction === 'horizontal'

    const slideHandler = (e) => {
      const rect = slider.sliderMain.getBoundingClientRect()

      const mousePoint = isHorizontal ? getPointer(e).clientX : getPointer(e).clientY
      const sliderTotal = isHorizontal ? rect.width : rect.height
      const sliderStart = isHorizontal ? rect.left : rect.top
      const percentage = minmax(roundToTwo(( mousePoint - sliderStart ) / sliderTotal), 0, 1)
      const ratio = ( slider.maxRatio - 1 ) * percentage + 1

      this.zoomTo(ratio)
    }
    const slideStart = (e) => {
      slideHandler(e)
  
      slider.sliding = true
      document.addEventListener(EVENT_TOUCH_MOVE, slideMove)
      document.addEventListener(EVENT_TOUCH_END, slideEnd)
    }
    const slideMove = (e) => {
      if (!slider.sliding) return;
  
      slideHandler(e)
    }
    const slideEnd = (e) => {
      slider.sliding = false
  
      document.removeEventListener(EVENT_TOUCH_MOVE, slideMove)
      document.removeEventListener(EVENT_TOUCH_END, slideEnd)
    }
    slider.sliderMain.addEventListener(EVENT_TOUCH_START, slideStart)

    slider.mounted = true

    this.renderSlider()
  },
  renderSlider() {
    const { element, options } = this

    element.append(options.slider.el)
  }
}