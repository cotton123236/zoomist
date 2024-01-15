var Nt = Object.defineProperty;
var Ht = (n, t, e) => t in n ? Nt(n, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : n[t] = e;
var O = (n, t, e) => (Ht(n, typeof t != "symbol" ? t + "" : t, e), e), Zt = (n, t, e) => {
  if (!t.has(n))
    throw TypeError("Cannot " + e);
};
var E = (n, t, e) => {
  if (t.has(n))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(n) : t.set(n, e);
};
var S = (n, t, e) => (Zt(n, t, "access private method"), e);
const et = (n) => document.contains(H(n)), bt = (n) => {
  if (!n)
    return !1;
  try {
    const { constructor: t } = n, { prototype: e } = t, { hasOwnProperty: s } = Object.prototype;
    return t && e && s.call(e, "isPrototypeOf");
  } catch {
    return !1;
  }
}, gt = (n) => typeof n == "function", $ = (n) => !isNaN(Number(n)), st = (n) => n == null, H = (n) => n instanceof HTMLElement ? n : document.querySelector(n), w = (n) => {
  const t = "touches" in n ? n.touches[0] : n;
  return {
    clientX: t.clientX,
    clientY: t.clientY
  };
}, C = (n) => ({
  clientX: [...n].map((t) => t.clientX).reduce((t, e) => t + e) / n.length,
  clientY: [...n].map((t) => t.clientY).reduce((t, e) => t + e) / n.length
}), Y = (n) => {
  const { width: t, height: e, top: s, left: i, bottom: l } = n.getBoundingClientRect();
  return {
    width: t,
    height: e,
    top: s,
    left: i,
    bottom: l
  };
}, _t = (n) => n.length >= 2 ? Math.hypot(n[0].clientX - n[1].clientX, n[0].clientY - n[1].clientY) : 0, L = (n, t) => {
  for (const [e, s] of Object.entries(t))
    typeof s == "string" && n.style.setProperty(e, s);
}, A = (n, t) => {
  for (const [e, s] of Object.entries(t))
    n.setAttribute(e, s);
}, v = (n, t) => {
  for (const [e, s] of Object.entries(t))
    n[e] = s;
}, X = (n, t, e) => Math.min(Math.max(n, t), e), R = (n) => {
  const t = +(Math.round(+(n + "e+2")) + "e-2");
  return isNaN(t) ? 0 : t;
}, pt = (n) => {
  throw new Error(n);
}, nt = (n) => console.warn(n), y = (n = "div", t, e, s) => {
  const i = document.createElement(n);
  return t && i.classList.add(...t.split(" ")), e && A(i, e), s && (i.innerHTML = s), i;
}, _ = "zoomist", Vt = `${_}-container`, Et = `${_}-wrapper`, it = `${_}-image`, I = `${_}-slider`, Wt = `${_}-slider-wrapper`, Ut = `${_}-slider-bar`, Bt = `${_}-slider-button`, Z = `${_}-zoomer`, kt = `${_}-zoomer-button`, lt = `${_}-zoomer-icon`, ot = `${_}-zoomer-in`, rt = `${_}-zoomer-out`, at = `${_}-zoomer-reset`, jt = `${_}-zoomer-disabled`, Gt = {
  tabindex: "0",
  role: "slider",
  "aria-label": "slider for zoomist",
  "aria-valuemin": "0",
  "aria-valuemax": "100",
  "aria-valuenow": "0",
  "aria-disabled": "false"
}, ct = {
  tabindex: "0",
  role: "button",
  "aria-disabled": "false"
}, Pt = {
  ...ct,
  "aria-label": "button for zoom in zoomist"
}, Ft = {
  ...ct,
  "aria-label": "button for zoom out zoomist"
}, qt = {
  ...ct,
  "aria-label": "button for reset zoomist scale"
}, Kt = typeof window < "u" && typeof window.document < "u", z = !!(Kt && "ontouchstart" in window), Jt = z ? "touchstart" : "mousedown", M = z ? "touchmove" : "mousemove", x = z ? "touchend" : "mouseup", Qt = "wheel", te = ["left", "right", "center"], ee = ["top", "bottom", "center"], St = "--scale", vt = "--translate-x", Tt = "--translate-y", se = "--value", Ot = {
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
  // return `false` if mousedown event does not lead to dragging
  dragFilter: (n) => n.button === 0
}, ne = {
  // the css selector string or a element of the slider
  el: null,
  // the direction of the slider 'horizontal' or 'vertical'
  direction: "horizontal"
}, ie = {
  el: `.${I}`
}, oe = {
  el: null,
  // the css selector string or a element for in-zoomer
  inEl: null,
  // the css selector string or a element for out-zoomer
  outEl: null,
  // the css selector string or a element for reset-zoomer
  resetEl: null,
  // in zoomer and out zoomer will be disabled when image comes to maximin or minimum
  disabledClass: jt
}, re = {
  el: `.${Z}`,
  inEl: `.${ot}`,
  outEl: `.${rt}`,
  resetEl: `.${at}`
}, ae = {
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
}, le = {
  // slider options
  slider: null,
  // zoomer options
  zoomer: null
}, ce = `
<svg viewBox="0 0 12 12" class="${lt}">
  <polygon points="12,5.5 6.5,5.5 6.5,0 5.5,0 5.5,5.5 0,5.5 0,6.5 5.5,6.5 5.5,12 6.5,12 6.5,6.5 12,6.5 "/>
</svg>
`, he = `
<svg viewBox="0 0 12 12" class="${lt}">
  <rect y="5.5" width="12" height="1"/>
</svg>
`, de = `
<svg viewBox="0 0 12 12" class="${lt}">
  <path d="m7.45,1.27l.35-.22c.26-.17.34-.52.17-.78-.17-.27-.52-.34-.78-.17l-1.54.99-.19.13-.11.46,1.12,1.75c.11.17.29.26.48.26.1,0,.21-.03.31-.09.26-.17.34-.52.17-.78l-.29-.46c1.85.5,3.22,2.17,3.22,4.18,0,2.39-1.95,4.34-4.34,4.34S1.66,8.92,1.66,6.52c0-1.15.44-2.23,1.25-3.05.22-.22.22-.58,0-.8-.22-.22-.58-.22-.8,0-1.02,1.03-1.58,2.4-1.58,3.85,0,3.02,2.46,5.48,5.48,5.48s5.48-2.46,5.48-5.48c0-2.51-1.71-4.62-4.02-5.26Z"/>
</svg>
`, ue = {
  on(n, t) {
    if (!t || !gt(t))
      return this;
    const { __events__: e } = this;
    return n.split(" ").forEach((s) => {
      const i = s;
      e[i] || (e[i] = []), e[i].push(t);
    }), this;
  },
  emit(n, ...t) {
    const { __events__: e } = this;
    return e[n] ? (e[n].forEach((s) => {
      gt(s) && s.apply(this, t);
    }), this) : this;
  },
  zoom(n, t) {
    const { scale: e } = this.transform, s = this.useFixedRatio(R(e * (n + 1)));
    return e === s ? this : (this.zoomTo(s, t), this);
  },
  zoomTo(n, t = !0) {
    const { image: e, transform: { scale: s, translateX: i, translateY: l }, options: { bounds: r } } = this;
    if (n = this.useFixedRatio(n), n === s)
      return this;
    if (this.transform.scale = n, !t)
      return this.emit("zoom", this, this.transform.scale), this;
    t = typeof t == "boolean" ? this.getContainerCenterClient() : t;
    const { clientX: a, clientY: o } = t, { top: u, left: h, width: m, height: f } = Y(e), { width: c, height: d } = this.getImageDiff(), g = n / s - 1, p = (m / 2 - a + h) * g + i, T = (f / 2 - o + u) * g + l, b = r ? X(p, c, -c) : p, D = r ? X(T, d, -d) : T;
    return v(this.transform, {
      translateX: b,
      translateY: D
    }), this.emit("zoom", this, this.transform.scale), this;
  },
  move(n) {
    const { options: { bounds: t }, transform: { translateX: e, translateY: s } } = this, { x: i, y: l } = n, { width: r, height: a } = this.getImageDiff();
    if ($(i)) {
      const o = e + i, u = t ? X(o, r, -r) : o;
      this.transform.translateX = u;
    }
    if ($(l)) {
      const o = s + l, u = t ? X(o, a, -a) : o;
      this.transform.translateY = u;
    }
    return this;
  },
  moveTo(n) {
    const { options: { bounds: t } } = this, { x: e, y: s } = n, { width: i, height: l } = this.getImageDiff();
    if ($(e)) {
      const r = Number(e), a = t ? X(r, i, -i) : r;
      this.transform.translateX = a;
    }
    if (te.some((r) => r === e)) {
      const a = {
        left: -i,
        right: i,
        center: 0
      }[e];
      this.transform.translateX = a;
    }
    if ($(s)) {
      const r = Number(s), a = t ? X(r, l, -l) : r;
      this.transform.translateY = a;
    }
    if (ee.some((r) => r === s)) {
      const a = {
        top: -l,
        bottom: l,
        center: 0
      }[s];
      this.transform.translateY = a;
    }
    return this;
  },
  slideTo(n) {
    const { options: { minScale: t, maxScale: e } } = this, s = (e - t) * n / 100 + t;
    return this.zoomTo(s), this;
  },
  reset() {
    const { options: { initScale: n } } = this;
    return v(this.transform, {
      scale: n,
      translateX: 0,
      translateY: 0
    }), this.emit("reset", this), this;
  },
  destroy(n = !1) {
    const { element: t, image: e, controller: s } = this;
    return this.mounted && (this.emit("beforeDestroy", this), s.abort(), this.destroyModules(), n && e && (this.reset(), e.removeAttribute("style")), t[_] = null, this.mounted = !1, this.emit("destroy", this)), null;
  },
  update(n) {
    const { element: t, controller: e } = this;
    return this.emit("beforeUpdate", this), t[_] = null, this.mounted = !1, e.abort(), this.destroyModules(), n && (this.options = Object.assign({}, Ot, bt(n) && n)), this.init(), this.emit("update", this), this;
  },
  getImageData() {
    return { ...this.data.imageData };
  },
  getContainerData() {
    return { ...this.data.containerData };
  },
  getSliderValue() {
    const { __modules__: { slider: n } } = this;
    return n && n.value !== void 0 ? n.value : null;
  },
  // private methods
  getImageDiff() {
    const { width: n, height: t } = this.getContainerData(), { width: e, height: s } = this.getImageData();
    return {
      width: (n - e) / 2,
      height: (t - s) / 2
    };
  },
  // private methods
  getContainerCenterClient() {
    const { element: n } = this, { top: t, left: e, width: s, height: i } = Y(n);
    return {
      clientX: e + s / 2,
      clientY: t + i / 2
    };
  },
  // private methods
  getScaleRatio() {
    const { transform: { scale: n }, options: { minScale: t, maxScale: e } } = this;
    return (n - t) / (e - t);
  },
  // private methods
  useFixedRatio(n) {
    const { options: { minScale: t, maxScale: e } } = this;
    return X(n, t, e);
  }
}, { defineProperty: N } = Object;
var V, wt, W, Yt, U, Xt, B, zt, k, Rt, j, Dt, G, Lt, P, yt, F, At, q, It, K, $t, J, Ct;
class me {
  constructor(t, e) {
    // create initial data
    E(this, V);
    // mount elements and bind events
    E(this, W);
    // resize, drag, pinch, wheel
    E(this, U);
    // on wheel
    E(this, B);
    // on drag (mouse)
    E(this, k);
    // on touch (pinch and touchmove)
    E(this, j);
    // resize observer on element
    E(this, G);
    // check modules and create
    E(this, P);
    // mount slider
    E(this, F);
    // slider events
    E(this, q);
    // mount zoomer
    E(this, K);
    // zoomer event
    E(this, J);
    O(this, "element");
    O(this, "options");
    O(this, "wrapper");
    O(this, "image");
    O(this, "mounted");
    O(this, "data");
    O(this, "transform");
    O(this, "states");
    O(this, "controller");
    O(this, "__events__");
    O(this, "__modules__");
    t || pt("The first argument is required."), et(t) || pt(`Element ${t} is not exist.`), this.element = H(t), this.options = Object.assign({}, Ot, bt(e) && e), this.init();
  }
  // check zoomist-image is exist
  init() {
    const { element: t } = this, { options: { bounds: e, minScale: s, maxScale: i, initScale: l } } = this;
    if (t[_])
      return;
    t[_] = this;
    const r = t.querySelector(`.${Et}`), a = t.querySelector(`.${it}`);
    if (!r)
      return nt(`${_} needs a ".${Et}" element.`);
    if (!a)
      return nt(`${_} needs a ".${it}" element.`);
    this.options.minScale = e && s < 1 ? 1 : s, this.options.maxScale = Math.max(i, s), this.options.initScale = X(l || s, s, i), this.wrapper = r, this.image = a, S(this, V, wt).call(this);
  }
  // destory modules
  destroyModules() {
    const { slider: t, zoomer: e } = this.__modules__;
    t && this.destroySlider(), e && this.destroyZoomer();
  }
  // destroy slider
  destroySlider() {
    var l, r;
    const { __modules__: { slider: t } } = this;
    if (!t || !t.mounted)
      return;
    const { options: { el: e }, controller: s } = t;
    e === `.${I}` ? (l = t.sliderEl) == null || l.remove() : (r = t.sliderTrack) == null || r.remove(), s == null || s.abort(), t.mounted = !1;
  }
  // destroy zoomer
  destroyZoomer() {
    const { __modules__: { zoomer: t } } = this;
    if (!t || !t.mounted)
      return;
    const { options: { el: e, inEl: s, outEl: i, resetEl: l }, controller: r, zoomerEl: a, zoomerInEl: o, zoomerOutEl: u, zoomerResetEl: h } = t, m = (f, c, d) => {
      f === `.${c}` && (d == null || d.remove());
    };
    [
      { target: e, className: Z, el: a },
      { target: s, className: ot, el: o },
      { target: i, className: rt, el: u },
      { target: l, className: at, el: h }
    ].forEach((f) => m(f.target, f.className, f.el)), r == null || r.abort(), t.mounted = !1;
  }
}
V = new WeakSet(), wt = function() {
  const { element: t, image: e, options: s } = this, { draggable: i, pinchable: l } = s, { offsetWidth: r, offsetHeight: a } = t, { offsetWidth: o, offsetHeight: u } = e, { width: h, height: m } = Y(e);
  if (!o || !u)
    return nt(`The width or height of ${it} should not be 0.`);
  if (this.transform = {
    scale: 0,
    translateX: 0,
    translateY: 0
  }, this.data = {
    imageData: {
      originWidth: o,
      originHeight: u,
      width: h,
      height: m
    },
    containerData: {
      width: r,
      height: a
    }
  }, z && (i || l) && (this.data.touchData = {
    hypot: 0,
    startX: 0,
    startY: 0,
    prevX: 0,
    prevY: 0,
    imageTop: 0,
    imageLeft: 0,
    widthDiff: 0,
    heightDiff: 0
  }), !z && i && (this.data.dragData = {
    startX: 0,
    startY: 0
  }), this.__events__ = { ...ae }, s.on)
    for (const [f, c] of Object.entries(s.on))
      this.__events__[f] = [c];
  if (this.__modules__ = { ...le }, s.slider) {
    const f = s.slider === !0 ? ie : s.slider;
    this.__modules__.slider = {
      options: Object.assign({}, ne, f)
    };
  }
  if (s.zoomer) {
    const f = s.zoomer === !0 ? re : s.zoomer;
    this.__modules__.zoomer = {
      options: Object.assign({}, oe, f)
    };
  }
  this.controller = new AbortController(), S(this, W, Yt).call(this);
}, W = new WeakSet(), Yt = function() {
  if (this.mounted)
    return;
  const { element: t, image: e, options: { minScale: s, maxScale: i, initScale: l }, __modules__: { slider: r, zoomer: a } } = this, o = this;
  L(e, {
    transform: `
        translate(var(${vt}, 0px), var(${Tt}, 0px))
        scale(var(${St}, 0))`
  }), N(this.transform, "scale", {
    get() {
      return o.transform.__scale__;
    },
    set(u) {
      const h = o.useFixedRatio(u);
      if (!(st(h) || o.transform.__scale__ === h)) {
        if (o.transform.__scale__ = h, L(e, { [St]: h.toString() }), v(o.data.imageData, {
          width: Y(e).width,
          height: Y(e).height
        }), r) {
          const m = Math.round(o.getScaleRatio() * 100);
          r.value = m;
        }
        if (a && a.options.disabledClass) {
          const { zoomerInEl: m, zoomerOutEl: f, zoomerResetEl: c, options: { disabledClass: d } } = a;
          m && (m.classList[h === i ? "add" : "remove"](d), A(m, { "aria-disabled": h === i ? "true" : "false" })), f && (f.classList[h === s ? "add" : "remove"](d), A(f, { "aria-disabled": h === s ? "true" : "false" })), c && (c.classList[h === l ? "add" : "remove"](d), A(c, { "aria-disabled": h === l ? "true" : "false" }));
        }
      }
    }
  }), N(this.transform, "translateX", {
    get() {
      return o.transform.__translateX__;
    },
    set(u) {
      const h = R(u);
      st(h) || o.transform.__translateX__ === h || (o.transform.__translateX__ = h, L(e, { [vt]: `${h}px` }));
    }
  }), N(this.transform, "translateY", {
    get() {
      return o.transform.__translateY__;
    },
    set(u) {
      const h = R(u);
      st(h) || o.transform.__translateY__ === h || (o.transform.__translateY__ = h, L(e, { [Tt]: `${h}px` }));
    }
  }), S(this, U, Xt).call(this), S(this, P, yt).call(this), v(this.transform, {
    scale: l,
    translateX: 0,
    translateY: 0
  }), t.classList.add(Vt), this.mounted = !0, this.emit("ready", this);
}, U = new WeakSet(), Xt = function() {
  const { wrapper: t, options: e, controller: { signal: s } } = this, { draggable: i, pinchable: l, wheelable: r } = e;
  if (this.states = {}, r) {
    this.states.wheeling = !1;
    const a = (o) => S(this, B, zt).call(this, o);
    t.addEventListener(Qt, a, { signal: s });
  }
  if (z && (i || l)) {
    i && (this.states.dragging = !1), l && (this.states.pinching = !1);
    const a = (o) => S(this, j, Dt).call(this, o);
    t.addEventListener("touchstart", a, { signal: s });
  }
  if (!z && i) {
    this.states.dragging = !1;
    const a = (o) => S(this, k, Rt).call(this, o);
    t.addEventListener("mousedown", a, { signal: s });
  }
  S(this, G, Lt).call(this);
}, B = new WeakSet(), zt = function(t) {
  const { options: e } = this, { zoomRatio: s } = e;
  if (t.preventDefault(), this.states.wheeling)
    return;
  this.states.wheeling = !0, setTimeout(() => {
    this.states.wheeling = !1;
  }, 30);
  const i = (t.deltaY || t.detail) > 0 ? -1 : 1;
  this.zoom(i * s, w(t)), this.emit("wheel", this, this.transform.scale, t);
}, k = new WeakSet(), Rt = function(t) {
  const { data: e, transform: s } = this, { dragData: i, imageData: l } = e, { options: r } = this, { dragFilter: a } = r;
  if (!i || !l)
    return;
  const o = (m) => {
    a && !a(m) || (v(i, {
      startX: w(m).clientX,
      startY: w(m).clientY
    }), this.states.dragging = !0, this.emit("dragStart", this, { x: s.translateX, y: s.translateY }, m), document.addEventListener(M, u), document.addEventListener(x, h));
  }, u = (m) => {
    if (m.touches || !this.states.dragging)
      return;
    const f = w(m).clientX, c = w(m).clientY, d = f - i.startX + s.translateX, g = c - i.startY + s.translateY;
    this.moveTo({ x: d, y: g }), v(i, {
      startX: w(m).clientX,
      startY: w(m).clientY
    }), this.emit("drag", this, { x: d, y: g }, m);
  }, h = (m) => {
    m.touches || (this.states.dragging = !1, this.emit("dragEnd", this, { x: s.translateX, y: s.translateY }, m), document.removeEventListener(M, u), document.removeEventListener(x, h));
  };
  o(t);
}, j = new WeakSet(), Dt = function(t) {
  const { data: e, transform: s, options: { maxScale: i, minScale: l, draggable: r, pinchable: a } } = this, { touchData: o, imageData: u } = e;
  if (!o || !u)
    return;
  const h = (c) => {
    const d = c.touches;
    if (!d)
      return;
    const { top: g, left: p } = Y(this.image), { width: T, height: b } = this.getImageDiff();
    v(o, {
      hypot: _t(d),
      startX: C(d).clientX,
      startY: C(d).clientY,
      prevX: 0,
      prevY: 0,
      imageTop: g,
      imageLeft: p,
      widthDiff: T,
      heightDiff: b
    }), r && (this.states.dragging = !0, this.emit("dragStart", this, { x: s.translateX, y: s.translateY }, c)), a && d.length === 2 && (this.states.pinching = !0, this.emit("pinchStart", this, s.scale, c)), document.addEventListener("touchmove", m), document.addEventListener("touchend", f);
  }, m = (c) => {
    const d = c.touches;
    if (!d)
      return;
    const { states: { dragging: g, pinching: p } } = this, { top: T, left: b } = Y(this.image), { width: D, height: ht } = this.getImageDiff(), Q = _t(d), dt = Q ? Q / o.hypot : 1, tt = this.useFixedRatio(dt * s.scale), ut = C(d).clientX + o.prevX, mt = C(d).clientY + o.prevY;
    if (p && d.length === 2 && this.zoomTo(tt, !1), g) {
      const ft = tt !== i && tt !== l && a ? dt : 1, Mt = R(ut - o.imageLeft - (D - o.widthDiff) - (o.startX - o.imageLeft) * ft + s.translateX), xt = R(mt - o.imageTop - (ht - o.heightDiff) - (o.startY - o.imageTop) * ft + s.translateY);
      this.moveTo({ x: Mt, y: xt });
    }
    v(o, {
      hypot: Q,
      startX: ut,
      startY: mt,
      imageTop: T,
      imageLeft: b,
      widthDiff: D,
      heightDiff: ht
    }), p && d.length === 2 && this.emit("pinch", this, s.scale, c), g && this.emit("drag", this, { x: s.translateX, y: s.translateY }, c);
  }, f = (c) => {
    const d = c.touches;
    if (!d)
      return;
    const { states: { dragging: g, pinching: p } } = this;
    if (g && !d.length && (this.states.dragging = !1, this.emit("dragEnd", this, { x: s.translateX, y: s.translateY }, c)), p && d.length < 2 && (this.states.pinching = !1, this.emit("pinchEnd", this, s.scale, c)), g && d.length === 1) {
      const T = w(c).clientX, b = w(c).clientY;
      v(o, {
        prevX: o.startX - T,
        prevY: o.startY - b
      });
    }
    d.length || (document.removeEventListener("touchmove", m), document.removeEventListener("touchend", f));
  };
  h(t);
}, G = new WeakSet(), Lt = function() {
  const { element: t, image: e, transform: s } = this;
  new ResizeObserver(() => {
    const { offsetWidth: l, offsetHeight: r } = t, { width: a, height: o } = this.getContainerData();
    if (l === a && r === o)
      return;
    const u = s.translateX, h = s.translateY;
    if (u) {
      const g = l / a * u;
      this.transform.translateX = g;
    }
    if (h) {
      const g = r / o * h;
      this.transform.translateY = g;
    }
    const { offsetWidth: m, offsetHeight: f } = e, { width: c, height: d } = Y(e);
    v(this.data.containerData, {
      width: l,
      height: r
    }), v(this.data.imageData, {
      originWidth: m,
      originHeight: f,
      width: c,
      height: d
    }), this.emit("resize", this);
  }).observe(t);
}, P = new WeakSet(), yt = function() {
  const { slider: t, zoomer: e } = this.__modules__;
  t && S(this, F, At).call(this), e && S(this, K, $t).call(this);
}, F = new WeakSet(), At = function() {
  const { element: t, __modules__: { slider: e } } = this;
  if (!e || e.mounted)
    return;
  const { options: { el: s, direction: i } } = e, l = s === `.${I}`;
  if (!s || !l && !et(s))
    return;
  const r = l ? y("div", I) : H(s), a = y("div", Wt), o = y("span", Ut), u = y("span", Bt, { ...Gt, "aria-orientation": i });
  r.classList.add(`${I}-${i}`), N(e, "value", {
    get() {
      return e.__value__;
    },
    set(h) {
      e.__value__ !== h && (e.__value__ = h, L(r, { [se]: h.toString() }), A(u, { "aria-valuenow": h.toString() }));
    }
  }), v(e, {
    value: this.getScaleRatio() * 100,
    controller: new AbortController(),
    sliding: !1,
    sliderEl: r,
    sliderTrack: a,
    sliderButton: u
  }), S(this, q, It).call(this), a.append(o, u), r.append(a), l && t.append(r), e.mounted = !0;
}, q = new WeakSet(), It = function() {
  const { options: { minScale: t, maxScale: e }, __modules__: { slider: s } } = this;
  if (!s)
    return;
  const { options: { direction: i }, controller: l, sliderEl: r, sliderTrack: a } = s;
  if (!r || !a)
    return;
  const o = i === "vertical", u = (c) => {
    const d = Y(a), g = d[o ? "height" : "width"], p = d[o ? "bottom" : "left"], T = w(c)[o ? "clientY" : "clientX"], b = R(X((T - p) * (o ? -1 : 1) / g, 0, 1));
    return (e - t) * b + t;
  }, h = (c) => {
    if (c instanceof MouseEvent && c.button !== 0)
      return;
    s.sliding = !0;
    const d = u(c);
    this.zoomTo(d), this.emit("slideStart", this, this.getSliderValue(), c), document.addEventListener(M, m), document.addEventListener(x, f);
  }, m = (c) => {
    if (!s.sliding)
      return;
    const d = u(c);
    this.zoomTo(d), this.emit("slide", this, this.getSliderValue(), c);
  }, f = (c) => {
    this.emit("slideEnd", this, this.getSliderValue(), c), s.sliding = !1, document.removeEventListener(M, m), document.removeEventListener(x, f);
  };
  r.addEventListener(Jt, h, { signal: l == null ? void 0 : l.signal });
}, K = new WeakSet(), $t = function() {
  const { element: t, __modules__: { zoomer: e } } = this;
  if (!e || e.mounted)
    return;
  const { options: { el: s, inEl: i, outEl: l, resetEl: r } } = e, a = [i, l, r], o = (c, d, g, p, T) => {
    const b = c === `.${g}`;
    return !c || !b && !et(c) ? null : (g = a.includes(c) ? `${g} ${kt}` : g, b ? y(d, g, p, T) : H(c));
  }, u = o(s, "div", Z), h = o(i, "button", ot, Pt, ce), m = o(l, "button", rt, Ft, he), f = o(r, "button", at, qt, de);
  v(e, {
    controller: new AbortController(),
    zoomerEl: u,
    zoomerInEl: h,
    zoomerOutEl: m,
    zoomerResetEl: f
  }), u && (h && u.append(h), m && u.append(m), f && u.append(f), s === `.${Z}` && t.append(u)), S(this, J, Ct).call(this), e.mounted = !0;
}, J = new WeakSet(), Ct = function() {
  const { options: { zoomRatio: t }, __modules__: { zoomer: e } } = this, s = this;
  if (!e)
    return;
  const { controller: i, zoomerInEl: l, zoomerOutEl: r, zoomerResetEl: a } = e;
  l && l.addEventListener("click", () => {
    s.zoom(t);
  }, { signal: i == null ? void 0 : i.signal }), r && r.addEventListener("click", () => {
    s.zoom(-t);
  }, { signal: i == null ? void 0 : i.signal }), a && a.addEventListener("click", () => {
    s.reset();
  }, { signal: i == null ? void 0 : i.signal });
};
Object.assign(me.prototype, ue);
export {
  me as default
};
