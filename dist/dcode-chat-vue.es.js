import { defineComponent as me, ref as J, watch as de, createElementBlock as K, openBlock as V, createElementVNode as M, withDirectives as qn, withKeys as Bn, vModelText as Mn, createCommentVNode as ae, normalizeClass as se, toDisplayString as Le, createVNode as Ne, Fragment as $n, renderList as Hn, withModifiers as Ri, computed as Oi, unref as he, createTextVNode as Pi, inject as Ai, onMounted as Ft, onBeforeUnmount as Li, createBlock as zn, provide as Ni } from "vue";
class qt {
  /**
   * Listen for a whisper event on the channel instance.
   */
  listenForWhisper(e, n) {
    return this.listen(".client-" + e, n);
  }
  /**
   * Listen for an event on the channel instance.
   */
  notification(e) {
    return this.listen(
      ".Illuminate\\Notifications\\Events\\BroadcastNotificationCreated",
      e
    );
  }
  /**
   * Stop listening for a whisper event on the channel instance.
   */
  stopListeningForWhisper(e, n) {
    return this.stopListening(".client-" + e, n);
  }
}
class Jn {
  /**
   * Create a new class instance.
   */
  constructor(e) {
    this.namespace = e;
  }
  /**
   * Format the given event name.
   */
  format(e) {
    return [".", "\\"].includes(e.charAt(0)) ? e.substring(1) : (this.namespace && (e = this.namespace + "." + e), e.replace(/\./g, "\\"));
  }
  /**
   * Set the event namespace.
   */
  setNamespace(e) {
    this.namespace = e;
  }
}
function ji(r) {
  try {
    new r();
  } catch (e) {
    if (e instanceof Error && e.message.includes("is not a constructor"))
      return !1;
  }
  return !0;
}
class Bt extends qt {
  /**
   * Create a new class instance.
   */
  constructor(e, n, i) {
    super(), this.name = n, this.pusher = e, this.options = i, this.eventFormatter = new Jn(this.options.namespace), this.subscribe();
  }
  /**
   * Subscribe to a Pusher channel.
   */
  subscribe() {
    this.subscription = this.pusher.subscribe(this.name);
  }
  /**
   * Unsubscribe from a Pusher channel.
   */
  unsubscribe() {
    this.pusher.unsubscribe(this.name);
  }
  /**
   * Listen for an event on the channel instance.
   */
  listen(e, n) {
    return this.on(this.eventFormatter.format(e), n), this;
  }
  /**
   * Listen for all events on the channel instance.
   */
  listenToAll(e) {
    return this.subscription.bind_global((n, i) => {
      if (n.startsWith("pusher:"))
        return;
      let a = String(this.options.namespace ?? "").replace(
        /\./g,
        "\\"
      ), l = n.startsWith(a) ? n.substring(a.length + 1) : "." + n;
      e(l, i);
    }), this;
  }
  /**
   * Stop listening for an event on the channel instance.
   */
  stopListening(e, n) {
    return n ? this.subscription.unbind(
      this.eventFormatter.format(e),
      n
    ) : this.subscription.unbind(this.eventFormatter.format(e)), this;
  }
  /**
   * Stop listening for all events on the channel instance.
   */
  stopListeningToAll(e) {
    return e ? this.subscription.unbind_global(e) : this.subscription.unbind_global(), this;
  }
  /**
   * Register a callback to be called anytime a subscription succeeds.
   */
  subscribed(e) {
    return this.on("pusher:subscription_succeeded", () => {
      e();
    }), this;
  }
  /**
   * Register a callback to be called anytime a subscription error occurs.
   */
  error(e) {
    return this.on("pusher:subscription_error", (n) => {
      e(n);
    }), this;
  }
  /**
   * Bind a channel to an event.
   */
  on(e, n) {
    return this.subscription.bind(e, n), this;
  }
}
class Vn extends Bt {
  /**
   * Send a whisper event to other clients in the channel.
   */
  whisper(e, n) {
    return this.pusher.channels.channels[this.name].trigger(
      `client-${e}`,
      n
    ), this;
  }
}
class Ui extends Bt {
  /**
   * Send a whisper event to other clients in the channel.
   */
  whisper(e, n) {
    return this.pusher.channels.channels[this.name].trigger(
      `client-${e}`,
      n
    ), this;
  }
}
class Di extends Vn {
  /**
   * Register a callback to be called anytime the member list changes.
   */
  here(e) {
    return this.on("pusher:subscription_succeeded", (n) => {
      e(Object.keys(n.members).map((i) => n.members[i]));
    }), this;
  }
  /**
   * Listen for someone joining the channel.
   */
  joining(e) {
    return this.on("pusher:member_added", (n) => {
      e(n.info);
    }), this;
  }
  /**
   * Send a whisper event to other clients in the channel.
   */
  whisper(e, n) {
    return this.pusher.channels.channels[this.name].trigger(
      `client-${e}`,
      n
    ), this;
  }
  /**
   * Listen for someone leaving the channel.
   */
  leaving(e) {
    return this.on("pusher:member_removed", (n) => {
      e(n.info);
    }), this;
  }
}
class Xn extends qt {
  /**
   * Create a new class instance.
   */
  constructor(e, n, i) {
    super(), this.events = {}, this.listeners = {}, this.name = n, this.socket = e, this.options = i, this.eventFormatter = new Jn(this.options.namespace), this.subscribe();
  }
  /**
   * Subscribe to a Socket.io channel.
   */
  subscribe() {
    this.socket.emit("subscribe", {
      channel: this.name,
      auth: this.options.auth || {}
    });
  }
  /**
   * Unsubscribe from channel and ubind event callbacks.
   */
  unsubscribe() {
    this.unbind(), this.socket.emit("unsubscribe", {
      channel: this.name,
      auth: this.options.auth || {}
    });
  }
  /**
   * Listen for an event on the channel instance.
   */
  listen(e, n) {
    return this.on(this.eventFormatter.format(e), n), this;
  }
  /**
   * Stop listening for an event on the channel instance.
   */
  stopListening(e, n) {
    return this.unbindEvent(this.eventFormatter.format(e), n), this;
  }
  /**
   * Register a callback to be called anytime a subscription succeeds.
   */
  subscribed(e) {
    return this.on("connect", (n) => {
      e(n);
    }), this;
  }
  /**
   * Register a callback to be called anytime an error occurs.
   */
  error(e) {
    return this;
  }
  /**
   * Bind the channel's socket to an event and store the callback.
   */
  on(e, n) {
    return this.listeners[e] = this.listeners[e] || [], this.events[e] || (this.events[e] = (i, a) => {
      this.name === i && this.listeners[e] && this.listeners[e].forEach((l) => l(a));
    }, this.socket.on(e, this.events[e])), this.listeners[e].push(n), this;
  }
  /**
   * Unbind the channel's socket from all stored event callbacks.
   */
  unbind() {
    Object.keys(this.events).forEach((e) => {
      this.unbindEvent(e);
    });
  }
  /**
   * Unbind the listeners for the given event.
   */
  unbindEvent(e, n) {
    this.listeners[e] = this.listeners[e] || [], n && (this.listeners[e] = this.listeners[e].filter(
      (i) => i !== n
    )), (!n || this.listeners[e].length === 0) && (this.events[e] && (this.socket.removeListener(e, this.events[e]), delete this.events[e]), delete this.listeners[e]);
  }
}
class Wn extends Xn {
  /**
   * Send a whisper event to other clients in the channel.
   */
  whisper(e, n) {
    return this.socket.emit("client event", {
      channel: this.name,
      event: `client-${e}`,
      data: n
    }), this;
  }
}
class Ii extends Wn {
  /**
   * Register a callback to be called anytime the member list changes.
   */
  here(e) {
    return this.on("presence:subscribed", (n) => {
      e(n.map((i) => i.user_info));
    }), this;
  }
  /**
   * Listen for someone joining the channel.
   */
  joining(e) {
    return this.on(
      "presence:joining",
      (n) => e(n.user_info)
    ), this;
  }
  /**
   * Send a whisper event to other clients in the channel.
   */
  whisper(e, n) {
    return this.socket.emit("client event", {
      channel: this.name,
      event: `client-${e}`,
      data: n
    }), this;
  }
  /**
   * Listen for someone leaving the channel.
   */
  leaving(e) {
    return this.on(
      "presence:leaving",
      (n) => e(n.user_info)
    ), this;
  }
}
class Ze extends qt {
  /**
   * Subscribe to a channel.
   */
  subscribe() {
  }
  /**
   * Unsubscribe from a channel.
   */
  unsubscribe() {
  }
  /**
   * Listen for an event on the channel instance.
   */
  listen(e, n) {
    return this;
  }
  /**
   * Listen for all events on the channel instance.
   */
  listenToAll(e) {
    return this;
  }
  /**
   * Stop listening for an event on the channel instance.
   */
  stopListening(e, n) {
    return this;
  }
  /**
   * Register a callback to be called anytime a subscription succeeds.
   */
  subscribed(e) {
    return this;
  }
  /**
   * Register a callback to be called anytime an error occurs.
   */
  error(e) {
    return this;
  }
  /**
   * Bind a channel to an event.
   */
  on(e, n) {
    return this;
  }
}
class Kn extends Ze {
  /**
   * Send a whisper event to other clients in the channel.
   */
  whisper(e, n) {
    return this;
  }
}
class Fi extends Ze {
  /**
   * Send a whisper event to other clients in the channel.
   */
  whisper(e, n) {
    return this;
  }
}
class qi extends Kn {
  /**
   * Register a callback to be called anytime the member list changes.
   */
  here(e) {
    return this;
  }
  /**
   * Listen for someone joining the channel.
   */
  joining(e) {
    return this;
  }
  /**
   * Send a whisper event to other clients in the channel.
   */
  whisper(e, n) {
    return this;
  }
  /**
   * Listen for someone leaving the channel.
   */
  leaving(e) {
    return this;
  }
}
const Qn = class Gn {
  /**
   * Create a new class instance.
   */
  constructor(e) {
    this.setOptions(e), this.connect();
  }
  /**
   * Merge the custom options with the defaults.
   */
  setOptions(e) {
    this.options = {
      ...Gn._defaultOptions,
      ...e,
      broadcaster: e.broadcaster
    };
    let n = this.csrfToken();
    n && (this.options.auth.headers["X-CSRF-TOKEN"] = n, this.options.userAuthentication.headers["X-CSRF-TOKEN"] = n), n = this.options.bearerToken, n && (this.options.auth.headers.Authorization = "Bearer " + n, this.options.userAuthentication.headers.Authorization = "Bearer " + n);
  }
  /**
   * Extract the CSRF token from the page.
   */
  csrfToken() {
    var e, n;
    return ((e = window == null ? void 0 : window.Laravel) == null ? void 0 : e.csrfToken) ?? this.options.csrfToken ?? ((n = document == null ? void 0 : document.querySelector('meta[name="csrf-token"]')) == null ? void 0 : n.getAttribute("content")) ?? null;
  }
};
Qn._defaultOptions = {
  auth: {
    headers: {}
  },
  authEndpoint: "/broadcasting/auth",
  userAuthentication: {
    endpoint: "/broadcasting/user-auth",
    headers: {}
  },
  csrfToken: null,
  bearerToken: null,
  host: null,
  key: null,
  namespace: "App.Events"
};
let Mt = Qn;
class We extends Mt {
  constructor() {
    super(...arguments), this.channels = {};
  }
  /**
   * Create a fresh Pusher connection.
   */
  connect() {
    if (typeof this.options.client < "u")
      this.pusher = this.options.client;
    else if (this.options.Pusher)
      this.pusher = new this.options.Pusher(
        this.options.key,
        this.options
      );
    else if (typeof window < "u" && typeof window.Pusher < "u")
      this.pusher = new window.Pusher(this.options.key, this.options);
    else
      throw new Error(
        "Pusher client not found. Should be globally available or passed via options.client"
      );
  }
  /**
   * Sign in the user via Pusher user authentication (https://pusher.com/docs/channels/using_channels/user-authentication/).
   */
  signin() {
    this.pusher.signin();
  }
  /**
   * Listen for an event on a channel instance.
   */
  listen(e, n, i) {
    return this.channel(e).listen(n, i);
  }
  /**
   * Get a channel instance by name.
   */
  channel(e) {
    return this.channels[e] || (this.channels[e] = new Bt(
      this.pusher,
      e,
      this.options
    )), this.channels[e];
  }
  /**
   * Get a private channel instance by name.
   */
  privateChannel(e) {
    return this.channels["private-" + e] || (this.channels["private-" + e] = new Vn(
      this.pusher,
      "private-" + e,
      this.options
    )), this.channels["private-" + e];
  }
  /**
   * Get a private encrypted channel instance by name.
   */
  encryptedPrivateChannel(e) {
    return this.channels["private-encrypted-" + e] || (this.channels["private-encrypted-" + e] = new Ui(
      this.pusher,
      "private-encrypted-" + e,
      this.options
    )), this.channels["private-encrypted-" + e];
  }
  /**
   * Get a presence channel instance by name.
   */
  presenceChannel(e) {
    return this.channels["presence-" + e] || (this.channels["presence-" + e] = new Di(
      this.pusher,
      "presence-" + e,
      this.options
    )), this.channels["presence-" + e];
  }
  /**
   * Leave the given channel, as well as its private and presence variants.
   */
  leave(e) {
    [
      e,
      "private-" + e,
      "private-encrypted-" + e,
      "presence-" + e
    ].forEach((n) => {
      this.leaveChannel(n);
    });
  }
  /**
   * Leave the given channel.
   */
  leaveChannel(e) {
    this.channels[e] && (this.channels[e].unsubscribe(), delete this.channels[e]);
  }
  /**
   * Get the socket ID for the connection.
   */
  socketId() {
    return this.pusher.connection.socket_id;
  }
  /**
   * Disconnect Pusher connection.
   */
  disconnect() {
    this.pusher.disconnect();
  }
}
class Bi extends Mt {
  constructor() {
    super(...arguments), this.channels = {};
  }
  /**
   * Create a fresh Socket.io connection.
   */
  connect() {
    let e = this.getSocketIO();
    this.socket = e(
      this.options.host ?? void 0,
      this.options
    ), this.socket.on("reconnect", () => {
      Object.values(this.channels).forEach((n) => {
        n.subscribe();
      });
    });
  }
  /**
   * Get socket.io module from global scope or options.
   */
  getSocketIO() {
    if (typeof this.options.client < "u")
      return this.options.client;
    if (typeof window < "u" && typeof window.io < "u")
      return window.io;
    throw new Error(
      "Socket.io client not found. Should be globally available or passed via options.client"
    );
  }
  /**
   * Listen for an event on a channel instance.
   */
  listen(e, n, i) {
    return this.channel(e).listen(n, i);
  }
  /**
   * Get a channel instance by name.
   */
  channel(e) {
    return this.channels[e] || (this.channels[e] = new Xn(
      this.socket,
      e,
      this.options
    )), this.channels[e];
  }
  /**
   * Get a private channel instance by name.
   */
  privateChannel(e) {
    return this.channels["private-" + e] || (this.channels["private-" + e] = new Wn(
      this.socket,
      "private-" + e,
      this.options
    )), this.channels["private-" + e];
  }
  /**
   * Get a presence channel instance by name.
   */
  presenceChannel(e) {
    return this.channels["presence-" + e] || (this.channels["presence-" + e] = new Ii(
      this.socket,
      "presence-" + e,
      this.options
    )), this.channels["presence-" + e];
  }
  /**
   * Leave the given channel, as well as its private and presence variants.
   */
  leave(e) {
    [e, "private-" + e, "presence-" + e].forEach((n) => {
      this.leaveChannel(n);
    });
  }
  /**
   * Leave the given channel.
   */
  leaveChannel(e) {
    this.channels[e] && (this.channels[e].unsubscribe(), delete this.channels[e]);
  }
  /**
   * Get the socket ID for the connection.
   */
  socketId() {
    return this.socket.id;
  }
  /**
   * Disconnect Socketio connection.
   */
  disconnect() {
    this.socket.disconnect();
  }
}
class yn extends Mt {
  constructor() {
    super(...arguments), this.channels = {};
  }
  /**
   * Create a fresh connection.
   */
  connect() {
  }
  /**
   * Listen for an event on a channel instance.
   */
  listen(e, n, i) {
    return new Ze();
  }
  /**
   * Get a channel instance by name.
   */
  channel(e) {
    return new Ze();
  }
  /**
   * Get a private channel instance by name.
   */
  privateChannel(e) {
    return new Kn();
  }
  /**
   * Get a private encrypted channel instance by name.
   */
  encryptedPrivateChannel(e) {
    return new Fi();
  }
  /**
   * Get a presence channel instance by name.
   */
  presenceChannel(e) {
    return new qi();
  }
  /**
   * Leave the given channel, as well as its private and presence variants.
   */
  leave(e) {
  }
  /**
   * Leave the given channel.
   */
  leaveChannel(e) {
  }
  /**
   * Get the socket ID for the connection.
   */
  socketId() {
    return "fake-socket-id";
  }
  /**
   * Disconnect the connection.
   */
  disconnect() {
  }
}
class Zn {
  /**
   * Create a new class instance.
   */
  constructor(e) {
    this.options = e, this.connect(), this.options.withoutInterceptors || this.registerInterceptors();
  }
  /**
   * Get a channel instance by name.
   */
  channel(e) {
    return this.connector.channel(e);
  }
  /**
   * Create a new connection.
   */
  connect() {
    if (this.options.broadcaster === "reverb")
      this.connector = new We({
        ...this.options,
        cluster: ""
      });
    else if (this.options.broadcaster === "pusher")
      this.connector = new We(this.options);
    else if (this.options.broadcaster === "ably")
      this.connector = new We({
        ...this.options,
        cluster: "",
        broadcaster: "pusher"
      });
    else if (this.options.broadcaster === "socket.io")
      this.connector = new Bi(this.options);
    else if (this.options.broadcaster === "null")
      this.connector = new yn(this.options);
    else if (typeof this.options.broadcaster == "function" && ji(this.options.broadcaster))
      this.connector = new this.options.broadcaster(this.options);
    else
      throw new Error(
        `Broadcaster ${typeof this.options.broadcaster} ${String(this.options.broadcaster)} is not supported.`
      );
  }
  /**
   * Disconnect from the Echo server.
   */
  disconnect() {
    this.connector.disconnect();
  }
  /**
   * Get a presence channel instance by name.
   */
  join(e) {
    return this.connector.presenceChannel(e);
  }
  /**
   * Leave the given channel, as well as its private and presence variants.
   */
  leave(e) {
    this.connector.leave(e);
  }
  /**
   * Leave the given channel.
   */
  leaveChannel(e) {
    this.connector.leaveChannel(e);
  }
  /**
   * Leave all channels.
   */
  leaveAllChannels() {
    for (const e in this.connector.channels)
      this.leaveChannel(e);
  }
  /**
   * Listen for an event on a channel instance.
   */
  listen(e, n, i) {
    return this.connector.listen(e, n, i);
  }
  /**
   * Get a private channel instance by name.
   */
  private(e) {
    return this.connector.privateChannel(e);
  }
  /**
   * Get a private encrypted channel instance by name.
   */
  encryptedPrivate(e) {
    if (this.connectorSupportsEncryptedPrivateChannels(this.connector))
      return this.connector.encryptedPrivateChannel(e);
    throw new Error(
      `Broadcaster ${typeof this.options.broadcaster} ${String(
        this.options.broadcaster
      )} does not support encrypted private channels.`
    );
  }
  connectorSupportsEncryptedPrivateChannels(e) {
    return e instanceof We || e instanceof yn;
  }
  /**
   * Get the Socket ID for the connection.
   */
  socketId() {
    return this.connector.socketId();
  }
  /**
   * Register 3rd party request interceptiors. These are used to automatically
   * send a connections socket id to a Laravel app with a X-Socket-Id header.
   */
  registerInterceptors() {
    typeof Vue < "u" && Vue != null && Vue.http && this.registerVueRequestInterceptor(), typeof axios == "function" && this.registerAxiosRequestInterceptor(), typeof jQuery == "function" && this.registerjQueryAjaxSetup(), typeof Turbo == "object" && this.registerTurboRequestInterceptor();
  }
  /**
   * Register a Vue HTTP interceptor to add the X-Socket-ID header.
   */
  registerVueRequestInterceptor() {
    Vue.http.interceptors.push(
      (e, n) => {
        this.socketId() && e.headers.set("X-Socket-ID", this.socketId()), n();
      }
    );
  }
  /**
   * Register an Axios HTTP interceptor to add the X-Socket-ID header.
   */
  registerAxiosRequestInterceptor() {
    axios.interceptors.request.use(
      (e) => (this.socketId() && (e.headers["X-Socket-Id"] = this.socketId()), e)
    );
  }
  /**
   * Register jQuery AjaxPrefilter to add the X-Socket-ID header.
   */
  registerjQueryAjaxSetup() {
    typeof jQuery.ajax < "u" && jQuery.ajaxPrefilter(
      (e, n, i) => {
        this.socketId() && i.setRequestHeader("X-Socket-Id", this.socketId());
      }
    );
  }
  /**
   * Register the Turbo Request interceptor to add the X-Socket-ID header.
   */
  registerTurboRequestInterceptor() {
    document.addEventListener(
      "turbo:before-fetch-request",
      (e) => {
        e.detail.fetchOptions.headers["X-Socket-Id"] = this.socketId();
      }
    );
  }
}
function Mi(r) {
  return r && r.__esModule && Object.prototype.hasOwnProperty.call(r, "default") ? r.default : r;
}
var St = { exports: {} };
/*!
 * Pusher JavaScript Library v8.4.0
 * https://pusher.com/
 *
 * Copyright 2020, Pusher
 * Released under the MIT licence.
 */
