const zoomist = new Zoomist('[data-zoomist]', {
  fill: 'cover',
  src: 'data-zoomist-src',
  draggable: true,
  wheelable: true,
  bounds: true,
  zoomRatio: 0.1,
  maxRatio: 3,
  slider: {
    // el: '.custom-slider',
    // direction: 'vertical'
    // maxRatio: 3
  },
  zoomer: {
    // inEl: '.zoomist-in-zoomer',
    // outEl: '.zoomist-out-zoomer',
    disableOnBounds: true
  }
})

console.log(zoomist)
