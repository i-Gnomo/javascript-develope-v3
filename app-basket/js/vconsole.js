/*!
 * vconsole v2.3.0 (https://github.com/WechatFE/vConsole)
 * Copyright 2016, WechatFE Team
 * MIT license
 */
! function(e, t) { "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? exports.vConsole = t() : e.vConsole = t() }(this, function() {
    return function(e) {
        function t(n) { if (o[n]) return o[n].exports; var r = o[n] = { exports: {}, id: n, loaded: !1 }; return e[n].call(r.exports, r, r.exports, t), r.loaded = !0, r.exports } var o = {}; return t.m = e, t.c = o, t.p = "", t(0) }([function(e, t, o) { "use strict";

        function n(e) { return e && e.__esModule ? e : { "default": e } }
        Object.defineProperty(t, "__esModule", { value: !0 }); var r = o(1),
            i = n(r),
            l = o(14),
            a = n(l),
            c = o(15),
            s = n(c),
            d = o(22),
            u = n(d),
            v = o(24),
            f = n(v),
            p = new i["default"];
        p.addPlugin(s["default"]), p.addPlugin(u["default"]), p.addPlugin(f["default"]), p.VConsolePlugin = a["default"], t["default"] = p, e.exports = t["default"] }, function(e, t, o) { "use strict";

        function n(e) { if (e && e.__esModule) return e; var t = {}; if (null != e)
                for (var o in e) Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]); return t["default"] = e, t }

        function r(e) { return e && e.__esModule ? e : { "default": e } }

        function i(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }
        Object.defineProperty(t, "__esModule", { value: !0 }); var l = function() {
                function e(e, t) { for (var o = 0; o < t.length; o++) { var n = t[o];
                        n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n) } } return function(t, o, n) { return o && e(t.prototype, o), n && e(t, n), t } }(),
            a = o(2),
            c = r(a),
            s = o(3),
            d = n(s),
            u = o(4),
            v = r(u);
        o(6); var f = o(10),
            p = r(f),
            b = o(11),
            g = r(b),
            h = o(12),
            m = r(h),
            y = o(13),
            _ = r(y),
            x = function() {
                function e() { i(this, e); var t = this;
                    this.version = c["default"].version, this.html = p["default"], this.$dom = null, this.activedTab = "", this.tabList = [], this.pluginList = {}, this.console = {}, this.logList = [], this.isReady = !1, this.switchPos = { x: 10, y: 10, startX: 0, startY: 0, endX: 0, endY: 0 }, this.bodyOverflowCSS = "", this.tool = d, this.$ = v["default"]; var o = function() { t._render(), t._mockTap(), t._bindEvent(), t._autoRun() }; "complete" == document.readyState ? o() : v["default"].bind(window, "load", o) } return l(e, [{ key: "_render", value: function() { var e = "#__vconsole"; if (!v["default"].one(e)) { var t = document.createElement("div");
                            t.innerHTML = this.html, document.body.appendChild(t.children[0]) }
                        this.$dom = v["default"].one(e); var o = d.getStorage("switch_x"),
                            n = d.getStorage("switch_y");
                        o && n && (this.switchPos.x = o, this.switchPos.y = n, v["default"].one(".vc-switch").style.right = o + "px", v["default"].one(".vc-switch").style.bottom = n + "px"), v["default"].one(".vc-mask", this.$dom).style.display = "none" } }, { key: "_mockTap", value: function() { var e = 700,
                            t = 10,
                            o = void 0,
                            n = void 0,
                            r = void 0,
                            i = !1,
                            l = void 0,
                            a = null;
                        this.$dom.addEventListener("touchstart", function(e) { if (void 0 === o) { var t = e.targetTouches[0];
                                n = t.pageX, r = t.pageY, o = e.timeStamp, a = e.target.nodeType === Node.TEXT_NODE ? e.target.parentNode : e.target } }, !1), this.$dom.addEventListener("touchmove", function(e) { var o = e.changedTouches[0];
                            (Math.abs(o.pageX - n) > t || Math.abs(o.pageY - r) > t) && (i = !0) }), this.$dom.addEventListener("touchend", function(t) { i === !1 && t.timeStamp - o < e && null != a && (void 0 === l && (l = document.createEvent("Event"), l.initEvent("tap", !0, !0)), a.dispatchEvent(l)), o = void 0, i = !1, a = null }, !1) } }, { key: "_bindEvent", value: function() { var e = this,
                            t = v["default"].one(".vc-switch", e.$dom);
                        v["default"].bind(t, "touchstart", function(t) { e.switchPos.startX = t.touches[0].pageX, e.switchPos.startY = t.touches[0].pageY }), v["default"].bind(t, "touchend", function(t) { 0 == e.switchPos.endX && 0 == e.switchPos.endY || (e.switchPos.x = e.switchPos.endX, e.switchPos.y = e.switchPos.endY, e.switchPos.startX = 0, e.switchPos.startY = 0, e.switchPos.endX = 0, e.switchPos.endY = 0, d.setStorage("switch_x", e.switchPos.x), d.setStorage("switch_y", e.switchPos.y)) }), v["default"].bind(t, "touchmove", function(o) { if (o.touches.length > 0) { var n = o.touches[0].pageX - e.switchPos.startX,
                                    r = o.touches[0].pageY - e.switchPos.startY,
                                    i = e.switchPos.x - n,
                                    l = e.switchPos.y - r;
                                0 > i && (i = 0), 0 > l && (l = 0), i + t.offsetWidth > document.body.offsetWidth && (i = document.body.offsetWidth - t.offsetWidth), l + t.offsetHeight > document.body.offsetHeight && (l = document.body.offsetHeight - t.offsetHeight), t.style.right = i + "px", t.style.bottom = l + "px", e.switchPos.endX = i, e.switchPos.endY = l, o.preventDefault() } }), v["default"].bind(v["default"].one(".vc-switch", e.$dom), "tap", function() { e.show() }), v["default"].bind(v["default"].one(".vc-hide", e.$dom), "tap", function() { e.hide() }), v["default"].bind(v["default"].one(".vc-mask", e.$dom), "tap", function(t) { return t.target != v["default"].one(".vc-mask") ? !1 : void e.hide() }), v["default"].delegate(v["default"].one(".vc-tabbar", e.$dom), "tap", ".vc-tab", function(t) { var o = this.dataset.tab;
                            o != e.activedTab && e.showTab(o) }) } }, { key: "_autoRun", value: function() { this.isReady = !0; for (var e in this.pluginList) this._initPlugin(this.pluginList[e]);
                        this.showTab(this.tabList[0]) } }, { key: "_initPlugin", value: function(e) { var t = this;
                        e.trigger("init"), e.trigger("renderTab", function(o) { t.tabList.push(e.id); var n = v["default"].render(g["default"], { id: e.id, name: e.name });
                            v["default"].one(".vc-tabbar", t.$dom).appendChild(n); var r = v["default"].render(m["default"], { id: e.id });
                            o && (d.isString(o) ? r.innerHTML += o : d.isFunction(o.appendTo) ? o.appendTo(r) : d.isElement(o) && r.appendChild(o)), v["default"].one(".vc-content", t.$dom).appendChild(r) }), e.trigger("addTool", function(t) { if (t)
                                for (var o = v["default"].one(".vc-tool-last"), n = 0; n < t.length; n++) { var r = t[n],
                                        i = v["default"].render(_["default"], { name: r.name || "Undefined", pluginID: e.id });
                                    1 == r.global && v["default"].addClass(i, "vc-global-tool"), d.isFunction(r.onClick) && v["default"].bind(i, "tap", r.onClick), o.parentNode.insertBefore(i, o) } }), e.trigger("ready") } }, { key: "_triggerPluginsEvent", value: function(e) { for (var t in this.pluginList) this.pluginList[t].trigger(e) } }, { key: "_triggerPluginEvent", value: function(e, t) { var o = this.pluginList[e];
                        o && o.trigger(t) } }, { key: "addPlugin", value: function(e) { return void 0 !== this.pluginList[e.id] ? (console.warn("Plugin " + e.id + " has already been added."), !1) : (this.pluginList[e.id] = e, this.isReady && this._initPlugin(e), !0) } }, { key: "show", value: function() { v["default"].addClass(this.$dom, "vc-toggle"), this._triggerPluginsEvent("showConsole"); var e = v["default"].one(".vc-mask", this.$dom);
                        e.style.display = "block" } }, { key: "hide", value: function() { v["default"].removeClass(this.$dom, "vc-toggle"), this._triggerPluginsEvent("hideConsole"); var e = v["default"].one(".vc-mask", this.$dom);
                        e.addEventListener("transitionend", function(t) { e.style.display = "none" }, !1) } }, { key: "showTab", value: function(e) { var t = v["default"].one("#__vc_log_" + e);
                        v["default"].removeClass(v["default"].all(".vc-tab", this.$dom), "vc-actived"), v["default"].addClass(v["default"].one("#__vc_tab_" + e), "vc-actived"), v["default"].removeClass(v["default"].all(".vc-logbox", this.$dom), "vc-actived"), v["default"].addClass(t, "vc-actived"), v["default"].one(".vc-content", this.$dom).scrollTop = v["default"].one(".vc-content", this.$dom).scrollHeight, v["default"].removeClass(v["default"].all(".vc-tool", this.$dom), "vc-actived"), v["default"].addClass(v["default"].all(".vc-tool-" + e, this.$dom), "vc-actived"), this._triggerPluginEvent(this.activedTab, "hide"), this.activedTab = e, this._triggerPluginEvent(this.activedTab, "show") } }]), e }();
        t["default"] = x, e.exports = t["default"] }, function(e, t) { e.exports = { name: "vconsole", version: "2.3.0", description: "A lightweight, extendable front-end developer tool for mobile web page.", homepage: "https://github.com/WechatFE/vConsole", main: "dist/vconsole.min.js", scripts: { test: "mocha", dist: "webpack && npm test" }, keywords: ["console", "debug", "mobile"], repository: { type: "git", url: "git+https://github.com/WechatFE/vConsole.git" }, dependencies: {}, devDependencies: { "babel-core": "^6.7.7", "babel-loader": "^6.2.4", "babel-plugin-add-module-exports": "^0.1.4", "babel-preset-es2015": "^6.6.0", "babel-preset-stage-3": "^6.5.0", chai: "^3.5.0", "css-loader": "^0.23.1", "extract-text-webpack-plugin": "^1.0.1", "html-loader": "^0.4.3", jsdom: "^9.2.1", "json-loader": "^0.5.4", less: "^2.5.3", "less-loader": "^2.2.3", mocha: "^2.5.3", "style-loader": "^0.13.1", webpack: "~1.12.11" }, author: "WechatFE Team", license: "MIT" } }, function(e, t) { "use strict";

        function o(e) { var t = e > 0 ? new Date(e) : new Date,
                o = t.getDate() < 10 ? "0" + t.getDate() : t.getDate(),
                n = t.getMonth() < 9 ? "0" + (t.getMonth() + 1) : t.getMonth() + 1,
                r = t.getFullYear(),
                i = t.getHours() < 10 ? "0" + t.getHours() : t.getHours(),
                l = t.getMinutes() < 10 ? "0" + t.getMinutes() : t.getMinutes(),
                a = t.getSeconds() < 10 ? "0" + t.getSeconds() : t.getSeconds(),
                c = t.getMilliseconds() < 10 ? "0" + t.getMilliseconds() : t.getMilliseconds(); return 100 > c && (c = "0" + c), { time: +t, year: r, month: n, day: o, hour: i, minute: l, second: a, millisecond: c } }

        function n(e) { return "[object Number]" == Object.prototype.toString.call(e) }

        function r(e) { return "[object String]" == Object.prototype.toString.call(e) }

        function i(e) { return "[object Array]" == Object.prototype.toString.call(e) }

        function l(e) { return "[object Boolean]" == Object.prototype.toString.call(e) }

        function a(e) { return "[object Undefined]" == Object.prototype.toString.call(e) }

        function c(e) { return "[object Null]" == Object.prototype.toString.call(e) }

        function s(e) { return "[object Symbol]" == Object.prototype.toString.call(e) }

        function d(e) { return !("[object Object]" != Object.prototype.toString.call(e) && (n(e) || r(e) || l(e) || i(e) || c(e) || u(e) || a(e) || s(e))) }

        function u(e) { return "[object Function]" == Object.prototype.toString.call(e) }

        function v(e) { return "object" === ("undefined" == typeof HTMLElement ? "undefined" : y(HTMLElement)) ? e instanceof HTMLElement : e && "object" === ("undefined" == typeof e ? "undefined" : y(e)) && null !== e && 1 === e.nodeType && "string" == typeof e.nodeName }

        function f(e) { return document.createElement("a").appendChild(document.createTextNode(e)).parentNode.innerHTML }

        function p(e) {
            function t(e) { for (var t = p.length - 1; t >= 0; t--)
                    if (p[t].child == e) return !0;
                return !1 }

            function o(e) { if (d(e)) { if (t(e)) return void(v += "CircularObject");
                    p.push({ parent: parent, child: e }); var b = Object.keys(e);
                    v += "{", f++; for (var g = 0; g < b.length; g++) { var h = b[g];
                        e.hasOwnProperty(h) && (v += h + ": ", o(e[h], e), g < b.length - 1 && (v += ", ")) }
                    f--, v += "}", p.pop() } else if (i(e)) { if (t(e)) return void(v += "CircularArray");
                    p.push({ parent: parent, child: e }), v += "[", f++; for (var m = 0; m < e.length; m++) o(e[m], e), m < e.length - 1 && (v += ", ");
                    f--, v += "]", p.pop() } else v += r(e) ? '"' + e + '"' : n(e) ? e : l(e) ? e : c(e) ? "null" : a(e) ? "undefined" : u(e) ? "function()" : s(e) ? "symbol" : "unknown" } var v = "",
                f = 0,
                p = []; return o(e, null), v }

        function b(e) { if (!d(e) && !i(e)) return []; var t = ["toString", "toLocaleString", "valueOf", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "constructor"],
                o = []; for (var n in e) t.indexOf(n) < 0 && o.push(n); return o = o.sort() }

        function g(e) { return Object.prototype.toString.call(e).replace("[object ", "").replace("]", "") }

        function h(e, t) { window.localStorage && (e = "vConsole_" + e, localStorage.setItem(e, t)) }

        function m(e) { return window.localStorage ? (e = "vConsole_" + e, localStorage.getItem(e)) : void 0 }
        Object.defineProperty(t, "__esModule", { value: !0 }); var y = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) { return typeof e } : function(e) { return e && "function" == typeof Symbol && e.constructor === Symbol ? "symbol" : typeof e };
        t.getDate = o, t.isNumber = n, t.isString = r, t.isArray = i, t.isBoolean = l, t.isUndefined = a, t.isNull = c, t.isSymbol = s, t.isObject = d, t.isFunction = u, t.isElement = v, t.htmlEncode = f, t.JSONStringify = p, t.getObjAllKeys = b, t.getObjName = g, t.setStorage = h, t.getStorage = m }, function(e, t, o) { "use strict";

        function n(e) { return e && e.__esModule ? e : { "default": e } }
        Object.defineProperty(t, "__esModule", { value: !0 }); var r = o(3),
            i = o(5),
            l = n(i),
            a = {};
        a.one = function(e, t) { return t ? t.querySelector(e) : document.querySelector(e) }, a.all = function(e, t) { var o = void 0,
                n = []; return o = t ? t.querySelectorAll(e) : document.querySelectorAll(e), o && o.length > 0 && (n = Array.prototype.slice.call(o)), n }, a.addClass = function(e, t) { if (e) {
                (0, r.isArray)(e) || (e = [e]); for (var o = 0; o < e.length; o++) e[o].className += " " + t } }, a.removeClass = function(e, t) { if (e) {
                (0, r.isArray)(e) || (e = [e]); for (var o = 0; o < e.length; o++) { for (var n = e[o].className.split(" "), i = 0; i < n.length; i++) n[i] == t && (n[i] = "");
                    e[o].className = n.join(" ").trim() } } }, a.hasClass = function(e, t) { if (!e) return !1; for (var o = e.className.split(" "), n = 0; n < o.length; n++)
                if (o[n] == t) return !0;
            return !1 }, a.bind = function(e, t, o, n) { if (e) { void 0 === n && (n = !1), (0, r.isArray)(e) || (e = [e]); for (var i = 0; i < e.length; i++) e[i].addEventListener(t, o, n) } }, a.delegate = function(e, t, o, n) { e && e.addEventListener(t, function(t) { var r = a.all(o, e); if (r) e: for (var i = 0; i < r.length; i++)
                    for (var l = t.target; l;) { if (l == r[i]) { n.call(l, t); break e } if (l = l.parentNode, l == e) break } }, !1) }, a.render = l["default"], t["default"] = a, e.exports = t["default"] }, function(e, t) { "use strict";

        function o(e, t, o) { var n = /\{\{([^\}]+)\}\}/g,
                r = "var arr = [];\n",
                i = 0,
                l = [],
                a = function(e, t) { "" !== e && (r += t ? e.match(/^ ?else/g) ? "} " + e + " {\n" : e.match(/\/(if|for|switch)/g) ? "}\n" : e.match(/^ ?if|for|switch/g) ? e + " {\n" : e.match(/^ ?(break|continue) ?$/g) ? e + ";\n" : e.match(/^ ?(case|default)/g) ? e + ":\n" : "arr.push(" + e + ");\n" : 'arr.push("' + e.replace(/"/g, '\\"') + '");\n') }; for (e = e.replace(/(\{\{ ?switch(.+?)\}\})[\r\n\t ]+\{\{/g, "$1{{"), e = e.replace(/^\n/, "").replace(/\n/g, "\\\n"); l = n.exec(e);) a(e.slice(i, l.index), !1), a(l[1], !0), i = l.index + l[0].length;
            a(e.substr(i, e.length - i), !1), r += 'return arr.join("");', r = "with (this) {\n" + r + "\n}"; var c = new Function(r).apply(t); if (!o) { var s = document.createElement("div");
                s.innerHTML = c, c = s.children[0] } return c }
        Object.defineProperty(t, "__esModule", { value: !0 }), t["default"] = o, e.exports = t["default"] }, function(e, t, o) { var n = o(7); "string" == typeof n && (n = [
            [e.id, n, ""]
        ]);
        o(9)(n, {});
        n.locals && (e.exports = n.locals) }, function(e, t, o) { t = e.exports = o(8)(), t.push([e.id, '#__vconsole{font-size:13px;font-family:Helvetica Neue,Helvetica,Arial,sans-serif}#__vconsole .vc-max-height{max-height:250px}#__vconsole .vc-max-height-line{max-height:44px}#__vconsole .vc-min-height{min-height:40px}#__vconsole .vc-switch{display:block;position:fixed;right:10px;bottom:10px;color:#fff;background-color:#04be02;line-height:1;font-size:14px;padding:8px 16px;z-index:10000;border-radius:4px;box-shadow:0 0 8px rgba(0,0,0,.4)}#__vconsole .vc-mask{position:fixed;top:0;left:0;right:0;bottom:0;background:transparent;z-index:10001;transition:background .3s;-webkit-tap-highlight-color:transparent;overflow-y:scroll}#__vconsole .vc-panel{position:fixed;min-height:85%;left:0;right:0;bottom:0;z-index:10002;background-color:#efeff4;-webkit-transition:-webkit-transform .3s;transition:-webkit-transform .3s;transition:transform .3s;transition:transform .3s,-webkit-transform .3s;-webkit-transform:translateY(100%);transform:translateY(100%)}#__vconsole .vc-tabbar{border-bottom:1px solid #d9d9d9;overflow-x:auto;height:39px;width:auto;white-space:nowrap}#__vconsole .vc-tabbar .vc-tab{display:inline-block;line-height:39px;padding:0 15px;border-right:1px solid #d9d9d9;text-decoration:none;color:#000;-webkit-tap-highlight-color:transparent;-webkit-touch-callout:none}#__vconsole .vc-tabbar .vc-tab:active{background-color:rgba(0,0,0,.15)}#__vconsole .vc-tabbar .vc-tab.vc-actived{background-color:#fff}#__vconsole .vc-content{background-color:#fff;overflow-x:hidden;overflow-y:auto;position:absolute;top:40px;left:0;right:0;bottom:40px;-webkit-overflow-scrolling:touch}#__vconsole .vc-logbox{display:none;position:relative;min-height:100%}#__vconsole .vc-logbox i{font-style:normal}#__vconsole .vc-logbox .vc-log{-webkit-tap-highlight-color:transparent}#__vconsole .vc-logbox .vc-log:empty:before{content:"Empty";color:#999;position:absolute;top:45%;left:0;right:0;bottom:0;font-size:15px;text-align:center}#__vconsole .vc-logbox .vc-item{margin:0;padding:6px 8px;overflow:hidden;line-height:1.3;border-bottom:1px solid #eee;word-break:break-word}#__vconsole .vc-logbox .vc-item-info{color:#6a5acd}#__vconsole .vc-logbox .vc-item-debug{color:#daa520}#__vconsole .vc-logbox .vc-item-warn{color:orange;border-color:#ffb930;background-color:#fffacd}#__vconsole .vc-logbox .vc-item-error{color:#dc143c;border-color:#f4a0ab;background-color:#ffe4e1}#__vconsole .vc-logbox .vc-item .vc-item-content{margin-right:60px;display:block}#__vconsole .vc-logbox .vc-item .vc-item-meta{color:#888;float:right;width:60px;text-align:right}#__vconsole .vc-logbox .vc-item.vc-item-nometa .vc-item-content{margin-right:0}#__vconsole .vc-logbox .vc-item.vc-item-nometa .vc-item-meta{display:none}#__vconsole .vc-logbox .vc-item .vc-item-code{display:block;white-space:pre-wrap;overflow:auto;position:relative}#__vconsole .vc-logbox .vc-item .vc-item-code.vc-item-code-input,#__vconsole .vc-logbox .vc-item .vc-item-code.vc-item-code-output{padding-left:12px}#__vconsole .vc-logbox .vc-item .vc-item-code.vc-item-code-input:before,#__vconsole .vc-logbox .vc-item .vc-item-code.vc-item-code-output:before{content:"\\203A";position:absolute;top:-3px;left:0;font-size:16px;color:#6a5acd}#__vconsole .vc-logbox .vc-item .vc-item-code.vc-item-code-output:before{content:"\\2039"}#__vconsole .vc-logbox .vc-item .vc-fold{display:block;overflow:auto;-webkit-overflow-scrolling:touch}#__vconsole .vc-logbox .vc-item .vc-fold .vc-fold-outer{display:block;font-style:italic;padding-left:10px;position:relative}#__vconsole .vc-logbox .vc-item .vc-fold .vc-fold-outer:active{background-color:#e6e6e6}#__vconsole .vc-logbox .vc-item .vc-fold .vc-fold-outer:before{content:"";position:absolute;top:4px;left:2px;width:0;height:0;border:4px solid transparent;border-left-color:#000}#__vconsole .vc-logbox .vc-item .vc-fold .vc-fold-outer.vc-toggle:before{top:6px;left:0;border-top-color:#000;border-left-color:transparent}#__vconsole .vc-logbox .vc-item .vc-fold .vc-fold-inner{display:none;margin-left:10px}#__vconsole .vc-logbox .vc-item .vc-fold .vc-fold-inner.vc-toggle{display:block}#__vconsole .vc-logbox .vc-item .vc-fold .vc-fold-inner .vc-code-key{margin-left:10px}#__vconsole .vc-logbox .vc-item .vc-fold .vc-fold-outer .vc-code-key{margin-left:0}#__vconsole .vc-logbox .vc-code-key{color:#905}#__vconsole .vc-logbox .vc-code-private-key{color:#d391b5}#__vconsole .vc-logbox .vc-code-function{color:#905;font-style:italic}#__vconsole .vc-logbox .vc-code-boolean,#__vconsole .vc-logbox .vc-code-number{color:#0086b3}#__vconsole .vc-logbox .vc-code-string{color:#183691}#__vconsole .vc-logbox .vc-code-null,#__vconsole .vc-logbox .vc-code-undefined{color:#666}#__vconsole .vc-logbox .vc-cmd{position:absolute;height:40px;left:0;right:0;bottom:0;border-top:1px solid #d9d9d9}#__vconsole .vc-logbox .vc-cmd .vc-cmd-input-wrap{display:block;height:28px;margin-right:40px;padding:6px 8px}#__vconsole .vc-logbox .vc-cmd .vc-cmd-input{width:100%;border:none;resize:none;outline:none;padding:0;font-size:12px}#__vconsole .vc-logbox .vc-cmd .vc-cmd-input::-webkit-input-placeholder{line-height:28px}#__vconsole .vc-logbox .vc-cmd .vc-cmd-btn{position:absolute;top:0;right:0;bottom:0;width:40px;border:none;background-color:#efeff4;outline:none;-webkit-touch-callout:none}#__vconsole .vc-logbox .vc-cmd .vc-cmd-btn:active{background-color:rgba(0,0,0,.15)}#__vconsole .vc-logbox .vc-group .vc-group-preview{-webkit-touch-callout:none}#__vconsole .vc-logbox .vc-group .vc-group-preview:active{background-color:#e6e6e6}#__vconsole .vc-logbox .vc-group .vc-group-detail{display:none;padding:0 0 10px 20px;border-bottom:1px solid #eee}#__vconsole .vc-logbox .vc-group.vc-actived .vc-group-detail{display:block}#__vconsole .vc-logbox .vc-table .vc-table-row{display:flex;flex-direction:row;flex-wrap:wrap;overflow:hidden;border-bottom:1px solid #eee}#__vconsole .vc-logbox .vc-table .vc-table-row.vc-left-border{border-left:1px solid #eee}#__vconsole .vc-logbox .vc-table .vc-table-col{flex:1;padding:3px 4px;border-left:1px solid #eee;overflow:auto;white-space:pre-wrap;word-break:break-word;-webkit-overflow-scrolling:touch}#__vconsole .vc-logbox .vc-table .vc-table-col:first-child{border:none}#__vconsole .vc-logbox .vc-table .vc-small .vc-table-col{padding:0 4px;font-size:12px}#__vconsole .vc-logbox .vc-table .vc-table-col-2{flex:2}#__vconsole .vc-logbox .vc-table .vc-table-col-3{flex:3}#__vconsole .vc-logbox .vc-table .vc-table-col-4{flex:4}#__vconsole .vc-logbox .vc-table .vc-table-col-5{flex:5}#__vconsole .vc-logbox .vc-table .vc-table-col-6{flex:6}#__vconsole .vc-logbox .vc-table .vc-table-row-error{border-color:#f4a0ab;background-color:#ffe4e1}#__vconsole .vc-logbox .vc-table .vc-table-row-error .vc-table-col{color:#dc143c;border-color:#f4a0ab}#__vconsole .vc-logbox .vc-table .vc-table-col-title{font-weight:700}#__vconsole .vc-logbox.vc-actived{display:block}#__vconsole .vc-toolbar{border-top:1px solid #d9d9d9;line-height:39px;position:absolute;left:0;right:0;bottom:0;display:flex;flex-direction:row}#__vconsole .vc-toolbar .vc-tool{display:none;text-decoration:none;color:#000;width:50%;flex:1;text-align:center;position:relative;-webkit-touch-callout:none}#__vconsole .vc-toolbar .vc-tool.vc-actived,#__vconsole .vc-toolbar .vc-tool.vc-global-tool{display:block}#__vconsole .vc-toolbar .vc-tool:active{background-color:rgba(0,0,0,.15)}#__vconsole .vc-toolbar .vc-tool:after{content:" ";position:absolute;top:7px;bottom:7px;right:0;border-left:1px solid #d9d9d9}#__vconsole .vc-toolbar .vc-tool-last:after{border:none}#__vconsole.vc-toggle .vc-switch{display:none}#__vconsole.vc-toggle .vc-mask{background:rgba(0,0,0,.6);display:block}#__vconsole.vc-toggle .vc-panel{-webkit-transform:translate(0);transform:translate(0)}', ""]) }, function(e, t) { "use strict";
        e.exports = function() { var e = []; return e.toString = function() { for (var e = [], t = 0; t < this.length; t++) { var o = this[t];
                    o[2] ? e.push("@media " + o[2] + "{" + o[1] + "}") : e.push(o[1]) } return e.join("") }, e.i = function(t, o) { "string" == typeof t && (t = [
                    [null, t, ""]
                ]); for (var n = {}, r = 0; r < this.length; r++) { var i = this[r][0]; "number" == typeof i && (n[i] = !0) } for (r = 0; r < t.length; r++) { var l = t[r]; "number" == typeof l[0] && n[l[0]] || (o && !l[2] ? l[2] = o : o && (l[2] = "(" + l[2] + ") and (" + o + ")"), e.push(l)) } }, e } }, function(e, t, o) {
        function n(e, t) { for (var o = 0; o < e.length; o++) { var n = e[o],
                    r = f[n.id]; if (r) { r.refs++; for (var i = 0; i < r.parts.length; i++) r.parts[i](n.parts[i]); for (; i < n.parts.length; i++) r.parts.push(s(n.parts[i], t)) } else { for (var l = [], i = 0; i < n.parts.length; i++) l.push(s(n.parts[i], t));
                    f[n.id] = { id: n.id, refs: 1, parts: l } } } }

        function r(e) { for (var t = [], o = {}, n = 0; n < e.length; n++) { var r = e[n],
                    i = r[0],
                    l = r[1],
                    a = r[2],
                    c = r[3],
                    s = { css: l, media: a, sourceMap: c };
                o[i] ? o[i].parts.push(s) : t.push(o[i] = { id: i, parts: [s] }) } return t }

        function i(e, t) { var o = g(),
                n = y[y.length - 1]; if ("top" === e.insertAt) n ? n.nextSibling ? o.insertBefore(t, n.nextSibling) : o.appendChild(t) : o.insertBefore(t, o.firstChild), y.push(t);
            else { if ("bottom" !== e.insertAt) throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
                o.appendChild(t) } }

        function l(e) { e.parentNode.removeChild(e); var t = y.indexOf(e);
            t >= 0 && y.splice(t, 1) }

        function a(e) { var t = document.createElement("style"); return t.type = "text/css", i(e, t), t }

        function c(e) { var t = document.createElement("link"); return t.rel = "stylesheet", i(e, t), t }

        function s(e, t) { var o, n, r; if (t.singleton) { var i = m++;
                o = h || (h = a(t)), n = d.bind(null, o, i, !1), r = d.bind(null, o, i, !0) } else e.sourceMap && "function" == typeof URL && "function" == typeof URL.createObjectURL && "function" == typeof URL.revokeObjectURL && "function" == typeof Blob && "function" == typeof btoa ? (o = c(t), n = v.bind(null, o), r = function() { l(o), o.href && URL.revokeObjectURL(o.href) }) : (o = a(t), n = u.bind(null, o), r = function() { l(o) }); return n(e),
                function(t) { if (t) { if (t.css === e.css && t.media === e.media && t.sourceMap === e.sourceMap) return;
                        n(e = t) } else r() } }

        function d(e, t, o, n) { var r = o ? "" : n.css; if (e.styleSheet) e.styleSheet.cssText = _(t, r);
            else { var i = document.createTextNode(r),
                    l = e.childNodes;
                l[t] && e.removeChild(l[t]), l.length ? e.insertBefore(i, l[t]) : e.appendChild(i) } }

        function u(e, t) { var o = t.css,
                n = t.media; if (n && e.setAttribute("media", n), e.styleSheet) e.styleSheet.cssText = o;
            else { for (; e.firstChild;) e.removeChild(e.firstChild);
                e.appendChild(document.createTextNode(o)) } }

        function v(e, t) { var o = t.css,
                n = t.sourceMap;
            n && (o += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(n)))) + " */"); var r = new Blob([o], { type: "text/css" }),
                i = e.href;
            e.href = URL.createObjectURL(r), i && URL.revokeObjectURL(i) } var f = {},
            p = function(e) { var t; return function() { return "undefined" == typeof t && (t = e.apply(this, arguments)), t } },
            b = p(function() { return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase()) }),
            g = p(function() { return document.head || document.getElementsByTagName("head")[0] }),
            h = null,
            m = 0,
            y = [];
        e.exports = function(e, t) { t = t || {}, "undefined" == typeof t.singleton && (t.singleton = b()), "undefined" == typeof t.insertAt && (t.insertAt = "bottom"); var o = r(e); return n(o, t),
                function(e) { for (var i = [], l = 0; l < o.length; l++) { var a = o[l],
                            c = f[a.id];
                        c.refs--, i.push(c) } if (e) { var s = r(e);
                        n(s, t) } for (var l = 0; l < i.length; l++) { var c = i[l]; if (0 === c.refs) { for (var d = 0; d < c.parts.length; d++) c.parts[d]();
                            delete f[c.id] } } } }; var _ = function() { var e = []; return function(t, o) { return e[t] = o, e.filter(Boolean).join("\n") } }() }, function(e, t) { e.exports = '<div id=__vconsole class=""> <div class=vc-switch>vConsole</div> <div class=vc-mask> </div> <div class=vc-panel> <div class=vc-tabbar> </div> <div class=vc-content> </div> <div class=vc-toolbar> <a class="vc-tool vc-global-tool vc-tool-last vc-hide">Hide</a> </div> </div> </div>' }, function(e, t) { e.exports = "<a class=vc-tab data-tab={{id}} id=__vc_tab_{{id}}>{{name}}</a>" }, function(e, t) { e.exports = "<div class=vc-logbox id=__vc_log_{{id}}> </div>" }, function(e, t) { e.exports = '<a class="vc-tool vc-tool-{{pluginID}}">{{name}}</a>' }, function(e, t) { "use strict";

        function o(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }
        Object.defineProperty(t, "__esModule", { value: !0 }); var n = function() {
                function e(e, t) { for (var o = 0; o < t.length; o++) { var n = t[o];
                        n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n) } } return function(t, o, n) { return o && e(t.prototype, o), n && e(t, n), t } }(),
            r = function() {
                function e(t) { var n = arguments.length <= 1 || void 0 === arguments[1] ? "newPlugin" : arguments[1];
                    o(this, e), this.id = t, this.name = n, this.eventList = {} } return n(e, [{ key: "on", value: function(e, t) { return this.eventList[e] = t, this } }, { key: "trigger", value: function(e, t) { if ("function" == typeof this.eventList[e]) this.eventList[e].call(this, t);
                        else { var o = "on" + e.charAt(0).toUpperCase() + e.slice(1); "function" == typeof this[o] && this[o].call(this, t) } return this } }, { key: "id", get: function() { return this._id }, set: function(e) { if (!e) throw "Plugin ID cannot be empty";
                        this._id = e.toLowerCase() } }, { key: "name", get: function() { return this._name }, set: function(e) { if (!e) throw "Plugin name cannot be empty";
                        this._name = e } }]), e }();
        t["default"] = r, e.exports = t["default"] }, function(module, exports, __webpack_require__) { "use strict";

        function _interopRequireWildcard(e) { if (e && e.__esModule) return e; var t = {}; if (null != e)
                for (var o in e) Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]); return t["default"] = e, t }

        function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e } }

        function _classCallCheck(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

        function _possibleConstructorReturn(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

        function _inherits(e, t) { if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
            e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t) }
        Object.defineProperty(exports, "__esModule", { value: !0 }); var _createClass = function() {
                function e(e, t) { for (var o = 0; o < t.length; o++) { var n = t[o];
                        n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n) } } return function(t, o, n) { return o && e(t.prototype, o), n && e(t, n), t } }(),
            _get = function e(t, o, n) { null === t && (t = Function.prototype); var r = Object.getOwnPropertyDescriptor(t, o); if (void 0 === r) { var i = Object.getPrototypeOf(t); return null === i ? void 0 : e(i, o, n) } if ("value" in r) return r.value; var l = r.get; if (void 0 !== l) return l.call(n) },
            _query = __webpack_require__(4),
            _query2 = _interopRequireDefault(_query),
            _tool = __webpack_require__(3),
            tool = _interopRequireWildcard(_tool),
            _log = __webpack_require__(16),
            _log2 = _interopRequireDefault(_log),
            _tabbox_default = __webpack_require__(20),
            _tabbox_default2 = _interopRequireDefault(_tabbox_default),
            _item_code = __webpack_require__(21),
            _item_code2 = _interopRequireDefault(_item_code),
            VConsoleDefaultTab = function(_VConsoleLogTab) {
                function VConsoleDefaultTab() { var e;
                    _classCallCheck(this, VConsoleDefaultTab); for (var t = arguments.length, o = Array(t), n = 0; t > n; n++) o[n] = arguments[n]; var r = _possibleConstructorReturn(this, (e = Object.getPrototypeOf(VConsoleDefaultTab)).call.apply(e, [this].concat(o))); return r.tplTabbox = _tabbox_default2["default"], r.windowOnError = null, r } return _inherits(VConsoleDefaultTab, _VConsoleLogTab), _createClass(VConsoleDefaultTab, [{ key: "onReady", value: function() { var e = this;
                        _get(Object.getPrototypeOf(VConsoleDefaultTab.prototype), "onReady", this).call(this), _query2["default"].bind(_query2["default"].one(".vc-cmd", this.$tabbox), "submit", function(t) { t.preventDefault(); var o = _query2["default"].one(".vc-cmd-input", t.target),
                                n = o.value;
                            o.value = "", "" !== n && e.evalCommand(n) }) } }, { key: "mockConsole", value: function() { _get(Object.getPrototypeOf(VConsoleDefaultTab.prototype), "mockConsole", this).call(this); var e = this;
                        tool.isFunction(window.onerror) && (this.windowOnError = window.onerror), window.onerror = function(t, o, n, r, i) { var l = t;
                            o && (l += "\n" + o.replace(location.origin, "")), (n || r) && (l += ":" + n + ":" + r), e.printLog({ logType: "error", logs: [l], noOrigin: !0 }), tool.isFunction(e.windowOnError) && e.windowOnError.apply(window, t, o, n, r, i) } } }, { key: "evalCommand", value: function evalCommand(cmd) { this.printLog({ logType: "log", content: _query2["default"].render(_item_code2["default"], { content: cmd, type: "input" }), noMeta: !0, style: "" }); var result = eval(cmd),
                            $content = void 0;
                        tool.isArray(result) || tool.isObject(result) ? $content = this.getFoldedLine(result) : (tool.isNull(result) ? result = "null" : tool.isUndefined(result) ? result = "undefined" : tool.isFunction(result) ? result = "function()" : tool.isString(result) && (result = '"' + result + '"'), $content = _query2["default"].render(_item_code2["default"], { content: result, type: "output" })), this.printLog({ logType: "log", content: $content, noMeta: !0, style: "" }) } }]), VConsoleDefaultTab }(_log2["default"]),
            tab = new VConsoleDefaultTab("default", "Log");
        exports["default"] = tab, module.exports = exports["default"] }, function(e, t, o) {
        "use strict";

        function n(e) { return e && e.__esModule ? e : { "default": e } }

        function r(e) { if (e && e.__esModule) return e; var t = {}; if (null != e)
                for (var o in e) Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]); return t["default"] = e, t }

        function i(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

        function l(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

        function a(e, t) { if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
            e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t) }
        Object.defineProperty(t, "__esModule", { value: !0 });
        var c = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) { return typeof e } : function(e) { return e && "function" == typeof Symbol && e.constructor === Symbol ? "symbol" : typeof e },
            s = function() {
                function e(e, t) { for (var o = 0; o < t.length; o++) { var n = t[o];
                        n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n) } } return function(t, o, n) { return o && e(t.prototype, o), n && e(t, n), t } }(),
            d = o(3),
            u = r(d),
            v = o(4),
            f = n(v),
            p = o(14),
            b = n(p),
            g = o(17),
            h = n(g),
            m = o(18),
            y = n(m),
            _ = o(19),
            x = n(_),
            w = function(e) {
                function t() { var e;
                    i(this, t); for (var o = arguments.length, n = Array(o), r = 0; o > r; r++) n[r] = arguments[r]; var a = l(this, (e = Object.getPrototypeOf(t)).call.apply(e, [this].concat(n))); return a.tplTabbox = "", a.allowUnformattedLog = !0, a.isReady = !1, a.$tabbox = null, a.console = {}, a.logList = [], a.mockConsole(), a }
                return a(t, e), s(t, [{
                    key: "onInit",
                    value: function() {
                        this.isReady = !0, this.$tabbox = f["default"].render(this.tplTabbox, {});
                        for (var e = 0; e < this.logList.length; e++) this.printLog(this.logList[e]);
                        this.logList = []
                    }
                }, { key: "onRenderTab", value: function(e) { e(this.$tabbox) } }, { key: "onAddTool", value: function(e) { var t = this,
                            o = [{ name: "Clear", global: !1, onClick: function(e) { t.clearLog() } }];
                        e(o) } }, { key: "onReady", value: function() {} }, { key: "mockConsole", value: function() { var e = this;
                        window.console ? (this.console.log = window.console.log, this.console.info = window.console.info, this.console.warn = window.console.warn, this.console.debug = window.console.debug, this.console.error = window.console.error) : window.console = {}, window.console.log = function() { e.printLog({ logType: "log", logs: arguments }) }, window.console.info = function() { e.printLog({ logType: "info", logs: arguments }) }, window.console.warn = function() { e.printLog({ logType: "warn", logs: arguments }) }, window.console.debug = function() { e.printLog({ logType: "debug", logs: arguments }) }, window.console.error = function() { e.printLog({ logType: "error", logs: arguments }) } } }, { key: "clearLog", value: function() { f["default"].one(".vc-log", this.$tabbox).innerHTML = "" } }, { key: "printOriginLog", value: function(e) { "function" == typeof this.console[e.logType] && this.console[e.logType].apply(window.console, e.logs) } }, { key: "printLog", value: function(e) { var t = e.logs || []; if (t.length || e.content) { t = [].slice.call(t || []); var o = !0,
                                n = /^\[(\w+)\] ?/i,
                                r = ""; if (u.isString(t[0])) { var i = t[0].match(n);
                                null !== i && i.length > 0 && (r = i[1].toLowerCase()) } if (r ? o = r == this.id : 0 == this.allowUnformattedLog && (o = !1), !o) return void(e.noOrigin || this.printOriginLog(e)); if (e.date || (e.date = +new Date), !this.isReady) return void this.logList.push(e); if (u.isString(t[0]) && (t[0] = t[0].replace(n, ""), "" === t[0] && t.shift()), !e.meta) { var l = u.getDate(e.date);
                                e.meta = l.hour + ":" + l.minute + ":" + l.second } for (var a = f["default"].render(h["default"], { logType: e.logType, noMeta: !!e.noMeta, meta: e.meta, style: e.style || "" }), s = f["default"].one(".vc-item-content", a), d = 0; d < t.length; d++) { var v = document.createElement("SPAN"); try { if ("" === t[d]) continue;
                                    u.isFunction(t[d]) ? v.innerHTML = " " + t[d].toString() : u.isObject(t[d]) || u.isArray(t[d]) ? v = this.getFoldedLine(t[d]) : v.innerHTML = " " + u.htmlEncode(t[d]).replace(/\n/g, "<br/>") } catch (p) { v.innerHTML = " [" + c(t[d]) + "]" }
                                v && s.appendChild(v) }
                            u.isObject(e.content) && s.appendChild(e.content), f["default"].one(".vc-log", this.$tabbox).appendChild(a), f["default"].one(".vc-content").scrollTop = f["default"].one(".vc-content").scrollHeight, e.noOrigin || this.printOriginLog(e) } } }, { key: "getFoldedLine", value: function(e, t) { var o = this; if (!t) { var n = u.JSONStringify(e),
                                r = n.substr(0, 26);
                            t = u.getObjName(e), n.length > 26 && (r += "..."), t += " " + r } var i = f["default"].render(y["default"], { outer: t, lineType: "obj" }); return f["default"].bind(f["default"].one(".vc-fold-outer", i), "tap", function(t) { t.preventDefault(), t.stopPropagation(), f["default"].hasClass(i, "vc-toggle") ? (f["default"].removeClass(i, "vc-toggle"), f["default"].removeClass(f["default"].one(".vc-fold-inner", i), "vc-toggle"), f["default"].removeClass(f["default"].one(".vc-fold-outer", i), "vc-toggle")) : (f["default"].addClass(i, "vc-toggle"), f["default"].addClass(f["default"].one(".vc-fold-inner", i), "vc-toggle"), f["default"].addClass(f["default"].one(".vc-fold-outer", i), "vc-toggle")); var n = f["default"].one(".vc-fold-inner", i); if (0 == n.children.length && e) { for (var r = u.getObjAllKeys(e), l = 0; l < r.length; l++) { var a = e[r[l]],
                                        c = "undefined",
                                        s = "";
                                    u.isString(a) ? (c = "string", a = '"' + a + '"') : u.isNumber(a) ? c = "number" : u.isBoolean(a) ? c = "boolean" : u.isNull(a) ? (c = "null", a = "null") : u.isUndefined(a) ? (c = "undefined", a = "undefined") : u.isFunction(a) ? (c = "function", a = "function()") : u.isSymbol(a) && (c = "symbol"); var d = void 0; if (u.isArray(a)) { var v = u.getObjName(a) + "[" + a.length + "]";
                                        d = o.getFoldedLine(a, f["default"].render(x["default"], { key: r[l], keyType: s, value: v, valueType: "array" }, !0)) } else if (u.isObject(a)) { var p = u.getObjName(a);
                                        d = o.getFoldedLine(a, f["default"].render(x["default"], { key: r[l], keyType: s, value: p, valueType: "object" }, !0)) } else { e.hasOwnProperty(r[l]) || (s = "private"); var b = { lineType: "kv", key: r[l], keyType: s, value: a, valueType: c };
                                        d = f["default"].render(y["default"], b) }
                                    n.appendChild(d) } if (u.isObject(e)) { var g = e.__proto__,
                                        h = void 0;
                                    h = u.isObject(g) ? o.getFoldedLine(g, f["default"].render(x["default"], { key: "__proto__", keyType: "private", value: u.getObjName(g), valueType: "object" }, !0)) : f["default"].render(x["default"], { key: "__proto__", keyType: "private", value: "null", valueType: "null" }), n.appendChild(h) } } return !1 }), i } }]), t
            }(b["default"]);
        t["default"] = w, e.exports = t["default"]
    }, function(e, t) { e.exports = '<div class="vc-item vc-item-{{logType}} {{if (!noMeta)}}vc-item-nometa{{/if}} {{style}}"> <span class=vc-item-meta>{{if (!noMeta)}}{{meta}}{{/if}}</span> <div class=vc-item-content></div> </div>' }, function(e, t) { e.exports = "<div class=vc-fold> {{if (lineType == 'obj')}} <i class=vc-fold-outer>{{outer}}</i> <div class=vc-fold-inner></div> {{else if (lineType == 'value')}} <i class=vc-code-{{valueType}}>{{value}}</i> {{else if (lineType == 'kv')}} <i class=\"vc-code-key{{if (keyType)}} vc-code-{{keyType}}-key{{/if}}\">{{key}}</i>: <i class=vc-code-{{valueType}}>{{value}}</i> {{/if}} </div>" }, function(e, t) { e.exports = '<span> <i class="vc-code-key{{if (keyType)}} vc-code-{{keyType}}-key{{/if}}">{{key}}</i>: <i class=vc-code-{{valueType}}>{{value}}</i> </span>' }, function(e, t) { e.exports = "<div> <div class=vc-log style=padding-bottom:40px></div> <form class=vc-cmd> <button class=vc-cmd-btn type=submit>OK</button> <div class=vc-cmd-input-wrap> <textarea class=vc-cmd-input placeholder=command...></textarea> </div> </form> </div>" }, function(e, t) { e.exports = '<pre class="vc-item-code vc-item-code-{{type}}">{{content}}</pre>' }, function(e, t, o) { "use strict";

        function n(e) { return e && e.__esModule ? e : { "default": e } }

        function r(e) { if (e && e.__esModule) return e; var t = {}; if (null != e)
                for (var o in e) Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]); return t["default"] = e, t }

        function i(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

        function l(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

        function a(e, t) { if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
            e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t) }
        Object.defineProperty(t, "__esModule", { value: !0 }); var c = function() {
                function e(e, t) { for (var o = 0; o < t.length; o++) { var n = t[o];
                        n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n) } } return function(t, o, n) { return o && e(t.prototype, o), n && e(t, n), t } }(),
            s = function m(e, t, o) { null === e && (e = Function.prototype); var n = Object.getOwnPropertyDescriptor(e, t); if (void 0 === n) { var r = Object.getPrototypeOf(e); return null === r ? void 0 : m(r, t, o) } if ("value" in n) return n.value; var i = n.get; if (void 0 !== i) return i.call(o) },
            d = o(3),
            u = r(d),
            v = o(16),
            f = n(v),
            p = o(23),
            b = n(p),
            g = function(e) {
                function t() { var e;
                    i(this, t); for (var o = arguments.length, n = Array(o), r = 0; o > r; r++) n[r] = arguments[r]; var a = l(this, (e = Object.getPrototypeOf(t)).call.apply(e, [this].concat(n))); return a.tplTabbox = b["default"], a.allowUnformattedLog = !1, a } return a(t, e), c(t, [{ key: "onInit", value: function() { s(Object.getPrototypeOf(t.prototype), "onInit", this).call(this), this.printSystemInfo() } }, { key: "printSystemInfo", value: function() { var e = navigator.userAgent,
                            t = "",
                            o = u.getDate();
                        console.info("[system]", "Now:", o.year + "-" + o.month + "-" + o.day + " " + o.hour + ":" + o.minute + ":" + o.second + "." + o.millisecond); var n = e.match(/(ipod).*\s([\d_]+)/i),
                            r = e.match(/(ipad).*\s([\d_]+)/i),
                            i = e.match(/(iphone)\sos\s([\d_]+)/i),
                            l = e.match(/(android)\s([\d\.]+)/i);
                        t = "Unknown", l ? t = "Android " + l[2] : i ? t = "iPhone, iOS " + i[2].replace(/_/g, ".") : r ? t = "iPad, iOS " + r[2].replace(/_/g, ".") : n && (t = "iPod, iOS " + n[2].replace(/_/g, ".")); var a = t,
                            c = e.match(/MicroMessenger\/([\d\.]+)/i);
                        t = "Unknown", c && c[1] ? (t = c[1], a += ", WeChat " + t, console.info("[system]", "System:", a)) : console.info("[system]", "System:", a), t = "Unknown", t = "https:" == location.protocol ? "HTTPS" : "http:" == location.protocol ? "HTTP" : location.protocol.replace(":", ""), a = t; var s = e.toLowerCase().match(/ nettype\/([^ ]+)/g);
                        t = "Unknown", s && s[0] ? (s = s[0].split("/"), t = s[1], a += ", " + t, console.info("[system]", "Network:", a)) : console.info("[system]", "Protocol:", a), console.info("[system]", "UA:", e), setTimeout(function() { var e = window.performance || window.msPerformance || window.webkitPerformance; if (e && e.timing) { var t = e.timing;
                                t.navigationStart && t.domainLookupStart && console.info("[system]", "navigation:", t.domainLookupStart - t.navigationStart + "ms"), t.domainLookupEnd && t.domainLookupStart && console.info("[system]", "dns:", t.domainLookupEnd - t.domainLookupStart + "ms"), t.connectEnd && t.connectStart && (t.connectEnd && t.secureConnectionStart ? console.info("[system]", "tcp (ssl):", t.connectEnd - t.connectStart + "ms (" + (t.connectEnd - t.secureConnectionStart) + "ms)") : console.info("[system]", "tcp:", t.connectEnd - t.connectStart + "ms")), t.responseStart && t.requestStart && console.info("[system]", "request:", t.responseStart - t.requestStart + "ms"), t.responseEnd && t.responseStart && console.info("[system]", "response:", t.responseEnd - t.responseStart + "ms"), t.domComplete && t.domLoading && (t.domContentLoadedEventStart && t.domLoading ? console.info("[system]", "domComplete (domLoaded):", t.domComplete - t.domLoading + "ms (" + (t.domContentLoadedEventStart - t.domLoading) + "ms)") : console.info("[system]", "domComplete:", t.domComplete - t.domLoading + "ms")), t.loadEventEnd && t.loadEventStart && console.info("[system]", "loadEvent:", t.loadEventEnd - t.loadEventStart + "ms"), t.navigationStart && t.loadEventEnd && console.info("[system]", "total (DOM):", t.loadEventEnd - t.navigationStart + "ms (" + (t.domComplete - t.navigationStart) + "ms)") } }, 0) } }]), t }(f["default"]),
            h = new g("system", "System");
        t["default"] = h, e.exports = t["default"] }, function(e, t) { e.exports = "<div> <div class=vc-log></div> </div>" }, function(e, t, o) { "use strict";

        function n(e) { if (e && e.__esModule) return e; var t = {}; if (null != e)
                for (var o in e) Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]); return t["default"] = e, t }

        function r(e) { return e && e.__esModule ? e : { "default": e } }

        function i(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

        function l(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

        function a(e, t) { if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
            e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t) }
        Object.defineProperty(t, "__esModule", { value: !0 }); var c = function() {
                function e(e, t) { for (var o = 0; o < t.length; o++) { var n = t[o];
                        n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n) } } return function(t, o, n) { return o && e(t.prototype, o), n && e(t, n), t } }(),
            s = o(4),
            d = r(s),
            u = o(3),
            v = n(u),
            f = o(14),
            p = r(f),
            b = o(25),
            g = r(b),
            h = o(26),
            m = r(h),
            y = o(27),
            _ = r(y),
            x = function(e) {
                function t() { var e;
                    i(this, t); for (var o = arguments.length, n = Array(o), r = 0; o > r; r++) n[r] = arguments[r]; var a = l(this, (e = Object.getPrototypeOf(t)).call.apply(e, [this].concat(n))); return a.$tabbox = d["default"].render(g["default"], {}), a.$header = null, a.reqList = {}, a.domList = {}, a.mockAjax(), a } return a(t, e), c(t, [{ key: "onRenderTab", value: function(e) { e(this.$tabbox) } }, { key: "onAddTool", value: function(e) { var t = this,
                            o = [{ name: "Clear", global: !1, onClick: function(e) { t.clearLog() } }];
                        e(o) } }, { key: "onReady", value: function() { this.renderHeader(), d["default"].delegate(d["default"].one(".vc-log", this.$tabbox), "tap", ".vc-group-preview", function(e) { var t = this.parentNode;
                            d["default"].hasClass(t, "vc-actived") ? d["default"].removeClass(t, "vc-actived") : d["default"].addClass(t, "vc-actived"), e.preventDefault() }) } }, { key: "clearLog", value: function() { this.reqList = {}; for (var e in this.domList) this.domList[e].remove(), this.domList[e] = void 0;
                        this.domList = {}, this.renderHeader() } }, { key: "renderHeader", value: function() { var e = Object.keys(this.reqList).length,
                            t = d["default"].render(m["default"], { count: e }),
                            o = d["default"].one(".vc-log", this.$tabbox);
                        this.$header ? this.$header.parentNode.replaceChild(t, this.$header) : o.parentNode.insertBefore(t, o), this.$header = t } }, { key: "updateRequest", value: function(e, t) { var o = Object.keys(this.reqList).length,
                            n = this.reqList[e] || {}; for (var r in t) n[r] = t[r];
                        this.reqList[e] = n; var i = { url: n.url, status: n.status || "-", type: "-", costTime: n.costTime > 0 ? n.costTime + "ms" : "-", header: n.header, response: v.htmlEncode(n.response) };
                        n.readyState <= 1 ? i.status = "Pending" : n.readyState < 4 && (i.status = "Loading"); var l = d["default"].render(_["default"], i),
                            a = this.domList[e];
                        n.status >= 400 && d["default"].addClass(d["default"].one(".vc-group-preview", l), "vc-table-row-error"), a ? a.parentNode.replaceChild(l, a) : d["default"].one(".vc-log", this.$tabbox).appendChild(l), this.domList[e] = l; var c = Object.keys(this.reqList).length;
                        c != o && this.renderHeader() } }, { key: "mockAjax", value: function() { var e = window.XMLHttpRequest; if (e) { var t = this,
                                o = window.XMLHttpRequest.prototype.open;
                            window.XMLHttpRequest.prototype.send;
                            window.XMLHttpRequest.prototype.open = function() { var e = this,
                                    n = [].slice.call(arguments),
                                    r = n[1],
                                    i = t.getUniqueID();
                                e._requestID = i; var l = e.onreadystatechange || function() {}; return e.onreadystatechange = function() { var o = t.reqList[i] || {}; if (o.url = r, o.readyState = e.readyState, 0 == e.readyState) o.startTime = +new Date;
                                    else if (1 == e.readyState) o.startTime = +new Date;
                                    else if (2 == e.readyState) { o.header = {}; for (var n = e.getAllResponseHeaders() || "", a = n.split("\n"), c = 0; c < a.length; c++) { var s = a[c]; if (s) { var d = s.split(": "),
                                                    u = d[0],
                                                    v = d.slice(1).join(": ");
                                                o.header[u] = v } } } else 3 == e.readyState || 4 == e.readyState && (o.status = e.status, o.endTime = +new Date, o.costTime = o.endTime - (o.startTime || o.endTime), o.response = e.response); return e._noVConsole || t.updateRequest(i, o), l.apply(e, arguments) }, o.apply(e, n) } } } }, { key: "getUniqueID", value: function() { var e = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(e) { var t = 16 * Math.random() | 0,
                                o = "x" == e ? t : 3 & t | 8; return o.toString(16) }); return e } }]), t }(p["default"]),
            w = new x("network", "Network");
        t["default"] = w, e.exports = t["default"] }, function(e, t) { e.exports = "<div class=vc-table> <div class=vc-log></div> </div>" }, function(e, t) { e.exports = '<dl class=vc-table-row> <dd class="vc-table-col vc-table-col-4">Name {{if (count > 0)}}({{count}}){{/if}}</dd> <dd class=vc-table-col>Status</dd> <dd class=vc-table-col>Time</dd> </dl>' }, function(e, t) { e.exports = '<div class=vc-group> <dl class="vc-table-row vc-group-preview"> <dd class="vc-table-col vc-table-col-4">{{url}}</dd> <dd class=vc-table-col>{{status}}</dd> <dd class=vc-table-col>{{costTime}}</dd> </dl> <div class=vc-group-detail> <div> <dl class="vc-table-row vc-left-border"> <dt class="vc-table-col vc-table-col-title">Headers</dt> </dl> {{for (var key in header)}} <div class="vc-table-row vc-left-border vc-small"> <div class="vc-table-col vc-table-col-2">{{key}}</div> <div class="vc-table-col vc-table-col-4 vc-max-height-line">{{header[key]}}</div> </div> {{/for}} </div> <div> <dl class="vc-table-row vc-left-border"> <dt class="vc-table-col vc-table-col-title">Response</dt> </dl> <div class="vc-table-row vc-left-border vc-small"> <pre class="vc-table-col vc-max-height vc-min-height">{{response}}</pre> </div> </div> </div> </div>' }])
});