import { defineComponent as W, ref as L, createElementBlock as j, openBlock as F, createElementVNode as C, withDirectives as dt, withKeys as ht, vModelText as pt, createCommentVNode as I, normalizeClass as q, toDisplayString as re, watch as X, createVNode as ne, Fragment as mt, renderList as yt, withModifiers as Wt, unref as D, createTextVNode as Qt, inject as Xt, onMounted as gt, onBeforeUnmount as Zt, createBlock as bt, provide as Gt } from "vue";
const Yt = { class: "flex items-center border border-gray-300 rounded-lg px-3 py-2 w-full max-w-md" }, er = /* @__PURE__ */ W({
  name: "DCodeChatSearch",
  __name: "DCodeChatSearch",
  props: {
    searchRoute: { default: () => "dcode-chat.search.index" }
  },
  emits: ["searchUpdated"],
  setup(t, { emit: e }) {
    const r = e, n = L(""), s = () => {
      r("searchUpdated", n.value);
    };
    return (o, i) => (F(), j("div", Yt, [
      i[1] || (i[1] = C("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        class: "h-5 w-5 text-gray-400",
        viewBox: "0 0 20 20",
        fill: "currentColor"
      }, [
        C("path", {
          "fill-rule": "evenodd",
          d: "M12.9 14.32a8 8 0 111.414-1.414l4.387 4.387a1 1 0 01-1.414 1.414l-4.387-4.387zM14 8a6 6 0 11-12 0 6 6 0 0112 0z",
          "clip-rule": "evenodd"
        })
      ], -1)),
      dt(C("input", {
        onKeyup: ht(s, ["enter"]),
        type: "text",
        "onUpdate:modelValue": i[0] || (i[0] = (u) => n.value = u),
        placeholder: "Search chats",
        class: "ml-2 w-full outline-none bg-transparent text-gray-600 placeholder-gray-400"
      }, null, 544), [
        [pt, n.value]
      ])
    ]));
  }
}), tr = { class: "flex items-center space-x-3 dcode-chat__listing cursor-default" }, rr = { class: "relative" }, nr = ["src", "alt"], sr = {
  key: 0,
  class: "absolute top-0 left-0 w-3 h-3 rounded-full border-2 border-red-500 bg-red-500"
}, or = { class: "text-sm font-semibold text-gray-900" }, ir = { class: "text-sm text-gray-500" }, wt = /* @__PURE__ */ W({
  name: "DCodeChatListing",
  __name: "DCodeChatListing",
  props: {
    chat: {},
    selected: { type: Boolean },
    ignoreUnread: { type: Boolean }
  },
  setup(t) {
    return (e, r) => {
      var n, s, o, i, u, y, d, c, g, w, m, h, l, a;
      return F(), j("div", tr, [
        C("div", rr, [
          C("div", {
            class: q(["w-10 h-10 rounded-full border dcode-chat__listing-avatar flex items-center justify-center", { "border-green-500": e.selected, "border-gray-300": !e.selected }])
          }, [
            (s = (n = e.chat) == null ? void 0 : n.pivot) != null && s.chat_avatar ? I("", !0) : (F(), j("div", {
              key: 0,
              class: q(["w-10 h-10", { "fill-green-500": e.selected, "fill-gray-300": !e.selected }])
            }, r[0] || (r[0] = [
              C("svg", {
                xmlns: "http://www.w3.org/2000/svg",
                fill: "currentFill",
                viewBox: "0 0 24 24"
              }, [
                C("path", { d: "M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" })
              ], -1)
            ]), 2)),
            (i = (o = e.chat) == null ? void 0 : o.pivot) != null && i.chat_avatar ? (F(), j("img", {
              key: 1,
              src: ((y = (u = e.chat) == null ? void 0 : u.pivot) == null ? void 0 : y.chat_avatar) + "?selected=" + (e.selected ? "selected" : ""),
              alt: (c = (d = e.chat) == null ? void 0 : d.pivot) == null ? void 0 : c.chat_title,
              class: "w-full h-full rounded-full object-cover"
            }, null, 8, nr)) : I("", !0)
          ], 2),
          (w = (g = e.chat) == null ? void 0 : g.pivot) != null && w.has_new_messages && !e.ignoreUnread ? (F(), j("div", sr)) : I("", !0)
        ]),
        C("div", null, [
          C("div", or, re((h = (m = e.chat) == null ? void 0 : m.pivot) == null ? void 0 : h.chat_title), 1),
          C("div", ir, re((a = (l = e.chat) == null ? void 0 : l.pivot) == null ? void 0 : a.chat_description), 1)
        ])
      ]);
    };
  }
});
function vt(t, e) {
  return function() {
    return t.apply(e, arguments);
  };
}
const { toString: ar } = Object.prototype, { getPrototypeOf: Be } = Object, { iterator: he, toStringTag: St } = Symbol, pe = /* @__PURE__ */ ((t) => (e) => {
  const r = ar.call(e);
  return t[r] || (t[r] = r.slice(8, -1).toLowerCase());
})(/* @__PURE__ */ Object.create(null)), M = (t) => (t = t.toLowerCase(), (e) => pe(e) === t), me = (t) => (e) => typeof e === t, { isArray: Z } = Array, se = me("undefined");
function lr(t) {
  return t !== null && !se(t) && t.constructor !== null && !se(t.constructor) && $(t.constructor.isBuffer) && t.constructor.isBuffer(t);
}
const Et = M("ArrayBuffer");
function cr(t) {
  let e;
  return typeof ArrayBuffer < "u" && ArrayBuffer.isView ? e = ArrayBuffer.isView(t) : e = t && t.buffer && Et(t.buffer), e;
}
const ur = me("string"), $ = me("function"), Rt = me("number"), ye = (t) => t !== null && typeof t == "object", fr = (t) => t === !0 || t === !1, le = (t) => {
  if (pe(t) !== "object")
    return !1;
  const e = Be(t);
  return (e === null || e === Object.prototype || Object.getPrototypeOf(e) === null) && !(St in t) && !(he in t);
}, dr = M("Date"), hr = M("File"), pr = M("Blob"), mr = M("FileList"), yr = (t) => ye(t) && $(t.pipe), gr = (t) => {
  let e;
  return t && (typeof FormData == "function" && t instanceof FormData || $(t.append) && ((e = pe(t)) === "formdata" || // detect form-data instance
  e === "object" && $(t.toString) && t.toString() === "[object FormData]"));
}, br = M("URLSearchParams"), [wr, vr, Sr, Er] = ["ReadableStream", "Request", "Response", "Headers"].map(M), Rr = (t) => t.trim ? t.trim() : t.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function oe(t, e, { allOwnKeys: r = !1 } = {}) {
  if (t === null || typeof t > "u")
    return;
  let n, s;
  if (typeof t != "object" && (t = [t]), Z(t))
    for (n = 0, s = t.length; n < s; n++)
      e.call(null, t[n], n, t);
  else {
    const o = r ? Object.getOwnPropertyNames(t) : Object.keys(t), i = o.length;
    let u;
    for (n = 0; n < i; n++)
      u = o[n], e.call(null, t[u], u, t);
  }
}
function xt(t, e) {
  e = e.toLowerCase();
  const r = Object.keys(t);
  let n = r.length, s;
  for (; n-- > 0; )
    if (s = r[n], e === s.toLowerCase())
      return s;
  return null;
}
const V = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : global, Ot = (t) => !se(t) && t !== V;
function Fe() {
  const { caseless: t } = Ot(this) && this || {}, e = {}, r = (n, s) => {
    const o = t && xt(e, s) || s;
    le(e[o]) && le(n) ? e[o] = Fe(e[o], n) : le(n) ? e[o] = Fe({}, n) : Z(n) ? e[o] = n.slice() : e[o] = n;
  };
  for (let n = 0, s = arguments.length; n < s; n++)
    arguments[n] && oe(arguments[n], r);
  return e;
}
const xr = (t, e, r, { allOwnKeys: n } = {}) => (oe(e, (s, o) => {
  r && $(s) ? t[o] = vt(s, r) : t[o] = s;
}, { allOwnKeys: n }), t), Or = (t) => (t.charCodeAt(0) === 65279 && (t = t.slice(1)), t), _r = (t, e, r, n) => {
  t.prototype = Object.create(e.prototype, n), t.prototype.constructor = t, Object.defineProperty(t, "super", {
    value: e.prototype
  }), r && Object.assign(t.prototype, r);
}, Cr = (t, e, r, n) => {
  let s, o, i;
  const u = {};
  if (e = e || {}, t == null) return e;
  do {
    for (s = Object.getOwnPropertyNames(t), o = s.length; o-- > 0; )
      i = s[o], (!n || n(i, t, e)) && !u[i] && (e[i] = t[i], u[i] = !0);
    t = r !== !1 && Be(t);
  } while (t && (!r || r(t, e)) && t !== Object.prototype);
  return e;
}, Ar = (t, e, r) => {
  t = String(t), (r === void 0 || r > t.length) && (r = t.length), r -= e.length;
  const n = t.indexOf(e, r);
  return n !== -1 && n === r;
}, Tr = (t) => {
  if (!t) return null;
  if (Z(t)) return t;
  let e = t.length;
  if (!Rt(e)) return null;
  const r = new Array(e);
  for (; e-- > 0; )
    r[e] = t[e];
  return r;
}, Nr = /* @__PURE__ */ ((t) => (e) => t && e instanceof t)(typeof Uint8Array < "u" && Be(Uint8Array)), Pr = (t, e) => {
  const n = (t && t[he]).call(t);
  let s;
  for (; (s = n.next()) && !s.done; ) {
    const o = s.value;
    e.call(t, o[0], o[1]);
  }
}, Fr = (t, e) => {
  let r;
  const n = [];
  for (; (r = t.exec(e)) !== null; )
    n.push(r);
  return n;
}, jr = M("HTMLFormElement"), Dr = (t) => t.toLowerCase().replace(
  /[-_\s]([a-z\d])(\w*)/g,
  function(r, n, s) {
    return n.toUpperCase() + s;
  }
), We = (({ hasOwnProperty: t }) => (e, r) => t.call(e, r))(Object.prototype), Ur = M("RegExp"), _t = (t, e) => {
  const r = Object.getOwnPropertyDescriptors(t), n = {};
  oe(r, (s, o) => {
    let i;
    (i = e(s, o, t)) !== !1 && (n[o] = i || s);
  }), Object.defineProperties(t, n);
}, Lr = (t) => {
  _t(t, (e, r) => {
    if ($(t) && ["arguments", "caller", "callee"].indexOf(r) !== -1)
      return !1;
    const n = t[r];
    if ($(n)) {
      if (e.enumerable = !1, "writable" in e) {
        e.writable = !1;
        return;
      }
      e.set || (e.set = () => {
        throw Error("Can not rewrite read-only method '" + r + "'");
      });
    }
  });
}, $r = (t, e) => {
  const r = {}, n = (s) => {
    s.forEach((o) => {
      r[o] = !0;
    });
  };
  return Z(t) ? n(t) : n(String(t).split(e)), r;
}, kr = () => {
}, Br = (t, e) => t != null && Number.isFinite(t = +t) ? t : e;
function qr(t) {
  return !!(t && $(t.append) && t[St] === "FormData" && t[he]);
}
const Mr = (t) => {
  const e = new Array(10), r = (n, s) => {
    if (ye(n)) {
      if (e.indexOf(n) >= 0)
        return;
      if (!("toJSON" in n)) {
        e[s] = n;
        const o = Z(n) ? [] : {};
        return oe(n, (i, u) => {
          const y = r(i, s + 1);
          !se(y) && (o[u] = y);
        }), e[s] = void 0, o;
      }
    }
    return n;
  };
  return r(t, 0);
}, Hr = M("AsyncFunction"), Ir = (t) => t && (ye(t) || $(t)) && $(t.then) && $(t.catch), Ct = ((t, e) => t ? setImmediate : e ? ((r, n) => (V.addEventListener("message", ({ source: s, data: o }) => {
  s === V && o === r && n.length && n.shift()();
}, !1), (s) => {
  n.push(s), V.postMessage(r, "*");
}))(`axios@${Math.random()}`, []) : (r) => setTimeout(r))(
  typeof setImmediate == "function",
  $(V.postMessage)
), zr = typeof queueMicrotask < "u" ? queueMicrotask.bind(V) : typeof process < "u" && process.nextTick || Ct, Vr = (t) => t != null && $(t[he]), f = {
  isArray: Z,
  isArrayBuffer: Et,
  isBuffer: lr,
  isFormData: gr,
  isArrayBufferView: cr,
  isString: ur,
  isNumber: Rt,
  isBoolean: fr,
  isObject: ye,
  isPlainObject: le,
  isReadableStream: wr,
  isRequest: vr,
  isResponse: Sr,
  isHeaders: Er,
  isUndefined: se,
  isDate: dr,
  isFile: hr,
  isBlob: pr,
  isRegExp: Ur,
  isFunction: $,
  isStream: yr,
  isURLSearchParams: br,
  isTypedArray: Nr,
  isFileList: mr,
  forEach: oe,
  merge: Fe,
  extend: xr,
  trim: Rr,
  stripBOM: Or,
  inherits: _r,
  toFlatObject: Cr,
  kindOf: pe,
  kindOfTest: M,
  endsWith: Ar,
  toArray: Tr,
  forEachEntry: Pr,
  matchAll: Fr,
  isHTMLForm: jr,
  hasOwnProperty: We,
  hasOwnProp: We,
  // an alias to avoid ESLint no-prototype-builtins detection
  reduceDescriptors: _t,
  freezeMethods: Lr,
  toObjectSet: $r,
  toCamelCase: Dr,
  noop: kr,
  toFiniteNumber: Br,
  findKey: xt,
  global: V,
  isContextDefined: Ot,
  isSpecCompliantForm: qr,
  toJSONObject: Mr,
  isAsyncFn: Hr,
  isThenable: Ir,
  setImmediate: Ct,
  asap: zr,
  isIterable: Vr
};
function O(t, e, r, n, s) {
  Error.call(this), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack, this.message = t, this.name = "AxiosError", e && (this.code = e), r && (this.config = r), n && (this.request = n), s && (this.response = s, this.status = s.status ? s.status : null);
}
f.inherits(O, Error, {
  toJSON: function() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: f.toJSONObject(this.config),
      code: this.code,
      status: this.status
    };
  }
});
const At = O.prototype, Tt = {};
[
  "ERR_BAD_OPTION_VALUE",
  "ERR_BAD_OPTION",
  "ECONNABORTED",
  "ETIMEDOUT",
  "ERR_NETWORK",
  "ERR_FR_TOO_MANY_REDIRECTS",
  "ERR_DEPRECATED",
  "ERR_BAD_RESPONSE",
  "ERR_BAD_REQUEST",
  "ERR_CANCELED",
  "ERR_NOT_SUPPORT",
  "ERR_INVALID_URL"
  // eslint-disable-next-line func-names
].forEach((t) => {
  Tt[t] = { value: t };
});
Object.defineProperties(O, Tt);
Object.defineProperty(At, "isAxiosError", { value: !0 });
O.from = (t, e, r, n, s, o) => {
  const i = Object.create(At);
  return f.toFlatObject(t, i, function(y) {
    return y !== Error.prototype;
  }, (u) => u !== "isAxiosError"), O.call(i, t.message, e, r, n, s), i.cause = t, i.name = t.name, o && Object.assign(i, o), i;
};
const Jr = null;
function je(t) {
  return f.isPlainObject(t) || f.isArray(t);
}
function Nt(t) {
  return f.endsWith(t, "[]") ? t.slice(0, -2) : t;
}
function Qe(t, e, r) {
  return t ? t.concat(e).map(function(s, o) {
    return s = Nt(s), !r && o ? "[" + s + "]" : s;
  }).join(r ? "." : "") : e;
}
function Kr(t) {
  return f.isArray(t) && !t.some(je);
}
const Wr = f.toFlatObject(f, {}, null, function(e) {
  return /^is[A-Z]/.test(e);
});
function ge(t, e, r) {
  if (!f.isObject(t))
    throw new TypeError("target must be an object");
  e = e || new FormData(), r = f.toFlatObject(r, {
    metaTokens: !0,
    dots: !1,
    indexes: !1
  }, !1, function(l, a) {
    return !f.isUndefined(a[l]);
  });
  const n = r.metaTokens, s = r.visitor || c, o = r.dots, i = r.indexes, y = (r.Blob || typeof Blob < "u" && Blob) && f.isSpecCompliantForm(e);
  if (!f.isFunction(s))
    throw new TypeError("visitor must be a function");
  function d(h) {
    if (h === null) return "";
    if (f.isDate(h))
      return h.toISOString();
    if (!y && f.isBlob(h))
      throw new O("Blob is not supported. Use a Buffer instead.");
    return f.isArrayBuffer(h) || f.isTypedArray(h) ? y && typeof Blob == "function" ? new Blob([h]) : Buffer.from(h) : h;
  }
  function c(h, l, a) {
    let p = h;
    if (h && !a && typeof h == "object") {
      if (f.endsWith(l, "{}"))
        l = n ? l : l.slice(0, -2), h = JSON.stringify(h);
      else if (f.isArray(h) && Kr(h) || (f.isFileList(h) || f.endsWith(l, "[]")) && (p = f.toArray(h)))
        return l = Nt(l), p.forEach(function(S, v) {
          !(f.isUndefined(S) || S === null) && e.append(
            // eslint-disable-next-line no-nested-ternary
            i === !0 ? Qe([l], v, o) : i === null ? l : l + "[]",
            d(S)
          );
        }), !1;
    }
    return je(h) ? !0 : (e.append(Qe(a, l, o), d(h)), !1);
  }
  const g = [], w = Object.assign(Wr, {
    defaultVisitor: c,
    convertValue: d,
    isVisitable: je
  });
  function m(h, l) {
    if (!f.isUndefined(h)) {
      if (g.indexOf(h) !== -1)
        throw Error("Circular reference detected in " + l.join("."));
      g.push(h), f.forEach(h, function(p, b) {
        (!(f.isUndefined(p) || p === null) && s.call(
          e,
          p,
          f.isString(b) ? b.trim() : b,
          l,
          w
        )) === !0 && m(p, l ? l.concat(b) : [b]);
      }), g.pop();
    }
  }
  if (!f.isObject(t))
    throw new TypeError("data must be an object");
  return m(t), e;
}
function Xe(t) {
  const e = {
    "!": "%21",
    "'": "%27",
    "(": "%28",
    ")": "%29",
    "~": "%7E",
    "%20": "+",
    "%00": "\0"
  };
  return encodeURIComponent(t).replace(/[!'()~]|%20|%00/g, function(n) {
    return e[n];
  });
}
function qe(t, e) {
  this._pairs = [], t && ge(t, this, e);
}
const Pt = qe.prototype;
Pt.append = function(e, r) {
  this._pairs.push([e, r]);
};
Pt.toString = function(e) {
  const r = e ? function(n) {
    return e.call(this, n, Xe);
  } : Xe;
  return this._pairs.map(function(s) {
    return r(s[0]) + "=" + r(s[1]);
  }, "").join("&");
};
function Qr(t) {
  return encodeURIComponent(t).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
}
function Ft(t, e, r) {
  if (!e)
    return t;
  const n = r && r.encode || Qr;
  f.isFunction(r) && (r = {
    serialize: r
  });
  const s = r && r.serialize;
  let o;
  if (s ? o = s(e, r) : o = f.isURLSearchParams(e) ? e.toString() : new qe(e, r).toString(n), o) {
    const i = t.indexOf("#");
    i !== -1 && (t = t.slice(0, i)), t += (t.indexOf("?") === -1 ? "?" : "&") + o;
  }
  return t;
}
class Ze {
  constructor() {
    this.handlers = [];
  }
  /**
   * Add a new interceptor to the stack
   *
   * @param {Function} fulfilled The function to handle `then` for a `Promise`
   * @param {Function} rejected The function to handle `reject` for a `Promise`
   *
   * @return {Number} An ID used to remove interceptor later
   */
  use(e, r, n) {
    return this.handlers.push({
      fulfilled: e,
      rejected: r,
      synchronous: n ? n.synchronous : !1,
      runWhen: n ? n.runWhen : null
    }), this.handlers.length - 1;
  }
  /**
   * Remove an interceptor from the stack
   *
   * @param {Number} id The ID that was returned by `use`
   *
   * @returns {Boolean} `true` if the interceptor was removed, `false` otherwise
   */
  eject(e) {
    this.handlers[e] && (this.handlers[e] = null);
  }
  /**
   * Clear all interceptors from the stack
   *
   * @returns {void}
   */
  clear() {
    this.handlers && (this.handlers = []);
  }
  /**
   * Iterate over all the registered interceptors
   *
   * This method is particularly useful for skipping over any
   * interceptors that may have become `null` calling `eject`.
   *
   * @param {Function} fn The function to call for each interceptor
   *
   * @returns {void}
   */
  forEach(e) {
    f.forEach(this.handlers, function(n) {
      n !== null && e(n);
    });
  }
}
const jt = {
  silentJSONParsing: !0,
  forcedJSONParsing: !0,
  clarifyTimeoutError: !1
}, Xr = typeof URLSearchParams < "u" ? URLSearchParams : qe, Zr = typeof FormData < "u" ? FormData : null, Gr = typeof Blob < "u" ? Blob : null, Yr = {
  isBrowser: !0,
  classes: {
    URLSearchParams: Xr,
    FormData: Zr,
    Blob: Gr
  },
  protocols: ["http", "https", "file", "blob", "url", "data"]
}, Me = typeof window < "u" && typeof document < "u", De = typeof navigator == "object" && navigator || void 0, en = Me && (!De || ["ReactNative", "NativeScript", "NS"].indexOf(De.product) < 0), tn = typeof WorkerGlobalScope < "u" && // eslint-disable-next-line no-undef
self instanceof WorkerGlobalScope && typeof self.importScripts == "function", rn = Me && window.location.href || "http://localhost", nn = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  hasBrowserEnv: Me,
  hasStandardBrowserEnv: en,
  hasStandardBrowserWebWorkerEnv: tn,
  navigator: De,
  origin: rn
}, Symbol.toStringTag, { value: "Module" })), U = {
  ...nn,
  ...Yr
};
function sn(t, e) {
  return ge(t, new U.classes.URLSearchParams(), Object.assign({
    visitor: function(r, n, s, o) {
      return U.isNode && f.isBuffer(r) ? (this.append(n, r.toString("base64")), !1) : o.defaultVisitor.apply(this, arguments);
    }
  }, e));
}
function on(t) {
  return f.matchAll(/\w+|\[(\w*)]/g, t).map((e) => e[0] === "[]" ? "" : e[1] || e[0]);
}
function an(t) {
  const e = {}, r = Object.keys(t);
  let n;
  const s = r.length;
  let o;
  for (n = 0; n < s; n++)
    o = r[n], e[o] = t[o];
  return e;
}
function Dt(t) {
  function e(r, n, s, o) {
    let i = r[o++];
    if (i === "__proto__") return !0;
    const u = Number.isFinite(+i), y = o >= r.length;
    return i = !i && f.isArray(s) ? s.length : i, y ? (f.hasOwnProp(s, i) ? s[i] = [s[i], n] : s[i] = n, !u) : ((!s[i] || !f.isObject(s[i])) && (s[i] = []), e(r, n, s[i], o) && f.isArray(s[i]) && (s[i] = an(s[i])), !u);
  }
  if (f.isFormData(t) && f.isFunction(t.entries)) {
    const r = {};
    return f.forEachEntry(t, (n, s) => {
      e(on(n), s, r, 0);
    }), r;
  }
  return null;
}
function ln(t, e, r) {
  if (f.isString(t))
    try {
      return (e || JSON.parse)(t), f.trim(t);
    } catch (n) {
      if (n.name !== "SyntaxError")
        throw n;
    }
  return (r || JSON.stringify)(t);
}
const ie = {
  transitional: jt,
  adapter: ["xhr", "http", "fetch"],
  transformRequest: [function(e, r) {
    const n = r.getContentType() || "", s = n.indexOf("application/json") > -1, o = f.isObject(e);
    if (o && f.isHTMLForm(e) && (e = new FormData(e)), f.isFormData(e))
      return s ? JSON.stringify(Dt(e)) : e;
    if (f.isArrayBuffer(e) || f.isBuffer(e) || f.isStream(e) || f.isFile(e) || f.isBlob(e) || f.isReadableStream(e))
      return e;
    if (f.isArrayBufferView(e))
      return e.buffer;
    if (f.isURLSearchParams(e))
      return r.setContentType("application/x-www-form-urlencoded;charset=utf-8", !1), e.toString();
    let u;
    if (o) {
      if (n.indexOf("application/x-www-form-urlencoded") > -1)
        return sn(e, this.formSerializer).toString();
      if ((u = f.isFileList(e)) || n.indexOf("multipart/form-data") > -1) {
        const y = this.env && this.env.FormData;
        return ge(
          u ? { "files[]": e } : e,
          y && new y(),
          this.formSerializer
        );
      }
    }
    return o || s ? (r.setContentType("application/json", !1), ln(e)) : e;
  }],
  transformResponse: [function(e) {
    const r = this.transitional || ie.transitional, n = r && r.forcedJSONParsing, s = this.responseType === "json";
    if (f.isResponse(e) || f.isReadableStream(e))
      return e;
    if (e && f.isString(e) && (n && !this.responseType || s)) {
      const i = !(r && r.silentJSONParsing) && s;
      try {
        return JSON.parse(e);
      } catch (u) {
        if (i)
          throw u.name === "SyntaxError" ? O.from(u, O.ERR_BAD_RESPONSE, this, null, this.response) : u;
      }
    }
    return e;
  }],
  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  maxContentLength: -1,
  maxBodyLength: -1,
  env: {
    FormData: U.classes.FormData,
    Blob: U.classes.Blob
  },
  validateStatus: function(e) {
    return e >= 200 && e < 300;
  },
  headers: {
    common: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": void 0
    }
  }
};
f.forEach(["delete", "get", "head", "post", "put", "patch"], (t) => {
  ie.headers[t] = {};
});
const cn = f.toObjectSet([
  "age",
  "authorization",
  "content-length",
  "content-type",
  "etag",
  "expires",
  "from",
  "host",
  "if-modified-since",
  "if-unmodified-since",
  "last-modified",
  "location",
  "max-forwards",
  "proxy-authorization",
  "referer",
  "retry-after",
  "user-agent"
]), un = (t) => {
  const e = {};
  let r, n, s;
  return t && t.split(`
`).forEach(function(i) {
    s = i.indexOf(":"), r = i.substring(0, s).trim().toLowerCase(), n = i.substring(s + 1).trim(), !(!r || e[r] && cn[r]) && (r === "set-cookie" ? e[r] ? e[r].push(n) : e[r] = [n] : e[r] = e[r] ? e[r] + ", " + n : n);
  }), e;
}, Ge = Symbol("internals");
function te(t) {
  return t && String(t).trim().toLowerCase();
}
function ce(t) {
  return t === !1 || t == null ? t : f.isArray(t) ? t.map(ce) : String(t);
}
function fn(t) {
  const e = /* @__PURE__ */ Object.create(null), r = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let n;
  for (; n = r.exec(t); )
    e[n[1]] = n[2];
  return e;
}
const dn = (t) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(t.trim());
function Re(t, e, r, n, s) {
  if (f.isFunction(n))
    return n.call(this, e, r);
  if (s && (e = r), !!f.isString(e)) {
    if (f.isString(n))
      return e.indexOf(n) !== -1;
    if (f.isRegExp(n))
      return n.test(e);
  }
}
function hn(t) {
  return t.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (e, r, n) => r.toUpperCase() + n);
}
function pn(t, e) {
  const r = f.toCamelCase(" " + e);
  ["get", "set", "has"].forEach((n) => {
    Object.defineProperty(t, n + r, {
      value: function(s, o, i) {
        return this[n].call(this, e, s, o, i);
      },
      configurable: !0
    });
  });
}
let k = class {
  constructor(e) {
    e && this.set(e);
  }
  set(e, r, n) {
    const s = this;
    function o(u, y, d) {
      const c = te(y);
      if (!c)
        throw new Error("header name must be a non-empty string");
      const g = f.findKey(s, c);
      (!g || s[g] === void 0 || d === !0 || d === void 0 && s[g] !== !1) && (s[g || y] = ce(u));
    }
    const i = (u, y) => f.forEach(u, (d, c) => o(d, c, y));
    if (f.isPlainObject(e) || e instanceof this.constructor)
      i(e, r);
    else if (f.isString(e) && (e = e.trim()) && !dn(e))
      i(un(e), r);
    else if (f.isObject(e) && f.isIterable(e)) {
      let u = {}, y, d;
      for (const c of e) {
        if (!f.isArray(c))
          throw TypeError("Object iterator must return a key-value pair");
        u[d = c[0]] = (y = u[d]) ? f.isArray(y) ? [...y, c[1]] : [y, c[1]] : c[1];
      }
      i(u, r);
    } else
      e != null && o(r, e, n);
    return this;
  }
  get(e, r) {
    if (e = te(e), e) {
      const n = f.findKey(this, e);
      if (n) {
        const s = this[n];
        if (!r)
          return s;
        if (r === !0)
          return fn(s);
        if (f.isFunction(r))
          return r.call(this, s, n);
        if (f.isRegExp(r))
          return r.exec(s);
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(e, r) {
    if (e = te(e), e) {
      const n = f.findKey(this, e);
      return !!(n && this[n] !== void 0 && (!r || Re(this, this[n], n, r)));
    }
    return !1;
  }
  delete(e, r) {
    const n = this;
    let s = !1;
    function o(i) {
      if (i = te(i), i) {
        const u = f.findKey(n, i);
        u && (!r || Re(n, n[u], u, r)) && (delete n[u], s = !0);
      }
    }
    return f.isArray(e) ? e.forEach(o) : o(e), s;
  }
  clear(e) {
    const r = Object.keys(this);
    let n = r.length, s = !1;
    for (; n--; ) {
      const o = r[n];
      (!e || Re(this, this[o], o, e, !0)) && (delete this[o], s = !0);
    }
    return s;
  }
  normalize(e) {
    const r = this, n = {};
    return f.forEach(this, (s, o) => {
      const i = f.findKey(n, o);
      if (i) {
        r[i] = ce(s), delete r[o];
        return;
      }
      const u = e ? hn(o) : String(o).trim();
      u !== o && delete r[o], r[u] = ce(s), n[u] = !0;
    }), this;
  }
  concat(...e) {
    return this.constructor.concat(this, ...e);
  }
  toJSON(e) {
    const r = /* @__PURE__ */ Object.create(null);
    return f.forEach(this, (n, s) => {
      n != null && n !== !1 && (r[s] = e && f.isArray(n) ? n.join(", ") : n);
    }), r;
  }
  [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]();
  }
  toString() {
    return Object.entries(this.toJSON()).map(([e, r]) => e + ": " + r).join(`
`);
  }
  getSetCookie() {
    return this.get("set-cookie") || [];
  }
  get [Symbol.toStringTag]() {
    return "AxiosHeaders";
  }
  static from(e) {
    return e instanceof this ? e : new this(e);
  }
  static concat(e, ...r) {
    const n = new this(e);
    return r.forEach((s) => n.set(s)), n;
  }
  static accessor(e) {
    const n = (this[Ge] = this[Ge] = {
      accessors: {}
    }).accessors, s = this.prototype;
    function o(i) {
      const u = te(i);
      n[u] || (pn(s, i), n[u] = !0);
    }
    return f.isArray(e) ? e.forEach(o) : o(e), this;
  }
};
k.accessor(["Content-Type", "Content-Length", "Accept", "Accept-Encoding", "User-Agent", "Authorization"]);
f.reduceDescriptors(k.prototype, ({ value: t }, e) => {
  let r = e[0].toUpperCase() + e.slice(1);
  return {
    get: () => t,
    set(n) {
      this[r] = n;
    }
  };
});
f.freezeMethods(k);
function xe(t, e) {
  const r = this || ie, n = e || r, s = k.from(n.headers);
  let o = n.data;
  return f.forEach(t, function(u) {
    o = u.call(r, o, s.normalize(), e ? e.status : void 0);
  }), s.normalize(), o;
}
function Ut(t) {
  return !!(t && t.__CANCEL__);
}
function G(t, e, r) {
  O.call(this, t ?? "canceled", O.ERR_CANCELED, e, r), this.name = "CanceledError";
}
f.inherits(G, O, {
  __CANCEL__: !0
});
function Lt(t, e, r) {
  const n = r.config.validateStatus;
  !r.status || !n || n(r.status) ? t(r) : e(new O(
    "Request failed with status code " + r.status,
    [O.ERR_BAD_REQUEST, O.ERR_BAD_RESPONSE][Math.floor(r.status / 100) - 4],
    r.config,
    r.request,
    r
  ));
}
function mn(t) {
  const e = /^([-+\w]{1,25})(:?\/\/|:)/.exec(t);
  return e && e[1] || "";
}
function yn(t, e) {
  t = t || 10;
  const r = new Array(t), n = new Array(t);
  let s = 0, o = 0, i;
  return e = e !== void 0 ? e : 1e3, function(y) {
    const d = Date.now(), c = n[o];
    i || (i = d), r[s] = y, n[s] = d;
    let g = o, w = 0;
    for (; g !== s; )
      w += r[g++], g = g % t;
    if (s = (s + 1) % t, s === o && (o = (o + 1) % t), d - i < e)
      return;
    const m = c && d - c;
    return m ? Math.round(w * 1e3 / m) : void 0;
  };
}
function gn(t, e) {
  let r = 0, n = 1e3 / e, s, o;
  const i = (d, c = Date.now()) => {
    r = c, s = null, o && (clearTimeout(o), o = null), t.apply(null, d);
  };
  return [(...d) => {
    const c = Date.now(), g = c - r;
    g >= n ? i(d, c) : (s = d, o || (o = setTimeout(() => {
      o = null, i(s);
    }, n - g)));
  }, () => s && i(s)];
}
const fe = (t, e, r = 3) => {
  let n = 0;
  const s = yn(50, 250);
  return gn((o) => {
    const i = o.loaded, u = o.lengthComputable ? o.total : void 0, y = i - n, d = s(y), c = i <= u;
    n = i;
    const g = {
      loaded: i,
      total: u,
      progress: u ? i / u : void 0,
      bytes: y,
      rate: d || void 0,
      estimated: d && u && c ? (u - i) / d : void 0,
      event: o,
      lengthComputable: u != null,
      [e ? "download" : "upload"]: !0
    };
    t(g);
  }, r);
}, Ye = (t, e) => {
  const r = t != null;
  return [(n) => e[0]({
    lengthComputable: r,
    total: t,
    loaded: n
  }), e[1]];
}, et = (t) => (...e) => f.asap(() => t(...e)), bn = U.hasStandardBrowserEnv ? /* @__PURE__ */ ((t, e) => (r) => (r = new URL(r, U.origin), t.protocol === r.protocol && t.host === r.host && (e || t.port === r.port)))(
  new URL(U.origin),
  U.navigator && /(msie|trident)/i.test(U.navigator.userAgent)
) : () => !0, wn = U.hasStandardBrowserEnv ? (
  // Standard browser envs support document.cookie
  {
    write(t, e, r, n, s, o) {
      const i = [t + "=" + encodeURIComponent(e)];
      f.isNumber(r) && i.push("expires=" + new Date(r).toGMTString()), f.isString(n) && i.push("path=" + n), f.isString(s) && i.push("domain=" + s), o === !0 && i.push("secure"), document.cookie = i.join("; ");
    },
    read(t) {
      const e = document.cookie.match(new RegExp("(^|;\\s*)(" + t + ")=([^;]*)"));
      return e ? decodeURIComponent(e[3]) : null;
    },
    remove(t) {
      this.write(t, "", Date.now() - 864e5);
    }
  }
) : (
  // Non-standard browser env (web workers, react-native) lack needed support.
  {
    write() {
    },
    read() {
      return null;
    },
    remove() {
    }
  }
);
function vn(t) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(t);
}
function Sn(t, e) {
  return e ? t.replace(/\/?\/$/, "") + "/" + e.replace(/^\/+/, "") : t;
}
function $t(t, e, r) {
  let n = !vn(e);
  return t && (n || r == !1) ? Sn(t, e) : e;
}
const tt = (t) => t instanceof k ? { ...t } : t;
function K(t, e) {
  e = e || {};
  const r = {};
  function n(d, c, g, w) {
    return f.isPlainObject(d) && f.isPlainObject(c) ? f.merge.call({ caseless: w }, d, c) : f.isPlainObject(c) ? f.merge({}, c) : f.isArray(c) ? c.slice() : c;
  }
  function s(d, c, g, w) {
    if (f.isUndefined(c)) {
      if (!f.isUndefined(d))
        return n(void 0, d, g, w);
    } else return n(d, c, g, w);
  }
  function o(d, c) {
    if (!f.isUndefined(c))
      return n(void 0, c);
  }
  function i(d, c) {
    if (f.isUndefined(c)) {
      if (!f.isUndefined(d))
        return n(void 0, d);
    } else return n(void 0, c);
  }
  function u(d, c, g) {
    if (g in e)
      return n(d, c);
    if (g in t)
      return n(void 0, d);
  }
  const y = {
    url: o,
    method: o,
    data: o,
    baseURL: i,
    transformRequest: i,
    transformResponse: i,
    paramsSerializer: i,
    timeout: i,
    timeoutMessage: i,
    withCredentials: i,
    withXSRFToken: i,
    adapter: i,
    responseType: i,
    xsrfCookieName: i,
    xsrfHeaderName: i,
    onUploadProgress: i,
    onDownloadProgress: i,
    decompress: i,
    maxContentLength: i,
    maxBodyLength: i,
    beforeRedirect: i,
    transport: i,
    httpAgent: i,
    httpsAgent: i,
    cancelToken: i,
    socketPath: i,
    responseEncoding: i,
    validateStatus: u,
    headers: (d, c, g) => s(tt(d), tt(c), g, !0)
  };
  return f.forEach(Object.keys(Object.assign({}, t, e)), function(c) {
    const g = y[c] || s, w = g(t[c], e[c], c);
    f.isUndefined(w) && g !== u || (r[c] = w);
  }), r;
}
const kt = (t) => {
  const e = K({}, t);
  let { data: r, withXSRFToken: n, xsrfHeaderName: s, xsrfCookieName: o, headers: i, auth: u } = e;
  e.headers = i = k.from(i), e.url = Ft($t(e.baseURL, e.url, e.allowAbsoluteUrls), t.params, t.paramsSerializer), u && i.set(
    "Authorization",
    "Basic " + btoa((u.username || "") + ":" + (u.password ? unescape(encodeURIComponent(u.password)) : ""))
  );
  let y;
  if (f.isFormData(r)) {
    if (U.hasStandardBrowserEnv || U.hasStandardBrowserWebWorkerEnv)
      i.setContentType(void 0);
    else if ((y = i.getContentType()) !== !1) {
      const [d, ...c] = y ? y.split(";").map((g) => g.trim()).filter(Boolean) : [];
      i.setContentType([d || "multipart/form-data", ...c].join("; "));
    }
  }
  if (U.hasStandardBrowserEnv && (n && f.isFunction(n) && (n = n(e)), n || n !== !1 && bn(e.url))) {
    const d = s && o && wn.read(o);
    d && i.set(s, d);
  }
  return e;
}, En = typeof XMLHttpRequest < "u", Rn = En && function(t) {
  return new Promise(function(r, n) {
    const s = kt(t);
    let o = s.data;
    const i = k.from(s.headers).normalize();
    let { responseType: u, onUploadProgress: y, onDownloadProgress: d } = s, c, g, w, m, h;
    function l() {
      m && m(), h && h(), s.cancelToken && s.cancelToken.unsubscribe(c), s.signal && s.signal.removeEventListener("abort", c);
    }
    let a = new XMLHttpRequest();
    a.open(s.method.toUpperCase(), s.url, !0), a.timeout = s.timeout;
    function p() {
      if (!a)
        return;
      const S = k.from(
        "getAllResponseHeaders" in a && a.getAllResponseHeaders()
      ), E = {
        data: !u || u === "text" || u === "json" ? a.responseText : a.response,
        status: a.status,
        statusText: a.statusText,
        headers: S,
        config: t,
        request: a
      };
      Lt(function(_) {
        r(_), l();
      }, function(_) {
        n(_), l();
      }, E), a = null;
    }
    "onloadend" in a ? a.onloadend = p : a.onreadystatechange = function() {
      !a || a.readyState !== 4 || a.status === 0 && !(a.responseURL && a.responseURL.indexOf("file:") === 0) || setTimeout(p);
    }, a.onabort = function() {
      a && (n(new O("Request aborted", O.ECONNABORTED, t, a)), a = null);
    }, a.onerror = function() {
      n(new O("Network Error", O.ERR_NETWORK, t, a)), a = null;
    }, a.ontimeout = function() {
      let v = s.timeout ? "timeout of " + s.timeout + "ms exceeded" : "timeout exceeded";
      const E = s.transitional || jt;
      s.timeoutErrorMessage && (v = s.timeoutErrorMessage), n(new O(
        v,
        E.clarifyTimeoutError ? O.ETIMEDOUT : O.ECONNABORTED,
        t,
        a
      )), a = null;
    }, o === void 0 && i.setContentType(null), "setRequestHeader" in a && f.forEach(i.toJSON(), function(v, E) {
      a.setRequestHeader(E, v);
    }), f.isUndefined(s.withCredentials) || (a.withCredentials = !!s.withCredentials), u && u !== "json" && (a.responseType = s.responseType), d && ([w, h] = fe(d, !0), a.addEventListener("progress", w)), y && a.upload && ([g, m] = fe(y), a.upload.addEventListener("progress", g), a.upload.addEventListener("loadend", m)), (s.cancelToken || s.signal) && (c = (S) => {
      a && (n(!S || S.type ? new G(null, t, a) : S), a.abort(), a = null);
    }, s.cancelToken && s.cancelToken.subscribe(c), s.signal && (s.signal.aborted ? c() : s.signal.addEventListener("abort", c)));
    const b = mn(s.url);
    if (b && U.protocols.indexOf(b) === -1) {
      n(new O("Unsupported protocol " + b + ":", O.ERR_BAD_REQUEST, t));
      return;
    }
    a.send(o || null);
  });
}, xn = (t, e) => {
  const { length: r } = t = t ? t.filter(Boolean) : [];
  if (e || r) {
    let n = new AbortController(), s;
    const o = function(d) {
      if (!s) {
        s = !0, u();
        const c = d instanceof Error ? d : this.reason;
        n.abort(c instanceof O ? c : new G(c instanceof Error ? c.message : c));
      }
    };
    let i = e && setTimeout(() => {
      i = null, o(new O(`timeout ${e} of ms exceeded`, O.ETIMEDOUT));
    }, e);
    const u = () => {
      t && (i && clearTimeout(i), i = null, t.forEach((d) => {
        d.unsubscribe ? d.unsubscribe(o) : d.removeEventListener("abort", o);
      }), t = null);
    };
    t.forEach((d) => d.addEventListener("abort", o));
    const { signal: y } = n;
    return y.unsubscribe = () => f.asap(u), y;
  }
}, On = function* (t, e) {
  let r = t.byteLength;
  if (r < e) {
    yield t;
    return;
  }
  let n = 0, s;
  for (; n < r; )
    s = n + e, yield t.slice(n, s), n = s;
}, _n = async function* (t, e) {
  for await (const r of Cn(t))
    yield* On(r, e);
}, Cn = async function* (t) {
  if (t[Symbol.asyncIterator]) {
    yield* t;
    return;
  }
  const e = t.getReader();
  try {
    for (; ; ) {
      const { done: r, value: n } = await e.read();
      if (r)
        break;
      yield n;
    }
  } finally {
    await e.cancel();
  }
}, rt = (t, e, r, n) => {
  const s = _n(t, e);
  let o = 0, i, u = (y) => {
    i || (i = !0, n && n(y));
  };
  return new ReadableStream({
    async pull(y) {
      try {
        const { done: d, value: c } = await s.next();
        if (d) {
          u(), y.close();
          return;
        }
        let g = c.byteLength;
        if (r) {
          let w = o += g;
          r(w);
        }
        y.enqueue(new Uint8Array(c));
      } catch (d) {
        throw u(d), d;
      }
    },
    cancel(y) {
      return u(y), s.return();
    }
  }, {
    highWaterMark: 2
  });
}, be = typeof fetch == "function" && typeof Request == "function" && typeof Response == "function", Bt = be && typeof ReadableStream == "function", An = be && (typeof TextEncoder == "function" ? /* @__PURE__ */ ((t) => (e) => t.encode(e))(new TextEncoder()) : async (t) => new Uint8Array(await new Response(t).arrayBuffer())), qt = (t, ...e) => {
  try {
    return !!t(...e);
  } catch {
    return !1;
  }
}, Tn = Bt && qt(() => {
  let t = !1;
  const e = new Request(U.origin, {
    body: new ReadableStream(),
    method: "POST",
    get duplex() {
      return t = !0, "half";
    }
  }).headers.has("Content-Type");
  return t && !e;
}), nt = 64 * 1024, Ue = Bt && qt(() => f.isReadableStream(new Response("").body)), de = {
  stream: Ue && ((t) => t.body)
};
be && ((t) => {
  ["text", "arrayBuffer", "blob", "formData", "stream"].forEach((e) => {
    !de[e] && (de[e] = f.isFunction(t[e]) ? (r) => r[e]() : (r, n) => {
      throw new O(`Response type '${e}' is not supported`, O.ERR_NOT_SUPPORT, n);
    });
  });
})(new Response());
const Nn = async (t) => {
  if (t == null)
    return 0;
  if (f.isBlob(t))
    return t.size;
  if (f.isSpecCompliantForm(t))
    return (await new Request(U.origin, {
      method: "POST",
      body: t
    }).arrayBuffer()).byteLength;
  if (f.isArrayBufferView(t) || f.isArrayBuffer(t))
    return t.byteLength;
  if (f.isURLSearchParams(t) && (t = t + ""), f.isString(t))
    return (await An(t)).byteLength;
}, Pn = async (t, e) => {
  const r = f.toFiniteNumber(t.getContentLength());
  return r ?? Nn(e);
}, Fn = be && (async (t) => {
  let {
    url: e,
    method: r,
    data: n,
    signal: s,
    cancelToken: o,
    timeout: i,
    onDownloadProgress: u,
    onUploadProgress: y,
    responseType: d,
    headers: c,
    withCredentials: g = "same-origin",
    fetchOptions: w
  } = kt(t);
  d = d ? (d + "").toLowerCase() : "text";
  let m = xn([s, o && o.toAbortSignal()], i), h;
  const l = m && m.unsubscribe && (() => {
    m.unsubscribe();
  });
  let a;
  try {
    if (y && Tn && r !== "get" && r !== "head" && (a = await Pn(c, n)) !== 0) {
      let E = new Request(e, {
        method: "POST",
        body: n,
        duplex: "half"
      }), x;
      if (f.isFormData(n) && (x = E.headers.get("content-type")) && c.setContentType(x), E.body) {
        const [_, R] = Ye(
          a,
          fe(et(y))
        );
        n = rt(E.body, nt, _, R);
      }
    }
    f.isString(g) || (g = g ? "include" : "omit");
    const p = "credentials" in Request.prototype;
    h = new Request(e, {
      ...w,
      signal: m,
      method: r.toUpperCase(),
      headers: c.normalize().toJSON(),
      body: n,
      duplex: "half",
      credentials: p ? g : void 0
    });
    let b = await fetch(h);
    const S = Ue && (d === "stream" || d === "response");
    if (Ue && (u || S && l)) {
      const E = {};
      ["status", "statusText", "headers"].forEach((A) => {
        E[A] = b[A];
      });
      const x = f.toFiniteNumber(b.headers.get("content-length")), [_, R] = u && Ye(
        x,
        fe(et(u), !0)
      ) || [];
      b = new Response(
        rt(b.body, nt, _, () => {
          R && R(), l && l();
        }),
        E
      );
    }
    d = d || "text";
    let v = await de[f.findKey(de, d) || "text"](b, t);
    return !S && l && l(), await new Promise((E, x) => {
      Lt(E, x, {
        data: v,
        headers: k.from(b.headers),
        status: b.status,
        statusText: b.statusText,
        config: t,
        request: h
      });
    });
  } catch (p) {
    throw l && l(), p && p.name === "TypeError" && /Load failed|fetch/i.test(p.message) ? Object.assign(
      new O("Network Error", O.ERR_NETWORK, t, h),
      {
        cause: p.cause || p
      }
    ) : O.from(p, p && p.code, t, h);
  }
}), Le = {
  http: Jr,
  xhr: Rn,
  fetch: Fn
};
f.forEach(Le, (t, e) => {
  if (t) {
    try {
      Object.defineProperty(t, "name", { value: e });
    } catch {
    }
    Object.defineProperty(t, "adapterName", { value: e });
  }
});
const st = (t) => `- ${t}`, jn = (t) => f.isFunction(t) || t === null || t === !1, Mt = {
  getAdapter: (t) => {
    t = f.isArray(t) ? t : [t];
    const { length: e } = t;
    let r, n;
    const s = {};
    for (let o = 0; o < e; o++) {
      r = t[o];
      let i;
      if (n = r, !jn(r) && (n = Le[(i = String(r)).toLowerCase()], n === void 0))
        throw new O(`Unknown adapter '${i}'`);
      if (n)
        break;
      s[i || "#" + o] = n;
    }
    if (!n) {
      const o = Object.entries(s).map(
        ([u, y]) => `adapter ${u} ` + (y === !1 ? "is not supported by the environment" : "is not available in the build")
      );
      let i = e ? o.length > 1 ? `since :
` + o.map(st).join(`
`) : " " + st(o[0]) : "as no adapter specified";
      throw new O(
        "There is no suitable adapter to dispatch the request " + i,
        "ERR_NOT_SUPPORT"
      );
    }
    return n;
  },
  adapters: Le
};
function Oe(t) {
  if (t.cancelToken && t.cancelToken.throwIfRequested(), t.signal && t.signal.aborted)
    throw new G(null, t);
}
function ot(t) {
  return Oe(t), t.headers = k.from(t.headers), t.data = xe.call(
    t,
    t.transformRequest
  ), ["post", "put", "patch"].indexOf(t.method) !== -1 && t.headers.setContentType("application/x-www-form-urlencoded", !1), Mt.getAdapter(t.adapter || ie.adapter)(t).then(function(n) {
    return Oe(t), n.data = xe.call(
      t,
      t.transformResponse,
      n
    ), n.headers = k.from(n.headers), n;
  }, function(n) {
    return Ut(n) || (Oe(t), n && n.response && (n.response.data = xe.call(
      t,
      t.transformResponse,
      n.response
    ), n.response.headers = k.from(n.response.headers))), Promise.reject(n);
  });
}
const Ht = "1.9.0", we = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach((t, e) => {
  we[t] = function(n) {
    return typeof n === t || "a" + (e < 1 ? "n " : " ") + t;
  };
});
const it = {};
we.transitional = function(e, r, n) {
  function s(o, i) {
    return "[Axios v" + Ht + "] Transitional option '" + o + "'" + i + (n ? ". " + n : "");
  }
  return (o, i, u) => {
    if (e === !1)
      throw new O(
        s(i, " has been removed" + (r ? " in " + r : "")),
        O.ERR_DEPRECATED
      );
    return r && !it[i] && (it[i] = !0, console.warn(
      s(
        i,
        " has been deprecated since v" + r + " and will be removed in the near future"
      )
    )), e ? e(o, i, u) : !0;
  };
};
we.spelling = function(e) {
  return (r, n) => (console.warn(`${n} is likely a misspelling of ${e}`), !0);
};
function Dn(t, e, r) {
  if (typeof t != "object")
    throw new O("options must be an object", O.ERR_BAD_OPTION_VALUE);
  const n = Object.keys(t);
  let s = n.length;
  for (; s-- > 0; ) {
    const o = n[s], i = e[o];
    if (i) {
      const u = t[o], y = u === void 0 || i(u, o, t);
      if (y !== !0)
        throw new O("option " + o + " must be " + y, O.ERR_BAD_OPTION_VALUE);
      continue;
    }
    if (r !== !0)
      throw new O("Unknown option " + o, O.ERR_BAD_OPTION);
  }
}
const ue = {
  assertOptions: Dn,
  validators: we
}, H = ue.validators;
let J = class {
  constructor(e) {
    this.defaults = e || {}, this.interceptors = {
      request: new Ze(),
      response: new Ze()
    };
  }
  /**
   * Dispatch a request
   *
   * @param {String|Object} configOrUrl The config specific for this request (merged with this.defaults)
   * @param {?Object} config
   *
   * @returns {Promise} The Promise to be fulfilled
   */
  async request(e, r) {
    try {
      return await this._request(e, r);
    } catch (n) {
      if (n instanceof Error) {
        let s = {};
        Error.captureStackTrace ? Error.captureStackTrace(s) : s = new Error();
        const o = s.stack ? s.stack.replace(/^.+\n/, "") : "";
        try {
          n.stack ? o && !String(n.stack).endsWith(o.replace(/^.+\n.+\n/, "")) && (n.stack += `
` + o) : n.stack = o;
        } catch {
        }
      }
      throw n;
    }
  }
  _request(e, r) {
    typeof e == "string" ? (r = r || {}, r.url = e) : r = e || {}, r = K(this.defaults, r);
    const { transitional: n, paramsSerializer: s, headers: o } = r;
    n !== void 0 && ue.assertOptions(n, {
      silentJSONParsing: H.transitional(H.boolean),
      forcedJSONParsing: H.transitional(H.boolean),
      clarifyTimeoutError: H.transitional(H.boolean)
    }, !1), s != null && (f.isFunction(s) ? r.paramsSerializer = {
      serialize: s
    } : ue.assertOptions(s, {
      encode: H.function,
      serialize: H.function
    }, !0)), r.allowAbsoluteUrls !== void 0 || (this.defaults.allowAbsoluteUrls !== void 0 ? r.allowAbsoluteUrls = this.defaults.allowAbsoluteUrls : r.allowAbsoluteUrls = !0), ue.assertOptions(r, {
      baseUrl: H.spelling("baseURL"),
      withXsrfToken: H.spelling("withXSRFToken")
    }, !0), r.method = (r.method || this.defaults.method || "get").toLowerCase();
    let i = o && f.merge(
      o.common,
      o[r.method]
    );
    o && f.forEach(
      ["delete", "get", "head", "post", "put", "patch", "common"],
      (h) => {
        delete o[h];
      }
    ), r.headers = k.concat(i, o);
    const u = [];
    let y = !0;
    this.interceptors.request.forEach(function(l) {
      typeof l.runWhen == "function" && l.runWhen(r) === !1 || (y = y && l.synchronous, u.unshift(l.fulfilled, l.rejected));
    });
    const d = [];
    this.interceptors.response.forEach(function(l) {
      d.push(l.fulfilled, l.rejected);
    });
    let c, g = 0, w;
    if (!y) {
      const h = [ot.bind(this), void 0];
      for (h.unshift.apply(h, u), h.push.apply(h, d), w = h.length, c = Promise.resolve(r); g < w; )
        c = c.then(h[g++], h[g++]);
      return c;
    }
    w = u.length;
    let m = r;
    for (g = 0; g < w; ) {
      const h = u[g++], l = u[g++];
      try {
        m = h(m);
      } catch (a) {
        l.call(this, a);
        break;
      }
    }
    try {
      c = ot.call(this, m);
    } catch (h) {
      return Promise.reject(h);
    }
    for (g = 0, w = d.length; g < w; )
      c = c.then(d[g++], d[g++]);
    return c;
  }
  getUri(e) {
    e = K(this.defaults, e);
    const r = $t(e.baseURL, e.url, e.allowAbsoluteUrls);
    return Ft(r, e.params, e.paramsSerializer);
  }
};
f.forEach(["delete", "get", "head", "options"], function(e) {
  J.prototype[e] = function(r, n) {
    return this.request(K(n || {}, {
      method: e,
      url: r,
      data: (n || {}).data
    }));
  };
});
f.forEach(["post", "put", "patch"], function(e) {
  function r(n) {
    return function(o, i, u) {
      return this.request(K(u || {}, {
        method: e,
        headers: n ? {
          "Content-Type": "multipart/form-data"
        } : {},
        url: o,
        data: i
      }));
    };
  }
  J.prototype[e] = r(), J.prototype[e + "Form"] = r(!0);
});
let Un = class It {
  constructor(e) {
    if (typeof e != "function")
      throw new TypeError("executor must be a function.");
    let r;
    this.promise = new Promise(function(o) {
      r = o;
    });
    const n = this;
    this.promise.then((s) => {
      if (!n._listeners) return;
      let o = n._listeners.length;
      for (; o-- > 0; )
        n._listeners[o](s);
      n._listeners = null;
    }), this.promise.then = (s) => {
      let o;
      const i = new Promise((u) => {
        n.subscribe(u), o = u;
      }).then(s);
      return i.cancel = function() {
        n.unsubscribe(o);
      }, i;
    }, e(function(o, i, u) {
      n.reason || (n.reason = new G(o, i, u), r(n.reason));
    });
  }
  /**
   * Throws a `CanceledError` if cancellation has been requested.
   */
  throwIfRequested() {
    if (this.reason)
      throw this.reason;
  }
  /**
   * Subscribe to the cancel signal
   */
  subscribe(e) {
    if (this.reason) {
      e(this.reason);
      return;
    }
    this._listeners ? this._listeners.push(e) : this._listeners = [e];
  }
  /**
   * Unsubscribe from the cancel signal
   */
  unsubscribe(e) {
    if (!this._listeners)
      return;
    const r = this._listeners.indexOf(e);
    r !== -1 && this._listeners.splice(r, 1);
  }
  toAbortSignal() {
    const e = new AbortController(), r = (n) => {
      e.abort(n);
    };
    return this.subscribe(r), e.signal.unsubscribe = () => this.unsubscribe(r), e.signal;
  }
  /**
   * Returns an object that contains a new `CancelToken` and a function that, when called,
   * cancels the `CancelToken`.
   */
  static source() {
    let e;
    return {
      token: new It(function(s) {
        e = s;
      }),
      cancel: e
    };
  }
};
function Ln(t) {
  return function(r) {
    return t.apply(null, r);
  };
}
function $n(t) {
  return f.isObject(t) && t.isAxiosError === !0;
}
const $e = {
  Continue: 100,
  SwitchingProtocols: 101,
  Processing: 102,
  EarlyHints: 103,
  Ok: 200,
  Created: 201,
  Accepted: 202,
  NonAuthoritativeInformation: 203,
  NoContent: 204,
  ResetContent: 205,
  PartialContent: 206,
  MultiStatus: 207,
  AlreadyReported: 208,
  ImUsed: 226,
  MultipleChoices: 300,
  MovedPermanently: 301,
  Found: 302,
  SeeOther: 303,
  NotModified: 304,
  UseProxy: 305,
  Unused: 306,
  TemporaryRedirect: 307,
  PermanentRedirect: 308,
  BadRequest: 400,
  Unauthorized: 401,
  PaymentRequired: 402,
  Forbidden: 403,
  NotFound: 404,
  MethodNotAllowed: 405,
  NotAcceptable: 406,
  ProxyAuthenticationRequired: 407,
  RequestTimeout: 408,
  Conflict: 409,
  Gone: 410,
  LengthRequired: 411,
  PreconditionFailed: 412,
  PayloadTooLarge: 413,
  UriTooLong: 414,
  UnsupportedMediaType: 415,
  RangeNotSatisfiable: 416,
  ExpectationFailed: 417,
  ImATeapot: 418,
  MisdirectedRequest: 421,
  UnprocessableEntity: 422,
  Locked: 423,
  FailedDependency: 424,
  TooEarly: 425,
  UpgradeRequired: 426,
  PreconditionRequired: 428,
  TooManyRequests: 429,
  RequestHeaderFieldsTooLarge: 431,
  UnavailableForLegalReasons: 451,
  InternalServerError: 500,
  NotImplemented: 501,
  BadGateway: 502,
  ServiceUnavailable: 503,
  GatewayTimeout: 504,
  HttpVersionNotSupported: 505,
  VariantAlsoNegotiates: 506,
  InsufficientStorage: 507,
  LoopDetected: 508,
  NotExtended: 510,
  NetworkAuthenticationRequired: 511
};
Object.entries($e).forEach(([t, e]) => {
  $e[e] = t;
});
function zt(t) {
  const e = new J(t), r = vt(J.prototype.request, e);
  return f.extend(r, J.prototype, e, { allOwnKeys: !0 }), f.extend(r, e, null, { allOwnKeys: !0 }), r.create = function(s) {
    return zt(K(t, s));
  }, r;
}
const N = zt(ie);
N.Axios = J;
N.CanceledError = G;
N.CancelToken = Un;
N.isCancel = Ut;
N.VERSION = Ht;
N.toFormData = ge;
N.AxiosError = O;
N.Cancel = N.CanceledError;
N.all = function(e) {
  return Promise.all(e);
};
N.spread = Ln;
N.isAxiosError = $n;
N.mergeConfig = K;
N.AxiosHeaders = k;
N.formToJSON = (t) => Dt(f.isHTMLForm(t) ? new FormData(t) : t);
N.getAdapter = Mt.getAdapter;
N.HttpStatusCode = $e;
N.default = N;
const {
  Axios: ds,
  AxiosError: hs,
  CanceledError: ps,
  isCancel: ms,
  CancelToken: ys,
  VERSION: gs,
  all: bs,
  Cancel: ws,
  isAxiosError: vs,
  spread: Ss,
  toFormData: Es,
  AxiosHeaders: Rs,
  HttpStatusCode: xs,
  formToJSON: Os,
  getAdapter: _s,
  mergeConfig: Cs
} = N;
var _e, at;
function He() {
  if (at) return _e;
  at = 1;
  var t = String.prototype.replace, e = /%20/g, r = {
    RFC1738: "RFC1738",
    RFC3986: "RFC3986"
  };
  return _e = {
    default: r.RFC3986,
    formatters: {
      RFC1738: function(n) {
        return t.call(n, e, "+");
      },
      RFC3986: function(n) {
        return String(n);
      }
    },
    RFC1738: r.RFC1738,
    RFC3986: r.RFC3986
  }, _e;
}
var Ce, lt;
function Vt() {
  if (lt) return Ce;
  lt = 1;
  var t = He(), e = Object.prototype.hasOwnProperty, r = Array.isArray, n = function() {
    for (var l = [], a = 0; a < 256; ++a)
      l.push("%" + ((a < 16 ? "0" : "") + a.toString(16)).toUpperCase());
    return l;
  }(), s = function(a) {
    for (; a.length > 1; ) {
      var p = a.pop(), b = p.obj[p.prop];
      if (r(b)) {
        for (var S = [], v = 0; v < b.length; ++v)
          typeof b[v] < "u" && S.push(b[v]);
        p.obj[p.prop] = S;
      }
    }
  }, o = function(a, p) {
    for (var b = p && p.plainObjects ? /* @__PURE__ */ Object.create(null) : {}, S = 0; S < a.length; ++S)
      typeof a[S] < "u" && (b[S] = a[S]);
    return b;
  }, i = function l(a, p, b) {
    if (!p)
      return a;
    if (typeof p != "object") {
      if (r(a))
        a.push(p);
      else if (a && typeof a == "object")
        (b && (b.plainObjects || b.allowPrototypes) || !e.call(Object.prototype, p)) && (a[p] = !0);
      else
        return [a, p];
      return a;
    }
    if (!a || typeof a != "object")
      return [a].concat(p);
    var S = a;
    return r(a) && !r(p) && (S = o(a, b)), r(a) && r(p) ? (p.forEach(function(v, E) {
      if (e.call(a, E)) {
        var x = a[E];
        x && typeof x == "object" && v && typeof v == "object" ? a[E] = l(x, v, b) : a.push(v);
      } else
        a[E] = v;
    }), a) : Object.keys(p).reduce(function(v, E) {
      var x = p[E];
      return e.call(v, E) ? v[E] = l(v[E], x, b) : v[E] = x, v;
    }, S);
  }, u = function(a, p) {
    return Object.keys(p).reduce(function(b, S) {
      return b[S] = p[S], b;
    }, a);
  }, y = function(l, a, p) {
    var b = l.replace(/\+/g, " ");
    if (p === "iso-8859-1")
      return b.replace(/%[0-9a-f]{2}/gi, unescape);
    try {
      return decodeURIComponent(b);
    } catch {
      return b;
    }
  }, d = function(a, p, b, S, v) {
    if (a.length === 0)
      return a;
    var E = a;
    if (typeof a == "symbol" ? E = Symbol.prototype.toString.call(a) : typeof a != "string" && (E = String(a)), b === "iso-8859-1")
      return escape(E).replace(/%u[0-9a-f]{4}/gi, function(A) {
        return "%26%23" + parseInt(A.slice(2), 16) + "%3B";
      });
    for (var x = "", _ = 0; _ < E.length; ++_) {
      var R = E.charCodeAt(_);
      if (R === 45 || R === 46 || R === 95 || R === 126 || R >= 48 && R <= 57 || R >= 65 && R <= 90 || R >= 97 && R <= 122 || v === t.RFC1738 && (R === 40 || R === 41)) {
        x += E.charAt(_);
        continue;
      }
      if (R < 128) {
        x = x + n[R];
        continue;
      }
      if (R < 2048) {
        x = x + (n[192 | R >> 6] + n[128 | R & 63]);
        continue;
      }
      if (R < 55296 || R >= 57344) {
        x = x + (n[224 | R >> 12] + n[128 | R >> 6 & 63] + n[128 | R & 63]);
        continue;
      }
      _ += 1, R = 65536 + ((R & 1023) << 10 | E.charCodeAt(_) & 1023), x += n[240 | R >> 18] + n[128 | R >> 12 & 63] + n[128 | R >> 6 & 63] + n[128 | R & 63];
    }
    return x;
  }, c = function(a) {
    for (var p = [{ obj: { o: a }, prop: "o" }], b = [], S = 0; S < p.length; ++S)
      for (var v = p[S], E = v.obj[v.prop], x = Object.keys(E), _ = 0; _ < x.length; ++_) {
        var R = x[_], A = E[R];
        typeof A == "object" && A !== null && b.indexOf(A) === -1 && (p.push({ obj: E, prop: R }), b.push(A));
      }
    return s(p), a;
  }, g = function(a) {
    return Object.prototype.toString.call(a) === "[object RegExp]";
  }, w = function(a) {
    return !a || typeof a != "object" ? !1 : !!(a.constructor && a.constructor.isBuffer && a.constructor.isBuffer(a));
  }, m = function(a, p) {
    return [].concat(a, p);
  }, h = function(a, p) {
    if (r(a)) {
      for (var b = [], S = 0; S < a.length; S += 1)
        b.push(p(a[S]));
      return b;
    }
    return p(a);
  };
  return Ce = {
    arrayToObject: o,
    assign: u,
    combine: m,
    compact: c,
    decode: y,
    encode: d,
    isBuffer: w,
    isRegExp: g,
    maybeMap: h,
    merge: i
  }, Ce;
}
var Ae, ct;
function kn() {
  if (ct) return Ae;
  ct = 1;
  var t = Vt(), e = He(), r = Object.prototype.hasOwnProperty, n = {
    brackets: function(l) {
      return l + "[]";
    },
    comma: "comma",
    indices: function(l, a) {
      return l + "[" + a + "]";
    },
    repeat: function(l) {
      return l;
    }
  }, s = Array.isArray, o = String.prototype.split, i = Array.prototype.push, u = function(h, l) {
    i.apply(h, s(l) ? l : [l]);
  }, y = Date.prototype.toISOString, d = e.default, c = {
    addQueryPrefix: !1,
    allowDots: !1,
    charset: "utf-8",
    charsetSentinel: !1,
    delimiter: "&",
    encode: !0,
    encoder: t.encode,
    encodeValuesOnly: !1,
    format: d,
    formatter: e.formatters[d],
    // deprecated
    indices: !1,
    serializeDate: function(l) {
      return y.call(l);
    },
    skipNulls: !1,
    strictNullHandling: !1
  }, g = function(l) {
    return typeof l == "string" || typeof l == "number" || typeof l == "boolean" || typeof l == "symbol" || typeof l == "bigint";
  }, w = function h(l, a, p, b, S, v, E, x, _, R, A, T, Q, Y) {
    var P = l;
    if (typeof E == "function" ? P = E(a, P) : P instanceof Date ? P = R(P) : p === "comma" && s(P) && (P = t.maybeMap(P, function(Ee) {
      return Ee instanceof Date ? R(Ee) : Ee;
    })), P === null) {
      if (b)
        return v && !Q ? v(a, c.encoder, Y, "key", A) : a;
      P = "";
    }
    if (g(P) || t.isBuffer(P)) {
      if (v) {
        var Ie = Q ? a : v(a, c.encoder, Y, "key", A);
        if (p === "comma" && Q) {
          for (var ze = o.call(String(P), ","), Ve = "", ae = 0; ae < ze.length; ++ae)
            Ve += (ae === 0 ? "" : ",") + T(v(ze[ae], c.encoder, Y, "value", A));
          return [T(Ie) + "=" + Ve];
        }
        return [T(Ie) + "=" + T(v(P, c.encoder, Y, "value", A))];
      }
      return [T(a) + "=" + T(String(P))];
    }
    var ve = [];
    if (typeof P > "u")
      return ve;
    var ee;
    if (p === "comma" && s(P))
      ee = [{ value: P.length > 0 ? P.join(",") || null : void 0 }];
    else if (s(E))
      ee = E;
    else {
      var Je = Object.keys(P);
      ee = x ? Je.sort(x) : Je;
    }
    for (var Se = 0; Se < ee.length; ++Se) {
      var z = ee[Se], Ke = typeof z == "object" && typeof z.value < "u" ? z.value : P[z];
      if (!(S && Ke === null)) {
        var Kt = s(P) ? typeof p == "function" ? p(a, z) : a : a + (_ ? "." + z : "[" + z + "]");
        u(ve, h(
          Ke,
          Kt,
          p,
          b,
          S,
          v,
          E,
          x,
          _,
          R,
          A,
          T,
          Q,
          Y
        ));
      }
    }
    return ve;
  }, m = function(l) {
    if (!l)
      return c;
    if (l.encoder !== null && typeof l.encoder < "u" && typeof l.encoder != "function")
      throw new TypeError("Encoder has to be a function.");
    var a = l.charset || c.charset;
    if (typeof l.charset < "u" && l.charset !== "utf-8" && l.charset !== "iso-8859-1")
      throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
    var p = e.default;
    if (typeof l.format < "u") {
      if (!r.call(e.formatters, l.format))
        throw new TypeError("Unknown format option provided.");
      p = l.format;
    }
    var b = e.formatters[p], S = c.filter;
    return (typeof l.filter == "function" || s(l.filter)) && (S = l.filter), {
      addQueryPrefix: typeof l.addQueryPrefix == "boolean" ? l.addQueryPrefix : c.addQueryPrefix,
      allowDots: typeof l.allowDots > "u" ? c.allowDots : !!l.allowDots,
      charset: a,
      charsetSentinel: typeof l.charsetSentinel == "boolean" ? l.charsetSentinel : c.charsetSentinel,
      delimiter: typeof l.delimiter > "u" ? c.delimiter : l.delimiter,
      encode: typeof l.encode == "boolean" ? l.encode : c.encode,
      encoder: typeof l.encoder == "function" ? l.encoder : c.encoder,
      encodeValuesOnly: typeof l.encodeValuesOnly == "boolean" ? l.encodeValuesOnly : c.encodeValuesOnly,
      filter: S,
      format: p,
      formatter: b,
      serializeDate: typeof l.serializeDate == "function" ? l.serializeDate : c.serializeDate,
      skipNulls: typeof l.skipNulls == "boolean" ? l.skipNulls : c.skipNulls,
      sort: typeof l.sort == "function" ? l.sort : null,
      strictNullHandling: typeof l.strictNullHandling == "boolean" ? l.strictNullHandling : c.strictNullHandling
    };
  };
  return Ae = function(h, l) {
    var a = h, p = m(l), b, S;
    typeof p.filter == "function" ? (S = p.filter, a = S("", a)) : s(p.filter) && (S = p.filter, b = S);
    var v = [];
    if (typeof a != "object" || a === null)
      return "";
    var E;
    l && l.arrayFormat in n ? E = l.arrayFormat : l && "indices" in l ? E = l.indices ? "indices" : "repeat" : E = "indices";
    var x = n[E];
    b || (b = Object.keys(a)), p.sort && b.sort(p.sort);
    for (var _ = 0; _ < b.length; ++_) {
      var R = b[_];
      p.skipNulls && a[R] === null || u(v, w(
        a[R],
        R,
        x,
        p.strictNullHandling,
        p.skipNulls,
        p.encode ? p.encoder : null,
        p.filter,
        p.sort,
        p.allowDots,
        p.serializeDate,
        p.format,
        p.formatter,
        p.encodeValuesOnly,
        p.charset
      ));
    }
    var A = v.join(p.delimiter), T = p.addQueryPrefix === !0 ? "?" : "";
    return p.charsetSentinel && (p.charset === "iso-8859-1" ? T += "utf8=%26%2310003%3B&" : T += "utf8=%E2%9C%93&"), A.length > 0 ? T + A : "";
  }, Ae;
}
var Te, ut;
function Bn() {
  if (ut) return Te;
  ut = 1;
  var t = Vt(), e = Object.prototype.hasOwnProperty, r = Array.isArray, n = {
    allowDots: !1,
    allowPrototypes: !1,
    arrayLimit: 20,
    charset: "utf-8",
    charsetSentinel: !1,
    comma: !1,
    decoder: t.decode,
    delimiter: "&",
    depth: 5,
    ignoreQueryPrefix: !1,
    interpretNumericEntities: !1,
    parameterLimit: 1e3,
    parseArrays: !0,
    plainObjects: !1,
    strictNullHandling: !1
  }, s = function(w) {
    return w.replace(/&#(\d+);/g, function(m, h) {
      return String.fromCharCode(parseInt(h, 10));
    });
  }, o = function(w, m) {
    return w && typeof w == "string" && m.comma && w.indexOf(",") > -1 ? w.split(",") : w;
  }, i = "utf8=%26%2310003%3B", u = "utf8=%E2%9C%93", y = function(m, h) {
    var l = {}, a = h.ignoreQueryPrefix ? m.replace(/^\?/, "") : m, p = h.parameterLimit === 1 / 0 ? void 0 : h.parameterLimit, b = a.split(h.delimiter, p), S = -1, v, E = h.charset;
    if (h.charsetSentinel)
      for (v = 0; v < b.length; ++v)
        b[v].indexOf("utf8=") === 0 && (b[v] === u ? E = "utf-8" : b[v] === i && (E = "iso-8859-1"), S = v, v = b.length);
    for (v = 0; v < b.length; ++v)
      if (v !== S) {
        var x = b[v], _ = x.indexOf("]="), R = _ === -1 ? x.indexOf("=") : _ + 1, A, T;
        R === -1 ? (A = h.decoder(x, n.decoder, E, "key"), T = h.strictNullHandling ? null : "") : (A = h.decoder(x.slice(0, R), n.decoder, E, "key"), T = t.maybeMap(
          o(x.slice(R + 1), h),
          function(Q) {
            return h.decoder(Q, n.decoder, E, "value");
          }
        )), T && h.interpretNumericEntities && E === "iso-8859-1" && (T = s(T)), x.indexOf("[]=") > -1 && (T = r(T) ? [T] : T), e.call(l, A) ? l[A] = t.combine(l[A], T) : l[A] = T;
      }
    return l;
  }, d = function(w, m, h, l) {
    for (var a = l ? m : o(m, h), p = w.length - 1; p >= 0; --p) {
      var b, S = w[p];
      if (S === "[]" && h.parseArrays)
        b = [].concat(a);
      else {
        b = h.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
        var v = S.charAt(0) === "[" && S.charAt(S.length - 1) === "]" ? S.slice(1, -1) : S, E = parseInt(v, 10);
        !h.parseArrays && v === "" ? b = { 0: a } : !isNaN(E) && S !== v && String(E) === v && E >= 0 && h.parseArrays && E <= h.arrayLimit ? (b = [], b[E] = a) : v !== "__proto__" && (b[v] = a);
      }
      a = b;
    }
    return a;
  }, c = function(m, h, l, a) {
    if (m) {
      var p = l.allowDots ? m.replace(/\.([^.[]+)/g, "[$1]") : m, b = /(\[[^[\]]*])/, S = /(\[[^[\]]*])/g, v = l.depth > 0 && b.exec(p), E = v ? p.slice(0, v.index) : p, x = [];
      if (E) {
        if (!l.plainObjects && e.call(Object.prototype, E) && !l.allowPrototypes)
          return;
        x.push(E);
      }
      for (var _ = 0; l.depth > 0 && (v = S.exec(p)) !== null && _ < l.depth; ) {
        if (_ += 1, !l.plainObjects && e.call(Object.prototype, v[1].slice(1, -1)) && !l.allowPrototypes)
          return;
        x.push(v[1]);
      }
      return v && x.push("[" + p.slice(v.index) + "]"), d(x, h, l, a);
    }
  }, g = function(m) {
    if (!m)
      return n;
    if (m.decoder !== null && m.decoder !== void 0 && typeof m.decoder != "function")
      throw new TypeError("Decoder has to be a function.");
    if (typeof m.charset < "u" && m.charset !== "utf-8" && m.charset !== "iso-8859-1")
      throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
    var h = typeof m.charset > "u" ? n.charset : m.charset;
    return {
      allowDots: typeof m.allowDots > "u" ? n.allowDots : !!m.allowDots,
      allowPrototypes: typeof m.allowPrototypes == "boolean" ? m.allowPrototypes : n.allowPrototypes,
      arrayLimit: typeof m.arrayLimit == "number" ? m.arrayLimit : n.arrayLimit,
      charset: h,
      charsetSentinel: typeof m.charsetSentinel == "boolean" ? m.charsetSentinel : n.charsetSentinel,
      comma: typeof m.comma == "boolean" ? m.comma : n.comma,
      decoder: typeof m.decoder == "function" ? m.decoder : n.decoder,
      delimiter: typeof m.delimiter == "string" || t.isRegExp(m.delimiter) ? m.delimiter : n.delimiter,
      // eslint-disable-next-line no-implicit-coercion, no-extra-parens
      depth: typeof m.depth == "number" || m.depth === !1 ? +m.depth : n.depth,
      ignoreQueryPrefix: m.ignoreQueryPrefix === !0,
      interpretNumericEntities: typeof m.interpretNumericEntities == "boolean" ? m.interpretNumericEntities : n.interpretNumericEntities,
      parameterLimit: typeof m.parameterLimit == "number" ? m.parameterLimit : n.parameterLimit,
      parseArrays: m.parseArrays !== !1,
      plainObjects: typeof m.plainObjects == "boolean" ? m.plainObjects : n.plainObjects,
      strictNullHandling: typeof m.strictNullHandling == "boolean" ? m.strictNullHandling : n.strictNullHandling
    };
  };
  return Te = function(w, m) {
    var h = g(m);
    if (w === "" || w === null || typeof w > "u")
      return h.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
    for (var l = typeof w == "string" ? y(w, h) : w, a = h.plainObjects ? /* @__PURE__ */ Object.create(null) : {}, p = Object.keys(l), b = 0; b < p.length; ++b) {
      var S = p[b], v = c(S, l[S], h, typeof w == "string");
      a = t.merge(a, v, h);
    }
    return t.compact(a);
  }, Te;
}
var Ne, ft;
function qn() {
  if (ft) return Ne;
  ft = 1;
  var t = kn(), e = Bn(), r = He();
  return Ne = {
    formats: r,
    parse: e,
    stringify: t
  }, Ne;
}
var Jt = qn();
function B() {
  return B = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var r = arguments[e];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (t[n] = r[n]);
    }
    return t;
  }, B.apply(null, arguments);
}
class Pe {
  constructor(e, r, n) {
    var s, o;
    this.name = e, this.definition = r, this.bindings = (s = r.bindings) != null ? s : {}, this.wheres = (o = r.wheres) != null ? o : {}, this.config = n;
  }
  get template() {
    const e = `${this.origin}/${this.definition.uri}`.replace(/\/+$/, "");
    return e === "" ? "/" : e;
  }
  get origin() {
    return this.config.absolute ? this.definition.domain ? `${this.config.url.match(/^\w+:\/\//)[0]}${this.definition.domain}${this.config.port ? `:${this.config.port}` : ""}` : this.config.url : "";
  }
  get parameterSegments() {
    var e, r;
    return (e = (r = this.template.match(/{[^}?]+\??}/g)) == null ? void 0 : r.map((n) => ({ name: n.replace(/{|\??}/g, ""), required: !/\?}$/.test(n) }))) != null ? e : [];
  }
  matchesUrl(e) {
    var r;
    if (!this.definition.methods.includes("GET")) return !1;
    const n = this.template.replace(/[.*+$()[\]]/g, "\\$&").replace(/(\/?){([^}?]*)(\??)}/g, (u, y, d, c) => {
      var g;
      const w = `(?<${d}>${((g = this.wheres[d]) == null ? void 0 : g.replace(/(^\^)|(\$$)/g, "")) || "[^/?]+"})`;
      return c ? `(${y}${w})?` : `${y}${w}`;
    }).replace(/^\w+:\/\//, ""), [s, o] = e.replace(/^\w+:\/\//, "").split("?"), i = (r = new RegExp(`^${n}/?$`).exec(s)) != null ? r : new RegExp(`^${n}/?$`).exec(decodeURI(s));
    if (i) {
      for (const u in i.groups) i.groups[u] = typeof i.groups[u] == "string" ? decodeURIComponent(i.groups[u]) : i.groups[u];
      return { params: i.groups, query: Jt.parse(o) };
    }
    return !1;
  }
  compile(e) {
    return this.parameterSegments.length ? this.template.replace(/{([^}?]+)(\??)}/g, (r, n, s) => {
      var o, i;
      if (!s && [null, void 0].includes(e[n])) throw new Error(`Ziggy error: '${n}' parameter is required for route '${this.name}'.`);
      if (this.wheres[n] && !new RegExp(`^${s ? `(${this.wheres[n]})?` : this.wheres[n]}$`).test((i = e[n]) != null ? i : "")) throw new Error(`Ziggy error: '${n}' parameter '${e[n]}' does not match required format '${this.wheres[n]}' for route '${this.name}'.`);
      return encodeURI((o = e[n]) != null ? o : "").replace(/%7C/g, "|").replace(/%25/g, "%").replace(/\$/g, "%24");
    }).replace(this.config.absolute ? /(\.[^/]+?)(\/\/)/ : /(^)(\/\/)/, "$1/").replace(/\/+$/, "") : this.template;
  }
}
class Mn extends String {
  constructor(e, r, n = !0, s) {
    if (super(), this.t = s ?? (typeof Ziggy < "u" ? Ziggy : globalThis == null ? void 0 : globalThis.Ziggy), this.t = B({}, this.t, { absolute: n }), e) {
      if (!this.t.routes[e]) throw new Error(`Ziggy error: route '${e}' is not in the route list.`);
      this.i = new Pe(e, this.t.routes[e], this.t), this.o = this.u(r);
    }
  }
  toString() {
    const e = Object.keys(this.o).filter((r) => !this.i.parameterSegments.some(({ name: n }) => n === r)).filter((r) => r !== "_query").reduce((r, n) => B({}, r, { [n]: this.o[n] }), {});
    return this.i.compile(this.o) + Jt.stringify(B({}, e, this.o._query), { addQueryPrefix: !0, arrayFormat: "indices", encodeValuesOnly: !0, skipNulls: !0, encoder: (r, n) => typeof r == "boolean" ? Number(r) : n(r) });
  }
  h(e) {
    e ? this.t.absolute && e.startsWith("/") && (e = this.l().host + e) : e = this.m();
    let r = {};
    const [n, s] = Object.entries(this.t.routes).find(([o, i]) => r = new Pe(o, i, this.t).matchesUrl(e)) || [void 0, void 0];
    return B({ name: n }, r, { route: s });
  }
  m() {
    const { host: e, pathname: r, search: n } = this.l();
    return (this.t.absolute ? e + r : r.replace(this.t.url.replace(/^\w*:\/\/[^/]+/, ""), "").replace(/^\/+/, "/")) + n;
  }
  current(e, r) {
    const { name: n, params: s, query: o, route: i } = this.h();
    if (!e) return n;
    const u = new RegExp(`^${e.replace(/\./g, "\\.").replace(/\*/g, ".*")}$`).test(n);
    if ([null, void 0].includes(r) || !u) return u;
    const y = new Pe(n, i, this.t);
    r = this.u(r, y);
    const d = B({}, s, o);
    if (Object.values(r).every((g) => !g) && !Object.values(d).some((g) => g !== void 0)) return !0;
    const c = (g, w) => Object.entries(g).every(([m, h]) => Array.isArray(h) && Array.isArray(w[m]) ? h.every((l) => w[m].includes(l)) : typeof h == "object" && typeof w[m] == "object" && h !== null && w[m] !== null ? c(h, w[m]) : w[m] == h);
    return c(r, d);
  }
  l() {
    var e, r, n, s, o, i;
    const { host: u = "", pathname: y = "", search: d = "" } = typeof window < "u" ? window.location : {};
    return { host: (e = (r = this.t.location) == null ? void 0 : r.host) != null ? e : u, pathname: (n = (s = this.t.location) == null ? void 0 : s.pathname) != null ? n : y, search: (o = (i = this.t.location) == null ? void 0 : i.search) != null ? o : d };
  }
  get params() {
    const { params: e, query: r } = this.h();
    return B({}, e, r);
  }
  get routeParams() {
    return this.h().params;
  }
  get queryParams() {
    return this.h().query;
  }
  has(e) {
    return this.t.routes.hasOwnProperty(e);
  }
  u(e = {}, r = this.i) {
    e != null || (e = {}), e = ["string", "number"].includes(typeof e) ? [e] : e;
    const n = r.parameterSegments.filter(({ name: s }) => !this.t.defaults[s]);
    return Array.isArray(e) ? e = e.reduce((s, o, i) => B({}, s, n[i] ? { [n[i].name]: o } : typeof o == "object" ? o : { [o]: "" }), {}) : n.length !== 1 || e[n[0].name] || !e.hasOwnProperty(Object.values(r.bindings)[0]) && !e.hasOwnProperty("id") || (e = { [n[0].name]: e }), B({}, this.$(r), this.p(e, r));
  }
  $(e) {
    return e.parameterSegments.filter(({ name: r }) => this.t.defaults[r]).reduce((r, { name: n }, s) => B({}, r, { [n]: this.t.defaults[n] }), {});
  }
  p(e, { bindings: r, parameterSegments: n }) {
    return Object.entries(e).reduce((s, [o, i]) => {
      if (!i || typeof i != "object" || Array.isArray(i) || !n.some(({ name: u }) => u === o)) return B({}, s, { [o]: i });
      if (!i.hasOwnProperty(r[o])) {
        if (!i.hasOwnProperty("id")) throw new Error(`Ziggy error: object passed as '${o}' parameter is missing route model binding key '${r[o]}'.`);
        r[o] = "id";
      }
      return B({}, s, { [o]: i[r[o]] });
    }, {});
  }
  valueOf() {
    return this.toString();
  }
}
function ke(t, e, r, n) {
  const s = new Mn(t, e, r, n);
  return t ? s.toString() : s;
}
const Hn = { class: "min-w-64 h-full border-r border-gray-200 bg-white flex flex-col p-4" }, In = { class: "dcode-chat__search pb-2" }, zn = { class: "dcode-chat__list" }, Vn = {
  key: 0,
  class: ""
}, Jn = ["onClick"], Kn = /* @__PURE__ */ W({
  __name: "DCodeChatLeftColumn",
  props: {
    chats: {},
    currentChat: {},
    loadMessagesRoute: {},
    searchRoute: {}
  },
  emits: ["selectChat", "searchUpdated"],
  setup(t, { emit: e }) {
    const r = e, n = t, s = L([...n.chats]), o = L(n.currentChat);
    X(
      () => n.currentChat,
      (y) => {
        o.value = y;
      }
    ), X(
      () => n.chats,
      (y) => {
        s.value = [...y];
      }
    );
    function i(y) {
      let d = ke(n.loadMessagesRoute, { chat: y.id }) + "?markAsRead=true";
      N.get(d).then((c) => {
        o.value = y, y = c.data.chat || [], r("selectChat", y);
      }).catch((c) => {
        console.error("Error loading chat messages:", c);
      });
    }
    function u(y) {
      r("searchUpdated", y);
    }
    return (y, d) => (F(), j("div", Hn, [
      C("div", In, [
        ne(er, {
          onSearchUpdated: u,
          "search-route": y.searchRoute
        }, null, 8, ["search-route"])
      ]),
      C("div", zn, [
        s.value.length === 0 ? (F(), j("div", Vn, " No match found. ")) : I("", !0),
        (F(!0), j(mt, null, yt(s.value, (c) => {
          var g, w;
          return F(), j("div", {
            key: c.id,
            class: "dcode-chat__participant",
            onClick: (m) => i(c)
          }, [
            ne(wt, {
              chat: c,
              selected: ((g = o.value) == null ? void 0 : g.id) == c.id,
              class: q([{ "bg-gray-100": c.id == ((w = o.value) == null ? void 0 : w.id) }, "p-4 rounded-lg"])
            }, null, 8, ["chat", "selected", "class"])
          ], 8, Jn);
        }), 128))
      ])
    ]));
  }
}), Wn = ["onKeydown"], Qn = /* @__PURE__ */ W({
  name: "DCodeChatListing",
  __name: "DCodeChatPost",
  props: {
    chat: {},
    postUrl: {}
  },
  emits: ["messageSent"],
  setup(t, { emit: e }) {
    const r = t, n = L(r.chat), s = L(r.postUrl), o = L(""), i = L(!1), u = e;
    X(
      () => r.chat,
      (c) => {
        n.value = c;
      }
    ), X(
      () => r.postUrl,
      (c) => {
        s.value = c;
      }
    );
    function y() {
      n && N.post(s.value, {
        message: o.value
      }).then((c) => {
        o.value = "", u("messageSent", c.data.message);
      }).catch((c) => {
        console.error("Error sending message:", c);
      });
    }
    function d(c) {
      !c.shiftKey && o.value.trim().length > 0 && y();
    }
    return (c, g) => (F(), j("div", {
      class: q([i.value ? "border-green-400" : "", "flex items-end border w-full rounded-lg bg-white p-4 dcode-chat__post"])
    }, [
      dt(C("textarea", {
        onFocusin: g[0] || (g[0] = (w) => i.value = !0),
        onFocusout: g[1] || (g[1] = (w) => i.value = !1),
        onKeydown: ht(Wt(d, ["prevent"]), ["enter"]),
        type: "text",
        placeholder: "Send a message...",
        class: "w-full flex-grow text-lg outline-none bg-transparent placeholder-gray-500",
        "onUpdate:modelValue": g[2] || (g[2] = (w) => o.value = w)
      }, null, 40, Wn), [
        [pt, o.value]
      ]),
      C("button", {
        class: q([o.value.length > 0 ? "dcode-chat__send_ready bg-green-500 text-white" : "dcode-chat__send_not_ready bg-gray-100 text-gray-300", "ml-4 text-sm px-6 py-2 rounded-xl transition"]),
        onClick: y
      }, " Send ", 2)
    ], 2));
  }
}), Xn = ["src", "alt"], Zn = { class: "ml-2 text-xs text-gray-500" }, Gn = /* @__PURE__ */ W({
  name: "DCodeChatMessage",
  __name: "DCodeChatMessage",
  props: {
    message: {}
  },
  setup(t) {
    const r = t.message;
    return (n, s) => (F(), j("div", {
      class: q(["flex mb-4", D(r).is_me ? "justify-end" : "justify-start"])
    }, [
      C("div", {
        class: q([
          "flex items-top max-w-2xl space-x-3",
          D(r).is_me ? "flex-row-reverse space-x-reverse" : ""
        ])
      }, [
        C("div", {
          class: q(["w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white", D(r).is_me ? "bg-blue-900" : "bg-gray-200"])
        }, [
          D(r).user_attributes.user_avatar ? I("", !0) : (F(), j("div", {
            key: 0,
            class: q(["w-8 h-8", { "fill-white": D(r).is_me, "fill-gray-300": !D(r).is_me }])
          }, s[0] || (s[0] = [
            C("svg", {
              xmlns: "http://www.w3.org/2000/svg",
              fill: "currentFill",
              viewBox: "0 0 24 24"
            }, [
              C("path", { d: "M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" })
            ], -1)
          ]), 2)),
          D(r).user_attributes.user_avatar ? (F(), j("img", {
            key: 1,
            src: D(r).user_attributes.user_avatar + "?selected=" + (D(r).is_me ? "selected" : ""),
            alt: D(r).user_attributes.user_name,
            class: "w-full h-full rounded-full object-cover"
          }, null, 8, Xn)) : I("", !0)
        ], 2),
        C("div", null, [
          C("div", {
            class: q(["text-sm font-semibold mb-1", D(r).is_me ? "text-right text-gray-800" : "text-left text-gray-800"])
          }, [
            Qt(re(D(r).user_attributes.user_name) + " ", 1),
            C("span", Zn, re(new Date(D(r).created_at).toLocaleString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit"
            })), 1)
          ], 2),
          C("div", {
            class: q(["rounded-lg px-4 py-3 text-sm leading-relaxed", D(r).is_me ? "bg-green-100 text-gray-900" : "bg-gray-100 text-gray-800"])
          }, re(D(r).message), 3)
        ])
      ], 2)
    ], 2));
  }
}), Yn = { class: "dcode-chat__messages w-full flex flex-col flex-1 h-full" }, es = { class: "dcode-chat__header border-b ml-4 mr-4 pt-4" }, ts = {
  key: 0,
  class: "text-center text-gray-500"
}, rs = { class: "m-4" }, ns = /* @__PURE__ */ W({
  name: "DCodeChatMessages",
  __name: "DCodeChatMessages",
  props: {
    chat: {},
    postUrl: {}
  },
  setup(t) {
    const e = t, r = L(e.chat ?? null), n = L(e.postUrl), s = Xt("localEmitter"), o = L(null);
    function i(d) {
      var c;
      if (d.chat.id == ((c = r.value) == null ? void 0 : c.id))
        for (const g of d.messages)
          y(g);
    }
    function u() {
      setTimeout(() => {
        const d = o.value;
        d && (d.scrollTop = d.scrollHeight);
      }, 100);
    }
    gt(() => {
      s == null || s.on("new-messages", i), u();
    }), Zt(() => {
      s == null || s.off("new-messages", i);
    }), X(
      () => e.chat,
      (d) => {
        var c;
        d && d.id === ((c = r.value) == null ? void 0 : c.id) || (r.value = d, u());
      }
    ), X(
      () => e.postUrl,
      (d) => {
        n.value = d;
      }
    );
    function y(d) {
      var g;
      if (!r.value) return;
      const c = (g = r.value) == null ? void 0 : g.messages.find((w) => w.id === d.id);
      if (c) {
        Object.assign(c, d);
        return;
      }
      r.value.messages.push(d), u();
    }
    return (d, c) => {
      var g, w, m;
      return F(), j("div", Yn, [
        C("div", es, [
          d.chat ? (F(), bt(wt, {
            key: 0,
            chat: r.value,
            ignoreUnread: !0
          }, null, 8, ["chat"])) : I("", !0)
        ]),
        C("div", {
          class: "dcode-chat__messages-list p-4 flex-1 overflow-y-auto",
          ref_key: "chatContainer",
          ref: o
        }, [
          ((w = (g = r.value) == null ? void 0 : g.messages) == null ? void 0 : w.length) === 0 ? (F(), j("div", ts, " No messages yet. Start the conversation! ")) : I("", !0),
          (F(!0), j(mt, null, yt((m = r.value) == null ? void 0 : m.messages, (h) => (F(), j("div", {
            key: h.id,
            class: "mb-4 w-full"
          }, [
            ne(Gn, { message: h }, null, 8, ["message"])
          ]))), 128))
        ], 512),
        C("div", rs, [
          ne(Qn, {
            chat: d.chat,
            "post-url": n.value,
            onMessageSent: y
          }, null, 8, ["chat", "post-url"])
        ])
      ]);
    };
  }
});
function ss(t) {
  return { all: t = t || /* @__PURE__ */ new Map(), on: function(e, r) {
    var n = t.get(e);
    n ? n.push(r) : t.set(e, [r]);
  }, off: function(e, r) {
    var n = t.get(e);
    n && (r ? n.splice(n.indexOf(r) >>> 0, 1) : t.set(e, []));
  }, emit: function(e, r) {
    var n = t.get(e);
    n && n.slice().map(function(s) {
      s(r);
    }), (n = t.get("*")) && n.slice().map(function(s) {
      s(e, r);
    });
  } };
}
const os = { class: "dcode-chat w-full h-full overflow-hidden flex flex-col lg:flex-row" }, is = { class: "dcode-chat__left-column" }, as = { class: "dcode-chat__right-column w-full h-full" }, ls = {
  key: 1,
  class: "dcode-chat__nochat p-4 h-full"
}, As = /* @__PURE__ */ W({
  name: "DCodeChat",
  __name: "DCodeChat",
  props: {
    chats: { default: () => [] },
    initialChatId: {},
    postRoute: {},
    heartbeatRoute: {},
    loadMessagesRoute: {},
    searchRoute: {},
    useHeartbeat: { type: Boolean, default: !0 },
    currentQuery: {}
  },
  setup(t) {
    const e = ss();
    Gt("localEmitter", e);
    const r = t, n = L([...r.chats]), s = L(r.initialChatId || null), o = L(null), i = L(r.useHeartbeat), u = L(r.currentQuery || ""), y = r.loadMessagesRoute ? r.loadMessagesRoute : "dcode-chat.messages.index", d = (m) => m ? ke(r.postRoute ? r.postRoute : "dcode-chat.messages.store", { chat: m == null ? void 0 : m.id }) : "";
    gt(async () => {
      w(() => {
        if (s.value) {
          const m = n.value.find((h) => h.id === s.value);
          m && c(m);
        }
      });
    });
    const c = (m) => {
      o.value = m;
    }, g = (m) => {
      u.value = m;
    }, w = async (m) => {
      var h, l;
      if (i.value)
        try {
          let a = ke(r.heartbeatRoute ? r.heartbeatRoute : "dcode-chat.heartbeat"), p = (l = (h = o.value) == null ? void 0 : h.messages) != null && l.length ? o.value.messages[o.value.messages.length - 1] : null;
          const b = new URLSearchParams([
            ["query", u.value || ""],
            ["currentChat", o.value ? o.value.id.toString() : s.value ? s.value.toString() : ""],
            ["loadMessagesRoute", y],
            ["postRoute", r.postRoute || ""],
            ["searchRoute", r.searchRoute || ""],
            ["lastMessageId", p ? p.id.toString() : ""],
            ["markAsRead", "true"]
          ]), S = await N.get(a, { params: b });
          if (n.value = S.data.chats || [], o.value) {
            const v = n.value.find((E) => E.id === o.value.id);
            v && (o.value = v, S.data.newMessages.length > 0 && e.emit("new-messages", { chat: o.value, messages: S.data.newMessages }));
          }
          m && m(S.data), setTimeout(w, 1e3);
        } catch (a) {
          console.error("Error during heartbeat:", a);
        }
    };
    return (m, h) => (F(), j("div", os, [
      C("div", is, [
        ne(Kn, {
          onSearchUpdated: g,
          "search-route": m.searchRoute,
          "load-messages-route": D(y),
          chats: n.value,
          onSelectChat: c,
          currentChat: o.value
        }, null, 8, ["search-route", "load-messages-route", "chats", "currentChat"])
      ]),
      C("div", as, [
        o.value ? (F(), bt(ns, {
          key: 0,
          chat: o.value,
          "post-url": d(o.value)
        }, null, 8, ["chat", "post-url"])) : I("", !0),
        o.value ? I("", !0) : (F(), j("div", ls, h[0] || (h[0] = [
          C("p", null, " Select a chat to start a conversation or view history ", -1)
        ])))
      ])
    ]));
  }
});
export {
  As as DCodeChat,
  Kn as DCodeChatLeftColumn,
  wt as DCodeChatListing,
  Gn as DCodeChatMessage,
  ns as DCodeChatMessages,
  Qn as DCodeChatPost,
  er as DCodeChatSearch
};
