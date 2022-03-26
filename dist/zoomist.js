/*!
 * zoomist.js v1.0.2
 * https://github.com/cotton123236/zoomist#readme
 *
 * Copyright 2021-present Wilson Wu
 * Released under the MIT license
 *
 * Date: 2022-03-26T09:56:17.746Z
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Zoomist = factory());
})(this, (function () { 'use strict';

  const NAME = 'zoomist';
  const MODULES$1 = ['slider', 'zoomer'];
  const CLASS_CONTAINER = `${NAME}-container`;
  const CLASS_WRAPPER = `${NAME}-wrapper`;
  const CLASS_IMAGE = `${NAME}-image`;
  const CLASS_SLIDER = `${NAME}-slider`;
  const CLASS_SLIDER_MAIN = `${NAME}-slider-main`;
  const CLASS_SLIDER_BAR = `${NAME}-slider-bar`;
  const CLASS_SLIDER_BUTTON = `${NAME}-slider-button`;
  const CLASS_ZOOMER = `${NAME}-zoomer`;
  const CLASS_ZOOMER_IN = `${NAME}-in-zoomer`;
  const CLASS_ZOOMER_OUT = `${NAME}-out-zoomer`;
  const CLASS_ZOOMER_DISABLE = `${NAME}-zoomer-disable`;
  const IS_BROWSER = typeof window !== 'undefined' && typeof window.document !== 'undefined';
  const IS_TOUCH = IS_BROWSER && 'ontouchstart' in window ? true : false;
  const EVENT_TOUCH_START = IS_TOUCH ? 'touchstart' : 'mousedown';
  const EVENT_TOUCH_MOVE = IS_TOUCH ? 'touchmove' : 'mousemove';
  const EVENT_TOUCH_END = IS_TOUCH ? 'touchend' : 'mouseup';
  const EVENT_RESIZE = 'resize';
  const EVENT_WHEEL = 'wheel';

  var DEFAULT_OPTIONS = {
    // {String} set initial image status
    fill: 'cover',
    // {String / querySelector} the attribute of image source or a image element
    src: 'data-zoomist-src',
    // {Boolean} set is draggable or not
    draggable: true,
    // {Boolean} set is wheelable or not
    wheelable: true,
    // {Boolean} set is pinchable or not
    pinchable: true,
    // {Boolean} set image can be drag out of the bounds (it will set to false when fill is contain)
    bounds: true,
    // {Number} the ratio of zoom at one time
    zoomRatio: 0.1,
    // {Number > 1, False} the max ratio of the image (compare to the initial image status)
    maxRatio: false,
    // {Boolean / String}
    height: 'auto'
  };
  const DEFAULT_SLIDER_OPTIONS = {
    // {String / querySelector} the css selector string or a element of the slider
    el: CLASS_SLIDER,
    // {String} the direction of the slider 'horizontal' or 'vertical'
    direction: 'horizontal',
    // {Number} the max ratio of the slider (only work on options.maxRatio = false)
    maxRatio: 2
  };
  const DEFAULT_ZOOMER_OPTIONS = {
    // {String / querySelector} the css selector string or a element of the in zoomer
    inEl: CLASS_ZOOMER_IN,
    // {String / querySelector} the css selector string or a element of the out zoomer
    outEl: CLASS_ZOOMER_OUT,
    // {Boolean} in zoomer and out zoomer will be disabled when image comes to maximin or minimum
    disableOnBounds: true
  };
  const EVENTS = {
    // invoked when zoomist instance ready
    ready: null,
    // invoked when image is zooming
    zoom: null,
    // invoked when wheeling
    wheel: null,
    // invoked when mousedown on wrapper
    dragStart: null,
    // invoked when dragging the image
    drag: null,
    // invoked when mouseup on wrapper
    dragEnd: null,
    // invoked when mousedown on wrapper
    pinchStart: null,
    // invoked when pinching the image
    pinch: null,
    // invoked when mouseup on wrapper
    pinchEnd: null,
    // invoked when mousedown on slider
    slideStart: null,
    // invoked when sliding the slider
    slide: null,
    // invoked when mouseup on slider
    slideEnd: null,
    // invoked when image changes it's size
    resize: null,
    // invoked when reset methods be used
    reset: null,
    // invoked when destroy methods be used
    destroy: null,
    // invoked when update methods be used
    update: null
  };

  const isObject = value => {
    return typeof value === 'object' && value !== null;
  }; // check value is a plain object

  const isPlainObject = value => {
    if (!isObject(value)) return false;

    try {
      const {
        constructor
      } = value;
      const {
        prototype
      } = constructor;
      const {
        hasOwnProperty
      } = Object.prototype;
      return constructor && prototype && hasOwnProperty.call(prototype, 'isPrototypeOf');
    } catch (error) {
      return false;
    }
  }; // set object key and value

  const setObject = (obj, value) => {
    if (!obj) obj = {};

    for (const [k, v] of Object.entries(value)) {
      obj[k] = v;
    }
  }; // make a new object from old object

  const getNewObject = value => {
    return Object.assign({}, value);
  }; // check value is string and not empty

  const isString = value => {
    return typeof value === 'string' && value !== '';
  }; // check value is number and not NaN

  const isNumber = value => {
    return typeof value === 'number' && !isNaN(value);
  }; // check element is exist

  const isElementExist = value => {
    return getElement(value) !== null;
  }; // if value is an element then return value, if not then query value

  const getElement = value => {
    return value instanceof HTMLElement ? value : document.querySelector(value);
  }; // check value is img tag or not

  const isImg = value => {
    return isElementExist(value) && getElement(value).tagName === 'IMG';
  }; // check value is a function

  const isFunction = value => {
    return typeof value === 'function';
  }; // check value is percentage

  const isPercentage = value => {
    return value.indexOf('%') > -1;
  }; // get elemant style

  const setStyle = (element, obj) => {
    for (const [k, v] of Object.entries(obj)) {
      element.style[k] = isNumber(v) ? `${v}px` : v;
    }
  }; // get mouse pageX and pageY

  const getPointer = event => {
    const isNotTouch = !IS_TOUCH || event.type === 'wheel';
    return {
      x: isNotTouch ? event.pageX : event.touches[0].pageX,
      y: isNotTouch ? event.pageY : event.touches[0].pageY,
      clientX: isNotTouch ? event.clientX : event.touches[0].clientX,
      clientY: isNotTouch ? event.clientY : event.touches[0].clientY
    };
  }; // get transformX

  const getTransformX = target => {
    const transform = getComputedStyle(target).transform;
    let mat = transform.match(/^matrix3d\((.+)\)$/);
    if (mat) return parseFloat(mat[1].split(', ')[12]);
    mat = transform.match(/^matrix\((.+)\)$/);
    return mat ? parseFloat(mat[1].split(', ')[4]) : 0;
  }; // get transformY

  const getTransformY = target => {
    const transform = getComputedStyle(target).transform;
    let mat = transform.match(/^matrix3d\((.+)\)$/);
    if (mat) return parseFloat(mat[1].split(', ')[13]);
    mat = transform.match(/^matrix\((.+)\)$/);
    return mat ? parseFloat(mat[1].split(', ')[5]) : 0;
  }; // like .toFixed(2)

  const roundToTwo = value => {
    return +(Math.round(value + "e+2") + "e-2");
  }; // limit value

  const minmax = (value, min, max) => {
    return Math.min(Math.max(value, min), max);
  }; // first letter to uppercase

  const upperFirstLetter = value => {
    return value.charAt(0).toUpperCase() + value.slice(1);
  };

  var METHODS = {
    /**
     * get container (element) data
     * @returns {Object}
     */
    getContainerData() {
      return getNewObject(this.data.containerData);
    },

    /**
     * get image data
     * @returns {Object}
     */
    getImageData() {
      return getNewObject(this.data.imageData);
    },

    /**
     * get slider value
     * @returns {Number}
     */
    getSliderValue() {
      return this.__modules__.slider?.value;
    },

    /**
     * get now zoom ratio
     * @returns {Number}
     */
    getZoomRatio() {
      return this.ratio;
    },

    /**
     * zoom
     * zoomRatio - zoomin when pass a positive number, zoomout when pass a negative number
     * pointer - a object which return from getPoiner()
     * @param {Number, Object} 
     */
    zoom(zoomRatio, pointer) {
      const {
        image,
        data,
        options,
        ratio
      } = this;
      const {
        bounds,
        maxRatio
      } = options;
      if (bounds && ratio === 1 && zoomRatio < 0) return;
      if (maxRatio && ratio === maxRatio && zoomRatio > 0) return;
      const {
        originImageData
      } = data;
      const containerData = this.getContainerData();
      const imageData = this.getImageData();
      const imageRect = image.getBoundingClientRect();
      const calcRatio = roundToTwo(ratio * (zoomRatio + 1));
      const newRatio = bounds && calcRatio < 1 ? 1 : maxRatio && calcRatio > maxRatio ? maxRatio : calcRatio;
      const newZoomRatio = newRatio / ratio - 1;
      const newWidth = originImageData.width * newRatio;
      const newHeight = originImageData.height * newRatio;
      const newLeft = (containerData.width - newWidth) / 2;
      const newTop = (containerData.height - newHeight) / 2;
      const distanceX = pointer ? (imageData.width / 2 - pointer.clientX + imageRect.left) * newZoomRatio + getTransformX(image) : getTransformX(image);
      const distanceY = pointer ? (imageData.height / 2 - pointer.clientY + imageRect.top) * newZoomRatio + getTransformY(image) : getTransformY(image);
      const transformX = bounds ? minmax(distanceX, newLeft, -newLeft) : distanceX;
      const transformY = bounds ? minmax(distanceY, newTop, -newTop) : distanceY;
      const newData = {
        width: newWidth,
        height: newHeight,
        left: newLeft,
        top: newTop
      };
      setObject(data.imageData, newData);
      setStyle(image, { ...newData,
        transform: `translate(${transformX}px, ${transformY}px)`
      });
      this.ratio = newRatio;
      this.emit('zoom', newRatio); // if has slider

      if (options.slider) {
        const {
          slider
        } = this.__modules__;
        const ratioPercentage = roundToTwo(1 - (slider.maxRatio - newRatio) / (slider.maxRatio - 1)) * 100;
        slider.value = minmax(ratioPercentage, 0, 100);
        this.slideTo(ratioPercentage, true);
      } // if zoomer disableOnBounds


      if (options.zoomer) {
        const {
          zoomer
        } = this.__modules__;

        if (zoomer.disableOnBounds) {
          const {
            bounds
          } = options;
          const {
            zoomerInEl,
            zoomerOutEl
          } = this.__modules__.zoomer;
          bounds && this.ratio === 1 ? zoomerOutEl.classList.add(CLASS_ZOOMER_DISABLE) : zoomerOutEl.classList.remove(CLASS_ZOOMER_DISABLE);
          this.ratio === maxRatio ? zoomerInEl.classList.add(CLASS_ZOOMER_DISABLE) : zoomerInEl.classList.remove(CLASS_ZOOMER_DISABLE);
        }
      }

      return this;
    },

    /**
     * zoomTo (zoom to a specific ratio)
     * zoomRatio - zoomin when pass a number more than 1, zoomout when pass a number less than 1
     * @param {Number} 
     */
    zoomTo(zoomRatio) {
      const {
        ratio
      } = this;

      if (zoomRatio !== ratio) {
        const calcRatio = zoomRatio / ratio - 1;
        this.zoom(calcRatio);
      }

      return this;
    },

    move(x = 0, y = 0) {
      const {
        image,
        data,
        options
      } = this;
      const {
        imageData,
        dragData
      } = data;
      const {
        top,
        left
      } = imageData;
      const {
        transX,
        transY
      } = dragData;
      const {
        bounds
      } = options;
      const calcTransX = bounds ? minmax(transX - x, left, -left) : transX - x;
      const calcTransY = bounds ? minmax(transY - y, top, -top) : transY - y;
      const newTransX = roundToTwo(calcTransX);
      const newTransY = roundToTwo(calcTransY);
      setObject(dragData, {
        transX: newTransX,
        transY: newTransY
      });
      image.style.transform = `translate(${newTransX}px, ${newTransY}px)`;
      return this;
    },

    moveTo(x, y) {
      const {
        data,
        options
      } = this;
      const {
        imageData,
        dragData
      } = data;
      const {
        top,
        left
      } = imageData;
      const {
        transX,
        transY
      } = dragData;
      const {
        bounds
      } = options;
      x = x ?? Math.abs(left);
      y = y ?? Math.abs(top);
      const calcTransX = bounds ? minmax(left + x + transX, left, -left) : left + x + transX;
      const calcTransY = bounds ? minmax(top + y + transY, top, -top) : top + y + transY;
      this.move(calcTransX, calcTransY);
      return this;
    },

    /**
     * slideTo (only work on the slider)
     * value - a numer between 0-100
     * @param {Number}
     */
    slideTo(value, onlySlide) {
      const {
        __modules__
      } = this;
      if (!__modules__.slider) return;
      const {
        slider
      } = __modules__;
      const position = slider.direction === 'horizontal' ? 'left' : 'top';
      const symbol = slider.direction === 'horizontal' ? '' : '-';
      const distance = minmax(value, 0, 100);
      slider.sliderButton.style[position] = `${symbol}${distance}%`;

      if (!onlySlide) {
        const percentage = distance / 100;
        const minRatio = this.ratio < 1 ? this.ratio : 1;
        const maxRatio = this.ratio > slider.maxRatio ? this.ratio : slider.maxRatio;
        const ratio = (maxRatio - minRatio) * percentage + minRatio;
        this.zoomTo(ratio);
      }

      return this;
    },

    /**
     * reset image to initial status
     */
    reset() {
      const {
        image
      } = this;
      this.zoomTo(1);
      setStyle(image, {
        transform: 'translate(0, 0)'
      });
      this.emit('reset');
      return this;
    },

    /**
     * destory the instance of zoomist
     */
    destroy() {
      const {
        element,
        wrapper
      } = this;
      const {
        slider,
        zoomer
      } = this.__modules__;
      element[NAME] = undefined;
      this.mounted = false;
      if (slider) this.destroySlider();
      if (zoomer) this.destroyZoomer();
      wrapper.remove();
      element.style.removeProperty('width');
      element.style.removeProperty('padding-bottom');
      element.classList.remove(CLASS_CONTAINER);
      this.emit('destroy');
      return this;
    },

    /**
     * a syntactic sugar of destroy and init
     */
    update() {
      this.destroy().init();
      this.emit('update');
      return this;
    },

    /**
     * add handler on __events__
     * @param {String} events 
     * @param {Function} handler 
     */
    on(events, handler) {
      if (!isFunction(handler)) return this;
      const {
        __events__
      } = this;
      events.split(' ').forEach(evt => {
        if (!__events__[evt]) __events__[evt] = [];

        __events__[evt].push(handler);
      });
      return this;
    },

    /**
     * invoke handlers in __events__[event]
     * @param  {String, ...} args 
     */
    emit(...args) {
      const {
        __events__
      } = this;
      const event = args[0];
      const data = args.slice(1, args.length);
      if (!__events__[event]) return this;

      __events__[event].forEach(handler => {
        if (isFunction(handler)) handler.apply(this, data);
      });

      return this;
    }

  };

  var bindEvents = (zoomist => {
    const {
      element,
      wrapper,
      image,
      options,
      data
    } = zoomist;
    const {
      containerData,
      imageData,
      originImageData
    } = data; // set image size on window resize

    const resize = () => {
      if (containerData.width === element.offsetWidth) return;
      const widthRatio = element.offsetWidth / containerData.width;
      const heightRatio = element.offsetHeight / containerData.height;
      const originImageWidth = originImageData.width * widthRatio;
      const originImageHeight = originImageData.height * heightRatio;
      const originImageLeft = originImageData.left * widthRatio;
      const originImageTop = originImageData.top * heightRatio;
      const imageWidth = imageData.width * widthRatio;
      const imageHeight = imageData.height * heightRatio;
      const imageLeft = imageData.left * widthRatio;
      const imageTop = imageData.top * heightRatio;
      const transformX = getTransformX(image) * widthRatio;
      const transformY = getTransformY(image) * heightRatio;
      setObject(containerData, {
        width: element.offsetWidth,
        height: element.offsetHeight
      });
      setObject(originImageData, {
        width: originImageWidth,
        height: originImageHeight,
        left: originImageLeft,
        top: originImageTop
      });
      setObject(imageData, {
        width: imageWidth,
        height: imageHeight,
        left: imageLeft,
        top: imageTop
      });
      setStyle(zoomist.image, {
        width: imageWidth,
        height: imageHeight,
        left: imageLeft,
        top: imageTop,
        transform: `translate(${transformX}px, ${transformY}px)`
      });
      zoomist.emit('resize');
    };

    window.addEventListener(EVENT_RESIZE, resize); // set image drag event

    zoomist.dragging = false;
    zoomist.data.dragData = {
      startX: 0,
      startY: 0,
      transX: 0,
      transY: 0
    };
    if (options.fill === 'contain' && options.bounds) options.bounds = false;
    const {
      dragData
    } = data;

    const dragStart = e => {
      if (!options.draggable) return;
      if (e.which === 2 || e.which === 3) return;
      const isPinch = e.touches && e.touches.length === 2;
      setObject(dragData, {
        startX: isPinch ? (e.touches[0].pageX + e.touches[1].pageX) / 2 : getPointer(e).x,
        startY: isPinch ? (e.touches[0].pageY + e.touches[1].pageY) / 2 : getPointer(e).y,
        transX: getTransformX(image),
        transY: getTransformY(image)
      });
      zoomist.dragging = true;
      zoomist.emit('dragStart', {
        x: dragData.transX,
        y: dragData.transY
      }, e);
      document.addEventListener(EVENT_TOUCH_MOVE, dragMove);
      document.addEventListener(EVENT_TOUCH_END, dragEnd);
    };

    const dragMove = e => {
      if (!zoomist.dragging) return;
      const isPinch = e.touches && e.touches.length === 2;
      const pageX = isPinch ? (e.touches[0].pageX + e.touches[1].pageX) / 2 : getPointer(e).x;
      const pageY = isPinch ? (e.touches[0].pageY + e.touches[1].pageY) / 2 : getPointer(e).y;

      if (options.bounds) {
        const minPageX = dragData.startX - (dragData.transX - imageData.left);
        const maxPageX = dragData.startX - (dragData.transX + imageData.left);
        const minPageY = dragData.startY - (dragData.transY - imageData.top);
        const maxPageY = dragData.startY - (dragData.transY + imageData.top);
        if (pageX < minPageX) dragData.startX += pageX - minPageX;
        if (pageX > maxPageX) dragData.startX += pageX - maxPageX;
        if (pageY < minPageY) dragData.startY += pageY - minPageY;
        if (pageY > maxPageY) dragData.startY += pageY - maxPageY;
      }

      const transformX = roundToTwo(pageX - dragData.startX + dragData.transX);
      const transformY = roundToTwo(pageY - dragData.startY + dragData.transY);
      image.style.transform = `translate(${transformX}px, ${transformY}px)`;
      zoomist.emit('drag', {
        x: transformX,
        y: transformY
      }, e);
    };

    const dragEnd = e => {
      zoomist.dragging = false;
      setObject(dragData, {
        transX: getTransformX(image),
        transY: getTransformY(image)
      });
      zoomist.emit('dragEnd', {
        x: dragData.transX,
        y: dragData.transY
      }, e);
      document.removeEventListener(EVENT_TOUCH_MOVE, dragMove);
      document.removeEventListener(EVENT_TOUCH_END, dragEnd);
    }; // set image pinch event


    zoomist.pinching = false;
    zoomist.data.pinchData = {
      dist: 0,
      startX: 0,
      startY: 0
    };

    const pinchStart = e => {
      if (!options.pinchable) return;
      if (!e.touches || e.touches.length !== 2) return;
      const {
        pinchData
      } = zoomist.data;
      setObject(pinchData, {
        dist: Math.hypot(e.touches[0].pageX - e.touches[1].pageX, e.touches[0].pageY - e.touches[1].pageY),
        startX: e.touches[0].clientX,
        startY: e.touches[0].clientY
      }); // zoomist.dragging = false

      zoomist.pinching = true;
      zoomist.emit('pinchStart', e);
      document.addEventListener(EVENT_TOUCH_MOVE, pinchMove);
      document.addEventListener(EVENT_TOUCH_END, pinchEnd);
    };

    const pinchMove = e => {
      if (!zoomist.pinching) return;
      const {
        pinchData
      } = zoomist.data;
      const pinchDist = Math.hypot(e.touches[0].pageX - e.touches[1].pageX, e.touches[0].pageY - e.touches[1].pageY);
      const zoomRatio = roundToTwo((pinchDist - pinchData.dist) / 100);
      const pointer = {
        clientX: (e.touches[0].clientX + e.touches[1].clientX) / 2,
        clientY: (e.touches[0].clientY + e.touches[1].clientY) / 2
      };
      zoomist.zoom(zoomRatio, pointer);
      pinchData.dist = pinchDist;
      zoomist.emit('pinch', e);
    };

    const pinchEnd = e => {
      zoomist.pinching = false;
      zoomist.emit('pinchEnd', e);
      document.removeEventListener(EVENT_TOUCH_MOVE, pinchMove);
      document.removeEventListener(EVENT_TOUCH_END, pinchEnd);
    }; // touch start handler


    const touchStart = e => {
      dragStart(e);
      pinchStart(e);
    };

    wrapper.addEventListener(EVENT_TOUCH_START, touchStart); // set zomm on mousewheel event

    zoomist.wheeling = false;

    const wheel = e => {
      if (!options.wheelable) return;
      e.preventDefault();
      const {
        zoomRatio
      } = options;
      if (zoomist.wheeling) return; // prevent wheeling too fast

      zoomist.wheeling = true;
      setTimeout(() => {
        zoomist.wheeling = false;
      }, 30);
      let delta;
      if (e.deltaY) delta = e.deltaY > 0 ? -1 : 1;else if (e.wheelDelta) delta = e.wheelDelta / 120;else if (e.detail) delta = e.detail > 0 ? -1 : 1;
      zoomist.zoom(delta * zoomRatio, getPointer(e));
      zoomist.emit('wheel', e);
    };

    wrapper.addEventListener(EVENT_WHEEL, wheel);
  }); // slider events

  const sliderEvents = zoomist => {
    const {
      slider
    } = zoomist.__modules__; // events

    slider.sliding = false;
    const isHorizontal = slider.direction === 'horizontal';

    const slideHandler = e => {
      const rect = slider.sliderMain.getBoundingClientRect();
      const mousePoint = isHorizontal ? getPointer(e).clientX : -getPointer(e).clientY;
      const sliderTotal = isHorizontal ? rect.width : rect.height;
      const sliderStart = isHorizontal ? rect.left : -rect.bottom;
      const percentage = minmax(roundToTwo((mousePoint - sliderStart) / sliderTotal), 0, 1);
      const minRatio = zoomist.ratio < 1 ? zoomist.ratio : 1;
      const maxRatio = zoomist.ratio > slider.maxRatio ? zoomist.ratio : slider.maxRatio;
      const ratio = (maxRatio - minRatio) * percentage + minRatio;
      zoomist.zoomTo(ratio);
    };

    const slideStart = e => {
      slideHandler(e);
      slider.sliding = true;
      zoomist.emit('slideStart', zoomist.getSliderValue(), e);
      document.addEventListener(EVENT_TOUCH_MOVE, slideMove);
      document.addEventListener(EVENT_TOUCH_END, slideEnd);
    };

    const slideMove = e => {
      if (!slider.sliding) return;
      slideHandler(e);
      zoomist.emit('slide', zoomist.getSliderValue(), e);
    };

    const slideEnd = e => {
      slider.sliding = false;
      zoomist.emit('slideEnd', zoomist.getSliderValue(), e);
      document.removeEventListener(EVENT_TOUCH_MOVE, slideMove);
      document.removeEventListener(EVENT_TOUCH_END, slideEnd);
    };

    slider.sliderMain.addEventListener(EVENT_TOUCH_START, slideStart);
    slider.sliderMain.event = slideStart;
  }; // zoomer events

  const zoomerEvents = zoomist => {
    const {
      zoomRatio
    } = zoomist.options;
    const {
      zoomer
    } = zoomist.__modules__;

    const zoomInHandler = () => zoomist.zoom(zoomRatio);

    const zoomOutHandler = () => zoomist.zoom(-zoomRatio);

    zoomer.zoomerInEl.addEventListener('click', zoomInHandler);
    zoomer.zoomerOutEl.addEventListener('click', zoomOutHandler);
    zoomer.zoomerInEl.event = zoomInHandler;
    zoomer.zoomerOutEl.event = zoomOutHandler;
  };

  const sliderTemp = `
  <div class="${CLASS_SLIDER_MAIN}">
    <span class="${CLASS_SLIDER_BAR}"></span>
    <span class="${CLASS_SLIDER_BUTTON}"></span>
  </div>
`;
  const inZoomerIcon = `
<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 12 12">
  <polygon points="12,5.5 6.5,5.5 6.5,0 5.5,0 5.5,5.5 0,5.5 0,6.5 5.5,6.5 5.5,12 6.5,12 6.5,6.5 12,6.5 "/>
</svg>
`;
  const outZoomerIcon = `
<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 12 12">
  <rect y="5.5" width="12" height="1"/>
</svg>
`;

  var MODULES = {
    /**
     * create all modules
     */
    createModules() {
      const {
        options
      } = this;
      this.__modules__ = {};
      MODULES$1.forEach(module => {
        if (options[module]) this[`create${upperFirstLetter(module)}`]();
      });
    },

    /**
     * create slider module
     */
    createSlider() {
      const {
        element,
        options,
        __modules__
      } = this;
      __modules__.slider = Object.assign({}, DEFAULT_SLIDER_OPTIONS, options.slider);
      const {
        slider
      } = __modules__;
      if (options.maxRatio) Object.assign(slider, {
        maxRatio: options.maxRatio
      });
      if (slider.direction !== 'horizontal' && slider.direction !== 'vertical') slider.direction = 'horizontal';
      slider.value = 0; // mount

      if (slider.mounted) slider.sliderMain.remove();
      const isCustomEl = slider.isCustomEl = slider.el && isElementExist(slider.el);
      const sliderEl = isCustomEl ? getElement(slider.el) : document.createElement('div');
      if (!isCustomEl) sliderEl.classList.add(CLASS_SLIDER);
      sliderEl.innerHTML = sliderTemp;
      slider.sliderEl = sliderEl;
      slider.sliderMain = sliderEl.querySelector(`.${CLASS_SLIDER_MAIN}`);
      slider.sliderBar = sliderEl.querySelector(`.${CLASS_SLIDER_BAR}`);
      slider.sliderButton = sliderEl.querySelector(`.${CLASS_SLIDER_BUTTON}`);
      slider.sliderMain.classList.add(`${CLASS_SLIDER}-${slider.direction}`); // events

      sliderEvents(this);
      slider.mounted = true; // render

      if (!isCustomEl) element.append(sliderEl);
    },

    /**
     * destroy slider module
     */
    destroySlider() {
      const {
        slider
      } = this.__modules__;
      if (!slider || !slider.mounted) return;
      if (slider.isCustomEl) slider.sliderMain.remove();else slider.sliderEl.remove();
      slider.mounted = false;
    },

    /**
     * create zoomer module
     */
    createZoomer() {
      const {
        element,
        options,
        __modules__
      } = this;
      __modules__.zoomer = Object.assign({}, DEFAULT_ZOOMER_OPTIONS, options.zoomer);
      const {
        zoomer
      } = __modules__; // mount

      if (zoomer.mounted && zoomer.zoomerEl) zoomer.sliderMain.remove();
      const isCustomInEl = zoomer.isCustomInEl = zoomer.inEl && isElementExist(zoomer.inEl);
      const isCustomOutEl = zoomer.isCustomOutEl = zoomer.outEl && isElementExist(zoomer.outEl);
      const zoomerInEl = isCustomInEl ? getElement(zoomer.inEl) : document.createElement('div');
      const zoomerOutEl = isCustomOutEl ? getElement(zoomer.outEl) : document.createElement('div');

      if (!isCustomInEl) {
        zoomerInEl.classList.add(CLASS_ZOOMER_IN);
        zoomerInEl.innerHTML = inZoomerIcon;
      }

      if (!isCustomOutEl) {
        zoomerOutEl.classList.add(CLASS_ZOOMER_OUT);
        zoomerOutEl.innerHTML = outZoomerIcon;
      }

      zoomer.zoomerInEl = zoomerInEl;
      zoomer.zoomerOutEl = zoomerOutEl;

      if (zoomer.disableOnBounds) {
        const {
          bounds,
          maxRatio
        } = options;
        if (bounds && this.ratio === 1) zoomerOutEl.classList.add(CLASS_ZOOMER_DISABLE);
        if (this.ratio === maxRatio) zoomerInEl.classList.add(CLASS_ZOOMER_DISABLE);
      } // events


      zoomerEvents(this);
      zoomer.mounted = true; // render

      if (!isCustomInEl || !isCustomOutEl) {
        const zoomerEl = document.createElement('div');
        zoomerEl.classList.add(CLASS_ZOOMER);
        if (!isCustomInEl) zoomerEl.append(zoomerInEl);
        if (!isCustomOutEl) zoomerEl.append(zoomerOutEl);
        zoomer.zoomerEl = zoomerEl;
        element.append(zoomerEl);
      }
    },

    /**
     * destroy zoomer module
     */
    destroyZoomer() {
      const {
        zoomer
      } = this.__modules__;
      if (!zoomer || !zoomer.mounted) return;

      const unbindZoomer = target => {
        target.removeEventListener('click', target.event);
        target.event = undefined;
        target.classList.remove(CLASS_ZOOMER_DISABLE);
      };

      if (zoomer.isCustomInEl) unbindZoomer(zoomer.zoomerInEl);else zoomer.zoomerInEl.remove();
      if (zoomer.isCustomOutEl) unbindZoomer(zoomer.zoomerOutEl);else zoomer.zoomerOutEl.remove();
      if (zoomer.zoomerEl) zoomer.zoomerEl.remove();
      zoomer.mounted = false;
    }

  };

  class Zoomist {
    /**
     * 
     * @param {Element} element - target element 
     * @param {Object} options - the configuration options
     */
    constructor(element, options = {}) {
      if (!element) throw new Error('The first argument is required.');
      if (!isElementExist(element)) throw new Error('This element is not exist.');
      this.element = getElement(element);
      this.options = Object.assign({}, DEFAULT_OPTIONS, isPlainObject(options) && options);
      this.init();
    }

    init() {
      const {
        element,
        options
      } = this;
      const {
        src
      } = options;
      if (element[NAME]) return;
      element[NAME] = this;
      const source = options.src = isString(src) || isImg(src) ? src : DEFAULT_OPTIONS.src;
      const url = isImg(source) ? source.src : element.getAttribute(source);
      if (!url) throw new Error(`Cannot find src from ${source}`);
      this.create(url);
    }

    create(url) {
      if (!url) return;
      const {
        options
      } = this;
      this.url = url;
      this.data = {};
      this.ratio = 1;
      this.__events__ = EVENTS;

      if (options.on) {
        for (const [k, v] of Object.entries(options.on)) {
          this.__events__[k] = [v];
        }
      }

      this.mount();
    }

    mount() {
      if (this.mounted) return;
      const {
        element,
        options,
        data,
        url
      } = this;
      const {
        fill,
        maxRatio,
        height
      } = options;
      if (this.wrapper) this.wrapper.remove();
      const wrapper = document.createElement('div');
      wrapper.classList.add(CLASS_WRAPPER);
      const image = document.createElement('img');
      image.classList.add(CLASS_IMAGE);
      image.src = url;

      image.onload = () => {
        this.wrapper = wrapper;
        this.image = image;
        const {
          naturalWidth,
          naturalHeight
        } = image;
        const imageRatio = naturalWidth / naturalHeight; // set container height

        if (height) {
          setStyle(element, {
            width: '100%'
          });
          if (height === 'auto') setStyle(element, {
            paddingBottom: `${roundToTwo(naturalHeight / naturalWidth * 100)}%`
          });else if (isNumber(height)) setStyle(element, {
            height: height
          });else if (isPercentage(height)) setStyle(element, {
            paddingBottom: height
          });
        }

        const {
          offsetWidth,
          offsetHeight
        } = element;
        this.data.containerData = {
          width: offsetWidth,
          height: offsetHeight,
          aspectRatio: offsetWidth / offsetHeight
        }; // get base on width or height

        const {
          containerData
        } = data;
        let baseSide;
        if (fill !== 'cover' && fill !== 'contain' && fill !== 'none') options.fill = 'cover';
        if (options.fill !== 'contain') baseSide = containerData.aspectRatio === imageRatio ? 'both' : containerData.aspectRatio > imageRatio ? 'width' : 'height';
        if (options.fill === 'contain') baseSide = containerData.aspectRatio === imageRatio ? 'both' : containerData.aspectRatio > imageRatio ? 'height' : 'width'; // calculate the image width, height, left, top

        const imageWidth = options.fill === 'none' ? naturalWidth : baseSide === 'both' || baseSide === 'width' ? containerData.width : containerData.height * imageRatio;
        const imageHeight = options.fill === 'none' ? naturalHeight : baseSide === 'both' || baseSide === 'height' ? containerData.height : containerData.width / imageRatio;
        const imageLeft = (containerData.width - imageWidth) / 2;
        const imageTop = (containerData.height - imageHeight) / 2;
        this.data.originImageData = {
          naturalWidth,
          naturalHeight,
          aspectRatio: imageRatio,
          width: imageWidth,
          height: imageHeight,
          left: imageLeft,
          top: imageTop
        };
        this.data.imageData = Object.assign({}, this.data.originImageData);
        setStyle(image, {
          width: imageWidth,
          height: imageHeight,
          left: imageLeft,
          top: imageTop
        }); // if has maxRatio

        if ((!isNumber(maxRatio) || maxRatio <= 1) && maxRatio !== false) options.maxRatio = false;
        bindEvents(this);
        this.mounted = true;
        this.render();
      };
    }

    render() {
      const {
        element,
        wrapper,
        image
      } = this;
      element.classList.add(CLASS_CONTAINER);
      wrapper.append(image);
      element.append(wrapper);
      this.createModules();
      this.emit('ready');
    }

  }

  Object.assign(Zoomist.prototype, METHODS, MODULES);

  return Zoomist;

}));
