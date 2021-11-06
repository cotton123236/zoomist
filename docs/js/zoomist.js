/*!
 * zoomist.js v1.0.0
 * https://github.com/cotton123236/zoomist#readme
 *
 * Copyright 2021-present Wilson Wu
 * Released under the MIT license
 *
 * Date: 2021-11-06T10:00:44.282Z
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Zoomist = factory());
})(this, (function () { 'use strict';

  var DEFAULT_OPTIONS = {
    fill: 'cover',
    src: 'data-zoomist-src',
    wheelable: true,
    draggable: true,
    bounds: true,
    zoomRatio: 0.1,
    maxRatio: false
  };

  const NAME = 'zoomist';
  const CLASS_CONTAINER = `${NAME}-container`;
  const CLASS_IMAGE = `${NAME}-image`;
  const IS_BROWSER = typeof window !== 'undefined' && typeof window.document !== 'undefined';
  const IS_TOUCH = IS_BROWSER && window.document.documentElement ? 'ontouchstart' in window.document.documentElement : false;
  const EVENT_TOUCH_START = IS_TOUCH ? 'touchstart' : 'mousedown';
  const EVENT_TOUCH_MOVE = IS_TOUCH ? 'touchmove' : 'mousemove';
  const EVENT_TOUCH_END = IS_TOUCH ? 'touchend touchcancel' : 'mouseup';
  const EVENT_RESIZE = 'resize';
  const EVENT_WHEEL = 'wheel';

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

  const setStyle = (element, obj) => {
    for (const [k, v] of Object.entries(obj)) {
      element.style[k] = isNumber(v) ? `${v}px` : v;
    }
  }; // get mouse pageX and pageY

  const getPointer = event => {
    return {
      x: !IS_TOUCH ? event.pageX : event.touches[0].pageX,
      y: !IS_TOUCH ? event.pageY : event.touches[0].pageY,
      clientX: !IS_TOUCH ? event.clientX : event.touches[0].clientX,
      clientY: !IS_TOUCH ? event.clientY : event.touches[0].clientY
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
  };
  const minmax = (value, min, max) => {
    return Math.min(Math.max(value, min), max);
  };

  var methods = {
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
     * zoom
     * @param {Number} 
     */
    zoom(ratio, pointer) {
      const {
        image,
        data,
        options
      } = this;
      const {
        originImageData,
        maxImageData
      } = data;
      const containerData = this.getContainerData();
      const imageData = this.getImageData();
      const imageRect = image.getBoundingClientRect();
      const calcWidth = imageData.width * (ratio + 1);
      const calcHeight = imageData.height * (ratio + 1);
      const isInBounds = options.bounds && calcWidth <= originImageData.width;
      const isOverMax = options.maxRatio && calcWidth >= maxImageData.width;
      const newWidth = isInBounds ? originImageData.width : isOverMax ? maxImageData.width : calcWidth;
      const newHeight = isInBounds ? originImageData.height : isOverMax ? maxImageData.height : calcHeight;
      const newLeft = isInBounds ? originImageData.left : isOverMax ? maxImageData.left : (containerData.width - calcWidth) / 2;
      const newTop = isInBounds ? originImageData.top : isOverMax ? maxImageData.top : (containerData.height - calcHeight) / 2;
      const distanceX = pointer ? (imageData.width / 2 - pointer.clientX + imageRect.left) * ratio + getTransformX(image) : 0;
      const distanceY = pointer ? (imageData.height / 2 - pointer.clientY + imageRect.top) * ratio + getTransformY(image) : 0;
      const transformX = options.bounds ? minmax(distanceX, newLeft, -newLeft) : distanceX;
      const transformY = options.bounds ? minmax(distanceY, newTop, -newTop) : distanceY;
      const newData = {
        width: newWidth,
        height: newHeight,
        left: newLeft,
        top: newTop
      };
      setObject(data.imageData, newData);
      setStyle(image, Object.assign({}, newData, {
        transform: `translate(${transformX}px, ${transformY}px)`
      }));
    }

  };

  var bindEvents = (zoomist => {
    const {
      element,
      image,
      options,
      data
    } = zoomist;
    const {
      containerData,
      imageData,
      originImageData,
      maxImageData
    } = data; // set image size on window resize

    const resize = () => {
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

      if (maxImageData) {
        const maxImageWidth = maxImageData.width * widthRatio;
        const maxImageHeight = maxImageData.height * heightRatio;
        const maxImageLeft = maxImageData.left * widthRatio;
        const maxImageTop = maxImageData.top * heightRatio;
        setObject(maxImageData, {
          width: maxImageWidth,
          height: maxImageHeight,
          left: maxImageLeft,
          top: maxImageTop
        });
      }
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

    const dragstart = e => {
      if (!options.draggable) return;
      setObject(dragData, {
        startX: getPointer(e).x,
        startY: getPointer(e).y,
        transX: getTransformX(image),
        transY: getTransformY(image)
      });
      zoomist.dragging = true;
      document.addEventListener(EVENT_TOUCH_MOVE, dragging);
      document.addEventListener(EVENT_TOUCH_END, dragend);
    };

    const dragging = e => {
      if (!zoomist.dragging) return;
      const pageX = getPointer(e).x;
      const pageY = getPointer(e).y;

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

      const transformX = pageX - dragData.startX + dragData.transX;
      const transformY = pageY - dragData.startY + dragData.transY;
      image.style.transform = `translate(${transformX}px, ${transformY}px)`;
    };

    const dragend = () => {
      zoomist.dragging = false;
      document.removeEventListener(EVENT_TOUCH_MOVE, dragging);
      document.removeEventListener(EVENT_TOUCH_END, dragend);
    };

    element.addEventListener(EVENT_TOUCH_START, dragstart); // set zomm on mousewheel event

    zoomist.wheeling = false;

    const wheel = e => {
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
    };

    element.addEventListener(EVENT_WHEEL, wheel);
  });

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
      if (element[NAME]) return;
      element[NAME] = this;
      const src = options.src = isString(options.src) ? options.src : DEFAULT_OPTIONS.src;
      const url = element.getAttribute(src);
      element.removeAttribute(src);
      this.create(url);
    }

    create(url) {
      if (!url) return;
      const {
        element
      } = this;
      const {
        offsetWidth,
        offsetHeight
      } = element;
      this.url = url;
      this.data = {};
      this.data.containerData = {
        width: offsetWidth,
        height: offsetHeight,
        ratio: offsetWidth / offsetHeight
      };
      this.mount();
    }

    mount() {
      if (this.mounted) return;
      const {
        options,
        data,
        url
      } = this;
      const {
        containerData
      } = data;
      const {
        fill,
        maxRatio
      } = options;
      if (this.image) this.image.remove();
      const image = document.createElement('img');
      image.classList.add(CLASS_IMAGE);
      image.src = url;

      image.onload = () => {
        this.image = image;
        const {
          naturalWidth,
          naturalHeight
        } = image;
        const imageRatio = naturalWidth / naturalHeight; // get base on width or height

        let baseSide;
        if (fill !== 'cover' && fill !== 'contain' && fill !== 'none') options.fill = 'cover';
        if (options.fill === 'cover') baseSide = containerData.ratio === imageRatio ? 'both' : containerData.ratio > imageRatio ? 'width' : 'height';
        if (options.fill === 'contain') baseSide = containerData.ratio === imageRatio ? 'both' : containerData.ratio > imageRatio ? 'height' : 'width'; // calculate the image width, height, left, top

        const imageWidth = options.fill === 'none' ? naturalWidth : baseSide === 'both' || baseSide === 'width' ? containerData.width : containerData.height * imageRatio;
        const imageHeight = options.fill === 'none' ? naturalHeight : baseSide === 'both' || baseSide === 'height' ? containerData.height : containerData.width / imageRatio;
        const imageLeft = (containerData.width - imageWidth) / 2;
        const imageTop = (containerData.height - imageHeight) / 2;
        this.data.originImageData = {
          naturalWidth,
          naturalHeight,
          width: imageWidth,
          height: imageHeight,
          ratio: imageRatio,
          left: imageLeft,
          top: imageTop
        };
        this.data.imageData = Object.assign({}, this.data.originImageData); // if has maxRatio

        if ((!isNumber(maxRatio) || maxRatio <= 1) && maxRatio !== false) options.maxRatio = false;

        if (options.maxRatio) {
          const {
            maxRatio
          } = options;
          this.data.maxImageData = {
            width: imageWidth * maxRatio,
            height: imageHeight * maxRatio,
            left: (containerData.width - imageWidth * maxRatio) / 2,
            top: (containerData.height - imageHeight * maxRatio) / 2
          };
        }

        setStyle(image, {
          width: imageWidth,
          height: imageHeight,
          left: imageLeft,
          top: imageTop
        });
        bindEvents(this);
        this.mounted = true;
        this.render();
      };
    }

    render() {
      const {
        element,
        image,
        options
      } = this;
      element.classList.add(CLASS_CONTAINER);
      element.append(image); // if (options.slider) 
    }

  }

  Object.assign(Zoomist.prototype, methods);

  return Zoomist;

}));
