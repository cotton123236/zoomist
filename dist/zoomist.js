/*!
 * zoomist.js v1.0.0
 * https://github.com/cotton123236/zoomist#readme
 *
 * Copyright 2021-present Wilson Wu
 * Released under the MIT license
 *
 * Date: 2021-11-02T14:21:20.260Z
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Zoomist = factory());
})(this, (function () { 'use strict';

  var DEFAULT_OPTIONS = {
    fill: 'cover',
    src: 'data-zoomist-src',
    wheel: true
  };

  const NAME = 'zoomist';
  const CLASS_CONTAINER = `${NAME}-container`;
  const CLASS_IMAGE = `${NAME}-image`;

  var methods = {
    getContainerData() {
      return this.data.container;
    },

    getImageData() {
      return this.data.image;
    }

  };

  // check value is a object and not null
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
  };

  var bindEvents = (zoomist => {
    const {
      element,
      data
    } = zoomist;
    const {
      container,
      image
    } = data;
    window.addEventListener('resize', function () {
      const containerWidthRatio = element.offsetWidth / container.width;
      const containerHeightRatio = element.offsetHeight / container.height;
      const imageWidth = image.width * containerWidthRatio;
      const imageHeight = image.height * containerHeightRatio;
      const imageLeft = image.left * containerWidthRatio;
      const imageTop = image.top * containerHeightRatio;
      container.width = element.offsetWidth;
      container.height = element.offsetHeight;
      image.width = imageWidth;
      image.height = imageHeight;
      image.left = imageLeft;
      image.top = imageTop;
      setStyle(zoomist.image, {
        width: imageWidth,
        height: imageHeight,
        left: imageLeft,
        top: imageTop
      });
    });
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
      this.data.container = {
        width: offsetWidth,
        height: offsetHeight,
        ratio: offsetWidth / offsetHeight
      };
      this.mount();
    }

    mount() {
      if (this.mounted) return;
      const {
        url,
        data,
        options
      } = this;
      const {
        container
      } = data;
      const {
        fill
      } = options;
      const image = document.createElement('img');
      image.classList.add(CLASS_IMAGE);
      image.src = url;
      const {
        naturalWidth,
        naturalHeight
      } = image;
      const imageRatio = naturalWidth / naturalHeight;
      let baseSide;
      if (fill !== 'cover' && fill !== 'contain' && fill !== 'none') options.fill = 'cover';
      if (options.fill === 'cover') baseSide = data.container.ratio === imageRatio ? 'both' : data.container.ratio > imageRatio ? 'width' : 'height';
      if (options.fill === 'contain') baseSide = data.container.ratio === imageRatio ? 'both' : data.container.ratio > imageRatio ? 'height' : 'width';
      console.log(options.fill, baseSide);
      const imageWidth = options.fill === 'none' ? naturalWidth : baseSide === 'both' || baseSide === 'width' ? container.width : container.height * imageRatio;
      const imageHeight = options.fill === 'none' ? naturalHeight : baseSide === 'both' || baseSide === 'height' ? container.height : container.width / imageRatio;
      const imageLeft = (container.width - imageWidth) / 2;
      const imageTop = (container.height - imageHeight) / 2;
      this.data.image = {
        naturalWidth,
        naturalHeight,
        width: imageWidth,
        height: imageHeight,
        ratio: imageRatio,
        left: imageLeft,
        top: imageTop
      };
      setStyle(image, {
        width: imageWidth,
        height: imageHeight,
        left: imageLeft,
        top: imageTop
      });
      this.image = image;
      bindEvents(this);
      this.mounted = true;
      this.render();
    }

    render() {
      const {
        element,
        image
      } = this;
      element.classList.add(CLASS_CONTAINER);
      element.append(image);
    }

  }

  Object.assign(Zoomist.prototype, methods);

  return Zoomist;

}));
