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
    // direction: 'vertical'
    // el: '.custom-slider'
    // zoomRatio: 0.1,
  },
  zoomer: {
    inEl: '',
    outEl: ''
  }
})

console.log(zoomist)
