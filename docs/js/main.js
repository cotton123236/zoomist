const zoomist = new Zoomist('[data-zoomist]', {
  fill: 'cover',
  src: 'data-zoomist-src',
  draggable: true,
  bounds: true,
  zoomRatio: 0.1,
  maxRatio: 3,
  wheel: {
    // zoomRatio: 0.1
  },
  slider: {
    // el: '.custom-slider',
    // direction: 'vertical'
    // maxRatio: 3
  },
  zoomer: {
    inEl: '',
    outEl: ''
  }
})

console.log(zoomist)
