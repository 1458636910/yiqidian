!function (t) { var o = { init: function (o) { var e = { direction: "left", loop: -1, scrolldelay: 0, scrollamount: 50, circular: !0, drag: !0, runshort: !0, hoverstop: !0, inverthover: !1, xml: !1 }; return o && t.extend(e, o), this.each(function () { var o = "mouseenter", i = "mouseleave"; e.inverthover && (o = "mouseleave", i = "mouseenter"); var s = e.loop, n = t(this).addClass("str_wrap").data({ scrollamount: e.scrollamount }), r = !1, a = n.attr("style"); if (a) for (var l = a.split(";"), f = !1, c = 0; c < l.length; c++) { -1 != t.trim(l[c]).search(/^height/g) && (f = parseFloat(n.css("height"))) } var h = function () { n.off("mouseleave"), n.off("mouseenter"), n.off("mousemove"), n.off("mousedown"), n.off("mouseup"), t(".str_move", n).length || n.wrapInner(t("<div>").addClass("str_move")); var a = t(".str_move", n).addClass("str_origin"), l = a.clone().removeClass("str_origin").addClass("str_move_clone"); e.hoverstop || n.addClass("noStop"); var f = function () { l.clone().css({ left: "100%", right: "auto", width: a.width() }).appendTo(a), l.css({ right: "100%", left: "auto", width: a.width() }).appendTo(a) }, c = function () { l.clone().css({ top: "100%", bottom: "auto", height: a.height() }).appendTo(a), l.css({ bottom: "100%", top: "auto", height: a.height() }).appendTo(a) }; if ("left" == e.direction) if (n.height(a.outerHeight()), a.width() > n.width()) { var h = -a.width(); e.circular && (e.xml || (f(), h = -(a.width() + (a.width() - n.width())))), e.xml && a.css({ left: n.width() }); var u = n.width(), v = 0, p = !1, d = function () { var o, i; 0 != s && a.stop(!0).animate({ left: h }, (o = Math.abs(h), i = o / n.data("scrollamount") * 1e3, 0 != parseFloat(a.css("left")) && (i = ((o += n.width()) - (n.width() - parseFloat(a.css("left")))) / n.data("scrollamount") * 1e3), i), "linear", function () { t(this).css({ left: n.width() }), -1 == s ? p = setTimeout(d, e.scrolldelay) : (s--, p = setTimeout(d, e.scrolldelay)) }) }; n.data({ moveId: p, moveF: d }), e.inverthover || d(), e.hoverstop && (n.on(o, function () { t(this).addClass("str_active"), clearTimeout(p), a.stop(!0) }).on(i, function () { t(this).removeClass("str_active"), t(this).off("mousemove"), d() }), e.drag ? n.on("mousedown", function (o) { var i; e.inverthover && a.stop(!0); var s, l = 1, f = o.clientX; return u = a.position().left, v = u - (o.clientX - n.offset().left), t(this).on("mousemove", function (t) { r = !0, s = t.clientX, l = s > f ? 1 : -1, f = s, i = v + (t.clientX - n.offset().left), e.circular ? (i < -a.width() && l < 0 && (i = 0, u = a.position().left, v = u - (t.clientX - n.offset().left)), i > 0 && l > 0 && (i = -a.width(), u = a.position().left, v = u - (t.clientX - n.offset().left))) : (i < -a.width() && l < 0 && (i = n.width(), u = a.position().left, v = u - (t.clientX - n.offset().left)), i > n.width() && l > 0 && (i = -a.width(), u = a.position().left, v = u - (t.clientX - n.offset().left))), a.stop(!0).css({ left: i }) }).on("mouseup", function () { t(this).off("mousemove"), e.inverthover && a.trigger("mouseenter"), setTimeout(function () { r = !1 }, 50) }), !1 }).on("click", function () { if (r) return !1 }) : n.addClass("no_drag")) } else if (e.runshort) { a.css({ left: "20px" }); u = n.width(), v = 0; var m = function () { return (a.width() + a.position().left) / n.data("scrollamount") * 1e3 }, g = function () { var o = -a.width(); a.animate({ left: o }, m(), "linear", function () { t(this).css({ left: n.width() }), -1 == s ? setTimeout(g, e.scrolldelay) : (s--, setTimeout(g, e.scrolldelay)) }) }; n.data({ moveF: g }), e.inverthover || g(), e.hoverstop && (n.on(o, function () { t(this).addClass("str_active"), a.stop(!0) }).on(i, function () { t(this).removeClass("str_active"), t(this).off("mousemove"), g() }), e.drag ? n.on("mousedown", function (o) { var i; e.inverthover && a.stop(!0); var s, l = 1, f = o.clientX; return u = a.position().left, v = u - (o.clientX - n.offset().left), t(this).on("mousemove", function (t) { r = !0, s = t.clientX, l = s > f ? 1 : -1, f = s, (i = v + (t.clientX - n.offset().left)) < -a.width() && l < 0 && (i = n.width(), u = a.position().left, v = u - (t.clientX - n.offset().left)), i > n.width() && l > 0 && (i = -a.width(), u = a.position().left, v = u - (t.clientX - n.offset().left)), a.stop(!0).css({ left: i }) }).on("mouseup", function () { e.inverthover && a.trigger("mouseenter"), t(this).off("mousemove"), setTimeout(function () { r = !1 }, 50) }), !1 }).on("click", function () { if (r) return !1 }) : n.addClass("no_drag")) } else n.addClass("str_static"); if ("right" == e.direction) if (n.height(a.outerHeight()), n.addClass("str_right"), a.css({ left: -a.width(), right: "auto" }), a.width() > n.width()) { h = n.width(); a.css({ left: 0 }), e.circular && (e.xml || (f(), h = a.width())); var w = 0; m = function () { var t = n.width(), o = t / n.data("scrollamount") * 1e3; return 0 != parseFloat(a.css("left")) && (o = ((t = a.width() + n.width()) - (a.width() + parseFloat(a.css("left")))) / n.data("scrollamount") * 1e3), o }; g = function () { 0 != s && a.animate({ left: h }, m(), "linear", function () { t(this).css({ left: -a.width() }), -1 == s ? setTimeout(g, e.scrolldelay) : (s--, setTimeout(g, e.scrolldelay)) }) }; n.data({ moveF: g }), e.inverthover || g(), e.hoverstop && (n.on(o, function () { t(this).addClass("str_active"), a.stop(!0) }).on(i, function () { t(this).removeClass("str_active"), t(this).off("mousemove"), g() }), e.drag ? n.on("mousedown", function (o) { var i; e.inverthover && a.stop(!0); var s, l = 1, f = o.clientX; return u = a.position().left, w = u - (o.clientX - n.offset().left), t(this).on("mousemove", function (t) { r = !0, s = t.clientX, l = s > f ? 1 : -1, f = s, i = w + (t.clientX - n.offset().left), e.circular ? (i < -a.width() && l < 0 && (i = 0, u = a.position().left, w = u - (t.clientX - n.offset().left)), i > 0 && l > 0 && (i = -a.width(), u = a.position().left, w = u - (t.clientX - n.offset().left))) : (i < -a.width() && l < 0 && (i = n.width(), u = a.position().left, w = u - (t.clientX - n.offset().left)), i > n.width() && l > 0 && (i = -a.width(), u = a.position().left, w = u - (t.clientX - n.offset().left))), a.stop(!0).css({ left: i }) }).on("mouseup", function () { e.inverthover && a.trigger("mouseenter"), t(this).off("mousemove"), setTimeout(function () { r = !1 }, 50) }), !1 }).on("click", function () { if (r) return !1 }) : n.addClass("no_drag")) } else if (e.runshort) { w = 0, m = function () { return (n.width() - a.position().left) / n.data("scrollamount") * 1e3 }, g = function () { var o = n.width(); a.animate({ left: o }, m(), "linear", function () { t(this).css({ left: -a.width() }), -1 == s ? setTimeout(g, e.scrolldelay) : (s--, setTimeout(g, e.scrolldelay)) }) }; n.data({ moveF: g }), e.inverthover || g(), e.hoverstop && (n.on(o, function () { t(this).addClass("str_active"), a.stop(!0) }).on(i, function () { t(this).removeClass("str_active"), t(this).off("mousemove"), g() }), e.drag ? n.on("mousedown", function (o) { var i; e.inverthover && a.stop(!0); var s, l = 1, f = o.clientX; return u = a.position().left, w = u - (o.clientX - n.offset().left), t(this).on("mousemove", function (t) { r = !0, s = t.clientX, l = s > f ? 1 : -1, f = s, (i = w + (t.clientX - n.offset().left)) < -a.width() && l < 0 && (i = n.width(), u = a.position().left, w = u - (t.clientX - n.offset().left)), i > n.width() && l > 0 && (i = -a.width(), u = a.position().left, w = u - (t.clientX - n.offset().left)), a.stop(!0).css({ left: i }) }).on("mouseup", function () { e.inverthover && a.trigger("mouseenter"), t(this).off("mousemove"), setTimeout(function () { r = !1 }, 50) }), !1 }).on("click", function () { if (r) return !1 }) : n.addClass("no_drag")) } else n.addClass("str_static"); if ("up" == e.direction) if (n.addClass("str_vertical"), a.height() > n.height()) { var T = -a.height(); e.circular && (e.xml || (c(), T = -(a.height() + (a.height() - n.height())))), e.xml && a.css({ top: n.height() }); w = 0; m = function () { var t = Math.abs(T), o = t / n.data("scrollamount") * 1e3; return 0 != parseFloat(a.css("top")) && (o = ((t += n.height()) - (n.height() - parseFloat(a.css("top")))) / n.data("scrollamount") * 1e3), o }; g = function () { 0 != s && a.animate({ top: T }, m(), "linear", function () { t(this).css({ top: n.height() }), -1 == s ? setTimeout(g, e.scrolldelay) : (s--, setTimeout(g, e.scrolldelay)) }) }; n.data({ moveF: g }), e.inverthover || g(), e.hoverstop && (n.on(o, function () { t(this).addClass("str_active"), a.stop(!0) }).on(i, function () { t(this).removeClass("str_active"), t(this).off("mousemove"), g() }), e.drag ? n.on("mousedown", function (o) { var i; e.inverthover && a.stop(!0); var s, l = 1, f = o.clientY; return strMoveTop = a.position().top, w = strMoveTop - (o.clientY - n.offset().top), t(this).on("mousemove", function (t) { r = !0, (s = t.clientY) > f ? l = 1 : s < f && (l = -1), f = s, i = w + t.clientY - n.offset().top, e.circular ? (i < -a.height() && l < 0 && (i = 0, strMoveTop = a.position().top, w = strMoveTop - (t.clientY - n.offset().top)), i > 0 && l > 0 && (i = -a.height(), strMoveTop = a.position().top, w = strMoveTop - (t.clientY - n.offset().top))) : (i < -a.height() && l < 0 && (i = n.height(), strMoveTop = a.position().top, w = strMoveTop - (t.clientY - n.offset().top)), i > n.height() && l > 0 && (i = -a.height(), strMoveTop = a.position().top, w = strMoveTop - (t.clientY - n.offset().top))), a.stop(!0).css({ top: i }) }).on("mouseup", function () { e.inverthover && a.trigger("mouseenter"), t(this).off("mousemove"), setTimeout(function () { r = !1 }, 50) }), !1 }).on("click", function () { if (r) return !1 }) : n.addClass("no_drag")) } else if (e.runshort) { a.css({ top: n.height() }); w = 0, m = function () { return (a.height() + a.position().top) / n.data("scrollamount") * 1e3 }, g = function () { var o = -a.height(); a.animate({ top: o }, m(), "linear", function () { t(this).css({ top: n.height() }), -1 == s ? setTimeout(g, e.scrolldelay) : (s--, setTimeout(g, e.scrolldelay)) }) }; n.data({ moveF: g }), e.inverthover || g(), e.hoverstop && (n.on(o, function () { t(this).addClass("str_active"), a.stop(!0) }).on(i, function () { t(this).removeClass("str_active"), t(this).off("mousemove"), g() }), e.drag ? n.on("mousedown", function (o) { var i; e.inverthover && a.stop(!0); var s, l = 1, f = o.clientY; return strMoveTop = a.position().top, w = strMoveTop - (o.clientY - n.offset().top), t(this).on("mousemove", function (t) { r = !0, (s = t.clientY) > f ? l = 1 : s < f && (l = -1), f = s, (i = w + t.clientY - n.offset().top) < -a.height() && l < 0 && (i = n.height(), strMoveTop = a.position().top, w = strMoveTop - (t.clientY - n.offset().top)), i > n.height() && l > 0 && (i = -a.height(), strMoveTop = a.position().top, w = strMoveTop - (t.clientY - n.offset().top)), a.stop(!0).css({ top: i }) }).on("mouseup", function () { e.inverthover && a.trigger("mouseenter"), t(this).off("mousemove"), setTimeout(function () { r = !1 }, 50) }), !1 }).on("click", function () { if (r) return !1 }) : n.addClass("no_drag")) } else n.addClass("str_static"); if ("down" == e.direction) if (n.addClass("str_vertical").addClass("str_down"), a.css({ top: -a.height(), bottom: "auto" }), a.height() > n.height()) { T = n.height(); e.circular && (e.xml || (c(), T = a.height())), e.xml && a.css({ top: -a.height() }); w = 0; m = function () { var t = n.height(), o = t / n.data("scrollamount") * 1e3; return 0 != parseFloat(a.css("top")) && (o = ((t = a.height() + n.height()) - (a.height() + parseFloat(a.css("top")))) / n.data("scrollamount") * 1e3), o }; g = function () { 0 != s && a.animate({ top: T }, m(), "linear", function () { t(this).css({ top: -a.height() }), -1 == s ? setTimeout(g, e.scrolldelay) : (s--, setTimeout(g, e.scrolldelay)) }) }; n.data({ moveF: g }), e.inverthover || g(), e.hoverstop && (n.on(o, function () { t(this).addClass("str_active"), a.stop(!0) }).on(i, function () { t(this).removeClass("str_active"), t(this).off("mousemove"), g() }), e.drag ? n.on("mousedown", function (o) { var i; e.inverthover && a.stop(!0); var s, l = 1, f = o.clientY; return strMoveTop = a.position().top, w = strMoveTop - (o.clientY - n.offset().top), t(this).on("mousemove", function (t) { r = !0, (s = t.clientY) > f ? l = 1 : s < f && (l = -1), f = s, i = w + t.clientY - n.offset().top, e.circular ? (i < -a.height() && l < 0 && (i = 0, strMoveTop = a.position().top, w = strMoveTop - (t.clientY - n.offset().top)), i > 0 && l > 0 && (i = -a.height(), strMoveTop = a.position().top, w = strMoveTop - (t.clientY - n.offset().top))) : (i < -a.height() && l < 0 && (i = n.height(), strMoveTop = a.position().top, w = strMoveTop - (t.clientY - n.offset().top)), i > n.height() && l > 0 && (i = -a.height(), strMoveTop = a.position().top, w = strMoveTop - (t.clientY - n.offset().top))), a.stop(!0).css({ top: i }) }).on("mouseup", function () { e.inverthover && a.trigger("mouseenter"), t(this).off("mousemove"), setTimeout(function () { r = !1 }, 50) }), !1 }).on("click", function () { if (r) return !1 }) : n.addClass("no_drag")) } else if (e.runshort) { w = 0, m = function () { return (n.height() - a.position().top) / n.data("scrollamount") * 1e3 }, g = function () { var o = n.height(); a.animate({ top: o }, m(), "linear", function () { t(this).css({ top: -a.height() }), -1 == s ? setTimeout(g, e.scrolldelay) : (s--, setTimeout(g, e.scrolldelay)) }) }; n.data({ moveF: g }), e.inverthover || g(), e.hoverstop && (n.on(o, function () { t(this).addClass("str_active"), a.stop(!0) }).on(i, function () { t(this).removeClass("str_active"), t(this).off("mousemove"), g() }), e.drag ? n.on("mousedown", function (o) { var i; e.inverthover && a.stop(!0); var s, l = 1, f = o.clientY; return strMoveTop = a.position().top, w = strMoveTop - (o.clientY - n.offset().top), t(this).on("mousemove", function (t) { r = !0, (s = t.clientY) > f ? l = 1 : s < f && (l = -1), f = s, (i = w + t.clientY - n.offset().top) < -a.height() && l < 0 && (i = n.height(), strMoveTop = a.position().top, w = strMoveTop - (t.clientY - n.offset().top)), i > n.height() && l > 0 && (i = -a.height(), strMoveTop = a.position().top, w = strMoveTop - (t.clientY - n.offset().top)), a.stop(!0).css({ top: i }) }).on("mouseup", function () { e.inverthover && a.trigger("mouseenter"), t(this).off("mousemove"), setTimeout(function () { r = !1 }, 50) }), !1 }).on("click", function () { if (r) return !1 }) : n.addClass("no_drag")) } else n.addClass("str_static") }; e.xml ? t.ajax({ url: e.xml, dataType: "xml", success: function (o) { for (var i = t(o).find("text"), s = i.length, r = 0; r < s; r++) { var a = i.eq(r).text(), l = t("<span>").text(a).appendTo(n); "left" != e.direction && "right" != e.direction || (l.css({ display: "inline-block", textAlign: "right" }), r > 0 && l.css({ width: n.width() + l.width() })), "down" != e.direction && "up" != e.direction || (l.css({ display: "block", textAlign: "left" }), r > 0 && l.css({ paddingTop: n.height() })) } h() } }) : h(), n.data({ ini: h, startheight: f }) }) }, update: function () { var o = t(this), e = t(".str_origin", o), i = t(".str_move_clone", o); e.stop(!0), i.remove(), o.data("ini")() }, destroy: function () { var o = t(this), e = t(".str_move", o), i = o.data("startheight"); t(".str_move_clone", o).remove(), o.off("mouseenter"), o.off("mousedown"), o.off("mouseup"), o.off("mouseleave"), o.off("mousemove"), o.removeClass("noStop").removeClass("str_vertical").removeClass("str_active").removeClass("no_drag").removeClass("str_static").removeClass("str_right").removeClass("str_down"); var s = o.attr("style"); if (s) { for (var n = s.split(";"), r = 0; r < n.length; r++) { -1 != t.trim(n[r]).search(/^height/g) && (n[r] = "") } var a = n.join(";").replace(/;+/g, ";"); ";" == a ? o.removeAttr("style") : o.attr("style", a), i && o.css({ height: i }) } if (e.stop(!0), e.length) { var l = e.html(); e.remove(), o.html(l) } }, pause: function () { var o = t(this); t(".str_move", o).stop(!0) }, play: function () { var o = t(this); t(this).off("mousemove"), o.data("moveF")() } }; t.fn.liMarquee = function (e) { return o[e] ? o[e].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof e && e ? void t.error("Метод " + e + " в jQuery.liMarquee не существует") : o.init.apply(this, arguments) } } (jQuery);