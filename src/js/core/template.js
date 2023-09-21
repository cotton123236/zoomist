import {
  CLASS_SLIDER_MAIN,
  CLASS_SLIDER_BAR,
  CLASS_SLIDER_BUTTON
} from './../shared/constants'

export const sliderTemp = `
  <div class="${CLASS_SLIDER_MAIN}">
    <span class="${CLASS_SLIDER_BAR}"></span>
    <span class="${CLASS_SLIDER_BUTTON}"></span>
  </div>
`

export const inZoomerIcon = `
<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 12 12">
  <polygon points="12,5.5 6.5,5.5 6.5,0 5.5,0 5.5,5.5 0,5.5 0,6.5 5.5,6.5 5.5,12 6.5,12 6.5,6.5 12,6.5 "/>
</svg>
`

export const outZoomerIcon = `
<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 12 12">
  <rect y="5.5" width="12" height="1"/>
</svg>
`

export const rightRotatorIcon = `
<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 12 12">
  <text y="12">↻</text>
</svg>
`