var wn;
function $i() {
  return wn || (wn = 1, function(r, e) {
    (function(i, a) {
      r.exports = a();
    })(window, function() {
      return (
        /******/
        function(n) {
          var i = {};
          function a(l) {
            if (i[l])
              return i[l].exports;
            var u = i[l] = {
              /******/
              i: l,
              /******/
              l: !1,
              /******/
              exports: {}
              /******/
            };
            return n[l].call(u.exports, u, u.exports, a), u.l = !0, u.exports;
          }
          return a.m = n, a.c = i, a.d = function(l, u, g) {
            a.o(l, u) || Object.defineProperty(l, u, { enumerable: !0, get: g });
          }, a.r = function(l) {
            typeof Symbol < "u" && Symbol.toStringTag && Object.defineProperty(l, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(l, "__esModule", { value: !0 });
          }, a.t = function(l, u) {
            if (u & 1 && (l = a(l)), u & 8 || u & 4 && typeof l == "object" && l && l.__esModule) return l;
            var g = /* @__PURE__ */ Object.create(null);
            if (a.r(g), Object.defineProperty(g, "default", { enumerable: !0, value: l }), u & 2 && typeof l != "string") for (var C in l) a.d(g, C, (function(T) {
              return l[T];
            }).bind(null, C));
            return g;
          }, a.n = function(l) {
            var u = l && l.__esModule ? (
              /******/
              function() {
                return l.default;
              }
            ) : (
              /******/
              function() {
                return l;
              }
            );
            return a.d(u, "a", u), u;
          }, a.o = function(l, u) {
            return Object.prototype.hasOwnProperty.call(l, u);
          }, a.p = "", a(a.s = 2);
        }([
          /* 0 */
          /***/
          function(n, i, a) {
            var l = this && this.__extends || /* @__PURE__ */ function() {
              var f = function(h, m) {
                return f = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(b, E) {
                  b.__proto__ = E;
                } || function(b, E) {
                  for (var k in E) E.hasOwnProperty(k) && (b[k] = E[k]);
                }, f(h, m);
              };
              return function(h, m) {
                f(h, m);
                function b() {
                  this.constructor = h;
                }
                h.prototype = m === null ? Object.create(m) : (b.prototype = m.prototype, new b());
              };
            }();
            Object.defineProperty(i, "__esModule", { value: !0 });
            var u = 256, g = (
              /** @class */
              function() {
                function f(h) {
                  h === void 0 && (h = "="), this._paddingCharacter = h;
                }
                return f.prototype.encodedLength = function(h) {
                  return this._paddingCharacter ? (h + 2) / 3 * 4 | 0 : (h * 8 + 5) / 6 | 0;
                }, f.prototype.encode = function(h) {
                  for (var m = "", b = 0; b < h.length - 2; b += 3) {
                    var E = h[b] << 16 | h[b + 1] << 8 | h[b + 2];
                    m += this._encodeByte(E >>> 3 * 6 & 63), m += this._encodeByte(E >>> 2 * 6 & 63), m += this._encodeByte(E >>> 1 * 6 & 63), m += this._encodeByte(E >>> 0 * 6 & 63);
                  }
                  var k = h.length - b;
                  if (k > 0) {
                    var E = h[b] << 16 | (k === 2 ? h[b + 1] << 8 : 0);
                    m += this._encodeByte(E >>> 3 * 6 & 63), m += this._encodeByte(E >>> 2 * 6 & 63), k === 2 ? m += this._encodeByte(E >>> 1 * 6 & 63) : m += this._paddingCharacter || "", m += this._paddingCharacter || "";
                  }
                  return m;
                }, f.prototype.maxDecodedLength = function(h) {
                  return this._paddingCharacter ? h / 4 * 3 | 0 : (h * 6 + 7) / 8 | 0;
                }, f.prototype.decodedLength = function(h) {
                  return this.maxDecodedLength(h.length - this._getPaddingLength(h));
                }, f.prototype.decode = function(h) {
                  if (h.length === 0)
                    return new Uint8Array(0);
                  for (var m = this._getPaddingLength(h), b = h.length - m, E = new Uint8Array(this.maxDecodedLength(b)), k = 0, R = 0, P = 0, N = 0, A = 0, I = 0, F = 0; R < b - 4; R += 4)
                    N = this._decodeChar(h.charCodeAt(R + 0)), A = this._decodeChar(h.charCodeAt(R + 1)), I = this._decodeChar(h.charCodeAt(R + 2)), F = this._decodeChar(h.charCodeAt(R + 3)), E[k++] = N << 2 | A >>> 4, E[k++] = A << 4 | I >>> 2, E[k++] = I << 6 | F, P |= N & u, P |= A & u, P |= I & u, P |= F & u;
                  if (R < b - 1 && (N = this._decodeChar(h.charCodeAt(R)), A = this._decodeChar(h.charCodeAt(R + 1)), E[k++] = N << 2 | A >>> 4, P |= N & u, P |= A & u), R < b - 2 && (I = this._decodeChar(h.charCodeAt(R + 2)), E[k++] = A << 4 | I >>> 2, P |= I & u), R < b - 3 && (F = this._decodeChar(h.charCodeAt(R + 3)), E[k++] = I << 6 | F, P |= F & u), P !== 0)
                    throw new Error("Base64Coder: incorrect characters for decoding");
                  return E;
                }, f.prototype._encodeByte = function(h) {
                  var m = h;
                  return m += 65, m += 25 - h >>> 8 & 6, m += 51 - h >>> 8 & -75, m += 61 - h >>> 8 & -15, m += 62 - h >>> 8 & 3, String.fromCharCode(m);
                }, f.prototype._decodeChar = function(h) {
                  var m = u;
                  return m += (42 - h & h - 44) >>> 8 & -256 + h - 43 + 62, m += (46 - h & h - 48) >>> 8 & -256 + h - 47 + 63, m += (47 - h & h - 58) >>> 8 & -256 + h - 48 + 52, m += (64 - h & h - 91) >>> 8 & -256 + h - 65 + 0, m += (96 - h & h - 123) >>> 8 & -256 + h - 97 + 26, m;
                }, f.prototype._getPaddingLength = function(h) {
                  var m = 0;
                  if (this._paddingCharacter) {
                    for (var b = h.length - 1; b >= 0 && h[b] === this._paddingCharacter; b--)
                      m++;
                    if (h.length < 4 || m > 2)
                      throw new Error("Base64Coder: incorrect padding");
                  }
                  return m;
                }, f;
              }()
            );
            i.Coder = g;
            var C = new g();
            function T(f) {
              return C.encode(f);
            }
            i.encode = T;
            function p(f) {
              return C.decode(f);
            }
            i.decode = p;
            var _ = (
              /** @class */
              function(f) {
                l(h, f);
                function h() {
                  return f !== null && f.apply(this, arguments) || this;
                }
                return h.prototype._encodeByte = function(m) {
                  var b = m;
                  return b += 65, b += 25 - m >>> 8 & 6, b += 51 - m >>> 8 & -75, b += 61 - m >>> 8 & -13, b += 62 - m >>> 8 & 49, String.fromCharCode(b);
                }, h.prototype._decodeChar = function(m) {
                  var b = u;
                  return b += (44 - m & m - 46) >>> 8 & -256 + m - 45 + 62, b += (94 - m & m - 96) >>> 8 & -256 + m - 95 + 63, b += (47 - m & m - 58) >>> 8 & -256 + m - 48 + 52, b += (64 - m & m - 91) >>> 8 & -256 + m - 65 + 0, b += (96 - m & m - 123) >>> 8 & -256 + m - 97 + 26, b;
                }, h;
              }(g)
            );
            i.URLSafeCoder = _;
            var S = new _();
            function w(f) {
              return S.encode(f);
            }
            i.encodeURLSafe = w;
            function v(f) {
              return S.decode(f);
            }
            i.decodeURLSafe = v, i.encodedLength = function(f) {
              return C.encodedLength(f);
            }, i.maxDecodedLength = function(f) {
              return C.maxDecodedLength(f);
            }, i.decodedLength = function(f) {
              return C.decodedLength(f);
            };
          },
          /* 1 */
          /***/
          function(n, i, a) {
            Object.defineProperty(i, "__esModule", { value: !0 });
            var l = "utf8: invalid string", u = "utf8: invalid source encoding";
            function g(p) {
              for (var _ = new Uint8Array(C(p)), S = 0, w = 0; w < p.length; w++) {
                var v = p.charCodeAt(w);
                v < 128 ? _[S++] = v : v < 2048 ? (_[S++] = 192 | v >> 6, _[S++] = 128 | v & 63) : v < 55296 ? (_[S++] = 224 | v >> 12, _[S++] = 128 | v >> 6 & 63, _[S++] = 128 | v & 63) : (w++, v = (v & 1023) << 10, v |= p.charCodeAt(w) & 1023, v += 65536, _[S++] = 240 | v >> 18, _[S++] = 128 | v >> 12 & 63, _[S++] = 128 | v >> 6 & 63, _[S++] = 128 | v & 63);
              }
              return _;
            }
            i.encode = g;
            function C(p) {
              for (var _ = 0, S = 0; S < p.length; S++) {
                var w = p.charCodeAt(S);
                if (w < 128)
                  _ += 1;
                else if (w < 2048)
                  _ += 2;
                else if (w < 55296)
                  _ += 3;
                else if (w <= 57343) {
                  if (S >= p.length - 1)
                    throw new Error(l);
                  S++, _ += 4;
                } else
                  throw new Error(l);
              }
              return _;
            }
            i.encodedLength = C;
            function T(p) {
              for (var _ = [], S = 0; S < p.length; S++) {
                var w = p[S];
                if (w & 128) {
                  var v = void 0;
                  if (w < 224) {
                    if (S >= p.length)
                      throw new Error(u);
                    var f = p[++S];
                    if ((f & 192) !== 128)
                      throw new Error(u);
                    w = (w & 31) << 6 | f & 63, v = 128;
                  } else if (w < 240) {
                    if (S >= p.length - 1)
                      throw new Error(u);
                    var f = p[++S], h = p[++S];
                    if ((f & 192) !== 128 || (h & 192) !== 128)
                      throw new Error(u);
                    w = (w & 15) << 12 | (f & 63) << 6 | h & 63, v = 2048;
                  } else if (w < 248) {
                    if (S >= p.length - 2)
                      throw new Error(u);
                    var f = p[++S], h = p[++S], m = p[++S];
                    if ((f & 192) !== 128 || (h & 192) !== 128 || (m & 192) !== 128)
                      throw new Error(u);
                    w = (w & 15) << 18 | (f & 63) << 12 | (h & 63) << 6 | m & 63, v = 65536;
                  } else
                    throw new Error(u);
                  if (w < v || w >= 55296 && w <= 57343)
                    throw new Error(u);
                  if (w >= 65536) {
                    if (w > 1114111)
                      throw new Error(u);
                    w -= 65536, _.push(String.fromCharCode(55296 | w >> 10)), w = 56320 | w & 1023;
                  }
                }
                _.push(String.fromCharCode(w));
              }
              return _.join("");
            }
            i.decode = T;
          },
          /* 2 */
          /***/
          function(n, i, a) {
            n.exports = a(3).default;
          },
          /* 3 */
          /***/
          function(n, i, a) {
            a.r(i);
            class l {
              constructor(t, s) {
                this.lastId = 0, this.prefix = t, this.name = s;
              }
              create(t) {
                this.lastId++;
                var s = this.lastId, c = this.prefix + s, d = this.name + "[" + s + "]", x = !1, O = function() {
                  x || (t.apply(null, arguments), x = !0);
                };
                return this[s] = O, { number: s, id: c, name: d, callback: O };
              }
              remove(t) {
                delete this[t.number];
              }
            }
            var u = new l("_pusher_script_", "Pusher.ScriptReceivers"), g = {
              VERSION: "8.4.0",
              PROTOCOL: 7,
              wsPort: 80,
              wssPort: 443,
              wsPath: "",
              httpHost: "sockjs.pusher.com",
              httpPort: 80,
              httpsPort: 443,
              httpPath: "/pusher",
              stats_host: "stats.pusher.com",
              authEndpoint: "/pusher/auth",
              authTransport: "ajax",
              activityTimeout: 12e4,
              pongTimeout: 3e4,
              unavailableTimeout: 1e4,
              userAuthentication: {
                endpoint: "/pusher/user-auth",
                transport: "ajax"
              },
              channelAuthorization: {
                endpoint: "/pusher/auth",
                transport: "ajax"
              },
              cdn_http: "http://js.pusher.com",
              cdn_https: "https://js.pusher.com",
              dependency_suffix: ""
            }, C = g;
            class T {
              constructor(t) {
                this.options = t, this.receivers = t.receivers || u, this.loading = {};
              }
              load(t, s, c) {
                var d = this;
                if (d.loading[t] && d.loading[t].length > 0)
                  d.loading[t].push(c);
                else {
                  d.loading[t] = [c];
                  var x = U.createScriptRequest(d.getPath(t, s)), O = d.receivers.create(function(L) {
                    if (d.receivers.remove(O), d.loading[t]) {
                      var j = d.loading[t];
                      delete d.loading[t];
                      for (var q = function(W) {
                        W || x.cleanup();
                      }, B = 0; B < j.length; B++)
                        j[B](L, q);
                    }
                  });
                  x.send(O);
                }
              }
              getRoot(t) {
                var s, c = U.getDocument().location.protocol;
                return t && t.useTLS || c === "https:" ? s = this.options.cdn_https : s = this.options.cdn_http, s.replace(/\/*$/, "") + "/" + this.options.version;
              }
              getPath(t, s) {
                return this.getRoot(s) + "/" + t + this.options.suffix + ".js";
              }
            }
            var p = new l("_pusher_dependencies", "Pusher.DependenciesReceivers"), _ = new T({
              cdn_http: C.cdn_http,
              cdn_https: C.cdn_https,
              version: C.VERSION,
              suffix: C.dependency_suffix,
              receivers: p
            });
            const S = {
              baseUrl: "https://pusher.com",
              urls: {
                authenticationEndpoint: {
                  path: "/docs/channels/server_api/authenticating_users"
                },
                authorizationEndpoint: {
                  path: "/docs/channels/server_api/authorizing-users/"
                },
                javascriptQuickStart: {
                  path: "/docs/javascript_quick_start"
                },
                triggeringClientEvents: {
                  path: "/docs/client_api_guide/client_events#trigger-events"
                },
                encryptedChannelSupport: {
                  fullUrl: "https://github.com/pusher/pusher-js/tree/cc491015371a4bde5743d1c87a0fbac0feb53195#encrypted-channel-support"
                }
              }
            };
            var v = { buildLogSuffix: function(o) {
              const t = "See:", s = S.urls[o];
              if (!s)
                return "";
              let c;
              return s.fullUrl ? c = s.fullUrl : s.path && (c = S.baseUrl + s.path), c ? `${t} ${c}` : "";
            } }, f;
            (function(o) {
              o.UserAuthentication = "user-authentication", o.ChannelAuthorization = "channel-authorization";
            })(f || (f = {}));
            class h extends Error {
              constructor(t) {
                super(t), Object.setPrototypeOf(this, new.target.prototype);
              }
            }
            class m extends Error {
              constructor(t) {
                super(t), Object.setPrototypeOf(this, new.target.prototype);
              }
            }
            class b extends Error {
              constructor(t) {
                super(t), Object.setPrototypeOf(this, new.target.prototype);
              }
            }
            class E extends Error {
              constructor(t) {
                super(t), Object.setPrototypeOf(this, new.target.prototype);
              }
            }
            class k extends Error {
              constructor(t) {
                super(t), Object.setPrototypeOf(this, new.target.prototype);
              }
            }
            class R extends Error {
              constructor(t) {
                super(t), Object.setPrototypeOf(this, new.target.prototype);
              }
            }
            class P extends Error {
              constructor(t) {
                super(t), Object.setPrototypeOf(this, new.target.prototype);
              }
            }
            class N extends Error {
              constructor(t) {
                super(t), Object.setPrototypeOf(this, new.target.prototype);
              }
            }
            class A extends Error {
              constructor(t, s) {
                super(s), this.status = t, Object.setPrototypeOf(this, new.target.prototype);
              }
            }
            var F = function(o, t, s, c, d) {
              const x = U.createXHR();
              x.open("POST", s.endpoint, !0), x.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
              for (var O in s.headers)
                x.setRequestHeader(O, s.headers[O]);
              if (s.headersProvider != null) {
                let L = s.headersProvider();
                for (var O in L)
                  x.setRequestHeader(O, L[O]);
              }
              return x.onreadystatechange = function() {
                if (x.readyState === 4)
                  if (x.status === 200) {
                    let L, j = !1;
                    try {
                      L = JSON.parse(x.responseText), j = !0;
                    } catch {
                      d(new A(200, `JSON returned from ${c.toString()} endpoint was invalid, yet status code was 200. Data was: ${x.responseText}`), null);
                    }
                    j && d(null, L);
                  } else {
                    let L = "";
                    switch (c) {
                      case f.UserAuthentication:
                        L = v.buildLogSuffix("authenticationEndpoint");
                        break;
                      case f.ChannelAuthorization:
                        L = `Clients must be authorized to join private or presence channels. ${v.buildLogSuffix("authorizationEndpoint")}`;
                        break;
                    }
                    d(new A(x.status, `Unable to retrieve auth string from ${c.toString()} endpoint - received status: ${x.status} from ${s.endpoint}. ${L}`), null);
                  }
              }, x.send(t), x;
            };
            function fe(o) {
              return Se(qe(o));
            }
            var re = String.fromCharCode, $ = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", Fe = function(o) {
              var t = o.charCodeAt(0);
              return t < 128 ? o : t < 2048 ? re(192 | t >>> 6) + re(128 | t & 63) : re(224 | t >>> 12 & 15) + re(128 | t >>> 6 & 63) + re(128 | t & 63);
            }, qe = function(o) {
              return o.replace(/[^\x00-\x7F]/g, Fe);
            }, Be = function(o) {
              var t = [0, 2, 1][o.length % 3], s = o.charCodeAt(0) << 16 | (o.length > 1 ? o.charCodeAt(1) : 0) << 8 | (o.length > 2 ? o.charCodeAt(2) : 0), c = [
                $.charAt(s >>> 18),
                $.charAt(s >>> 12 & 63),
                t >= 2 ? "=" : $.charAt(s >>> 6 & 63),
                t >= 1 ? "=" : $.charAt(s & 63)
              ];
              return c.join("");
            }, Se = window.btoa || function(o) {
              return o.replace(/[\s\S]{1,3}/g, Be);
            };
            class Ee {
              constructor(t, s, c, d) {
                this.clear = s, this.timer = t(() => {
                  this.timer && (this.timer = d(this.timer));
                }, c);
              }
              isRunning() {
                return this.timer !== null;
              }
              ensureAborted() {
                this.timer && (this.clear(this.timer), this.timer = null);
              }
            }
            var pe = Ee;
            function Me(o) {
              window.clearTimeout(o);
            }
            function ke(o) {
              window.clearInterval(o);
            }
            class Z extends pe {
              constructor(t, s) {
                super(setTimeout, Me, t, function(c) {
                  return s(), null;
                });
              }
            }
            class $e extends pe {
              constructor(t, s) {
                super(setInterval, ke, t, function(c) {
                  return s(), c;
                });
              }
            }
            var ct = {
              now() {
                return Date.now ? Date.now() : (/* @__PURE__ */ new Date()).valueOf();
              },
              defer(o) {
                return new Z(0, o);
              },
              method(o, ...t) {
                var s = Array.prototype.slice.call(arguments, 1);
                return function(c) {
                  return c[o].apply(c, s.concat(arguments));
                };
              }
            }, X = ct;
            function Y(o, ...t) {
              for (var s = 0; s < t.length; s++) {
                var c = t[s];
                for (var d in c)
                  c[d] && c[d].constructor && c[d].constructor === Object ? o[d] = Y(o[d] || {}, c[d]) : o[d] = c[d];
              }
              return o;
            }
            function Rr() {
              for (var o = ["Pusher"], t = 0; t < arguments.length; t++)
                typeof arguments[t] == "string" ? o.push(arguments[t]) : o.push(He(arguments[t]));
              return o.join(" : ");
            }
            function Vt(o, t) {
              var s = Array.prototype.indexOf;
              if (o === null)
                return -1;
              if (s && o.indexOf === s)
                return o.indexOf(t);
              for (var c = 0, d = o.length; c < d; c++)
                if (o[c] === t)
                  return c;
              return -1;
            }
            function ce(o, t) {
              for (var s in o)
                Object.prototype.hasOwnProperty.call(o, s) && t(o[s], s, o);
            }
            function Xt(o) {
              var t = [];
              return ce(o, function(s, c) {
                t.push(c);
              }), t;
            }
            function Or(o) {
              var t = [];
              return ce(o, function(s) {
                t.push(s);
              }), t;
            }
            function Re(o, t, s) {
              for (var c = 0; c < o.length; c++)
                t.call(s || window, o[c], c, o);
            }
            function Wt(o, t) {
              for (var s = [], c = 0; c < o.length; c++)
                s.push(t(o[c], c, o, s));
              return s;
            }
            function Pr(o, t) {
              var s = {};
              return ce(o, function(c, d) {
                s[d] = t(c);
              }), s;
            }
            function Kt(o, t) {
              t = t || function(d) {
                return !!d;
              };
              for (var s = [], c = 0; c < o.length; c++)
                t(o[c], c, o, s) && s.push(o[c]);
              return s;
            }
            function Qt(o, t) {
              var s = {};
              return ce(o, function(c, d) {
                (t && t(c, d, o, s) || c) && (s[d] = c);
              }), s;
            }
            function Ar(o) {
              var t = [];
              return ce(o, function(s, c) {
                t.push([c, s]);
              }), t;
            }
            function Gt(o, t) {
              for (var s = 0; s < o.length; s++)
                if (t(o[s], s, o))
                  return !0;
              return !1;
            }
            function Lr(o, t) {
              for (var s = 0; s < o.length; s++)
                if (!t(o[s], s, o))
                  return !1;
              return !0;
            }
            function Nr(o) {
              return Pr(o, function(t) {
                return typeof t == "object" && (t = He(t)), encodeURIComponent(fe(t.toString()));
              });
            }
            function jr(o) {
              var t = Qt(o, function(c) {
                return c !== void 0;
              }), s = Wt(Ar(Nr(t)), X.method("join", "=")).join("&");
              return s;
            }
            function Ur(o) {
              var t = [], s = [];
              return function c(d, x) {
                var O, L, j;
                switch (typeof d) {
                  case "object":
                    if (!d)
                      return null;
                    for (O = 0; O < t.length; O += 1)
                      if (t[O] === d)
                        return { $ref: s[O] };
                    if (t.push(d), s.push(x), Object.prototype.toString.apply(d) === "[object Array]")
                      for (j = [], O = 0; O < d.length; O += 1)
                        j[O] = c(d[O], x + "[" + O + "]");
                    else {
                      j = {};
                      for (L in d)
                        Object.prototype.hasOwnProperty.call(d, L) && (j[L] = c(d[L], x + "[" + JSON.stringify(L) + "]"));
                    }
                    return j;
                  case "number":
                  case "string":
                  case "boolean":
                    return d;
                }
              }(o, "$");
            }
            function He(o) {
              try {
                return JSON.stringify(o);
              } catch {
                return JSON.stringify(Ur(o));
              }
            }
            class Dr {
              constructor() {
                this.globalLog = (t) => {
                  window.console && window.console.log && window.console.log(t);
                };
              }
              debug(...t) {
                this.log(this.globalLog, t);
              }
              warn(...t) {
                this.log(this.globalLogWarn, t);
              }
              error(...t) {
                this.log(this.globalLogError, t);
              }
              globalLogWarn(t) {
                window.console && window.console.warn ? window.console.warn(t) : this.globalLog(t);
              }
              globalLogError(t) {
                window.console && window.console.error ? window.console.error(t) : this.globalLogWarn(t);
              }
              log(t, ...s) {
                var c = Rr.apply(this, arguments);
                yt.log ? yt.log(c) : yt.logToConsole && t.bind(this)(c);
              }
            }
            var z = new Dr(), Ir = function(o, t, s, c, d) {
              (s.headers !== void 0 || s.headersProvider != null) && z.warn(`To send headers with the ${c.toString()} request, you must use AJAX, rather than JSONP.`);
              var x = o.nextAuthCallbackID.toString();
              o.nextAuthCallbackID++;
              var O = o.getDocument(), L = O.createElement("script");
              o.auth_callbacks[x] = function(B) {
                d(null, B);
              };
              var j = "Pusher.auth_callbacks['" + x + "']";
              L.src = s.endpoint + "?callback=" + encodeURIComponent(j) + "&" + t;
              var q = O.getElementsByTagName("head")[0] || O.documentElement;
              q.insertBefore(L, q.firstChild);
            }, Fr = Ir;
            class qr {
              constructor(t) {
                this.src = t;
              }
              send(t) {
                var s = this, c = "Error loading " + s.src;
                s.script = document.createElement("script"), s.script.id = t.id, s.script.src = s.src, s.script.type = "text/javascript", s.script.charset = "UTF-8", s.script.addEventListener ? (s.script.onerror = function() {
                  t.callback(c);
                }, s.script.onload = function() {
                  t.callback(null);
                }) : s.script.onreadystatechange = function() {
                  (s.script.readyState === "loaded" || s.script.readyState === "complete") && t.callback(null);
                }, s.script.async === void 0 && document.attachEvent && /opera/i.test(navigator.userAgent) ? (s.errorScript = document.createElement("script"), s.errorScript.id = t.id + "_error", s.errorScript.text = t.name + "('" + c + "');", s.script.async = s.errorScript.async = !1) : s.script.async = !0;
                var d = document.getElementsByTagName("head")[0];
                d.insertBefore(s.script, d.firstChild), s.errorScript && d.insertBefore(s.errorScript, s.script.nextSibling);
              }
              cleanup() {
                this.script && (this.script.onload = this.script.onerror = null, this.script.onreadystatechange = null), this.script && this.script.parentNode && this.script.parentNode.removeChild(this.script), this.errorScript && this.errorScript.parentNode && this.errorScript.parentNode.removeChild(this.errorScript), this.script = null, this.errorScript = null;
              }
            }
            class Br {
              constructor(t, s) {
                this.url = t, this.data = s;
              }
              send(t) {
                if (!this.request) {
                  var s = jr(this.data), c = this.url + "/" + t.number + "?" + s;
                  this.request = U.createScriptRequest(c), this.request.send(t);
                }
              }
              cleanup() {
                this.request && this.request.cleanup();
              }
            }
            var Mr = function(o, t) {
              return function(s, c) {
                var d = "http" + (t ? "s" : "") + "://", x = d + (o.host || o.options.host) + o.options.path, O = U.createJSONPRequest(x, s), L = U.ScriptReceivers.create(function(j, q) {
                  u.remove(L), O.cleanup(), q && q.host && (o.host = q.host), c && c(j, q);
                });
                O.send(L);
              };
            }, $r = {
              name: "jsonp",
              getAgent: Mr
            }, Hr = $r;
            function ut(o, t, s) {
              var c = o + (t.useTLS ? "s" : ""), d = t.useTLS ? t.hostTLS : t.hostNonTLS;
              return c + "://" + d + s;
            }
            function lt(o, t) {
              var s = "/app/" + o, c = "?protocol=" + C.PROTOCOL + "&client=js&version=" + C.VERSION + (t ? "&" + t : "");
              return s + c;
            }
            var zr = {
              getInitial: function(o, t) {
                var s = (t.httpPath || "") + lt(o, "flash=false");
                return ut("ws", t, s);
              }
            }, Jr = {
              getInitial: function(o, t) {
                var s = (t.httpPath || "/pusher") + lt(o);
                return ut("http", t, s);
              }
            }, Vr = {
              getInitial: function(o, t) {
                return ut("http", t, t.httpPath || "/pusher");
              },
              getPath: function(o, t) {
                return lt(o);
              }
            };
            class Xr {
              constructor() {
                this._callbacks = {};
              }
              get(t) {
                return this._callbacks[ht(t)];
              }
              add(t, s, c) {
                var d = ht(t);
                this._callbacks[d] = this._callbacks[d] || [], this._callbacks[d].push({
                  fn: s,
                  context: c
                });
              }
              remove(t, s, c) {
                if (!t && !s && !c) {
                  this._callbacks = {};
                  return;
                }
                var d = t ? [ht(t)] : Xt(this._callbacks);
                s || c ? this.removeCallback(d, s, c) : this.removeAllCallbacks(d);
              }
              removeCallback(t, s, c) {
                Re(t, function(d) {
                  this._callbacks[d] = Kt(this._callbacks[d] || [], function(x) {
                    return s && s !== x.fn || c && c !== x.context;
                  }), this._callbacks[d].length === 0 && delete this._callbacks[d];
                }, this);
              }
              removeAllCallbacks(t) {
                Re(t, function(s) {
                  delete this._callbacks[s];
                }, this);
              }
            }
            function ht(o) {
              return "_" + o;
            }
            class ue {
              constructor(t) {
                this.callbacks = new Xr(), this.global_callbacks = [], this.failThrough = t;
              }
              bind(t, s, c) {
                return this.callbacks.add(t, s, c), this;
              }
              bind_global(t) {
                return this.global_callbacks.push(t), this;
              }
              unbind(t, s, c) {
                return this.callbacks.remove(t, s, c), this;
              }
              unbind_global(t) {
                return t ? (this.global_callbacks = Kt(this.global_callbacks || [], (s) => s !== t), this) : (this.global_callbacks = [], this);
              }
              unbind_all() {
                return this.unbind(), this.unbind_global(), this;
              }
              emit(t, s, c) {
                for (var d = 0; d < this.global_callbacks.length; d++)
                  this.global_callbacks[d](t, s);
                var x = this.callbacks.get(t), O = [];
                if (c ? O.push(s, c) : s && O.push(s), x && x.length > 0)
                  for (var d = 0; d < x.length; d++)
                    x[d].fn.apply(x[d].context || window, O);
                else this.failThrough && this.failThrough(t, s);
                return this;
              }
            }
            class Wr extends ue {
              constructor(t, s, c, d, x) {
                super(), this.initialize = U.transportConnectionInitializer, this.hooks = t, this.name = s, this.priority = c, this.key = d, this.options = x, this.state = "new", this.timeline = x.timeline, this.activityTimeout = x.activityTimeout, this.id = this.timeline.generateUniqueID();
              }
              handlesActivityChecks() {
                return !!this.hooks.handlesActivityChecks;
              }
              supportsPing() {
                return !!this.hooks.supportsPing;
              }
              connect() {
                if (this.socket || this.state !== "initialized")
                  return !1;
                var t = this.hooks.urls.getInitial(this.key, this.options);
                try {
                  this.socket = this.hooks.getSocket(t, this.options);
                } catch (s) {
                  return X.defer(() => {
                    this.onError(s), this.changeState("closed");
                  }), !1;
                }
                return this.bindListeners(), z.debug("Connecting", { transport: this.name, url: t }), this.changeState("connecting"), !0;
              }
              close() {
                return this.socket ? (this.socket.close(), !0) : !1;
              }
              send(t) {
                return this.state === "open" ? (X.defer(() => {
                  this.socket && this.socket.send(t);
                }), !0) : !1;
              }
              ping() {
                this.state === "open" && this.supportsPing() && this.socket.ping();
              }
              onOpen() {
                this.hooks.beforeOpen && this.hooks.beforeOpen(this.socket, this.hooks.urls.getPath(this.key, this.options)), this.changeState("open"), this.socket.onopen = void 0;
              }
              onError(t) {
                this.emit("error", { type: "WebSocketError", error: t }), this.timeline.error(this.buildTimelineMessage({ error: t.toString() }));
              }
              onClose(t) {
                t ? this.changeState("closed", {
                  code: t.code,
                  reason: t.reason,
                  wasClean: t.wasClean
                }) : this.changeState("closed"), this.unbindListeners(), this.socket = void 0;
              }
              onMessage(t) {
                this.emit("message", t);
              }
              onActivity() {
                this.emit("activity");
              }
              bindListeners() {
                this.socket.onopen = () => {
                  this.onOpen();
                }, this.socket.onerror = (t) => {
                  this.onError(t);
                }, this.socket.onclose = (t) => {
                  this.onClose(t);
                }, this.socket.onmessage = (t) => {
                  this.onMessage(t);
                }, this.supportsPing() && (this.socket.onactivity = () => {
                  this.onActivity();
                });
              }
              unbindListeners() {
                this.socket && (this.socket.onopen = void 0, this.socket.onerror = void 0, this.socket.onclose = void 0, this.socket.onmessage = void 0, this.supportsPing() && (this.socket.onactivity = void 0));
              }
              changeState(t, s) {
                this.state = t, this.timeline.info(this.buildTimelineMessage({
                  state: t,
                  params: s
                })), this.emit(t, s);
              }
              buildTimelineMessage(t) {
                return Y({ cid: this.id }, t);
              }
            }
            class Ce {
              constructor(t) {
                this.hooks = t;
              }
              isSupported(t) {
                return this.hooks.isSupported(t);
              }
              createConnection(t, s, c, d) {
                return new Wr(this.hooks, t, s, c, d);
              }
            }
            var Kr = new Ce({
              urls: zr,
              handlesActivityChecks: !1,
              supportsPing: !1,
              isInitialized: function() {
                return !!U.getWebSocketAPI();
              },
              isSupported: function() {
                return !!U.getWebSocketAPI();
              },
              getSocket: function(o) {
                return U.createWebSocket(o);
              }
            }), Zt = {
              urls: Jr,
              handlesActivityChecks: !1,
              supportsPing: !0,
              isInitialized: function() {
                return !0;
              }
            }, Yt = Y({
              getSocket: function(o) {
                return U.HTTPFactory.createStreamingSocket(o);
              }
            }, Zt), en = Y({
              getSocket: function(o) {
                return U.HTTPFactory.createPollingSocket(o);
              }
            }, Zt), tn = {
              isSupported: function() {
                return U.isXHRSupported();
              }
            }, Qr = new Ce(Y({}, Yt, tn)), Gr = new Ce(Y({}, en, tn)), Zr = {
              ws: Kr,
              xhr_streaming: Qr,
              xhr_polling: Gr
            }, ze = Zr, Yr = new Ce({
              file: "sockjs",
              urls: Vr,
              handlesActivityChecks: !0,
              supportsPing: !1,
              isSupported: function() {
                return !0;
              },
              isInitialized: function() {
                return window.SockJS !== void 0;
              },
              getSocket: function(o, t) {
                return new window.SockJS(o, null, {
                  js_path: _.getPath("sockjs", {
                    useTLS: t.useTLS
                  }),
                  ignore_null_origin: t.ignoreNullOrigin
                });
              },
              beforeOpen: function(o, t) {
                o.send(JSON.stringify({
                  path: t
                }));
              }
            }), nn = {
              isSupported: function(o) {
                var t = U.isXDRSupported(o.useTLS);
                return t;
              }
            }, es = new Ce(Y({}, Yt, nn)), ts = new Ce(Y({}, en, nn));
            ze.xdr_streaming = es, ze.xdr_polling = ts, ze.sockjs = Yr;
            var ns = ze;
            class rs extends ue {
              constructor() {
                super();
                var t = this;
                window.addEventListener !== void 0 && (window.addEventListener("online", function() {
                  t.emit("online");
                }, !1), window.addEventListener("offline", function() {
                  t.emit("offline");
                }, !1));
              }
              isOnline() {
                return window.navigator.onLine === void 0 ? !0 : window.navigator.onLine;
              }
            }
            var ss = new rs();
            class is {
              constructor(t, s, c) {
                this.manager = t, this.transport = s, this.minPingDelay = c.minPingDelay, this.maxPingDelay = c.maxPingDelay, this.pingDelay = void 0;
              }
              createConnection(t, s, c, d) {
                d = Y({}, d, {
                  activityTimeout: this.pingDelay
                });
                var x = this.transport.createConnection(t, s, c, d), O = null, L = function() {
                  x.unbind("open", L), x.bind("closed", j), O = X.now();
                }, j = (q) => {
                  if (x.unbind("closed", j), q.code === 1002 || q.code === 1003)
                    this.manager.reportDeath();
                  else if (!q.wasClean && O) {
                    var B = X.now() - O;
                    B < 2 * this.maxPingDelay && (this.manager.reportDeath(), this.pingDelay = Math.max(B / 2, this.minPingDelay));
                  }
                };
                return x.bind("open", L), x;
              }
              isSupported(t) {
                return this.manager.isAlive() && this.transport.isSupported(t);
              }
            }
            const rn = {
              decodeMessage: function(o) {
                try {
                  var t = JSON.parse(o.data), s = t.data;
                  if (typeof s == "string")
                    try {
                      s = JSON.parse(t.data);
                    } catch {
                    }
                  var c = {
                    event: t.event,
                    channel: t.channel,
                    data: s
                  };
                  return t.user_id && (c.user_id = t.user_id), c;
                } catch (d) {
                  throw { type: "MessageParseError", error: d, data: o.data };
                }
              },
              encodeMessage: function(o) {
                return JSON.stringify(o);
              },
              processHandshake: function(o) {
                var t = rn.decodeMessage(o);
                if (t.event === "pusher:connection_established") {
                  if (!t.data.activity_timeout)
                    throw "No activity timeout specified in handshake";
                  return {
                    action: "connected",
                    id: t.data.socket_id,
                    activityTimeout: t.data.activity_timeout * 1e3
                  };
                } else {
                  if (t.event === "pusher:error")
                    return {
                      action: this.getCloseAction(t.data),
                      error: this.getCloseError(t.data)
                    };
                  throw "Invalid handshake";
                }
              },
              getCloseAction: function(o) {
                return o.code < 4e3 ? o.code >= 1002 && o.code <= 1004 ? "backoff" : null : o.code === 4e3 ? "tls_only" : o.code < 4100 ? "refused" : o.code < 4200 ? "backoff" : o.code < 4300 ? "retry" : "refused";
              },
              getCloseError: function(o) {
                return o.code !== 1e3 && o.code !== 1001 ? {
                  type: "PusherError",
                  data: {
                    code: o.code,
                    message: o.reason || o.message
                  }
                } : null;
              }
            };
            var ge = rn;
            class os extends ue {
              constructor(t, s) {
                super(), this.id = t, this.transport = s, this.activityTimeout = s.activityTimeout, this.bindListeners();
              }
              handlesActivityChecks() {
                return this.transport.handlesActivityChecks();
              }
              send(t) {
                return this.transport.send(t);
              }
              send_event(t, s, c) {
                var d = { event: t, data: s };
                return c && (d.channel = c), z.debug("Event sent", d), this.send(ge.encodeMessage(d));
              }
              ping() {
                this.transport.supportsPing() ? this.transport.ping() : this.send_event("pusher:ping", {});
              }
              close() {
                this.transport.close();
              }
              bindListeners() {
                var t = {
                  message: (c) => {
                    var d;
                    try {
                      d = ge.decodeMessage(c);
                    } catch (x) {
                      this.emit("error", {
                        type: "MessageParseError",
                        error: x,
                        data: c.data
                      });
                    }
                    if (d !== void 0) {
                      switch (z.debug("Event recd", d), d.event) {
                        case "pusher:error":
                          this.emit("error", {
                            type: "PusherError",
                            data: d.data
                          });
                          break;
                        case "pusher:ping":
                          this.emit("ping");
                          break;
                        case "pusher:pong":
                          this.emit("pong");
                          break;
                      }
                      this.emit("message", d);
                    }
                  },
                  activity: () => {
                    this.emit("activity");
                  },
                  error: (c) => {
                    this.emit("error", c);
                  },
                  closed: (c) => {
                    s(), c && c.code && this.handleCloseEvent(c), this.transport = null, this.emit("closed");
                  }
                }, s = () => {
                  ce(t, (c, d) => {
                    this.transport.unbind(d, c);
                  });
                };
                ce(t, (c, d) => {
                  this.transport.bind(d, c);
                });
              }
              handleCloseEvent(t) {
                var s = ge.getCloseAction(t), c = ge.getCloseError(t);
                c && this.emit("error", c), s && this.emit(s, { action: s, error: c });
              }
            }
            class as {
              constructor(t, s) {
                this.transport = t, this.callback = s, this.bindListeners();
              }
              close() {
                this.unbindListeners(), this.transport.close();
              }
              bindListeners() {
                this.onMessage = (t) => {
                  this.unbindListeners();
                  var s;
                  try {
                    s = ge.processHandshake(t);
                  } catch (c) {
                    this.finish("error", { error: c }), this.transport.close();
                    return;
                  }
                  s.action === "connected" ? this.finish("connected", {
                    connection: new os(s.id, this.transport),
                    activityTimeout: s.activityTimeout
                  }) : (this.finish(s.action, { error: s.error }), this.transport.close());
                }, this.onClosed = (t) => {
                  this.unbindListeners();
                  var s = ge.getCloseAction(t) || "backoff", c = ge.getCloseError(t);
                  this.finish(s, { error: c });
                }, this.transport.bind("message", this.onMessage), this.transport.bind("closed", this.onClosed);
              }
              unbindListeners() {
                this.transport.unbind("message", this.onMessage), this.transport.unbind("closed", this.onClosed);
              }
              finish(t, s) {
                this.callback(Y({ transport: this.transport, action: t }, s));
              }
            }
            class cs {
              constructor(t, s) {
                this.timeline = t, this.options = s || {};
              }
              send(t, s) {
                this.timeline.isEmpty() || this.timeline.send(U.TimelineTransport.getAgent(this, t), s);
              }
            }
            class dt extends ue {
              constructor(t, s) {
                super(function(c, d) {
                  z.debug("No callbacks on " + t + " for " + c);
                }), this.name = t, this.pusher = s, this.subscribed = !1, this.subscriptionPending = !1, this.subscriptionCancelled = !1;
              }
              authorize(t, s) {
                return s(null, { auth: "" });
              }
              trigger(t, s) {
                if (t.indexOf("client-") !== 0)
                  throw new h("Event '" + t + "' does not start with 'client-'");
                if (!this.subscribed) {
                  var c = v.buildLogSuffix("triggeringClientEvents");
                  z.warn(`Client event triggered before channel 'subscription_succeeded' event . ${c}`);
                }
                return this.pusher.send_event(t, s, this.name);
              }
              disconnect() {
                this.subscribed = !1, this.subscriptionPending = !1;
              }
              handleEvent(t) {
                var s = t.event, c = t.data;
                if (s === "pusher_internal:subscription_succeeded")
                  this.handleSubscriptionSucceededEvent(t);
                else if (s === "pusher_internal:subscription_count")
                  this.handleSubscriptionCountEvent(t);
                else if (s.indexOf("pusher_internal:") !== 0) {
                  var d = {};
                  this.emit(s, c, d);
                }
              }
              handleSubscriptionSucceededEvent(t) {
                this.subscriptionPending = !1, this.subscribed = !0, this.subscriptionCancelled ? this.pusher.unsubscribe(this.name) : this.emit("pusher:subscription_succeeded", t.data);
              }
              handleSubscriptionCountEvent(t) {
                t.data.subscription_count && (this.subscriptionCount = t.data.subscription_count), this.emit("pusher:subscription_count", t.data);
              }
              subscribe() {
                this.subscribed || (this.subscriptionPending = !0, this.subscriptionCancelled = !1, this.authorize(this.pusher.connection.socket_id, (t, s) => {
                  t ? (this.subscriptionPending = !1, z.error(t.toString()), this.emit("pusher:subscription_error", Object.assign({}, {
                    type: "AuthError",
                    error: t.message
                  }, t instanceof A ? { status: t.status } : {}))) : this.pusher.send_event("pusher:subscribe", {
                    auth: s.auth,
                    channel_data: s.channel_data,
                    channel: this.name
                  });
                }));
              }
              unsubscribe() {
                this.subscribed = !1, this.pusher.send_event("pusher:unsubscribe", {
                  channel: this.name
                });
              }
              cancelSubscription() {
                this.subscriptionCancelled = !0;
              }
              reinstateSubscription() {
                this.subscriptionCancelled = !1;
              }
            }
            class ft extends dt {
              authorize(t, s) {
                return this.pusher.config.channelAuthorizer({
                  channelName: this.name,
                  socketId: t
                }, s);
              }
            }
            class us {
              constructor() {
                this.reset();
              }
              get(t) {
                return Object.prototype.hasOwnProperty.call(this.members, t) ? {
                  id: t,
                  info: this.members[t]
                } : null;
              }
              each(t) {
                ce(this.members, (s, c) => {
                  t(this.get(c));
                });
              }
              setMyID(t) {
                this.myID = t;
              }
              onSubscription(t) {
                this.members = t.presence.hash, this.count = t.presence.count, this.me = this.get(this.myID);
              }
              addMember(t) {
                return this.get(t.user_id) === null && this.count++, this.members[t.user_id] = t.user_info, this.get(t.user_id);
              }
              removeMember(t) {
                var s = this.get(t.user_id);
                return s && (delete this.members[t.user_id], this.count--), s;
              }
              reset() {
                this.members = {}, this.count = 0, this.myID = null, this.me = null;
              }
            }
            var ls = function(o, t, s, c) {
              function d(x) {
                return x instanceof s ? x : new s(function(O) {
                  O(x);
                });
              }
              return new (s || (s = Promise))(function(x, O) {
                function L(B) {
                  try {
                    q(c.next(B));
                  } catch (W) {
                    O(W);
                  }
                }
                function j(B) {
                  try {
                    q(c.throw(B));
                  } catch (W) {
                    O(W);
                  }
                }
                function q(B) {
                  B.done ? x(B.value) : d(B.value).then(L, j);
                }
                q((c = c.apply(o, t || [])).next());
              });
            };
            class hs extends ft {
              constructor(t, s) {
                super(t, s), this.members = new us();
              }
              authorize(t, s) {
                super.authorize(t, (c, d) => ls(this, void 0, void 0, function* () {
                  if (!c)
                    if (d = d, d.channel_data != null) {
                      var x = JSON.parse(d.channel_data);
                      this.members.setMyID(x.user_id);
                    } else if (yield this.pusher.user.signinDonePromise, this.pusher.user.user_data != null)
                      this.members.setMyID(this.pusher.user.user_data.id);
                    else {
                      let O = v.buildLogSuffix("authorizationEndpoint");
                      z.error(`Invalid auth response for channel '${this.name}', expected 'channel_data' field. ${O}, or the user should be signed in.`), s("Invalid auth response");
                      return;
                    }
                  s(c, d);
                }));
              }
              handleEvent(t) {
                var s = t.event;
                if (s.indexOf("pusher_internal:") === 0)
                  this.handleInternalEvent(t);
                else {
                  var c = t.data, d = {};
                  t.user_id && (d.user_id = t.user_id), this.emit(s, c, d);
                }
              }
              handleInternalEvent(t) {
                var s = t.event, c = t.data;
                switch (s) {
                  case "pusher_internal:subscription_succeeded":
                    this.handleSubscriptionSucceededEvent(t);
                    break;
                  case "pusher_internal:subscription_count":
                    this.handleSubscriptionCountEvent(t);
                    break;
                  case "pusher_internal:member_added":
                    var d = this.members.addMember(c);
                    this.emit("pusher:member_added", d);
                    break;
                  case "pusher_internal:member_removed":
                    var x = this.members.removeMember(c);
                    x && this.emit("pusher:member_removed", x);
                    break;
                }
              }
              handleSubscriptionSucceededEvent(t) {
                this.subscriptionPending = !1, this.subscribed = !0, this.subscriptionCancelled ? this.pusher.unsubscribe(this.name) : (this.members.onSubscription(t.data), this.emit("pusher:subscription_succeeded", this.members));
              }
              disconnect() {
                this.members.reset(), super.disconnect();
              }
            }
            var ds = a(1), pt = a(0);
            class fs extends ft {
              constructor(t, s, c) {
                super(t, s), this.key = null, this.nacl = c;
              }
              authorize(t, s) {
                super.authorize(t, (c, d) => {
                  if (c) {
                    s(c, d);
                    return;
                  }
                  let x = d.shared_secret;
                  if (!x) {
                    s(new Error(`No shared_secret key in auth payload for encrypted channel: ${this.name}`), null);
                    return;
                  }
                  this.key = Object(pt.decode)(x), delete d.shared_secret, s(null, d);
                });
              }
              trigger(t, s) {
                throw new R("Client events are not currently supported for encrypted channels");
              }
              handleEvent(t) {
                var s = t.event, c = t.data;
                if (s.indexOf("pusher_internal:") === 0 || s.indexOf("pusher:") === 0) {
                  super.handleEvent(t);
                  return;
                }
                this.handleEncryptedEvent(s, c);
              }
              handleEncryptedEvent(t, s) {
                if (!this.key) {
                  z.debug("Received encrypted event before key has been retrieved from the authEndpoint");
                  return;
                }
                if (!s.ciphertext || !s.nonce) {
                  z.error("Unexpected format for encrypted event, expected object with `ciphertext` and `nonce` fields, got: " + s);
                  return;
                }
                let c = Object(pt.decode)(s.ciphertext);
                if (c.length < this.nacl.secretbox.overheadLength) {
                  z.error(`Expected encrypted event ciphertext length to be ${this.nacl.secretbox.overheadLength}, got: ${c.length}`);
                  return;
                }
                let d = Object(pt.decode)(s.nonce);
                if (d.length < this.nacl.secretbox.nonceLength) {
                  z.error(`Expected encrypted event nonce length to be ${this.nacl.secretbox.nonceLength}, got: ${d.length}`);
                  return;
                }
                let x = this.nacl.secretbox.open(c, d, this.key);
                if (x === null) {
                  z.debug("Failed to decrypt an event, probably because it was encrypted with a different key. Fetching a new key from the authEndpoint..."), this.authorize(this.pusher.connection.socket_id, (O, L) => {
                    if (O) {
                      z.error(`Failed to make a request to the authEndpoint: ${L}. Unable to fetch new key, so dropping encrypted event`);
                      return;
                    }
                    if (x = this.nacl.secretbox.open(c, d, this.key), x === null) {
                      z.error("Failed to decrypt event with new key. Dropping encrypted event");
                      return;
                    }
                    this.emit(t, this.getDataToEmit(x));
                  });
                  return;
                }
                this.emit(t, this.getDataToEmit(x));
              }
              getDataToEmit(t) {
                let s = Object(ds.decode)(t);
                try {
                  return JSON.parse(s);
                } catch {
                  return s;
                }
              }
            }
            class ps extends ue {
              constructor(t, s) {
                super(), this.state = "initialized", this.connection = null, this.key = t, this.options = s, this.timeline = this.options.timeline, this.usingTLS = this.options.useTLS, this.errorCallbacks = this.buildErrorCallbacks(), this.connectionCallbacks = this.buildConnectionCallbacks(this.errorCallbacks), this.handshakeCallbacks = this.buildHandshakeCallbacks(this.errorCallbacks);
                var c = U.getNetwork();
                c.bind("online", () => {
                  this.timeline.info({ netinfo: "online" }), (this.state === "connecting" || this.state === "unavailable") && this.retryIn(0);
                }), c.bind("offline", () => {
                  this.timeline.info({ netinfo: "offline" }), this.connection && this.sendActivityCheck();
                }), this.updateStrategy();
              }
              connect() {
                if (!(this.connection || this.runner)) {
                  if (!this.strategy.isSupported()) {
                    this.updateState("failed");
                    return;
                  }
                  this.updateState("connecting"), this.startConnecting(), this.setUnavailableTimer();
                }
              }
              send(t) {
                return this.connection ? this.connection.send(t) : !1;
              }
              send_event(t, s, c) {
                return this.connection ? this.connection.send_event(t, s, c) : !1;
              }
              disconnect() {
                this.disconnectInternally(), this.updateState("disconnected");
              }
              isUsingTLS() {
                return this.usingTLS;
              }
              startConnecting() {
                var t = (s, c) => {
                  s ? this.runner = this.strategy.connect(0, t) : c.action === "error" ? (this.emit("error", {
                    type: "HandshakeError",
                    error: c.error
                  }), this.timeline.error({ handshakeError: c.error })) : (this.abortConnecting(), this.handshakeCallbacks[c.action](c));
                };
                this.runner = this.strategy.connect(0, t);
              }
              abortConnecting() {
                this.runner && (this.runner.abort(), this.runner = null);
              }
              disconnectInternally() {
                if (this.abortConnecting(), this.clearRetryTimer(), this.clearUnavailableTimer(), this.connection) {
                  var t = this.abandonConnection();
                  t.close();
                }
              }
              updateStrategy() {
                this.strategy = this.options.getStrategy({
                  key: this.key,
                  timeline: this.timeline,
                  useTLS: this.usingTLS
                });
              }
              retryIn(t) {
                this.timeline.info({ action: "retry", delay: t }), t > 0 && this.emit("connecting_in", Math.round(t / 1e3)), this.retryTimer = new Z(t || 0, () => {
                  this.disconnectInternally(), this.connect();
                });
              }
              clearRetryTimer() {
                this.retryTimer && (this.retryTimer.ensureAborted(), this.retryTimer = null);
              }
              setUnavailableTimer() {
                this.unavailableTimer = new Z(this.options.unavailableTimeout, () => {
                  this.updateState("unavailable");
                });
              }
              clearUnavailableTimer() {
                this.unavailableTimer && this.unavailableTimer.ensureAborted();
              }
              sendActivityCheck() {
                this.stopActivityCheck(), this.connection.ping(), this.activityTimer = new Z(this.options.pongTimeout, () => {
                  this.timeline.error({ pong_timed_out: this.options.pongTimeout }), this.retryIn(0);
                });
              }
              resetActivityCheck() {
                this.stopActivityCheck(), this.connection && !this.connection.handlesActivityChecks() && (this.activityTimer = new Z(this.activityTimeout, () => {
                  this.sendActivityCheck();
                }));
              }
              stopActivityCheck() {
                this.activityTimer && this.activityTimer.ensureAborted();
              }
              buildConnectionCallbacks(t) {
                return Y({}, t, {
                  message: (s) => {
                    this.resetActivityCheck(), this.emit("message", s);
                  },
                  ping: () => {
                    this.send_event("pusher:pong", {});
                  },
                  activity: () => {
                    this.resetActivityCheck();
                  },
                  error: (s) => {
                    this.emit("error", s);
                  },
                  closed: () => {
                    this.abandonConnection(), this.shouldRetry() && this.retryIn(1e3);
                  }
                });
              }
              buildHandshakeCallbacks(t) {
                return Y({}, t, {
                  connected: (s) => {
                    this.activityTimeout = Math.min(this.options.activityTimeout, s.activityTimeout, s.connection.activityTimeout || 1 / 0), this.clearUnavailableTimer(), this.setConnection(s.connection), this.socket_id = this.connection.id, this.updateState("connected", { socket_id: this.socket_id });
                  }
                });
              }
              buildErrorCallbacks() {
                let t = (s) => (c) => {
                  c.error && this.emit("error", { type: "WebSocketError", error: c.error }), s(c);
                };
                return {
                  tls_only: t(() => {
                    this.usingTLS = !0, this.updateStrategy(), this.retryIn(0);
                  }),
                  refused: t(() => {
                    this.disconnect();
                  }),
                  backoff: t(() => {
                    this.retryIn(1e3);
                  }),
                  retry: t(() => {
                    this.retryIn(0);
                  })
                };
              }
              setConnection(t) {
                this.connection = t;
                for (var s in this.connectionCallbacks)
                  this.connection.bind(s, this.connectionCallbacks[s]);
                this.resetActivityCheck();
              }
              abandonConnection() {
                if (this.connection) {
                  this.stopActivityCheck();
                  for (var t in this.connectionCallbacks)
                    this.connection.unbind(t, this.connectionCallbacks[t]);
                  var s = this.connection;
                  return this.connection = null, s;
                }
              }
              updateState(t, s) {
                var c = this.state;
                if (this.state = t, c !== t) {
                  var d = t;
                  d === "connected" && (d += " with new socket ID " + s.socket_id), z.debug("State changed", c + " -> " + d), this.timeline.info({ state: t, params: s }), this.emit("state_change", { previous: c, current: t }), this.emit(t, s);
                }
              }
              shouldRetry() {
                return this.state === "connecting" || this.state === "connected";
              }
            }
            class ms {
              constructor() {
                this.channels = {};
              }
              add(t, s) {
                return this.channels[t] || (this.channels[t] = gs(t, s)), this.channels[t];
              }
              all() {
                return Or(this.channels);
              }
              find(t) {
                return this.channels[t];
              }
              remove(t) {
                var s = this.channels[t];
                return delete this.channels[t], s;
              }
              disconnect() {
                ce(this.channels, function(t) {
                  t.disconnect();
                });
              }
            }
            function gs(o, t) {
              if (o.indexOf("private-encrypted-") === 0) {
                if (t.config.nacl)
                  return le.createEncryptedChannel(o, t, t.config.nacl);
                let s = "Tried to subscribe to a private-encrypted- channel but no nacl implementation available", c = v.buildLogSuffix("encryptedChannelSupport");
                throw new R(`${s}. ${c}`);
              } else {
                if (o.indexOf("private-") === 0)
                  return le.createPrivateChannel(o, t);
                if (o.indexOf("presence-") === 0)
                  return le.createPresenceChannel(o, t);
                if (o.indexOf("#") === 0)
                  throw new m('Cannot create a channel with name "' + o + '".');
                return le.createChannel(o, t);
              }
            }
            var vs = {
              createChannels() {
                return new ms();
              },
              createConnectionManager(o, t) {
                return new ps(o, t);
              },
              createChannel(o, t) {
                return new dt(o, t);
              },
              createPrivateChannel(o, t) {
                return new ft(o, t);
              },
              createPresenceChannel(o, t) {
                return new hs(o, t);
              },
              createEncryptedChannel(o, t, s) {
                return new fs(o, t, s);
              },
              createTimelineSender(o, t) {
                return new cs(o, t);
              },
              createHandshake(o, t) {
                return new as(o, t);
              },
              createAssistantToTheTransportManager(o, t, s) {
                return new is(o, t, s);
              }
            }, le = vs;
            class sn {
              constructor(t) {
                this.options = t || {}, this.livesLeft = this.options.lives || 1 / 0;
              }
              getAssistant(t) {
                return le.createAssistantToTheTransportManager(this, t, {
                  minPingDelay: this.options.minPingDelay,
                  maxPingDelay: this.options.maxPingDelay
                });
              }
              isAlive() {
                return this.livesLeft > 0;
              }
              reportDeath() {
                this.livesLeft -= 1;
              }
            }
            class ve {
              constructor(t, s) {
                this.strategies = t, this.loop = !!s.loop, this.failFast = !!s.failFast, this.timeout = s.timeout, this.timeoutLimit = s.timeoutLimit;
              }
              isSupported() {
                return Gt(this.strategies, X.method("isSupported"));
              }
              connect(t, s) {
                var c = this.strategies, d = 0, x = this.timeout, O = null, L = (j, q) => {
                  q ? s(null, q) : (d = d + 1, this.loop && (d = d % c.length), d < c.length ? (x && (x = x * 2, this.timeoutLimit && (x = Math.min(x, this.timeoutLimit))), O = this.tryStrategy(c[d], t, { timeout: x, failFast: this.failFast }, L)) : s(!0));
                };
                return O = this.tryStrategy(c[d], t, { timeout: x, failFast: this.failFast }, L), {
                  abort: function() {
                    O.abort();
                  },
                  forceMinPriority: function(j) {
                    t = j, O && O.forceMinPriority(j);
                  }
                };
              }
              tryStrategy(t, s, c, d) {
                var x = null, O = null;
                return c.timeout > 0 && (x = new Z(c.timeout, function() {
                  O.abort(), d(!0);
                })), O = t.connect(s, function(L, j) {
                  L && x && x.isRunning() && !c.failFast || (x && x.ensureAborted(), d(L, j));
                }), {
                  abort: function() {
                    x && x.ensureAborted(), O.abort();
                  },
                  forceMinPriority: function(L) {
                    O.forceMinPriority(L);
                  }
                };
              }
            }
            class mt {
              constructor(t) {
                this.strategies = t;
              }
              isSupported() {
                return Gt(this.strategies, X.method("isSupported"));
              }
              connect(t, s) {
                return bs(this.strategies, t, function(c, d) {
                  return function(x, O) {
                    if (d[c].error = x, x) {
                      ys(d) && s(!0);
                      return;
                    }
                    Re(d, function(L) {
                      L.forceMinPriority(O.transport.priority);
                    }), s(null, O);
                  };
                });
              }
            }
            function bs(o, t, s) {
              var c = Wt(o, function(d, x, O, L) {
                return d.connect(t, s(x, L));
              });
              return {
                abort: function() {
                  Re(c, ws);
                },
                forceMinPriority: function(d) {
                  Re(c, function(x) {
                    x.forceMinPriority(d);
                  });
                }
              };
            }
            function ys(o) {
              return Lr(o, function(t) {
                return !!t.error;
              });
            }
            function ws(o) {
              !o.error && !o.aborted && (o.abort(), o.aborted = !0);
            }
            class _s {
              constructor(t, s, c) {
                this.strategy = t, this.transports = s, this.ttl = c.ttl || 1800 * 1e3, this.usingTLS = c.useTLS, this.timeline = c.timeline;
              }
              isSupported() {
                return this.strategy.isSupported();
              }
              connect(t, s) {
                var c = this.usingTLS, d = Ss(c), x = d && d.cacheSkipCount ? d.cacheSkipCount : 0, O = [this.strategy];
                if (d && d.timestamp + this.ttl >= X.now()) {
                  var L = this.transports[d.transport];
                  L && (["ws", "wss"].includes(d.transport) || x > 3 ? (this.timeline.info({
                    cached: !0,
                    transport: d.transport,
                    latency: d.latency
                  }), O.push(new ve([L], {
                    timeout: d.latency * 2 + 1e3,
                    failFast: !0
                  }))) : x++);
                }
                var j = X.now(), q = O.pop().connect(t, function B(W, Xe) {
                  W ? (on(c), O.length > 0 ? (j = X.now(), q = O.pop().connect(t, B)) : s(W)) : (Cs(c, Xe.transport.name, X.now() - j, x), s(null, Xe));
                });
                return {
                  abort: function() {
                    q.abort();
                  },
                  forceMinPriority: function(B) {
                    t = B, q && q.forceMinPriority(B);
                  }
                };
              }
            }
            function gt(o) {
              return "pusherTransport" + (o ? "TLS" : "NonTLS");
            }
            function Ss(o) {
              var t = U.getLocalStorage();
              if (t)
                try {
                  var s = t[gt(o)];
                  if (s)
                    return JSON.parse(s);
                } catch {
                  on(o);
                }
              return null;
            }
            function Cs(o, t, s, c) {
              var d = U.getLocalStorage();
              if (d)
                try {
                  d[gt(o)] = He({
                    timestamp: X.now(),
                    transport: t,
                    latency: s,
                    cacheSkipCount: c
                  });
                } catch {
                }
            }
            function on(o) {
              var t = U.getLocalStorage();
              if (t)
                try {
                  delete t[gt(o)];
                } catch {
                }
            }
            class Je {
              constructor(t, { delay: s }) {
                this.strategy = t, this.options = { delay: s };
              }
              isSupported() {
                return this.strategy.isSupported();
              }
              connect(t, s) {
                var c = this.strategy, d, x = new Z(this.options.delay, function() {
                  d = c.connect(t, s);
                });
                return {
                  abort: function() {
                    x.ensureAborted(), d && d.abort();
                  },
                  forceMinPriority: function(O) {
                    t = O, d && d.forceMinPriority(O);
                  }
                };
              }
            }
            class Oe {
              constructor(t, s, c) {
                this.test = t, this.trueBranch = s, this.falseBranch = c;
              }
              isSupported() {
                var t = this.test() ? this.trueBranch : this.falseBranch;
                return t.isSupported();
              }
              connect(t, s) {
                var c = this.test() ? this.trueBranch : this.falseBranch;
                return c.connect(t, s);
              }
            }
            class xs {
              constructor(t) {
                this.strategy = t;
              }
              isSupported() {
                return this.strategy.isSupported();
              }
              connect(t, s) {
                var c = this.strategy.connect(t, function(d, x) {
                  x && c.abort(), s(d, x);
                });
                return c;
              }
            }
            function Pe(o) {
              return function() {
                return o.isSupported();
              };
            }
            var Ts = function(o, t, s) {
              var c = {};
              function d(vn, xi, Ti, Ei, ki) {
                var bn = s(o, vn, xi, Ti, Ei, ki);
                return c[vn] = bn, bn;
              }
              var x = Object.assign({}, t, {
                hostNonTLS: o.wsHost + ":" + o.wsPort,
                hostTLS: o.wsHost + ":" + o.wssPort,
                httpPath: o.wsPath
              }), O = Object.assign({}, x, {
                useTLS: !0
              }), L = Object.assign({}, t, {
                hostNonTLS: o.httpHost + ":" + o.httpPort,
                hostTLS: o.httpHost + ":" + o.httpsPort,
                httpPath: o.httpPath
              }), j = {
                loop: !0,
                timeout: 15e3,
                timeoutLimit: 6e4
              }, q = new sn({
                minPingDelay: 1e4,
                maxPingDelay: o.activityTimeout
              }), B = new sn({
                lives: 2,
                minPingDelay: 1e4,
                maxPingDelay: o.activityTimeout
              }), W = d("ws", "ws", 3, x, q), Xe = d("wss", "ws", 3, O, q), yi = d("sockjs", "sockjs", 1, L), hn = d("xhr_streaming", "xhr_streaming", 1, L, B), wi = d("xdr_streaming", "xdr_streaming", 1, L, B), dn = d("xhr_polling", "xhr_polling", 1, L), _i = d("xdr_polling", "xdr_polling", 1, L), fn = new ve([W], j), Si = new ve([Xe], j), Ci = new ve([yi], j), pn = new ve([
                new Oe(Pe(hn), hn, wi)
              ], j), mn = new ve([
                new Oe(Pe(dn), dn, _i)
              ], j), gn = new ve([
                new Oe(Pe(pn), new mt([
                  pn,
                  new Je(mn, { delay: 4e3 })
                ]), mn)
              ], j), wt = new Oe(Pe(gn), gn, Ci), _t;
              return t.useTLS ? _t = new mt([
                fn,
                new Je(wt, { delay: 2e3 })
              ]) : _t = new mt([
                fn,
                new Je(Si, { delay: 2e3 }),
                new Je(wt, { delay: 5e3 })
              ]), new _s(new xs(new Oe(Pe(W), _t, wt)), c, {
                ttl: 18e5,
                timeline: t.timeline,
                useTLS: t.useTLS
              });
            }, Es = Ts, ks = function() {
              var o = this;
              o.timeline.info(o.buildTimelineMessage({
                transport: o.name + (o.options.useTLS ? "s" : "")
              })), o.hooks.isInitialized() ? o.changeState("initialized") : o.hooks.file ? (o.changeState("initializing"), _.load(o.hooks.file, { useTLS: o.options.useTLS }, function(t, s) {
                o.hooks.isInitialized() ? (o.changeState("initialized"), s(!0)) : (t && o.onError(t), o.onClose(), s(!1));
              })) : o.onClose();
            }, Rs = {
              getRequest: function(o) {
                var t = new window.XDomainRequest();
                return t.ontimeout = function() {
                  o.emit("error", new b()), o.close();
                }, t.onerror = function(s) {
                  o.emit("error", s), o.close();
                }, t.onprogress = function() {
                  t.responseText && t.responseText.length > 0 && o.onChunk(200, t.responseText);
                }, t.onload = function() {
                  t.responseText && t.responseText.length > 0 && o.onChunk(200, t.responseText), o.emit("finished", 200), o.close();
                }, t;
              },
              abortRequest: function(o) {
                o.ontimeout = o.onerror = o.onprogress = o.onload = null, o.abort();
              }
            }, Os = Rs;
            const Ps = 256 * 1024;
            class As extends ue {
              constructor(t, s, c) {
                super(), this.hooks = t, this.method = s, this.url = c;
              }
              start(t) {
                this.position = 0, this.xhr = this.hooks.getRequest(this), this.unloader = () => {
                  this.close();
                }, U.addUnloadListener(this.unloader), this.xhr.open(this.method, this.url, !0), this.xhr.setRequestHeader && this.xhr.setRequestHeader("Content-Type", "application/json"), this.xhr.send(t);
              }
              close() {
                this.unloader && (U.removeUnloadListener(this.unloader), this.unloader = null), this.xhr && (this.hooks.abortRequest(this.xhr), this.xhr = null);
              }
              onChunk(t, s) {
                for (; ; ) {
                  var c = this.advanceBuffer(s);
                  if (c)
                    this.emit("chunk", { status: t, data: c });
                  else
                    break;
                }
                this.isBufferTooLong(s) && this.emit("buffer_too_long");
              }
              advanceBuffer(t) {
                var s = t.slice(this.position), c = s.indexOf(`
`);
                return c !== -1 ? (this.position += c + 1, s.slice(0, c)) : null;
              }
              isBufferTooLong(t) {
                return this.position === t.length && t.length > Ps;
              }
            }
            var vt;
            (function(o) {
              o[o.CONNECTING = 0] = "CONNECTING", o[o.OPEN = 1] = "OPEN", o[o.CLOSED = 3] = "CLOSED";
            })(vt || (vt = {}));
            var be = vt, Ls = 1;
            class Ns {
              constructor(t, s) {
                this.hooks = t, this.session = cn(1e3) + "/" + Is(8), this.location = js(s), this.readyState = be.CONNECTING, this.openStream();
              }
              send(t) {
                return this.sendRaw(JSON.stringify([t]));
              }
              ping() {
                this.hooks.sendHeartbeat(this);
              }
              close(t, s) {
                this.onClose(t, s, !0);
              }
              sendRaw(t) {
                if (this.readyState === be.OPEN)
                  try {
                    return U.createSocketRequest("POST", an(Us(this.location, this.session))).start(t), !0;
                  } catch {
                    return !1;
                  }
                else
                  return !1;
              }
              reconnect() {
                this.closeStream(), this.openStream();
              }
              onClose(t, s, c) {
                this.closeStream(), this.readyState = be.CLOSED, this.onclose && this.onclose({
                  code: t,
                  reason: s,
                  wasClean: c
                });
              }
              onChunk(t) {
                if (t.status === 200) {
                  this.readyState === be.OPEN && this.onActivity();
                  var s, c = t.data.slice(0, 1);
                  switch (c) {
                    case "o":
                      s = JSON.parse(t.data.slice(1) || "{}"), this.onOpen(s);
                      break;
                    case "a":
                      s = JSON.parse(t.data.slice(1) || "[]");
                      for (var d = 0; d < s.length; d++)
                        this.onEvent(s[d]);
                      break;
                    case "m":
                      s = JSON.parse(t.data.slice(1) || "null"), this.onEvent(s);
                      break;
                    case "h":
                      this.hooks.onHeartbeat(this);
                      break;
                    case "c":
                      s = JSON.parse(t.data.slice(1) || "[]"), this.onClose(s[0], s[1], !0);
                      break;
                  }
                }
              }
              onOpen(t) {
                this.readyState === be.CONNECTING ? (t && t.hostname && (this.location.base = Ds(this.location.base, t.hostname)), this.readyState = be.OPEN, this.onopen && this.onopen()) : this.onClose(1006, "Server lost session", !0);
              }
              onEvent(t) {
                this.readyState === be.OPEN && this.onmessage && this.onmessage({ data: t });
              }
              onActivity() {
                this.onactivity && this.onactivity();
              }
              onError(t) {
                this.onerror && this.onerror(t);
              }
              openStream() {
                this.stream = U.createSocketRequest("POST", an(this.hooks.getReceiveURL(this.location, this.session))), this.stream.bind("chunk", (t) => {
                  this.onChunk(t);
                }), this.stream.bind("finished", (t) => {
                  this.hooks.onFinished(this, t);
                }), this.stream.bind("buffer_too_long", () => {
                  this.reconnect();
                });
                try {
                  this.stream.start();
                } catch (t) {
                  X.defer(() => {
                    this.onError(t), this.onClose(1006, "Could not start streaming", !1);
                  });
                }
              }
              closeStream() {
                this.stream && (this.stream.unbind_all(), this.stream.close(), this.stream = null);
              }
            }
            function js(o) {
              var t = /([^\?]*)\/*(\??.*)/.exec(o);
              return {
                base: t[1],
                queryString: t[2]
              };
            }
            function Us(o, t) {
              return o.base + "/" + t + "/xhr_send";
            }
            function an(o) {
              var t = o.indexOf("?") === -1 ? "?" : "&";
              return o + t + "t=" + +/* @__PURE__ */ new Date() + "&n=" + Ls++;
            }
            function Ds(o, t) {
              var s = /(https?:\/\/)([^\/:]+)((\/|:)?.*)/.exec(o);
              return s[1] + t + s[3];
            }
            function cn(o) {
              return U.randomInt(o);
            }
            function Is(o) {
              for (var t = [], s = 0; s < o; s++)
                t.push(cn(32).toString(32));
              return t.join("");
            }
            var Fs = Ns, qs = {
              getReceiveURL: function(o, t) {
                return o.base + "/" + t + "/xhr_streaming" + o.queryString;
              },
              onHeartbeat: function(o) {
                o.sendRaw("[]");
              },
              sendHeartbeat: function(o) {
                o.sendRaw("[]");
              },
              onFinished: function(o, t) {
                o.onClose(1006, "Connection interrupted (" + t + ")", !1);
              }
            }, Bs = qs, Ms = {
              getReceiveURL: function(o, t) {
                return o.base + "/" + t + "/xhr" + o.queryString;
              },
              onHeartbeat: function() {
              },
              sendHeartbeat: function(o) {
                o.sendRaw("[]");
              },
              onFinished: function(o, t) {
                t === 200 ? o.reconnect() : o.onClose(1006, "Connection interrupted (" + t + ")", !1);
              }
            }, $s = Ms, Hs = {
              getRequest: function(o) {
                var t = U.getXHRAPI(), s = new t();
                return s.onreadystatechange = s.onprogress = function() {
                  switch (s.readyState) {
                    case 3:
                      s.responseText && s.responseText.length > 0 && o.onChunk(s.status, s.responseText);
                      break;
                    case 4:
                      s.responseText && s.responseText.length > 0 && o.onChunk(s.status, s.responseText), o.emit("finished", s.status), o.close();
                      break;
                  }
                }, s;
              },
              abortRequest: function(o) {
                o.onreadystatechange = null, o.abort();
              }
            }, zs = Hs, Js = {
              createStreamingSocket(o) {
                return this.createSocket(Bs, o);
              },
              createPollingSocket(o) {
                return this.createSocket($s, o);
              },
              createSocket(o, t) {
                return new Fs(o, t);
              },
              createXHR(o, t) {
                return this.createRequest(zs, o, t);
              },
              createRequest(o, t, s) {
                return new As(o, t, s);
              }
            }, un = Js;
            un.createXDR = function(o, t) {
              return this.createRequest(Os, o, t);
            };
            var Vs = un, Xs = {
              nextAuthCallbackID: 1,
              auth_callbacks: {},
              ScriptReceivers: u,
              DependenciesReceivers: p,
              getDefaultStrategy: Es,
              Transports: ns,
              transportConnectionInitializer: ks,
              HTTPFactory: Vs,
              TimelineTransport: Hr,
              getXHRAPI() {
                return window.XMLHttpRequest;
              },
              getWebSocketAPI() {
                return window.WebSocket || window.MozWebSocket;
              },
              setup(o) {
                window.Pusher = o;
                var t = () => {
                  this.onDocumentBody(o.ready);
                };
                window.JSON ? t() : _.load("json2", {}, t);
              },
              getDocument() {
                return document;
              },
              getProtocol() {
                return this.getDocument().location.protocol;
              },
              getAuthorizers() {
                return { ajax: F, jsonp: Fr };
              },
              onDocumentBody(o) {
                document.body ? o() : setTimeout(() => {
                  this.onDocumentBody(o);
                }, 0);
              },
              createJSONPRequest(o, t) {
                return new Br(o, t);
              },
              createScriptRequest(o) {
                return new qr(o);
              },
              getLocalStorage() {
                try {
                  return window.localStorage;
                } catch {
                  return;
                }
              },
              createXHR() {
                return this.getXHRAPI() ? this.createXMLHttpRequest() : this.createMicrosoftXHR();
              },
              createXMLHttpRequest() {
                var o = this.getXHRAPI();
                return new o();
              },
              createMicrosoftXHR() {
                return new ActiveXObject("Microsoft.XMLHTTP");
              },
              getNetwork() {
                return ss;
              },
              createWebSocket(o) {
                var t = this.getWebSocketAPI();
                return new t(o);
              },
              createSocketRequest(o, t) {
                if (this.isXHRSupported())
                  return this.HTTPFactory.createXHR(o, t);
                if (this.isXDRSupported(t.indexOf("https:") === 0))
                  return this.HTTPFactory.createXDR(o, t);
                throw "Cross-origin HTTP requests are not supported";
              },
              isXHRSupported() {
                var o = this.getXHRAPI();
                return !!o && new o().withCredentials !== void 0;
              },
              isXDRSupported(o) {
                var t = o ? "https:" : "http:", s = this.getProtocol();
                return !!window.XDomainRequest && s === t;
              },
              addUnloadListener(o) {
                window.addEventListener !== void 0 ? window.addEventListener("unload", o, !1) : window.attachEvent !== void 0 && window.attachEvent("onunload", o);
              },
              removeUnloadListener(o) {
                window.addEventListener !== void 0 ? window.removeEventListener("unload", o, !1) : window.detachEvent !== void 0 && window.detachEvent("onunload", o);
              },
              randomInt(o) {
                return Math.floor(function() {
                  return (window.crypto || window.msCrypto).getRandomValues(new Uint32Array(1))[0] / Math.pow(2, 32);
                }() * o);
              }
            }, U = Xs, bt;
            (function(o) {
              o[o.ERROR = 3] = "ERROR", o[o.INFO = 6] = "INFO", o[o.DEBUG = 7] = "DEBUG";
            })(bt || (bt = {}));
            var Ve = bt;
            class Ws {
              constructor(t, s, c) {
                this.key = t, this.session = s, this.events = [], this.options = c || {}, this.sent = 0, this.uniqueID = 0;
              }
              log(t, s) {
                t <= this.options.level && (this.events.push(Y({}, s, { timestamp: X.now() })), this.options.limit && this.events.length > this.options.limit && this.events.shift());
              }
              error(t) {
                this.log(Ve.ERROR, t);
              }
              info(t) {
                this.log(Ve.INFO, t);
              }
              debug(t) {
                this.log(Ve.DEBUG, t);
              }
              isEmpty() {
                return this.events.length === 0;
              }
              send(t, s) {
                var c = Y({
                  session: this.session,
                  bundle: this.sent + 1,
                  key: this.key,
                  lib: "js",
                  version: this.options.version,
                  cluster: this.options.cluster,
                  features: this.options.features,
                  timeline: this.events
                }, this.options.params);
                return this.events = [], t(c, (d, x) => {
                  d || this.sent++, s && s(d, x);
                }), !0;
              }
              generateUniqueID() {
                return this.uniqueID++, this.uniqueID;
              }
            }
            class Ks {
              constructor(t, s, c, d) {
                this.name = t, this.priority = s, this.transport = c, this.options = d || {};
              }
              isSupported() {
                return this.transport.isSupported({
                  useTLS: this.options.useTLS
                });
              }
              connect(t, s) {
                if (this.isSupported()) {
                  if (this.priority < t)
                    return ln(new E(), s);
                } else return ln(new N(), s);
                var c = !1, d = this.transport.createConnection(this.name, this.priority, this.options.key, this.options), x = null, O = function() {
                  d.unbind("initialized", O), d.connect();
                }, L = function() {
                  x = le.createHandshake(d, function(W) {
                    c = !0, B(), s(null, W);
                  });
                }, j = function(W) {
                  B(), s(W);
                }, q = function() {
                  B();
                  var W;
                  W = He(d), s(new k(W));
                }, B = function() {
                  d.unbind("initialized", O), d.unbind("open", L), d.unbind("error", j), d.unbind("closed", q);
                };
                return d.bind("initialized", O), d.bind("open", L), d.bind("error", j), d.bind("closed", q), d.initialize(), {
                  abort: () => {
                    c || (B(), x ? x.close() : d.close());
                  },
                  forceMinPriority: (W) => {
                    c || this.priority < W && (x ? x.close() : d.close());
                  }
                };
              }
            }
            function ln(o, t) {
              return X.defer(function() {
                t(o);
              }), {
                abort: function() {
                },
                forceMinPriority: function() {
                }
              };
            }
            const { Transports: Qs } = U;
            var Gs = function(o, t, s, c, d, x) {
              var O = Qs[s];
              if (!O)
                throw new P(s);
              var L = (!o.enabledTransports || Vt(o.enabledTransports, t) !== -1) && (!o.disabledTransports || Vt(o.disabledTransports, t) === -1), j;
              return L ? (d = Object.assign({ ignoreNullOrigin: o.ignoreNullOrigin }, d), j = new Ks(t, c, x ? x.getAssistant(O) : O, d)) : j = Zs, j;
            }, Zs = {
              isSupported: function() {
                return !1;
              },
              connect: function(o, t) {
                var s = X.defer(function() {
                  t(new N());
                });
                return {
                  abort: function() {
                    s.ensureAborted();
                  },
                  forceMinPriority: function() {
                  }
                };
              }
            };
            function Ys(o) {
              if (o == null)
                throw "You must pass an options object";
              if (o.cluster == null)
                throw "Options object must provide a cluster";
              "disableStats" in o && z.warn("The disableStats option is deprecated in favor of enableStats");
            }
            const ei = (o, t) => {
              var s = "socket_id=" + encodeURIComponent(o.socketId);
              for (var c in t.params)
                s += "&" + encodeURIComponent(c) + "=" + encodeURIComponent(t.params[c]);
              if (t.paramsProvider != null) {
                let d = t.paramsProvider();
                for (var c in d)
                  s += "&" + encodeURIComponent(c) + "=" + encodeURIComponent(d[c]);
              }
              return s;
            };
            var ti = (o) => {
              if (typeof U.getAuthorizers()[o.transport] > "u")
                throw `'${o.transport}' is not a recognized auth transport`;
              return (t, s) => {
                const c = ei(t, o);
                U.getAuthorizers()[o.transport](U, c, o, f.UserAuthentication, s);
              };
            };
            const ni = (o, t) => {
              var s = "socket_id=" + encodeURIComponent(o.socketId);
              s += "&channel_name=" + encodeURIComponent(o.channelName);
              for (var c in t.params)
                s += "&" + encodeURIComponent(c) + "=" + encodeURIComponent(t.params[c]);
              if (t.paramsProvider != null) {
                let d = t.paramsProvider();
                for (var c in d)
                  s += "&" + encodeURIComponent(c) + "=" + encodeURIComponent(d[c]);
              }
              return s;
            };
            var ri = (o) => {
              if (typeof U.getAuthorizers()[o.transport] > "u")
                throw `'${o.transport}' is not a recognized auth transport`;
              return (t, s) => {
                const c = ni(t, o);
                U.getAuthorizers()[o.transport](U, c, o, f.ChannelAuthorization, s);
              };
            };
            const si = (o, t, s) => {
              const c = {
                authTransport: t.transport,
                authEndpoint: t.endpoint,
                auth: {
                  params: t.params,
                  headers: t.headers
                }
              };
              return (d, x) => {
                const O = o.channel(d.channelName);
                s(O, c).authorize(d.socketId, x);
              };
            };
            function ii(o, t) {
              let s = {
                activityTimeout: o.activityTimeout || C.activityTimeout,
                cluster: o.cluster,
                httpPath: o.httpPath || C.httpPath,
                httpPort: o.httpPort || C.httpPort,
                httpsPort: o.httpsPort || C.httpsPort,
                pongTimeout: o.pongTimeout || C.pongTimeout,
                statsHost: o.statsHost || C.stats_host,
                unavailableTimeout: o.unavailableTimeout || C.unavailableTimeout,
                wsPath: o.wsPath || C.wsPath,
                wsPort: o.wsPort || C.wsPort,
                wssPort: o.wssPort || C.wssPort,
                enableStats: li(o),
                httpHost: oi(o),
                useTLS: ui(o),
                wsHost: ai(o),
                userAuthenticator: hi(o),
                channelAuthorizer: fi(o, t)
              };
              return "disabledTransports" in o && (s.disabledTransports = o.disabledTransports), "enabledTransports" in o && (s.enabledTransports = o.enabledTransports), "ignoreNullOrigin" in o && (s.ignoreNullOrigin = o.ignoreNullOrigin), "timelineParams" in o && (s.timelineParams = o.timelineParams), "nacl" in o && (s.nacl = o.nacl), s;
            }
            function oi(o) {
              return o.httpHost ? o.httpHost : o.cluster ? `sockjs-${o.cluster}.pusher.com` : C.httpHost;
            }
            function ai(o) {
              return o.wsHost ? o.wsHost : ci(o.cluster);
            }
            function ci(o) {
              return `ws-${o}.pusher.com`;
            }
            function ui(o) {
              return U.getProtocol() === "https:" ? !0 : o.forceTLS !== !1;
            }
            function li(o) {
              return "enableStats" in o ? o.enableStats : "disableStats" in o ? !o.disableStats : !1;
            }
            function hi(o) {
              const t = Object.assign(Object.assign({}, C.userAuthentication), o.userAuthentication);
              return "customHandler" in t && t.customHandler != null ? t.customHandler : ti(t);
            }
            function di(o, t) {
              let s;
              return "channelAuthorization" in o ? s = Object.assign(Object.assign({}, C.channelAuthorization), o.channelAuthorization) : (s = {
                transport: o.authTransport || C.authTransport,
                endpoint: o.authEndpoint || C.authEndpoint
              }, "auth" in o && ("params" in o.auth && (s.params = o.auth.params), "headers" in o.auth && (s.headers = o.auth.headers)), "authorizer" in o && (s.customHandler = si(t, s, o.authorizer))), s;
            }
            function fi(o, t) {
              const s = di(o, t);
              return "customHandler" in s && s.customHandler != null ? s.customHandler : ri(s);
            }
            class pi extends ue {
              constructor(t) {
                super(function(s, c) {
                  z.debug(`No callbacks on watchlist events for ${s}`);
                }), this.pusher = t, this.bindWatchlistInternalEvent();
              }
              handleEvent(t) {
                t.data.events.forEach((s) => {
                  this.emit(s.name, s);
                });
              }
              bindWatchlistInternalEvent() {
                this.pusher.connection.bind("message", (t) => {
                  var s = t.event;
                  s === "pusher_internal:watchlist_events" && this.handleEvent(t);
                });
              }
            }
            function mi() {
              let o, t;
              return { promise: new Promise((c, d) => {
                o = c, t = d;
              }), resolve: o, reject: t };
            }
            var gi = mi;
            class vi extends ue {
              constructor(t) {
                super(function(s, c) {
                  z.debug("No callbacks on user for " + s);
                }), this.signin_requested = !1, this.user_data = null, this.serverToUserChannel = null, this.signinDonePromise = null, this._signinDoneResolve = null, this._onAuthorize = (s, c) => {
                  if (s) {
                    z.warn(`Error during signin: ${s}`), this._cleanup();
                    return;
                  }
                  this.pusher.send_event("pusher:signin", {
                    auth: c.auth,
                    user_data: c.user_data
                  });
                }, this.pusher = t, this.pusher.connection.bind("state_change", ({ previous: s, current: c }) => {
                  s !== "connected" && c === "connected" && this._signin(), s === "connected" && c !== "connected" && (this._cleanup(), this._newSigninPromiseIfNeeded());
                }), this.watchlist = new pi(t), this.pusher.connection.bind("message", (s) => {
                  var c = s.event;
                  c === "pusher:signin_success" && this._onSigninSuccess(s.data), this.serverToUserChannel && this.serverToUserChannel.name === s.channel && this.serverToUserChannel.handleEvent(s);
                });
              }
              signin() {
                this.signin_requested || (this.signin_requested = !0, this._signin());
              }
              _signin() {
                this.signin_requested && (this._newSigninPromiseIfNeeded(), this.pusher.connection.state === "connected" && this.pusher.config.userAuthenticator({
                  socketId: this.pusher.connection.socket_id
                }, this._onAuthorize));
              }
              _onSigninSuccess(t) {
                try {
                  this.user_data = JSON.parse(t.user_data);
                } catch {
                  z.error(`Failed parsing user data after signin: ${t.user_data}`), this._cleanup();
                  return;
                }
                if (typeof this.user_data.id != "string" || this.user_data.id === "") {
                  z.error(`user_data doesn't contain an id. user_data: ${this.user_data}`), this._cleanup();
                  return;
                }
                this._signinDoneResolve(), this._subscribeChannels();
              }
              _subscribeChannels() {
                const t = (s) => {
                  s.subscriptionPending && s.subscriptionCancelled ? s.reinstateSubscription() : !s.subscriptionPending && this.pusher.connection.state === "connected" && s.subscribe();
                };
                this.serverToUserChannel = new dt(`#server-to-user-${this.user_data.id}`, this.pusher), this.serverToUserChannel.bind_global((s, c) => {
                  s.indexOf("pusher_internal:") === 0 || s.indexOf("pusher:") === 0 || this.emit(s, c);
                }), t(this.serverToUserChannel);
              }
              _cleanup() {
                this.user_data = null, this.serverToUserChannel && (this.serverToUserChannel.unbind_all(), this.serverToUserChannel.disconnect(), this.serverToUserChannel = null), this.signin_requested && this._signinDoneResolve();
              }
              _newSigninPromiseIfNeeded() {
                if (!this.signin_requested || this.signinDonePromise && !this.signinDonePromise.done)
                  return;
                const { promise: t, resolve: s } = gi();
                t.done = !1;
                const c = () => {
                  t.done = !0;
                };
                t.then(c).catch(c), this.signinDonePromise = t, this._signinDoneResolve = s;
              }
            }
            class Q {
              static ready() {
                Q.isReady = !0;
                for (var t = 0, s = Q.instances.length; t < s; t++)
                  Q.instances[t].connect();
              }
              static getClientFeatures() {
                return Xt(Qt({ ws: U.Transports.ws }, function(t) {
                  return t.isSupported({});
                }));
              }
              constructor(t, s) {
                bi(t), Ys(s), this.key = t, this.config = ii(s, this), this.channels = le.createChannels(), this.global_emitter = new ue(), this.sessionID = U.randomInt(1e9), this.timeline = new Ws(this.key, this.sessionID, {
                  cluster: this.config.cluster,
                  features: Q.getClientFeatures(),
                  params: this.config.timelineParams || {},
                  limit: 50,
                  level: Ve.INFO,
                  version: C.VERSION
                }), this.config.enableStats && (this.timelineSender = le.createTimelineSender(this.timeline, {
                  host: this.config.statsHost,
                  path: "/timeline/v2/" + U.TimelineTransport.name
                }));
                var c = (d) => U.getDefaultStrategy(this.config, d, Gs);
                this.connection = le.createConnectionManager(this.key, {
                  getStrategy: c,
                  timeline: this.timeline,
                  activityTimeout: this.config.activityTimeout,
                  pongTimeout: this.config.pongTimeout,
                  unavailableTimeout: this.config.unavailableTimeout,
                  useTLS: !!this.config.useTLS
                }), this.connection.bind("connected", () => {
                  this.subscribeAll(), this.timelineSender && this.timelineSender.send(this.connection.isUsingTLS());
                }), this.connection.bind("message", (d) => {
                  var x = d.event, O = x.indexOf("pusher_internal:") === 0;
                  if (d.channel) {
                    var L = this.channel(d.channel);
                    L && L.handleEvent(d);
                  }
                  O || this.global_emitter.emit(d.event, d.data);
                }), this.connection.bind("connecting", () => {
                  this.channels.disconnect();
                }), this.connection.bind("disconnected", () => {
                  this.channels.disconnect();
                }), this.connection.bind("error", (d) => {
                  z.warn(d);
                }), Q.instances.push(this), this.timeline.info({ instances: Q.instances.length }), this.user = new vi(this), Q.isReady && this.connect();
              }
              channel(t) {
                return this.channels.find(t);
              }
              allChannels() {
                return this.channels.all();
              }
              connect() {
                if (this.connection.connect(), this.timelineSender && !this.timelineSenderTimer) {
                  var t = this.connection.isUsingTLS(), s = this.timelineSender;
                  this.timelineSenderTimer = new $e(6e4, function() {
                    s.send(t);
                  });
                }
              }
              disconnect() {
                this.connection.disconnect(), this.timelineSenderTimer && (this.timelineSenderTimer.ensureAborted(), this.timelineSenderTimer = null);
              }
              bind(t, s, c) {
                return this.global_emitter.bind(t, s, c), this;
              }
              unbind(t, s, c) {
                return this.global_emitter.unbind(t, s, c), this;
              }
              bind_global(t) {
                return this.global_emitter.bind_global(t), this;
              }
              unbind_global(t) {
                return this.global_emitter.unbind_global(t), this;
              }
              unbind_all(t) {
                return this.global_emitter.unbind_all(), this;
              }
              subscribeAll() {
                var t;
                for (t in this.channels.channels)
                  this.channels.channels.hasOwnProperty(t) && this.subscribe(t);
              }
              subscribe(t) {
                var s = this.channels.add(t, this);
                return s.subscriptionPending && s.subscriptionCancelled ? s.reinstateSubscription() : !s.subscriptionPending && this.connection.state === "connected" && s.subscribe(), s;
              }
              unsubscribe(t) {
                var s = this.channels.find(t);
                s && s.subscriptionPending ? s.cancelSubscription() : (s = this.channels.remove(t), s && s.subscribed && s.unsubscribe());
              }
              send_event(t, s, c) {
                return this.connection.send_event(t, s, c);
              }
              shouldUseTLS() {
                return this.config.useTLS;
              }
              signin() {
                this.user.signin();
              }
            }
            Q.instances = [], Q.isReady = !1, Q.logToConsole = !1, Q.Runtime = U, Q.ScriptReceivers = U.ScriptReceivers, Q.DependenciesReceivers = U.DependenciesReceivers, Q.auth_callbacks = U.auth_callbacks;
            var yt = i.default = Q;
            function bi(o) {
              if (o == null)
                throw "You must pass your app key when you instantiate Pusher.";
            }
            U.setup(Q);
          }
          /******/
        ])
      );
    });
  }(St)), St.exports;
}
var Hi = $i();
const Yn = /* @__PURE__ */ Mi(Hi), zi = { class: "flex items-center border border-gray-300 rounded-lg px-3 py-2 w-full max-w-md" }, Ji = /* @__PURE__ */ me({
  name: "DCodeChatSearch",
  __name: "DCodeChatSearch",
  props: {
    currentSearch: { default: "" }
  },
  emits: ["searchUpdated"],
  setup(r, { emit: e }) {
    const n = e, i = r, a = J(i.currentSearch || "");
    de(
      () => i.currentSearch,
      (u) => {
        a.value = u;
      }
    );
    const l = () => {
      n("searchUpdated", a.value);
    };
    return (u, g) => (V(), K("div", zi, [
      g[1] || (g[1] = M("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        class: "h-5 w-5 text-gray-400",
        viewBox: "0 0 20 20",
        fill: "currentColor"
      }, [
        M("path", {
          "fill-rule": "evenodd",
          d: "M12.9 14.32a8 8 0 111.414-1.414l4.387 4.387a1 1 0 01-1.414 1.414l-4.387-4.387zM14 8a6 6 0 11-12 0 6 6 0 0112 0z",
          "clip-rule": "evenodd"
        })
      ], -1)),
      qn(M("input", {
        onKeyup: Bn(l, ["enter"]),
        type: "text",
        "onUpdate:modelValue": g[0] || (g[0] = (C) => a.value = C),
        placeholder: "Search chats",
        class: "ml-2 w-full outline-none bg-transparent text-gray-600 placeholder-gray-400"
      }, null, 544), [
        [Mn, a.value]
      ])
    ]));
  }
}), Vi = { class: "flex items-center space-x-3 dcode-chat__listing cursor-default" }, Xi = ["src", "alt"], Wi = {
  key: 0,
  class: "absolute top-0 left-0 w-3 h-3 rounded-full border-2 border-red-500 bg-red-500"
}, Ki = { class: "dcode-chat__listing-text" }, Qi = { class: "text-sm font-semibold text-gray-900" }, Gi = { class: "text-sm text-gray-500" }, er = /* @__PURE__ */ me({
  name: "DCodeChatListing",
  __name: "DCodeChatListing",
  props: {
    chat: {},
    selected: { type: Boolean },
    ignoreUnread: { type: Boolean }
  },
  setup(r) {
    const e = r, n = J(e.chat), i = J(e.ignoreUnread === !0);
    return de(
      () => e.chat,
      (a) => {
        n.value = a;
      }
    ), (a, l) => {
      var u, g, C, T, p, _, S, w, v, f, h, m, b, E;
      return V(), K("div", Vi, [
        M("div", {
          class: "relative dcode-chat__listing-avatar-container",
          onClick: l[0] || (l[0] = (k) => a.$emit("selectChat", n.value))
        }, [
          M("div", {
            class: se(["w-10 h-10 rounded-full border dcode-chat__listing-avatar flex items-center justify-center", { "border-green-500": a.selected, "border-gray-300": !a.selected }])
          }, [
            (g = (u = n.value) == null ? void 0 : u.pivot) != null && g.chat_avatar ? ae("", !0) : (V(), K("div", {
              key: 0,
              class: se(["w-10 h-10", { "fill-green-500": a.selected, "fill-gray-300": !a.selected }])
            }, l[1] || (l[1] = [
              M("svg", {
                xmlns: "http://www.w3.org/2000/svg",
                fill: "currentFill",
                viewBox: "0 0 24 24"
              }, [
                M("path", { d: "M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" })
              ], -1)
            ]), 2)),
            (T = (C = n.value) == null ? void 0 : C.pivot) != null && T.chat_avatar ? (V(), K("img", {
              key: 1,
              src: ((_ = (p = n.value) == null ? void 0 : p.pivot) == null ? void 0 : _.chat_avatar) + "?selected=" + (a.selected ? "selected" : ""),
              alt: (w = (S = n.value) == null ? void 0 : S.pivot) == null ? void 0 : w.chat_title,
              class: "rounded-full object-contain"
            }, null, 8, Xi)) : ae("", !0)
          ], 2),
          (f = (v = n.value) == null ? void 0 : v.pivot) != null && f.has_new_messages && !i.value ? (V(), K("div", Wi)) : ae("", !0)
        ]),
        M("div", Ki, [
          M("div", Qi, Le((m = (h = n.value) == null ? void 0 : h.pivot) == null ? void 0 : m.chat_title), 1),
          M("div", Gi, Le((E = (b = n.value) == null ? void 0 : b.pivot) == null ? void 0 : E.chat_description), 1)
        ])
      ]);
    };
  }
});
function tr(r, e) {
  return function() {
    return r.apply(e, arguments);
  };
}
const { toString: Zi } = Object.prototype, { getPrototypeOf: $t } = Object, { iterator: tt, toStringTag: nr } = Symbol, nt = /* @__PURE__ */ ((r) => (e) => {
  const n = Zi.call(e);
  return r[n] || (r[n] = n.slice(8, -1).toLowerCase());
})(/* @__PURE__ */ Object.create(null)), ie = (r) => (r = r.toLowerCase(), (e) => nt(e) === r), rt = (r) => (e) => typeof e === r, { isArray: xe } = Array, je = rt("undefined");
function Yi(r) {
  return r !== null && !je(r) && r.constructor !== null && !je(r.constructor) && ee(r.constructor.isBuffer) && r.constructor.isBuffer(r);
}
const rr = ie("ArrayBuffer");
function eo(r) {
  let e;
  return typeof ArrayBuffer < "u" && ArrayBuffer.isView ? e = ArrayBuffer.isView(r) : e = r && r.buffer && rr(r.buffer), e;
}
const to = rt("string"), ee = rt("function"), sr = rt("number"), st = (r) => r !== null && typeof r == "object", no = (r) => r === !0 || r === !1, Ke = (r) => {
  if (nt(r) !== "object")
    return !1;
  const e = $t(r);
  return (e === null || e === Object.prototype || Object.getPrototypeOf(e) === null) && !(nr in r) && !(tt in r);
}, ro = ie("Date"), so = ie("File"), io = ie("Blob"), oo = ie("FileList"), ao = (r) => st(r) && ee(r.pipe), co = (r) => {
  let e;
  return r && (typeof FormData == "function" && r instanceof FormData || ee(r.append) && ((e = nt(r)) === "formdata" || // detect form-data instance
  e === "object" && ee(r.toString) && r.toString() === "[object FormData]"));
}, uo = ie("URLSearchParams"), [lo, ho, fo, po] = ["ReadableStream", "Request", "Response", "Headers"].map(ie), mo = (r) => r.trim ? r.trim() : r.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function De(r, e, { allOwnKeys: n = !1 } = {}) {
  if (r === null || typeof r > "u")
    return;
  let i, a;
  if (typeof r != "object" && (r = [r]), xe(r))
    for (i = 0, a = r.length; i < a; i++)
      e.call(null, r[i], i, r);
  else {
    const l = n ? Object.getOwnPropertyNames(r) : Object.keys(r), u = l.length;
    let g;
    for (i = 0; i < u; i++)
      g = l[i], e.call(null, r[g], g, r);
  }
}
function ir(r, e) {
  e = e.toLowerCase();
  const n = Object.keys(r);
  let i = n.length, a;
  for (; i-- > 0; )
    if (a = n[i], e === a.toLowerCase())
      return a;
  return null;
}
const ye = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : global, or = (r) => !je(r) && r !== ye;
function Lt() {
  const { caseless: r } = or(this) && this || {}, e = {}, n = (i, a) => {
    const l = r && ir(e, a) || a;
    Ke(e[l]) && Ke(i) ? e[l] = Lt(e[l], i) : Ke(i) ? e[l] = Lt({}, i) : xe(i) ? e[l] = i.slice() : e[l] = i;
  };
  for (let i = 0, a = arguments.length; i < a; i++)
    arguments[i] && De(arguments[i], n);
  return e;
}
const go = (r, e, n, { allOwnKeys: i } = {}) => (De(e, (a, l) => {
  n && ee(a) ? r[l] = tr(a, n) : r[l] = a;
}, { allOwnKeys: i }), r), vo = (r) => (r.charCodeAt(0) === 65279 && (r = r.slice(1)), r), bo = (r, e, n, i) => {
  r.prototype = Object.create(e.prototype, i), r.prototype.constructor = r, Object.defineProperty(r, "super", {
    value: e.prototype
  }), n && Object.assign(r.prototype, n);
}, yo = (r, e, n, i) => {
  let a, l, u;
  const g = {};
  if (e = e || {}, r == null) return e;
  do {
    for (a = Object.getOwnPropertyNames(r), l = a.length; l-- > 0; )
      u = a[l], (!i || i(u, r, e)) && !g[u] && (e[u] = r[u], g[u] = !0);
    r = n !== !1 && $t(r);
  } while (r && (!n || n(r, e)) && r !== Object.prototype);
  return e;
}, wo = (r, e, n) => {
  r = String(r), (n === void 0 || n > r.length) && (n = r.length), n -= e.length;
  const i = r.indexOf(e, n);
  return i !== -1 && i === n;
}, _o = (r) => {
  if (!r) return null;
  if (xe(r)) return r;
  let e = r.length;
  if (!sr(e)) return null;
  const n = new Array(e);
  for (; e-- > 0; )
    n[e] = r[e];
  return n;
}, So = /* @__PURE__ */ ((r) => (e) => r && e instanceof r)(typeof Uint8Array < "u" && $t(Uint8Array)), Co = (r, e) => {
  const i = (r && r[tt]).call(r);
  let a;
  for (; (a = i.next()) && !a.done; ) {
    const l = a.value;
    e.call(r, l[0], l[1]);
  }
}, xo = (r, e) => {
  let n;
  const i = [];
  for (; (n = r.exec(e)) !== null; )
    i.push(n);
  return i;
}, To = ie("HTMLFormElement"), Eo = (r) => r.toLowerCase().replace(
  /[-_\s]([a-z\d])(\w*)/g,
  function(n, i, a) {
    return i.toUpperCase() + a;
  }
), _n = (({ hasOwnProperty: r }) => (e, n) => r.call(e, n))(Object.prototype), ko = ie("RegExp"), ar = (r, e) => {
  const n = Object.getOwnPropertyDescriptors(r), i = {};
  De(n, (a, l) => {
    let u;
    (u = e(a, l, r)) !== !1 && (i[l] = u || a);
  }), Object.defineProperties(r, i);
}, Ro = (r) => {
  ar(r, (e, n) => {
    if (ee(r) && ["arguments", "caller", "callee"].indexOf(n) !== -1)
      return !1;
    const i = r[n];
    if (ee(i)) {
      if (e.enumerable = !1, "writable" in e) {
        e.writable = !1;
        return;
      }
      e.set || (e.set = () => {
        throw Error("Can not rewrite read-only method '" + n + "'");
      });
    }
  });
}, Oo = (r, e) => {
  const n = {}, i = (a) => {
    a.forEach((l) => {
      n[l] = !0;
    });
  };
  return xe(r) ? i(r) : i(String(r).split(e)), n;
}, Po = () => {
}, Ao = (r, e) => r != null && Number.isFinite(r = +r) ? r : e;
function Lo(r) {
  return !!(r && ee(r.append) && r[nr] === "FormData" && r[tt]);
}
const No = (r) => {
  const e = new Array(10), n = (i, a) => {
    if (st(i)) {
      if (e.indexOf(i) >= 0)
        return;
      if (!("toJSON" in i)) {
        e[a] = i;
        const l = xe(i) ? [] : {};
        return De(i, (u, g) => {
          const C = n(u, a + 1);
          !je(C) && (l[g] = C);
        }), e[a] = void 0, l;
      }
    }
    return i;
  };
  return n(r, 0);
}, jo = ie("AsyncFunction"), Uo = (r) => r && (st(r) || ee(r)) && ee(r.then) && ee(r.catch), cr = ((r, e) => r ? setImmediate : e ? ((n, i) => (ye.addEventListener("message", ({ source: a, data: l }) => {
  a === ye && l === n && i.length && i.shift()();
}, !1), (a) => {
  i.push(a), ye.postMessage(n, "*");
}))(`axios@${Math.random()}`, []) : (n) => setTimeout(n))(
  typeof setImmediate == "function",
  ee(ye.postMessage)
), Do = typeof queueMicrotask < "u" ? queueMicrotask.bind(ye) : typeof process < "u" && process.nextTick || cr, Io = (r) => r != null && ee(r[tt]), y = {
  isArray: xe,
  isArrayBuffer: rr,
  isBuffer: Yi,
  isFormData: co,
  isArrayBufferView: eo,
  isString: to,
  isNumber: sr,
  isBoolean: no,
  isObject: st,
  isPlainObject: Ke,
  isReadableStream: lo,
  isRequest: ho,
  isResponse: fo,
  isHeaders: po,
  isUndefined: je,
  isDate: ro,
  isFile: so,
  isBlob: io,
  isRegExp: ko,
  isFunction: ee,
  isStream: ao,
  isURLSearchParams: uo,
  isTypedArray: So,
  isFileList: oo,
  forEach: De,
  merge: Lt,
  extend: go,
  trim: mo,
  stripBOM: vo,
  inherits: bo,
  toFlatObject: yo,
  kindOf: nt,
  kindOfTest: ie,
  endsWith: wo,
  toArray: _o,
  forEachEntry: Co,
  matchAll: xo,
  isHTMLForm: To,
  hasOwnProperty: _n,
  hasOwnProp: _n,
  // an alias to avoid ESLint no-prototype-builtins detection
  reduceDescriptors: ar,
  freezeMethods: Ro,
  toObjectSet: Oo,
  toCamelCase: Eo,
  noop: Po,
  toFiniteNumber: Ao,
  findKey: ir,
  global: ye,
  isContextDefined: or,
  isSpecCompliantForm: Lo,
  toJSONObject: No,
  isAsyncFn: jo,
  isThenable: Uo,
  setImmediate: cr,
  asap: Do,
  isIterable: Io
};
function D(r, e, n, i, a) {
  Error.call(this), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack, this.message = r, this.name = "AxiosError", e && (this.code = e), n && (this.config = n), i && (this.request = i), a && (this.response = a, this.status = a.status ? a.status : null);
}
y.inherits(D, Error, {
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
      config: y.toJSONObject(this.config),
      code: this.code,
      status: this.status
    };
  }
});
const ur = D.prototype, lr = {};
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
].forEach((r) => {
  lr[r] = { value: r };
});
Object.defineProperties(D, lr);
Object.defineProperty(ur, "isAxiosError", { value: !0 });
D.from = (r, e, n, i, a, l) => {
  const u = Object.create(ur);
  return y.toFlatObject(r, u, function(C) {
    return C !== Error.prototype;
  }, (g) => g !== "isAxiosError"), D.call(u, r.message, e, n, i, a), u.cause = r, u.name = r.name, l && Object.assign(u, l), u;
};
const Fo = null;
function Nt(r) {
  return y.isPlainObject(r) || y.isArray(r);
}
function hr(r) {
  return y.endsWith(r, "[]") ? r.slice(0, -2) : r;
}
function Sn(r, e, n) {
  return r ? r.concat(e).map(function(a, l) {
    return a = hr(a), !n && l ? "[" + a + "]" : a;
  }).join(n ? "." : "") : e;
}
function qo(r) {
  return y.isArray(r) && !r.some(Nt);
}
const Bo = y.toFlatObject(y, {}, null, function(e) {
  return /^is[A-Z]/.test(e);
});
function it(r, e, n) {
  if (!y.isObject(r))
    throw new TypeError("target must be an object");
  e = e || new FormData(), n = y.toFlatObject(n, {
    metaTokens: !0,
    dots: !1,
    indexes: !1
  }, !1, function(f, h) {
    return !y.isUndefined(h[f]);
  });
  const i = n.metaTokens, a = n.visitor || p, l = n.dots, u = n.indexes, C = (n.Blob || typeof Blob < "u" && Blob) && y.isSpecCompliantForm(e);
  if (!y.isFunction(a))
    throw new TypeError("visitor must be a function");
  function T(v) {
    if (v === null) return "";
    if (y.isDate(v))
      return v.toISOString();
    if (!C && y.isBlob(v))
      throw new D("Blob is not supported. Use a Buffer instead.");
    return y.isArrayBuffer(v) || y.isTypedArray(v) ? C && typeof Blob == "function" ? new Blob([v]) : Buffer.from(v) : v;
  }
  function p(v, f, h) {
    let m = v;
    if (v && !h && typeof v == "object") {
      if (y.endsWith(f, "{}"))
        f = i ? f : f.slice(0, -2), v = JSON.stringify(v);
      else if (y.isArray(v) && qo(v) || (y.isFileList(v) || y.endsWith(f, "[]")) && (m = y.toArray(v)))
        return f = hr(f), m.forEach(function(E, k) {
          !(y.isUndefined(E) || E === null) && e.append(
            // eslint-disable-next-line no-nested-ternary
            u === !0 ? Sn([f], k, l) : u === null ? f : f + "[]",
            T(E)
          );
        }), !1;
    }
    return Nt(v) ? !0 : (e.append(Sn(h, f, l), T(v)), !1);
  }
  const _ = [], S = Object.assign(Bo, {
    defaultVisitor: p,
    convertValue: T,
    isVisitable: Nt
  });
  function w(v, f) {
    if (!y.isUndefined(v)) {
      if (_.indexOf(v) !== -1)
        throw Error("Circular reference detected in " + f.join("."));
      _.push(v), y.forEach(v, function(m, b) {
        (!(y.isUndefined(m) || m === null) && a.call(
          e,
          m,
          y.isString(b) ? b.trim() : b,
          f,
          S
        )) === !0 && w(m, f ? f.concat(b) : [b]);
      }), _.pop();
    }
  }
  if (!y.isObject(r))
    throw new TypeError("data must be an object");
  return w(r), e;
}
function Cn(r) {
  const e = {
    "!": "%21",
    "'": "%27",
    "(": "%28",
    ")": "%29",
    "~": "%7E",
    "%20": "+",
    "%00": "\0"
  };
  return encodeURIComponent(r).replace(/[!'()~]|%20|%00/g, function(i) {
    return e[i];
  });
}
function Ht(r, e) {
  this._pairs = [], r && it(r, this, e);
}
const dr = Ht.prototype;
dr.append = function(e, n) {
  this._pairs.push([e, n]);
};
dr.toString = function(e) {
  const n = e ? function(i) {
    return e.call(this, i, Cn);
  } : Cn;
  return this._pairs.map(function(a) {
    return n(a[0]) + "=" + n(a[1]);
  }, "").join("&");
};
function Mo(r) {
  return encodeURIComponent(r).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
}
function fr(r, e, n) {
  if (!e)
    return r;
  const i = n && n.encode || Mo;
  y.isFunction(n) && (n = {
    serialize: n
  });
  const a = n && n.serialize;
  let l;
  if (a ? l = a(e, n) : l = y.isURLSearchParams(e) ? e.toString() : new Ht(e, n).toString(i), l) {
    const u = r.indexOf("#");
    u !== -1 && (r = r.slice(0, u)), r += (r.indexOf("?") === -1 ? "?" : "&") + l;
  }
  return r;
}
class xn {
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
  use(e, n, i) {
    return this.handlers.push({
      fulfilled: e,
      rejected: n,
      synchronous: i ? i.synchronous : !1,
      runWhen: i ? i.runWhen : null
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
    y.forEach(this.handlers, function(i) {
      i !== null && e(i);
    });
  }
}
const pr = {
  silentJSONParsing: !0,
  forcedJSONParsing: !0,
  clarifyTimeoutError: !1
}, $o = typeof URLSearchParams < "u" ? URLSearchParams : Ht, Ho = typeof FormData < "u" ? FormData : null, zo = typeof Blob < "u" ? Blob : null, Jo = {
  isBrowser: !0,
  classes: {
    URLSearchParams: $o,
    FormData: Ho,
    Blob: zo
  },
  protocols: ["http", "https", "file", "blob", "url", "data"]
}, zt = typeof window < "u" && typeof document < "u", jt = typeof navigator == "object" && navigator || void 0, Vo = zt && (!jt || ["ReactNative", "NativeScript", "NS"].indexOf(jt.product) < 0), Xo = typeof WorkerGlobalScope < "u" && // eslint-disable-next-line no-undef
self instanceof WorkerGlobalScope && typeof self.importScripts == "function", Wo = zt && window.location.href || "http://localhost", Ko = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  hasBrowserEnv: zt,
  hasStandardBrowserEnv: Vo,
  hasStandardBrowserWebWorkerEnv: Xo,
  navigator: jt,
  origin: Wo
}, Symbol.toStringTag, { value: "Module" })), G = {
  ...Ko,
  ...Jo
};
function Qo(r, e) {
  return it(r, new G.classes.URLSearchParams(), Object.assign({
    visitor: function(n, i, a, l) {
      return G.isNode && y.isBuffer(n) ? (this.append(i, n.toString("base64")), !1) : l.defaultVisitor.apply(this, arguments);
    }
  }, e));
}
function Go(r) {
  return y.matchAll(/\w+|\[(\w*)]/g, r).map((e) => e[0] === "[]" ? "" : e[1] || e[0]);
}
function Zo(r) {
  const e = {}, n = Object.keys(r);
  let i;
  const a = n.length;
  let l;
  for (i = 0; i < a; i++)
    l = n[i], e[l] = r[l];
  return e;
}
function mr(r) {
  function e(n, i, a, l) {
    let u = n[l++];
    if (u === "__proto__") return !0;
    const g = Number.isFinite(+u), C = l >= n.length;
    return u = !u && y.isArray(a) ? a.length : u, C ? (y.hasOwnProp(a, u) ? a[u] = [a[u], i] : a[u] = i, !g) : ((!a[u] || !y.isObject(a[u])) && (a[u] = []), e(n, i, a[u], l) && y.isArray(a[u]) && (a[u] = Zo(a[u])), !g);
  }
  if (y.isFormData(r) && y.isFunction(r.entries)) {
    const n = {};
    return y.forEachEntry(r, (i, a) => {
      e(Go(i), a, n, 0);
    }), n;
  }
  return null;
}
function Yo(r, e, n) {
  if (y.isString(r))
    try {
      return (e || JSON.parse)(r), y.trim(r);
    } catch (i) {
      if (i.name !== "SyntaxError")
        throw i;
    }
  return (n || JSON.stringify)(r);
}
const Ie = {
  transitional: pr,
  adapter: ["xhr", "http", "fetch"],
  transformRequest: [function(e, n) {
    const i = n.getContentType() || "", a = i.indexOf("application/json") > -1, l = y.isObject(e);
    if (l && y.isHTMLForm(e) && (e = new FormData(e)), y.isFormData(e))
      return a ? JSON.stringify(mr(e)) : e;
    if (y.isArrayBuffer(e) || y.isBuffer(e) || y.isStream(e) || y.isFile(e) || y.isBlob(e) || y.isReadableStream(e))
      return e;
    if (y.isArrayBufferView(e))
      return e.buffer;
    if (y.isURLSearchParams(e))
      return n.setContentType("application/x-www-form-urlencoded;charset=utf-8", !1), e.toString();
    let g;
    if (l) {
      if (i.indexOf("application/x-www-form-urlencoded") > -1)
        return Qo(e, this.formSerializer).toString();
      if ((g = y.isFileList(e)) || i.indexOf("multipart/form-data") > -1) {
        const C = this.env && this.env.FormData;
        return it(
          g ? { "files[]": e } : e,
          C && new C(),
          this.formSerializer
        );
      }
    }
    return l || a ? (n.setContentType("application/json", !1), Yo(e)) : e;
  }],
  transformResponse: [function(e) {
    const n = this.transitional || Ie.transitional, i = n && n.forcedJSONParsing, a = this.responseType === "json";
    if (y.isResponse(e) || y.isReadableStream(e))
      return e;
    if (e && y.isString(e) && (i && !this.responseType || a)) {
      const u = !(n && n.silentJSONParsing) && a;
      try {
        return JSON.parse(e);
      } catch (g) {
        if (u)
          throw g.name === "SyntaxError" ? D.from(g, D.ERR_BAD_RESPONSE, this, null, this.response) : g;
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
    FormData: G.classes.FormData,
    Blob: G.classes.Blob
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
y.forEach(["delete", "get", "head", "post", "put", "patch"], (r) => {
  Ie.headers[r] = {};
});
const ea = y.toObjectSet([
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
]), ta = (r) => {
  const e = {};
  let n, i, a;
  return r && r.split(`
`).forEach(function(u) {
    a = u.indexOf(":"), n = u.substring(0, a).trim().toLowerCase(), i = u.substring(a + 1).trim(), !(!n || e[n] && ea[n]) && (n === "set-cookie" ? e[n] ? e[n].push(i) : e[n] = [i] : e[n] = e[n] ? e[n] + ", " + i : i);
  }), e;
}, Tn = Symbol("internals");
function Ae(r) {
  return r && String(r).trim().toLowerCase();
}
function Qe(r) {
  return r === !1 || r == null ? r : y.isArray(r) ? r.map(Qe) : String(r);
}
function na(r) {
  const e = /* @__PURE__ */ Object.create(null), n = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let i;
  for (; i = n.exec(r); )
    e[i[1]] = i[2];
  return e;
}
const ra = (r) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(r.trim());
function Ct(r, e, n, i, a) {
  if (y.isFunction(i))
    return i.call(this, e, n);
  if (a && (e = n), !!y.isString(e)) {
    if (y.isString(i))
      return e.indexOf(i) !== -1;
    if (y.isRegExp(i))
      return i.test(e);
  }
}
function sa(r) {
  return r.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (e, n, i) => n.toUpperCase() + i);
}
function ia(r, e) {
  const n = y.toCamelCase(" " + e);
  ["get", "set", "has"].forEach((i) => {
    Object.defineProperty(r, i + n, {
      value: function(a, l, u) {
        return this[i].call(this, e, a, l, u);
      },
      configurable: !0
    });
  });
}
let te = class {
  constructor(e) {
    e && this.set(e);
  }
  set(e, n, i) {
    const a = this;
    function l(g, C, T) {
      const p = Ae(C);
      if (!p)
        throw new Error("header name must be a non-empty string");
      const _ = y.findKey(a, p);
      (!_ || a[_] === void 0 || T === !0 || T === void 0 && a[_] !== !1) && (a[_ || C] = Qe(g));
    }
    const u = (g, C) => y.forEach(g, (T, p) => l(T, p, C));
    if (y.isPlainObject(e) || e instanceof this.constructor)
      u(e, n);
    else if (y.isString(e) && (e = e.trim()) && !ra(e))
      u(ta(e), n);
    else if (y.isObject(e) && y.isIterable(e)) {
      let g = {}, C, T;
      for (const p of e) {
        if (!y.isArray(p))
          throw TypeError("Object iterator must return a key-value pair");
        g[T = p[0]] = (C = g[T]) ? y.isArray(C) ? [...C, p[1]] : [C, p[1]] : p[1];
      }
      u(g, n);
    } else
      e != null && l(n, e, i);
    return this;
  }
  get(e, n) {
    if (e = Ae(e), e) {
      const i = y.findKey(this, e);
      if (i) {
        const a = this[i];
        if (!n)
          return a;
        if (n === !0)
          return na(a);
        if (y.isFunction(n))
          return n.call(this, a, i);
        if (y.isRegExp(n))
          return n.exec(a);
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(e, n) {
    if (e = Ae(e), e) {
      const i = y.findKey(this, e);
      return !!(i && this[i] !== void 0 && (!n || Ct(this, this[i], i, n)));
    }
    return !1;
  }
  delete(e, n) {
    const i = this;
    let a = !1;
    function l(u) {
      if (u = Ae(u), u) {
        const g = y.findKey(i, u);
        g && (!n || Ct(i, i[g], g, n)) && (delete i[g], a = !0);
      }
    }
    return y.isArray(e) ? e.forEach(l) : l(e), a;
  }
  clear(e) {
    const n = Object.keys(this);
    let i = n.length, a = !1;
    for (; i--; ) {
      const l = n[i];
      (!e || Ct(this, this[l], l, e, !0)) && (delete this[l], a = !0);
    }
    return a;
  }
  normalize(e) {
    const n = this, i = {};
    return y.forEach(this, (a, l) => {
      const u = y.findKey(i, l);
      if (u) {
        n[u] = Qe(a), delete n[l];
        return;
      }
      const g = e ? sa(l) : String(l).trim();
      g !== l && delete n[l], n[g] = Qe(a), i[g] = !0;
    }), this;
  }
  concat(...e) {
    return this.constructor.concat(this, ...e);
  }
  toJSON(e) {
    const n = /* @__PURE__ */ Object.create(null);
    return y.forEach(this, (i, a) => {
      i != null && i !== !1 && (n[a] = e && y.isArray(i) ? i.join(", ") : i);
    }), n;
  }
  [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]();
  }
  toString() {
    return Object.entries(this.toJSON()).map(([e, n]) => e + ": " + n).join(`
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
  static concat(e, ...n) {
    const i = new this(e);
    return n.forEach((a) => i.set(a)), i;
  }
  static accessor(e) {
    const i = (this[Tn] = this[Tn] = {
      accessors: {}
    }).accessors, a = this.prototype;
    function l(u) {
      const g = Ae(u);
      i[g] || (ia(a, u), i[g] = !0);
    }
    return y.isArray(e) ? e.forEach(l) : l(e), this;
  }
};
te.accessor(["Content-Type", "Content-Length", "Accept", "Accept-Encoding", "User-Agent", "Authorization"]);
y.reduceDescriptors(te.prototype, ({ value: r }, e) => {
  let n = e[0].toUpperCase() + e.slice(1);
  return {
    get: () => r,
    set(i) {
      this[n] = i;
    }
  };
});
y.freezeMethods(te);
function xt(r, e) {
  const n = this || Ie, i = e || n, a = te.from(i.headers);
  let l = i.data;
  return y.forEach(r, function(g) {
    l = g.call(n, l, a.normalize(), e ? e.status : void 0);
  }), a.normalize(), l;
}
function gr(r) {
  return !!(r && r.__CANCEL__);
}
function Te(r, e, n) {
  D.call(this, r ?? "canceled", D.ERR_CANCELED, e, n), this.name = "CanceledError";
}
y.inherits(Te, D, {
  __CANCEL__: !0
});
function vr(r, e, n) {
  const i = n.config.validateStatus;
  !n.status || !i || i(n.status) ? r(n) : e(new D(
    "Request failed with status code " + n.status,
    [D.ERR_BAD_REQUEST, D.ERR_BAD_RESPONSE][Math.floor(n.status / 100) - 4],
    n.config,
    n.request,
    n
  ));
}
function oa(r) {
  const e = /^([-+\w]{1,25})(:?\/\/|:)/.exec(r);
  return e && e[1] || "";
}
function aa(r, e) {
  r = r || 10;
  const n = new Array(r), i = new Array(r);
  let a = 0, l = 0, u;
  return e = e !== void 0 ? e : 1e3, function(C) {
    const T = Date.now(), p = i[l];
    u || (u = T), n[a] = C, i[a] = T;
    let _ = l, S = 0;
    for (; _ !== a; )
      S += n[_++], _ = _ % r;
    if (a = (a + 1) % r, a === l && (l = (l + 1) % r), T - u < e)
      return;
    const w = p && T - p;
    return w ? Math.round(S * 1e3 / w) : void 0;
  };
}
function ca(r, e) {
  let n = 0, i = 1e3 / e, a, l;
  const u = (T, p = Date.now()) => {
    n = p, a = null, l && (clearTimeout(l), l = null), r.apply(null, T);
  };
  return [(...T) => {
    const p = Date.now(), _ = p - n;
    _ >= i ? u(T, p) : (a = T, l || (l = setTimeout(() => {
      l = null, u(a);
    }, i - _)));
  }, () => a && u(a)];
}
const Ye = (r, e, n = 3) => {
  let i = 0;
  const a = aa(50, 250);
  return ca((l) => {
    const u = l.loaded, g = l.lengthComputable ? l.total : void 0, C = u - i, T = a(C), p = u <= g;
    i = u;
    const _ = {
      loaded: u,
      total: g,
      progress: g ? u / g : void 0,
      bytes: C,
      rate: T || void 0,
      estimated: T && g && p ? (g - u) / T : void 0,
      event: l,
      lengthComputable: g != null,
      [e ? "download" : "upload"]: !0
    };
    r(_);
  }, n);
}, En = (r, e) => {
  const n = r != null;
  return [(i) => e[0]({
    lengthComputable: n,
    total: r,
    loaded: i
  }), e[1]];
}, kn = (r) => (...e) => y.asap(() => r(...e)), ua = G.hasStandardBrowserEnv ? /* @__PURE__ */ ((r, e) => (n) => (n = new URL(n, G.origin), r.protocol === n.protocol && r.host === n.host && (e || r.port === n.port)))(
  new URL(G.origin),
  G.navigator && /(msie|trident)/i.test(G.navigator.userAgent)
) : () => !0, la = G.hasStandardBrowserEnv ? (
  // Standard browser envs support document.cookie
  {
    write(r, e, n, i, a, l) {
      const u = [r + "=" + encodeURIComponent(e)];
      y.isNumber(n) && u.push("expires=" + new Date(n).toGMTString()), y.isString(i) && u.push("path=" + i), y.isString(a) && u.push("domain=" + a), l === !0 && u.push("secure"), document.cookie = u.join("; ");
    },
    read(r) {
      const e = document.cookie.match(new RegExp("(^|;\\s*)(" + r + ")=([^;]*)"));
      return e ? decodeURIComponent(e[3]) : null;
    },
    remove(r) {
      this.write(r, "", Date.now() - 864e5);
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
function ha(r) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(r);
}
function da(r, e) {
  return e ? r.replace(/\/?\/$/, "") + "/" + e.replace(/^\/+/, "") : r;
}
function br(r, e, n) {
  let i = !ha(e);
  return r && (i || n == !1) ? da(r, e) : e;
}
const Rn = (r) => r instanceof te ? { ...r } : r;
function _e(r, e) {
  e = e || {};
  const n = {};
  function i(T, p, _, S) {
    return y.isPlainObject(T) && y.isPlainObject(p) ? y.merge.call({ caseless: S }, T, p) : y.isPlainObject(p) ? y.merge({}, p) : y.isArray(p) ? p.slice() : p;
  }
  function a(T, p, _, S) {
    if (y.isUndefined(p)) {
      if (!y.isUndefined(T))
        return i(void 0, T, _, S);
    } else return i(T, p, _, S);
  }
  function l(T, p) {
    if (!y.isUndefined(p))
      return i(void 0, p);
  }
  function u(T, p) {
    if (y.isUndefined(p)) {
      if (!y.isUndefined(T))
        return i(void 0, T);
    } else return i(void 0, p);
  }
  function g(T, p, _) {
    if (_ in e)
      return i(T, p);
    if (_ in r)
      return i(void 0, T);
  }
  const C = {
    url: l,
    method: l,
    data: l,
    baseURL: u,
    transformRequest: u,
    transformResponse: u,
    paramsSerializer: u,
    timeout: u,
    timeoutMessage: u,
    withCredentials: u,
    withXSRFToken: u,
    adapter: u,
    responseType: u,
    xsrfCookieName: u,
    xsrfHeaderName: u,
    onUploadProgress: u,
    onDownloadProgress: u,
    decompress: u,
    maxContentLength: u,
    maxBodyLength: u,
    beforeRedirect: u,
    transport: u,
    httpAgent: u,
    httpsAgent: u,
    cancelToken: u,
    socketPath: u,
    responseEncoding: u,
    validateStatus: g,
    headers: (T, p, _) => a(Rn(T), Rn(p), _, !0)
  };
  return y.forEach(Object.keys(Object.assign({}, r, e)), function(p) {
    const _ = C[p] || a, S = _(r[p], e[p], p);
    y.isUndefined(S) && _ !== g || (n[p] = S);
  }), n;
}
const yr = (r) => {
  const e = _e({}, r);
  let { data: n, withXSRFToken: i, xsrfHeaderName: a, xsrfCookieName: l, headers: u, auth: g } = e;
  e.headers = u = te.from(u), e.url = fr(br(e.baseURL, e.url, e.allowAbsoluteUrls), r.params, r.paramsSerializer), g && u.set(
    "Authorization",
    "Basic " + btoa((g.username || "") + ":" + (g.password ? unescape(encodeURIComponent(g.password)) : ""))
  );
  let C;
  if (y.isFormData(n)) {
    if (G.hasStandardBrowserEnv || G.hasStandardBrowserWebWorkerEnv)
      u.setContentType(void 0);
    else if ((C = u.getContentType()) !== !1) {
      const [T, ...p] = C ? C.split(";").map((_) => _.trim()).filter(Boolean) : [];
      u.setContentType([T || "multipart/form-data", ...p].join("; "));
    }
  }
  if (G.hasStandardBrowserEnv && (i && y.isFunction(i) && (i = i(e)), i || i !== !1 && ua(e.url))) {
    const T = a && l && la.read(l);
    T && u.set(a, T);
  }
  return e;
}, fa = typeof XMLHttpRequest < "u", pa = fa && function(r) {
  return new Promise(function(n, i) {
    const a = yr(r);
    let l = a.data;
    const u = te.from(a.headers).normalize();
    let { responseType: g, onUploadProgress: C, onDownloadProgress: T } = a, p, _, S, w, v;
    function f() {
      w && w(), v && v(), a.cancelToken && a.cancelToken.unsubscribe(p), a.signal && a.signal.removeEventListener("abort", p);
    }
    let h = new XMLHttpRequest();
    h.open(a.method.toUpperCase(), a.url, !0), h.timeout = a.timeout;
    function m() {
      if (!h)
        return;
      const E = te.from(
        "getAllResponseHeaders" in h && h.getAllResponseHeaders()
      ), R = {
        data: !g || g === "text" || g === "json" ? h.responseText : h.response,
        status: h.status,
        statusText: h.statusText,
        headers: E,
        config: r,
        request: h
      };
      vr(function(N) {
        n(N), f();
      }, function(N) {
        i(N), f();
      }, R), h = null;
    }
    "onloadend" in h ? h.onloadend = m : h.onreadystatechange = function() {
      !h || h.readyState !== 4 || h.status === 0 && !(h.responseURL && h.responseURL.indexOf("file:") === 0) || setTimeout(m);
    }, h.onabort = function() {
      h && (i(new D("Request aborted", D.ECONNABORTED, r, h)), h = null);
    }, h.onerror = function() {
      i(new D("Network Error", D.ERR_NETWORK, r, h)), h = null;
    }, h.ontimeout = function() {
      let k = a.timeout ? "timeout of " + a.timeout + "ms exceeded" : "timeout exceeded";
      const R = a.transitional || pr;
      a.timeoutErrorMessage && (k = a.timeoutErrorMessage), i(new D(
        k,
        R.clarifyTimeoutError ? D.ETIMEDOUT : D.ECONNABORTED,
        r,
        h
      )), h = null;
    }, l === void 0 && u.setContentType(null), "setRequestHeader" in h && y.forEach(u.toJSON(), function(k, R) {
      h.setRequestHeader(R, k);
    }), y.isUndefined(a.withCredentials) || (h.withCredentials = !!a.withCredentials), g && g !== "json" && (h.responseType = a.responseType), T && ([S, v] = Ye(T, !0), h.addEventListener("progress", S)), C && h.upload && ([_, w] = Ye(C), h.upload.addEventListener("progress", _), h.upload.addEventListener("loadend", w)), (a.cancelToken || a.signal) && (p = (E) => {
      h && (i(!E || E.type ? new Te(null, r, h) : E), h.abort(), h = null);
    }, a.cancelToken && a.cancelToken.subscribe(p), a.signal && (a.signal.aborted ? p() : a.signal.addEventListener("abort", p)));
    const b = oa(a.url);
    if (b && G.protocols.indexOf(b) === -1) {
      i(new D("Unsupported protocol " + b + ":", D.ERR_BAD_REQUEST, r));
      return;
    }
    h.send(l || null);
  });
}, ma = (r, e) => {
  const { length: n } = r = r ? r.filter(Boolean) : [];
  if (e || n) {
    let i = new AbortController(), a;
    const l = function(T) {
      if (!a) {
        a = !0, g();
        const p = T instanceof Error ? T : this.reason;
        i.abort(p instanceof D ? p : new Te(p instanceof Error ? p.message : p));
      }
    };
    let u = e && setTimeout(() => {
      u = null, l(new D(`timeout ${e} of ms exceeded`, D.ETIMEDOUT));
    }, e);
    const g = () => {
      r && (u && clearTimeout(u), u = null, r.forEach((T) => {
        T.unsubscribe ? T.unsubscribe(l) : T.removeEventListener("abort", l);
      }), r = null);
    };
    r.forEach((T) => T.addEventListener("abort", l));
    const { signal: C } = i;
    return C.unsubscribe = () => y.asap(g), C;
  }
}, ga = function* (r, e) {
  let n = r.byteLength;
  if (n < e) {
    yield r;
    return;
  }
  let i = 0, a;
  for (; i < n; )
    a = i + e, yield r.slice(i, a), i = a;
}, va = async function* (r, e) {
  for await (const n of ba(r))
    yield* ga(n, e);
}, ba = async function* (r) {
  if (r[Symbol.asyncIterator]) {
    yield* r;
    return;
  }
  const e = r.getReader();
  try {
    for (; ; ) {
      const { done: n, value: i } = await e.read();
      if (n)
        break;
      yield i;
    }
  } finally {
    await e.cancel();
  }
}, On = (r, e, n, i) => {
  const a = va(r, e);
  let l = 0, u, g = (C) => {
    u || (u = !0, i && i(C));
  };
  return new ReadableStream({
    async pull(C) {
      try {
        const { done: T, value: p } = await a.next();
        if (T) {
          g(), C.close();
          return;
        }
        let _ = p.byteLength;
        if (n) {
          let S = l += _;
          n(S);
        }
        C.enqueue(new Uint8Array(p));
      } catch (T) {
        throw g(T), T;
      }
    },
    cancel(C) {
      return g(C), a.return();
    }
  }, {
    highWaterMark: 2
  });
}, ot = typeof fetch == "function" && typeof Request == "function" && typeof Response == "function", wr = ot && typeof ReadableStream == "function", ya = ot && (typeof TextEncoder == "function" ? /* @__PURE__ */ ((r) => (e) => r.encode(e))(new TextEncoder()) : async (r) => new Uint8Array(await new Response(r).arrayBuffer())), _r = (r, ...e) => {
  try {
    return !!r(...e);
  } catch {
    return !1;
  }
}, wa = wr && _r(() => {
  let r = !1;
  const e = new Request(G.origin, {
    body: new ReadableStream(),
    method: "POST",
    get duplex() {
      return r = !0, "half";
    }
  }).headers.has("Content-Type");
  return r && !e;
}), Pn = 64 * 1024, Ut = wr && _r(() => y.isReadableStream(new Response("").body)), et = {
  stream: Ut && ((r) => r.body)
};
ot && ((r) => {
  ["text", "arrayBuffer", "blob", "formData", "stream"].forEach((e) => {
    !et[e] && (et[e] = y.isFunction(r[e]) ? (n) => n[e]() : (n, i) => {
      throw new D(`Response type '${e}' is not supported`, D.ERR_NOT_SUPPORT, i);
    });
  });
})(new Response());
const _a = async (r) => {
  if (r == null)
    return 0;
  if (y.isBlob(r))
    return r.size;
  if (y.isSpecCompliantForm(r))
    return (await new Request(G.origin, {
      method: "POST",
      body: r
    }).arrayBuffer()).byteLength;
  if (y.isArrayBufferView(r) || y.isArrayBuffer(r))
    return r.byteLength;
  if (y.isURLSearchParams(r) && (r = r + ""), y.isString(r))
    return (await ya(r)).byteLength;
}, Sa = async (r, e) => {
  const n = y.toFiniteNumber(r.getContentLength());
  return n ?? _a(e);
}, Ca = ot && (async (r) => {
  let {
    url: e,
    method: n,
    data: i,
    signal: a,
    cancelToken: l,
    timeout: u,
    onDownloadProgress: g,
    onUploadProgress: C,
    responseType: T,
    headers: p,
    withCredentials: _ = "same-origin",
    fetchOptions: S
  } = yr(r);
  T = T ? (T + "").toLowerCase() : "text";
  let w = ma([a, l && l.toAbortSignal()], u), v;
  const f = w && w.unsubscribe && (() => {
    w.unsubscribe();
  });
  let h;
  try {
    if (C && wa && n !== "get" && n !== "head" && (h = await Sa(p, i)) !== 0) {
      let R = new Request(e, {
        method: "POST",
        body: i,
        duplex: "half"
      }), P;
      if (y.isFormData(i) && (P = R.headers.get("content-type")) && p.setContentType(P), R.body) {
        const [N, A] = En(
          h,
          Ye(kn(C))
        );
        i = On(R.body, Pn, N, A);
      }
    }
    y.isString(_) || (_ = _ ? "include" : "omit");
    const m = "credentials" in Request.prototype;
    v = new Request(e, {
      ...S,
      signal: w,
      method: n.toUpperCase(),
      headers: p.normalize().toJSON(),
      body: i,
      duplex: "half",
      credentials: m ? _ : void 0
    });
    let b = await fetch(v);
    const E = Ut && (T === "stream" || T === "response");
    if (Ut && (g || E && f)) {
      const R = {};
      ["status", "statusText", "headers"].forEach((I) => {
        R[I] = b[I];
      });
      const P = y.toFiniteNumber(b.headers.get("content-length")), [N, A] = g && En(
        P,
        Ye(kn(g), !0)
      ) || [];
      b = new Response(
        On(b.body, Pn, N, () => {
          A && A(), f && f();
        }),
        R
      );
    }
    T = T || "text";
    let k = await et[y.findKey(et, T) || "text"](b, r);
    return !E && f && f(), await new Promise((R, P) => {
      vr(R, P, {
        data: k,
        headers: te.from(b.headers),
        status: b.status,
        statusText: b.statusText,
        config: r,
        request: v
      });
    });
  } catch (m) {
    throw f && f(), m && m.name === "TypeError" && /Load failed|fetch/i.test(m.message) ? Object.assign(
      new D("Network Error", D.ERR_NETWORK, r, v),
      {
        cause: m.cause || m
      }
    ) : D.from(m, m && m.code, r, v);
  }
}), Dt = {
  http: Fo,
  xhr: pa,
  fetch: Ca
};
y.forEach(Dt, (r, e) => {
  if (r) {
    try {
      Object.defineProperty(r, "name", { value: e });
    } catch {
    }
    Object.defineProperty(r, "adapterName", { value: e });
  }
});
const An = (r) => `- ${r}`, xa = (r) => y.isFunction(r) || r === null || r === !1, Sr = {
  getAdapter: (r) => {
    r = y.isArray(r) ? r : [r];
    const { length: e } = r;
    let n, i;
    const a = {};
    for (let l = 0; l < e; l++) {
      n = r[l];
      let u;
      if (i = n, !xa(n) && (i = Dt[(u = String(n)).toLowerCase()], i === void 0))
        throw new D(`Unknown adapter '${u}'`);
      if (i)
        break;
      a[u || "#" + l] = i;
    }
    if (!i) {
      const l = Object.entries(a).map(
        ([g, C]) => `adapter ${g} ` + (C === !1 ? "is not supported by the environment" : "is not available in the build")
      );
      let u = e ? l.length > 1 ? `since :
` + l.map(An).join(`
`) : " " + An(l[0]) : "as no adapter specified";
      throw new D(
        "There is no suitable adapter to dispatch the request " + u,
        "ERR_NOT_SUPPORT"
      );
    }
    return i;
  },
  adapters: Dt
};
function Tt(r) {
  if (r.cancelToken && r.cancelToken.throwIfRequested(), r.signal && r.signal.aborted)
    throw new Te(null, r);
}
function Ln(r) {
  return Tt(r), r.headers = te.from(r.headers), r.data = xt.call(
    r,
    r.transformRequest
  ), ["post", "put", "patch"].indexOf(r.method) !== -1 && r.headers.setContentType("application/x-www-form-urlencoded", !1), Sr.getAdapter(r.adapter || Ie.adapter)(r).then(function(i) {
    return Tt(r), i.data = xt.call(
      r,
      r.transformResponse,
      i
    ), i.headers = te.from(i.headers), i;
  }, function(i) {
    return gr(i) || (Tt(r), i && i.response && (i.response.data = xt.call(
      r,
      r.transformResponse,
      i.response
    ), i.response.headers = te.from(i.response.headers))), Promise.reject(i);
  });
}
const Cr = "1.9.0", at = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach((r, e) => {
  at[r] = function(i) {
    return typeof i === r || "a" + (e < 1 ? "n " : " ") + r;
  };
});
const Nn = {};
at.transitional = function(e, n, i) {
  function a(l, u) {
    return "[Axios v" + Cr + "] Transitional option '" + l + "'" + u + (i ? ". " + i : "");
  }
  return (l, u, g) => {
    if (e === !1)
      throw new D(
        a(u, " has been removed" + (n ? " in " + n : "")),
        D.ERR_DEPRECATED
      );
    return n && !Nn[u] && (Nn[u] = !0, console.warn(
      a(
        u,
        " has been deprecated since v" + n + " and will be removed in the near future"
      )
    )), e ? e(l, u, g) : !0;
  };
};
at.spelling = function(e) {
  return (n, i) => (console.warn(`${i} is likely a misspelling of ${e}`), !0);
};
function Ta(r, e, n) {
  if (typeof r != "object")
    throw new D("options must be an object", D.ERR_BAD_OPTION_VALUE);
  const i = Object.keys(r);
  let a = i.length;
  for (; a-- > 0; ) {
    const l = i[a], u = e[l];
    if (u) {
      const g = r[l], C = g === void 0 || u(g, l, r);
      if (C !== !0)
        throw new D("option " + l + " must be " + C, D.ERR_BAD_OPTION_VALUE);
      continue;
    }
    if (n !== !0)
      throw new D("Unknown option " + l, D.ERR_BAD_OPTION);
  }
}
const Ge = {
  assertOptions: Ta,
  validators: at
}, oe = Ge.validators;
let we = class {
  constructor(e) {
    this.defaults = e || {}, this.interceptors = {
      request: new xn(),
      response: new xn()
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
  async request(e, n) {
    try {
      return await this._request(e, n);
    } catch (i) {
      if (i instanceof Error) {
        let a = {};
        Error.captureStackTrace ? Error.captureStackTrace(a) : a = new Error();
        const l = a.stack ? a.stack.replace(/^.+\n/, "") : "";
        try {
          i.stack ? l && !String(i.stack).endsWith(l.replace(/^.+\n.+\n/, "")) && (i.stack += `
` + l) : i.stack = l;
        } catch {
        }
      }
      throw i;
    }
  }
  _request(e, n) {
    typeof e == "string" ? (n = n || {}, n.url = e) : n = e || {}, n = _e(this.defaults, n);
    const { transitional: i, paramsSerializer: a, headers: l } = n;
    i !== void 0 && Ge.assertOptions(i, {
      silentJSONParsing: oe.transitional(oe.boolean),
      forcedJSONParsing: oe.transitional(oe.boolean),
      clarifyTimeoutError: oe.transitional(oe.boolean)
    }, !1), a != null && (y.isFunction(a) ? n.paramsSerializer = {
      serialize: a
    } : Ge.assertOptions(a, {
      encode: oe.function,
      serialize: oe.function
    }, !0)), n.allowAbsoluteUrls !== void 0 || (this.defaults.allowAbsoluteUrls !== void 0 ? n.allowAbsoluteUrls = this.defaults.allowAbsoluteUrls : n.allowAbsoluteUrls = !0), Ge.assertOptions(n, {
      baseUrl: oe.spelling("baseURL"),
      withXsrfToken: oe.spelling("withXSRFToken")
    }, !0), n.method = (n.method || this.defaults.method || "get").toLowerCase();
    let u = l && y.merge(
      l.common,
      l[n.method]
    );
    l && y.forEach(
      ["delete", "get", "head", "post", "put", "patch", "common"],
      (v) => {
        delete l[v];
      }
    ), n.headers = te.concat(u, l);
    const g = [];
    let C = !0;
    this.interceptors.request.forEach(function(f) {
      typeof f.runWhen == "function" && f.runWhen(n) === !1 || (C = C && f.synchronous, g.unshift(f.fulfilled, f.rejected));
    });
    const T = [];
    this.interceptors.response.forEach(function(f) {
      T.push(f.fulfilled, f.rejected);
    });
    let p, _ = 0, S;
    if (!C) {
      const v = [Ln.bind(this), void 0];
      for (v.unshift.apply(v, g), v.push.apply(v, T), S = v.length, p = Promise.resolve(n); _ < S; )
        p = p.then(v[_++], v[_++]);
      return p;
    }
    S = g.length;
    let w = n;
    for (_ = 0; _ < S; ) {
      const v = g[_++], f = g[_++];
      try {
        w = v(w);
      } catch (h) {
        f.call(this, h);
        break;
      }
    }
    try {
      p = Ln.call(this, w);
    } catch (v) {
      return Promise.reject(v);
    }
    for (_ = 0, S = T.length; _ < S; )
      p = p.then(T[_++], T[_++]);
    return p;
  }
  getUri(e) {
    e = _e(this.defaults, e);
    const n = br(e.baseURL, e.url, e.allowAbsoluteUrls);
    return fr(n, e.params, e.paramsSerializer);
  }
};
y.forEach(["delete", "get", "head", "options"], function(e) {
  we.prototype[e] = function(n, i) {
    return this.request(_e(i || {}, {
      method: e,
      url: n,
      data: (i || {}).data
    }));
  };
});
y.forEach(["post", "put", "patch"], function(e) {
  function n(i) {
    return function(l, u, g) {
      return this.request(_e(g || {}, {
        method: e,
        headers: i ? {
          "Content-Type": "multipart/form-data"
        } : {},
        url: l,
        data: u
      }));
    };
  }
  we.prototype[e] = n(), we.prototype[e + "Form"] = n(!0);
});
let Ea = class xr {
  constructor(e) {
    if (typeof e != "function")
      throw new TypeError("executor must be a function.");
    let n;
    this.promise = new Promise(function(l) {
      n = l;
    });
    const i = this;
    this.promise.then((a) => {
      if (!i._listeners) return;
      let l = i._listeners.length;
      for (; l-- > 0; )
        i._listeners[l](a);
      i._listeners = null;
    }), this.promise.then = (a) => {
      let l;
      const u = new Promise((g) => {
        i.subscribe(g), l = g;
      }).then(a);
      return u.cancel = function() {
        i.unsubscribe(l);
      }, u;
    }, e(function(l, u, g) {
      i.reason || (i.reason = new Te(l, u, g), n(i.reason));
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
    const n = this._listeners.indexOf(e);
    n !== -1 && this._listeners.splice(n, 1);
  }
  toAbortSignal() {
    const e = new AbortController(), n = (i) => {
      e.abort(i);
    };
    return this.subscribe(n), e.signal.unsubscribe = () => this.unsubscribe(n), e.signal;
  }
  /**
   * Returns an object that contains a new `CancelToken` and a function that, when called,
   * cancels the `CancelToken`.
   */
  static source() {
    let e;
    return {
      token: new xr(function(a) {
        e = a;
      }),
      cancel: e
    };
  }
};
function ka(r) {
  return function(n) {
    return r.apply(null, n);
  };
}
function Ra(r) {
  return y.isObject(r) && r.isAxiosError === !0;
}
const It = {
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
Object.entries(It).forEach(([r, e]) => {
  It[e] = r;
});
function Tr(r) {
  const e = new we(r), n = tr(we.prototype.request, e);
  return y.extend(n, we.prototype, e, { allOwnKeys: !0 }), y.extend(n, e, null, { allOwnKeys: !0 }), n.create = function(a) {
    return Tr(_e(r, a));
  }, n;
}
const H = Tr(Ie);
H.Axios = we;
H.CanceledError = Te;
H.CancelToken = Ea;
H.isCancel = gr;
H.VERSION = Cr;
H.toFormData = it;
H.AxiosError = D;
H.Cancel = H.CanceledError;
H.all = function(e) {
  return Promise.all(e);
};
H.spread = ka;
H.isAxiosError = Ra;
H.mergeConfig = _e;
H.AxiosHeaders = te;
H.formToJSON = (r) => mr(y.isHTMLForm(r) ? new FormData(r) : r);
H.getAdapter = Sr.getAdapter;
H.HttpStatusCode = It;
H.default = H;
const {
  Axios: ic,
  AxiosError: oc,
  CanceledError: ac,
  isCancel: cc,
  CancelToken: uc,
  VERSION: lc,
  all: hc,
  Cancel: dc,
  isAxiosError: fc,
  spread: pc,
  toFormData: mc,
  AxiosHeaders: gc,
  HttpStatusCode: vc,
  formToJSON: bc,
  getAdapter: yc,
  mergeConfig: wc
} = H;
var Et, jn;
function Jt() {
  if (jn) return Et;
  jn = 1;
  var r = String.prototype.replace, e = /%20/g, n = {
    RFC1738: "RFC1738",
    RFC3986: "RFC3986"
  };
  return Et = {
    default: n.RFC3986,
    formatters: {
      RFC1738: function(i) {
        return r.call(i, e, "+");
      },
      RFC3986: function(i) {
        return String(i);
      }
    },
    RFC1738: n.RFC1738,
    RFC3986: n.RFC3986
  }, Et;
}
var kt, Un;
function Er() {
  if (Un) return kt;
  Un = 1;
  var r = Jt(), e = Object.prototype.hasOwnProperty, n = Array.isArray, i = function() {
    for (var f = [], h = 0; h < 256; ++h)
      f.push("%" + ((h < 16 ? "0" : "") + h.toString(16)).toUpperCase());
    return f;
  }(), a = function(h) {
    for (; h.length > 1; ) {
      var m = h.pop(), b = m.obj[m.prop];
      if (n(b)) {
        for (var E = [], k = 0; k < b.length; ++k)
          typeof b[k] < "u" && E.push(b[k]);
        m.obj[m.prop] = E;
      }
    }
  }, l = function(h, m) {
    for (var b = m && m.plainObjects ? /* @__PURE__ */ Object.create(null) : {}, E = 0; E < h.length; ++E)
      typeof h[E] < "u" && (b[E] = h[E]);
    return b;
  }, u = function f(h, m, b) {
    if (!m)
      return h;
    if (typeof m != "object") {
      if (n(h))
        h.push(m);
      else if (h && typeof h == "object")
        (b && (b.plainObjects || b.allowPrototypes) || !e.call(Object.prototype, m)) && (h[m] = !0);
      else
        return [h, m];
      return h;
    }
    if (!h || typeof h != "object")
      return [h].concat(m);
    var E = h;
    return n(h) && !n(m) && (E = l(h, b)), n(h) && n(m) ? (m.forEach(function(k, R) {
      if (e.call(h, R)) {
        var P = h[R];
        P && typeof P == "object" && k && typeof k == "object" ? h[R] = f(P, k, b) : h.push(k);
      } else
        h[R] = k;
    }), h) : Object.keys(m).reduce(function(k, R) {
      var P = m[R];
      return e.call(k, R) ? k[R] = f(k[R], P, b) : k[R] = P, k;
    }, E);
  }, g = function(h, m) {
    return Object.keys(m).reduce(function(b, E) {
      return b[E] = m[E], b;
    }, h);
  }, C = function(f, h, m) {
    var b = f.replace(/\+/g, " ");
    if (m === "iso-8859-1")
      return b.replace(/%[0-9a-f]{2}/gi, unescape);
    try {
      return decodeURIComponent(b);
    } catch {
      return b;
    }
  }, T = function(h, m, b, E, k) {
    if (h.length === 0)
      return h;
    var R = h;
    if (typeof h == "symbol" ? R = Symbol.prototype.toString.call(h) : typeof h != "string" && (R = String(h)), b === "iso-8859-1")
      return escape(R).replace(/%u[0-9a-f]{4}/gi, function(I) {
        return "%26%23" + parseInt(I.slice(2), 16) + "%3B";
      });
    for (var P = "", N = 0; N < R.length; ++N) {
      var A = R.charCodeAt(N);
      if (A === 45 || A === 46 || A === 95 || A === 126 || A >= 48 && A <= 57 || A >= 65 && A <= 90 || A >= 97 && A <= 122 || k === r.RFC1738 && (A === 40 || A === 41)) {
        P += R.charAt(N);
        continue;
      }
      if (A < 128) {
        P = P + i[A];
        continue;
      }
      if (A < 2048) {
        P = P + (i[192 | A >> 6] + i[128 | A & 63]);
        continue;
      }
      if (A < 55296 || A >= 57344) {
        P = P + (i[224 | A >> 12] + i[128 | A >> 6 & 63] + i[128 | A & 63]);
        continue;
      }
      N += 1, A = 65536 + ((A & 1023) << 10 | R.charCodeAt(N) & 1023), P += i[240 | A >> 18] + i[128 | A >> 12 & 63] + i[128 | A >> 6 & 63] + i[128 | A & 63];
    }
    return P;
  }, p = function(h) {
    for (var m = [{ obj: { o: h }, prop: "o" }], b = [], E = 0; E < m.length; ++E)
      for (var k = m[E], R = k.obj[k.prop], P = Object.keys(R), N = 0; N < P.length; ++N) {
        var A = P[N], I = R[A];
        typeof I == "object" && I !== null && b.indexOf(I) === -1 && (m.push({ obj: R, prop: A }), b.push(I));
      }
    return a(m), h;
  }, _ = function(h) {
    return Object.prototype.toString.call(h) === "[object RegExp]";
  }, S = function(h) {
    return !h || typeof h != "object" ? !1 : !!(h.constructor && h.constructor.isBuffer && h.constructor.isBuffer(h));
  }, w = function(h, m) {
    return [].concat(h, m);
  }, v = function(h, m) {
    if (n(h)) {
      for (var b = [], E = 0; E < h.length; E += 1)
        b.push(m(h[E]));
      return b;
    }
    return m(h);
  };
  return kt = {
    arrayToObject: l,
    assign: g,
    combine: w,
    compact: p,
    decode: C,
    encode: T,
    isBuffer: S,
    isRegExp: _,
    maybeMap: v,
    merge: u
  }, kt;
}
var Rt, Dn;
function Oa() {
  if (Dn) return Rt;
  Dn = 1;
  var r = Er(), e = Jt(), n = Object.prototype.hasOwnProperty, i = {
    brackets: function(f) {
      return f + "[]";
    },
    comma: "comma",
    indices: function(f, h) {
      return f + "[" + h + "]";
    },
    repeat: function(f) {
      return f;
    }
  }, a = Array.isArray, l = String.prototype.split, u = Array.prototype.push, g = function(v, f) {
    u.apply(v, a(f) ? f : [f]);
  }, C = Date.prototype.toISOString, T = e.default, p = {
    addQueryPrefix: !1,
    allowDots: !1,
    charset: "utf-8",
    charsetSentinel: !1,
    delimiter: "&",
    encode: !0,
    encoder: r.encode,
    encodeValuesOnly: !1,
    format: T,
    formatter: e.formatters[T],
    // deprecated
    indices: !1,
    serializeDate: function(f) {
      return C.call(f);
    },
    skipNulls: !1,
    strictNullHandling: !1
  }, _ = function(f) {
    return typeof f == "string" || typeof f == "number" || typeof f == "boolean" || typeof f == "symbol" || typeof f == "bigint";
  }, S = function v(f, h, m, b, E, k, R, P, N, A, I, F, fe, re) {
    var $ = f;
    if (typeof R == "function" ? $ = R(h, $) : $ instanceof Date ? $ = A($) : m === "comma" && a($) && ($ = r.maybeMap($, function(X) {
      return X instanceof Date ? A(X) : X;
    })), $ === null) {
      if (b)
        return k && !fe ? k(h, p.encoder, re, "key", I) : h;
      $ = "";
    }
    if (_($) || r.isBuffer($)) {
      if (k) {
        var Fe = fe ? h : k(h, p.encoder, re, "key", I);
        if (m === "comma" && fe) {
          for (var qe = l.call(String($), ","), Be = "", Se = 0; Se < qe.length; ++Se)
            Be += (Se === 0 ? "" : ",") + F(k(qe[Se], p.encoder, re, "value", I));
          return [F(Fe) + "=" + Be];
        }
        return [F(Fe) + "=" + F(k($, p.encoder, re, "value", I))];
      }
      return [F(h) + "=" + F(String($))];
    }
    var Ee = [];
    if (typeof $ > "u")
      return Ee;
    var pe;
    if (m === "comma" && a($))
      pe = [{ value: $.length > 0 ? $.join(",") || null : void 0 }];
    else if (a(R))
      pe = R;
    else {
      var Me = Object.keys($);
      pe = P ? Me.sort(P) : Me;
    }
    for (var ke = 0; ke < pe.length; ++ke) {
      var Z = pe[ke], $e = typeof Z == "object" && typeof Z.value < "u" ? Z.value : $[Z];
      if (!(E && $e === null)) {
        var ct = a($) ? typeof m == "function" ? m(h, Z) : h : h + (N ? "." + Z : "[" + Z + "]");
        g(Ee, v(
          $e,
          ct,
          m,
          b,
          E,
          k,
          R,
          P,
          N,
          A,
          I,
          F,
          fe,
          re
        ));
      }
    }
    return Ee;
  }, w = function(f) {
    if (!f)
      return p;
    if (f.encoder !== null && typeof f.encoder < "u" && typeof f.encoder != "function")
      throw new TypeError("Encoder has to be a function.");
    var h = f.charset || p.charset;
    if (typeof f.charset < "u" && f.charset !== "utf-8" && f.charset !== "iso-8859-1")
      throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
    var m = e.default;
    if (typeof f.format < "u") {
      if (!n.call(e.formatters, f.format))
        throw new TypeError("Unknown format option provided.");
      m = f.format;
    }
    var b = e.formatters[m], E = p.filter;
    return (typeof f.filter == "function" || a(f.filter)) && (E = f.filter), {
      addQueryPrefix: typeof f.addQueryPrefix == "boolean" ? f.addQueryPrefix : p.addQueryPrefix,
      allowDots: typeof f.allowDots > "u" ? p.allowDots : !!f.allowDots,
      charset: h,
      charsetSentinel: typeof f.charsetSentinel == "boolean" ? f.charsetSentinel : p.charsetSentinel,
      delimiter: typeof f.delimiter > "u" ? p.delimiter : f.delimiter,
      encode: typeof f.encode == "boolean" ? f.encode : p.encode,
      encoder: typeof f.encoder == "function" ? f.encoder : p.encoder,
      encodeValuesOnly: typeof f.encodeValuesOnly == "boolean" ? f.encodeValuesOnly : p.encodeValuesOnly,
      filter: E,
      format: m,
      formatter: b,
      serializeDate: typeof f.serializeDate == "function" ? f.serializeDate : p.serializeDate,
      skipNulls: typeof f.skipNulls == "boolean" ? f.skipNulls : p.skipNulls,
      sort: typeof f.sort == "function" ? f.sort : null,
      strictNullHandling: typeof f.strictNullHandling == "boolean" ? f.strictNullHandling : p.strictNullHandling
    };
  };
  return Rt = function(v, f) {
    var h = v, m = w(f), b, E;
    typeof m.filter == "function" ? (E = m.filter, h = E("", h)) : a(m.filter) && (E = m.filter, b = E);
    var k = [];
    if (typeof h != "object" || h === null)
      return "";
    var R;
    f && f.arrayFormat in i ? R = f.arrayFormat : f && "indices" in f ? R = f.indices ? "indices" : "repeat" : R = "indices";
    var P = i[R];
    b || (b = Object.keys(h)), m.sort && b.sort(m.sort);
    for (var N = 0; N < b.length; ++N) {
      var A = b[N];
      m.skipNulls && h[A] === null || g(k, S(
        h[A],
        A,
        P,
        m.strictNullHandling,
        m.skipNulls,
        m.encode ? m.encoder : null,
        m.filter,
        m.sort,
        m.allowDots,
        m.serializeDate,
        m.format,
        m.formatter,
        m.encodeValuesOnly,
        m.charset
      ));
    }
    var I = k.join(m.delimiter), F = m.addQueryPrefix === !0 ? "?" : "";
    return m.charsetSentinel && (m.charset === "iso-8859-1" ? F += "utf8=%26%2310003%3B&" : F += "utf8=%E2%9C%93&"), I.length > 0 ? F + I : "";
  }, Rt;
}
var Ot, In;
function Pa() {
  if (In) return Ot;
  In = 1;
  var r = Er(), e = Object.prototype.hasOwnProperty, n = Array.isArray, i = {
    allowDots: !1,
    allowPrototypes: !1,
    arrayLimit: 20,
    charset: "utf-8",
    charsetSentinel: !1,
    comma: !1,
    decoder: r.decode,
    delimiter: "&",
    depth: 5,
    ignoreQueryPrefix: !1,
    interpretNumericEntities: !1,
    parameterLimit: 1e3,
    parseArrays: !0,
    plainObjects: !1,
    strictNullHandling: !1
  }, a = function(S) {
    return S.replace(/&#(\d+);/g, function(w, v) {
      return String.fromCharCode(parseInt(v, 10));
    });
  }, l = function(S, w) {
    return S && typeof S == "string" && w.comma && S.indexOf(",") > -1 ? S.split(",") : S;
  }, u = "utf8=%26%2310003%3B", g = "utf8=%E2%9C%93", C = function(w, v) {
    var f = {}, h = v.ignoreQueryPrefix ? w.replace(/^\?/, "") : w, m = v.parameterLimit === 1 / 0 ? void 0 : v.parameterLimit, b = h.split(v.delimiter, m), E = -1, k, R = v.charset;
    if (v.charsetSentinel)
      for (k = 0; k < b.length; ++k)
        b[k].indexOf("utf8=") === 0 && (b[k] === g ? R = "utf-8" : b[k] === u && (R = "iso-8859-1"), E = k, k = b.length);
    for (k = 0; k < b.length; ++k)
      if (k !== E) {
        var P = b[k], N = P.indexOf("]="), A = N === -1 ? P.indexOf("=") : N + 1, I, F;
        A === -1 ? (I = v.decoder(P, i.decoder, R, "key"), F = v.strictNullHandling ? null : "") : (I = v.decoder(P.slice(0, A), i.decoder, R, "key"), F = r.maybeMap(
          l(P.slice(A + 1), v),
          function(fe) {
            return v.decoder(fe, i.decoder, R, "value");
          }
        )), F && v.interpretNumericEntities && R === "iso-8859-1" && (F = a(F)), P.indexOf("[]=") > -1 && (F = n(F) ? [F] : F), e.call(f, I) ? f[I] = r.combine(f[I], F) : f[I] = F;
      }
    return f;
  }, T = function(S, w, v, f) {
    for (var h = f ? w : l(w, v), m = S.length - 1; m >= 0; --m) {
      var b, E = S[m];
      if (E === "[]" && v.parseArrays)
        b = [].concat(h);
      else {
        b = v.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
        var k = E.charAt(0) === "[" && E.charAt(E.length - 1) === "]" ? E.slice(1, -1) : E, R = parseInt(k, 10);
        !v.parseArrays && k === "" ? b = { 0: h } : !isNaN(R) && E !== k && String(R) === k && R >= 0 && v.parseArrays && R <= v.arrayLimit ? (b = [], b[R] = h) : k !== "__proto__" && (b[k] = h);
      }
      h = b;
    }
    return h;
  }, p = function(w, v, f, h) {
    if (w) {
      var m = f.allowDots ? w.replace(/\.([^.[]+)/g, "[$1]") : w, b = /(\[[^[\]]*])/, E = /(\[[^[\]]*])/g, k = f.depth > 0 && b.exec(m), R = k ? m.slice(0, k.index) : m, P = [];
      if (R) {
        if (!f.plainObjects && e.call(Object.prototype, R) && !f.allowPrototypes)
          return;
        P.push(R);
      }
      for (var N = 0; f.depth > 0 && (k = E.exec(m)) !== null && N < f.depth; ) {
        if (N += 1, !f.plainObjects && e.call(Object.prototype, k[1].slice(1, -1)) && !f.allowPrototypes)
          return;
        P.push(k[1]);
      }
      return k && P.push("[" + m.slice(k.index) + "]"), T(P, v, f, h);
    }
  }, _ = function(w) {
    if (!w)
      return i;
    if (w.decoder !== null && w.decoder !== void 0 && typeof w.decoder != "function")
      throw new TypeError("Decoder has to be a function.");
    if (typeof w.charset < "u" && w.charset !== "utf-8" && w.charset !== "iso-8859-1")
      throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
    var v = typeof w.charset > "u" ? i.charset : w.charset;
    return {
      allowDots: typeof w.allowDots > "u" ? i.allowDots : !!w.allowDots,
      allowPrototypes: typeof w.allowPrototypes == "boolean" ? w.allowPrototypes : i.allowPrototypes,
      arrayLimit: typeof w.arrayLimit == "number" ? w.arrayLimit : i.arrayLimit,
      charset: v,
      charsetSentinel: typeof w.charsetSentinel == "boolean" ? w.charsetSentinel : i.charsetSentinel,
      comma: typeof w.comma == "boolean" ? w.comma : i.comma,
      decoder: typeof w.decoder == "function" ? w.decoder : i.decoder,
      delimiter: typeof w.delimiter == "string" || r.isRegExp(w.delimiter) ? w.delimiter : i.delimiter,
      // eslint-disable-next-line no-implicit-coercion, no-extra-parens
      depth: typeof w.depth == "number" || w.depth === !1 ? +w.depth : i.depth,
      ignoreQueryPrefix: w.ignoreQueryPrefix === !0,
      interpretNumericEntities: typeof w.interpretNumericEntities == "boolean" ? w.interpretNumericEntities : i.interpretNumericEntities,
      parameterLimit: typeof w.parameterLimit == "number" ? w.parameterLimit : i.parameterLimit,
      parseArrays: w.parseArrays !== !1,
      plainObjects: typeof w.plainObjects == "boolean" ? w.plainObjects : i.plainObjects,
      strictNullHandling: typeof w.strictNullHandling == "boolean" ? w.strictNullHandling : i.strictNullHandling
    };
  };
  return Ot = function(S, w) {
    var v = _(w);
    if (S === "" || S === null || typeof S > "u")
      return v.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
    for (var f = typeof S == "string" ? C(S, v) : S, h = v.plainObjects ? /* @__PURE__ */ Object.create(null) : {}, m = Object.keys(f), b = 0; b < m.length; ++b) {
      var E = m[b], k = p(E, f[E], v, typeof S == "string");
      h = r.merge(h, k, v);
    }
    return r.compact(h);
  }, Ot;
}
var Pt, Fn;
function Aa() {
  if (Fn) return Pt;
  Fn = 1;
  var r = Oa(), e = Pa(), n = Jt();
  return Pt = {
    formats: n,
    parse: e,
    stringify: r
  }, Pt;
}
var kr = Aa();
function ne() {
  return ne = Object.assign ? Object.assign.bind() : function(r) {
    for (var e = 1; e < arguments.length; e++) {
      var n = arguments[e];
      for (var i in n) ({}).hasOwnProperty.call(n, i) && (r[i] = n[i]);
    }
    return r;
  }, ne.apply(null, arguments);
}
class At {
  constructor(e, n, i) {
    var a, l;
    this.name = e, this.definition = n, this.bindings = (a = n.bindings) != null ? a : {}, this.wheres = (l = n.wheres) != null ? l : {}, this.config = i;
  }
  get template() {
    const e = `${this.origin}/${this.definition.uri}`.replace(/\/+$/, "");
    return e === "" ? "/" : e;
  }
  get origin() {
    return this.config.absolute ? this.definition.domain ? `${this.config.url.match(/^\w+:\/\//)[0]}${this.definition.domain}${this.config.port ? `:${this.config.port}` : ""}` : this.config.url : "";
  }
  get parameterSegments() {
    var e, n;
    return (e = (n = this.template.match(/{[^}?]+\??}/g)) == null ? void 0 : n.map((i) => ({ name: i.replace(/{|\??}/g, ""), required: !/\?}$/.test(i) }))) != null ? e : [];
  }
  matchesUrl(e) {
    var n;
    if (!this.definition.methods.includes("GET")) return !1;
    const i = this.template.replace(/[.*+$()[\]]/g, "\\$&").replace(/(\/?){([^}?]*)(\??)}/g, (g, C, T, p) => {
      var _;
      const S = `(?<${T}>${((_ = this.wheres[T]) == null ? void 0 : _.replace(/(^\^)|(\$$)/g, "")) || "[^/?]+"})`;
      return p ? `(${C}${S})?` : `${C}${S}`;
    }).replace(/^\w+:\/\//, ""), [a, l] = e.replace(/^\w+:\/\//, "").split("?"), u = (n = new RegExp(`^${i}/?$`).exec(a)) != null ? n : new RegExp(`^${i}/?$`).exec(decodeURI(a));
    if (u) {
      for (const g in u.groups) u.groups[g] = typeof u.groups[g] == "string" ? decodeURIComponent(u.groups[g]) : u.groups[g];
      return { params: u.groups, query: kr.parse(l) };
    }
    return !1;
  }
  compile(e) {
    return this.parameterSegments.length ? this.template.replace(/{([^}?]+)(\??)}/g, (n, i, a) => {
      var l, u;
      if (!a && [null, void 0].includes(e[i])) throw new Error(`Ziggy error: '${i}' parameter is required for route '${this.name}'.`);
      if (this.wheres[i] && !new RegExp(`^${a ? `(${this.wheres[i]})?` : this.wheres[i]}$`).test((u = e[i]) != null ? u : "")) throw new Error(`Ziggy error: '${i}' parameter '${e[i]}' does not match required format '${this.wheres[i]}' for route '${this.name}'.`);
      return encodeURI((l = e[i]) != null ? l : "").replace(/%7C/g, "|").replace(/%25/g, "%").replace(/\$/g, "%24");
    }).replace(this.config.absolute ? /(\.[^/]+?)(\/\/)/ : /(^)(\/\/)/, "$1/").replace(/\/+$/, "") : this.template;
  }
}
class La extends String {
  constructor(e, n, i = !0, a) {
    if (super(), this.t = a ?? (typeof Ziggy < "u" ? Ziggy : globalThis == null ? void 0 : globalThis.Ziggy), this.t = ne({}, this.t, { absolute: i }), e) {
      if (!this.t.routes[e]) throw new Error(`Ziggy error: route '${e}' is not in the route list.`);
      this.i = new At(e, this.t.routes[e], this.t), this.o = this.u(n);
    }
  }
  toString() {
    const e = Object.keys(this.o).filter((n) => !this.i.parameterSegments.some(({ name: i }) => i === n)).filter((n) => n !== "_query").reduce((n, i) => ne({}, n, { [i]: this.o[i] }), {});
    return this.i.compile(this.o) + kr.stringify(ne({}, e, this.o._query), { addQueryPrefix: !0, arrayFormat: "indices", encodeValuesOnly: !0, skipNulls: !0, encoder: (n, i) => typeof n == "boolean" ? Number(n) : i(n) });
  }
  h(e) {
    e ? this.t.absolute && e.startsWith("/") && (e = this.l().host + e) : e = this.m();
    let n = {};
    const [i, a] = Object.entries(this.t.routes).find(([l, u]) => n = new At(l, u, this.t).matchesUrl(e)) || [void 0, void 0];
    return ne({ name: i }, n, { route: a });
  }
  m() {
    const { host: e, pathname: n, search: i } = this.l();
    return (this.t.absolute ? e + n : n.replace(this.t.url.replace(/^\w*:\/\/[^/]+/, ""), "").replace(/^\/+/, "/")) + i;
  }
  current(e, n) {
    const { name: i, params: a, query: l, route: u } = this.h();
    if (!e) return i;
    const g = new RegExp(`^${e.replace(/\./g, "\\.").replace(/\*/g, ".*")}$`).test(i);
    if ([null, void 0].includes(n) || !g) return g;
    const C = new At(i, u, this.t);
    n = this.u(n, C);
    const T = ne({}, a, l);
    if (Object.values(n).every((_) => !_) && !Object.values(T).some((_) => _ !== void 0)) return !0;
    const p = (_, S) => Object.entries(_).every(([w, v]) => Array.isArray(v) && Array.isArray(S[w]) ? v.every((f) => S[w].includes(f)) : typeof v == "object" && typeof S[w] == "object" && v !== null && S[w] !== null ? p(v, S[w]) : S[w] == v);
    return p(n, T);
  }
  l() {
    var e, n, i, a, l, u;
    const { host: g = "", pathname: C = "", search: T = "" } = typeof window < "u" ? window.location : {};
    return { host: (e = (n = this.t.location) == null ? void 0 : n.host) != null ? e : g, pathname: (i = (a = this.t.location) == null ? void 0 : a.pathname) != null ? i : C, search: (l = (u = this.t.location) == null ? void 0 : u.search) != null ? l : T };
  }
  get params() {
    const { params: e, query: n } = this.h();
    return ne({}, e, n);
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
  u(e = {}, n = this.i) {
    e != null || (e = {}), e = ["string", "number"].includes(typeof e) ? [e] : e;
    const i = n.parameterSegments.filter(({ name: a }) => !this.t.defaults[a]);
    return Array.isArray(e) ? e = e.reduce((a, l, u) => ne({}, a, i[u] ? { [i[u].name]: l } : typeof l == "object" ? l : { [l]: "" }), {}) : i.length !== 1 || e[i[0].name] || !e.hasOwnProperty(Object.values(n.bindings)[0]) && !e.hasOwnProperty("id") || (e = { [i[0].name]: e }), ne({}, this.$(n), this.p(e, n));
  }
  $(e) {
    return e.parameterSegments.filter(({ name: n }) => this.t.defaults[n]).reduce((n, { name: i }, a) => ne({}, n, { [i]: this.t.defaults[i] }), {});
  }
  p(e, { bindings: n, parameterSegments: i }) {
    return Object.entries(e).reduce((a, [l, u]) => {
      if (!u || typeof u != "object" || Array.isArray(u) || !i.some(({ name: g }) => g === l)) return ne({}, a, { [l]: u });
      if (!u.hasOwnProperty(n[l])) {
        if (!u.hasOwnProperty("id")) throw new Error(`Ziggy error: object passed as '${l}' parameter is missing route model binding key '${n[l]}'.`);
        n[l] = "id";
      }
      return ne({}, a, { [l]: u[n[l]] });
    }, {});
  }
  valueOf() {
    return this.toString();
  }
}
function Ue(r, e, n, i) {
  const a = new La(r, e, n, i);
  return r ? a.toString() : a;
}
const Na = { class: "dcode-chat__left-column-inner min-w-64 h-full border-r border-gray-200 bg-white flex flex-col p-4" }, ja = { class: "dcode-chat__search pb-2" }, Ua = { class: "dcode-chat__list overflow-y-auto flex-1" }, Da = {
  key: 0,
  class: ""
}, Ia = ["onClick"], Fa = /* @__PURE__ */ me({
  __name: "DCodeChatLeftColumn",
  props: {
    chats: {},
    currentChat: {},
    currentSearch: {},
    loadMessagesRoute: {}
  },
  emits: ["selectChat", "searchUpdated"],
  setup(r, { emit: e }) {
    const n = e, i = r, a = J([...i.chats]), l = J(i.currentChat), u = J(i.currentSearch || "");
    de(
      () => i.currentSearch,
      (p) => {
        u.value = p;
      }
    ), de(
      () => i.currentChat,
      (p) => {
        l.value = p, g(p);
      }
    ), de(
      () => i.chats,
      (p) => {
        a.value = [...p];
      }
    );
    function g(p) {
      n("selectChat", p);
      const _ = new CustomEvent("dcodechat-chat-selected", {
        detail: {
          chat: p
        }
      });
      document.dispatchEvent(_);
    }
    function C(p) {
      let _ = Ue(i.loadMessagesRoute, { chat: p.id }) + "?markAsRead=true";
      H.get(_).then((S) => {
        l.value = p, p = S.data.chat || [], g(p);
      }).catch((S) => {
        console.error("Error loading chat messages:", S);
      });
    }
    function T(p) {
      n("searchUpdated", p);
    }
    return (p, _) => (V(), K("div", Na, [
      M("div", ja, [
        Ne(Ji, {
          onSearchUpdated: T,
          "current-search": u.value
        }, null, 8, ["current-search"])
      ]),
      M("div", Ua, [
        a.value.length === 0 ? (V(), K("div", Da, " No match found. ")) : ae("", !0),
        (V(!0), K($n, null, Hn(a.value, (S) => {
          var w, v;
          return V(), K("div", {
            key: S.id,
            class: "dcode-chat__participant",
            onClick: (f) => C(S)
          }, [
            Ne(er, {
              "load-messages-route": p.loadMessagesRoute,
              chat: S,
              selected: ((w = l.value) == null ? void 0 : w.id) == S.id,
              class: se([{ "bg-gray-100": S.id == ((v = l.value) == null ? void 0 : v.id) }, "p-4 rounded-lg"])
            }, null, 8, ["load-messages-route", "chat", "selected", "class"])
          ], 8, Ia);
        }), 128))
      ])
    ]));
  }
}), qa = ["onKeydown"], Ba = /* @__PURE__ */ me({
  name: "DCodeChatListing",
  __name: "DCodeChatPost",
  props: {
    chat: {},
    postUrl: {}
  },
  emits: ["messageSent"],
  setup(r, { emit: e }) {
    const n = r, i = J(n.chat), a = J(n.postUrl), l = J(""), u = J(!1), g = e;
    de(
      () => n.chat,
      (p) => {
        i.value = p;
      }
    ), de(
      () => n.postUrl,
      (p) => {
        a.value = p;
      }
    );
    function C() {
      i && H.post(a.value, {
        message: l.value
      }).then((p) => {
        l.value = "", g("messageSent", p.data.message);
      }).catch((p) => {
        console.error("Error sending message:", p);
      });
    }
    function T(p) {
      !p.shiftKey && l.value.trim().length > 0 && C();
    }
    return (p, _) => (V(), K("div", {
      class: se([u.value ? "border-green-400" : "", "flex items-end border w-full rounded-lg bg-white p-4 dcode-chat__post"])
    }, [
      qn(M("textarea", {
        onFocusin: _[0] || (_[0] = (S) => u.value = !0),
        onFocusout: _[1] || (_[1] = (S) => u.value = !1),
        onKeydown: Bn(Ri(T, ["prevent"]), ["enter"]),
        type: "text",
        placeholder: "Send a message...",
        class: "w-full flex-grow text-lg outline-none bg-transparent placeholder-gray-500",
        "onUpdate:modelValue": _[2] || (_[2] = (S) => l.value = S)
      }, null, 40, qa), [
        [Mn, l.value]
      ]),
      M("button", {
        class: se([l.value.length > 0 ? "dcode-chat__send_ready bg-green-500 text-white" : "dcode-chat__send_not_ready bg-gray-100 text-gray-300", "ml-4 text-sm px-6 py-2 rounded-xl transition"]),
        onClick: C
      }, " Send ", 2)
    ], 2));
  }
}), Ma = ["src", "alt"], $a = { class: "ml-2 text-xs text-gray-500" }, Ha = /* @__PURE__ */ me({
  name: "DCodeChatMessage",
  __name: "DCodeChatMessage",
  props: {
    message: {},
    userId: {}
  },
  setup(r) {
    const e = r, n = e.message, i = Oi(() => n.user_id == Number(e.userId));
    return (a, l) => (V(), K("div", {
      class: se(["flex mb-4", i.value ? "justify-end" : "justify-start"])
    }, [
      M("div", {
        class: se([
          "flex items-top max-w-2xl space-x-3",
          i.value ? "flex-row-reverse space-x-reverse" : ""
        ])
      }, [
        M("div", {
          class: se(["dcode-chat__message-avatar-container w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white", i.value ? "is-me bg-blue-900" : "not-me bg-gray-200"])
        }, [
          he(n).user_attributes.user_avatar ? ae("", !0) : (V(), K("div", {
            key: 0,
            class: se(["w-8 h-8", { "fill-white": i.value, "fill-gray-300": !i.value }])
          }, l[0] || (l[0] = [
            M("svg", {
              xmlns: "http://www.w3.org/2000/svg",
              fill: "currentFill",
              viewBox: "0 0 24 24"
            }, [
              M("path", { d: "M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" })
            ], -1)
          ]), 2)),
          he(n).user_attributes.user_avatar ? (V(), K("img", {
            key: 1,
            src: he(n).user_attributes.user_avatar,
            alt: he(n).user_attributes.user_name,
            class: "rounded-full object-contain"
          }, null, 8, Ma)) : ae("", !0)
        ], 2),
        M("div", null, [
          M("div", {
            class: se(["text-sm font-semibold mb-1", i.value ? "text-right text-gray-800" : "text-left text-gray-800"])
          }, [
            Pi(Le(he(n).user_attributes.user_name) + " ", 1),
            M("span", $a, Le(new Date(he(n).created_at).toLocaleString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit"
            })), 1)
          ], 2),
          M("div", {
            class: se(["dcode-chat__message-bubble rounded-lg px-4 py-3 text-sm leading-relaxed", i.value ? "message-me bg-green-100 text-gray-900" : "message-other bg-gray-100 text-gray-800"])
          }, Le(he(n).message), 3)
        ])
      ], 2)
    ], 2));
  }
}), za = { class: "dcode-chat__messages w-full flex flex-col flex-1 h-full" }, Ja = { class: "dcode-chat__header border-b ml-4 mr-4 pt-4" }, Va = {
  key: 0,
  class: "text-center text-gray-500"
}, Xa = { class: "m-4" }, Wa = /* @__PURE__ */ me({
  name: "DCodeChatMessages",
  __name: "DCodeChatMessages",
  props: {
    chat: {},
    postUrl: {},
    userId: {},
    loadMessagesRoute: {}
  },
  setup(r) {
    const e = r, n = J(e.chat ?? null), i = J(e.postUrl), a = Ai("localEmitter"), l = J(null);
    function u(p) {
      var _;
      if (p.chat.id == ((_ = n.value) == null ? void 0 : _.id))
        for (const S of p.messages)
          C(S);
    }
    function g() {
      setTimeout(() => {
        const p = l.value;
        p && (p.scrollTop = p.scrollHeight);
      }, 100);
    }
    Ft(() => {
      a == null || a.on("new-messages", u), g();
    }), Li(() => {
      a == null || a.off("new-messages", u);
    }), de(
      () => e.chat,
      (p) => {
        var _;
        p && p.id === ((_ = n.value) == null ? void 0 : _.id) || (n.value = p, g());
      }
    ), de(
      () => e.postUrl,
      (p) => {
        i.value = p;
      }
    );
    function C(p) {
      var S;
      if (!n.value) return;
      const _ = (S = n.value) == null ? void 0 : S.messages.find((w) => w.id === p.id);
      if (_) {
        Object.assign(_, p);
        return;
      }
      n.value.messages.push(p), g(), T();
    }
    function T() {
      let p = Ue(e.loadMessagesRoute, { chat: n.value.id }) + "?markAsRead=true";
      H.get(p);
    }
    return (p, _) => {
      var S, w, v;
      return V(), K("div", za, [
        M("div", Ja, [
          p.chat ? (V(), zn(er, {
            key: 0,
            chat: n.value,
            ignoreUnread: !0
          }, null, 8, ["chat"])) : ae("", !0)
        ]),
        M("div", {
          class: "dcode-chat__messages-list p-4 flex-1 overflow-y-auto",
          ref_key: "chatContainer",
          ref: l
        }, [
          ((w = (S = n.value) == null ? void 0 : S.messages) == null ? void 0 : w.length) === 0 ? (V(), K("div", Va, " No messages yet. Start the conversation! ")) : ae("", !0),
          (V(!0), K($n, null, Hn((v = n.value) == null ? void 0 : v.messages, (f) => (V(), K("div", {
            key: f.id,
            class: "mb-4 w-full"
          }, [
            Ne(Ha, {
              message: f,
              "user-id": p.userId
            }, null, 8, ["message", "user-id"])
          ]))), 128))
        ], 512),
        M("div", Xa, [
          Ne(Ba, {
            chat: p.chat,
            "post-url": i.value,
            onMessageSent: C
          }, null, 8, ["chat", "post-url"])
        ])
      ]);
    };
  }
});
function Ka(r) {
  return { all: r = r || /* @__PURE__ */ new Map(), on: function(e, n) {
    var i = r.get(e);
    i ? i.push(n) : r.set(e, [n]);
  }, off: function(e, n) {
    var i = r.get(e);
    i && (n ? i.splice(i.indexOf(n) >>> 0, 1) : r.set(e, []));
  }, emit: function(e, n) {
    var i = r.get(e);
    i && i.slice().map(function(a) {
      a(n);
    }), (i = r.get("*")) && i.slice().map(function(a) {
      a(e, n);
    });
  } };
}
const Qa = { class: "dcode-chat w-full h-full overflow-hidden flex flex-col lg:flex-row" }, Ga = { class: "dcode-chat__left-column" }, Za = { class: "dcode-chat__right-column w-full h-full" }, Ya = {
  key: 1,
  class: "dcode-chat__nochat p-4 h-full"
}, _c = /* @__PURE__ */ me({
  name: "DCodeChat",
  __name: "DCodeChat",
  props: {
    reverbKey: {},
    reverbHost: {},
    reverbPort: {},
    reverbSecure: { type: Boolean },
    chats: { default: () => [] },
    initialChatId: {},
    postRoute: {},
    heartbeatRoute: {},
    loadMessagesRoute: {},
    searchRoute: {},
    useHeartbeat: { type: Boolean, default: !0 },
    currentQuery: {},
    reverbChannel: {},
    userId: {}
  },
  setup(r) {
    const e = Ka();
    Ni("localEmitter", e);
    const n = r, i = J([...n.chats]), a = J(n.initialChatId || null), l = J(n.reverbChannel || "dcode-chat"), u = J(null), g = J(n.useHeartbeat === !0), C = J(n.reverbSecure === !0), T = J(n.currentQuery || ""), p = n.loadMessagesRoute ? n.loadMessagesRoute : "dcode-chat.messages.index";
    window.Pusher = Yn;
    const _ = new Zn({
      broadcaster: "reverb",
      key: n.reverbKey || "",
      wsHost: n.reverbHost || "localhost",
      wsPort: n.reverbPort || 6001,
      wssPort: n.reverbPort || 6001,
      forceTLS: C.value,
      enabledTransports: ["ws", "wss"]
    }), S = (h) => h ? Ue(n.postRoute ? n.postRoute : "dcode-chat.messages.store", { chat: h == null ? void 0 : h.id }) : "";
    Ft(async () => {
      _.private(l.value).listen(".DCodeChatCreatedForUser", (h) => {
        i.value.find((m) => m.id === h.chat.id) || (i.value = [...i.value, h.chat]);
      }).listen(".DCodeChatUnreadStatusChange", (h) => {
        const m = h.unreadChats || [];
        i.value = i.value.map((b) => {
          var k;
          const E = m.find((R) => R.id === b.id);
          return E && E.id !== ((k = u.value) == null ? void 0 : k.id) ? { ...b, pivot: { ...b.pivot, has_new_messages: E.pivot.has_new_messages } } : b;
        });
      }).listen(".DCodeChatMessageSentForUser", (h) => {
        e.emit("new-messages", { chat: h.chat, messages: [h.message] });
      }), f(() => {
        if (a.value) {
          const h = i.value.find((m) => m.id === a.value);
          h && w(h);
        }
      });
    });
    const w = (h) => {
      i.value = i.value.map((m) => m.id === h.id ? h : m), u.value = h;
    }, v = (h) => {
      T.value = h;
    }, f = async (h) => {
      var m, b;
      try {
        let E = Ue(n.heartbeatRoute ? n.heartbeatRoute : "dcode-chat.heartbeat"), k = (b = (m = u.value) == null ? void 0 : m.messages) != null && b.length ? u.value.messages[u.value.messages.length - 1] : null;
        const R = new URLSearchParams([
          ["query", T.value || ""],
          ["currentChat", u.value ? u.value.id.toString() : a.value ? a.value.toString() : ""],
          ["loadMessagesRoute", p],
          ["postRoute", n.postRoute || ""],
          ["searchRoute", n.searchRoute || ""],
          ["lastMessageId", k ? k.id.toString() : ""],
          ["markAsRead", "true"]
        ]), P = await H.get(E, { params: R });
        if (i.value = P.data.chats || [], u.value) {
          const N = i.value.find((A) => A.id === u.value.id);
          N && (u.value = N, P.data.newMessages.length > 0 && e.emit("new-messages", { chat: u.value, messages: P.data.newMessages }));
        }
        if (h && h(P.data), !g.value)
          return;
        setTimeout(f, 1e3);
      } catch (E) {
        console.error("Error during heartbeat:", E);
      }
    };
    return (h, m) => (V(), K("div", Qa, [
      M("div", Ga, [
        Ne(Fa, {
          onSearchUpdated: v,
          "load-messages-route": he(p),
          chats: i.value,
          onSelectChat: w,
          currentChat: u.value
        }, null, 8, ["load-messages-route", "chats", "currentChat"])
      ]),
      M("div", Za, [
        u.value ? (V(), zn(Wa, {
          key: 0,
          "load-messages-route": he(p),
          "user-id": h.userId,
          chat: u.value,
          "post-url": S(u.value)
        }, null, 8, ["load-messages-route", "user-id", "chat", "post-url"])) : ae("", !0),
        u.value ? ae("", !0) : (V(), K("div", Ya, m[0] || (m[0] = [
          M("p", null, " Select a chat to start a conversation or view history ", -1)
        ])))
      ])
    ]));
  }
}), Sc = /* @__PURE__ */ me({
  name: "DCodeChatMonitor",
  __name: "DCodeChatMonitor",
  props: {
    userId: {},
    reverbKey: {},
    reverbHost: {},
    reverbChannel: {},
    reverbPort: {},
    reverbSecure: { type: Boolean },
    heartbeatRoute: {}
  },
  setup(r) {
    const e = r, n = J(e.reverbChannel || "dcode-chat"), i = J(e.reverbSecure === !0);
    window.Pusher = Yn;
    const a = new Zn({
      broadcaster: "reverb",
      key: e.reverbKey || "",
      wsHost: e.reverbHost || "localhost",
      wsPort: e.reverbPort || 6001,
      wssPort: e.reverbPort || 6001,
      forceTLS: i.value,
      enabledTransports: ["ws", "wss"]
    });
    Ft(async () => {
      a.private(n.value).listen(".DCodeChatUnreadStatusChange", (u) => {
        l(u.unreadChats);
      });
      try {
        let u = Ue(e.heartbeatRoute ? e.heartbeatRoute : "dcode-chat.heartbeat");
        const C = (await H.get(u)).data.chats.filter((T) => T.pivot.has_new_messages);
        l(C);
      } catch (u) {
        console.error("Error fetching initial unread status:", u);
      }
    });
    function l(u) {
      const g = new CustomEvent("dcodechat-unread-status-change", {
        detail: {
          unreadChats: u
        }
      });
      document.dispatchEvent(g);
    }
    return (u, g) => null;
  }
});
export {
  _c as DCodeChat,
  Fa as DCodeChatLeftColumn,
  er as DCodeChatListing,
  Ha as DCodeChatMessage,
  Wa as DCodeChatMessages,
  Sc as DCodeChatMonitor,
  Ba as DCodeChatPost,
  Ji as DCodeChatSearch
};
