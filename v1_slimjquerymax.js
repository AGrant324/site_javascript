/*
 * Slim v4.0.1 - Image Cropping Made Easy
 * Copyright (c) 2016 Rik Schennink - http://slimimagecropper.com
 */
! function(t, e) {
    "use strict";

    function i(t) {
        return Array.prototype.slice.call(t)
    }

    function n(t) {
        return "object" == typeof t[0] || 0 === t.length
    }

    function o(t, e, i) {
        var n = Object.getOwnPropertyDescriptor(s.prototype, e);
        return !!n && "undefined" != typeof n.get
    }

    function r(t, e, i) {
        var n = Object.getOwnPropertyDescriptor(s.prototype, e);
        return !!n && "undefined" != typeof n.set
    }

    function a(t, e) {
        return "function" == typeof t[e]
    }
    if (t) {
        var s = function() {
            function t(t, e) {
                if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
            }

            function i(t, e) {
                if (!(e >= 1)) {
                    for (var i = Math.round(t.width * e), n = Math.round(t.height * e), o = Z(t), r = void 0, a = t.width, s = t.height; a > i && (a *= .5, s *= .5, !(a < i));) o = k("canvas"), o.width = a, o.height = s, r = o.getContext("2d"), r.drawImage(t, 0, 0, a, s);
                    t.width = i, t.height = n, r = t.getContext("2d"), r.drawImage(o, 0, 0, i, n)
                }
            }! function() {
                function t(t, i) {
                    i = i || {
                        bubbles: !1,
                        cancelable: !1,
                        detail: e
                    };
                    var n = document.createEvent("CustomEvent");
                    return n.initCustomEvent(t, i.bubbles, i.cancelable, i.detail), n
                }
                t.prototype = window.CustomEvent.prototype, window.CustomEvent = t
            }();
            var n = function(t, e, i) {
                    var o, r, a = document.createElement("img");
                    if (a.onerror = e, a.onload = function() {
                            !r || i && i.noRevoke || n.revokeObjectURL(r), e && e(n.scale(a, i))
                        }, n.isInstanceOf("Blob", t) || n.isInstanceOf("File", t)) o = r = n.createObjectURL(t), a._type = t.type;
                    else {
                        if ("string" != typeof t) return !1;
                        o = t, i && i.crossOrigin && (a.crossOrigin = i.crossOrigin)
                    }
                    return o ? (a.src = o, a) : n.readFile(t, function(t) {
                        var i = t.target;
                        i && i.result ? a.src = i.result : e && e(t)
                    })
                },
                o = window.createObjectURL && window || window.URL && URL.revokeObjectURL && URL || window.webkitURL && webkitURL;
            n.isInstanceOf = function(t, e) {
                return Object.prototype.toString.call(e) === "[object " + t + "]"
            }, n.transformCoordinates = function() {}, n.getTransformedOptions = function(t, e) {
                var i, n, o, r, a = e.aspectRatio;
                if (!a) return e;
                i = {};
                for (n in e) e.hasOwnProperty(n) && (i[n] = e[n]);
                return i.crop = !0, o = t.naturalWidth || t.width, r = t.naturalHeight || t.height, o / r > a ? (i.maxWidth = r * a, i.maxHeight = r) : (i.maxWidth = o, i.maxHeight = o / a), i
            }, n.renderImageToCanvas = function(t, e, i, n, o, r, a, s, h, u) {
                return t.getContext("2d").drawImage(e, i, n, o, r, a, s, h, u), t
            }, n.hasCanvasOption = function(t) {
                return t.canvas || t.crop || !!t.aspectRatio
            }, n.scale = function(t, i) {
                function o() {
                    var t = Math.max((h || b) / b, (u || k) / k);
                    t > 1 && (b *= t, k *= t)
                }

                function r() {
                    var t = Math.min((a || b) / b, (s || k) / k);
                    t < 1 && (b *= t, k *= t)
                }
                i = i || {};
                var a, s, h, u, l, c, p, d, f, _, m, g = document.createElement("canvas"),
                    v = t.getContext || n.hasCanvasOption(i) && g.getContext,
                    y = t.naturalWidth || t.width,
                    w = t.naturalHeight || t.height,
                    b = y,
                    k = w;
                if (v && (i = n.getTransformedOptions(t, i), p = i.left || 0, d = i.top || 0, i.sourceWidth ? (l = i.sourceWidth, i.right !== e && i.left === e && (p = y - l - i.right)) : l = y - p - (i.right || 0), i.sourceHeight ? (c = i.sourceHeight, i.bottom !== e && i.top === e && (d = w - c - i.bottom)) : c = w - d - (i.bottom || 0), b = l, k = c), a = i.maxWidth, s = i.maxHeight, h = i.minWidth, u = i.minHeight, v && a && s && i.crop ? (b = a, k = s, m = l / c - a / s, m < 0 ? (c = s * l / a, i.top === e && i.bottom === e && (d = (w - c) / 2)) : m > 0 && (l = a * c / s, i.left === e && i.right === e && (p = (y - l) / 2))) : ((i.contain || i.cover) && (h = a = a || h, u = s = s || u), i.cover ? (r(), o()) : (o(), r())), v) {
                    if (f = i.pixelRatio, f > 1 && (g.style.width = b + "px", g.style.height = k + "px", b *= f, k *= f, g.getContext("2d").scale(f, f)), _ = i.downsamplingRatio, _ > 0 && _ < 1 && b < l && k < c)
                        for (; l * _ > b;) g.width = l * _, g.height = c * _, n.renderImageToCanvas(g, t, p, d, l, c, 0, 0, g.width, g.height), l = g.width, c = g.height, t = document.createElement("canvas"), t.width = l, t.height = c, n.renderImageToCanvas(t, g, 0, 0, l, c, 0, 0, l, c);
                    return g.width = b, g.height = k, n.transformCoordinates(g, i), n.renderImageToCanvas(g, t, p, d, l, c, 0, 0, b, k)
                }
                return t.width = b, t.height = k, t
            }, n.createObjectURL = function(t) {
                return !!o && o.createObjectURL(t)
            }, n.revokeObjectURL = function(t) {
                return !!o && o.revokeObjectURL(t)
            }, n.readFile = function(t, e, i) {
                if (window.FileReader) {
                    var n = new FileReader;
                    if (n.onload = n.onerror = e, i = i || "readAsDataURL", n[i]) return n[i](t), n
                }
                return !1
            };
            var r = n.hasCanvasOption,
                a = n.transformCoordinates,
                s = n.getTransformedOptions;
            n.hasCanvasOption = function(t) {
                return !!t.orientation || r.call(n, t)
            }, n.transformCoordinates = function(t, e) {
                a.call(n, t, e);
                var i = t.getContext("2d"),
                    o = t.width,
                    r = t.height,
                    s = t.style.width,
                    h = t.style.height,
                    u = e.orientation;
                if (u && !(u > 8)) switch (u > 4 && (t.width = r, t.height = o, t.style.width = h, t.style.height = s), u) {
                    case 2:
                        i.translate(o, 0), i.scale(-1, 1);
                        break;
                    case 3:
                        i.translate(o, r), i.rotate(Math.PI);
                        break;
                    case 4:
                        i.translate(0, r), i.scale(1, -1);
                        break;
                    case 5:
                        i.rotate(.5 * Math.PI), i.scale(1, -1);
                        break;
                    case 6:
                        i.rotate(.5 * Math.PI), i.translate(0, -r);
                        break;
                    case 7:
                        i.rotate(.5 * Math.PI), i.translate(o, -r), i.scale(-1, 1);
                        break;
                    case 8:
                        i.rotate(-.5 * Math.PI), i.translate(-o, 0)
                }
            }, n.getTransformedOptions = function(t, e) {
                var i, o, r = s.call(n, t, e),
                    a = r.orientation;
                if (!a || a > 8 || 1 === a) return r;
                i = {};
                for (o in r) r.hasOwnProperty(o) && (i[o] = r[o]);
                switch (r.orientation) {
                    case 2:
                        i.left = r.right, i.right = r.left;
                        break;
                    case 3:
                        i.left = r.right, i.top = r.bottom, i.right = r.left, i.bottom = r.top;
                        break;
                    case 4:
                        i.top = r.bottom, i.bottom = r.top;
                        break;
                    case 5:
                        i.left = r.top, i.top = r.left, i.right = r.bottom, i.bottom = r.right;
                        break;
                    case 6:
                        i.left = r.top, i.top = r.right, i.right = r.bottom, i.bottom = r.left;
                        break;
                    case 7:
                        i.left = r.bottom, i.top = r.right, i.right = r.top, i.bottom = r.left;
                        break;
                    case 8:
                        i.left = r.bottom, i.top = r.left, i.right = r.top, i.bottom = r.right
                }
                return r.orientation > 4 && (i.maxWidth = r.maxHeight, i.maxHeight = r.maxWidth, i.minWidth = r.minHeight, i.minHeight = r.minWidth, i.sourceWidth = r.sourceHeight, i.sourceHeight = r.sourceWidth), i
            };
            var h = window.Blob && (Blob.prototype.slice || Blob.prototype.webkitSlice || Blob.prototype.mozSlice);
            n.blobSlice = h && function() {
                var t = this.slice || this.webkitSlice || this.mozSlice;
                return t.apply(this, arguments)
            }, n.metaDataParsers = {
                jpeg: {
                    65505: []
                }
            }, n.parseMetaData = function(t, e, i) {
                i = i || {};
                var o = this,
                    r = i.maxMetaDataSize || 262144,
                    a = {},
                    s = !(window.DataView && t && t.size >= 12 && "image/jpeg" === t.type && n.blobSlice);
                !s && n.readFile(n.blobSlice.call(t, 0, r), function(t) {
                    if (t.target.error) return void e(a);
                    var r, s, h, u, l = t.target.result,
                        c = new DataView(l),
                        p = 2,
                        d = c.byteLength - 4,
                        f = p;
                    if (65496 === c.getUint16(0)) {
                        for (; p < d && (r = c.getUint16(p), r >= 65504 && r <= 65519 || 65534 === r) && (s = c.getUint16(p + 2) + 2, !(p + s > c.byteLength));) {
                            if (h = n.metaDataParsers.jpeg[r])
                                for (u = 0; u < h.length; u += 1) h[u].call(o, c, p, s, a, i);
                            p += s, f = p
                        }!i.disableImageHead && f > 6 && (l.slice ? a.imageHead = l.slice(0, f) : a.imageHead = new Uint8Array(l).subarray(0, f))
                    }
                    e(a)
                }, "readAsArrayBuffer") || e(a)
            }, n.ExifMap = function() {
                return this
            }, n.ExifMap.prototype.map = {
                Orientation: 274
            }, n.ExifMap.prototype.get = function(t) {
                return this[t] || this[this.map[t]]
            }, n.getExifThumbnail = function(t, e, i) {
                var n, o, r;
                if (i && !(e + i > t.byteLength)) {
                    for (n = [], o = 0; o < i; o += 1) r = t.getUint8(e + o), n.push((r < 16 ? "0" : "") + r.toString(16));
                    return "data:image/jpeg,%" + n.join("%")
                }
            }, n.exifTagTypes = {
                1: {
                    getValue: function(t, e) {
                        return t.getUint8(e)
                    },
                    size: 1
                },
                2: {
                    getValue: function(t, e) {
                        return String.fromCharCode(t.getUint8(e))
                    },
                    size: 1,
                    ascii: !0
                },
                3: {
                    getValue: function(t, e, i) {
                        return t.getUint16(e, i)
                    },
                    size: 2
                },
                4: {
                    getValue: function(t, e, i) {
                        return t.getUint32(e, i)
                    },
                    size: 4
                },
                5: {
                    getValue: function(t, e, i) {
                        return t.getUint32(e, i) / t.getUint32(e + 4, i)
                    },
                    size: 8
                },
                9: {
                    getValue: function(t, e, i) {
                        return t.getInt32(e, i)
                    },
                    size: 4
                },
                10: {
                    getValue: function(t, e, i) {
                        return t.getInt32(e, i) / t.getInt32(e + 4, i)
                    },
                    size: 8
                }
            }, n.exifTagTypes[7] = n.exifTagTypes[1], n.getExifValue = function(t, e, i, o, r, a) {
                var s, h, u, l, c, p, d = n.exifTagTypes[o];
                if (d && (s = d.size * r, h = s > 4 ? e + t.getUint32(i + 8, a) : i + 8, !(h + s > t.byteLength))) {
                    if (1 === r) return d.getValue(t, h, a);
                    for (u = [], l = 0; l < r; l += 1) u[l] = d.getValue(t, h + l * d.size, a);
                    if (d.ascii) {
                        for (c = "", l = 0; l < u.length && (p = u[l], "\0" !== p); l += 1) c += p;
                        return c
                    }
                    return u
                }
            }, n.parseExifTag = function(t, e, i, o, r) {
                var a = t.getUint16(i, o);
                r.exif[a] = n.getExifValue(t, e, i, t.getUint16(i + 2, o), t.getUint32(i + 4, o), o)
            }, n.parseExifTags = function(t, e, i, n, o) {
                var r, a, s;
                if (!(i + 6 > t.byteLength || (r = t.getUint16(i, n), a = i + 2 + 12 * r, a + 4 > t.byteLength))) {
                    for (s = 0; s < r; s += 1) this.parseExifTag(t, e, i + 2 + 12 * s, n, o);
                    return t.getUint32(a, n)
                }
            }, n.parseExifData = function(t, e, i, o, r) {
                if (!r.disableExif) {
                    var a, s, h, u = e + 10;
                    if (1165519206 === t.getUint32(e + 4) && !(u + 8 > t.byteLength) && 0 === t.getUint16(e + 8)) {
                        switch (t.getUint16(u)) {
                            case 18761:
                                a = !0;
                                break;
                            case 19789:
                                a = !1;
                                break;
                            default:
                                return
                        }
                        42 === t.getUint16(u + 2, a) && (s = t.getUint32(u + 4, a), o.exif = new n.ExifMap, s = n.parseExifTags(t, u, u + s, a, o), s && !r.disableExifThumbnail && (h = {
                            exif: {}
                        }, s = n.parseExifTags(t, u, u + s, a, h), h.exif[513] && (o.exif.Thumbnail = n.getExifThumbnail(t, u + h.exif[513], h.exif[514]))), o.exif[34665] && !r.disableExifSub && n.parseExifTags(t, u, u + o.exif[34665], a, o), o.exif[34853] && !r.disableExifGps && n.parseExifTags(t, u, u + o.exif[34853], a, o))
                    }
                }
            }, n.metaDataParsers.jpeg[65505].push(n.parseExifData);
            var u = function() {
                    var t = [],
                        i = [],
                        n = [],
                        o = "transform",
                        r = window.getComputedStyle(document.documentElement, ""),
                        a = (Array.prototype.slice.call(r).join("").match(/-(moz|webkit|ms)-/) || "" === r.OLink && ["", "o"])[1];
                    "webkit" === a && (o = "webkitTransform");
                    var s = function(t, i, n) {
                            var o = t;
                            if (o.length !== e) {
                                for (var r = {
                                        chainers: [],
                                        then: function(t) {
                                            return this.snabbt(t)
                                        },
                                        snabbt: function(t) {
                                            var e = this.chainers.length;
                                            return this.chainers.forEach(function(i, n) {
                                                i.snabbt(h(t, n, e))
                                            }), r
                                        },
                                        setValue: function(t) {
                                            return this.chainers.forEach(function(e) {
                                                e.setValue(t)
                                            }), r
                                        },
                                        finish: function() {
                                            return this.chainers.forEach(function(t) {
                                                t.finish()
                                            }), r
                                        },
                                        rollback: function() {
                                            return this.chainers.forEach(function(t) {
                                                t.rollback()
                                            }), r
                                        }
                                    }, a = 0, s = o.length; a < s; ++a) "string" == typeof i ? r.chainers.push(u(o[a], i, h(n, a, s))) : r.chainers.push(u(o[a], h(i, a, s), n));
                                return r
                            }
                            return "string" == typeof i ? u(o, i, h(n, 0, 1)) : u(o, h(i, 0, 1), n)
                        },
                        h = function(t, e, i) {
                            if (!t) return t;
                            var n = J(t);
                            $(t.delay) && (n.delay = t.delay(e, i)), $(t.callback) && (n.complete = function() {
                                t.callback.call(this, e, i)
                            });
                            var o = $(t.allDone),
                                r = $(t.complete);
                            (r || o) && (n.complete = function() {
                                r && t.complete.call(this, e, i), o && e == i - 1 && t.allDone()
                            }), $(t.valueFeeder) && (n.valueFeeder = function(n, o) {
                                return t.valueFeeder(n, o, e, i)
                            }), $(t.easing) && (n.easing = function(n) {
                                return t.easing(n, e, i)
                            });
                            var a = ["position", "rotation", "skew", "rotationPost", "scale", "width", "height", "opacity", "fromPosition", "fromRotation", "fromSkew", "fromRotationPost", "fromScale", "fromWidth", "fromHeight", "fromOpacity", "transformOrigin", "duration", "delay"];
                            return a.forEach(function(o) {
                                $(t[o]) && (n[o] = t[o](e, i))
                            }), n
                        },
                        u = function(t, e, n) {
                            function o(e) {
                                if (f.tick(e), f.updateElement(t), !f.isStopped()) return f.completed() ? void(r.loop > 1 && !f.isStopped() ? (r.loop -= 1, f.restart(), k(o)) : (r.complete && r.complete.call(t), _.length && (r = _.pop(), s = y(r, u, !0), u = y(r, J(u)), r = w(s, u, r), f = E(r), i.push([t, f]), f.tick(e), k(o)))) : k(o)
                            }
                            if ("attention" === e) return l(t, n);
                            if ("stop" === e) return c(t);
                            if ("detach" === e) return d(t);
                            var r = e;
                            m();
                            var a = v(t),
                                s = a;
                            s = y(r, s, !0);
                            var u = J(a);
                            u = y(r, u);
                            var p = w(s, u, r),
                                f = E(p);
                            i.push([t, f]), f.updateElement(t, !0);
                            var _ = [],
                                g = {
                                    snabbt: function(t) {
                                        return _.unshift(h(t, 0, 1)), g
                                    },
                                    then: function(t) {
                                        return this.snabbt(t)
                                    }
                                };
                            return k(o), r.manual ? f : g
                        },
                        l = function(t, e) {
                            function n(i) {
                                r.tick(i), r.updateElement(t), r.completed() ? (e.callback && e.callback(t), e.loop && e.loop > 1 && (e.loop--, r.restart(), k(n))) : k(n)
                            }
                            var o = y(e, j({}));
                            e.movement = o;
                            var r = C(e);
                            i.push([t, r]), k(n)
                        },
                        c = function(t) {
                            for (var e = 0, n = i.length; e < n; ++e) {
                                var o = i[e],
                                    r = o[0],
                                    a = o[1];
                                r === t && a.stop()
                            }
                        },
                        p = function(t, e) {
                            for (var i = 0, n = t.length; i < n; ++i)
                                if (t[i][0] === e) return i;
                            return -1
                        },
                        d = function(t) {
                            var e, o, r = [],
                                a = i.concat(n),
                                s = a.length;
                            for (o = 0; o < s; ++o) e = a[o][0], (t.contains(e) || t === e) && r.push(e);
                            for (s = r.length, o = 0; o < s; ++o) f(r[o])
                        },
                        f = function(t) {
                            c(t);
                            var e = p(i, t);
                            e >= 0 && i.splice(e, 1), e = p(n, t), e >= 0 && n.splice(e, 1)
                        },
                        _ = function(t, e) {
                            for (var i = 0, n = t.length; i < n; ++i) {
                                var o = t[i],
                                    r = o[0],
                                    a = o[1];
                                if (r === e) {
                                    var s = a.getCurrentState();
                                    return a.stop(), s
                                }
                            }
                        },
                        m = function() {
                            n = n.filter(function(t) {
                                return g(t[0]).body
                            })
                        },
                        g = function(t) {
                            for (var e = t; e.parentNode;) e = e.parentNode;
                            return e
                        },
                        v = function(t) {
                            var e = _(i, t);
                            return e ? e : _(n, t)
                        },
                        y = function(t, e, i) {
                            e || (e = j({
                                position: [0, 0, 0],
                                rotation: [0, 0, 0],
                                rotationPost: [0, 0, 0],
                                scale: [1, 1],
                                skew: [0, 0]
                            }));
                            var n = "position",
                                o = "rotation",
                                r = "skew",
                                a = "rotationPost",
                                s = "scale",
                                h = "scalePost",
                                u = "width",
                                l = "height",
                                c = "opacity";
                            return i && (n = "fromPosition", o = "fromRotation", r = "fromSkew", a = "fromRotationPost", s = "fromScale", h = "fromScalePost", u = "fromWidth", l = "fromHeight", c = "fromOpacity"), e.position = G(t[n], e.position), e.rotation = G(t[o], e.rotation), e.rotationPost = G(t[a], e.rotationPost), e.skew = G(t[r], e.skew), e.scale = G(t[s], e.scale), e.scalePost = G(t[h], e.scalePost), e.opacity = t[c], e.width = t[u], e.height = t[l], e
                        },
                        w = function(t, e, i) {
                            return i.startState = t, i.endState = e, i
                        },
                        b = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame || function(t) {
                            return setTimeout(t, 1e3 / 60)
                        },
                        k = function(e) {
                            0 === t.length && b(x), t.push(e)
                        },
                        x = function(e) {
                            for (var o = t.length, r = 0; r < o; ++r) t[r](e);
                            t.splice(0, o);
                            var a = i.filter(function(t) {
                                return t[1].completed()
                            });
                            n = n.filter(function(t) {
                                for (var e = 0, i = a.length; e < i; ++e)
                                    if (t[0] === a[e][0]) return !1;
                                return !0
                            }), n = n.concat(a), i = i.filter(function(t) {
                                return !t[1].completed()
                            }), 0 !== t.length && b(x)
                        },
                        E = function(t) {
                            var i = t.startState,
                                n = t.endState,
                                o = G(t.duration, 500),
                                r = G(t.delay, 0),
                                a = t.perspective,
                                s = R(G(t.easing, "linear"), t),
                                h = 0 === o ? n.clone() : i.clone();
                            t.transformOrigin;
                            h.transformOrigin = t.transformOrigin;
                            var u, l, c = 0,
                                p = 0,
                                d = !1,
                                f = !1,
                                _ = t.manual,
                                m = 0,
                                g = r / o;
                            return l = t.valueFeeder ? V(t.valueFeeder, i, n, h) : q(i, n, h), {
                                stop: function() {
                                    d = !0
                                },
                                isStopped: function() {
                                    return d
                                },
                                finish: function(t) {
                                    _ = !1;
                                    var e = o * m;
                                    c = p - e, u = t, s.resetFrom = m
                                },
                                rollback: function(t) {
                                    _ = !1, l.setReverse();
                                    var e = o * (1 - m);
                                    c = p - e, u = t, s.resetFrom = m
                                },
                                restart: function() {
                                    c = e, s.resetFrom(0)
                                },
                                tick: function(t) {
                                    if (!d) {
                                        if (_) return p = t, void this.updateCurrentTransform();
                                        if (c || (c = t), t - c > r) {
                                            f = !0, p = t - r;
                                            var e = Math.min(Math.max(0, p - c), o);
                                            s.tick(e / o), this.updateCurrentTransform(), this.completed() && u && u()
                                        }
                                    }
                                },
                                getCurrentState: function() {
                                    return h
                                },
                                setValue: function(t) {
                                    f = !0, m = Math.min(Math.max(t, 1e-4), 1 + g)
                                },
                                updateCurrentTransform: function() {
                                    var t = s.getValue();
                                    if (_) {
                                        var e = Math.max(1e-5, m - g);
                                        s.tick(e), t = s.getValue()
                                    }
                                    l.tween(t)
                                },
                                completed: function() {
                                    return !!d || 0 !== c && s.completed()
                                },
                                updateElement: function(t, e) {
                                    if (f || e) {
                                        var i = l.asMatrix(),
                                            n = l.getProperties();
                                        X(t, i, a), Y(t, n)
                                    }
                                }
                            }
                        },
                        C = function(t) {
                            var i = t.movement;
                            t.initialVelocity = .1, t.equilibriumPosition = 0;
                            var n = T(t),
                                o = !1,
                                r = i.position,
                                a = i.rotation,
                                s = i.rotationPost,
                                h = i.scale,
                                u = i.skew,
                                l = j({
                                    position: r ? [0, 0, 0] : e,
                                    rotation: a ? [0, 0, 0] : e,
                                    rotationPost: s ? [0, 0, 0] : e,
                                    scale: h ? [0, 0] : e,
                                    skew: u ? [0, 0] : e
                                });
                            return {
                                stop: function() {
                                    o = !0
                                },
                                isStopped: function(t) {
                                    return o
                                },
                                tick: function(t) {
                                    o || n.equilibrium || (n.tick(), this.updateMovement())
                                },
                                updateMovement: function() {
                                    var t = n.getValue();
                                    r && (l.position[0] = i.position[0] * t, l.position[1] = i.position[1] * t, l.position[2] = i.position[2] * t), a && (l.rotation[0] = i.rotation[0] * t, l.rotation[1] = i.rotation[1] * t, l.rotation[2] = i.rotation[2] * t), s && (l.rotationPost[0] = i.rotationPost[0] * t, l.rotationPost[1] = i.rotationPost[1] * t, l.rotationPost[2] = i.rotationPost[2] * t), h && (l.scale[0] = 1 + i.scale[0] * t, l.scale[1] = 1 + i.scale[1] * t), u && (l.skew[0] = i.skew[0] * t, l.skew[1] = i.skew[1] * t)
                                },
                                updateElement: function(t) {
                                    X(t, l.asMatrix()), Y(t, l.getProperties())
                                },
                                getCurrentState: function() {
                                    return l
                                },
                                completed: function() {
                                    return n.equilibrium || o
                                },
                                restart: function() {
                                    n = T(t)
                                }
                            }
                        },
                        S = function(t) {
                            return t
                        },
                        P = function(t) {
                            return (Math.cos(t * Math.PI + Math.PI) + 1) / 2
                        },
                        I = function(t) {
                            return t * t
                        },
                        O = function(t) {
                            return -Math.pow(t - 1, 2) + 1
                        },
                        T = function(t) {
                            var e = G(t.startPosition, 0),
                                i = G(t.equilibriumPosition, 1),
                                n = G(t.initialVelocity, 0),
                                o = G(t.springConstant, .8),
                                r = G(t.springDeceleration, .9),
                                a = G(t.springMass, 10),
                                s = !1;
                            return {
                                tick: function(t) {
                                    if (0 !== t && !s) {
                                        var h = -(e - i) * o,
                                            u = h / a;
                                        n += u, e += n, n *= r, Math.abs(e - i) < .001 && Math.abs(n) < .001 && (s = !0)
                                    }
                                },
                                resetFrom: function(t) {
                                    e = t, n = 0
                                },
                                getValue: function() {
                                    return s ? i : e
                                },
                                completed: function() {
                                    return s
                                }
                            }
                        },
                        M = {
                            linear: S,
                            ease: P,
                            easeIn: I,
                            easeOut: O
                        },
                        R = function(t, e) {
                            if ("spring" == t) return T(e);
                            var i = t;
                            $(t) || (i = M[t]);
                            var n, o = i,
                                r = 0;
                            return {
                                tick: function(t) {
                                    r = o(t), n = t
                                },
                                resetFrom: function(t) {
                                    n = 0
                                },
                                getValue: function() {
                                    return r
                                },
                                completed: function() {
                                    return n >= 1 && n
                                }
                            }
                        },
                        L = function(t, e, i, n) {
                            t[0] = 1, t[1] = 0, t[2] = 0, t[3] = 0, t[4] = 0, t[5] = 1, t[6] = 0, t[7] = 0, t[8] = 0, t[9] = 0, t[10] = 1, t[11] = 0, t[12] = e, t[13] = i, t[14] = n, t[15] = 1
                        },
                        D = function(t, e) {
                            t[0] = 1, t[1] = 0, t[2] = 0, t[3] = 0, t[4] = 0, t[5] = Math.cos(e), t[6] = -Math.sin(e), t[7] = 0, t[8] = 0, t[9] = Math.sin(e), t[10] = Math.cos(e), t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1
                        },
                        A = function(t, e) {
                            t[0] = Math.cos(e), t[1] = 0, t[2] = Math.sin(e), t[3] = 0, t[4] = 0, t[5] = 1, t[6] = 0, t[7] = 0, t[8] = -Math.sin(e), t[9] = 0, t[10] = Math.cos(e), t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1
                        },
                        z = function(t, e) {
                            t[0] = Math.cos(e), t[1] = -Math.sin(e), t[2] = 0, t[3] = 0, t[4] = Math.sin(e), t[5] = Math.cos(e), t[6] = 0, t[7] = 0, t[8] = 0, t[9] = 0, t[10] = 1, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1
                        },
                        N = function(t, e, i) {
                            t[0] = 1, t[1] = Math.tan(e), t[2] = 0, t[3] = 0, t[4] = Math.tan(i), t[5] = 1, t[6] = 0, t[7] = 0, t[8] = 0, t[9] = 0, t[10] = 1, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1
                        },
                        U = function(t, e, i) {
                            t[0] = e, t[1] = 0, t[2] = 0, t[3] = 0, t[4] = 0, t[5] = i, t[6] = 0, t[7] = 0, t[8] = 0, t[9] = 0, t[10] = 1, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1
                        },
                        H = function(t) {
                            t[0] = 1, t[1] = 0, t[2] = 0, t[3] = 0, t[4] = 0, t[5] = 1, t[6] = 0, t[7] = 0, t[8] = 0, t[9] = 0, t[10] = 1, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1
                        },
                        F = function(t, e) {
                            e[0] = t[0], e[1] = t[1], e[2] = t[2], e[3] = t[3], e[4] = t[4], e[5] = t[5], e[6] = t[6], e[7] = t[7], e[8] = t[8], e[9] = t[9], e[10] = t[10], e[11] = t[11], e[12] = t[12], e[13] = t[13], e[14] = t[14], e[15] = t[15]
                        },
                        W = function() {
                            var t = new Float32Array(16),
                                e = new Float32Array(16),
                                i = new Float32Array(16);
                            return H(t), {
                                data: t,
                                asCSS: function() {
                                    for (var e = "matrix3d(", i = 0; i < 15; ++i) e += Math.abs(t[i]) < 1e-4 ? "0," : t[i].toFixed(10) + ",";
                                    return e += Math.abs(t[15]) < 1e-4 ? "0)" : t[15].toFixed(10) + ")"
                                },
                                clear: function() {
                                    H(t)
                                },
                                translate: function(n, o, r) {
                                    return F(t, e), L(i, n, o, r), B(e, i, t), this
                                },
                                rotateX: function(n) {
                                    return F(t, e), D(i, n), B(e, i, t), this
                                },
                                rotateY: function(n) {
                                    return F(t, e), A(i, n), B(e, i, t), this
                                },
                                rotateZ: function(n) {
                                    return F(t, e), z(i, n), B(e, i, t), this
                                },
                                scale: function(n, o) {
                                    return F(t, e), U(i, n, o), B(e, i, t), this
                                },
                                skew: function(n, o) {
                                    return F(t, e), N(i, n, o), B(e, i, t), this
                                }
                            }
                        },
                        B = function(t, e, i) {
                            return i[0] = t[0] * e[0] + t[1] * e[4] + t[2] * e[8] + t[3] * e[12], i[1] = t[0] * e[1] + t[1] * e[5] + t[2] * e[9] + t[3] * e[13], i[2] = t[0] * e[2] + t[1] * e[6] + t[2] * e[10] + t[3] * e[14], i[3] = t[0] * e[3] + t[1] * e[7] + t[2] * e[11] + t[3] * e[15], i[4] = t[4] * e[0] + t[5] * e[4] + t[6] * e[8] + t[7] * e[12], i[5] = t[4] * e[1] + t[5] * e[5] + t[6] * e[9] + t[7] * e[13], i[6] = t[4] * e[2] + t[5] * e[6] + t[6] * e[10] + t[7] * e[14], i[7] = t[4] * e[3] + t[5] * e[7] + t[6] * e[11] + t[7] * e[15], i[8] = t[8] * e[0] + t[9] * e[4] + t[10] * e[8] + t[11] * e[12], i[9] = t[8] * e[1] + t[9] * e[5] + t[10] * e[9] + t[11] * e[13], i[10] = t[8] * e[2] + t[9] * e[6] + t[10] * e[10] + t[11] * e[14], i[11] = t[8] * e[3] + t[9] * e[7] + t[10] * e[11] + t[11] * e[15], i[12] = t[12] * e[0] + t[13] * e[4] + t[14] * e[8] + t[15] * e[12], i[13] = t[12] * e[1] + t[13] * e[5] + t[14] * e[9] + t[15] * e[13], i[14] = t[12] * e[2] + t[13] * e[6] + t[14] * e[10] + t[15] * e[14], i[15] = t[12] * e[3] + t[13] * e[7] + t[14] * e[11] + t[15] * e[15], i
                        },
                        j = function(t) {
                            var i = W(),
                                n = {
                                    opacity: e,
                                    width: e,
                                    height: e
                                };
                            return {
                                position: t.position,
                                rotation: t.rotation,
                                rotationPost: t.rotationPost,
                                skew: t.skew,
                                scale: t.scale,
                                scalePost: t.scalePost,
                                opacity: t.opacity,
                                width: t.width,
                                height: t.height,
                                clone: function() {
                                    return j({
                                        position: this.position ? this.position.slice(0) : e,
                                        rotation: this.rotation ? this.rotation.slice(0) : e,
                                        rotationPost: this.rotationPost ? this.rotationPost.slice(0) : e,
                                        skew: this.skew ? this.skew.slice(0) : e,
                                        scale: this.scale ? this.scale.slice(0) : e,
                                        scalePost: this.scalePost ? this.scalePost.slice(0) : e,
                                        height: this.height,
                                        width: this.width,
                                        opacity: this.opacity
                                    })
                                },
                                asMatrix: function() {
                                    var t = i;
                                    return t.clear(), this.transformOrigin && t.translate(-this.transformOrigin[0], -this.transformOrigin[1], -this.transformOrigin[2]), this.scale && t.scale(this.scale[0], this.scale[1]), this.skew && t.skew(this.skew[0], this.skew[1]), this.rotation && (t.rotateX(this.rotation[0]), t.rotateY(this.rotation[1]), t.rotateZ(this.rotation[2])), this.position && t.translate(this.position[0], this.position[1], this.position[2]), this.rotationPost && (t.rotateX(this.rotationPost[0]), t.rotateY(this.rotationPost[1]), t.rotateZ(this.rotationPost[2])), this.scalePost && t.scale(this.scalePost[0], this.scalePost[1]), this.transformOrigin && t.translate(this.transformOrigin[0], this.transformOrigin[1], this.transformOrigin[2]), t
                                },
                                getProperties: function() {
                                    return n.opacity = this.opacity, n.width = this.width + "px", n.height = this.height + "px", n
                                }
                            }
                        },
                        q = function(t, i, n) {
                            var o = t,
                                r = i,
                                a = n,
                                s = r.position !== e,
                                h = r.rotation !== e,
                                u = r.rotationPost !== e,
                                l = r.scale !== e,
                                c = r.skew !== e,
                                p = r.width !== e,
                                d = r.height !== e,
                                f = r.opacity !== e;
                            return {
                                tween: function(t) {
                                    if (s) {
                                        var e = r.position[0] - o.position[0],
                                            i = r.position[1] - o.position[1],
                                            n = r.position[2] - o.position[2];
                                        a.position[0] = o.position[0] + t * e, a.position[1] = o.position[1] + t * i, a.position[2] = o.position[2] + t * n
                                    }
                                    if (h) {
                                        var _ = r.rotation[0] - o.rotation[0],
                                            m = r.rotation[1] - o.rotation[1],
                                            g = r.rotation[2] - o.rotation[2];
                                        a.rotation[0] = o.rotation[0] + t * _, a.rotation[1] = o.rotation[1] + t * m, a.rotation[2] = o.rotation[2] + t * g
                                    }
                                    if (u) {
                                        var v = r.rotationPost[0] - o.rotationPost[0],
                                            y = r.rotationPost[1] - o.rotationPost[1],
                                            w = r.rotationPost[2] - o.rotationPost[2];
                                        a.rotationPost[0] = o.rotationPost[0] + t * v, a.rotationPost[1] = o.rotationPost[1] + t * y, a.rotationPost[2] = o.rotationPost[2] + t * w
                                    }
                                    if (c) {
                                        var b = r.scale[0] - o.scale[0],
                                            k = r.scale[1] - o.scale[1];
                                        a.scale[0] = o.scale[0] + t * b, a.scale[1] = o.scale[1] + t * k
                                    }
                                    if (l) {
                                        var x = r.skew[0] - o.skew[0],
                                            E = r.skew[1] - o.skew[1];
                                        a.skew[0] = o.skew[0] + t * x, a.skew[1] = o.skew[1] + t * E
                                    }
                                    if (p) {
                                        var C = r.width - o.width;
                                        a.width = o.width + t * C
                                    }
                                    if (d) {
                                        var S = r.height - o.height;
                                        a.height = o.height + t * S
                                    }
                                    if (f) {
                                        var P = r.opacity - o.opacity;
                                        a.opacity = o.opacity + t * P
                                    }
                                },
                                asMatrix: function() {
                                    return a.asMatrix()
                                },
                                getProperties: function() {
                                    return a.getProperties()
                                },
                                setReverse: function() {
                                    var t = o;
                                    o = r, r = t
                                }
                            }
                        },
                        V = function(t, i, n, o) {
                            var r = t(0, W()),
                                a = i,
                                s = n,
                                h = o,
                                u = !1;
                            return {
                                tween: function(i) {
                                    u && (i = 1 - i), r.clear(), r = t(i, r);
                                    var n = s.width - a.width,
                                        o = s.height - a.height,
                                        l = s.opacity - a.opacity;
                                    s.width !== e && (h.width = a.width + i * n), s.height !== e && (h.height = a.height + i * o), s.opacity !== e && (h.opacity = a.opacity + i * l)
                                },
                                asMatrix: function() {
                                    return r
                                },
                                getProperties: function() {
                                    return h.getProperties()
                                },
                                setReverse: function() {
                                    u = !0
                                }
                            }
                        },
                        G = function(t, e) {
                            return "undefined" == typeof t ? e : t
                        },
                        X = function(t, e, i) {
                            var n = "";
                            i && (n = "perspective(" + i + "px) ");
                            var r = e.asCSS();
                            t.style[o] = n + r
                        },
                        Y = function(t, e) {
                            for (var i in e) t.style[i] = e[i]
                        },
                        $ = function(t) {
                            return "function" == typeof t
                        },
                        J = function(t) {
                            if (!t) return t;
                            var e = {};
                            for (var i in t) e[i] = t[i];
                            return e
                        };
                    return s.createMatrix = W, s.setElementTransform = X, s
                }(),
                l = function() {
                    function t(t, e, i, n, o) {
                        if ("string" == typeof t) t = document.getElementById(t);
                        else if (!t instanceof HTMLCanvasElement) return;
                        var r, a = t.getContext("2d");
                        try {
                            try {
                                r = a.getImageData(e, i, n, o)
                            } catch (s) {
                                throw new Error("unable to access local image data: " + s)
                            }
                        } catch (s) {
                            throw new Error("unable to access image data: " + s)
                        }
                        return r
                    }

                    function e(e, n, o, r, a, s) {
                        if (!(isNaN(s) || s < 1)) {
                            s |= 0;
                            var h = t(e, n, o, r, a);
                            h = i(h, n, o, r, a, s), e.getContext("2d").putImageData(h, n, o)
                        }
                    }

                    function i(t, e, i, a, s, h) {
                        var u, l, c, p, d, f, _, m, g, v, y, w, b, k, x, E, C, S, P, I, O, T, M, R, L = t.data,
                            D = h + h + 1,
                            A = a - 1,
                            z = s - 1,
                            N = h + 1,
                            U = N * (N + 1) / 2,
                            H = new n,
                            F = H;
                        for (c = 1; c < D; c++)
                            if (F = F.next = new n, c == N) var W = F;
                        F.next = H;
                        var B = null,
                            j = null;
                        _ = f = 0;
                        var q = o[h],
                            V = r[h];
                        for (l = 0; l < s; l++) {
                            for (E = C = S = P = m = g = v = y = 0, w = N * (I = L[f]), b = N * (O = L[f + 1]), k = N * (T = L[f + 2]), x = N * (M = L[f + 3]), m += U * I, g += U * O, v += U * T, y += U * M, F = H, c = 0; c < N; c++) F.r = I, F.g = O, F.b = T, F.a = M, F = F.next;
                            for (c = 1; c < N; c++) p = f + ((A < c ? A : c) << 2), m += (F.r = I = L[p]) * (R = N - c), g += (F.g = O = L[p + 1]) * R, v += (F.b = T = L[p + 2]) * R, y += (F.a = M = L[p + 3]) * R, E += I, C += O, S += T, P += M, F = F.next;
                            for (B = H, j = W, u = 0; u < a; u++) L[f + 3] = M = y * q >> V, 0 != M ? (M = 255 / M, L[f] = (m * q >> V) * M, L[f + 1] = (g * q >> V) * M, L[f + 2] = (v * q >> V) * M) : L[f] = L[f + 1] = L[f + 2] = 0, m -= w, g -= b, v -= k, y -= x, w -= B.r, b -= B.g, k -= B.b, x -= B.a, p = _ + ((p = u + h + 1) < A ? p : A) << 2, E += B.r = L[p], C += B.g = L[p + 1], S += B.b = L[p + 2], P += B.a = L[p + 3], m += E, g += C, v += S, y += P, B = B.next, w += I = j.r, b += O = j.g, k += T = j.b, x += M = j.a, E -= I, C -= O, S -= T, P -= M, j = j.next, f += 4;
                            _ += a
                        }
                        for (u = 0; u < a; u++) {
                            for (C = S = P = E = g = v = y = m = 0, f = u << 2, w = N * (I = L[f]), b = N * (O = L[f + 1]), k = N * (T = L[f + 2]), x = N * (M = L[f + 3]), m += U * I, g += U * O, v += U * T, y += U * M, F = H, c = 0; c < N; c++) F.r = I, F.g = O, F.b = T, F.a = M, F = F.next;
                            for (d = a, c = 1; c <= h; c++) f = d + u << 2, m += (F.r = I = L[f]) * (R = N - c), g += (F.g = O = L[f + 1]) * R, v += (F.b = T = L[f + 2]) * R, y += (F.a = M = L[f + 3]) * R, E += I, C += O, S += T, P += M, F = F.next, c < z && (d += a);
                            for (f = u, B = H, j = W, l = 0; l < s; l++) p = f << 2, L[p + 3] = M = y * q >> V, M > 0 ? (M = 255 / M, L[p] = (m * q >> V) * M, L[p + 1] = (g * q >> V) * M, L[p + 2] = (v * q >> V) * M) : L[p] = L[p + 1] = L[p + 2] = 0, m -= w, g -= b, v -= k, y -= x, w -= B.r, b -= B.g, k -= B.b, x -= B.a, p = u + ((p = l + N) < z ? p : z) * a << 2, m += E += B.r = L[p], g += C += B.g = L[p + 1], v += S += B.b = L[p + 2], y += P += B.a = L[p + 3], B = B.next, w += I = j.r, b += O = j.g, k += T = j.b, x += M = j.a, E -= I, C -= O, S -= T, P -= M, j = j.next, f += a
                        }
                        return t
                    }

                    function n() {
                        this.r = 0, this.g = 0, this.b = 0, this.a = 0, this.next = null
                    }
                    var o = [512, 512, 456, 512, 328, 456, 335, 512, 405, 328, 271, 456, 388, 335, 292, 512, 454, 405, 364, 328, 298, 271, 496, 456, 420, 388, 360, 335, 312, 292, 273, 512, 482, 454, 428, 405, 383, 364, 345, 328, 312, 298, 284, 271, 259, 496, 475, 456, 437, 420, 404, 388, 374, 360, 347, 335, 323, 312, 302, 292, 282, 273, 265, 512, 497, 482, 468, 454, 441, 428, 417, 405, 394, 383, 373, 364, 354, 345, 337, 328, 320, 312, 305, 298, 291, 284, 278, 271, 265, 259, 507, 496, 485, 475, 465, 456, 446, 437, 428, 420, 412, 404, 396, 388, 381, 374, 367, 360, 354, 347, 341, 335, 329, 323, 318, 312, 307, 302, 297, 292, 287, 282, 278, 273, 269, 265, 261, 512, 505, 497, 489, 482, 475, 468, 461, 454, 447, 441, 435, 428, 422, 417, 411, 405, 399, 394, 389, 383, 378, 373, 368, 364, 359, 354, 350, 345, 341, 337, 332, 328, 324, 320, 316, 312, 309, 305, 301, 298, 294, 291, 287, 284, 281, 278, 274, 271, 268, 265, 262, 259, 257, 507, 501, 496, 491, 485, 480, 475, 470, 465, 460, 456, 451, 446, 442, 437, 433, 428, 424, 420, 416, 412, 408, 404, 400, 396, 392, 388, 385, 381, 377, 374, 370, 367, 363, 360, 357, 354, 350, 347, 344, 341, 338, 335, 332, 329, 326, 323, 320, 318, 315, 312, 310, 307, 304, 302, 299, 297, 294, 292, 289, 287, 285, 282, 280, 278, 275, 273, 271, 269, 267, 265, 263, 261, 259],
                        r = [9, 11, 12, 13, 13, 14, 14, 15, 15, 15, 15, 16, 16, 16, 16, 17, 17, 17, 17, 17, 17, 17, 18, 18, 18, 18, 18, 18, 18, 18, 18, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24];
                    return e
                }();
            HTMLCanvasElement.prototype.toBlob || Object.defineProperty(HTMLCanvasElement.prototype, "toBlob", {
                value: function(t, e, i) {
                    for (var n = atob(this.toDataURL(e, i).split(",")[1]), o = n.length, r = new Uint8Array(o), a = 0; a < o; a++) r[a] = n.charCodeAt(a);
                    t(new Blob([r], {
                        type: e || "image/png"
                    }))
                }
            });
            var c = function() {
                    function t(t, e) {
                        for (var i = 0; i < e.length; i++) {
                            var n = e[i];
                            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
                        }
                    }
                    return function(e, i, n) {
                        return i && t(e.prototype, i), n && t(e, n), e
                    }
                }(),
                p = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
                    return typeof t
                } : function(t) {
                    return t && "function" == typeof Symbol && t.constructor === Symbol ? "symbol" : typeof t
                },
                d = function(t) {
                    if ("undefined" == typeof t.dataset) {
                        var e, i, n = {},
                            o = t.attributes;
                        for (e in o) o.hasOwnProperty(e) && o[e].name && /^data-[a-z_\-\d]*$/i.test(o[e].name) && (i = f(o[e].name.substr(5)), n[i] = o[e].value);
                        return n
                    }
                    return t.dataset
                },
                f = function(t) {
                    return t.replace(/\-./g, function(t) {
                        return t.charAt(1).toUpperCase()
                    })
                },
                _ = function(t) {
                    return Array.prototype.slice.call(t.attributes).map(function(t) {
                        return {
                            name: t.name,
                            value: t.value
                        }
                    })
                },
                m = function(t) {
                    return {
                        x: "undefined" == typeof t.offsetX ? t.layerX : t.offsetX,
                        y: "undefined" == typeof t.offsetY ? t.layerY : t.offsetY
                    }
                },
                g = function(t, e) {
                    var i, n = {},
                        o = e || {};
                    for (i in t) t.hasOwnProperty(i) && (n[i] = "undefined" == typeof o[i] ? t[i] : o[i]);
                    return n
                },
                v = {
                    ESC: 27,
                    RETURN: 13
                },
                y = {
                    DOWN: ["touchstart", "pointerdown", "mousedown"],
                    MOVE: ["touchmove", "pointermove", "mousemove"],
                    UP: ["touchend", "touchcancel", "pointerup", "mouseup"]
                },
                w = {
                    jpeg: "image/jpeg",
                    jpg: "image/jpeg",
                    jpe: "image/jpeg",
                    png: "image/png",
                    gif: "image/gif",
                    bmp: "image/bmp"
                },
                b = /(\.png|\.bmp|\.gif|\.jpg|\.jpe|\.jpg|\.jpeg)$/,
                k = function(t, e) {
                    var i = document.createElement(t);
                    return e && (i.className = e), i
                },
                x = function(t, e, i) {
                    e.forEach(function(e) {
                        t.addEventListener(e, i, !1)
                    })
                },
                E = function(t, e, i) {
                    e.forEach(function(e) {
                        t.removeEventListener(e, i, !1)
                    })
                },
                C = function(t) {
                    var e = t.changedTouches ? t.changedTouches[0] : t;
                    if (e) return {
                        x: e.pageX,
                        y: e.pageY
                    }
                },
                S = function(t, e) {
                    var i = C(t),
                        n = e.getBoundingClientRect(),
                        o = window.pageYOffset || document.documentElement.scrollTop,
                        r = window.pageXOffset || document.documentElement.scrollLeft;
                    return {
                        x: i.x - n.left - r,
                        y: i.y - n.top - o
                    }
                },
                P = function(t) {
                    return t.charAt(0).toLowerCase() + t.slice(1)
                },
                I = function(t) {
                    return t.charAt(0).toUpperCase() + t.slice(1)
                },
                O = function(t) {
                    return t[t.length - 1]
                },
                T = function(t, e, i) {
                    return Math.max(e, Math.min(i, t))
                },
                M = function(t, e) {
                    return e.indexOf(t) !== -1
                },
                R = function(t, e, i, n, o, r) {
                    var a = new XMLHttpRequest;
                    n && a.upload.addEventListener("progress", function(t) {
                        n(t.loaded, t.total)
                    }), a.open("POST", t, !0), i && i(a), a.onreadystatechange = function() {
                        if (4 === a.readyState && 200 === a.status) {
                            var t = a.responseText;
                            if (!t.length) return void o();
                            if (t.indexOf("Content-Length") !== -1) return void r("file-too-big");
                            var e = void 0;
                            try {
                                e = JSON.parse(a.responseText)
                            } catch (i) {}
                            if ("object" === ("undefined" == typeof e ? "undefined" : p(e)) && "failure" === e.status) return void r(e.message);
                            o(e || t)
                        } else 4 === a.readyState && r("fail")
                    }, a.send(e)
                },
                L = function(t) {
                    t && (t.style.webkitTransform = "", t.style.transform = "")
                },
                D = function(t) {
                    return t / 1e6
                },
                A = function() {
                    var t = [],
                        e = void 0,
                        i = void 0;
                    for (e in w) w.hasOwnProperty(e) && (i = w[e], t.indexOf(i) == -1 && t.push(i));
                    return t
                },
                z = function(t) {
                    return "image/jpeg" === t
                },
                N = function(t) {
                    var e = void 0;
                    for (e in w)
                        if (w.hasOwnProperty(e) && w[e] === t) return e;
                    return t
                },
                U = function(t) {
                    var e = void 0;
                    for (e in w)
                        if (w.hasOwnProperty(e) && t.indexOf(w[e]) !== -1) return w[e];
                    return null
                },
                H = function(t) {
                    if (!t) return null;
                    var e = null;
                    return "function" == typeof t.getAsFile && (e = t.getAsFile()), e ? e.type : t.type
                },
                F = function(t) {
                    return t.split("/").pop().split("?").shift()
                },
                W = function(t) {
                    if ("string" != typeof t) return "unknown";
                    var e = F(t);
                    return e.split(".").shift()
                },
                B = function(t, e) {
                    return t.lastModifiedDate = new Date, t.name = e, t
                },
                j = function(t) {
                    return /^data:image/.test(t)
                },
                q = function(t, e) {
                    var i = new XMLHttpRequest;
                    i.open("GET", t, !0), i.responseType = "blob", i.onload = function(i) {
                        var n = F(t),
                            o = U(this.response.type);
                        b.test(n) || (n += "." + N(o));
                        var r = B(this.response, n);
                        e(ht(r, o))
                    }, i.send()
                },
                V = function(t) {
                    var e = t.split(",")[1],
                        i = e.replace(/\s/g, "");
                    return atob(i)
                },
                G = function(t) {
                    for (var e = V(t), i = new ArrayBuffer(e.length), n = new Uint8Array(i), o = 0; o < e.length; o++) n[o] = e.charCodeAt(o);
                    var r = ct(t);
                    return B(new Blob([i], {
                        type: r
                    }), "unknown." + N(r))
                },
                X = function(t, e) {
                    var i = "string" != typeof t || 0 !== t.indexOf("data:image");
                    n.parseMetaData(t, function(o) {
                        var r = {
                            canvas: !0,
                            crossOrigin: i
                        };
                        o.exif && (r.orientation = o.exif.get("Orientation")), n(t, function(t) {
                            return "error" === t.type ? void e() : void e(t, o)
                        }, r)
                    })
                },
                Y = function(t, e, i) {
                    var n, o, r, a, s = e / t;
                    return s < i ? (a = e, r = a / i, n = .5 * (t - r), o = 0) : (r = t, a = r * i, n = 0, o = .5 * (e - a)), {
                        x: n,
                        y: o,
                        height: a,
                        width: r
                    }
                },
                $ = function(t) {
                    var n = arguments.length <= 1 || arguments[1] === e ? {} : arguments[1],
                        o = arguments[2],
                        r = k("canvas"),
                        a = n.rotation,
                        s = n.crop,
                        h = n.size;
                    if (s) {
                        var u = a % 180 !== 0,
                            l = {
                                width: u ? t.height : t.width,
                                height: u ? t.width : t.height
                            },
                            c = s.x / l.width,
                            p = s.y / l.height,
                            d = s.width / l.width,
                            f = s.height / l.height;
                        s.y + s.height > l.height && (s.y = Math.max(0, l.height - s.height)), s.x + s.width > l.width && (s.x = Math.max(0, l.width - s.width)), r.width = s.width, r.height = s.height;
                        var _ = r.getContext("2d");
                        90 === a ? (_.translate(.5 * r.width, .5 * r.height), _.rotate(-90 * Math.PI / 180), _.drawImage(t, (1 - p) * t.width - t.width * f, s.x, s.height, s.width, .5 * -r.height, .5 * -r.width, r.height, r.width)) : 180 === a ? (_.translate(.5 * r.width, .5 * r.height), _.rotate(-180 * Math.PI / 180), _.drawImage(t, (1 - (c + d)) * l.width, (1 - (p + f)) * l.height, d * l.width, f * l.height, .5 * -r.width, .5 * -r.height, r.width, r.height)) : 270 === a ? (_.translate(.5 * r.width, .5 * r.height), _.rotate(-270 * Math.PI / 180), _.drawImage(t, s.y, (1 - c) * t.height - t.height * d, s.height, s.width, .5 * -r.height, .5 * -r.width, r.height, r.width)) : _.drawImage(t, s.x, s.y, s.width, s.height, 0, 0, r.width, r.height)
                    }
                    if (h) {
                        var m = h.width / r.width,
                            g = h.height / r.height,
                            v = Math.min(m, g);
                        i(r, v)
                    }
                    o(r)
                },
                J = function(t, e) {
                    var i = Math.abs(t.width - e.width),
                        n = Math.abs(t.height - e.height);
                    return Math.max(i, n)
                },
                Z = function(t) {
                    return K(t, 1)
                },
                K = function(t, e) {
                    if (!t) return null;
                    var n = document.createElement("canvas"),
                        o = n.getContext("2d");
                    return n.width = t.width, n.height = t.height, o.drawImage(t, 0, 0), e > 0 && 1 != e && i(n, e), n
                },
                Q = function(t) {
                    return t.width && t.height
                },
                tt = function(t, e) {
                    var i = e.getContext("2d");
                    Q(e) ? i.drawImage(t, 0, 0, e.width, e.height) : (e.width = t.width, e.height = t.height, i.drawImage(t, 0, 0))
                },
                et = function(t) {
                    l(t, 0, 0, t.width, t.height, 3)
                },
                it = function(t, e, i) {
                    t.toBlob(function(t) {
                        if ("msSaveBlob" in window.navigator) return void window.navigator.msSaveBlob(t, e);
                        var i = URL.createObjectURL(t),
                            n = k("a");
                        n.style.display = "none", n.download = e, n.href = i, document.body.appendChild(n), n.click(), setTimeout(function() {
                            document.body.removeChild(n), URL.revokeObjectURL(i)
                        }, 0)
                    }, i)
                },
                nt = function(t, e) {
                    return parseInt(t.width, 10) >= e.width && parseInt(t.height, 10) >= e.height
                },
                ot = function(t, e, i) {
                    return {
                        x: t.x * e,
                        y: t.y * i,
                        width: t.width * e,
                        height: t.height * i
                    }
                },
                rt = function(t, e, i) {
                    return {
                        x: t.x / e,
                        y: t.y / i,
                        width: t.width / e,
                        height: t.height / i
                    }
                },
                at = function(t) {
                    if (t && "" !== t.value) {
                        try {
                            t.value = ""
                        } catch (e) {}
                        if (t.value) {
                            var i = document.createElement("form"),
                                n = t.parentNode,
                                o = t.nextSibling;
                            i.appendChild(t), i.reset(), o ? n.insertBefore(t, o) : n.appendChild(t)
                        }
                    }
                },
                st = function(t) {
                    return "object" === ("undefined" == typeof value ? "undefined" : p(value)) && null !== value ? JSON.parse(JSON.stringify(t)) : t
                },
                ht = function(t) {
                    var i = arguments.length <= 1 || arguments[1] === e ? null : arguments[1];
                    if (!t) return null;
                    var n = t.slice(0, t.size, i || t.type);
                    return n.name = t.name, n.lastModifiedDate = new Date(t.lastModifiedDate), n
                },
                ut = function(t) {
                    var e = st(t);
                    return e.input.file = ht(t.input.file), e.output.image = Z(t.output.image), e
                },
                lt = function(t, i, n) {
                    return t && i ? t.toDataURL(i, z(i) && "number" == typeof n ? n / 100 : e) : null
                },
                ct = function(t) {
                    if (!t) return null;
                    var e = t.substr(0, 16).match(/^.+;/);
                    return e.length ? e[0].substring(5, e[0].length - 1) : null
                },
                pt = function(t) {
                    var i = arguments.length <= 1 || arguments[1] === e ? [] : arguments[1],
                        n = arguments[2],
                        o = arguments[3],
                        r = {
                            server: st(t.server),
                            meta: st(t.meta),
                            input: {
                                name: t.input.name,
                                type: t.input.type,
                                size: t.input.size,
                                width: t.input.width,
                                height: t.input.height,
                                field: t.input.field
                            }
                        };
                    return M("output", i) && (r.output = {
                        name: o ? W(t.input.name) + "." + o : t.input.name,
                        type: w[o] || t.input.type,
                        width: t.output.width,
                        height: t.output.height
                    }, r.output.image = lt(t.output.image, r.output.type, n), r.output.type = ct(r.output.image), "image/png" === r.output.type && (r.output.name = W(r.input.name) + ".png")), M("actions", i) && (r.actions = st(t.actions)), r
                },
                dt = function(t, e, i) {
                    var n = i.querySelector(t);
                    n && (n.style.display = e ? "" : "none")
                },
                ft = function(t) {
                    return Array.prototype.slice.call(t)
                },
                _t = function(t) {
                    t.parentNode.removeChild(t)
                },
                mt = function(t) {
                    var e = k("div");
                    return t.parentNode && (t.nextSibling ? t.parentNode.insertBefore(e, t.nextSibling) : t.parentNode.appendChild(e)), e.appendChild(t), e
                },
                gt = function(t, e, i, n) {
                    var o = (n - 90) * Math.PI / 180;
                    return {
                        x: t + i * Math.cos(o),
                        y: e + i * Math.sin(o)
                    }
                },
                vt = function(t, e, i, n, o) {
                    var r = gt(t, e, i, o),
                        a = gt(t, e, i, n),
                        s = o - n <= 180 ? "0" : "1",
                        h = ["M", r.x, r.y, "A", i, i, 0, s, 0, a.x, a.y].join(" ");
                    return h
                },
                yt = function(t, e, i, n) {
                    return vt(t, e, i, 0, 360 * n)
                },
                wt = function() {
                    var i = {
                        n: function(t, e, i, n) {
                            var o, r, a, s, h, u, l, c;
                            return a = t.y + t.height, o = T(e.y, 0, a), a - o < i.min.height && (o = a - i.min.height), h = n ? (a - o) / n : t.width, h < i.min.width && (h = i.min.width, o = a - h * n), l = .5 * (h - t.width), s = t.x - l, r = t.x + t.width + l, (s < 0 || r > i.width) && (c = Math.min(t.x, i.width - (t.x + t.width)), s = t.x - c, r = t.x + t.width + c, h = r - s, u = h * n, o = a - u), {
                                x: s,
                                y: o,
                                width: r - s,
                                height: a - o
                            }
                        },
                        s: function(t, e, i, n) {
                            var o, r, a, s, h, u, l, c;
                            return o = t.y, a = T(e.y, o, i.height), a - o < i.min.height && (a = o + i.min.height), h = n ? (a - o) / n : t.width, h < i.min.width && (h = i.min.width, a = o + h * n), l = .5 * (h - t.width), s = t.x - l, r = t.x + t.width + l, (s < 0 || r > i.width) && (c = Math.min(t.x, i.width - (t.x + t.width)), s = t.x - c, r = t.x + t.width + c, h = r - s, u = h * n, a = o + u), {
                                x: s,
                                y: o,
                                width: r - s,
                                height: a - o
                            }
                        },
                        e: function(t, e, i, n) {
                            var o, r, a, s, h, u, l, c;
                            return s = t.x, r = T(e.x, s, i.width), r - s < i.min.width && (r = s + i.min.width), u = n ? (r - s) * n : t.height, u < i.min.height && (u = i.min.height, r = s + u / n), l = .5 * (u - t.height), o = t.y - l, a = t.y + t.height + l, (o < 0 || a > i.height) && (c = Math.min(t.y, i.height - (t.y + t.height)), o = t.y - c, a = t.y + t.height + c, u = a - o, h = u / n, r = s + h), {
                                x: s,
                                y: o,
                                width: r - s,
                                height: a - o
                            }
                        },
                        w: function n(t, e, i, o) {
                            var r, a, s, h, n, u, l, c;
                            return a = t.x + t.width, h = T(e.x, 0, a), a - h < i.min.width && (h = a - i.min.width), u = o ? (a - h) * o : t.height, u < i.min.height && (u = i.min.height, h = a - u / o), l = .5 * (u - t.height), r = t.y - l, s = t.y + t.height + l, (r < 0 || s > i.height) && (c = Math.min(t.y, i.height - (t.y + t.height)), r = t.y - c, s = t.y + t.height + c, u = s - r, n = u / o, h = a - n), {
                                x: h,
                                y: r,
                                width: a - h,
                                height: s - r
                            }
                        },
                        ne: function(t, e, i, n) {
                            var o, r, a, s, h, u, l;
                            return s = t.x, a = t.y + t.height, r = T(e.x, s, i.width), r - s < i.min.width && (r = s + i.min.width), u = n ? (r - s) * n : T(a - e.y, i.min.height, a), u < i.min.height && (u = i.min.height, r = s + u / n), o = t.y - (u - t.height), (o < 0 || a > i.height) && (l = Math.min(t.y, i.height - (t.y + t.height)), o = t.y - l, u = a - o, h = u / n, r = s + h), {
                                x: s,
                                y: o,
                                width: r - s,
                                height: a - o
                            }
                        },
                        se: function(t, e, i, n) {
                            var o, r, a, s, h, u, l;
                            return s = t.x, o = t.y, r = T(e.x, s, i.width), r - s < i.min.width && (r = s + i.min.width), u = n ? (r - s) * n : T(e.y - t.y, i.min.height, i.height - o), u < i.min.height && (u = i.min.height, r = s + u / n), a = t.y + t.height + (u - t.height), (o < 0 || a > i.height) && (l = Math.min(t.y, i.height - (t.y + t.height)), a = t.y + t.height + l, u = a - o, h = u / n, r = s + h), {
                                x: s,
                                y: o,
                                width: r - s,
                                height: a - o
                            }
                        },
                        sw: function(t, e, i, n) {
                            var o, r, a, s, h, u, l;
                            return r = t.x + t.width, o = t.y, s = T(e.x, 0, r), r - s < i.min.width && (s = r - i.min.width), u = n ? (r - s) * n : T(e.y - t.y, i.min.height, i.height - o), u < i.min.height && (u = i.min.height, s = r - u / n), a = t.y + t.height + (u - t.height), (o < 0 || a > i.height) && (l = Math.min(t.y, i.height - (t.y + t.height)), a = t.y + t.height + l, u = a - o, h = u / n, s = r - h), {
                                x: s,
                                y: o,
                                width: r - s,
                                height: a - o
                            }
                        },
                        nw: function(t, e, i, n) {
                            var o, r, a, s, h, u, l;
                            return r = t.x + t.width, a = t.y + t.height, s = T(e.x, 0, r), r - s < i.min.width && (s = r - i.min.width), u = n ? (r - s) * n : T(a - e.y, i.min.height, a), u < i.min.height && (u = i.min.height, s = r - u / n), o = t.y - (u - t.height), (o < 0 || a > i.height) && (l = Math.min(t.y, i.height - (t.y + t.height)), o = t.y - l, u = a - o, h = u / n, s = r - h), {
                                x: s,
                                y: o,
                                width: r - s,
                                height: a - o
                            }
                        }
                    };
                    return function() {
                        function n() {
                            var i = arguments.length <= 0 || arguments[0] === e ? document.createElement("div") : arguments[0];
                            t(this, n), this._element = i, this._interaction = null, this._minWidth = 0, this._minHeight = 0, this._ratio = null, this._rect = {
                                x: 0,
                                y: 0,
                                width: 0,
                                height: 0
                            }, this._space = {
                                width: 0,
                                height: 0
                            }, this._rectChanged = !1, this._init()
                        }
                        return c(n, [{
                            key: "_init",
                            value: function() {
                                this._element.className = "slim-crop-area";
                                var t = k("div", "grid");
                                this._element.appendChild(t);
                                for (var e in i)
                                    if (i.hasOwnProperty(e)) {
                                        var n = k("button", e);
                                        this._element.appendChild(n)
                                    }
                                var o = k("button", "c");
                                this._element.appendChild(o), x(document, y.DOWN, this)
                            }
                        }, {
                            key: "reset",
                            value: function() {
                                this._interaction = null, this._rect = {
                                    x: 0,
                                    y: 0,
                                    width: 0,
                                    height: 0
                                }, this._rectChanged = !0, this._redraw(), this._element.dispatchEvent(new CustomEvent("change"))
                            }
                        }, {
                            key: "rescale",
                            value: function(t) {
                                1 !== t && (this._interaction = null, this._rectChanged = !0, this._rect.x *= t, this._rect.y *= t, this._rect.width *= t, this._rect.height *= t, this._redraw(), this._element.dispatchEvent(new CustomEvent("change")))
                            }
                        }, {
                            key: "limit",
                            value: function(t, e) {
                                this._space = {
                                    width: t,
                                    height: e
                                }
                            }
                        }, {
                            key: "resize",
                            value: function(t, e, i, n) {
                                this._interaction = null, this._rect = {
                                    x: T(t, 0, this._space.width - this._minWidth),
                                    y: T(e, 0, this._space.height - this._minHeight),
                                    width: T(i, this._minWidth, this._space.width),
                                    height: T(n, this._minHeight, this._space.height)
                                }, this._rectChanged = !0, this._redraw(), this._element.dispatchEvent(new CustomEvent("change"))
                            }
                        }, {
                            key: "handleEvent",
                            value: function(t) {
                                switch (t.type) {
                                    case "touchstart":
                                    case "pointerdown":
                                    case "mousedown":
                                        this._onStartDrag(t);
                                        break;
                                    case "touchmove":
                                    case "pointermove":
                                    case "mousemove":
                                        this._onDrag(t);
                                        break;
                                    case "touchend":
                                    case "touchcancel":
                                    case "pointerup":
                                    case "mouseup":
                                        this._onStopDrag(t)
                                }
                            }
                        }, {
                            key: "_onStartDrag",
                            value: function(t) {
                                this._element.contains(t.target) && (t.preventDefault(), x(document, y.MOVE, this), x(document, y.UP, this), this._interaction = {
                                    type: t.target.className,
                                    offset: S(t, this._element)
                                }, this._element.setAttribute("data-dragging", "true"), this._redraw())
                            }
                        }, {
                            key: "_onDrag",
                            value: function(t) {
                                t.preventDefault();
                                var e = S(t, this._element.parentNode),
                                    n = this._interaction.type;
                                "c" === n ? (this._rect.x = T(e.x - this._interaction.offset.x, 0, this._space.width - this._rect.width), this._rect.y = T(e.y - this._interaction.offset.y, 0, this._space.height - this._rect.height)) : i[n] && (this._rect = i[n](this._rect, e, {
                                    x: 0,
                                    y: 0,
                                    width: this._space.width,
                                    height: this._space.height,
                                    min: {
                                        width: this._minWidth,
                                        height: this._minHeight
                                    }
                                }, this._ratio)), this._rectChanged = !0, this._element.dispatchEvent(new CustomEvent("input"))
                            }
                        }, {
                            key: "_onStopDrag",
                            value: function(t) {
                                t.preventDefault(), E(document, y.MOVE, this), E(document, y.UP, this), this._interaction = null, this._element.setAttribute("data-dragging", "false"), this._element.dispatchEvent(new CustomEvent("change"))
                            }
                        }, {
                            key: "_redraw",
                            value: function() {
                                var t = this;
                                this._rectChanged && (this._element.style.cssText = "\n\t\t\t\t\tleft:" + this._rect.x + "px;\n\t\t\t\t\ttop:" + this._rect.y + "px;\n\t\t\t\t\twidth:" + this._rect.width + "px;\n\t\t\t\t\theight:" + this._rect.height + "px;\n\t\t\t\t", this._rectChanged = !1), this._interaction && requestAnimationFrame(function() {
                                    return t._redraw()
                                })
                            }
                        }, {
                            key: "destroy",
                            value: function() {
                                this._interaction = !1, this._rectChanged = !1, E(document, y.DOWN, this), E(document, y.MOVE, this), E(document, y.UP, this), _t(this._element)
                            }
                        }, {
                            key: "element",
                            get: function() {
                                return this._element
                            }
                        }, {
                            key: "space",
                            get: function() {
                                return this._space
                            }
                        }, {
                            key: "area",
                            get: function() {
                                var t = this._rect.x / this._space.width,
                                    e = this._rect.y / this._space.height,
                                    i = this._rect.width / this._space.width,
                                    n = this._rect.height / this._space.height;
                                return {
                                    x: t,
                                    y: e,
                                    width: i,
                                    height: n
                                }
                            }
                        }, {
                            key: "dirty",
                            get: function() {
                                return 0 !== this._rect.x || 0 !== this._rect.y || 0 !== this._rect.width || 0 !== this._rect.height
                            }
                        }, {
                            key: "minWidth",
                            set: function(t) {
                                this._minWidth = t
                            }
                        }, {
                            key: "minHeight",
                            set: function(t) {
                                this._minHeight = t
                            }
                        }, {
                            key: "ratio",
                            set: function(t) {
                                this._ratio = t
                            }
                        }]), n
                    }()
                }(),
                bt = function() {
                    var i = ["input", "change"],
                        n = function() {
                            function n() {
                                var i = arguments.length <= 0 || arguments[0] === e ? document.createElement("div") : arguments[0],
                                    o = arguments.length <= 1 || arguments[1] === e ? {} : arguments[1];
                                t(this, n), this._element = i, this._options = g(n.options(), o), this._ratio = null, this._output = null, this._input = null, this._preview = null, this._previewBlurred = null, this._blurredPreview = !1, this._cropper = null, this._previewWrapper = null, this._currentWindowSize = {}, this._btnGroup = null, this._dirty = !1, this._wrapperRotation = 0, this._wrapperScale = 1, this._init()
                            }
                            return c(n, [{
                                key: "_init",
                                value: function() {
                                    var t = this;
                                    this._element.className = "slim-image-editor", this._container = k("div", "slim-container"), this._wrapper = k("div", "slim-wrapper"), this._stage = k("div", "slim-stage"), this._container.appendChild(this._stage), this._cropper = new wt, i.forEach(function(e) {
                                        t._cropper.element.addEventListener(e, t)
                                    }), this._stage.appendChild(this._cropper.element), this._previewWrapper = k("div", "slim-image-editor-preview slim-crop-preview"), this._previewBlurred = k("canvas", "slim-crop-blur"), this._previewWrapper.appendChild(this._previewBlurred), this._wrapper.appendChild(this._previewWrapper), this._preview = k("img", "slim-crop"), this._previewWrapper.appendChild(this._preview), this._btnGroup = k("div", "slim-editor-btn-group"), n.Buttons.forEach(function(e) {
                                        var i = I(e),
                                            n = t._options["button" + i + "Label"],
                                            o = t._options["button" + i + "Title"],
                                            r = t._options["button" + i + "ClassName"],
                                            a = k("button", "slim-editor-btn slim-btn-" + e + (r ? " " + r : ""));
                                        a.innerHTML = n, a.title = o || n, a.type = "button", a.setAttribute("data-action", e), a.addEventListener("click", t), t._btnGroup.appendChild(a)
                                    }), this._utilsGroup = k("div", "slim-editor-utils-group");
                                    var e = k("button", "slim-editor-utils-btn slim-btn-rotate" + (this._options.buttonRotateClassName ? " " + this._options.buttonRotateClassName : ""));
                                    e.setAttribute("data-action", "rotate"), e.addEventListener("click", this), e.title = this._options.buttonRotateTitle, this._utilsGroup.appendChild(e), this._container.appendChild(this._wrapper), this._element.appendChild(this._container), this._element.appendChild(this._utilsGroup), this._element.appendChild(this._btnGroup)
                                }
                            }, {
                                key: "dirty",
                                value: function() {
                                    this._dirty = !0
                                }
                            }, {
                                key: "handleEvent",
                                value: function(t) {
                                    switch (t.type) {
                                        case "click":
                                            this._onClick(t);
                                            break;
                                        case "change":
                                            this._onGridChange(t);
                                            break;
                                        case "input":
                                            this._onGridInput(t);
                                            break;
                                        case "keydown":
                                            this._onKeyDown(t);
                                            break;
                                        case "resize":
                                            this._onResize(t)
                                    }
                                }
                            }, {
                                key: "_onKeyDown",
                                value: function(t) {
                                    switch (t.keyCode) {
                                        case v.RETURN:
                                            this._confirm();
                                            break;
                                        case v.ESC:
                                            this._cancel()
                                    }
                                }
                            }, {
                                key: "_onClick",
                                value: function(t) {
                                    t.target.classList.contains("slim-btn-cancel") && this._cancel(), t.target.classList.contains("slim-btn-confirm") && this._confirm(), t.target.classList.contains("slim-btn-rotate") && this._rotate()
                                }
                            }, {
                                key: "_onResize",
                                value: function() {
                                    this._currentWindowSize = {
                                        width: window.innerWidth,
                                        height: window.innerHeight
                                    }, this._redraw(), this._redrawCropper(this._cropper.area), this._updateWrapperScale(), this._redrawWrapper()
                                }
                            }, {
                                key: "_redrawWrapper",
                                value: function() {
                                    var t = u.createMatrix();
                                    t.scale(this._wrapperScale, this._wrapperScale), t.rotateZ(this._wrapperRotation * (Math.PI / 180)), u.setElementTransform(this._previewWrapper, t)
                                }
                            }, {
                                key: "_onGridInput",
                                value: function() {
                                    this._redrawCropMask()
                                }
                            }, {
                                key: "_onGridChange",
                                value: function() {
                                    this._redrawCropMask()
                                }
                            }, {
                                key: "_updateWrapperRotation",
                                value: function() {
                                    this._options.minSize.width > this._input.height || this._options.minSize.height > this._input.width ? this._wrapperRotation += 180 : this._wrapperRotation += 90
                                }
                            }, {
                                key: "_updateWrapperScale",
                                value: function() {
                                    var t = this._wrapperRotation % 180 !== 0;
                                    if (t) {
                                        var e = this._container.offsetWidth,
                                            i = this._container.offsetHeight,
                                            n = this._wrapper.offsetHeight,
                                            o = this._wrapper.offsetWidth,
                                            r = e / n;
                                        r * o > i && (r = i / o), this._wrapperScale = r
                                    } else this._wrapperScale = 1
                                }
                            }, {
                                key: "_cancel",
                                value: function() {
                                    this._element.dispatchEvent(new CustomEvent("cancel"))
                                }
                            }, {
                                key: "_confirm",
                                value: function() {
                                    var t = this._wrapperRotation % 180 !== 0,
                                        e = this._cropper.area,
                                        i = ot(e, t ? this._input.height : this._input.width, t ? this._input.width : this._input.height);
                                    this._element.dispatchEvent(new CustomEvent("confirm", {
                                        detail: {
                                            rotation: this._wrapperRotation % 360,
                                            crop: i
                                        }
                                    }))
                                }
                            }, {
                                key: "_rotate",
                                value: function() {
                                    var t = this;
                                    this._updateWrapperRotation(), this._updateWrapperScale(), this._clearCropMask(), this._hideCropper(), u(this._previewWrapper, {
                                        rotation: [0, 0, this._wrapperRotation * (Math.PI / 180)],
                                        scale: [this._wrapperScale, this._wrapperScale],
                                        easing: "spring",
                                        springConstant: .8,
                                        springDeceleration: .65,
                                        complete: function() {
                                            t._redrawCropper(), t._showCropper()
                                        }
                                    })
                                }
                            }, {
                                key: "_showCropper",
                                value: function() {
                                    u(this._stage, {
                                        easing: "ease",
                                        duration: 250,
                                        fromOpacity: 0,
                                        opacity: 1
                                    })
                                }
                            }, {
                                key: "_hideCropper",
                                value: function() {
                                    u(this._stage, {
                                        duration: 0,
                                        fromOpacity: 0,
                                        opacity: 0
                                    })
                                }
                            }, {
                                key: "_clearCropMask",
                                value: function() {
                                    this._preview.style.clip = ""
                                }
                            }, {
                                key: "_redrawCropMask",
                                value: function() {
                                    var t = this,
                                        e = this._wrapperRotation % 360,
                                        i = {
                                            width: this._wrapper.offsetWidth,
                                            height: this._wrapper.offsetHeight
                                        },
                                        n = this._cropper.area,
                                        o = n.x,
                                        r = n.y,
                                        a = n.width,
                                        s = n.height;
                                    90 === e ? (n.x = 1 - r - s, n.y = o, n.width = s, n.height = a) : 180 === e ? (n.x = 1 - (o + a), n.y = 1 - (r + s), n.width = a, n.height = s) : 270 === e && (n.x = r, n.y = 1 - o - a, n.width = s, n.height = a), n = ot(n, i.width, i.height), requestAnimationFrame(function() {
                                        t._preview.style.clip = "rect(\n\t\t\t\t\t" + n.y + "px,\n\t\t\t\t\t" + (n.x + n.width) + "px,\n\t\t\t\t\t" + (n.y + n.height) + "px,\n\t\t\t\t\t" + n.x + "px)\n\t\t\t\t"
                                    })
                                }
                            }, {
                                key: "open",
                                value: function(t, e, i, n, o) {
                                    var r = this;
                                    if (this._input && !this._dirty) return void o();
                                    this._dirty = !1, this._wrapperRotation = n || 0, this._blurredPreview = !1, this._ratio = e, this._element.style.opacity = "0", this._input = t;
                                    var a = n % 180 !== 0,
                                        s = rt(i, a ? t.height : t.width, a ? t.width : t.height);
                                    this._preview.onload = function() {
                                        r._preview.onload = null, r._cropper.ratio = r.ratio, r._redraw(), r._redrawCropper(s), o(), r._element.style.opacity = ""
                                    }, this._preview.src = K(this._input, Math.min(this._container.offsetWidth / this._input.width, this._container.offsetHeight / this._input.height)).toDataURL()
                                }
                            }, {
                                key: "_redrawCropper",
                                value: function(t) {
                                    var e = this._wrapperRotation % 180 !== 0,
                                        i = e ? this._input.height / this._input.width : this._input.width / this._input.height,
                                        n = this._wrapper.offsetWidth,
                                        o = this._wrapper.offsetHeight,
                                        r = this._container.offsetWidth,
                                        a = this._container.offsetHeight;
                                    this._updateWrapperScale();
                                    var s = this._wrapperScale * (e ? o : n),
                                        h = this._wrapperScale * (e ? n : o),
                                        u = e ? .5 * (r - s) : this._wrapper.offsetLeft,
                                        l = e ? .5 * (a - h) : this._wrapper.offsetTop;
                                    this._stage.style.cssText = "\n\t\t\t\tleft:" + u + "px;\n\t\t\t\ttop:" + l + "px;\n\t\t\t\twidth:" + s + "px;\n\t\t\t\theight:" + h + "px;\n\t\t\t", this._cropper.limit(s, s / i), this._cropper.minWidth = this._wrapperScale * this._options.minSize.width * this.scalar, this._cropper.minHeight = this._wrapperScale * this._options.minSize.height * this.scalar;
                                    var c = null;
                                    c = t ? {
                                        x: t.x * s,
                                        y: t.y * h,
                                        width: t.width * s,
                                        height: t.height * h
                                    } : Y(s, h, this._ratio || h / s), this._cropper.resize(c.x, c.y, c.width, c.height)
                                }
                            }, {
                                key: "_redraw",
                                value: function() {
                                    var t = this._input.height / this._input.width,
                                        e = this._container.clientWidth,
                                        i = this._container.clientHeight,
                                        n = e,
                                        o = n * t;
                                    o > i && (o = i, n = o / t), n = Math.round(n), o = Math.round(o);
                                    var r = (e - n) / 2,
                                        a = (i - o) / 2;
                                    this._wrapper.style.cssText = "\n\t\t\t\tleft:" + r + "px;\n\t\t\t\ttop:" + a + "px;\n\t\t\t\twidth:" + n + "px;\n\t\t\t\theight:" + o + "px;\n\t\t\t", this._previewBlurred.style.cssText = "\n\t\t\t\twidth:" + n + "px;\n\t\t\t\theight:" + o + "px;\n\t\t\t", this._preview.width = n, this._preview.height = o, this._blurredPreview || (this._previewBlurred.width = 300, this._previewBlurred.height = this._previewBlurred.width * t, tt(this._input, this._previewBlurred), et(this._previewBlurred, 3), this._blurredPreview = !0)
                                }
                            }, {
                                key: "show",
                                value: function() {
                                    var t = arguments.length <= 0 || arguments[0] === e ? function() {} : arguments[0];
                                    this._currentWindowSize.width === window.innerWidth && this._currentWindowSize.height === window.innerHeight || (this._redraw(), this._redrawCropper(this._cropper.area)), document.addEventListener("keydown", this), window.addEventListener("resize", this);
                                    var i = this._wrapperRotation * (Math.PI / 180);
                                    u(this._previewWrapper, {
                                        fromRotation: [0, 0, i],
                                        rotation: [0, 0, i],
                                        fromPosition: [0, 0, 0],
                                        position: [0, 0, 0],
                                        fromOpacity: 0,
                                        opacity: .9999,
                                        fromScale: [this._wrapperScale - .02, this._wrapperScale - .02],
                                        scale: [this._wrapperScale, this._wrapperScale],
                                        easing: "spring",
                                        springConstant: .3,
                                        springDeceleration: .85,
                                        delay: 450,
                                        complete: function() {}
                                    }), this._cropper.dirty ? u(this._stage, {
                                        fromPosition: [0, 0, 0],
                                        position: [0, 0, 0],
                                        fromOpacity: 0,
                                        opacity: 1,
                                        duration: 250,
                                        delay: 550,
                                        complete: function() {
                                            L(this), t()
                                        }
                                    }) : u(this._stage, {
                                        fromPosition: [0, 0, 0],
                                        position: [0, 0, 0],
                                        fromOpacity: 0,
                                        opacity: 1,
                                        duration: 250,
                                        delay: 1e3,
                                        complete: function() {
                                            L(this)
                                        }
                                    }), u(this._btnGroup.childNodes, {
                                        fromScale: [.9, .9],
                                        scale: [1, 1],
                                        fromOpacity: 0,
                                        opacity: 1,
                                        delay: function(t) {
                                            return 1e3 + 100 * t
                                        },
                                        easing: "spring",
                                        springConstant: .3,
                                        springDeceleration: .85,
                                        complete: function() {
                                            L(this)
                                        }
                                    }), u(this._utilsGroup.childNodes, {
                                        fromScale: [.9, .9],
                                        scale: [1, 1],
                                        fromOpacity: 0,
                                        opacity: 1,
                                        easing: "spring",
                                        springConstant: .3,
                                        springDeceleration: .85,
                                        delay: 1250,
                                        complete: function() {
                                            L(this)
                                        }
                                    })
                                }
                            }, {
                                key: "hide",
                                value: function() {
                                    var t = arguments.length <= 0 || arguments[0] === e ? function() {} : arguments[0];
                                    document.removeEventListener("keydown", this), window.removeEventListener("resize", this), u(this._utilsGroup.childNodes, {
                                        fromOpacity: 1,
                                        opacity: 0,
                                        duration: 250
                                    }), u(this._btnGroup.childNodes, {
                                        fromOpacity: 1,
                                        opacity: 0,
                                        delay: 200,
                                        duration: 350
                                    }), u([this._stage, this._previewWrapper], {
                                        fromPosition: [0, 0, 0],
                                        position: [0, -250, 0],
                                        fromOpacity: 1,
                                        opacity: 0,
                                        easing: "spring",
                                        springConstant: .3,
                                        springDeceleration: .75,
                                        delay: 250,
                                        allDone: function() {
                                            t()
                                        }
                                    })
                                }
                            }, {
                                key: "destroy",
                                value: function() {
                                    var t = this;
                                    ft(this._btnGroup.children).forEach(function(e) {
                                        e.removeEventListener("click", t)
                                    }), i.forEach(function(e) {
                                        t._cropper.element.removeEventListener(e, t)
                                    }), this._cropper.destroy(), _t(this._element)
                                }
                            }, {
                                key: "element",
                                get: function() {
                                    return this._element
                                }
                            }, {
                                key: "ratio",
                                get: function() {
                                    return "input" === this._ratio ? this._input.height / this._input.width : this._ratio
                                }
                            }, {
                                key: "offset",
                                get: function() {
                                    return this._element.getBoundingClientRect()
                                }
                            }, {
                                key: "original",
                                get: function() {
                                    return this._input
                                }
                            }, {
                                key: "scalar",
                                get: function() {
                                    return this._preview.width / this._input.width
                                }
                            }], [{
                                key: "options",
                                value: function() {
                                    return {
                                        buttonCancelClassName: null,
                                        buttonConfirmClassName: null,
                                        buttonCancelLabel: "Cancel",
                                        buttonConfirmLabel: "Confirm",
                                        buttonCancelTitle: null,
                                        buttonConfirmTitle: null,
                                        buttonRotateTitle: "Rotate",
                                        buttonRotateClassName: null,
                                        minSize: {
                                            width: 0,
                                            height: 0
                                        }
                                    }
                                }
                            }]), n
                        }();
                    return n.Buttons = ["cancel", "confirm"], n
                }(wt),
                kt = function() {
                    var i = ["dragover", "dragleave", "drop"];
                    return function() {
                        function n() {
                            var i = arguments.length <= 0 || arguments[0] === e ? document.createElement("div") : arguments[0];
                            t(this, n), this._element = i, this._accept = [], this._dragPath = null, this._init()
                        }
                        return c(n, [{
                            key: "areValidDataTransferItems",
                            value: function(t) {
                                return !this._accept.length || !t || this._accept.indexOf(H(t[0])) !== -1
                            }
                        }, {
                            key: "reset",
                            value: function() {
                                this._element.files = null
                            }
                        }, {
                            key: "_init",
                            value: function() {
                                var t = this;
                                this._element.className = "slim-file-hopper", i.forEach(function(e) {
                                    t._element.addEventListener(e, t)
                                })
                            }
                        }, {
                            key: "handleEvent",
                            value: function(t) {
                                switch (t.type) {
                                    case "dragover":
                                        this._onDragOver(t);
                                        break;
                                    case "dragleave":
                                        this._onDragLeave(t);
                                        break;
                                    case "drop":
                                        this._onDrop(t)
                                }
                            }
                        }, {
                            key: "_onDrop",
                            value: function(t) {
                                return t.preventDefault(), this.areValidDataTransferItems(t.dataTransfer.files) ? (this._element.files = t.dataTransfer.files, this._element.dispatchEvent(new CustomEvent("file-drop", {
                                    detail: m(t)
                                })), this._element.dispatchEvent(new CustomEvent("change")), void(this._dragPath = null)) : (this._element.dispatchEvent(new CustomEvent("file-invalid-drop")), void(this._dragPath = null))
                            }
                        }, {
                            key: "_onDragOver",
                            value: function(t) {
                                return t.preventDefault(), t.dataTransfer.dropEffect = "copy", this.areValidDataTransferItems(t.dataTransfer.items) ? (this._dragPath || (this._dragPath = []), this._dragPath.push(m(t)), void this._element.dispatchEvent(new CustomEvent("file-over", {
                                    detail: {
                                        x: O(this._dragPath).x,
                                        y: O(this._dragPath).y
                                    }
                                }))) : (t.dataTransfer.dropEffect = "none", void this._element.dispatchEvent(new CustomEvent("file-invalid")))
                            }
                        }, {
                            key: "_onDragLeave",
                            value: function(t) {
                                this._element.dispatchEvent(new CustomEvent("file-out", {
                                    detail: m(t)
                                })), this._dragPath = null
                            }
                        }, {
                            key: "destroy",
                            value: function() {
                                var t = this;
                                i.forEach(function(e) {
                                    t._element.removeEventListener(e, t)
                                }), _t(this._element), this._element = null, this._dragPath = null, this._accept = null
                            }
                        }, {
                            key: "element",
                            get: function() {
                                return this._element
                            }
                        }, {
                            key: "dragPath",
                            get: function() {
                                return this._dragPath
                            }
                        }, {
                            key: "enabled",
                            get: function() {
                                return "" === this._element.style.display
                            },
                            set: function(t) {
                                this._element.style.display = t ? "" : "none"
                            }
                        }, {
                            key: "accept",
                            set: function(t) {
                                this._accept = t
                            },
                            get: function() {
                                return this._accept
                            }
                        }]), n
                    }()
                }(),
                xt = function() {
                    return function() {
                        function i() {
                            t(this, i), this._element = null, this._inner = null, this._init()
                        }
                        return c(i, [{
                            key: "_init",
                            value: function() {
                                this._element = k("div", "slim-popover"), this._element.setAttribute("data-state", "off"), document.body.appendChild(this._element)
                            }
                        }, {
                            key: "show",
                            value: function() {
                                var t = this,
                                    i = arguments.length <= 0 || arguments[0] === e ? function() {} : arguments[0];
                                this._element.setAttribute("data-state", "on"), u(this._element, {
                                    fromOpacity: 0,
                                    opacity: 1,
                                    duration: 350,
                                    complete: function() {
                                        L(t._element), i()
                                    }
                                })
                            }
                        }, {
                            key: "hide",
                            value: function() {
                                var t = this,
                                    i = arguments.length <= 0 || arguments[0] === e ? function() {} : arguments[0];
                                u(this._element, {
                                    fromOpacity: 1,
                                    opacity: 0,
                                    duration: 500,
                                    complete: function() {
                                        L(t._element), t._element.setAttribute("data-state", "off"), i()
                                    }
                                })
                            }
                        }, {
                            key: "destroy",
                            value: function() {
                                this._element.parentNode && (this._element.parentNode.removeChild(this._element), this._element = null, this._inner = null)
                            }
                        }, {
                            key: "inner",
                            set: function(t) {
                                this._inner = t, this._element.firstChild && this._element.removeChild(this._element.firstChild), this._element.appendChild(this._inner)
                            }
                        }]), i
                    }()
                }(),
                Et = function(t, e) {
                    return t.split(e).map(function(t) {
                        return parseInt(t, 10)
                    })
                },
                Ct = function(t) {
                    return "DIV" === t.nodeName
                },
                St = {
                    AUTO: "auto",
                    INITIAL: "initial",
                    MANUAL: "manual"
                },
                Pt = ["x", "y", "width", "height"],
                It = ["file-invalid-drop", "file-invalid", "file-drop", "file-over", "file-out", "click"],
                Ot = ["cancel", "confirm"],
                Tt = ["remove", "edit", "download", "upload"],
                Mt = null,
                Rt = 0,
                Lt = '\n<div class="slim-loader">\n\t<svg>\n\t\t<path class="slim-loader-background" fill="none" stroke-width="3" />\n\t\t<path class="slim-loader-foreground" fill="none" stroke-width="3" />\n\t</svg>\n</div>\n',
                Dt = '\n<div class="slim-upload-status"></div>\n',
                At = function() {
                    function i(n) {
                        var o = arguments.length <= 1 || arguments[1] === e ? {} : arguments[1];
                        t(this, i), Mt || (Mt = new xt), this._uid = Rt++, this._options = g(i.options(), o), this._options.forceSize && (this._options.ratio = this._options.forceSize.width + ":" + this._options.forceSize.height, this._options.size = st(this._options.forceSize)), this._originalElement = n, this._originalElementInner = n.innerHTML, this._originalElementAttributes = _(n), Ct(n) ? this._element = n : (this._element = mt(n), this._element.className = n.className, n.className = "", this._element.setAttribute("data-ratio", this._options.ratio)), this._element.classList.add("slim"), this._element.setAttribute("data-state", "init"), this._timers = [], this._input = null, this._inputReference = null, this._output = null, this._ratio = null, this._isRequired = !1, this._imageHopper = null, this._imageEditor = null, this._progressEnabled = !0, this._data = {}, this._resetData(), this._state = [], this._drip = null, this._hasInitialImage = !1, this._initialCrop = this._options.crop, this._isBeingDestroyed = !1, i.supported ? this._init() : this._fallback()
                    }
                    return c(i, [{
                        key: "isAttachedTo",
                        value: function(t) {
                            return this._element === t || this._originalElement === t
                        }
                    }, {
                        key: "isDetached",
                        value: function() {
                            return null === this._element.parentNode
                        }
                    }, {
                        key: "load",
                        value: function(t) {
                            var i = arguments.length <= 1 || arguments[1] === e ? {} : arguments[1],
                                n = arguments[2];
                            "function" == typeof i ? n = i : (this._options.crop = i.crop, this._initialCrop = this._options.crop), this._load(t, n)
                        }
                    }, {
                        key: "upload",
                        value: function(t) {
                            this._doUpload(t)
                        }
                    }, {
                        key: "download",
                        value: function() {
                            this._doDownload()
                        }
                    }, {
                        key: "remove",
                        value: function() {
                            return this._doRemove()
                        }
                    }, {
                        key: "destroy",
                        value: function() {
                            this._doDestroy()
                        }
                    }, {
                        key: "edit",
                        value: function() {
                            this._doEdit()
                        }
                    }, {
                        key: "crop",
                        value: function(t, e) {
                            this._crop(t.x, t.y, t.width, t.height, e)
                        }
                    }, {
                        key: "_canInstantEdit",
                        value: function() {
                            return this._options.instantEdit && !this._isInitialising
                        }
                    }, {
                        key: "_getFileInput",
                        value: function() {
                            return this._element.querySelector("input[type=file]")
                        }
                    }, {
                        key: "_getInitialImage",
                        value: function() {
                            return this._element.querySelector("img")
                        }
                    }, {
                        key: "_getInputElement",
                        value: function() {
                            return this._getFileInput() || this._getInitialImage()
                        }
                    }, {
                        key: "_getRatioSpacerElement",
                        value: function() {
                            return this._element.children[0]
                        }
                    }, {
                        key: "_isImageOnly",
                        value: function() {
                            return "INPUT" !== this._input.nodeName
                        }
                    }, {
                        key: "_isFixedRatio",
                        value: function() {
                            return this._options.ratio.indexOf(":") !== -1
                        }
                    }, {
                        key: "_isAutoCrop",
                        value: function() {
                            return this._data.actions.crop.type === St.AUTO
                        }
                    }, {
                        key: "_toggleButton",
                        value: function(t, e) {
                            dt('.slim-btn[data-action="' + t + '"]', e, this._element)
                        }
                    }, {
                        key: "_clearState",
                        value: function() {
                            this._state = [], this._updateState()
                        }
                    }, {
                        key: "_removeState",
                        value: function(t) {
                            this._state = this._state.filter(function(e) {
                                return e !== t
                            }), this._updateState()
                        }
                    }, {
                        key: "_addState",
                        value: function(t) {
                            M(t, this._state) || (this._state.push(t), this._updateState())
                        }
                    }, {
                        key: "_updateState",
                        value: function() {
                            this._element && this._element.setAttribute("data-state", this._state.join(","))
                        }
                    }, {
                        key: "_resetData",
                        value: function() {
                            this._data = {
                                server: null,
                                meta: st(this._options.meta),
                                input: {
                                    field: this._inputReference,
                                    name: null,
                                    type: null,
                                    width: 0,
                                    height: 0,
                                    file: null
                                },
                                output: {
                                    image: null,
                                    width: 0,
                                    height: 0
                                },
                                actions: {
                                    rotation: null,
                                    crop: null,
                                    size: null
                                }
                            }, this._output && (this._output.value = ""), at(this._getFileInput())
                        }
                    }, {
                        key: "_init",
                        value: function() {
                            var t = this;
                            this._isInitialising = !0, this._addState("empty"), M("input", this._options.post) && (this._inputReference = "slim_input_" + this._uid), this._input = this._getInputElement(), this._input || (this._input = k("input"), this._input.type = "file", this._element.appendChild(this._input)), this._isRequired = this._input.required === !0, this._output = this._element.querySelector("input[type=hidden]"), this._output || (this._output = k("input"), this._output.type = "hidden", this._output.name = this._input.name || this._options.defaultInputName, this._element.appendChild(this._output)), this._input.removeAttribute("name");
                            var e = k("div", "slim-area"),
                                i = this._getInitialImage(),
                                n = (i || {}).src;
                            n ? this._hasInitialImage = !0 : this._initialCrop = null;
                            var o = '\n\t\t<div class="slim-result">\n\t\t\t<img class="in" style="opacity:0" ' + (n ? 'src="' + n + '"' : "") + '><img><img style="opacity:0">\n\t\t</div>';
                            if (this._isImageOnly()) e.innerHTML = "\n\t\t\t\t" + Lt + "\n\t\t\t\t" + Dt + "\n\t\t\t\t" + o + "\n\t\t\t";
                            else {
                                M("input", this._options.post) && (this._data.input.field = this._inputReference, this._options.service || (this._input.name = this._inputReference));
                                var r = void 0;
                                this._input.hasAttribute("accept") && "image/*" !== this._input.getAttribute("accept") ? r = this._input.accept.split(",").map(function(t) {
                                    return t.trim()
                                }).filter(function(t) {
                                    return t.length > 0
                                }) : (r = A(), this._input.setAttribute("accept", r.join(","))), this._imageHopper = new kt, this._imageHopper.accept = r, this._element.appendChild(this._imageHopper.element), It.forEach(function(e) {
                                    t._imageHopper.element.addEventListener(e, t)
                                }), e.innerHTML = "\n\t\t\t\t" + Lt + "\n\t\t\t\t" + Dt + '\n\t\t\t\t<div class="slim-drip"><span><span></span></span></div>\n\t\t\t\t<div class="slim-status"><div class="slim-label">' + (this._options.label || "") + "</div></div>\n\t\t\t\t" + o + "\n\t\t\t", this._input.addEventListener("change", this)
                            }
                            if (this._element.appendChild(e), this._btnGroup = k("div", "slim-btn-group"), this._btnGroup.style.display = "none", this._element.appendChild(this._btnGroup), Tt.filter(function(e) {
                                    return t._isButtonAllowed(e)
                                }).forEach(function(e) {
                                    var i = I(e),
                                        n = t._options["button" + i + "Label"],
                                        o = t._options["button" + i + "Title"] || n,
                                        r = t._options["button" + i + "ClassName"],
                                        a = k("button", "slim-btn slim-btn-" + e + (r ? " " + r : ""));
                                    a.innerHTML = n, a.title = o, a.type = "button", a.addEventListener("click", t), a.setAttribute("data-action", e), t._btnGroup.appendChild(a)
                                }), this._isFixedRatio()) {
                                var a = Et(this._options.ratio, ":");
                                this._ratio = a[1] / a[0], this._scaleDropArea(this._ratio)
                            }
                            this._updateProgress(.5), n ? this._load(n, function() {
                                t._onInit()
                            }) : this._onInit()
                        }
                    }, {
                        key: "_onInit",
                        value: function() {
                            var t = this;
                            this._isInitialising = !1;
                            var e = function() {
                                var e = setTimeout(function() {
                                    t._options.didInit.apply(t, [t.data])
                                }, 0);
                                t._timers.push(e)
                            };
                            this._options.saveInitialImage ? this._save(function() {
                                e()
                            }, !1) : e()
                        }
                    }, {
                        key: "_updateProgress",
                        value: function(t) {
                            if (this._element && this._progressEnabled) {
                                var e = this._element.querySelector(".slim-loader");
                                if (e) {
                                    var i = e.getBoundingClientRect(),
                                        n = e.querySelectorAll("path"),
                                        o = parseInt(n[0].getAttribute("stroke-width"), 10);
                                    n[0].setAttribute("d", yt(.5 * i.width, .5 * i.height, .5 * i.width - o, .9999)), n[1].setAttribute("d", yt(.5 * i.width, .5 * i.height, .5 * i.width - o, t))
                                }
                            }
                        }
                    }, {
                        key: "_startProgress",
                        value: function() {
                            var t = this;
                            if (this._element) {
                                this._progressEnabled = !1;
                                var e = this._element.querySelector(".slim-loader");
                                if (e) {
                                    var i = e.children[0];
                                    this._stopProgressLoop(function() {
                                        e.removeAttribute("style"), i.removeAttribute("style"), t._progressEnabled = !0, t._updateProgress(0), t._progressEnabled = !1, u(i, {
                                            fromOpacity: 0,
                                            opacity: 1,
                                            duration: 250,
                                            complete: function() {
                                                t._progressEnabled = !0
                                            }
                                        })
                                    })
                                }
                            }
                        }
                    }, {
                        key: "_stopProgress",
                        value: function() {
                            var t = this;
                            if (this._element) {
                                var e = this._element.querySelector(".slim-loader");
                                if (e) {
                                    var i = e.children[0];
                                    this._updateProgress(1), u(i, {
                                        fromOpacity: 1,
                                        opacity: 0,
                                        duration: 250,
                                        complete: function() {
                                            e.removeAttribute("style"), i.removeAttribute("style"), t._updateProgress(.5), t._progressEnabled = !1
                                        }
                                    })
                                }
                            }
                        }
                    }, {
                        key: "_startProgressLoop",
                        value: function() {
                            if (this._element) {
                                var t = this._element.querySelector(".slim-loader");
                                if (t) {
                                    var e = t.children[0];
                                    t.removeAttribute("style"), e.removeAttribute("style"), this._updateProgress(.5);
                                    var i = 1e3;
                                    u(t, {
                                        rotation: [0, 0, -(2 * Math.PI) * i],
                                        easing: "linear",
                                        duration: 1e3 * i
                                    }), u(e, {
                                        fromOpacity: 0,
                                        opacity: 1,
                                        duration: 250
                                    })
                                }
                            }
                        }
                    }, {
                        key: "_stopProgressLoop",
                        value: function(t) {
                            if (this._element) {
                                var e = this._element.querySelector(".slim-loader");
                                if (e) {
                                    var i = e.children[0];
                                    u(i, {
                                        fromOpacity: parseFloat(i.style.opacity),
                                        opacity: 0,
                                        duration: 250,
                                        complete: function() {
                                            u(e, "stop"), t && t()
                                        }
                                    })
                                }
                            }
                        }
                    }, {
                        key: "_isButtonAllowed",
                        value: function(t) {
                            return "edit" === t ? this._options.edit : "download" === t ? this._options.download : "upload" === t ? !!this._options.service && !this._options.push : "remove" !== t || !this._isImageOnly()
                        }
                    }, {
                        key: "_fallback",
                        value: function() {
                            this._removeState("init");
                            var t = k("div", "slim-area");
                            t.innerHTML = '\n\t\t\t<div class="slim-status"><div class="slim-label">' + (this._options.label || "") + "</div></div>\n\t\t", this._element.appendChild(t),
                                this._throwError(this._options.statusNoSupport)
                        }
                    }, {
                        key: "handleEvent",
                        value: function(t) {
                            switch (t.type) {
                                case "click":
                                    this._onClick(t);
                                    break;
                                case "change":
                                    this._onChange(t);
                                    break;
                                case "cancel":
                                    this._onCancel(t);
                                    break;
                                case "confirm":
                                    this._onConfirm(t);
                                    break;
                                case "file-over":
                                    this._onFileOver(t);
                                    break;
                                case "file-out":
                                    this._onFileOut(t);
                                    break;
                                case "file-drop":
                                    this._onDropFile(t);
                                    break;
                                case "file-invalid":
                                    this._onInvalidFile(t);
                                    break;
                                case "file-invalid-drop":
                                    this._onInvalidFileDrop(t)
                            }
                        }
                    }, {
                        key: "_getIntro",
                        value: function() {
                            return this._element.querySelector(".slim-result .in")
                        }
                    }, {
                        key: "_getOutro",
                        value: function() {
                            return this._element.querySelector(".slim-result .out")
                        }
                    }, {
                        key: "_getInOut",
                        value: function() {
                            return this._element.querySelectorAll(".slim-result img")
                        }
                    }, {
                        key: "_getDrip",
                        value: function() {
                            return this._drip || (this._drip = this._element.querySelector(".slim-drip > span")), this._drip
                        }
                    }, {
                        key: "_throwError",
                        value: function(t) {
                            this._addState("error"), this._element.querySelector(".slim-label").style.display = "none";
                            var e = this._element.querySelector(".slim-error");
                            e || (e = k("div", "slim-error"), this._element.querySelector(".slim-status").appendChild(e)), e.innerHTML = t
                        }
                    }, {
                        key: "_removeError",
                        value: function() {
                            this._removeState("error"), this._element.querySelector(".slim-label").style.display = "";
                            var t = this._element.querySelector(".slim-error");
                            t && t.parentNode.removeChild(t)
                        }
                    }, {
                        key: "_openFileDialog",
                        value: function() {
                            this._removeError(), this._input.click()
                        }
                    }, {
                        key: "_onClick",
                        value: function(t) {
                            var e = this,
                                i = t.target.classList,
                                n = t.target;
                            if (i.contains("slim-file-hopper")) return void this._openFileDialog();
                            switch (n.getAttribute("data-action")) {
                                case "remove":
                                    this._options.willRemove.apply(this, [this.data, function() {
                                        e._doRemove()
                                    }]);
                                    break;
                                case "edit":
                                    this._doEdit();
                                    break;
                                case "download":
                                    this._doDownload();
                                    break;
                                case "upload":
                                    this._doUpload()
                            }
                        }
                    }, {
                        key: "_onInvalidFileDrop",
                        value: function() {
                            this._onInvalidFile(), this._removeState("file-over");
                            var t = this._getDrip();
                            u(t.firstChild, {
                                fromScale: [.5, .5],
                                scale: [0, 0],
                                fromOpacity: .5,
                                opacity: 0,
                                duration: 150,
                                complete: function() {
                                    L(t.firstChild)
                                }
                            })
                        }
                    }, {
                        key: "_onInvalidFile",
                        value: function() {
                            var t = this._imageHopper.accept.map(N),
                                e = this._options.statusFileType.replace("$0", t.join(", "));
                            this._throwError(e)
                        }
                    }, {
                        key: "_onImageTooSmall",
                        value: function() {
                            var t = this._options.statusImageTooSmall.replace("$0", this._options.minSize.width + " Ã— " + this._options.minSize.height);
                            this._throwError(t)
                        }
                    }, {
                        key: "_onOverWeightFile",
                        value: function() {
                            var t = this._options.statusFileSize.replace("$0", this._options.maxFileSize);
                            this._throwError(t)
                        }
                    }, {
                        key: "_onFileOver",
                        value: function(t) {
                            this._addState("file-over"), this._removeError();
                            var e = this._getDrip(),
                                i = u.createMatrix();
                            i.translate(t.detail.x, t.detail.y, 0), u.setElementTransform(e, i), 1 == this._imageHopper.dragPath.length && (e.style.opacity = 1, u(e.firstChild, {
                                fromOpacity: 0,
                                opacity: .5,
                                fromScale: [0, 0],
                                scale: [.5, .5],
                                duration: 150
                            }))
                        }
                    }, {
                        key: "_onFileOut",
                        value: function(t) {
                            this._removeState("file-over"), this._removeState("file-invalid"), this._removeError();
                            var e = this._getDrip(),
                                i = u.createMatrix();
                            i.translate(t.detail.x, t.detail.y, 0), u.setElementTransform(e, i), u(e.firstChild, {
                                fromScale: [.5, .5],
                                scale: [0, 0],
                                fromOpacity: .5,
                                opacity: 0,
                                duration: 150,
                                complete: function() {
                                    L(e.firstChild)
                                }
                            })
                        }
                    }, {
                        key: "_onDropFile",
                        value: function(t) {
                            var e = this;
                            this._removeState("file-over");
                            var i = this._getDrip(),
                                n = u.createMatrix();
                            n.translate(t.detail.x, t.detail.y, 0), u.setElementTransform(i, n);
                            var o = this._imageHopper.dragPath.length,
                                r = this._imageHopper.dragPath[o - Math.min(10, o)],
                                a = t.detail.x - r.x,
                                s = t.detail.y - r.y;
                            u(i, {
                                fromPosition: [t.detail.x, t.detail.y, 0],
                                position: [t.detail.x + a, t.detail.y + s, 0],
                                duration: 200
                            }), u(i.firstChild, {
                                fromScale: [.5, .5],
                                scale: [2, 2],
                                fromOpacity: 1,
                                opacity: 0,
                                duration: 200,
                                complete: function() {
                                    L(i.firstChild), e._load(t.target.files[0])
                                }
                            })
                        }
                    }, {
                        key: "_onChange",
                        value: function(t) {
                            this._load(t.target.files[0])
                        }
                    }, {
                        key: "_load",
                        value: function(t, e) {
                            var i = this;
                            if (!this._isBeingDestroyed) {
                                if ("string" == typeof t) return void(j(t) ? this._load(G(t), e) : q(t, function(t) {
                                    i._load(t, e)
                                }));
                                var n = t;
                                if (this._imageHopper && this._imageHopper.accept.indexOf(n.type) === -1) return this._onInvalidFile(), void(e && e.apply(this, ["file-invalid"]));
                                if (n.size && this._options.maxFileSize && D(n.size) > this._options.maxFileSize) return this._onOverWeightFile(), void(e && e.apply(this, ["file-too-big"]));
                                this._removeState("empty"), this._addState("busy"), this._imageHopper && (this._imageHopper.enabled = !1), this._imageEditor && this._imageEditor.dirty(), this._data.input.name = n.name, this._data.input.type = n.type, this._data.input.size = n.size, this._data.input.file = n, this._startProgressLoop(), X(n, function(t, o) {
                                    var r = function() {
                                        i._imageHopper && (i._imageHopper.enabled = !0), i._removeState("busy"), i._stopProgressLoop(), i._resetData()
                                    };
                                    if (!t) return r(), void(e && e.apply(i, ["file-not-found"]));
                                    if (!nt(t, i._options.minSize)) return r(), i._onImageTooSmall(), void(e && e.apply(i, ["image-too-small"]));
                                    var a = i._options.didLoad.apply(i, [n, t, o]);
                                    return a !== !0 ? (r(), a !== !1 && i._throwError(a), void(e && e.apply(i, [a]))) : void i._loadCanvas(t, function() {
                                        var t = i._getIntro(),
                                            n = {
                                                fromScale: [1.25, 1.25],
                                                scale: [1, 1],
                                                fromOpacity: 0,
                                                opacity: 1,
                                                complete: function() {
                                                    L(t), t.style.opacity = 1, i._canInstantEdit() || i._showButtons(), i._stopProgressLoop(), i._removeState("busy"), i._addState("preview"), e && e.apply(i, [null, i.data])
                                                }
                                            };
                                        i.isDetached() ? n.duration = 1 : (n.easing = "spring", n.springConstant = .3, n.springDeceleration = .7), i._canInstantEdit() && (n.delay = 500, n.duration = 1, i._doEdit()), u(t, n)
                                    })
                                })
                            }
                        }
                    }, {
                        key: "_loadCanvas",
                        value: function(t, e) {
                            var i = this;
                            this._isBeingDestroyed || (this._isFixedRatio() || (this._ratio = t.height / t.width, this._scaleDropArea(this._ratio)), this._data.input.image = t, this._data.input.width = t.width, this._data.input.height = t.height, this._initialCrop ? (this._data.actions.crop = st(this._initialCrop), this._data.actions.crop.type = St.INITIAL, this._initialCrop = null) : (this._data.actions.crop = Y(t.width, t.height, this._ratio), this._data.actions.crop.type = St.AUTO), this._options.size && (this._data.actions.size = {
                                width: this._options.size.width,
                                height: this._options.size.height
                            }), this._applyTransforms(t, function(t) {
                                var n = i._getIntro(),
                                    o = n.offsetWidth / t.width,
                                    r = !1;
                                i._options.service && i._options.push && (i._hasInitialImage || (r = !0)), i._save(function() {}, r), n.src = "", n.src = K(t, o).toDataURL(), n.onload = function() {
                                    n.onload = null, i._isBeingDestroyed || e && e()
                                }
                            }))
                        }
                    }, {
                        key: "_applyTransforms",
                        value: function(t, e) {
                            var i = this;
                            $(t, this._data.actions, function(t) {
                                var n = t;
                                if (i._options.forceSize || i._options.size && 1 == J(i._options.size, t)) {
                                    n = k("canvas"), n.width = i._options.size.width, n.height = i._options.size.height;
                                    var o = n.getContext("2d");
                                    o.drawImage(t, 0, 0, i._options.size.width, i._options.size.height)
                                }
                                i._data.output.width = n.width, i._data.output.height = n.height, i._data.output.image = n, i._onTransformCanvas(function(t) {
                                    i._data = t, i._options.didTransform.apply(i, [i.data]), e(i._data.output.image)
                                })
                            })
                        }
                    }, {
                        key: "_onTransformCanvas",
                        value: function(t) {
                            this._options.willTransform.apply(this, [this.data, t])
                        }
                    }, {
                        key: "_appendEditor",
                        value: function() {
                            var t = this;
                            this._imageEditor || (this._imageEditor = new bt(k("div"), {
                                minSize: this._options.minSize,
                                buttonConfirmClassName: this._options.buttonConfirmClassName,
                                buttonCancelClassName: this._options.buttonCancelClassName,
                                buttonRotateClassName: this._options.buttonRotateClassName,
                                buttonConfirmLabel: this._options.buttonConfirmLabel,
                                buttonCancelLabel: this._options.buttonCancelLabel,
                                buttonRotateLabel: this._options.buttonRotateLabel,
                                buttonConfirmTitle: this._options.buttonConfirmTitle,
                                buttonCancelTitle: this._options.buttonCancelTitle,
                                buttonRotateTitle: this._options.buttonRotateTitle
                            }), Ot.forEach(function(e) {
                                t._imageEditor.element.addEventListener(e, t)
                            }))
                        }
                    }, {
                        key: "_scaleDropArea",
                        value: function(t) {
                            var e = this._getRatioSpacerElement();
                            e && this._element && (e.style.marginBottom = 100 * t + "%", this._element.setAttribute("data-ratio", "1:" + t))
                        }
                    }, {
                        key: "_onCancel",
                        value: function(t) {
                            this._removeState("editor"), this._showButtons(), this._hideEditor(), this._options.instantEdit && !this._hasInitialImage && this._isAutoCrop() && this._doRemove()
                        }
                    }, {
                        key: "_onConfirm",
                        value: function(t) {
                            var e = this;
                            this._removeState("editor"), this._startProgressLoop(), this._addState("busy"), this._output.value = "", this._data.actions.rotation = t.detail.rotation, this._data.actions.crop = t.detail.crop, this._data.actions.crop.type = St.MANUAL, this._applyTransforms(this._data.input.image, function(t) {
                                var i = e._getInOut(),
                                    n = "out" === i[0].className ? i[0] : i[1],
                                    o = n === i[0] ? i[1] : i[0];
                                n.className = "in", n.style.opacity = "0", n.style.zIndex = "2", o.className = "out", o.style.zIndex = "1", n.src = "", n.src = K(t, n.offsetWidth / t.width).toDataURL(), n.onload = function() {
                                    n.onload = null, "free" === e._options.ratio && (e._ratio = n.naturalHeight / n.naturalWidth, e._scaleDropArea(e._ratio)), e._hideEditor();
                                    var t = setTimeout(function() {
                                        e._showPreview(n, function() {
                                            var t = e._options.service && e._options.push;
                                            e._save(function(t, i, n) {
                                                e._toggleButton("upload", !0), e._stopProgressLoop(), e._removeState("busy"), e._showButtons()
                                            }, t)
                                        })
                                    }, 250);
                                    e._timers.push(t)
                                }
                            })
                        }
                    }, {
                        key: "_crop",
                        value: function(t, i, n, o) {
                            var r = this,
                                a = arguments.length <= 4 || arguments[4] === e ? function() {} : arguments[4];
                            this._startProgressLoop(), this._addState("busy"), this._output.value = "", this._data.actions.crop = {
                                x: t,
                                y: i,
                                width: n,
                                height: o
                            }, this._data.actions.crop.type = St.MANUAL, this._applyTransforms(this._data.input.image, function(t) {
                                var e = r._getInOut(),
                                    i = "out" === e[0].className ? e[0] : e[1],
                                    n = i === e[0] ? e[1] : e[0];
                                i.className = "in", i.style.opacity = "1", i.style.zIndex = "2", n.className = "out", n.style.zIndex = "0", i.src = "", i.src = K(t, i.offsetWidth / t.width).toDataURL(), i.onload = function() {
                                    i.onload = null, "free" === r._options.ratio && (r._ratio = i.naturalHeight / i.naturalWidth, r._scaleDropArea(r._ratio));
                                    var t = r._options.service && r._options.push;
                                    r._save(function(t, e, i) {
                                        r._stopProgressLoop(), r._removeState("busy"), a.apply(r, [r.data])
                                    }, t)
                                }
                            })
                        }
                    }, {
                        key: "_save",
                        value: function() {
                            var t = this,
                                i = arguments.length <= 0 || arguments[0] === e ? function() {} : arguments[0],
                                n = arguments.length <= 1 || arguments[1] === e || arguments[1];
                            if (!this._isBeingDestroyed) {
                                var o = this.dataBase64;
                                this._options.service || this._isInitialising && !this._isImageOnly() || this._options.willSave.apply(this, [o, function(e) {
                                    t._store(e), t._options.didSave.apply(t, [e])
                                }]), this._isBeingDestroyed || (this._options.service && n && this._options.willSave.apply(this, [o, function(e) {
                                    t._upload(e, function(n, o) {
                                        n || t._storeServerResponse(o), t._options.didUpload.apply(t, [n, e, o]), i(n, e, o)
                                    })
                                }]), this._options.service && n || i())
                            }
                        }
                    }, {
                        key: "_storeServerResponse",
                        value: function(t) {
                            this._isRequired && (this._input.required = !1), this._data.server = t, this._output.value = "object" === ("undefined" == typeof t ? "undefined" : p(t)) ? JSON.stringify(this._data.server) : t
                        }
                    }, {
                        key: "_store",
                        value: function(t) {
                            this._isRequired && (this._input.required = !1), this._output.value = JSON.stringify(t)
                        }
                    }, {
                        key: "_upload",
                        value: function(t, e) {
                            var i = this,
                                n = new FormData;
                            n.append(this._output.name, JSON.stringify(t)), M("input", this._options.post) && n.append(this._inputReference, this._data.input.file, this._data.input.file.name);
                            var o = this._element.querySelector(".slim-upload-status"),
                                r = this._options.willRequest;
                            R(this._options.service, n, r, function(t, e) {
                                i._updateProgress(t / e)
                            }, function(t) {
                                var n = setTimeout(function() {
                                    if (!i._isBeingDestroyed) {
                                        o.innerHTML = i._options.statusUploadSuccess, o.setAttribute("data-state", "success"), o.style.opacity = 1;
                                        var t = setTimeout(function() {
                                            o.style.opacity = 0
                                        }, 2e3);
                                        i._timers.push(t)
                                    }
                                }, 250);
                                i._timers.push(n), e(null, t)
                            }, function(t) {
                                var n = "";
                                n = "file-too-big" === t ? i._options.statusContentLength : i._options.statusUnknownResponse;
                                var r = setTimeout(function() {
                                    o.innerHTML = n, o.setAttribute("data-state", "error"), o.style.opacity = 1
                                }, 250);
                                i._timers.push(r), e(t)
                            })
                        }
                    }, {
                        key: "_showEditor",
                        value: function() {
                            Mt.show(), this._imageEditor.show()
                        }
                    }, {
                        key: "_hideEditor",
                        value: function() {
                            this._imageEditor.hide();
                            var t = setTimeout(function() {
                                Mt.hide()
                            }, 250);
                            this._timers.push(t)
                        }
                    }, {
                        key: "_showPreview",
                        value: function(t, e) {
                            u(t, {
                                fromPosition: [0, 50, 0],
                                position: [0, 0, 0],
                                fromScale: [1.5, 1.5],
                                scale: [1, 1],
                                fromOpacity: 0,
                                opacity: 1,
                                easing: "spring",
                                springConstant: .3,
                                springDeceleration: .7,
                                complete: function() {
                                    L(t), e && e()
                                }
                            })
                        }
                    }, {
                        key: "_hideResult",
                        value: function(t) {
                            var e = this._getIntro();
                            e && u(e, {
                                fromScale: [1, 1],
                                scale: [.5, .5],
                                fromOpacity: 1,
                                opacity: 0,
                                easing: "spring",
                                springConstant: .3,
                                springDeceleration: .75,
                                complete: function() {
                                    L(e), t && t()
                                }
                            })
                        }
                    }, {
                        key: "_showButtons",
                        value: function(t) {
                            if (this._btnGroup) {
                                this._btnGroup.style.display = "";
                                var e = {
                                    fromScale: [.5, .5],
                                    scale: [1, 1],
                                    fromPosition: [0, 10, 0],
                                    position: [0, 0, 0],
                                    fromOpacity: 0,
                                    opacity: 1,
                                    complete: function() {
                                        L(this)
                                    },
                                    allDone: function() {
                                        t && t()
                                    }
                                };
                                this.isDetached() ? e.duration = 1 : (e.delay = function(t) {
                                    return 250 + 50 * t
                                }, e.easing = "spring", e.springConstant = .3, e.springDeceleration = .85), u(this._btnGroup.childNodes, e)
                            }
                        }
                    }, {
                        key: "_hideButtons",
                        value: function(t) {
                            var e = this;
                            if (this._btnGroup) {
                                var i = {
                                    fromScale: [1, 1],
                                    scale: [.85, .85],
                                    fromOpacity: 1,
                                    opacity: 0,
                                    allDone: function() {
                                        e._btnGroup.style.display = "none", t && t()
                                    }
                                };
                                this.isDetached() ? i.duration = 1 : (i.easing = "spring", i.springConstant = .3, i.springDeceleration = .75), u(this._btnGroup.childNodes, i)
                            }
                        }
                    }, {
                        key: "_hideStatus",
                        value: function() {
                            var t = this._element.querySelector(".slim-upload-status");
                            t.style.opacity = 0
                        }
                    }, {
                        key: "_doEdit",
                        value: function() {
                            var t = this;
                            this._data.input.image && (this._addState("editor"), this._imageEditor || this._appendEditor(), Mt.inner = this._imageEditor.element, this._imageEditor.open(Z(this._data.input.image), "free" === this._options.ratio ? null : this._ratio, this._data.actions.crop, this._data.actions.rotation, function() {
                                t._showEditor(), t._hideButtons(), t._hideStatus()
                            }))
                        }
                    }, {
                        key: "_doRemove",
                        value: function() {
                            var t = this;
                            if (!this._isImageOnly()) {
                                this._clearState(), this._addState("empty"), this._hasInitialImage = !1, this._imageHopper.enabled = !0, this._isRequired && (this._input.required = !0);
                                var e = this._getOutro();
                                e && (e.style.opacity = "0");
                                var i = this.data;
                                this._resetData();
                                var n = setTimeout(function() {
                                    t._isBeingDestroyed || (t._hideButtons(function() {
                                        t._toggleButton("upload", !0)
                                    }), t._hideStatus(), t._hideResult(), t._options.didRemove.apply(t, [i]))
                                }, this.isDetached() ? 0 : 250);
                                return this._timers.push(n), i
                            }
                        }
                    }, {
                        key: "_doUpload",
                        value: function(t) {
                            var e = this;
                            this._data.input.image && (this._addState("upload"), this._startProgress(), this._hideButtons(function() {
                                e._toggleButton("upload", !1), e._save(function(i, n, o) {
                                    e._removeState("upload"), e._stopProgress(), t && t.apply(e, [i, n, o]), i && e._toggleButton("upload", !0), e._showButtons()
                                })
                            }))
                        }
                    }, {
                        key: "_doDownload",
                        value: function() {
                            var t = this._data.output.image;
                            t && it(t, this._data.input.name, this._data.input.type)
                        }
                    }, {
                        key: "_doDestroy",
                        value: function() {
                            function t(t, e) {
                                return 0 !== e.filter(function(e) {
                                    return t.name === e.name && t.value === e.value
                                }).length
                            }
                            var e = this;
                            this._isBeingDestroyed = !0, this._timers.forEach(function(t) {
                                clearTimeout(t)
                            }), this._timers = [], u(this._element, "detach"), this._imageHopper && (It.forEach(function(t) {
                                e._imageHopper.element.removeEventListener(t, e)
                            }), this._imageHopper.destroy(), this._imageHopper = null), this._imageEditor && (Ot.forEach(function(t) {
                                e._imageEditor.element.removeEventListener(t, e)
                            }), this._imageEditor.destroy(), this._imageEditor = null), ft(this._btnGroup.children).forEach(function(t) {
                                t.removeEventListener("click", e)
                            }), this._input.removeEventListener("change", this), this._element !== this._originalElement && this._element.parentNode && this._element.parentNode.replaceChild(this._originalElement, this._element), this._originalElement.innerHTML = this._originalElementInner;
                            var i = _(this._originalElement);
                            i.forEach(function(i) {
                                t(i, e._originalElementAttributes) || e._originalElement.removeAttribute(i.name)
                            }), this._originalElementAttributes.forEach(function(n) {
                                t(n, i) || e._originalElement.setAttribute(n.name, n.value)
                            }), Rt = Math.max(0, Rt - 1), Mt && 0 === Rt && (Mt.destroy(), Mt = null), this._originalElement = null, this._element = null, this._input = null, this._output = null, this._btnGroup = null, this._options = null
                        }
                    }, {
                        key: "dataBase64",
                        get: function() {
                            return pt(this._data, this._options.post, this._options.jpegCompression, this._options.forceType)
                        }
                    }, {
                        key: "data",
                        get: function() {
                            return ut(this._data)
                        }
                    }, {
                        key: "element",
                        get: function() {
                            return this._element
                        }
                    }, {
                        key: "size",
                        set: function(t) {
                            t && t.width && t.height && (this._options.size = st(t), this._data.actions.size = st(t))
                        }
                    }, {
                        key: "ratio",
                        set: function(t) {
                            if (t && "string" == typeof t && (this._options.ratio = t, this._isFixedRatio())) {
                                var e = Et(this._options.ratio, ":");
                                this._ratio = e[1] / e[0], this._scaleDropArea(this._ratio)
                            }
                        }
                    }], [{
                        key: "options",
                        value: function() {
                            var t = {
                                edit: !0,
                                instantEdit: !1,
                                meta: {},
                                ratio: "free",
                                size: null,
                                crop: null,
                                post: ["output", "actions"],
                                service: null,
                                push: !1,
                                defaultInputName: "slim[]",
                                minSize: {
                                    width: 100,
                                    height: 100
                                },
                                maxFileSize: null,
                                jpegCompression: null,
                                download: !1,
                                saveInitialImage: !1,
                                forceType: !1,
                                forceSize: null,
                                label: "<p>Drop your image here</p>",
                                statusFileType: "<p>Invalid file type, expects: $0.</p>",
                                statusFileSize: "<p>File is too big, maximum file size: $0 MB.</p>",
                                statusNoSupport: "<p>Your browser does not support image cropping.</p>",
                                statusImageTooSmall: "<p>Image is too small, minimum size is: $0 pixels.</p>",
                                statusContentLength: '<span class="slim-upload-status-icon"></span> The file is probably too big',
                                statusUnknownResponse: '<span class="slim-upload-status-icon"></span> An unknown error occurred',
                                statusUploadSuccess: '<span class="slim-upload-status-icon"></span> Saved',
                                didInit: function(t) {},
                                didLoad: function(t, e, i) {
                                    return !0
                                },
                                didSave: function(t) {},
                                didUpload: function(t, e, i) {},
                                didRemove: function(t) {},
                                didTransform: function(t) {},
                                willTransform: function(t, e) {
                                    e(t)
                                },
                                willSave: function(t, e) {
                                    e(t)
                                },
                                willRemove: function(t, e) {
                                    e()
                                },
                                willRequest: function(t) {}
                            };
                            return Tt.concat(bt.Buttons).concat("rotate").forEach(function(e) {
                                var i = I(e);
                                t["button" + i + "ClassName"] = null, t["button" + i + "Label"] = i, t["button" + i + "Title"] = i
                            }), t
                        }
                    }]), i
                }();
            return function() {
                function t(t) {
                    return t ? "<p>" + t + "</p>" : null
                }

                function e(t) {
                    var e = window,
                        i = t.split(".");
                    return i.forEach(function(t, n) {
                        e[i[n]] && (e = e[i[n]])
                    }), e !== window ? e : null
                }
                var i = [],
                    n = function(t) {
                        for (var e = 0, n = i.length; e < n; e++)
                            if (i[e].isAttachedTo(t)) return e;
                        return -1
                    },
                    o = function(t) {
                        return t
                    },
                    r = function(t) {
                        return "true" === t
                    },
                    a = function(t) {
                        return !t || "true" === t
                    },
                    s = function(e) {
                        return t(e)
                    },
                    h = function(t) {
                        return t ? e(t) : null
                    },
                    u = function(t) {
                        if (!t) return null;
                        var e = Et(t, ",");
                        return {
                            width: e[0],
                            height: e[1]
                        }
                    },
                    l = function(t) {
                        return t ? parseFloat(t) : null
                    },
                    c = function(t) {
                        return t ? parseInt(t, 10) : null
                    },
                    p = function(t) {
                        if (!t) return null;
                        var e = {};
                        return t.split(",").map(function(t) {
                            return parseInt(t, 10)
                        }).forEach(function(t, i) {
                            e[Pt[i]] = t
                        }), e
                    },
                    f = {
                        download: r,
                        edit: a,
                        instantEdit: r,
                        minSize: u,
                        size: u,
                        forceSize: u,
                        service: function(t) {
                            return "undefined" == typeof t ? null : t
                        },
                        push: r,
                        crop: p,
                        post: function(t) {
                            return t ? t.split(",").map(function(t) {
                                return t.trim()
                            }) : null
                        },
                        defaultInputName: o,
                        ratio: function(t) {
                            return t ? t : null
                        },
                        maxFileSize: l,
                        jpegCompression: c,
                        forceType: o,
                        saveInitialImage: r,
                        label: s
                    };
                ["FileSize", "FileType", "NoSupport", "ImageTooSmall"].forEach(function(t) {
                    f["status" + t] = s
                }), ["ContentLength", "UnknownResponse", "UploadSuccess"].forEach(function(t) {
                    f["status" + t] = o
                }), ["Init", "Load", "Save", "Upload", "Remove", "Transform"].forEach(function(t) {
                    f["did" + t] = h
                }), ["Transform", "Save", "Remove", "Request"].forEach(function(t) {
                    f["will" + t] = h
                });
                var _ = ["ClassName", "Label", "Title"];
                Tt.concat(bt.Buttons).concat("rotate").forEach(function(t) {
                    var e = I(t);
                    _.forEach(function(t) {
                        f["button" + e + t] = o
                    })
                }), At.supported = function() {
                    return "undefined" != typeof window.FileReader
                }(), At.parse = function(t) {
                    var e, i, n, o = [];
                    for (e = t.querySelectorAll(".slim:not([data-state])"), n = e.length; n--;) i = e[n], o.push(At.create(i, At.getOptionsFromAttributes(i)));
                    return o
                }, At.getOptionsFromAttributes = function(t) {
                    var e = d(t),
                        i = {
                            meta: {}
                        };
                    for (var n in e) {
                        var o = f[n],
                            r = e[n];
                        o ? (r = o(r), r = null === r ? st(At.options()[n]) : r, i[n] = r) : 0 === n.indexOf("meta") && (i.meta[P(n.substr(4))] = r)
                    }
                    return i
                }, At.find = function(t) {
                    var e = i.filter(function(e) {
                        return e.isAttachedTo(t)
                    });
                    return e ? e[0] : null
                }, At.create = function(t, e) {
                    if (!At.find(t)) {
                        e || (e = At.getOptionsFromAttributes(t));
                        var n = new At(t, e);
                        return i.push(n), n
                    }
                }, At.destroy = function(t) {
                    var e = n(t);
                    return !(e < 0) && (i[e].destroy(), i.splice(e, 1), !0)
                }
            }(), At
        }();
        t.fn.slim = function() {
            var t = i(arguments);
            if (n(t)) return this.each(function() {
                s.create(this, t[0])
            });
            var e = t.shift();
            switch (e) {
                case "supported":
                    return s.supported;
                case "destroy":
                    return this.each(function() {
                        s.destroy(this)
                    });
                case "parse":
                    return this.each(function() {
                        s.parse(this)
                    });
                default:
                    var h = [];
                    return this.each(function() {
                        var i = s.find(this);
                        i && (a(i, e) ? h.push(i[e].apply(i, t)) : o(i, e) ? h.push(i[e]) : r(i, e) && h.push(i[e] = t[0]))
                    }), h
            }
        }
    }
}(window.jQuery);// JavaScript Document