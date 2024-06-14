var Zt = Object.defineProperty;
var Vt = (s, t, e) => t in s ? Zt(s, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : s[t] = e;
var T = (s, t, e) => (Vt(s, typeof t != "symbol" ? t + "" : t, e), e), Ut = (s, t, e) => {
  if (!t.has(s))
    throw TypeError("Cannot " + e);
};
var b = (s, t, e) => {
  if (t.has(s))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(s) : t.set(s, e);
};
var O = (s, t, e) => (Ut(s, t, "access private method"), e);
const ot = (s) => document.contains(U(s)), Yt = (s) => {
  if (!s)
    return !1;
  try {
    const { constructor: t } = s, { prototype: e } = t, { hasOwnProperty: n } = Object.prototype;
    return t && e && n.call(e, "isPrototypeOf");
  } catch {
    return !1;
  }
}, St = (s) => typeof s == "function", B = (s) => !isNaN(Number(s)), at = (s) => s == null, U = (s) => s instanceof HTMLElement ? s : document.querySelector(s), rt = (s, t) => t ? s.closest(`.${t}`) : null, w = (s) => {
  const t = "touches" in s ? s.touches[0] : s;
  return {
    clientX: t.clientX,
    clientY: t.clientY
  };
}, W = (s) => ({
  clientX: [...s].map((t) => t.clientX).reduce((t, e) => t + e) / s.length,
  clientY: [...s].map((t) => t.clientY).reduce((t, e) => t + e) / s.length
}), X = (s) => {
  const { width: t, height: e, top: n, left: i, bottom: r } = s.getBoundingClientRect();
  return {
    width: t,
    height: e,
    top: n,
    left: i,
    bottom: r
  };
}, bt = (s) => s.length >= 2 ? Math.hypot(s[0].clientX - s[1].clientX, s[0].clientY - s[1].clientY) : 0, M = (s, t) => {
  for (const [e, n] of Object.entries(t))
    typeof n == "string" && s.style.setProperty(e, n);
}, I = (s, t) => {
  for (const [e, n] of Object.entries(t))
    s.setAttribute(e, n);
}, v = (s, t) => {
  for (const [e, n] of Object.entries(t))
    s[e] = n;
}, R = (s, t, e) => Math.min(Math.max(s, t), e), D = (s) => {
  const t = +(Math.round(+(s + "e+2")) + "e-2");
  return isNaN(t) ? 0 : t;
}, Ot = (s) => {
  throw new Error(s);
}, lt = (s) => console.warn(s), C = (s = "div", t, e, n) => {
  const i = document.createElement(s);
  return t && i.classList.add(...t.split(" ")), e && I(i, e), n && (i.innerHTML = n), i;
}, p = "zoomist", kt = `${p}-container`, vt = `${p}-wrapper`, ct = `${p}-image`, Gt = `${p}-not-draggable`, jt = `${p}-not-wheelable`, x = `${p}-slider`, Pt = `${p}-slider-wrapper`, Ft = `${p}-slider-bar`, qt = `${p}-slider-button`, k = `${p}-zoomer`, Kt = `${p}-zoomer-button`, mt = `${p}-zoomer-icon`, ht = `${p}-zoomer-in`, dt = `${p}-zoomer-out`, ut = `${p}-zoomer-reset`, Jt = `${p}-zoomer-disabled`, Qt = {
  tabindex: "0",
  role: "slider",
  "aria-label": "slider for zoomist",
  "aria-valuemin": "0",
  "aria-valuemax": "100",
  "aria-valuenow": "0",
  "aria-disabled": "false"
}, ft = {
  tabindex: "0",
  role: "button",
  type: "button",
  "aria-disabled": "false"
}, te = {
  ...ft,
  "aria-label": "button for zoom in zoomist"
}, ee = {
  ...ft,
  "aria-label": "button for zoom out zoomist"
}, se = {
  ...ft,
  "aria-label": "button for reset zoomist scale"
}, ne = typeof window < "u" && typeof window.document < "u", L = ne && "ontouchstart" in window, ie = L ? "touchstart" : "mousedown", H = L ? "touchmove" : "mousemove", Z = L ? "touchend" : "mouseup", oe = "wheel", ae = ["left", "right", "center"], re = ["top", "bottom", "center"], Tt = "--scale", Dt = "--translate-x", wt = "--translate-y", le = "--value", Xt = {
  // set is draggable or not
  draggable: !0,
  // set is wheelable or not
  wheelable: !0,
  // set is pinchable or not
  pinchable: !0,
  // set image stuck on bounds
  bounds: !0,
  // the ratio of zooming at one time
  zoomRatio: 0.1,
  // the max scale of zoomist-image (must be number larger then initScale)
  maxScale: 10,
  // the min scale of zoomist-image (must be number smaller then initScale)
  minScale: 1,
  // set initial scale of zoomist-image
  initScale: null,
  // if set to true, enable to release touch events to allow for further page scrolling when .zoomist-image is on bounds.
  dragReleaseOnBounds: !1,
  // if set to true, enable to release wheel events to allow for further page scrolling when .zoomist-image is on mixScale or maxScale.
  wheelReleaseOnMinMax: !1,
  // elements matched this class will not be dragged.
  disableDraggingClass: Gt,
  // elements matched this class will not be zoomed by mouse wheel.
  disableWheelingClass: jt
}, ce = {
  // the css selector string or a element of the slider
  el: null,
  // the direction of the slider 'horizontal' or 'vertical'
  direction: "horizontal"
}, he = {
  el: `.${x}`
}, de = {
  el: null,
  // the css selector string or a element for in-zoomer
  inEl: null,
  // the css selector string or a element for out-zoomer
  outEl: null,
  // the css selector string or a element for reset-zoomer
  resetEl: null,
  // in zoomer and out zoomer will be disabled when image comes to maximin or minimum
  disabledClass: Jt
}, ue = {
  el: `.${k}`,
  inEl: `.${ht}`,
  outEl: `.${dt}`,
  resetEl: `.${ut}`
}, me = {
  // invoked when zoomist instance ready
  ready: null,
  // invoked when reset methods be used
  reset: null,
  // invoked when image changes it's size
  resize: null,
  // invoked before destroy methods be used
  beforeDestroy: null,
  // invoked after destroy methods be used
  destroy: null,
  // invoked before update methods be used
  beforeUpdate: null,
  // invoked when update methods be used
  update: null,
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
  slideEnd: null
}, fe = {
  // slider options
  slider: null,
  // zoomer options
  zoomer: null
}, ge = `
<svg viewBox="0 0 12 12" class="${mt}">
  <polygon points="12,5.5 6.5,5.5 6.5,0 5.5,0 5.5,5.5 0,5.5 0,6.5 5.5,6.5 5.5,12 6.5,12 6.5,6.5 12,6.5 "/>
</svg>
`, _e = `
<svg viewBox="0 0 12 12" class="${mt}">
  <rect y="5.5" width="12" height="1"/>
</svg>
`, pe = `
<svg viewBox="0 0 12 12" class="${mt}">
  <path d="m7.45,1.27l.35-.22c.26-.17.34-.52.17-.78-.17-.27-.52-.34-.78-.17l-1.54.99-.19.13-.11.46,1.12,1.75c.11.17.29.26.48.26.1,0,.21-.03.31-.09.26-.17.34-.52.17-.78l-.29-.46c1.85.5,3.22,2.17,3.22,4.18,0,2.39-1.95,4.34-4.34,4.34S1.66,8.92,1.66,6.52c0-1.15.44-2.23,1.25-3.05.22-.22.22-.58,0-.8-.22-.22-.58-.22-.8,0-1.02,1.03-1.58,2.4-1.58,3.85,0,3.02,2.46,5.48,5.48,5.48s5.48-2.46,5.48-5.48c0-2.51-1.71-4.62-4.02-5.26Z"/>
</svg>
`, Ee = {
  on(s, t) {
    if (!t || !St(t))
      return this;
    const { __events__: e } = this;
    return s.split(" ").forEach((n) => {
      const i = n;
      e[i] || (e[i] = []), e[i].push(t);
    }), this;
  },
  emit(s, ...t) {
    const { __events__: e } = this;
    return e[s] ? (e[s].forEach((n) => {
      St(n) && n.apply(this, t);
    }), this) : this;
  },
  zoom(s, t) {
    const { scale: e } = this.transform, n = this.useFixedRatio(D(e * (s + 1)));
    return e === n ? this : (this.zoomTo(n, t), this);
  },
  zoomTo(s, t = !0) {
    const { image: e, transform: { scale: n, translateX: i, translateY: r }, options: { bounds: a } } = this;
    if (s = this.useFixedRatio(s), s === n)
      return this;
    if (this.transform.scale = s, !t)
      return this.emit("zoom", this, this.transform.scale), this;
    t = typeof t == "boolean" ? this.getContainerCenterClient() : t;
    const { clientX: c, clientY: l } = t, { top: d, left: o, width: h, height: m } = X(e), { width: u, height: f } = this.getImageDiff(), E = s / n - 1, _ = (h / 2 - c + o) * E + i, g = (m / 2 - l + d) * E + r, S = a ? R(_, u, -u) : _, Y = a ? R(g, f, -f) : g;
    return v(this.transform, {
      translateX: S,
      translateY: Y
    }), this.emit("zoom", this, this.transform.scale), this;
  },
  move(s) {
    const { options: { bounds: t }, transform: { translateX: e, translateY: n } } = this, { x: i, y: r } = s, { width: a, height: c } = this.getImageDiff();
    if (B(i)) {
      const l = e + i, d = t ? R(l, a, -a) : l;
      this.transform.translateX = d;
    }
    if (B(r)) {
      const l = n + r, d = t ? R(l, c, -c) : l;
      this.transform.translateY = d;
    }
    return this;
  },
  moveTo(s) {
    const { options: { bounds: t } } = this, { x: e, y: n } = s, { width: i, height: r } = this.getImageDiff();
    if (B(e)) {
      const a = Number(e), c = t ? R(a, i, -i) : a;
      this.transform.translateX = c;
    }
    if (ae.some((a) => a === e)) {
      const c = {
        left: -i,
        right: i,
        center: 0
      }[e];
      this.transform.translateX = c;
    }
    if (B(n)) {
      const a = Number(n), c = t ? R(a, r, -r) : a;
      this.transform.translateY = c;
    }
    if (re.some((a) => a === n)) {
      const c = {
        top: -r,
        bottom: r,
        center: 0
      }[n];
      this.transform.translateY = c;
    }
    return this;
  },
  slideTo(s) {
    const { options: { minScale: t, maxScale: e } } = this, n = (e - t) * s / 100 + t;
    return this.zoomTo(n), this;
  },
  reset() {
    const { options: { initScale: s } } = this;
    return v(this.transform, {
      scale: s,
      translateX: 0,
      translateY: 0
    }), this.emit("reset", this), this;
  },
  destroy(s = !1) {
    const { element: t, image: e, controller: n } = this;
    return this.mounted && (this.emit("beforeDestroy", this), n.abort(), this.destroyModules(), s && e && (this.reset(), e.removeAttribute("style")), t[p] = null, this.mounted = !1, this.emit("destroy", this)), null;
  },
  update(s) {
    const { element: t, controller: e } = this;
    return this.emit("beforeUpdate", this), t[p] = null, this.mounted = !1, e.abort(), this.destroyModules(), s && (this.options = Object.assign({}, Xt, Yt(s) && s)), this.init(), this.emit("update", this), this;
  },
  getImageData() {
    return { ...this.data.imageData };
  },
  getContainerData() {
    return { ...this.data.containerData };
  },
  getSliderValue() {
    const { __modules__: { slider: s } } = this;
    return s && s.value !== void 0 ? s.value : null;
  },
  isOnBoundTop() {
    const { options: { bounds: s } } = this;
    if (!s)
      return !1;
    const { transform: { translateY: t } } = this, { height: e } = this.getImageDiff();
    return t * -1 === D(e);
  },
  isOnBoundBottom() {
    const { options: { bounds: s } } = this;
    if (!s)
      return !1;
    const { transform: { translateY: t } } = this, { height: e } = this.getImageDiff();
    return t === D(e);
  },
  isOnBoundLeft() {
    const { options: { bounds: s } } = this;
    if (!s)
      return !1;
    const { transform: { translateX: t } } = this, { width: e } = this.getImageDiff();
    return t * -1 === D(e);
  },
  isOnBoundRight() {
    const { options: { bounds: s } } = this;
    if (!s)
      return !1;
    const { transform: { translateX: t } } = this, { width: e } = this.getImageDiff();
    return t === D(e);
  },
  isOnBoundX() {
    const { options: { bounds: s } } = this;
    if (!s)
      return !1;
    const { transform: { translateX: t } } = this, { width: e } = this.getImageDiff();
    return Math.abs(t) === Math.abs(D(e));
  },
  isOnBoundY() {
    const { options: { bounds: s } } = this;
    if (!s)
      return !1;
    const { transform: { translateY: t } } = this, { height: e } = this.getImageDiff();
    return Math.abs(t) === Math.abs(D(e));
  },
  isOnMinScale() {
    const { options: { minScale: s } } = this, { transform: { scale: t } } = this;
    return t === s;
  },
  isOnMaxScale() {
    const { options: { maxScale: s } } = this, { transform: { scale: t } } = this;
    return t === s;
  },
  // private methods
  getImageDiff() {
    const { width: s, height: t } = this.getContainerData(), { width: e, height: n } = this.getImageData();
    return {
      width: (s - e) / 2,
      height: (t - n) / 2
    };
  },
  // private methods
  getContainerCenterClient() {
    const { element: s } = this, { top: t, left: e, width: n, height: i } = X(s);
    return {
      clientX: e + n / 2,
      clientY: t + i / 2
    };
  },
  // private methods
  getScaleRatio() {
    const { transform: { scale: s }, options: { minScale: t, maxScale: e } } = this;
    return (s - t) / (e - t);
  },
  // private methods
  useFixedRatio(s) {
    const { options: { minScale: t, maxScale: e } } = this;
    return R(s, t, e);
  }
}, { defineProperty: V } = Object;
var G, Rt, j, Lt, P, zt, F, At, q, yt, K, Mt, J, Ct, Q, It, tt, xt, et, $t, st, Nt, nt, Bt;
class Se {
  constructor(t, e) {
    // create initial data
    b(this, G);
    // mount elements and bind events
    b(this, j);
    // resize, drag, pinch, wheel
    b(this, P);
    // on wheel
    b(this, F);
    // on drag (mouse)
    b(this, q);
    // on touch (pinch and touchmove)
    b(this, K);
    // resize observer on element
    b(this, J);
    // check modules and create
    b(this, Q);
    // mount slider
    b(this, tt);
    // slider events
    b(this, et);
    // mount zoomer
    b(this, st);
    // zoomer event
    b(this, nt);
    T(this, "element");
    T(this, "options");
    T(this, "wrapper");
    T(this, "image");
    T(this, "mounted");
    T(this, "data");
    T(this, "transform");
    T(this, "states");
    T(this, "controller");
    T(this, "__events__");
    T(this, "__modules__");
    t || Ot("The first argument is required."), ot(t) || Ot(`Element ${t} is not exist.`), this.element = U(t), this.options = Object.assign({}, Xt, Yt(e) && e), this.init();
  }
  // check zoomist-image is exist
  init() {
    const { element: t } = this, { options: { bounds: e, minScale: n, maxScale: i, initScale: r } } = this;
    if (t[p])
      return;
    t[p] = this;
    const a = t.querySelector(`.${vt}`), c = t.querySelector(`.${ct}`);
    if (!a)
      return lt(`${p} needs a ".${vt}" element.`);
    if (!c)
      return lt(`${p} needs a ".${ct}" element.`);
    this.options.minScale = e && n < 1 ? 1 : n, this.options.maxScale = Math.max(i, n), this.options.initScale = R(r || n, n, i), this.wrapper = a, this.image = c, O(this, G, Rt).call(this);
  }
  // destory modules
  destroyModules() {
    const { slider: t, zoomer: e } = this.__modules__;
    t && this.destroySlider(), e && this.destroyZoomer();
  }
  // destroy slider
  destroySlider() {
    var r, a;
    const { __modules__: { slider: t } } = this;
    if (!t || !t.mounted)
      return;
    const { options: { el: e }, controller: n } = t;
    e === `.${x}` ? (r = t.sliderEl) == null || r.remove() : (a = t.sliderTrack) == null || a.remove(), n == null || n.abort(), t.mounted = !1;
  }
  // destroy zoomer
  destroyZoomer() {
    const { __modules__: { zoomer: t } } = this;
    if (!t || !t.mounted)
      return;
    const { options: { el: e, inEl: n, outEl: i, resetEl: r }, controller: a, zoomerEl: c, zoomerInEl: l, zoomerOutEl: d, zoomerResetEl: o } = t, h = (m, u, f) => {
      m === `.${u}` && (f == null || f.remove());
    };
    [
      { target: e, className: k, el: c },
      { target: n, className: ht, el: l },
      { target: i, className: dt, el: d },
      { target: r, className: ut, el: o }
    ].forEach((m) => h(m.target, m.className, m.el)), a == null || a.abort(), t.mounted = !1;
  }
}
G = new WeakSet(), Rt = function() {
  const { element: t, image: e, options: n } = this, { draggable: i, pinchable: r } = n, { offsetWidth: a, offsetHeight: c } = t, { offsetWidth: l, offsetHeight: d } = e, { width: o, height: h } = X(e);
  if (!l || !d)
    return lt(`The width or height of ${ct} should not be 0.`);
  if (this.transform = {
    scale: 0,
    translateX: 0,
    translateY: 0
  }, this.data = {
    imageData: {
      originWidth: l,
      originHeight: d,
      width: o,
      height: h
    },
    containerData: {
      width: a,
      height: c
    }
  }, L && (i || r) && (this.data.touchData = {
    hypot: 0,
    startX: 0,
    startY: 0,
    prevX: 0,
    prevY: 0,
    imageTop: 0,
    imageLeft: 0,
    widthDiff: 0,
    heightDiff: 0
  }), !L && i && (this.data.dragData = {
    startX: 0,
    startY: 0
  }), this.__events__ = { ...me }, n.on)
    for (const [m, u] of Object.entries(n.on))
      this.__events__[m] = [u];
  if (this.__modules__ = { ...fe }, n.slider) {
    const m = n.slider === !0 ? he : n.slider;
    this.__modules__.slider = {
      options: Object.assign({}, ce, m)
    };
  }
  if (n.zoomer) {
    const m = n.zoomer === !0 ? ue : n.zoomer;
    this.__modules__.zoomer = {
      options: Object.assign({}, de, m)
    };
  }
  this.controller = new AbortController(), O(this, j, Lt).call(this);
}, j = new WeakSet(), Lt = function() {
  if (this.mounted)
    return;
  const { element: t, image: e, options: { minScale: n, maxScale: i, initScale: r }, __modules__: { slider: a, zoomer: c } } = this, l = this;
  M(e, {
    transform: `
        translate(var(${Dt}, 0px), var(${wt}, 0px))
        scale(var(${Tt}, 0))`
  }), V(this.transform, "scale", {
    get() {
      return l.transform.__scale__;
    },
    set(d) {
      const o = l.useFixedRatio(d);
      if (!(at(o) || l.transform.__scale__ === o)) {
        if (l.transform.__scale__ = o, M(e, { [Tt]: o.toString() }), v(l.data.imageData, {
          width: X(e).width,
          height: X(e).height
        }), a) {
          const h = Math.round(l.getScaleRatio() * 100);
          a.value = h;
        }
        if (c && c.options.disabledClass) {
          const { zoomerInEl: h, zoomerOutEl: m, zoomerResetEl: u, options: { disabledClass: f } } = c;
          h && (h.classList[o === i ? "add" : "remove"](f), I(h, { "aria-disabled": o === i ? "true" : "false" })), m && (m.classList[o === n ? "add" : "remove"](f), I(m, { "aria-disabled": o === n ? "true" : "false" })), u && (u.classList[o === r ? "add" : "remove"](f), I(u, { "aria-disabled": o === r ? "true" : "false" }));
        }
      }
    }
  }), V(this.transform, "translateX", {
    get() {
      return l.transform.__translateX__;
    },
    set(d) {
      const o = D(d);
      at(o) || l.transform.__translateX__ === o || (l.transform.__translateX__ = o, M(e, { [Dt]: `${o}px` }));
    }
  }), V(this.transform, "translateY", {
    get() {
      return l.transform.__translateY__;
    },
    set(d) {
      const o = D(d);
      at(o) || l.transform.__translateY__ === o || (l.transform.__translateY__ = o, M(e, { [wt]: `${o}px` }));
    }
  }), O(this, P, zt).call(this), O(this, Q, It).call(this), v(this.transform, {
    scale: r,
    translateX: 0,
    translateY: 0
  }), t.classList.add(kt), this.mounted = !0, this.emit("ready", this);
}, P = new WeakSet(), zt = function() {
  const { wrapper: t, options: e, controller: { signal: n } } = this, { draggable: i, pinchable: r, wheelable: a } = e;
  if (this.states = {}, a) {
    this.states.wheeling = !1;
    const c = (l) => O(this, F, At).call(this, l);
    t.addEventListener(oe, c, { signal: n });
  }
  if (L && (i || r)) {
    i && (this.states.dragging = !1), r && (this.states.pinching = !1);
    const c = (l) => O(this, K, Mt).call(this, l);
    t.addEventListener("touchstart", c, { signal: n });
  }
  if (!L && i) {
    this.states.dragging = !1;
    const c = (l) => O(this, q, yt).call(this, l);
    t.addEventListener("mousedown", c, { signal: n });
  }
  O(this, J, Ct).call(this);
}, F = new WeakSet(), At = function(t) {
  const { options: { zoomRatio: e, wheelReleaseOnMinMax: n, disableWheelingClass: i } } = this, r = (t.deltaY || t.detail) > 0 ? -1 : 1;
  if (n) {
    const a = this.isOnMinScale(), c = this.isOnMaxScale();
    a && r === -1 || c && r === 1 || t.preventDefault();
  } else
    t.preventDefault();
  this.states.wheeling || rt(t.target, i) || (this.states.wheeling = !0, setTimeout(() => {
    this.states.wheeling = !1;
  }, 30), this.zoom(r * e, w(t)), this.emit("wheel", this, this.transform.scale, t));
}, q = new WeakSet(), yt = function(t) {
  const { data: e, transform: n, options: { disableDraggingClass: i } } = this, { dragData: r, imageData: a } = e;
  if (!r || !a)
    return;
  const c = (o) => {
    o && o.button !== 0 || (o.preventDefault(), !rt(o.target, i) && (v(r, {
      startX: w(o).clientX,
      startY: w(o).clientY
    }), this.states.dragging = !0, this.emit("dragStart", this, { x: n.translateX, y: n.translateY }, o), document.addEventListener(H, l), document.addEventListener(Z, d)));
  }, l = (o) => {
    if (o.touches || !this.states.dragging)
      return;
    o.preventDefault();
    const h = w(o).clientX, m = w(o).clientY, u = h - r.startX + n.translateX, f = m - r.startY + n.translateY;
    this.moveTo({ x: u, y: f }), v(r, {
      startX: w(o).clientX,
      startY: w(o).clientY
    }), this.emit("drag", this, { x: u, y: f }, o);
  }, d = (o) => {
    o.touches || (this.states.dragging = !1, this.emit("dragEnd", this, { x: n.translateX, y: n.translateY }, o), document.removeEventListener(H, l), document.removeEventListener(Z, d));
  };
  c(t);
}, K = new WeakSet(), Mt = function(t) {
  const { data: e, transform: n, options: { maxScale: i, minScale: r, draggable: a, pinchable: c, bounds: l, dragReleaseOnBounds: d, disableDraggingClass: o } } = this, { touchData: h, imageData: m } = e;
  if (!h || !m)
    return;
  const u = (_) => {
    const g = _.touches;
    if (!g)
      return;
    if (l && d) {
      const $ = this.isOnBoundX(), N = this.isOnBoundY(), z = g.length === 1 && ($ || N);
      console.log(z), z || _.preventDefault();
    } else
      _.preventDefault();
    if (rt(_.target, o) && g.length <= 1)
      return;
    const { top: S, left: Y } = X(this.image), { width: A, height: y } = this.getImageDiff();
    v(h, {
      hypot: bt(g),
      startX: W(g).clientX,
      startY: W(g).clientY,
      prevX: 0,
      prevY: 0,
      imageTop: S,
      imageLeft: Y,
      widthDiff: A,
      heightDiff: y
    }), a && (this.states.dragging = !0, this.emit("dragStart", this, { x: n.translateX, y: n.translateY }, _)), c && g.length === 2 && (this.states.pinching = !0, this.emit("pinchStart", this, n.scale, _)), document.addEventListener("touchmove", f), document.addEventListener("touchend", E);
  }, f = (_) => {
    const g = _.touches;
    if (!g)
      return;
    const { states: { dragging: S, pinching: Y } } = this, { top: A, left: y } = X(this.image), { width: $, height: N } = this.getImageDiff(), z = bt(g), gt = z ? z / h.hypot : 1, it = this.useFixedRatio(gt * n.scale), _t = W(g).clientX + h.prevX, pt = W(g).clientY + h.prevY;
    if (Y && g.length === 2 && this.zoomTo(it, !1), S) {
      const Et = it !== i && it !== r && c ? gt : 1, Wt = D(_t - h.imageLeft - ($ - h.widthDiff) - (h.startX - h.imageLeft) * Et + n.translateX), Ht = D(pt - h.imageTop - (N - h.heightDiff) - (h.startY - h.imageTop) * Et + n.translateY);
      this.moveTo({ x: Wt, y: Ht });
    }
    v(h, {
      hypot: z,
      startX: _t,
      startY: pt,
      imageTop: A,
      imageLeft: y,
      widthDiff: $,
      heightDiff: N
    }), Y && g.length === 2 && this.emit("pinch", this, n.scale, _), S && this.emit("drag", this, { x: n.translateX, y: n.translateY }, _);
  }, E = (_) => {
    const g = _.touches;
    if (!g)
      return;
    const { states: { dragging: S, pinching: Y } } = this;
    if (S && !g.length && (this.states.dragging = !1, this.emit("dragEnd", this, { x: n.translateX, y: n.translateY }, _)), Y && g.length < 2 && (this.states.pinching = !1, this.emit("pinchEnd", this, n.scale, _)), S && g.length === 1) {
      const A = w(_).clientX, y = w(_).clientY;
      v(h, {
        prevX: h.startX - A,
        prevY: h.startY - y
      });
    }
    g.length || (document.removeEventListener("touchmove", f), document.removeEventListener("touchend", E));
  };
  u(t);
}, J = new WeakSet(), Ct = function() {
  const { element: t, image: e, transform: n } = this;
  new ResizeObserver(() => {
    const { offsetWidth: r, offsetHeight: a } = t, { width: c, height: l } = this.getContainerData();
    if (r === c && a === l)
      return;
    const d = n.translateX, o = n.translateY;
    if (d) {
      const E = r / c * d;
      this.transform.translateX = E;
    }
    if (o) {
      const E = a / l * o;
      this.transform.translateY = E;
    }
    const { offsetWidth: h, offsetHeight: m } = e, { width: u, height: f } = X(e);
    v(this.data.containerData, {
      width: r,
      height: a
    }), v(this.data.imageData, {
      originWidth: h,
      originHeight: m,
      width: u,
      height: f
    }), this.emit("resize", this);
  }).observe(t);
}, Q = new WeakSet(), It = function() {
  const { slider: t, zoomer: e } = this.__modules__;
  t && O(this, tt, xt).call(this), e && O(this, st, Nt).call(this);
}, tt = new WeakSet(), xt = function() {
  const { element: t, __modules__: { slider: e } } = this;
  if (!e || e.mounted)
    return;
  const { options: { el: n, direction: i } } = e, r = n === `.${x}`;
  if (!n || !r && !ot(n))
    return;
  const a = r ? C("div", x) : U(n), c = C("div", Pt), l = C("span", Ft), d = C("span", qt, { ...Qt, "aria-orientation": i });
  a.classList.add(`${x}-${i}`), V(e, "value", {
    get() {
      return e.__value__;
    },
    set(o) {
      e.__value__ !== o && (e.__value__ = o, M(a, { [le]: o.toString() }), I(d, { "aria-valuenow": o.toString() }));
    }
  }), v(e, {
    value: this.getScaleRatio() * 100,
    controller: new AbortController(),
    sliding: !1,
    sliderEl: a,
    sliderTrack: c,
    sliderButton: d
  }), O(this, et, $t).call(this), c.append(l, d), a.append(c), r && t.append(a), e.mounted = !0;
}, et = new WeakSet(), $t = function() {
  const { options: { minScale: t, maxScale: e }, __modules__: { slider: n } } = this;
  if (!n)
    return;
  const { options: { direction: i }, controller: r, sliderEl: a, sliderTrack: c } = n;
  if (!a || !c)
    return;
  const l = i === "vertical", d = (u) => {
    const f = X(c), E = f[l ? "height" : "width"], _ = f[l ? "bottom" : "left"], g = w(u)[l ? "clientY" : "clientX"], S = D(R((g - _) * (l ? -1 : 1) / E, 0, 1));
    return (e - t) * S + t;
  }, o = (u) => {
    if (u instanceof MouseEvent && u.button !== 0)
      return;
    n.sliding = !0;
    const f = d(u);
    this.zoomTo(f), this.emit("slideStart", this, this.getSliderValue(), u), document.addEventListener(H, h), document.addEventListener(Z, m);
  }, h = (u) => {
    if (!n.sliding)
      return;
    const f = d(u);
    this.zoomTo(f), this.emit("slide", this, this.getSliderValue(), u);
  }, m = (u) => {
    this.emit("slideEnd", this, this.getSliderValue(), u), n.sliding = !1, document.removeEventListener(H, h), document.removeEventListener(Z, m);
  };
  a.addEventListener(ie, o, { signal: r == null ? void 0 : r.signal });
}, st = new WeakSet(), Nt = function() {
  const { element: t, __modules__: { zoomer: e } } = this;
  if (!e || e.mounted)
    return;
  const { options: { el: n, inEl: i, outEl: r, resetEl: a } } = e, c = [i, r, a], l = (u, f, E, _, g) => {
    const S = u === `.${E}`;
    return !u || !S && !ot(u) ? null : (E = c.includes(u) ? `${E} ${Kt}` : E, S ? C(f, E, _, g) : U(u));
  }, d = l(n, "div", k), o = l(i, "button", ht, te, ge), h = l(r, "button", dt, ee, _e), m = l(a, "button", ut, se, pe);
  v(e, {
    controller: new AbortController(),
    zoomerEl: d,
    zoomerInEl: o,
    zoomerOutEl: h,
    zoomerResetEl: m
  }), d && (o && d.append(o), h && d.append(h), m && d.append(m), n === `.${k}` && t.append(d)), O(this, nt, Bt).call(this), e.mounted = !0;
}, nt = new WeakSet(), Bt = function() {
  const { options: { zoomRatio: t }, __modules__: { zoomer: e } } = this, n = this;
  if (!e)
    return;
  const { controller: i, zoomerInEl: r, zoomerOutEl: a, zoomerResetEl: c } = e;
  r && r.addEventListener("click", () => {
    n.zoom(t);
  }, { signal: i == null ? void 0 : i.signal }), a && a.addEventListener("click", () => {
    n.zoom(-t);
  }, { signal: i == null ? void 0 : i.signal }), c && c.addEventListener("click", () => {
    n.reset();
  }, { signal: i == null ? void 0 : i.signal });
};
Object.assign(Se.prototype, Ee);
export {
  Se as default
};
