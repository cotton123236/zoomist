window.onload = () => {

  // highlightAll
  hljs.highlightAll()
  
  // 
  tabSwitch()

  // 
  new Zoomist('#intro-zoomist', {
    fill: 'contain',
    height: false,
    maxRatio: 2.5,
    slider: true,
    zoomer: true
  })

  demoHandler()
}


// demo tab switch
const tabSwitch = () => {
  const tabBtn = $('.tabs a');

  tabBtn.on('click', function() {
    const page = $(this).attr('data-tab-for');
    $(this).addClass('active').removeAttr('data-cursor-color').siblings().removeClass('active').attr('data-cursor-color', 'white');
    $('#arrow-cursor').removeClass('white');
    $(this).parent().siblings('.views').find(`.${page}`).addClass('show').siblings().removeClass('show');
  });
}

// 
const demoHandler = () => {
  // demo zoomist
  const demoZoomist = new Zoomist('#my-zoomist', {
    height: '75%',
    slider: {},
    zoomer: {}
  })
  const zoomistData = $('.demo .zoomist-data')
  const fillInput = $('#fill')
  const draggableInput = $('#draggable')
  const wheelableInput = $('#wheelable')
  const boundsInput = $('#bounds')
  const zoomRatioInput = $('#zoomRatio')
  const maxRatioInput = $('#maxRatio')
  const maxRatioValueInput = $('#maxRatioValue')
  const directionInput = $('#direction')
  const disableOnBoundsInput = $('#disableOnBounds')
  const getContainerDataBtn = $('#getContainerData')
  const getImageDataBtn = $('#getImageData')
  const getSliderValueBtn = $('#getSliderValue')
  const getZoomRatioBtn = $('#getZoomRatio')
  const resetBtn = $('#reset')
  const updateBtn = $('#update')
  const destroyBtn = $('#destroy')
  const zoomBtn = $('#zoom')
  const zoomValueInput = $('#zoomValue')
  const zoomToBtn = $('#zoomTo')
  const zoomToValueInput = $('#zoomToValue')
  const slideToBtn = $('#slideTo')
  const slideToValueInput = $('#slideToValue')
  fillInput.on('change', function() {
    const val = $(this).val()
    const isBounds = $('#bounds')[0].checked
    demoZoomist.options.fill = val
    demoZoomist.options.bounds = fill !== 'contain' && isBounds ? true : false
    demoZoomist.update()
  })
  draggableInput.on('change', function() {
    const isChecked = this.checked
    demoZoomist.options.draggable = isChecked
    demoZoomist.update()
  })
  wheelableInput.on('change', function() {
    const isChecked = this.checked
    demoZoomist.options.wheelable = isChecked
    demoZoomist.update()
  })
  boundsInput.on('change', function() {
    const isChecked = this.checked
    demoZoomist.options.bounds = isChecked
    demoZoomist.update()
  })
  zoomRatioInput.on('change', function() {
    const val = Number($(this).val())
    demoZoomist.options.zoomRatio = val
    demoZoomist.update()
  })
  maxRatioInput.on('change', function() {
    const isChecked = this.checked
    const val = isChecked ? Number(maxRatioValueInput.val()) : isChecked
    demoZoomist.options.maxRatio = val
    demoZoomist.update()
  })
  maxRatioValueInput.on('change', function() {
    const val = Number($(this).val())
    demoZoomist.options.maxRatio = val
    demoZoomist.update()
  })
  directionInput.on('change', function() {
    const val = $(this).val()
    demoZoomist.options.slider.direction = val
    demoZoomist.update()
  })
  disableOnBoundsInput.on('change', function() {
    const isChecked = this.checked
    demoZoomist.options.zoomer.disableOnBounds = isChecked
    demoZoomist.update()
  })
  getContainerDataBtn.on('click', function() {
    const val = demoZoomist.getContainerData()
    zoomistData.text(JSON.stringify(val)).addClass('show')
    setTimeout(() => { zoomistData.removeClass('show') }, 5000)
  })
  getImageDataBtn.on('click', function() {
    const val = demoZoomist.getImageData()
    zoomistData.text(JSON.stringify(val)).addClass('show')
    setTimeout(() => { zoomistData.removeClass('show') }, 5000)
  })
  getSliderValueBtn.on('click', function() {
    const val = demoZoomist.getSliderValue()
    zoomistData.text(val).addClass('show')
    setTimeout(() => { zoomistData.removeClass('show') }, 5000)
  })
  getZoomRatioBtn.on('click', function() {
    const val = demoZoomist.getZoomRatio()
    zoomistData.text(val).addClass('show')
    setTimeout(() => { zoomistData.removeClass('show') }, 5000)
  })
  resetBtn.on('click', function() {
    demoZoomist.reset()
  })
  updateBtn.on('click', function() {
    demoZoomist.update()
  })
  destroyBtn.on('click', function() {
    demoZoomist.destroy()
  })
  zoomBtn.on('click', function() {
    const val = Number(zoomValueInput.val())
    demoZoomist.zoom(val)
  })
  zoomValueInput.on('change', function() {
    const val = $(this).val()
    zoomBtn.find('span').text(val)
  })
  zoomToBtn.on('click', function() {
    const val = Number(zoomToValueInput.val())
    demoZoomist.zoomTo(val)
  })
  zoomToValueInput.on('change', function() {
    const val = $(this).val()
    zoomToBtn.find('span').text(val)
  })
  slideToBtn.on('click', function() {
    const val = Number(slideToValueInput.val())
    demoZoomist.slideTo(val)
  })
  slideToValueInput.on('change', function() {
    const val = $(this).val()
    slideToBtn.find('span').text(val)
  })
}