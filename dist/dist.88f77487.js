// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"node_modules/@lit/reactive-element/css-tag.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.unsafeCSS = exports.supportsAdoptingStyleSheets = exports.getCompatibleStyle = exports.css = exports.adoptStyles = exports.CSSResult = void 0;
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t = window,
  e = t.ShadowRoot && (void 0 === t.ShadyCSS || t.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype,
  s = Symbol(),
  n = new WeakMap();
exports.supportsAdoptingStyleSheets = e;
class o {
  constructor(t, e, n) {
    if (this._$cssResult$ = !0, n !== s) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const s = this.t;
    if (e && void 0 === t) {
      const e = void 0 !== s && 1 === s.length;
      e && (t = n.get(s)), void 0 === t && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), e && n.set(s, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
}
exports.CSSResult = o;
const r = t => new o("string" == typeof t ? t : t + "", void 0, s),
  i = (t, ...e) => {
    const n = 1 === t.length ? t[0] : e.reduce((e, s, n) => e + (t => {
      if (!0 === t._$cssResult$) return t.cssText;
      if ("number" == typeof t) return t;
      throw Error("Value passed to 'css' function must be a 'css' function result: " + t + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
    })(s) + t[n + 1], t[0]);
    return new o(n, t, s);
  },
  S = (s, n) => {
    e ? s.adoptedStyleSheets = n.map(t => t instanceof CSSStyleSheet ? t : t.styleSheet) : n.forEach(e => {
      const n = document.createElement("style"),
        o = t.litNonce;
      void 0 !== o && n.setAttribute("nonce", o), n.textContent = e.cssText, s.appendChild(n);
    });
  },
  c = e ? t => t : t => t instanceof CSSStyleSheet ? (t => {
    let e = "";
    for (const s of t.cssRules) e += s.cssText;
    return r(e);
  })(t) : t;
exports.getCompatibleStyle = c;
exports.adoptStyles = S;
exports.css = i;
exports.unsafeCSS = r;
},{}],"node_modules/@lit/reactive-element/reactive-element.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "CSSResult", {
  enumerable: true,
  get: function () {
    return _cssTag.CSSResult;
  }
});
exports.ReactiveElement = void 0;
Object.defineProperty(exports, "adoptStyles", {
  enumerable: true,
  get: function () {
    return _cssTag.adoptStyles;
  }
});
Object.defineProperty(exports, "css", {
  enumerable: true,
  get: function () {
    return _cssTag.css;
  }
});
exports.defaultConverter = void 0;
Object.defineProperty(exports, "getCompatibleStyle", {
  enumerable: true,
  get: function () {
    return _cssTag.getCompatibleStyle;
  }
});
exports.notEqual = void 0;
Object.defineProperty(exports, "supportsAdoptingStyleSheets", {
  enumerable: true,
  get: function () {
    return _cssTag.supportsAdoptingStyleSheets;
  }
});
Object.defineProperty(exports, "unsafeCSS", {
  enumerable: true,
  get: function () {
    return _cssTag.unsafeCSS;
  }
});
var _cssTag = require("./css-tag.js");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var s;
const e = window,
  r = e.trustedTypes,
  h = r ? r.emptyScript : "",
  o = e.reactiveElementPolyfillSupport,
  n = {
    toAttribute(t, i) {
      switch (i) {
        case Boolean:
          t = t ? h : null;
          break;
        case Object:
        case Array:
          t = null == t ? t : JSON.stringify(t);
      }
      return t;
    },
    fromAttribute(t, i) {
      let s = t;
      switch (i) {
        case Boolean:
          s = null !== t;
          break;
        case Number:
          s = null === t ? null : Number(t);
          break;
        case Object:
        case Array:
          try {
            s = JSON.parse(t);
          } catch (t) {
            s = null;
          }
      }
      return s;
    }
  },
  a = (t, i) => i !== t && (i == i || t == t),
  l = {
    attribute: !0,
    type: String,
    converter: n,
    reflect: !1,
    hasChanged: a
  };
exports.notEqual = a;
exports.defaultConverter = n;
class d extends HTMLElement {
  constructor() {
    super(), this._$Ei = new Map(), this.isUpdatePending = !1, this.hasUpdated = !1, this._$El = null, this.u();
  }
  static addInitializer(t) {
    var i;
    this.finalize(), (null !== (i = this.h) && void 0 !== i ? i : this.h = []).push(t);
  }
  static get observedAttributes() {
    this.finalize();
    const t = [];
    return this.elementProperties.forEach((i, s) => {
      const e = this._$Ep(s, i);
      void 0 !== e && (this._$Ev.set(e, s), t.push(e));
    }), t;
  }
  static createProperty(t, i = l) {
    if (i.state && (i.attribute = !1), this.finalize(), this.elementProperties.set(t, i), !i.noAccessor && !this.prototype.hasOwnProperty(t)) {
      const s = "symbol" == typeof t ? Symbol() : "__" + t,
        e = this.getPropertyDescriptor(t, s, i);
      void 0 !== e && Object.defineProperty(this.prototype, t, e);
    }
  }
  static getPropertyDescriptor(t, i, s) {
    return {
      get() {
        return this[i];
      },
      set(e) {
        const r = this[t];
        this[i] = e, this.requestUpdate(t, r, s);
      },
      configurable: !0,
      enumerable: !0
    };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) || l;
  }
  static finalize() {
    if (this.hasOwnProperty("finalized")) return !1;
    this.finalized = !0;
    const t = Object.getPrototypeOf(this);
    if (t.finalize(), void 0 !== t.h && (this.h = [...t.h]), this.elementProperties = new Map(t.elementProperties), this._$Ev = new Map(), this.hasOwnProperty("properties")) {
      const t = this.properties,
        i = [...Object.getOwnPropertyNames(t), ...Object.getOwnPropertySymbols(t)];
      for (const s of i) this.createProperty(s, t[s]);
    }
    return this.elementStyles = this.finalizeStyles(this.styles), !0;
  }
  static finalizeStyles(i) {
    const s = [];
    if (Array.isArray(i)) {
      const e = new Set(i.flat(1 / 0).reverse());
      for (const i of e) s.unshift((0, _cssTag.getCompatibleStyle)(i));
    } else void 0 !== i && s.push((0, _cssTag.getCompatibleStyle)(i));
    return s;
  }
  static _$Ep(t, i) {
    const s = i.attribute;
    return !1 === s ? void 0 : "string" == typeof s ? s : "string" == typeof t ? t.toLowerCase() : void 0;
  }
  u() {
    var t;
    this._$E_ = new Promise(t => this.enableUpdating = t), this._$AL = new Map(), this._$Eg(), this.requestUpdate(), null === (t = this.constructor.h) || void 0 === t || t.forEach(t => t(this));
  }
  addController(t) {
    var i, s;
    (null !== (i = this._$ES) && void 0 !== i ? i : this._$ES = []).push(t), void 0 !== this.renderRoot && this.isConnected && (null === (s = t.hostConnected) || void 0 === s || s.call(t));
  }
  removeController(t) {
    var i;
    null === (i = this._$ES) || void 0 === i || i.splice(this._$ES.indexOf(t) >>> 0, 1);
  }
  _$Eg() {
    this.constructor.elementProperties.forEach((t, i) => {
      this.hasOwnProperty(i) && (this._$Ei.set(i, this[i]), delete this[i]);
    });
  }
  createRenderRoot() {
    var t;
    const s = null !== (t = this.shadowRoot) && void 0 !== t ? t : this.attachShadow(this.constructor.shadowRootOptions);
    return (0, _cssTag.adoptStyles)(s, this.constructor.elementStyles), s;
  }
  connectedCallback() {
    var t;
    void 0 === this.renderRoot && (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), null === (t = this._$ES) || void 0 === t || t.forEach(t => {
      var i;
      return null === (i = t.hostConnected) || void 0 === i ? void 0 : i.call(t);
    });
  }
  enableUpdating(t) {}
  disconnectedCallback() {
    var t;
    null === (t = this._$ES) || void 0 === t || t.forEach(t => {
      var i;
      return null === (i = t.hostDisconnected) || void 0 === i ? void 0 : i.call(t);
    });
  }
  attributeChangedCallback(t, i, s) {
    this._$AK(t, s);
  }
  _$EO(t, i, s = l) {
    var e;
    const r = this.constructor._$Ep(t, s);
    if (void 0 !== r && !0 === s.reflect) {
      const h = (void 0 !== (null === (e = s.converter) || void 0 === e ? void 0 : e.toAttribute) ? s.converter : n).toAttribute(i, s.type);
      this._$El = t, null == h ? this.removeAttribute(r) : this.setAttribute(r, h), this._$El = null;
    }
  }
  _$AK(t, i) {
    var s;
    const e = this.constructor,
      r = e._$Ev.get(t);
    if (void 0 !== r && this._$El !== r) {
      const t = e.getPropertyOptions(r),
        h = "function" == typeof t.converter ? {
          fromAttribute: t.converter
        } : void 0 !== (null === (s = t.converter) || void 0 === s ? void 0 : s.fromAttribute) ? t.converter : n;
      this._$El = r, this[r] = h.fromAttribute(i, t.type), this._$El = null;
    }
  }
  requestUpdate(t, i, s) {
    let e = !0;
    void 0 !== t && (((s = s || this.constructor.getPropertyOptions(t)).hasChanged || a)(this[t], i) ? (this._$AL.has(t) || this._$AL.set(t, i), !0 === s.reflect && this._$El !== t && (void 0 === this._$EC && (this._$EC = new Map()), this._$EC.set(t, s))) : e = !1), !this.isUpdatePending && e && (this._$E_ = this._$Ej());
  }
  async _$Ej() {
    this.isUpdatePending = !0;
    try {
      await this._$E_;
    } catch (t) {
      Promise.reject(t);
    }
    const t = this.scheduleUpdate();
    return null != t && (await t), !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var t;
    if (!this.isUpdatePending) return;
    this.hasUpdated, this._$Ei && (this._$Ei.forEach((t, i) => this[i] = t), this._$Ei = void 0);
    let i = !1;
    const s = this._$AL;
    try {
      i = this.shouldUpdate(s), i ? (this.willUpdate(s), null === (t = this._$ES) || void 0 === t || t.forEach(t => {
        var i;
        return null === (i = t.hostUpdate) || void 0 === i ? void 0 : i.call(t);
      }), this.update(s)) : this._$Ek();
    } catch (t) {
      throw i = !1, this._$Ek(), t;
    }
    i && this._$AE(s);
  }
  willUpdate(t) {}
  _$AE(t) {
    var i;
    null === (i = this._$ES) || void 0 === i || i.forEach(t => {
      var i;
      return null === (i = t.hostUpdated) || void 0 === i ? void 0 : i.call(t);
    }), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
  }
  _$Ek() {
    this._$AL = new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$E_;
  }
  shouldUpdate(t) {
    return !0;
  }
  update(t) {
    void 0 !== this._$EC && (this._$EC.forEach((t, i) => this._$EO(i, this[i], t)), this._$EC = void 0), this._$Ek();
  }
  updated(t) {}
  firstUpdated(t) {}
}
exports.ReactiveElement = d;
d.finalized = !0, d.elementProperties = new Map(), d.elementStyles = [], d.shadowRootOptions = {
  mode: "open"
}, null == o || o({
  ReactiveElement: d
}), (null !== (s = e.reactiveElementVersions) && void 0 !== s ? s : e.reactiveElementVersions = []).push("1.6.1");
},{"./css-tag.js":"node_modules/@lit/reactive-element/css-tag.js"}],"node_modules/lit-html/lit-html.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.svg = exports.render = exports.nothing = exports.noChange = exports.html = exports._$LH = void 0;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var t;
const i = window,
  s = i.trustedTypes,
  e = s ? s.createPolicy("lit-html", {
    createHTML: t => t
  }) : void 0,
  o = "$lit$",
  n = `lit$${(Math.random() + "").slice(9)}$`,
  l = "?" + n,
  h = `<${l}>`,
  r = document,
  d = () => r.createComment(""),
  u = t => null === t || "object" != typeof t && "function" != typeof t,
  c = Array.isArray,
  v = t => c(t) || "function" == typeof (null == t ? void 0 : t[Symbol.iterator]),
  a = "[ \t\n\f\r]",
  f = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,
  _ = /-->/g,
  m = />/g,
  p = RegExp(`>|${a}(?:([^\\s"'>=/]+)(${a}*=${a}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`, "g"),
  g = /'/g,
  $ = /"/g,
  y = /^(?:script|style|textarea|title)$/i,
  w = t => (i, ...s) => ({
    _$litType$: t,
    strings: i,
    values: s
  }),
  x = w(1),
  b = w(2),
  T = Symbol.for("lit-noChange"),
  A = Symbol.for("lit-nothing"),
  E = new WeakMap(),
  C = r.createTreeWalker(r, 129, null, !1),
  P = (t, i) => {
    const s = t.length - 1,
      l = [];
    let r,
      d = 2 === i ? "<svg>" : "",
      u = f;
    for (let i = 0; i < s; i++) {
      const s = t[i];
      let e,
        c,
        v = -1,
        a = 0;
      for (; a < s.length && (u.lastIndex = a, c = u.exec(s), null !== c);) a = u.lastIndex, u === f ? "!--" === c[1] ? u = _ : void 0 !== c[1] ? u = m : void 0 !== c[2] ? (y.test(c[2]) && (r = RegExp("</" + c[2], "g")), u = p) : void 0 !== c[3] && (u = p) : u === p ? ">" === c[0] ? (u = null != r ? r : f, v = -1) : void 0 === c[1] ? v = -2 : (v = u.lastIndex - c[2].length, e = c[1], u = void 0 === c[3] ? p : '"' === c[3] ? $ : g) : u === $ || u === g ? u = p : u === _ || u === m ? u = f : (u = p, r = void 0);
      const w = u === p && t[i + 1].startsWith("/>") ? " " : "";
      d += u === f ? s + h : v >= 0 ? (l.push(e), s.slice(0, v) + o + s.slice(v) + n + w) : s + n + (-2 === v ? (l.push(void 0), i) : w);
    }
    const c = d + (t[s] || "<?>") + (2 === i ? "</svg>" : "");
    if (!Array.isArray(t) || !t.hasOwnProperty("raw")) throw Error("invalid template strings array");
    return [void 0 !== e ? e.createHTML(c) : c, l];
  };
exports.nothing = A;
exports.noChange = T;
exports.svg = b;
exports.html = x;
class V {
  constructor({
    strings: t,
    _$litType$: i
  }, e) {
    let h;
    this.parts = [];
    let r = 0,
      u = 0;
    const c = t.length - 1,
      v = this.parts,
      [a, f] = P(t, i);
    if (this.el = V.createElement(a, e), C.currentNode = this.el.content, 2 === i) {
      const t = this.el.content,
        i = t.firstChild;
      i.remove(), t.append(...i.childNodes);
    }
    for (; null !== (h = C.nextNode()) && v.length < c;) {
      if (1 === h.nodeType) {
        if (h.hasAttributes()) {
          const t = [];
          for (const i of h.getAttributeNames()) if (i.endsWith(o) || i.startsWith(n)) {
            const s = f[u++];
            if (t.push(i), void 0 !== s) {
              const t = h.getAttribute(s.toLowerCase() + o).split(n),
                i = /([.?@])?(.*)/.exec(s);
              v.push({
                type: 1,
                index: r,
                name: i[2],
                strings: t,
                ctor: "." === i[1] ? k : "?" === i[1] ? I : "@" === i[1] ? L : R
              });
            } else v.push({
              type: 6,
              index: r
            });
          }
          for (const i of t) h.removeAttribute(i);
        }
        if (y.test(h.tagName)) {
          const t = h.textContent.split(n),
            i = t.length - 1;
          if (i > 0) {
            h.textContent = s ? s.emptyScript : "";
            for (let s = 0; s < i; s++) h.append(t[s], d()), C.nextNode(), v.push({
              type: 2,
              index: ++r
            });
            h.append(t[i], d());
          }
        }
      } else if (8 === h.nodeType) if (h.data === l) v.push({
        type: 2,
        index: r
      });else {
        let t = -1;
        for (; -1 !== (t = h.data.indexOf(n, t + 1));) v.push({
          type: 7,
          index: r
        }), t += n.length - 1;
      }
      r++;
    }
  }
  static createElement(t, i) {
    const s = r.createElement("template");
    return s.innerHTML = t, s;
  }
}
function N(t, i, s = t, e) {
  var o, n, l, h;
  if (i === T) return i;
  let r = void 0 !== e ? null === (o = s._$Co) || void 0 === o ? void 0 : o[e] : s._$Cl;
  const d = u(i) ? void 0 : i._$litDirective$;
  return (null == r ? void 0 : r.constructor) !== d && (null === (n = null == r ? void 0 : r._$AO) || void 0 === n || n.call(r, !1), void 0 === d ? r = void 0 : (r = new d(t), r._$AT(t, s, e)), void 0 !== e ? (null !== (l = (h = s)._$Co) && void 0 !== l ? l : h._$Co = [])[e] = r : s._$Cl = r), void 0 !== r && (i = N(t, r._$AS(t, i.values), r, e)), i;
}
class S {
  constructor(t, i) {
    this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = i;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    var i;
    const {
        el: {
          content: s
        },
        parts: e
      } = this._$AD,
      o = (null !== (i = null == t ? void 0 : t.creationScope) && void 0 !== i ? i : r).importNode(s, !0);
    C.currentNode = o;
    let n = C.nextNode(),
      l = 0,
      h = 0,
      d = e[0];
    for (; void 0 !== d;) {
      if (l === d.index) {
        let i;
        2 === d.type ? i = new M(n, n.nextSibling, this, t) : 1 === d.type ? i = new d.ctor(n, d.name, d.strings, this, t) : 6 === d.type && (i = new z(n, this, t)), this._$AV.push(i), d = e[++h];
      }
      l !== (null == d ? void 0 : d.index) && (n = C.nextNode(), l++);
    }
    return C.currentNode = r, o;
  }
  v(t) {
    let i = 0;
    for (const s of this._$AV) void 0 !== s && (void 0 !== s.strings ? (s._$AI(t, s, i), i += s.strings.length - 2) : s._$AI(t[i])), i++;
  }
}
class M {
  constructor(t, i, s, e) {
    var o;
    this.type = 2, this._$AH = A, this._$AN = void 0, this._$AA = t, this._$AB = i, this._$AM = s, this.options = e, this._$Cp = null === (o = null == e ? void 0 : e.isConnected) || void 0 === o || o;
  }
  get _$AU() {
    var t, i;
    return null !== (i = null === (t = this._$AM) || void 0 === t ? void 0 : t._$AU) && void 0 !== i ? i : this._$Cp;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const i = this._$AM;
    return void 0 !== i && 11 === (null == t ? void 0 : t.nodeType) && (t = i.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, i = this) {
    t = N(this, t, i), u(t) ? t === A || null == t || "" === t ? (this._$AH !== A && this._$AR(), this._$AH = A) : t !== this._$AH && t !== T && this._(t) : void 0 !== t._$litType$ ? this.g(t) : void 0 !== t.nodeType ? this.$(t) : v(t) ? this.T(t) : this._(t);
  }
  k(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  $(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.k(t));
  }
  _(t) {
    this._$AH !== A && u(this._$AH) ? this._$AA.nextSibling.data = t : this.$(r.createTextNode(t)), this._$AH = t;
  }
  g(t) {
    var i;
    const {
        values: s,
        _$litType$: e
      } = t,
      o = "number" == typeof e ? this._$AC(t) : (void 0 === e.el && (e.el = V.createElement(e.h, this.options)), e);
    if ((null === (i = this._$AH) || void 0 === i ? void 0 : i._$AD) === o) this._$AH.v(s);else {
      const t = new S(o, this),
        i = t.u(this.options);
      t.v(s), this.$(i), this._$AH = t;
    }
  }
  _$AC(t) {
    let i = E.get(t.strings);
    return void 0 === i && E.set(t.strings, i = new V(t)), i;
  }
  T(t) {
    c(this._$AH) || (this._$AH = [], this._$AR());
    const i = this._$AH;
    let s,
      e = 0;
    for (const o of t) e === i.length ? i.push(s = new M(this.k(d()), this.k(d()), this, this.options)) : s = i[e], s._$AI(o), e++;
    e < i.length && (this._$AR(s && s._$AB.nextSibling, e), i.length = e);
  }
  _$AR(t = this._$AA.nextSibling, i) {
    var s;
    for (null === (s = this._$AP) || void 0 === s || s.call(this, !1, !0, i); t && t !== this._$AB;) {
      const i = t.nextSibling;
      t.remove(), t = i;
    }
  }
  setConnected(t) {
    var i;
    void 0 === this._$AM && (this._$Cp = t, null === (i = this._$AP) || void 0 === i || i.call(this, t));
  }
}
class R {
  constructor(t, i, s, e, o) {
    this.type = 1, this._$AH = A, this._$AN = void 0, this.element = t, this.name = i, this._$AM = e, this.options = o, s.length > 2 || "" !== s[0] || "" !== s[1] ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = A;
  }
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t, i = this, s, e) {
    const o = this.strings;
    let n = !1;
    if (void 0 === o) t = N(this, t, i, 0), n = !u(t) || t !== this._$AH && t !== T, n && (this._$AH = t);else {
      const e = t;
      let l, h;
      for (t = o[0], l = 0; l < o.length - 1; l++) h = N(this, e[s + l], i, l), h === T && (h = this._$AH[l]), n || (n = !u(h) || h !== this._$AH[l]), h === A ? t = A : t !== A && (t += (null != h ? h : "") + o[l + 1]), this._$AH[l] = h;
    }
    n && !e && this.j(t);
  }
  j(t) {
    t === A ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, null != t ? t : "");
  }
}
class k extends R {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === A ? void 0 : t;
  }
}
const H = s ? s.emptyScript : "";
class I extends R {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    t && t !== A ? this.element.setAttribute(this.name, H) : this.element.removeAttribute(this.name);
  }
}
class L extends R {
  constructor(t, i, s, e, o) {
    super(t, i, s, e, o), this.type = 5;
  }
  _$AI(t, i = this) {
    var s;
    if ((t = null !== (s = N(this, t, i, 0)) && void 0 !== s ? s : A) === T) return;
    const e = this._$AH,
      o = t === A && e !== A || t.capture !== e.capture || t.once !== e.once || t.passive !== e.passive,
      n = t !== A && (e === A || o);
    o && this.element.removeEventListener(this.name, this, e), n && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var i, s;
    "function" == typeof this._$AH ? this._$AH.call(null !== (s = null === (i = this.options) || void 0 === i ? void 0 : i.host) && void 0 !== s ? s : this.element, t) : this._$AH.handleEvent(t);
  }
}
class z {
  constructor(t, i, s) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = i, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    N(this, t);
  }
}
const Z = {
    O: o,
    P: n,
    A: l,
    C: 1,
    M: P,
    L: S,
    D: v,
    R: N,
    I: M,
    V: R,
    H: I,
    N: L,
    U: k,
    F: z
  },
  j = i.litHtmlPolyfillSupport;
exports._$LH = Z;
null == j || j(V, M), (null !== (t = i.litHtmlVersions) && void 0 !== t ? t : i.litHtmlVersions = []).push("2.7.4");
const B = (t, i, s) => {
  var e, o;
  const n = null !== (e = null == s ? void 0 : s.renderBefore) && void 0 !== e ? e : i;
  let l = n._$litPart$;
  if (void 0 === l) {
    const t = null !== (o = null == s ? void 0 : s.renderBefore) && void 0 !== o ? o : null;
    n._$litPart$ = l = new M(i.insertBefore(d(), t), t, void 0, null != s ? s : {});
  }
  return l._$AI(t), l;
};
exports.render = B;
},{}],"node_modules/lit-element/lit-element.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  LitElement: true,
  UpdatingElement: true,
  _$LE: true
};
exports._$LE = exports.UpdatingElement = exports.LitElement = void 0;
var _reactiveElement = require("@lit/reactive-element");
Object.keys(_reactiveElement).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _reactiveElement[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _reactiveElement[key];
    }
  });
});
var _litHtml = require("lit-html");
Object.keys(_litHtml).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _litHtml[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _litHtml[key];
    }
  });
});
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var l, o;
const r = _reactiveElement.ReactiveElement;
exports.UpdatingElement = r;
class s extends _reactiveElement.ReactiveElement {
  constructor() {
    super(...arguments), this.renderOptions = {
      host: this
    }, this._$Do = void 0;
  }
  createRenderRoot() {
    var t, e;
    const i = super.createRenderRoot();
    return null !== (t = (e = this.renderOptions).renderBefore) && void 0 !== t || (e.renderBefore = i.firstChild), i;
  }
  update(t) {
    const i = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = (0, _litHtml.render)(i, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var t;
    super.connectedCallback(), null === (t = this._$Do) || void 0 === t || t.setConnected(!0);
  }
  disconnectedCallback() {
    var t;
    super.disconnectedCallback(), null === (t = this._$Do) || void 0 === t || t.setConnected(!1);
  }
  render() {
    return _litHtml.noChange;
  }
}
exports.LitElement = s;
s.finalized = !0, s._$litElement$ = !0, null === (l = globalThis.litElementHydrateSupport) || void 0 === l || l.call(globalThis, {
  LitElement: s
});
const n = globalThis.litElementPolyfillSupport;
null == n || n({
  LitElement: s
});
const h = {
  _$AK: (t, e, i) => {
    t._$AK(e, i);
  },
  _$AL: t => t._$AL
};
exports._$LE = h;
(null !== (o = globalThis.litElementVersions) && void 0 !== o ? o : globalThis.litElementVersions = []).push("3.3.2");
},{"@lit/reactive-element":"node_modules/@lit/reactive-element/reactive-element.js","lit-html":"node_modules/lit-html/lit-html.js"}],"node_modules/lit-html/is-server.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isServer = void 0;
/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const o = !1;
exports.isServer = o;
},{}],"node_modules/lit/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
require("@lit/reactive-element");
require("lit-html");
var _litElement = require("lit-element/lit-element.js");
Object.keys(_litElement).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _litElement[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _litElement[key];
    }
  });
});
var _isServer = require("lit-html/is-server.js");
Object.keys(_isServer).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _isServer[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _isServer[key];
    }
  });
});
},{"@lit/reactive-element":"node_modules/@lit/reactive-element/reactive-element.js","lit-html":"node_modules/lit-html/lit-html.js","lit-element/lit-element.js":"node_modules/lit-element/lit-element.js","lit-html/is-server.js":"node_modules/lit-html/is-server.js"}],"node_modules/@lit/reactive-element/decorators/custom-element.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.customElement = void 0;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const e = e => n => "function" == typeof n ? ((e, n) => (customElements.define(e, n), n))(e, n) : ((e, n) => {
  const {
    kind: t,
    elements: s
  } = n;
  return {
    kind: t,
    elements: s,
    finisher(n) {
      customElements.define(e, n);
    }
  };
})(e, n);
exports.customElement = e;
},{}],"node_modules/@lit/reactive-element/decorators/property.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.property = e;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const i = (i, e) => "method" === e.kind && e.descriptor && !("value" in e.descriptor) ? {
  ...e,
  finisher(n) {
    n.createProperty(e.key, i);
  }
} : {
  kind: "field",
  key: Symbol(),
  placement: "own",
  descriptor: {},
  originalKey: e.key,
  initializer() {
    "function" == typeof e.initializer && (this[e.key] = e.initializer.call(this));
  },
  finisher(n) {
    n.createProperty(e.key, i);
  }
};
function e(e) {
  return (n, t) => void 0 !== t ? ((i, e, n) => {
    e.constructor.createProperty(n, i);
  })(e, n, t) : i(e, n);
}
},{}],"node_modules/@lit/reactive-element/decorators/state.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.state = t;
var _property = require("./property.js");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function t(t) {
  return (0, _property.property)({
    ...t,
    state: !0
  });
}
},{"./property.js":"node_modules/@lit/reactive-element/decorators/property.js"}],"node_modules/@lit/reactive-element/decorators/base.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.standardPrototypeMethod = exports.legacyPrototypeMethod = exports.decorateProperty = void 0;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const e = (e, t, o) => {
    Object.defineProperty(t, o, e);
  },
  t = (e, t) => ({
    kind: "method",
    placement: "prototype",
    key: t.key,
    descriptor: e
  }),
  o = ({
    finisher: e,
    descriptor: t
  }) => (o, n) => {
    var r;
    if (void 0 === n) {
      const n = null !== (r = o.originalKey) && void 0 !== r ? r : o.key,
        i = null != t ? {
          kind: "method",
          placement: "prototype",
          key: n,
          descriptor: t(o.key)
        } : {
          ...o,
          key: n
        };
      return null != e && (i.finisher = function (t) {
        e(t, n);
      }), i;
    }
    {
      const r = o.constructor;
      void 0 !== t && Object.defineProperty(o, n, t(n)), null == e || e(r, n);
    }
  };
exports.decorateProperty = o;
exports.standardPrototypeMethod = t;
exports.legacyPrototypeMethod = e;
},{}],"node_modules/@lit/reactive-element/decorators/event-options.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.eventOptions = e;
var _base = require("./base.js");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function e(e) {
  return (0, _base.decorateProperty)({
    finisher: (r, t) => {
      Object.assign(r.prototype[t], e);
    }
  });
}
},{"./base.js":"node_modules/@lit/reactive-element/decorators/base.js"}],"node_modules/@lit/reactive-element/decorators/query.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.query = i;
var _base = require("./base.js");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function i(i, n) {
  return (0, _base.decorateProperty)({
    descriptor: o => {
      const t = {
        get() {
          var o, n;
          return null !== (n = null === (o = this.renderRoot) || void 0 === o ? void 0 : o.querySelector(i)) && void 0 !== n ? n : null;
        },
        enumerable: !0,
        configurable: !0
      };
      if (n) {
        const n = "symbol" == typeof o ? Symbol() : "__" + o;
        t.get = function () {
          var o, t;
          return void 0 === this[n] && (this[n] = null !== (t = null === (o = this.renderRoot) || void 0 === o ? void 0 : o.querySelector(i)) && void 0 !== t ? t : null), this[n];
        };
      }
      return t;
    }
  });
}
},{"./base.js":"node_modules/@lit/reactive-element/decorators/base.js"}],"node_modules/@lit/reactive-element/decorators/query-all.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.queryAll = e;
var _base = require("./base.js");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function e(e) {
  return (0, _base.decorateProperty)({
    descriptor: r => ({
      get() {
        var r, o;
        return null !== (o = null === (r = this.renderRoot) || void 0 === r ? void 0 : r.querySelectorAll(e)) && void 0 !== o ? o : [];
      },
      enumerable: !0,
      configurable: !0
    })
  });
}
},{"./base.js":"node_modules/@lit/reactive-element/decorators/base.js"}],"node_modules/@lit/reactive-element/decorators/query-async.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.queryAsync = e;
var _base = require("./base.js");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function e(e) {
  return (0, _base.decorateProperty)({
    descriptor: r => ({
      async get() {
        var r;
        return await this.updateComplete, null === (r = this.renderRoot) || void 0 === r ? void 0 : r.querySelector(e);
      },
      enumerable: !0,
      configurable: !0
    })
  });
}
},{"./base.js":"node_modules/@lit/reactive-element/decorators/base.js"}],"node_modules/@lit/reactive-element/decorators/query-assigned-elements.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.queryAssignedElements = l;
var _base = require("./base.js");
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var n;
const e = null != (null === (n = window.HTMLSlotElement) || void 0 === n ? void 0 : n.prototype.assignedElements) ? (o, n) => o.assignedElements(n) : (o, n) => o.assignedNodes(n).filter(o => o.nodeType === Node.ELEMENT_NODE);
function l(n) {
  const {
    slot: l,
    selector: t
  } = null != n ? n : {};
  return (0, _base.decorateProperty)({
    descriptor: o => ({
      get() {
        var o;
        const r = "slot" + (l ? `[name=${l}]` : ":not([name])"),
          i = null === (o = this.renderRoot) || void 0 === o ? void 0 : o.querySelector(r),
          s = null != i ? e(i, n) : [];
        return t ? s.filter(o => o.matches(t)) : s;
      },
      enumerable: !0,
      configurable: !0
    })
  });
}
},{"./base.js":"node_modules/@lit/reactive-element/decorators/base.js"}],"node_modules/@lit/reactive-element/decorators/query-assigned-nodes.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.queryAssignedNodes = o;
var _base = require("./base.js");
var _queryAssignedElements = require("./query-assigned-elements.js");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function o(o, n, r) {
  let l,
    s = o;
  return "object" == typeof o ? (s = o.slot, l = o) : l = {
    flatten: n
  }, r ? (0, _queryAssignedElements.queryAssignedElements)({
    slot: s,
    flatten: n,
    selector: r
  }) : (0, _base.decorateProperty)({
    descriptor: e => ({
      get() {
        var e, t;
        const o = "slot" + (s ? `[name=${s}]` : ":not([name])"),
          n = null === (e = this.renderRoot) || void 0 === e ? void 0 : e.querySelector(o);
        return null !== (t = null == n ? void 0 : n.assignedNodes(l)) && void 0 !== t ? t : [];
      },
      enumerable: !0,
      configurable: !0
    })
  });
}
},{"./base.js":"node_modules/@lit/reactive-element/decorators/base.js","./query-assigned-elements.js":"node_modules/@lit/reactive-element/decorators/query-assigned-elements.js"}],"node_modules/lit/decorators.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _customElement = require("@lit/reactive-element/decorators/custom-element.js");
Object.keys(_customElement).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _customElement[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _customElement[key];
    }
  });
});
var _property = require("@lit/reactive-element/decorators/property.js");
Object.keys(_property).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _property[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _property[key];
    }
  });
});
var _state = require("@lit/reactive-element/decorators/state.js");
Object.keys(_state).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _state[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _state[key];
    }
  });
});
var _eventOptions = require("@lit/reactive-element/decorators/event-options.js");
Object.keys(_eventOptions).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _eventOptions[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _eventOptions[key];
    }
  });
});
var _query = require("@lit/reactive-element/decorators/query.js");
Object.keys(_query).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _query[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _query[key];
    }
  });
});
var _queryAll = require("@lit/reactive-element/decorators/query-all.js");
Object.keys(_queryAll).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _queryAll[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _queryAll[key];
    }
  });
});
var _queryAsync = require("@lit/reactive-element/decorators/query-async.js");
Object.keys(_queryAsync).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _queryAsync[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _queryAsync[key];
    }
  });
});
var _queryAssignedElements = require("@lit/reactive-element/decorators/query-assigned-elements.js");
Object.keys(_queryAssignedElements).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _queryAssignedElements[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _queryAssignedElements[key];
    }
  });
});
var _queryAssignedNodes = require("@lit/reactive-element/decorators/query-assigned-nodes.js");
Object.keys(_queryAssignedNodes).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _queryAssignedNodes[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _queryAssignedNodes[key];
    }
  });
});
},{"@lit/reactive-element/decorators/custom-element.js":"node_modules/@lit/reactive-element/decorators/custom-element.js","@lit/reactive-element/decorators/property.js":"node_modules/@lit/reactive-element/decorators/property.js","@lit/reactive-element/decorators/state.js":"node_modules/@lit/reactive-element/decorators/state.js","@lit/reactive-element/decorators/event-options.js":"node_modules/@lit/reactive-element/decorators/event-options.js","@lit/reactive-element/decorators/query.js":"node_modules/@lit/reactive-element/decorators/query.js","@lit/reactive-element/decorators/query-all.js":"node_modules/@lit/reactive-element/decorators/query-all.js","@lit/reactive-element/decorators/query-async.js":"node_modules/@lit/reactive-element/decorators/query-async.js","@lit/reactive-element/decorators/query-assigned-elements.js":"node_modules/@lit/reactive-element/decorators/query-assigned-elements.js","@lit/reactive-element/decorators/query-assigned-nodes.js":"node_modules/@lit/reactive-element/decorators/query-assigned-nodes.js"}],"node_modules/@web3modal/core/dist/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WcConnectionCtrl = exports.ToastCtrl = exports.ThemeCtrl = exports.RouterCtrl = exports.OptionsCtrl = exports.ModalCtrl = exports.ExplorerCtrl = exports.EventsCtrl = exports.CoreUtil = exports.ConfigCtrl = exports.ClientCtrl = exports.AccountCtrl = void 0;
var _vanilla = require("valtio/vanilla");
var _buffer = require("buffer");
let N;
const C = {
    ethereumClient: void 0,
    setEthereumClient(e) {
      N = e;
    },
    client() {
      if (N) return N;
      throw new Error("ClientCtrl has no client set");
    }
  },
  i = (0, _vanilla.proxy)({
    history: ["ConnectWallet"],
    view: "ConnectWallet",
    data: void 0
  }),
  b = {
    state: i,
    subscribe(e) {
      return (0, _vanilla.subscribe)(i, () => e(i));
    },
    push(e, t) {
      e !== i.view && (i.view = e, t && (i.data = t), i.history.push(e));
    },
    reset(e) {
      i.view = e, i.history = [e];
    },
    replace(e) {
      i.history.length > 1 && (i.history[i.history.length - 1] = e, i.view = e);
    },
    goBack() {
      if (i.history.length > 1) {
        i.history.pop();
        const [e] = i.history.slice(-1);
        i.view = e;
      }
    },
    setData(e) {
      i.data = e;
    }
  },
  c = {
    WALLETCONNECT_DEEPLINK_CHOICE: "WALLETCONNECT_DEEPLINK_CHOICE",
    W3M_VERSION: "W3M_VERSION",
    W3M_PREFER_INJECTED_URL_FLAG: "w3mPreferInjected",
    RECOMMENDED_WALLET_AMOUNT: 9,
    isMobile() {
      return typeof window < "u" ? !!(window.matchMedia("(pointer:coarse)").matches || /Android|webOS|iPhone|iPad|iPod|BlackBerry|Opera Mini/u.test(navigator.userAgent)) : !1;
    },
    isAndroid() {
      return c.isMobile() && navigator.userAgent.toLowerCase().includes("android");
    },
    isIos() {
      const e = navigator.userAgent.toLowerCase();
      return c.isMobile() && (e.includes("iphone") || e.includes("ipad"));
    },
    isHttpUrl(e) {
      return e.startsWith("http://") || e.startsWith("https://");
    },
    isArray(e) {
      return Array.isArray(e) && e.length > 0;
    },
    formatNativeUrl(e, t, n) {
      if (c.isHttpUrl(e)) return this.formatUniversalUrl(e, t, n);
      let s = e;
      s.includes("://") || (s = e.replaceAll("/", "").replaceAll(":", ""), s = `${s}://`), this.setWalletConnectDeepLink(s, n);
      const a = encodeURIComponent(t);
      return `${s}wc?uri=${a}`;
    },
    formatUniversalUrl(e, t, n) {
      if (!c.isHttpUrl(e)) return this.formatNativeUrl(e, t, n);
      let s = e;
      e.endsWith("/") && (s = e.slice(0, -1)), this.setWalletConnectDeepLink(s, n);
      const a = encodeURIComponent(t);
      return `${s}/wc?uri=${a}`;
    },
    async wait(e) {
      return new Promise(t => {
        setTimeout(t, e);
      });
    },
    openHref(e, t) {
      window.open(e, t, "noreferrer noopener");
    },
    setWalletConnectDeepLink(e, t) {
      localStorage.setItem(c.WALLETCONNECT_DEEPLINK_CHOICE, JSON.stringify({
        href: e,
        name: t
      }));
    },
    setWalletConnectAndroidDeepLink(e) {
      const [t] = e.split("?");
      localStorage.setItem(c.WALLETCONNECT_DEEPLINK_CHOICE, JSON.stringify({
        href: t,
        name: "Android"
      }));
    },
    removeWalletConnectDeepLink() {
      localStorage.removeItem(c.WALLETCONNECT_DEEPLINK_CHOICE);
    },
    setWeb3ModalVersionInStorage() {
      typeof localStorage < "u" && localStorage.setItem(c.W3M_VERSION, "2.4.1");
    },
    getWalletRouterData() {
      var e;
      const t = (e = b.state.data) == null ? void 0 : e.Wallet;
      if (!t) throw new Error('Missing "Wallet" view data');
      return t;
    },
    getSwitchNetworkRouterData() {
      var e;
      const t = (e = b.state.data) == null ? void 0 : e.SwitchNetwork;
      if (!t) throw new Error('Missing "SwitchNetwork" view data');
      return t;
    },
    isPreferInjectedFlag() {
      return typeof location < "u" ? new URLSearchParams(location.search).has(c.W3M_PREFER_INJECTED_URL_FLAG) : !1;
    }
  },
  B = typeof location < "u" && (location.hostname.includes("localhost") || location.protocol.includes("https")),
  u = (0, _vanilla.proxy)({
    enabled: B,
    userSessionId: "",
    events: [],
    connectedWalletId: void 0
  }),
  H = {
    state: u,
    subscribe(e) {
      return (0, _vanilla.subscribe)(u.events, () => e((0, _vanilla.snapshot)(u.events[u.events.length - 1])));
    },
    initialize() {
      u.enabled && typeof crypto < "u" && (u.userSessionId = crypto.randomUUID());
    },
    setConnectedWalletId(e) {
      u.connectedWalletId = e;
    },
    click(e) {
      if (u.enabled) {
        const t = {
          type: "CLICK",
          name: e.name,
          userSessionId: u.userSessionId,
          timestamp: Date.now(),
          data: e
        };
        u.events.push(t);
      }
    },
    track(e) {
      if (u.enabled) {
        const t = {
          type: "TRACK",
          name: e.name,
          userSessionId: u.userSessionId,
          timestamp: Date.now(),
          data: e
        };
        u.events.push(t);
      }
    },
    view(e) {
      if (u.enabled) {
        const t = {
          type: "VIEW",
          name: e.name,
          userSessionId: u.userSessionId,
          timestamp: Date.now(),
          data: e
        };
        u.events.push(t);
      }
    }
  },
  l = (0, _vanilla.proxy)({
    selectedChain: void 0,
    chains: void 0,
    standaloneChains: void 0,
    standaloneUri: void 0,
    isStandalone: !1,
    isAuth: !1,
    isCustomDesktop: !1,
    isCustomMobile: !1,
    isDataLoaded: !1,
    isUiLoaded: !1,
    isPreferInjected: !1,
    walletConnectVersion: 1
  }),
  d = {
    state: l,
    subscribe(e) {
      return (0, _vanilla.subscribe)(l, () => e(l));
    },
    setChains(e) {
      l.chains = e;
    },
    setStandaloneChains(e) {
      l.standaloneChains = e;
    },
    setStandaloneUri(e) {
      l.standaloneUri = e;
    },
    getSelectedChain() {
      const e = C.client().getNetwork().chain;
      return e && (l.selectedChain = e), l.selectedChain;
    },
    setSelectedChain(e) {
      l.selectedChain = e;
    },
    setIsStandalone(e) {
      l.isStandalone = e;
    },
    setIsCustomDesktop(e) {
      l.isCustomDesktop = e;
    },
    setIsCustomMobile(e) {
      l.isCustomMobile = e;
    },
    setIsDataLoaded(e) {
      l.isDataLoaded = e;
    },
    setIsUiLoaded(e) {
      l.isUiLoaded = e;
    },
    setWalletConnectVersion(e) {
      l.walletConnectVersion = e;
    },
    setIsPreferInjected(e) {
      l.isPreferInjected = e;
    },
    setIsAuth(e) {
      l.isAuth = e;
    }
  },
  O = (0, _vanilla.proxy)({
    projectId: "",
    mobileWallets: void 0,
    desktopWallets: void 0,
    walletImages: void 0,
    chainImages: void 0,
    tokenImages: void 0,
    tokenContracts: void 0,
    standaloneChains: void 0,
    enableStandaloneMode: !1,
    enableAuthMode: !1,
    enableNetworkView: !1,
    enableAccountView: !0,
    enableExplorer: !0,
    defaultChain: void 0,
    explorerExcludedWalletIds: void 0,
    explorerRecommendedWalletIds: void 0,
    termsOfServiceUrl: void 0,
    privacyPolicyUrl: void 0
  }),
  y = {
    state: O,
    subscribe(e) {
      return (0, _vanilla.subscribe)(O, () => e(O));
    },
    setConfig(e) {
      var t, n, s, a;
      H.initialize(), d.setStandaloneChains(e.standaloneChains), d.setIsStandalone(!!((t = e.standaloneChains) != null && t.length) || !!e.enableStandaloneMode), d.setIsAuth(!!e.enableAuthMode), d.setIsCustomMobile(!!((n = e.mobileWallets) != null && n.length)), d.setIsCustomDesktop(!!((s = e.desktopWallets) != null && s.length)), d.setWalletConnectVersion((a = e.walletConnectVersion) != null ? a : 1), d.state.isStandalone || (d.setChains(C.client().chains), d.setIsPreferInjected(C.client().isInjectedProviderInstalled() && c.isPreferInjectedFlag())), e.defaultChain && d.setSelectedChain(e.defaultChain), c.setWeb3ModalVersionInStorage(), Object.assign(O, e);
    }
  },
  o = (0, _vanilla.proxy)({
    address: void 0,
    profileName: void 0,
    profileAvatar: void 0,
    profileLoading: !1,
    balanceLoading: !1,
    balance: void 0,
    isConnected: !1
  }),
  K = {
    state: o,
    subscribe(e) {
      return (0, _vanilla.subscribe)(o, () => e(o));
    },
    getAccount() {
      const e = C.client().getAccount();
      o.address = e.address, o.isConnected = e.isConnected;
    },
    async fetchProfile(e, t) {
      var n;
      try {
        o.profileLoading = !0;
        const s = t ?? o.address,
          a = (n = d.state.chains) == null ? void 0 : n.find(r => r.id === 1);
        if (s && a) {
          const r = await C.client().fetchEnsName({
            address: s,
            chainId: 1
          });
          if (r) {
            const p = await C.client().fetchEnsAvatar({
              name: r,
              chainId: 1
            });
            p && (await e(p)), o.profileAvatar = p;
          }
          o.profileName = r;
        }
      } finally {
        o.profileLoading = !1;
      }
    },
    async fetchBalance(e) {
      try {
        const {
            chain: t
          } = C.client().getNetwork(),
          {
            tokenContracts: n
          } = y.state;
        let s;
        t && n && (s = n[t.id]), o.balanceLoading = !0;
        const a = e ?? o.address;
        if (a) {
          const r = await C.client().fetchBalance({
            address: a,
            token: s
          });
          o.balance = {
            amount: r.formatted,
            symbol: r.symbol
          };
        }
      } finally {
        o.balanceLoading = !1;
      }
    },
    setAddress(e) {
      o.address = e;
    },
    setIsConnected(e) {
      o.isConnected = e;
    },
    resetBalance() {
      o.balance = void 0;
    },
    resetAccount() {
      o.address = void 0, o.isConnected = !1, o.profileName = void 0, o.profileAvatar = void 0, o.balance = void 0;
    }
  },
  M = "https://explorer-api.walletconnect.com";
exports.AccountCtrl = K;
exports.ConfigCtrl = y;
exports.OptionsCtrl = d;
exports.EventsCtrl = H;
exports.CoreUtil = c;
exports.RouterCtrl = b;
exports.ClientCtrl = C;
async function U(e, t) {
  const n = new URL(e, M);
  return n.searchParams.append("projectId", y.state.projectId), Object.entries(t).forEach(([s, a]) => {
    a && n.searchParams.append(s, String(a));
  }), (await fetch(n)).json();
}
const I = {
  async getDesktopListings(e) {
    return U("/w3m/v1/getDesktopListings", e);
  },
  async getMobileListings(e) {
    return U("/w3m/v1/getMobileListings", e);
  },
  async getInjectedListings(e) {
    return U("/w3m/v1/getInjectedListings", e);
  },
  async getAllListings(e) {
    return U("/w3m/v1/getAllListings", e);
  },
  getWalletImageUrl(e) {
    return `${M}/w3m/v1/getWalletImage/${e}?projectId=${y.state.projectId}`;
  },
  getAssetImageUrl(e) {
    return `${M}/w3m/v1/getAssetImage/${e}?projectId=${y.state.projectId}`;
  }
};
var F = Object.defineProperty,
  D = Object.getOwnPropertySymbols,
  J = Object.prototype.hasOwnProperty,
  z = Object.prototype.propertyIsEnumerable,
  k = (e, t, n) => t in e ? F(e, t, {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: n
  }) : e[t] = n,
  G = (e, t) => {
    for (var n in t || (t = {})) J.call(t, n) && k(e, n, t[n]);
    if (D) for (var n of D(t)) z.call(t, n) && k(e, n, t[n]);
    return e;
  };
const P = c.isMobile(),
  g = (0, _vanilla.proxy)({
    wallets: {
      listings: [],
      total: 0,
      page: 1
    },
    injectedWallets: [],
    search: {
      listings: [],
      total: 0,
      page: 1
    },
    recomendedWallets: []
  }),
  ne = {
    state: g,
    async getRecomendedWallets() {
      const {
        explorerRecommendedWalletIds: e,
        explorerExcludedWalletIds: t
      } = y.state;
      if (e === "NONE" || t === "ALL" && !e) return g.recomendedWallets;
      if (c.isArray(e)) {
        const n = {
            recommendedIds: e.join(",")
          },
          {
            listings: s
          } = await I.getAllListings(n),
          a = Object.values(s);
        a.sort((r, p) => {
          const v = e.indexOf(r.id),
            h = e.indexOf(p.id);
          return v - h;
        }), g.recomendedWallets = a;
      } else {
        const {
            standaloneChains: n,
            walletConnectVersion: s,
            isAuth: a
          } = d.state,
          r = n?.join(","),
          p = c.isArray(t),
          v = {
            page: 1,
            sdks: a ? "auth_v1" : void 0,
            entries: c.RECOMMENDED_WALLET_AMOUNT,
            chains: r,
            version: s,
            excludedIds: p ? t.join(",") : void 0
          },
          {
            listings: h
          } = P ? await I.getMobileListings(v) : await I.getDesktopListings(v);
        g.recomendedWallets = Object.values(h);
      }
      return g.recomendedWallets;
    },
    async getWallets(e) {
      const t = G({}, e),
        {
          explorerRecommendedWalletIds: n,
          explorerExcludedWalletIds: s
        } = y.state,
        {
          recomendedWallets: a
        } = g;
      if (s === "ALL") return g.wallets;
      t.search || (a.length ? t.excludedIds = a.map(W => W.id).join(",") : c.isArray(n) && (t.excludedIds = n.join(","))), c.isArray(s) && (t.excludedIds = [t.excludedIds, s].filter(Boolean).join(",")), d.state.isAuth && (t.sdks = "auth_v1");
      const {
          page: r,
          search: p
        } = e,
        {
          listings: v,
          total: h
        } = P ? await I.getMobileListings(t) : await I.getDesktopListings(t),
        j = Object.values(v),
        L = p ? "search" : "wallets";
      return g[L] = {
        listings: [...g[L].listings, ...j],
        total: h,
        page: r ?? 1
      }, {
        listings: j,
        total: h
      };
    },
    async getInjectedWallets() {
      const {
          listings: e
        } = await I.getInjectedListings({}),
        t = Object.values(e);
      return g.injectedWallets = t, g.injectedWallets;
    },
    getWalletImageUrl(e) {
      return I.getWalletImageUrl(e);
    },
    getAssetImageUrl(e) {
      return I.getAssetImageUrl(e);
    },
    resetSearch() {
      g.search = {
        listings: [],
        total: 0,
        page: 1
      };
    }
  },
  A = (0, _vanilla.proxy)({
    pairingUri: "",
    pairingError: !1
  }),
  _ = {
    state: A,
    subscribe(e) {
      return (0, _vanilla.subscribe)(A, () => e(A));
    },
    setPairingUri(e) {
      A.pairingUri = e;
    },
    setPairingError(e) {
      A.pairingError = e;
    }
  },
  E = (0, _vanilla.proxy)({
    open: !1
  }),
  se = {
    state: E,
    subscribe(e) {
      return (0, _vanilla.subscribe)(E, () => e(E));
    },
    async open(e) {
      return new Promise(t => {
        const {
            isStandalone: n,
            isUiLoaded: s,
            isDataLoaded: a,
            isPreferInjected: r,
            selectedChain: p
          } = d.state,
          {
            pairingUri: v
          } = _.state,
          {
            isConnected: h
          } = K.state,
          {
            enableNetworkView: j
          } = y.state;
        if (n) d.setStandaloneUri(e?.uri), d.setStandaloneChains(e?.standaloneChains), b.reset("ConnectWallet");else if (e != null && e.route) b.reset(e.route);else if (h) b.reset("Account");else if (j) b.reset("SelectNetwork");else if (r) {
          C.client().connectConnector("injected", p?.id).catch(L => console.error(L)), t();
          return;
        } else b.reset("ConnectWallet");
        if (s && a && (n || v || h)) E.open = !0, t();else {
          const L = setInterval(() => {
            const W = d.state,
              T = _.state;
            W.isUiLoaded && W.isDataLoaded && (W.isStandalone || T.pairingUri || h) && (clearInterval(L), E.open = !0, t());
          }, 200);
        }
      });
    },
    close() {
      E.open = !1;
    }
  };
exports.ModalCtrl = se;
exports.WcConnectionCtrl = _;
exports.ExplorerCtrl = ne;
var q = Object.defineProperty,
  x = Object.getOwnPropertySymbols,
  Q = Object.prototype.hasOwnProperty,
  X = Object.prototype.propertyIsEnumerable,
  R = (e, t, n) => t in e ? q(e, t, {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: n
  }) : e[t] = n,
  Y = (e, t) => {
    for (var n in t || (t = {})) Q.call(t, n) && R(e, n, t[n]);
    if (x) for (var n of x(t)) X.call(t, n) && R(e, n, t[n]);
    return e;
  };
function Z() {
  return typeof matchMedia < "u" && matchMedia("(prefers-color-scheme: dark)").matches;
}
const S = (0, _vanilla.proxy)({
    themeMode: Z() ? "dark" : "light"
  }),
  ae = {
    state: S,
    subscribe(e) {
      return (0, _vanilla.subscribe)(S, () => e(S));
    },
    setThemeConfig(e) {
      const {
        themeMode: t,
        themeVariables: n
      } = e;
      t && (S.themeMode = t), n && (S.themeVariables = Y({}, n));
    }
  },
  w = (0, _vanilla.proxy)({
    open: !1,
    message: "",
    variant: "success"
  }),
  oe = {
    state: w,
    subscribe(e) {
      return (0, _vanilla.subscribe)(w, () => e(w));
    },
    openToast(e, t) {
      w.open = !0, w.message = e, w.variant = t;
    },
    closeToast() {
      w.open = !1;
    }
  };
exports.ToastCtrl = oe;
exports.ThemeCtrl = ae;
typeof window < "u" && (window.Buffer || (window.Buffer = _buffer.Buffer), window.global || (window.global = window), window.process || (window.process = {
  env: {}
}));
},{"valtio/vanilla":"node_modules/valtio/vanilla.js","buffer":"../.nvm/versions/node/v18.15.0/lib/node_modules/parcel-bundler/node_modules/buffer/index.js"}],"node_modules/lit-html/directive.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.directive = exports.PartType = exports.Directive = void 0;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t = {
    ATTRIBUTE: 1,
    CHILD: 2,
    PROPERTY: 3,
    BOOLEAN_ATTRIBUTE: 4,
    EVENT: 5,
    ELEMENT: 6
  },
  e = t => (...e) => ({
    _$litDirective$: t,
    values: e
  });
exports.directive = e;
exports.PartType = t;
class i {
  constructor(t) {}
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(t, e, i) {
    this._$Ct = t, this._$AM = e, this._$Ci = i;
  }
  _$AS(t, e) {
    return this.update(t, e);
  }
  update(t, e) {
    return this.render(...e);
  }
}
exports.Directive = i;
},{}],"node_modules/lit-html/directives/class-map.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.classMap = void 0;
var _litHtml = require("../lit-html.js");
var _directive = require("../directive.js");
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const o = (0, _directive.directive)(class extends _directive.Directive {
  constructor(t) {
    var i;
    if (super(t), t.type !== _directive.PartType.ATTRIBUTE || "class" !== t.name || (null === (i = t.strings) || void 0 === i ? void 0 : i.length) > 2) throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.");
  }
  render(t) {
    return " " + Object.keys(t).filter(i => t[i]).join(" ") + " ";
  }
  update(i, [s]) {
    var r, o;
    if (void 0 === this.it) {
      this.it = new Set(), void 0 !== i.strings && (this.nt = new Set(i.strings.join(" ").split(/\s/).filter(t => "" !== t)));
      for (const t in s) s[t] && !(null === (r = this.nt) || void 0 === r ? void 0 : r.has(t)) && this.it.add(t);
      return this.render(s);
    }
    const e = i.element.classList;
    this.it.forEach(t => {
      t in s || (e.remove(t), this.it.delete(t));
    });
    for (const t in s) {
      const i = !!s[t];
      i === this.it.has(t) || (null === (o = this.nt) || void 0 === o ? void 0 : o.has(t)) || (i ? (e.add(t), this.it.add(t)) : (e.remove(t), this.it.delete(t)));
    }
    return _litHtml.noChange;
  }
});
exports.classMap = o;
},{"../lit-html.js":"node_modules/lit-html/lit-html.js","../directive.js":"node_modules/lit-html/directive.js"}],"node_modules/lit/directives/class-map.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _classMap = require("lit-html/directives/class-map.js");
Object.keys(_classMap).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _classMap[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _classMap[key];
    }
  });
});
},{"lit-html/directives/class-map.js":"node_modules/lit-html/directives/class-map.js"}],"node_modules/@motionone/utils/dist/array.es.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addUniqueItem = addUniqueItem;
exports.removeItem = removeItem;
function addUniqueItem(array, item) {
  array.indexOf(item) === -1 && array.push(item);
}
function removeItem(arr, item) {
  const index = arr.indexOf(item);
  index > -1 && arr.splice(index, 1);
}
},{}],"node_modules/@motionone/utils/dist/clamp.es.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.clamp = void 0;
const clamp = (min, max, v) => Math.min(Math.max(v, min), max);
exports.clamp = clamp;
},{}],"node_modules/@motionone/utils/dist/defaults.es.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaults = void 0;
const defaults = {
  duration: 0.3,
  delay: 0,
  endDelay: 0,
  repeat: 0,
  easing: "ease"
};
exports.defaults = defaults;
},{}],"node_modules/@motionone/utils/dist/is-number.es.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isNumber = void 0;
const isNumber = value => typeof value === "number";
exports.isNumber = isNumber;
},{}],"node_modules/@motionone/utils/dist/is-easing-list.es.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isEasingList = void 0;
var _isNumberEs = require("./is-number.es.js");
const isEasingList = easing => Array.isArray(easing) && !(0, _isNumberEs.isNumber)(easing[0]);
exports.isEasingList = isEasingList;
},{"./is-number.es.js":"node_modules/@motionone/utils/dist/is-number.es.js"}],"node_modules/@motionone/utils/dist/wrap.es.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.wrap = void 0;
const wrap = (min, max, v) => {
  const rangeSize = max - min;
  return ((v - min) % rangeSize + rangeSize) % rangeSize + min;
};
exports.wrap = wrap;
},{}],"node_modules/@motionone/utils/dist/easing.es.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getEasingForSegment = getEasingForSegment;
var _isEasingListEs = require("./is-easing-list.es.js");
var _wrapEs = require("./wrap.es.js");
function getEasingForSegment(easing, i) {
  return (0, _isEasingListEs.isEasingList)(easing) ? easing[(0, _wrapEs.wrap)(0, easing.length, i)] : easing;
}
},{"./is-easing-list.es.js":"node_modules/@motionone/utils/dist/is-easing-list.es.js","./wrap.es.js":"node_modules/@motionone/utils/dist/wrap.es.js"}],"node_modules/@motionone/utils/dist/mix.es.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mix = void 0;
const mix = (min, max, progress) => -progress * min + progress * max + min;
exports.mix = mix;
},{}],"node_modules/@motionone/utils/dist/noop.es.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.noopReturn = exports.noop = void 0;
const noop = () => {};
exports.noop = noop;
const noopReturn = v => v;
exports.noopReturn = noopReturn;
},{}],"node_modules/@motionone/utils/dist/progress.es.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.progress = void 0;
const progress = (min, max, value) => max - min === 0 ? 1 : (value - min) / (max - min);
exports.progress = progress;
},{}],"node_modules/@motionone/utils/dist/offset.es.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultOffset = defaultOffset;
exports.fillOffset = fillOffset;
var _mixEs = require("./mix.es.js");
var _progressEs = require("./progress.es.js");
function fillOffset(offset, remaining) {
  const min = offset[offset.length - 1];
  for (let i = 1; i <= remaining; i++) {
    const offsetProgress = (0, _progressEs.progress)(0, remaining, i);
    offset.push((0, _mixEs.mix)(min, 1, offsetProgress));
  }
}
function defaultOffset(length) {
  const offset = [0];
  fillOffset(offset, length - 1);
  return offset;
}
},{"./mix.es.js":"node_modules/@motionone/utils/dist/mix.es.js","./progress.es.js":"node_modules/@motionone/utils/dist/progress.es.js"}],"node_modules/@motionone/utils/dist/interpolate.es.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.interpolate = interpolate;
var _mixEs = require("./mix.es.js");
var _noopEs = require("./noop.es.js");
var _offsetEs = require("./offset.es.js");
var _progressEs = require("./progress.es.js");
var _easingEs = require("./easing.es.js");
var _clampEs = require("./clamp.es.js");
function interpolate(output, input = (0, _offsetEs.defaultOffset)(output.length), easing = _noopEs.noopReturn) {
  const length = output.length;
  /**
   * If the input length is lower than the output we
   * fill the input to match. This currently assumes the input
   * is an animation progress value so is a good candidate for
   * moving outside the function.
   */
  const remainder = length - input.length;
  remainder > 0 && (0, _offsetEs.fillOffset)(input, remainder);
  return t => {
    let i = 0;
    for (; i < length - 2; i++) {
      if (t < input[i + 1]) break;
    }
    let progressInRange = (0, _clampEs.clamp)(0, 1, (0, _progressEs.progress)(input[i], input[i + 1], t));
    const segmentEasing = (0, _easingEs.getEasingForSegment)(easing, i);
    progressInRange = segmentEasing(progressInRange);
    return (0, _mixEs.mix)(output[i], output[i + 1], progressInRange);
  };
}
},{"./mix.es.js":"node_modules/@motionone/utils/dist/mix.es.js","./noop.es.js":"node_modules/@motionone/utils/dist/noop.es.js","./offset.es.js":"node_modules/@motionone/utils/dist/offset.es.js","./progress.es.js":"node_modules/@motionone/utils/dist/progress.es.js","./easing.es.js":"node_modules/@motionone/utils/dist/easing.es.js","./clamp.es.js":"node_modules/@motionone/utils/dist/clamp.es.js"}],"node_modules/@motionone/utils/dist/is-cubic-bezier.es.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isCubicBezier = void 0;
var _isNumberEs = require("./is-number.es.js");
const isCubicBezier = easing => Array.isArray(easing) && (0, _isNumberEs.isNumber)(easing[0]);
exports.isCubicBezier = isCubicBezier;
},{"./is-number.es.js":"node_modules/@motionone/utils/dist/is-number.es.js"}],"node_modules/@motionone/utils/dist/is-easing-generator.es.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isEasingGenerator = void 0;
const isEasingGenerator = easing => typeof easing === "object" && Boolean(easing.createAnimation);
exports.isEasingGenerator = isEasingGenerator;
},{}],"node_modules/@motionone/utils/dist/is-function.es.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isFunction = void 0;
const isFunction = value => typeof value === "function";
exports.isFunction = isFunction;
},{}],"node_modules/@motionone/utils/dist/is-string.es.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isString = void 0;
const isString = value => typeof value === "string";
exports.isString = isString;
},{}],"node_modules/@motionone/utils/dist/time.es.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.time = void 0;
const time = {
  ms: seconds => seconds * 1000,
  s: milliseconds => milliseconds / 1000
};
exports.time = time;
},{}],"node_modules/@motionone/utils/dist/velocity.es.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.velocityPerSecond = velocityPerSecond;
/*
  Convert velocity into velocity per second

  @param [number]: Unit per frame
  @param [number]: Frame duration in ms
*/
function velocityPerSecond(velocity, frameDuration) {
  return frameDuration ? velocity * (1000 / frameDuration) : 0;
}
},{}],"node_modules/@motionone/utils/dist/index.es.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "addUniqueItem", {
  enumerable: true,
  get: function () {
    return _arrayEs.addUniqueItem;
  }
});
Object.defineProperty(exports, "clamp", {
  enumerable: true,
  get: function () {
    return _clampEs.clamp;
  }
});
Object.defineProperty(exports, "defaultOffset", {
  enumerable: true,
  get: function () {
    return _offsetEs.defaultOffset;
  }
});
Object.defineProperty(exports, "defaults", {
  enumerable: true,
  get: function () {
    return _defaultsEs.defaults;
  }
});
Object.defineProperty(exports, "fillOffset", {
  enumerable: true,
  get: function () {
    return _offsetEs.fillOffset;
  }
});
Object.defineProperty(exports, "getEasingForSegment", {
  enumerable: true,
  get: function () {
    return _easingEs.getEasingForSegment;
  }
});
Object.defineProperty(exports, "interpolate", {
  enumerable: true,
  get: function () {
    return _interpolateEs.interpolate;
  }
});
Object.defineProperty(exports, "isCubicBezier", {
  enumerable: true,
  get: function () {
    return _isCubicBezierEs.isCubicBezier;
  }
});
Object.defineProperty(exports, "isEasingGenerator", {
  enumerable: true,
  get: function () {
    return _isEasingGeneratorEs.isEasingGenerator;
  }
});
Object.defineProperty(exports, "isEasingList", {
  enumerable: true,
  get: function () {
    return _isEasingListEs.isEasingList;
  }
});
Object.defineProperty(exports, "isFunction", {
  enumerable: true,
  get: function () {
    return _isFunctionEs.isFunction;
  }
});
Object.defineProperty(exports, "isNumber", {
  enumerable: true,
  get: function () {
    return _isNumberEs.isNumber;
  }
});
Object.defineProperty(exports, "isString", {
  enumerable: true,
  get: function () {
    return _isStringEs.isString;
  }
});
Object.defineProperty(exports, "mix", {
  enumerable: true,
  get: function () {
    return _mixEs.mix;
  }
});
Object.defineProperty(exports, "noop", {
  enumerable: true,
  get: function () {
    return _noopEs.noop;
  }
});
Object.defineProperty(exports, "noopReturn", {
  enumerable: true,
  get: function () {
    return _noopEs.noopReturn;
  }
});
Object.defineProperty(exports, "progress", {
  enumerable: true,
  get: function () {
    return _progressEs.progress;
  }
});
Object.defineProperty(exports, "removeItem", {
  enumerable: true,
  get: function () {
    return _arrayEs.removeItem;
  }
});
Object.defineProperty(exports, "time", {
  enumerable: true,
  get: function () {
    return _timeEs.time;
  }
});
Object.defineProperty(exports, "velocityPerSecond", {
  enumerable: true,
  get: function () {
    return _velocityEs.velocityPerSecond;
  }
});
Object.defineProperty(exports, "wrap", {
  enumerable: true,
  get: function () {
    return _wrapEs.wrap;
  }
});
var _arrayEs = require("./array.es.js");
var _clampEs = require("./clamp.es.js");
var _defaultsEs = require("./defaults.es.js");
var _easingEs = require("./easing.es.js");
var _interpolateEs = require("./interpolate.es.js");
var _isCubicBezierEs = require("./is-cubic-bezier.es.js");
var _isEasingGeneratorEs = require("./is-easing-generator.es.js");
var _isEasingListEs = require("./is-easing-list.es.js");
var _isFunctionEs = require("./is-function.es.js");
var _isNumberEs = require("./is-number.es.js");
var _isStringEs = require("./is-string.es.js");
var _mixEs = require("./mix.es.js");
var _noopEs = require("./noop.es.js");
var _offsetEs = require("./offset.es.js");
var _progressEs = require("./progress.es.js");
var _timeEs = require("./time.es.js");
var _velocityEs = require("./velocity.es.js");
var _wrapEs = require("./wrap.es.js");
},{"./array.es.js":"node_modules/@motionone/utils/dist/array.es.js","./clamp.es.js":"node_modules/@motionone/utils/dist/clamp.es.js","./defaults.es.js":"node_modules/@motionone/utils/dist/defaults.es.js","./easing.es.js":"node_modules/@motionone/utils/dist/easing.es.js","./interpolate.es.js":"node_modules/@motionone/utils/dist/interpolate.es.js","./is-cubic-bezier.es.js":"node_modules/@motionone/utils/dist/is-cubic-bezier.es.js","./is-easing-generator.es.js":"node_modules/@motionone/utils/dist/is-easing-generator.es.js","./is-easing-list.es.js":"node_modules/@motionone/utils/dist/is-easing-list.es.js","./is-function.es.js":"node_modules/@motionone/utils/dist/is-function.es.js","./is-number.es.js":"node_modules/@motionone/utils/dist/is-number.es.js","./is-string.es.js":"node_modules/@motionone/utils/dist/is-string.es.js","./mix.es.js":"node_modules/@motionone/utils/dist/mix.es.js","./noop.es.js":"node_modules/@motionone/utils/dist/noop.es.js","./offset.es.js":"node_modules/@motionone/utils/dist/offset.es.js","./progress.es.js":"node_modules/@motionone/utils/dist/progress.es.js","./time.es.js":"node_modules/@motionone/utils/dist/time.es.js","./velocity.es.js":"node_modules/@motionone/utils/dist/velocity.es.js","./wrap.es.js":"node_modules/@motionone/utils/dist/wrap.es.js"}],"node_modules/@motionone/easing/dist/cubic-bezier.es.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cubicBezier = cubicBezier;
var _utils = require("@motionone/utils");
/*
  Bezier function generator

  This has been modified from Gaëtan Renaudeau's BezierEasing
  https://github.com/gre/bezier-easing/blob/master/src/index.js
  https://github.com/gre/bezier-easing/blob/master/LICENSE
  
  I've removed the newtonRaphsonIterate algo because in benchmarking it
  wasn't noticiably faster than binarySubdivision, indeed removing it
  usually improved times, depending on the curve.

  I also removed the lookup table, as for the added bundle size and loop we're
  only cutting ~4 or so subdivision iterations. I bumped the max iterations up
  to 12 to compensate and this still tended to be faster for no perceivable
  loss in accuracy.

  Usage
    const easeOut = cubicBezier(.17,.67,.83,.67);
    const x = easeOut(0.5); // returns 0.627...
*/ // Returns x(t) given t, x1, and x2, or y(t) given t, y1, and y2.
const calcBezier = (t, a1, a2) => (((1.0 - 3.0 * a2 + 3.0 * a1) * t + (3.0 * a2 - 6.0 * a1)) * t + 3.0 * a1) * t;
const subdivisionPrecision = 0.0000001;
const subdivisionMaxIterations = 12;
function binarySubdivide(x, lowerBound, upperBound, mX1, mX2) {
  let currentX;
  let currentT;
  let i = 0;
  do {
    currentT = lowerBound + (upperBound - lowerBound) / 2.0;
    currentX = calcBezier(currentT, mX1, mX2) - x;
    if (currentX > 0.0) {
      upperBound = currentT;
    } else {
      lowerBound = currentT;
    }
  } while (Math.abs(currentX) > subdivisionPrecision && ++i < subdivisionMaxIterations);
  return currentT;
}
function cubicBezier(mX1, mY1, mX2, mY2) {
  // If this is a linear gradient, return linear easing
  if (mX1 === mY1 && mX2 === mY2) return _utils.noopReturn;
  const getTForX = aX => binarySubdivide(aX, 0, 1, mX1, mX2);
  // If animation is at start/end, return t without easing
  return t => t === 0 || t === 1 ? t : calcBezier(getTForX(t), mY1, mY2);
}
},{"@motionone/utils":"node_modules/@motionone/utils/dist/index.es.js"}],"node_modules/@motionone/easing/dist/steps.es.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.steps = void 0;
var _utils = require("@motionone/utils");
const steps = (steps, direction = "end") => progress => {
  progress = direction === "end" ? Math.min(progress, 0.999) : Math.max(progress, 0.001);
  const expanded = progress * steps;
  const rounded = direction === "end" ? Math.floor(expanded) : Math.ceil(expanded);
  return (0, _utils.clamp)(0, 1, rounded / steps);
};
exports.steps = steps;
},{"@motionone/utils":"node_modules/@motionone/utils/dist/index.es.js"}],"node_modules/@motionone/easing/dist/index.es.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "cubicBezier", {
  enumerable: true,
  get: function () {
    return _cubicBezierEs.cubicBezier;
  }
});
Object.defineProperty(exports, "steps", {
  enumerable: true,
  get: function () {
    return _stepsEs.steps;
  }
});
var _cubicBezierEs = require("./cubic-bezier.es.js");
var _stepsEs = require("./steps.es.js");
},{"./cubic-bezier.es.js":"node_modules/@motionone/easing/dist/cubic-bezier.es.js","./steps.es.js":"node_modules/@motionone/easing/dist/steps.es.js"}],"node_modules/@motionone/animation/dist/utils/easing.es.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getEasingFunction = getEasingFunction;
var _easing = require("@motionone/easing");
var _utils = require("@motionone/utils");
const namedEasings = {
  ease: (0, _easing.cubicBezier)(0.25, 0.1, 0.25, 1.0),
  "ease-in": (0, _easing.cubicBezier)(0.42, 0.0, 1.0, 1.0),
  "ease-in-out": (0, _easing.cubicBezier)(0.42, 0.0, 0.58, 1.0),
  "ease-out": (0, _easing.cubicBezier)(0.0, 0.0, 0.58, 1.0)
};
const functionArgsRegex = /\((.*?)\)/;
function getEasingFunction(definition) {
  // If already an easing function, return
  if ((0, _utils.isFunction)(definition)) return definition;
  // If an easing curve definition, return bezier function
  if ((0, _utils.isCubicBezier)(definition)) return (0, _easing.cubicBezier)(...definition);
  // If we have a predefined easing function, return
  if (namedEasings[definition]) return namedEasings[definition];
  // If this is a steps function, attempt to create easing curve
  if (definition.startsWith("steps")) {
    const args = functionArgsRegex.exec(definition);
    if (args) {
      const argsArray = args[1].split(",");
      return (0, _easing.steps)(parseFloat(argsArray[0]), argsArray[1].trim());
    }
  }
  return _utils.noopReturn;
}
},{"@motionone/easing":"node_modules/@motionone/easing/dist/index.es.js","@motionone/utils":"node_modules/@motionone/utils/dist/index.es.js"}],"node_modules/@motionone/animation/dist/Animation.es.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Animation = void 0;
var _utils = require("@motionone/utils");
var _easingEs = require("./utils/easing.es.js");
class Animation {
  constructor(output, keyframes = [0, 1], {
    easing,
    duration: initialDuration = _utils.defaults.duration,
    delay = _utils.defaults.delay,
    endDelay = _utils.defaults.endDelay,
    repeat = _utils.defaults.repeat,
    offset,
    direction = "normal"
  } = {}) {
    this.startTime = null;
    this.rate = 1;
    this.t = 0;
    this.cancelTimestamp = null;
    this.easing = _utils.noopReturn;
    this.duration = 0;
    this.totalDuration = 0;
    this.repeat = 0;
    this.playState = "idle";
    this.finished = new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });
    easing = easing || _utils.defaults.easing;
    if ((0, _utils.isEasingGenerator)(easing)) {
      const custom = easing.createAnimation(keyframes);
      easing = custom.easing;
      keyframes = custom.keyframes || keyframes;
      initialDuration = custom.duration || initialDuration;
    }
    this.repeat = repeat;
    this.easing = (0, _utils.isEasingList)(easing) ? _utils.noopReturn : (0, _easingEs.getEasingFunction)(easing);
    this.updateDuration(initialDuration);
    const interpolate$1 = (0, _utils.interpolate)(keyframes, offset, (0, _utils.isEasingList)(easing) ? easing.map(_easingEs.getEasingFunction) : _utils.noopReturn);
    this.tick = timestamp => {
      var _a;
      // TODO: Temporary fix for OptionsResolver typing
      delay = delay;
      let t = 0;
      if (this.pauseTime !== undefined) {
        t = this.pauseTime;
      } else {
        t = (timestamp - this.startTime) * this.rate;
      }
      this.t = t;
      // Convert to seconds
      t /= 1000;
      // Rebase on delay
      t = Math.max(t - delay, 0);
      /**
       * If this animation has finished, set the current time
       * to the total duration.
       */
      if (this.playState === "finished" && this.pauseTime === undefined) {
        t = this.totalDuration;
      }
      /**
       * Get the current progress (0-1) of the animation. If t is >
       * than duration we'll get values like 2.5 (midway through the
       * third iteration)
       */
      const progress = t / this.duration;
      // TODO progress += iterationStart
      /**
       * Get the current iteration (0 indexed). For instance the floor of
       * 2.5 is 2.
       */
      let currentIteration = Math.floor(progress);
      /**
       * Get the current progress of the iteration by taking the remainder
       * so 2.5 is 0.5 through iteration 2
       */
      let iterationProgress = progress % 1.0;
      if (!iterationProgress && progress >= 1) {
        iterationProgress = 1;
      }
      /**
       * If iteration progress is 1 we count that as the end
       * of the previous iteration.
       */
      iterationProgress === 1 && currentIteration--;
      /**
       * Reverse progress if we're not running in "normal" direction
       */
      const iterationIsOdd = currentIteration % 2;
      if (direction === "reverse" || direction === "alternate" && iterationIsOdd || direction === "alternate-reverse" && !iterationIsOdd) {
        iterationProgress = 1 - iterationProgress;
      }
      const p = t >= this.totalDuration ? 1 : Math.min(iterationProgress, 1);
      const latest = interpolate$1(this.easing(p));
      output(latest);
      const isAnimationFinished = this.pauseTime === undefined && (this.playState === "finished" || t >= this.totalDuration + endDelay);
      if (isAnimationFinished) {
        this.playState = "finished";
        (_a = this.resolve) === null || _a === void 0 ? void 0 : _a.call(this, latest);
      } else if (this.playState !== "idle") {
        this.frameRequestId = requestAnimationFrame(this.tick);
      }
    };
    this.play();
  }
  play() {
    const now = performance.now();
    this.playState = "running";
    if (this.pauseTime !== undefined) {
      this.startTime = now - this.pauseTime;
    } else if (!this.startTime) {
      this.startTime = now;
    }
    this.cancelTimestamp = this.startTime;
    this.pauseTime = undefined;
    this.frameRequestId = requestAnimationFrame(this.tick);
  }
  pause() {
    this.playState = "paused";
    this.pauseTime = this.t;
  }
  finish() {
    this.playState = "finished";
    this.tick(0);
  }
  stop() {
    var _a;
    this.playState = "idle";
    if (this.frameRequestId !== undefined) {
      cancelAnimationFrame(this.frameRequestId);
    }
    (_a = this.reject) === null || _a === void 0 ? void 0 : _a.call(this, false);
  }
  cancel() {
    this.stop();
    this.tick(this.cancelTimestamp);
  }
  reverse() {
    this.rate *= -1;
  }
  commitStyles() {}
  updateDuration(duration) {
    this.duration = duration;
    this.totalDuration = duration * (this.repeat + 1);
  }
  get currentTime() {
    return this.t;
  }
  set currentTime(t) {
    if (this.pauseTime !== undefined || this.rate === 0) {
      this.pauseTime = t;
    } else {
      this.startTime = performance.now() - t / this.rate;
    }
  }
  get playbackRate() {
    return this.rate;
  }
  set playbackRate(rate) {
    this.rate = rate;
  }
}
exports.Animation = Animation;
},{"@motionone/utils":"node_modules/@motionone/utils/dist/index.es.js","./utils/easing.es.js":"node_modules/@motionone/animation/dist/utils/easing.es.js"}],"node_modules/@motionone/animation/dist/index.es.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Animation", {
  enumerable: true,
  get: function () {
    return _AnimationEs.Animation;
  }
});
Object.defineProperty(exports, "getEasingFunction", {
  enumerable: true,
  get: function () {
    return _easingEs.getEasingFunction;
  }
});
var _AnimationEs = require("./Animation.es.js");
var _easingEs = require("./utils/easing.es.js");
},{"./Animation.es.js":"node_modules/@motionone/animation/dist/Animation.es.js","./utils/easing.es.js":"node_modules/@motionone/animation/dist/utils/easing.es.js"}],"node_modules/hey-listen/dist/hey-listen.es.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.warning = exports.invariant = void 0;
var warning = function () {};
exports.warning = warning;
var invariant = function () {};
exports.invariant = invariant;
if ("development" !== 'production') {
  exports.warning = warning = function (check, message) {
    if (!check && typeof console !== 'undefined') {
      console.warn(message);
    }
  };
  exports.invariant = invariant = function (check, message) {
    if (!check) {
      throw new Error(message);
    }
  };
}
},{}],"node_modules/@motionone/types/dist/MotionValue.es.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotionValue = void 0;
/**
 * The MotionValue tracks the state of a single animatable
 * value. Currently, updatedAt and current are unused. The
 * long term idea is to use this to minimise the number
 * of DOM reads, and to abstract the DOM interactions here.
 */
class MotionValue {
  setAnimation(animation) {
    this.animation = animation;
    animation === null || animation === void 0 ? void 0 : animation.finished.then(() => this.clearAnimation()).catch(() => {});
  }
  clearAnimation() {
    this.animation = this.generator = undefined;
  }
}
exports.MotionValue = MotionValue;
},{}],"node_modules/@motionone/types/dist/index.es.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "MotionValue", {
  enumerable: true,
  get: function () {
    return _MotionValueEs.MotionValue;
  }
});
var _MotionValueEs = require("./MotionValue.es.js");
},{"./MotionValue.es.js":"node_modules/@motionone/types/dist/MotionValue.es.js"}],"node_modules/@motionone/dom/dist/animate/data.es.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAnimationData = getAnimationData;
exports.getMotionValue = getMotionValue;
var _types = require("@motionone/types");
const data = new WeakMap();
function getAnimationData(element) {
  if (!data.has(element)) {
    data.set(element, {
      transforms: [],
      values: new Map()
    });
  }
  return data.get(element);
}
function getMotionValue(motionValues, name) {
  if (!motionValues.has(name)) {
    motionValues.set(name, new _types.MotionValue());
  }
  return motionValues.get(name);
}
},{"@motionone/types":"node_modules/@motionone/types/dist/index.es.js"}],"node_modules/@motionone/dom/dist/animate/utils/transforms.es.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.transformDefinitions = exports.transformAlias = exports.isTransform = exports.compareTransformOrder = exports.buildTransformTemplate = exports.axes = exports.asTransformCssVar = exports.addTransformToElement = void 0;
var _utils = require("@motionone/utils");
var _dataEs = require("../data.es.js");
/**
 * A list of all transformable axes. We'll use this list to generated a version
 * of each axes for each transform.
 */
const axes = ["", "X", "Y", "Z"];
/**
 * An ordered array of each transformable value. By default, transform values
 * will be sorted to this order.
 */
exports.axes = axes;
const order = ["translate", "scale", "rotate", "skew"];
const transformAlias = {
  x: "translateX",
  y: "translateY",
  z: "translateZ"
};
exports.transformAlias = transformAlias;
const rotation = {
  syntax: "<angle>",
  initialValue: "0deg",
  toDefaultUnit: v => v + "deg"
};
const baseTransformProperties = {
  translate: {
    syntax: "<length-percentage>",
    initialValue: "0px",
    toDefaultUnit: v => v + "px"
  },
  rotate: rotation,
  scale: {
    syntax: "<number>",
    initialValue: 1,
    toDefaultUnit: _utils.noopReturn
  },
  skew: rotation
};
const transformDefinitions = new Map();
exports.transformDefinitions = transformDefinitions;
const asTransformCssVar = name => `--motion-${name}`;
/**
 * Generate a list of every possible transform key
 */
exports.asTransformCssVar = asTransformCssVar;
const transforms = ["x", "y", "z"];
order.forEach(name => {
  axes.forEach(axis => {
    transforms.push(name + axis);
    transformDefinitions.set(asTransformCssVar(name + axis), baseTransformProperties[name]);
  });
});
/**
 * A function to use with Array.sort to sort transform keys by their default order.
 */
const compareTransformOrder = (a, b) => transforms.indexOf(a) - transforms.indexOf(b);
/**
 * Provide a quick way to check if a string is the name of a transform
 */
exports.compareTransformOrder = compareTransformOrder;
const transformLookup = new Set(transforms);
const isTransform = name => transformLookup.has(name);
exports.isTransform = isTransform;
const addTransformToElement = (element, name) => {
  // Map x to translateX etc
  if (transformAlias[name]) name = transformAlias[name];
  const {
    transforms
  } = (0, _dataEs.getAnimationData)(element);
  (0, _utils.addUniqueItem)(transforms, name);
  /**
   * TODO: An optimisation here could be to cache the transform in element data
   * and only update if this has changed.
   */
  element.style.transform = buildTransformTemplate(transforms);
};
exports.addTransformToElement = addTransformToElement;
const buildTransformTemplate = transforms => transforms.sort(compareTransformOrder).reduce(transformListToString, "").trim();
exports.buildTransformTemplate = buildTransformTemplate;
const transformListToString = (template, name) => `${template} ${name}(var(${asTransformCssVar(name)}))`;
},{"@motionone/utils":"node_modules/@motionone/utils/dist/index.es.js","../data.es.js":"node_modules/@motionone/dom/dist/animate/data.es.js"}],"node_modules/@motionone/dom/dist/animate/utils/css-var.es.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isCssVar = void 0;
exports.registerCssVariable = registerCssVariable;
exports.registeredProperties = void 0;
var _transformsEs = require("./transforms.es.js");
const isCssVar = name => name.startsWith("--");
exports.isCssVar = isCssVar;
const registeredProperties = new Set();
exports.registeredProperties = registeredProperties;
function registerCssVariable(name) {
  if (registeredProperties.has(name)) return;
  registeredProperties.add(name);
  try {
    const {
      syntax,
      initialValue
    } = _transformsEs.transformDefinitions.has(name) ? _transformsEs.transformDefinitions.get(name) : {};
    CSS.registerProperty({
      name,
      inherits: false,
      syntax,
      initialValue
    });
  } catch (e) {}
}
},{"./transforms.es.js":"node_modules/@motionone/dom/dist/animate/utils/transforms.es.js"}],"node_modules/@motionone/dom/dist/animate/utils/feature-detection.es.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.supports = void 0;
const testAnimation = (keyframes, options) => document.createElement("div").animate(keyframes, options);
const featureTests = {
  cssRegisterProperty: () => typeof CSS !== "undefined" && Object.hasOwnProperty.call(CSS, "registerProperty"),
  waapi: () => Object.hasOwnProperty.call(Element.prototype, "animate"),
  partialKeyframes: () => {
    try {
      testAnimation({
        opacity: [1]
      });
    } catch (e) {
      return false;
    }
    return true;
  },
  finished: () => Boolean(testAnimation({
    opacity: [0, 1]
  }, {
    duration: 0.001
  }).finished),
  linearEasing: () => {
    try {
      testAnimation({
        opacity: 0
      }, {
        easing: "linear(0, 1)"
      });
    } catch (e) {
      return false;
    }
    return true;
  }
};
const results = {};
const supports = {};
exports.supports = supports;
for (const key in featureTests) {
  supports[key] = () => {
    if (results[key] === undefined) results[key] = featureTests[key]();
    return results[key];
  };
}
},{}],"node_modules/@motionone/dom/dist/animate/utils/easing.es.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateLinearEasingPoints = exports.cubicBezierAsString = exports.convertEasing = void 0;
var _utils = require("@motionone/utils");
var _featureDetectionEs = require("./feature-detection.es.js");
// Create a linear easing point for every x second
const resolution = 0.015;
const generateLinearEasingPoints = (easing, duration) => {
  let points = "";
  const numPoints = Math.round(duration / resolution);
  for (let i = 0; i < numPoints; i++) {
    points += easing((0, _utils.progress)(0, numPoints - 1, i)) + ", ";
  }
  return points.substring(0, points.length - 2);
};
exports.generateLinearEasingPoints = generateLinearEasingPoints;
const convertEasing = (easing, duration) => {
  if ((0, _utils.isFunction)(easing)) {
    return _featureDetectionEs.supports.linearEasing() ? `linear(${generateLinearEasingPoints(easing, duration)})` : _utils.defaults.easing;
  } else {
    return (0, _utils.isCubicBezier)(easing) ? cubicBezierAsString(easing) : easing;
  }
};
exports.convertEasing = convertEasing;
const cubicBezierAsString = ([a, b, c, d]) => `cubic-bezier(${a}, ${b}, ${c}, ${d})`;
exports.cubicBezierAsString = cubicBezierAsString;
},{"@motionone/utils":"node_modules/@motionone/utils/dist/index.es.js","./feature-detection.es.js":"node_modules/@motionone/dom/dist/animate/utils/feature-detection.es.js"}],"node_modules/@motionone/dom/dist/animate/utils/keyframes.es.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hydrateKeyframes = hydrateKeyframes;
exports.keyframesList = void 0;
function hydrateKeyframes(keyframes, readInitialValue) {
  for (let i = 0; i < keyframes.length; i++) {
    if (keyframes[i] === null) {
      keyframes[i] = i ? keyframes[i - 1] : readInitialValue();
    }
  }
  return keyframes;
}
const keyframesList = keyframes => Array.isArray(keyframes) ? keyframes : [keyframes];
exports.keyframesList = keyframesList;
},{}],"node_modules/@motionone/dom/dist/animate/utils/get-style-name.es.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getStyleName = getStyleName;
var _transformsEs = require("./transforms.es.js");
function getStyleName(key) {
  if (_transformsEs.transformAlias[key]) key = _transformsEs.transformAlias[key];
  return (0, _transformsEs.isTransform)(key) ? (0, _transformsEs.asTransformCssVar)(key) : key;
}
},{"./transforms.es.js":"node_modules/@motionone/dom/dist/animate/utils/transforms.es.js"}],"node_modules/@motionone/dom/dist/animate/style.es.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.style = void 0;
var _cssVarEs = require("./utils/css-var.es.js");
var _getStyleNameEs = require("./utils/get-style-name.es.js");
var _transformsEs = require("./utils/transforms.es.js");
const style = {
  get: (element, name) => {
    name = (0, _getStyleNameEs.getStyleName)(name);
    let value = (0, _cssVarEs.isCssVar)(name) ? element.style.getPropertyValue(name) : getComputedStyle(element)[name];
    if (!value && value !== 0) {
      const definition = _transformsEs.transformDefinitions.get(name);
      if (definition) value = definition.initialValue;
    }
    return value;
  },
  set: (element, name, value) => {
    name = (0, _getStyleNameEs.getStyleName)(name);
    if ((0, _cssVarEs.isCssVar)(name)) {
      element.style.setProperty(name, value);
    } else {
      element.style[name] = value;
    }
  }
};
exports.style = style;
},{"./utils/css-var.es.js":"node_modules/@motionone/dom/dist/animate/utils/css-var.es.js","./utils/get-style-name.es.js":"node_modules/@motionone/dom/dist/animate/utils/get-style-name.es.js","./utils/transforms.es.js":"node_modules/@motionone/dom/dist/animate/utils/transforms.es.js"}],"node_modules/@motionone/dom/dist/animate/utils/stop-animation.es.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.stopAnimation = stopAnimation;
function stopAnimation(animation, needsCommit = true) {
  if (!animation || animation.playState === "finished") return;
  // Suppress error thrown by WAAPI
  try {
    if (animation.stop) {
      animation.stop();
    } else {
      needsCommit && animation.commitStyles();
      animation.cancel();
    }
  } catch (e) {}
}
},{}],"node_modules/@motionone/dom/dist/animate/utils/get-unit.es.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUnitConverter = getUnitConverter;
var _utils = require("@motionone/utils");
function getUnitConverter(keyframes, definition) {
  var _a;
  let toUnit = (definition === null || definition === void 0 ? void 0 : definition.toDefaultUnit) || _utils.noopReturn;
  const finalKeyframe = keyframes[keyframes.length - 1];
  if ((0, _utils.isString)(finalKeyframe)) {
    const unit = ((_a = finalKeyframe.match(/(-?[\d.]+)([a-z%]*)/)) === null || _a === void 0 ? void 0 : _a[2]) || "";
    if (unit) toUnit = value => value + unit;
  }
  return toUnit;
}
},{"@motionone/utils":"node_modules/@motionone/utils/dist/index.es.js"}],"node_modules/@motionone/dom/dist/animate/animate-style.es.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.animateStyle = animateStyle;
var _dataEs = require("./data.es.js");
var _cssVarEs = require("./utils/css-var.es.js");
var _utils = require("@motionone/utils");
var _transformsEs = require("./utils/transforms.es.js");
var _easingEs = require("./utils/easing.es.js");
var _featureDetectionEs = require("./utils/feature-detection.es.js");
var _keyframesEs = require("./utils/keyframes.es.js");
var _styleEs = require("./style.es.js");
var _getStyleNameEs = require("./utils/get-style-name.es.js");
var _stopAnimationEs = require("./utils/stop-animation.es.js");
var _getUnitEs = require("./utils/get-unit.es.js");
function getDevToolsRecord() {
  return window.__MOTION_DEV_TOOLS_RECORD;
}
function animateStyle(element, key, keyframesDefinition, options = {}, AnimationPolyfill) {
  const record = getDevToolsRecord();
  const isRecording = options.record !== false && record;
  let animation;
  let {
    duration = _utils.defaults.duration,
    delay = _utils.defaults.delay,
    endDelay = _utils.defaults.endDelay,
    repeat = _utils.defaults.repeat,
    easing = _utils.defaults.easing,
    persist = false,
    direction,
    offset,
    allowWebkitAcceleration = false
  } = options;
  const data = (0, _dataEs.getAnimationData)(element);
  const valueIsTransform = (0, _transformsEs.isTransform)(key);
  let canAnimateNatively = _featureDetectionEs.supports.waapi();
  /**
   * If this is an individual transform, we need to map its
   * key to a CSS variable and update the element's transform style
   */
  valueIsTransform && (0, _transformsEs.addTransformToElement)(element, key);
  const name = (0, _getStyleNameEs.getStyleName)(key);
  const motionValue = (0, _dataEs.getMotionValue)(data.values, name);
  /**
   * Get definition of value, this will be used to convert numerical
   * keyframes into the default value type.
   */
  const definition = _transformsEs.transformDefinitions.get(name);
  /**
   * Stop the current animation, if any. Because this will trigger
   * commitStyles (DOM writes) and we might later trigger DOM reads,
   * this is fired now and we return a factory function to create
   * the actual animation that can get called in batch,
   */
  (0, _stopAnimationEs.stopAnimation)(motionValue.animation, !((0, _utils.isEasingGenerator)(easing) && motionValue.generator) && options.record !== false);
  /**
   * Batchable factory function containing all DOM reads.
   */
  return () => {
    const readInitialValue = () => {
      var _a, _b;
      return (_b = (_a = _styleEs.style.get(element, name)) !== null && _a !== void 0 ? _a : definition === null || definition === void 0 ? void 0 : definition.initialValue) !== null && _b !== void 0 ? _b : 0;
    };
    /**
     * Replace null values with the previous keyframe value, or read
     * it from the DOM if it's the first keyframe.
     */
    let keyframes = (0, _keyframesEs.hydrateKeyframes)((0, _keyframesEs.keyframesList)(keyframesDefinition), readInitialValue);
    /**
     * Detect unit type of keyframes.
     */
    const toUnit = (0, _getUnitEs.getUnitConverter)(keyframes, definition);
    if ((0, _utils.isEasingGenerator)(easing)) {
      const custom = easing.createAnimation(keyframes, key !== "opacity", readInitialValue, name, motionValue);
      easing = custom.easing;
      keyframes = custom.keyframes || keyframes;
      duration = custom.duration || duration;
    }
    /**
     * If this is a CSS variable we need to register it with the browser
     * before it can be animated natively. We also set it with setProperty
     * rather than directly onto the element.style object.
     */
    if ((0, _cssVarEs.isCssVar)(name)) {
      if (_featureDetectionEs.supports.cssRegisterProperty()) {
        (0, _cssVarEs.registerCssVariable)(name);
      } else {
        canAnimateNatively = false;
      }
    }
    /**
     * If we've been passed a custom easing function, and this browser
     * does **not** support linear() easing, and the value is a transform
     * (and thus a pure number) we can still support the custom easing
     * by falling back to the animation polyfill.
     */
    if (valueIsTransform && !_featureDetectionEs.supports.linearEasing() && ((0, _utils.isFunction)(easing) || (0, _utils.isEasingList)(easing) && easing.some(_utils.isFunction))) {
      canAnimateNatively = false;
    }
    /**
     * If we can animate this value with WAAPI, do so.
     */
    if (canAnimateNatively) {
      /**
       * Convert numbers to default value types. Currently this only supports
       * transforms but it could also support other value types.
       */
      if (definition) {
        keyframes = keyframes.map(value => (0, _utils.isNumber)(value) ? definition.toDefaultUnit(value) : value);
      }
      /**
       * If this browser doesn't support partial/implicit keyframes we need to
       * explicitly provide one.
       */
      if (keyframes.length === 1 && (!_featureDetectionEs.supports.partialKeyframes() || isRecording)) {
        keyframes.unshift(readInitialValue());
      }
      const animationOptions = {
        delay: _utils.time.ms(delay),
        duration: _utils.time.ms(duration),
        endDelay: _utils.time.ms(endDelay),
        easing: !(0, _utils.isEasingList)(easing) ? (0, _easingEs.convertEasing)(easing, duration) : undefined,
        direction,
        iterations: repeat + 1,
        fill: "both"
      };
      animation = element.animate({
        [name]: keyframes,
        offset,
        easing: (0, _utils.isEasingList)(easing) ? easing.map(thisEasing => (0, _easingEs.convertEasing)(thisEasing, duration)) : undefined
      }, animationOptions);
      /**
       * Polyfill finished Promise in browsers that don't support it
       */
      if (!animation.finished) {
        animation.finished = new Promise((resolve, reject) => {
          animation.onfinish = resolve;
          animation.oncancel = reject;
        });
      }
      const target = keyframes[keyframes.length - 1];
      animation.finished.then(() => {
        if (persist) return;
        // Apply styles to target
        _styleEs.style.set(element, name, target);
        // Ensure fill modes don't persist
        animation.cancel();
      }).catch(_utils.noop);
      /**
       * This forces Webkit to run animations on the main thread by exploiting
       * this condition:
       * https://trac.webkit.org/browser/webkit/trunk/Source/WebCore/platform/graphics/ca/GraphicsLayerCA.cpp?rev=281238#L1099
       *
       * This fixes Webkit's timing bugs, like accelerated animations falling
       * out of sync with main thread animations and massive delays in starting
       * accelerated animations in WKWebView.
       */
      if (!allowWebkitAcceleration) animation.playbackRate = 1.000001;
      /**
       * If we can't animate the value natively then we can fallback to the numbers-only
       * polyfill for transforms.
       */
    } else if (AnimationPolyfill && valueIsTransform) {
      /**
       * If any keyframe is a string (because we measured it from the DOM), we need to convert
       * it into a number before passing to the Animation polyfill.
       */
      keyframes = keyframes.map(value => typeof value === "string" ? parseFloat(value) : value);
      /**
       * If we only have a single keyframe, we need to create an initial keyframe by reading
       * the current value from the DOM.
       */
      if (keyframes.length === 1) {
        keyframes.unshift(parseFloat(readInitialValue()));
      }
      animation = new AnimationPolyfill(latest => {
        _styleEs.style.set(element, name, toUnit ? toUnit(latest) : latest);
      }, keyframes, Object.assign(Object.assign({}, options), {
        duration,
        easing
      }));
    } else {
      const target = keyframes[keyframes.length - 1];
      _styleEs.style.set(element, name, definition && (0, _utils.isNumber)(target) ? definition.toDefaultUnit(target) : target);
    }
    if (isRecording) {
      record(element, key, keyframes, {
        duration,
        delay: delay,
        easing,
        repeat,
        offset
      }, "motion-one");
    }
    motionValue.setAnimation(animation);
    return animation;
  };
}
},{"./data.es.js":"node_modules/@motionone/dom/dist/animate/data.es.js","./utils/css-var.es.js":"node_modules/@motionone/dom/dist/animate/utils/css-var.es.js","@motionone/utils":"node_modules/@motionone/utils/dist/index.es.js","./utils/transforms.es.js":"node_modules/@motionone/dom/dist/animate/utils/transforms.es.js","./utils/easing.es.js":"node_modules/@motionone/dom/dist/animate/utils/easing.es.js","./utils/feature-detection.es.js":"node_modules/@motionone/dom/dist/animate/utils/feature-detection.es.js","./utils/keyframes.es.js":"node_modules/@motionone/dom/dist/animate/utils/keyframes.es.js","./style.es.js":"node_modules/@motionone/dom/dist/animate/style.es.js","./utils/get-style-name.es.js":"node_modules/@motionone/dom/dist/animate/utils/get-style-name.es.js","./utils/stop-animation.es.js":"node_modules/@motionone/dom/dist/animate/utils/stop-animation.es.js","./utils/get-unit.es.js":"node_modules/@motionone/dom/dist/animate/utils/get-unit.es.js"}],"node_modules/@motionone/dom/dist/animate/utils/options.es.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getOptions = void 0;
const getOptions = (options, key) =>
/**
 * TODO: Make test for this
 * Always return a new object otherwise delay is overwritten by results of stagger
 * and this results in no stagger
 */
options[key] ? Object.assign(Object.assign({}, options), options[key]) : Object.assign({}, options);
exports.getOptions = getOptions;
},{}],"node_modules/@motionone/dom/dist/utils/resolve-elements.es.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resolveElements = resolveElements;
function resolveElements(elements, selectorCache) {
  var _a;
  if (typeof elements === "string") {
    if (selectorCache) {
      (_a = selectorCache[elements]) !== null && _a !== void 0 ? _a : selectorCache[elements] = document.querySelectorAll(elements);
      elements = selectorCache[elements];
    } else {
      elements = document.querySelectorAll(elements);
    }
  } else if (elements instanceof Element) {
    elements = [elements];
  }
  /**
   * Return an empty array
   */
  return Array.from(elements || []);
}
},{}],"node_modules/@motionone/dom/dist/animate/utils/controls.es.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withControls = exports.controls = void 0;
var _utils = require("@motionone/utils");
var _stopAnimationEs = require("./stop-animation.es.js");
const createAnimation = factory => factory();
const withControls = (animationFactory, options, duration = _utils.defaults.duration) => {
  return new Proxy({
    animations: animationFactory.map(createAnimation).filter(Boolean),
    duration,
    options
  }, controls);
};
/**
 * TODO:
 * Currently this returns the first animation, ideally it would return
 * the first active animation.
 */
exports.withControls = withControls;
const getActiveAnimation = state => state.animations[0];
const controls = {
  get: (target, key) => {
    const activeAnimation = getActiveAnimation(target);
    switch (key) {
      case "duration":
        return target.duration;
      case "currentTime":
        return _utils.time.s((activeAnimation === null || activeAnimation === void 0 ? void 0 : activeAnimation[key]) || 0);
      case "playbackRate":
      case "playState":
        return activeAnimation === null || activeAnimation === void 0 ? void 0 : activeAnimation[key];
      case "finished":
        if (!target.finished) {
          target.finished = Promise.all(target.animations.map(selectFinished)).catch(_utils.noop);
        }
        return target.finished;
      case "stop":
        return () => {
          target.animations.forEach(animation => (0, _stopAnimationEs.stopAnimation)(animation));
        };
      case "forEachNative":
        /**
         * This is for internal use only, fire a callback for each
         * underlying animation.
         */
        return callback => {
          target.animations.forEach(animation => callback(animation, target));
        };
      default:
        return typeof (activeAnimation === null || activeAnimation === void 0 ? void 0 : activeAnimation[key]) === "undefined" ? undefined : () => target.animations.forEach(animation => animation[key]());
    }
  },
  set: (target, key, value) => {
    switch (key) {
      case "currentTime":
        value = _utils.time.ms(value);
      case "currentTime":
      case "playbackRate":
        for (let i = 0; i < target.animations.length; i++) {
          target.animations[i][key] = value;
        }
        return true;
    }
    return false;
  }
};
exports.controls = controls;
const selectFinished = animation => animation.finished;
},{"@motionone/utils":"node_modules/@motionone/utils/dist/index.es.js","./stop-animation.es.js":"node_modules/@motionone/dom/dist/animate/utils/stop-animation.es.js"}],"node_modules/@motionone/dom/dist/utils/stagger.es.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFromIndex = getFromIndex;
exports.resolveOption = resolveOption;
exports.stagger = stagger;
var _utils = require("@motionone/utils");
var _animation = require("@motionone/animation");
function stagger(duration = 0.1, {
  start = 0,
  from = 0,
  easing
} = {}) {
  return (i, total) => {
    const fromIndex = (0, _utils.isNumber)(from) ? from : getFromIndex(from, total);
    const distance = Math.abs(fromIndex - i);
    let delay = duration * distance;
    if (easing) {
      const maxDelay = total * duration;
      const easingFunction = (0, _animation.getEasingFunction)(easing);
      delay = easingFunction(delay / maxDelay) * maxDelay;
    }
    return start + delay;
  };
}
function getFromIndex(from, total) {
  if (from === "first") {
    return 0;
  } else {
    const lastIndex = total - 1;
    return from === "last" ? lastIndex : lastIndex / 2;
  }
}
function resolveOption(option, i, total) {
  return (0, _utils.isFunction)(option) ? option(i, total) : option;
}
},{"@motionone/utils":"node_modules/@motionone/utils/dist/index.es.js","@motionone/animation":"node_modules/@motionone/animation/dist/index.es.js"}],"node_modules/@motionone/dom/dist/animate/create-animate.es.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createAnimate = createAnimate;
var _heyListen = require("hey-listen");
var _animateStyleEs = require("./animate-style.es.js");
var _optionsEs = require("./utils/options.es.js");
var _resolveElementsEs = require("../utils/resolve-elements.es.js");
var _controlsEs = require("./utils/controls.es.js");
var _staggerEs = require("../utils/stagger.es.js");
function createAnimate(AnimatePolyfill) {
  return function animate(elements, keyframes, options = {}) {
    elements = (0, _resolveElementsEs.resolveElements)(elements);
    const numElements = elements.length;
    (0, _heyListen.invariant)(Boolean(numElements), "No valid element provided.");
    (0, _heyListen.invariant)(Boolean(keyframes), "No keyframes defined.");
    /**
     * Create and start new animations
     */
    const animationFactories = [];
    for (let i = 0; i < numElements; i++) {
      const element = elements[i];
      for (const key in keyframes) {
        const valueOptions = (0, _optionsEs.getOptions)(options, key);
        valueOptions.delay = (0, _staggerEs.resolveOption)(valueOptions.delay, i, numElements);
        const animation = (0, _animateStyleEs.animateStyle)(element, key, keyframes[key], valueOptions, AnimatePolyfill);
        animationFactories.push(animation);
      }
    }
    return (0, _controlsEs.withControls)(animationFactories, options,
    /**
     * TODO:
     * If easing is set to spring or glide, duration will be dynamically
     * generated. Ideally we would dynamically generate this from
     * animation.effect.getComputedTiming().duration but this isn't
     * supported in iOS13 or our number polyfill. Perhaps it's possible
     * to Proxy animations returned from animateStyle that has duration
     * as a getter.
     */
    options.duration);
  };
}
},{"hey-listen":"node_modules/hey-listen/dist/hey-listen.es.js","./animate-style.es.js":"node_modules/@motionone/dom/dist/animate/animate-style.es.js","./utils/options.es.js":"node_modules/@motionone/dom/dist/animate/utils/options.es.js","../utils/resolve-elements.es.js":"node_modules/@motionone/dom/dist/utils/resolve-elements.es.js","./utils/controls.es.js":"node_modules/@motionone/dom/dist/animate/utils/controls.es.js","../utils/stagger.es.js":"node_modules/@motionone/dom/dist/utils/stagger.es.js"}],"node_modules/@motionone/dom/dist/animate/index.es.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.animate = void 0;
var _animation = require("@motionone/animation");
var _createAnimateEs = require("./create-animate.es.js");
const animate = (0, _createAnimateEs.createAnimate)(_animation.Animation);
exports.animate = animate;
},{"@motionone/animation":"node_modules/@motionone/animation/dist/index.es.js","./create-animate.es.js":"node_modules/@motionone/dom/dist/animate/create-animate.es.js"}],"node_modules/@motionone/dom/node_modules/tslib/tslib.es6.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.__assign = void 0;
exports.__asyncDelegator = __asyncDelegator;
exports.__asyncGenerator = __asyncGenerator;
exports.__asyncValues = __asyncValues;
exports.__await = __await;
exports.__awaiter = __awaiter;
exports.__classPrivateFieldGet = __classPrivateFieldGet;
exports.__classPrivateFieldIn = __classPrivateFieldIn;
exports.__classPrivateFieldSet = __classPrivateFieldSet;
exports.__createBinding = void 0;
exports.__decorate = __decorate;
exports.__esDecorate = __esDecorate;
exports.__exportStar = __exportStar;
exports.__extends = __extends;
exports.__generator = __generator;
exports.__importDefault = __importDefault;
exports.__importStar = __importStar;
exports.__makeTemplateObject = __makeTemplateObject;
exports.__metadata = __metadata;
exports.__param = __param;
exports.__propKey = __propKey;
exports.__read = __read;
exports.__rest = __rest;
exports.__runInitializers = __runInitializers;
exports.__setFunctionName = __setFunctionName;
exports.__spread = __spread;
exports.__spreadArray = __spreadArray;
exports.__spreadArrays = __spreadArrays;
exports.__values = __values;
/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function (d, b) {
  extendStatics = Object.setPrototypeOf || {
    __proto__: []
  } instanceof Array && function (d, b) {
    d.__proto__ = b;
  } || function (d, b) {
    for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
  };
  return extendStatics(d, b);
};
function __extends(d, b) {
  if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
  extendStatics(d, b);
  function __() {
    this.constructor = d;
  }
  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}
var __assign = function () {
  exports.__assign = __assign = Object.assign || function __assign(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};
exports.__assign = __assign;
function __rest(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
}
function __decorate(decorators, target, key, desc) {
  var c = arguments.length,
    r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
    d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function __param(paramIndex, decorator) {
  return function (target, key) {
    decorator(target, key, paramIndex);
  };
}
function __esDecorate(ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
  function accept(f) {
    if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected");
    return f;
  }
  var kind = contextIn.kind,
    key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
  var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
  var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
  var _,
    done = false;
  for (var i = decorators.length - 1; i >= 0; i--) {
    var context = {};
    for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
    for (var p in contextIn.access) context.access[p] = contextIn.access[p];
    context.addInitializer = function (f) {
      if (done) throw new TypeError("Cannot add initializers after decoration has completed");
      extraInitializers.push(accept(f || null));
    };
    var result = (0, decorators[i])(kind === "accessor" ? {
      get: descriptor.get,
      set: descriptor.set
    } : descriptor[key], context);
    if (kind === "accessor") {
      if (result === void 0) continue;
      if (result === null || typeof result !== "object") throw new TypeError("Object expected");
      if (_ = accept(result.get)) descriptor.get = _;
      if (_ = accept(result.set)) descriptor.set = _;
      if (_ = accept(result.init)) initializers.push(_);
    } else if (_ = accept(result)) {
      if (kind === "field") initializers.push(_);else descriptor[key] = _;
    }
  }
  if (target) Object.defineProperty(target, contextIn.name, descriptor);
  done = true;
}
;
function __runInitializers(thisArg, initializers, value) {
  var useValue = arguments.length > 2;
  for (var i = 0; i < initializers.length; i++) {
    value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
  }
  return useValue ? value : void 0;
}
;
function __propKey(x) {
  return typeof x === "symbol" ? x : "".concat(x);
}
;
function __setFunctionName(f, name, prefix) {
  if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
  return Object.defineProperty(f, "name", {
    configurable: true,
    value: prefix ? "".concat(prefix, " ", name) : name
  });
}
;
function __metadata(metadataKey, metadataValue) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}
function __awaiter(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
}
function __generator(thisArg, body) {
  var _ = {
      label: 0,
      sent: function () {
        if (t[0] & 1) throw t[1];
        return t[1];
      },
      trys: [],
      ops: []
    },
    f,
    y,
    t,
    g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;
  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }
  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");
    while (g && (g = 0, op[0] && (_ = 0)), _) try {
      if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
      if (y = 0, t) op = [op[0] & 2, t.value];
      switch (op[0]) {
        case 0:
        case 1:
          t = op;
          break;
        case 4:
          _.label++;
          return {
            value: op[1],
            done: false
          };
        case 5:
          _.label++;
          y = op[1];
          op = [0];
          continue;
        case 7:
          op = _.ops.pop();
          _.trys.pop();
          continue;
        default:
          if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
            _ = 0;
            continue;
          }
          if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
            _.label = op[1];
            break;
          }
          if (op[0] === 6 && _.label < t[1]) {
            _.label = t[1];
            t = op;
            break;
          }
          if (t && _.label < t[2]) {
            _.label = t[2];
            _.ops.push(op);
            break;
          }
          if (t[2]) _.ops.pop();
          _.trys.pop();
          continue;
      }
      op = body.call(thisArg, _);
    } catch (e) {
      op = [6, e];
      y = 0;
    } finally {
      f = t = 0;
    }
    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
}
var __createBinding = Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  var desc = Object.getOwnPropertyDescriptor(m, k);
  if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
    desc = {
      enumerable: true,
      get: function () {
        return m[k];
      }
    };
  }
  Object.defineProperty(o, k2, desc);
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
};
exports.__createBinding = __createBinding;
function __exportStar(m, o) {
  for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p)) __createBinding(o, m, p);
}
function __values(o) {
  var s = typeof Symbol === "function" && Symbol.iterator,
    m = s && o[s],
    i = 0;
  if (m) return m.call(o);
  if (o && typeof o.length === "number") return {
    next: function () {
      if (o && i >= o.length) o = void 0;
      return {
        value: o && o[i++],
        done: !o
      };
    }
  };
  throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function __read(o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m) return o;
  var i = m.call(o),
    r,
    ar = [],
    e;
  try {
    while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
  } catch (error) {
    e = {
      error: error
    };
  } finally {
    try {
      if (r && !r.done && (m = i["return"])) m.call(i);
    } finally {
      if (e) throw e.error;
    }
  }
  return ar;
}

/** @deprecated */
function __spread() {
  for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
  return ar;
}

/** @deprecated */
function __spreadArrays() {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
  for (var r = Array(s), k = 0, i = 0; i < il; i++) for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) r[k] = a[j];
  return r;
}
function __spreadArray(to, from, pack) {
  if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
    if (ar || !(i in from)) {
      if (!ar) ar = Array.prototype.slice.call(from, 0, i);
      ar[i] = from[i];
    }
  }
  return to.concat(ar || Array.prototype.slice.call(from));
}
function __await(v) {
  return this instanceof __await ? (this.v = v, this) : new __await(v);
}
function __asyncGenerator(thisArg, _arguments, generator) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var g = generator.apply(thisArg, _arguments || []),
    i,
    q = [];
  return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () {
    return this;
  }, i;
  function verb(n) {
    if (g[n]) i[n] = function (v) {
      return new Promise(function (a, b) {
        q.push([n, v, a, b]) > 1 || resume(n, v);
      });
    };
  }
  function resume(n, v) {
    try {
      step(g[n](v));
    } catch (e) {
      settle(q[0][3], e);
    }
  }
  function step(r) {
    r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
  }
  function fulfill(value) {
    resume("next", value);
  }
  function reject(value) {
    resume("throw", value);
  }
  function settle(f, v) {
    if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]);
  }
}
function __asyncDelegator(o) {
  var i, p;
  return i = {}, verb("next"), verb("throw", function (e) {
    throw e;
  }), verb("return"), i[Symbol.iterator] = function () {
    return this;
  }, i;
  function verb(n, f) {
    i[n] = o[n] ? function (v) {
      return (p = !p) ? {
        value: __await(o[n](v)),
        done: false
      } : f ? f(v) : v;
    } : f;
  }
}
function __asyncValues(o) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var m = o[Symbol.asyncIterator],
    i;
  return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () {
    return this;
  }, i);
  function verb(n) {
    i[n] = o[n] && function (v) {
      return new Promise(function (resolve, reject) {
        v = o[n](v), settle(resolve, reject, v.done, v.value);
      });
    };
  }
  function settle(resolve, reject, d, v) {
    Promise.resolve(v).then(function (v) {
      resolve({
        value: v,
        done: d
      });
    }, reject);
  }
}
function __makeTemplateObject(cooked, raw) {
  if (Object.defineProperty) {
    Object.defineProperty(cooked, "raw", {
      value: raw
    });
  } else {
    cooked.raw = raw;
  }
  return cooked;
}
;
var __setModuleDefault = Object.create ? function (o, v) {
  Object.defineProperty(o, "default", {
    enumerable: true,
    value: v
  });
} : function (o, v) {
  o["default"] = v;
};
function __importStar(mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
  __setModuleDefault(result, mod);
  return result;
}
function __importDefault(mod) {
  return mod && mod.__esModule ? mod : {
    default: mod
  };
}
function __classPrivateFieldGet(receiver, state, kind, f) {
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
}
function __classPrivateFieldSet(receiver, state, value, kind, f) {
  if (kind === "m") throw new TypeError("Private method is not writable");
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
}
function __classPrivateFieldIn(state, receiver) {
  if (receiver === null || typeof receiver !== "object" && typeof receiver !== "function") throw new TypeError("Cannot use 'in' operator on non-object");
  return typeof state === "function" ? receiver === state : state.has(receiver);
}
},{}],"node_modules/@motionone/dom/dist/timeline/utils/calc-time.es.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.calcNextTime = calcNextTime;
var _utils = require("@motionone/utils");
function calcNextTime(current, next, prev, labels) {
  var _a;
  if ((0, _utils.isNumber)(next)) {
    return next;
  } else if (next.startsWith("-") || next.startsWith("+")) {
    return Math.max(0, current + parseFloat(next));
  } else if (next === "<") {
    return prev;
  } else {
    return (_a = labels.get(next)) !== null && _a !== void 0 ? _a : current;
  }
}
},{"@motionone/utils":"node_modules/@motionone/utils/dist/index.es.js"}],"node_modules/@motionone/dom/dist/timeline/utils/edit.es.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addKeyframes = addKeyframes;
exports.eraseKeyframes = eraseKeyframes;
var _utils = require("@motionone/utils");
function eraseKeyframes(sequence, startTime, endTime) {
  for (let i = 0; i < sequence.length; i++) {
    const keyframe = sequence[i];
    if (keyframe.at > startTime && keyframe.at < endTime) {
      (0, _utils.removeItem)(sequence, keyframe);
      // If we remove this item we have to push the pointer back one
      i--;
    }
  }
}
function addKeyframes(sequence, keyframes, easing, offset, startTime, endTime) {
  /**
   * Erase every existing value between currentTime and targetTime,
   * this will essentially splice this timeline into any currently
   * defined ones.
   */
  eraseKeyframes(sequence, startTime, endTime);
  for (let i = 0; i < keyframes.length; i++) {
    sequence.push({
      value: keyframes[i],
      at: (0, _utils.mix)(startTime, endTime, offset[i]),
      easing: (0, _utils.getEasingForSegment)(easing, i)
    });
  }
}
},{"@motionone/utils":"node_modules/@motionone/utils/dist/index.es.js"}],"node_modules/@motionone/dom/dist/timeline/utils/sort.es.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.compareByTime = compareByTime;
function compareByTime(a, b) {
  if (a.at === b.at) {
    return a.value === null ? 1 : -1;
  } else {
    return a.at - b.at;
  }
}
},{}],"node_modules/@motionone/dom/dist/timeline/index.es.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createAnimationsFromTimeline = createAnimationsFromTimeline;
exports.timeline = timeline;
var _tslib = require("tslib");
var _heyListen = require("hey-listen");
var _utils = require("@motionone/utils");
var _staggerEs = require("../utils/stagger.es.js");
var _animateStyleEs = require("../animate/animate-style.es.js");
var _controlsEs = require("../animate/utils/controls.es.js");
var _keyframesEs = require("../animate/utils/keyframes.es.js");
var _optionsEs = require("../animate/utils/options.es.js");
var _resolveElementsEs = require("../utils/resolve-elements.es.js");
var _calcTimeEs = require("./utils/calc-time.es.js");
var _editEs = require("./utils/edit.es.js");
var _sortEs = require("./utils/sort.es.js");
var _animation = require("@motionone/animation");
function timeline(definition, options = {}) {
  var _a;
  const animationDefinitions = createAnimationsFromTimeline(definition, options);
  /**
   * Create and start animations
   */
  const animationFactories = animationDefinitions.map(definition => (0, _animateStyleEs.animateStyle)(...definition, _animation.Animation)).filter(Boolean);
  return (0, _controlsEs.withControls)(animationFactories, options,
  // Get the duration from the first animation definition
  (_a = animationDefinitions[0]) === null || _a === void 0 ? void 0 : _a[3].duration);
}
function createAnimationsFromTimeline(definition, _a = {}) {
  var {
      defaultOptions = {}
    } = _a,
    timelineOptions = (0, _tslib.__rest)(_a, ["defaultOptions"]);
  const animationDefinitions = [];
  const elementSequences = new Map();
  const elementCache = {};
  const timeLabels = new Map();
  let prevTime = 0;
  let currentTime = 0;
  let totalDuration = 0;
  /**
   * Build the timeline by mapping over the definition array and converting
   * the definitions into keyframes and offsets with absolute time values.
   * These will later get converted into relative offsets in a second pass.
   */
  for (let i = 0; i < definition.length; i++) {
    const segment = definition[i];
    /**
     * If this is a timeline label, mark it and skip the rest of this iteration.
     */
    if ((0, _utils.isString)(segment)) {
      timeLabels.set(segment, currentTime);
      continue;
    } else if (!Array.isArray(segment)) {
      timeLabels.set(segment.name, (0, _calcTimeEs.calcNextTime)(currentTime, segment.at, prevTime, timeLabels));
      continue;
    }
    const [elementDefinition, keyframes, options = {}] = segment;
    /**
     * If a relative or absolute time value has been specified we need to resolve
     * it in relation to the currentTime.
     */
    if (options.at !== undefined) {
      currentTime = (0, _calcTimeEs.calcNextTime)(currentTime, options.at, prevTime, timeLabels);
    }
    /**
     * Keep track of the maximum duration in this definition. This will be
     * applied to currentTime once the definition has been parsed.
     */
    let maxDuration = 0;
    /**
     * Find all the elements specified in the definition and parse value
     * keyframes from their timeline definitions.
     */
    const elements = (0, _resolveElementsEs.resolveElements)(elementDefinition, elementCache);
    const numElements = elements.length;
    for (let elementIndex = 0; elementIndex < numElements; elementIndex++) {
      const element = elements[elementIndex];
      const elementSequence = getElementSequence(element, elementSequences);
      for (const key in keyframes) {
        const valueSequence = getValueSequence(key, elementSequence);
        let valueKeyframes = (0, _keyframesEs.keyframesList)(keyframes[key]);
        const valueOptions = (0, _optionsEs.getOptions)(options, key);
        let {
          duration = defaultOptions.duration || _utils.defaults.duration,
          easing = defaultOptions.easing || _utils.defaults.easing
        } = valueOptions;
        if ((0, _utils.isEasingGenerator)(easing)) {
          (0, _heyListen.invariant)(key === "opacity" || valueKeyframes.length > 1, "spring must be provided 2 keyframes within timeline()");
          const custom = easing.createAnimation(valueKeyframes, key !== "opacity", () => 0, key);
          easing = custom.easing;
          valueKeyframes = custom.keyframes || valueKeyframes;
          duration = custom.duration || duration;
        }
        const delay = (0, _staggerEs.resolveOption)(options.delay, elementIndex, numElements) || 0;
        const startTime = currentTime + delay;
        const targetTime = startTime + duration;
        /**
         *
         */
        let {
          offset = (0, _utils.defaultOffset)(valueKeyframes.length)
        } = valueOptions;
        /**
         * If there's only one offset of 0, fill in a second with length 1
         *
         * TODO: Ensure there's a test that covers this removal
         */
        if (offset.length === 1 && offset[0] === 0) {
          offset[1] = 1;
        }
        /**
         * Fill out if offset if fewer offsets than keyframes
         */
        const remainder = offset.length - valueKeyframes.length;
        remainder > 0 && (0, _utils.fillOffset)(offset, remainder);
        /**
         * If only one value has been set, ie [1], push a null to the start of
         * the keyframe array. This will let us mark a keyframe at this point
         * that will later be hydrated with the previous value.
         */
        valueKeyframes.length === 1 && valueKeyframes.unshift(null);
        /**
         * Add keyframes, mapping offsets to absolute time.
         */
        (0, _editEs.addKeyframes)(valueSequence, valueKeyframes, easing, offset, startTime, targetTime);
        maxDuration = Math.max(delay + duration, maxDuration);
        totalDuration = Math.max(targetTime, totalDuration);
      }
    }
    prevTime = currentTime;
    currentTime += maxDuration;
  }
  /**
   * For every element and value combination create a new animation.
   */
  elementSequences.forEach((valueSequences, element) => {
    for (const key in valueSequences) {
      const valueSequence = valueSequences[key];
      /**
       * Arrange all the keyframes in ascending time order.
       */
      valueSequence.sort(_sortEs.compareByTime);
      const keyframes = [];
      const valueOffset = [];
      const valueEasing = [];
      /**
       * For each keyframe, translate absolute times into
       * relative offsets based on the total duration of the timeline.
       */
      for (let i = 0; i < valueSequence.length; i++) {
        const {
          at,
          value,
          easing
        } = valueSequence[i];
        keyframes.push(value);
        valueOffset.push((0, _utils.progress)(0, totalDuration, at));
        valueEasing.push(easing || _utils.defaults.easing);
      }
      /**
       * If the first keyframe doesn't land on offset: 0
       * provide one by duplicating the initial keyframe. This ensures
       * it snaps to the first keyframe when the animation starts.
       */
      if (valueOffset[0] !== 0) {
        valueOffset.unshift(0);
        keyframes.unshift(keyframes[0]);
        valueEasing.unshift("linear");
      }
      /**
       * If the last keyframe doesn't land on offset: 1
       * provide one with a null wildcard value. This will ensure it
       * stays static until the end of the animation.
       */
      if (valueOffset[valueOffset.length - 1] !== 1) {
        valueOffset.push(1);
        keyframes.push(null);
      }
      animationDefinitions.push([element, key, keyframes, Object.assign(Object.assign(Object.assign({}, defaultOptions), {
        duration: totalDuration,
        easing: valueEasing,
        offset: valueOffset
      }), timelineOptions)]);
    }
  });
  return animationDefinitions;
}
function getElementSequence(element, sequences) {
  !sequences.has(element) && sequences.set(element, {});
  return sequences.get(element);
}
function getValueSequence(name, sequences) {
  if (!sequences[name]) sequences[name] = [];
  return sequences[name];
}
},{"tslib":"node_modules/@motionone/dom/node_modules/tslib/tslib.es6.js","hey-listen":"node_modules/hey-listen/dist/hey-listen.es.js","@motionone/utils":"node_modules/@motionone/utils/dist/index.es.js","../utils/stagger.es.js":"node_modules/@motionone/dom/dist/utils/stagger.es.js","../animate/animate-style.es.js":"node_modules/@motionone/dom/dist/animate/animate-style.es.js","../animate/utils/controls.es.js":"node_modules/@motionone/dom/dist/animate/utils/controls.es.js","../animate/utils/keyframes.es.js":"node_modules/@motionone/dom/dist/animate/utils/keyframes.es.js","../animate/utils/options.es.js":"node_modules/@motionone/dom/dist/animate/utils/options.es.js","../utils/resolve-elements.es.js":"node_modules/@motionone/dom/dist/utils/resolve-elements.es.js","./utils/calc-time.es.js":"node_modules/@motionone/dom/dist/timeline/utils/calc-time.es.js","./utils/edit.es.js":"node_modules/@motionone/dom/dist/timeline/utils/edit.es.js","./utils/sort.es.js":"node_modules/@motionone/dom/dist/timeline/utils/sort.es.js","@motionone/animation":"node_modules/@motionone/animation/dist/index.es.js"}],"node_modules/@motionone/generators/dist/utils/velocity.es.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.calcGeneratorVelocity = calcGeneratorVelocity;
var _utils = require("@motionone/utils");
const sampleT = 5; // ms
function calcGeneratorVelocity(resolveValue, t, current) {
  const prevT = Math.max(t - sampleT, 0);
  return (0, _utils.velocityPerSecond)(current - resolveValue(prevT), t - prevT);
}
},{"@motionone/utils":"node_modules/@motionone/utils/dist/index.es.js"}],"node_modules/@motionone/generators/dist/spring/defaults.es.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaults = void 0;
const defaults = {
  stiffness: 100.0,
  damping: 10.0,
  mass: 1.0
};
exports.defaults = defaults;
},{}],"node_modules/@motionone/generators/dist/spring/utils.es.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.calcDampingRatio = void 0;
var _defaultsEs = require("./defaults.es.js");
const calcDampingRatio = (stiffness = _defaultsEs.defaults.stiffness, damping = _defaultsEs.defaults.damping, mass = _defaultsEs.defaults.mass) => damping / (2 * Math.sqrt(stiffness * mass));
exports.calcDampingRatio = calcDampingRatio;
},{"./defaults.es.js":"node_modules/@motionone/generators/dist/spring/defaults.es.js"}],"node_modules/@motionone/generators/dist/utils/has-reached-target.es.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hasReachedTarget = hasReachedTarget;
function hasReachedTarget(origin, target, current) {
  return origin < target && current >= target || origin > target && current <= target;
}
},{}],"node_modules/@motionone/generators/dist/spring/index.es.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.spring = void 0;
var _utils = require("@motionone/utils");
var _defaultsEs = require("./defaults.es.js");
var _utilsEs = require("./utils.es.js");
var _hasReachedTargetEs = require("../utils/has-reached-target.es.js");
var _velocityEs = require("../utils/velocity.es.js");
const spring = ({
  stiffness = _defaultsEs.defaults.stiffness,
  damping = _defaultsEs.defaults.damping,
  mass = _defaultsEs.defaults.mass,
  from = 0,
  to = 1,
  velocity = 0.0,
  restSpeed = 2,
  restDistance = 0.5
} = {}) => {
  velocity = velocity ? _utils.time.s(velocity) : 0.0;
  const state = {
    done: false,
    hasReachedTarget: false,
    current: from,
    target: to
  };
  const initialDelta = to - from;
  const undampedAngularFreq = Math.sqrt(stiffness / mass) / 1000;
  const dampingRatio = (0, _utilsEs.calcDampingRatio)(stiffness, damping, mass);
  let resolveSpring;
  if (dampingRatio < 1) {
    const angularFreq = undampedAngularFreq * Math.sqrt(1 - dampingRatio * dampingRatio);
    // Underdamped spring (bouncy)
    resolveSpring = t => to - Math.exp(-dampingRatio * undampedAngularFreq * t) * ((-velocity + dampingRatio * undampedAngularFreq * initialDelta) / angularFreq * Math.sin(angularFreq * t) + initialDelta * Math.cos(angularFreq * t));
  } else {
    // Critically damped spring
    resolveSpring = t => {
      return to - Math.exp(-undampedAngularFreq * t) * (initialDelta + (-velocity + undampedAngularFreq * initialDelta) * t);
    };
  }
  return t => {
    state.current = resolveSpring(t);
    const currentVelocity = t === 0 ? velocity : (0, _velocityEs.calcGeneratorVelocity)(resolveSpring, t, state.current);
    const isBelowVelocityThreshold = Math.abs(currentVelocity) <= restSpeed;
    const isBelowDisplacementThreshold = Math.abs(to - state.current) <= restDistance;
    state.done = isBelowVelocityThreshold && isBelowDisplacementThreshold;
    state.hasReachedTarget = (0, _hasReachedTargetEs.hasReachedTarget)(from, to, state.current);
    return state;
  };
};
exports.spring = spring;
},{"@motionone/utils":"node_modules/@motionone/utils/dist/index.es.js","./defaults.es.js":"node_modules/@motionone/generators/dist/spring/defaults.es.js","./utils.es.js":"node_modules/@motionone/generators/dist/spring/utils.es.js","../utils/has-reached-target.es.js":"node_modules/@motionone/generators/dist/utils/has-reached-target.es.js","../utils/velocity.es.js":"node_modules/@motionone/generators/dist/utils/velocity.es.js"}],"node_modules/@motionone/generators/dist/glide/index.es.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.glide = void 0;
var _utils = require("@motionone/utils");
var _velocityEs = require("../utils/velocity.es.js");
var _indexEs = require("../spring/index.es.js");
const glide = ({
  from = 0,
  velocity = 0.0,
  power = 0.8,
  decay = 0.325,
  bounceDamping,
  bounceStiffness,
  changeTarget,
  min,
  max,
  restDistance = 0.5,
  restSpeed
}) => {
  decay = _utils.time.ms(decay);
  const state = {
    hasReachedTarget: false,
    done: false,
    current: from,
    target: from
  };
  const isOutOfBounds = v => min !== undefined && v < min || max !== undefined && v > max;
  const nearestBoundary = v => {
    if (min === undefined) return max;
    if (max === undefined) return min;
    return Math.abs(min - v) < Math.abs(max - v) ? min : max;
  };
  let amplitude = power * velocity;
  const ideal = from + amplitude;
  const target = changeTarget === undefined ? ideal : changeTarget(ideal);
  state.target = target;
  /**
   * If the target has changed we need to re-calculate the amplitude, otherwise
   * the animation will start from the wrong position.
   */
  if (target !== ideal) amplitude = target - from;
  const calcDelta = t => -amplitude * Math.exp(-t / decay);
  const calcLatest = t => target + calcDelta(t);
  const applyFriction = t => {
    const delta = calcDelta(t);
    const latest = calcLatest(t);
    state.done = Math.abs(delta) <= restDistance;
    state.current = state.done ? target : latest;
  };
  /**
   * Ideally this would resolve for t in a stateless way, we could
   * do that by always precalculating the animation but as we know
   * this will be done anyway we can assume that spring will
   * be discovered during that.
   */
  let timeReachedBoundary;
  let spring$1;
  const checkCatchBoundary = t => {
    if (!isOutOfBounds(state.current)) return;
    timeReachedBoundary = t;
    spring$1 = (0, _indexEs.spring)({
      from: state.current,
      to: nearestBoundary(state.current),
      velocity: (0, _velocityEs.calcGeneratorVelocity)(calcLatest, t, state.current),
      damping: bounceDamping,
      stiffness: bounceStiffness,
      restDistance,
      restSpeed
    });
  };
  checkCatchBoundary(0);
  return t => {
    /**
     * We need to resolve the friction to figure out if we need a
     * spring but we don't want to do this twice per frame. So here
     * we flag if we updated for this frame and later if we did
     * we can skip doing it again.
     */
    let hasUpdatedFrame = false;
    if (!spring$1 && timeReachedBoundary === undefined) {
      hasUpdatedFrame = true;
      applyFriction(t);
      checkCatchBoundary(t);
    }
    /**
     * If we have a spring and the provided t is beyond the moment the friction
     * animation crossed the min/max boundary, use the spring.
     */
    if (timeReachedBoundary !== undefined && t > timeReachedBoundary) {
      state.hasReachedTarget = true;
      return spring$1(t - timeReachedBoundary);
    } else {
      state.hasReachedTarget = false;
      !hasUpdatedFrame && applyFriction(t);
      return state;
    }
  };
};
exports.glide = glide;
},{"@motionone/utils":"node_modules/@motionone/utils/dist/index.es.js","../utils/velocity.es.js":"node_modules/@motionone/generators/dist/utils/velocity.es.js","../spring/index.es.js":"node_modules/@motionone/generators/dist/spring/index.es.js"}],"node_modules/@motionone/generators/dist/utils/pregenerate-keyframes.es.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pregenerateKeyframes = pregenerateKeyframes;
var _utils = require("@motionone/utils");
const timeStep = 10;
const maxDuration = 10000;
function pregenerateKeyframes(generator, toUnit = _utils.noopReturn) {
  let overshootDuration = undefined;
  let timestamp = timeStep;
  let state = generator(0);
  const keyframes = [toUnit(state.current)];
  while (!state.done && timestamp < maxDuration) {
    state = generator(timestamp);
    keyframes.push(toUnit(state.done ? state.target : state.current));
    if (overshootDuration === undefined && state.hasReachedTarget) {
      overshootDuration = timestamp;
    }
    timestamp += timeStep;
  }
  const duration = timestamp - timeStep;
  /**
   * If generating an animation that didn't actually move,
   * generate a second keyframe so we have an origin and target.
   */
  if (keyframes.length === 1) keyframes.push(state.current);
  return {
    keyframes,
    duration: duration / 1000,
    overshootDuration: (overshootDuration !== null && overshootDuration !== void 0 ? overshootDuration : duration) / 1000
  };
}
},{"@motionone/utils":"node_modules/@motionone/utils/dist/index.es.js"}],"node_modules/@motionone/generators/dist/index.es.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "calcGeneratorVelocity", {
  enumerable: true,
  get: function () {
    return _velocityEs.calcGeneratorVelocity;
  }
});
Object.defineProperty(exports, "glide", {
  enumerable: true,
  get: function () {
    return _indexEs.glide;
  }
});
Object.defineProperty(exports, "pregenerateKeyframes", {
  enumerable: true,
  get: function () {
    return _pregenerateKeyframesEs.pregenerateKeyframes;
  }
});
Object.defineProperty(exports, "spring", {
  enumerable: true,
  get: function () {
    return _indexEs2.spring;
  }
});
var _indexEs = require("./glide/index.es.js");
var _indexEs2 = require("./spring/index.es.js");
var _pregenerateKeyframesEs = require("./utils/pregenerate-keyframes.es.js");
var _velocityEs = require("./utils/velocity.es.js");
},{"./glide/index.es.js":"node_modules/@motionone/generators/dist/glide/index.es.js","./spring/index.es.js":"node_modules/@motionone/generators/dist/spring/index.es.js","./utils/pregenerate-keyframes.es.js":"node_modules/@motionone/generators/dist/utils/pregenerate-keyframes.es.js","./utils/velocity.es.js":"node_modules/@motionone/generators/dist/utils/velocity.es.js"}],"node_modules/@motionone/dom/dist/easing/create-generator-easing.es.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createGeneratorEasing = createGeneratorEasing;
var _generators = require("@motionone/generators");
var _utils = require("@motionone/utils");
var _getUnitEs = require("../animate/utils/get-unit.es.js");
var _transformsEs = require("../animate/utils/transforms.es.js");
var _getStyleNameEs = require("../animate/utils/get-style-name.es.js");
function canGenerate(value) {
  return (0, _utils.isNumber)(value) && !isNaN(value);
}
function getAsNumber(value) {
  return (0, _utils.isString)(value) ? parseFloat(value) : value;
}
function createGeneratorEasing(createGenerator) {
  const keyframesCache = new WeakMap();
  return (options = {}) => {
    const generatorCache = new Map();
    const getGenerator = (from = 0, to = 100, velocity = 0, isScale = false) => {
      const key = `${from}-${to}-${velocity}-${isScale}`;
      if (!generatorCache.has(key)) {
        generatorCache.set(key, createGenerator(Object.assign({
          from,
          to,
          velocity,
          restSpeed: isScale ? 0.05 : 2,
          restDistance: isScale ? 0.01 : 0.5
        }, options)));
      }
      return generatorCache.get(key);
    };
    const getKeyframes = (generator, toUnit) => {
      if (!keyframesCache.has(generator)) {
        keyframesCache.set(generator, (0, _generators.pregenerateKeyframes)(generator, toUnit));
      }
      return keyframesCache.get(generator);
    };
    return {
      createAnimation: (keyframes, shouldGenerate = true, getOrigin, name, motionValue) => {
        let settings;
        let origin;
        let target;
        let velocity = 0;
        let toUnit = _utils.noopReturn;
        const numKeyframes = keyframes.length;
        /**
         * If we should generate an animation for this value, run some preperation
         * like resolving target/origin, finding a unit (if any) and determine if
         * it is actually possible to generate.
         */
        if (shouldGenerate) {
          toUnit = (0, _getUnitEs.getUnitConverter)(keyframes, name ? _transformsEs.transformDefinitions.get((0, _getStyleNameEs.getStyleName)(name)) : undefined);
          const targetDefinition = keyframes[numKeyframes - 1];
          target = getAsNumber(targetDefinition);
          if (numKeyframes > 1 && keyframes[0] !== null) {
            /**
             * If we have multiple keyframes, take the initial keyframe as the origin.
             */
            origin = getAsNumber(keyframes[0]);
          } else {
            const prevGenerator = motionValue === null || motionValue === void 0 ? void 0 : motionValue.generator;
            /**
             * If we have an existing generator for this value we can use it to resolve
             * the animation's current value and velocity.
             */
            if (prevGenerator) {
              /**
               * If we have a generator for this value we can use it to resolve
               * the animations's current value and velocity.
               */
              const {
                animation,
                generatorStartTime
              } = motionValue;
              const startTime = (animation === null || animation === void 0 ? void 0 : animation.startTime) || generatorStartTime || 0;
              const currentTime = (animation === null || animation === void 0 ? void 0 : animation.currentTime) || performance.now() - startTime;
              const prevGeneratorCurrent = prevGenerator(currentTime).current;
              origin = prevGeneratorCurrent;
              velocity = (0, _generators.calcGeneratorVelocity)(t => prevGenerator(t).current, currentTime, prevGeneratorCurrent);
            } else if (getOrigin) {
              /**
               * As a last resort, read the origin from the DOM.
               */
              origin = getAsNumber(getOrigin());
            }
          }
        }
        /**
         * If we've determined it is possible to generate an animation, do so.
         */
        if (canGenerate(origin) && canGenerate(target)) {
          const generator = getGenerator(origin, target, velocity, name === null || name === void 0 ? void 0 : name.includes("scale"));
          settings = Object.assign(Object.assign({}, getKeyframes(generator, toUnit)), {
            easing: "linear"
          });
          // TODO Add test for this
          if (motionValue) {
            motionValue.generator = generator;
            motionValue.generatorStartTime = performance.now();
          }
        }
        /**
         * If by now we haven't generated a set of keyframes, create a generic generator
         * based on the provided props that animates from 0-100 to fetch a rough
         * "overshootDuration" - the moment when the generator first hits the animation target.
         * Then return animation settings that will run a normal animation for that duration.
         */
        if (!settings) {
          const keyframesMetadata = getKeyframes(getGenerator(0, 100));
          settings = {
            easing: "ease",
            duration: keyframesMetadata.overshootDuration
          };
        }
        return settings;
      }
    };
  };
}
},{"@motionone/generators":"node_modules/@motionone/generators/dist/index.es.js","@motionone/utils":"node_modules/@motionone/utils/dist/index.es.js","../animate/utils/get-unit.es.js":"node_modules/@motionone/dom/dist/animate/utils/get-unit.es.js","../animate/utils/transforms.es.js":"node_modules/@motionone/dom/dist/animate/utils/transforms.es.js","../animate/utils/get-style-name.es.js":"node_modules/@motionone/dom/dist/animate/utils/get-style-name.es.js"}],"node_modules/@motionone/dom/dist/easing/spring/index.es.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.spring = void 0;
var _generators = require("@motionone/generators");
var _createGeneratorEasingEs = require("../create-generator-easing.es.js");
const spring = (0, _createGeneratorEasingEs.createGeneratorEasing)(_generators.spring);
exports.spring = spring;
},{"@motionone/generators":"node_modules/@motionone/generators/dist/index.es.js","../create-generator-easing.es.js":"node_modules/@motionone/dom/dist/easing/create-generator-easing.es.js"}],"node_modules/@motionone/dom/dist/easing/glide/index.es.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.glide = void 0;
var _generators = require("@motionone/generators");
var _createGeneratorEasingEs = require("../create-generator-easing.es.js");
const glide = (0, _createGeneratorEasingEs.createGeneratorEasing)(_generators.glide);
exports.glide = glide;
},{"@motionone/generators":"node_modules/@motionone/generators/dist/index.es.js","../create-generator-easing.es.js":"node_modules/@motionone/dom/dist/easing/create-generator-easing.es.js"}],"node_modules/@motionone/dom/dist/gestures/in-view.es.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.inView = inView;
var _resolveElementsEs = require("../utils/resolve-elements.es.js");
var _utils = require("@motionone/utils");
const thresholds = {
  any: 0,
  all: 1
};
function inView(elementOrSelector, onStart, {
  root,
  margin: rootMargin,
  amount = "any"
} = {}) {
  /**
   * If this browser doesn't support IntersectionObserver, return a dummy stop function.
   * Default triggering of onStart is tricky - it could be used for starting/stopping
   * videos, lazy loading content etc. We could provide an option to enable a fallback, or
   * provide a fallback callback option.
   */
  if (typeof IntersectionObserver === "undefined") {
    return () => {};
  }
  const elements = (0, _resolveElementsEs.resolveElements)(elementOrSelector);
  const activeIntersections = new WeakMap();
  const onIntersectionChange = entries => {
    entries.forEach(entry => {
      const onEnd = activeIntersections.get(entry.target);
      /**
       * If there's no change to the intersection, we don't need to
       * do anything here.
       */
      if (entry.isIntersecting === Boolean(onEnd)) return;
      if (entry.isIntersecting) {
        const newOnEnd = onStart(entry);
        if ((0, _utils.isFunction)(newOnEnd)) {
          activeIntersections.set(entry.target, newOnEnd);
        } else {
          observer.unobserve(entry.target);
        }
      } else if (onEnd) {
        onEnd(entry);
        activeIntersections.delete(entry.target);
      }
    });
  };
  const observer = new IntersectionObserver(onIntersectionChange, {
    root,
    rootMargin,
    threshold: typeof amount === "number" ? amount : thresholds[amount]
  });
  elements.forEach(element => observer.observe(element));
  return () => observer.disconnect();
}
},{"../utils/resolve-elements.es.js":"node_modules/@motionone/dom/dist/utils/resolve-elements.es.js","@motionone/utils":"node_modules/@motionone/utils/dist/index.es.js"}],"node_modules/@motionone/dom/dist/gestures/resize/handle-element.es.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resizeElement = resizeElement;
var _resolveElementsEs = require("../../utils/resolve-elements.es.js");
const resizeHandlers = new WeakMap();
let observer;
function getElementSize(target, borderBoxSize) {
  if (borderBoxSize) {
    const {
      inlineSize,
      blockSize
    } = borderBoxSize[0];
    return {
      width: inlineSize,
      height: blockSize
    };
  } else if (target instanceof SVGElement && "getBBox" in target) {
    return target.getBBox();
  } else {
    return {
      width: target.offsetWidth,
      height: target.offsetHeight
    };
  }
}
function notifyTarget({
  target,
  contentRect,
  borderBoxSize
}) {
  var _a;
  (_a = resizeHandlers.get(target)) === null || _a === void 0 ? void 0 : _a.forEach(handler => {
    handler({
      target,
      contentSize: contentRect,
      get size() {
        return getElementSize(target, borderBoxSize);
      }
    });
  });
}
function notifyAll(entries) {
  entries.forEach(notifyTarget);
}
function createResizeObserver() {
  if (typeof ResizeObserver === "undefined") return;
  observer = new ResizeObserver(notifyAll);
}
function resizeElement(target, handler) {
  if (!observer) createResizeObserver();
  const elements = (0, _resolveElementsEs.resolveElements)(target);
  elements.forEach(element => {
    let elementHandlers = resizeHandlers.get(element);
    if (!elementHandlers) {
      elementHandlers = new Set();
      resizeHandlers.set(element, elementHandlers);
    }
    elementHandlers.add(handler);
    observer === null || observer === void 0 ? void 0 : observer.observe(element);
  });
  return () => {
    elements.forEach(element => {
      const elementHandlers = resizeHandlers.get(element);
      elementHandlers === null || elementHandlers === void 0 ? void 0 : elementHandlers.delete(handler);
      if (!(elementHandlers === null || elementHandlers === void 0 ? void 0 : elementHandlers.size)) {
        observer === null || observer === void 0 ? void 0 : observer.unobserve(element);
      }
    });
  };
}
},{"../../utils/resolve-elements.es.js":"node_modules/@motionone/dom/dist/utils/resolve-elements.es.js"}],"node_modules/@motionone/dom/dist/gestures/resize/handle-window.es.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resizeWindow = resizeWindow;
const windowCallbacks = new Set();
let windowResizeHandler;
function createWindowResizeHandler() {
  windowResizeHandler = () => {
    const size = {
      width: window.innerWidth,
      height: window.innerHeight
    };
    const info = {
      target: window,
      size,
      contentSize: size
    };
    windowCallbacks.forEach(callback => callback(info));
  };
  window.addEventListener("resize", windowResizeHandler);
}
function resizeWindow(callback) {
  windowCallbacks.add(callback);
  if (!windowResizeHandler) createWindowResizeHandler();
  return () => {
    windowCallbacks.delete(callback);
    if (!windowCallbacks.size && windowResizeHandler) {
      windowResizeHandler = undefined;
    }
  };
}
},{}],"node_modules/@motionone/dom/dist/gestures/resize/index.es.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resize = resize;
var _handleElementEs = require("./handle-element.es.js");
var _handleWindowEs = require("./handle-window.es.js");
var _utils = require("@motionone/utils");
function resize(a, b) {
  return (0, _utils.isFunction)(a) ? (0, _handleWindowEs.resizeWindow)(a) : (0, _handleElementEs.resizeElement)(a, b);
}
},{"./handle-element.es.js":"node_modules/@motionone/dom/dist/gestures/resize/handle-element.es.js","./handle-window.es.js":"node_modules/@motionone/dom/dist/gestures/resize/handle-window.es.js","@motionone/utils":"node_modules/@motionone/utils/dist/index.es.js"}],"node_modules/@motionone/dom/dist/gestures/scroll/info.es.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createScrollInfo = void 0;
exports.updateScrollInfo = updateScrollInfo;
var _utils = require("@motionone/utils");
/**
 * A time in milliseconds, beyond which we consider the scroll velocity to be 0.
 */
const maxElapsed = 50;
const createAxisInfo = () => ({
  current: 0,
  offset: [],
  progress: 0,
  scrollLength: 0,
  targetOffset: 0,
  targetLength: 0,
  containerLength: 0,
  velocity: 0
});
const createScrollInfo = () => ({
  time: 0,
  x: createAxisInfo(),
  y: createAxisInfo()
});
exports.createScrollInfo = createScrollInfo;
const keys = {
  x: {
    length: "Width",
    position: "Left"
  },
  y: {
    length: "Height",
    position: "Top"
  }
};
function updateAxisInfo(element, axisName, info, time) {
  const axis = info[axisName];
  const {
    length,
    position
  } = keys[axisName];
  const prev = axis.current;
  const prevTime = info.time;
  axis.current = element["scroll" + position];
  axis.scrollLength = element["scroll" + length] - element["client" + length];
  axis.offset.length = 0;
  axis.offset[0] = 0;
  axis.offset[1] = axis.scrollLength;
  axis.progress = (0, _utils.progress)(0, axis.scrollLength, axis.current);
  const elapsed = time - prevTime;
  axis.velocity = elapsed > maxElapsed ? 0 : (0, _utils.velocityPerSecond)(axis.current - prev, elapsed);
}
function updateScrollInfo(element, info, time) {
  updateAxisInfo(element, "x", info, time);
  updateAxisInfo(element, "y", info, time);
  info.time = time;
}
},{"@motionone/utils":"node_modules/@motionone/utils/dist/index.es.js"}],"node_modules/@motionone/dom/dist/gestures/scroll/offsets/inset.es.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.calcInset = calcInset;
function calcInset(element, container) {
  let inset = {
    x: 0,
    y: 0
  };
  let current = element;
  while (current && current !== container) {
    if (current instanceof HTMLElement) {
      inset.x += current.offsetLeft;
      inset.y += current.offsetTop;
      current = current.offsetParent;
    } else if (current instanceof SVGGraphicsElement && "getBBox" in current) {
      const {
        top,
        left
      } = current.getBBox();
      inset.x += left;
      inset.y += top;
      /**
       * Assign the next parent element as the <svg /> tag.
       */
      while (current && current.tagName !== "svg") {
        current = current.parentNode;
      }
    }
  }
  return inset;
}
},{}],"node_modules/@motionone/dom/dist/gestures/scroll/offsets/presets.es.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ScrollOffset = void 0;
const ScrollOffset = {
  Enter: [[0, 1], [1, 1]],
  Exit: [[0, 0], [1, 0]],
  Any: [[1, 0], [0, 1]],
  All: [[0, 0], [1, 1]]
};
exports.ScrollOffset = ScrollOffset;
},{}],"node_modules/@motionone/dom/dist/gestures/scroll/offsets/edge.es.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.namedEdges = void 0;
exports.resolveEdge = resolveEdge;
var _utils = require("@motionone/utils");
const namedEdges = {
  start: 0,
  center: 0.5,
  end: 1
};
exports.namedEdges = namedEdges;
function resolveEdge(edge, length, inset = 0) {
  let delta = 0;
  /**
   * If we have this edge defined as a preset, replace the definition
   * with the numerical value.
   */
  if (namedEdges[edge] !== undefined) {
    edge = namedEdges[edge];
  }
  /**
   * Handle unit values
   */
  if ((0, _utils.isString)(edge)) {
    const asNumber = parseFloat(edge);
    if (edge.endsWith("px")) {
      delta = asNumber;
    } else if (edge.endsWith("%")) {
      edge = asNumber / 100;
    } else if (edge.endsWith("vw")) {
      delta = asNumber / 100 * document.documentElement.clientWidth;
    } else if (edge.endsWith("vh")) {
      delta = asNumber / 100 * document.documentElement.clientHeight;
    } else {
      edge = asNumber;
    }
  }
  /**
   * If the edge is defined as a number, handle as a progress value.
   */
  if ((0, _utils.isNumber)(edge)) {
    delta = length * edge;
  }
  return inset + delta;
}
},{"@motionone/utils":"node_modules/@motionone/utils/dist/index.es.js"}],"node_modules/@motionone/dom/dist/gestures/scroll/offsets/offset.es.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resolveOffset = resolveOffset;
var _utils = require("@motionone/utils");
var _edgeEs = require("./edge.es.js");
const defaultOffset = [0, 0];
function resolveOffset(offset, containerLength, targetLength, targetInset) {
  let offsetDefinition = Array.isArray(offset) ? offset : defaultOffset;
  let targetPoint = 0;
  let containerPoint = 0;
  if ((0, _utils.isNumber)(offset)) {
    /**
     * If we're provided offset: [0, 0.5, 1] then each number x should become
     * [x, x], so we default to the behaviour of mapping 0 => 0 of both target
     * and container etc.
     */
    offsetDefinition = [offset, offset];
  } else if ((0, _utils.isString)(offset)) {
    offset = offset.trim();
    if (offset.includes(" ")) {
      offsetDefinition = offset.split(" ");
    } else {
      /**
       * If we're provided a definition like "100px" then we want to apply
       * that only to the top of the target point, leaving the container at 0.
       * Whereas a named offset like "end" should be applied to both.
       */
      offsetDefinition = [offset, _edgeEs.namedEdges[offset] ? offset : `0`];
    }
  }
  targetPoint = (0, _edgeEs.resolveEdge)(offsetDefinition[0], targetLength, targetInset);
  containerPoint = (0, _edgeEs.resolveEdge)(offsetDefinition[1], containerLength);
  return targetPoint - containerPoint;
}
},{"@motionone/utils":"node_modules/@motionone/utils/dist/index.es.js","./edge.es.js":"node_modules/@motionone/dom/dist/gestures/scroll/offsets/edge.es.js"}],"node_modules/@motionone/dom/dist/gestures/scroll/offsets/index.es.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resolveOffsets = resolveOffsets;
var _utils = require("@motionone/utils");
var _insetEs = require("./inset.es.js");
var _presetsEs = require("./presets.es.js");
var _offsetEs = require("./offset.es.js");
const point = {
  x: 0,
  y: 0
};
function resolveOffsets(container, info, options) {
  let {
    offset: offsetDefinition = _presetsEs.ScrollOffset.All
  } = options;
  const {
    target = container,
    axis = "y"
  } = options;
  const lengthLabel = axis === "y" ? "height" : "width";
  const inset = target !== container ? (0, _insetEs.calcInset)(target, container) : point;
  /**
   * Measure the target and container. If they're the same thing then we
   * use the container's scrollWidth/Height as the target, from there
   * all other calculations can remain the same.
   */
  const targetSize = target === container ? {
    width: container.scrollWidth,
    height: container.scrollHeight
  } : {
    width: target.clientWidth,
    height: target.clientHeight
  };
  const containerSize = {
    width: container.clientWidth,
    height: container.clientHeight
  };
  /**
   * Reset the length of the resolved offset array rather than creating a new one.
   * TODO: More reusable data structures for targetSize/containerSize would also be good.
   */
  info[axis].offset.length = 0;
  /**
   * Populate the offset array by resolving the user's offset definition into
   * a list of pixel scroll offets.
   */
  let hasChanged = !info[axis].interpolate;
  const numOffsets = offsetDefinition.length;
  for (let i = 0; i < numOffsets; i++) {
    const offset = (0, _offsetEs.resolveOffset)(offsetDefinition[i], containerSize[lengthLabel], targetSize[lengthLabel], inset[axis]);
    if (!hasChanged && offset !== info[axis].interpolatorOffsets[i]) {
      hasChanged = true;
    }
    info[axis].offset[i] = offset;
  }
  /**
   * If the pixel scroll offsets have changed, create a new interpolator function
   * to map scroll value into a progress.
   */
  if (hasChanged) {
    info[axis].interpolate = (0, _utils.interpolate)((0, _utils.defaultOffset)(numOffsets), info[axis].offset);
    info[axis].interpolatorOffsets = [...info[axis].offset];
  }
  info[axis].progress = info[axis].interpolate(info[axis].current);
}
},{"@motionone/utils":"node_modules/@motionone/utils/dist/index.es.js","./inset.es.js":"node_modules/@motionone/dom/dist/gestures/scroll/offsets/inset.es.js","./presets.es.js":"node_modules/@motionone/dom/dist/gestures/scroll/offsets/presets.es.js","./offset.es.js":"node_modules/@motionone/dom/dist/gestures/scroll/offsets/offset.es.js"}],"node_modules/@motionone/dom/dist/gestures/scroll/on-scroll-handler.es.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createOnScrollHandler = createOnScrollHandler;
var _utils = require("@motionone/utils");
var _infoEs = require("./info.es.js");
var _indexEs = require("./offsets/index.es.js");
function measure(container, target = container, info) {
  /**
   * Find inset of target within scrollable container
   */
  info.x.targetOffset = 0;
  info.y.targetOffset = 0;
  if (target !== container) {
    let node = target;
    while (node && node != container) {
      info.x.targetOffset += node.offsetLeft;
      info.y.targetOffset += node.offsetTop;
      node = node.offsetParent;
    }
  }
  info.x.targetLength = target === container ? target.scrollWidth : target.clientWidth;
  info.y.targetLength = target === container ? target.scrollHeight : target.clientHeight;
  info.x.containerLength = container.clientWidth;
  info.y.containerLength = container.clientHeight;
}
function createOnScrollHandler(element, onScroll, info, options = {}) {
  const axis = options.axis || "y";
  return {
    measure: () => measure(element, options.target, info),
    update: time => {
      (0, _infoEs.updateScrollInfo)(element, info, time);
      if (options.offset || options.target) {
        (0, _indexEs.resolveOffsets)(element, info, options);
      }
    },
    notify: (0, _utils.isFunction)(onScroll) ? () => onScroll(info) : scrubAnimation(onScroll, info[axis])
  };
}
function scrubAnimation(controls, axisInfo) {
  controls.pause();
  controls.forEachNative((animation, {
    easing
  }) => {
    var _a, _b;
    if (animation.updateDuration) {
      if (!easing) animation.easing = _utils.noopReturn;
      animation.updateDuration(1);
    } else {
      const timingOptions = {
        duration: 1000
      };
      if (!easing) timingOptions.easing = "linear";
      (_b = (_a = animation.effect) === null || _a === void 0 ? void 0 : _a.updateTiming) === null || _b === void 0 ? void 0 : _b.call(_a, timingOptions);
    }
  });
  return () => {
    controls.currentTime = axisInfo.progress;
  };
}
},{"@motionone/utils":"node_modules/@motionone/utils/dist/index.es.js","./info.es.js":"node_modules/@motionone/dom/dist/gestures/scroll/info.es.js","./offsets/index.es.js":"node_modules/@motionone/dom/dist/gestures/scroll/offsets/index.es.js"}],"node_modules/@motionone/dom/dist/gestures/scroll/index.es.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.scroll = scroll;
var _tslib = require("tslib");
var _indexEs = require("../resize/index.es.js");
var _infoEs = require("./info.es.js");
var _onScrollHandlerEs = require("./on-scroll-handler.es.js");
const scrollListeners = new WeakMap();
const resizeListeners = new WeakMap();
const onScrollHandlers = new WeakMap();
const getEventTarget = element => element === document.documentElement ? window : element;
function scroll(onScroll, _a = {}) {
  var {
      container = document.documentElement
    } = _a,
    options = (0, _tslib.__rest)(_a, ["container"]);
  let containerHandlers = onScrollHandlers.get(container);
  /**
   * Get the onScroll handlers for this container.
   * If one isn't found, create a new one.
   */
  if (!containerHandlers) {
    containerHandlers = new Set();
    onScrollHandlers.set(container, containerHandlers);
  }
  /**
   * Create a new onScroll handler for the provided callback.
   */
  const info = (0, _infoEs.createScrollInfo)();
  const containerHandler = (0, _onScrollHandlerEs.createOnScrollHandler)(container, onScroll, info, options);
  containerHandlers.add(containerHandler);
  /**
   * Check if there's a scroll event listener for this container.
   * If not, create one.
   */
  if (!scrollListeners.has(container)) {
    const listener = () => {
      const time = performance.now();
      for (const handler of containerHandlers) handler.measure();
      for (const handler of containerHandlers) handler.update(time);
      for (const handler of containerHandlers) handler.notify();
    };
    scrollListeners.set(container, listener);
    const target = getEventTarget(container);
    window.addEventListener("resize", listener, {
      passive: true
    });
    if (container !== document.documentElement) {
      resizeListeners.set(container, (0, _indexEs.resize)(container, listener));
    }
    target.addEventListener("scroll", listener, {
      passive: true
    });
  }
  const listener = scrollListeners.get(container);
  const onLoadProcesss = requestAnimationFrame(listener);
  return () => {
    var _a;
    if (typeof onScroll !== "function") onScroll.stop();
    cancelAnimationFrame(onLoadProcesss);
    /**
     * Check if we even have any handlers for this container.
     */
    const containerHandlers = onScrollHandlers.get(container);
    if (!containerHandlers) return;
    containerHandlers.delete(containerHandler);
    if (containerHandlers.size) return;
    /**
     * If no more handlers, remove the scroll listener too.
     */
    const listener = scrollListeners.get(container);
    scrollListeners.delete(container);
    if (listener) {
      getEventTarget(container).removeEventListener("scroll", listener);
      (_a = resizeListeners.get(container)) === null || _a === void 0 ? void 0 : _a();
      window.removeEventListener("resize", listener);
    }
  };
}
},{"tslib":"node_modules/@motionone/dom/node_modules/tslib/tslib.es6.js","../resize/index.es.js":"node_modules/@motionone/dom/dist/gestures/resize/index.es.js","./info.es.js":"node_modules/@motionone/dom/dist/gestures/scroll/info.es.js","./on-scroll-handler.es.js":"node_modules/@motionone/dom/dist/gestures/scroll/on-scroll-handler.es.js"}],"node_modules/@motionone/dom/dist/state/utils/has-changed.es.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hasChanged = hasChanged;
exports.shallowCompare = shallowCompare;
function hasChanged(a, b) {
  if (typeof a !== typeof b) return true;
  if (Array.isArray(a) && Array.isArray(b)) return !shallowCompare(a, b);
  return a !== b;
}
function shallowCompare(next, prev) {
  const prevLength = prev.length;
  if (prevLength !== next.length) return false;
  for (let i = 0; i < prevLength; i++) {
    if (prev[i] !== next[i]) return false;
  }
  return true;
}
},{}],"node_modules/@motionone/dom/dist/state/utils/is-variant.es.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isVariant = isVariant;
function isVariant(definition) {
  return typeof definition === "object";
}
},{}],"node_modules/@motionone/dom/dist/state/utils/resolve-variant.es.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resolveVariant = resolveVariant;
var _isVariantEs = require("./is-variant.es.js");
function resolveVariant(definition, variants) {
  if ((0, _isVariantEs.isVariant)(definition)) {
    return definition;
  } else if (definition && variants) {
    return variants[definition];
  }
}
},{"./is-variant.es.js":"node_modules/@motionone/dom/dist/state/utils/is-variant.es.js"}],"node_modules/@motionone/dom/dist/state/utils/schedule.es.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.scheduleAnimation = scheduleAnimation;
exports.unscheduleAnimation = unscheduleAnimation;
var _utils = require("@motionone/utils");
let scheduled = undefined;
function processScheduledAnimations() {
  if (!scheduled) return;
  const generators = scheduled.sort(compareByDepth).map(fireAnimateUpdates);
  generators.forEach(fireNext);
  generators.forEach(fireNext);
  scheduled = undefined;
}
function scheduleAnimation(state) {
  if (!scheduled) {
    scheduled = [state];
    requestAnimationFrame(processScheduledAnimations);
  } else {
    (0, _utils.addUniqueItem)(scheduled, state);
  }
}
function unscheduleAnimation(state) {
  scheduled && (0, _utils.removeItem)(scheduled, state);
}
const compareByDepth = (a, b) => a.getDepth() - b.getDepth();
const fireAnimateUpdates = state => state.animateUpdates();
const fireNext = iterator => iterator.next();
},{"@motionone/utils":"node_modules/@motionone/utils/dist/index.es.js"}],"node_modules/@motionone/dom/dist/state/utils/events.es.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dispatchPointerEvent = dispatchPointerEvent;
exports.dispatchViewEvent = dispatchViewEvent;
exports.motionEvent = void 0;
const motionEvent = (name, target) => new CustomEvent(name, {
  detail: {
    target
  }
});
exports.motionEvent = motionEvent;
function dispatchPointerEvent(element, name, event) {
  element.dispatchEvent(new CustomEvent(name, {
    detail: {
      originalEvent: event
    }
  }));
}
function dispatchViewEvent(element, name, entry) {
  element.dispatchEvent(new CustomEvent(name, {
    detail: {
      originalEntry: entry
    }
  }));
}
},{}],"node_modules/@motionone/dom/dist/state/gestures/in-view.es.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.inView = void 0;
var _tslib = require("tslib");
var _eventsEs = require("../utils/events.es.js");
var _inViewEs = require("../../gestures/in-view.es.js");
const inView = {
  isActive: options => Boolean(options.inView),
  subscribe: (element, {
    enable,
    disable
  }, {
    inViewOptions = {}
  }) => {
    const {
        once
      } = inViewOptions,
      viewOptions = (0, _tslib.__rest)(inViewOptions, ["once"]);
    return (0, _inViewEs.inView)(element, enterEntry => {
      enable();
      (0, _eventsEs.dispatchViewEvent)(element, "viewenter", enterEntry);
      if (!once) {
        return leaveEntry => {
          disable();
          (0, _eventsEs.dispatchViewEvent)(element, "viewleave", leaveEntry);
        };
      }
    }, viewOptions);
  }
};
exports.inView = inView;
},{"tslib":"node_modules/@motionone/dom/node_modules/tslib/tslib.es6.js","../utils/events.es.js":"node_modules/@motionone/dom/dist/state/utils/events.es.js","../../gestures/in-view.es.js":"node_modules/@motionone/dom/dist/gestures/in-view.es.js"}],"node_modules/@motionone/dom/dist/state/gestures/hover.es.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hover = void 0;
var _eventsEs = require("../utils/events.es.js");
const mouseEvent = (element, name, action) => event => {
  if (event.pointerType && event.pointerType !== "mouse") return;
  action();
  (0, _eventsEs.dispatchPointerEvent)(element, name, event);
};
const hover = {
  isActive: options => Boolean(options.hover),
  subscribe: (element, {
    enable,
    disable
  }) => {
    const onEnter = mouseEvent(element, "hoverstart", enable);
    const onLeave = mouseEvent(element, "hoverend", disable);
    element.addEventListener("pointerenter", onEnter);
    element.addEventListener("pointerleave", onLeave);
    return () => {
      element.removeEventListener("pointerenter", onEnter);
      element.removeEventListener("pointerleave", onLeave);
    };
  }
};
exports.hover = hover;
},{"../utils/events.es.js":"node_modules/@motionone/dom/dist/state/utils/events.es.js"}],"node_modules/@motionone/dom/dist/state/gestures/press.es.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.press = void 0;
var _eventsEs = require("../utils/events.es.js");
const press = {
  isActive: options => Boolean(options.press),
  subscribe: (element, {
    enable,
    disable
  }) => {
    const onPointerUp = event => {
      disable();
      (0, _eventsEs.dispatchPointerEvent)(element, "pressend", event);
      window.removeEventListener("pointerup", onPointerUp);
    };
    const onPointerDown = event => {
      enable();
      (0, _eventsEs.dispatchPointerEvent)(element, "pressstart", event);
      window.addEventListener("pointerup", onPointerUp);
    };
    element.addEventListener("pointerdown", onPointerDown);
    return () => {
      element.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
    };
  }
};
exports.press = press;
},{"../utils/events.es.js":"node_modules/@motionone/dom/dist/state/utils/events.es.js"}],"node_modules/@motionone/dom/dist/state/index.es.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createMotionState = createMotionState;
exports.mountedStates = void 0;
var _tslib = require("tslib");
var _heyListen = require("hey-listen");
var _utils = require("@motionone/utils");
var _animateStyleEs = require("../animate/animate-style.es.js");
var _styleEs = require("../animate/style.es.js");
var _optionsEs = require("../animate/utils/options.es.js");
var _hasChangedEs = require("./utils/has-changed.es.js");
var _resolveVariantEs = require("./utils/resolve-variant.es.js");
var _scheduleEs = require("./utils/schedule.es.js");
var _inViewEs = require("./gestures/in-view.es.js");
var _hoverEs = require("./gestures/hover.es.js");
var _pressEs = require("./gestures/press.es.js");
var _eventsEs = require("./utils/events.es.js");
var _animation = require("@motionone/animation");
const gestures = {
  inView: _inViewEs.inView,
  hover: _hoverEs.hover,
  press: _pressEs.press
};
/**
 * A list of state types, in priority order. If a value is defined in
 * a righter-most type, it will override any definition in a lefter-most.
 */
const stateTypes = ["initial", "animate", ...Object.keys(gestures), "exit"];
/**
 * A global store of all generated motion states. This can be used to lookup
 * a motion state for a given Element.
 */
const mountedStates = new WeakMap();
exports.mountedStates = mountedStates;
function createMotionState(options = {}, parent) {
  /**
   * The element represented by the motion state. This is an empty reference
   * when we create the state to support SSR and allow for later mounting
   * in view libraries.
   *
   * @ts-ignore
   */
  let element;
  /**
   * Calculate a depth that we can use to order motion states by tree depth.
   */
  let depth = parent ? parent.getDepth() + 1 : 0;
  /**
   * Track which states are currently active.
   */
  const activeStates = {
    initial: true,
    animate: true
  };
  /**
   * A map of functions that, when called, will remove event listeners for
   * a given gesture.
   */
  const gestureSubscriptions = {};
  /**
   * Initialise a context to share through motion states. This
   * will be populated by variant names (if any).
   */
  const context = {};
  for (const name of stateTypes) {
    context[name] = typeof options[name] === "string" ? options[name] : parent === null || parent === void 0 ? void 0 : parent.getContext()[name];
  }
  /**
   * If initial is set to false we use the animate prop as the initial
   * animation state.
   */
  const initialVariantSource = options.initial === false ? "animate" : "initial";
  /**
   * Destructure an initial target out from the resolved initial variant.
   */
  let _a = (0, _resolveVariantEs.resolveVariant)(options[initialVariantSource] || context[initialVariantSource], options.variants) || {},
    target = (0, _tslib.__rest)(_a, ["transition"]);
  /**
   * The base target is a cached map of values that we'll use to animate
   * back to if a value is removed from all active state types. This
   * is usually the initial value as read from the DOM, for instance if
   * it hasn't been defined in initial.
   */
  const baseTarget = Object.assign({}, target);
  /**
   * A generator that will be processed by the global animation scheduler.
   * This yeilds when it switches from reading the DOM to writing to it
   * to prevent layout thrashing.
   */
  function* animateUpdates() {
    var _a, _b;
    const prevTarget = target;
    target = {};
    const animationOptions = {};
    for (const name of stateTypes) {
      if (!activeStates[name]) continue;
      const variant = (0, _resolveVariantEs.resolveVariant)(options[name]);
      if (!variant) continue;
      for (const key in variant) {
        if (key === "transition") continue;
        target[key] = variant[key];
        animationOptions[key] = (0, _optionsEs.getOptions)((_b = (_a = variant.transition) !== null && _a !== void 0 ? _a : options.transition) !== null && _b !== void 0 ? _b : {}, key);
      }
    }
    const allTargetKeys = new Set([...Object.keys(target), ...Object.keys(prevTarget)]);
    const animationFactories = [];
    allTargetKeys.forEach(key => {
      var _a;
      if (target[key] === undefined) {
        target[key] = baseTarget[key];
      }
      if ((0, _hasChangedEs.hasChanged)(prevTarget[key], target[key])) {
        (_a = baseTarget[key]) !== null && _a !== void 0 ? _a : baseTarget[key] = _styleEs.style.get(element, key);
        animationFactories.push((0, _animateStyleEs.animateStyle)(element, key, target[key], animationOptions[key], _animation.Animation));
      }
    });
    // Wait for all animation states to read from the DOM
    yield;
    const animations = animationFactories.map(factory => factory()).filter(Boolean);
    if (!animations.length) return;
    const animationTarget = target;
    element.dispatchEvent((0, _eventsEs.motionEvent)("motionstart", animationTarget));
    Promise.all(animations.map(animation => animation.finished)).then(() => {
      element.dispatchEvent((0, _eventsEs.motionEvent)("motioncomplete", animationTarget));
    }).catch(_utils.noop);
  }
  const setGesture = (name, isActive) => () => {
    activeStates[name] = isActive;
    (0, _scheduleEs.scheduleAnimation)(state);
  };
  const updateGestureSubscriptions = () => {
    for (const name in gestures) {
      const isGestureActive = gestures[name].isActive(options);
      const remove = gestureSubscriptions[name];
      if (isGestureActive && !remove) {
        gestureSubscriptions[name] = gestures[name].subscribe(element, {
          enable: setGesture(name, true),
          disable: setGesture(name, false)
        }, options);
      } else if (!isGestureActive && remove) {
        remove();
        delete gestureSubscriptions[name];
      }
    }
  };
  const state = {
    update: newOptions => {
      if (!element) return;
      options = newOptions;
      updateGestureSubscriptions();
      (0, _scheduleEs.scheduleAnimation)(state);
    },
    setActive: (name, isActive) => {
      if (!element) return;
      activeStates[name] = isActive;
      (0, _scheduleEs.scheduleAnimation)(state);
    },
    animateUpdates,
    getDepth: () => depth,
    getTarget: () => target,
    getOptions: () => options,
    getContext: () => context,
    mount: newElement => {
      (0, _heyListen.invariant)(Boolean(newElement), "Animation state must be mounted with valid Element");
      element = newElement;
      mountedStates.set(element, state);
      updateGestureSubscriptions();
      return () => {
        mountedStates.delete(element);
        (0, _scheduleEs.unscheduleAnimation)(state);
        for (const key in gestureSubscriptions) {
          gestureSubscriptions[key]();
        }
      };
    },
    isMounted: () => Boolean(element)
  };
  return state;
}
},{"tslib":"node_modules/@motionone/dom/node_modules/tslib/tslib.es6.js","hey-listen":"node_modules/hey-listen/dist/hey-listen.es.js","@motionone/utils":"node_modules/@motionone/utils/dist/index.es.js","../animate/animate-style.es.js":"node_modules/@motionone/dom/dist/animate/animate-style.es.js","../animate/style.es.js":"node_modules/@motionone/dom/dist/animate/style.es.js","../animate/utils/options.es.js":"node_modules/@motionone/dom/dist/animate/utils/options.es.js","./utils/has-changed.es.js":"node_modules/@motionone/dom/dist/state/utils/has-changed.es.js","./utils/resolve-variant.es.js":"node_modules/@motionone/dom/dist/state/utils/resolve-variant.es.js","./utils/schedule.es.js":"node_modules/@motionone/dom/dist/state/utils/schedule.es.js","./gestures/in-view.es.js":"node_modules/@motionone/dom/dist/state/gestures/in-view.es.js","./gestures/hover.es.js":"node_modules/@motionone/dom/dist/state/gestures/hover.es.js","./gestures/press.es.js":"node_modules/@motionone/dom/dist/state/gestures/press.es.js","./utils/events.es.js":"node_modules/@motionone/dom/dist/state/utils/events.es.js","@motionone/animation":"node_modules/@motionone/animation/dist/index.es.js"}],"node_modules/@motionone/dom/dist/animate/utils/style-object.es.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createStyles = createStyles;
var _utils = require("@motionone/utils");
var _transformsEs = require("./transforms.es.js");
function createStyles(keyframes) {
  const initialKeyframes = {};
  const transformKeys = [];
  for (let key in keyframes) {
    const value = keyframes[key];
    if ((0, _transformsEs.isTransform)(key)) {
      if (_transformsEs.transformAlias[key]) key = _transformsEs.transformAlias[key];
      transformKeys.push(key);
      key = (0, _transformsEs.asTransformCssVar)(key);
    }
    let initialKeyframe = Array.isArray(value) ? value[0] : value;
    /**
     * If this is a number and we have a default value type, convert the number
     * to this type.
     */
    const definition = _transformsEs.transformDefinitions.get(key);
    if (definition) {
      initialKeyframe = (0, _utils.isNumber)(value) ? definition.toDefaultUnit(value) : value;
    }
    initialKeyframes[key] = initialKeyframe;
  }
  if (transformKeys.length) {
    initialKeyframes.transform = (0, _transformsEs.buildTransformTemplate)(transformKeys);
  }
  return initialKeyframes;
}
},{"@motionone/utils":"node_modules/@motionone/utils/dist/index.es.js","./transforms.es.js":"node_modules/@motionone/dom/dist/animate/utils/transforms.es.js"}],"node_modules/@motionone/dom/dist/animate/utils/style-string.es.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createStyleString = createStyleString;
var _styleObjectEs = require("./style-object.es.js");
const camelLetterToPipeLetter = letter => `-${letter.toLowerCase()}`;
const camelToPipeCase = str => str.replace(/[A-Z]/g, camelLetterToPipeLetter);
function createStyleString(target = {}) {
  const styles = (0, _styleObjectEs.createStyles)(target);
  let style = "";
  for (const key in styles) {
    style += key.startsWith("--") ? key : camelToPipeCase(key);
    style += `: ${styles[key]}; `;
  }
  return style;
}
},{"./style-object.es.js":"node_modules/@motionone/dom/dist/animate/utils/style-object.es.js"}],"node_modules/@motionone/dom/dist/index.es.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "ScrollOffset", {
  enumerable: true,
  get: function () {
    return _presetsEs.ScrollOffset;
  }
});
Object.defineProperty(exports, "animate", {
  enumerable: true,
  get: function () {
    return _indexEs.animate;
  }
});
Object.defineProperty(exports, "animateStyle", {
  enumerable: true,
  get: function () {
    return _animateStyleEs.animateStyle;
  }
});
Object.defineProperty(exports, "createAnimate", {
  enumerable: true,
  get: function () {
    return _createAnimateEs.createAnimate;
  }
});
Object.defineProperty(exports, "createMotionState", {
  enumerable: true,
  get: function () {
    return _indexEs7.createMotionState;
  }
});
Object.defineProperty(exports, "createStyleString", {
  enumerable: true,
  get: function () {
    return _styleStringEs.createStyleString;
  }
});
Object.defineProperty(exports, "createStyles", {
  enumerable: true,
  get: function () {
    return _styleObjectEs.createStyles;
  }
});
Object.defineProperty(exports, "getAnimationData", {
  enumerable: true,
  get: function () {
    return _dataEs.getAnimationData;
  }
});
Object.defineProperty(exports, "getStyleName", {
  enumerable: true,
  get: function () {
    return _getStyleNameEs.getStyleName;
  }
});
Object.defineProperty(exports, "glide", {
  enumerable: true,
  get: function () {
    return _indexEs4.glide;
  }
});
Object.defineProperty(exports, "inView", {
  enumerable: true,
  get: function () {
    return _inViewEs.inView;
  }
});
Object.defineProperty(exports, "mountedStates", {
  enumerable: true,
  get: function () {
    return _indexEs7.mountedStates;
  }
});
Object.defineProperty(exports, "resize", {
  enumerable: true,
  get: function () {
    return _indexEs5.resize;
  }
});
Object.defineProperty(exports, "scroll", {
  enumerable: true,
  get: function () {
    return _indexEs6.scroll;
  }
});
Object.defineProperty(exports, "spring", {
  enumerable: true,
  get: function () {
    return _indexEs3.spring;
  }
});
Object.defineProperty(exports, "stagger", {
  enumerable: true,
  get: function () {
    return _staggerEs.stagger;
  }
});
Object.defineProperty(exports, "style", {
  enumerable: true,
  get: function () {
    return _styleEs.style;
  }
});
Object.defineProperty(exports, "timeline", {
  enumerable: true,
  get: function () {
    return _indexEs2.timeline;
  }
});
Object.defineProperty(exports, "withControls", {
  enumerable: true,
  get: function () {
    return _controlsEs.withControls;
  }
});
var _indexEs = require("./animate/index.es.js");
var _createAnimateEs = require("./animate/create-animate.es.js");
var _animateStyleEs = require("./animate/animate-style.es.js");
var _indexEs2 = require("./timeline/index.es.js");
var _staggerEs = require("./utils/stagger.es.js");
var _indexEs3 = require("./easing/spring/index.es.js");
var _indexEs4 = require("./easing/glide/index.es.js");
var _styleEs = require("./animate/style.es.js");
var _inViewEs = require("./gestures/in-view.es.js");
var _indexEs5 = require("./gestures/resize/index.es.js");
var _indexEs6 = require("./gestures/scroll/index.es.js");
var _presetsEs = require("./gestures/scroll/offsets/presets.es.js");
var _controlsEs = require("./animate/utils/controls.es.js");
var _dataEs = require("./animate/data.es.js");
var _getStyleNameEs = require("./animate/utils/get-style-name.es.js");
var _indexEs7 = require("./state/index.es.js");
var _styleObjectEs = require("./animate/utils/style-object.es.js");
var _styleStringEs = require("./animate/utils/style-string.es.js");
},{"./animate/index.es.js":"node_modules/@motionone/dom/dist/animate/index.es.js","./animate/create-animate.es.js":"node_modules/@motionone/dom/dist/animate/create-animate.es.js","./animate/animate-style.es.js":"node_modules/@motionone/dom/dist/animate/animate-style.es.js","./timeline/index.es.js":"node_modules/@motionone/dom/dist/timeline/index.es.js","./utils/stagger.es.js":"node_modules/@motionone/dom/dist/utils/stagger.es.js","./easing/spring/index.es.js":"node_modules/@motionone/dom/dist/easing/spring/index.es.js","./easing/glide/index.es.js":"node_modules/@motionone/dom/dist/easing/glide/index.es.js","./animate/style.es.js":"node_modules/@motionone/dom/dist/animate/style.es.js","./gestures/in-view.es.js":"node_modules/@motionone/dom/dist/gestures/in-view.es.js","./gestures/resize/index.es.js":"node_modules/@motionone/dom/dist/gestures/resize/index.es.js","./gestures/scroll/index.es.js":"node_modules/@motionone/dom/dist/gestures/scroll/index.es.js","./gestures/scroll/offsets/presets.es.js":"node_modules/@motionone/dom/dist/gestures/scroll/offsets/presets.es.js","./animate/utils/controls.es.js":"node_modules/@motionone/dom/dist/animate/utils/controls.es.js","./animate/data.es.js":"node_modules/@motionone/dom/dist/animate/data.es.js","./animate/utils/get-style-name.es.js":"node_modules/@motionone/dom/dist/animate/utils/get-style-name.es.js","./state/index.es.js":"node_modules/@motionone/dom/dist/state/index.es.js","./animate/utils/style-object.es.js":"node_modules/@motionone/dom/dist/animate/utils/style-object.es.js","./animate/utils/style-string.es.js":"node_modules/@motionone/dom/dist/animate/utils/style-string.es.js"}],"node_modules/motion/dist/animate.es.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.animate = animate;
exports.animateProgress = animateProgress;
var _dom = require("@motionone/dom");
var _utils = require("@motionone/utils");
var _animation = require("@motionone/animation");
function animateProgress(target, options = {}) {
  return (0, _dom.withControls)([() => {
    const animation = new _animation.Animation(target, [0, 1], options);
    animation.finished.catch(() => {});
    return animation;
  }], options, options.duration);
}
function animate(target, keyframesOrOptions, options) {
  const factory = (0, _utils.isFunction)(target) ? animateProgress : _dom.animate;
  return factory(target, keyframesOrOptions, options);
}
},{"@motionone/dom":"node_modules/@motionone/dom/dist/index.es.js","@motionone/utils":"node_modules/@motionone/utils/dist/index.es.js","@motionone/animation":"node_modules/@motionone/animation/dist/index.es.js"}],"node_modules/motion/dist/main.es.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  animate: true
};
Object.defineProperty(exports, "animate", {
  enumerable: true,
  get: function () {
    return _animateEs.animate;
  }
});
var _dom = require("@motionone/dom");
Object.keys(_dom).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _dom[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _dom[key];
    }
  });
});
var _types = require("@motionone/types");
Object.keys(_types).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _types[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _types[key];
    }
  });
});
var _animateEs = require("./animate.es.js");
},{"@motionone/dom":"node_modules/@motionone/dom/dist/index.es.js","@motionone/types":"node_modules/@motionone/types/dist/index.es.js","./animate.es.js":"node_modules/motion/dist/animate.es.js"}],"node_modules/@web3modal/ui/node_modules/qrcode/lib/can-promise.js":[function(require,module,exports) {
// can-promise has a crash in some versions of react native that dont have
// standard global objects
// https://github.com/soldair/node-qrcode/issues/157

module.exports = function () {
  return typeof Promise === 'function' && Promise.prototype && Promise.prototype.then;
};
},{}],"node_modules/@web3modal/ui/node_modules/qrcode/lib/core/utils.js":[function(require,module,exports) {
var toSJISFunction;
var CODEWORDS_COUNT = [0,
// Not used
26, 44, 70, 100, 134, 172, 196, 242, 292, 346, 404, 466, 532, 581, 655, 733, 815, 901, 991, 1085, 1156, 1258, 1364, 1474, 1588, 1706, 1828, 1921, 2051, 2185, 2323, 2465, 2611, 2761, 2876, 3034, 3196, 3362, 3532, 3706];

/**
 * Returns the QR Code size for the specified version
 *
 * @param  {Number} version QR Code version
 * @return {Number}         size of QR code
 */
exports.getSymbolSize = function getSymbolSize(version) {
  if (!version) throw new Error('"version" cannot be null or undefined');
  if (version < 1 || version > 40) throw new Error('"version" should be in range from 1 to 40');
  return version * 4 + 17;
};

/**
 * Returns the total number of codewords used to store data and EC information.
 *
 * @param  {Number} version QR Code version
 * @return {Number}         Data length in bits
 */
exports.getSymbolTotalCodewords = function getSymbolTotalCodewords(version) {
  return CODEWORDS_COUNT[version];
};

/**
 * Encode data with Bose-Chaudhuri-Hocquenghem
 *
 * @param  {Number} data Value to encode
 * @return {Number}      Encoded value
 */
exports.getBCHDigit = function (data) {
  var digit = 0;
  while (data !== 0) {
    digit++;
    data >>>= 1;
  }
  return digit;
};
exports.setToSJISFunction = function setToSJISFunction(f) {
  if (typeof f !== 'function') {
    throw new Error('"toSJISFunc" is not a valid function.');
  }
  toSJISFunction = f;
};
exports.isKanjiModeEnabled = function () {
  return typeof toSJISFunction !== 'undefined';
};
exports.toSJIS = function toSJIS(kanji) {
  return toSJISFunction(kanji);
};
},{}],"node_modules/@web3modal/ui/node_modules/qrcode/lib/core/error-correction-level.js":[function(require,module,exports) {
exports.L = {
  bit: 1
};
exports.M = {
  bit: 0
};
exports.Q = {
  bit: 3
};
exports.H = {
  bit: 2
};
function fromString(string) {
  if (typeof string !== 'string') {
    throw new Error('Param is not a string');
  }
  var lcStr = string.toLowerCase();
  switch (lcStr) {
    case 'l':
    case 'low':
      return exports.L;
    case 'm':
    case 'medium':
      return exports.M;
    case 'q':
    case 'quartile':
      return exports.Q;
    case 'h':
    case 'high':
      return exports.H;
    default:
      throw new Error('Unknown EC Level: ' + string);
  }
}
exports.isValid = function isValid(level) {
  return level && typeof level.bit !== 'undefined' && level.bit >= 0 && level.bit < 4;
};
exports.from = function from(value, defaultValue) {
  if (exports.isValid(value)) {
    return value;
  }
  try {
    return fromString(value);
  } catch (e) {
    return defaultValue;
  }
};
},{}],"node_modules/@web3modal/ui/node_modules/qrcode/lib/core/bit-buffer.js":[function(require,module,exports) {
function BitBuffer() {
  this.buffer = [];
  this.length = 0;
}
BitBuffer.prototype = {
  get: function get(index) {
    var bufIndex = Math.floor(index / 8);
    return (this.buffer[bufIndex] >>> 7 - index % 8 & 1) === 1;
  },
  put: function put(num, length) {
    for (var i = 0; i < length; i++) {
      this.putBit((num >>> length - i - 1 & 1) === 1);
    }
  },
  getLengthInBits: function getLengthInBits() {
    return this.length;
  },
  putBit: function putBit(bit) {
    var bufIndex = Math.floor(this.length / 8);
    if (this.buffer.length <= bufIndex) {
      this.buffer.push(0);
    }
    if (bit) {
      this.buffer[bufIndex] |= 0x80 >>> this.length % 8;
    }
    this.length++;
  }
};
module.exports = BitBuffer;
},{}],"node_modules/@web3modal/ui/node_modules/qrcode/lib/core/bit-matrix.js":[function(require,module,exports) {
/**
 * Helper class to handle QR Code symbol modules
 *
 * @param {Number} size Symbol size
 */
function BitMatrix(size) {
  if (!size || size < 1) {
    throw new Error('BitMatrix size must be defined and greater than 0');
  }
  this.size = size;
  this.data = new Uint8Array(size * size);
  this.reservedBit = new Uint8Array(size * size);
}

/**
 * Set bit value at specified location
 * If reserved flag is set, this bit will be ignored during masking process
 *
 * @param {Number}  row
 * @param {Number}  col
 * @param {Boolean} value
 * @param {Boolean} reserved
 */
BitMatrix.prototype.set = function (row, col, value, reserved) {
  var index = row * this.size + col;
  this.data[index] = value;
  if (reserved) this.reservedBit[index] = true;
};

/**
 * Returns bit value at specified location
 *
 * @param  {Number}  row
 * @param  {Number}  col
 * @return {Boolean}
 */
BitMatrix.prototype.get = function (row, col) {
  return this.data[row * this.size + col];
};

/**
 * Applies xor operator at specified location
 * (used during masking process)
 *
 * @param {Number}  row
 * @param {Number}  col
 * @param {Boolean} value
 */
BitMatrix.prototype.xor = function (row, col, value) {
  this.data[row * this.size + col] ^= value;
};

/**
 * Check if bit at specified location is reserved
 *
 * @param {Number}   row
 * @param {Number}   col
 * @return {Boolean}
 */
BitMatrix.prototype.isReserved = function (row, col) {
  return this.reservedBit[row * this.size + col];
};
module.exports = BitMatrix;
},{}],"node_modules/@web3modal/ui/node_modules/qrcode/lib/core/alignment-pattern.js":[function(require,module,exports) {
/**
 * Alignment pattern are fixed reference pattern in defined positions
 * in a matrix symbology, which enables the decode software to re-synchronise
 * the coordinate mapping of the image modules in the event of moderate amounts
 * of distortion of the image.
 *
 * Alignment patterns are present only in QR Code symbols of version 2 or larger
 * and their number depends on the symbol version.
 */

var getSymbolSize = require('./utils').getSymbolSize;

/**
 * Calculate the row/column coordinates of the center module of each alignment pattern
 * for the specified QR Code version.
 *
 * The alignment patterns are positioned symmetrically on either side of the diagonal
 * running from the top left corner of the symbol to the bottom right corner.
 *
 * Since positions are simmetrical only half of the coordinates are returned.
 * Each item of the array will represent in turn the x and y coordinate.
 * @see {@link getPositions}
 *
 * @param  {Number} version QR Code version
 * @return {Array}          Array of coordinate
 */
exports.getRowColCoords = function getRowColCoords(version) {
  if (version === 1) return [];
  var posCount = Math.floor(version / 7) + 2;
  var size = getSymbolSize(version);
  var intervals = size === 145 ? 26 : Math.ceil((size - 13) / (2 * posCount - 2)) * 2;
  var positions = [size - 7]; // Last coord is always (size - 7)

  for (var i = 1; i < posCount - 1; i++) {
    positions[i] = positions[i - 1] - intervals;
  }
  positions.push(6); // First coord is always 6

  return positions.reverse();
};

/**
 * Returns an array containing the positions of each alignment pattern.
 * Each array's element represent the center point of the pattern as (x, y) coordinates
 *
 * Coordinates are calculated expanding the row/column coordinates returned by {@link getRowColCoords}
 * and filtering out the items that overlaps with finder pattern
 *
 * @example
 * For a Version 7 symbol {@link getRowColCoords} returns values 6, 22 and 38.
 * The alignment patterns, therefore, are to be centered on (row, column)
 * positions (6,22), (22,6), (22,22), (22,38), (38,22), (38,38).
 * Note that the coordinates (6,6), (6,38), (38,6) are occupied by finder patterns
 * and are not therefore used for alignment patterns.
 *
 * let pos = getPositions(7)
 * // [[6,22], [22,6], [22,22], [22,38], [38,22], [38,38]]
 *
 * @param  {Number} version QR Code version
 * @return {Array}          Array of coordinates
 */
exports.getPositions = function getPositions(version) {
  var coords = [];
  var pos = exports.getRowColCoords(version);
  var posLength = pos.length;
  for (var i = 0; i < posLength; i++) {
    for (var j = 0; j < posLength; j++) {
      // Skip if position is occupied by finder patterns
      if (i === 0 && j === 0 ||
      // top-left
      i === 0 && j === posLength - 1 ||
      // bottom-left
      i === posLength - 1 && j === 0) {
        // top-right
        continue;
      }
      coords.push([pos[i], pos[j]]);
    }
  }
  return coords;
};
},{"./utils":"node_modules/@web3modal/ui/node_modules/qrcode/lib/core/utils.js"}],"node_modules/@web3modal/ui/node_modules/qrcode/lib/core/finder-pattern.js":[function(require,module,exports) {
var getSymbolSize = require('./utils').getSymbolSize;
var FINDER_PATTERN_SIZE = 7;

/**
 * Returns an array containing the positions of each finder pattern.
 * Each array's element represent the top-left point of the pattern as (x, y) coordinates
 *
 * @param  {Number} version QR Code version
 * @return {Array}          Array of coordinates
 */
exports.getPositions = function getPositions(version) {
  var size = getSymbolSize(version);
  return [
  // top-left
  [0, 0],
  // top-right
  [size - FINDER_PATTERN_SIZE, 0],
  // bottom-left
  [0, size - FINDER_PATTERN_SIZE]];
};
},{"./utils":"node_modules/@web3modal/ui/node_modules/qrcode/lib/core/utils.js"}],"node_modules/@web3modal/ui/node_modules/qrcode/lib/core/mask-pattern.js":[function(require,module,exports) {
/**
 * Data mask pattern reference
 * @type {Object}
 */
exports.Patterns = {
  PATTERN000: 0,
  PATTERN001: 1,
  PATTERN010: 2,
  PATTERN011: 3,
  PATTERN100: 4,
  PATTERN101: 5,
  PATTERN110: 6,
  PATTERN111: 7
};

/**
 * Weighted penalty scores for the undesirable features
 * @type {Object}
 */
var PenaltyScores = {
  N1: 3,
  N2: 3,
  N3: 40,
  N4: 10
};

/**
 * Check if mask pattern value is valid
 *
 * @param  {Number}  mask    Mask pattern
 * @return {Boolean}         true if valid, false otherwise
 */
exports.isValid = function isValid(mask) {
  return mask != null && mask !== '' && !isNaN(mask) && mask >= 0 && mask <= 7;
};

/**
 * Returns mask pattern from a value.
 * If value is not valid, returns undefined
 *
 * @param  {Number|String} value        Mask pattern value
 * @return {Number}                     Valid mask pattern or undefined
 */
exports.from = function from(value) {
  return exports.isValid(value) ? parseInt(value, 10) : undefined;
};

/**
* Find adjacent modules in row/column with the same color
* and assign a penalty value.
*
* Points: N1 + i
* i is the amount by which the number of adjacent modules of the same color exceeds 5
*/
exports.getPenaltyN1 = function getPenaltyN1(data) {
  var size = data.size;
  var points = 0;
  var sameCountCol = 0;
  var sameCountRow = 0;
  var lastCol = null;
  var lastRow = null;
  for (var row = 0; row < size; row++) {
    sameCountCol = sameCountRow = 0;
    lastCol = lastRow = null;
    for (var col = 0; col < size; col++) {
      var module = data.get(row, col);
      if (module === lastCol) {
        sameCountCol++;
      } else {
        if (sameCountCol >= 5) points += PenaltyScores.N1 + (sameCountCol - 5);
        lastCol = module;
        sameCountCol = 1;
      }
      module = data.get(col, row);
      if (module === lastRow) {
        sameCountRow++;
      } else {
        if (sameCountRow >= 5) points += PenaltyScores.N1 + (sameCountRow - 5);
        lastRow = module;
        sameCountRow = 1;
      }
    }
    if (sameCountCol >= 5) points += PenaltyScores.N1 + (sameCountCol - 5);
    if (sameCountRow >= 5) points += PenaltyScores.N1 + (sameCountRow - 5);
  }
  return points;
};

/**
 * Find 2x2 blocks with the same color and assign a penalty value
 *
 * Points: N2 * (m - 1) * (n - 1)
 */
exports.getPenaltyN2 = function getPenaltyN2(data) {
  var size = data.size;
  var points = 0;
  for (var row = 0; row < size - 1; row++) {
    for (var col = 0; col < size - 1; col++) {
      var last = data.get(row, col) + data.get(row, col + 1) + data.get(row + 1, col) + data.get(row + 1, col + 1);
      if (last === 4 || last === 0) points++;
    }
  }
  return points * PenaltyScores.N2;
};

/**
 * Find 1:1:3:1:1 ratio (dark:light:dark:light:dark) pattern in row/column,
 * preceded or followed by light area 4 modules wide
 *
 * Points: N3 * number of pattern found
 */
exports.getPenaltyN3 = function getPenaltyN3(data) {
  var size = data.size;
  var points = 0;
  var bitsCol = 0;
  var bitsRow = 0;
  for (var row = 0; row < size; row++) {
    bitsCol = bitsRow = 0;
    for (var col = 0; col < size; col++) {
      bitsCol = bitsCol << 1 & 0x7FF | data.get(row, col);
      if (col >= 10 && (bitsCol === 0x5D0 || bitsCol === 0x05D)) points++;
      bitsRow = bitsRow << 1 & 0x7FF | data.get(col, row);
      if (col >= 10 && (bitsRow === 0x5D0 || bitsRow === 0x05D)) points++;
    }
  }
  return points * PenaltyScores.N3;
};

/**
 * Calculate proportion of dark modules in entire symbol
 *
 * Points: N4 * k
 *
 * k is the rating of the deviation of the proportion of dark modules
 * in the symbol from 50% in steps of 5%
 */
exports.getPenaltyN4 = function getPenaltyN4(data) {
  var darkCount = 0;
  var modulesCount = data.data.length;
  for (var i = 0; i < modulesCount; i++) darkCount += data.data[i];
  var k = Math.abs(Math.ceil(darkCount * 100 / modulesCount / 5) - 10);
  return k * PenaltyScores.N4;
};

/**
 * Return mask value at given position
 *
 * @param  {Number} maskPattern Pattern reference value
 * @param  {Number} i           Row
 * @param  {Number} j           Column
 * @return {Boolean}            Mask value
 */
function getMaskAt(maskPattern, i, j) {
  switch (maskPattern) {
    case exports.Patterns.PATTERN000:
      return (i + j) % 2 === 0;
    case exports.Patterns.PATTERN001:
      return i % 2 === 0;
    case exports.Patterns.PATTERN010:
      return j % 3 === 0;
    case exports.Patterns.PATTERN011:
      return (i + j) % 3 === 0;
    case exports.Patterns.PATTERN100:
      return (Math.floor(i / 2) + Math.floor(j / 3)) % 2 === 0;
    case exports.Patterns.PATTERN101:
      return i * j % 2 + i * j % 3 === 0;
    case exports.Patterns.PATTERN110:
      return (i * j % 2 + i * j % 3) % 2 === 0;
    case exports.Patterns.PATTERN111:
      return (i * j % 3 + (i + j) % 2) % 2 === 0;
    default:
      throw new Error('bad maskPattern:' + maskPattern);
  }
}

/**
 * Apply a mask pattern to a BitMatrix
 *
 * @param  {Number}    pattern Pattern reference number
 * @param  {BitMatrix} data    BitMatrix data
 */
exports.applyMask = function applyMask(pattern, data) {
  var size = data.size;
  for (var col = 0; col < size; col++) {
    for (var row = 0; row < size; row++) {
      if (data.isReserved(row, col)) continue;
      data.xor(row, col, getMaskAt(pattern, row, col));
    }
  }
};

/**
 * Returns the best mask pattern for data
 *
 * @param  {BitMatrix} data
 * @return {Number} Mask pattern reference number
 */
exports.getBestMask = function getBestMask(data, setupFormatFunc) {
  var numPatterns = Object.keys(exports.Patterns).length;
  var bestPattern = 0;
  var lowerPenalty = Infinity;
  for (var p = 0; p < numPatterns; p++) {
    setupFormatFunc(p);
    exports.applyMask(p, data);

    // Calculate penalty
    var penalty = exports.getPenaltyN1(data) + exports.getPenaltyN2(data) + exports.getPenaltyN3(data) + exports.getPenaltyN4(data);

    // Undo previously applied mask
    exports.applyMask(p, data);
    if (penalty < lowerPenalty) {
      lowerPenalty = penalty;
      bestPattern = p;
    }
  }
  return bestPattern;
};
},{}],"node_modules/@web3modal/ui/node_modules/qrcode/lib/core/error-correction-code.js":[function(require,module,exports) {
var ECLevel = require('./error-correction-level');
var EC_BLOCKS_TABLE = [
// L  M  Q  H
1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 2, 2, 4, 1, 2, 4, 4, 2, 4, 4, 4, 2, 4, 6, 5, 2, 4, 6, 6, 2, 5, 8, 8, 4, 5, 8, 8, 4, 5, 8, 11, 4, 8, 10, 11, 4, 9, 12, 16, 4, 9, 16, 16, 6, 10, 12, 18, 6, 10, 17, 16, 6, 11, 16, 19, 6, 13, 18, 21, 7, 14, 21, 25, 8, 16, 20, 25, 8, 17, 23, 25, 9, 17, 23, 34, 9, 18, 25, 30, 10, 20, 27, 32, 12, 21, 29, 35, 12, 23, 34, 37, 12, 25, 34, 40, 13, 26, 35, 42, 14, 28, 38, 45, 15, 29, 40, 48, 16, 31, 43, 51, 17, 33, 45, 54, 18, 35, 48, 57, 19, 37, 51, 60, 19, 38, 53, 63, 20, 40, 56, 66, 21, 43, 59, 70, 22, 45, 62, 74, 24, 47, 65, 77, 25, 49, 68, 81];
var EC_CODEWORDS_TABLE = [
// L  M  Q  H
7, 10, 13, 17, 10, 16, 22, 28, 15, 26, 36, 44, 20, 36, 52, 64, 26, 48, 72, 88, 36, 64, 96, 112, 40, 72, 108, 130, 48, 88, 132, 156, 60, 110, 160, 192, 72, 130, 192, 224, 80, 150, 224, 264, 96, 176, 260, 308, 104, 198, 288, 352, 120, 216, 320, 384, 132, 240, 360, 432, 144, 280, 408, 480, 168, 308, 448, 532, 180, 338, 504, 588, 196, 364, 546, 650, 224, 416, 600, 700, 224, 442, 644, 750, 252, 476, 690, 816, 270, 504, 750, 900, 300, 560, 810, 960, 312, 588, 870, 1050, 336, 644, 952, 1110, 360, 700, 1020, 1200, 390, 728, 1050, 1260, 420, 784, 1140, 1350, 450, 812, 1200, 1440, 480, 868, 1290, 1530, 510, 924, 1350, 1620, 540, 980, 1440, 1710, 570, 1036, 1530, 1800, 570, 1064, 1590, 1890, 600, 1120, 1680, 1980, 630, 1204, 1770, 2100, 660, 1260, 1860, 2220, 720, 1316, 1950, 2310, 750, 1372, 2040, 2430];

/**
 * Returns the number of error correction block that the QR Code should contain
 * for the specified version and error correction level.
 *
 * @param  {Number} version              QR Code version
 * @param  {Number} errorCorrectionLevel Error correction level
 * @return {Number}                      Number of error correction blocks
 */
exports.getBlocksCount = function getBlocksCount(version, errorCorrectionLevel) {
  switch (errorCorrectionLevel) {
    case ECLevel.L:
      return EC_BLOCKS_TABLE[(version - 1) * 4 + 0];
    case ECLevel.M:
      return EC_BLOCKS_TABLE[(version - 1) * 4 + 1];
    case ECLevel.Q:
      return EC_BLOCKS_TABLE[(version - 1) * 4 + 2];
    case ECLevel.H:
      return EC_BLOCKS_TABLE[(version - 1) * 4 + 3];
    default:
      return undefined;
  }
};

/**
 * Returns the number of error correction codewords to use for the specified
 * version and error correction level.
 *
 * @param  {Number} version              QR Code version
 * @param  {Number} errorCorrectionLevel Error correction level
 * @return {Number}                      Number of error correction codewords
 */
exports.getTotalCodewordsCount = function getTotalCodewordsCount(version, errorCorrectionLevel) {
  switch (errorCorrectionLevel) {
    case ECLevel.L:
      return EC_CODEWORDS_TABLE[(version - 1) * 4 + 0];
    case ECLevel.M:
      return EC_CODEWORDS_TABLE[(version - 1) * 4 + 1];
    case ECLevel.Q:
      return EC_CODEWORDS_TABLE[(version - 1) * 4 + 2];
    case ECLevel.H:
      return EC_CODEWORDS_TABLE[(version - 1) * 4 + 3];
    default:
      return undefined;
  }
};
},{"./error-correction-level":"node_modules/@web3modal/ui/node_modules/qrcode/lib/core/error-correction-level.js"}],"node_modules/@web3modal/ui/node_modules/qrcode/lib/core/galois-field.js":[function(require,module,exports) {
var EXP_TABLE = new Uint8Array(512);
var LOG_TABLE = new Uint8Array(256)
/**
 * Precompute the log and anti-log tables for faster computation later
 *
 * For each possible value in the galois field 2^8, we will pre-compute
 * the logarithm and anti-logarithm (exponential) of this value
 *
 * ref {@link https://en.wikiversity.org/wiki/Reed%E2%80%93Solomon_codes_for_coders#Introduction_to_mathematical_fields}
 */;
(function initTables() {
  var x = 1;
  for (var i = 0; i < 255; i++) {
    EXP_TABLE[i] = x;
    LOG_TABLE[x] = i;
    x <<= 1; // multiply by 2

    // The QR code specification says to use byte-wise modulo 100011101 arithmetic.
    // This means that when a number is 256 or larger, it should be XORed with 0x11D.
    if (x & 0x100) {
      // similar to x >= 256, but a lot faster (because 0x100 == 256)
      x ^= 0x11D;
    }
  }

  // Optimization: double the size of the anti-log table so that we don't need to mod 255 to
  // stay inside the bounds (because we will mainly use this table for the multiplication of
  // two GF numbers, no more).
  // @see {@link mul}
  for (var _i = 255; _i < 512; _i++) {
    EXP_TABLE[_i] = EXP_TABLE[_i - 255];
  }
})();

/**
 * Returns log value of n inside Galois Field
 *
 * @param  {Number} n
 * @return {Number}
 */
exports.log = function log(n) {
  if (n < 1) throw new Error('log(' + n + ')');
  return LOG_TABLE[n];
};

/**
 * Returns anti-log value of n inside Galois Field
 *
 * @param  {Number} n
 * @return {Number}
 */
exports.exp = function exp(n) {
  return EXP_TABLE[n];
};

/**
 * Multiplies two number inside Galois Field
 *
 * @param  {Number} x
 * @param  {Number} y
 * @return {Number}
 */
exports.mul = function mul(x, y) {
  if (x === 0 || y === 0) return 0;

  // should be EXP_TABLE[(LOG_TABLE[x] + LOG_TABLE[y]) % 255] if EXP_TABLE wasn't oversized
  // @see {@link initTables}
  return EXP_TABLE[LOG_TABLE[x] + LOG_TABLE[y]];
};
},{}],"node_modules/@web3modal/ui/node_modules/qrcode/lib/core/polynomial.js":[function(require,module,exports) {
var GF = require('./galois-field');

/**
 * Multiplies two polynomials inside Galois Field
 *
 * @param  {Uint8Array} p1 Polynomial
 * @param  {Uint8Array} p2 Polynomial
 * @return {Uint8Array}    Product of p1 and p2
 */
exports.mul = function mul(p1, p2) {
  var coeff = new Uint8Array(p1.length + p2.length - 1);
  for (var i = 0; i < p1.length; i++) {
    for (var j = 0; j < p2.length; j++) {
      coeff[i + j] ^= GF.mul(p1[i], p2[j]);
    }
  }
  return coeff;
};

/**
 * Calculate the remainder of polynomials division
 *
 * @param  {Uint8Array} divident Polynomial
 * @param  {Uint8Array} divisor  Polynomial
 * @return {Uint8Array}          Remainder
 */
exports.mod = function mod(divident, divisor) {
  var result = new Uint8Array(divident);
  while (result.length - divisor.length >= 0) {
    var coeff = result[0];
    for (var i = 0; i < divisor.length; i++) {
      result[i] ^= GF.mul(divisor[i], coeff);
    }

    // remove all zeros from buffer head
    var offset = 0;
    while (offset < result.length && result[offset] === 0) offset++;
    result = result.slice(offset);
  }
  return result;
};

/**
 * Generate an irreducible generator polynomial of specified degree
 * (used by Reed-Solomon encoder)
 *
 * @param  {Number} degree Degree of the generator polynomial
 * @return {Uint8Array}    Buffer containing polynomial coefficients
 */
exports.generateECPolynomial = function generateECPolynomial(degree) {
  var poly = new Uint8Array([1]);
  for (var i = 0; i < degree; i++) {
    poly = exports.mul(poly, new Uint8Array([1, GF.exp(i)]));
  }
  return poly;
};
},{"./galois-field":"node_modules/@web3modal/ui/node_modules/qrcode/lib/core/galois-field.js"}],"node_modules/@web3modal/ui/node_modules/qrcode/lib/core/reed-solomon-encoder.js":[function(require,module,exports) {
var Polynomial = require('./polynomial');
function ReedSolomonEncoder(degree) {
  this.genPoly = undefined;
  this.degree = degree;
  if (this.degree) this.initialize(this.degree);
}

/**
 * Initialize the encoder.
 * The input param should correspond to the number of error correction codewords.
 *
 * @param  {Number} degree
 */
ReedSolomonEncoder.prototype.initialize = function initialize(degree) {
  // create an irreducible generator polynomial
  this.degree = degree;
  this.genPoly = Polynomial.generateECPolynomial(this.degree);
};

/**
 * Encodes a chunk of data
 *
 * @param  {Uint8Array} data Buffer containing input data
 * @return {Uint8Array}      Buffer containing encoded data
 */
ReedSolomonEncoder.prototype.encode = function encode(data) {
  if (!this.genPoly) {
    throw new Error('Encoder not initialized');
  }

  // Calculate EC for this data block
  // extends data size to data+genPoly size
  var paddedData = new Uint8Array(data.length + this.degree);
  paddedData.set(data);

  // The error correction codewords are the remainder after dividing the data codewords
  // by a generator polynomial
  var remainder = Polynomial.mod(paddedData, this.genPoly);

  // return EC data blocks (last n byte, where n is the degree of genPoly)
  // If coefficients number in remainder are less than genPoly degree,
  // pad with 0s to the left to reach the needed number of coefficients
  var start = this.degree - remainder.length;
  if (start > 0) {
    var buff = new Uint8Array(this.degree);
    buff.set(remainder, start);
    return buff;
  }
  return remainder;
};
module.exports = ReedSolomonEncoder;
},{"./polynomial":"node_modules/@web3modal/ui/node_modules/qrcode/lib/core/polynomial.js"}],"node_modules/@web3modal/ui/node_modules/qrcode/lib/core/version-check.js":[function(require,module,exports) {
/**
 * Check if QR Code version is valid
 *
 * @param  {Number}  version QR Code version
 * @return {Boolean}         true if valid version, false otherwise
 */
exports.isValid = function isValid(version) {
  return !isNaN(version) && version >= 1 && version <= 40;
};
},{}],"node_modules/@web3modal/ui/node_modules/qrcode/lib/core/regex.js":[function(require,module,exports) {
var numeric = '[0-9]+';
var alphanumeric = '[A-Z $%*+\\-./:]+';
var kanji = '(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|' + '[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|' + '[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|' + '[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+';
kanji = kanji.replace(/u/g, "\\u");
var byte = '(?:(?![A-Z0-9 $%*+\\-./:]|' + kanji + ')(?:.|[\r\n]))+';
exports.KANJI = new RegExp(kanji, 'g');
exports.BYTE_KANJI = new RegExp('[^A-Z0-9 $%*+\\-./:]+', 'g');
exports.BYTE = new RegExp(byte, 'g');
exports.NUMERIC = new RegExp(numeric, 'g');
exports.ALPHANUMERIC = new RegExp(alphanumeric, 'g');
var TEST_KANJI = new RegExp('^' + kanji + '$');
var TEST_NUMERIC = new RegExp('^' + numeric + '$');
var TEST_ALPHANUMERIC = new RegExp('^[A-Z0-9 $%*+\\-./:]+$');
exports.testKanji = function testKanji(str) {
  return TEST_KANJI.test(str);
};
exports.testNumeric = function testNumeric(str) {
  return TEST_NUMERIC.test(str);
};
exports.testAlphanumeric = function testAlphanumeric(str) {
  return TEST_ALPHANUMERIC.test(str);
};
},{}],"node_modules/@web3modal/ui/node_modules/qrcode/lib/core/mode.js":[function(require,module,exports) {
var VersionCheck = require('./version-check');
var Regex = require('./regex');

/**
 * Numeric mode encodes data from the decimal digit set (0 - 9)
 * (byte values 30HEX to 39HEX).
 * Normally, 3 data characters are represented by 10 bits.
 *
 * @type {Object}
 */
exports.NUMERIC = {
  id: 'Numeric',
  bit: 1 << 0,
  ccBits: [10, 12, 14]
};

/**
 * Alphanumeric mode encodes data from a set of 45 characters,
 * i.e. 10 numeric digits (0 - 9),
 *      26 alphabetic characters (A - Z),
 *   and 9 symbols (SP, $, %, *, +, -, ., /, :).
 * Normally, two input characters are represented by 11 bits.
 *
 * @type {Object}
 */
exports.ALPHANUMERIC = {
  id: 'Alphanumeric',
  bit: 1 << 1,
  ccBits: [9, 11, 13]
};

/**
 * In byte mode, data is encoded at 8 bits per character.
 *
 * @type {Object}
 */
exports.BYTE = {
  id: 'Byte',
  bit: 1 << 2,
  ccBits: [8, 16, 16]
};

/**
 * The Kanji mode efficiently encodes Kanji characters in accordance with
 * the Shift JIS system based on JIS X 0208.
 * The Shift JIS values are shifted from the JIS X 0208 values.
 * JIS X 0208 gives details of the shift coded representation.
 * Each two-byte character value is compacted to a 13-bit binary codeword.
 *
 * @type {Object}
 */
exports.KANJI = {
  id: 'Kanji',
  bit: 1 << 3,
  ccBits: [8, 10, 12]
};

/**
 * Mixed mode will contain a sequences of data in a combination of any of
 * the modes described above
 *
 * @type {Object}
 */
exports.MIXED = {
  bit: -1
};

/**
 * Returns the number of bits needed to store the data length
 * according to QR Code specifications.
 *
 * @param  {Mode}   mode    Data mode
 * @param  {Number} version QR Code version
 * @return {Number}         Number of bits
 */
exports.getCharCountIndicator = function getCharCountIndicator(mode, version) {
  if (!mode.ccBits) throw new Error('Invalid mode: ' + mode);
  if (!VersionCheck.isValid(version)) {
    throw new Error('Invalid version: ' + version);
  }
  if (version >= 1 && version < 10) return mode.ccBits[0];else if (version < 27) return mode.ccBits[1];
  return mode.ccBits[2];
};

/**
 * Returns the most efficient mode to store the specified data
 *
 * @param  {String} dataStr Input data string
 * @return {Mode}           Best mode
 */
exports.getBestModeForData = function getBestModeForData(dataStr) {
  if (Regex.testNumeric(dataStr)) return exports.NUMERIC;else if (Regex.testAlphanumeric(dataStr)) return exports.ALPHANUMERIC;else if (Regex.testKanji(dataStr)) return exports.KANJI;else return exports.BYTE;
};

/**
 * Return mode name as string
 *
 * @param {Mode} mode Mode object
 * @returns {String}  Mode name
 */
exports.toString = function toString(mode) {
  if (mode && mode.id) return mode.id;
  throw new Error('Invalid mode');
};

/**
 * Check if input param is a valid mode object
 *
 * @param   {Mode}    mode Mode object
 * @returns {Boolean} True if valid mode, false otherwise
 */
exports.isValid = function isValid(mode) {
  return mode && mode.bit && mode.ccBits;
};

/**
 * Get mode object from its name
 *
 * @param   {String} string Mode name
 * @returns {Mode}          Mode object
 */
function fromString(string) {
  if (typeof string !== 'string') {
    throw new Error('Param is not a string');
  }
  var lcStr = string.toLowerCase();
  switch (lcStr) {
    case 'numeric':
      return exports.NUMERIC;
    case 'alphanumeric':
      return exports.ALPHANUMERIC;
    case 'kanji':
      return exports.KANJI;
    case 'byte':
      return exports.BYTE;
    default:
      throw new Error('Unknown mode: ' + string);
  }
}

/**
 * Returns mode from a value.
 * If value is not a valid mode, returns defaultValue
 *
 * @param  {Mode|String} value        Encoding mode
 * @param  {Mode}        defaultValue Fallback value
 * @return {Mode}                     Encoding mode
 */
exports.from = function from(value, defaultValue) {
  if (exports.isValid(value)) {
    return value;
  }
  try {
    return fromString(value);
  } catch (e) {
    return defaultValue;
  }
};
},{"./version-check":"node_modules/@web3modal/ui/node_modules/qrcode/lib/core/version-check.js","./regex":"node_modules/@web3modal/ui/node_modules/qrcode/lib/core/regex.js"}],"node_modules/@web3modal/ui/node_modules/qrcode/lib/core/version.js":[function(require,module,exports) {
var Utils = require('./utils');
var ECCode = require('./error-correction-code');
var ECLevel = require('./error-correction-level');
var Mode = require('./mode');
var VersionCheck = require('./version-check');

// Generator polynomial used to encode version information
var G18 = 1 << 12 | 1 << 11 | 1 << 10 | 1 << 9 | 1 << 8 | 1 << 5 | 1 << 2 | 1 << 0;
var G18_BCH = Utils.getBCHDigit(G18);
function getBestVersionForDataLength(mode, length, errorCorrectionLevel) {
  for (var currentVersion = 1; currentVersion <= 40; currentVersion++) {
    if (length <= exports.getCapacity(currentVersion, errorCorrectionLevel, mode)) {
      return currentVersion;
    }
  }
  return undefined;
}
function getReservedBitsCount(mode, version) {
  // Character count indicator + mode indicator bits
  return Mode.getCharCountIndicator(mode, version) + 4;
}
function getTotalBitsFromDataArray(segments, version) {
  var totalBits = 0;
  segments.forEach(function (data) {
    var reservedBits = getReservedBitsCount(data.mode, version);
    totalBits += reservedBits + data.getBitsLength();
  });
  return totalBits;
}
function getBestVersionForMixedData(segments, errorCorrectionLevel) {
  for (var currentVersion = 1; currentVersion <= 40; currentVersion++) {
    var length = getTotalBitsFromDataArray(segments, currentVersion);
    if (length <= exports.getCapacity(currentVersion, errorCorrectionLevel, Mode.MIXED)) {
      return currentVersion;
    }
  }
  return undefined;
}

/**
 * Returns version number from a value.
 * If value is not a valid version, returns defaultValue
 *
 * @param  {Number|String} value        QR Code version
 * @param  {Number}        defaultValue Fallback value
 * @return {Number}                     QR Code version number
 */
exports.from = function from(value, defaultValue) {
  if (VersionCheck.isValid(value)) {
    return parseInt(value, 10);
  }
  return defaultValue;
};

/**
 * Returns how much data can be stored with the specified QR code version
 * and error correction level
 *
 * @param  {Number} version              QR Code version (1-40)
 * @param  {Number} errorCorrectionLevel Error correction level
 * @param  {Mode}   mode                 Data mode
 * @return {Number}                      Quantity of storable data
 */
exports.getCapacity = function getCapacity(version, errorCorrectionLevel, mode) {
  if (!VersionCheck.isValid(version)) {
    throw new Error('Invalid QR Code version');
  }

  // Use Byte mode as default
  if (typeof mode === 'undefined') mode = Mode.BYTE;

  // Total codewords for this QR code version (Data + Error correction)
  var totalCodewords = Utils.getSymbolTotalCodewords(version);

  // Total number of error correction codewords
  var ecTotalCodewords = ECCode.getTotalCodewordsCount(version, errorCorrectionLevel);

  // Total number of data codewords
  var dataTotalCodewordsBits = (totalCodewords - ecTotalCodewords) * 8;
  if (mode === Mode.MIXED) return dataTotalCodewordsBits;
  var usableBits = dataTotalCodewordsBits - getReservedBitsCount(mode, version);

  // Return max number of storable codewords
  switch (mode) {
    case Mode.NUMERIC:
      return Math.floor(usableBits / 10 * 3);
    case Mode.ALPHANUMERIC:
      return Math.floor(usableBits / 11 * 2);
    case Mode.KANJI:
      return Math.floor(usableBits / 13);
    case Mode.BYTE:
    default:
      return Math.floor(usableBits / 8);
  }
};

/**
 * Returns the minimum version needed to contain the amount of data
 *
 * @param  {Segment} data                    Segment of data
 * @param  {Number} [errorCorrectionLevel=H] Error correction level
 * @param  {Mode} mode                       Data mode
 * @return {Number}                          QR Code version
 */
exports.getBestVersionForData = function getBestVersionForData(data, errorCorrectionLevel) {
  var seg;
  var ecl = ECLevel.from(errorCorrectionLevel, ECLevel.M);
  if (Array.isArray(data)) {
    if (data.length > 1) {
      return getBestVersionForMixedData(data, ecl);
    }
    if (data.length === 0) {
      return 1;
    }
    seg = data[0];
  } else {
    seg = data;
  }
  return getBestVersionForDataLength(seg.mode, seg.getLength(), ecl);
};

/**
 * Returns version information with relative error correction bits
 *
 * The version information is included in QR Code symbols of version 7 or larger.
 * It consists of an 18-bit sequence containing 6 data bits,
 * with 12 error correction bits calculated using the (18, 6) Golay code.
 *
 * @param  {Number} version QR Code version
 * @return {Number}         Encoded version info bits
 */
exports.getEncodedBits = function getEncodedBits(version) {
  if (!VersionCheck.isValid(version) || version < 7) {
    throw new Error('Invalid QR Code version');
  }
  var d = version << 12;
  while (Utils.getBCHDigit(d) - G18_BCH >= 0) {
    d ^= G18 << Utils.getBCHDigit(d) - G18_BCH;
  }
  return version << 12 | d;
};
},{"./utils":"node_modules/@web3modal/ui/node_modules/qrcode/lib/core/utils.js","./error-correction-code":"node_modules/@web3modal/ui/node_modules/qrcode/lib/core/error-correction-code.js","./error-correction-level":"node_modules/@web3modal/ui/node_modules/qrcode/lib/core/error-correction-level.js","./mode":"node_modules/@web3modal/ui/node_modules/qrcode/lib/core/mode.js","./version-check":"node_modules/@web3modal/ui/node_modules/qrcode/lib/core/version-check.js"}],"node_modules/@web3modal/ui/node_modules/qrcode/lib/core/format-info.js":[function(require,module,exports) {
var Utils = require('./utils');
var G15 = 1 << 10 | 1 << 8 | 1 << 5 | 1 << 4 | 1 << 2 | 1 << 1 | 1 << 0;
var G15_MASK = 1 << 14 | 1 << 12 | 1 << 10 | 1 << 4 | 1 << 1;
var G15_BCH = Utils.getBCHDigit(G15);

/**
 * Returns format information with relative error correction bits
 *
 * The format information is a 15-bit sequence containing 5 data bits,
 * with 10 error correction bits calculated using the (15, 5) BCH code.
 *
 * @param  {Number} errorCorrectionLevel Error correction level
 * @param  {Number} mask                 Mask pattern
 * @return {Number}                      Encoded format information bits
 */
exports.getEncodedBits = function getEncodedBits(errorCorrectionLevel, mask) {
  var data = errorCorrectionLevel.bit << 3 | mask;
  var d = data << 10;
  while (Utils.getBCHDigit(d) - G15_BCH >= 0) {
    d ^= G15 << Utils.getBCHDigit(d) - G15_BCH;
  }

  // xor final data with mask pattern in order to ensure that
  // no combination of Error Correction Level and data mask pattern
  // will result in an all-zero data string
  return (data << 10 | d) ^ G15_MASK;
};
},{"./utils":"node_modules/@web3modal/ui/node_modules/qrcode/lib/core/utils.js"}],"node_modules/@web3modal/ui/node_modules/qrcode/lib/core/numeric-data.js":[function(require,module,exports) {
var Mode = require('./mode');
function NumericData(data) {
  this.mode = Mode.NUMERIC;
  this.data = data.toString();
}
NumericData.getBitsLength = function getBitsLength(length) {
  return 10 * Math.floor(length / 3) + (length % 3 ? length % 3 * 3 + 1 : 0);
};
NumericData.prototype.getLength = function getLength() {
  return this.data.length;
};
NumericData.prototype.getBitsLength = function getBitsLength() {
  return NumericData.getBitsLength(this.data.length);
};
NumericData.prototype.write = function write(bitBuffer) {
  var i, group, value;

  // The input data string is divided into groups of three digits,
  // and each group is converted to its 10-bit binary equivalent.
  for (i = 0; i + 3 <= this.data.length; i += 3) {
    group = this.data.substr(i, 3);
    value = parseInt(group, 10);
    bitBuffer.put(value, 10);
  }

  // If the number of input digits is not an exact multiple of three,
  // the final one or two digits are converted to 4 or 7 bits respectively.
  var remainingNum = this.data.length - i;
  if (remainingNum > 0) {
    group = this.data.substr(i);
    value = parseInt(group, 10);
    bitBuffer.put(value, remainingNum * 3 + 1);
  }
};
module.exports = NumericData;
},{"./mode":"node_modules/@web3modal/ui/node_modules/qrcode/lib/core/mode.js"}],"node_modules/@web3modal/ui/node_modules/qrcode/lib/core/alphanumeric-data.js":[function(require,module,exports) {
var Mode = require('./mode');

/**
 * Array of characters available in alphanumeric mode
 *
 * As per QR Code specification, to each character
 * is assigned a value from 0 to 44 which in this case coincides
 * with the array index
 *
 * @type {Array}
 */
var ALPHA_NUM_CHARS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', ' ', '$', '%', '*', '+', '-', '.', '/', ':'];
function AlphanumericData(data) {
  this.mode = Mode.ALPHANUMERIC;
  this.data = data;
}
AlphanumericData.getBitsLength = function getBitsLength(length) {
  return 11 * Math.floor(length / 2) + 6 * (length % 2);
};
AlphanumericData.prototype.getLength = function getLength() {
  return this.data.length;
};
AlphanumericData.prototype.getBitsLength = function getBitsLength() {
  return AlphanumericData.getBitsLength(this.data.length);
};
AlphanumericData.prototype.write = function write(bitBuffer) {
  var i;

  // Input data characters are divided into groups of two characters
  // and encoded as 11-bit binary codes.
  for (i = 0; i + 2 <= this.data.length; i += 2) {
    // The character value of the first character is multiplied by 45
    var value = ALPHA_NUM_CHARS.indexOf(this.data[i]) * 45;

    // The character value of the second digit is added to the product
    value += ALPHA_NUM_CHARS.indexOf(this.data[i + 1]);

    // The sum is then stored as 11-bit binary number
    bitBuffer.put(value, 11);
  }

  // If the number of input data characters is not a multiple of two,
  // the character value of the final character is encoded as a 6-bit binary number.
  if (this.data.length % 2) {
    bitBuffer.put(ALPHA_NUM_CHARS.indexOf(this.data[i]), 6);
  }
};
module.exports = AlphanumericData;
},{"./mode":"node_modules/@web3modal/ui/node_modules/qrcode/lib/core/mode.js"}],"node_modules/encode-utf8/index.js":[function(require,module,exports) {
'use strict'

module.exports = function encodeUtf8 (input) {
  var result = []
  var size = input.length

  for (var index = 0; index < size; index++) {
    var point = input.charCodeAt(index)

    if (point >= 0xD800 && point <= 0xDBFF && size > index + 1) {
      var second = input.charCodeAt(index + 1)

      if (second >= 0xDC00 && second <= 0xDFFF) {
        // https://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
        point = (point - 0xD800) * 0x400 + second - 0xDC00 + 0x10000
        index += 1
      }
    }

    // US-ASCII
    if (point < 0x80) {
      result.push(point)
      continue
    }

    // 2-byte UTF-8
    if (point < 0x800) {
      result.push((point >> 6) | 192)
      result.push((point & 63) | 128)
      continue
    }

    // 3-byte UTF-8
    if (point < 0xD800 || (point >= 0xE000 && point < 0x10000)) {
      result.push((point >> 12) | 224)
      result.push(((point >> 6) & 63) | 128)
      result.push((point & 63) | 128)
      continue
    }

    // 4-byte UTF-8
    if (point >= 0x10000 && point <= 0x10FFFF) {
      result.push((point >> 18) | 240)
      result.push(((point >> 12) & 63) | 128)
      result.push(((point >> 6) & 63) | 128)
      result.push((point & 63) | 128)
      continue
    }

    // Invalid character
    result.push(0xEF, 0xBF, 0xBD)
  }

  return new Uint8Array(result).buffer
}

},{}],"node_modules/@web3modal/ui/node_modules/qrcode/lib/core/byte-data.js":[function(require,module,exports) {
var encodeUtf8 = require('encode-utf8');
var Mode = require('./mode');
function ByteData(data) {
  this.mode = Mode.BYTE;
  if (typeof data === 'string') {
    data = encodeUtf8(data);
  }
  this.data = new Uint8Array(data);
}
ByteData.getBitsLength = function getBitsLength(length) {
  return length * 8;
};
ByteData.prototype.getLength = function getLength() {
  return this.data.length;
};
ByteData.prototype.getBitsLength = function getBitsLength() {
  return ByteData.getBitsLength(this.data.length);
};
ByteData.prototype.write = function (bitBuffer) {
  for (var i = 0, l = this.data.length; i < l; i++) {
    bitBuffer.put(this.data[i], 8);
  }
};
module.exports = ByteData;
},{"encode-utf8":"node_modules/encode-utf8/index.js","./mode":"node_modules/@web3modal/ui/node_modules/qrcode/lib/core/mode.js"}],"node_modules/@web3modal/ui/node_modules/qrcode/lib/core/kanji-data.js":[function(require,module,exports) {
var Mode = require('./mode');
var Utils = require('./utils');
function KanjiData(data) {
  this.mode = Mode.KANJI;
  this.data = data;
}
KanjiData.getBitsLength = function getBitsLength(length) {
  return length * 13;
};
KanjiData.prototype.getLength = function getLength() {
  return this.data.length;
};
KanjiData.prototype.getBitsLength = function getBitsLength() {
  return KanjiData.getBitsLength(this.data.length);
};
KanjiData.prototype.write = function (bitBuffer) {
  var i;

  // In the Shift JIS system, Kanji characters are represented by a two byte combination.
  // These byte values are shifted from the JIS X 0208 values.
  // JIS X 0208 gives details of the shift coded representation.
  for (i = 0; i < this.data.length; i++) {
    var value = Utils.toSJIS(this.data[i]);

    // For characters with Shift JIS values from 0x8140 to 0x9FFC:
    if (value >= 0x8140 && value <= 0x9FFC) {
      // Subtract 0x8140 from Shift JIS value
      value -= 0x8140;

      // For characters with Shift JIS values from 0xE040 to 0xEBBF
    } else if (value >= 0xE040 && value <= 0xEBBF) {
      // Subtract 0xC140 from Shift JIS value
      value -= 0xC140;
    } else {
      throw new Error('Invalid SJIS character: ' + this.data[i] + '\n' + 'Make sure your charset is UTF-8');
    }

    // Multiply most significant byte of result by 0xC0
    // and add least significant byte to product
    value = (value >>> 8 & 0xff) * 0xC0 + (value & 0xff);

    // Convert result to a 13-bit binary string
    bitBuffer.put(value, 13);
  }
};
module.exports = KanjiData;
},{"./mode":"node_modules/@web3modal/ui/node_modules/qrcode/lib/core/mode.js","./utils":"node_modules/@web3modal/ui/node_modules/qrcode/lib/core/utils.js"}],"node_modules/dijkstrajs/dijkstra.js":[function(require,module,exports) {
'use strict';

/******************************************************************************
 * Created 2008-08-19.
 *
 * Dijkstra path-finding functions. Adapted from the Dijkstar Python project.
 *
 * Copyright (C) 2008
 *   Wyatt Baldwin <self@wyattbaldwin.com>
 *   All rights reserved
 *
 * Licensed under the MIT license.
 *
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *****************************************************************************/
var dijkstra = {
  single_source_shortest_paths: function(graph, s, d) {
    // Predecessor map for each node that has been encountered.
    // node ID => predecessor node ID
    var predecessors = {};

    // Costs of shortest paths from s to all nodes encountered.
    // node ID => cost
    var costs = {};
    costs[s] = 0;

    // Costs of shortest paths from s to all nodes encountered; differs from
    // `costs` in that it provides easy access to the node that currently has
    // the known shortest path from s.
    // XXX: Do we actually need both `costs` and `open`?
    var open = dijkstra.PriorityQueue.make();
    open.push(s, 0);

    var closest,
        u, v,
        cost_of_s_to_u,
        adjacent_nodes,
        cost_of_e,
        cost_of_s_to_u_plus_cost_of_e,
        cost_of_s_to_v,
        first_visit;
    while (!open.empty()) {
      // In the nodes remaining in graph that have a known cost from s,
      // find the node, u, that currently has the shortest path from s.
      closest = open.pop();
      u = closest.value;
      cost_of_s_to_u = closest.cost;

      // Get nodes adjacent to u...
      adjacent_nodes = graph[u] || {};

      // ...and explore the edges that connect u to those nodes, updating
      // the cost of the shortest paths to any or all of those nodes as
      // necessary. v is the node across the current edge from u.
      for (v in adjacent_nodes) {
        if (adjacent_nodes.hasOwnProperty(v)) {
          // Get the cost of the edge running from u to v.
          cost_of_e = adjacent_nodes[v];

          // Cost of s to u plus the cost of u to v across e--this is *a*
          // cost from s to v that may or may not be less than the current
          // known cost to v.
          cost_of_s_to_u_plus_cost_of_e = cost_of_s_to_u + cost_of_e;

          // If we haven't visited v yet OR if the current known cost from s to
          // v is greater than the new cost we just found (cost of s to u plus
          // cost of u to v across e), update v's cost in the cost list and
          // update v's predecessor in the predecessor list (it's now u).
          cost_of_s_to_v = costs[v];
          first_visit = (typeof costs[v] === 'undefined');
          if (first_visit || cost_of_s_to_v > cost_of_s_to_u_plus_cost_of_e) {
            costs[v] = cost_of_s_to_u_plus_cost_of_e;
            open.push(v, cost_of_s_to_u_plus_cost_of_e);
            predecessors[v] = u;
          }
        }
      }
    }

    if (typeof d !== 'undefined' && typeof costs[d] === 'undefined') {
      var msg = ['Could not find a path from ', s, ' to ', d, '.'].join('');
      throw new Error(msg);
    }

    return predecessors;
  },

  extract_shortest_path_from_predecessor_list: function(predecessors, d) {
    var nodes = [];
    var u = d;
    var predecessor;
    while (u) {
      nodes.push(u);
      predecessor = predecessors[u];
      u = predecessors[u];
    }
    nodes.reverse();
    return nodes;
  },

  find_path: function(graph, s, d) {
    var predecessors = dijkstra.single_source_shortest_paths(graph, s, d);
    return dijkstra.extract_shortest_path_from_predecessor_list(
      predecessors, d);
  },

  /**
   * A very naive priority queue implementation.
   */
  PriorityQueue: {
    make: function (opts) {
      var T = dijkstra.PriorityQueue,
          t = {},
          key;
      opts = opts || {};
      for (key in T) {
        if (T.hasOwnProperty(key)) {
          t[key] = T[key];
        }
      }
      t.queue = [];
      t.sorter = opts.sorter || T.default_sorter;
      return t;
    },

    default_sorter: function (a, b) {
      return a.cost - b.cost;
    },

    /**
     * Add a new item to the queue and ensure the highest priority element
     * is at the front of the queue.
     */
    push: function (value, cost) {
      var item = {value: value, cost: cost};
      this.queue.push(item);
      this.queue.sort(this.sorter);
    },

    /**
     * Return the highest priority element in the queue.
     */
    pop: function () {
      return this.queue.shift();
    },

    empty: function () {
      return this.queue.length === 0;
    }
  }
};


// node.js module exports
if (typeof module !== 'undefined') {
  module.exports = dijkstra;
}

},{}],"node_modules/@web3modal/ui/node_modules/qrcode/lib/core/segments.js":[function(require,module,exports) {
var Mode = require('./mode');
var NumericData = require('./numeric-data');
var AlphanumericData = require('./alphanumeric-data');
var ByteData = require('./byte-data');
var KanjiData = require('./kanji-data');
var Regex = require('./regex');
var Utils = require('./utils');
var dijkstra = require('dijkstrajs');

/**
 * Returns UTF8 byte length
 *
 * @param  {String} str Input string
 * @return {Number}     Number of byte
 */
function getStringByteLength(str) {
  return unescape(encodeURIComponent(str)).length;
}

/**
 * Get a list of segments of the specified mode
 * from a string
 *
 * @param  {Mode}   mode Segment mode
 * @param  {String} str  String to process
 * @return {Array}       Array of object with segments data
 */
function getSegments(regex, mode, str) {
  var segments = [];
  var result;
  while ((result = regex.exec(str)) !== null) {
    segments.push({
      data: result[0],
      index: result.index,
      mode: mode,
      length: result[0].length
    });
  }
  return segments;
}

/**
 * Extracts a series of segments with the appropriate
 * modes from a string
 *
 * @param  {String} dataStr Input string
 * @return {Array}          Array of object with segments data
 */
function getSegmentsFromString(dataStr) {
  var numSegs = getSegments(Regex.NUMERIC, Mode.NUMERIC, dataStr);
  var alphaNumSegs = getSegments(Regex.ALPHANUMERIC, Mode.ALPHANUMERIC, dataStr);
  var byteSegs;
  var kanjiSegs;
  if (Utils.isKanjiModeEnabled()) {
    byteSegs = getSegments(Regex.BYTE, Mode.BYTE, dataStr);
    kanjiSegs = getSegments(Regex.KANJI, Mode.KANJI, dataStr);
  } else {
    byteSegs = getSegments(Regex.BYTE_KANJI, Mode.BYTE, dataStr);
    kanjiSegs = [];
  }
  var segs = numSegs.concat(alphaNumSegs, byteSegs, kanjiSegs);
  return segs.sort(function (s1, s2) {
    return s1.index - s2.index;
  }).map(function (obj) {
    return {
      data: obj.data,
      mode: obj.mode,
      length: obj.length
    };
  });
}

/**
 * Returns how many bits are needed to encode a string of
 * specified length with the specified mode
 *
 * @param  {Number} length String length
 * @param  {Mode} mode     Segment mode
 * @return {Number}        Bit length
 */
function getSegmentBitsLength(length, mode) {
  switch (mode) {
    case Mode.NUMERIC:
      return NumericData.getBitsLength(length);
    case Mode.ALPHANUMERIC:
      return AlphanumericData.getBitsLength(length);
    case Mode.KANJI:
      return KanjiData.getBitsLength(length);
    case Mode.BYTE:
      return ByteData.getBitsLength(length);
  }
}

/**
 * Merges adjacent segments which have the same mode
 *
 * @param  {Array} segs Array of object with segments data
 * @return {Array}      Array of object with segments data
 */
function mergeSegments(segs) {
  return segs.reduce(function (acc, curr) {
    var prevSeg = acc.length - 1 >= 0 ? acc[acc.length - 1] : null;
    if (prevSeg && prevSeg.mode === curr.mode) {
      acc[acc.length - 1].data += curr.data;
      return acc;
    }
    acc.push(curr);
    return acc;
  }, []);
}

/**
 * Generates a list of all possible nodes combination which
 * will be used to build a segments graph.
 *
 * Nodes are divided by groups. Each group will contain a list of all the modes
 * in which is possible to encode the given text.
 *
 * For example the text '12345' can be encoded as Numeric, Alphanumeric or Byte.
 * The group for '12345' will contain then 3 objects, one for each
 * possible encoding mode.
 *
 * Each node represents a possible segment.
 *
 * @param  {Array} segs Array of object with segments data
 * @return {Array}      Array of object with segments data
 */
function buildNodes(segs) {
  var nodes = [];
  for (var i = 0; i < segs.length; i++) {
    var seg = segs[i];
    switch (seg.mode) {
      case Mode.NUMERIC:
        nodes.push([seg, {
          data: seg.data,
          mode: Mode.ALPHANUMERIC,
          length: seg.length
        }, {
          data: seg.data,
          mode: Mode.BYTE,
          length: seg.length
        }]);
        break;
      case Mode.ALPHANUMERIC:
        nodes.push([seg, {
          data: seg.data,
          mode: Mode.BYTE,
          length: seg.length
        }]);
        break;
      case Mode.KANJI:
        nodes.push([seg, {
          data: seg.data,
          mode: Mode.BYTE,
          length: getStringByteLength(seg.data)
        }]);
        break;
      case Mode.BYTE:
        nodes.push([{
          data: seg.data,
          mode: Mode.BYTE,
          length: getStringByteLength(seg.data)
        }]);
    }
  }
  return nodes;
}

/**
 * Builds a graph from a list of nodes.
 * All segments in each node group will be connected with all the segments of
 * the next group and so on.
 *
 * At each connection will be assigned a weight depending on the
 * segment's byte length.
 *
 * @param  {Array} nodes    Array of object with segments data
 * @param  {Number} version QR Code version
 * @return {Object}         Graph of all possible segments
 */
function buildGraph(nodes, version) {
  var table = {};
  var graph = {
    start: {}
  };
  var prevNodeIds = ['start'];
  for (var i = 0; i < nodes.length; i++) {
    var nodeGroup = nodes[i];
    var currentNodeIds = [];
    for (var j = 0; j < nodeGroup.length; j++) {
      var node = nodeGroup[j];
      var key = '' + i + j;
      currentNodeIds.push(key);
      table[key] = {
        node: node,
        lastCount: 0
      };
      graph[key] = {};
      for (var n = 0; n < prevNodeIds.length; n++) {
        var prevNodeId = prevNodeIds[n];
        if (table[prevNodeId] && table[prevNodeId].node.mode === node.mode) {
          graph[prevNodeId][key] = getSegmentBitsLength(table[prevNodeId].lastCount + node.length, node.mode) - getSegmentBitsLength(table[prevNodeId].lastCount, node.mode);
          table[prevNodeId].lastCount += node.length;
        } else {
          if (table[prevNodeId]) table[prevNodeId].lastCount = node.length;
          graph[prevNodeId][key] = getSegmentBitsLength(node.length, node.mode) + 4 + Mode.getCharCountIndicator(node.mode, version); // switch cost
        }
      }
    }

    prevNodeIds = currentNodeIds;
  }
  for (var _n = 0; _n < prevNodeIds.length; _n++) {
    graph[prevNodeIds[_n]].end = 0;
  }
  return {
    map: graph,
    table: table
  };
}

/**
 * Builds a segment from a specified data and mode.
 * If a mode is not specified, the more suitable will be used.
 *
 * @param  {String} data             Input data
 * @param  {Mode | String} modesHint Data mode
 * @return {Segment}                 Segment
 */
function buildSingleSegment(data, modesHint) {
  var mode;
  var bestMode = Mode.getBestModeForData(data);
  mode = Mode.from(modesHint, bestMode);

  // Make sure data can be encoded
  if (mode !== Mode.BYTE && mode.bit < bestMode.bit) {
    throw new Error('"' + data + '"' + ' cannot be encoded with mode ' + Mode.toString(mode) + '.\n Suggested mode is: ' + Mode.toString(bestMode));
  }

  // Use Mode.BYTE if Kanji support is disabled
  if (mode === Mode.KANJI && !Utils.isKanjiModeEnabled()) {
    mode = Mode.BYTE;
  }
  switch (mode) {
    case Mode.NUMERIC:
      return new NumericData(data);
    case Mode.ALPHANUMERIC:
      return new AlphanumericData(data);
    case Mode.KANJI:
      return new KanjiData(data);
    case Mode.BYTE:
      return new ByteData(data);
  }
}

/**
 * Builds a list of segments from an array.
 * Array can contain Strings or Objects with segment's info.
 *
 * For each item which is a string, will be generated a segment with the given
 * string and the more appropriate encoding mode.
 *
 * For each item which is an object, will be generated a segment with the given
 * data and mode.
 * Objects must contain at least the property "data".
 * If property "mode" is not present, the more suitable mode will be used.
 *
 * @param  {Array} array Array of objects with segments data
 * @return {Array}       Array of Segments
 */
exports.fromArray = function fromArray(array) {
  return array.reduce(function (acc, seg) {
    if (typeof seg === 'string') {
      acc.push(buildSingleSegment(seg, null));
    } else if (seg.data) {
      acc.push(buildSingleSegment(seg.data, seg.mode));
    }
    return acc;
  }, []);
};

/**
 * Builds an optimized sequence of segments from a string,
 * which will produce the shortest possible bitstream.
 *
 * @param  {String} data    Input string
 * @param  {Number} version QR Code version
 * @return {Array}          Array of segments
 */
exports.fromString = function fromString(data, version) {
  var segs = getSegmentsFromString(data, Utils.isKanjiModeEnabled());
  var nodes = buildNodes(segs);
  var graph = buildGraph(nodes, version);
  var path = dijkstra.find_path(graph.map, 'start', 'end');
  var optimizedSegs = [];
  for (var i = 1; i < path.length - 1; i++) {
    optimizedSegs.push(graph.table[path[i]].node);
  }
  return exports.fromArray(mergeSegments(optimizedSegs));
};

/**
 * Splits a string in various segments with the modes which
 * best represent their content.
 * The produced segments are far from being optimized.
 * The output of this function is only used to estimate a QR Code version
 * which may contain the data.
 *
 * @param  {string} data Input string
 * @return {Array}       Array of segments
 */
exports.rawSplit = function rawSplit(data) {
  return exports.fromArray(getSegmentsFromString(data, Utils.isKanjiModeEnabled()));
};
},{"./mode":"node_modules/@web3modal/ui/node_modules/qrcode/lib/core/mode.js","./numeric-data":"node_modules/@web3modal/ui/node_modules/qrcode/lib/core/numeric-data.js","./alphanumeric-data":"node_modules/@web3modal/ui/node_modules/qrcode/lib/core/alphanumeric-data.js","./byte-data":"node_modules/@web3modal/ui/node_modules/qrcode/lib/core/byte-data.js","./kanji-data":"node_modules/@web3modal/ui/node_modules/qrcode/lib/core/kanji-data.js","./regex":"node_modules/@web3modal/ui/node_modules/qrcode/lib/core/regex.js","./utils":"node_modules/@web3modal/ui/node_modules/qrcode/lib/core/utils.js","dijkstrajs":"node_modules/dijkstrajs/dijkstra.js"}],"node_modules/@web3modal/ui/node_modules/qrcode/lib/core/qrcode.js":[function(require,module,exports) {
var Utils = require('./utils');
var ECLevel = require('./error-correction-level');
var BitBuffer = require('./bit-buffer');
var BitMatrix = require('./bit-matrix');
var AlignmentPattern = require('./alignment-pattern');
var FinderPattern = require('./finder-pattern');
var MaskPattern = require('./mask-pattern');
var ECCode = require('./error-correction-code');
var ReedSolomonEncoder = require('./reed-solomon-encoder');
var Version = require('./version');
var FormatInfo = require('./format-info');
var Mode = require('./mode');
var Segments = require('./segments');

/**
 * QRCode for JavaScript
 *
 * modified by Ryan Day for nodejs support
 * Copyright (c) 2011 Ryan Day
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
//---------------------------------------------------------------------
// QRCode for JavaScript
//
// Copyright (c) 2009 Kazuhiko Arase
//
// URL: http://www.d-project.com/
//
// Licensed under the MIT license:
//   http://www.opensource.org/licenses/mit-license.php
//
// The word "QR Code" is registered trademark of
// DENSO WAVE INCORPORATED
//   http://www.denso-wave.com/qrcode/faqpatent-e.html
//
//---------------------------------------------------------------------
*/

/**
 * Add finder patterns bits to matrix
 *
 * @param  {BitMatrix} matrix  Modules matrix
 * @param  {Number}    version QR Code version
 */
function setupFinderPattern(matrix, version) {
  var size = matrix.size;
  var pos = FinderPattern.getPositions(version);
  for (var i = 0; i < pos.length; i++) {
    var row = pos[i][0];
    var col = pos[i][1];
    for (var r = -1; r <= 7; r++) {
      if (row + r <= -1 || size <= row + r) continue;
      for (var c = -1; c <= 7; c++) {
        if (col + c <= -1 || size <= col + c) continue;
        if (r >= 0 && r <= 6 && (c === 0 || c === 6) || c >= 0 && c <= 6 && (r === 0 || r === 6) || r >= 2 && r <= 4 && c >= 2 && c <= 4) {
          matrix.set(row + r, col + c, true, true);
        } else {
          matrix.set(row + r, col + c, false, true);
        }
      }
    }
  }
}

/**
 * Add timing pattern bits to matrix
 *
 * Note: this function must be called before {@link setupAlignmentPattern}
 *
 * @param  {BitMatrix} matrix Modules matrix
 */
function setupTimingPattern(matrix) {
  var size = matrix.size;
  for (var r = 8; r < size - 8; r++) {
    var value = r % 2 === 0;
    matrix.set(r, 6, value, true);
    matrix.set(6, r, value, true);
  }
}

/**
 * Add alignment patterns bits to matrix
 *
 * Note: this function must be called after {@link setupTimingPattern}
 *
 * @param  {BitMatrix} matrix  Modules matrix
 * @param  {Number}    version QR Code version
 */
function setupAlignmentPattern(matrix, version) {
  var pos = AlignmentPattern.getPositions(version);
  for (var i = 0; i < pos.length; i++) {
    var row = pos[i][0];
    var col = pos[i][1];
    for (var r = -2; r <= 2; r++) {
      for (var c = -2; c <= 2; c++) {
        if (r === -2 || r === 2 || c === -2 || c === 2 || r === 0 && c === 0) {
          matrix.set(row + r, col + c, true, true);
        } else {
          matrix.set(row + r, col + c, false, true);
        }
      }
    }
  }
}

/**
 * Add version info bits to matrix
 *
 * @param  {BitMatrix} matrix  Modules matrix
 * @param  {Number}    version QR Code version
 */
function setupVersionInfo(matrix, version) {
  var size = matrix.size;
  var bits = Version.getEncodedBits(version);
  var row, col, mod;
  for (var i = 0; i < 18; i++) {
    row = Math.floor(i / 3);
    col = i % 3 + size - 8 - 3;
    mod = (bits >> i & 1) === 1;
    matrix.set(row, col, mod, true);
    matrix.set(col, row, mod, true);
  }
}

/**
 * Add format info bits to matrix
 *
 * @param  {BitMatrix} matrix               Modules matrix
 * @param  {ErrorCorrectionLevel}    errorCorrectionLevel Error correction level
 * @param  {Number}    maskPattern          Mask pattern reference value
 */
function setupFormatInfo(matrix, errorCorrectionLevel, maskPattern) {
  var size = matrix.size;
  var bits = FormatInfo.getEncodedBits(errorCorrectionLevel, maskPattern);
  var i, mod;
  for (i = 0; i < 15; i++) {
    mod = (bits >> i & 1) === 1;

    // vertical
    if (i < 6) {
      matrix.set(i, 8, mod, true);
    } else if (i < 8) {
      matrix.set(i + 1, 8, mod, true);
    } else {
      matrix.set(size - 15 + i, 8, mod, true);
    }

    // horizontal
    if (i < 8) {
      matrix.set(8, size - i - 1, mod, true);
    } else if (i < 9) {
      matrix.set(8, 15 - i - 1 + 1, mod, true);
    } else {
      matrix.set(8, 15 - i - 1, mod, true);
    }
  }

  // fixed module
  matrix.set(size - 8, 8, 1, true);
}

/**
 * Add encoded data bits to matrix
 *
 * @param  {BitMatrix}  matrix Modules matrix
 * @param  {Uint8Array} data   Data codewords
 */
function setupData(matrix, data) {
  var size = matrix.size;
  var inc = -1;
  var row = size - 1;
  var bitIndex = 7;
  var byteIndex = 0;
  for (var col = size - 1; col > 0; col -= 2) {
    if (col === 6) col--;
    while (true) {
      for (var c = 0; c < 2; c++) {
        if (!matrix.isReserved(row, col - c)) {
          var dark = false;
          if (byteIndex < data.length) {
            dark = (data[byteIndex] >>> bitIndex & 1) === 1;
          }
          matrix.set(row, col - c, dark);
          bitIndex--;
          if (bitIndex === -1) {
            byteIndex++;
            bitIndex = 7;
          }
        }
      }
      row += inc;
      if (row < 0 || size <= row) {
        row -= inc;
        inc = -inc;
        break;
      }
    }
  }
}

/**
 * Create encoded codewords from data input
 *
 * @param  {Number}   version              QR Code version
 * @param  {ErrorCorrectionLevel}   errorCorrectionLevel Error correction level
 * @param  {ByteData} data                 Data input
 * @return {Uint8Array}                    Buffer containing encoded codewords
 */
function createData(version, errorCorrectionLevel, segments) {
  // Prepare data buffer
  var buffer = new BitBuffer();
  segments.forEach(function (data) {
    // prefix data with mode indicator (4 bits)
    buffer.put(data.mode.bit, 4);

    // Prefix data with character count indicator.
    // The character count indicator is a string of bits that represents the
    // number of characters that are being encoded.
    // The character count indicator must be placed after the mode indicator
    // and must be a certain number of bits long, depending on the QR version
    // and data mode
    // @see {@link Mode.getCharCountIndicator}.
    buffer.put(data.getLength(), Mode.getCharCountIndicator(data.mode, version));

    // add binary data sequence to buffer
    data.write(buffer);
  });

  // Calculate required number of bits
  var totalCodewords = Utils.getSymbolTotalCodewords(version);
  var ecTotalCodewords = ECCode.getTotalCodewordsCount(version, errorCorrectionLevel);
  var dataTotalCodewordsBits = (totalCodewords - ecTotalCodewords) * 8;

  // Add a terminator.
  // If the bit string is shorter than the total number of required bits,
  // a terminator of up to four 0s must be added to the right side of the string.
  // If the bit string is more than four bits shorter than the required number of bits,
  // add four 0s to the end.
  if (buffer.getLengthInBits() + 4 <= dataTotalCodewordsBits) {
    buffer.put(0, 4);
  }

  // If the bit string is fewer than four bits shorter, add only the number of 0s that
  // are needed to reach the required number of bits.

  // After adding the terminator, if the number of bits in the string is not a multiple of 8,
  // pad the string on the right with 0s to make the string's length a multiple of 8.
  while (buffer.getLengthInBits() % 8 !== 0) {
    buffer.putBit(0);
  }

  // Add pad bytes if the string is still shorter than the total number of required bits.
  // Extend the buffer to fill the data capacity of the symbol corresponding to
  // the Version and Error Correction Level by adding the Pad Codewords 11101100 (0xEC)
  // and 00010001 (0x11) alternately.
  var remainingByte = (dataTotalCodewordsBits - buffer.getLengthInBits()) / 8;
  for (var i = 0; i < remainingByte; i++) {
    buffer.put(i % 2 ? 0x11 : 0xEC, 8);
  }
  return createCodewords(buffer, version, errorCorrectionLevel);
}

/**
 * Encode input data with Reed-Solomon and return codewords with
 * relative error correction bits
 *
 * @param  {BitBuffer} bitBuffer            Data to encode
 * @param  {Number}    version              QR Code version
 * @param  {ErrorCorrectionLevel} errorCorrectionLevel Error correction level
 * @return {Uint8Array}                     Buffer containing encoded codewords
 */
function createCodewords(bitBuffer, version, errorCorrectionLevel) {
  // Total codewords for this QR code version (Data + Error correction)
  var totalCodewords = Utils.getSymbolTotalCodewords(version);

  // Total number of error correction codewords
  var ecTotalCodewords = ECCode.getTotalCodewordsCount(version, errorCorrectionLevel);

  // Total number of data codewords
  var dataTotalCodewords = totalCodewords - ecTotalCodewords;

  // Total number of blocks
  var ecTotalBlocks = ECCode.getBlocksCount(version, errorCorrectionLevel);

  // Calculate how many blocks each group should contain
  var blocksInGroup2 = totalCodewords % ecTotalBlocks;
  var blocksInGroup1 = ecTotalBlocks - blocksInGroup2;
  var totalCodewordsInGroup1 = Math.floor(totalCodewords / ecTotalBlocks);
  var dataCodewordsInGroup1 = Math.floor(dataTotalCodewords / ecTotalBlocks);
  var dataCodewordsInGroup2 = dataCodewordsInGroup1 + 1;

  // Number of EC codewords is the same for both groups
  var ecCount = totalCodewordsInGroup1 - dataCodewordsInGroup1;

  // Initialize a Reed-Solomon encoder with a generator polynomial of degree ecCount
  var rs = new ReedSolomonEncoder(ecCount);
  var offset = 0;
  var dcData = new Array(ecTotalBlocks);
  var ecData = new Array(ecTotalBlocks);
  var maxDataSize = 0;
  var buffer = new Uint8Array(bitBuffer.buffer);

  // Divide the buffer into the required number of blocks
  for (var b = 0; b < ecTotalBlocks; b++) {
    var dataSize = b < blocksInGroup1 ? dataCodewordsInGroup1 : dataCodewordsInGroup2;

    // extract a block of data from buffer
    dcData[b] = buffer.slice(offset, offset + dataSize);

    // Calculate EC codewords for this data block
    ecData[b] = rs.encode(dcData[b]);
    offset += dataSize;
    maxDataSize = Math.max(maxDataSize, dataSize);
  }

  // Create final data
  // Interleave the data and error correction codewords from each block
  var data = new Uint8Array(totalCodewords);
  var index = 0;
  var i, r;

  // Add data codewords
  for (i = 0; i < maxDataSize; i++) {
    for (r = 0; r < ecTotalBlocks; r++) {
      if (i < dcData[r].length) {
        data[index++] = dcData[r][i];
      }
    }
  }

  // Apped EC codewords
  for (i = 0; i < ecCount; i++) {
    for (r = 0; r < ecTotalBlocks; r++) {
      data[index++] = ecData[r][i];
    }
  }
  return data;
}

/**
 * Build QR Code symbol
 *
 * @param  {String} data                 Input string
 * @param  {Number} version              QR Code version
 * @param  {ErrorCorretionLevel} errorCorrectionLevel Error level
 * @param  {MaskPattern} maskPattern     Mask pattern
 * @return {Object}                      Object containing symbol data
 */
function createSymbol(data, version, errorCorrectionLevel, maskPattern) {
  var segments;
  if (Array.isArray(data)) {
    segments = Segments.fromArray(data);
  } else if (typeof data === 'string') {
    var estimatedVersion = version;
    if (!estimatedVersion) {
      var rawSegments = Segments.rawSplit(data);

      // Estimate best version that can contain raw splitted segments
      estimatedVersion = Version.getBestVersionForData(rawSegments, errorCorrectionLevel);
    }

    // Build optimized segments
    // If estimated version is undefined, try with the highest version
    segments = Segments.fromString(data, estimatedVersion || 40);
  } else {
    throw new Error('Invalid data');
  }

  // Get the min version that can contain data
  var bestVersion = Version.getBestVersionForData(segments, errorCorrectionLevel);

  // If no version is found, data cannot be stored
  if (!bestVersion) {
    throw new Error('The amount of data is too big to be stored in a QR Code');
  }

  // If not specified, use min version as default
  if (!version) {
    version = bestVersion;

    // Check if the specified version can contain the data
  } else if (version < bestVersion) {
    throw new Error('\n' + 'The chosen QR Code version cannot contain this amount of data.\n' + 'Minimum version required to store current data is: ' + bestVersion + '.\n');
  }
  var dataBits = createData(version, errorCorrectionLevel, segments);

  // Allocate matrix buffer
  var moduleCount = Utils.getSymbolSize(version);
  var modules = new BitMatrix(moduleCount);

  // Add function modules
  setupFinderPattern(modules, version);
  setupTimingPattern(modules);
  setupAlignmentPattern(modules, version);

  // Add temporary dummy bits for format info just to set them as reserved.
  // This is needed to prevent these bits from being masked by {@link MaskPattern.applyMask}
  // since the masking operation must be performed only on the encoding region.
  // These blocks will be replaced with correct values later in code.
  setupFormatInfo(modules, errorCorrectionLevel, 0);
  if (version >= 7) {
    setupVersionInfo(modules, version);
  }

  // Add data codewords
  setupData(modules, dataBits);
  if (isNaN(maskPattern)) {
    // Find best mask pattern
    maskPattern = MaskPattern.getBestMask(modules, setupFormatInfo.bind(null, modules, errorCorrectionLevel));
  }

  // Apply mask pattern
  MaskPattern.applyMask(maskPattern, modules);

  // Replace format info bits with correct values
  setupFormatInfo(modules, errorCorrectionLevel, maskPattern);
  return {
    modules: modules,
    version: version,
    errorCorrectionLevel: errorCorrectionLevel,
    maskPattern: maskPattern,
    segments: segments
  };
}

/**
 * QR Code
 *
 * @param {String | Array} data                 Input data
 * @param {Object} options                      Optional configurations
 * @param {Number} options.version              QR Code version
 * @param {String} options.errorCorrectionLevel Error correction level
 * @param {Function} options.toSJISFunc         Helper func to convert utf8 to sjis
 */
exports.create = function create(data, options) {
  if (typeof data === 'undefined' || data === '') {
    throw new Error('No input text');
  }
  var errorCorrectionLevel = ECLevel.M;
  var version;
  var mask;
  if (typeof options !== 'undefined') {
    // Use higher error correction level as default
    errorCorrectionLevel = ECLevel.from(options.errorCorrectionLevel, ECLevel.M);
    version = Version.from(options.version);
    mask = MaskPattern.from(options.maskPattern);
    if (options.toSJISFunc) {
      Utils.setToSJISFunction(options.toSJISFunc);
    }
  }
  return createSymbol(data, version, errorCorrectionLevel, mask);
};
},{"./utils":"node_modules/@web3modal/ui/node_modules/qrcode/lib/core/utils.js","./error-correction-level":"node_modules/@web3modal/ui/node_modules/qrcode/lib/core/error-correction-level.js","./bit-buffer":"node_modules/@web3modal/ui/node_modules/qrcode/lib/core/bit-buffer.js","./bit-matrix":"node_modules/@web3modal/ui/node_modules/qrcode/lib/core/bit-matrix.js","./alignment-pattern":"node_modules/@web3modal/ui/node_modules/qrcode/lib/core/alignment-pattern.js","./finder-pattern":"node_modules/@web3modal/ui/node_modules/qrcode/lib/core/finder-pattern.js","./mask-pattern":"node_modules/@web3modal/ui/node_modules/qrcode/lib/core/mask-pattern.js","./error-correction-code":"node_modules/@web3modal/ui/node_modules/qrcode/lib/core/error-correction-code.js","./reed-solomon-encoder":"node_modules/@web3modal/ui/node_modules/qrcode/lib/core/reed-solomon-encoder.js","./version":"node_modules/@web3modal/ui/node_modules/qrcode/lib/core/version.js","./format-info":"node_modules/@web3modal/ui/node_modules/qrcode/lib/core/format-info.js","./mode":"node_modules/@web3modal/ui/node_modules/qrcode/lib/core/mode.js","./segments":"node_modules/@web3modal/ui/node_modules/qrcode/lib/core/segments.js"}],"node_modules/@web3modal/ui/node_modules/qrcode/lib/renderer/utils.js":[function(require,module,exports) {
function hex2rgba(hex) {
  if (typeof hex === 'number') {
    hex = hex.toString();
  }
  if (typeof hex !== 'string') {
    throw new Error('Color should be defined as hex string');
  }
  var hexCode = hex.slice().replace('#', '').split('');
  if (hexCode.length < 3 || hexCode.length === 5 || hexCode.length > 8) {
    throw new Error('Invalid hex color: ' + hex);
  }

  // Convert from short to long form (fff -> ffffff)
  if (hexCode.length === 3 || hexCode.length === 4) {
    hexCode = Array.prototype.concat.apply([], hexCode.map(function (c) {
      return [c, c];
    }));
  }

  // Add default alpha value
  if (hexCode.length === 6) hexCode.push('F', 'F');
  var hexValue = parseInt(hexCode.join(''), 16);
  return {
    r: hexValue >> 24 & 255,
    g: hexValue >> 16 & 255,
    b: hexValue >> 8 & 255,
    a: hexValue & 255,
    hex: '#' + hexCode.slice(0, 6).join('')
  };
}
exports.getOptions = function getOptions(options) {
  if (!options) options = {};
  if (!options.color) options.color = {};
  var margin = typeof options.margin === 'undefined' || options.margin === null || options.margin < 0 ? 4 : options.margin;
  var width = options.width && options.width >= 21 ? options.width : undefined;
  var scale = options.scale || 4;
  return {
    width: width,
    scale: width ? 4 : scale,
    margin: margin,
    color: {
      dark: hex2rgba(options.color.dark || '#000000ff'),
      light: hex2rgba(options.color.light || '#ffffffff')
    },
    type: options.type,
    rendererOpts: options.rendererOpts || {}
  };
};
exports.getScale = function getScale(qrSize, opts) {
  return opts.width && opts.width >= qrSize + opts.margin * 2 ? opts.width / (qrSize + opts.margin * 2) : opts.scale;
};
exports.getImageWidth = function getImageWidth(qrSize, opts) {
  var scale = exports.getScale(qrSize, opts);
  return Math.floor((qrSize + opts.margin * 2) * scale);
};
exports.qrToImageData = function qrToImageData(imgData, qr, opts) {
  var size = qr.modules.size;
  var data = qr.modules.data;
  var scale = exports.getScale(size, opts);
  var symbolSize = Math.floor((size + opts.margin * 2) * scale);
  var scaledMargin = opts.margin * scale;
  var palette = [opts.color.light, opts.color.dark];
  for (var i = 0; i < symbolSize; i++) {
    for (var j = 0; j < symbolSize; j++) {
      var posDst = (i * symbolSize + j) * 4;
      var pxColor = opts.color.light;
      if (i >= scaledMargin && j >= scaledMargin && i < symbolSize - scaledMargin && j < symbolSize - scaledMargin) {
        var iSrc = Math.floor((i - scaledMargin) / scale);
        var jSrc = Math.floor((j - scaledMargin) / scale);
        pxColor = palette[data[iSrc * size + jSrc] ? 1 : 0];
      }
      imgData[posDst++] = pxColor.r;
      imgData[posDst++] = pxColor.g;
      imgData[posDst++] = pxColor.b;
      imgData[posDst] = pxColor.a;
    }
  }
};
},{}],"node_modules/@web3modal/ui/node_modules/qrcode/lib/renderer/canvas.js":[function(require,module,exports) {
var Utils = require('./utils');
function clearCanvas(ctx, canvas, size) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (!canvas.style) canvas.style = {};
  canvas.height = size;
  canvas.width = size;
  canvas.style.height = size + 'px';
  canvas.style.width = size + 'px';
}
function getCanvasElement() {
  try {
    return document.createElement('canvas');
  } catch (e) {
    throw new Error('You need to specify a canvas element');
  }
}
exports.render = function render(qrData, canvas, options) {
  var opts = options;
  var canvasEl = canvas;
  if (typeof opts === 'undefined' && (!canvas || !canvas.getContext)) {
    opts = canvas;
    canvas = undefined;
  }
  if (!canvas) {
    canvasEl = getCanvasElement();
  }
  opts = Utils.getOptions(opts);
  var size = Utils.getImageWidth(qrData.modules.size, opts);
  var ctx = canvasEl.getContext('2d');
  var image = ctx.createImageData(size, size);
  Utils.qrToImageData(image.data, qrData, opts);
  clearCanvas(ctx, canvasEl, size);
  ctx.putImageData(image, 0, 0);
  return canvasEl;
};
exports.renderToDataURL = function renderToDataURL(qrData, canvas, options) {
  var opts = options;
  if (typeof opts === 'undefined' && (!canvas || !canvas.getContext)) {
    opts = canvas;
    canvas = undefined;
  }
  if (!opts) opts = {};
  var canvasEl = exports.render(qrData, canvas, opts);
  var type = opts.type || 'image/png';
  var rendererOpts = opts.rendererOpts || {};
  return canvasEl.toDataURL(type, rendererOpts.quality);
};
},{"./utils":"node_modules/@web3modal/ui/node_modules/qrcode/lib/renderer/utils.js"}],"node_modules/@web3modal/ui/node_modules/qrcode/lib/renderer/svg-tag.js":[function(require,module,exports) {
var Utils = require('./utils');
function getColorAttrib(color, attrib) {
  var alpha = color.a / 255;
  var str = attrib + '="' + color.hex + '"';
  return alpha < 1 ? str + ' ' + attrib + '-opacity="' + alpha.toFixed(2).slice(1) + '"' : str;
}
function svgCmd(cmd, x, y) {
  var str = cmd + x;
  if (typeof y !== 'undefined') str += ' ' + y;
  return str;
}
function qrToPath(data, size, margin) {
  var path = '';
  var moveBy = 0;
  var newRow = false;
  var lineLength = 0;
  for (var i = 0; i < data.length; i++) {
    var col = Math.floor(i % size);
    var row = Math.floor(i / size);
    if (!col && !newRow) newRow = true;
    if (data[i]) {
      lineLength++;
      if (!(i > 0 && col > 0 && data[i - 1])) {
        path += newRow ? svgCmd('M', col + margin, 0.5 + row + margin) : svgCmd('m', moveBy, 0);
        moveBy = 0;
        newRow = false;
      }
      if (!(col + 1 < size && data[i + 1])) {
        path += svgCmd('h', lineLength);
        lineLength = 0;
      }
    } else {
      moveBy++;
    }
  }
  return path;
}
exports.render = function render(qrData, options, cb) {
  var opts = Utils.getOptions(options);
  var size = qrData.modules.size;
  var data = qrData.modules.data;
  var qrcodesize = size + opts.margin * 2;
  var bg = !opts.color.light.a ? '' : '<path ' + getColorAttrib(opts.color.light, 'fill') + ' d="M0 0h' + qrcodesize + 'v' + qrcodesize + 'H0z"/>';
  var path = '<path ' + getColorAttrib(opts.color.dark, 'stroke') + ' d="' + qrToPath(data, size, opts.margin) + '"/>';
  var viewBox = 'viewBox="' + '0 0 ' + qrcodesize + ' ' + qrcodesize + '"';
  var width = !opts.width ? '' : 'width="' + opts.width + '" height="' + opts.width + '" ';
  var svgTag = '<svg xmlns="http://www.w3.org/2000/svg" ' + width + viewBox + ' shape-rendering="crispEdges">' + bg + path + '</svg>\n';
  if (typeof cb === 'function') {
    cb(null, svgTag);
  }
  return svgTag;
};
},{"./utils":"node_modules/@web3modal/ui/node_modules/qrcode/lib/renderer/utils.js"}],"node_modules/@web3modal/ui/node_modules/qrcode/lib/browser.js":[function(require,module,exports) {
var canPromise = require('./can-promise');
var QRCode = require('./core/qrcode');
var CanvasRenderer = require('./renderer/canvas');
var SvgRenderer = require('./renderer/svg-tag.js');
function renderCanvas(renderFunc, canvas, text, opts, cb) {
  var args = [].slice.call(arguments, 1);
  var argsNum = args.length;
  var isLastArgCb = typeof args[argsNum - 1] === 'function';
  if (!isLastArgCb && !canPromise()) {
    throw new Error('Callback required as last argument');
  }
  if (isLastArgCb) {
    if (argsNum < 2) {
      throw new Error('Too few arguments provided');
    }
    if (argsNum === 2) {
      cb = text;
      text = canvas;
      canvas = opts = undefined;
    } else if (argsNum === 3) {
      if (canvas.getContext && typeof cb === 'undefined') {
        cb = opts;
        opts = undefined;
      } else {
        cb = opts;
        opts = text;
        text = canvas;
        canvas = undefined;
      }
    }
  } else {
    if (argsNum < 1) {
      throw new Error('Too few arguments provided');
    }
    if (argsNum === 1) {
      text = canvas;
      canvas = opts = undefined;
    } else if (argsNum === 2 && !canvas.getContext) {
      opts = text;
      text = canvas;
      canvas = undefined;
    }
    return new Promise(function (resolve, reject) {
      try {
        var data = QRCode.create(text, opts);
        resolve(renderFunc(data, canvas, opts));
      } catch (e) {
        reject(e);
      }
    });
  }
  try {
    var data = QRCode.create(text, opts);
    cb(null, renderFunc(data, canvas, opts));
  } catch (e) {
    cb(e);
  }
}
exports.create = QRCode.create;
exports.toCanvas = renderCanvas.bind(null, CanvasRenderer.render);
exports.toDataURL = renderCanvas.bind(null, CanvasRenderer.renderToDataURL);

// only svg for now.
exports.toString = renderCanvas.bind(null, function (data, _, opts) {
  return SvgRenderer.render(data, opts);
});
},{"./can-promise":"node_modules/@web3modal/ui/node_modules/qrcode/lib/can-promise.js","./core/qrcode":"node_modules/@web3modal/ui/node_modules/qrcode/lib/core/qrcode.js","./renderer/canvas":"node_modules/@web3modal/ui/node_modules/qrcode/lib/renderer/canvas.js","./renderer/svg-tag.js":"node_modules/@web3modal/ui/node_modules/qrcode/lib/renderer/svg-tag.js"}],"node_modules/@web3modal/ui/dist/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.W3mQrCode = exports.W3mNetworkSwitch = exports.W3mModal = exports.W3mCoreButton = exports.W3mConnectButton = exports.W3mAccountButton = void 0;
var _lit = require("lit");
var _decorators = require("lit/decorators.js");
var _core = require("@web3modal/core");
var _classMap = require("lit/directives/class-map.js");
var _litHtml = require("lit-html");
var _motion = require("motion");
var _qrcode = _interopRequireDefault(require("qrcode"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var qe = Object.defineProperty,
  $e = Object.getOwnPropertySymbols,
  Ke = Object.prototype.hasOwnProperty,
  Ye = Object.prototype.propertyIsEnumerable,
  ke = (t, e, a) => e in t ? qe(t, e, {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: a
  }) : t[e] = a,
  jt = (t, e) => {
    for (var a in e || (e = {})) Ke.call(e, a) && ke(t, a, e[a]);
    if ($e) for (var a of $e(e)) Ye.call(e, a) && ke(t, a, e[a]);
    return t;
  };
function Qe() {
  var t;
  const e = (t = _core.ThemeCtrl.state.themeMode) != null ? t : "dark",
    a = {
      light: {
        foreground: {
          1: "rgb(20,20,20)",
          2: "rgb(121,134,134)",
          3: "rgb(158,169,169)"
        },
        background: {
          1: "rgb(255,255,255)",
          2: "rgb(241,243,243)",
          3: "rgb(228,231,231)"
        },
        overlay: "rgba(0,0,0,0.1)"
      },
      dark: {
        foreground: {
          1: "rgb(228,231,231)",
          2: "rgb(148,158,158)",
          3: "rgb(110,119,119)"
        },
        background: {
          1: "rgb(20,20,20)",
          2: "rgb(39,42,42)",
          3: "rgb(59,64,64)"
        },
        overlay: "rgba(255,255,255,0.1)"
      }
    }[e];
  return {
    "--w3m-color-fg-1": a.foreground[1],
    "--w3m-color-fg-2": a.foreground[2],
    "--w3m-color-fg-3": a.foreground[3],
    "--w3m-color-bg-1": a.background[1],
    "--w3m-color-bg-2": a.background[2],
    "--w3m-color-bg-3": a.background[3],
    "--w3m-color-overlay": a.overlay
  };
}
function Oe() {
  return {
    "--w3m-accent-color": "#3396FF",
    "--w3m-accent-fill-color": "#FFFFFF",
    "--w3m-z-index": "89",
    "--w3m-background-color": "#3396FF",
    "--w3m-background-border-radius": "8px",
    "--w3m-container-border-radius": "30px",
    "--w3m-wallet-icon-border-radius": "15px",
    "--w3m-wallet-icon-large-border-radius": "30px",
    "--w3m-wallet-icon-small-border-radius": "7px",
    "--w3m-input-border-radius": "28px",
    "--w3m-button-border-radius": "10px",
    "--w3m-notification-border-radius": "36px",
    "--w3m-secondary-button-border-radius": "28px",
    "--w3m-icon-button-border-radius": "50%",
    "--w3m-button-hover-highlight-border-radius": "10px",
    "--w3m-text-big-bold-size": "20px",
    "--w3m-text-big-bold-weight": "600",
    "--w3m-text-big-bold-line-height": "24px",
    "--w3m-text-big-bold-letter-spacing": "-0.03em",
    "--w3m-text-big-bold-text-transform": "none",
    "--w3m-text-xsmall-bold-size": "10px",
    "--w3m-text-xsmall-bold-weight": "700",
    "--w3m-text-xsmall-bold-line-height": "12px",
    "--w3m-text-xsmall-bold-letter-spacing": "0.02em",
    "--w3m-text-xsmall-bold-text-transform": "uppercase",
    "--w3m-text-xsmall-regular-size": "12px",
    "--w3m-text-xsmall-regular-weight": "600",
    "--w3m-text-xsmall-regular-line-height": "14px",
    "--w3m-text-xsmall-regular-letter-spacing": "-0.03em",
    "--w3m-text-xsmall-regular-text-transform": "none",
    "--w3m-text-small-thin-size": "14px",
    "--w3m-text-small-thin-weight": "500",
    "--w3m-text-small-thin-line-height": "16px",
    "--w3m-text-small-thin-letter-spacing": "-0.03em",
    "--w3m-text-small-thin-text-transform": "none",
    "--w3m-text-small-regular-size": "14px",
    "--w3m-text-small-regular-weight": "600",
    "--w3m-text-small-regular-line-height": "16px",
    "--w3m-text-small-regular-letter-spacing": "-0.03em",
    "--w3m-text-small-regular-text-transform": "none",
    "--w3m-text-medium-regular-size": "16px",
    "--w3m-text-medium-regular-weight": "600",
    "--w3m-text-medium-regular-line-height": "20px",
    "--w3m-text-medium-regular-letter-spacing": "-0.03em",
    "--w3m-text-medium-regular-text-transform": "none",
    "--w3m-font-family": "-apple-system, system-ui, BlinkMacSystemFont, 'Segoe UI', Roboto, Ubuntu, 'Helvetica Neue', sans-serif",
    "--w3m-success-color": "rgb(38,181,98)",
    "--w3m-error-color": "rgb(242, 90, 103)"
  };
}
function Xe() {
  const {
    themeVariables: t
  } = _core.ThemeCtrl.state;
  return {
    "--w3m-background-image-url": t != null && t["--w3m-background-image-url"] ? `url(${t["--w3m-background-image-url"]})` : "none"
  };
}
const w = {
    getPreset(t) {
      return Oe()[t];
    },
    setTheme() {
      const t = document.querySelector(":root"),
        {
          themeVariables: e
        } = _core.ThemeCtrl.state;
      if (t) {
        const a = jt(jt(jt(jt({}, Qe()), Oe()), e), Xe());
        Object.entries(a).forEach(([r, o]) => t.style.setProperty(r, o));
      }
    },
    globalCss: (0, _lit.css)`*,::after,::before{margin:0;padding:0;box-sizing:border-box;font-style:normal;text-rendering:optimizeSpeed;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;-webkit-tap-highlight-color:transparent;backface-visibility:hidden}button{cursor:pointer;display:flex;justify-content:center;align-items:center;position:relative;border:none;background-color:transparent;transition:all .2s ease}@media (hover:hover) and (pointer:fine){button:active{transition:all .1s ease;transform:scale(.93)}}button::after{content:'';position:absolute;top:0;bottom:0;left:0;right:0;transition:background-color,.2s ease}button:disabled{cursor:not-allowed}button svg,button w3m-text{position:relative;z-index:1}input{border:none;outline:0;appearance:none}img{display:block}::selection{color:var(--w3m-accent-fill-color);background:var(--w3m-accent-color)}`
  },
  Je = (0, _lit.css)`button{display:flex;border-radius:var(--w3m-button-hover-highlight-border-radius);flex-direction:column;justify-content:center;padding:5px;width:100px}button:active{background-color:var(--w3m-color-overlay)}@media(hover:hover){button:hover{background-color:var(--w3m-color-overlay)}}button>div{display:flex;justify-content:center;align-items:center;width:32px;height:32px;box-shadow:inset 0 0 0 1px var(--w3m-color-overlay);background-color:var(--w3m-accent-color);border-radius:var(--w3m-icon-button-border-radius);margin-bottom:4px}button path{fill:var(--w3m-accent-fill-color)}`;
var to = Object.defineProperty,
  eo = Object.getOwnPropertyDescriptor,
  Mt = (t, e, a, r) => {
    for (var o = r > 1 ? void 0 : r ? eo(e, a) : e, i = t.length - 1, l; i >= 0; i--) (l = t[i]) && (o = (r ? l(e, a, o) : l(o)) || o);
    return r && o && to(e, a, o), o;
  };
let lt = class extends _lit.LitElement {
  constructor() {
    super(...arguments), this.icon = void 0, this.label = "", this.onClick = () => null;
  }
  render() {
    return (0, _lit.html)`<button @click="${this.onClick}"><div>${this.icon}</div><w3m-text variant="xsmall-regular" color="accent">${this.label}</w3m-text></button>`;
  }
};
lt.styles = [w.globalCss, Je], Mt([(0, _decorators.property)()], lt.prototype, "icon", 2), Mt([(0, _decorators.property)()], lt.prototype, "label", 2), Mt([(0, _decorators.property)()], lt.prototype, "onClick", 2), lt = Mt([(0, _decorators.customElement)("w3m-box-button")], lt);
const oo = (0, _lit.css)`button{border-radius:var(--w3m-secondary-button-border-radius);height:28px;padding:0 10px;background-color:var(--w3m-accent-color)}button path{fill:var(--w3m-accent-fill-color)}button::after{border-radius:inherit;border:1px solid var(--w3m-color-overlay)}button:disabled::after{background-color:transparent}.w3m-icon-left svg{margin-right:5px}.w3m-icon-right svg{margin-left:5px}button:active::after{background-color:var(--w3m-color-overlay)}.w3m-ghost,.w3m-ghost:active::after,.w3m-outline{background-color:transparent}.w3m-ghost:active{opacity:.5}@media(hover:hover){button:hover::after{background-color:var(--w3m-color-overlay)}.w3m-ghost:hover::after{background-color:transparent}.w3m-ghost:hover{opacity:.5}}button:disabled{background-color:var(--w3m-color-bg-3);pointer-events:none}.w3m-ghost::after{border-color:transparent}.w3m-ghost path{fill:var(--w3m-color-fg-2)}.w3m-outline path{fill:var(--w3m-accent-color)}.w3m-outline:disabled{background-color:transparent;opacity:.5}`;
var ao = Object.defineProperty,
  ro = Object.getOwnPropertyDescriptor,
  nt = (t, e, a, r) => {
    for (var o = r > 1 ? void 0 : r ? ro(e, a) : e, i = t.length - 1, l; i >= 0; i--) (l = t[i]) && (o = (r ? l(e, a, o) : l(o)) || o);
    return r && o && ao(e, a, o), o;
  };
let z = class extends _lit.LitElement {
  constructor() {
    super(...arguments), this.disabled = !1, this.iconLeft = void 0, this.iconRight = void 0, this.onClick = () => null, this.variant = "default";
  }
  render() {
    const t = {
      "w3m-icon-left": this.iconLeft !== void 0,
      "w3m-icon-right": this.iconRight !== void 0,
      "w3m-ghost": this.variant === "ghost",
      "w3m-outline": this.variant === "outline"
    };
    let e = "inverse";
    return this.variant === "ghost" && (e = "secondary"), this.variant === "outline" && (e = "accent"), (0, _lit.html)`<button class="${(0, _classMap.classMap)(t)}" ?disabled="${this.disabled}" @click="${this.onClick}">${this.iconLeft}<w3m-text variant="small-regular" color="${e}"><slot></slot></w3m-text>${this.iconRight}</button>`;
  }
};
z.styles = [w.globalCss, oo], nt([(0, _decorators.property)()], z.prototype, "disabled", 2), nt([(0, _decorators.property)()], z.prototype, "iconLeft", 2), nt([(0, _decorators.property)()], z.prototype, "iconRight", 2), nt([(0, _decorators.property)()], z.prototype, "onClick", 2), nt([(0, _decorators.property)()], z.prototype, "variant", 2), z = nt([(0, _decorators.customElement)("w3m-button")], z);
const io = (0, _lit.css)`:host{display:inline-block}button{padding:0 15px 1px;height:40px;border-radius:var(--w3m-button-border-radius);color:var(--w3m-accent-fill-color);background-color:var(--w3m-accent-color)}button::after{content:'';top:0;bottom:0;left:0;right:0;position:absolute;background-color:transparent;border-radius:inherit;transition:background-color .2s ease;border:1px solid var(--w3m-color-overlay)}button:active::after{background-color:var(--w3m-color-overlay)}button:disabled{padding-bottom:0;background-color:var(--w3m-color-bg-3);color:var(--w3m-color-fg-3)}.w3m-secondary{color:var(--w3m-accent-color);background-color:transparent}.w3m-secondary::after{display:none}@media(hover:hover){button:hover::after{background-color:var(--w3m-color-overlay)}}`;
var lo = Object.defineProperty,
  no = Object.getOwnPropertyDescriptor,
  qt = (t, e, a, r) => {
    for (var o = r > 1 ? void 0 : r ? no(e, a) : e, i = t.length - 1, l; i >= 0; i--) (l = t[i]) && (o = (r ? l(e, a, o) : l(o)) || o);
    return r && o && lo(e, a, o), o;
  };
let vt = class extends _lit.LitElement {
  constructor() {
    super(...arguments), this.disabled = !1, this.variant = "primary";
  }
  render() {
    const t = {
      "w3m-secondary": this.variant === "secondary"
    };
    return (0, _lit.html)`<button ?disabled="${this.disabled}" class="${(0, _classMap.classMap)(t)}"><slot></slot></button>`;
  }
};
vt.styles = [w.globalCss, io], qt([(0, _decorators.property)()], vt.prototype, "disabled", 2), qt([(0, _decorators.property)()], vt.prototype, "variant", 2), vt = qt([(0, _decorators.customElement)("w3m-button-big")], vt);
const so = (0, _lit.css)`:host{background-color:var(--w3m-color-bg-2);border-top:1px solid var(--w3m-color-bg-3)}div{padding:10px 20px;display:inherit;flex-direction:inherit;align-items:inherit;width:inherit;justify-content:inherit}`;
var co = Object.defineProperty,
  mo = Object.getOwnPropertyDescriptor,
  ho = (t, e, a, r) => {
    for (var o = r > 1 ? void 0 : r ? mo(e, a) : e, i = t.length - 1, l; i >= 0; i--) (l = t[i]) && (o = (r ? l(e, a, o) : l(o)) || o);
    return r && o && co(e, a, o), o;
  };
let Kt = class extends _lit.LitElement {
  render() {
    return (0, _lit.html)`<div><slot></slot></div>`;
  }
};
Kt.styles = [w.globalCss, so], Kt = ho([(0, _decorators.customElement)("w3m-info-footer")], Kt);
const d = {
    CROSS_ICON: (0, _litHtml.svg)`<svg width="12" height="12" viewBox="0 0 12 12"><path d="M9.94 11A.75.75 0 1 0 11 9.94L7.414 6.353a.5.5 0 0 1 0-.708L11 2.061A.75.75 0 1 0 9.94 1L6.353 4.586a.5.5 0 0 1-.708 0L2.061 1A.75.75 0 0 0 1 2.06l3.586 3.586a.5.5 0 0 1 0 .708L1 9.939A.75.75 0 1 0 2.06 11l3.586-3.586a.5.5 0 0 1 .708 0L9.939 11Z" fill="#fff"/></svg>`,
    WALLET_CONNECT_LOGO: (0, _litHtml.svg)`<svg width="178" height="29" viewBox="0 0 178 29" id="w3m-wc-logo"><path d="M10.683 7.926c5.284-5.17 13.85-5.17 19.134 0l.636.623a.652.652 0 0 1 0 .936l-2.176 2.129a.343.343 0 0 1-.478 0l-.875-.857c-3.686-3.607-9.662-3.607-13.348 0l-.937.918a.343.343 0 0 1-.479 0l-2.175-2.13a.652.652 0 0 1 0-.936l.698-.683Zm23.633 4.403 1.935 1.895a.652.652 0 0 1 0 .936l-8.73 8.543a.687.687 0 0 1-.956 0L20.37 17.64a.172.172 0 0 0-.239 0l-6.195 6.063a.687.687 0 0 1-.957 0l-8.73-8.543a.652.652 0 0 1 0-.936l1.936-1.895a.687.687 0 0 1 .957 0l6.196 6.064a.172.172 0 0 0 .239 0l6.195-6.064a.687.687 0 0 1 .957 0l6.196 6.064a.172.172 0 0 0 .24 0l6.195-6.064a.687.687 0 0 1 .956 0ZM48.093 20.948l2.338-9.355c.139-.515.258-1.07.416-1.942.12.872.258 1.427.357 1.942l2.022 9.355h4.181l3.528-13.874h-3.21l-1.943 8.523a24.825 24.825 0 0 0-.456 2.457c-.158-.931-.317-1.625-.495-2.438l-1.883-8.542h-4.201l-2.042 8.542a41.204 41.204 0 0 0-.475 2.438 41.208 41.208 0 0 0-.476-2.438l-1.903-8.542h-3.349l3.508 13.874h4.083ZM63.33 21.304c1.585 0 2.596-.654 3.11-1.605-.059.297-.078.595-.078.892v.357h2.655V15.22c0-2.735-1.248-4.32-4.3-4.32-2.636 0-4.36 1.466-4.52 3.487h2.914c.1-.891.734-1.426 1.705-1.426.911 0 1.407.515 1.407 1.11 0 .435-.258.693-1.03.792l-1.388.159c-2.061.257-3.825 1.01-3.825 3.19 0 1.982 1.645 3.092 3.35 3.092Zm.891-2.041c-.773 0-1.348-.436-1.348-1.19 0-.733.655-1.09 1.645-1.268l.674-.119c.575-.118.892-.218 1.09-.396v.912c0 1.228-.892 2.06-2.06 2.06ZM70.398 7.074v13.874h2.874V7.074h-2.874ZM74.934 7.074v13.874h2.874V7.074h-2.874ZM84.08 21.304c2.735 0 4.5-1.546 4.697-3.567h-2.893c-.139.892-.892 1.387-1.804 1.387-1.228 0-2.12-.99-2.14-2.358h6.897v-.555c0-3.21-1.764-5.312-4.816-5.312-2.933 0-4.994 2.062-4.994 5.173 0 3.37 2.12 5.232 5.053 5.232Zm-2.16-6.421c.119-1.11.932-1.922 2.081-1.922 1.11 0 1.883.772 1.903 1.922H81.92ZM94.92 21.146c.633 0 1.248-.1 1.525-.179v-2.18c-.218.04-.475.06-.693.06-1.05 0-1.427-.595-1.427-1.566v-3.805h2.338v-2.24h-2.338V7.788H91.47v3.448H89.37v2.24h2.1v4.201c0 2.3 1.15 3.469 3.45 3.469ZM104.62 21.304c3.924 0 6.302-2.299 6.599-5.608h-3.111c-.238 1.803-1.506 3.032-3.369 3.032-2.2 0-3.746-1.784-3.746-4.796 0-2.953 1.605-4.638 3.805-4.638 1.883 0 2.953 1.15 3.171 2.834h3.191c-.317-3.448-2.854-5.41-6.342-5.41-3.984 0-7.036 2.695-7.036 7.214 0 4.677 2.676 7.372 6.838 7.372ZM117.449 21.304c2.993 0 5.114-1.882 5.114-5.172 0-3.23-2.121-5.233-5.114-5.233-2.972 0-5.093 2.002-5.093 5.233 0 3.29 2.101 5.172 5.093 5.172Zm0-2.22c-1.327 0-2.18-1.09-2.18-2.952 0-1.903.892-2.973 2.18-2.973 1.308 0 2.2 1.07 2.2 2.973 0 1.862-.872 2.953-2.2 2.953ZM126.569 20.948v-5.689c0-1.208.753-2.1 1.823-2.1 1.011 0 1.606.773 1.606 2.06v5.729h2.873v-6.144c0-2.339-1.229-3.905-3.428-3.905-1.526 0-2.458.734-2.953 1.606a5.31 5.31 0 0 0 .079-.892v-.377h-2.874v9.712h2.874ZM137.464 20.948v-5.689c0-1.208.753-2.1 1.823-2.1 1.011 0 1.606.773 1.606 2.06v5.729h2.873v-6.144c0-2.339-1.228-3.905-3.428-3.905-1.526 0-2.458.734-2.953 1.606a5.31 5.31 0 0 0 .079-.892v-.377h-2.874v9.712h2.874ZM149.949 21.304c2.735 0 4.499-1.546 4.697-3.567h-2.893c-.139.892-.892 1.387-1.804 1.387-1.228 0-2.12-.99-2.14-2.358h6.897v-.555c0-3.21-1.764-5.312-4.816-5.312-2.933 0-4.994 2.062-4.994 5.173 0 3.37 2.12 5.232 5.053 5.232Zm-2.16-6.421c.119-1.11.932-1.922 2.081-1.922 1.11 0 1.883.772 1.903 1.922h-3.984ZM160.876 21.304c3.013 0 4.658-1.645 4.975-4.201h-2.874c-.099 1.07-.713 1.982-2.001 1.982-1.309 0-2.2-1.21-2.2-2.993 0-1.942 1.03-2.933 2.259-2.933 1.209 0 1.803.872 1.883 1.882h2.873c-.218-2.358-1.823-4.142-4.776-4.142-2.874 0-5.153 1.903-5.153 5.193 0 3.25 1.923 5.212 5.014 5.212ZM172.067 21.146c.634 0 1.248-.1 1.526-.179v-2.18c-.218.04-.476.06-.694.06-1.05 0-1.427-.595-1.427-1.566v-3.805h2.339v-2.24h-2.339V7.788h-2.854v3.448h-2.1v2.24h2.1v4.201c0 2.3 1.15 3.469 3.449 3.469Z" fill="#fff"/></svg>`,
    WALLET_CONNECT_ICON: (0, _litHtml.svg)`<svg width="28" height="20" viewBox="0 0 28 20"><g clip-path="url(#a)"><path d="M7.386 6.482c3.653-3.576 9.575-3.576 13.228 0l.44.43a.451.451 0 0 1 0 .648L19.55 9.033a.237.237 0 0 1-.33 0l-.606-.592c-2.548-2.496-6.68-2.496-9.228 0l-.648.634a.237.237 0 0 1-.33 0L6.902 7.602a.451.451 0 0 1 0-.647l.483-.473Zm16.338 3.046 1.339 1.31a.451.451 0 0 1 0 .648l-6.035 5.909a.475.475 0 0 1-.662 0L14.083 13.2a.119.119 0 0 0-.166 0l-4.283 4.194a.475.475 0 0 1-.662 0l-6.035-5.91a.451.451 0 0 1 0-.647l1.338-1.31a.475.475 0 0 1 .662 0l4.283 4.194c.046.044.12.044.166 0l4.283-4.194a.475.475 0 0 1 .662 0l4.283 4.194c.046.044.12.044.166 0l4.283-4.194a.475.475 0 0 1 .662 0Z" fill="#000000"/></g><defs><clipPath id="a"><path fill="#ffffff" d="M0 0h28v20H0z"/></clipPath></defs></svg>`,
    WALLET_CONNECT_ICON_COLORED: (0, _litHtml.svg)`<svg width="96" height="96" fill="none"><path fill="#fff" d="M25.322 33.597c12.525-12.263 32.83-12.263 45.355 0l1.507 1.476a1.547 1.547 0 0 1 0 2.22l-5.156 5.048a.814.814 0 0 1-1.134 0l-2.074-2.03c-8.737-8.555-22.903-8.555-31.64 0l-2.222 2.175a.814.814 0 0 1-1.134 0l-5.156-5.049a1.547 1.547 0 0 1 0-2.22l1.654-1.62Zm56.019 10.44 4.589 4.494a1.547 1.547 0 0 1 0 2.22l-20.693 20.26a1.628 1.628 0 0 1-2.267 0L48.283 56.632a.407.407 0 0 0-.567 0L33.03 71.012a1.628 1.628 0 0 1-2.268 0L10.07 50.75a1.547 1.547 0 0 1 0-2.22l4.59-4.494a1.628 1.628 0 0 1 2.267 0l14.687 14.38c.156.153.41.153.567 0l14.685-14.38a1.628 1.628 0 0 1 2.268 0l14.687 14.38c.156.153.41.153.567 0l14.686-14.38a1.628 1.628 0 0 1 2.268 0Z"/><path stroke="#000" d="M25.672 33.954c12.33-12.072 32.325-12.072 44.655 0l1.508 1.476a1.047 1.047 0 0 1 0 1.506l-5.157 5.048a.314.314 0 0 1-.434 0l-2.074-2.03c-8.932-8.746-23.409-8.746-32.34 0l-2.222 2.174a.314.314 0 0 1-.434 0l-5.157-5.048a1.047 1.047 0 0 1 0-1.506l1.655-1.62Zm55.319 10.44 4.59 4.494a1.047 1.047 0 0 1 0 1.506l-20.694 20.26a1.128 1.128 0 0 1-1.568 0l-14.686-14.38a.907.907 0 0 0-1.267 0L32.68 70.655a1.128 1.128 0 0 1-1.568 0L10.42 50.394a1.047 1.047 0 0 1 0-1.506l4.59-4.493a1.128 1.128 0 0 1 1.567 0l14.687 14.379a.907.907 0 0 0 1.266 0l-.35-.357.35.357 14.686-14.38a1.128 1.128 0 0 1 1.568 0l14.687 14.38a.907.907 0 0 0 1.267 0l14.686-14.38a1.128 1.128 0 0 1 1.568 0Z"/></svg>`,
    BACK_ICON: (0, _litHtml.svg)`<svg width="10" height="18" viewBox="0 0 10 18"><path fill-rule="evenodd" clip-rule="evenodd" d="M8.735.179a.75.75 0 0 1 .087 1.057L2.92 8.192a1.25 1.25 0 0 0 0 1.617l5.902 6.956a.75.75 0 1 1-1.144.97L1.776 10.78a2.75 2.75 0 0 1 0-3.559L7.678.265A.75.75 0 0 1 8.735.18Z" fill="#fff"/></svg>`,
    COPY_ICON: (0, _litHtml.svg)`<svg width="24" height="24" fill="none"><path fill="#fff" fill-rule="evenodd" d="M7.01 7.01c.03-1.545.138-2.5.535-3.28A5 5 0 0 1 9.73 1.545C10.8 1 12.2 1 15 1c2.8 0 4.2 0 5.27.545a5 5 0 0 1 2.185 2.185C23 4.8 23 6.2 23 9c0 2.8 0 4.2-.545 5.27a5 5 0 0 1-2.185 2.185c-.78.397-1.735.505-3.28.534l-.001.01c-.03 1.54-.138 2.493-.534 3.27a5 5 0 0 1-2.185 2.186C13.2 23 11.8 23 9 23c-2.8 0-4.2 0-5.27-.545a5 5 0 0 1-2.185-2.185C1 19.2 1 17.8 1 15c0-2.8 0-4.2.545-5.27A5 5 0 0 1 3.73 7.545C4.508 7.149 5.46 7.04 7 7.01h.01ZM15 15.5c-1.425 0-2.403-.001-3.162-.063-.74-.06-1.139-.172-1.427-.319a3.5 3.5 0 0 1-1.53-1.529c-.146-.288-.257-.686-.318-1.427C8.501 11.403 8.5 10.425 8.5 9c0-1.425.001-2.403.063-3.162.06-.74.172-1.139.318-1.427a3.5 3.5 0 0 1 1.53-1.53c.288-.146.686-.257 1.427-.318.759-.062 1.737-.063 3.162-.063 1.425 0 2.403.001 3.162.063.74.06 1.139.172 1.427.318a3.5 3.5 0 0 1 1.53 1.53c.146.288.257.686.318 1.427.062.759.063 1.737.063 3.162 0 1.425-.001 2.403-.063 3.162-.06.74-.172 1.139-.319 1.427a3.5 3.5 0 0 1-1.529 1.53c-.288.146-.686.257-1.427.318-.759.062-1.737.063-3.162.063ZM7 8.511c-.444.009-.825.025-1.162.052-.74.06-1.139.172-1.427.318a3.5 3.5 0 0 0-1.53 1.53c-.146.288-.257.686-.318 1.427-.062.759-.063 1.737-.063 3.162 0 1.425.001 2.403.063 3.162.06.74.172 1.139.318 1.427a3.5 3.5 0 0 0 1.53 1.53c.288.146.686.257 1.427.318.759.062 1.737.063 3.162.063 1.425 0 2.403-.001 3.162-.063.74-.06 1.139-.172 1.427-.319a3.5 3.5 0 0 0 1.53-1.53c.146-.287.257-.685.318-1.426.027-.337.043-.718.052-1.162H15c-2.8 0-4.2 0-5.27-.545a5 5 0 0 1-2.185-2.185C7 13.2 7 11.8 7 9v-.489Z" clip-rule="evenodd"/></svg>`,
    RETRY_ICON: (0, _litHtml.svg)`<svg width="15" height="16" viewBox="0 0 15 16"><path d="M6.464 2.03A.75.75 0 0 0 5.403.97L2.08 4.293a1 1 0 0 0 0 1.414L5.403 9.03a.75.75 0 0 0 1.06-1.06L4.672 6.177a.25.25 0 0 1 .177-.427h2.085a4 4 0 1 1-3.93 4.746c-.077-.407-.405-.746-.82-.746-.414 0-.755.338-.7.748a5.501 5.501 0 1 0 5.45-6.248H4.848a.25.25 0 0 1-.177-.427L6.464 2.03Z" fill="#fff"/></svg>`,
    DESKTOP_ICON: (0, _litHtml.svg)`<svg width="16" height="16" viewBox="0 0 16 16"><path fill-rule="evenodd" clip-rule="evenodd" d="M0 5.98c0-1.85 0-2.775.394-3.466a3 3 0 0 1 1.12-1.12C2.204 1 3.13 1 4.98 1h6.04c1.85 0 2.775 0 3.466.394a3 3 0 0 1 1.12 1.12C16 3.204 16 4.13 16 5.98v1.04c0 1.85 0 2.775-.394 3.466a3 3 0 0 1-1.12 1.12C13.796 12 12.87 12 11.02 12H4.98c-1.85 0-2.775 0-3.466-.394a3 3 0 0 1-1.12-1.12C0 9.796 0 8.87 0 7.02V5.98ZM4.98 2.5h6.04c.953 0 1.568.001 2.034.043.446.04.608.108.69.154a1.5 1.5 0 0 1 .559.56c.046.08.114.243.154.69.042.465.043 1.08.043 2.033v1.04c0 .952-.001 1.568-.043 2.034-.04.446-.108.608-.154.69a1.499 1.499 0 0 1-.56.559c-.08.046-.243.114-.69.154-.466.042-1.08.043-2.033.043H4.98c-.952 0-1.568-.001-2.034-.043-.446-.04-.608-.108-.69-.154a1.5 1.5 0 0 1-.559-.56c-.046-.08-.114-.243-.154-.69-.042-.465-.043-1.08-.043-2.033V5.98c0-.952.001-1.568.043-2.034.04-.446.108-.608.154-.69a1.5 1.5 0 0 1 .56-.559c.08-.046.243-.114.69-.154.465-.042 1.08-.043 2.033-.043Z" fill="#fff"/><path d="M4 14.25a.75.75 0 0 1 .75-.75h6.5a.75.75 0 0 1 0 1.5h-6.5a.75.75 0 0 1-.75-.75Z" fill="#fff"/></svg>`,
    MOBILE_ICON: (0, _litHtml.svg)`<svg width="16" height="16" viewBox="0 0 16 16"><path d="M6.75 5a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5Z" fill="#fff"/><path fill-rule="evenodd" clip-rule="evenodd" d="M3 4.98c0-1.85 0-2.775.394-3.466a3 3 0 0 1 1.12-1.12C5.204 0 6.136 0 8 0s2.795 0 3.486.394a3 3 0 0 1 1.12 1.12C13 2.204 13 3.13 13 4.98v6.04c0 1.85 0 2.775-.394 3.466a3 3 0 0 1-1.12 1.12C10.796 16 9.864 16 8 16s-2.795 0-3.486-.394a3 3 0 0 1-1.12-1.12C3 13.796 3 12.87 3 11.02V4.98Zm8.5 0v6.04c0 .953-.001 1.568-.043 2.034-.04.446-.108.608-.154.69a1.499 1.499 0 0 1-.56.559c-.08.045-.242.113-.693.154-.47.042-1.091.043-2.05.043-.959 0-1.58-.001-2.05-.043-.45-.04-.613-.109-.693-.154a1.5 1.5 0 0 1-.56-.56c-.046-.08-.114-.243-.154-.69-.042-.466-.043-1.08-.043-2.033V4.98c0-.952.001-1.568.043-2.034.04-.446.108-.608.154-.69a1.5 1.5 0 0 1 .56-.559c.08-.045.243-.113.693-.154C6.42 1.501 7.041 1.5 8 1.5c.959 0 1.58.001 2.05.043.45.04.613.109.693.154a1.5 1.5 0 0 1 .56.56c.046.08.114.243.154.69.042.465.043 1.08.043 2.033Z" fill="#fff"/></svg>`,
    ARROW_DOWN_ICON: (0, _litHtml.svg)`<svg width="14" height="14" viewBox="0 0 14 14"><path d="M2.28 7.47a.75.75 0 0 0-1.06 1.06l5.25 5.25a.75.75 0 0 0 1.06 0l5.25-5.25a.75.75 0 0 0-1.06-1.06l-3.544 3.543a.25.25 0 0 1-.426-.177V.75a.75.75 0 0 0-1.5 0v10.086a.25.25 0 0 1-.427.176L2.28 7.47Z" fill="#fff"/></svg>`,
    ARROW_UP_RIGHT_ICON: (0, _litHtml.svg)`<svg width="15" height="14" fill="none"><path d="M4.5 1.75A.75.75 0 0 1 5.25 1H12a1.5 1.5 0 0 1 1.5 1.5v6.75a.75.75 0 0 1-1.5 0V4.164a.25.25 0 0 0-.427-.176L4.061 11.5A.75.75 0 0 1 3 10.44l7.513-7.513a.25.25 0 0 0-.177-.427H5.25a.75.75 0 0 1-.75-.75Z" fill="#fff"/></svg>`,
    ARROW_RIGHT_ICON: (0, _litHtml.svg)`<svg width="6" height="14" viewBox="0 0 6 14"><path fill-rule="evenodd" clip-rule="evenodd" d="M2.181 1.099a.75.75 0 0 1 1.024.279l2.433 4.258a2.75 2.75 0 0 1 0 2.729l-2.433 4.257a.75.75 0 1 1-1.303-.744L4.335 7.62a1.25 1.25 0 0 0 0-1.24L1.902 2.122a.75.75 0 0 1 .28-1.023Z" fill="#fff"/></svg>`,
    QRCODE_ICON: (0, _litHtml.svg)`<svg width="25" height="24" viewBox="0 0 25 24"><path d="M23.748 9a.748.748 0 0 0 .748-.752c-.018-2.596-.128-4.07-.784-5.22a6 6 0 0 0-2.24-2.24c-1.15-.656-2.624-.766-5.22-.784a.748.748 0 0 0-.752.748c0 .414.335.749.748.752 1.015.007 1.82.028 2.494.088.995.09 1.561.256 1.988.5.7.398 1.28.978 1.679 1.678.243.427.41.993.498 1.988.061.675.082 1.479.09 2.493a.753.753 0 0 0 .75.749ZM3.527.788C4.677.132 6.152.022 8.747.004A.748.748 0 0 1 9.5.752a.753.753 0 0 1-.749.752c-1.014.007-1.818.028-2.493.088-.995.09-1.561.256-1.988.5-.7.398-1.28.978-1.679 1.678-.243.427-.41.993-.499 1.988-.06.675-.081 1.479-.088 2.493A.753.753 0 0 1 1.252 9a.748.748 0 0 1-.748-.752c.018-2.596.128-4.07.784-5.22a6 6 0 0 1 2.24-2.24ZM1.252 15a.748.748 0 0 0-.748.752c.018 2.596.128 4.07.784 5.22a6 6 0 0 0 2.24 2.24c1.15.656 2.624.766 5.22.784a.748.748 0 0 0 .752-.748.753.753 0 0 0-.749-.752c-1.014-.007-1.818-.028-2.493-.089-.995-.089-1.561-.255-1.988-.498a4.5 4.5 0 0 1-1.679-1.68c-.243-.426-.41-.992-.499-1.987-.06-.675-.081-1.479-.088-2.493A.753.753 0 0 0 1.252 15ZM22.996 15.749a.753.753 0 0 1 .752-.749c.415 0 .751.338.748.752-.018 2.596-.128 4.07-.784 5.22a6 6 0 0 1-2.24 2.24c-1.15.656-2.624.766-5.22.784a.748.748 0 0 1-.752-.748c0-.414.335-.749.748-.752 1.015-.007 1.82-.028 2.494-.089.995-.089 1.561-.255 1.988-.498a4.5 4.5 0 0 0 1.679-1.68c.243-.426.41-.992.498-1.987.061-.675.082-1.479.09-2.493Z" fill="#fff"/><path fill-rule="evenodd" clip-rule="evenodd" d="M7 4a2.5 2.5 0 0 0-2.5 2.5v2A2.5 2.5 0 0 0 7 11h2a2.5 2.5 0 0 0 2.5-2.5v-2A2.5 2.5 0 0 0 9 4H7Zm2 1.5H7a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1ZM13.5 6.5A2.5 2.5 0 0 1 16 4h2a2.5 2.5 0 0 1 2.5 2.5v2A2.5 2.5 0 0 1 18 11h-2a2.5 2.5 0 0 1-2.5-2.5v-2Zm2.5-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1ZM7 13a2.5 2.5 0 0 0-2.5 2.5v2A2.5 2.5 0 0 0 7 20h2a2.5 2.5 0 0 0 2.5-2.5v-2A2.5 2.5 0 0 0 9 13H7Zm2 1.5H7a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1Z" fill="#fff"/><path d="M13.5 15.5c0-.465 0-.697.038-.89a2 2 0 0 1 1.572-1.572C15.303 13 15.535 13 16 13v2.5h-2.5ZM18 13c.465 0 .697 0 .89.038a2 2 0 0 1 1.572 1.572c.038.193.038.425.038.89H18V13ZM18 17.5h2.5c0 .465 0 .697-.038.89a2 2 0 0 1-1.572 1.572C18.697 20 18.465 20 18 20v-2.5ZM13.5 17.5H16V20c-.465 0-.697 0-.89-.038a2 2 0 0 1-1.572-1.572c-.038-.193-.038-.425-.038-.89Z" fill="#fff"/></svg>`,
    SCAN_ICON: (0, _litHtml.svg)`<svg width="16" height="16" fill="none"><path fill="#fff" d="M10 15.216c0 .422.347.763.768.74 1.202-.064 2.025-.222 2.71-.613a5.001 5.001 0 0 0 1.865-1.866c.39-.684.549-1.507.613-2.709a.735.735 0 0 0-.74-.768.768.768 0 0 0-.76.732c-.009.157-.02.306-.032.447-.073.812-.206 1.244-.384 1.555-.31.545-.761.996-1.306 1.306-.311.178-.743.311-1.555.384-.141.013-.29.023-.447.032a.768.768 0 0 0-.732.76ZM10 .784c0 .407.325.737.732.76.157.009.306.02.447.032.812.073 1.244.206 1.555.384a3.5 3.5 0 0 1 1.306 1.306c.178.311.311.743.384 1.555.013.142.023.29.032.447a.768.768 0 0 0 .76.732.734.734 0 0 0 .74-.768c-.064-1.202-.222-2.025-.613-2.71A5 5 0 0 0 13.477.658c-.684-.39-1.507-.549-2.709-.613a.735.735 0 0 0-.768.74ZM5.232.044A.735.735 0 0 1 6 .784a.768.768 0 0 1-.732.76c-.157.009-.305.02-.447.032-.812.073-1.244.206-1.555.384A3.5 3.5 0 0 0 1.96 3.266c-.178.311-.311.743-.384 1.555-.013.142-.023.29-.032.447A.768.768 0 0 1 .784 6a.735.735 0 0 1-.74-.768c.064-1.202.222-2.025.613-2.71A5 5 0 0 1 2.523.658C3.207.267 4.03.108 5.233.044ZM5.268 14.456a.768.768 0 0 1 .732.76.734.734 0 0 1-.768.74c-1.202-.064-2.025-.222-2.71-.613a5 5 0 0 1-1.865-1.866c-.39-.684-.549-1.507-.613-2.709A.735.735 0 0 1 .784 10c.407 0 .737.325.76.732.009.157.02.306.032.447.073.812.206 1.244.384 1.555a3.5 3.5 0 0 0 1.306 1.306c.311.178.743.311 1.555.384.142.013.29.023.447.032Z"/></svg>`,
    CHECKMARK_ICON: (0, _litHtml.svg)`<svg width="13" height="12" viewBox="0 0 13 12"><path fill-rule="evenodd" clip-rule="evenodd" d="M12.155.132a.75.75 0 0 1 .232 1.035L5.821 11.535a1 1 0 0 1-1.626.09L.665 7.21a.75.75 0 1 1 1.17-.937L4.71 9.867a.25.25 0 0 0 .406-.023L11.12.364a.75.75 0 0 1 1.035-.232Z" fill="#fff"/></svg>`,
    HELP_ETH_IMG: (0, _litHtml.svg)`<svg width="60" height="60" fill="none" viewBox="0 0 60 60"><g clip-path="url(#j)"><rect width="60" height="60" rx="30" fill="#987DE8"/><path fill-rule="evenodd" clip-rule="evenodd" d="m15.48 28.367 11.966-19.3c1.174-1.892 3.927-1.892 5.1 0l11.97 19.306a6 6 0 0 1 .9 3.142v.028a6 6 0 0 1-1.154 3.56L33.227 50.208c-1.599 2.188-4.864 2.188-6.461 0L15.733 35.095a6 6 0 0 1-1.154-3.538v-.029a6 6 0 0 1 .9-3.161Z" fill="#fff"/><path d="M30.84 10.112a.992.992 0 0 0-.844-.464V24.5l12.598 5.53c.081-.466-.001-.963-.27-1.398L30.84 10.112Z" fill="#643CDD"/><path d="M29.996 9.648a.991.991 0 0 0-.845.465l-11.489 18.53a1.991 1.991 0 0 0-.264 1.387l12.598-5.53V9.648Z" fill="#BDADEB"/><path d="M29.996 50.544a.994.994 0 0 0 .808-.41l11.235-15.38c.307-.434-.193-.988-.658-.72L31.49 39.71a2.998 2.998 0 0 1-1.494.398v10.437Z" fill="#643CDD"/><path d="M17.966 34.762 29.19 50.134c.2.274.503.41.807.41V40.108a2.998 2.998 0 0 1-1.493-.398l-9.884-5.676c-.468-.27-.971.292-.653.728Z" fill="#BDADEB"/><path d="M42.594 30.03 29.996 24.5v13.138a3 3 0 0 0 1.495-.399l10.149-5.83c.525-.31.856-.823.954-1.38Z" fill="#401AB3"/><path d="M29.996 37.638V24.462l-12.598 5.566c.098.564.437 1.083.974 1.392l10.13 5.82c.462.265.978.398 1.494.398Z" fill="#7C5AE2"/></g><rect class="help-img-highlight" x=".5" y=".5" width="59" height="59" rx="29.5"/><defs><clipPath id="j"><rect width="60" height="60" rx="30" fill="#fff"/></clipPath></defs></svg>`,
    HELP_PAINTING_IMG: (0, _litHtml.svg)`<svg width="60" height="60" fill="none" viewBox="0 0 60 60"><g clip-path="url(#k)"><rect width="60" height="60" rx="3" fill="#C653C6"/><path d="M52.094 47.344c0-4.246-1.436-9.557-5.885-12.4a2.876 2.876 0 0 0-1.615-3.891v-.819a4.037 4.037 0 0 0-1.34-3.007 4.75 4.75 0 0 0-2.41-6.252v-5.506c0-6.248-5.065-11.313-11.313-11.313-6.247 0-11.312 5.065-11.312 11.313v2.152a3.343 3.343 0 0 0-1.18 5.045 4.738 4.738 0 0 0-1.633 3.584 4.73 4.73 0 0 0 .956 2.858 5.218 5.218 0 0 0-2.358 6.815c-3.06 4.129-6.098 8.298-6.098 15.64 0 2.668.364 4.856.731 6.385.184.765.368 1.366.509 1.78a12.721 12.721 0 0 0 .225.611l.015.037.005.011.001.004v.002h.001l.92-.393-.92.394.26.606h38.26l.291-.49-.86-.51.86.51v-.001l.002-.002.002-.005.01-.017.035-.06.127-.225c.108-.195.26-.477.441-.835.363-.714.845-1.732 1.328-2.953.959-2.427 1.945-5.725 1.945-9.068Z" fill="#E87DE8" stroke="#fff" stroke-width="2"/><path fill-rule="evenodd" clip-rule="evenodd" d="M26.5 29.5c-3-.5-5.5-3-5.503-7l.002-7c0-.466 0-.698.026-.893a3 3 0 0 1 2.582-2.582c.195-.026.428-.026.893-.026 2 0 2.5-2.5 2.5-2.5s0 2.5 2.5 2.5c1.398 0 2.097 0 2.648.229a3 3 0 0 1 1.624 1.623c.228.552.228 1.25.228 2.649v6c0 4-3 7-6.5 7 1.35.23 4 0 6.5-2v9.53C34 38.5 31.495 40 28 40s-6-1.5-6-2.97L24 34l2.5 1.5v-6ZM26 47h4.5c2.5 0 3 4 3 5.5h-3l-1-1.5H26v-4Zm-6.25 5.5H24V57h-8c0-1 1-4.5 3.75-4.5Z" fill="#fff"/></g><rect class="help-img-highlight" x=".5" y=".5" width="59" height="59" rx="2.5"/><defs><clipPath id="k"><rect width="60" height="60" rx="3" fill="#fff"/></clipPath></defs></svg>`,
    HELP_CHART_IMG: (0, _litHtml.svg)`<svg width="60" height="60" fill="none" viewBox="0 0 60 60"><g clip-path="url(#l)"><path d="M0 25.01C0 15.76 0 11.133 1.97 7.678a15 15 0 0 1 5.598-5.597C11.023.11 15.648.11 24.9.11h10.2c9.251 0 13.877 0 17.332 1.97a15 15 0 0 1 5.597 5.597C60 11.133 60 15.758 60 25.01v10.2c0 9.252 0 13.877-1.97 17.332a15 15 0 0 1-5.598 5.598c-3.455 1.97-8.08 1.97-17.332 1.97H24.9c-9.251 0-13.877 0-17.332-1.97a14.999 14.999 0 0 1-5.597-5.598C0 49.087 0 44.462 0 35.21v-10.2Z" fill="#1DC956"/><path d="M.5 25.01c0-4.635 0-8.078.244-10.795.244-2.71.726-4.65 1.66-6.289a14.5 14.5 0 0 1 5.412-5.41c1.639-.936 3.579-1.418 6.289-1.661C16.822.61 20.265.61 24.9.61h10.2c4.635 0 8.078 0 10.795.245 2.71.243 4.65.725 6.29 1.66a14.5 14.5 0 0 1 5.41 5.411c.935 1.64 1.417 3.579 1.66 6.29.244 2.717.245 6.16.245 10.794v10.2c0 4.635 0 8.078-.244 10.795-.244 2.71-.726 4.65-1.66 6.29a14.5 14.5 0 0 1-5.412 5.41c-1.639.936-3.579 1.418-6.289 1.661-2.717.244-6.16.244-10.795.244H24.9c-4.635 0-8.078 0-10.795-.244-2.71-.243-4.65-.725-6.29-1.66a14.5 14.5 0 0 1-5.41-5.412C1.47 50.655.988 48.716.745 46.005.5 43.288.5 39.845.5 35.21v-10.2Z" stroke="#fff" stroke-opacity=".1"/><path d="M16.109 60c-3.833-.179-6.41-.645-8.541-1.86a15 15 0 0 1-5.598-5.598C.553 50.057.155 46.967.043 41.985l4.146-1.382a4 4 0 0 0 2.48-2.39l4.654-12.409a2 2 0 0 1 2.505-1.195l2.526.842a2 2 0 0 0 2.422-1.003l2.968-5.938c.81-1.62 3.185-1.415 3.705.32l3.774 12.581a2 2 0 0 0 3.025 1.09l3.342-2.228c.27-.18.49-.422.646-.706l5.297-9.712a2 2 0 0 1 1.428-1.016l4.134-.689a2 2 0 0 1 1.61.437l3.892 3.243a2 2 0 0 0 2.694-.122l4.633-4.632C60 19.28 60 21.88 60 25.01v10.2c0 9.252 0 13.877-1.97 17.332a14.998 14.998 0 0 1-5.598 5.598c-2.131 1.215-4.708 1.681-8.54 1.86H16.108Z" fill="#2BEE6C"/><path d="M.072 43.03a112.37 112.37 0 0 1-.048-2.093l3.85-1.283a3 3 0 0 0 1.86-1.793l4.653-12.408a3 3 0 0 1 3.758-1.793l2.526.842a1 1 0 0 0 1.21-.501l2.97-5.938c1.214-2.43 4.775-2.123 5.556.48l3.774 12.58a1 1 0 0 0 1.513.545l3.341-2.227a1 1 0 0 0 .323-.353l5.298-9.712a3 3 0 0 1 2.14-1.523l4.135-.69a3 3 0 0 1 2.414.655l3.892 3.244a1 1 0 0 0 1.347-.061l5.28-5.28c.046.845.077 1.752.097 2.732l-3.962 3.962a3 3 0 0 1-4.042.183l-3.893-3.243a1 1 0 0 0-.804-.218l-4.135.689a1 1 0 0 0-.714.507l-5.297 9.712c-.233.427-.565.79-.97 1.06l-3.34 2.228a3 3 0 0 1-4.538-1.635l-3.775-12.58c-.26-.868-1.447-.97-1.852-.16l-2.969 5.937a3 3 0 0 1-3.632 1.505l-2.526-.842a1 1 0 0 0-1.252.597L7.606 38.564a5 5 0 0 1-3.1 2.988L.072 43.029Z" fill="#fff"/><path fill-rule="evenodd" clip-rule="evenodd" d="M49.5 19a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0Z" fill="#2BEE6C"/><path d="M47.5 19a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" fill="#fff"/><path d="M45 .283v59.654c-.63.042-1.294.074-2 .098V.185c.706.025 1.37.056 2 .098Z" fill="#fff"/><path class="help-img-highlight" d="M.5 25.01c0-4.635 0-8.078.244-10.795.244-2.71.726-4.65 1.66-6.289a14.5 14.5 0 0 1 5.412-5.41c1.639-.936 3.579-1.418 6.289-1.661C16.822.61 20.265.61 24.9.61h10.2c4.635 0 8.078 0 10.795.245 2.71.243 4.65.725 6.29 1.66a14.5 14.5 0 0 1 5.41 5.411c.935 1.64 1.417 3.579 1.66 6.29.244 2.717.245 6.16.245 10.794v10.2c0 4.635 0 8.078-.244 10.795-.244 2.71-.726 4.65-1.66 6.29a14.5 14.5 0 0 1-5.412 5.41c-1.639.936-3.579 1.418-6.289 1.661-2.717.244-6.16.244-10.795.244H24.9c-4.635 0-8.078 0-10.795-.244-2.71-.243-4.65-.725-6.29-1.66a14.5 14.5 0 0 1-5.41-5.412C1.47 50.655.988 48.716.745 46.005.5 43.288.5 39.845.5 35.21v-10.2Z"/></g><defs><clipPath id="l"><path fill="#fff" d="M0 0h60v60H0z"/></clipPath></defs></svg>`,
    HELP_KEY_IMG: (0, _litHtml.svg)`<svg width="60" height="60" fill="none" viewBox="0 0 60 60"><g clip-path="url(#m)"><path fill="#EB8B47" d="M0 24.9c0-9.252 0-13.878 1.97-17.332A15 15 0 0 1 7.569 1.97C11.023 0 15.648 0 24.9 0h10.2c9.251 0 13.877 0 17.332 1.97a15 15 0 0 1 5.597 5.598C60 11.022 60 15.648 60 24.899v10.2c0 9.252 0 13.878-1.97 17.332a15.001 15.001 0 0 1-5.598 5.598c-3.455 1.97-8.08 1.97-17.332 1.97H24.9c-9.251 0-13.877 0-17.332-1.97a15 15 0 0 1-5.597-5.598C0 48.977 0 44.351 0 35.1V24.9Z"/><path class="help-img-highlight" d="M.5 24.9c0-4.635 0-8.078.244-10.795.244-2.71.726-4.65 1.66-6.29a14.5 14.5 0 0 1 5.412-5.41C9.455 1.468 11.395.986 14.105.743 16.822.5 20.265.5 24.9.5h10.2c4.635 0 8.078 0 10.795.244 2.71.243 4.65.725 6.29 1.66a14.5 14.5 0 0 1 5.41 5.411c.935 1.64 1.417 3.58 1.66 6.29.244 2.717.245 6.16.245 10.794v10.2c0 4.635 0 8.078-.244 10.796-.244 2.71-.726 4.65-1.66 6.289a14.5 14.5 0 0 1-5.412 5.41c-1.639.936-3.579 1.418-6.289 1.661-2.717.244-6.16.244-10.795.244H24.9c-4.635 0-8.078 0-10.795-.244-2.71-.243-4.65-.725-6.29-1.66a14.5 14.5 0 0 1-5.41-5.411c-.935-1.64-1.417-3.58-1.66-6.29C.5 43.178.5 39.734.5 35.1V24.9Z"/><path fill="#FF974C" stroke="#fff" stroke-width="2" d="M39.192 29.192c5.077-5.077 5.077-13.308 0-18.385-5.076-5.077-13.308-5.077-18.384 0-5.077 5.077-5.077 13.308 0 18.385l1.287 1.291c1.137 1.142 1.706 1.712 2.097 2.387.267.462.472.957.608 1.473.2.755.2 1.56.2 3.171V48.75c0 1.077 0 1.615.134 2.119a4 4 0 0 0 .407.984c.262.45.643.831 1.404 1.592l.294.295c.654.654.982.981 1.365 1.086.26.07.533.07.792 0 .383-.105.71-.432 1.365-1.086l3.478-3.479c.655-.654.982-.981 1.087-1.365a1.5 1.5 0 0 0 0-.791c-.105-.384-.432-.711-1.087-1.365l-.478-.479c-.655-.654-.982-.981-1.087-1.365a1.5 1.5 0 0 1 0-.791c.105-.384.432-.711 1.087-1.365l.478-.479c.655-.654.982-.981 1.087-1.365a1.5 1.5 0 0 0 0-.791c-.105-.384-.432-.711-1.087-1.365l-.492-.493c-.65-.65-.974-.974-1.08-1.355a1.5 1.5 0 0 1-.003-.788c.102-.382.425-.71 1.069-1.364l5.46-5.547Z"/><circle cx="30" cy="17" r="4" fill="#EB8B47" stroke="#fff" stroke-width="2"/></g><defs><clipPath id="m"><path fill="#fff" d="M0 0h60v60H0z"/></clipPath></defs></svg>`,
    HELP_USER_IMG: (0, _litHtml.svg)`<svg width="60" height="60" fill="none" viewBox="0 0 60 60"><g clip-path="url(#n)"><rect width="60" height="60" fill="#00ACE6" rx="30"/><path fill="#1AC6FF" stroke="#fff" stroke-width="2" d="M59 73c0 16.016-12.984 29-29 29S1 89.016 1 73c0-16.017 11-29 29-29s29 12.983 29 29ZM18.69 19.902a11 11 0 0 1 9.281-8.692 14.842 14.842 0 0 1 4.058 0 11 11 0 0 1 9.28 8.692c.178.866.322 1.75.44 2.625.132.977.132 1.968 0 2.945a39.467 39.467 0 0 1-.44 2.625 11 11 0 0 1-9.28 8.692 14.862 14.862 0 0 1-4.058 0 11 11 0 0 1-9.28-8.692 39.467 39.467 0 0 1-.44-2.625 11.004 11.004 0 0 1 0-2.945c.118-.876.262-1.759.44-2.625Z"/><circle cx="24.5" cy="23.5" r="1.5" fill="#fff"/><circle cx="35.5" cy="23.5" r="1.5" fill="#fff"/><path stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m31 20-3 8h4"/></g><rect class="help-img-highlight" width="59" height="59" x=".5" y=".5" rx="29.5"/><defs><clipPath id="n"><rect width="60" height="60" fill="#fff" rx="30"/></clipPath></defs></svg>`,
    HELP_LOCK_IMG: (0, _litHtml.svg)`<svg width="60" height="60" fill="none" viewBox="0 0 60 60"><rect width="60" height="60" fill="#C653C6" rx="3"/><path fill="#fff" d="M20.034 15.216C20 15.607 20 16.07 20 17v2.808c0 1.13 0 1.696-.2 2.11a1.78 1.78 0 0 1-.584.714c-.366.28-1.051.42-2.423.7a7.076 7.076 0 0 0-1.597.511 9.001 9.001 0 0 0-4.353 4.353C10 30.005 10 32.336 10 37c0 4.663 0 6.995.843 8.804a9.001 9.001 0 0 0 4.353 4.353C17.005 51 19.336 51 24 51h12c4.663 0 6.995 0 8.804-.843a9.001 9.001 0 0 0 4.353-4.353C50 43.995 50 41.664 50 37c0-4.663 0-6.995-.843-8.804a9.001 9.001 0 0 0-4.353-4.353 7.076 7.076 0 0 0-1.597-.511c-1.372-.28-2.057-.42-2.423-.7a1.78 1.78 0 0 1-.583-.715C40 21.505 40 20.94 40 19.809V17c0-.929 0-1.393-.034-1.784a9 9 0 0 0-8.182-8.182C31.393 7 30.93 7 30 7s-1.393 0-1.784.034a9 9 0 0 0-8.182 8.182Z"/><path fill="#E87DE8" d="M22 17c0-.929 0-1.393.044-1.784a7 7 0 0 1 6.172-6.172C28.606 9 29.071 9 30 9s1.393 0 1.784.044a7 7 0 0 1 6.172 6.172c.044.39.044.855.044 1.784v4.5a1.5 1.5 0 0 1-3 0V17c0-.93 0-1.394-.077-1.78a4 4 0 0 0-3.143-3.143C31.394 12 30.93 12 30 12s-1.394 0-1.78.077a4 4 0 0 0-3.143 3.143C25 15.606 25 16.07 25 17v4.5a1.5 1.5 0 0 1-3 0V17Z"/><path fill="#E87DE8" fill-rule="evenodd" d="M12 36.62c0-4.317 0-6.476.92-8.088a7 7 0 0 1 2.612-2.612c1.612-.92 3.77-.92 8.088-.92h6.855c.469 0 .703 0 .906.017 2.73.222 4.364 2.438 4.619 4.983.27-2.698 2.111-5 5.015-5A6.985 6.985 0 0 1 48 31.985v5.395c0 4.317 0 6.476-.92 8.088a7 7 0 0 1-2.612 2.612c-1.612.92-3.77.92-8.088.92h-5.855c-.469 0-.703 0-.906-.017-2.73-.222-4.364-2.438-4.619-4.983-.258 2.583-1.943 4.818-4.714 4.99-.155.01-.335.01-.694.01-.55 0-.825 0-1.057-.015a7 7 0 0 1-6.52-6.52C12 42.233 12 41.958 12 41.408V36.62Zm21.24-.273a4 4 0 1 0-6.478 0c.985 1.36 1.479 2.039 1.564 2.229.178.398.176.818.174 1.247V42.5a1.5 1.5 0 0 0 3 0v-2.677c-.002-.429-.004-.85.174-1.247.085-.19.579-.87 1.565-2.229Z" clip-rule="evenodd"/><rect class="help-img-highlight" width="59" height="59" x=".5" y=".5" rx="2.5"/></svg>`,
    HELP_COMPAS_IMG: (0, _litHtml.svg)`<svg width="60" height="60" fill="none" viewBox="0 0 60 60"><rect width="60" height="60" fill="#1DC956" rx="30"/><circle cx="30" cy="29.999" r="3" fill="#fff"/><path fill="#2BEE6C" stroke="#fff" stroke-width="2" d="m45.316 17.9-.88-.425.88.424a7.9 7.9 0 0 1 .026-.053c.093-.192.21-.432.26-.687l-.819-.162.819.162a2 2 0 0 0-.239-1.405c-.132-.224-.32-.412-.472-.562a8.415 8.415 0 0 1-.042-.042l-.042-.042c-.15-.151-.338-.34-.562-.472l-.508.862.508-.862a2 2 0 0 0-1.405-.239c-.255.05-.495.167-.687.26l-.053.026-15.05 7.246-.108.052c-1.131.545-1.843.887-2.456 1.374a6.994 6.994 0 0 0-1.13 1.13c-.487.613-.83 1.325-1.375 2.457l-.051.108-7.247 15.05-.025.053c-.094.192-.21.431-.26.686a2 2 0 0 0 .239 1.406l.855-.505-.856.505c.133.224.321.411.473.562l.042.042.041.042c.15.151.338.34.563.472a2 2 0 0 0 1.405.239l-.195-.981.195.98c.255-.05.494-.166.686-.26l.054-.025-.419-.87.419.87 15.05-7.247.107-.051c1.132-.545 1.844-.888 2.457-1.374a7.002 7.002 0 0 0 1.13-1.13c.487-.614.83-1.325 1.374-2.457l.052-.108 7.246-15.05Z"/><path fill="#1DC956" d="m33.376 32.723-2.669-3.43-14.85 14.849.206.205a1 1 0 0 0 1.141.194l15.105-7.273a3 3 0 0 0 1.067-4.545Z"/><path fill="#86F999" d="m26.624 27.276 2.669 3.43 14.85-14.849-.206-.205a1 1 0 0 0-1.141-.194L27.69 22.731a3 3 0 0 0-1.067 4.545Z"/><circle cx="30" cy="30" r="3" fill="#fff" transform="rotate(45 30 30)"/><rect class="help-img-highlight" width="59" height="59" x=".5" y=".5" rx="29.5"/></svg>`,
    HELP_NOUN_IMG: (0, _litHtml.svg)`<svg width="60" height="60" fill="none" viewBox="0 0 60 60"><rect width="60" height="60" fill="#794CFF" rx="3"/><path fill="#987DE8" stroke="#fff" stroke-width="2" d="M33 22.5v-1H16v5H8.5V36H13v-5h3v7.5h17V31h1v7.5h17v-17H34v5h-1v-4Z"/><path fill="#fff" d="M37.5 25h10v10h-10z"/><path fill="#4019B2" d="M42.5 25h5v10h-5z"/><path fill="#fff" d="M19.5 25h10v10h-10z"/><path fill="#4019B2" d="M24.5 25h5v10h-5z"/><path fill="#fff" d="M12 30.5h4V37h-4v-6.5Z"/><rect class="help-img-highlight" width="59" height="59" x=".5" y=".5" rx="2.5"/></svg>`,
    HELP_DAO_IMG: (0, _litHtml.svg)`<svg width="60" height="60" fill="none" viewBox="0 0 60 60"><g clip-path="url(#o)"><path fill="#EB8B47" d="M0 24.9c0-9.252 0-13.878 1.97-17.332A15 15 0 0 1 7.569 1.97C11.023 0 15.648 0 24.9 0h10.2c9.251 0 13.877 0 17.332 1.97a15 15 0 0 1 5.597 5.598C60 11.022 60 15.648 60 24.899v10.2c0 9.252 0 13.878-1.97 17.332a15.001 15.001 0 0 1-5.598 5.598c-3.455 1.97-8.08 1.97-17.332 1.97H24.9c-9.251 0-13.877 0-17.332-1.97a15 15 0 0 1-5.597-5.598C0 48.977 0 44.351 0 35.1V24.9Z"/><path class="help-img-highlight" d="M.5 24.9c0-4.635 0-8.078.244-10.795.244-2.71.726-4.65 1.66-6.29a14.5 14.5 0 0 1 5.412-5.41C9.455 1.468 11.395.986 14.105.743 16.822.5 20.265.5 24.9.5h10.2c4.635 0 8.078 0 10.795.244 2.71.243 4.65.725 6.29 1.66a14.5 14.5 0 0 1 5.41 5.411c.935 1.64 1.417 3.58 1.66 6.29.244 2.717.245 6.16.245 10.794v10.2c0 4.635 0 8.078-.244 10.796-.244 2.71-.726 4.65-1.66 6.289a14.5 14.5 0 0 1-5.412 5.41c-1.639.936-3.579 1.418-6.289 1.661-2.717.244-6.16.244-10.795.244H24.9c-4.635 0-8.078 0-10.795-.244-2.71-.243-4.65-.725-6.29-1.66a14.5 14.5 0 0 1-5.41-5.411c-.935-1.64-1.417-3.58-1.66-6.29C.5 43.178.5 39.734.5 35.1V24.9Z"/><path fill="#FF974C" stroke="#fff" stroke-width="2" d="M19 52c5.523 0 10-4.477 10-10s-4.477-10-10-10S9 36.477 9 42s4.477 10 10 10Z"/><path fill="#fff" fill-rule="evenodd" d="M42.844 8.326a1 1 0 0 0-1.687 0L28.978 27.463A1 1 0 0 0 29.822 29h24.357a1 1 0 0 0 .843-1.537L42.844 8.326Z" clip-rule="evenodd"/><path fill="#FF974C" fill-rule="evenodd" d="M42.335 11.646c.324.115.571.504 1.066 1.28l7.332 11.523c.562.883.843 1.325.792 1.69a1 1 0 0 1-.342.623c-.28.238-.803.238-1.85.238H34.667c-1.047 0-1.57 0-1.85-.238a1 1 0 0 1-.342-.623c-.051-.365.23-.806.792-1.69l7.332-11.523c.495-.776.742-1.165 1.066-1.28a1 1 0 0 1 .67 0ZM35 27a7 7 0 0 0 7-7 7 7 0 0 0 7 7H35Z" clip-rule="evenodd"/><path fill="#FF974C" stroke="#fff" stroke-width="2" d="M10.106 9.357c-.109.32-.107.682-.106.975V25.668c-.001.293-.003.654.106.975a2 2 0 0 0 1.251 1.25c.32.11.682.108.975.107H19c5.523 0 10-4.477 10-10S24.523 8 19 8h-6.668c-.293-.001-.654-.003-.975.106a2 2 0 0 0-1.25 1.251Z"/><circle cx="19" cy="18" r="4" fill="#EB8B47" stroke="#fff" stroke-width="2"/><circle cx="19" cy="41.999" r="4" fill="#EB8B47" stroke="#fff" stroke-width="2"/></g><defs><clipPath id="o"><path fill="#fff" d="M0 0h60v60H0z"/></clipPath></defs></svg>`,
    SEARCH_ICON: (0, _litHtml.svg)`<svg width="20" height="21"><path fill-rule="evenodd" clip-rule="evenodd" d="M12.432 13.992c-.354-.353-.91-.382-1.35-.146a5.5 5.5 0 1 1 2.265-2.265c-.237.441-.208.997.145 1.35l3.296 3.296a.75.75 0 1 1-1.06 1.061l-3.296-3.296Zm.06-5a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z" fill="#949E9E"/></svg>`,
    HELP_ICON: (0, _litHtml.svg)`<svg width="11" height="17" viewBox="0 0 11 17"><path fill="#fff" d="M5.22 2.97c-1.07 0-2.25.843-2.25 2.25a.75.75 0 0 1-1.5 0c0-2.393 2.019-3.75 3.75-3.75 1.73 0 3.75 1.357 3.75 3.75 0 1.64-1.038 2.466-1.785 3.057-.802.635-1.215.984-1.215 1.693a.75.75 0 1 1-1.5 0c0-1.466.985-2.24 1.681-2.788l.103-.081C7.007 6.504 7.47 6.08 7.47 5.22c0-1.407-1.181-2.25-2.25-2.25ZM5.22 14.97a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5Z"/></svg>`,
    WALLET_ICON: (0, _litHtml.svg)`<svg width="15" height="14" fill="none" viewBox="0 0 15 14"><path fill="#fff" fill-rule="evenodd" d="M.64 9.2v-3h.001c.009-1.857.07-2.886.525-3.682a4 4 0 0 1 1.492-1.493C3.58.5 4.813.5 7.28.5h3.735c.58 0 .871 0 1.114.04A3 3 0 0 1 14.6 3.011c.04.243.04.533.04 1.114 0 .58 0 .871-.04 1.114a3 3 0 0 1-2.471 2.47c-.243.041-.533.041-1.114.041h-.777c.178.307.302.648.362 1.011.04.243.04.533.04 1.114 0 .58 0 .871-.04 1.114a3 3 0 0 1-2.471 2.47c-.243.041-.533.041-1.114.041H4.507A3.867 3.867 0 0 1 .64 9.633V9.2ZM7.28 2h3.735c.64 0 .779.005.87.02a1.5 1.5 0 0 1 1.235 1.236c.015.09.02.229.02.869s-.005.779-.02.87a1.5 1.5 0 0 1-1.236 1.235c-.09.015-.229.02-.869.02H4.023c-.697 0-1.345.21-1.883.572V6.25h.001c.004-.791.015-1.383.059-1.867.056-.629.157-.926.269-1.122a2.5 2.5 0 0 1 .932-.933c.197-.111.494-.212 1.123-.268C5.173 2 6.019 2 7.28 2Zm-.265 5.75H4.023c-1.04 0-1.883.843-1.883 1.883A2.367 2.367 0 0 0 4.507 12h2.508c.64 0 .779-.005.87-.02a1.5 1.5 0 0 0 1.235-1.236c.015-.09.02-.229.02-.869s-.005-.779-.02-.87A1.5 1.5 0 0 0 7.884 7.77c-.09-.015-.228-.02-.869-.02Z" clip-rule="evenodd"/></svg>`,
    NETWORK_PLACEHOLDER: (0, _litHtml.svg)`<svg width="28" height="28" fill="none" viewBox="0 0 28 28"><mask id="p" width="26" height="28" x="1" y="0" maskUnits="userSpaceOnUse" style="mask-type:alpha"><path fill="#D9D9D9" d="M12 1.172a4 4 0 0 1 4 0l8.124 4.69a4 4 0 0 1 2 3.465v9.381a4 4 0 0 1-2 3.464L16 26.862a4 4 0 0 1-4 0l-8.124-4.69a4 4 0 0 1-2-3.464V9.327a4 4 0 0 1 2-3.464L12 1.173Z"/></mask><g mask="url(#p)"><path id="network-placeholder-fill" fill="#fff" d="M0 0h28v28H0z"/><path id="network-placeholder-dash" stroke="#000" stroke-dasharray="2 2" d="m8.953 2.931 2.032-1.173.25.433 1.015-.586c.269-.155.553-.271.844-.35l-.13-.483a4.003 4.003 0 0 1 2.071 0l-.13.483c.293.079.576.195.845.35l1.016.586.25-.433 2.03 1.173-.25.433 2.032 1.173.25-.433 2.03 1.172-.25.433 1.016.587c.269.155.512.342.725.556l.354-.354a4.003 4.003 0 0 1 1.035 1.794l-.483.129c.078.292.12.596.12.906v1.172h.5v2.346h-.5v2.345h.5v2.345h-.5v1.173c0 .31-.042.614-.12.906l.483.13a4.003 4.003 0 0 1-1.035 1.793l-.354-.354a3.498 3.498 0 0 1-.725.556l-1.015.586.25.434-2.031 1.172-.25-.433-2.031 1.173.25.433-2.031 1.172-.25-.433-1.016.587a3.494 3.494 0 0 1-.844.35l.13.482a4.003 4.003 0 0 1-2.071 0l.13-.483a3.496 3.496 0 0 1-.845-.35l-1.015-.586-.25.433-2.032-1.172.25-.433-2.03-1.173-.25.433L4.89 22.76l.25-.434-1.015-.586a3.498 3.498 0 0 1-.725-.556l-.354.354a4.003 4.003 0 0 1-1.035-1.794l.483-.13a3.497 3.497 0 0 1-.12-.905v-1.173h-.5V15.19h.5v-2.345h-.5v-2.346h.5V9.327c0-.31.042-.614.12-.906l-.483-.13a4.003 4.003 0 0 1 1.035-1.793l.354.354c.213-.214.456-.401.725-.556l1.015-.587-.25-.433 2.031-1.172.25.433 2.031-1.173-.25-.433Z"/><path fill="#798686" stroke="#fff" d="M14.243 13.563 14 13.428l-.243.135-6.388 3.549-.024.013c-.432.24-.79.44-1.053.622-.266.184-.516.405-.636.722a1.5 1.5 0 0 0 0 1.062c.12.317.37.538.636.722.263.183.62.382 1.053.622l.024.013 3.164 1.758.088.049c1.164.646 1.857 1.032 2.607 1.162.51.09 1.033.09 1.544 0 .75-.13 1.443-.516 2.606-1.162l.09-.05 3.163-1.757.024-.013c.432-.24.79-.44 1.053-.622.266-.184.516-.405.636-.722l-.468-.177.468.177a1.5 1.5 0 0 0 0-1.062l-.468.177.468-.177c-.12-.317-.37-.538-.636-.722-.263-.183-.62-.382-1.053-.622l-.024-.013-6.388-3.55Z"/><path fill="#9EA9A9" stroke="#fff" d="M14.243 8.563 14 8.428l-.243.135-6.388 3.549-.024.013c-.432.24-.79.44-1.053.622-.266.184-.516.405-.636.722a1.5 1.5 0 0 0 0 1.062c.12.316.37.537.636.722.263.183.62.382 1.053.622l.024.013 3.164 1.758.088.049c1.164.646 1.857 1.032 2.607 1.162.51.09 1.033.09 1.544 0 .75-.13 1.443-.516 2.606-1.162l.09-.05 3.163-1.757.024-.013c.432-.24.79-.44 1.053-.622.266-.184.516-.405.636-.722l-.468-.177.468.177a1.5 1.5 0 0 0 0-1.062l-.468.177.468-.177c-.12-.316-.37-.537-.636-.722-.263-.183-.62-.382-1.053-.622l-.024-.013-6.388-3.55Z"/><path fill="#C9CFCF" stroke="#fff" d="m22.344 9.53-.468-.176.468.177a1.5 1.5 0 0 0 0-1.062l-.468.177.468-.177c-.12-.317-.37-.537-.636-.722-.263-.183-.62-.382-1.053-.622l-.024-.013-3.163-1.758-.09-.05c-1.163-.645-1.856-1.03-2.606-1.161a4.5 4.5 0 0 0-1.544 0c-.75.13-1.443.516-2.607 1.162l-.088.05-3.164 1.757-.024.013c-.432.24-.79.44-1.053.622-.266.185-.516.405-.636.722a1.5 1.5 0 0 0 0 1.062c.12.317.37.537.636.722.263.183.62.382 1.053.622l.024.013 3.164 1.758.088.049c1.164.646 1.857 1.032 2.607 1.162.51.09 1.033.09 1.544 0 .75-.13 1.443-.516 2.606-1.162l.09-.05 3.163-1.757.024-.013c.432-.24.79-.44 1.053-.622.266-.184.516-.405.636-.722Z"/></g></svg>`,
    WALLET_PLACEHOLDER: (0, _litHtml.svg)`<svg width="60" height="60" fill="none" viewBox="0 0 60 60"><g clip-path="url(#q)"><path id="wallet-placeholder-fill" fill="#fff" d="M0 24.9c0-9.251 0-13.877 1.97-17.332a15 15 0 0 1 5.598-5.597C11.023 0 15.648 0 24.9 0h10.2c9.252 0 13.877 0 17.332 1.97a15 15 0 0 1 5.597 5.598C60 11.023 60 15.648 60 24.9v10.2c0 9.252 0 13.877-1.97 17.332a15.001 15.001 0 0 1-5.598 5.597C48.977 60 44.352 60 35.1 60H24.9c-9.251 0-13.877 0-17.332-1.97a15 15 0 0 1-5.597-5.598C0 48.977 0 44.352 0 35.1V24.9Z"/><path id="wallet-placeholder-dash" stroke="#000" stroke-dasharray="4 4" stroke-width="1.5" d="M.04 41.708a231.598 231.598 0 0 1-.039-4.403l.75-.001L.75 35.1v-2.55H0v-5.1h.75V24.9l.001-2.204h-.75c.003-1.617.011-3.077.039-4.404l.75.016c.034-1.65.099-3.08.218-4.343l-.746-.07c.158-1.678.412-3.083.82-4.316l.713.236c.224-.679.497-1.296.827-1.875a14.25 14.25 0 0 1 1.05-1.585L3.076 5.9A15 15 0 0 1 5.9 3.076l.455.596a14.25 14.25 0 0 1 1.585-1.05c.579-.33 1.196-.603 1.875-.827l-.236-.712C10.812.674 12.217.42 13.895.262l.07.746C15.23.89 16.66.824 18.308.79l-.016-.75C19.62.012 21.08.004 22.695.001l.001.75L24.9.75h2.55V0h5.1v.75h2.55l2.204.001v-.75c1.617.003 3.077.011 4.404.039l-.016.75c1.65.034 3.08.099 4.343.218l.07-.746c1.678.158 3.083.412 4.316.82l-.236.713c.679.224 1.296.497 1.875.827a14.24 14.24 0 0 1 1.585 1.05l.455-.596A14.999 14.999 0 0 1 56.924 5.9l-.596.455c.384.502.735 1.032 1.05 1.585.33.579.602 1.196.827 1.875l.712-.236c.409 1.233.663 2.638.822 4.316l-.747.07c.119 1.264.184 2.694.218 4.343l.75-.016c.028 1.327.036 2.787.039 4.403l-.75.001.001 2.204v2.55H60v5.1h-.75v2.55l-.001 2.204h.75a231.431 231.431 0 0 1-.039 4.404l-.75-.016c-.034 1.65-.099 3.08-.218 4.343l.747.07c-.159 1.678-.413 3.083-.822 4.316l-.712-.236a10.255 10.255 0 0 1-.827 1.875 14.242 14.242 0 0 1-1.05 1.585l.596.455a14.997 14.997 0 0 1-2.824 2.824l-.455-.596c-.502.384-1.032.735-1.585 1.05-.579.33-1.196.602-1.875.827l.236.712c-1.233.409-2.638.663-4.316.822l-.07-.747c-1.264.119-2.694.184-4.343.218l.016.75c-1.327.028-2.787.036-4.403.039l-.001-.75-2.204.001h-2.55V60h-5.1v-.75H24.9l-2.204-.001v.75a231.431 231.431 0 0 1-4.404-.039l.016-.75c-1.65-.034-3.08-.099-4.343-.218l-.07.747c-1.678-.159-3.083-.413-4.316-.822l.236-.712a10.258 10.258 0 0 1-1.875-.827 14.252 14.252 0 0 1-1.585-1.05l-.455.596A14.999 14.999 0 0 1 3.076 54.1l.596-.455a14.24 14.24 0 0 1-1.05-1.585 10.259 10.259 0 0 1-.827-1.875l-.712.236C.674 49.188.42 47.783.262 46.105l.746-.07C.89 44.77.824 43.34.79 41.692l-.75.016Z"/><path fill="#fff" fill-rule="evenodd" d="M35.643 32.145c-.297-.743-.445-1.114-.401-1.275a.42.42 0 0 1 .182-.27c.134-.1.463-.1 1.123-.1.742 0 1.499.046 2.236-.05a6 6 0 0 0 5.166-5.166c.051-.39.051-.855.051-1.784 0-.928 0-1.393-.051-1.783a6 6 0 0 0-5.166-5.165c-.39-.052-.854-.052-1.783-.052h-7.72c-4.934 0-7.401 0-9.244 1.051a8 8 0 0 0-2.985 2.986C16.057 22.28 16.003 24.58 16 29 15.998 31.075 16 33.15 16 35.224A7.778 7.778 0 0 0 23.778 43H28.5c1.394 0 2.09 0 2.67-.116a6 6 0 0 0 4.715-4.714c.115-.58.115-1.301.115-2.744 0-1.31 0-1.964-.114-2.49a4.998 4.998 0 0 0-.243-.792Z" clip-rule="evenodd"/><path fill="#9EA9A9" fill-rule="evenodd" d="M37 18h-7.72c-2.494 0-4.266.002-5.647.126-1.361.122-2.197.354-2.854.728a6.5 6.5 0 0 0-2.425 2.426c-.375.657-.607 1.492-.729 2.853-.11 1.233-.123 2.777-.125 4.867 0 .7 0 1.05.097 1.181.096.13.182.181.343.2.163.02.518-.18 1.229-.581a6.195 6.195 0 0 1 3.053-.8H37c.977 0 1.32-.003 1.587-.038a4.5 4.5 0 0 0 3.874-3.874c.036-.268.039-.611.039-1.588 0-.976-.003-1.319-.038-1.587a4.5 4.5 0 0 0-3.875-3.874C38.32 18.004 37.977 18 37 18Zm-7.364 12.5h-7.414a4.722 4.722 0 0 0-4.722 4.723 6.278 6.278 0 0 0 6.278 6.278H28.5c1.466 0 1.98-.008 2.378-.087a4.5 4.5 0 0 0 3.535-3.536c.08-.397.087-.933.087-2.451 0-1.391-.009-1.843-.08-2.17a3.5 3.5 0 0 0-2.676-2.676c-.328-.072-.762-.08-2.108-.08Z" clip-rule="evenodd"/></g><defs><clipPath id="q"><path fill="#fff" d="M0 0h60v60H0z"/></clipPath></defs></svg>`,
    TOKEN_PLACEHOLDER: (0, _litHtml.svg)`<svg width="60" height="60" viewBox="0 0 60 60" fill="none"><rect id="token-placeholder-fill" width="58" height="58" x="1" y="1" fill="#fff" rx="29"/><path fill="#3B4040" stroke="#fff" stroke-width="2" d="M32 10a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v5.566c0 .357.192.685.495.875a16.001 16.001 0 0 1 4.256 3.894c.667.88.33 2.113-.627 2.665l-2.494 1.44c-.956.552-2.166.204-2.913-.609a9.12 9.12 0 1 0 .064 12.267c.739-.82 1.945-1.181 2.907-.64l2.509 1.415c.962.542 1.312 1.77.654 2.658a16 16 0 0 1-4.356 4.028c-.303.19-.495.518-.495.875V50a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2v-2.992c0-.602-.528-1.065-1.13-1.032-.579.032-1.16.032-1.74 0-.602-.032-1.13.43-1.13 1.032V50a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2v-5.566c0-.357-.192-.685-.495-.875a16 16 0 0 1 0-27.118c.303-.19.495-.517.495-.875V10a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2.992c0 .601.528 1.064 1.13 1.032.58-.032 1.161-.032 1.74 0 .602.033 1.13-.43 1.13-1.032V10Z"/><rect id="token-placeholder-dash" width="58" height="58" x="1" y="1" stroke="#000" stroke-dasharray="6 6" stroke-width="2" rx="29"/></svg>`,
    ACCOUNT_COPY: (0, _litHtml.svg)`<svg width="14" height="14" fill="none" viewBox="0 0 14 14"><path fill="#fff" fill-rule="evenodd" d="M4.003 4.005c.012-1.225.074-1.936.391-2.491a3 3 0 0 1 1.12-1.12C6.204 0 7.136 0 9 0s2.795 0 3.486.394a3 3 0 0 1 1.12 1.12C14 2.204 14 3.136 14 5s0 2.795-.394 3.486a3 3 0 0 1-1.12 1.12c-.555.317-1.266.379-2.491.391l.002.003c-.012 1.222-.075 1.932-.391 2.486a3 3 0 0 1-1.12 1.12C7.796 14 6.864 14 5 14s-2.795 0-3.486-.394a3 3 0 0 1-1.12-1.12C0 11.796 0 10.864 0 9s0-2.795.394-3.486a3 3 0 0 1 1.12-1.12c.554-.316 1.264-.379 2.486-.391l.003.002ZM9 8.5c-.959 0-1.58-.001-2.05-.043-.45-.04-.613-.109-.693-.154a1.5 1.5 0 0 1-.56-.56c-.045-.08-.113-.243-.154-.693C5.501 6.58 5.5 5.959 5.5 5c0-.959.001-1.58.043-2.05.04-.45.109-.613.154-.693a1.5 1.5 0 0 1 .56-.56c.08-.045.243-.113.693-.154C7.42 1.501 8.041 1.5 9 1.5c.959 0 1.58.001 2.05.043.45.04.613.109.693.154a1.5 1.5 0 0 1 .56.56c.045.08.113.243.154.693.042.47.043 1.091.043 2.05 0 .959-.001 1.58-.043 2.05-.04.45-.109.613-.154.693a1.5 1.5 0 0 1-.56.56c-.08.045-.242.113-.693.154-.47.042-1.091.043-2.05.043ZM4 5.503a13.77 13.77 0 0 0-1.05.04c-.45.04-.613.109-.693.154a1.5 1.5 0 0 0-.56.56c-.045.08-.113.243-.154.693C1.501 7.42 1.5 8.041 1.5 9c0 .959.001 1.58.043 2.05.04.45.109.613.154.693a1.5 1.5 0 0 0 .56.56c.08.045.243.113.693.154.47.042 1.091.043 2.05.043.959 0 1.58-.001 2.05-.043.45-.04.613-.109.693-.154a1.5 1.5 0 0 0 .56-.56c.045-.08.113-.242.154-.693.025-.283.035-.619.04-1.05-1.534-.003-2.358-.037-2.983-.394a3 3 0 0 1-1.12-1.12c-.357-.625-.39-1.449-.394-2.983Z" clip-rule="evenodd"/></svg>`,
    ACCOUNT_DISCONNECT: (0, _litHtml.svg)`<svg width="16" height="14" fill="none" viewBox="0 0 16 14"><path fill="#fff" d="M9.677 1.5h-2.61c-1.261 0-2.107.001-2.757.06-.629.056-.926.157-1.122.268a2.5 2.5 0 0 0-.933.933c-.112.196-.212.493-.269 1.122-.058.65-.06 1.496-.06 2.757v.72c0 1.26.002 2.107.06 2.756.057.63.157.927.27 1.123a2.5 2.5 0 0 0 .932.933c.196.111.493.212 1.122.268.65.059 1.496.06 2.757.06h2.61a.75.75 0 1 1 0 1.5h-2.61c-2.467 0-3.7 0-4.622-.525a4 4 0 0 1-1.493-1.493C.427 11.06.427 9.827.427 7.36v-.72c0-2.467 0-3.7.525-4.622A4 4 0 0 1 2.445.525C3.366 0 4.6 0 7.067 0h2.61a.75.75 0 1 1 0 1.5Z"/><path fill="#fff" d="M10.896 11.03a.75.75 0 0 1 0-1.06l1.793-1.793a.25.25 0 0 0-.176-.427H8.177a.75.75 0 0 1 0-1.5h4.336a.25.25 0 0 0 .176-.427L10.896 4.03a.75.75 0 0 1 1.061-1.06l3.323 3.323a1 1 0 0 1 0 1.414l-3.323 3.323a.75.75 0 0 1-1.06 0Z"/></svg>`,
    GLOBE_ICON: (0, _litHtml.svg)`<svg width="16" height="16" fill="none" viewBox="0 0 16 16"><path fill="#fff" fill-rule="evenodd" d="M15.5 8a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0Zm-2.113.75c.301 0 .535.264.47.558a6.01 6.01 0 0 1-2.867 3.896c-.203.116-.42-.103-.334-.32.409-1.018.691-2.274.797-3.657a.512.512 0 0 1 .507-.477h1.427Zm.47-2.058c.065.294-.169.558-.47.558H11.96a.512.512 0 0 1-.507-.477c-.106-1.383-.389-2.638-.797-3.656-.087-.217.13-.437.333-.32a6.01 6.01 0 0 1 2.868 3.895Zm-4.402.558c.286 0 .515-.24.49-.525-.121-1.361-.429-2.534-.83-3.393-.279-.6-.549-.93-.753-1.112a.535.535 0 0 0-.724 0c-.204.182-.474.513-.754 1.112-.4.859-.708 2.032-.828 3.393a.486.486 0 0 0 .49.525h2.909Zm-5.415 0c.267 0 .486-.21.507-.477.106-1.383.389-2.638.797-3.656.087-.217-.13-.437-.333-.32a6.01 6.01 0 0 0-2.868 3.895c-.065.294.169.558.47.558H4.04ZM2.143 9.308c-.065-.294.169-.558.47-.558H4.04c.267 0 .486.21.507.477.106 1.383.389 2.639.797 3.657.087.217-.13.436-.333.32a6.01 6.01 0 0 1-2.868-3.896Zm3.913-.033a.486.486 0 0 1 .49-.525h2.909c.286 0 .515.24.49.525-.121 1.361-.428 2.535-.83 3.394-.279.6-.549.93-.753 1.112a.535.535 0 0 1-.724 0c-.204-.182-.474-.513-.754-1.112-.4-.859-.708-2.033-.828-3.394Z" clip-rule="evenodd"/></svg>`
  },
  po = (0, _lit.css)`.w3m-toolbar-placeholder{top:0;bottom:0;left:0;right:0;width:100%;position:absolute;display:block;pointer-events:none;height:100px;border-radius:calc(var(--w3m-background-border-radius) * .9);background-color:var(--w3m-background-color);background-image:var(--w3m-background-image-url);background-position:center;background-size:cover}.w3m-toolbar{height:38px;display:flex;position:relative;margin:5px 15px 5px 5px;justify-content:space-between;align-items:center}.w3m-toolbar img,.w3m-toolbar svg{height:28px;object-position:left center;object-fit:contain}#w3m-wc-logo path{fill:var(--w3m-accent-fill-color)}button{width:28px;height:28px;border-radius:var(--w3m-icon-button-border-radius);border:0;display:flex;justify-content:center;align-items:center;cursor:pointer;background-color:var(--w3m-color-bg-1);box-shadow:0 0 0 1px var(--w3m-color-overlay)}button:active{background-color:var(--w3m-color-bg-2)}button svg{display:block;object-position:center}button path{fill:var(--w3m-color-fg-1)}.w3m-toolbar div{display:flex}.w3m-toolbar div button:first-child{margin-right:16px}.w3m-help-active button:first-child{background-color:var(--w3m-color-fg-1)}.w3m-help-active button:first-child path{fill:var(--w3m-color-bg-1)}@media(hover:hover){button:hover{background-color:var(--w3m-color-bg-2)}}`;
var wo = Object.defineProperty,
  go = Object.getOwnPropertyDescriptor,
  Ie = (t, e, a, r) => {
    for (var o = r > 1 ? void 0 : r ? go(e, a) : e, i = t.length - 1, l; i >= 0; i--) (l = t[i]) && (o = (r ? l(e, a, o) : l(o)) || o);
    return r && o && wo(e, a, o), o;
  };
let Pt = class extends _lit.LitElement {
  constructor() {
    super(), this.isHelp = !1, this.unsubscribeRouter = void 0, this.unsubscribeRouter = _core.RouterCtrl.subscribe(t => {
      this.isHelp = t.view === "Help";
    });
  }
  disconnectedCallback() {
    var t;
    (t = this.unsubscribeRouter) == null || t.call(this);
  }
  onHelp() {
    _core.RouterCtrl.push("Help");
  }
  logoTemplate() {
    var t;
    const e = (t = _core.ThemeCtrl.state.themeVariables) == null ? void 0 : t["--w3m-logo-image-url"];
    return e ? (0, _lit.html)`<img src="${e}">` : d.WALLET_CONNECT_LOGO;
  }
  render() {
    const t = {
      "w3m-help-active": this.isHelp
    };
    return (0, _lit.html)`<div class="w3m-toolbar-placeholder"></div><div class="w3m-toolbar">${this.logoTemplate()}<div class="${(0, _classMap.classMap)(t)}"><button @click="${this.onHelp}">${d.HELP_ICON}</button> <button @click="${_core.ModalCtrl.close}">${d.CROSS_ICON}</button></div></div>`;
  }
};
Pt.styles = [w.globalCss, po], Ie([(0, _decorators.state)()], Pt.prototype, "isHelp", 2), Pt = Ie([(0, _decorators.customElement)("w3m-modal-backcard")], Pt);
const uo = (0, _lit.css)`main{padding:20px;padding-top:0;width:100%}`;
var vo = Object.defineProperty,
  bo = Object.getOwnPropertyDescriptor,
  fo = (t, e, a, r) => {
    for (var o = r > 1 ? void 0 : r ? bo(e, a) : e, i = t.length - 1, l; i >= 0; i--) (l = t[i]) && (o = (r ? l(e, a, o) : l(o)) || o);
    return r && o && vo(e, a, o), o;
  };
let Yt = class extends _lit.LitElement {
  render() {
    return (0, _lit.html)`<main><slot></slot></main>`;
  }
};
Yt.styles = [w.globalCss, uo], Yt = fo([(0, _decorators.customElement)("w3m-modal-content")], Yt);
const xo = (0, _lit.css)`footer{padding:10px;display:flex;flex-direction:column;align-items:inherit;justify-content:inherit;border-top:1px solid var(--w3m-color-bg-2)}`;
var yo = Object.defineProperty,
  Co = Object.getOwnPropertyDescriptor,
  $o = (t, e, a, r) => {
    for (var o = r > 1 ? void 0 : r ? Co(e, a) : e, i = t.length - 1, l; i >= 0; i--) (l = t[i]) && (o = (r ? l(e, a, o) : l(o)) || o);
    return r && o && yo(e, a, o), o;
  };
let Qt = class extends _lit.LitElement {
  render() {
    return (0, _lit.html)`<footer><slot></slot></footer>`;
  }
};
Qt.styles = [w.globalCss, xo], Qt = $o([(0, _decorators.customElement)("w3m-modal-footer")], Qt);
const ko = (0, _lit.css)`header{display:flex;justify-content:center;align-items:center;padding:20px;position:relative}.w3m-border{border-bottom:1px solid var(--w3m-color-bg-2);margin-bottom:20px}header button{padding:15px 20px}header button:active{opacity:.5}@media(hover:hover){header button:hover{opacity:.5}}.w3m-back-btn{position:absolute;left:0}.w3m-action-btn{position:absolute;right:0}path{fill:var(--w3m-accent-color)}`;
var Oo = Object.defineProperty,
  Io = Object.getOwnPropertyDescriptor,
  bt = (t, e, a, r) => {
    for (var o = r > 1 ? void 0 : r ? Io(e, a) : e, i = t.length - 1, l; i >= 0; i--) (l = t[i]) && (o = (r ? l(e, a, o) : l(o)) || o);
    return r && o && Oo(e, a, o), o;
  };
let Y = class extends _lit.LitElement {
  constructor() {
    super(...arguments), this.title = "", this.onAction = void 0, this.actionIcon = void 0, this.border = !1;
  }
  backBtnTemplate() {
    return (0, _lit.html)`<button class="w3m-back-btn" @click="${_core.RouterCtrl.goBack}">${d.BACK_ICON}</button>`;
  }
  actionBtnTemplate() {
    return (0, _lit.html)`<button class="w3m-action-btn" @click="${this.onAction}">${this.actionIcon}</button>`;
  }
  render() {
    const t = {
        "w3m-border": this.border
      },
      e = _core.RouterCtrl.state.history.length > 1,
      a = this.title ? (0, _lit.html)`<w3m-text variant="big-bold">${this.title}</w3m-text>` : (0, _lit.html)`<slot></slot>`;
    return (0, _lit.html)`<header class="${(0, _classMap.classMap)(t)}">${e ? this.backBtnTemplate() : null} ${a} ${this.onAction ? this.actionBtnTemplate() : null}</header>`;
  }
};
Y.styles = [w.globalCss, ko], bt([(0, _decorators.property)()], Y.prototype, "title", 2), bt([(0, _decorators.property)()], Y.prototype, "onAction", 2), bt([(0, _decorators.property)()], Y.prototype, "actionIcon", 2), bt([(0, _decorators.property)()], Y.prototype, "border", 2), Y = bt([(0, _decorators.customElement)("w3m-modal-header")], Y);
const Eo = {
    1: "692ed6ba-e569-459a-556a-776476829e00",
    42161: "600a9a04-c1b9-42ca-6785-9b4b6ff85200",
    43114: "30c46e53-e989-45fb-4549-be3bd4eb3b00",
    56: "93564157-2e8e-4ce7-81df-b264dbee9b00",
    250: "06b26297-fe0c-4733-5d6b-ffa5498aac00",
    10: "ab9c186a-c52f-464b-2906-ca59d760a400",
    137: "41d04d42-da3b-4453-8506-668cc0727900",
    100: "02b53f6a-e3d4-479e-1cb4-21178987d100",
    9001: "f926ff41-260d-4028-635e-91913fc28e00",
    324: "b310f07f-4ef7-49f3-7073-2a0a39685800",
    314: "5a73b3dd-af74-424e-cae0-0de859ee9400",
    4689: "34e68754-e536-40da-c153-6ef2e7188a00",
    1088: "3897a66d-40b9-4833-162f-a2c90531c900",
    1284: "161038da-44ae-4ec7-1208-0ea569454b00",
    1285: "f1d73bb6-5450-4e18-38f7-fb6484264a00"
  },
  Wo = {
    ETH: {
      icon: "692ed6ba-e569-459a-556a-776476829e00"
    },
    WETH: {
      icon: "692ed6ba-e569-459a-556a-776476829e00"
    },
    AVAX: {
      icon: "30c46e53-e989-45fb-4549-be3bd4eb3b00"
    },
    FTM: {
      icon: "06b26297-fe0c-4733-5d6b-ffa5498aac00"
    },
    BNB: {
      icon: "93564157-2e8e-4ce7-81df-b264dbee9b00"
    },
    MATIC: {
      icon: "41d04d42-da3b-4453-8506-668cc0727900"
    },
    OP: {
      icon: "ab9c186a-c52f-464b-2906-ca59d760a400"
    },
    xDAI: {
      icon: "02b53f6a-e3d4-479e-1cb4-21178987d100"
    },
    EVMOS: {
      icon: "f926ff41-260d-4028-635e-91913fc28e00"
    },
    METIS: {
      icon: "3897a66d-40b9-4833-162f-a2c90531c900"
    },
    IOTX: {
      icon: "34e68754-e536-40da-c153-6ef2e7188a00"
    }
  },
  Z = {
    externalWallets() {
      const {
        isStandalone: t
      } = _core.OptionsCtrl.state;
      if (t) return [];
      let e = _core.ClientCtrl.client().getConnectors();
      return e = e.filter(a => a.id !== "injected"), e;
    },
    manualWallets() {
      var t, e;
      const {
          mobileWallets: a,
          desktopWallets: r
        } = _core.ConfigCtrl.state,
        o = (t = Z.recentWallet()) == null ? void 0 : t.id,
        i = _core.CoreUtil.isMobile() ? a : r,
        l = i?.filter(p => o !== p.id);
      return (e = _core.CoreUtil.isMobile() ? l?.map(({
        id: p,
        name: u,
        links: f
      }) => ({
        id: p,
        name: u,
        mobile: f,
        links: f
      })) : l?.map(({
        id: p,
        name: u,
        links: f
      }) => ({
        id: p,
        name: u,
        desktop: f,
        links: f
      }))) != null ? e : [];
    },
    installedInjectedWallets() {
      const {
        isStandalone: t
      } = _core.OptionsCtrl.state;
      if (t) return [];
      if (!_core.ClientCtrl.client().isInjectedProviderInstalled()) return [];
      const {
          namespace: e
        } = _core.ClientCtrl.client(),
        {
          injectedWallets: a
        } = _core.ExplorerCtrl.state;
      let r = a.filter(({
        injected: o
      }) => !!o.some(i => _core.ClientCtrl.client().safeCheckInjectedProvider(i.injected_id) && i.namespace === e));
      return r.length > 1 && (r = r.filter(({
        injected: o
      }) => !!o.map(({
        injected_id: i
      }) => i).every(i => i !== "isMetaMask"))), r.length ? r : [{
        name: "Browser",
        id: "browser",
        image_id: void 0
      }];
    },
    injectedWallets() {
      const {
          isStandalone: t
        } = _core.OptionsCtrl.state,
        {
          explorerExcludedWalletIds: e,
          explorerRecommendedWalletIds: a
        } = _core.ConfigCtrl.state,
        r = _core.CoreUtil.isMobile();
      if (t || e === "ALL" || r) return [];
      const {
          namespace: o
        } = _core.ClientCtrl.client(),
        {
          injectedWallets: i
        } = _core.ExplorerCtrl.state;
      return i.filter(({
        id: l,
        injected: p
      }) => {
        const u = _core.CoreUtil.isArray(e) ? e : [],
          f = _core.CoreUtil.isArray(a) ? a : [];
        return !!p.some(j => j.namespace === o && !u.includes(l) && !f.includes(l));
      });
    },
    recentWallet() {
      return s.getRecentWallet();
    },
    recomendedWallets(t = !1) {
      var e;
      const a = Z.installedInjectedWallets().map(({
          id: l
        }) => l),
        r = t || (e = Z.recentWallet()) == null ? void 0 : e.id,
        o = [...a, r],
        {
          recomendedWallets: i
        } = _core.ExplorerCtrl.state;
      return i.filter(l => !o.includes(l.id));
    }
  },
  s = {
    MOBILE_BREAKPOINT: 600,
    W3M_RECENT_WALLET_DATA: "W3M_RECENT_WALLET_DATA",
    EXPLORER_WALLET_URL: "https://explorer.walletconnect.com/?type=wallet",
    rejectStandaloneButtonComponent() {
      const {
        isStandalone: t
      } = _core.OptionsCtrl.state;
      if (t) throw new Error("Web3Modal button components are not available in standalone mode.");
    },
    getShadowRootElement(t, e) {
      const a = t.renderRoot.querySelector(e);
      if (!a) throw new Error(`${e} not found`);
      return a;
    },
    getWalletIcon({
      id: t,
      image_id: e
    }) {
      const {
        walletImages: a
      } = _core.ConfigCtrl.state;
      return a != null && a[t] ? a[t] : e ? _core.ExplorerCtrl.getWalletImageUrl(e) : "";
    },
    getWalletName(t, e = !1) {
      return e ? t.split(" ")[0] : t;
    },
    getChainIcon(t) {
      var e;
      const a = Eo[t],
        {
          projectId: r,
          chainImages: o
        } = _core.ConfigCtrl.state;
      return (e = o?.[t]) != null ? e : r && a ? _core.ExplorerCtrl.getAssetImageUrl(a) : "";
    },
    getTokenIcon(t) {
      var e, a;
      const r = (e = Wo[t]) == null ? void 0 : e.icon,
        {
          projectId: o,
          tokenImages: i
        } = _core.ConfigCtrl.state;
      return (a = i?.[t]) != null ? a : o && r ? _core.ExplorerCtrl.getAssetImageUrl(r) : "";
    },
    isMobileAnimation() {
      return window.innerWidth <= s.MOBILE_BREAKPOINT;
    },
    async preloadImage(t) {
      const e = new Promise((a, r) => {
        const o = new Image();
        o.onload = a, o.onerror = r, o.src = t;
      });
      return Promise.race([e, _core.CoreUtil.wait(3e3)]);
    },
    getErrorMessage(t) {
      return t instanceof Error ? t.message : "Unknown Error";
    },
    debounce(t, e = 500) {
      let a;
      return (...r) => {
        function o() {
          t(...r);
        }
        a && clearTimeout(a), a = setTimeout(o, e);
      };
    },
    handleMobileLinking(t) {
      const {
          standaloneUri: e
        } = _core.OptionsCtrl.state,
        {
          pairingUri: a
        } = _core.WcConnectionCtrl.state,
        {
          mobile: r,
          name: o
        } = t,
        i = r?.native,
        l = r?.universal;
      s.setRecentWallet(t);
      function p(u) {
        let f = "";
        i ? f = _core.CoreUtil.formatUniversalUrl(i, u, o) : l && (f = _core.CoreUtil.formatNativeUrl(l, u, o)), _core.CoreUtil.openHref(f, "_self");
      }
      p(e || a);
    },
    handleAndroidLinking() {
      const {
          standaloneUri: t
        } = _core.OptionsCtrl.state,
        {
          pairingUri: e
        } = _core.WcConnectionCtrl.state;
      t ? (_core.CoreUtil.setWalletConnectAndroidDeepLink(t), _core.CoreUtil.openHref(t, "_self")) : (_core.CoreUtil.setWalletConnectAndroidDeepLink(e), _core.CoreUtil.openHref(e, "_self"));
    },
    async handleUriCopy() {
      const {
          standaloneUri: t
        } = _core.OptionsCtrl.state,
        {
          pairingUri: e
        } = _core.WcConnectionCtrl.state;
      t ? await navigator.clipboard.writeText(t) : await navigator.clipboard.writeText(e), _core.ToastCtrl.openToast("Link copied", "success");
    },
    async handleConnectorConnection(t, e) {
      try {
        const {
          selectedChain: a
        } = _core.OptionsCtrl.state;
        await _core.ClientCtrl.client().connectConnector(t, a?.id), _core.ModalCtrl.close();
      } catch (a) {
        console.error(a), e ? e() : _core.ToastCtrl.openToast(s.getErrorMessage(a), "error");
      }
    },
    getCustomImageUrls() {
      const {
          chainImages: t,
          walletImages: e
        } = _core.ConfigCtrl.state,
        a = Object.values(t ?? {}),
        r = Object.values(e ?? {});
      return Object.values([...a, ...r]);
    },
    truncate(t, e = 8) {
      return t.length <= e ? t : `${t.substring(0, 4)}...${t.substring(t.length - 4)}`;
    },
    generateAvatarColors(t) {
      var e;
      const a = (e = t.match(/.{1,7}/g)) == null ? void 0 : e.splice(0, 5),
        r = [];
      a?.forEach(i => {
        let l = 0;
        for (let u = 0; u < i.length; u += 1) l = i.charCodeAt(u) + ((l << 5) - l), l = l & l;
        const p = [0, 0, 0];
        for (let u = 0; u < 3; u += 1) {
          const f = l >> u * 8 & 255;
          p[u] = f;
        }
        r.push(`rgb(${p[0]}, ${p[1]}, ${p[2]})`);
      });
      const o = document.querySelector(":root");
      if (o) {
        const i = {
          "--w3m-color-av-1": r[0],
          "--w3m-color-av-2": r[1],
          "--w3m-color-av-3": r[2],
          "--w3m-color-av-4": r[3],
          "--w3m-color-av-5": r[4]
        };
        Object.entries(i).forEach(([l, p]) => o.style.setProperty(l, p));
      }
    },
    setRecentWallet(t) {
      const {
        walletConnectVersion: e
      } = _core.OptionsCtrl.state;
      localStorage.setItem(s.W3M_RECENT_WALLET_DATA, JSON.stringify({
        [e]: t
      }));
    },
    getRecentWallet() {
      const t = localStorage.getItem(s.W3M_RECENT_WALLET_DATA);
      if (t) {
        const {
            walletConnectVersion: e
          } = _core.OptionsCtrl.state,
          a = JSON.parse(t);
        if (a[e]) return a[e];
      }
    },
    caseSafeIncludes(t, e) {
      return t.toUpperCase().includes(e.toUpperCase());
    },
    openWalletExplorerUrl() {
      _core.CoreUtil.openHref(s.EXPLORER_WALLET_URL, "_blank");
    },
    getCachedRouterWalletPlatforms() {
      const {
          id: t,
          desktop: e,
          mobile: a,
          injected: r
        } = _core.CoreUtil.getWalletRouterData(),
        o = Z.installedInjectedWallets(),
        i = !!(r != null && r.length),
        l = o.some(j => j.id === t),
        p = !!(e != null && e.native),
        u = !!(e != null && e.universal),
        f = !!(a != null && a.native) || !!(a != null && a.universal);
      return {
        isInjectedInstalled: l,
        isInjected: i,
        isDesktop: p,
        isMobile: f,
        isWeb: u
      };
    },
    goToConnectingView(t) {
      _core.RouterCtrl.setData({
        Wallet: t
      });
      const e = _core.CoreUtil.isMobile(),
        {
          isDesktop: a,
          isWeb: r,
          isMobile: o,
          isInjectedInstalled: i
        } = s.getCachedRouterWalletPlatforms();
      e ? i ? _core.RouterCtrl.push("InjectedConnecting") : o ? _core.RouterCtrl.push("MobileConnecting") : r ? _core.RouterCtrl.push("WebConnecting") : _core.RouterCtrl.push("InstallWallet") : i ? _core.RouterCtrl.push("InjectedConnecting") : a ? _core.RouterCtrl.push("DesktopConnecting") : r ? _core.RouterCtrl.push("WebConnecting") : o ? _core.RouterCtrl.push("MobileQrcodeConnecting") : _core.RouterCtrl.push("InstallWallet");
    }
  },
  Ao = (0, _lit.css)`.w3m-router{overflow:hidden;will-change:transform}.w3m-content{display:flex;flex-direction:column}`;
var jo = Object.defineProperty,
  Mo = Object.getOwnPropertyDescriptor,
  Xt = (t, e, a, r) => {
    for (var o = r > 1 ? void 0 : r ? Mo(e, a) : e, i = t.length - 1, l; i >= 0; i--) (l = t[i]) && (o = (r ? l(e, a, o) : l(o)) || o);
    return r && o && jo(e, a, o), o;
  };
let ft = class extends _lit.LitElement {
  constructor() {
    super(), this.view = _core.RouterCtrl.state.view, this.prevView = _core.RouterCtrl.state.view, this.unsubscribe = void 0, this.oldHeight = "0px", this.resizeObserver = void 0, this.unsubscribe = _core.RouterCtrl.subscribe(t => {
      this.view !== t.view && this.onChangeRoute();
    });
  }
  firstUpdated() {
    this.resizeObserver = new ResizeObserver(([t]) => {
      const e = `${t.contentRect.height}px`;
      this.oldHeight !== "0px" && (0, _motion.animate)(this.routerEl, {
        height: [this.oldHeight, e]
      }, {
        duration: .2
      }), this.oldHeight = e;
    }), this.resizeObserver.observe(this.contentEl);
  }
  disconnectedCallback() {
    var t, e;
    (t = this.unsubscribe) == null || t.call(this), (e = this.resizeObserver) == null || e.disconnect();
  }
  get routerEl() {
    return s.getShadowRootElement(this, ".w3m-router");
  }
  get contentEl() {
    return s.getShadowRootElement(this, ".w3m-content");
  }
  viewTemplate() {
    switch (this.view) {
      case "ConnectWallet":
        return (0, _lit.html)`<w3m-connect-wallet-view></w3m-connect-wallet-view>`;
      case "SelectNetwork":
        return (0, _lit.html)`<w3m-select-network-view></w3m-select-network-view>`;
      case "InjectedConnecting":
        return (0, _lit.html)`<w3m-injected-connecting-view></w3m-injected-connecting-view>`;
      case "DesktopConnecting":
        return (0, _lit.html)`<w3m-desktop-connecting-view></w3m-desktop-connecting-view>`;
      case "MobileConnecting":
        return (0, _lit.html)`<w3m-mobile-connecting-view></w3m-mobile-connecting-view>`;
      case "WebConnecting":
        return (0, _lit.html)`<w3m-web-connecting-view></w3m-web-connecting-view>`;
      case "MobileQrcodeConnecting":
        return (0, _lit.html)`<w3m-mobile-qr-connecting-view></w3m-mobile-qr-connecting-view>`;
      case "GetWallet":
        return (0, _lit.html)`<w3m-get-wallet-view></w3m-get-wallet-view>`;
      case "WalletExplorer":
        return (0, _lit.html)`<w3m-wallet-explorer-view></w3m-wallet-explorer-view>`;
      case "Qrcode":
        return (0, _lit.html)`<w3m-qrcode-view></w3m-qrcode-view>`;
      case "Help":
        return (0, _lit.html)`<w3m-help-view></w3m-help-view>`;
      case "Account":
        return (0, _lit.html)`<w3m-account-view></w3m-account-view>`;
      case "SwitchNetwork":
        return (0, _lit.html)`<w3m-switch-network-view></w3m-switch-network-view>`;
      case "InstallWallet":
        return (0, _lit.html)`<w3m-install-wallet-view></w3m-install-wallet-view>`;
      default:
        return (0, _lit.html)`<div>Not Found</div>`;
    }
  }
  async onChangeRoute() {
    await (0, _motion.animate)(this.routerEl, {
      opacity: [1, 0],
      scale: [1, 1.02]
    }, {
      duration: .15,
      delay: .1
    }).finished, this.view = _core.RouterCtrl.state.view, (0, _motion.animate)(this.routerEl, {
      opacity: [0, 1],
      scale: [.99, 1]
    }, {
      duration: .37,
      delay: .05
    });
  }
  render() {
    return (0, _lit.html)`<div class="w3m-router"><div class="w3m-content">${this.viewTemplate()}</div></div>`;
  }
};
ft.styles = [w.globalCss, Ao], Xt([(0, _decorators.state)()], ft.prototype, "view", 2), Xt([(0, _decorators.state)()], ft.prototype, "prevView", 2), ft = Xt([(0, _decorators.customElement)("w3m-modal-router")], ft);
const Po = (0, _lit.css)`div{height:36px;width:max-content;display:flex;justify-content:center;align-items:center;padding:9px 15px 11px;position:absolute;top:12px;box-shadow:0 6px 14px -6px rgba(10,16,31,.3),0 10px 32px -4px rgba(10,16,31,.15);z-index:2;left:50%;transform:translateX(-50%);pointer-events:none;backdrop-filter:blur(20px) saturate(1.8);-webkit-backdrop-filter:blur(20px) saturate(1.8);border-radius:var(--w3m-notification-border-radius);border:1px solid var(--w3m-color-overlay);background-color:var(--w3m-color-overlay)}svg{margin-right:5px}@-moz-document url-prefix(){div{background-color:var(--w3m-color-bg-3)}}.w3m-success path{fill:var(--w3m-accent-color)}.w3m-error path{fill:var(--w3m-error-color)}`;
var To = Object.defineProperty,
  Lo = Object.getOwnPropertyDescriptor,
  Ee = (t, e, a, r) => {
    for (var o = r > 1 ? void 0 : r ? Lo(e, a) : e, i = t.length - 1, l; i >= 0; i--) (l = t[i]) && (o = (r ? l(e, a, o) : l(o)) || o);
    return r && o && To(e, a, o), o;
  };
let Tt = class extends _lit.LitElement {
  constructor() {
    super(), this.open = !1, this.unsubscribe = void 0, this.timeout = void 0, this.unsubscribe = _core.ToastCtrl.subscribe(t => {
      t.open ? (this.open = !0, this.timeout = setTimeout(() => _core.ToastCtrl.closeToast(), 2200)) : (this.open = !1, clearTimeout(this.timeout));
    });
  }
  disconnectedCallback() {
    var t;
    (t = this.unsubscribe) == null || t.call(this), clearTimeout(this.timeout), _core.ToastCtrl.closeToast();
  }
  render() {
    const {
        message: t,
        variant: e
      } = _core.ToastCtrl.state,
      a = {
        "w3m-success": e === "success",
        "w3m-error": e === "error"
      };
    return this.open ? (0, _lit.html)`<div class="${(0, _classMap.classMap)(a)}">${e === "success" ? d.CHECKMARK_ICON : null} ${e === "error" ? d.CROSS_ICON : null}<w3m-text variant="small-regular">${t}</w3m-text></div>` : null;
  }
};
Tt.styles = [w.globalCss, Po], Ee([(0, _decorators.state)()], Tt.prototype, "open", 2), Tt = Ee([(0, _decorators.customElement)("w3m-modal-toast")], Tt);
const _o = (0, _lit.css)`button{padding:5px;border-radius:var(--w3m-button-hover-highlight-border-radius);display:flex;flex-direction:column;align-items:center;justify-content:center;width:80px;height:90px;position:relative}w3m-network-image{width:54px;height:59px}w3m-text{width:100%;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;text-align:center;margin-top:5px}button:active{background-color:var(--w3m-color-overlay)}.w3m-unsupported{opacity:.3}@media(hover:hover){button:hover{background-color:var(--w3m-color-overlay)}}`;
var No = Object.defineProperty,
  Ro = Object.getOwnPropertyDescriptor,
  xt = (t, e, a, r) => {
    for (var o = r > 1 ? void 0 : r ? Ro(e, a) : e, i = t.length - 1, l; i >= 0; i--) (l = t[i]) && (o = (r ? l(e, a, o) : l(o)) || o);
    return r && o && No(e, a, o), o;
  };
let Q = class extends _lit.LitElement {
  constructor() {
    super(...arguments), this.onClick = () => null, this.name = "", this.chainId = "", this.unsupported = !1;
  }
  render() {
    const t = {
      "w3m-unsupported": this.unsupported
    };
    return (0, _lit.html)`<button @click="${this.onClick}" class="${(0, _classMap.classMap)(t)}"><w3m-network-image chainId="${this.chainId}"></w3m-network-image><w3m-text variant="xsmall-regular">${this.name}</w3m-text></button>`;
  }
};
Q.styles = [w.globalCss, _o], xt([(0, _decorators.property)()], Q.prototype, "onClick", 2), xt([(0, _decorators.property)()], Q.prototype, "name", 2), xt([(0, _decorators.property)()], Q.prototype, "chainId", 2), xt([(0, _decorators.property)()], Q.prototype, "unsupported", 2), Q = xt([(0, _decorators.customElement)("w3m-network-button")], Q);
const Do = (0, _lit.css)`@keyframes loading{to{stroke-dashoffset:0}}:host{width:inherit;height:inherit;position:relative}path{stroke:var(--w3m-color-overlay)}svg{width:100%;height:100%;margin:0}#network-placeholder-fill{fill:var(--w3m-color-bg-3)}#network-placeholder-dash{stroke:var(--w3m-color-overlay)}image{clip-path:path('M17.033 4.964c3.852-2.262 5.778-3.393 7.84-3.77a11.807 11.807 0 0 1 4.254 0c2.062.377 3.988 1.508 7.84 3.77l6.066 3.562c3.852 2.263 5.777 3.394 7.13 5.022a12.268 12.268 0 0 1 2.127 3.747c.71 2.006.71 4.268.71 8.793v7.124c0 4.525 0 6.787-.71 8.793a12.268 12.268 0 0 1-2.126 3.747c-1.354 1.628-3.28 2.76-7.131 5.022l-6.066 3.562c-3.852 2.262-5.778 3.393-7.84 3.771a11.814 11.814 0 0 1-4.254 0c-2.062-.378-3.988-1.509-7.84-3.77l-6.066-3.563c-3.852-2.263-5.778-3.394-7.13-5.022a12.268 12.268 0 0 1-2.127-3.747C1 40 1 37.737 1 33.212v-7.124c0-4.525 0-6.787.71-8.793a12.268 12.268 0 0 1 2.127-3.747c1.352-1.628 3.278-2.76 7.13-5.022l6.066-3.562Z')}`;
var Zo = Object.defineProperty,
  Ho = Object.getOwnPropertyDescriptor,
  We = (t, e, a, r) => {
    for (var o = r > 1 ? void 0 : r ? Ho(e, a) : e, i = t.length - 1, l; i >= 0; i--) (l = t[i]) && (o = (r ? l(e, a, o) : l(o)) || o);
    return r && o && Zo(e, a, o), o;
  };
let Lt = class extends _lit.LitElement {
  constructor() {
    super(...arguments), this.chainId = "";
  }
  render() {
    const t = s.getChainIcon(this.chainId);
    return t ? (0, _lit.html)`<svg width="54" height="59" viewBox="0 0 54 59" fill="none"><image href="${t}"/><image href="${t}" width="54" height="59"/><path d="M17.22 5.295c3.877-2.277 5.737-3.363 7.72-3.726a11.44 11.44 0 0 1 4.12 0c1.983.363 3.844 1.45 7.72 3.726l6.065 3.562c3.876 2.276 5.731 3.372 7.032 4.938a11.896 11.896 0 0 1 2.06 3.63c.683 1.928.688 4.11.688 8.663v7.124c0 4.553-.005 6.735-.688 8.664a11.896 11.896 0 0 1-2.06 3.63c-1.3 1.565-3.156 2.66-7.032 4.937l-6.065 3.563c-3.877 2.276-5.737 3.362-7.72 3.725a11.46 11.46 0 0 1-4.12 0c-1.983-.363-3.844-1.449-7.72-3.726l-6.065-3.562c-3.876-2.276-5.731-3.372-7.032-4.938a11.885 11.885 0 0 1-2.06-3.63c-.682-1.928-.688-4.11-.688-8.663v-7.124c0-4.553.006-6.735.688-8.664a11.885 11.885 0 0 1 2.06-3.63c1.3-1.565 3.156-2.66 7.032-4.937l6.065-3.562Z"/></svg>` : (0, _lit.html)`${d.NETWORK_PLACEHOLDER}`;
  }
};
Lt.styles = [w.globalCss, Do], We([(0, _decorators.property)()], Lt.prototype, "chainId", 2), Lt = We([(0, _decorators.customElement)("w3m-network-image")], Lt);
const So = .1,
  Ae = 2.5,
  U = 7;
function Jt(t, e, a) {
  return t === e ? !1 : (t - e < 0 ? e - t : t - e) <= a + So;
}
function Bo(t, e) {
  const a = Array.prototype.slice.call(_qrcode.default.create(t, {
      errorCorrectionLevel: e
    }).modules.data, 0),
    r = Math.sqrt(a.length);
  return a.reduce((o, i, l) => (l % r === 0 ? o.push([i]) : o[o.length - 1].push(i)) && o, []);
}
const Uo = {
    generate(t, e, a, r) {
      const o = r === "light" ? "#141414" : "#fff",
        i = r === "light" ? "#fff" : "#141414",
        l = [],
        p = Bo(t, "Q"),
        u = e / p.length,
        f = [{
          x: 0,
          y: 0
        }, {
          x: 1,
          y: 0
        }, {
          x: 0,
          y: 1
        }];
      f.forEach(({
        x: W,
        y: k
      }) => {
        const N = (p.length - U) * u * W,
          I = (p.length - U) * u * k,
          D = .32;
        for (let S = 0; S < f.length; S += 1) {
          const it = u * (U - S * 2);
          l.push((0, _lit.svg)`<rect fill="${S % 2 === 0 ? o : i}" height="${it}" rx="${it * D}" ry="${it * D}" width="${it}" x="${N + u * S}" y="${I + u * S}">`);
        }
      });
      const j = Math.floor((a + 25) / u),
        $ = p.length / 2 - j / 2,
        _ = p.length / 2 + j / 2 - 1,
        Ce = [];
      p.forEach((W, k) => {
        W.forEach((N, I) => {
          if (p[k][I] && !(k < U && I < U || k > p.length - (U + 1) && I < U || k < U && I > p.length - (U + 1)) && !(k > $ && k < _ && I > $ && I < _)) {
            const D = k * u + u / 2,
              S = I * u + u / 2;
            Ce.push([D, S]);
          }
        });
      });
      const ut = {};
      return Ce.forEach(([W, k]) => {
        ut[W] ? ut[W].push(k) : ut[W] = [k];
      }), Object.entries(ut).map(([W, k]) => {
        const N = k.filter(I => k.every(D => !Jt(I, D, u)));
        return [Number(W), N];
      }).forEach(([W, k]) => {
        k.forEach(N => {
          l.push((0, _lit.svg)`<circle cx="${W}" cy="${N}" fill="${o}" r="${u / Ae}">`);
        });
      }), Object.entries(ut).filter(([W, k]) => k.length > 1).map(([W, k]) => {
        const N = k.filter(I => k.some(D => Jt(I, D, u)));
        return [Number(W), N];
      }).map(([W, k]) => {
        k.sort((I, D) => I < D ? -1 : 1);
        const N = [];
        for (const I of k) {
          const D = N.find(S => S.some(it => Jt(I, it, u)));
          D ? D.push(I) : N.push([I]);
        }
        return [W, N.map(I => [I[0], I[I.length - 1]])];
      }).forEach(([W, k]) => {
        k.forEach(([N, I]) => {
          l.push((0, _lit.svg)`<line x1="${W}" x2="${W}" y1="${N}" y2="${I}" stroke="${o}" stroke-width="${u / (Ae / 2)}" stroke-linecap="round">`);
        });
      }), l;
    }
  },
  Vo = (0, _lit.css)`@keyframes fadeIn{0%{opacity:0}100%{opacity:1}}div{position:relative;user-select:none;display:block;overflow:hidden;width:100%;aspect-ratio:1/1;animation:fadeIn ease .2s}svg:first-child,w3m-wallet-image{position:absolute;top:50%;left:50%;transform:translateY(-50%) translateX(-50%)}w3m-wallet-image{transform:translateY(-50%) translateX(-50%)}w3m-wallet-image{width:25%;height:25%;border-radius:var(--w3m-wallet-icon-border-radius)}svg:first-child{transform:translateY(-50%) translateX(-50%) scale(.9)}svg:first-child path:first-child{fill:var(--w3m-accent-color)}svg:first-child path:last-child{stroke:var(--w3m-color-overlay)}`;
var zo = Object.defineProperty,
  Go = Object.getOwnPropertyDescriptor,
  st = (t, e, a, r) => {
    for (var o = r > 1 ? void 0 : r ? Go(e, a) : e, i = t.length - 1, l; i >= 0; i--) (l = t[i]) && (o = (r ? l(e, a, o) : l(o)) || o);
    return r && o && zo(e, a, o), o;
  };
let G = class extends _lit.LitElement {
  constructor() {
    super(...arguments), this.uri = "", this.size = 0, this.imageId = void 0, this.walletId = void 0, this.imageUrl = void 0;
  }
  svgTemplate() {
    var t;
    const e = (t = _core.ThemeCtrl.state.themeMode) != null ? t : "light";
    return (0, _lit.svg)`<svg height="${this.size}" width="${this.size}">${Uo.generate(this.uri, this.size, this.size / 4, e)}</svg>`;
  }
  render() {
    return (0, _lit.html)`<div>${this.walletId || this.imageUrl ? (0, _lit.html)`<w3m-wallet-image walletId="${this.walletId}" imageId="${this.imageId}" imageUrl="${this.imageUrl}"></w3m-wallet-image>` : d.WALLET_CONNECT_ICON_COLORED} ${this.svgTemplate()}<w3m-theme-context></w3m-theme-context></div>`;
  }
};
exports.W3mQrCode = G;
G.styles = [w.globalCss, Vo], st([(0, _decorators.property)()], G.prototype, "uri", 2), st([(0, _decorators.property)({
  type: Number
})], G.prototype, "size", 2), st([(0, _decorators.property)()], G.prototype, "imageId", 2), st([(0, _decorators.property)()], G.prototype, "walletId", 2), st([(0, _decorators.property)()], G.prototype, "imageUrl", 2), exports.W3mQrCode = G = st([(0, _decorators.customElement)("w3m-qrcode")], G);
const Fo = (0, _lit.css)`:host{position:relative;height:28px;width:80%}input{width:100%;height:100%;line-height:28px!important;border-radius:var(--w3m-input-border-radius);font-style:normal;font-family:-apple-system,system-ui,BlinkMacSystemFont,'Segoe UI',Roboto,Ubuntu,'Helvetica Neue',sans-serif;font-feature-settings:'case' on;font-weight:500;font-size:16px;letter-spacing:-.03em;padding:0 10px 0 34px;transition:.2s all ease;color:transparent;position:absolute;background-color:var(--w3m-color-bg-3);box-shadow:inset 0 0 0 1px var(--w3m-color-overlay)}input::placeholder{color:transparent}svg{margin:2px 4px 0 0}div{top:0;left:calc(50% - 12px);transform:translateX(-50%);transition:.2s all ease;pointer-events:none;display:flex;align-items:center;justify-content:center;height:calc(100% - 2px);width:fit-content;position:relative}input:focus-within+div,input:not(:placeholder-shown)+div{transform:translateX(10px);left:0}w3m-text{opacity:1;transition:.2s opacity ease}input:focus-within+div w3m-text,input:not(:placeholder-shown)+div w3m-text{opacity:0}input:focus-within,input:not(:placeholder-shown){color:var(--w3m-color-fg-1)}input:focus-within{box-shadow:inset 0 0 0 1px var(--w3m-accent-color)}path{fill:var(--w3m-color-fg-2)}`;
var qo = Object.defineProperty,
  Ko = Object.getOwnPropertyDescriptor,
  je = (t, e, a, r) => {
    for (var o = r > 1 ? void 0 : r ? Ko(e, a) : e, i = t.length - 1, l; i >= 0; i--) (l = t[i]) && (o = (r ? l(e, a, o) : l(o)) || o);
    return r && o && qo(e, a, o), o;
  };
let _t = class extends _lit.LitElement {
  constructor() {
    super(...arguments), this.onChange = () => null;
  }
  render() {
    const t = "Search wallets";
    return (0, _lit.html)`<input type="text" @input="${this.onChange}" placeholder="${t}"><div>${d.SEARCH_ICON}<w3m-text color="secondary" variant="small-thin">${t}</w3m-text></div>`;
  }
};
_t.styles = [w.globalCss, Fo], je([(0, _decorators.property)()], _t.prototype, "onChange", 2), _t = je([(0, _decorators.customElement)("w3m-search-input")], _t);
const Yo = (0, _lit.css)`@keyframes rotate{100%{transform:rotate(360deg)}}@keyframes dash{0%{stroke-dasharray:1,150;stroke-dashoffset:0}50%{stroke-dasharray:90,150;stroke-dashoffset:-35}100%{stroke-dasharray:90,150;stroke-dashoffset:-124}}svg{animation:rotate 2s linear infinite;display:flex;justify-content:center;align-items:center}svg circle{stroke-linecap:round;animation:dash 1.5s ease infinite;stroke:var(--w3m-accent-color)}`;
var Qo = Object.defineProperty,
  Xo = Object.getOwnPropertyDescriptor,
  Jo = (t, e, a, r) => {
    for (var o = r > 1 ? void 0 : r ? Xo(e, a) : e, i = t.length - 1, l; i >= 0; i--) (l = t[i]) && (o = (r ? l(e, a, o) : l(o)) || o);
    return r && o && Qo(e, a, o), o;
  };
let te = class extends _lit.LitElement {
  render() {
    return (0, _lit.html)`<svg viewBox="0 0 50 50" width="24" height="24"><circle cx="25" cy="25" r="20" fill="none" stroke-width="4" stroke="#fff"/></svg>`;
  }
};
te.styles = [w.globalCss, Yo], te = Jo([(0, _decorators.customElement)("w3m-spinner")], te);
const ta = (0, _lit.css)`span{font-style:normal;font-family:var(--w3m-font-family);font-feature-settings:'tnum' on,'lnum' on,'case' on}.w3m-xsmall-bold{font-family:var(--w3m-text-xsmall-bold-font-family);font-weight:var(--w3m-text-xsmall-bold-weight);font-size:var(--w3m-text-xsmall-bold-size);line-height:var(--w3m-text-xsmall-bold-line-height);letter-spacing:var(--w3m-text-xsmall-bold-letter-spacing);text-transform:var(--w3m-text-xsmall-bold-text-transform)}.w3m-xsmall-regular{font-family:var(--w3m-text-xsmall-regular-font-family);font-weight:var(--w3m-text-xsmall-regular-weight);font-size:var(--w3m-text-xsmall-regular-size);line-height:var(--w3m-text-xsmall-regular-line-height);letter-spacing:var(--w3m-text-xsmall-regular-letter-spacing);text-transform:var(--w3m-text-xsmall-regular-text-transform)}.w3m-small-thin{font-family:var(--w3m-text-small-thin-font-family);font-weight:var(--w3m-text-small-thin-weight);font-size:var(--w3m-text-small-thin-size);line-height:var(--w3m-text-small-thin-line-height);letter-spacing:var(--w3m-text-small-thin-letter-spacing);text-transform:var(--w3m-text-small-thin-text-transform)}.w3m-small-regular{font-family:var(--w3m-text-small-regular-font-family);font-weight:var(--w3m-text-small-regular-weight);font-size:var(--w3m-text-small-regular-size);line-height:var(--w3m-text-small-regular-line-height);letter-spacing:var(--w3m-text-small-regular-letter-spacing);text-transform:var(--w3m-text-small-regular-text-transform)}.w3m-medium-regular{font-family:var(--w3m-text-medium-regular-font-family);font-weight:var(--w3m-text-medium-regular-weight);font-size:var(--w3m-text-medium-regular-size);line-height:var(--w3m-text-medium-regular-line-height);letter-spacing:var(--w3m-text-medium-regular-letter-spacing);text-transform:var(--w3m-text-medium-regular-text-transform)}.w3m-big-bold{font-family:var(--w3m-text-big-bold-font-family);font-weight:var(--w3m-text-big-bold-weight);font-size:var(--w3m-text-big-bold-size);line-height:var(--w3m-text-big-bold-line-height);letter-spacing:var(--w3m-text-big-bold-letter-spacing);text-transform:var(--w3m-text-big-bold-text-transform)}:host(*){color:var(--w3m-color-fg-1)}.w3m-color-primary{color:var(--w3m-color-fg-1)}.w3m-color-secondary{color:var(--w3m-color-fg-2)}.w3m-color-tertiary{color:var(--w3m-color-fg-3)}.w3m-color-inverse{color:var(--w3m-accent-fill-color)}.w3m-color-accnt{color:var(--w3m-accent-color)}.w3m-color-error{color:var(--w3m-error-color)}`;
var ea = Object.defineProperty,
  oa = Object.getOwnPropertyDescriptor,
  ee = (t, e, a, r) => {
    for (var o = r > 1 ? void 0 : r ? oa(e, a) : e, i = t.length - 1, l; i >= 0; i--) (l = t[i]) && (o = (r ? l(e, a, o) : l(o)) || o);
    return r && o && ea(e, a, o), o;
  };
let yt = class extends _lit.LitElement {
  constructor() {
    super(...arguments), this.variant = "medium-regular", this.color = "primary";
  }
  render() {
    const t = {
      "w3m-big-bold": this.variant === "big-bold",
      "w3m-medium-regular": this.variant === "medium-regular",
      "w3m-small-regular": this.variant === "small-regular",
      "w3m-small-thin": this.variant === "small-thin",
      "w3m-xsmall-regular": this.variant === "xsmall-regular",
      "w3m-xsmall-bold": this.variant === "xsmall-bold",
      "w3m-color-primary": this.color === "primary",
      "w3m-color-secondary": this.color === "secondary",
      "w3m-color-tertiary": this.color === "tertiary",
      "w3m-color-inverse": this.color === "inverse",
      "w3m-color-accnt": this.color === "accent",
      "w3m-color-error": this.color === "error"
    };
    return (0, _lit.html)`<span><slot class="${(0, _classMap.classMap)(t)}"></slot></span>`;
  }
};
yt.styles = [w.globalCss, ta], ee([(0, _decorators.property)()], yt.prototype, "variant", 2), ee([(0, _decorators.property)()], yt.prototype, "color", 2), yt = ee([(0, _decorators.customElement)("w3m-text")], yt);
const aa = (0, _lit.css)`div{overflow:hidden;position:relative;border-radius:50%}div::after{content:'';position:absolute;top:0;bottom:0;left:0;right:0;border-radius:50%;border:1px solid var(--w3m-color-overlay)}div img{width:100%;height:100%;object-fit:cover;object-position:center}svg{width:100%;height:100%}#token-placeholder-fill{fill:var(--w3m-color-bg-3)}#token-placeholder-dash{stroke:var(--w3m-color-overlay)}`;
var ra = Object.defineProperty,
  ia = Object.getOwnPropertyDescriptor,
  Me = (t, e, a, r) => {
    for (var o = r > 1 ? void 0 : r ? ia(e, a) : e, i = t.length - 1, l; i >= 0; i--) (l = t[i]) && (o = (r ? l(e, a, o) : l(o)) || o);
    return r && o && ra(e, a, o), o;
  };
let Nt = class extends _lit.LitElement {
  constructor() {
    super(...arguments), this.symbol = void 0;
  }
  render() {
    var t;
    const e = s.getTokenIcon((t = this.symbol) != null ? t : "");
    return e ? (0, _lit.html)`<div><img src="${e}" alt="${this.id}"></div>` : d.TOKEN_PLACEHOLDER;
  }
};
Nt.styles = [w.globalCss, aa], Me([(0, _decorators.property)()], Nt.prototype, "symbol", 2), Nt = Me([(0, _decorators.customElement)("w3m-token-image")], Nt);
const la = (0, _lit.css)`button{width:100%;height:100%;border-radius:var(--w3m-button-hover-highlight-border-radius);display:flex;align-items:flex-start}button:active{background-color:var(--w3m-color-overlay)}@media(hover:hover){button:hover{background-color:var(--w3m-color-overlay)}}button>div{width:80px;padding:5px 0;display:flex;flex-direction:column;align-items:center}w3m-text{width:100%;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;text-align:center}w3m-wallet-image{height:60px;width:60px;transition:all .2s ease;border-radius:var(--w3m-wallet-icon-border-radius);margin-bottom:5px}.w3m-sublabel{margin-top:2px}`;
var na = Object.defineProperty,
  sa = Object.getOwnPropertyDescriptor,
  F = (t, e, a, r) => {
    for (var o = r > 1 ? void 0 : r ? sa(e, a) : e, i = t.length - 1, l; i >= 0; i--) (l = t[i]) && (o = (r ? l(e, a, o) : l(o)) || o);
    return r && o && na(e, a, o), o;
  };
let B = class extends _lit.LitElement {
  constructor() {
    super(...arguments), this.onClick = () => null, this.name = "", this.walletId = "", this.label = void 0, this.imageId = void 0, this.installed = !1, this.recent = !1;
  }
  sublabelTemplate() {
    return this.recent ? (0, _lit.html)`<w3m-text class="w3m-sublabel" variant="xsmall-bold" color="tertiary">RECENT</w3m-text>` : this.installed ? (0, _lit.html)`<w3m-text class="w3m-sublabel" variant="xsmall-bold" color="tertiary">INSTALLED</w3m-text>` : null;
  }
  handleClick() {
    _core.EventsCtrl.click({
      name: "WALLET_BUTTON",
      walletId: this.walletId
    }), this.onClick();
  }
  render() {
    var t;
    return (0, _lit.html)`<button @click="${this.handleClick.bind(this)}"><div><w3m-wallet-image walletId="${this.walletId}" imageId="${this.imageId}"></w3m-wallet-image><w3m-text variant="xsmall-regular">${(t = this.label) != null ? t : s.getWalletName(this.name, !0)}</w3m-text>${this.sublabelTemplate()}</div></button>`;
  }
};
B.styles = [w.globalCss, la], F([(0, _decorators.property)()], B.prototype, "onClick", 2), F([(0, _decorators.property)()], B.prototype, "name", 2), F([(0, _decorators.property)()], B.prototype, "walletId", 2), F([(0, _decorators.property)()], B.prototype, "label", 2), F([(0, _decorators.property)()], B.prototype, "imageId", 2), F([(0, _decorators.property)()], B.prototype, "installed", 2), F([(0, _decorators.property)()], B.prototype, "recent", 2), B = F([(0, _decorators.customElement)("w3m-wallet-button")], B);
const ca = (0, _lit.css)`:host{display:block}div{overflow:hidden;position:relative;border-radius:inherit;width:100%;height:100%;background-color:var(--w3m-color-overlay)}svg{position:relative;width:100%;height:100%}div::after{content:'';position:absolute;top:0;bottom:0;left:0;right:0;border-radius:inherit;border:1px solid var(--w3m-color-overlay)}div img{width:100%;height:100%;object-fit:cover;object-position:center}#wallet-placeholder-fill{fill:var(--w3m-color-bg-3)}#wallet-placeholder-dash{stroke:var(--w3m-color-overlay)}`;
var da = Object.defineProperty,
  ma = Object.getOwnPropertyDescriptor,
  Rt = (t, e, a, r) => {
    for (var o = r > 1 ? void 0 : r ? ma(e, a) : e, i = t.length - 1, l; i >= 0; i--) (l = t[i]) && (o = (r ? l(e, a, o) : l(o)) || o);
    return r && o && da(e, a, o), o;
  };
let ct = class extends _lit.LitElement {
  constructor() {
    super(...arguments), this.walletId = "", this.imageId = void 0, this.imageUrl = void 0;
  }
  render() {
    var t;
    const e = (t = this.imageUrl) != null && t.length ? this.imageUrl : s.getWalletIcon({
      id: this.walletId,
      image_id: this.imageId
    });
    return (0, _lit.html)`${e.length ? (0, _lit.html)`<div><img src="${e}" alt="${this.id}"></div>` : d.WALLET_PLACEHOLDER}`;
  }
};
ct.styles = [w.globalCss, ca], Rt([(0, _decorators.property)()], ct.prototype, "walletId", 2), Rt([(0, _decorators.property)()], ct.prototype, "imageId", 2), Rt([(0, _decorators.property)()], ct.prototype, "imageUrl", 2), ct = Rt([(0, _decorators.customElement)("w3m-wallet-image")], ct);
var ha = Object.defineProperty,
  pa = Object.getOwnPropertyDescriptor,
  wa = (t, e, a, r) => {
    for (var o = r > 1 ? void 0 : r ? pa(e, a) : e, i = t.length - 1, l; i >= 0; i--) (l = t[i]) && (o = (r ? l(e, a, o) : l(o)) || o);
    return r && o && ha(e, a, o), o;
  };
let Pe = class extends _lit.LitElement {
  constructor() {
    super(), this.unwatchAccount = void 0, _core.AccountCtrl.getAccount(), this.fetchProfile(), this.fetchBalance(), this.unwatchAccount = _core.ClientCtrl.client().watchAccount(t => {
      const {
        address: e,
        isConnected: a
      } = _core.AccountCtrl.state;
      t.isConnected && t.address !== e && (this.fetchProfile(t.address), this.fetchBalance(t.address), _core.AccountCtrl.setAddress(t.address)), t.isConnected || _core.AccountCtrl.resetAccount(), a !== t.isConnected && _core.ModalCtrl.close(), !a && t.isConnected ? _core.EventsCtrl.track({
        name: "ACCOUNT_CONNECTED"
      }) : a && !t.isConnected && _core.EventsCtrl.track({
        name: "ACCOUNT_DISCONNECTED"
      }), _core.AccountCtrl.setIsConnected(t.isConnected);
    });
  }
  disconnectedCallback() {
    var t;
    (t = this.unwatchAccount) == null || t.call(this);
  }
  async fetchProfile(t) {
    var e;
    const a = (e = _core.OptionsCtrl.state.chains) == null ? void 0 : e.find(r => r.id === 1);
    if (_core.ConfigCtrl.state.enableAccountView && a) try {
      await _core.AccountCtrl.fetchProfile(s.preloadImage, t);
    } catch (r) {
      console.error(r), _core.ToastCtrl.openToast(s.getErrorMessage(r), "error");
    }
  }
  async fetchBalance(t) {
    if (_core.ConfigCtrl.state.enableAccountView) try {
      await _core.AccountCtrl.fetchBalance(t);
    } catch (e) {
      console.error(e), _core.ToastCtrl.openToast(s.getErrorMessage(e), "error");
    }
  }
};
Pe = wa([(0, _decorators.customElement)("w3m-account-context")], Pe);
var ga = Object.defineProperty,
  ua = Object.getOwnPropertyDescriptor,
  Te = (t, e, a, r) => {
    for (var o = r > 1 ? void 0 : r ? ua(e, a) : e, i = t.length - 1, l; i >= 0; i--) (l = t[i]) && (o = (r ? l(e, a, o) : l(o)) || o);
    return r && o && ga(e, a, o), o;
  };
let oe = class extends _lit.LitElement {
  constructor() {
    super(), this.preload = !0, this.preloadData();
  }
  async loadImages(t) {
    try {
      t != null && t.length && (await Promise.all(t.map(async e => s.preloadImage(e))));
    } catch {
      console.info("Unsuccessful attempt at preloading some images", t);
    }
  }
  async preloadListings() {
    var t;
    if (_core.ConfigCtrl.state.enableExplorer) {
      const {
        chains: e
      } = _core.OptionsCtrl.state;
      await Promise.all([_core.ExplorerCtrl.getRecomendedWallets(), _core.ExplorerCtrl.getInjectedWallets()]), _core.OptionsCtrl.setIsDataLoaded(!0);
      const {
          recomendedWallets: a
        } = _core.ExplorerCtrl.state,
        r = Z.installedInjectedWallets(),
        o = (t = e?.map(p => s.getChainIcon(p.id))) != null ? t : [],
        i = a.map(p => s.getWalletIcon(p)),
        l = r.map(p => s.getWalletIcon(p));
      await this.loadImages([...o, ...i, ...l]);
    } else _core.OptionsCtrl.setIsDataLoaded(!0);
  }
  async preloadCustomImages() {
    const t = s.getCustomImageUrls();
    await this.loadImages(t);
  }
  async preloadData() {
    try {
      this.preload && (this.preload = !1, await Promise.all([this.preloadListings(), this.preloadCustomImages()]));
    } catch (t) {
      console.error(t), _core.ToastCtrl.openToast("Failed preloading", "error");
    }
  }
};
Te([(0, _decorators.state)()], oe.prototype, "preload", 2), oe = Te([(0, _decorators.customElement)("w3m-explorer-context")], oe);
var va = Object.defineProperty,
  ba = Object.getOwnPropertyDescriptor,
  Le = (t, e, a, r) => {
    for (var o = r > 1 ? void 0 : r ? ba(e, a) : e, i = t.length - 1, l; i >= 0; i--) (l = t[i]) && (o = (r ? l(e, a, o) : l(o)) || o);
    return r && o && va(e, a, o), o;
  };
let ae = class extends _lit.LitElement {
  constructor() {
    super(), this.activeChainId = void 0, this.unwatchNetwork = void 0;
    const t = _core.OptionsCtrl.getSelectedChain();
    this.activeChainId = t?.id, this.unwatchNetwork = _core.ClientCtrl.client().watchNetwork(e => {
      const a = e.chain;
      a && this.activeChainId !== a.id && (_core.OptionsCtrl.setSelectedChain(a), this.activeChainId = a.id, _core.AccountCtrl.resetBalance(), this.fetchBalance());
    });
  }
  disconnectedCallback() {
    var t;
    (t = this.unwatchNetwork) == null || t.call(this);
  }
  async fetchBalance() {
    if (_core.ConfigCtrl.state.enableAccountView) try {
      await _core.AccountCtrl.fetchBalance();
    } catch (t) {
      console.error(t), _core.ToastCtrl.openToast(s.getErrorMessage(t), "error");
    }
  }
};
Le([(0, _decorators.state)()], ae.prototype, "activeChainId", 2), ae = Le([(0, _decorators.customElement)("w3m-network-context")], ae);
var fa = Object.defineProperty,
  xa = Object.getOwnPropertyDescriptor,
  ya = (t, e, a, r) => {
    for (var o = r > 1 ? void 0 : r ? xa(e, a) : e, i = t.length - 1, l; i >= 0; i--) (l = t[i]) && (o = (r ? l(e, a, o) : l(o)) || o);
    return r && o && fa(e, a, o), o;
  };
let _e = class extends _lit.LitElement {
  constructor() {
    super(), this.unsubscribeTheme = void 0, w.setTheme(), this.unsubscribeTheme = _core.ThemeCtrl.subscribe(w.setTheme), this.preloadThemeImages();
  }
  disconnectedCallback() {
    var t;
    (t = this.unsubscribeTheme) == null || t.call(this);
  }
  async preloadThemeImages() {
    try {
      const {
          themeVariables: t
        } = _core.ThemeCtrl.state,
        e = [t?.["--w3m-background-image-url"], t?.["--w3m-logo-image-url"]].filter(Boolean);
      e.length && (await Promise.all(e.map(async a => s.preloadImage(a))));
    } catch {
      console.info("Unsuccessful attempt at preloading some images");
    }
  }
};
_e = ya([(0, _decorators.customElement)("w3m-theme-context")], _e);
var Ca = Object.defineProperty,
  $a = Object.getOwnPropertyDescriptor,
  ka = (t, e, a, r) => {
    for (var o = r > 1 ? void 0 : r ? $a(e, a) : e, i = t.length - 1, l; i >= 0; i--) (l = t[i]) && (o = (r ? l(e, a, o) : l(o)) || o);
    return r && o && Ca(e, a, o), o;
  };
const Oa = 18e4,
  Ne = 1e3;
var Re;
let De = class extends _lit.LitElement {
  constructor() {
    super(), this.unwatchOptions = void 0, this.unwatchAccount = void 0, this.timeout = void 0, this.isGenerated = !1, this.selectedChainId = (Re = _core.OptionsCtrl.state.selectedChain) == null ? void 0 : Re.id, this.isAccountConnected = _core.AccountCtrl.state.isConnected, this.lastRetry = Date.now(), this.unwatchOptions = _core.OptionsCtrl.subscribe(t => {
      var e, a;
      ((e = t.selectedChain) == null ? void 0 : e.id) !== this.selectedChainId && (this.selectedChainId = (a = t.selectedChain) == null ? void 0 : a.id, this.connectAndWait());
    }), this.unwatchAccount = _core.AccountCtrl.subscribe(t => {
      (this.isAccountConnected !== t.isConnected || !this.isGenerated) && (this.isAccountConnected = t.isConnected, setTimeout(this.connectAndWait.bind(this), 0));
    }), document.addEventListener("visibilitychange", this.onVisibilityChange.bind(this));
  }
  disconnectedCallback() {
    var t, e;
    (t = this.unwatchOptions) == null || t.call(this), (e = this.unwatchAccount) == null || e.call(this), document.removeEventListener("visibilitychange", this.onVisibilityChange);
  }
  async connectAndWait() {
    if (clearTimeout(this.timeout), !this.isAccountConnected) {
      this.isGenerated = !0, this.timeout = setTimeout(this.connectAndWait.bind(this), Oa);
      try {
        const {
          standaloneUri: t,
          selectedChain: e
        } = _core.OptionsCtrl.state;
        t ? _core.WcConnectionCtrl.setPairingUri(t) : await _core.ClientCtrl.client().connectWalletConnect(a => _core.WcConnectionCtrl.setPairingUri(a), e?.id);
      } catch (t) {
        console.error(t), _core.WcConnectionCtrl.setPairingError(!0), _core.ToastCtrl.openToast("Connection request declined", "error"), Date.now() - this.lastRetry >= Ne && (this.lastRetry = Date.now(), this.connectAndWait());
      }
    }
  }
  onVisibilityChange() {
    !document.hidden && _core.CoreUtil.isMobile() && setTimeout(this.connectAndWait.bind(this), Ne);
  }
};
De = ka([(0, _decorators.customElement)("w3m-wc-connection-context")], De);
const Ia = (0, _lit.css)`:host{all:initial}div{display:flex;align-items:center;background-color:var(--w3m-color-overlay);box-shadow:inset 0 0 0 1px var(--w3m-color-overlay);border-radius:var(--w3m-button-border-radius);padding:4px 4px 4px 8px}div button{border-radius:var(--w3m-secondary-button-border-radius);padding:4px 8px;padding-left:4px;height:auto;margin-left:10px;color:var(--w3m-accent-fill-color);background-color:var(--w3m-accent-color)}.w3m-no-avatar{padding-left:8px}button::after{content:'';top:0;bottom:0;left:0;right:0;position:absolute;background-color:transparent;border-radius:inherit;transition:background-color .2s ease;border:1px solid var(--w3m-color-overlay)}button:hover::after{background-color:var(--w3m-color-overlay)}w3m-avatar{margin-right:6px}w3m-button-big w3m-avatar{margin-left:-5px}`;
var Ea = Object.defineProperty,
  Wa = Object.getOwnPropertyDescriptor,
  re = (t, e, a, r) => {
    for (var o = r > 1 ? void 0 : r ? Wa(e, a) : e, i = t.length - 1, l; i >= 0; i--) (l = t[i]) && (o = (r ? l(e, a, o) : l(o)) || o);
    return r && o && Ea(e, a, o), o;
  };
let Ct = class extends _lit.LitElement {
  constructor() {
    super(), this.balance = "hide", this.avatar = "show", s.rejectStandaloneButtonComponent();
  }
  onOpen() {
    const {
      isStandalone: t
    } = _core.OptionsCtrl.state;
    t || (_core.EventsCtrl.click({
      name: "ACCOUNT_BUTTON"
    }), _core.ModalCtrl.open({
      route: "Account"
    }));
  }
  accountTemplate() {
    const t = this.avatar === "show";
    return (0, _lit.html)`${t ? (0, _lit.html)`<w3m-avatar></w3m-avatar>` : null}<w3m-address-text></w3m-address-text>`;
  }
  render() {
    const t = this.balance === "show",
      e = {
        "w3m-no-avatar": this.avatar === "hide"
      };
    return t ? (0, _lit.html)`<div><w3m-balance></w3m-balance><button @click="${this.onOpen}" class="${(0, _classMap.classMap)(e)}">${this.accountTemplate()}</button></div>` : (0, _lit.html)`<w3m-button-big @click="${this.onOpen}">${this.accountTemplate()}</w3m-button-big>`;
  }
};
exports.W3mAccountButton = Ct;
Ct.styles = [w.globalCss, Ia], re([(0, _decorators.property)()], Ct.prototype, "balance", 2), re([(0, _decorators.property)()], Ct.prototype, "avatar", 2), exports.W3mAccountButton = Ct = re([(0, _decorators.customElement)("w3m-account-button")], Ct);
const Aa = (0, _lit.css)`button{display:flex;border-radius:var(--w3m-button-hover-highlight-border-radius);flex-direction:column;justify-content:center;padding:5px;width:100px}button:active{background-color:var(--w3m-color-overlay)}@media(hover:hover){button:hover{background-color:var(--w3m-color-overlay)}}button:disabled{pointer-events:none}w3m-network-image{width:32px;height:32px}w3m-text{margin-top:4px}`;
var ja = Object.defineProperty,
  Ma = Object.getOwnPropertyDescriptor,
  ie = (t, e, a, r) => {
    for (var o = r > 1 ? void 0 : r ? Ma(e, a) : e, i = t.length - 1, l; i >= 0; i--) (l = t[i]) && (o = (r ? l(e, a, o) : l(o)) || o);
    return r && o && ja(e, a, o), o;
  };
let $t = class extends _lit.LitElement {
  constructor() {
    super(), this.chainId = 0, this.label = "", this.unsubscribeNetwork = void 0;
    const {
      selectedChain: t
    } = _core.OptionsCtrl.state;
    this.chainId = t?.id, this.label = t?.name, this.unsubscribeNetwork = _core.OptionsCtrl.subscribe(({
      selectedChain: e
    }) => {
      this.chainId = e?.id, this.label = e?.name;
    });
  }
  disconnectedCallback() {
    var t;
    (t = this.unsubscribeNetwork) == null || t.call(this);
  }
  onClick() {
    _core.RouterCtrl.push("SelectNetwork");
  }
  render() {
    const {
        chains: t,
        selectedChain: e
      } = _core.OptionsCtrl.state,
      a = t?.map(i => i.id),
      r = e && a?.includes(e.id),
      o = t && t.length <= 1 && r;
    return (0, _lit.html)`<button @click="${this.onClick}" ?disabled="${o}"><w3m-network-image chainId="${this.chainId}"></w3m-network-image><w3m-text variant="xsmall-regular" color="accent">${this.label}</w3m-text></button>`;
  }
};
$t.styles = [w.globalCss, Aa], ie([(0, _decorators.state)()], $t.prototype, "chainId", 2), ie([(0, _decorators.state)()], $t.prototype, "label", 2), $t = ie([(0, _decorators.customElement)("w3m-account-network-button")], $t);
const Pa = (0, _lit.css)`@keyframes slide{0%{background-position:0 0}100%{background-position:200px 0}}w3m-text{padding:1px 0}.w3m-loading{background:linear-gradient(270deg,var(--w3m-color-fg-1) 36.33%,var(--w3m-color-fg-3) 42.07%,var(--w3m-color-fg-1) 83.3%);background-size:200px 100%;background-clip:text;-webkit-background-clip:text;-webkit-text-fill-color:transparent;animation-name:slide;animation-duration:1.5s;animation-iteration-count:infinite;animation-timing-function:linear}`;
var Ta = Object.defineProperty,
  La = Object.getOwnPropertyDescriptor,
  kt = (t, e, a, r) => {
    for (var o = r > 1 ? void 0 : r ? La(e, a) : e, i = t.length - 1, l; i >= 0; i--) (l = t[i]) && (o = (r ? l(e, a, o) : l(o)) || o);
    return r && o && Ta(e, a, o), o;
  };
let X = class extends _lit.LitElement {
  constructor() {
    super(), this.address = void 0, this.name = void 0, this.loading = !0, this.variant = "button", this.unsubscribeAccount = void 0, this.address = _core.AccountCtrl.state.address, this.name = _core.AccountCtrl.state.profileName, this.loading = !!_core.AccountCtrl.state.profileLoading, this.unsubscribeAccount = _core.AccountCtrl.subscribe(({
      address: t,
      profileName: e,
      profileLoading: a
    }) => {
      this.address = t, this.name = e, this.loading = !!a;
    });
  }
  disconnectedCallback() {
    var t;
    (t = this.unsubscribeAccount) == null || t.call(this);
  }
  render() {
    var t;
    const e = this.variant === "button",
      a = {
        "w3m-loading": this.loading
      };
    return (0, _lit.html)`<w3m-text class="${(0, _classMap.classMap)(a)}" variant="${e ? "medium-regular" : "big-bold"}" color="${e ? "inverse" : "primary"}">${this.name ? this.name : s.truncate((t = this.address) != null ? t : "")}</w3m-text>`;
  }
};
X.styles = [w.globalCss, Pa], kt([(0, _decorators.state)()], X.prototype, "address", 2), kt([(0, _decorators.state)()], X.prototype, "name", 2), kt([(0, _decorators.state)()], X.prototype, "loading", 2), kt([(0, _decorators.property)()], X.prototype, "variant", 2), X = kt([(0, _decorators.customElement)("w3m-address-text")], X);
const P = {
    onConnecting(t) {
      s.goToConnectingView(t);
    },
    onExternal(t) {
      s.handleConnectorConnection(t);
    },
    manualWalletsTemplate() {
      return Z.manualWallets().map(t => (0, _lit.html)`<w3m-wallet-button walletId="${t.id}" name="${t.name}" .onClick="${() => this.onConnecting(t)}"></w3m-wallet-button>`);
    },
    recomendedWalletsTemplate(t = !1) {
      return Z.recomendedWallets(t).map(e => (0, _lit.html)`<w3m-wallet-button walletId="${e.id}" imageId="${e.image_id}" name="${e.name}" .onClick="${() => this.onConnecting(e)}"></w3m-wallet-button>`);
    },
    externalWalletsTemplate() {
      return Z.externalWallets().map(t => (0, _lit.html)`<w3m-wallet-button name="${t.name}" walletId="${t.id}" .onClick="${() => this.onExternal(t.id)}"></w3m-wallet-button>`);
    },
    recentWalletTemplate() {
      const t = Z.recentWallet();
      if (t) return (0, _lit.html)`<w3m-wallet-button name="${t.name}" walletId="${t.id}" imageId="${t.image_id}" .recent="${!0}" .onClick="${() => this.onConnecting(t)}"></w3m-wallet-button>`;
    },
    installedInjectedWalletsTemplate() {
      return Z.installedInjectedWallets().map(t => (0, _lit.html)`<w3m-wallet-button .installed="${!0}" name="${t.name}" walletId="${t.id}" imageId="${t.image_id}" .onClick="${() => this.onConnecting(t)}"></w3m-wallet-button>`);
    },
    injectedWalletsTemplate() {
      return Z.injectedWallets().map(t => (0, _lit.html)`<w3m-wallet-button name="${t.name}" walletId="${t.id}" imageId="${t.image_id}" .onClick="${() => this.onConnecting(t)}"></w3m-wallet-button>`);
    }
  },
  _a = (0, _lit.css)`@keyframes scroll{0%{transform:translate3d(0,0,0)}100%{transform:translate3d(calc(-70px * 9),0,0)}}.w3m-slider{position:relative;overflow-x:hidden;padding:10px 0;margin:0 -20px;width:calc(100% + 40px)}.w3m-track{display:flex;width:calc(70px * 18);animation:scroll 20s linear infinite;opacity:.7}.w3m-track svg{margin:0 5px}w3m-wallet-image{width:60px;height:60px;margin:0 5px;border-radius:var(--w3m-wallet-icon-border-radius)}.w3m-grid{display:grid;grid-template-columns:repeat(4,80px);justify-content:space-between}.w3m-title{display:flex;align-items:center;margin-bottom:10px}.w3m-title svg{margin-right:6px}.w3m-title path{fill:var(--w3m-accent-color)}w3m-modal-footer .w3m-title{padding:0 10px}w3m-button-big{position:absolute;top:50%;left:50%;transform:translateY(-50%) translateX(-50%);filter:drop-shadow(0 0 17px var(--w3m-color-bg-1))}w3m-info-footer{flex-direction:column;align-items:center;display:flex;width:100%;padding:5px 0}w3m-info-footer w3m-text{text-align:center;margin-bottom:15px}#wallet-placeholder-fill{fill:var(--w3m-color-bg-3)}#wallet-placeholder-dash{stroke:var(--w3m-color-overlay)}`;
var Na = Object.defineProperty,
  Ra = Object.getOwnPropertyDescriptor,
  Da = (t, e, a, r) => {
    for (var o = r > 1 ? void 0 : r ? Ra(e, a) : e, i = t.length - 1, l; i >= 0; i--) (l = t[i]) && (o = (r ? l(e, a, o) : l(o)) || o);
    return r && o && Na(e, a, o), o;
  };
let le = class extends _lit.LitElement {
  onGoToQrcode() {
    _core.RouterCtrl.push("Qrcode");
  }
  onGetWallet() {
    _core.RouterCtrl.push("GetWallet");
  }
  render() {
    const {
        recomendedWallets: t
      } = _core.ExplorerCtrl.state,
      e = [...t, ...t],
      a = P.externalWalletsTemplate(),
      r = P.installedInjectedWalletsTemplate(),
      o = [...r, ...a].length > 0,
      i = _core.CoreUtil.RECOMMENDED_WALLET_AMOUNT * 2;
    return (0, _lit.html)`<w3m-modal-header title="Connect your wallet" .onAction="${this.onGoToQrcode}" .actionIcon="${d.QRCODE_ICON}"></w3m-modal-header><w3m-modal-content><div class="w3m-title">${d.MOBILE_ICON}<w3m-text variant="small-regular" color="accent">WalletConnect</w3m-text></div><div class="w3m-slider"><div class="w3m-track">${[...Array(i)].map((l, p) => {
      const u = e[p % e.length];
      return u ? (0, _lit.html)`<w3m-wallet-image walletId="${u.id}" imageId="${u.image_id}"></w3m-wallet-image>` : d.WALLET_PLACEHOLDER;
    })}</div><w3m-button-big @click="${s.handleAndroidLinking}"><w3m-text variant="medium-regular" color="inverse">Select Wallet</w3m-text></w3m-button-big></div></w3m-modal-content>${o ? (0, _lit.html)`<w3m-modal-footer><div class="w3m-title">${d.WALLET_ICON}<w3m-text variant="small-regular" color="accent">Other</w3m-text></div><div class="w3m-grid">${r} ${a}</div></w3m-modal-footer>` : null}<w3m-info-footer><w3m-text color="secondary" variant="small-thin">${`Choose WalletConnect to see supported apps on your device${o ? ", or select from other options" : ""}`}</w3m-text><w3m-button variant="outline" .iconRight="${d.ARROW_UP_RIGHT_ICON}" .onClick="${() => this.onGetWallet()}">I don't have a wallet</w3m-button></w3m-info-footer>`;
  }
};
le.styles = [w.globalCss, _a], le = Da([(0, _decorators.customElement)("w3m-android-wallet-selection")], le);
const Za = (0, _lit.css)`@keyframes slide{0%{transform:translateX(-50px)}100%{transform:translateX(200px)}}.w3m-placeholder,img{border-radius:50%;box-shadow:inset 0 0 0 1px var(--w3m-color-overlay);display:block;position:relative;overflow:hidden!important;background-color:var(--w3m-color-av-1);background-image:radial-gradient(at 66% 77%,var(--w3m-color-av-2) 0,transparent 50%),radial-gradient(at 29% 97%,var(--w3m-color-av-3) 0,transparent 50%),radial-gradient(at 99% 86%,var(--w3m-color-av-4) 0,transparent 50%),radial-gradient(at 29% 88%,var(--w3m-color-av-5) 0,transparent 50%);transform:translateZ(0)}.w3m-loader{width:50px;height:100%;background:linear-gradient(270deg,transparent 0,rgba(255,255,255,.4) 30%,transparent 100%);animation-name:slide;animation-duration:1.5s;transform:translateX(-50px);animation-iteration-count:infinite;animation-timing-function:linear;animation-delay:.55s}.w3m-small{width:24px;height:24px}.w3m-medium{width:60px;height:60px}`;
var Ha = Object.defineProperty,
  Sa = Object.getOwnPropertyDescriptor,
  Ot = (t, e, a, r) => {
    for (var o = r > 1 ? void 0 : r ? Sa(e, a) : e, i = t.length - 1, l; i >= 0; i--) (l = t[i]) && (o = (r ? l(e, a, o) : l(o)) || o);
    return r && o && Ha(e, a, o), o;
  };
let J = class extends _lit.LitElement {
  constructor() {
    super(), this.address = void 0, this.avatar = void 0, this.loading = !0, this.size = "small", this.unsubscribeAccount = void 0, this.address = _core.AccountCtrl.state.address, this.avatar = _core.AccountCtrl.state.profileAvatar, this.loading = !!_core.AccountCtrl.state.profileLoading, this.unsubscribeAccount = _core.AccountCtrl.subscribe(({
      address: t,
      profileAvatar: e,
      profileLoading: a
    }) => {
      this.address = t, this.avatar = e, this.loading = !!a;
    });
  }
  disconnectedCallback() {
    var t;
    (t = this.unsubscribeAccount) == null || t.call(this);
  }
  render() {
    const t = {
      "w3m-placeholder": !0,
      "w3m-small": this.size === "small",
      "w3m-medium": this.size === "medium"
    };
    return this.avatar ? (0, _lit.html)`<img class="${(0, _classMap.classMap)(t)}" src="${this.avatar}">` : this.address ? (s.generateAvatarColors(this.address), (0, _lit.html)`<div class="${(0, _classMap.classMap)(t)}">${this.loading ? (0, _lit.html)`<div class="w3m-loader"></div>` : null}</div>`) : null;
  }
};
J.styles = [w.globalCss, Za], Ot([(0, _decorators.state)()], J.prototype, "address", 2), Ot([(0, _decorators.state)()], J.prototype, "avatar", 2), Ot([(0, _decorators.state)()], J.prototype, "loading", 2), Ot([(0, _decorators.property)()], J.prototype, "size", 2), J = Ot([(0, _decorators.customElement)("w3m-avatar")], J);
const Ba = (0, _lit.css)`div{display:flex;align-items:center}w3m-token-image{width:28px;height:28px;margin-right:6px}`;
var Ua = Object.defineProperty,
  Va = Object.getOwnPropertyDescriptor,
  ne = (t, e, a, r) => {
    for (var o = r > 1 ? void 0 : r ? Va(e, a) : e, i = t.length - 1, l; i >= 0; i--) (l = t[i]) && (o = (r ? l(e, a, o) : l(o)) || o);
    return r && o && Ua(e, a, o), o;
  };
let It = class extends _lit.LitElement {
  constructor() {
    var t, e;
    super(), this.symbol = void 0, this.amount = void 0, this.unsubscribeAccount = void 0, this.symbol = (t = _core.AccountCtrl.state.balance) == null ? void 0 : t.symbol, this.amount = (e = _core.AccountCtrl.state.balance) == null ? void 0 : e.amount, this.unsubscribeAccount = _core.AccountCtrl.subscribe(({
      balance: a
    }) => {
      this.symbol = a?.symbol, this.amount = a?.amount;
    });
  }
  disconnectedCallback() {
    var t;
    (t = this.unsubscribeAccount) == null || t.call(this);
  }
  render() {
    let t = "_._";
    return this.amount === "0.0" ? t = 0 : typeof this.amount == "string" && this.amount.length > 6 ? t = parseFloat(this.amount).toFixed(3) : typeof this.amount == "string" && (t = parseFloat(this.amount)), (0, _lit.html)`<div><w3m-token-image symbol="${this.symbol}"></w3m-token-image><w3m-text variant="medium-regular" color="primary">${t} ${this.symbol}</w3m-text></div>`;
  }
};
It.styles = [w.globalCss, Ba], ne([(0, _decorators.state)()], It.prototype, "symbol", 2), ne([(0, _decorators.state)()], It.prototype, "amount", 2), It = ne([(0, _decorators.customElement)("w3m-balance")], It);
const za = (0, _lit.css)`:host{all:initial}svg{width:28px;height:20px;margin:-1px 3px 0 -5px}svg path{fill:var(--w3m-accent-fill-color)}button:disabled svg path{fill:var(--w3m-color-fg-3)}w3m-spinner{margin:0 10px 0 0}`;
var Ga = Object.defineProperty,
  Fa = Object.getOwnPropertyDescriptor,
  Dt = (t, e, a, r) => {
    for (var o = r > 1 ? void 0 : r ? Fa(e, a) : e, i = t.length - 1, l; i >= 0; i--) (l = t[i]) && (o = (r ? l(e, a, o) : l(o)) || o);
    return r && o && Ga(e, a, o), o;
  };
let dt = class extends _lit.LitElement {
  constructor() {
    super(), this.loading = !1, this.label = "Connect Wallet", this.icon = "show", this.modalUnsub = void 0, s.rejectStandaloneButtonComponent(), this.modalUnsub = _core.ModalCtrl.subscribe(t => {
      t.open && (this.loading = !0), t.open || (this.loading = !1);
    });
  }
  disconnectedCallback() {
    var t;
    (t = this.modalUnsub) == null || t.call(this);
  }
  iconTemplate() {
    return this.icon === "show" ? d.WALLET_CONNECT_ICON : null;
  }
  onClick() {
    _core.AccountCtrl.state.isConnected ? this.onDisconnect() : this.onConnect();
  }
  async onConnect() {
    this.loading = !0, _core.EventsCtrl.click({
      name: "CONNECT_BUTTON"
    }), await _core.ModalCtrl.open(), _core.ModalCtrl.state.open || (this.loading = !1);
  }
  async onDisconnect() {
    _core.EventsCtrl.click({
      name: "DISCONNECT_BUTTON"
    }), await _core.ClientCtrl.client().disconnect();
  }
  render() {
    return (0, _lit.html)`<w3m-button-big .disabled="${this.loading}" @click="${this.onClick}">${this.loading ? (0, _lit.html)`<w3m-spinner></w3m-spinner><w3m-text variant="medium-regular" color="accent">Connecting...</w3m-text>` : (0, _lit.html)`${this.iconTemplate()}<w3m-text variant="medium-regular" color="inverse">${this.label}</w3m-text>`}</w3m-button-big>`;
  }
};
exports.W3mConnectButton = dt;
dt.styles = [w.globalCss, za], Dt([(0, _decorators.state)()], dt.prototype, "loading", 2), Dt([(0, _decorators.property)()], dt.prototype, "label", 2), Dt([(0, _decorators.property)()], dt.prototype, "icon", 2), exports.W3mConnectButton = dt = Dt([(0, _decorators.customElement)("w3m-connect-button")], dt);
const qa = (0, _lit.css)`@keyframes loading{to{stroke-dashoffset:0}}@keyframes shake{10%,90%{transform:translate3d(-1px,0,0)}20%,80%{transform:translate3d(1px,0,0)}30%,50%,70%{transform:translate3d(-2px,0,0)}40%,60%{transform:translate3d(2px,0,0)}}:host{display:flex;flex-direction:column;align-items:center}div{position:relative;width:110px;height:110px;display:flex;justify-content:center;align-items:center;margin:40px 0 20px 0;transform:translate3d(0,0,0)}svg{position:absolute;width:110px;height:110px;fill:none;stroke:transparent;stroke-linecap:round;stroke-width:2px;top:0;left:0}use{stroke:var(--w3m-accent-color);animation:loading 1s linear infinite}w3m-wallet-image{border-radius:var(--w3m-wallet-icon-large-border-radius);width:90px;height:90px}w3m-text{margin-bottom:40px}.w3m-error svg{stroke:var(--w3m-error-color)}.w3m-error use{display:none}.w3m-error{animation:shake .4s cubic-bezier(.36,.07,.19,.97) both}.w3m-stale svg,.w3m-stale use{display:none}`;
var Ka = Object.defineProperty,
  Ya = Object.getOwnPropertyDescriptor,
  mt = (t, e, a, r) => {
    for (var o = r > 1 ? void 0 : r ? Ya(e, a) : e, i = t.length - 1, l; i >= 0; i--) (l = t[i]) && (o = (r ? l(e, a, o) : l(o)) || o);
    return r && o && Ka(e, a, o), o;
  };
let q = class extends _lit.LitElement {
  constructor() {
    super(...arguments), this.walletId = void 0, this.imageId = void 0, this.isError = !1, this.isStale = !1, this.label = "";
  }
  svgLoaderTemplate() {
    var t, e;
    const a = (e = (t = _core.ThemeCtrl.state.themeVariables) == null ? void 0 : t["--w3m-wallet-icon-large-border-radius"]) != null ? e : w.getPreset("--w3m-wallet-icon-large-border-radius");
    let r = 0;
    a.includes("%") ? r = 88 / 100 * parseInt(a, 10) : r = parseInt(a, 10), r *= 1.17;
    const o = 317 - r * 1.57,
      i = 425 - r * 1.8;
    return (0, _lit.html)`<svg viewBox="0 0 110 110" width="110" height="110"><rect id="w3m-loader" x="2" y="2" width="106" height="106" rx="${r}"/><use xlink:href="#w3m-loader" stroke-dasharray="106 ${o}" stroke-dashoffset="${i}"></use></svg>`;
  }
  render() {
    const t = {
      "w3m-error": this.isError,
      "w3m-stale": this.isStale
    };
    return (0, _lit.html)`<div class="${(0, _classMap.classMap)(t)}">${this.svgLoaderTemplate()}<w3m-wallet-image walletId="${this.walletId}" imageId="${this.imageId}"></w3m-wallet-image></div><w3m-text variant="medium-regular" color="${this.isError ? "error" : "primary"}">${this.isError ? "Connection declined" : this.label}</w3m-text>`;
  }
};
q.styles = [w.globalCss, qa], mt([(0, _decorators.property)()], q.prototype, "walletId", 2), mt([(0, _decorators.property)()], q.prototype, "imageId", 2), mt([(0, _decorators.property)()], q.prototype, "isError", 2), mt([(0, _decorators.property)()], q.prototype, "isStale", 2), mt([(0, _decorators.property)()], q.prototype, "label", 2), q = mt([(0, _decorators.customElement)("w3m-connector-waiting")], q);
var Qa = Object.defineProperty,
  Xa = Object.getOwnPropertyDescriptor,
  ht = (t, e, a, r) => {
    for (var o = r > 1 ? void 0 : r ? Xa(e, a) : e, i = t.length - 1, l; i >= 0; i--) (l = t[i]) && (o = (r ? l(e, a, o) : l(o)) || o);
    return r && o && Qa(e, a, o), o;
  };
let tt = class extends _lit.LitElement {
  constructor() {
    super(), this.isConnected = !1, this.label = "Connect Wallet", this.icon = "show", this.avatar = "show", this.balance = "hide", this.unsubscribeAccount = void 0, s.rejectStandaloneButtonComponent(), this.isConnected = _core.AccountCtrl.state.isConnected, this.unsubscribeAccount = _core.AccountCtrl.subscribe(({
      isConnected: t
    }) => {
      this.isConnected = t;
    });
  }
  disconnectedCallback() {
    var t;
    (t = this.unsubscribeAccount) == null || t.call(this);
  }
  render() {
    const {
        enableAccountView: t
      } = _core.ConfigCtrl.state,
      e = this.balance,
      a = this.label,
      r = this.icon,
      o = this.avatar;
    return this.isConnected && t ? (0, _lit.html)`<w3m-account-button balance="${e}" avatar="${o}"></w3m-account-button>` : (0, _lit.html)`<w3m-connect-button label="${this.isConnected ? "Disconnect" : a}" icon="${r}"></w3m-connect-button>`;
  }
};
exports.W3mCoreButton = tt;
ht([(0, _decorators.state)()], tt.prototype, "isConnected", 2), ht([(0, _decorators.property)()], tt.prototype, "label", 2), ht([(0, _decorators.property)()], tt.prototype, "icon", 2), ht([(0, _decorators.property)()], tt.prototype, "avatar", 2), ht([(0, _decorators.property)()], tt.prototype, "balance", 2), exports.W3mCoreButton = tt = ht([(0, _decorators.customElement)("w3m-core-button")], tt);
const Ja = (0, _lit.css)`.w3m-grid{display:grid;grid-template-columns:repeat(4,80px);justify-content:space-between}.w3m-desktop-title,.w3m-mobile-title{display:flex;align-items:center}.w3m-mobile-title{justify-content:space-between;margin-bottom:20px;margin-top:-10px}.w3m-desktop-title{margin-bottom:10px;padding:0 10px}.w3m-subtitle{display:flex;align-items:center}.w3m-subtitle:last-child path{fill:var(--w3m-color-fg-3)}.w3m-desktop-title svg,.w3m-mobile-title svg{margin-right:6px}.w3m-desktop-title path,.w3m-mobile-title path{fill:var(--w3m-accent-color)}`;
var tr = Object.defineProperty,
  er = Object.getOwnPropertyDescriptor,
  or = (t, e, a, r) => {
    for (var o = r > 1 ? void 0 : r ? er(e, a) : e, i = t.length - 1, l; i >= 0; i--) (l = t[i]) && (o = (r ? l(e, a, o) : l(o)) || o);
    return r && o && tr(e, a, o), o;
  };
let se = class extends _lit.LitElement {
  render() {
    const {
        isStandalone: t
      } = _core.OptionsCtrl.state,
      {
        explorerExcludedWalletIds: e,
        enableExplorer: a
      } = _core.ConfigCtrl.state,
      r = e !== "ALL" && a,
      o = P.manualWalletsTemplate(),
      i = P.recomendedWalletsTemplate(),
      l = P.externalWalletsTemplate(),
      p = P.recentWalletTemplate(),
      u = P.installedInjectedWalletsTemplate();
    let f = [p, ...o, ...i];
    t || (f = [...u, p, ...l, ...o, ...i]), f = f.filter(Boolean);
    const j = f.length > 4 || r;
    let $ = [];
    j ? $ = f.slice(0, 3) : $ = f;
    const _ = !!$.length;
    return (0, _lit.html)`<w3m-modal-header .border="${!0}" title="Connect your wallet" .onAction="${s.handleUriCopy}" .actionIcon="${d.COPY_ICON}"></w3m-modal-header><w3m-modal-content><div class="w3m-mobile-title"><div class="w3m-subtitle">${d.MOBILE_ICON}<w3m-text variant="small-regular" color="accent">Mobile</w3m-text></div><div class="w3m-subtitle">${d.SCAN_ICON}<w3m-text variant="small-regular" color="secondary">Scan with your wallet</w3m-text></div></div><w3m-walletconnect-qr></w3m-walletconnect-qr></w3m-modal-content>${_ ? (0, _lit.html)`<w3m-modal-footer><div class="w3m-desktop-title">${d.DESKTOP_ICON}<w3m-text variant="small-regular" color="accent">Desktop</w3m-text></div><div class="w3m-grid">${$} ${j ? (0, _lit.html)`<w3m-view-all-wallets-button></w3m-view-all-wallets-button>` : null}</div></w3m-modal-footer>` : null}`;
  }
};
se.styles = [w.globalCss, Ja], se = or([(0, _decorators.customElement)("w3m-desktop-wallet-selection")], se);
const ar = (0, _lit.css)`div{background-color:var(--w3m-color-bg-2);padding:10px 20px 15px 20px;border-top:1px solid var(--w3m-color-bg-3);text-align:center}a{color:var(--w3m-accent-color);text-decoration:none;transition:opacity .2s ease-in-out;display:inline}a:active{opacity:.8}@media(hover:hover){a:hover{opacity:.8}}`;
var rr = Object.defineProperty,
  ir = Object.getOwnPropertyDescriptor,
  lr = (t, e, a, r) => {
    for (var o = r > 1 ? void 0 : r ? ir(e, a) : e, i = t.length - 1, l; i >= 0; i--) (l = t[i]) && (o = (r ? l(e, a, o) : l(o)) || o);
    return r && o && rr(e, a, o), o;
  };
let ce = class extends _lit.LitElement {
  render() {
    const {
      termsOfServiceUrl: t,
      privacyPolicyUrl: e
    } = _core.ConfigCtrl.state;
    return t ?? e ? (0, _lit.html)`<div><w3m-text variant="small-regular" color="secondary">By connecting your wallet to this app, you agree to the app's ${t ? (0, _lit.html)`<a href="${t}" target="_blank" rel="noopener noreferrer">Terms of Service</a>` : null} ${t && e ? "and" : null} ${e ? (0, _lit.html)`<a href="${e}" target="_blank" rel="noopener noreferrer">Privacy Policy</a>` : null}</w3m-text></div>` : null;
  }
};
ce.styles = [w.globalCss, ar], ce = lr([(0, _decorators.customElement)("w3m-legal-notice")], ce);
const nr = (0, _lit.css)`div{display:grid;grid-template-columns:repeat(4,80px);margin:0 -10px;justify-content:space-between;row-gap:10px}`;
var sr = Object.defineProperty,
  cr = Object.getOwnPropertyDescriptor,
  dr = (t, e, a, r) => {
    for (var o = r > 1 ? void 0 : r ? cr(e, a) : e, i = t.length - 1, l; i >= 0; i--) (l = t[i]) && (o = (r ? l(e, a, o) : l(o)) || o);
    return r && o && sr(e, a, o), o;
  };
let de = class extends _lit.LitElement {
  onQrcode() {
    _core.RouterCtrl.push("Qrcode");
  }
  render() {
    const {
        isStandalone: t
      } = _core.OptionsCtrl.state,
      {
        explorerExcludedWalletIds: e,
        enableExplorer: a
      } = _core.ConfigCtrl.state,
      r = e !== "ALL" && a,
      o = P.manualWalletsTemplate(),
      i = P.recomendedWalletsTemplate(),
      l = P.externalWalletsTemplate(),
      p = P.recentWalletTemplate(),
      u = P.installedInjectedWalletsTemplate();
    let f = [p, ...o, ...i];
    t || (f = [...u, p, ...l, ...o, ...i]), f = f.filter(Boolean);
    const j = f.length > 8 || r;
    let $ = [];
    j ? $ = f.slice(0, 7) : $ = f;
    const _ = !!$.length;
    return (0, _lit.html)`<w3m-modal-header title="Connect your wallet" .onAction="${this.onQrcode}" .actionIcon="${d.QRCODE_ICON}"></w3m-modal-header>${_ ? (0, _lit.html)`<w3m-modal-content><div>${$} ${j ? (0, _lit.html)`<w3m-view-all-wallets-button></w3m-view-all-wallets-button>` : null}</div></w3m-modal-content>` : null}`;
  }
};
de.styles = [w.globalCss, nr], de = dr([(0, _decorators.customElement)("w3m-mobile-wallet-selection")], de);
const mr = (0, _lit.css)`:host{all:initial}.w3m-overlay{top:0;bottom:0;left:0;right:0;position:fixed;z-index:var(--w3m-z-index);overflow:hidden;display:flex;justify-content:center;align-items:center;background-color:rgba(0,0,0,.3);opacity:0;pointer-events:none}@media(max-height:720px) and (orientation:landscape){.w3m-overlay{overflow:scroll;align-items:flex-start;padding:20px 0}}.w3m-active{pointer-events:auto}.w3m-container{position:relative;max-width:360px;width:100%;outline:0;border-radius:var(--w3m-background-border-radius) var(--w3m-background-border-radius) var(--w3m-container-border-radius) var(--w3m-container-border-radius);border:1px solid var(--w3m-color-overlay);overflow:hidden}.w3m-card{width:100%;position:relative;border-radius:var(--w3m-container-border-radius);overflow:hidden;box-shadow:0 6px 14px -6px rgba(10,16,31,.12),0 10px 32px -4px rgba(10,16,31,.1),0 0 0 1px var(--w3m-color-overlay);background-color:var(--w3m-color-bg-1);color:var(--w3m-color-fg-1)}@media(max-width:600px){.w3m-container{max-width:440px;border-radius:var(--w3m-background-border-radius) var(--w3m-background-border-radius) 0 0}.w3m-card{border-radius:var(--w3m-container-border-radius) var(--w3m-container-border-radius) 0 0}.w3m-overlay{align-items:flex-end}}@media(max-width:440px){.w3m-container{border:0}}`;
var hr = Object.defineProperty,
  pr = Object.getOwnPropertyDescriptor,
  me = (t, e, a, r) => {
    for (var o = r > 1 ? void 0 : r ? pr(e, a) : e, i = t.length - 1, l; i >= 0; i--) (l = t[i]) && (o = (r ? l(e, a, o) : l(o)) || o);
    return r && o && hr(e, a, o), o;
  };
let Et = class extends _lit.LitElement {
  constructor() {
    super(), this.open = !1, this.active = !1, this.unsubscribeModal = void 0, this.abortController = void 0, this.unsubscribeModal = _core.ModalCtrl.subscribe(t => {
      t.open ? this.onOpenModalEvent() : this.onCloseModalEvent();
    });
  }
  disconnectedCallback() {
    var t;
    (t = this.unsubscribeModal) == null || t.call(this);
  }
  get overlayEl() {
    return s.getShadowRootElement(this, ".w3m-overlay");
  }
  get containerEl() {
    return s.getShadowRootElement(this, ".w3m-container");
  }
  toggleBodyScroll(t) {
    if (document.querySelector("body")) if (t) {
      const e = document.getElementById("w3m-styles");
      e?.remove();
    } else document.head.insertAdjacentHTML("beforeend", '<style id="w3m-styles">html,body{touch-action:none;overflow:hidden;overscroll-behavior:contain;}</style>');
  }
  onCloseModal(t) {
    t.target === t.currentTarget && _core.ModalCtrl.close();
  }
  onOpenModalEvent() {
    this.toggleBodyScroll(!1), this.addKeyboardEvents(), this.open = !0, setTimeout(async () => {
      const t = s.isMobileAnimation() ? {
          y: ["50vh", "0vh"]
        } : {
          scale: [.98, 1]
        },
        e = .1,
        a = .2;
      await Promise.all([(0, _motion.animate)(this.overlayEl, {
        opacity: [0, 1]
      }, {
        delay: e,
        duration: a
      }).finished, (0, _motion.animate)(this.containerEl, t, {
        delay: e,
        duration: a
      }).finished]), this.active = !0;
    }, 0);
  }
  async onCloseModalEvent() {
    this.toggleBodyScroll(!0), this.removeKeyboardEvents();
    const t = s.isMobileAnimation() ? {
        y: ["0vh", "50vh"]
      } : {
        scale: [1, .98]
      },
      e = .2;
    await Promise.all([(0, _motion.animate)(this.overlayEl, {
      opacity: [1, 0]
    }, {
      duration: e
    }).finished, (0, _motion.animate)(this.containerEl, t, {
      duration: e
    }).finished]), this.containerEl.removeAttribute("style"), this.active = !1, this.open = !1;
  }
  addKeyboardEvents() {
    this.abortController = new AbortController(), window.addEventListener("keydown", t => {
      var e;
      t.key === "Escape" ? _core.ModalCtrl.close() : t.key === "Tab" && ((e = t.target) != null && e.tagName.includes("W3M-") || this.containerEl.focus());
    }, this.abortController), this.containerEl.focus();
  }
  removeKeyboardEvents() {
    var t;
    (t = this.abortController) == null || t.abort(), this.abortController = void 0;
  }
  managedModalContextTemplate() {
    const {
      isStandalone: t
    } = _core.OptionsCtrl.state;
    return t ? null : (0, _lit.html)`<w3m-wc-connection-context></w3m-wc-connection-context><w3m-account-context></w3m-account-context><w3m-network-context></w3m-network-context>`;
  }
  render() {
    const t = {
      "w3m-overlay": !0,
      "w3m-active": this.active
    };
    return (0, _lit.html)`<w3m-explorer-context></w3m-explorer-context><w3m-theme-context></w3m-theme-context>${this.managedModalContextTemplate()}<div id="w3m-modal" class="${(0, _classMap.classMap)(t)}" @click="${this.onCloseModal}" role="alertdialog" aria-modal="true"><div class="w3m-container" tabindex="0">${this.open ? (0, _lit.html)`<w3m-modal-backcard></w3m-modal-backcard><div class="w3m-card"><w3m-modal-router></w3m-modal-router><w3m-modal-toast></w3m-modal-toast></div>` : null}</div></div>`;
  }
};
exports.W3mModal = Et;
Et.styles = [w.globalCss, mr], me([(0, _decorators.state)()], Et.prototype, "open", 2), me([(0, _decorators.state)()], Et.prototype, "active", 2), exports.W3mModal = Et = me([(0, _decorators.customElement)("w3m-modal")], Et);
const wr = (0, _lit.css)`:host{all:initial}w3m-network-image{margin-left:-6px;margin-right:6px;width:28px;height:28px}`;
var gr = Object.defineProperty,
  ur = Object.getOwnPropertyDescriptor,
  Zt = (t, e, a, r) => {
    for (var o = r > 1 ? void 0 : r ? ur(e, a) : e, i = t.length - 1, l; i >= 0; i--) (l = t[i]) && (o = (r ? l(e, a, o) : l(o)) || o);
    return r && o && gr(e, a, o), o;
  };
let pt = class extends _lit.LitElement {
  constructor() {
    super(), this.chainId = "", this.label = "", this.wrongNetwork = !1, this.unsubscribeNetwork = void 0, s.rejectStandaloneButtonComponent();
    const {
      selectedChain: t
    } = _core.OptionsCtrl.state;
    this.onSetChainData(t), this.unsubscribeNetwork = _core.OptionsCtrl.subscribe(({
      selectedChain: e
    }) => {
      this.onSetChainData(e);
    });
  }
  disconnectedCallback() {
    var t;
    (t = this.unsubscribeNetwork) == null || t.call(this);
  }
  onSetChainData(t) {
    if (t) {
      const {
          chains: e
        } = _core.OptionsCtrl.state,
        a = e?.map(r => r.id);
      this.chainId = t.id.toString(), this.wrongNetwork = !(a != null && a.includes(t.id)), this.label = this.wrongNetwork ? "Wrong Network" : t.name;
    }
  }
  onClick() {
    _core.EventsCtrl.click({
      name: "NETWORK_BUTTON"
    }), _core.ModalCtrl.open({
      route: "SelectNetwork"
    });
  }
  render() {
    var t;
    const {
        chains: e
      } = _core.OptionsCtrl.state,
      a = e && e.length > 1;
    return (0, _lit.html)`<w3m-button-big @click="${this.onClick}" ?disabled="${!a}"><w3m-network-image chainId="${this.chainId}"></w3m-network-image><w3m-text variant="medium-regular" color="inverse">${(t = this.label) != null && t.length ? this.label : "Select Network"}</w3m-text></w3m-button-big>`;
  }
};
exports.W3mNetworkSwitch = pt;
pt.styles = [w.globalCss, wr], Zt([(0, _decorators.state)()], pt.prototype, "chainId", 2), Zt([(0, _decorators.state)()], pt.prototype, "label", 2), Zt([(0, _decorators.state)()], pt.prototype, "wrongNetwork", 2), exports.W3mNetworkSwitch = pt = Zt([(0, _decorators.customElement)("w3m-network-switch")], pt);
const vr = (0, _lit.css)`@keyframes loading{to{stroke-dashoffset:0}}@keyframes shake{10%,90%{transform:translate3d(-1px,0,0)}20%,80%{transform:translate3d(1px,0,0)}30%,50%,70%{transform:translate3d(-2px,0,0)}40%,60%{transform:translate3d(2px,0,0)}}:host{display:flex;flex-direction:column;align-items:center}div{position:relative;width:110px;height:110px;display:flex;justify-content:center;align-items:center;margin:40px 0 20px 0;transform:translate3d(0,0,0)}svg{position:absolute;width:110px;height:110px;fill:none;stroke:transparent;stroke-linecap:round;stroke-width:1px;top:0;left:0}use{stroke:var(--w3m-accent-color);animation:loading 1s linear infinite}w3m-network-image{width:92px;height:92px}w3m-text{margin-bottom:40px}.w3m-error svg{stroke:var(--w3m-error-color)}.w3m-error use{display:none}.w3m-error{animation:shake .4s cubic-bezier(.36,.07,.19,.97) both}`;
var br = Object.defineProperty,
  fr = Object.getOwnPropertyDescriptor,
  Ht = (t, e, a, r) => {
    for (var o = r > 1 ? void 0 : r ? fr(e, a) : e, i = t.length - 1, l; i >= 0; i--) (l = t[i]) && (o = (r ? l(e, a, o) : l(o)) || o);
    return r && o && br(e, a, o), o;
  };
let wt = class extends _lit.LitElement {
  constructor() {
    super(...arguments), this.chainId = void 0, this.isError = !1, this.label = "";
  }
  svgLoaderTemplate() {
    return (0, _lit.html)`<svg width="54" height="59" viewBox="0 0 54 59" fill="none" class="w3m-loader"><path id="w3m-loader-path" d="M17.22 5.295c3.877-2.277 5.737-3.363 7.72-3.726a11.44 11.44 0 0 1 4.12 0c1.983.363 3.844 1.45 7.72 3.726l6.065 3.562c3.876 2.276 5.731 3.372 7.032 4.938a11.896 11.896 0 0 1 2.06 3.63c.683 1.928.688 4.11.688 8.663v7.124c0 4.553-.005 6.735-.688 8.664a11.896 11.896 0 0 1-2.06 3.63c-1.3 1.565-3.156 2.66-7.032 4.937l-6.065 3.563c-3.877 2.276-5.737 3.362-7.72 3.725a11.46 11.46 0 0 1-4.12 0c-1.983-.363-3.844-1.449-7.72-3.726l-6.065-3.562c-3.876-2.276-5.731-3.372-7.032-4.938a11.885 11.885 0 0 1-2.06-3.63c-.682-1.928-.688-4.11-.688-8.663v-7.124c0-4.553.006-6.735.688-8.664a11.885 11.885 0 0 1 2.06-3.63c1.3-1.565 3.156-2.66 7.032-4.937l6.065-3.562Z"/><use xlink:href="#w3m-loader-path" stroke-dasharray="54 118" stroke-dashoffset="172"></use></svg>`;
  }
  render() {
    const t = {
      "w3m-error": this.isError
    };
    return (0, _lit.html)`<div class="${(0, _classMap.classMap)(t)}">${this.svgLoaderTemplate()}<w3m-network-image chainId="${this.chainId}"></w3m-network-image></div><w3m-text variant="medium-regular" color="${this.isError ? "error" : "primary"}">${this.isError ? "Switch declined" : this.label}</w3m-text>`;
  }
};
wt.styles = [w.globalCss, vr], Ht([(0, _decorators.property)()], wt.prototype, "chainId", 2), Ht([(0, _decorators.property)()], wt.prototype, "isError", 2), Ht([(0, _decorators.property)()], wt.prototype, "label", 2), wt = Ht([(0, _decorators.customElement)("w3m-network-waiting")], wt);
const xr = (0, _lit.css)`div{display:flex;margin-top:15px}slot{display:inline-block;margin:0 5px}w3m-button{margin:0 5px}`;
var yr = Object.defineProperty,
  Cr = Object.getOwnPropertyDescriptor,
  et = (t, e, a, r) => {
    for (var o = r > 1 ? void 0 : r ? Cr(e, a) : e, i = t.length - 1, l; i >= 0; i--) (l = t[i]) && (o = (r ? l(e, a, o) : l(o)) || o);
    return r && o && yr(e, a, o), o;
  };
let V = class extends _lit.LitElement {
  constructor() {
    super(...arguments), this.isMobile = !1, this.isInjected = !1, this.isInjectedInstalled = !1, this.isDesktop = !1, this.isWeb = !1, this.isRetry = !1;
  }
  onMobile() {
    _core.CoreUtil.isMobile() ? _core.RouterCtrl.replace("MobileConnecting") : _core.RouterCtrl.replace("MobileQrcodeConnecting");
  }
  onInjected() {
    this.isInjectedInstalled ? _core.RouterCtrl.replace("InjectedConnecting") : _core.RouterCtrl.replace("InstallWallet");
  }
  onDesktop() {
    _core.RouterCtrl.replace("DesktopConnecting");
  }
  onWeb() {
    _core.RouterCtrl.replace("WebConnecting");
  }
  render() {
    const {
      isStandalone: t
    } = _core.OptionsCtrl.state;
    return (0, _lit.html)`<div>${this.isRetry ? (0, _lit.html)`<slot></slot>` : null} ${this.isMobile ? (0, _lit.html)`<w3m-button .onClick="${this.onMobile}" .iconLeft="${d.MOBILE_ICON}" variant="outline">Mobile</w3m-button>` : null} ${this.isInjected && !t ? (0, _lit.html)`<w3m-button .onClick="${this.onInjected}" .iconLeft="${d.WALLET_ICON}" variant="outline">Browser</w3m-button>` : null} ${this.isDesktop ? (0, _lit.html)`<w3m-button .onClick="${this.onDesktop}" .iconLeft="${d.DESKTOP_ICON}" variant="outline">Desktop</w3m-button>` : null} ${this.isWeb ? (0, _lit.html)`<w3m-button .onClick="${this.onWeb}" .iconLeft="${d.GLOBE_ICON}" variant="outline">Web</w3m-button>` : null}</div>`;
  }
};
V.styles = [w.globalCss, xr], et([(0, _decorators.property)()], V.prototype, "isMobile", 2), et([(0, _decorators.property)()], V.prototype, "isInjected", 2), et([(0, _decorators.property)()], V.prototype, "isInjectedInstalled", 2), et([(0, _decorators.property)()], V.prototype, "isDesktop", 2), et([(0, _decorators.property)()], V.prototype, "isWeb", 2), et([(0, _decorators.property)()], V.prototype, "isRetry", 2), V = et([(0, _decorators.customElement)("w3m-platform-selection")], V);
const $r = (0, _lit.css)`button{display:flex;flex-direction:column;padding:5px 10px;border-radius:var(--w3m-button-hover-highlight-border-radius);height:100%;justify-content:flex-start}.w3m-icons{width:60px;height:60px;display:flex;flex-wrap:wrap;padding:7px;border-radius:var(--w3m-wallet-icon-border-radius);justify-content:space-between;align-items:center;margin-bottom:5px;background-color:var(--w3m-color-bg-2);box-shadow:inset 0 0 0 1px var(--w3m-color-overlay)}button:active{background-color:var(--w3m-color-overlay)}@media(hover:hover){button:hover{background-color:var(--w3m-color-overlay)}}.w3m-icons img{width:21px;height:21px;object-fit:cover;object-position:center;border-radius:calc(var(--w3m-wallet-icon-border-radius)/ 2);border:1px solid var(--w3m-color-overlay)}.w3m-icons svg{width:21px;height:21px}.w3m-icons img:nth-child(1),.w3m-icons img:nth-child(2),.w3m-icons svg:nth-child(1),.w3m-icons svg:nth-child(2){margin-bottom:4px}w3m-text{width:100%;text-align:center}#wallet-placeholder-fill{fill:var(--w3m-color-bg-3)}#wallet-placeholder-dash{stroke:var(--w3m-color-overlay)}`;
var kr = Object.defineProperty,
  Or = Object.getOwnPropertyDescriptor,
  Ir = (t, e, a, r) => {
    for (var o = r > 1 ? void 0 : r ? Or(e, a) : e, i = t.length - 1, l; i >= 0; i--) (l = t[i]) && (o = (r ? l(e, a, o) : l(o)) || o);
    return r && o && kr(e, a, o), o;
  };
let he = class extends _lit.LitElement {
  onClick() {
    _core.RouterCtrl.push("WalletExplorer");
  }
  render() {
    const {
        recomendedWallets: t
      } = _core.ExplorerCtrl.state,
      e = Z.manualWallets(),
      a = [...t, ...e].reverse().slice(0, 4);
    return (0, _lit.html)`<button @click="${this.onClick}"><div class="w3m-icons">${a.map(r => {
      const o = s.getWalletIcon(r);
      if (o) return (0, _lit.html)`<img src="${o}">`;
      const i = s.getWalletIcon({
        id: r.id
      });
      return i ? (0, _lit.html)`<img src="${i}">` : d.WALLET_PLACEHOLDER;
    })} ${[...Array(4 - a.length)].map(() => d.WALLET_PLACEHOLDER)}</div><w3m-text variant="xsmall-regular">View All</w3m-text></button>`;
  }
};
he.styles = [w.globalCss, $r], he = Ir([(0, _decorators.customElement)("w3m-view-all-wallets-button")], he);
const Er = (0, _lit.css)`.w3m-qr-container{width:100%;display:flex;justify-content:center;align-items:center;aspect-ratio:1/1}`;
var Wr = Object.defineProperty,
  Ar = Object.getOwnPropertyDescriptor,
  St = (t, e, a, r) => {
    for (var o = r > 1 ? void 0 : r ? Ar(e, a) : e, i = t.length - 1, l; i >= 0; i--) (l = t[i]) && (o = (r ? l(e, a, o) : l(o)) || o);
    return r && o && Wr(e, a, o), o;
  };
let gt = class extends _lit.LitElement {
  constructor() {
    super(), this.walletId = "", this.imageId = "", this.uri = "", this.unwatchWcConnection = void 0, setTimeout(() => {
      const {
          pairingUri: t
        } = _core.WcConnectionCtrl.state,
        {
          standaloneUri: e
        } = _core.OptionsCtrl.state;
      this.uri = e ?? t;
    }, 0), this.unwatchWcConnection = _core.WcConnectionCtrl.subscribe(t => {
      t.pairingUri && (this.uri = t.pairingUri);
    });
  }
  disconnectedCallback() {
    var t;
    (t = this.unwatchWcConnection) == null || t.call(this);
  }
  get overlayEl() {
    return s.getShadowRootElement(this, ".w3m-qr-container");
  }
  render() {
    return (0, _lit.html)`<div class="w3m-qr-container">${this.uri ? (0, _lit.html)`<w3m-qrcode size="${this.overlayEl.offsetWidth}" uri="${this.uri}" walletId="${this.walletId}" imageId="${this.imageId}"></w3m-qrcode>` : (0, _lit.html)`<w3m-spinner></w3m-spinner>`}</div>`;
  }
};
gt.styles = [w.globalCss, Er], St([(0, _decorators.property)()], gt.prototype, "walletId", 2), St([(0, _decorators.property)()], gt.prototype, "imageId", 2), St([(0, _decorators.state)()], gt.prototype, "uri", 2), gt = St([(0, _decorators.customElement)("w3m-walletconnect-qr")], gt);
const jr = (0, _lit.css)`.w3m-profile{display:flex;justify-content:space-between;align-items:flex-start;padding-top:20px}.w3m-connection-badge{background-color:var(--w3m-color-bg-2);box-shadow:inset 0 0 0 1px var(--w3m-color-overlay);padding:6px 10px 6px 26px;position:relative;border-radius:28px}.w3m-connection-badge::before{content:'';position:absolute;width:10px;height:10px;left:10px;background-color:var(--w3m-success-color);border-radius:50%;top:50%;margin-top:-5px;box-shadow:0 1px 4px 1px var(--w3m-success-color),inset 0 0 0 1px var(--w3m-color-overlay)}.w3m-footer{display:flex;justify-content:space-between}w3m-address-text{margin-top:10px;display:block}.w3m-balance{border-top:1px solid var(--w3m-color-bg-2);padding:11px 20px}`;
var Mr = Object.defineProperty,
  Pr = Object.getOwnPropertyDescriptor,
  Tr = (t, e, a, r) => {
    for (var o = r > 1 ? void 0 : r ? Pr(e, a) : e, i = t.length - 1, l; i >= 0; i--) (l = t[i]) && (o = (r ? l(e, a, o) : l(o)) || o);
    return r && o && Mr(e, a, o), o;
  };
let pe = class extends _lit.LitElement {
  async onDisconnect() {
    await _core.ClientCtrl.client().disconnect();
  }
  async onCopyAddress() {
    var t;
    await navigator.clipboard.writeText((t = _core.AccountCtrl.state.address) != null ? t : ""), _core.ToastCtrl.openToast("Address copied", "success");
  }
  render() {
    return (0, _lit.html)`<w3m-modal-content><div class="w3m-profile"><div class="w3m-info"><w3m-avatar size="medium"></w3m-avatar><w3m-address-text variant="modal"></w3m-address-text></div><div class="w3m-connection-badge"><w3m-text variant="small-regular" color="secondary">Connected</w3m-text></div></div></w3m-modal-content><div class="w3m-balance"><w3m-balance></w3m-balance></div><w3m-modal-footer><div class="w3m-footer"><w3m-account-network-button></w3m-account-network-button><w3m-box-button label="Copy Address" .onClick="${this.onCopyAddress}" .icon="${d.ACCOUNT_COPY}"></w3m-box-button><w3m-box-button label="Disconnect" .onClick="${this.onDisconnect}" .icon="${d.ACCOUNT_DISCONNECT}"></w3m-box-button></div></w3m-modal-footer>`;
  }
};
pe.styles = [w.globalCss, jr], pe = Tr([(0, _decorators.customElement)("w3m-account-view")], pe);
var Lr = Object.defineProperty,
  _r = Object.getOwnPropertyDescriptor,
  Nr = (t, e, a, r) => {
    for (var o = r > 1 ? void 0 : r ? _r(e, a) : e, i = t.length - 1, l; i >= 0; i--) (l = t[i]) && (o = (r ? l(e, a, o) : l(o)) || o);
    return r && o && Lr(e, a, o), o;
  };
let we = class extends _lit.LitElement {
  viewTemplate() {
    return _core.CoreUtil.isAndroid() ? (0, _lit.html)`<w3m-android-wallet-selection></w3m-android-wallet-selection>` : _core.CoreUtil.isMobile() ? (0, _lit.html)`<w3m-mobile-wallet-selection></w3m-mobile-wallet-selection>` : (0, _lit.html)`<w3m-desktop-wallet-selection></w3m-desktop-wallet-selection>`;
  }
  render() {
    return (0, _lit.html)`${this.viewTemplate()}<w3m-legal-notice></w3m-legal-notice>`;
  }
};
we.styles = [w.globalCss], we = Nr([(0, _decorators.customElement)("w3m-connect-wallet-view")], we);
const Rr = (0, _lit.css)`w3m-info-footer{flex-direction:column;align-items:center;display:flex;width:100%;padding:5px 0}w3m-text{text-align:center}`;
var Dr = Object.defineProperty,
  Zr = Object.getOwnPropertyDescriptor,
  Ze = (t, e, a, r) => {
    for (var o = r > 1 ? void 0 : r ? Zr(e, a) : e, i = t.length - 1, l; i >= 0; i--) (l = t[i]) && (o = (r ? l(e, a, o) : l(o)) || o);
    return r && o && Dr(e, a, o), o;
  };
let Bt = class extends _lit.LitElement {
  constructor() {
    super(), this.isError = !1, this.unwatchConnection = void 0, this.openDesktopApp(), this.unwatchConnection = _core.WcConnectionCtrl.subscribe(t => {
      this.isError = t.pairingError;
    });
  }
  disconnectedCallback() {
    var t;
    (t = this.unwatchConnection) == null || t.call(this);
  }
  onFormatAndRedirect(t) {
    const {
        desktop: e,
        name: a
      } = _core.CoreUtil.getWalletRouterData(),
      r = e?.native;
    if (r) {
      const o = _core.CoreUtil.formatNativeUrl(r, t, a);
      _core.CoreUtil.openHref(o, "_self");
    }
  }
  openDesktopApp() {
    _core.WcConnectionCtrl.setPairingError(!1);
    const {
        standaloneUri: t
      } = _core.OptionsCtrl.state,
      {
        pairingUri: e
      } = _core.WcConnectionCtrl.state,
      a = _core.CoreUtil.getWalletRouterData();
    s.setRecentWallet(a), t ? this.onFormatAndRedirect(t) : this.onFormatAndRedirect(e);
  }
  render() {
    const {
        name: t,
        id: e,
        image_id: a
      } = _core.CoreUtil.getWalletRouterData(),
      {
        isMobile: r,
        isInjected: o,
        isWeb: i
      } = s.getCachedRouterWalletPlatforms();
    return (0, _lit.html)`<w3m-modal-header title="${t}" .onAction="${s.handleUriCopy}" .actionIcon="${d.COPY_ICON}"></w3m-modal-header><w3m-modal-content><w3m-connector-waiting walletId="${e}" imageId="${a}" label="${`Continue in ${t}...`}" .isError="${this.isError}"></w3m-connector-waiting></w3m-modal-content><w3m-info-footer><w3m-text color="secondary" variant="small-thin">${`Connection can continue loading if ${t} is not installed on your device`}</w3m-text><w3m-platform-selection .isMobile="${r}" .isInjected="${o}" .isWeb="${i}" .isRetry="${!0}"><w3m-button .onClick="${this.openDesktopApp.bind(this)}" .iconRight="${d.RETRY_ICON}">Retry</w3m-button></w3m-platform-selection></w3m-info-footer>`;
  }
};
Bt.styles = [w.globalCss, Rr], Ze([(0, _decorators.state)()], Bt.prototype, "isError", 2), Bt = Ze([(0, _decorators.customElement)("w3m-desktop-connecting-view")], Bt);
const Hr = (0, _lit.css)`.w3m-info-text{margin:5px 0 15px;max-width:320px;text-align:center}.w3m-wallet-item{margin:0 -20px 0 0;padding-right:20px;display:flex;align-items:center;border-bottom:1px solid var(--w3m-color-bg-2)}.w3m-wallet-item:last-child{margin-bottom:-20px;border-bottom:0}.w3m-wallet-content{margin-left:20px;height:60px;display:flex;flex:1;align-items:center;justify-content:space-between}.w3m-footer-actions{display:flex;flex-direction:column;align-items:center;padding:20px 0;border-top:1px solid var(--w3m-color-bg-2)}w3m-wallet-image{display:block;width:40px;height:40px;border-radius:10px}`;
var Sr = Object.defineProperty,
  Br = Object.getOwnPropertyDescriptor,
  Ur = (t, e, a, r) => {
    for (var o = r > 1 ? void 0 : r ? Br(e, a) : e, i = t.length - 1, l; i >= 0; i--) (l = t[i]) && (o = (r ? l(e, a, o) : l(o)) || o);
    return r && o && Sr(e, a, o), o;
  };
let ge = class extends _lit.LitElement {
  onGet(t) {
    _core.CoreUtil.openHref(t, "_blank");
  }
  render() {
    const t = _core.ExplorerCtrl.state.recomendedWallets.slice(0, 5),
      e = Z.manualWallets().slice(0, 5),
      a = t.length,
      r = e.length;
    return (0, _lit.html)`<w3m-modal-header title="Get a wallet"></w3m-modal-header><w3m-modal-content>${a ? t.map(o => (0, _lit.html)`<div class="w3m-wallet-item"><w3m-wallet-image walletId="${o.id}" imageId="${o.image_id}"></w3m-wallet-image><div class="w3m-wallet-content"><w3m-text variant="medium-regular">${o.name}</w3m-text><w3m-button .iconRight="${d.ARROW_RIGHT_ICON}" .onClick="${() => this.onGet(o.homepage)}">Get</w3m-button></div></div>`) : null} ${r ? e.map(o => (0, _lit.html)`<div class="w3m-wallet-item"><w3m-wallet-image walletId="${o.id}"></w3m-wallet-image><div class="w3m-wallet-content"><w3m-text variant="medium-regular">${o.name}</w3m-text><w3m-button .iconRight="${d.ARROW_RIGHT_ICON}" .onClick="${() => this.onGet(o.links.universal)}">Get</w3m-button></div></div>`) : null}</w3m-modal-content><div class="w3m-footer-actions"><w3m-text variant="medium-regular">Not what you're looking for?</w3m-text><w3m-text variant="small-thin" color="secondary" class="w3m-info-text">With hundreds of wallets out there, there's something for everyone</w3m-text><w3m-button .onClick="${s.openWalletExplorerUrl}" .iconRight="${d.ARROW_UP_RIGHT_ICON}">Explore Wallets</w3m-button></div>`;
  }
};
ge.styles = [w.globalCss, Hr], ge = Ur([(0, _decorators.customElement)("w3m-get-wallet-view")], ge);
const Vr = (0, _lit.css)`.w3m-footer-actions{display:flex;justify-content:center}.w3m-footer-actions w3m-button{margin:0 5px}.w3m-info-container{display:flex;flex-direction:column;justify-content:center;align-items:center;margin-bottom:20px}.w3m-info-container:last-child{margin-bottom:0}.w3m-info-text{margin-top:5px;text-align:center}.w3m-images svg{margin:0 2px 5px;width:55px;height:55px}.help-img-highlight{stroke:var(--w3m-color-overlay)}`;
var zr = Object.defineProperty,
  Gr = Object.getOwnPropertyDescriptor,
  Fr = (t, e, a, r) => {
    for (var o = r > 1 ? void 0 : r ? Gr(e, a) : e, i = t.length - 1, l; i >= 0; i--) (l = t[i]) && (o = (r ? l(e, a, o) : l(o)) || o);
    return r && o && zr(e, a, o), o;
  };
let ue = class extends _lit.LitElement {
  constructor() {
    super(...arguments), this.learnUrl = "https://ethereum.org/en/wallets/";
  }
  onGet() {
    _core.ConfigCtrl.state.enableExplorer ? _core.RouterCtrl.push("GetWallet") : s.openWalletExplorerUrl();
  }
  onLearnMore() {
    _core.CoreUtil.openHref(this.learnUrl, "_blank");
  }
  render() {
    return (0, _lit.html)`<w3m-modal-header title="What is a wallet?"></w3m-modal-header><w3m-modal-content><div class="w3m-info-container"><div class="w3m-images">${d.HELP_CHART_IMG} ${d.HELP_PAINTING_IMG} ${d.HELP_ETH_IMG}</div><w3m-text variant="medium-regular">A home for your digital assets</w3m-text><w3m-text variant="small-thin" color="secondary" class="w3m-info-text">A wallet lets you store, send and receive digital assets like cryptocurrencies and NFTs.</w3m-text></div><div class="w3m-info-container"><div class="w3m-images">${d.HELP_KEY_IMG} ${d.HELP_USER_IMG} ${d.HELP_LOCK_IMG}</div><w3m-text variant="medium-regular">One login for all of web3</w3m-text><w3m-text variant="small-thin" color="secondary" class="w3m-info-text">Log in to any app by connecting your wallet. Say goodbye to countless passwords!</w3m-text></div><div class="w3m-info-container"><div class="w3m-images">${d.HELP_COMPAS_IMG} ${d.HELP_NOUN_IMG} ${d.HELP_DAO_IMG}</div><w3m-text variant="medium-regular">Your gateway to a new web</w3m-text><w3m-text variant="small-thin" color="secondary" class="w3m-info-text">With your wallet, you can explore and interact with DeFi, NFTs, DAOs, and much more.</w3m-text></div><div class="w3m-footer-actions"><w3m-button .onClick="${this.onGet.bind(this)}" .iconLeft="${d.WALLET_ICON}">Get a Wallet</w3m-button><w3m-button .onClick="${this.onLearnMore.bind(this)}" .iconRight="${d.ARROW_UP_RIGHT_ICON}">Learn More</w3m-button></div></w3m-modal-content>`;
  }
};
ue.styles = [w.globalCss, Vr], ue = Fr([(0, _decorators.customElement)("w3m-help-view")], ue);
const qr = (0, _lit.css)`w3m-info-footer{flex-direction:column;align-items:center;display:flex;width:100%;padding:5px 0}w3m-text{text-align:center}`;
var Kr = Object.defineProperty,
  Yr = Object.getOwnPropertyDescriptor,
  He = (t, e, a, r) => {
    for (var o = r > 1 ? void 0 : r ? Yr(e, a) : e, i = t.length - 1, l; i >= 0; i--) (l = t[i]) && (o = (r ? l(e, a, o) : l(o)) || o);
    return r && o && Kr(e, a, o), o;
  };
let Ut = class extends _lit.LitElement {
  constructor() {
    super(), this.isError = !1, this.connector = _core.ClientCtrl.client().getConnectorById("injected"), this.openInjectedApp();
  }
  async openInjectedApp() {
    const {
      ready: t
    } = this.connector;
    t && (this.isError = !1, await s.handleConnectorConnection("injected", () => {
      this.isError = !0;
    }));
  }
  render() {
    const {
        name: t,
        id: e,
        image_id: a
      } = _core.CoreUtil.getWalletRouterData(),
      {
        isMobile: r,
        isDesktop: o,
        isWeb: i
      } = s.getCachedRouterWalletPlatforms();
    return (0, _lit.html)`<w3m-modal-header title="${t}"></w3m-modal-header><w3m-modal-content><w3m-connector-waiting walletId="${e}" imageId="${a}" label="${`Continue in ${t}...`}" .isError="${this.isError}"></w3m-connector-waiting></w3m-modal-content><w3m-info-footer><w3m-text color="secondary" variant="small-thin">Connection can be declined if multiple wallets are installed or previous request is still active</w3m-text><w3m-platform-selection .isMobile="${r}" .isDesktop="${o}" .isWeb="${i}" .isRetry="${!0}"><w3m-button .onClick="${this.openInjectedApp.bind(this)}" .disabled="${!this.isError}" .iconRight="${d.RETRY_ICON}">Retry</w3m-button></w3m-platform-selection></w3m-info-footer>`;
  }
};
Ut.styles = [w.globalCss, qr], He([(0, _decorators.state)()], Ut.prototype, "isError", 2), Ut = He([(0, _decorators.customElement)("w3m-injected-connecting-view")], Ut);
const Qr = (0, _lit.css)`w3m-info-footer{flex-direction:column;align-items:center;display:flex;width:100%;padding:5px 0}w3m-text{text-align:center}w3m-button{margin-top:15px}`;
var Xr = Object.defineProperty,
  Jr = Object.getOwnPropertyDescriptor,
  ti = (t, e, a, r) => {
    for (var o = r > 1 ? void 0 : r ? Jr(e, a) : e, i = t.length - 1, l; i >= 0; i--) (l = t[i]) && (o = (r ? l(e, a, o) : l(o)) || o);
    return r && o && Xr(e, a, o), o;
  };
let ve = class extends _lit.LitElement {
  onInstall(t) {
    t && _core.CoreUtil.openHref(t, "_blank");
  }
  render() {
    const {
      name: t,
      id: e,
      image_id: a,
      homepage: r
    } = _core.CoreUtil.getWalletRouterData();
    return (0, _lit.html)`<w3m-modal-header title="${t}"></w3m-modal-header><w3m-modal-content><w3m-connector-waiting walletId="${e}" imageId="${a}" label="Not Detected" .isStale="${!0}"></w3m-connector-waiting></w3m-modal-content><w3m-info-footer><w3m-text color="secondary" variant="small-thin">${`Download ${t} to continue. If multiple browser extensions are installed, disable non ${t} ones and try again`}</w3m-text><w3m-button .onClick="${() => this.onInstall(r)}" .iconLeft="${d.ARROW_DOWN_ICON}">Download</w3m-button></w3m-info-footer>`;
  }
};
ve.styles = [w.globalCss, Qr], ve = ti([(0, _decorators.customElement)("w3m-install-wallet-view")], ve);
const ei = (0, _lit.css)`w3m-wallet-image{border-radius:var(--w3m-wallet-icon-large-border-radius);width:96px;height:96px;margin-bottom:20px}w3m-info-footer{display:flex;width:100%}.w3m-app-store{justify-content:space-between}.w3m-app-store w3m-wallet-image{margin-right:10px;margin-bottom:0;width:28px;height:28px;border-radius:var(--w3m-wallet-icon-small-border-radius)}.w3m-app-store div{display:flex;align-items:center}.w3m-app-store w3m-button{margin-right:-10px}.w3m-note{flex-direction:column;align-items:center;padding:5px 0}.w3m-note w3m-text{text-align:center}w3m-platform-selection div{display:flex}w3m-platform-selection w3m-button:nth-child(2){margin-left:10px}`;
var oi = Object.defineProperty,
  ai = Object.getOwnPropertyDescriptor,
  Se = (t, e, a, r) => {
    for (var o = r > 1 ? void 0 : r ? ai(e, a) : e, i = t.length - 1, l; i >= 0; i--) (l = t[i]) && (o = (r ? l(e, a, o) : l(o)) || o);
    return r && o && oi(e, a, o), o;
  };
let Vt = class extends _lit.LitElement {
  constructor() {
    super(), this.isError = !1, this.unwatchConnection = void 0, this.openMobileApp(), this.unwatchConnection = _core.WcConnectionCtrl.subscribe(t => {
      this.isError = t.pairingError;
    });
  }
  disconnectedCallback() {
    var t;
    (t = this.unwatchConnection) == null || t.call(this);
  }
  onFormatAndRedirect(t, e = !1) {
    const {
        mobile: a,
        name: r
      } = _core.CoreUtil.getWalletRouterData(),
      o = a?.native,
      i = a?.universal;
    if (o && !e) {
      const l = _core.CoreUtil.formatNativeUrl(o, t, r);
      _core.CoreUtil.openHref(l, "_self");
    } else if (i) {
      const l = _core.CoreUtil.formatUniversalUrl(i, t, r);
      _core.CoreUtil.openHref(l, "_self");
    }
  }
  openMobileApp(t = !1) {
    _core.WcConnectionCtrl.setPairingError(!1);
    const {
        standaloneUri: e
      } = _core.OptionsCtrl.state,
      {
        pairingUri: a
      } = _core.WcConnectionCtrl.state,
      r = _core.CoreUtil.getWalletRouterData();
    s.setRecentWallet(r), e ? this.onFormatAndRedirect(e, t) : this.onFormatAndRedirect(a, t);
  }
  onGoToAppStore(t) {
    t && _core.CoreUtil.openHref(t, "_blank");
  }
  render() {
    const {
        name: t,
        id: e,
        image_id: a,
        app: r,
        mobile: o
      } = _core.CoreUtil.getWalletRouterData(),
      {
        isWeb: i
      } = s.getCachedRouterWalletPlatforms(),
      l = r?.ios,
      p = o?.universal;
    return (0, _lit.html)`<w3m-modal-header title="${t}"></w3m-modal-header><w3m-modal-content><w3m-connector-waiting walletId="${e}" imageId="${a}" label="Tap 'Open' to continue…" .isError="${this.isError}"></w3m-connector-waiting></w3m-modal-content><w3m-info-footer class="w3m-note"><w3m-text color="secondary" variant="small-thin">You can reload the website to try again ${p ? ` or open ${t} using a "Backup" instead` : ""}</w3m-text><w3m-platform-selection .isWeb="${i}" .isRetry="${!0}"><div><w3m-button .onClick="${() => this.openMobileApp(!1)}" .iconRight="${d.RETRY_ICON}">Retry</w3m-button>${p ? (0, _lit.html)`<w3m-button variant="outline" .onClick="${() => this.openMobileApp(!0)}" .iconRight="${d.ARROW_UP_RIGHT_ICON}">Backup</w3m-button>` : null}</div></w3m-platform-selection></w3m-info-footer><w3m-info-footer class="w3m-app-store"><div><w3m-wallet-image walletId="${e}" imageId="${a}"></w3m-wallet-image><w3m-text>${`Get ${t}`}</w3m-text></div><w3m-button .iconRight="${d.ARROW_RIGHT_ICON}" .onClick="${() => this.onGoToAppStore(l)}" variant="ghost">App Store</w3m-button></w3m-info-footer>`;
  }
};
Vt.styles = [w.globalCss, ei], Se([(0, _decorators.state)()], Vt.prototype, "isError", 2), Vt = Se([(0, _decorators.customElement)("w3m-mobile-connecting-view")], Vt);
const ri = (0, _lit.css)`w3m-info-footer{flex-direction:column;align-items:center;display:flex;width:100%;padding:5px 0}w3m-text{text-align:center}`;
var ii = Object.defineProperty,
  li = Object.getOwnPropertyDescriptor,
  ni = (t, e, a, r) => {
    for (var o = r > 1 ? void 0 : r ? li(e, a) : e, i = t.length - 1, l; i >= 0; i--) (l = t[i]) && (o = (r ? l(e, a, o) : l(o)) || o);
    return r && o && ii(e, a, o), o;
  };
let be = class extends _lit.LitElement {
  render() {
    const {
        name: t,
        id: e,
        image_id: a
      } = _core.CoreUtil.getWalletRouterData(),
      {
        isInjected: r,
        isDesktop: o,
        isWeb: i
      } = s.getCachedRouterWalletPlatforms();
    return (0, _lit.html)`<w3m-modal-header title="${t}" .onAction="${s.handleUriCopy}" .actionIcon="${d.COPY_ICON}"></w3m-modal-header><w3m-modal-content><w3m-walletconnect-qr walletId="${e}" imageId="${a}"></w3m-walletconnect-qr></w3m-modal-content><w3m-info-footer><w3m-text color="secondary" variant="small-thin">${`Scan this qrcode with your phone's camera or inside ${t} app`}</w3m-text><w3m-platform-selection .isDesktop="${o}" .isInjected="${r}" .isWeb="${i}"></w3m-platform-selection></w3m-info-footer>`;
  }
};
be.styles = [w.globalCss, ri], be = ni([(0, _decorators.customElement)("w3m-mobile-qr-connecting-view")], be);
var si = Object.defineProperty,
  ci = Object.getOwnPropertyDescriptor,
  di = (t, e, a, r) => {
    for (var o = r > 1 ? void 0 : r ? ci(e, a) : e, i = t.length - 1, l; i >= 0; i--) (l = t[i]) && (o = (r ? l(e, a, o) : l(o)) || o);
    return r && o && si(e, a, o), o;
  };
let fe = class extends _lit.LitElement {
  render() {
    return (0, _lit.html)`<w3m-modal-header title="Scan the code" .onAction="${s.handleUriCopy}" .actionIcon="${d.COPY_ICON}"></w3m-modal-header><w3m-modal-content><w3m-walletconnect-qr></w3m-walletconnect-qr></w3m-modal-content>`;
  }
};
fe.styles = [w.globalCss], fe = di([(0, _decorators.customElement)("w3m-qrcode-view")], fe);
const mi = (0, _lit.css)`div{display:grid;grid-template-columns:repeat(4,80px);margin:-5px -10px;justify-content:space-between}w3m-info-footer{flex-direction:column;align-items:center;display:flex;width:100%;padding:5px 0}w3m-info-footer w3m-text{text-align:center}`;
var Ge = Object.defineProperty,
  hi = Object.defineProperties,
  pi = Object.getOwnPropertyDescriptor,
  wi = Object.getOwnPropertyDescriptors,
  Be = Object.getOwnPropertySymbols,
  gi = Object.prototype.hasOwnProperty,
  ui = Object.prototype.propertyIsEnumerable,
  Ue = (t, e, a) => e in t ? Ge(t, e, {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: a
  }) : t[e] = a,
  vi = (t, e) => {
    for (var a in e || (e = {})) gi.call(e, a) && Ue(t, a, e[a]);
    if (Be) for (var a of Be(e)) ui.call(e, a) && Ue(t, a, e[a]);
    return t;
  },
  bi = (t, e) => hi(t, wi(e)),
  xe = (t, e, a, r) => {
    for (var o = r > 1 ? void 0 : r ? pi(e, a) : e, i = t.length - 1, l; i >= 0; i--) (l = t[i]) && (o = (r ? l(e, a, o) : l(o)) || o);
    return r && o && Ge(e, a, o), o;
  };
let Wt = class extends _lit.LitElement {
  constructor() {
    super(), this.connectedChains = "ALL", this.isUnsupportedChains = !1, this.getConnectedChainIds();
  }
  async getConnectedChainIds() {
    this.connectedChains = await _core.ClientCtrl.client().getConnectedChainIds();
  }
  async onSelectChain(t) {
    try {
      const {
          selectedChain: e,
          walletConnectVersion: a,
          isPreferInjected: r
        } = _core.OptionsCtrl.state,
        {
          isConnected: o
        } = _core.AccountCtrl.state;
      o ? e?.id === t.id ? _core.RouterCtrl.reset("Account") : a === 2 ? (await _core.ClientCtrl.client().switchNetwork({
        chainId: t.id
      }), _core.RouterCtrl.reset("Account")) : _core.RouterCtrl.push("SwitchNetwork", {
        SwitchNetwork: t
      }) : r ? (_core.OptionsCtrl.setSelectedChain(t), _core.ModalCtrl.close()) : (_core.OptionsCtrl.setSelectedChain(t), _core.RouterCtrl.push("ConnectWallet"));
    } catch (e) {
      console.error(e), _core.ToastCtrl.openToast(s.getErrorMessage(e), "error");
    }
  }
  isUnsuportedChainId(t) {
    return typeof this.connectedChains == "string" && this.connectedChains !== "ALL" ? (this.isUnsupportedChains = !0, !0) : Array.isArray(this.connectedChains) && !this.connectedChains.includes(String(t)) ? (this.isUnsupportedChains = !0, !0) : !1;
  }
  render() {
    const {
        chains: t
      } = _core.OptionsCtrl.state,
      e = t?.map(r => bi(vi({}, r), {
        unsupported: this.isUnsuportedChainId(r.id)
      })),
      a = e?.sort((r, o) => Number(r.unsupported) - Number(o.unsupported));
    return (0, _lit.html)`<w3m-modal-header title="Select network"></w3m-modal-header><w3m-modal-content><div>${a?.map(r => (0, _lit.html)`<w3m-network-button name="${r.name}" chainId="${r.id}" .unsupported="${r.unsupported}" .onClick="${async () => this.onSelectChain(r)}">${r.name}</w3m-network-button>`)}</div></w3m-modal-content>${this.isUnsupportedChains ? (0, _lit.html)`<w3m-info-footer><w3m-text color="secondary" variant="small-thin">Your connected wallet may not support some of the networks available for this dapp</w3m-text></w3m-info-footer>` : null}`;
  }
};
Wt.styles = [w.globalCss, mi], xe([(0, _decorators.state)()], Wt.prototype, "connectedChains", 2), xe([(0, _decorators.state)()], Wt.prototype, "isUnsupportedChains", 2), Wt = xe([(0, _decorators.customElement)("w3m-select-network-view")], Wt);
const fi = (0, _lit.css)`w3m-info-footer{flex-direction:column;align-items:center;display:flex;width:100%;padding:5px 0}w3m-text{text-align:center}w3m-button{margin-top:15px}`;
var xi = Object.defineProperty,
  yi = Object.getOwnPropertyDescriptor,
  Ve = (t, e, a, r) => {
    for (var o = r > 1 ? void 0 : r ? yi(e, a) : e, i = t.length - 1, l; i >= 0; i--) (l = t[i]) && (o = (r ? l(e, a, o) : l(o)) || o);
    return r && o && xi(e, a, o), o;
  };
let zt = class extends _lit.LitElement {
  constructor() {
    super(), this.isError = !1, this.onSwitchNetwork();
  }
  async onSwitchNetwork() {
    try {
      this.isError = !1;
      const t = _core.CoreUtil.getSwitchNetworkRouterData();
      await _core.ClientCtrl.client().switchNetwork({
        chainId: t.id
      }), _core.OptionsCtrl.setSelectedChain(t), _core.RouterCtrl.reset("Account");
    } catch {
      this.isError = !0;
    }
  }
  render() {
    const {
      id: t,
      name: e
    } = _core.CoreUtil.getSwitchNetworkRouterData();
    return (0, _lit.html)`<w3m-modal-header title="${`Connect to ${e}`}"></w3m-modal-header><w3m-modal-content><w3m-network-waiting chainId="${t}" label="Approve in your wallet" .isError="${this.isError}"></w3m-network-waiting></w3m-modal-content><w3m-info-footer><w3m-text color="secondary" variant="small-thin">Switch can be declined if chain is not supported by a wallet or previous request is still active</w3m-text><w3m-button .onClick="${this.onSwitchNetwork.bind(this)}" .disabled="${!this.isError}" .iconRight="${d.RETRY_ICON}">Try Again</w3m-button></w3m-info-footer>`;
  }
};
zt.styles = [w.globalCss, fi], Ve([(0, _decorators.state)()], zt.prototype, "isError", 2), zt = Ve([(0, _decorators.customElement)("w3m-switch-network-view")], zt);
const Ci = (0, _lit.css)`w3m-modal-content{height:clamp(200px,60vh,600px);display:block;overflow:scroll;scrollbar-width:none;position:relative;margin-top:1px}.w3m-grid{display:grid;grid-template-columns:repeat(4,80px);justify-content:space-between;margin:-15px -10px;padding-top:20px}w3m-modal-content::after,w3m-modal-content::before{content:'';position:fixed;pointer-events:none;z-index:1;width:100%;height:20px;opacity:1}w3m-modal-content::before{box-shadow:0 -1px 0 0 var(--w3m-color-bg-1);background:linear-gradient(var(--w3m-color-bg-1),rgba(255,255,255,0))}w3m-modal-content::after{box-shadow:0 1px 0 0 var(--w3m-color-bg-1);background:linear-gradient(rgba(255,255,255,0),var(--w3m-color-bg-1));top:calc(100% - 20px)}w3m-modal-content::-webkit-scrollbar{display:none}.w3m-placeholder-block{display:flex;justify-content:center;align-items:center;height:100px;overflow:hidden}.w3m-empty,.w3m-loading{display:flex}.w3m-loading .w3m-placeholder-block{height:100%}.w3m-end-reached .w3m-placeholder-block{height:0;opacity:0}.w3m-empty .w3m-placeholder-block{opacity:1;height:100%}w3m-wallet-button{margin:calc((100% - 60px)/ 3) 0}`;
var $i = Object.defineProperty,
  ki = Object.getOwnPropertyDescriptor,
  At = (t, e, a, r) => {
    for (var o = r > 1 ? void 0 : r ? ki(e, a) : e, i = t.length - 1, l; i >= 0; i--) (l = t[i]) && (o = (r ? l(e, a, o) : l(o)) || o);
    return r && o && $i(e, a, o), o;
  };
const ye = 40;
let ot = class extends _lit.LitElement {
  constructor() {
    super(...arguments), this.loading = !_core.ExplorerCtrl.state.wallets.listings.length, this.firstFetch = !_core.ExplorerCtrl.state.wallets.listings.length, this.search = "", this.endReached = !1, this.intersectionObserver = void 0, this.searchDebounce = s.debounce(t => {
      t.length >= 3 ? (this.firstFetch = !0, this.endReached = !1, this.search = t, _core.ExplorerCtrl.resetSearch(), this.fetchWallets()) : this.search && (this.search = "", this.endReached = this.isLastPage(), _core.ExplorerCtrl.resetSearch());
    });
  }
  firstUpdated() {
    this.createPaginationObserver();
  }
  disconnectedCallback() {
    var t;
    (t = this.intersectionObserver) == null || t.disconnect();
  }
  get placeholderEl() {
    return s.getShadowRootElement(this, ".w3m-placeholder-block");
  }
  createPaginationObserver() {
    this.intersectionObserver = new IntersectionObserver(([t]) => {
      t.isIntersecting && !(this.search && this.firstFetch) && this.fetchWallets();
    }), this.intersectionObserver.observe(this.placeholderEl);
  }
  isLastPage() {
    const {
        wallets: t,
        search: e
      } = _core.ExplorerCtrl.state,
      {
        listings: a,
        total: r
      } = this.search ? e : t;
    return r <= ye || a.length >= r;
  }
  async fetchWallets() {
    var t;
    const {
        wallets: e,
        search: a,
        injectedWallets: r
      } = _core.ExplorerCtrl.state,
      {
        listings: o,
        total: i,
        page: l
      } = this.search ? a : e;
    if (!this.endReached && (this.firstFetch || i > ye && o.length < i)) try {
      this.loading = !0;
      const p = (t = _core.OptionsCtrl.state.standaloneChains) == null ? void 0 : t.join(","),
        {
          listings: u
        } = await _core.ExplorerCtrl.getWallets({
          page: this.firstFetch ? 1 : l + 1,
          entries: ye,
          search: this.search,
          version: _core.OptionsCtrl.state.walletConnectVersion,
          chains: p
        }),
        f = u.map($ => s.getWalletIcon($)),
        j = r.map($ => s.getWalletIcon($));
      await Promise.all([...f.map(async $ => s.preloadImage($)), ...j.map(async $ => s.preloadImage($)), _core.CoreUtil.wait(300)]), this.endReached = this.isLastPage();
    } catch (p) {
      console.error(p), _core.ToastCtrl.openToast(s.getErrorMessage(p), "error");
    } finally {
      this.loading = !1, this.firstFetch = !1;
    }
  }
  onConnect(t) {
    _core.CoreUtil.isAndroid() ? s.handleMobileLinking(t) : s.goToConnectingView(t);
  }
  onSearchChange(t) {
    const {
      value: e
    } = t.target;
    this.searchDebounce(e);
  }
  render() {
    const {
        wallets: t,
        search: e
      } = _core.ExplorerCtrl.state,
      {
        listings: a
      } = this.search ? e : t,
      r = this.loading && !a.length,
      o = this.search.length >= 3;
    let i = P.injectedWalletsTemplate(),
      l = P.manualWalletsTemplate(),
      p = P.recomendedWalletsTemplate(!0);
    o && (i = i.filter(({
      values: $
    }) => s.caseSafeIncludes($[0], this.search)), l = l.filter(({
      values: $
    }) => s.caseSafeIncludes($[0], this.search)), p = p.filter(({
      values: $
    }) => s.caseSafeIncludes($[0], this.search)));
    const u = !this.loading && !a.length && !i.length && !p.length,
      f = Math.max(i.length, a.length),
      j = {
        "w3m-loading": r,
        "w3m-end-reached": this.endReached || !this.loading,
        "w3m-empty": u
      };
    return (0, _lit.html)`<w3m-modal-header><w3m-search-input .onChange="${this.onSearchChange.bind(this)}"></w3m-search-input></w3m-modal-header><w3m-modal-content class="${(0, _classMap.classMap)(j)}"><div class="w3m-grid">${r ? null : p} ${r ? null : [...Array(f)].map(($, _) => (0, _lit.html)`${l[_]} ${i[_]} ${a[_] ? (0, _lit.html)`<w3m-wallet-button imageId="${a[_].image_id}" name="${a[_].name}" walletId="${a[_].id}" .onClick="${() => this.onConnect(a[_])}"></w3m-wallet-button>` : null}`)}</div><div class="w3m-placeholder-block">${u ? (0, _lit.html)`<w3m-text variant="big-bold" color="secondary">No results found</w3m-text>` : null} ${!u && this.loading ? (0, _lit.html)`<w3m-spinner></w3m-spinner>` : null}</div></w3m-modal-content>`;
  }
};
ot.styles = [w.globalCss, Ci], At([(0, _decorators.state)()], ot.prototype, "loading", 2), At([(0, _decorators.state)()], ot.prototype, "firstFetch", 2), At([(0, _decorators.state)()], ot.prototype, "search", 2), At([(0, _decorators.state)()], ot.prototype, "endReached", 2), ot = At([(0, _decorators.customElement)("w3m-wallet-explorer-view")], ot);
const Oi = (0, _lit.css)`w3m-info-footer{flex-direction:column;align-items:center;display:flex;width:100%;padding:5px 0}w3m-text{text-align:center}`;
var Ii = Object.defineProperty,
  Ei = Object.getOwnPropertyDescriptor,
  ze = (t, e, a, r) => {
    for (var o = r > 1 ? void 0 : r ? Ei(e, a) : e, i = t.length - 1, l; i >= 0; i--) (l = t[i]) && (o = (r ? l(e, a, o) : l(o)) || o);
    return r && o && Ii(e, a, o), o;
  };
let Gt = class extends _lit.LitElement {
  constructor() {
    super(), this.isError = !1, this.unwatchConnection = void 0, this.openWebWallet(), this.unwatchConnection = _core.WcConnectionCtrl.subscribe(t => {
      this.isError = t.pairingError;
    });
  }
  disconnectedCallback() {
    var t;
    (t = this.unwatchConnection) == null || t.call(this);
  }
  onFormatAndRedirect(t) {
    const {
        desktop: e,
        name: a
      } = _core.CoreUtil.getWalletRouterData(),
      r = e?.universal;
    if (r) {
      const o = _core.CoreUtil.formatUniversalUrl(r, t, a);
      _core.CoreUtil.openHref(o, "_blank");
    }
  }
  openWebWallet() {
    _core.WcConnectionCtrl.setPairingError(!1);
    const {
        standaloneUri: t
      } = _core.OptionsCtrl.state,
      {
        pairingUri: e
      } = _core.WcConnectionCtrl.state,
      a = _core.CoreUtil.getWalletRouterData();
    s.setRecentWallet(a), t ? this.onFormatAndRedirect(t) : this.onFormatAndRedirect(e);
  }
  render() {
    const {
        name: t,
        id: e,
        image_id: a
      } = _core.CoreUtil.getWalletRouterData(),
      {
        isMobile: r,
        isInjected: o,
        isDesktop: i
      } = s.getCachedRouterWalletPlatforms(),
      l = _core.CoreUtil.isMobile();
    return (0, _lit.html)`<w3m-modal-header title="${t}" .onAction="${s.handleUriCopy}" .actionIcon="${d.COPY_ICON}"></w3m-modal-header><w3m-modal-content><w3m-connector-waiting walletId="${e}" imageId="${a}" label="${`Continue in ${t}...`}" .isError="${this.isError}"></w3m-connector-waiting></w3m-modal-content><w3m-info-footer><w3m-text color="secondary" variant="small-thin">${`${t} web app has opened in a new tab. Go there, accept the connection, and come back`}</w3m-text><w3m-platform-selection .isMobile="${r}" .isInjected="${l ? !1 : o}" .isDesktop="${l ? !1 : i}" .isRetry="${!0}"><w3m-button .onClick="${this.openWebWallet.bind(this)}" .iconRight="${d.RETRY_ICON}">Retry</w3m-button></w3m-platform-selection></w3m-info-footer>`;
  }
};
Gt.styles = [w.globalCss, Oi], ze([(0, _decorators.state)()], Gt.prototype, "isError", 2), Gt = ze([(0, _decorators.customElement)("w3m-web-connecting-view")], Gt);
},{"lit":"node_modules/lit/index.js","lit/decorators.js":"node_modules/lit/decorators.js","@web3modal/core":"node_modules/@web3modal/core/dist/index.js","lit/directives/class-map.js":"node_modules/lit/directives/class-map.js","lit-html":"node_modules/lit-html/lit-html.js","motion":"node_modules/motion/dist/main.es.js","qrcode":"node_modules/@web3modal/ui/node_modules/qrcode/lib/browser.js"}],"../.nvm/versions/node/v18.15.0/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}
module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "41485" + '/');
  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);
    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);
          if (didAccept) {
            handled = true;
          }
        }
      });

      // Enable HMR for CSS by default.
      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });
      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }
    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }
    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }
    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}
function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}
function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}
function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }
}
},{}]},{},["../.nvm/versions/node/v18.15.0/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js"], null)
//# sourceMappingURL=/dist.88f77487.js.map