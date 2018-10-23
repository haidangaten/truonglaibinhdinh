/*
 * Bootstrap Datepicker v1.6.4 (https://github.com/eternicode/bootstrap-datepicker)
 *
 * Copyright 2012 Stefan Petre
 * Improvements by Andrew Rowls
 * Licensed under the Apache License v2.0 (http://www.apache.org/licenses/LICENSE-2.0)
 */
! function (a) {
  "function" == typeof define && define.amd ? define(["jquery"], a) : a("object" == typeof exports ? require("jquery") : jQuery)
}(function (a, b) {
  function c() {
    return new Date(Date.UTC.apply(Date, arguments))
  }

  function d() {
    var a = new Date;
    return c(a.getFullYear(), a.getMonth(), a.getDate())
  }

  function e(a, b) {
    return a.getUTCFullYear() === b.getUTCFullYear() && a.getUTCMonth() === b.getUTCMonth() && a.getUTCDate() === b.getUTCDate()
  }

  function f(a) {
    return function () {
      return this[a].apply(this, arguments)
    }
  }

  function g(a) {
    return a && !isNaN(a.getTime())
  }

  function h(b, c) {
    function d(a, b) {
      return b.toLowerCase()
    }
    var e, f = a(b).data(),
      g = {},
      h = new RegExp("^" + c.toLowerCase() + "([A-Z])");
    c = new RegExp("^" + c.toLowerCase());
    for (var i in f) c.test(i) && (e = i.replace(h, d), g[e] = f[i]);
    return g
  }

  function i(b) {
    var c = {};
    if (q[b] || (b = b.split("-")[0], q[b])) {
      var d = q[b];
      return a.each(p, function (a, b) {
        b in d && (c[b] = d[b])
      }), c
    }
  }
  var j = function () {
      var b = {
        get: function (a) {
          return this.slice(a)[0]
        },
        contains: function (a) {
          for (var b = a && a.valueOf(), c = 0, d = this.length; d > c; c++)
            if (this[c].valueOf() === b) return c;
          return -1
        },
        remove: function (a) {
          this.splice(a, 1)
        },
        replace: function (b) {
          b && (a.isArray(b) || (b = [b]), this.clear(), this.push.apply(this, b))
        },
        clear: function () {
          this.length = 0
        },
        copy: function () {
          var a = new j;
          return a.replace(this), a
        }
      };
      return function () {
        var c = [];
        return c.push.apply(c, arguments), a.extend(c, b), c
      }
    }(),
    k = function (b, c) {
      a(b).data("datepicker", this), this._process_options(c), this.dates = new j, this.viewDate = this.o.defaultViewDate, this.focusDate = null, this.element = a(b), this.isInput = this.element.is("input"), this.inputField = this.isInput ? this.element : this.element.find("input"), this.component = this.element.hasClass("date") ? this.element.find(".add-on, .input-group-addon, .btn") : !1, this.hasInput = this.component && this.inputField.length, this.component && 0 === this.component.length && (this.component = !1), this.isInline = !this.component && this.element.is("div"), this.picker = a(r.template), this._check_template(this.o.templates.leftArrow) && this.picker.find(".prev").html(this.o.templates.leftArrow), this._check_template(this.o.templates.rightArrow) && this.picker.find(".next").html(this.o.templates.rightArrow), this._buildEvents(), this._attachEvents(), this.isInline ? this.picker.addClass("datepicker-inline").appendTo(this.element) : this.picker.addClass("datepicker-dropdown dropdown-menu"), this.o.rtl && this.picker.addClass("datepicker-rtl"), this.viewMode = this.o.startView, this.o.calendarWeeks && this.picker.find("thead .datepicker-title, tfoot .today, tfoot .clear").attr("colspan", function (a, b) {
        return parseInt(b) + 1
      }), this._allow_update = !1, this.setStartDate(this._o.startDate), this.setEndDate(this._o.endDate), this.setDaysOfWeekDisabled(this.o.daysOfWeekDisabled), this.setDaysOfWeekHighlighted(this.o.daysOfWeekHighlighted), this.setDatesDisabled(this.o.datesDisabled), this.fillDow(), this.fillMonths(), this._allow_update = !0, this.update(), this.showMode(), this.isInline && this.show()
    };
  k.prototype = {
    constructor: k,
    _resolveViewName: function (a, c) {
      return 0 === a || "days" === a || "month" === a ? 0 : 1 === a || "months" === a || "year" === a ? 1 : 2 === a || "years" === a || "decade" === a ? 2 : 3 === a || "decades" === a || "century" === a ? 3 : 4 === a || "centuries" === a || "millennium" === a ? 4 : c === b ? !1 : c
    },
    _check_template: function (c) {
      try {
        if (c === b || "" === c) return !1;
        if ((c.match(/[<>]/g) || []).length <= 0) return !0;
        var d = a(c);
        return d.length > 0
      } catch (e) {
        return !1
      }
    },
    _process_options: function (b) {
      this._o = a.extend({}, this._o, b);
      var e = this.o = a.extend({}, this._o),
        f = e.language;
      q[f] || (f = f.split("-")[0], q[f] || (f = o.language)), e.language = f, e.startView = this._resolveViewName(e.startView, 0), e.minViewMode = this._resolveViewName(e.minViewMode, 0), e.maxViewMode = this._resolveViewName(e.maxViewMode, 4), e.startView = Math.min(e.startView, e.maxViewMode), e.startView = Math.max(e.startView, e.minViewMode), e.multidate !== !0 && (e.multidate = Number(e.multidate) || !1, e.multidate !== !1 && (e.multidate = Math.max(0, e.multidate))), e.multidateSeparator = String(e.multidateSeparator), e.weekStart %= 7, e.weekEnd = (e.weekStart + 6) % 7;
      var g = r.parseFormat(e.format);
      e.startDate !== -(1 / 0) && (e.startDate ? e.startDate instanceof Date ? e.startDate = this._local_to_utc(this._zero_time(e.startDate)) : e.startDate = r.parseDate(e.startDate, g, e.language, e.assumeNearbyYear) : e.startDate = -(1 / 0)), e.endDate !== 1 / 0 && (e.endDate ? e.endDate instanceof Date ? e.endDate = this._local_to_utc(this._zero_time(e.endDate)) : e.endDate = r.parseDate(e.endDate, g, e.language, e.assumeNearbyYear) : e.endDate = 1 / 0), e.daysOfWeekDisabled = e.daysOfWeekDisabled || [], a.isArray(e.daysOfWeekDisabled) || (e.daysOfWeekDisabled = e.daysOfWeekDisabled.split(/[,\s]*/)), e.daysOfWeekDisabled = a.map(e.daysOfWeekDisabled, function (a) {
        return parseInt(a, 10)
      }), e.daysOfWeekHighlighted = e.daysOfWeekHighlighted || [], a.isArray(e.daysOfWeekHighlighted) || (e.daysOfWeekHighlighted = e.daysOfWeekHighlighted.split(/[,\s]*/)), e.daysOfWeekHighlighted = a.map(e.daysOfWeekHighlighted, function (a) {
        return parseInt(a, 10)
      }), e.datesDisabled = e.datesDisabled || [], a.isArray(e.datesDisabled) || (e.datesDisabled = [e.datesDisabled]), e.datesDisabled = a.map(e.datesDisabled, function (a) {
        return r.parseDate(a, g, e.language, e.assumeNearbyYear)
      });
      var h = String(e.orientation).toLowerCase().split(/\s+/g),
        i = e.orientation.toLowerCase();
      if (h = a.grep(h, function (a) {
          return /^auto|left|right|top|bottom$/.test(a)
        }), e.orientation = {
          x: "auto",
          y: "auto"
        }, i && "auto" !== i)
        if (1 === h.length) switch (h[0]) {
          case "top":
          case "bottom":
            e.orientation.y = h[0];
            break;
          case "left":
          case "right":
            e.orientation.x = h[0]
        } else i = a.grep(h, function (a) {
          return /^left|right$/.test(a)
        }), e.orientation.x = i[0] || "auto", i = a.grep(h, function (a) {
          return /^top|bottom$/.test(a)
        }), e.orientation.y = i[0] || "auto";
        else;
      if (e.defaultViewDate) {
        var j = e.defaultViewDate.year || (new Date).getFullYear(),
          k = e.defaultViewDate.month || 0,
          l = e.defaultViewDate.day || 1;
        e.defaultViewDate = c(j, k, l)
      } else e.defaultViewDate = d()
    },
    _events: [],
    _secondaryEvents: [],
    _applyEvents: function (a) {
      for (var c, d, e, f = 0; f < a.length; f++) c = a[f][0], 2 === a[f].length ? (d = b, e = a[f][1]) : 3 === a[f].length && (d = a[f][1], e = a[f][2]), c.on(e, d)
    },
    _unapplyEvents: function (a) {
      for (var c, d, e, f = 0; f < a.length; f++) c = a[f][0], 2 === a[f].length ? (e = b, d = a[f][1]) : 3 === a[f].length && (e = a[f][1], d = a[f][2]), c.off(d, e)
    },
    _buildEvents: function () {
      var b = {
        keyup: a.proxy(function (b) {
          -1 === a.inArray(b.keyCode, [27, 37, 39, 38, 40, 32, 13, 9]) && this.update()
        }, this),
        keydown: a.proxy(this.keydown, this),
        paste: a.proxy(this.paste, this)
      };
      this.o.showOnFocus === !0 && (b.focus = a.proxy(this.show, this)), this.isInput ? this._events = [
        [this.element, b]
      ] : this.component && this.hasInput ? this._events = [
        [this.inputField, b],
        [this.component, {
          click: a.proxy(this.show, this)
        }]
      ] : this._events = [
        [this.element, {
          click: a.proxy(this.show, this),
          keydown: a.proxy(this.keydown, this)
        }]
      ], this._events.push([this.element, "*", {
        blur: a.proxy(function (a) {
          this._focused_from = a.target
        }, this)
      }], [this.element, {
        blur: a.proxy(function (a) {
          this._focused_from = a.target
        }, this)
      }]), this.o.immediateUpdates && this._events.push([this.element, {
        "changeYear changeMonth": a.proxy(function (a) {
          this.update(a.date)
        }, this)
      }]), this._secondaryEvents = [
        [this.picker, {
          click: a.proxy(this.click, this)
        }],
        [a(window), {
          resize: a.proxy(this.place, this)
        }],
        [a(document), {
          mousedown: a.proxy(function (a) {
            this.element.is(a.target) || this.element.find(a.target).length || this.picker.is(a.target) || this.picker.find(a.target).length || this.isInline || this.hide()
          }, this)
        }]
      ]
    },
    _attachEvents: function () {
      this._detachEvents(), this._applyEvents(this._events)
    },
    _detachEvents: function () {
      this._unapplyEvents(this._events)
    },
    _attachSecondaryEvents: function () {
      this._detachSecondaryEvents(), this._applyEvents(this._secondaryEvents)
    },
    _detachSecondaryEvents: function () {
      this._unapplyEvents(this._secondaryEvents)
    },
    _trigger: function (b, c) {
      var d = c || this.dates.get(-1),
        e = this._utc_to_local(d);
      this.element.trigger({
        type: b,
        date: e,
        dates: a.map(this.dates, this._utc_to_local),
        format: a.proxy(function (a, b) {
          0 === arguments.length ? (a = this.dates.length - 1, b = this.o.format) : "string" == typeof a && (b = a, a = this.dates.length - 1), b = b || this.o.format;
          var c = this.dates.get(a);
          return r.formatDate(c, b, this.o.language)
        }, this)
      })
    },
    show: function () {
      return this.inputField.prop("disabled") || this.inputField.prop("readonly") && this.o.enableOnReadonly === !1 ? void 0 : (this.isInline || this.picker.appendTo(this.o.container), this.place(), this.picker.show(), this._attachSecondaryEvents(), this._trigger("show"), (window.navigator.msMaxTouchPoints || "ontouchstart" in document) && this.o.disableTouchKeyboard && a(this.element).blur(), this)
    },
    hide: function () {
      return this.isInline || !this.picker.is(":visible") ? this : (this.focusDate = null, this.picker.hide().detach(), this._detachSecondaryEvents(), this.viewMode = this.o.startView, this.showMode(), this.o.forceParse && this.inputField.val() && this.setValue(), this._trigger("hide"), this)
    },
    destroy: function () {
      return this.hide(), this._detachEvents(), this._detachSecondaryEvents(), this.picker.remove(), delete this.element.data().datepicker, this.isInput || delete this.element.data().date, this
    },
    paste: function (b) {
      var c;
      if (b.originalEvent.clipboardData && b.originalEvent.clipboardData.types && -1 !== a.inArray("text/plain", b.originalEvent.clipboardData.types)) c = b.originalEvent.clipboardData.getData("text/plain");
      else {
        if (!window.clipboardData) return;
        c = window.clipboardData.getData("Text")
      }
      this.setDate(c), this.update(), b.preventDefault()
    },
    _utc_to_local: function (a) {
      return a && new Date(a.getTime() + 6e4 * a.getTimezoneOffset())
    },
    _local_to_utc: function (a) {
      return a && new Date(a.getTime() - 6e4 * a.getTimezoneOffset())
    },
    _zero_time: function (a) {
      return a && new Date(a.getFullYear(), a.getMonth(), a.getDate())
    },
    _zero_utc_time: function (a) {
      return a && new Date(Date.UTC(a.getUTCFullYear(), a.getUTCMonth(), a.getUTCDate()))
    },
    getDates: function () {
      return a.map(this.dates, this._utc_to_local)
    },
    getUTCDates: function () {
      return a.map(this.dates, function (a) {
        return new Date(a)
      })
    },
    getDate: function () {
      return this._utc_to_local(this.getUTCDate())
    },
    getUTCDate: function () {
      var a = this.dates.get(-1);
      return "undefined" != typeof a ? new Date(a) : null
    },
    clearDates: function () {
      this.inputField && this.inputField.val(""), this.update(), this._trigger("changeDate"), this.o.autoclose && this.hide()
    },
    setDates: function () {
      var b = a.isArray(arguments[0]) ? arguments[0] : arguments;
      return this.update.apply(this, b), this._trigger("changeDate"), this.setValue(), this
    },
    setUTCDates: function () {
      var b = a.isArray(arguments[0]) ? arguments[0] : arguments;
      return this.update.apply(this, a.map(b, this._utc_to_local)), this._trigger("changeDate"), this.setValue(), this
    },
    setDate: f("setDates"),
    setUTCDate: f("setUTCDates"),
    remove: f("destroy"),
    setValue: function () {
      var a = this.getFormattedDate();
      return this.inputField.val(a), this
    },
    getFormattedDate: function (c) {
      c === b && (c = this.o.format);
      var d = this.o.language;
      return a.map(this.dates, function (a) {
        return r.formatDate(a, c, d)
      }).join(this.o.multidateSeparator)
    },
    getStartDate: function () {
      return this.o.startDate
    },
    setStartDate: function (a) {
      return this._process_options({
        startDate: a
      }), this.update(), this.updateNavArrows(), this
    },
    getEndDate: function () {
      return this.o.endDate
    },
    setEndDate: function (a) {
      return this._process_options({
        endDate: a
      }), this.update(), this.updateNavArrows(), this
    },
    setDaysOfWeekDisabled: function (a) {
      return this._process_options({
        daysOfWeekDisabled: a
      }), this.update(), this.updateNavArrows(), this
    },
    setDaysOfWeekHighlighted: function (a) {
      return this._process_options({
        daysOfWeekHighlighted: a
      }), this.update(), this
    },
    setDatesDisabled: function (a) {
      this._process_options({
        datesDisabled: a
      }), this.update(), this.updateNavArrows()
    },
    place: function () {
      if (this.isInline) return this;
      var b = this.picker.outerWidth(),
        c = this.picker.outerHeight(),
        d = 10,
        e = a(this.o.container),
        f = e.width(),
        g = "body" === this.o.container ? a(document).scrollTop() : e.scrollTop(),
        h = e.offset(),
        i = [];
      this.element.parents().each(function () {
        var b = a(this).css("z-index");
        "auto" !== b && 0 !== b && i.push(parseInt(b))
      });
      var j = Math.max.apply(Math, i) + this.o.zIndexOffset,
        k = this.component ? this.component.parent().offset() : this.element.offset(),
        l = this.component ? this.component.outerHeight(!0) : this.element.outerHeight(!1),
        m = this.component ? this.component.outerWidth(!0) : this.element.outerWidth(!1),
        n = k.left - h.left,
        o = k.top - h.top;
      "body" !== this.o.container && (o += g), this.picker.removeClass("datepicker-orient-top datepicker-orient-bottom datepicker-orient-right datepicker-orient-left"), "auto" !== this.o.orientation.x ? (this.picker.addClass("datepicker-orient-" + this.o.orientation.x), "right" === this.o.orientation.x && (n -= b - m)) : k.left < 0 ? (this.picker.addClass("datepicker-orient-left"), n -= k.left - d) : n + b > f ? (this.picker.addClass("datepicker-orient-right"), n += m - b) : this.picker.addClass("datepicker-orient-left");
      var p, q = this.o.orientation.y;
      if ("auto" === q && (p = -g + o - c, q = 0 > p ? "bottom" : "top"), this.picker.addClass("datepicker-orient-" + q), "top" === q ? o -= c + parseInt(this.picker.css("padding-top")) : o += l, this.o.rtl) {
        var r = f - (n + m);
        this.picker.css({
          top: o,
          right: r,
          zIndex: j
        })
      } else this.picker.css({
        top: o,
        left: n,
        zIndex: j
      });
      return this
    },
    _allow_update: !0,
    update: function () {
      if (!this._allow_update) return this;
      var b = this.dates.copy(),
        c = [],
        d = !1;
      return arguments.length ? (a.each(arguments, a.proxy(function (a, b) {
        b instanceof Date && (b = this._local_to_utc(b)), c.push(b)
      }, this)), d = !0) : (c = this.isInput ? this.element.val() : this.element.data("date") || this.inputField.val(), c = c && this.o.multidate ? c.split(this.o.multidateSeparator) : [c], delete this.element.data().date), c = a.map(c, a.proxy(function (a) {
        return r.parseDate(a, this.o.format, this.o.language, this.o.assumeNearbyYear)
      }, this)), c = a.grep(c, a.proxy(function (a) {
        return !this.dateWithinRange(a) || !a
      }, this), !0), this.dates.replace(c), this.dates.length ? this.viewDate = new Date(this.dates.get(-1)) : this.viewDate < this.o.startDate ? this.viewDate = new Date(this.o.startDate) : this.viewDate > this.o.endDate ? this.viewDate = new Date(this.o.endDate) : this.viewDate = this.o.defaultViewDate, d ? this.setValue() : c.length && String(b) !== String(this.dates) && this._trigger("changeDate"), !this.dates.length && b.length && this._trigger("clearDate"), this.fill(), this.element.change(), this
    },
    fillDow: function () {
      var b = this.o.weekStart,
        c = "<tr>";
      for (this.o.calendarWeeks && (this.picker.find(".datepicker-days .datepicker-switch").attr("colspan", function (a, b) {
          return parseInt(b) + 1
        }), c += '<th class="cw">&#160;</th>'); b < this.o.weekStart + 7;) c += '<th class="dow', a.inArray(b, this.o.daysOfWeekDisabled) > -1 && (c += " disabled"), c += '">' + q[this.o.language].daysMin[b++ % 7] + "</th>";
      c += "</tr>", this.picker.find(".datepicker-days thead").append(c)
    },
    fillMonths: function () {
      for (var a = this._utc_to_local(this.viewDate), b = "", c = 0; 12 > c;) {
        var d = a && a.getMonth() === c ? " focused" : "";
        b += '<span class="month' + d + '">' + q[this.o.language].monthsShort[c++] + "</span>"
      }
      this.picker.find(".datepicker-months td").html(b)
    },
    setRange: function (b) {
      b && b.length ? this.range = a.map(b, function (a) {
        return a.valueOf()
      }) : delete this.range, this.fill()
    },
    getClassNames: function (b) {
      var c = [],
        d = this.viewDate.getUTCFullYear(),
        e = this.viewDate.getUTCMonth(),
        f = new Date;
      return b.getUTCFullYear() < d || b.getUTCFullYear() === d && b.getUTCMonth() < e ? c.push("old") : (b.getUTCFullYear() > d || b.getUTCFullYear() === d && b.getUTCMonth() > e) && c.push("new"), this.focusDate && b.valueOf() === this.focusDate.valueOf() && c.push("focused"), this.o.todayHighlight && b.getUTCFullYear() === f.getFullYear() && b.getUTCMonth() === f.getMonth() && b.getUTCDate() === f.getDate() && c.push("today"), -1 !== this.dates.contains(b) && c.push("active"), this.dateWithinRange(b) || c.push("disabled"), this.dateIsDisabled(b) && c.push("disabled", "disabled-date"), -1 !== a.inArray(b.getUTCDay(), this.o.daysOfWeekHighlighted) && c.push("highlighted"), this.range && (b > this.range[0] && b < this.range[this.range.length - 1] && c.push("range"), -1 !== a.inArray(b.valueOf(), this.range) && c.push("selected"), b.valueOf() === this.range[0] && c.push("range-start"), b.valueOf() === this.range[this.range.length - 1] && c.push("range-end")), c
    },
    _fill_yearsView: function (c, d, e, f, g, h, i, j) {
      var k, l, m, n, o, p, q, r, s, t, u;
      for (k = "", l = this.picker.find(c), m = parseInt(g / e, 10) * e, o = parseInt(h / f, 10) * f, p = parseInt(i / f, 10) * f, n = a.map(this.dates, function (a) {
          return parseInt(a.getUTCFullYear() / f, 10) * f
        }), l.find(".datepicker-switch").text(m + "-" + (m + 9 * f)), q = m - f, r = -1; 11 > r; r += 1) s = [d], t = null, -1 === r ? s.push("old") : 10 === r && s.push("new"), -1 !== a.inArray(q, n) && s.push("active"), (o > q || q > p) && s.push("disabled"), q === this.viewDate.getFullYear() && s.push("focused"), j !== a.noop && (u = j(new Date(q, 0, 1)), u === b ? u = {} : "boolean" == typeof u ? u = {
        enabled: u
      } : "string" == typeof u && (u = {
        classes: u
      }), u.enabled === !1 && s.push("disabled"), u.classes && (s = s.concat(u.classes.split(/\s+/))), u.tooltip && (t = u.tooltip)), k += '<span class="' + s.join(" ") + '"' + (t ? ' title="' + t + '"' : "") + ">" + q + "</span>", q += f;
      l.find("td").html(k)
    },
    fill: function () {
      var d, e, f = new Date(this.viewDate),
        g = f.getUTCFullYear(),
        h = f.getUTCMonth(),
        i = this.o.startDate !== -(1 / 0) ? this.o.startDate.getUTCFullYear() : -(1 / 0),
        j = this.o.startDate !== -(1 / 0) ? this.o.startDate.getUTCMonth() : -(1 / 0),
        k = this.o.endDate !== 1 / 0 ? this.o.endDate.getUTCFullYear() : 1 / 0,
        l = this.o.endDate !== 1 / 0 ? this.o.endDate.getUTCMonth() : 1 / 0,
        m = q[this.o.language].today || q.en.today || "",
        n = q[this.o.language].clear || q.en.clear || "",
        o = q[this.o.language].titleFormat || q.en.titleFormat;
      if (!isNaN(g) && !isNaN(h)) {
        this.picker.find(".datepicker-days .datepicker-switch").text(r.formatDate(f, o, this.o.language)), this.picker.find("tfoot .today").text(m).toggle(this.o.todayBtn !== !1), this.picker.find("tfoot .clear").text(n).toggle(this.o.clearBtn !== !1), this.picker.find("thead .datepicker-title").text(this.o.title).toggle("" !== this.o.title), this.updateNavArrows(), this.fillMonths();
        var p = c(g, h - 1, 28),
          s = r.getDaysInMonth(p.getUTCFullYear(), p.getUTCMonth());
        p.setUTCDate(s), p.setUTCDate(s - (p.getUTCDay() - this.o.weekStart + 7) % 7);
        var t = new Date(p);
        p.getUTCFullYear() < 100 && t.setUTCFullYear(p.getUTCFullYear()), t.setUTCDate(t.getUTCDate() + 42), t = t.valueOf();
        for (var u, v = []; p.valueOf() < t;) {
          if (p.getUTCDay() === this.o.weekStart && (v.push("<tr>"), this.o.calendarWeeks)) {
            var w = new Date(+p + (this.o.weekStart - p.getUTCDay() - 7) % 7 * 864e5),
              x = new Date(Number(w) + (11 - w.getUTCDay()) % 7 * 864e5),
              y = new Date(Number(y = c(x.getUTCFullYear(), 0, 1)) + (11 - y.getUTCDay()) % 7 * 864e5),
              z = (x - y) / 864e5 / 7 + 1;
            v.push('<td class="cw">' + z + "</td>")
          }
          u = this.getClassNames(p), u.push("day"), this.o.beforeShowDay !== a.noop && (e = this.o.beforeShowDay(this._utc_to_local(p)), e === b ? e = {} : "boolean" == typeof e ? e = {
            enabled: e
          } : "string" == typeof e && (e = {
            classes: e
          }), e.enabled === !1 && u.push("disabled"), e.classes && (u = u.concat(e.classes.split(/\s+/))), e.tooltip && (d = e.tooltip)), u = a.isFunction(a.uniqueSort) ? a.uniqueSort(u) : a.unique(u), v.push('<td class="' + u.join(" ") + '"' + (d ? ' title="' + d + '"' : "") + ">" + p.getUTCDate() + "</td>"), d = null, p.getUTCDay() === this.o.weekEnd && v.push("</tr>"), p.setUTCDate(p.getUTCDate() + 1)
        }
        this.picker.find(".datepicker-days tbody").empty().append(v.join(""));
        var A = q[this.o.language].monthsTitle || q.en.monthsTitle || "Months",
          B = this.picker.find(".datepicker-months").find(".datepicker-switch").text(this.o.maxViewMode < 2 ? A : g).end().find("span").removeClass("active");
        if (a.each(this.dates, function (a, b) {
            b.getUTCFullYear() === g && B.eq(b.getUTCMonth()).addClass("active")
          }), (i > g || g > k) && B.addClass("disabled"), g === i && B.slice(0, j).addClass("disabled"), g === k && B.slice(l + 1).addClass("disabled"), this.o.beforeShowMonth !== a.noop) {
          var C = this;
          a.each(B, function (c, d) {
            var e = new Date(g, c, 1),
              f = C.o.beforeShowMonth(e);
            f === b ? f = {} : "boolean" == typeof f ? f = {
              enabled: f
            } : "string" == typeof f && (f = {
              classes: f
            }), f.enabled !== !1 || a(d).hasClass("disabled") || a(d).addClass("disabled"), f.classes && a(d).addClass(f.classes), f.tooltip && a(d).prop("title", f.tooltip)
          })
        }
        this._fill_yearsView(".datepicker-years", "year", 10, 1, g, i, k, this.o.beforeShowYear), this._fill_yearsView(".datepicker-decades", "decade", 100, 10, g, i, k, this.o.beforeShowDecade), this._fill_yearsView(".datepicker-centuries", "century", 1e3, 100, g, i, k, this.o.beforeShowCentury)
      }
    },
    updateNavArrows: function () {
      if (this._allow_update) {
        var a = new Date(this.viewDate),
          b = a.getUTCFullYear(),
          c = a.getUTCMonth();
        switch (this.viewMode) {
          case 0:
            this.o.startDate !== -(1 / 0) && b <= this.o.startDate.getUTCFullYear() && c <= this.o.startDate.getUTCMonth() ? this.picker.find(".prev").css({
              visibility: "hidden"
            }) : this.picker.find(".prev").css({
              visibility: "visible"
            }), this.o.endDate !== 1 / 0 && b >= this.o.endDate.getUTCFullYear() && c >= this.o.endDate.getUTCMonth() ? this.picker.find(".next").css({
              visibility: "hidden"
            }) : this.picker.find(".next").css({
              visibility: "visible"
            });
            break;
          case 1:
          case 2:
          case 3:
          case 4:
            this.o.startDate !== -(1 / 0) && b <= this.o.startDate.getUTCFullYear() || this.o.maxViewMode < 2 ? this.picker.find(".prev").css({
              visibility: "hidden"
            }) : this.picker.find(".prev").css({
              visibility: "visible"
            }), this.o.endDate !== 1 / 0 && b >= this.o.endDate.getUTCFullYear() || this.o.maxViewMode < 2 ? this.picker.find(".next").css({
              visibility: "hidden"
            }) : this.picker.find(".next").css({
              visibility: "visible"
            })
        }
      }
    },
    click: function (b) {
      b.preventDefault(), b.stopPropagation();
      var e, f, g, h, i, j, k;
      e = a(b.target), e.hasClass("datepicker-switch") && this.showMode(1);
      var l = e.closest(".prev, .next");
      l.length > 0 && (f = r.modes[this.viewMode].navStep * (l.hasClass("prev") ? -1 : 1), 0 === this.viewMode ? (this.viewDate = this.moveMonth(this.viewDate, f), this._trigger("changeMonth", this.viewDate)) : (this.viewDate = this.moveYear(this.viewDate, f), 1 === this.viewMode && this._trigger("changeYear", this.viewDate)), this.fill()), e.hasClass("today") && !e.hasClass("day") && (this.showMode(-2), this._setDate(d(), "linked" === this.o.todayBtn ? null : "view")), e.hasClass("clear") && this.clearDates(), e.hasClass("disabled") || (e.hasClass("day") && (g = parseInt(e.text(), 10) || 1, h = this.viewDate.getUTCFullYear(), i = this.viewDate.getUTCMonth(), e.hasClass("old") && (0 === i ? (i = 11, h -= 1, j = !0, k = !0) : (i -= 1, j = !0)), e.hasClass("new") && (11 === i ? (i = 0, h += 1, j = !0, k = !0) : (i += 1, j = !0)), this._setDate(c(h, i, g)), k && this._trigger("changeYear", this.viewDate), j && this._trigger("changeMonth", this.viewDate)), e.hasClass("month") && (this.viewDate.setUTCDate(1), g = 1, i = e.parent().find("span").index(e), h = this.viewDate.getUTCFullYear(), this.viewDate.setUTCMonth(i), this._trigger("changeMonth", this.viewDate), 1 === this.o.minViewMode ? (this._setDate(c(h, i, g)), this.showMode()) : this.showMode(-1), this.fill()), (e.hasClass("year") || e.hasClass("decade") || e.hasClass("century")) && (this.viewDate.setUTCDate(1), g = 1, i = 0, h = parseInt(e.text(), 10) || 0, this.viewDate.setUTCFullYear(h), e.hasClass("year") && (this._trigger("changeYear", this.viewDate), 2 === this.o.minViewMode && this._setDate(c(h, i, g))), e.hasClass("decade") && (this._trigger("changeDecade", this.viewDate), 3 === this.o.minViewMode && this._setDate(c(h, i, g))), e.hasClass("century") && (this._trigger("changeCentury", this.viewDate), 4 === this.o.minViewMode && this._setDate(c(h, i, g))), this.showMode(-1), this.fill())), this.picker.is(":visible") && this._focused_from && a(this._focused_from).focus(), delete this._focused_from
    },
    _toggle_multidate: function (a) {
      var b = this.dates.contains(a);
      if (a || this.dates.clear(), -1 !== b ? (this.o.multidate === !0 || this.o.multidate > 1 || this.o.toggleActive) && this.dates.remove(b) : this.o.multidate === !1 ? (this.dates.clear(), this.dates.push(a)) : this.dates.push(a), "number" == typeof this.o.multidate)
        for (; this.dates.length > this.o.multidate;) this.dates.remove(0)
    },
    _setDate: function (a, b) {
      b && "date" !== b || this._toggle_multidate(a && new Date(a)), b && "view" !== b || (this.viewDate = a && new Date(a)), this.fill(), this.setValue(), b && "view" === b || this._trigger("changeDate"), this.inputField && this.inputField.change(), !this.o.autoclose || b && "date" !== b || this.hide()
    },
    moveDay: function (a, b) {
      var c = new Date(a);
      return c.setUTCDate(a.getUTCDate() + b), c
    },
    moveWeek: function (a, b) {
      return this.moveDay(a, 7 * b)
    },
    moveMonth: function (a, b) {
      if (!g(a)) return this.o.defaultViewDate;
      if (!b) return a;
      var c, d, e = new Date(a.valueOf()),
        f = e.getUTCDate(),
        h = e.getUTCMonth(),
        i = Math.abs(b);
      if (b = b > 0 ? 1 : -1, 1 === i) d = -1 === b ? function () {
        return e.getUTCMonth() === h
      } : function () {
        return e.getUTCMonth() !== c
      }, c = h + b, e.setUTCMonth(c), (0 > c || c > 11) && (c = (c + 12) % 12);
      else {
        for (var j = 0; i > j; j++) e = this.moveMonth(e, b);
        c = e.getUTCMonth(), e.setUTCDate(f), d = function () {
          return c !== e.getUTCMonth()
        }
      }
      for (; d();) e.setUTCDate(--f), e.setUTCMonth(c);
      return e
    },
    moveYear: function (a, b) {
      return this.moveMonth(a, 12 * b)
    },
    moveAvailableDate: function (a, b, c) {
      do {
        if (a = this[c](a, b), !this.dateWithinRange(a)) return !1;
        c = "moveDay"
      } while (this.dateIsDisabled(a));
      return a
    },
    weekOfDateIsDisabled: function (b) {
      return -1 !== a.inArray(b.getUTCDay(), this.o.daysOfWeekDisabled)
    },
    dateIsDisabled: function (b) {
      return this.weekOfDateIsDisabled(b) || a.grep(this.o.datesDisabled, function (a) {
        return e(b, a)
      }).length > 0
    },
    dateWithinRange: function (a) {
      return a >= this.o.startDate && a <= this.o.endDate
    },
    keydown: function (a) {
      if (!this.picker.is(":visible")) return void((40 === a.keyCode || 27 === a.keyCode) && (this.show(), a.stopPropagation()));
      var b, c, d = !1,
        e = this.focusDate || this.viewDate;
      switch (a.keyCode) {
        case 27:
          this.focusDate ? (this.focusDate = null, this.viewDate = this.dates.get(-1) || this.viewDate, this.fill()) : this.hide(), a.preventDefault(), a.stopPropagation();
          break;
        case 37:
        case 38:
        case 39:
        case 40:
          if (!this.o.keyboardNavigation || 7 === this.o.daysOfWeekDisabled.length) break;
          b = 37 === a.keyCode || 38 === a.keyCode ? -1 : 1, 0 === this.viewMode ? a.ctrlKey ? (c = this.moveAvailableDate(e, b, "moveYear"), c && this._trigger("changeYear", this.viewDate)) : a.shiftKey ? (c = this.moveAvailableDate(e, b, "moveMonth"), c && this._trigger("changeMonth", this.viewDate)) : 37 === a.keyCode || 39 === a.keyCode ? c = this.moveAvailableDate(e, b, "moveDay") : this.weekOfDateIsDisabled(e) || (c = this.moveAvailableDate(e, b, "moveWeek")) : 1 === this.viewMode ? ((38 === a.keyCode || 40 === a.keyCode) && (b = 4 * b), c = this.moveAvailableDate(e, b, "moveMonth")) : 2 === this.viewMode && ((38 === a.keyCode || 40 === a.keyCode) && (b = 4 * b), c = this.moveAvailableDate(e, b, "moveYear")), c && (this.focusDate = this.viewDate = c, this.setValue(), this.fill(), a.preventDefault());
          break;
        case 13:
          if (!this.o.forceParse) break;
          e = this.focusDate || this.dates.get(-1) || this.viewDate, this.o.keyboardNavigation && (this._toggle_multidate(e), d = !0), this.focusDate = null, this.viewDate = this.dates.get(-1) || this.viewDate, this.setValue(), this.fill(), this.picker.is(":visible") && (a.preventDefault(), a.stopPropagation(), this.o.autoclose && this.hide());
          break;
        case 9:
          this.focusDate = null, this.viewDate = this.dates.get(-1) || this.viewDate, this.fill(), this.hide()
      }
      d && (this.dates.length ? this._trigger("changeDate") : this._trigger("clearDate"), this.inputField && this.inputField.change())
    },
    showMode: function (a) {
      a && (this.viewMode = Math.max(this.o.minViewMode, Math.min(this.o.maxViewMode, this.viewMode + a))), this.picker.children("div").hide().filter(".datepicker-" + r.modes[this.viewMode].clsName).show(), this.updateNavArrows()
    }
  };
  var l = function (b, c) {
    a(b).data("datepicker", this), this.element = a(b), this.inputs = a.map(c.inputs, function (a) {
      return a.jquery ? a[0] : a
    }), delete c.inputs, n.call(a(this.inputs), c).on("changeDate", a.proxy(this.dateUpdated, this)), this.pickers = a.map(this.inputs, function (b) {
      return a(b).data("datepicker")
    }), this.updateDates()
  };
  l.prototype = {
    updateDates: function () {
      this.dates = a.map(this.pickers, function (a) {
        return a.getUTCDate()
      }), this.updateRanges()
    },
    updateRanges: function () {
      var b = a.map(this.dates, function (a) {
        return a.valueOf()
      });
      a.each(this.pickers, function (a, c) {
        c.setRange(b)
      })
    },
    dateUpdated: function (b) {
      if (!this.updating) {
        this.updating = !0;
        var c = a(b.target).data("datepicker");
        if ("undefined" != typeof c) {
          var d = c.getUTCDate(),
            e = a.inArray(b.target, this.inputs),
            f = e - 1,
            g = e + 1,
            h = this.inputs.length;
          if (-1 !== e) {
            if (a.each(this.pickers, function (a, b) {
                b.getUTCDate() || b.setUTCDate(d)
              }), d < this.dates[f])
              for (; f >= 0 && d < this.dates[f];) this.pickers[f--].setUTCDate(d);
            else if (d > this.dates[g])
              for (; h > g && d > this.dates[g];) this.pickers[g++].setUTCDate(d);
            this.updateDates(), delete this.updating
          }
        }
      }
    },
    remove: function () {
      a.map(this.pickers, function (a) {
        a.remove()
      }), delete this.element.data().datepicker
    }
  };
  var m = a.fn.datepicker,
    n = function (c) {
      var d = Array.apply(null, arguments);
      d.shift();
      var e;
      if (this.each(function () {
          var b = a(this),
            f = b.data("datepicker"),
            g = "object" == typeof c && c;
          if (!f) {
            var j = h(this, "date"),
              m = a.extend({}, o, j, g),
              n = i(m.language),
              p = a.extend({}, o, n, j, g);
            b.hasClass("input-daterange") || p.inputs ? (a.extend(p, {
              inputs: p.inputs || b.find("input").toArray()
            }), f = new l(this, p)) : f = new k(this, p), b.data("datepicker", f)
          }
          "string" == typeof c && "function" == typeof f[c] && (e = f[c].apply(f, d))
        }), e === b || e instanceof k || e instanceof l) return this;
      if (this.length > 1) throw new Error("Using only allowed for the collection of a single element (" + c + " function)");
      return e
    };
  a.fn.datepicker = n;
  var o = a.fn.datepicker.defaults = {
      assumeNearbyYear: !1,
      autoclose: !1,
      beforeShowDay: a.noop,
      beforeShowMonth: a.noop,
      beforeShowYear: a.noop,
      beforeShowDecade: a.noop,
      beforeShowCentury: a.noop,
      calendarWeeks: !1,
      clearBtn: !1,
      toggleActive: !1,
      daysOfWeekDisabled: [],
      daysOfWeekHighlighted: [],
      datesDisabled: [],
      endDate: 1 / 0,
      forceParse: !0,
      format: "mm/dd/yyyy",
      keyboardNavigation: !0,
      language: "en",
      minViewMode: 0,
      maxViewMode: 4,
      multidate: !1,
      multidateSeparator: ",",
      orientation: "auto",
      rtl: !1,
      startDate: -(1 / 0),
      startView: 0,
      todayBtn: !1,
      todayHighlight: !1,
      weekStart: 0,
      disableTouchKeyboard: !1,
      enableOnReadonly: !0,
      showOnFocus: !0,
      zIndexOffset: 10,
      container: "body",
      immediateUpdates: !1,
      title: "",
      templates: {
        leftArrow: "&laquo;",
        rightArrow: "&raquo;"
      }
    },
    p = a.fn.datepicker.locale_opts = ["format", "rtl", "weekStart"];
  a.fn.datepicker.Constructor = k;
  var q = a.fn.datepicker.dates = {
      en: {
        days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        daysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        daysMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
        months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        today: "Today",
        clear: "Clear",
        titleFormat: "MM yyyy"
      }
    },
    r = {
      modes: [{
        clsName: "days",
        navFnc: "Month",
        navStep: 1
      }, {
        clsName: "months",
        navFnc: "FullYear",
        navStep: 1
      }, {
        clsName: "years",
        navFnc: "FullYear",
        navStep: 10
      }, {
        clsName: "decades",
        navFnc: "FullDecade",
        navStep: 100
      }, {
        clsName: "centuries",
        navFnc: "FullCentury",
        navStep: 1e3
      }],
      isLeapYear: function (a) {
        return a % 4 === 0 && a % 100 !== 0 || a % 400 === 0
      },
      getDaysInMonth: function (a, b) {
        return [31, r.isLeapYear(a) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][b]
      },
      validParts: /dd?|DD?|mm?|MM?|yy(?:yy)?/g,
      nonpunctuation: /[^ -\/:-@\u5e74\u6708\u65e5\[-`{-~\t\n\r]+/g,
      parseFormat: function (a) {
        if ("function" == typeof a.toValue && "function" == typeof a.toDisplay) return a;
        var b = a.replace(this.validParts, "\x00").split("\x00"),
          c = a.match(this.validParts);
        if (!b || !b.length || !c || 0 === c.length) throw new Error("Invalid date format.");
        return {
          separators: b,
          parts: c
        }
      },
      parseDate: function (e, f, g, h) {
        function i(a, b) {
          return b === !0 && (b = 10), 100 > a && (a += 2e3, a > (new Date).getFullYear() + b && (a -= 100)), a
        }

        function j() {
          var a = this.slice(0, s[n].length),
            b = s[n].slice(0, a.length);
          return a.toLowerCase() === b.toLowerCase()
        }
        if (!e) return b;
        if (e instanceof Date) return e;
        if ("string" == typeof f && (f = r.parseFormat(f)), f.toValue) return f.toValue(e, f, g);
        var l, m, n, o, p = /([\-+]\d+)([dmwy])/,
          s = e.match(/([\-+]\d+)([dmwy])/g),
          t = {
            d: "moveDay",
            m: "moveMonth",
            w: "moveWeek",
            y: "moveYear"
          },
          u = {
            yesterday: "-1d",
            today: "+0d",
            tomorrow: "+1d"
          };
        if (/^[\-+]\d+[dmwy]([\s,]+[\-+]\d+[dmwy])*$/.test(e)) {
          for (e = new Date, n = 0; n < s.length; n++) l = p.exec(s[n]), m = parseInt(l[1]), o = t[l[2]], e = k.prototype[o](e, m);
          return c(e.getUTCFullYear(), e.getUTCMonth(), e.getUTCDate())
        }
        if ("undefined" != typeof u[e] && (e = u[e], s = e.match(/([\-+]\d+)([dmwy])/g), /^[\-+]\d+[dmwy]([\s,]+[\-+]\d+[dmwy])*$/.test(e))) {
          for (e = new Date, n = 0; n < s.length; n++) l = p.exec(s[n]), m = parseInt(l[1]), o = t[l[2]], e = k.prototype[o](e, m);
          return c(e.getUTCFullYear(), e.getUTCMonth(), e.getUTCDate())
        }
        s = e && e.match(this.nonpunctuation) || [], e = new Date;
        var v, w, x = {},
          y = ["yyyy", "yy", "M", "MM", "m", "mm", "d", "dd"],
          z = {
            yyyy: function (a, b) {
              return a.setUTCFullYear(h ? i(b, h) : b)
            },
            yy: function (a, b) {
              return a.setUTCFullYear(h ? i(b, h) : b)
            },
            m: function (a, b) {
              if (isNaN(a)) return a;
              for (b -= 1; 0 > b;) b += 12;
              for (b %= 12, a.setUTCMonth(b); a.getUTCMonth() !== b;) a.setUTCDate(a.getUTCDate() - 1);
              return a
            },
            d: function (a, b) {
              return a.setUTCDate(b)
            }
          };
        z.M = z.MM = z.mm = z.m, z.dd = z.d, e = d();
        var A = f.parts.slice();
        if (s.length !== A.length && (A = a(A).filter(function (b, c) {
            return -1 !== a.inArray(c, y)
          }).toArray()), s.length === A.length) {
          var B;
          for (n = 0, B = A.length; B > n; n++) {
            if (v = parseInt(s[n], 10), l = A[n], isNaN(v)) switch (l) {
              case "MM":
                w = a(q[g].months).filter(j), v = a.inArray(w[0], q[g].months) + 1;
                break;
              case "M":
                w = a(q[g].monthsShort).filter(j), v = a.inArray(w[0], q[g].monthsShort) + 1
            }
            x[l] = v
          }
          var C, D;
          for (n = 0; n < y.length; n++) D = y[n], D in x && !isNaN(x[D]) && (C = new Date(e), z[D](C, x[D]), isNaN(C) || (e = C))
        }
        return e
      },
      formatDate: function (b, c, d) {
        if (!b) return "";
        if ("string" == typeof c && (c = r.parseFormat(c)),
          c.toDisplay) return c.toDisplay(b, c, d);
        var e = {
          d: b.getUTCDate(),
          D: q[d].daysShort[b.getUTCDay()],
          DD: q[d].days[b.getUTCDay()],
          m: b.getUTCMonth() + 1,
          M: q[d].monthsShort[b.getUTCMonth()],
          MM: q[d].months[b.getUTCMonth()],
          yy: b.getUTCFullYear().toString().substring(2),
          yyyy: b.getUTCFullYear()
        };
        e.dd = (e.d < 10 ? "0" : "") + e.d, e.mm = (e.m < 10 ? "0" : "") + e.m, b = [];
        for (var f = a.extend([], c.separators), g = 0, h = c.parts.length; h >= g; g++) f.length && b.push(f.shift()), b.push(e[c.parts[g]]);
        return b.join("")
      },
      headTemplate: '<thead><tr><th colspan="7" class="datepicker-title"></th></tr><tr><th class="prev">&laquo;</th><th colspan="5" class="datepicker-switch"></th><th class="next">&raquo;</th></tr></thead>',
      contTemplate: '<tbody><tr><td colspan="7"></td></tr></tbody>',
      footTemplate: '<tfoot><tr><th colspan="7" class="today"></th></tr><tr><th colspan="7" class="clear"></th></tr></tfoot>'
    };
  r.template = '<div class="datepicker"><div class="datepicker-days"><table class="table-condensed">' + r.headTemplate + "<tbody></tbody>" + r.footTemplate + '</table></div><div class="datepicker-months"><table class="table-condensed">' + r.headTemplate + r.contTemplate + r.footTemplate + '</table></div><div class="datepicker-years"><table class="table-condensed">' + r.headTemplate + r.contTemplate + r.footTemplate + '</table></div><div class="datepicker-decades"><table class="table-condensed">' + r.headTemplate + r.contTemplate + r.footTemplate + '</table></div><div class="datepicker-centuries"><table class="table-condensed">' + r.headTemplate + r.contTemplate + r.footTemplate + "</table></div></div>", a.fn.datepicker.DPGlobal = r, a.fn.datepicker.noConflict = function () {
    return a.fn.datepicker = m, this
  }, a.fn.datepicker.version = "1.6.4", a(document).on("focus.datepicker.data-api click.datepicker.data-api", '[data-provide="datepicker"]', function (b) {
    var c = a(this);
    c.data("datepicker") || (b.preventDefault(), n.call(c, "show"))
  }), a(function () {
    n.call(a('[data-provide="datepicker-inline"]'))
  })
});

/*
 * Bootstrap select v1.12.1 (http://silviomoreto.github.io/bootstrap-select)
 *
 * Copyright 2013-2016 bootstrap-select
 * Licensed under MIT (https://github.com/silviomoreto/bootstrap-select/blob/master/LICENSE)
 */
! function (a, b) {
  "function" == typeof define && define.amd ? define(["jquery"], function (a) {
    return b(a)
  }) : "object" == typeof module && module.exports ? module.exports = b(require("jquery")) : b(a.jQuery)
}(this, function (a) {
  ! function (a) {
    "use strict";

    function b(b) {
      var c = [{
        re: /[\xC0-\xC6]/g,
        ch: "A"
      }, {
        re: /[\xE0-\xE6]/g,
        ch: "a"
      }, {
        re: /[\xC8-\xCB]/g,
        ch: "E"
      }, {
        re: /[\xE8-\xEB]/g,
        ch: "e"
      }, {
        re: /[\xCC-\xCF]/g,
        ch: "I"
      }, {
        re: /[\xEC-\xEF]/g,
        ch: "i"
      }, {
        re: /[\xD2-\xD6]/g,
        ch: "O"
      }, {
        re: /[\xF2-\xF6]/g,
        ch: "o"
      }, {
        re: /[\xD9-\xDC]/g,
        ch: "U"
      }, {
        re: /[\xF9-\xFC]/g,
        ch: "u"
      }, {
        re: /[\xC7-\xE7]/g,
        ch: "c"
      }, {
        re: /[\xD1]/g,
        ch: "N"
      }, {
        re: /[\xF1]/g,
        ch: "n"
      }];
      return a.each(c, function () {
        b = b ? b.replace(this.re, this.ch) : ""
      }), b
    }

    function c(b) {
      var c = arguments,
        d = b;
      [].shift.apply(c);
      var e, f = this.each(function () {
        var b = a(this);
        if (b.is("select")) {
          var f = b.data("selectpicker"),
            g = "object" == typeof d && d;
          if (f) {
            if (g)
              for (var h in g) g.hasOwnProperty(h) && (f.options[h] = g[h])
          } else {
            var i = a.extend({}, k.DEFAULTS, a.fn.selectpicker.defaults || {}, b.data(), g);
            i.template = a.extend({}, k.DEFAULTS.template, a.fn.selectpicker.defaults ? a.fn.selectpicker.defaults.template : {}, b.data().template, g.template), b.data("selectpicker", f = new k(this, i))
          }
          "string" == typeof d && (e = f[d] instanceof Function ? f[d].apply(f, c) : f.options[d])
        }
      });
      return "undefined" != typeof e ? e : f
    }
    String.prototype.includes || ! function () {
      var a = {}.toString,
        b = function () {
          try {
            var a = {},
              b = Object.defineProperty,
              c = b(a, a, a) && b
          } catch (a) {}
          return c
        }(),
        c = "".indexOf,
        d = function (b) {
          if (null == this) throw new TypeError;
          var d = String(this);
          if (b && "[object RegExp]" == a.call(b)) throw new TypeError;
          var e = d.length,
            f = String(b),
            g = f.length,
            h = arguments.length > 1 ? arguments[1] : void 0,
            i = h ? Number(h) : 0;
          i != i && (i = 0);
          var j = Math.min(Math.max(i, 0), e);
          return !(g + j > e) && c.call(d, f, i) != -1
        };
      b ? b(String.prototype, "includes", {
        value: d,
        configurable: !0,
        writable: !0
      }) : String.prototype.includes = d
    }(), String.prototype.startsWith || ! function () {
      var a = function () {
          try {
            var a = {},
              b = Object.defineProperty,
              c = b(a, a, a) && b
          } catch (a) {}
          return c
        }(),
        b = {}.toString,
        c = function (a) {
          if (null == this) throw new TypeError;
          var c = String(this);
          if (a && "[object RegExp]" == b.call(a)) throw new TypeError;
          var d = c.length,
            e = String(a),
            f = e.length,
            g = arguments.length > 1 ? arguments[1] : void 0,
            h = g ? Number(g) : 0;
          h != h && (h = 0);
          var i = Math.min(Math.max(h, 0), d);
          if (f + i > d) return !1;
          for (var j = -1; ++j < f;)
            if (c.charCodeAt(i + j) != e.charCodeAt(j)) return !1;
          return !0
        };
      a ? a(String.prototype, "startsWith", {
        value: c,
        configurable: !0,
        writable: !0
      }) : String.prototype.startsWith = c
    }(), Object.keys || (Object.keys = function (a, b, c) {
      c = [];
      for (b in a) c.hasOwnProperty.call(a, b) && c.push(b);
      return c
    });
    var d = {
      useDefault: !1,
      _set: a.valHooks.select.set
    };
    a.valHooks.select.set = function (b, c) {
      return c && !d.useDefault && a(b).data("selected", !0), d._set.apply(this, arguments)
    };
    var e = null;
    a.fn.triggerNative = function (a) {
      var b, c = this[0];
      c.dispatchEvent ? ("function" == typeof Event ? b = new Event(a, {
        bubbles: !0
      }) : (b = document.createEvent("Event"), b.initEvent(a, !0, !1)), c.dispatchEvent(b)) : c.fireEvent ? (b = document.createEventObject(), b.eventType = a, c.fireEvent("on" + a, b)) : this.trigger(a)
    }, a.expr.pseudos.icontains = function (b, c, d) {
      var e = a(b),
        f = (e.data("tokens") || e.text()).toString().toUpperCase();
      return f.includes(d[3].toUpperCase())
    }, a.expr.pseudos.ibegins = function (b, c, d) {
      var e = a(b),
        f = (e.data("tokens") || e.text()).toString().toUpperCase();
      return f.startsWith(d[3].toUpperCase())
    }, a.expr.pseudos.aicontains = function (b, c, d) {
      var e = a(b),
        f = (e.data("tokens") || e.data("normalizedText") || e.text()).toString().toUpperCase();
      return f.includes(d[3].toUpperCase())
    }, a.expr.pseudos.aibegins = function (b, c, d) {
      var e = a(b),
        f = (e.data("tokens") || e.data("normalizedText") || e.text()).toString().toUpperCase();
      return f.startsWith(d[3].toUpperCase())
    };
    var f = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#x27;",
        "`": "&#x60;"
      },
      g = {
        "&amp;": "&",
        "&lt;": "<",
        "&gt;": ">",
        "&quot;": '"',
        "&#x27;": "'",
        "&#x60;": "`"
      },
      h = function (a) {
        var b = function (b) {
            return a[b]
          },
          c = "(?:" + Object.keys(a).join("|") + ")",
          d = RegExp(c),
          e = RegExp(c, "g");
        return function (a) {
          return a = null == a ? "" : "" + a, d.test(a) ? a.replace(e, b) : a
        }
      },
      i = h(f),
      j = h(g),
      k = function (b, c) {
        d.useDefault || (a.valHooks.select.set = d._set, d.useDefault = !0), this.$element = a(b), this.$newElement = null, this.$button = null, this.$menu = null, this.$lis = null, this.options = c, null === this.options.title && (this.options.title = this.$element.attr("title"));
        var e = this.options.windowPadding;
        "number" == typeof e && (this.options.windowPadding = [e, e, e, e]), this.val = k.prototype.val, this.render = k.prototype.render, this.refresh = k.prototype.refresh, this.setStyle = k.prototype.setStyle, this.selectAll = k.prototype.selectAll, this.deselectAll = k.prototype.deselectAll, this.destroy = k.prototype.destroy, this.remove = k.prototype.remove, this.show = k.prototype.show, this.hide = k.prototype.hide, this.init()
      };
    k.VERSION = "1.12.1", k.DEFAULTS = {
      noneSelectedText: "Nothing selected",
      noneResultsText: "No results matched {0}",
      countSelectedText: function (a, b) {
        return 1 == a ? "{0} item selected" : "{0} items selected"
      },
      maxOptionsText: function (a, b) {
        return [1 == a ? "Limit reached ({n} item max)" : "Limit reached ({n} items max)", 1 == b ? "Group limit reached ({n} item max)" : "Group limit reached ({n} items max)"]
      },
      selectAllText: "Select All",
      deselectAllText: "Deselect All",
      doneButton: !1,
      doneButtonText: "Close",
      multipleSeparator: ", ",
      styleBase: "btn",
      style: "btn-default",
      size: "auto",
      title: null,
      selectedTextFormat: "values",
      width: !1,
      container: !1,
      hideDisabled: !1,
      showSubtext: !1,
      showIcon: !0,
      showContent: !0,
      dropupAuto: !0,
      header: !1,
      liveSearch: !1,
      liveSearchPlaceholder: null,
      liveSearchNormalize: !1,
      liveSearchStyle: "contains",
      actionsBox: !1,
      iconBase: "glyphicon",
      tickIcon: "glyphicon-ok",
      showTick: !1,
      template: {
        caret: '<span class="caret"></span>'
      },
      maxOptions: !1,
      mobile: !1,
      selectOnTab: !1,
      dropdownAlignRight: !1,
      windowPadding: 0
    }, k.prototype = {
      constructor: k,
      init: function () {
        var b = this,
          c = this.$element.attr("id");
        this.$element.addClass("bs-select-hidden"), this.liObj = {}, this.multiple = this.$element.prop("multiple"), this.autofocus = this.$element.prop("autofocus"), this.$newElement = this.createView(), this.$element.after(this.$newElement).appendTo(this.$newElement), this.$button = this.$newElement.children("button"), this.$menu = this.$newElement.children(".dropdown-menu"), this.$menuInner = this.$menu.children(".inner"), this.$searchbox = this.$menu.find("input"), this.$element.removeClass("bs-select-hidden"), this.options.dropdownAlignRight === !0 && this.$menu.addClass("dropdown-menu-right"), "undefined" != typeof c && (this.$button.attr("data-id", c), a('label[for="' + c + '"]').click(function (a) {
          a.preventDefault(), b.$button.focus()
        })), this.checkDisabled(), this.clickListener(), this.options.liveSearch && this.liveSearchListener(), this.render(), this.setStyle(), this.setWidth(), this.options.container && this.selectPosition(), this.$menu.data("this", this), this.$newElement.data("this", this), this.options.mobile && this.mobile(), this.$newElement.on({
          "hide.bs.dropdown": function (a) {
            b.$menuInner.attr("aria-expanded", !1), b.$element.trigger("hide.bs.select", a)
          },
          "hidden.bs.dropdown": function (a) {
            b.$element.trigger("hidden.bs.select", a)
          },
          "show.bs.dropdown": function (a) {
            b.$menuInner.attr("aria-expanded", !0), b.$element.trigger("show.bs.select", a)
          },
          "shown.bs.dropdown": function (a) {
            b.$element.trigger("shown.bs.select", a)
          }
        }), b.$element[0].hasAttribute("required") && this.$element.on("invalid", function () {
          b.$button.addClass("bs-invalid").focus(), b.$element.on({
            "focus.bs.select": function () {
              b.$button.focus(), b.$element.off("focus.bs.select")
            },
            "shown.bs.select": function () {
              b.$element.val(b.$element.val()).off("shown.bs.select")
            },
            "rendered.bs.select": function () {
              this.validity.valid && b.$button.removeClass("bs-invalid"), b.$element.off("rendered.bs.select")
            }
          })
        }), setTimeout(function () {
          b.$element.trigger("loaded.bs.select")
        })
      },
      createDropdown: function () {
        var b = this.multiple || this.options.showTick ? " show-tick" : "",
          c = this.$element.parent().hasClass("input-group") ? " input-group-btn" : "",
          d = this.autofocus ? " autofocus" : "",
          e = this.options.header ? '<div class="popover-title"><button type="button" class="close" aria-hidden="true">&times;</button>' + this.options.header + "</div>" : "",
          f = this.options.liveSearch ? '<div class="bs-searchbox"><input type="text" class="form-control" autocomplete="off"' + (null === this.options.liveSearchPlaceholder ? "" : ' placeholder="' + i(this.options.liveSearchPlaceholder) + '"') + ' role="textbox" aria-label="Search"></div>' : "",
          g = this.multiple && this.options.actionsBox ? '<div class="bs-actionsbox"><div class="btn-group btn-group-sm btn-block"><button type="button" class="actions-btn bs-select-all btn btn-default">' + this.options.selectAllText + '</button><button type="button" class="actions-btn bs-deselect-all btn btn-default">' + this.options.deselectAllText + "</button></div></div>" : "",
          h = this.multiple && this.options.doneButton ? '<div class="bs-donebutton"><div class="btn-group btn-block"><button type="button" class="btn btn-sm btn-default">' + this.options.doneButtonText + "</button></div></div>" : "",
          j = '<div class="btn-group bootstrap-select' + b + c + '"><button type="button" class="' + this.options.styleBase + ' dropdown-toggle" data-toggle="dropdown"' + d + ' role="button"><span class="filter-option pull-left"></span>&nbsp;<span class="bs-caret">' + this.options.template.caret + '</span></button><div class="dropdown-menu open" role="combobox">' + e + f + g + '<ul class="dropdown-menu inner" role="listbox" aria-expanded="false"></ul>' + h + "</div></div>";
        return a(j)
      },
      createView: function () {
        var a = this.createDropdown(),
          b = this.createLi();
        return a.find("ul")[0].innerHTML = b, a
      },
      reloadLi: function () {
        var a = this.createLi();
        this.$menuInner[0].innerHTML = a
      },
      createLi: function () {
        var c = this,
          d = [],
          e = 0,
          f = document.createElement("option"),
          g = -1,
          h = function (a, b, c, d) {
            return "<li" + ("undefined" != typeof c & "" !== c ? ' class="' + c + '"' : "") + ("undefined" != typeof b & null !== b ? ' data-original-index="' + b + '"' : "") + ("undefined" != typeof d & null !== d ? 'data-optgroup="' + d + '"' : "") + ">" + a + "</li>"
          },
          j = function (d, e, f, g) {
            return '<a tabindex="0"' + ("undefined" != typeof e ? ' class="' + e + '"' : "") + (f ? ' style="' + f + '"' : "") + (c.options.liveSearchNormalize ? ' data-normalized-text="' + b(i(a(d).html())) + '"' : "") + ("undefined" != typeof g || null !== g ? ' data-tokens="' + g + '"' : "") + ' role="option">' + d + '<span class="' + c.options.iconBase + " " + c.options.tickIcon + ' check-mark"></span></a>'
          };
        if (this.options.title && !this.multiple && (g--, !this.$element.find(".bs-title-option").length)) {
          var k = this.$element[0];
          f.className = "bs-title-option", f.innerHTML = this.options.title, f.value = "", k.insertBefore(f, k.firstChild);
          var l = a(k.options[k.selectedIndex]);
          void 0 === l.attr("selected") && void 0 === this.$element.data("selected") && (f.selected = !0)
        }
        return this.$element.find("option").each(function (b) {
          var f = a(this);
          if (g++, !f.hasClass("bs-title-option")) {
            var k = this.className || "",
              l = this.style.cssText,
              m = f.data("content") ? f.data("content") : f.html(),
              n = f.data("tokens") ? f.data("tokens") : null,
              o = "undefined" != typeof f.data("subtext") ? '<small class="text-muted">' + f.data("subtext") + "</small>" : "",
              p = "undefined" != typeof f.data("icon") ? '<span class="' + c.options.iconBase + " " + f.data("icon") + '"></span> ' : "",
              q = f.parent(),
              r = "OPTGROUP" === q[0].tagName,
              s = r && q[0].disabled,
              t = this.disabled || s;
            if ("" !== p && t && (p = "<span>" + p + "</span>"), c.options.hideDisabled && (t && !r || s)) return void g--;
            if (f.data("content") || (m = p + '<span class="text">' + m + o + "</span>"), r && f.data("divider") !== !0) {
              if (c.options.hideDisabled && t) {
                if (void 0 === q.data("allOptionsDisabled")) {
                  var u = q.children();
                  q.data("allOptionsDisabled", u.filter(":disabled").length === u.length)
                }
                if (q.data("allOptionsDisabled")) return void g--
              }
              var v = " " + q[0].className || "";
              if (0 === f.index()) {
                e += 1;
                var w = q[0].label,
                  x = "undefined" != typeof q.data("subtext") ? '<small class="text-muted">' + q.data("subtext") + "</small>" : "",
                  y = q.data("icon") ? '<span class="' + c.options.iconBase + " " + q.data("icon") + '"></span> ' : "";
                w = y + '<span class="text">' + i(w) + x + "</span>", 0 !== b && d.length > 0 && (g++, d.push(h("", null, "divider", e + "div"))), g++, d.push(h(w, null, "dropdown-header" + v, e))
              }
              if (c.options.hideDisabled && t) return void g--;
              d.push(h(j(m, "opt " + k + v, l, n), b, "", e))
            } else if (f.data("divider") === !0) d.push(h("", b, "divider"));
            else if (f.data("hidden") === !0) d.push(h(j(m, k, l, n), b, "hidden is-hidden"));
            else {
              var z = this.previousElementSibling && "OPTGROUP" === this.previousElementSibling.tagName;
              if (!z && c.options.hideDisabled)
                for (var A = a(this).prevAll(), B = 0; B < A.length; B++)
                  if ("OPTGROUP" === A[B].tagName) {
                    for (var C = 0, D = 0; D < B; D++) {
                      var E = A[D];
                      (E.disabled || a(E).data("hidden") === !0) && C++
                    }
                    C === B && (z = !0);
                    break
                  } z && (g++, d.push(h("", null, "divider", e + "div"))), d.push(h(j(m, k, l, n), b))
            }
            c.liObj[b] = g
          }
        }), this.multiple || 0 !== this.$element.find("option:selected").length || this.options.title || this.$element.find("option").eq(0).prop("selected", !0).attr("selected", "selected"), d.join("")
      },
      findLis: function () {
        return null == this.$lis && (this.$lis = this.$menu.find("li")), this.$lis
      },
      render: function (b) {
        var c, d = this;
        b !== !1 && this.$element.find("option").each(function (a) {
          var b = d.findLis().eq(d.liObj[a]);
          d.setDisabled(a, this.disabled || "OPTGROUP" === this.parentNode.tagName && this.parentNode.disabled, b), d.setSelected(a, this.selected, b)
        }), this.togglePlaceholder(), this.tabIndex();
        var e = this.$element.find("option").map(function () {
            if (this.selected) {
              if (d.options.hideDisabled && (this.disabled || "OPTGROUP" === this.parentNode.tagName && this.parentNode.disabled)) return;
              var b, c = a(this),
                e = c.data("icon") && d.options.showIcon ? '<i class="' + d.options.iconBase + " " + c.data("icon") + '"></i> ' : "";
              return b = d.options.showSubtext && c.data("subtext") && !d.multiple ? ' <small class="text-muted">' + c.data("subtext") + "</small>" : "", "undefined" != typeof c.attr("title") ? c.attr("title") : c.data("content") && d.options.showContent ? c.data("content").toString() : e + c.html() + b
            }
          }).toArray(),
          f = this.multiple ? e.join(this.options.multipleSeparator) : e[0];
        if (this.multiple && this.options.selectedTextFormat.indexOf("count") > -1) {
          var g = this.options.selectedTextFormat.split(">");
          if (g.length > 1 && e.length > g[1] || 1 == g.length && e.length >= 2) {
            c = this.options.hideDisabled ? ", [disabled]" : "";
            var h = this.$element.find("option").not('[data-divider="true"], [data-hidden="true"]' + c).length,
              i = "function" == typeof this.options.countSelectedText ? this.options.countSelectedText(e.length, h) : this.options.countSelectedText;
            f = i.replace("{0}", e.length.toString()).replace("{1}", h.toString())
          }
        }
        void 0 == this.options.title && (this.options.title = this.$element.attr("title")), "static" == this.options.selectedTextFormat && (f = this.options.title), f || (f = "undefined" != typeof this.options.title ? this.options.title : this.options.noneSelectedText), this.$button.attr("title", j(a.trim(f.replace(/<[^>]*>?/g, "")))), this.$button.children(".filter-option").html(f), this.$element.trigger("rendered.bs.select")
      },
      setStyle: function (a, b) {
        this.$element.attr("class") && this.$newElement.addClass(this.$element.attr("class").replace(/selectpicker|mobile-device|bs-select-hidden|validate\[.*\]/gi, ""));
        var c = a ? a : this.options.style;
        "add" == b ? this.$button.addClass(c) : "remove" == b ? this.$button.removeClass(c) : (this.$button.removeClass(this.options.style), this.$button.addClass(c))
      },
      liHeight: function (b) {
        if (b || this.options.size !== !1 && !this.sizeInfo) {
          var c = document.createElement("div"),
            d = document.createElement("div"),
            e = document.createElement("ul"),
            f = document.createElement("li"),
            g = document.createElement("li"),
            h = document.createElement("a"),
            i = document.createElement("span"),
            j = this.options.header && this.$menu.find(".popover-title").length > 0 ? this.$menu.find(".popover-title")[0].cloneNode(!0) : null,
            k = this.options.liveSearch ? document.createElement("div") : null,
            l = this.options.actionsBox && this.multiple && this.$menu.find(".bs-actionsbox").length > 0 ? this.$menu.find(".bs-actionsbox")[0].cloneNode(!0) : null,
            m = this.options.doneButton && this.multiple && this.$menu.find(".bs-donebutton").length > 0 ? this.$menu.find(".bs-donebutton")[0].cloneNode(!0) : null;
          if (i.className = "text", c.className = this.$menu[0].parentNode.className + " open", d.className = "dropdown-menu open", e.className = "dropdown-menu inner", f.className = "divider", i.appendChild(document.createTextNode("Inner text")), h.appendChild(i), g.appendChild(h), e.appendChild(g), e.appendChild(f), j && d.appendChild(j), k) {
            var n = document.createElement("span");
            k.className = "bs-searchbox", n.className = "form-control", k.appendChild(n), d.appendChild(k)
          }
          l && d.appendChild(l), d.appendChild(e), m && d.appendChild(m), c.appendChild(d), document.body.appendChild(c);
          var o = h.offsetHeight,
            p = j ? j.offsetHeight : 0,
            q = k ? k.offsetHeight : 0,
            r = l ? l.offsetHeight : 0,
            s = m ? m.offsetHeight : 0,
            t = a(f).outerHeight(!0),
            u = "function" == typeof getComputedStyle && getComputedStyle(d),
            v = u ? null : a(d),
            w = {
              vert: parseInt(u ? u.paddingTop : v.css("paddingTop")) + parseInt(u ? u.paddingBottom : v.css("paddingBottom")) + parseInt(u ? u.borderTopWidth : v.css("borderTopWidth")) + parseInt(u ? u.borderBottomWidth : v.css("borderBottomWidth")),
              horiz: parseInt(u ? u.paddingLeft : v.css("paddingLeft")) + parseInt(u ? u.paddingRight : v.css("paddingRight")) + parseInt(u ? u.borderLeftWidth : v.css("borderLeftWidth")) + parseInt(u ? u.borderRightWidth : v.css("borderRightWidth"))
            },
            x = {
              vert: w.vert + parseInt(u ? u.marginTop : v.css("marginTop")) + parseInt(u ? u.marginBottom : v.css("marginBottom")) + 2,
              horiz: w.horiz + parseInt(u ? u.marginLeft : v.css("marginLeft")) + parseInt(u ? u.marginRight : v.css("marginRight")) + 2
            };
          document.body.removeChild(c), this.sizeInfo = {
            liHeight: o,
            headerHeight: p,
            searchHeight: q,
            actionsHeight: r,
            doneButtonHeight: s,
            dividerHeight: t,
            menuPadding: w,
            menuExtras: x
          }
        }
      },
      setSize: function () {
        if (this.findLis(), this.liHeight(), this.options.header && this.$menu.css("padding-top", 0), this.options.size !== !1) {
          var b, c, d, e, f, g, h, i, j = this,
            k = this.$menu,
            l = this.$menuInner,
            m = a(window),
            n = this.$newElement[0].offsetHeight,
            o = this.$newElement[0].offsetWidth,
            p = this.sizeInfo.liHeight,
            q = this.sizeInfo.headerHeight,
            r = this.sizeInfo.searchHeight,
            s = this.sizeInfo.actionsHeight,
            t = this.sizeInfo.doneButtonHeight,
            u = this.sizeInfo.dividerHeight,
            v = this.sizeInfo.menuPadding,
            w = this.sizeInfo.menuExtras,
            x = this.options.hideDisabled ? ".disabled" : "",
            y = function () {
              var b, c = j.$newElement.offset(),
                d = a(j.options.container);
              j.options.container && !d.is("body") ? (b = d.offset(), b.top += parseInt(d.css("borderTopWidth")), b.left += parseInt(d.css("borderLeftWidth"))) : b = {
                top: 0,
                left: 0
              };
              var e = j.options.windowPadding;
              f = c.top - b.top - m.scrollTop(), g = m.height() - f - n - b.top - e[2], h = c.left - b.left - m.scrollLeft(), i = m.width() - h - o - b.left - e[1], f -= e[0], h -= e[3]
            };
          if (y(), "auto" === this.options.size) {
            var z = function () {
              var m, n = function (b, c) {
                  return function (d) {
                    return c ? d.classList ? d.classList.contains(b) : a(d).hasClass(b) : !(d.classList ? d.classList.contains(b) : a(d).hasClass(b))
                  }
                },
                u = j.$menuInner[0].getElementsByTagName("li"),
                x = Array.prototype.filter ? Array.prototype.filter.call(u, n("hidden", !1)) : j.$lis.not(".hidden"),
                z = Array.prototype.filter ? Array.prototype.filter.call(x, n("dropdown-header", !0)) : x.filter(".dropdown-header");
              y(), b = g - w.vert, c = i - w.horiz, j.options.container ? (k.data("height") || k.data("height", k.height()), d = k.data("height"), k.data("width") || k.data("width", k.width()), e = k.data("width")) : (d = k.height(), e = k.width()), j.options.dropupAuto && j.$newElement.toggleClass("dropup", f > g && b - w.vert < d), j.$newElement.hasClass("dropup") && (b = f - w.vert), "auto" === j.options.dropdownAlignRight && k.toggleClass("dropdown-menu-right", h > i && c - w.horiz < e - o), m = x.length + z.length > 3 ? 3 * p + w.vert - 2 : 0, k.css({
                "max-height": b + "px",
                overflow: "hidden",
                "min-height": m + q + r + s + t + "px"
              }), l.css({
                "max-height": b - q - r - s - t - v.vert + "px",
                "overflow-y": "auto",
                "min-height": Math.max(m - v.vert, 0) + "px"
              })
            };
            z(), this.$searchbox.off("input.getSize propertychange.getSize").on("input.getSize propertychange.getSize", z), m.off("resize.getSize scroll.getSize").on("resize.getSize scroll.getSize", z)
          } else if (this.options.size && "auto" != this.options.size && this.$lis.not(x).length > this.options.size) {
            var A = this.$lis.not(".divider").not(x).children().slice(0, this.options.size).last().parent().index(),
              B = this.$lis.slice(0, A + 1).filter(".divider").length;
            b = p * this.options.size + B * u + v.vert, j.options.container ? (k.data("height") || k.data("height", k.height()), d = k.data("height")) : d = k.height(), j.options.dropupAuto && this.$newElement.toggleClass("dropup", f > g && b - w.vert < d), k.css({
              "max-height": b + q + r + s + t + "px",
              overflow: "hidden",
              "min-height": ""
            }), l.css({
              "max-height": b - v.vert + "px",
              "overflow-y": "auto",
              "min-height": ""
            })
          }
        }
      },
      setWidth: function () {
        if ("auto" === this.options.width) {
          this.$menu.css("min-width", "0");
          var a = this.$menu.parent().clone().appendTo("body"),
            b = this.options.container ? this.$newElement.clone().appendTo("body") : a,
            c = a.children(".dropdown-menu").outerWidth(),
            d = b.css("width", "auto").children("button").outerWidth();
          a.remove(), b.remove(), this.$newElement.css("width", Math.max(c, d) + "px")
        } else "fit" === this.options.width ? (this.$menu.css("min-width", ""), this.$newElement.css("width", "").addClass("fit-width")) : this.options.width ? (this.$menu.css("min-width", ""), this.$newElement.css("width", this.options.width)) : (this.$menu.css("min-width", ""), this.$newElement.css("width", ""));
        this.$newElement.hasClass("fit-width") && "fit" !== this.options.width && this.$newElement.removeClass("fit-width")
      },
      selectPosition: function () {
        this.$bsContainer = a('<div class="bs-container" />');
        var b, c, d, e = this,
          f = a(this.options.container),
          g = function (a) {
            e.$bsContainer.addClass(a.attr("class").replace(/form-control|fit-width/gi, "")).toggleClass("dropup", a.hasClass("dropup")), b = a.offset(), f.is("body") ? c = {
              top: 0,
              left: 0
            } : (c = f.offset(), c.top += parseInt(f.css("borderTopWidth")) - f.scrollTop(), c.left += parseInt(f.css("borderLeftWidth")) - f.scrollLeft()), d = a.hasClass("dropup") ? 0 : a[0].offsetHeight, e.$bsContainer.css({
              top: b.top - c.top + d,
              left: b.left - c.left,
              width: a[0].offsetWidth
            })
          };
        this.$button.on("click", function () {
          var b = a(this);
          e.isDisabled() || (g(e.$newElement), e.$bsContainer.appendTo(e.options.container).toggleClass("open", !b.hasClass("open")).append(e.$menu))
        }), a(window).on("resize scroll", function () {
          g(e.$newElement)
        }), this.$element.on("hide.bs.select", function () {
          e.$menu.data("height", e.$menu.height()), e.$bsContainer.detach()
        })
      },
      setSelected: function (a, b, c) {
        c || (this.togglePlaceholder(), c = this.findLis().eq(this.liObj[a])), c.toggleClass("selected", b).find("a").attr("aria-selected", b)
      },
      setDisabled: function (a, b, c) {
        c || (c = this.findLis().eq(this.liObj[a])), b ? c.addClass("disabled").children("a").attr("href", "#").attr("tabindex", -1).attr("aria-disabled", !0) : c.removeClass("disabled").children("a").removeAttr("href").attr("tabindex", 0).attr("aria-disabled", !1)
      },
      isDisabled: function () {
        return this.$element[0].disabled
      },
      checkDisabled: function () {
        var a = this;
        this.isDisabled() ? (this.$newElement.addClass("disabled"), this.$button.addClass("disabled").attr("tabindex", -1).attr("aria-disabled", !0)) : (this.$button.hasClass("disabled") && (this.$newElement.removeClass("disabled"), this.$button.removeClass("disabled").attr("aria-disabled", !1)), this.$button.attr("tabindex") != -1 || this.$element.data("tabindex") || this.$button.removeAttr("tabindex")), this.$button.click(function () {
          return !a.isDisabled()
        })
      },
      togglePlaceholder: function () {
        var a = this.$element.val();
        this.$button.toggleClass("bs-placeholder", null === a || "" === a || a.constructor === Array && 0 === a.length)
      },
      tabIndex: function () {
        this.$element.data("tabindex") !== this.$element.attr("tabindex") && this.$element.attr("tabindex") !== -98 && "-98" !== this.$element.attr("tabindex") && (this.$element.data("tabindex", this.$element.attr("tabindex")), this.$button.attr("tabindex", this.$element.data("tabindex"))), this.$element.attr("tabindex", -98)
      },
      clickListener: function () {
        var b = this,
          c = a(document);
        c.data("spaceSelect", !1), this.$button.on("keyup", function (a) {
          /(32)/.test(a.keyCode.toString(10)) && c.data("spaceSelect") && (a.preventDefault(), c.data("spaceSelect", !1))
        }), this.$button.on("click", function () {
          b.setSize()
        }), this.$element.on("shown.bs.select", function () {
          if (b.options.liveSearch || b.multiple) {
            if (!b.multiple) {
              var a = b.liObj[b.$element[0].selectedIndex];
              if ("number" != typeof a || b.options.size === !1) return;
              var c = b.$lis.eq(a)[0].offsetTop - b.$menuInner[0].offsetTop;
              c = c - b.$menuInner[0].offsetHeight / 2 + b.sizeInfo.liHeight / 2, b.$menuInner[0].scrollTop = c
            }
          } else b.$menuInner.find(".selected a").focus()
        }), this.$menuInner.on("click", "li a", function (c) {
          var d = a(this),
            f = d.parent().data("originalIndex"),
            g = b.$element.val(),
            h = b.$element.prop("selectedIndex"),
            i = !0;
          if (b.multiple && 1 !== b.options.maxOptions && c.stopPropagation(), c.preventDefault(), !b.isDisabled() && !d.parent().hasClass("disabled")) {
            var j = b.$element.find("option"),
              k = j.eq(f),
              l = k.prop("selected"),
              m = k.parent("optgroup"),
              n = b.options.maxOptions,
              o = m.data("maxOptions") || !1;
            if (b.multiple) {
              if (k.prop("selected", !l), b.setSelected(f, !l), d.blur(), n !== !1 || o !== !1) {
                var p = n < j.filter(":selected").length,
                  q = o < m.find("option:selected").length;
                if (n && p || o && q)
                  if (n && 1 == n) j.prop("selected", !1), k.prop("selected", !0), b.$menuInner.find(".selected").removeClass("selected"), b.setSelected(f, !0);
                  else if (o && 1 == o) {
                  m.find("option:selected").prop("selected", !1), k.prop("selected", !0);
                  var r = d.parent().data("optgroup");
                  b.$menuInner.find('[data-optgroup="' + r + '"]').removeClass("selected"), b.setSelected(f, !0)
                } else {
                  var s = "string" == typeof b.options.maxOptionsText ? [b.options.maxOptionsText, b.options.maxOptionsText] : b.options.maxOptionsText,
                    t = "function" == typeof s ? s(n, o) : s,
                    u = t[0].replace("{n}", n),
                    v = t[1].replace("{n}", o),
                    w = a('<div class="notify"></div>');
                  t[2] && (u = u.replace("{var}", t[2][n > 1 ? 0 : 1]), v = v.replace("{var}", t[2][o > 1 ? 0 : 1])), k.prop("selected", !1), b.$menu.append(w), n && p && (w.append(a("<div>" + u + "</div>")), i = !1, b.$element.trigger("maxReached.bs.select")), o && q && (w.append(a("<div>" + v + "</div>")), i = !1, b.$element.trigger("maxReachedGrp.bs.select")), setTimeout(function () {
                    b.setSelected(f, !1)
                  }, 10), w.delay(750).fadeOut(300, function () {
                    a(this).remove()
                  })
                }
              }
            } else j.prop("selected", !1), k.prop("selected", !0), b.$menuInner.find(".selected").removeClass("selected").find("a").attr("aria-selected", !1), b.setSelected(f, !0);
            !b.multiple || b.multiple && 1 === b.options.maxOptions ? b.$button.focus() : b.options.liveSearch && b.$searchbox.focus(), i && (g != b.$element.val() && b.multiple || h != b.$element.prop("selectedIndex") && !b.multiple) && (e = [f, k.prop("selected"), l], b.$element.triggerNative("change"))
          }
        }), this.$menu.on("click", "li.disabled a, .popover-title, .popover-title :not(.close)", function (c) {
          c.currentTarget == this && (c.preventDefault(), c.stopPropagation(), b.options.liveSearch && !a(c.target).hasClass("close") ? b.$searchbox.focus() : b.$button.focus())
        }), this.$menuInner.on("click", ".divider, .dropdown-header", function (a) {
          a.preventDefault(), a.stopPropagation(), b.options.liveSearch ? b.$searchbox.focus() : b.$button.focus()
        }), this.$menu.on("click", ".popover-title .close", function () {
          b.$button.click()
        }), this.$searchbox.on("click", function (a) {
          a.stopPropagation()
        }), this.$menu.on("click", ".actions-btn", function (c) {
          b.options.liveSearch ? b.$searchbox.focus() : b.$button.focus(), c.preventDefault(), c.stopPropagation(), a(this).hasClass("bs-select-all") ? b.selectAll() : b.deselectAll()
        }), this.$element.change(function () {
          b.render(!1), b.$element.trigger("changed.bs.select", e), e = null
        })
      },
      liveSearchListener: function () {
        var c = this,
          d = a('<li class="no-results"></li>');
        this.$button.on("click.dropdown.data-api", function () {
          c.$menuInner.find(".active").removeClass("active"), c.$searchbox.val() && (c.$searchbox.val(""), c.$lis.not(".is-hidden").removeClass("hidden"), d.parent().length && d.remove()), c.multiple || c.$menuInner.find(".selected").addClass("active"), setTimeout(function () {
            c.$searchbox.focus()
          }, 10)
        }), this.$searchbox.on("click.dropdown.data-api focus.dropdown.data-api touchend.dropdown.data-api", function (a) {
          a.stopPropagation()
        }), this.$searchbox.on("input propertychange", function () {
          if (c.$lis.not(".is-hidden").removeClass("hidden"), c.$lis.filter(".active").removeClass("active"), d.remove(), c.$searchbox.val()) {
            var e, f = c.$lis.not(".is-hidden, .divider, .dropdown-header");
            if (e = c.options.liveSearchNormalize ? f.not(":a" + c._searchStyle() + '("' + b(c.$searchbox.val()) + '")') : f.not(":" + c._searchStyle() + '("' + c.$searchbox.val() + '")'), e.length === f.length) d.html(c.options.noneResultsText.replace("{0}", '"' + i(c.$searchbox.val()) + '"')), c.$menuInner.append(d), c.$lis.addClass("hidden");
            else {
              e.addClass("hidden");
              var g, h = c.$lis.not(".hidden");
              h.each(function (b) {
                var c = a(this);
                c.hasClass("divider") ? void 0 === g ? c.addClass("hidden") : (g && g.addClass("hidden"), g = c) : c.hasClass("dropdown-header") && h.eq(b + 1).data("optgroup") !== c.data("optgroup") ? c.addClass("hidden") : g = null
              }), g && g.addClass("hidden"), f.not(".hidden").first().addClass("active")
            }
          }
        })
      },
      _searchStyle: function () {
        var a = {
          begins: "ibegins",
          startsWith: "ibegins"
        };
        return a[this.options.liveSearchStyle] || "icontains"
      },
      val: function (a) {
        return "undefined" != typeof a ? (this.$element.val(a), this.render(), this.$element) : this.$element.val()
      },
      changeAll: function (b) {
        if (this.multiple) {
          "undefined" == typeof b && (b = !0), this.findLis();
          var c = this.$element.find("option"),
            d = this.$lis.not(".divider, .dropdown-header, .disabled, .hidden"),
            e = d.length,
            f = [];
          if (b) {
            if (d.filter(".selected").length === d.length) return
          } else if (0 === d.filter(".selected").length) return;
          d.toggleClass("selected", b);
          for (var g = 0; g < e; g++) {
            var h = d[g].getAttribute("data-original-index");
            f[f.length] = c.eq(h)[0]
          }
          a(f).prop("selected", b), this.render(!1), this.togglePlaceholder(), this.$element.triggerNative("change")
        }
      },
      selectAll: function () {
        return this.changeAll(!0)
      },
      deselectAll: function () {
        return this.changeAll(!1)
      },
      toggle: function (a) {
        a = a || window.event, a && a.stopPropagation(), this.$button.trigger("click")
      },
      keydown: function (c) {
        var d, e, f, g, h, i, j, k, l, m = a(this),
          n = m.is("input") ? m.parent().parent() : m.parent(),
          o = n.data("this"),
          p = ":not(.disabled, .hidden, .dropdown-header, .divider)",
          q = {
            32: " ",
            48: "0",
            49: "1",
            50: "2",
            51: "3",
            52: "4",
            53: "5",
            54: "6",
            55: "7",
            56: "8",
            57: "9",
            59: ";",
            65: "a",
            66: "b",
            67: "c",
            68: "d",
            69: "e",
            70: "f",
            71: "g",
            72: "h",
            73: "i",
            74: "j",
            75: "k",
            76: "l",
            77: "m",
            78: "n",
            79: "o",
            80: "p",
            81: "q",
            82: "r",
            83: "s",
            84: "t",
            85: "u",
            86: "v",
            87: "w",
            88: "x",
            89: "y",
            90: "z",
            96: "0",
            97: "1",
            98: "2",
            99: "3",
            100: "4",
            101: "5",
            102: "6",
            103: "7",
            104: "8",
            105: "9"
          };
        if (o.options.liveSearch && (n = m.parent().parent()), o.options.container && (n = o.$menu), d = a('[role="listbox"] li', n), l = o.$newElement.hasClass("open"), !l && (c.keyCode >= 48 && c.keyCode <= 57 || c.keyCode >= 96 && c.keyCode <= 105 || c.keyCode >= 65 && c.keyCode <= 90)) return o.options.container ? o.$button.trigger("click") : (o.setSize(), o.$menu.parent().addClass("open"), l = !0), void o.$searchbox.focus();
        if (o.options.liveSearch && (/(^9$|27)/.test(c.keyCode.toString(10)) && l && (c.preventDefault(), c.stopPropagation(), o.$menuInner.click(), o.$button.focus()), d = a('[role="listbox"] li' + p, n), m.val() || /(38|40)/.test(c.keyCode.toString(10)) || 0 === d.filter(".active").length && (d = o.$menuInner.find("li"), d = o.options.liveSearchNormalize ? d.filter(":a" + o._searchStyle() + "(" + b(q[c.keyCode]) + ")") : d.filter(":" + o._searchStyle() + "(" + q[c.keyCode] + ")"))), d.length) {
          if (/(38|40)/.test(c.keyCode.toString(10))) e = d.index(d.find("a").filter(":focus").parent()), g = d.filter(p).first().index(), h = d.filter(p).last().index(), f = d.eq(e).nextAll(p).eq(0).index(), i = d.eq(e).prevAll(p).eq(0).index(), j = d.eq(f).prevAll(p).eq(0).index(), o.options.liveSearch && (d.each(function (b) {
            a(this).hasClass("disabled") || a(this).data("index", b)
          }), e = d.index(d.filter(".active")), g = d.first().data("index"), h = d.last().data("index"), f = d.eq(e).nextAll().eq(0).data("index"), i = d.eq(e).prevAll().eq(0).data("index"), j = d.eq(f).prevAll().eq(0).data("index")), k = m.data("prevIndex"), 38 == c.keyCode ? (o.options.liveSearch && e--, e != j && e > i && (e = i), e < g && (e = g), e == k && (e = h)) : 40 == c.keyCode && (o.options.liveSearch && e++, e == -1 && (e = 0), e != j && e < f && (e = f), e > h && (e = h), e == k && (e = g)), m.data("prevIndex", e), o.options.liveSearch ? (c.preventDefault(), m.hasClass("dropdown-toggle") || (d.removeClass("active").eq(e).addClass("active").children("a").focus(), m.focus())) : d.eq(e).children("a").focus();
          else if (!m.is("input")) {
            var r, s, t = [];
            d.each(function () {
              a(this).hasClass("disabled") || a.trim(a(this).children("a").text().toLowerCase()).substring(0, 1) == q[c.keyCode] && t.push(a(this).index())
            }), r = a(document).data("keycount"), r++, a(document).data("keycount", r), s = a.trim(a(":focus").text().toLowerCase()).substring(0, 1), s != q[c.keyCode] ? (r = 1, a(document).data("keycount", r)) : r >= t.length && (a(document).data("keycount", 0), r > t.length && (r = 1)), d.eq(t[r - 1]).children("a").focus()
          }
          if ((/(13|32)/.test(c.keyCode.toString(10)) || /(^9$)/.test(c.keyCode.toString(10)) && o.options.selectOnTab) && l) {
            if (/(32)/.test(c.keyCode.toString(10)) || c.preventDefault(), o.options.liveSearch) /(32)/.test(c.keyCode.toString(10)) || (o.$menuInner.find(".active a").click(), m.focus());
            else {
              var u = a(":focus");
              u.click(), u.focus(), c.preventDefault(), a(document).data("spaceSelect", !0)
            }
            a(document).data("keycount", 0)
          }(/(^9$|27)/.test(c.keyCode.toString(10)) && l && (o.multiple || o.options.liveSearch) || /(27)/.test(c.keyCode.toString(10)) && !l) && (o.$menu.parent().removeClass("open"), o.options.container && o.$newElement.removeClass("open"), o.$button.focus())
        }
      },
      mobile: function () {
        this.$element.addClass("mobile-device")
      },
      refresh: function () {
        this.$lis = null, this.liObj = {}, this.reloadLi(), this.render(), this.checkDisabled(), this.liHeight(!0), this.setStyle(), this.setWidth(), this.$lis && this.$searchbox.trigger("propertychange"), this.$element.trigger("refreshed.bs.select")
      },
      hide: function () {
        this.$newElement.hide()
      },
      show: function () {
        this.$newElement.show()
      },
      remove: function () {
        this.$newElement.remove(), this.$element.remove()
      },
      destroy: function () {
        this.$newElement.before(this.$element).remove(), this.$bsContainer ? this.$bsContainer.remove() : this.$menu.remove(), this.$element.off(".bs.select").removeData("selectpicker").removeClass("bs-select-hidden selectpicker")
      }
    };
    var l = a.fn.selectpicker;
    a.fn.selectpicker = c, a.fn.selectpicker.Constructor = k, a.fn.selectpicker.noConflict = function () {
      return a.fn.selectpicker = l, this
    }, a(document).data("keycount", 0).on("keydown.bs.select", '.bootstrap-select [data-toggle=dropdown], .bootstrap-select [role="listbox"], .bs-searchbox input', k.prototype.keydown).on("focusin.modal", '.bootstrap-select [data-toggle=dropdown], .bootstrap-select [role="listbox"], .bs-searchbox input', function (a) {
      a.stopPropagation()
    }), a(window).on("load.bs.select.data-api", function () {
      a(".selectpicker").each(function () {
        var b = a(this);
        c.call(b, b.data())
      })
    })
  }(a)
});
//# sourceMappingURL=bootstrap-select.js.map

/*
 * jQuery Nivo Slider v3.2
 * http://nivo.dev7studios.com
 *
 * Copyright 2012, Dev7studios
 * Free to use and abuse under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 */
(function (e) {
  var t = function (t, n) {
    var r = e.extend({}, e.fn.nivoSlider.defaults, n);
    var i = {
      currentSlide: 0,
      currentImage: "",
      totalSlides: 0,
      running: false,
      paused: false,
      stop: false,
      controlNavEl: false
    };
    var s = e(t);
    s.data("nivo:vars", i).addClass("nivoSlider");
    var o = s.children();
    o.each(function () {
      var t = e(this);
      var n = "";
      if (!t.is("img")) {
        if (t.is("a")) {
          t.addClass("nivo-imageLink");
          n = t
        }
        t = t.find("img:first")
      }
      var r = r === 0 ? t.attr("width") : t.width(),
        s = s === 0 ? t.attr("height") : t.height();
      if (n !== "") {
        n.css("display", "none")
      }
      t.css("display", "none");
      i.totalSlides++
    });
    if (r.randomStart) {
      r.startSlide = Math.floor(Math.random() * i.totalSlides)
    }
    if (r.startSlide > 0) {
      if (r.startSlide >= i.totalSlides) {
        r.startSlide = i.totalSlides - 1
      }
      i.currentSlide = r.startSlide
    }
    if (e(o[i.currentSlide]).is("img")) {
      i.currentImage = e(o[i.currentSlide])
    } else {
      i.currentImage = e(o[i.currentSlide]).find("img:first")
    }
    if (e(o[i.currentSlide]).is("a")) {
      e(o[i.currentSlide]).css("display", "block")
    }
    var u = e("<img/>").addClass("nivo-main-image");
    u.attr("src", i.currentImage.attr("src")).show();
    s.append(u);
    e(window).resize(function () {
      s.children("img").width(s.width());
      u.attr("src", i.currentImage.attr("src"));
      u.stop().height("auto");
      e(".nivo-slice").remove();
      e(".nivo-box").remove()
    });
    s.append(e('<div class="nivo-caption"></div>'));
    var a = function (t) {
      var n = e(".nivo-caption", s);
      if (i.currentImage.attr("title") != "" && i.currentImage.attr("title") != undefined) {
        var r = i.currentImage.attr("title");
        if (r.substr(0, 1) == "#") r = e(r).html();
        if (n.css("display") == "block") {
          setTimeout(function () {
            n.html(r)
          }, t.animSpeed)
        } else {
          n.html(r);
          n.stop().fadeIn(t.animSpeed)
        }
      } else {
        n.stop().fadeOut(t.animSpeed)
      }
    };
    a(r);
    var f = 0;
    if (!r.manualAdvance && o.length > 1) {
      f = setInterval(function () {
        d(s, o, r, false)
      }, r.pauseTime)
    }
    if (r.directionNav) {
      s.append('<div class="nivo-directionNav"><a class="nivo-prevNav">' + r.prevText + '</a><a class="nivo-nextNav">' + r.nextText + "</a></div>");
      e(s).on("click", "a.nivo-prevNav", function () {
        if (i.running) {
          return false
        }
        clearInterval(f);
        f = "";
        i.currentSlide -= 2;
        d(s, o, r, "prev")
      });
      e(s).on("click", "a.nivo-nextNav", function () {
        if (i.running) {
          return false
        }
        clearInterval(f);
        f = "";
        d(s, o, r, "next")
      })
    }
    if (r.controlNav) {
      i.controlNavEl = e('<div class="nivo-controlNav"></div>');
      s.after(i.controlNavEl);
      for (var l = 0; l < o.length; l++) {
        if (r.controlNavThumbs) {
          i.controlNavEl.addClass("nivo-thumbs-enabled");
          var c = o.eq(l);
          if (!c.is("img")) {
            c = c.find("img:first")
          }
          if (c.attr("data-thumb")) i.controlNavEl.append('<a class="nivo-control" rel="' + l + '"><img src="' + c.attr("data-thumb") + '" alt="" /></a>')
        } else {
          i.controlNavEl.append('<a class="nivo-control" rel="' + l + '">' + (l + 1) + "</a>")
        }
      }
      e("a:eq(" + i.currentSlide + ")", i.controlNavEl).addClass("active");
      e("a", i.controlNavEl).bind("click", function () {
        if (i.running) return false;
        if (e(this).hasClass("active")) return false;
        clearInterval(f);
        f = "";
        u.attr("src", i.currentImage.attr("src"));
        i.currentSlide = e(this).attr("rel") - 1;
        d(s, o, r, "control")
      })
    }
    if (r.pauseOnHover) {
      s.hover(function () {
        i.paused = true;
        clearInterval(f);
        f = ""
      }, function () {
        i.paused = false;
        if (f === "" && !r.manualAdvance) {
          f = setInterval(function () {
            d(s, o, r, false)
          }, r.pauseTime)
        }
      })
    }
    s.bind("nivo:animFinished", function () {
      u.attr("src", i.currentImage.attr("src"));
      i.running = false;
      e(o).each(function () {
        if (e(this).is("a")) {
          e(this).css("display", "none")
        }
      });
      if (e(o[i.currentSlide]).is("a")) {
        e(o[i.currentSlide]).css("display", "block")
      }
      if (f === "" && !i.paused && !r.manualAdvance) {
        f = setInterval(function () {
          d(s, o, r, false)
        }, r.pauseTime)
      }
      r.afterChange.call(this)
    });
    var h = function (t, n, r) {
      if (e(r.currentImage).parent().is("a")) e(r.currentImage).parent().css("display", "block");
      e('img[src="' + r.currentImage.attr("src") + '"]', t).not(".nivo-main-image,.nivo-control img").width(t.width()).css("visibility", "hidden").show();
      var i = e('img[src="' + r.currentImage.attr("src") + '"]', t).not(".nivo-main-image,.nivo-control img").parent().is("a") ? e('img[src="' + r.currentImage.attr("src") + '"]', t).not(".nivo-main-image,.nivo-control img").parent().height() : e('img[src="' + r.currentImage.attr("src") + '"]', t).not(".nivo-main-image,.nivo-control img").height();
      for (var s = 0; s < n.slices; s++) {
        var o = Math.round(t.width() / n.slices);
        if (s === n.slices - 1) {
          t.append(e('<div class="nivo-slice" name="' + s + '"><img src="' + r.currentImage.attr("src") + '" style="position:absolute; width:' + t.width() + "px; height:auto; display:block !important; top:0; left:-" + (o + s * o - o) + 'px;" /></div>').css({
            left: o * s + "px",
            width: t.width() - o * s + "px",
            height: i + "px",
            opacity: "0",
            overflow: "hidden"
          }))
        } else {
          t.append(e('<div class="nivo-slice" name="' + s + '"><img src="' + r.currentImage.attr("src") + '" style="position:absolute; width:' + t.width() + "px; height:auto; display:block !important; top:0; left:-" + (o + s * o - o) + 'px;" /></div>').css({
            left: o * s + "px",
            width: o + "px",
            height: i + "px",
            opacity: "0",
            overflow: "hidden"
          }))
        }
      }
      e(".nivo-slice", t).height(i);
      u.stop().animate({
        height: e(r.currentImage).height()
      }, n.animSpeed)
    };
    var p = function (t, n, r) {
      if (e(r.currentImage).parent().is("a")) e(r.currentImage).parent().css("display", "block");
      e('img[src="' + r.currentImage.attr("src") + '"]', t).not(".nivo-main-image,.nivo-control img").width(t.width()).css("visibility", "hidden").show();
      var i = Math.round(t.width() / n.boxCols),
        s = Math.round(e('img[src="' + r.currentImage.attr("src") + '"]', t).not(".nivo-main-image,.nivo-control img").height() / n.boxRows);
      for (var o = 0; o < n.boxRows; o++) {
        for (var a = 0; a < n.boxCols; a++) {
          if (a === n.boxCols - 1) {
            t.append(e('<div class="nivo-box" name="' + a + '" rel="' + o + '"><img src="' + r.currentImage.attr("src") + '" style="position:absolute; width:' + t.width() + "px; height:auto; display:block; top:-" + s * o + "px; left:-" + i * a + 'px;" /></div>').css({
              opacity: 0,
              left: i * a + "px",
              top: s * o + "px",
              width: t.width() - i * a + "px"
            }));
            e('.nivo-box[name="' + a + '"]', t).height(e('.nivo-box[name="' + a + '"] img', t).height() + "px")
          } else {
            t.append(e('<div class="nivo-box" name="' + a + '" rel="' + o + '"><img src="' + r.currentImage.attr("src") + '" style="position:absolute; width:' + t.width() + "px; height:auto; display:block; top:-" + s * o + "px; left:-" + i * a + 'px;" /></div>').css({
              opacity: 0,
              left: i * a + "px",
              top: s * o + "px",
              width: i + "px"
            }));
            e('.nivo-box[name="' + a + '"]', t).height(e('.nivo-box[name="' + a + '"] img', t).height() + "px")
          }
        }
      }
      u.stop().animate({
        height: e(r.currentImage).height()
      }, n.animSpeed)
    };
    var d = function (t, n, r, i) {
      var s = t.data("nivo:vars");
      if (s && s.currentSlide === s.totalSlides - 1) {
        r.lastSlide.call(this)
      }
      if ((!s || s.stop) && !i) {
        return false
      }
      r.beforeChange.call(this);
      if (!i) {
        u.attr("src", s.currentImage.attr("src"))
      } else {
        if (i === "prev") {
          u.attr("src", s.currentImage.attr("src"))
        }
        if (i === "next") {
          u.attr("src", s.currentImage.attr("src"))
        }
      }
      s.currentSlide++;
      if (s.currentSlide === s.totalSlides) {
        s.currentSlide = 0;
        r.slideshowEnd.call(this)
      }
      if (s.currentSlide < 0) {
        s.currentSlide = s.totalSlides - 1
      }
      if (e(n[s.currentSlide]).is("img")) {
        s.currentImage = e(n[s.currentSlide])
      } else {
        s.currentImage = e(n[s.currentSlide]).find("img:first")
      }
      if (r.controlNav) {
        e("a", s.controlNavEl).removeClass("active");
        e("a:eq(" + s.currentSlide + ")", s.controlNavEl).addClass("active")
      }
      a(r);
      e(".nivo-slice", t).remove();
      e(".nivo-box", t).remove();
      var o = r.effect,
        f = "";
      if (r.effect === "random") {
        f = new Array("sliceDownRight", "sliceDownLeft", "sliceUpRight", "sliceUpLeft", "sliceUpDown", "sliceUpDownLeft", "fold", "fade", "boxRandom", "boxRain", "boxRainReverse", "boxRainGrow", "boxRainGrowReverse");
        o = f[Math.floor(Math.random() * (f.length + 1))];
        if (o === undefined) {
          o = "fade"
        }
      }
      if (r.effect.indexOf(",") !== -1) {
        f = r.effect.split(",");
        o = f[Math.floor(Math.random() * f.length)];
        if (o === undefined) {
          o = "fade"
        }
      }
      if (s.currentImage.attr("data-transition")) {
        o = s.currentImage.attr("data-transition")
      }
      s.running = true;
      var l = 0,
        c = 0,
        d = "",
        m = "",
        g = "",
        y = "";
      if (o === "sliceDown" || o === "sliceDownRight" || o === "sliceDownLeft") {
        h(t, r, s);
        l = 0;
        c = 0;
        d = e(".nivo-slice", t);
        if (o === "sliceDownLeft") {
          d = e(".nivo-slice", t)._reverse()
        }
        d.each(function () {
          var n = e(this);
          n.css({
            top: "0px"
          });
          if (c === r.slices - 1) {
            setTimeout(function () {
              n.animate({
                opacity: "1.0"
              }, r.animSpeed, "", function () {
                t.trigger("nivo:animFinished")
              })
            }, 100 + l)
          } else {
            setTimeout(function () {
              n.animate({
                opacity: "1.0"
              }, r.animSpeed)
            }, 100 + l)
          }
          l += 50;
          c++
        })
      } else if (o === "sliceUp" || o === "sliceUpRight" || o === "sliceUpLeft") {
        h(t, r, s);
        l = 0;
        c = 0;
        d = e(".nivo-slice", t);
        if (o === "sliceUpLeft") {
          d = e(".nivo-slice", t)._reverse()
        }
        d.each(function () {
          var n = e(this);
          n.css({
            bottom: "0px"
          });
          if (c === r.slices - 1) {
            setTimeout(function () {
              n.animate({
                opacity: "1.0"
              }, r.animSpeed, "", function () {
                t.trigger("nivo:animFinished")
              })
            }, 100 + l)
          } else {
            setTimeout(function () {
              n.animate({
                opacity: "1.0"
              }, r.animSpeed)
            }, 100 + l)
          }
          l += 50;
          c++
        })
      } else if (o === "sliceUpDown" || o === "sliceUpDownRight" || o === "sliceUpDownLeft") {
        h(t, r, s);
        l = 0;
        c = 0;
        var b = 0;
        d = e(".nivo-slice", t);
        if (o === "sliceUpDownLeft") {
          d = e(".nivo-slice", t)._reverse()
        }
        d.each(function () {
          var n = e(this);
          if (c === 0) {
            n.css("top", "0px");
            c++
          } else {
            n.css("bottom", "0px");
            c = 0
          }
          if (b === r.slices - 1) {
            setTimeout(function () {
              n.animate({
                opacity: "1.0"
              }, r.animSpeed, "", function () {
                t.trigger("nivo:animFinished")
              })
            }, 100 + l)
          } else {
            setTimeout(function () {
              n.animate({
                opacity: "1.0"
              }, r.animSpeed)
            }, 100 + l)
          }
          l += 50;
          b++
        })
      } else if (o === "fold") {
        h(t, r, s);
        l = 0;
        c = 0;
        e(".nivo-slice", t).each(function () {
          var n = e(this);
          var i = n.width();
          n.css({
            top: "0px",
            width: "0px"
          });
          if (c === r.slices - 1) {
            setTimeout(function () {
              n.animate({
                width: i,
                opacity: "1.0"
              }, r.animSpeed, "", function () {
                t.trigger("nivo:animFinished")
              })
            }, 100 + l)
          } else {
            setTimeout(function () {
              n.animate({
                width: i,
                opacity: "1.0"
              }, r.animSpeed)
            }, 100 + l)
          }
          l += 50;
          c++
        })
      } else if (o === "fade") {
        h(t, r, s);
        m = e(".nivo-slice:first", t);
        m.css({
          width: t.width() + "px"
        });
        m.animate({
          opacity: "1.0"
        }, r.animSpeed * 2, "", function () {
          t.trigger("nivo:animFinished")
        })
      } else if (o === "slideInRight") {
        h(t, r, s);
        m = e(".nivo-slice:first", t);
        m.css({
          width: "0px",
          opacity: "1"
        });
        m.animate({
          width: t.width() + "px"
        }, r.animSpeed * 2, "", function () {
          t.trigger("nivo:animFinished")
        })
      } else if (o === "slideInLeft") {
        h(t, r, s);
        m = e(".nivo-slice:first", t);
        m.css({
          width: "0px",
          opacity: "1",
          left: "",
          right: "0px"
        });
        m.animate({
          width: t.width() + "px"
        }, r.animSpeed * 2, "", function () {
          m.css({
            left: "0px",
            right: ""
          });
          t.trigger("nivo:animFinished")
        })
      } else if (o === "boxRandom") {
        p(t, r, s);
        g = r.boxCols * r.boxRows;
        c = 0;
        l = 0;
        y = v(e(".nivo-box", t));
        y.each(function () {
          var n = e(this);
          if (c === g - 1) {
            setTimeout(function () {
              n.animate({
                opacity: "1"
              }, r.animSpeed, "", function () {
                t.trigger("nivo:animFinished")
              })
            }, 100 + l)
          } else {
            setTimeout(function () {
              n.animate({
                opacity: "1"
              }, r.animSpeed)
            }, 100 + l)
          }
          l += 20;
          c++
        })
      } else if (o === "boxRain" || o === "boxRainReverse" || o === "boxRainGrow" || o === "boxRainGrowReverse") {
        p(t, r, s);
        g = r.boxCols * r.boxRows;
        c = 0;
        l = 0;
        var w = 0;
        var E = 0;
        var S = [];
        S[w] = [];
        y = e(".nivo-box", t);
        if (o === "boxRainReverse" || o === "boxRainGrowReverse") {
          y = e(".nivo-box", t)._reverse()
        }
        y.each(function () {
          S[w][E] = e(this);
          E++;
          if (E === r.boxCols) {
            w++;
            E = 0;
            S[w] = []
          }
        });
        for (var x = 0; x < r.boxCols * 2; x++) {
          var T = x;
          for (var N = 0; N < r.boxRows; N++) {
            if (T >= 0 && T < r.boxCols) {
              (function (n, i, s, u, a) {
                var f = e(S[n][i]);
                var l = f.width();
                var c = f.height();
                if (o === "boxRainGrow" || o === "boxRainGrowReverse") {
                  f.width(0).height(0)
                }
                if (u === a - 1) {
                  setTimeout(function () {
                    f.animate({
                      opacity: "1",
                      width: l,
                      height: c
                    }, r.animSpeed / 1.3, "", function () {
                      t.trigger("nivo:animFinished")
                    })
                  }, 100 + s)
                } else {
                  setTimeout(function () {
                    f.animate({
                      opacity: "1",
                      width: l,
                      height: c
                    }, r.animSpeed / 1.3)
                  }, 100 + s)
                }
              })(N, T, l, c, g);
              c++
            }
            T--
          }
          l += 100
        }
      }
    };
    var v = function (e) {
      for (var t, n, r = e.length; r; t = parseInt(Math.random() * r, 10), n = e[--r], e[r] = e[t], e[t] = n);
      return e
    };
    var m = function (e) {
      if (this.console && typeof console.log !== "undefined") {
        console.log(e)
      }
    };
    this.stop = function () {
      if (!e(t).data("nivo:vars").stop) {
        e(t).data("nivo:vars").stop = true;
        m("Stop Slider")
      }
    };
    this.start = function () {
      if (e(t).data("nivo:vars").stop) {
        e(t).data("nivo:vars").stop = false;
        m("Start Slider")
      }
    };
    r.afterLoad.call(this);
    return this
  };
  e.fn.nivoSlider = function (n) {
    return this.each(function (r, i) {
      var s = e(this);
      if (s.data("nivoslider")) {
        return s.data("nivoslider")
      }
      var o = new t(this, n);
      s.data("nivoslider", o)
    })
  };
  e.fn.nivoSlider.defaults = {
    effect: "random",
    slices: 15,
    boxCols: 8,
    boxRows: 4,
    animSpeed: 500,
    pauseTime: 3e3,
    startSlide: 0,
    directionNav: true,
    controlNav: true,
    controlNavThumbs: false,
    pauseOnHover: true,
    manualAdvance: false,
    prevText: "Prev",
    nextText: "Next",
    randomStart: false,
    beforeChange: function () {},
    afterChange: function () {},
    slideshowEnd: function () {},
    lastSlide: function () {},
    afterLoad: function () {}
  };
  e.fn._reverse = [].reverse
})(jQuery)

/*

Slick Slider

 Version: 1.6.0
  Author: Ken Wheeler
 Website: http://kenwheeler.github.io
    Docs: http://kenwheeler.github.io/slick
    Repo: http://github.com/kenwheeler/slick
  Issues: http://github.com/kenwheeler/slick/issues
 */
! function (a) {
  "use strict";
  "function" == typeof define && define.amd ? define(["jquery"], a) : "undefined" != typeof exports ? module.exports = a(require("jquery")) : a(jQuery)
}(function (a) {
  "use strict";
  var b = window.Slick || {};
  b = function () {
    function c(c, d) {
      var f, e = this;
      e.defaults = {
        accessibility: !0,
        adaptiveHeight: !1,
        appendArrows: a(c),
        appendDots: a(c),
        arrows: !0,
        asNavFor: null,
        prevArrow: '<button type="button" data-role="none" class="slick-prev" aria-label="Previous" tabindex="0" role="button">Previous</button>',
        nextArrow: '<button type="button" data-role="none" class="slick-next" aria-label="Next" tabindex="0" role="button">Next</button>',
        autoplay: !1,
        autoplaySpeed: 3e3,
        centerMode: !1,
        centerPadding: "50px",
        cssEase: "ease",
        customPaging: function (b, c) {
          return a('<button type="button" data-role="none" role="button" tabindex="0" />').text(c + 1)
        },
        dots: !1,
        dotsClass: "slick-dots",
        draggable: !0,
        easing: "linear",
        edgeFriction: .35,
        fade: !1,
        focusOnSelect: !1,
        infinite: !0,
        initialSlide: 0,
        lazyLoad: "ondemand",
        mobileFirst: !1,
        pauseOnHover: !0,
        pauseOnFocus: !0,
        pauseOnDotsHover: !1,
        respondTo: "window",
        responsive: null,
        rows: 1,
        rtl: !1,
        slide: "",
        slidesPerRow: 1,
        slidesToShow: 1,
        slidesToScroll: 1,
        speed: 500,
        swipe: !0,
        swipeToSlide: !1,
        touchMove: !0,
        touchThreshold: 5,
        useCSS: !0,
        useTransform: !0,
        variableWidth: !1,
        vertical: !1,
        verticalSwiping: !1,
        waitForAnimate: !0,
        zIndex: 1e3
      }, e.initials = {
        animating: !1,
        dragging: !1,
        autoPlayTimer: null,
        currentDirection: 0,
        currentLeft: null,
        currentSlide: 0,
        direction: 1,
        $dots: null,
        listWidth: null,
        listHeight: null,
        loadIndex: 0,
        $nextArrow: null,
        $prevArrow: null,
        slideCount: null,
        slideWidth: null,
        $slideTrack: null,
        $slides: null,
        sliding: !1,
        slideOffset: 0,
        swipeLeft: null,
        $list: null,
        touchObject: {},
        transformsEnabled: !1,
        unslicked: !1
      }, a.extend(e, e.initials), e.activeBreakpoint = null, e.animType = null, e.animProp = null, e.breakpoints = [], e.breakpointSettings = [], e.cssTransitions = !1, e.focussed = !1, e.interrupted = !1, e.hidden = "hidden", e.paused = !0, e.positionProp = null, e.respondTo = null, e.rowCount = 1, e.shouldClick = !0, e.$slider = a(c), e.$slidesCache = null, e.transformType = null, e.transitionType = null, e.visibilityChange = "visibilitychange", e.windowWidth = 0, e.windowTimer = null, f = a(c).data("slick") || {}, e.options = a.extend({}, e.defaults, d, f), e.currentSlide = e.options.initialSlide, e.originalSettings = e.options, "undefined" != typeof document.mozHidden ? (e.hidden = "mozHidden", e.visibilityChange = "mozvisibilitychange") : "undefined" != typeof document.webkitHidden && (e.hidden = "webkitHidden", e.visibilityChange = "webkitvisibilitychange"), e.autoPlay = a.proxy(e.autoPlay, e), e.autoPlayClear = a.proxy(e.autoPlayClear, e), e.autoPlayIterator = a.proxy(e.autoPlayIterator, e), e.changeSlide = a.proxy(e.changeSlide, e), e.clickHandler = a.proxy(e.clickHandler, e), e.selectHandler = a.proxy(e.selectHandler, e), e.setPosition = a.proxy(e.setPosition, e), e.swipeHandler = a.proxy(e.swipeHandler, e), e.dragHandler = a.proxy(e.dragHandler, e), e.keyHandler = a.proxy(e.keyHandler, e), e.instanceUid = b++, e.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/, e.registerBreakpoints(), e.init(!0)
    }
    var b = 0;
    return c
  }(), b.prototype.activateADA = function () {
    var a = this;
    a.$slideTrack.find(".slick-active").attr({
      "aria-hidden": "false"
    }).find("a, input, button, select").attr({
      tabindex: "0"
    })
  }, b.prototype.addSlide = b.prototype.slickAdd = function (b, c, d) {
    var e = this;
    if ("boolean" == typeof c) d = c, c = null;
    else if (0 > c || c >= e.slideCount) return !1;
    e.unload(), "number" == typeof c ? 0 === c && 0 === e.$slides.length ? a(b).appendTo(e.$slideTrack) : d ? a(b).insertBefore(e.$slides.eq(c)) : a(b).insertAfter(e.$slides.eq(c)) : d === !0 ? a(b).prependTo(e.$slideTrack) : a(b).appendTo(e.$slideTrack), e.$slides = e.$slideTrack.children(this.options.slide), e.$slideTrack.children(this.options.slide).detach(), e.$slideTrack.append(e.$slides), e.$slides.each(function (b, c) {
      a(c).attr("data-slick-index", b)
    }), e.$slidesCache = e.$slides, e.reinit()
  }, b.prototype.animateHeight = function () {
    var a = this;
    if (1 === a.options.slidesToShow && a.options.adaptiveHeight === !0 && a.options.vertical === !1) {
      var b = a.$slides.eq(a.currentSlide).outerHeight(!0);
      a.$list.animate({
        height: b
      }, a.options.speed)
    }
  }, b.prototype.animateSlide = function (b, c) {
    var d = {},
      e = this;
    e.animateHeight(), e.options.rtl === !0 && e.options.vertical === !1 && (b = -b), e.transformsEnabled === !1 ? e.options.vertical === !1 ? e.$slideTrack.animate({
      left: b
    }, e.options.speed, e.options.easing, c) : e.$slideTrack.animate({
      top: b
    }, e.options.speed, e.options.easing, c) : e.cssTransitions === !1 ? (e.options.rtl === !0 && (e.currentLeft = -e.currentLeft), a({
      animStart: e.currentLeft
    }).animate({
      animStart: b
    }, {
      duration: e.options.speed,
      easing: e.options.easing,
      step: function (a) {
        a = Math.ceil(a), e.options.vertical === !1 ? (d[e.animType] = "translate(" + a + "px, 0px)", e.$slideTrack.css(d)) : (d[e.animType] = "translate(0px," + a + "px)", e.$slideTrack.css(d))
      },
      complete: function () {
        c && c.call()
      }
    })) : (e.applyTransition(), b = Math.ceil(b), e.options.vertical === !1 ? d[e.animType] = "translate3d(" + b + "px, 0px, 0px)" : d[e.animType] = "translate3d(0px," + b + "px, 0px)", e.$slideTrack.css(d), c && setTimeout(function () {
      e.disableTransition(), c.call()
    }, e.options.speed))
  }, b.prototype.getNavTarget = function () {
    var b = this,
      c = b.options.asNavFor;
    return c && null !== c && (c = a(c).not(b.$slider)), c
  }, b.prototype.asNavFor = function (b) {
    var c = this,
      d = c.getNavTarget();
    null !== d && "object" == typeof d && d.each(function () {
      var c = a(this).slick("getSlick");
      c.unslicked || c.slideHandler(b, !0)
    })
  }, b.prototype.applyTransition = function (a) {
    var b = this,
      c = {};
    b.options.fade === !1 ? c[b.transitionType] = b.transformType + " " + b.options.speed + "ms " + b.options.cssEase : c[b.transitionType] = "opacity " + b.options.speed + "ms " + b.options.cssEase, b.options.fade === !1 ? b.$slideTrack.css(c) : b.$slides.eq(a).css(c)
  }, b.prototype.autoPlay = function () {
    var a = this;
    a.autoPlayClear(), a.slideCount > a.options.slidesToShow && (a.autoPlayTimer = setInterval(a.autoPlayIterator, a.options.autoplaySpeed))
  }, b.prototype.autoPlayClear = function () {
    var a = this;
    a.autoPlayTimer && clearInterval(a.autoPlayTimer)
  }, b.prototype.autoPlayIterator = function () {
    var a = this,
      b = a.currentSlide + a.options.slidesToScroll;
    a.paused || a.interrupted || a.focussed || (a.options.infinite === !1 && (1 === a.direction && a.currentSlide + 1 === a.slideCount - 1 ? a.direction = 0 : 0 === a.direction && (b = a.currentSlide - a.options.slidesToScroll, a.currentSlide - 1 === 0 && (a.direction = 1))), a.slideHandler(b))
  }, b.prototype.buildArrows = function () {
    var b = this;
    b.options.arrows === !0 && (b.$prevArrow = a(b.options.prevArrow).addClass("slick-arrow"), b.$nextArrow = a(b.options.nextArrow).addClass("slick-arrow"), b.slideCount > b.options.slidesToShow ? (b.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), b.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), b.htmlExpr.test(b.options.prevArrow) && b.$prevArrow.prependTo(b.options.appendArrows), b.htmlExpr.test(b.options.nextArrow) && b.$nextArrow.appendTo(b.options.appendArrows), b.options.infinite !== !0 && b.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true")) : b.$prevArrow.add(b.$nextArrow).addClass("slick-hidden").attr({
      "aria-disabled": "true",
      tabindex: "-1"
    }))
  }, b.prototype.buildDots = function () {
    var c, d, b = this;
    if (b.options.dots === !0 && b.slideCount > b.options.slidesToShow) {
      for (b.$slider.addClass("slick-dotted"), d = a("<ul />").addClass(b.options.dotsClass), c = 0; c <= b.getDotCount(); c += 1) d.append(a("<li />").append(b.options.customPaging.call(this, b, c)));
      b.$dots = d.appendTo(b.options.appendDots), b.$dots.find("li").first().addClass("slick-active").attr("aria-hidden", "false")
    }
  }, b.prototype.buildOut = function () {
    var b = this;
    b.$slides = b.$slider.children(b.options.slide + ":not(.slick-cloned)").addClass("slick-slide"), b.slideCount = b.$slides.length, b.$slides.each(function (b, c) {
      a(c).attr("data-slick-index", b).data("originalStyling", a(c).attr("style") || "")
    }), b.$slider.addClass("slick-slider"), b.$slideTrack = 0 === b.slideCount ? a('<div class="slick-track"/>').appendTo(b.$slider) : b.$slides.wrapAll('<div class="slick-track"/>').parent(), b.$list = b.$slideTrack.wrap('<div aria-live="polite" class="slick-list"/>').parent(), b.$slideTrack.css("opacity", 0), (b.options.centerMode === !0 || b.options.swipeToSlide === !0) && (b.options.slidesToScroll = 1), a("img[data-lazy]", b.$slider).not("[src]").addClass("slick-loading"), b.setupInfinite(), b.buildArrows(), b.buildDots(), b.updateDots(), b.setSlideClasses("number" == typeof b.currentSlide ? b.currentSlide : 0), b.options.draggable === !0 && b.$list.addClass("draggable")
  }, b.prototype.buildRows = function () {
    var b, c, d, e, f, g, h, a = this;
    if (e = document.createDocumentFragment(), g = a.$slider.children(), a.options.rows > 1) {
      for (h = a.options.slidesPerRow * a.options.rows, f = Math.ceil(g.length / h), b = 0; f > b; b++) {
        var i = document.createElement("div");
        for (c = 0; c < a.options.rows; c++) {
          var j = document.createElement("div");
          for (d = 0; d < a.options.slidesPerRow; d++) {
            var k = b * h + (c * a.options.slidesPerRow + d);
            g.get(k) && j.appendChild(g.get(k))
          }
          i.appendChild(j)
        }
        e.appendChild(i)
      }
      a.$slider.empty().append(e), a.$slider.children().children().children().css({
        width: 100 / a.options.slidesPerRow + "%",
        display: "inline-block"
      })
    }
  }, b.prototype.checkResponsive = function (b, c) {
    var e, f, g, d = this,
      h = !1,
      i = d.$slider.width(),
      j = window.innerWidth || a(window).width();
    if ("window" === d.respondTo ? g = j : "slider" === d.respondTo ? g = i : "min" === d.respondTo && (g = Math.min(j, i)), d.options.responsive && d.options.responsive.length && null !== d.options.responsive) {
      f = null;
      for (e in d.breakpoints) d.breakpoints.hasOwnProperty(e) && (d.originalSettings.mobileFirst === !1 ? g < d.breakpoints[e] && (f = d.breakpoints[e]) : g > d.breakpoints[e] && (f = d.breakpoints[e]));
      null !== f ? null !== d.activeBreakpoint ? (f !== d.activeBreakpoint || c) && (d.activeBreakpoint = f, "unslick" === d.breakpointSettings[f] ? d.unslick(f) : (d.options = a.extend({}, d.originalSettings, d.breakpointSettings[f]), b === !0 && (d.currentSlide = d.options.initialSlide), d.refresh(b)), h = f) : (d.activeBreakpoint = f, "unslick" === d.breakpointSettings[f] ? d.unslick(f) : (d.options = a.extend({}, d.originalSettings, d.breakpointSettings[f]), b === !0 && (d.currentSlide = d.options.initialSlide), d.refresh(b)), h = f) : null !== d.activeBreakpoint && (d.activeBreakpoint = null, d.options = d.originalSettings, b === !0 && (d.currentSlide = d.options.initialSlide), d.refresh(b), h = f), b || h === !1 || d.$slider.trigger("breakpoint", [d, h])
    }
  }, b.prototype.changeSlide = function (b, c) {
    var f, g, h, d = this,
      e = a(b.currentTarget);
    switch (e.is("a") && b.preventDefault(), e.is("li") || (e = e.closest("li")), h = d.slideCount % d.options.slidesToScroll !== 0, f = h ? 0 : (d.slideCount - d.currentSlide) % d.options.slidesToScroll, b.data.message) {
      case "previous":
        g = 0 === f ? d.options.slidesToScroll : d.options.slidesToShow - f, d.slideCount > d.options.slidesToShow && d.slideHandler(d.currentSlide - g, !1, c);
        break;
      case "next":
        g = 0 === f ? d.options.slidesToScroll : f, d.slideCount > d.options.slidesToShow && d.slideHandler(d.currentSlide + g, !1, c);
        break;
      case "index":
        var i = 0 === b.data.index ? 0 : b.data.index || e.index() * d.options.slidesToScroll;
        d.slideHandler(d.checkNavigable(i), !1, c), e.children().trigger("focus");
        break;
      default:
        return
    }
  }, b.prototype.checkNavigable = function (a) {
    var c, d, b = this;
    if (c = b.getNavigableIndexes(), d = 0, a > c[c.length - 1]) a = c[c.length - 1];
    else
      for (var e in c) {
        if (a < c[e]) {
          a = d;
          break
        }
        d = c[e]
      }
    return a
  }, b.prototype.cleanUpEvents = function () {
    var b = this;
    b.options.dots && null !== b.$dots && a("li", b.$dots).off("click.slick", b.changeSlide).off("mouseenter.slick", a.proxy(b.interrupt, b, !0)).off("mouseleave.slick", a.proxy(b.interrupt, b, !1)), b.$slider.off("focus.slick blur.slick"), b.options.arrows === !0 && b.slideCount > b.options.slidesToShow && (b.$prevArrow && b.$prevArrow.off("click.slick", b.changeSlide), b.$nextArrow && b.$nextArrow.off("click.slick", b.changeSlide)), b.$list.off("touchstart.slick mousedown.slick", b.swipeHandler), b.$list.off("touchmove.slick mousemove.slick", b.swipeHandler), b.$list.off("touchend.slick mouseup.slick", b.swipeHandler), b.$list.off("touchcancel.slick mouseleave.slick", b.swipeHandler), b.$list.off("click.slick", b.clickHandler), a(document).off(b.visibilityChange, b.visibility), b.cleanUpSlideEvents(), b.options.accessibility === !0 && b.$list.off("keydown.slick", b.keyHandler), b.options.focusOnSelect === !0 && a(b.$slideTrack).children().off("click.slick", b.selectHandler), a(window).off("orientationchange.slick.slick-" + b.instanceUid, b.orientationChange), a(window).off("resize.slick.slick-" + b.instanceUid, b.resize), a("[draggable!=true]", b.$slideTrack).off("dragstart", b.preventDefault), a(window).off("load.slick.slick-" + b.instanceUid, b.setPosition), a(document).off("ready.slick.slick-" + b.instanceUid, b.setPosition)
  }, b.prototype.cleanUpSlideEvents = function () {
    var b = this;
    b.$list.off("mouseenter.slick", a.proxy(b.interrupt, b, !0)), b.$list.off("mouseleave.slick", a.proxy(b.interrupt, b, !1))
  }, b.prototype.cleanUpRows = function () {
    var b, a = this;
    a.options.rows > 1 && (b = a.$slides.children().children(), b.removeAttr("style"), a.$slider.empty().append(b))
  }, b.prototype.clickHandler = function (a) {
    var b = this;
    b.shouldClick === !1 && (a.stopImmediatePropagation(), a.stopPropagation(), a.preventDefault())
  }, b.prototype.destroy = function (b) {
    var c = this;
    c.autoPlayClear(), c.touchObject = {}, c.cleanUpEvents(), a(".slick-cloned", c.$slider).detach(), c.$dots && c.$dots.remove(), c.$prevArrow && c.$prevArrow.length && (c.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), c.htmlExpr.test(c.options.prevArrow) && c.$prevArrow.remove()), c.$nextArrow && c.$nextArrow.length && (c.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), c.htmlExpr.test(c.options.nextArrow) && c.$nextArrow.remove()), c.$slides && (c.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function () {
      a(this).attr("style", a(this).data("originalStyling"))
    }), c.$slideTrack.children(this.options.slide).detach(), c.$slideTrack.detach(), c.$list.detach(), c.$slider.append(c.$slides)), c.cleanUpRows(), c.$slider.removeClass("slick-slider"), c.$slider.removeClass("slick-initialized"), c.$slider.removeClass("slick-dotted"), c.unslicked = !0, b || c.$slider.trigger("destroy", [c])
  }, b.prototype.disableTransition = function (a) {
    var b = this,
      c = {};
    c[b.transitionType] = "", b.options.fade === !1 ? b.$slideTrack.css(c) : b.$slides.eq(a).css(c)
  }, b.prototype.fadeSlide = function (a, b) {
    var c = this;
    c.cssTransitions === !1 ? (c.$slides.eq(a).css({
      zIndex: c.options.zIndex
    }), c.$slides.eq(a).animate({
      opacity: 1
    }, c.options.speed, c.options.easing, b)) : (c.applyTransition(a), c.$slides.eq(a).css({
      opacity: 1,
      zIndex: c.options.zIndex
    }), b && setTimeout(function () {
      c.disableTransition(a), b.call()
    }, c.options.speed))
  }, b.prototype.fadeSlideOut = function (a) {
    var b = this;
    b.cssTransitions === !1 ? b.$slides.eq(a).animate({
      opacity: 0,
      zIndex: b.options.zIndex - 2
    }, b.options.speed, b.options.easing) : (b.applyTransition(a), b.$slides.eq(a).css({
      opacity: 0,
      zIndex: b.options.zIndex - 2
    }))
  }, b.prototype.filterSlides = b.prototype.slickFilter = function (a) {
    var b = this;
    null !== a && (b.$slidesCache = b.$slides, b.unload(), b.$slideTrack.children(this.options.slide).detach(), b.$slidesCache.filter(a).appendTo(b.$slideTrack), b.reinit())
  }, b.prototype.focusHandler = function () {
    var b = this;
    b.$slider.off("focus.slick blur.slick").on("focus.slick blur.slick", "*:not(.slick-arrow)", function (c) {
      c.stopImmediatePropagation();
      var d = a(this);
      setTimeout(function () {
        b.options.pauseOnFocus && (b.focussed = d.is(":focus"), b.autoPlay())
      }, 0)
    })
  }, b.prototype.getCurrent = b.prototype.slickCurrentSlide = function () {
    var a = this;
    return a.currentSlide
  }, b.prototype.getDotCount = function () {
    var a = this,
      b = 0,
      c = 0,
      d = 0;
    if (a.options.infinite === !0)
      for (; b < a.slideCount;) ++d, b = c + a.options.slidesToScroll, c += a.options.slidesToScroll <= a.options.slidesToShow ? a.options.slidesToScroll : a.options.slidesToShow;
    else if (a.options.centerMode === !0) d = a.slideCount;
    else if (a.options.asNavFor)
      for (; b < a.slideCount;) ++d, b = c + a.options.slidesToScroll, c += a.options.slidesToScroll <= a.options.slidesToShow ? a.options.slidesToScroll : a.options.slidesToShow;
    else d = 1 + Math.ceil((a.slideCount - a.options.slidesToShow) / a.options.slidesToScroll);
    return d - 1
  }, b.prototype.getLeft = function (a) {
    var c, d, f, b = this,
      e = 0;
    return b.slideOffset = 0, d = b.$slides.first().outerHeight(!0), b.options.infinite === !0 ? (b.slideCount > b.options.slidesToShow && (b.slideOffset = b.slideWidth * b.options.slidesToShow * -1, e = d * b.options.slidesToShow * -1), b.slideCount % b.options.slidesToScroll !== 0 && a + b.options.slidesToScroll > b.slideCount && b.slideCount > b.options.slidesToShow && (a > b.slideCount ? (b.slideOffset = (b.options.slidesToShow - (a - b.slideCount)) * b.slideWidth * -1, e = (b.options.slidesToShow - (a - b.slideCount)) * d * -1) : (b.slideOffset = b.slideCount % b.options.slidesToScroll * b.slideWidth * -1, e = b.slideCount % b.options.slidesToScroll * d * -1))) : a + b.options.slidesToShow > b.slideCount && (b.slideOffset = (a + b.options.slidesToShow - b.slideCount) * b.slideWidth, e = (a + b.options.slidesToShow - b.slideCount) * d), b.slideCount <= b.options.slidesToShow && (b.slideOffset = 0, e = 0), b.options.centerMode === !0 && b.options.infinite === !0 ? b.slideOffset += b.slideWidth * Math.floor(b.options.slidesToShow / 2) - b.slideWidth : b.options.centerMode === !0 && (b.slideOffset = 0, b.slideOffset += b.slideWidth * Math.floor(b.options.slidesToShow / 2)), c = b.options.vertical === !1 ? a * b.slideWidth * -1 + b.slideOffset : a * d * -1 + e, b.options.variableWidth === !0 && (f = b.slideCount <= b.options.slidesToShow || b.options.infinite === !1 ? b.$slideTrack.children(".slick-slide").eq(a) : b.$slideTrack.children(".slick-slide").eq(a + b.options.slidesToShow), c = b.options.rtl === !0 ? f[0] ? -1 * (b.$slideTrack.width() - f[0].offsetLeft - f.width()) : 0 : f[0] ? -1 * f[0].offsetLeft : 0, b.options.centerMode === !0 && (f = b.slideCount <= b.options.slidesToShow || b.options.infinite === !1 ? b.$slideTrack.children(".slick-slide").eq(a) : b.$slideTrack.children(".slick-slide").eq(a + b.options.slidesToShow + 1), c = b.options.rtl === !0 ? f[0] ? -1 * (b.$slideTrack.width() - f[0].offsetLeft - f.width()) : 0 : f[0] ? -1 * f[0].offsetLeft : 0, c += (b.$list.width() - f.outerWidth()) / 2)), c
  }, b.prototype.getOption = b.prototype.slickGetOption = function (a) {
    var b = this;
    return b.options[a]
  }, b.prototype.getNavigableIndexes = function () {
    var e, a = this,
      b = 0,
      c = 0,
      d = [];
    for (a.options.infinite === !1 ? e = a.slideCount : (b = -1 * a.options.slidesToScroll, c = -1 * a.options.slidesToScroll, e = 2 * a.slideCount); e > b;) d.push(b), b = c + a.options.slidesToScroll, c += a.options.slidesToScroll <= a.options.slidesToShow ? a.options.slidesToScroll : a.options.slidesToShow;
    return d
  }, b.prototype.getSlick = function () {
    return this
  }, b.prototype.getSlideCount = function () {
    var c, d, e, b = this;
    return e = b.options.centerMode === !0 ? b.slideWidth * Math.floor(b.options.slidesToShow / 2) : 0, b.options.swipeToSlide === !0 ? (b.$slideTrack.find(".slick-slide").each(function (c, f) {
      return f.offsetLeft - e + a(f).outerWidth() / 2 > -1 * b.swipeLeft ? (d = f, !1) : void 0
    }), c = Math.abs(a(d).attr("data-slick-index") - b.currentSlide) || 1) : b.options.slidesToScroll
  }, b.prototype.goTo = b.prototype.slickGoTo = function (a, b) {
    var c = this;
    c.changeSlide({
      data: {
        message: "index",
        index: parseInt(a)
      }
    }, b)
  }, b.prototype.init = function (b) {
    var c = this;
    a(c.$slider).hasClass("slick-initialized") || (a(c.$slider).addClass("slick-initialized"), c.buildRows(), c.buildOut(), c.setProps(), c.startLoad(), c.loadSlider(), c.initializeEvents(), c.updateArrows(), c.updateDots(), c.checkResponsive(!0), c.focusHandler()), b && c.$slider.trigger("init", [c]), c.options.accessibility === !0 && c.initADA(), c.options.autoplay && (c.paused = !1, c.autoPlay())
  }, b.prototype.initADA = function () {
    var b = this;
    b.$slides.add(b.$slideTrack.find(".slick-cloned")).attr({
      "aria-hidden": "true",
      tabindex: "-1"
    }).find("a, input, button, select").attr({
      tabindex: "-1"
    }), b.$slideTrack.attr("role", "listbox"), b.$slides.not(b.$slideTrack.find(".slick-cloned")).each(function (c) {
      a(this).attr({
        role: "option",
        "aria-describedby": "slick-slide" + b.instanceUid + c
      })
    }), null !== b.$dots && b.$dots.attr("role", "tablist").find("li").each(function (c) {
      a(this).attr({
        role: "presentation",
        "aria-selected": "false",
        "aria-controls": "navigation" + b.instanceUid + c,
        id: "slick-slide" + b.instanceUid + c
      })
    }).first().attr("aria-selected", "true").end().find("button").attr("role", "button").end().closest("div").attr("role", "toolbar"), b.activateADA()
  }, b.prototype.initArrowEvents = function () {
    var a = this;
    a.options.arrows === !0 && a.slideCount > a.options.slidesToShow && (a.$prevArrow.off("click.slick").on("click.slick", {
      message: "previous"
    }, a.changeSlide), a.$nextArrow.off("click.slick").on("click.slick", {
      message: "next"
    }, a.changeSlide))
  }, b.prototype.initDotEvents = function () {
    var b = this;
    b.options.dots === !0 && b.slideCount > b.options.slidesToShow && a("li", b.$dots).on("click.slick", {
      message: "index"
    }, b.changeSlide), b.options.dots === !0 && b.options.pauseOnDotsHover === !0 && a("li", b.$dots).on("mouseenter.slick", a.proxy(b.interrupt, b, !0)).on("mouseleave.slick", a.proxy(b.interrupt, b, !1))
  }, b.prototype.initSlideEvents = function () {
    var b = this;
    b.options.pauseOnHover && (b.$list.on("mouseenter.slick", a.proxy(b.interrupt, b, !0)), b.$list.on("mouseleave.slick", a.proxy(b.interrupt, b, !1)))
  }, b.prototype.initializeEvents = function () {
    var b = this;
    b.initArrowEvents(), b.initDotEvents(), b.initSlideEvents(), b.$list.on("touchstart.slick mousedown.slick", {
      action: "start"
    }, b.swipeHandler), b.$list.on("touchmove.slick mousemove.slick", {
      action: "move"
    }, b.swipeHandler), b.$list.on("touchend.slick mouseup.slick", {
      action: "end"
    }, b.swipeHandler), b.$list.on("touchcancel.slick mouseleave.slick", {
      action: "end"
    }, b.swipeHandler), b.$list.on("click.slick", b.clickHandler), a(document).on(b.visibilityChange, a.proxy(b.visibility, b)), b.options.accessibility === !0 && b.$list.on("keydown.slick", b.keyHandler), b.options.focusOnSelect === !0 && a(b.$slideTrack).children().on("click.slick", b.selectHandler), a(window).on("orientationchange.slick.slick-" + b.instanceUid, a.proxy(b.orientationChange, b)), a(window).on("resize.slick.slick-" + b.instanceUid, a.proxy(b.resize, b)), a("[draggable!=true]", b.$slideTrack).on("dragstart", b.preventDefault), a(window).on("load.slick.slick-" + b.instanceUid, b.setPosition), a(document).on("ready.slick.slick-" + b.instanceUid, b.setPosition)
  }, b.prototype.initUI = function () {
    var a = this;
    a.options.arrows === !0 && a.slideCount > a.options.slidesToShow && (a.$prevArrow.show(), a.$nextArrow.show()), a.options.dots === !0 && a.slideCount > a.options.slidesToShow && a.$dots.show()
  }, b.prototype.keyHandler = function (a) {
    var b = this;
    a.target.tagName.match("TEXTAREA|INPUT|SELECT") || (37 === a.keyCode && b.options.accessibility === !0 ? b.changeSlide({
      data: {
        message: b.options.rtl === !0 ? "next" : "previous"
      }
    }) : 39 === a.keyCode && b.options.accessibility === !0 && b.changeSlide({
      data: {
        message: b.options.rtl === !0 ? "previous" : "next"
      }
    }))
  }, b.prototype.lazyLoad = function () {
    function g(c) {
      a("img[data-lazy]", c).each(function () {
        var c = a(this),
          d = a(this).attr("data-lazy"),
          e = document.createElement("img");
        e.onload = function () {
          c.animate({
            opacity: 0
          }, 100, function () {
            c.attr("src", d).animate({
              opacity: 1
            }, 200, function () {
              c.removeAttr("data-lazy").removeClass("slick-loading")
            }), b.$slider.trigger("lazyLoaded", [b, c, d])
          })
        }, e.onerror = function () {
          c.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), b.$slider.trigger("lazyLoadError", [b, c, d])
        }, e.src = d
      })
    }
    var c, d, e, f, b = this;
    b.options.centerMode === !0 ? b.options.infinite === !0 ? (e = b.currentSlide + (b.options.slidesToShow / 2 + 1), f = e + b.options.slidesToShow + 2) : (e = Math.max(0, b.currentSlide - (b.options.slidesToShow / 2 + 1)), f = 2 + (b.options.slidesToShow / 2 + 1) + b.currentSlide) : (e = b.options.infinite ? b.options.slidesToShow + b.currentSlide : b.currentSlide, f = Math.ceil(e + b.options.slidesToShow), b.options.fade === !0 && (e > 0 && e--, f <= b.slideCount && f++)), c = b.$slider.find(".slick-slide").slice(e, f), g(c), b.slideCount <= b.options.slidesToShow ? (d = b.$slider.find(".slick-slide"), g(d)) : b.currentSlide >= b.slideCount - b.options.slidesToShow ? (d = b.$slider.find(".slick-cloned").slice(0, b.options.slidesToShow), g(d)) : 0 === b.currentSlide && (d = b.$slider.find(".slick-cloned").slice(-1 * b.options.slidesToShow), g(d))
  }, b.prototype.loadSlider = function () {
    var a = this;
    a.setPosition(), a.$slideTrack.css({
      opacity: 1
    }), a.$slider.removeClass("slick-loading"), a.initUI(), "progressive" === a.options.lazyLoad && a.progressiveLazyLoad()
  }, b.prototype.next = b.prototype.slickNext = function () {
    var a = this;
    a.changeSlide({
      data: {
        message: "next"
      }
    })
  }, b.prototype.orientationChange = function () {
    var a = this;
    a.checkResponsive(), a.setPosition()
  }, b.prototype.pause = b.prototype.slickPause = function () {
    var a = this;
    a.autoPlayClear(), a.paused = !0
  }, b.prototype.play = b.prototype.slickPlay = function () {
    var a = this;
    a.autoPlay(), a.options.autoplay = !0, a.paused = !1, a.focussed = !1, a.interrupted = !1
  }, b.prototype.postSlide = function (a) {
    var b = this;
    b.unslicked || (b.$slider.trigger("afterChange", [b, a]), b.animating = !1, b.setPosition(), b.swipeLeft = null, b.options.autoplay && b.autoPlay(), b.options.accessibility === !0 && b.initADA())
  }, b.prototype.prev = b.prototype.slickPrev = function () {
    var a = this;
    a.changeSlide({
      data: {
        message: "previous"
      }
    })
  }, b.prototype.preventDefault = function (a) {
    a.preventDefault()
  }, b.prototype.progressiveLazyLoad = function (b) {
    b = b || 1;
    var e, f, g, c = this,
      d = a("img[data-lazy]", c.$slider);
    d.length ? (e = d.first(), f = e.attr("data-lazy"), g = document.createElement("img"), g.onload = function () {
      e.attr("src", f).removeAttr("data-lazy").removeClass("slick-loading"), c.options.adaptiveHeight === !0 && c.setPosition(), c.$slider.trigger("lazyLoaded", [c, e, f]), c.progressiveLazyLoad()
    }, g.onerror = function () {
      3 > b ? setTimeout(function () {
        c.progressiveLazyLoad(b + 1)
      }, 500) : (e.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), c.$slider.trigger("lazyLoadError", [c, e, f]), c.progressiveLazyLoad())
    }, g.src = f) : c.$slider.trigger("allImagesLoaded", [c])
  }, b.prototype.refresh = function (b) {
    var d, e, c = this;
    e = c.slideCount - c.options.slidesToShow, !c.options.infinite && c.currentSlide > e && (c.currentSlide = e), c.slideCount <= c.options.slidesToShow && (c.currentSlide = 0), d = c.currentSlide, c.destroy(!0), a.extend(c, c.initials, {
      currentSlide: d
    }), c.init(), b || c.changeSlide({
      data: {
        message: "index",
        index: d
      }
    }, !1)
  }, b.prototype.registerBreakpoints = function () {
    var c, d, e, b = this,
      f = b.options.responsive || null;
    if ("array" === a.type(f) && f.length) {
      b.respondTo = b.options.respondTo || "window";
      for (c in f)
        if (e = b.breakpoints.length - 1, d = f[c].breakpoint, f.hasOwnProperty(c)) {
          for (; e >= 0;) b.breakpoints[e] && b.breakpoints[e] === d && b.breakpoints.splice(e, 1), e--;
          b.breakpoints.push(d), b.breakpointSettings[d] = f[c].settings
        } b.breakpoints.sort(function (a, c) {
        return b.options.mobileFirst ? a - c : c - a
      })
    }
  }, b.prototype.reinit = function () {
    var b = this;
    b.$slides = b.$slideTrack.children(b.options.slide).addClass("slick-slide"), b.slideCount = b.$slides.length, b.currentSlide >= b.slideCount && 0 !== b.currentSlide && (b.currentSlide = b.currentSlide - b.options.slidesToScroll), b.slideCount <= b.options.slidesToShow && (b.currentSlide = 0), b.registerBreakpoints(), b.setProps(), b.setupInfinite(), b.buildArrows(), b.updateArrows(), b.initArrowEvents(), b.buildDots(), b.updateDots(), b.initDotEvents(), b.cleanUpSlideEvents(), b.initSlideEvents(), b.checkResponsive(!1, !0), b.options.focusOnSelect === !0 && a(b.$slideTrack).children().on("click.slick", b.selectHandler), b.setSlideClasses("number" == typeof b.currentSlide ? b.currentSlide : 0), b.setPosition(), b.focusHandler(), b.paused = !b.options.autoplay, b.autoPlay(), b.$slider.trigger("reInit", [b])
  }, b.prototype.resize = function () {
    var b = this;
    a(window).width() !== b.windowWidth && (clearTimeout(b.windowDelay), b.windowDelay = window.setTimeout(function () {
      b.windowWidth = a(window).width(), b.checkResponsive(), b.unslicked || b.setPosition()
    }, 50))
  }, b.prototype.removeSlide = b.prototype.slickRemove = function (a, b, c) {
    var d = this;
    return "boolean" == typeof a ? (b = a, a = b === !0 ? 0 : d.slideCount - 1) : a = b === !0 ? --a : a, d.slideCount < 1 || 0 > a || a > d.slideCount - 1 ? !1 : (d.unload(), c === !0 ? d.$slideTrack.children().remove() : d.$slideTrack.children(this.options.slide).eq(a).remove(), d.$slides = d.$slideTrack.children(this.options.slide), d.$slideTrack.children(this.options.slide).detach(), d.$slideTrack.append(d.$slides), d.$slidesCache = d.$slides, void d.reinit())
  }, b.prototype.setCSS = function (a) {
    var d, e, b = this,
      c = {};
    b.options.rtl === !0 && (a = -a), d = "left" == b.positionProp ? Math.ceil(a) + "px" : "0px", e = "top" == b.positionProp ? Math.ceil(a) + "px" : "0px", c[b.positionProp] = a, b.transformsEnabled === !1 ? b.$slideTrack.css(c) : (c = {}, b.cssTransitions === !1 ? (c[b.animType] = "translate(" + d + ", " + e + ")", b.$slideTrack.css(c)) : (c[b.animType] = "translate3d(" + d + ", " + e + ", 0px)", b.$slideTrack.css(c)))
  }, b.prototype.setDimensions = function () {
    var a = this;
    a.options.vertical === !1 ? a.options.centerMode === !0 && a.$list.css({
      padding: "0px " + a.options.centerPadding
    }) : (a.$list.height(a.$slides.first().outerHeight(!0) * a.options.slidesToShow), a.options.centerMode === !0 && a.$list.css({
      padding: a.options.centerPadding + " 0px"
    })), a.listWidth = a.$list.width(), a.listHeight = a.$list.height(), a.options.vertical === !1 && a.options.variableWidth === !1 ? (a.slideWidth = Math.ceil(a.listWidth / a.options.slidesToShow), a.$slideTrack.width(Math.ceil(a.slideWidth * a.$slideTrack.children(".slick-slide").length))) : a.options.variableWidth === !0 ? a.$slideTrack.width(5e3 * a.slideCount) : (a.slideWidth = Math.ceil(a.listWidth), a.$slideTrack.height(Math.ceil(a.$slides.first().outerHeight(!0) * a.$slideTrack.children(".slick-slide").length)));
    var b = a.$slides.first().outerWidth(!0) - a.$slides.first().width();
    a.options.variableWidth === !1 && a.$slideTrack.children(".slick-slide").width(a.slideWidth - b)
  }, b.prototype.setFade = function () {
    var c, b = this;
    b.$slides.each(function (d, e) {
      c = b.slideWidth * d * -1, b.options.rtl === !0 ? a(e).css({
        position: "relative",
        right: c,
        top: 0,
        zIndex: b.options.zIndex - 2,
        opacity: 0
      }) : a(e).css({
        position: "relative",
        left: c,
        top: 0,
        zIndex: b.options.zIndex - 2,
        opacity: 0
      })
    }), b.$slides.eq(b.currentSlide).css({
      zIndex: b.options.zIndex - 1,
      opacity: 1
    })
  }, b.prototype.setHeight = function () {
    var a = this;
    if (1 === a.options.slidesToShow && a.options.adaptiveHeight === !0 && a.options.vertical === !1) {
      var b = a.$slides.eq(a.currentSlide).outerHeight(!0);
      a.$list.css("height", b)
    }
  }, b.prototype.setOption = b.prototype.slickSetOption = function () {
    var c, d, e, f, h, b = this,
      g = !1;
    if ("object" === a.type(arguments[0]) ? (e = arguments[0], g = arguments[1], h = "multiple") : "string" === a.type(arguments[0]) && (e = arguments[0], f = arguments[1], g = arguments[2], "responsive" === arguments[0] && "array" === a.type(arguments[1]) ? h = "responsive" : "undefined" != typeof arguments[1] && (h = "single")), "single" === h) b.options[e] = f;
    else if ("multiple" === h) a.each(e, function (a, c) {
      b.options[a] = c
    });
    else if ("responsive" === h)
      for (d in f)
        if ("array" !== a.type(b.options.responsive)) b.options.responsive = [f[d]];
        else {
          for (c = b.options.responsive.length - 1; c >= 0;) b.options.responsive[c].breakpoint === f[d].breakpoint && b.options.responsive.splice(c, 1), c--;
          b.options.responsive.push(f[d])
        } g && (b.unload(), b.reinit())
  }, b.prototype.setPosition = function () {
    var a = this;
    a.setDimensions(), a.setHeight(), a.options.fade === !1 ? a.setCSS(a.getLeft(a.currentSlide)) : a.setFade(), a.$slider.trigger("setPosition", [a])
  }, b.prototype.setProps = function () {
    var a = this,
      b = document.body.style;
    a.positionProp = a.options.vertical === !0 ? "top" : "left", "top" === a.positionProp ? a.$slider.addClass("slick-vertical") : a.$slider.removeClass("slick-vertical"), (void 0 !== b.WebkitTransition || void 0 !== b.MozTransition || void 0 !== b.msTransition) && a.options.useCSS === !0 && (a.cssTransitions = !0), a.options.fade && ("number" == typeof a.options.zIndex ? a.options.zIndex < 3 && (a.options.zIndex = 3) : a.options.zIndex = a.defaults.zIndex), void 0 !== b.OTransform && (a.animType = "OTransform", a.transformType = "-o-transform", a.transitionType = "OTransition", void 0 === b.perspectiveProperty && void 0 === b.webkitPerspective && (a.animType = !1)), void 0 !== b.MozTransform && (a.animType = "MozTransform", a.transformType = "-moz-transform", a.transitionType = "MozTransition", void 0 === b.perspectiveProperty && void 0 === b.MozPerspective && (a.animType = !1)), void 0 !== b.webkitTransform && (a.animType = "webkitTransform", a.transformType = "-webkit-transform", a.transitionType = "webkitTransition", void 0 === b.perspectiveProperty && void 0 === b.webkitPerspective && (a.animType = !1)), void 0 !== b.msTransform && (a.animType = "msTransform", a.transformType = "-ms-transform", a.transitionType = "msTransition", void 0 === b.msTransform && (a.animType = !1)), void 0 !== b.transform && a.animType !== !1 && (a.animType = "transform", a.transformType = "transform", a.transitionType = "transition"), a.transformsEnabled = a.options.useTransform && null !== a.animType && a.animType !== !1
  }, b.prototype.setSlideClasses = function (a) {
    var c, d, e, f, b = this;
    d = b.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden", "true"), b.$slides.eq(a).addClass("slick-current"), b.options.centerMode === !0 ? (c = Math.floor(b.options.slidesToShow / 2), b.options.infinite === !0 && (a >= c && a <= b.slideCount - 1 - c ? b.$slides.slice(a - c, a + c + 1).addClass("slick-active").attr("aria-hidden", "false") : (e = b.options.slidesToShow + a,
      d.slice(e - c + 1, e + c + 2).addClass("slick-active").attr("aria-hidden", "false")), 0 === a ? d.eq(d.length - 1 - b.options.slidesToShow).addClass("slick-center") : a === b.slideCount - 1 && d.eq(b.options.slidesToShow).addClass("slick-center")), b.$slides.eq(a).addClass("slick-center")) : a >= 0 && a <= b.slideCount - b.options.slidesToShow ? b.$slides.slice(a, a + b.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false") : d.length <= b.options.slidesToShow ? d.addClass("slick-active").attr("aria-hidden", "false") : (f = b.slideCount % b.options.slidesToShow, e = b.options.infinite === !0 ? b.options.slidesToShow + a : a, b.options.slidesToShow == b.options.slidesToScroll && b.slideCount - a < b.options.slidesToShow ? d.slice(e - (b.options.slidesToShow - f), e + f).addClass("slick-active").attr("aria-hidden", "false") : d.slice(e, e + b.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false")), "ondemand" === b.options.lazyLoad && b.lazyLoad()
  }, b.prototype.setupInfinite = function () {
    var c, d, e, b = this;
    if (b.options.fade === !0 && (b.options.centerMode = !1), b.options.infinite === !0 && b.options.fade === !1 && (d = null, b.slideCount > b.options.slidesToShow)) {
      for (e = b.options.centerMode === !0 ? b.options.slidesToShow + 1 : b.options.slidesToShow, c = b.slideCount; c > b.slideCount - e; c -= 1) d = c - 1, a(b.$slides[d]).clone(!0).attr("id", "").attr("data-slick-index", d - b.slideCount).prependTo(b.$slideTrack).addClass("slick-cloned");
      for (c = 0; e > c; c += 1) d = c, a(b.$slides[d]).clone(!0).attr("id", "").attr("data-slick-index", d + b.slideCount).appendTo(b.$slideTrack).addClass("slick-cloned");
      b.$slideTrack.find(".slick-cloned").find("[id]").each(function () {
        a(this).attr("id", "")
      })
    }
  }, b.prototype.interrupt = function (a) {
    var b = this;
    a || b.autoPlay(), b.interrupted = a
  }, b.prototype.selectHandler = function (b) {
    var c = this,
      d = a(b.target).is(".slick-slide") ? a(b.target) : a(b.target).parents(".slick-slide"),
      e = parseInt(d.attr("data-slick-index"));
    return e || (e = 0), c.slideCount <= c.options.slidesToShow ? (c.setSlideClasses(e), void c.asNavFor(e)) : void c.slideHandler(e)
  }, b.prototype.slideHandler = function (a, b, c) {
    var d, e, f, g, j, h = null,
      i = this;
    return b = b || !1, i.animating === !0 && i.options.waitForAnimate === !0 || i.options.fade === !0 && i.currentSlide === a || i.slideCount <= i.options.slidesToShow ? void 0 : (b === !1 && i.asNavFor(a), d = a, h = i.getLeft(d), g = i.getLeft(i.currentSlide), i.currentLeft = null === i.swipeLeft ? g : i.swipeLeft, i.options.infinite === !1 && i.options.centerMode === !1 && (0 > a || a > i.getDotCount() * i.options.slidesToScroll) ? void(i.options.fade === !1 && (d = i.currentSlide, c !== !0 ? i.animateSlide(g, function () {
      i.postSlide(d)
    }) : i.postSlide(d))) : i.options.infinite === !1 && i.options.centerMode === !0 && (0 > a || a > i.slideCount - i.options.slidesToScroll) ? void(i.options.fade === !1 && (d = i.currentSlide, c !== !0 ? i.animateSlide(g, function () {
      i.postSlide(d)
    }) : i.postSlide(d))) : (i.options.autoplay && clearInterval(i.autoPlayTimer), e = 0 > d ? i.slideCount % i.options.slidesToScroll !== 0 ? i.slideCount - i.slideCount % i.options.slidesToScroll : i.slideCount + d : d >= i.slideCount ? i.slideCount % i.options.slidesToScroll !== 0 ? 0 : d - i.slideCount : d, i.animating = !0, i.$slider.trigger("beforeChange", [i, i.currentSlide, e]), f = i.currentSlide, i.currentSlide = e, i.setSlideClasses(i.currentSlide), i.options.asNavFor && (j = i.getNavTarget(), j = j.slick("getSlick"), j.slideCount <= j.options.slidesToShow && j.setSlideClasses(i.currentSlide)), i.updateDots(), i.updateArrows(), i.options.fade === !0 ? (c !== !0 ? (i.fadeSlideOut(f), i.fadeSlide(e, function () {
      i.postSlide(e)
    })) : i.postSlide(e), void i.animateHeight()) : void(c !== !0 ? i.animateSlide(h, function () {
      i.postSlide(e)
    }) : i.postSlide(e))))
  }, b.prototype.startLoad = function () {
    var a = this;
    a.options.arrows === !0 && a.slideCount > a.options.slidesToShow && (a.$prevArrow.hide(), a.$nextArrow.hide()), a.options.dots === !0 && a.slideCount > a.options.slidesToShow && a.$dots.hide(), a.$slider.addClass("slick-loading")
  }, b.prototype.swipeDirection = function () {
    var a, b, c, d, e = this;
    return a = e.touchObject.startX - e.touchObject.curX, b = e.touchObject.startY - e.touchObject.curY, c = Math.atan2(b, a), d = Math.round(180 * c / Math.PI), 0 > d && (d = 360 - Math.abs(d)), 45 >= d && d >= 0 ? e.options.rtl === !1 ? "left" : "right" : 360 >= d && d >= 315 ? e.options.rtl === !1 ? "left" : "right" : d >= 135 && 225 >= d ? e.options.rtl === !1 ? "right" : "left" : e.options.verticalSwiping === !0 ? d >= 35 && 135 >= d ? "down" : "up" : "vertical"
  }, b.prototype.swipeEnd = function (a) {
    var c, d, b = this;
    if (b.dragging = !1, b.interrupted = !1, b.shouldClick = b.touchObject.swipeLength > 10 ? !1 : !0, void 0 === b.touchObject.curX) return !1;
    if (b.touchObject.edgeHit === !0 && b.$slider.trigger("edge", [b, b.swipeDirection()]), b.touchObject.swipeLength >= b.touchObject.minSwipe) {
      switch (d = b.swipeDirection()) {
        case "left":
        case "down":
          c = b.options.swipeToSlide ? b.checkNavigable(b.currentSlide + b.getSlideCount()) : b.currentSlide + b.getSlideCount(), b.currentDirection = 0;
          break;
        case "right":
        case "up":
          c = b.options.swipeToSlide ? b.checkNavigable(b.currentSlide - b.getSlideCount()) : b.currentSlide - b.getSlideCount(), b.currentDirection = 1
      }
      "vertical" != d && (b.slideHandler(c), b.touchObject = {}, b.$slider.trigger("swipe", [b, d]))
    } else b.touchObject.startX !== b.touchObject.curX && (b.slideHandler(b.currentSlide), b.touchObject = {})
  }, b.prototype.swipeHandler = function (a) {
    var b = this;
    if (!(b.options.swipe === !1 || "ontouchend" in document && b.options.swipe === !1 || b.options.draggable === !1 && -1 !== a.type.indexOf("mouse"))) switch (b.touchObject.fingerCount = a.originalEvent && void 0 !== a.originalEvent.touches ? a.originalEvent.touches.length : 1, b.touchObject.minSwipe = b.listWidth / b.options.touchThreshold, b.options.verticalSwiping === !0 && (b.touchObject.minSwipe = b.listHeight / b.options.touchThreshold), a.data.action) {
      case "start":
        b.swipeStart(a);
        break;
      case "move":
        b.swipeMove(a);
        break;
      case "end":
        b.swipeEnd(a)
    }
  }, b.prototype.swipeMove = function (a) {
    var d, e, f, g, h, b = this;
    return h = void 0 !== a.originalEvent ? a.originalEvent.touches : null, !b.dragging || h && 1 !== h.length ? !1 : (d = b.getLeft(b.currentSlide), b.touchObject.curX = void 0 !== h ? h[0].pageX : a.clientX, b.touchObject.curY = void 0 !== h ? h[0].pageY : a.clientY, b.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(b.touchObject.curX - b.touchObject.startX, 2))), b.options.verticalSwiping === !0 && (b.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(b.touchObject.curY - b.touchObject.startY, 2)))), e = b.swipeDirection(), "vertical" !== e ? (void 0 !== a.originalEvent && b.touchObject.swipeLength > 4 && a.preventDefault(), g = (b.options.rtl === !1 ? 1 : -1) * (b.touchObject.curX > b.touchObject.startX ? 1 : -1), b.options.verticalSwiping === !0 && (g = b.touchObject.curY > b.touchObject.startY ? 1 : -1), f = b.touchObject.swipeLength, b.touchObject.edgeHit = !1, b.options.infinite === !1 && (0 === b.currentSlide && "right" === e || b.currentSlide >= b.getDotCount() && "left" === e) && (f = b.touchObject.swipeLength * b.options.edgeFriction, b.touchObject.edgeHit = !0), b.options.vertical === !1 ? b.swipeLeft = d + f * g : b.swipeLeft = d + f * (b.$list.height() / b.listWidth) * g, b.options.verticalSwiping === !0 && (b.swipeLeft = d + f * g), b.options.fade === !0 || b.options.touchMove === !1 ? !1 : b.animating === !0 ? (b.swipeLeft = null, !1) : void b.setCSS(b.swipeLeft)) : void 0)
  }, b.prototype.swipeStart = function (a) {
    var c, b = this;
    return b.interrupted = !0, 1 !== b.touchObject.fingerCount || b.slideCount <= b.options.slidesToShow ? (b.touchObject = {}, !1) : (void 0 !== a.originalEvent && void 0 !== a.originalEvent.touches && (c = a.originalEvent.touches[0]), b.touchObject.startX = b.touchObject.curX = void 0 !== c ? c.pageX : a.clientX, b.touchObject.startY = b.touchObject.curY = void 0 !== c ? c.pageY : a.clientY, void(b.dragging = !0))
  }, b.prototype.unfilterSlides = b.prototype.slickUnfilter = function () {
    var a = this;
    null !== a.$slidesCache && (a.unload(), a.$slideTrack.children(this.options.slide).detach(), a.$slidesCache.appendTo(a.$slideTrack), a.reinit())
  }, b.prototype.unload = function () {
    var b = this;
    a(".slick-cloned", b.$slider).remove(), b.$dots && b.$dots.remove(), b.$prevArrow && b.htmlExpr.test(b.options.prevArrow) && b.$prevArrow.remove(), b.$nextArrow && b.htmlExpr.test(b.options.nextArrow) && b.$nextArrow.remove(), b.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden", "true").css("width", "")
  }, b.prototype.unslick = function (a) {
    var b = this;
    b.$slider.trigger("unslick", [b, a]), b.destroy()
  }, b.prototype.updateArrows = function () {
    var b, a = this;
    b = Math.floor(a.options.slidesToShow / 2), a.options.arrows === !0 && a.slideCount > a.options.slidesToShow && !a.options.infinite && (a.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), a.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), 0 === a.currentSlide ? (a.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true"), a.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : a.currentSlide >= a.slideCount - a.options.slidesToShow && a.options.centerMode === !1 ? (a.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), a.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : a.currentSlide >= a.slideCount - 1 && a.options.centerMode === !0 && (a.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), a.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")))
  }, b.prototype.updateDots = function () {
    var a = this;
    null !== a.$dots && (a.$dots.find("li").removeClass("slick-active").attr("aria-hidden", "true"), a.$dots.find("li").eq(Math.floor(a.currentSlide / a.options.slidesToScroll)).addClass("slick-active").attr("aria-hidden", "false"))
  }, b.prototype.visibility = function () {
    var a = this;
    a.options.autoplay && (document[a.hidden] ? a.interrupted = !0 : a.interrupted = !1)
  }, a.fn.slick = function () {
    var f, g, a = this,
      c = arguments[0],
      d = Array.prototype.slice.call(arguments, 1),
      e = a.length;
    for (f = 0; e > f; f++)
      if ("object" == typeof c || "undefined" == typeof c ? a[f].slick = new b(a[f], c) : g = a[f].slick[c].apply(a[f].slick, d), "undefined" != typeof g) return g;
    return a
  }
});

/*
 * jQuery One Page Nav Plugin
 * http://github.com/davist11/jQuery-One-Page-Nav
 *
 * Copyright (c) 2010 Trevor Davis (http://trevordavis.net)
 * Dual licensed under the MIT and GPL licenses.
 * Uses the same license as jQuery, see:
 * http://jquery.org/license
 *
 * @version 3.0.0
 */
! function (t, i, n, s) {
  var e = function (s, e) {
    this.elem = s, this.$elem = t(s), this.options = e, this.metadata = this.$elem.data("plugin-options"), this.$win = t(i), this.sections = {}, this.didScroll = !1, this.$doc = t(n), this.docHeight = this.$doc.height()
  };
  e.prototype = {
    defaults: {
      navItems: "a",
      currentClass: "current",
      changeHash: !1,
      easing: "swing",
      filter: "",
      scrollSpeed: 750,
      scrollThreshold: .5,
      begin: !1,
      end: !1,
      scrollChange: !1
    },
    init: function () {
      return this.config = t.extend({}, this.defaults, this.options, this.metadata), this.$nav = this.$elem.find(this.config.navItems), "" !== this.config.filter && (this.$nav = this.$nav.filter(this.config.filter)), this.$nav.on("click.onePageNav", t.proxy(this.handleClick, this)), this.getPositions(), this.bindInterval(), this.$win.on("resize.onePageNav", t.proxy(this.getPositions, this)), this
    },
    adjustNav: function (t, i) {
      t.$elem.find("." + t.config.currentClass).removeClass(t.config.currentClass), i.addClass(t.config.currentClass)
    },
    bindInterval: function () {
      var t, i = this;
      i.$win.on("scroll.onePageNav", function () {
        i.didScroll = !0
      }), i.t = setInterval(function () {
        t = i.$doc.height(), i.didScroll && (i.didScroll = !1, i.scrollChange()), t !== i.docHeight && (i.docHeight = t, i.getPositions())
      }, 250)
    },
    getHash: function (t) {
      return t.attr("href").split("#")[1]
    },
    getPositions: function () {
      var i, n, s, e = this;
      e.$nav.each(function () {
        i = e.getHash(t(this)), s = t("#" + i), s.length && (n = s.offset().top, e.sections[i] = Math.round(n))
      })
    },
    getSection: function (t) {
      var i = null,
        n = Math.round(this.$win.height() * this.config.scrollThreshold);
      for (var s in this.sections) this.sections[s] - n < t && (i = s);
      return i
    },
    handleClick: function (n) {
      var s = this,
        e = t(n.currentTarget),
        o = e.parent(),
        a = "#" + s.getHash(e);
      o.hasClass(s.config.currentClass) || (s.config.begin && s.config.begin(), s.adjustNav(s, o), s.unbindInterval(), s.scrollTo(a, function () {
        s.config.changeHash && (i.location.hash = a), s.bindInterval(), s.config.end && s.config.end()
      })), n.preventDefault()
    },
    scrollChange: function () {
      var t, i = this.$win.scrollTop(),
        n = this.getSection(i);
      null !== n && (t = this.$elem.find('a[href$="#' + n + '"]').parent(), t.hasClass(this.config.currentClass) || (this.adjustNav(this, t), this.config.scrollChange && this.config.scrollChange(t)))
    },
    scrollTo: function (i, n) {
      var s = t(i).offset().top;
      t("html, body").animate({
        scrollTop: s - this.config.scrollOffset
      }, this.config.scrollSpeed, this.config.easing, n)
    },
    unbindInterval: function () {
      clearInterval(this.t), this.$win.unbind("scroll.onePageNav")
    }
  }, e.defaults = e.prototype.defaults, t.fn.onePageNav = function (t) {
    return this.each(function () {
      new e(this, t).init()
    })
  }
}(jQuery, window, document);

/*
 * jQuery meanMenu v2.0.8
 * @Copyright (C) 2012-2014 Chris Wharton @ MeanThemes (https://github.com/meanthemes/meanMenu)
 *
 */
! function ($) {
  "use strict";
  $.fn.meanmenu = function (e) {
    var n = {
      meanMenuTarget: jQuery(this),
      meanMenuContainer: "body",
      meanMenuClose: "X",
      meanMenuCloseSize: "18px",
      meanMenuOpen: "<span /><span /><span />",
      meanRevealPosition: "right",
      meanRevealPositionDistance: "0",
      meanRevealColour: "",
      meanScreenWidth: "480",
      meanNavPush: "",
      meanShowChildren: !0,
      meanExpandableChildren: !0,
      meanExpand: "+",
      meanContract: "-",
      meanRemoveAttrs: !1,
      onePage: !1,
      meanDisplay: "block",
      removeElements: ""
    };
    e = $.extend(n, e);
    var a = window.innerWidth || document.documentElement.clientWidth;
    return this.each(function () {
      var n = e.meanMenuTarget,
        t = e.meanMenuContainer,
        r = e.meanMenuClose,
        i = e.meanMenuCloseSize,
        s = e.meanMenuOpen,
        u = e.meanRevealPosition,
        m = e.meanRevealPositionDistance,
        l = e.meanRevealColour,
        o = e.meanScreenWidth,
        c = e.meanNavPush,
        v = ".meanmenu-reveal",
        h = e.meanShowChildren,
        d = e.meanExpandableChildren,
        y = e.meanExpand,
        j = e.meanContract,
        Q = e.meanRemoveAttrs,
        f = e.onePage,
        g = e.meanDisplay,
        p = e.removeElements,
        C = !1;
      (navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/Blackberry/i) || navigator.userAgent.match(/Windows Phone/i)) && (C = !0), (navigator.userAgent.match(/MSIE 8/i) || navigator.userAgent.match(/MSIE 7/i)) && jQuery("html").css("overflow-y", "scroll");
      var w = "",
        x = function () {
          if ("center" === u) {
            var e = window.innerWidth || document.documentElement.clientWidth,
              n = e / 2 - 22 + "px";
            w = "left:" + n + ";right:auto;", C ? jQuery(".meanmenu-reveal").animate({
              left: n
            }) : jQuery(".meanmenu-reveal").css("left", n)
          }
        },
        A = !1,
        E = !1;
      "right" === u && (w = "right:" + m + ";left:auto;"), "left" === u && (w = "left:" + m + ";right:auto;"), x();
      var M = "",
        P = function () {
          M.html(jQuery(M).is(".meanmenu-reveal.meanclose") ? r : s)
        },
        W = function () {
          jQuery(".mean-bar,.mean-push").remove(), jQuery(t).removeClass("mean-container"), jQuery(n).css("display", g), A = !1, E = !1, jQuery(p).removeClass("mean-remove")
        },
        b = function () {
          var e = "background:" + l + ";color:" + l + ";" + w;
          if (o >= a) {
            jQuery(p).addClass("mean-remove"), E = !0, jQuery(t).addClass("mean-container"), jQuery(".mean-container").prepend('<div class="mean-bar"><a href="#nav" class="meanmenu-reveal" style="' + e + '">Show Navigation</a><nav class="mean-nav"></nav></div>');
            var r = jQuery(n).html();
            jQuery(".mean-nav").html(r), Q && jQuery("nav.mean-nav ul, nav.mean-nav ul *").each(function () {
              jQuery(this).is(".mean-remove") ? jQuery(this).attr("class", "mean-remove") : jQuery(this).removeAttr("class"), jQuery(this).removeAttr("id")
            }), jQuery(n).before('<div class="mean-push" />'), jQuery(".mean-push").css("margin-top", c), jQuery(n).hide(), jQuery(".meanmenu-reveal").show(), jQuery(v).html(s), M = jQuery(v), jQuery(".mean-nav ul").hide(), h ? d ? (jQuery(".mean-nav ul ul").each(function () {
              jQuery(this).children().length && jQuery(this, "li:first").parent().append('<a class="mean-expand" href="#" style="font-size: ' + i + '">' + y + "</a>")
            }), jQuery(".mean-expand").on("click", function (e) {
              e.preventDefault(), jQuery(this).hasClass("mean-clicked") ? (jQuery(this).text(y), jQuery(this).prev("ul").slideUp(300, function () {})) : (jQuery(this).text(j), jQuery(this).prev("ul").slideDown(300, function () {})), jQuery(this).toggleClass("mean-clicked")
            })) : jQuery(".mean-nav ul ul").show() : jQuery(".mean-nav ul ul").hide(), jQuery(".mean-nav ul li").last().addClass("mean-last"), M.removeClass("meanclose"), jQuery(M).click(function (e) {
              e.preventDefault(), A === !1 ? (M.css("text-align", "center"), M.css("text-indent", "0"), M.css("font-size", i), jQuery(".mean-nav ul:first").slideDown(), A = !0) : (jQuery(".mean-nav ul:first").slideUp(), A = !1), M.toggleClass("meanclose"), P(), jQuery(p).addClass("mean-remove")
            }), f && jQuery(".mean-nav ul > li > a:first-child").on("click", function () {
              jQuery(".mean-nav ul:first").slideUp(), A = !1, jQuery(M).toggleClass("meanclose").html(s)
            })
          } else W()
        };
      C || jQuery(window).resize(function () {
        a = window.innerWidth || document.documentElement.clientWidth, a > o, W(), o >= a ? (b(), x()) : W()
      }), jQuery(window).resize(function () {
        a = window.innerWidth || document.documentElement.clientWidth, C ? (x(), o >= a ? E === !1 && b() : W()) : (W(), o >= a && (b(), x()))
      }), b()
    })
  }
}(jQuery);

/*!
 * Isotope PACKAGED v3.0.1
 *
 * Licensed GPLv3 for open source use
 * or Isotope Commercial License for commercial use
 *
 * http://isotope.metafizzy.co
 * Copyright 2016 Metafizzy
 */
! function (t, e) {
  "use strict";
  "function" == typeof define && define.amd ? define("jquery-bridget/jquery-bridget", ["jquery"], function (i) {
    e(t, i)
  }) : "object" == typeof module && module.exports ? module.exports = e(t, require("jquery")) : t.jQueryBridget = e(t, t.jQuery)
}(window, function (t, e) {
  "use strict";

  function i(i, s, a) {
    function u(t, e, n) {
      var o, s = "$()." + i + '("' + e + '")';
      return t.each(function (t, u) {
        var h = a.data(u, i);
        if (!h) return void r(i + " not initialized. Cannot call methods, i.e. " + s);
        var d = h[e];
        if (!d || "_" == e.charAt(0)) return void r(s + " is not a valid method");
        var l = d.apply(h, n);
        o = void 0 === o ? l : o
      }), void 0 !== o ? o : t
    }

    function h(t, e) {
      t.each(function (t, n) {
        var o = a.data(n, i);
        o ? (o.option(e), o._init()) : (o = new s(n, e), a.data(n, i, o))
      })
    }
    a = a || e || t.jQuery, a && (s.prototype.option || (s.prototype.option = function (t) {
      a.isPlainObject(t) && (this.options = a.extend(!0, this.options, t))
    }), a.fn[i] = function (t) {
      if ("string" == typeof t) {
        var e = o.call(arguments, 1);
        return u(this, t, e)
      }
      return h(this, t), this
    }, n(a))
  }

  function n(t) {
    !t || t && t.bridget || (t.bridget = i)
  }
  var o = Array.prototype.slice,
    s = t.console,
    r = "undefined" == typeof s ? function () {} : function (t) {
      s.error(t)
    };
  return n(e || t.jQuery), i
}),
function (t, e) {
  "function" == typeof define && define.amd ? define("ev-emitter/ev-emitter", e) : "object" == typeof module && module.exports ? module.exports = e() : t.EvEmitter = e()
}("undefined" != typeof window ? window : this, function () {
  function t() {}
  var e = t.prototype;
  return e.on = function (t, e) {
    if (t && e) {
      var i = this._events = this._events || {},
        n = i[t] = i[t] || [];
      return -1 == n.indexOf(e) && n.push(e), this
    }
  }, e.once = function (t, e) {
    if (t && e) {
      this.on(t, e);
      var i = this._onceEvents = this._onceEvents || {},
        n = i[t] = i[t] || {};
      return n[e] = !0, this
    }
  }, e.off = function (t, e) {
    var i = this._events && this._events[t];
    if (i && i.length) {
      var n = i.indexOf(e);
      return -1 != n && i.splice(n, 1), this
    }
  }, e.emitEvent = function (t, e) {
    var i = this._events && this._events[t];
    if (i && i.length) {
      var n = 0,
        o = i[n];
      e = e || [];
      for (var s = this._onceEvents && this._onceEvents[t]; o;) {
        var r = s && s[o];
        r && (this.off(t, o), delete s[o]), o.apply(this, e), n += r ? 0 : 1, o = i[n]
      }
      return this
    }
  }, t
}),
function (t, e) {
  "use strict";
  "function" == typeof define && define.amd ? define("get-size/get-size", [], function () {
    return e()
  }) : "object" == typeof module && module.exports ? module.exports = e() : t.getSize = e()
}(window, function () {
  "use strict";

  function t(t) {
    var e = parseFloat(t),
      i = -1 == t.indexOf("%") && !isNaN(e);
    return i && e
  }

  function e() {}

  function i() {
    for (var t = {
        width: 0,
        height: 0,
        innerWidth: 0,
        innerHeight: 0,
        outerWidth: 0,
        outerHeight: 0
      }, e = 0; h > e; e++) {
      var i = u[e];
      t[i] = 0
    }
    return t
  }

  function n(t) {
    var e = getComputedStyle(t);
    return e || a("Style returned " + e + ". Are you running this code in a hidden iframe on Firefox? See http://bit.ly/getsizebug1"), e
  }

  function o() {
    if (!d) {
      d = !0;
      var e = document.createElement("div");
      e.style.width = "200px", e.style.padding = "1px 2px 3px 4px", e.style.borderStyle = "solid", e.style.borderWidth = "1px 2px 3px 4px", e.style.boxSizing = "border-box";
      var i = document.body || document.documentElement;
      i.appendChild(e);
      var o = n(e);
      s.isBoxSizeOuter = r = 200 == t(o.width), i.removeChild(e)
    }
  }

  function s(e) {
    if (o(), "string" == typeof e && (e = document.querySelector(e)), e && "object" == typeof e && e.nodeType) {
      var s = n(e);
      if ("none" == s.display) return i();
      var a = {};
      a.width = e.offsetWidth, a.height = e.offsetHeight;
      for (var d = a.isBorderBox = "border-box" == s.boxSizing, l = 0; h > l; l++) {
        var f = u[l],
          c = s[f],
          m = parseFloat(c);
        a[f] = isNaN(m) ? 0 : m
      }
      var p = a.paddingLeft + a.paddingRight,
        y = a.paddingTop + a.paddingBottom,
        g = a.marginLeft + a.marginRight,
        v = a.marginTop + a.marginBottom,
        _ = a.borderLeftWidth + a.borderRightWidth,
        I = a.borderTopWidth + a.borderBottomWidth,
        z = d && r,
        x = t(s.width);
      x !== !1 && (a.width = x + (z ? 0 : p + _));
      var S = t(s.height);
      return S !== !1 && (a.height = S + (z ? 0 : y + I)), a.innerWidth = a.width - (p + _), a.innerHeight = a.height - (y + I), a.outerWidth = a.width + g, a.outerHeight = a.height + v, a
    }
  }
  var r, a = "undefined" == typeof console ? e : function (t) {
      console.error(t)
    },
    u = ["paddingLeft", "paddingRight", "paddingTop", "paddingBottom", "marginLeft", "marginRight", "marginTop", "marginBottom", "borderLeftWidth", "borderRightWidth", "borderTopWidth", "borderBottomWidth"],
    h = u.length,
    d = !1;
  return s
}),
function (t, e) {
  "use strict";
  "function" == typeof define && define.amd ? define("desandro-matches-selector/matches-selector", e) : "object" == typeof module && module.exports ? module.exports = e() : t.matchesSelector = e()
}(window, function () {
  "use strict";
  var t = function () {
    var t = Element.prototype;
    if (t.matches) return "matches";
    if (t.matchesSelector) return "matchesSelector";
    for (var e = ["webkit", "moz", "ms", "o"], i = 0; i < e.length; i++) {
      var n = e[i],
        o = n + "MatchesSelector";
      if (t[o]) return o
    }
  }();
  return function (e, i) {
    return e[t](i)
  }
}),
function (t, e) {
  "function" == typeof define && define.amd ? define("fizzy-ui-utils/utils", ["desandro-matches-selector/matches-selector"], function (i) {
    return e(t, i)
  }) : "object" == typeof module && module.exports ? module.exports = e(t, require("desandro-matches-selector")) : t.fizzyUIUtils = e(t, t.matchesSelector)
}(window, function (t, e) {
  var i = {};
  i.extend = function (t, e) {
    for (var i in e) t[i] = e[i];
    return t
  }, i.modulo = function (t, e) {
    return (t % e + e) % e
  }, i.makeArray = function (t) {
    var e = [];
    if (Array.isArray(t)) e = t;
    else if (t && "number" == typeof t.length)
      for (var i = 0; i < t.length; i++) e.push(t[i]);
    else e.push(t);
    return e
  }, i.removeFrom = function (t, e) {
    var i = t.indexOf(e); - 1 != i && t.splice(i, 1)
  }, i.getParent = function (t, i) {
    for (; t != document.body;)
      if (t = t.parentNode, e(t, i)) return t
  }, i.getQueryElement = function (t) {
    return "string" == typeof t ? document.querySelector(t) : t
  }, i.handleEvent = function (t) {
    var e = "on" + t.type;
    this[e] && this[e](t)
  }, i.filterFindElements = function (t, n) {
    t = i.makeArray(t);
    var o = [];
    return t.forEach(function (t) {
      if (t instanceof HTMLElement) {
        if (!n) return void o.push(t);
        e(t, n) && o.push(t);
        for (var i = t.querySelectorAll(n), s = 0; s < i.length; s++) o.push(i[s])
      }
    }), o
  }, i.debounceMethod = function (t, e, i) {
    var n = t.prototype[e],
      o = e + "Timeout";
    t.prototype[e] = function () {
      var t = this[o];
      t && clearTimeout(t);
      var e = arguments,
        s = this;
      this[o] = setTimeout(function () {
        n.apply(s, e), delete s[o]
      }, i || 100)
    }
  }, i.docReady = function (t) {
    var e = document.readyState;
    "complete" == e || "interactive" == e ? t() : document.addEventListener("DOMContentLoaded", t)
  }, i.toDashed = function (t) {
    return t.replace(/(.)([A-Z])/g, function (t, e, i) {
      return e + "-" + i
    }).toLowerCase()
  };
  var n = t.console;
  return i.htmlInit = function (e, o) {
    i.docReady(function () {
      var s = i.toDashed(o),
        r = "data-" + s,
        a = document.querySelectorAll("[" + r + "]"),
        u = document.querySelectorAll(".js-" + s),
        h = i.makeArray(a).concat(i.makeArray(u)),
        d = r + "-options",
        l = t.jQuery;
      h.forEach(function (t) {
        var i, s = t.getAttribute(r) || t.getAttribute(d);
        try {
          i = s && JSON.parse(s)
        } catch (a) {
          return void(n && n.error("Error parsing " + r + " on " + t.className + ": " + a))
        }
        var u = new e(t, i);
        l && l.data(t, o, u)
      })
    })
  }, i
}),
function (t, e) {
  "function" == typeof define && define.amd ? define("outlayer/item", ["ev-emitter/ev-emitter", "get-size/get-size"], e) : "object" == typeof module && module.exports ? module.exports = e(require("ev-emitter"), require("get-size")) : (t.Outlayer = {}, t.Outlayer.Item = e(t.EvEmitter, t.getSize))
}(window, function (t, e) {
  "use strict";

  function i(t) {
    for (var e in t) return !1;
    return e = null, !0
  }

  function n(t, e) {
    t && (this.element = t, this.layout = e, this.position = {
      x: 0,
      y: 0
    }, this._create())
  }

  function o(t) {
    return t.replace(/([A-Z])/g, function (t) {
      return "-" + t.toLowerCase()
    })
  }
  var s = document.documentElement.style,
    r = "string" == typeof s.transition ? "transition" : "WebkitTransition",
    a = "string" == typeof s.transform ? "transform" : "WebkitTransform",
    u = {
      WebkitTransition: "webkitTransitionEnd",
      transition: "transitionend"
    } [r],
    h = {
      transform: a,
      transition: r,
      transitionDuration: r + "Duration",
      transitionProperty: r + "Property",
      transitionDelay: r + "Delay"
    },
    d = n.prototype = Object.create(t.prototype);
  d.constructor = n, d._create = function () {
    this._transn = {
      ingProperties: {},
      clean: {},
      onEnd: {}
    }, this.css({
      position: "absolute"
    })
  }, d.handleEvent = function (t) {
    var e = "on" + t.type;
    this[e] && this[e](t)
  }, d.getSize = function () {
    this.size = e(this.element)
  }, d.css = function (t) {
    var e = this.element.style;
    for (var i in t) {
      var n = h[i] || i;
      e[n] = t[i]
    }
  }, d.getPosition = function () {
    var t = getComputedStyle(this.element),
      e = this.layout._getOption("originLeft"),
      i = this.layout._getOption("originTop"),
      n = t[e ? "left" : "right"],
      o = t[i ? "top" : "bottom"],
      s = this.layout.size,
      r = -1 != n.indexOf("%") ? parseFloat(n) / 100 * s.width : parseInt(n, 10),
      a = -1 != o.indexOf("%") ? parseFloat(o) / 100 * s.height : parseInt(o, 10);
    r = isNaN(r) ? 0 : r, a = isNaN(a) ? 0 : a, r -= e ? s.paddingLeft : s.paddingRight, a -= i ? s.paddingTop : s.paddingBottom, this.position.x = r, this.position.y = a
  }, d.layoutPosition = function () {
    var t = this.layout.size,
      e = {},
      i = this.layout._getOption("originLeft"),
      n = this.layout._getOption("originTop"),
      o = i ? "paddingLeft" : "paddingRight",
      s = i ? "left" : "right",
      r = i ? "right" : "left",
      a = this.position.x + t[o];
    e[s] = this.getXValue(a), e[r] = "";
    var u = n ? "paddingTop" : "paddingBottom",
      h = n ? "top" : "bottom",
      d = n ? "bottom" : "top",
      l = this.position.y + t[u];
    e[h] = this.getYValue(l), e[d] = "", this.css(e), this.emitEvent("layout", [this])
  }, d.getXValue = function (t) {
    var e = this.layout._getOption("horizontal");
    return this.layout.options.percentPosition && !e ? t / this.layout.size.width * 100 + "%" : t + "px"
  }, d.getYValue = function (t) {
    var e = this.layout._getOption("horizontal");
    return this.layout.options.percentPosition && e ? t / this.layout.size.height * 100 + "%" : t + "px"
  }, d._transitionTo = function (t, e) {
    this.getPosition();
    var i = this.position.x,
      n = this.position.y,
      o = parseInt(t, 10),
      s = parseInt(e, 10),
      r = o === this.position.x && s === this.position.y;
    if (this.setPosition(t, e), r && !this.isTransitioning) return void this.layoutPosition();
    var a = t - i,
      u = e - n,
      h = {};
    h.transform = this.getTranslate(a, u), this.transition({
      to: h,
      onTransitionEnd: {
        transform: this.layoutPosition
      },
      isCleaning: !0
    })
  }, d.getTranslate = function (t, e) {
    var i = this.layout._getOption("originLeft"),
      n = this.layout._getOption("originTop");
    return t = i ? t : -t, e = n ? e : -e, "translate3d(" + t + "px, " + e + "px, 0)"
  }, d.goTo = function (t, e) {
    this.setPosition(t, e), this.layoutPosition()
  }, d.moveTo = d._transitionTo, d.setPosition = function (t, e) {
    this.position.x = parseInt(t, 10), this.position.y = parseInt(e, 10)
  }, d._nonTransition = function (t) {
    this.css(t.to), t.isCleaning && this._removeStyles(t.to);
    for (var e in t.onTransitionEnd) t.onTransitionEnd[e].call(this)
  }, d.transition = function (t) {
    if (!parseFloat(this.layout.options.transitionDuration)) return void this._nonTransition(t);
    var e = this._transn;
    for (var i in t.onTransitionEnd) e.onEnd[i] = t.onTransitionEnd[i];
    for (i in t.to) e.ingProperties[i] = !0, t.isCleaning && (e.clean[i] = !0);
    if (t.from) {
      this.css(t.from);
      var n = this.element.offsetHeight;
      n = null
    }
    this.enableTransition(t.to), this.css(t.to), this.isTransitioning = !0
  };
  var l = "opacity," + o(a);
  d.enableTransition = function () {
    if (!this.isTransitioning) {
      var t = this.layout.options.transitionDuration;
      t = "number" == typeof t ? t + "ms" : t, this.css({
        transitionProperty: l,
        transitionDuration: t,
        transitionDelay: this.staggerDelay || 0
      }), this.element.addEventListener(u, this, !1)
    }
  }, d.onwebkitTransitionEnd = function (t) {
    this.ontransitionend(t)
  }, d.onotransitionend = function (t) {
    this.ontransitionend(t)
  };
  var f = {
    "-webkit-transform": "transform"
  };
  d.ontransitionend = function (t) {
    if (t.target === this.element) {
      var e = this._transn,
        n = f[t.propertyName] || t.propertyName;
      if (delete e.ingProperties[n], i(e.ingProperties) && this.disableTransition(), n in e.clean && (this.element.style[t.propertyName] = "", delete e.clean[n]), n in e.onEnd) {
        var o = e.onEnd[n];
        o.call(this), delete e.onEnd[n]
      }
      this.emitEvent("transitionEnd", [this])
    }
  }, d.disableTransition = function () {
    this.removeTransitionStyles(), this.element.removeEventListener(u, this, !1), this.isTransitioning = !1
  }, d._removeStyles = function (t) {
    var e = {};
    for (var i in t) e[i] = "";
    this.css(e)
  };
  var c = {
    transitionProperty: "",
    transitionDuration: "",
    transitionDelay: ""
  };
  return d.removeTransitionStyles = function () {
    this.css(c)
  }, d.stagger = function (t) {
    t = isNaN(t) ? 0 : t, this.staggerDelay = t + "ms"
  }, d.removeElem = function () {
    this.element.parentNode.removeChild(this.element), this.css({
      display: ""
    }), this.emitEvent("remove", [this])
  }, d.remove = function () {
    return r && parseFloat(this.layout.options.transitionDuration) ? (this.once("transitionEnd", function () {
      this.removeElem()
    }), void this.hide()) : void this.removeElem()
  }, d.reveal = function () {
    delete this.isHidden, this.css({
      display: ""
    });
    var t = this.layout.options,
      e = {},
      i = this.getHideRevealTransitionEndProperty("visibleStyle");
    e[i] = this.onRevealTransitionEnd, this.transition({
      from: t.hiddenStyle,
      to: t.visibleStyle,
      isCleaning: !0,
      onTransitionEnd: e
    })
  }, d.onRevealTransitionEnd = function () {
    this.isHidden || this.emitEvent("reveal")
  }, d.getHideRevealTransitionEndProperty = function (t) {
    var e = this.layout.options[t];
    if (e.opacity) return "opacity";
    for (var i in e) return i
  }, d.hide = function () {
    this.isHidden = !0, this.css({
      display: ""
    });
    var t = this.layout.options,
      e = {},
      i = this.getHideRevealTransitionEndProperty("hiddenStyle");
    e[i] = this.onHideTransitionEnd, this.transition({
      from: t.visibleStyle,
      to: t.hiddenStyle,
      isCleaning: !0,
      onTransitionEnd: e
    })
  }, d.onHideTransitionEnd = function () {
    this.isHidden && (this.css({
      display: "none"
    }), this.emitEvent("hide"))
  }, d.destroy = function () {
    this.css({
      position: "",
      left: "",
      right: "",
      top: "",
      bottom: "",
      transition: "",
      transform: ""
    })
  }, n
}),
function (t, e) {
  "use strict";
  "function" == typeof define && define.amd ? define("outlayer/outlayer", ["ev-emitter/ev-emitter", "get-size/get-size", "fizzy-ui-utils/utils", "./item"], function (i, n, o, s) {
    return e(t, i, n, o, s)
  }) : "object" == typeof module && module.exports ? module.exports = e(t, require("ev-emitter"), require("get-size"), require("fizzy-ui-utils"), require("./item")) : t.Outlayer = e(t, t.EvEmitter, t.getSize, t.fizzyUIUtils, t.Outlayer.Item)
}(window, function (t, e, i, n, o) {
  "use strict";

  function s(t, e) {
    var i = n.getQueryElement(t);
    if (!i) return void(u && u.error("Bad element for " + this.constructor.namespace + ": " + (i || t)));
    this.element = i, h && (this.$element = h(this.element)), this.options = n.extend({}, this.constructor.defaults), this.option(e);
    var o = ++l;
    this.element.outlayerGUID = o, f[o] = this, this._create();
    var s = this._getOption("initLayout");
    s && this.layout()
  }

  function r(t) {
    function e() {
      t.apply(this, arguments)
    }
    return e.prototype = Object.create(t.prototype), e.prototype.constructor = e, e
  }

  function a(t) {
    if ("number" == typeof t) return t;
    var e = t.match(/(^\d*\.?\d*)(\w*)/),
      i = e && e[1],
      n = e && e[2];
    if (!i.length) return 0;
    i = parseFloat(i);
    var o = m[n] || 1;
    return i * o
  }
  var u = t.console,
    h = t.jQuery,
    d = function () {},
    l = 0,
    f = {};
  s.namespace = "outlayer", s.Item = o, s.defaults = {
    containerStyle: {
      position: "relative"
    },
    initLayout: !0,
    originLeft: !0,
    originTop: !0,
    resize: !0,
    resizeContainer: !0,
    transitionDuration: "0.4s",
    hiddenStyle: {
      opacity: 0,
      transform: "scale(0.001)"
    },
    visibleStyle: {
      opacity: 1,
      transform: "scale(1)"
    }
  };
  var c = s.prototype;
  n.extend(c, e.prototype), c.option = function (t) {
    n.extend(this.options, t)
  }, c._getOption = function (t) {
    var e = this.constructor.compatOptions[t];
    return e && void 0 !== this.options[e] ? this.options[e] : this.options[t]
  }, s.compatOptions = {
    initLayout: "isInitLayout",
    horizontal: "isHorizontal",
    layoutInstant: "isLayoutInstant",
    originLeft: "isOriginLeft",
    originTop: "isOriginTop",
    resize: "isResizeBound",
    resizeContainer: "isResizingContainer"
  }, c._create = function () {
    this.reloadItems(), this.stamps = [], this.stamp(this.options.stamp), n.extend(this.element.style, this.options.containerStyle);
    var t = this._getOption("resize");
    t && this.bindResize()
  }, c.reloadItems = function () {
    this.items = this._itemize(this.element.children)
  }, c._itemize = function (t) {
    for (var e = this._filterFindItemElements(t), i = this.constructor.Item, n = [], o = 0; o < e.length; o++) {
      var s = e[o],
        r = new i(s, this);
      n.push(r)
    }
    return n
  }, c._filterFindItemElements = function (t) {
    return n.filterFindElements(t, this.options.itemSelector)
  }, c.getItemElements = function () {
    return this.items.map(function (t) {
      return t.element
    })
  }, c.layout = function () {
    this._resetLayout(), this._manageStamps();
    var t = this._getOption("layoutInstant"),
      e = void 0 !== t ? t : !this._isLayoutInited;
    this.layoutItems(this.items, e), this._isLayoutInited = !0
  }, c._init = c.layout, c._resetLayout = function () {
    this.getSize()
  }, c.getSize = function () {
    this.size = i(this.element)
  }, c._getMeasurement = function (t, e) {
    var n, o = this.options[t];
    o ? ("string" == typeof o ? n = this.element.querySelector(o) : o instanceof HTMLElement && (n = o), this[t] = n ? i(n)[e] : o) : this[t] = 0
  }, c.layoutItems = function (t, e) {
    t = this._getItemsForLayout(t), this._layoutItems(t, e), this._postLayout()
  }, c._getItemsForLayout = function (t) {
    return t.filter(function (t) {
      return !t.isIgnored
    })
  }, c._layoutItems = function (t, e) {
    if (this._emitCompleteOnItems("layout", t), t && t.length) {
      var i = [];
      t.forEach(function (t) {
        var n = this._getItemLayoutPosition(t);
        n.item = t, n.isInstant = e || t.isLayoutInstant, i.push(n)
      }, this), this._processLayoutQueue(i)
    }
  }, c._getItemLayoutPosition = function () {
    return {
      x: 0,
      y: 0
    }
  }, c._processLayoutQueue = function (t) {
    this.updateStagger(), t.forEach(function (t, e) {
      this._positionItem(t.item, t.x, t.y, t.isInstant, e)
    }, this)
  }, c.updateStagger = function () {
    var t = this.options.stagger;
    return null === t || void 0 === t ? void(this.stagger = 0) : (this.stagger = a(t), this.stagger)
  }, c._positionItem = function (t, e, i, n, o) {
    n ? t.goTo(e, i) : (t.stagger(o * this.stagger), t.moveTo(e, i))
  }, c._postLayout = function () {
    this.resizeContainer()
  }, c.resizeContainer = function () {
    var t = this._getOption("resizeContainer");
    if (t) {
      var e = this._getContainerSize();
      e && (this._setContainerMeasure(e.width, !0), this._setContainerMeasure(e.height, !1))
    }
  }, c._getContainerSize = d, c._setContainerMeasure = function (t, e) {
    if (void 0 !== t) {
      var i = this.size;
      i.isBorderBox && (t += e ? i.paddingLeft + i.paddingRight + i.borderLeftWidth + i.borderRightWidth : i.paddingBottom + i.paddingTop + i.borderTopWidth + i.borderBottomWidth), t = Math.max(t, 0), this.element.style[e ? "width" : "height"] = t + "px"
    }
  }, c._emitCompleteOnItems = function (t, e) {
    function i() {
      o.dispatchEvent(t + "Complete", null, [e])
    }

    function n() {
      r++, r == s && i()
    }
    var o = this,
      s = e.length;
    if (!e || !s) return void i();
    var r = 0;
    e.forEach(function (e) {
      e.once(t, n)
    })
  }, c.dispatchEvent = function (t, e, i) {
    var n = e ? [e].concat(i) : i;
    if (this.emitEvent(t, n), h)
      if (this.$element = this.$element || h(this.element), e) {
        var o = h.Event(e);
        o.type = t, this.$element.trigger(o, i)
      } else this.$element.trigger(t, i)
  }, c.ignore = function (t) {
    var e = this.getItem(t);
    e && (e.isIgnored = !0)
  }, c.unignore = function (t) {
    var e = this.getItem(t);
    e && delete e.isIgnored
  }, c.stamp = function (t) {
    t = this._find(t), t && (this.stamps = this.stamps.concat(t), t.forEach(this.ignore, this))
  }, c.unstamp = function (t) {
    t = this._find(t), t && t.forEach(function (t) {
      n.removeFrom(this.stamps, t), this.unignore(t)
    }, this)
  }, c._find = function (t) {
    return t ? ("string" == typeof t && (t = this.element.querySelectorAll(t)), t = n.makeArray(t)) : void 0
  }, c._manageStamps = function () {
    this.stamps && this.stamps.length && (this._getBoundingRect(), this.stamps.forEach(this._manageStamp, this))
  }, c._getBoundingRect = function () {
    var t = this.element.getBoundingClientRect(),
      e = this.size;
    this._boundingRect = {
      left: t.left + e.paddingLeft + e.borderLeftWidth,
      top: t.top + e.paddingTop + e.borderTopWidth,
      right: t.right - (e.paddingRight + e.borderRightWidth),
      bottom: t.bottom - (e.paddingBottom + e.borderBottomWidth)
    }
  }, c._manageStamp = d, c._getElementOffset = function (t) {
    var e = t.getBoundingClientRect(),
      n = this._boundingRect,
      o = i(t),
      s = {
        left: e.left - n.left - o.marginLeft,
        top: e.top - n.top - o.marginTop,
        right: n.right - e.right - o.marginRight,
        bottom: n.bottom - e.bottom - o.marginBottom
      };
    return s
  }, c.handleEvent = n.handleEvent, c.bindResize = function () {
    t.addEventListener("resize", this), this.isResizeBound = !0
  }, c.unbindResize = function () {
    t.removeEventListener("resize", this), this.isResizeBound = !1
  }, c.onresize = function () {
    this.resize()
  }, n.debounceMethod(s, "onresize", 100), c.resize = function () {
    this.isResizeBound && this.needsResizeLayout() && this.layout()
  }, c.needsResizeLayout = function () {
    var t = i(this.element),
      e = this.size && t;
    return e && t.innerWidth !== this.size.innerWidth
  }, c.addItems = function (t) {
    var e = this._itemize(t);
    return e.length && (this.items = this.items.concat(e)), e
  }, c.appended = function (t) {
    var e = this.addItems(t);
    e.length && (this.layoutItems(e, !0), this.reveal(e))
  }, c.prepended = function (t) {
    var e = this._itemize(t);
    if (e.length) {
      var i = this.items.slice(0);
      this.items = e.concat(i), this._resetLayout(), this._manageStamps(), this.layoutItems(e, !0), this.reveal(e), this.layoutItems(i)
    }
  }, c.reveal = function (t) {
    if (this._emitCompleteOnItems("reveal", t), t && t.length) {
      var e = this.updateStagger();
      t.forEach(function (t, i) {
        t.stagger(i * e), t.reveal()
      })
    }
  }, c.hide = function (t) {
    if (this._emitCompleteOnItems("hide", t), t && t.length) {
      var e = this.updateStagger();
      t.forEach(function (t, i) {
        t.stagger(i * e), t.hide()
      })
    }
  }, c.revealItemElements = function (t) {
    var e = this.getItems(t);
    this.reveal(e)
  }, c.hideItemElements = function (t) {
    var e = this.getItems(t);
    this.hide(e)
  }, c.getItem = function (t) {
    for (var e = 0; e < this.items.length; e++) {
      var i = this.items[e];
      if (i.element == t) return i
    }
  }, c.getItems = function (t) {
    t = n.makeArray(t);
    var e = [];
    return t.forEach(function (t) {
      var i = this.getItem(t);
      i && e.push(i)
    }, this), e
  }, c.remove = function (t) {
    var e = this.getItems(t);
    this._emitCompleteOnItems("remove", e), e && e.length && e.forEach(function (t) {
      t.remove(), n.removeFrom(this.items, t)
    }, this)
  }, c.destroy = function () {
    var t = this.element.style;
    t.height = "", t.position = "", t.width = "", this.items.forEach(function (t) {
      t.destroy()
    }), this.unbindResize();
    var e = this.element.outlayerGUID;
    delete f[e], delete this.element.outlayerGUID, h && h.removeData(this.element, this.constructor.namespace)
  }, s.data = function (t) {
    t = n.getQueryElement(t);
    var e = t && t.outlayerGUID;
    return e && f[e]
  }, s.create = function (t, e) {
    var i = r(s);
    return i.defaults = n.extend({}, s.defaults), n.extend(i.defaults, e), i.compatOptions = n.extend({}, s.compatOptions), i.namespace = t, i.data = s.data, i.Item = r(o), n.htmlInit(i, t), h && h.bridget && h.bridget(t, i), i
  };
  var m = {
    ms: 1,
    s: 1e3
  };
  return s.Item = o, s
}),
function (t, e) {
  "function" == typeof define && define.amd ? define("isotope/js/item", ["outlayer/outlayer"], e) : "object" == typeof module && module.exports ? module.exports = e(require("outlayer")) : (t.Isotope = t.Isotope || {}, t.Isotope.Item = e(t.Outlayer))
}(window, function (t) {
  "use strict";

  function e() {
    t.Item.apply(this, arguments)
  }
  var i = e.prototype = Object.create(t.Item.prototype),
    n = i._create;
  i._create = function () {
    this.id = this.layout.itemGUID++, n.call(this), this.sortData = {}
  }, i.updateSortData = function () {
    if (!this.isIgnored) {
      this.sortData.id = this.id, this.sortData["original-order"] = this.id, this.sortData.random = Math.random();
      var t = this.layout.options.getSortData,
        e = this.layout._sorters;
      for (var i in t) {
        var n = e[i];
        this.sortData[i] = n(this.element, this)
      }
    }
  };
  var o = i.destroy;
  return i.destroy = function () {
    o.apply(this, arguments), this.css({
      display: ""
    })
  }, e
}),
function (t, e) {
  "function" == typeof define && define.amd ? define("isotope/js/layout-mode", ["get-size/get-size", "outlayer/outlayer"], e) : "object" == typeof module && module.exports ? module.exports = e(require("get-size"), require("outlayer")) : (t.Isotope = t.Isotope || {}, t.Isotope.LayoutMode = e(t.getSize, t.Outlayer))
}(window, function (t, e) {
  "use strict";

  function i(t) {
    this.isotope = t, t && (this.options = t.options[this.namespace], this.element = t.element, this.items = t.filteredItems, this.size = t.size)
  }
  var n = i.prototype,
    o = ["_resetLayout", "_getItemLayoutPosition", "_manageStamp", "_getContainerSize", "_getElementOffset", "needsResizeLayout", "_getOption"];
  return o.forEach(function (t) {
    n[t] = function () {
      return e.prototype[t].apply(this.isotope, arguments)
    }
  }), n.needsVerticalResizeLayout = function () {
    var e = t(this.isotope.element),
      i = this.isotope.size && e;
    return i && e.innerHeight != this.isotope.size.innerHeight
  }, n._getMeasurement = function () {
    this.isotope._getMeasurement.apply(this, arguments)
  }, n.getColumnWidth = function () {
    this.getSegmentSize("column", "Width")
  }, n.getRowHeight = function () {
    this.getSegmentSize("row", "Height")
  }, n.getSegmentSize = function (t, e) {
    var i = t + e,
      n = "outer" + e;
    if (this._getMeasurement(i, n), !this[i]) {
      var o = this.getFirstItemSize();
      this[i] = o && o[n] || this.isotope.size["inner" + e]
    }
  }, n.getFirstItemSize = function () {
    var e = this.isotope.filteredItems[0];
    return e && e.element && t(e.element)
  }, n.layout = function () {
    this.isotope.layout.apply(this.isotope, arguments)
  }, n.getSize = function () {
    this.isotope.getSize(), this.size = this.isotope.size
  }, i.modes = {}, i.create = function (t, e) {
    function o() {
      i.apply(this, arguments)
    }
    return o.prototype = Object.create(n), o.prototype.constructor = o, e && (o.options = e), o.prototype.namespace = t, i.modes[t] = o, o
  }, i
}),
function (t, e) {
  "function" == typeof define && define.amd ? define("masonry/masonry", ["outlayer/outlayer", "get-size/get-size"], e) : "object" == typeof module && module.exports ? module.exports = e(require("outlayer"), require("get-size")) : t.Masonry = e(t.Outlayer, t.getSize)
}(window, function (t, e) {
  var i = t.create("masonry");
  return i.compatOptions.fitWidth = "isFitWidth", i.prototype._resetLayout = function () {
    this.getSize(), this._getMeasurement("columnWidth", "outerWidth"), this._getMeasurement("gutter", "outerWidth"), this.measureColumns(), this.colYs = [];
    for (var t = 0; t < this.cols; t++) this.colYs.push(0);
    this.maxY = 0
  }, i.prototype.measureColumns = function () {
    if (this.getContainerWidth(), !this.columnWidth) {
      var t = this.items[0],
        i = t && t.element;
      this.columnWidth = i && e(i).outerWidth || this.containerWidth
    }
    var n = this.columnWidth += this.gutter,
      o = this.containerWidth + this.gutter,
      s = o / n,
      r = n - o % n,
      a = r && 1 > r ? "round" : "floor";
    s = Math[a](s), this.cols = Math.max(s, 1)
  }, i.prototype.getContainerWidth = function () {
    var t = this._getOption("fitWidth"),
      i = t ? this.element.parentNode : this.element,
      n = e(i);
    this.containerWidth = n && n.innerWidth
  }, i.prototype._getItemLayoutPosition = function (t) {
    t.getSize();
    var e = t.size.outerWidth % this.columnWidth,
      i = e && 1 > e ? "round" : "ceil",
      n = Math[i](t.size.outerWidth / this.columnWidth);
    n = Math.min(n, this.cols);
    for (var o = this._getColGroup(n), s = Math.min.apply(Math, o), r = o.indexOf(s), a = {
        x: this.columnWidth * r,
        y: s
      }, u = s + t.size.outerHeight, h = this.cols + 1 - o.length, d = 0; h > d; d++) this.colYs[r + d] = u;
    return a
  }, i.prototype._getColGroup = function (t) {
    if (2 > t) return this.colYs;
    for (var e = [], i = this.cols + 1 - t, n = 0; i > n; n++) {
      var o = this.colYs.slice(n, n + t);
      e[n] = Math.max.apply(Math, o)
    }
    return e
  }, i.prototype._manageStamp = function (t) {
    var i = e(t),
      n = this._getElementOffset(t),
      o = this._getOption("originLeft"),
      s = o ? n.left : n.right,
      r = s + i.outerWidth,
      a = Math.floor(s / this.columnWidth);
    a = Math.max(0, a);
    var u = Math.floor(r / this.columnWidth);
    u -= r % this.columnWidth ? 0 : 1, u = Math.min(this.cols - 1, u);
    for (var h = this._getOption("originTop"), d = (h ? n.top : n.bottom) + i.outerHeight, l = a; u >= l; l++) this.colYs[l] = Math.max(d, this.colYs[l])
  }, i.prototype._getContainerSize = function () {
    this.maxY = Math.max.apply(Math, this.colYs);
    var t = {
      height: this.maxY
    };
    return this._getOption("fitWidth") && (t.width = this._getContainerFitWidth()), t
  }, i.prototype._getContainerFitWidth = function () {
    for (var t = 0, e = this.cols; --e && 0 === this.colYs[e];) t++;
    return (this.cols - t) * this.columnWidth - this.gutter
  }, i.prototype.needsResizeLayout = function () {
    var t = this.containerWidth;
    return this.getContainerWidth(), t != this.containerWidth
  }, i
}),
function (t, e) {
  "function" == typeof define && define.amd ? define("isotope/js/layout-modes/masonry", ["../layout-mode", "masonry/masonry"], e) : "object" == typeof module && module.exports ? module.exports = e(require("../layout-mode"), require("masonry-layout")) : e(t.Isotope.LayoutMode, t.Masonry)
}(window, function (t, e) {
  "use strict";
  var i = t.create("masonry"),
    n = i.prototype,
    o = {
      _getElementOffset: !0,
      layout: !0,
      _getMeasurement: !0
    };
  for (var s in e.prototype) o[s] || (n[s] = e.prototype[s]);
  var r = n.measureColumns;
  n.measureColumns = function () {
    this.items = this.isotope.filteredItems, r.call(this)
  };
  var a = n._getOption;
  return n._getOption = function (t) {
    return "fitWidth" == t ? void 0 !== this.options.isFitWidth ? this.options.isFitWidth : this.options.fitWidth : a.apply(this.isotope, arguments)
  }, i
}),
function (t, e) {
  "function" == typeof define && define.amd ? define("isotope/js/layout-modes/fit-rows", ["../layout-mode"], e) : "object" == typeof exports ? module.exports = e(require("../layout-mode")) : e(t.Isotope.LayoutMode)
}(window, function (t) {
  "use strict";
  var e = t.create("fitRows"),
    i = e.prototype;
  return i._resetLayout = function () {
    this.x = 0, this.y = 0, this.maxY = 0, this._getMeasurement("gutter", "outerWidth")
  }, i._getItemLayoutPosition = function (t) {
    t.getSize();
    var e = t.size.outerWidth + this.gutter,
      i = this.isotope.size.innerWidth + this.gutter;
    0 !== this.x && e + this.x > i && (this.x = 0, this.y = this.maxY);
    var n = {
      x: this.x,
      y: this.y
    };
    return this.maxY = Math.max(this.maxY, this.y + t.size.outerHeight), this.x += e, n
  }, i._getContainerSize = function () {
    return {
      height: this.maxY
    }
  }, e
}),
function (t, e) {
  "function" == typeof define && define.amd ? define("isotope/js/layout-modes/vertical", ["../layout-mode"], e) : "object" == typeof module && module.exports ? module.exports = e(require("../layout-mode")) : e(t.Isotope.LayoutMode)
}(window, function (t) {
  "use strict";
  var e = t.create("vertical", {
      horizontalAlignment: 0
    }),
    i = e.prototype;
  return i._resetLayout = function () {
    this.y = 0
  }, i._getItemLayoutPosition = function (t) {
    t.getSize();
    var e = (this.isotope.size.innerWidth - t.size.outerWidth) * this.options.horizontalAlignment,
      i = this.y;
    return this.y += t.size.outerHeight, {
      x: e,
      y: i
    }
  }, i._getContainerSize = function () {
    return {
      height: this.y
    }
  }, e
}),
function (t, e) {
  "function" == typeof define && define.amd ? define(["outlayer/outlayer", "get-size/get-size", "desandro-matches-selector/matches-selector", "fizzy-ui-utils/utils", "isotope/js/item", "isotope/js/layout-mode", "isotope/js/layout-modes/masonry", "isotope/js/layout-modes/fit-rows", "isotope/js/layout-modes/vertical"], function (i, n, o, s, r, a) {
    return e(t, i, n, o, s, r, a)
  }) : "object" == typeof module && module.exports ? module.exports = e(t, require("outlayer"), require("get-size"), require("desandro-matches-selector"), require("fizzy-ui-utils"), require("isotope/js/item"), require("isotope/js/layout-mode"), require("isotope/js/layout-modes/masonry"), require("isotope/js/layout-modes/fit-rows"), require("isotope/js/layout-modes/vertical")) : t.Isotope = e(t, t.Outlayer, t.getSize, t.matchesSelector, t.fizzyUIUtils, t.Isotope.Item, t.Isotope.LayoutMode)
}(window, function (t, e, i, n, o, s, r) {
  function a(t, e) {
    return function (i, n) {
      for (var o = 0; o < t.length; o++) {
        var s = t[o],
          r = i.sortData[s],
          a = n.sortData[s];
        if (r > a || a > r) {
          var u = void 0 !== e[s] ? e[s] : e,
            h = u ? 1 : -1;
          return (r > a ? 1 : -1) * h
        }
      }
      return 0
    }
  }
  var u = t.jQuery,
    h = String.prototype.trim ? function (t) {
      return t.trim()
    } : function (t) {
      return t.replace(/^\s+|\s+$/g, "")
    },
    d = e.create("isotope", {
      layoutMode: "masonry",
      isJQueryFiltering: !0,
      sortAscending: !0
    });
  d.Item = s, d.LayoutMode = r;
  var l = d.prototype;
  l._create = function () {
    this.itemGUID = 0, this._sorters = {}, this._getSorters(), e.prototype._create.call(this), this.modes = {}, this.filteredItems = this.items, this.sortHistory = ["original-order"];
    for (var t in r.modes) this._initLayoutMode(t)
  }, l.reloadItems = function () {
    this.itemGUID = 0, e.prototype.reloadItems.call(this)
  }, l._itemize = function () {
    for (var t = e.prototype._itemize.apply(this, arguments), i = 0; i < t.length; i++) {
      var n = t[i];
      n.id = this.itemGUID++
    }
    return this._updateItemsSortData(t), t
  }, l._initLayoutMode = function (t) {
    var e = r.modes[t],
      i = this.options[t] || {};
    this.options[t] = e.options ? o.extend(e.options, i) : i, this.modes[t] = new e(this)
  }, l.layout = function () {
    return !this._isLayoutInited && this._getOption("initLayout") ? void this.arrange() : void this._layout()
  }, l._layout = function () {
    var t = this._getIsInstant();
    this._resetLayout(), this._manageStamps(), this.layoutItems(this.filteredItems, t), this._isLayoutInited = !0
  }, l.arrange = function (t) {
    this.option(t), this._getIsInstant();
    var e = this._filter(this.items);
    this.filteredItems = e.matches, this._bindArrangeComplete(), this._isInstant ? this._noTransition(this._hideReveal, [e]) : this._hideReveal(e), this._sort(), this._layout()
  }, l._init = l.arrange, l._hideReveal = function (t) {
    this.reveal(t.needReveal), this.hide(t.needHide)
  }, l._getIsInstant = function () {
    var t = this._getOption("layoutInstant"),
      e = void 0 !== t ? t : !this._isLayoutInited;
    return this._isInstant = e, e
  }, l._bindArrangeComplete = function () {
    function t() {
      e && i && n && o.dispatchEvent("arrangeComplete", null, [o.filteredItems])
    }
    var e, i, n, o = this;
    this.once("layoutComplete", function () {
      e = !0, t()
    }), this.once("hideComplete", function () {
      i = !0, t()
    }), this.once("revealComplete", function () {
      n = !0, t()
    })
  }, l._filter = function (t) {
    var e = this.options.filter;
    e = e || "*";
    for (var i = [], n = [], o = [], s = this._getFilterTest(e), r = 0; r < t.length; r++) {
      var a = t[r];
      if (!a.isIgnored) {
        var u = s(a);
        u && i.push(a), u && a.isHidden ? n.push(a) : u || a.isHidden || o.push(a)
      }
    }
    return {
      matches: i,
      needReveal: n,
      needHide: o
    }
  }, l._getFilterTest = function (t) {
    return u && this.options.isJQueryFiltering ? function (e) {
      return u(e.element).is(t)
    } : "function" == typeof t ? function (e) {
      return t(e.element)
    } : function (e) {
      return n(e.element, t)
    }
  }, l.updateSortData = function (t) {
    var e;
    t ? (t = o.makeArray(t), e = this.getItems(t)) : e = this.items, this._getSorters(), this._updateItemsSortData(e)
  }, l._getSorters = function () {
    var t = this.options.getSortData;
    for (var e in t) {
      var i = t[e];
      this._sorters[e] = f(i)
    }
  }, l._updateItemsSortData = function (t) {
    for (var e = t && t.length, i = 0; e && e > i; i++) {
      var n = t[i];
      n.updateSortData()
    }
  };
  var f = function () {
    function t(t) {
      if ("string" != typeof t) return t;
      var i = h(t).split(" "),
        n = i[0],
        o = n.match(/^\[(.+)\]$/),
        s = o && o[1],
        r = e(s, n),
        a = d.sortDataParsers[i[1]];
      return t = a ? function (t) {
        return t && a(r(t))
      } : function (t) {
        return t && r(t)
      }
    }

    function e(t, e) {
      return t ? function (e) {
        return e.getAttribute(t)
      } : function (t) {
        var i = t.querySelector(e);
        return i && i.textContent
      }
    }
    return t
  }();
  d.sortDataParsers = {
    parseInt: function (t) {
      return parseInt(t, 10)
    },
    parseFloat: function (t) {
      return parseFloat(t)
    }
  }, l._sort = function () {
    var t = this.options.sortBy;
    if (t) {
      var e = [].concat.apply(t, this.sortHistory),
        i = a(e, this.options.sortAscending);
      this.filteredItems.sort(i), t != this.sortHistory[0] && this.sortHistory.unshift(t)
    }
  }, l._mode = function () {
    var t = this.options.layoutMode,
      e = this.modes[t];
    if (!e) throw new Error("No layout mode: " + t);
    return e.options = this.options[t], e
  }, l._resetLayout = function () {
    e.prototype._resetLayout.call(this), this._mode()._resetLayout()
  }, l._getItemLayoutPosition = function (t) {
    return this._mode()._getItemLayoutPosition(t)
  }, l._manageStamp = function (t) {
    this._mode()._manageStamp(t)
  }, l._getContainerSize = function () {
    return this._mode()._getContainerSize()
  }, l.needsResizeLayout = function () {
    return this._mode().needsResizeLayout()
  }, l.appended = function (t) {
    var e = this.addItems(t);
    if (e.length) {
      var i = this._filterRevealAdded(e);
      this.filteredItems = this.filteredItems.concat(i)
    }
  }, l.prepended = function (t) {
    var e = this._itemize(t);
    if (e.length) {
      this._resetLayout(), this._manageStamps();
      var i = this._filterRevealAdded(e);
      this.layoutItems(this.filteredItems), this.filteredItems = i.concat(this.filteredItems), this.items = e.concat(this.items)
    }
  }, l._filterRevealAdded = function (t) {
    var e = this._filter(t);
    return this.hide(e.needHide), this.reveal(e.matches), this.layoutItems(e.matches, !0), e.matches
  }, l.insert = function (t) {
    var e = this.addItems(t);
    if (e.length) {
      var i, n, o = e.length;
      for (i = 0; o > i; i++) n = e[i], this.element.appendChild(n.element);
      var s = this._filter(e).matches;
      for (i = 0; o > i; i++) e[i].isLayoutInstant = !0;
      for (this.arrange(), i = 0; o > i; i++) delete e[i].isLayoutInstant;
      this.reveal(s)
    }
  };
  var c = l.remove;
  return l.remove = function (t) {
    t = o.makeArray(t);
    var e = this.getItems(t);
    c.call(this, t);
    for (var i = e && e.length, n = 0; i && i > n; n++) {
      var s = e[n];
      o.removeFrom(this.filteredItems, s)
    }
  }, l.shuffle = function () {
    for (var t = 0; t < this.items.length; t++) {
      var e = this.items[t];
      e.sortData.random = Math.random()
    }
    this.options.sortBy = "random", this._sort(), this._layout()
  }, l._noTransition = function (t, e) {
    var i = this.options.transitionDuration;
    this.options.transitionDuration = 0;
    var n = t.apply(this, e);
    return this.options.transitionDuration = i, n
  }, l.getFilteredItemElements = function () {
    return this.filteredItems.map(function (t) {
      return t.element
    })
  }, d
});

/*!
Waypoints - 4.0.1
Copyright Â© 2011-2016 Caleb Troughton
Licensed under the MIT license.
https://github.com/imakewebthings/waypoints/blob/master/licenses.txt
*/
! function () {
  "use strict";

  function t(o) {
    if (!o) throw new Error("No options passed to Waypoint constructor");
    if (!o.element) throw new Error("No element option passed to Waypoint constructor");
    if (!o.handler) throw new Error("No handler option passed to Waypoint constructor");
    this.key = "waypoint-" + e, this.options = t.Adapter.extend({}, t.defaults, o), this.element = this.options.element, this.adapter = new t.Adapter(this.element), this.callback = o.handler, this.axis = this.options.horizontal ? "horizontal" : "vertical", this.enabled = this.options.enabled, this.triggerPoint = null, this.group = t.Group.findOrCreate({
      name: this.options.group,
      axis: this.axis
    }), this.context = t.Context.findOrCreateByElement(this.options.context), t.offsetAliases[this.options.offset] && (this.options.offset = t.offsetAliases[this.options.offset]), this.group.add(this), this.context.add(this), i[this.key] = this, e += 1
  }
  var e = 0,
    i = {};
  t.prototype.queueTrigger = function (t) {
    this.group.queueTrigger(this, t)
  }, t.prototype.trigger = function (t) {
    this.enabled && this.callback && this.callback.apply(this, t)
  }, t.prototype.destroy = function () {
    this.context.remove(this), this.group.remove(this), delete i[this.key]
  }, t.prototype.disable = function () {
    return this.enabled = !1, this
  }, t.prototype.enable = function () {
    return this.context.refresh(), this.enabled = !0, this
  }, t.prototype.next = function () {
    return this.group.next(this)
  }, t.prototype.previous = function () {
    return this.group.previous(this)
  }, t.invokeAll = function (t) {
    var e = [];
    for (var o in i) e.push(i[o]);
    for (var n = 0, r = e.length; r > n; n++) e[n][t]()
  }, t.destroyAll = function () {
    t.invokeAll("destroy")
  }, t.disableAll = function () {
    t.invokeAll("disable")
  }, t.enableAll = function () {
    t.Context.refreshAll();
    for (var e in i) i[e].enabled = !0;
    return this
  }, t.refreshAll = function () {
    t.Context.refreshAll()
  }, t.viewportHeight = function () {
    return window.innerHeight || document.documentElement.clientHeight
  }, t.viewportWidth = function () {
    return document.documentElement.clientWidth
  }, t.adapters = [], t.defaults = {
    context: window,
    continuous: !0,
    enabled: !0,
    group: "default",
    horizontal: !1,
    offset: 0
  }, t.offsetAliases = {
    "bottom-in-view": function () {
      return this.context.innerHeight() - this.adapter.outerHeight()
    },
    "right-in-view": function () {
      return this.context.innerWidth() - this.adapter.outerWidth()
    }
  }, window.Waypoint = t
}(),
function () {
  "use strict";

  function t(t) {
    window.setTimeout(t, 1e3 / 60)
  }

  function e(t) {
    this.element = t, this.Adapter = n.Adapter, this.adapter = new this.Adapter(t), this.key = "waypoint-context-" + i, this.didScroll = !1, this.didResize = !1, this.oldScroll = {
      x: this.adapter.scrollLeft(),
      y: this.adapter.scrollTop()
    }, this.waypoints = {
      vertical: {},
      horizontal: {}
    }, t.waypointContextKey = this.key, o[t.waypointContextKey] = this, i += 1, n.windowContext || (n.windowContext = !0, n.windowContext = new e(window)), this.createThrottledScrollHandler(), this.createThrottledResizeHandler()
  }
  var i = 0,
    o = {},
    n = window.Waypoint,
    r = window.onload;
  e.prototype.add = function (t) {
    var e = t.options.horizontal ? "horizontal" : "vertical";
    this.waypoints[e][t.key] = t, this.refresh()
  }, e.prototype.checkEmpty = function () {
    var t = this.Adapter.isEmptyObject(this.waypoints.horizontal),
      e = this.Adapter.isEmptyObject(this.waypoints.vertical),
      i = this.element == this.element.window;
    t && e && !i && (this.adapter.off(".waypoints"), delete o[this.key])
  }, e.prototype.createThrottledResizeHandler = function () {
    function t() {
      e.handleResize(), e.didResize = !1
    }
    var e = this;
    this.adapter.on("resize.waypoints", function () {
      e.didResize || (e.didResize = !0, n.requestAnimationFrame(t))
    })
  }, e.prototype.createThrottledScrollHandler = function () {
    function t() {
      e.handleScroll(), e.didScroll = !1
    }
    var e = this;
    this.adapter.on("scroll.waypoints", function () {
      (!e.didScroll || n.isTouch) && (e.didScroll = !0, n.requestAnimationFrame(t))
    })
  }, e.prototype.handleResize = function () {
    n.Context.refreshAll()
  }, e.prototype.handleScroll = function () {
    var t = {},
      e = {
        horizontal: {
          newScroll: this.adapter.scrollLeft(),
          oldScroll: this.oldScroll.x,
          forward: "right",
          backward: "left"
        },
        vertical: {
          newScroll: this.adapter.scrollTop(),
          oldScroll: this.oldScroll.y,
          forward: "down",
          backward: "up"
        }
      };
    for (var i in e) {
      var o = e[i],
        n = o.newScroll > o.oldScroll,
        r = n ? o.forward : o.backward;
      for (var s in this.waypoints[i]) {
        var a = this.waypoints[i][s];
        if (null !== a.triggerPoint) {
          var l = o.oldScroll < a.triggerPoint,
            h = o.newScroll >= a.triggerPoint,
            p = l && h,
            u = !l && !h;
          (p || u) && (a.queueTrigger(r), t[a.group.id] = a.group)
        }
      }
    }
    for (var c in t) t[c].flushTriggers();
    this.oldScroll = {
      x: e.horizontal.newScroll,
      y: e.vertical.newScroll
    }
  }, e.prototype.innerHeight = function () {
    return this.element == this.element.window ? n.viewportHeight() : this.adapter.innerHeight()
  }, e.prototype.remove = function (t) {
    delete this.waypoints[t.axis][t.key], this.checkEmpty()
  }, e.prototype.innerWidth = function () {
    return this.element == this.element.window ? n.viewportWidth() : this.adapter.innerWidth()
  }, e.prototype.destroy = function () {
    var t = [];
    for (var e in this.waypoints)
      for (var i in this.waypoints[e]) t.push(this.waypoints[e][i]);
    for (var o = 0, n = t.length; n > o; o++) t[o].destroy()
  }, e.prototype.refresh = function () {
    var t, e = this.element == this.element.window,
      i = e ? void 0 : this.adapter.offset(),
      o = {};
    this.handleScroll(), t = {
      horizontal: {
        contextOffset: e ? 0 : i.left,
        contextScroll: e ? 0 : this.oldScroll.x,
        contextDimension: this.innerWidth(),
        oldScroll: this.oldScroll.x,
        forward: "right",
        backward: "left",
        offsetProp: "left"
      },
      vertical: {
        contextOffset: e ? 0 : i.top,
        contextScroll: e ? 0 : this.oldScroll.y,
        contextDimension: this.innerHeight(),
        oldScroll: this.oldScroll.y,
        forward: "down",
        backward: "up",
        offsetProp: "top"
      }
    };
    for (var r in t) {
      var s = t[r];
      for (var a in this.waypoints[r]) {
        var l, h, p, u, c, d = this.waypoints[r][a],
          f = d.options.offset,
          w = d.triggerPoint,
          y = 0,
          g = null == w;
        d.element !== d.element.window && (y = d.adapter.offset()[s.offsetProp]), "function" == typeof f ? f = f.apply(d) : "string" == typeof f && (f = parseFloat(f), d.options.offset.indexOf("%") > -1 && (f = Math.ceil(s.contextDimension * f / 100))), l = s.contextScroll - s.contextOffset, d.triggerPoint = Math.floor(y + l - f), h = w < s.oldScroll, p = d.triggerPoint >= s.oldScroll, u = h && p, c = !h && !p, !g && u ? (d.queueTrigger(s.backward), o[d.group.id] = d.group) : !g && c ? (d.queueTrigger(s.forward), o[d.group.id] = d.group) : g && s.oldScroll >= d.triggerPoint && (d.queueTrigger(s.forward), o[d.group.id] = d.group)
      }
    }
    return n.requestAnimationFrame(function () {
      for (var t in o) o[t].flushTriggers()
    }), this
  }, e.findOrCreateByElement = function (t) {
    return e.findByElement(t) || new e(t)
  }, e.refreshAll = function () {
    for (var t in o) o[t].refresh()
  }, e.findByElement = function (t) {
    return o[t.waypointContextKey]
  }, window.onload = function () {
    r && r(), e.refreshAll()
  }, n.requestAnimationFrame = function (e) {
    var i = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || t;
    i.call(window, e)
  }, n.Context = e
}(),
function () {
  "use strict";

  function t(t, e) {
    return t.triggerPoint - e.triggerPoint
  }

  function e(t, e) {
    return e.triggerPoint - t.triggerPoint
  }

  function i(t) {
    this.name = t.name, this.axis = t.axis, this.id = this.name + "-" + this.axis, this.waypoints = [], this.clearTriggerQueues(), o[this.axis][this.name] = this
  }
  var o = {
      vertical: {},
      horizontal: {}
    },
    n = window.Waypoint;
  i.prototype.add = function (t) {
    this.waypoints.push(t)
  }, i.prototype.clearTriggerQueues = function () {
    this.triggerQueues = {
      up: [],
      down: [],
      left: [],
      right: []
    }
  }, i.prototype.flushTriggers = function () {
    for (var i in this.triggerQueues) {
      var o = this.triggerQueues[i],
        n = "up" === i || "left" === i;
      o.sort(n ? e : t);
      for (var r = 0, s = o.length; s > r; r += 1) {
        var a = o[r];
        (a.options.continuous || r === o.length - 1) && a.trigger([i])
      }
    }
    this.clearTriggerQueues()
  }, i.prototype.next = function (e) {
    this.waypoints.sort(t);
    var i = n.Adapter.inArray(e, this.waypoints),
      o = i === this.waypoints.length - 1;
    return o ? null : this.waypoints[i + 1]
  }, i.prototype.previous = function (e) {
    this.waypoints.sort(t);
    var i = n.Adapter.inArray(e, this.waypoints);
    return i ? this.waypoints[i - 1] : null
  }, i.prototype.queueTrigger = function (t, e) {
    this.triggerQueues[e].push(t)
  }, i.prototype.remove = function (t) {
    var e = n.Adapter.inArray(t, this.waypoints);
    e > -1 && this.waypoints.splice(e, 1)
  }, i.prototype.first = function () {
    return this.waypoints[0]
  }, i.prototype.last = function () {
    return this.waypoints[this.waypoints.length - 1]
  }, i.findOrCreate = function (t) {
    return o[t.axis][t.name] || new i(t)
  }, n.Group = i
}(),
function () {
  "use strict";

  function t(t) {
    this.$element = e(t)
  }
  var e = window.jQuery,
    i = window.Waypoint;
  e.each(["innerHeight", "innerWidth", "off", "offset", "on", "outerHeight", "outerWidth", "scrollLeft", "scrollTop"], function (e, i) {
    t.prototype[i] = function () {
      var t = Array.prototype.slice.call(arguments);
      return this.$element[i].apply(this.$element, t)
    }
  }), e.each(["extend", "inArray", "isEmptyObject"], function (i, o) {
    t[o] = e[o]
  }), i.adapters.push({
    name: "jquery",
    Adapter: t
  }), i.Adapter = t
}(),
function () {
  "use strict";

  function t(t) {
    return function () {
      var i = [],
        o = arguments[0];
      return t.isFunction(arguments[0]) && (o = t.extend({}, arguments[1]), o.handler = arguments[0]), this.each(function () {
        var n = t.extend({}, o, {
          element: this
        });
        "string" == typeof n.context && (n.context = t(this).closest(n.context)[0]), i.push(new e(n))
      }), i
    }
  }
  var e = window.Waypoint;
  window.jQuery && (window.jQuery.fn.waypoint = t(window.jQuery)), window.Zepto && (window.Zepto.fn.waypoint = t(window.Zepto))
}();

/*!
 * jquery.counterup.js 2.0.5
 *
 * Copyright 2013, Benjamin Intal http://gambit.ph @bfintal
 * Released under the GPL v2 License
 *
 * Amended by Jeremy Paris, Ciro Mattia Gonano and others
 *
 * Date: Jun 21, 2016
 */
! function (t) {
  "use strict";
  t.fn.counterUp = function (a) {
    var e, n = t.extend({
      time: 400,
      delay: 10,
      formatter: !1,
      callback: function () {}
    }, a);
    return this.each(function () {
      var a = t(this),
        u = {
          time: t(this).data("counterup-time") || n.time,
          delay: t(this).data("counterup-delay") || n.delay
        },
        r = function () {
          var t = [],
            r = u.time / u.delay,
            o = a.text(),
            c = /[0-9]+,[0-9]+/.test(o);
          o = o.replace(/,/g, "");
          var i = (o.split(".")[1] || []).length,
            l = /[0-9]+:[0-9]+:[0-9]+/.test(o);
          if (l) {
            var s = o.split(":"),
              d = 1;
            for (e = 0; s.length > 0;) e += d * parseInt(s.pop(), 10), d *= 60
          }
          for (var f = r; f >= 1; f--) {
            var p = parseFloat(o / r * f).toFixed(i);
            if (l) {
              p = parseInt(e / r * f);
              var m = parseInt(p / 3600) % 24,
                h = parseInt(p / 60) % 60,
                v = parseInt(p % 60, 10);
              p = (10 > m ? "0" + m : m) + ":" + (10 > h ? "0" + h : h) + ":" + (10 > v ? "0" + v : v)
            }
            if (c)
              for (;
                /(\d+)(\d{3})/.test(p.toString());) p = p.toString().replace(/(\d+)(\d{3})/, "$1,$2");
            n.formatter && (p = n.formatter.call(this, p)), t.unshift(p)
          }
          a.data("counterup-nums", t), a.text("0");
          var y = function () {
            return a.data("counterup-nums") ? (a.html(a.data("counterup-nums").shift()), void(a.data("counterup-nums").length ? setTimeout(a.data("counterup-func"), u.delay) : (a.data("counterup-nums", null), a.data("counterup-func", null), n.callback.call(this)))) : void n.callback.call(this)
          };
          a.data("counterup-func", y), setTimeout(a.data("counterup-func"), u.delay)
        };
      a.waypoint(function (t) {
        r(), this.destroy()
      }, {
        offset: "100%"
      })
    })
  }
}(jQuery);

/*! Magnific Popup - v1.1.0 - 2016-02-20
 * http://dimsemenov.com/plugins/magnific-popup/
 * Copyright (c) 2016 Dmitry Semenov; */
! function (a) {
  "function" == typeof define && define.amd ? define(["jquery"], a) : a("object" == typeof exports ? require("jquery") : window.jQuery || window.Zepto)
}(function (a) {
  var b, c, d, e, f, g, h = "Close",
    i = "BeforeClose",
    j = "AfterClose",
    k = "BeforeAppend",
    l = "MarkupParse",
    m = "Open",
    n = "Change",
    o = "mfp",
    p = "." + o,
    q = "mfp-ready",
    r = "mfp-removing",
    s = "mfp-prevent-close",
    t = function () {},
    u = !!window.jQuery,
    v = a(window),
    w = function (a, c) {
      b.ev.on(o + a + p, c)
    },
    x = function (b, c, d, e) {
      var f = document.createElement("div");
      return f.className = "mfp-" + b, d && (f.innerHTML = d), e ? c && c.appendChild(f) : (f = a(f), c && f.appendTo(c)), f
    },
    y = function (c, d) {
      b.ev.triggerHandler(o + c, d), b.st.callbacks && (c = c.charAt(0).toLowerCase() + c.slice(1), b.st.callbacks[c] && b.st.callbacks[c].apply(b, a.isArray(d) ? d : [d]))
    },
    z = function (c) {
      return c === g && b.currTemplate.closeBtn || (b.currTemplate.closeBtn = a(b.st.closeMarkup.replace("%title%", b.st.tClose)), g = c), b.currTemplate.closeBtn
    },
    A = function () {
      a.magnificPopup.instance || (b = new t, b.init(), a.magnificPopup.instance = b)
    },
    B = function () {
      var a = document.createElement("p").style,
        b = ["ms", "O", "Moz", "Webkit"];
      if (void 0 !== a.transition) return !0;
      for (; b.length;)
        if (b.pop() + "Transition" in a) return !0;
      return !1
    };
  t.prototype = {
    constructor: t,
    init: function () {
      var c = navigator.appVersion;
      b.isLowIE = b.isIE8 = document.all && !document.addEventListener, b.isAndroid = /android/gi.test(c), b.isIOS = /iphone|ipad|ipod/gi.test(c), b.supportsTransition = B(), b.probablyMobile = b.isAndroid || b.isIOS || /(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(navigator.userAgent), d = a(document), b.popupsCache = {}
    },
    open: function (c) {
      var e;
      if (c.isObj === !1) {
        b.items = c.items.toArray(), b.index = 0;
        var g, h = c.items;
        for (e = 0; e < h.length; e++)
          if (g = h[e], g.parsed && (g = g.el[0]), g === c.el[0]) {
            b.index = e;
            break
          }
      } else b.items = a.isArray(c.items) ? c.items : [c.items], b.index = c.index || 0;
      if (b.isOpen) return void b.updateItemHTML();
      b.types = [], f = "", c.mainEl && c.mainEl.length ? b.ev = c.mainEl.eq(0) : b.ev = d, c.key ? (b.popupsCache[c.key] || (b.popupsCache[c.key] = {}), b.currTemplate = b.popupsCache[c.key]) : b.currTemplate = {}, b.st = a.extend(!0, {}, a.magnificPopup.defaults, c), b.fixedContentPos = "auto" === b.st.fixedContentPos ? !b.probablyMobile : b.st.fixedContentPos, b.st.modal && (b.st.closeOnContentClick = !1, b.st.closeOnBgClick = !1, b.st.showCloseBtn = !1, b.st.enableEscapeKey = !1), b.bgOverlay || (b.bgOverlay = x("bg").on("click" + p, function () {
        b.close()
      }), b.wrap = x("wrap").attr("tabindex", -1).on("click" + p, function (a) {
        b._checkIfClose(a.target) && b.close()
      }), b.container = x("container", b.wrap)), b.contentContainer = x("content"), b.st.preloader && (b.preloader = x("preloader", b.container, b.st.tLoading));
      var i = a.magnificPopup.modules;
      for (e = 0; e < i.length; e++) {
        var j = i[e];
        j = j.charAt(0).toUpperCase() + j.slice(1), b["init" + j].call(b)
      }
      y("BeforeOpen"), b.st.showCloseBtn && (b.st.closeBtnInside ? (w(l, function (a, b, c, d) {
        c.close_replaceWith = z(d.type)
      }), f += " mfp-close-btn-in") : b.wrap.append(z())), b.st.alignTop && (f += " mfp-align-top"), b.fixedContentPos ? b.wrap.css({
        overflow: b.st.overflowY,
        overflowX: "hidden",
        overflowY: b.st.overflowY
      }) : b.wrap.css({
        top: v.scrollTop(),
        position: "absolute"
      }), (b.st.fixedBgPos === !1 || "auto" === b.st.fixedBgPos && !b.fixedContentPos) && b.bgOverlay.css({
        height: d.height(),
        position: "absolute"
      }), b.st.enableEscapeKey && d.on("keyup" + p, function (a) {
        27 === a.keyCode && b.close()
      }), v.on("resize" + p, function () {
        b.updateSize()
      }), b.st.closeOnContentClick || (f += " mfp-auto-cursor"), f && b.wrap.addClass(f);
      var k = b.wH = v.height(),
        n = {};
      if (b.fixedContentPos && b._hasScrollBar(k)) {
        var o = b._getScrollbarSize();
        o && (n.marginRight = o)
      }
      b.fixedContentPos && (b.isIE7 ? a("body, html").css("overflow", "hidden") : n.overflow = "hidden");
      var r = b.st.mainClass;
      return b.isIE7 && (r += " mfp-ie7"), r && b._addClassToMFP(r), b.updateItemHTML(), y("BuildControls"), a("html").css(n), b.bgOverlay.add(b.wrap).prependTo(b.st.prependTo || a(document.body)), b._lastFocusedEl = document.activeElement, setTimeout(function () {
        b.content ? (b._addClassToMFP(q), b._setFocus()) : b.bgOverlay.addClass(q), d.on("focusin" + p, b._onFocusIn)
      }, 16), b.isOpen = !0, b.updateSize(k), y(m), c
    },
    close: function () {
      b.isOpen && (y(i), b.isOpen = !1, b.st.removalDelay && !b.isLowIE && b.supportsTransition ? (b._addClassToMFP(r), setTimeout(function () {
        b._close()
      }, b.st.removalDelay)) : b._close())
    },
    _close: function () {
      y(h);
      var c = r + " " + q + " ";
      if (b.bgOverlay.detach(), b.wrap.detach(), b.container.empty(), b.st.mainClass && (c += b.st.mainClass + " "), b._removeClassFromMFP(c), b.fixedContentPos) {
        var e = {
          marginRight: ""
        };
        b.isIE7 ? a("body, html").css("overflow", "") : e.overflow = "", a("html").css(e)
      }
      d.off("keyup" + p + " focusin" + p), b.ev.off(p), b.wrap.attr("class", "mfp-wrap").removeAttr("style"), b.bgOverlay.attr("class", "mfp-bg"), b.container.attr("class", "mfp-container"), !b.st.showCloseBtn || b.st.closeBtnInside && b.currTemplate[b.currItem.type] !== !0 || b.currTemplate.closeBtn && b.currTemplate.closeBtn.detach(), b.st.autoFocusLast && b._lastFocusedEl && a(b._lastFocusedEl).focus(), b.currItem = null, b.content = null, b.currTemplate = null, b.prevHeight = 0, y(j)
    },
    updateSize: function (a) {
      if (b.isIOS) {
        var c = document.documentElement.clientWidth / window.innerWidth,
          d = window.innerHeight * c;
        b.wrap.css("height", d), b.wH = d
      } else b.wH = a || v.height();
      b.fixedContentPos || b.wrap.css("height", b.wH), y("Resize")
    },
    updateItemHTML: function () {
      var c = b.items[b.index];
      b.contentContainer.detach(), b.content && b.content.detach(), c.parsed || (c = b.parseEl(b.index));
      var d = c.type;
      if (y("BeforeChange", [b.currItem ? b.currItem.type : "", d]), b.currItem = c, !b.currTemplate[d]) {
        var f = b.st[d] ? b.st[d].markup : !1;
        y("FirstMarkupParse", f), f ? b.currTemplate[d] = a(f) : b.currTemplate[d] = !0
      }
      e && e !== c.type && b.container.removeClass("mfp-" + e + "-holder");
      var g = b["get" + d.charAt(0).toUpperCase() + d.slice(1)](c, b.currTemplate[d]);
      b.appendContent(g, d), c.preloaded = !0, y(n, c), e = c.type, b.container.prepend(b.contentContainer), y("AfterChange")
    },
    appendContent: function (a, c) {
      b.content = a, a ? b.st.showCloseBtn && b.st.closeBtnInside && b.currTemplate[c] === !0 ? b.content.find(".mfp-close").length || b.content.append(z()) : b.content = a : b.content = "", y(k), b.container.addClass("mfp-" + c + "-holder"), b.contentContainer.append(b.content)
    },
    parseEl: function (c) {
      var d, e = b.items[c];
      if (e.tagName ? e = {
          el: a(e)
        } : (d = e.type, e = {
          data: e,
          src: e.src
        }), e.el) {
        for (var f = b.types, g = 0; g < f.length; g++)
          if (e.el.hasClass("mfp-" + f[g])) {
            d = f[g];
            break
          } e.src = e.el.attr("data-mfp-src"), e.src || (e.src = e.el.attr("href"))
      }
      return e.type = d || b.st.type || "inline", e.index = c, e.parsed = !0, b.items[c] = e, y("ElementParse", e), b.items[c]
    },
    addGroup: function (a, c) {
      var d = function (d) {
        d.mfpEl = this, b._openClick(d, a, c)
      };
      c || (c = {});
      var e = "click.magnificPopup";
      c.mainEl = a, c.items ? (c.isObj = !0, a.off(e).on(e, d)) : (c.isObj = !1, c.delegate ? a.off(e).on(e, c.delegate, d) : (c.items = a, a.off(e).on(e, d)))
    },
    _openClick: function (c, d, e) {
      var f = void 0 !== e.midClick ? e.midClick : a.magnificPopup.defaults.midClick;
      if (f || !(2 === c.which || c.ctrlKey || c.metaKey || c.altKey || c.shiftKey)) {
        var g = void 0 !== e.disableOn ? e.disableOn : a.magnificPopup.defaults.disableOn;
        if (g)
          if (a.isFunction(g)) {
            if (!g.call(b)) return !0
          } else if (v.width() < g) return !0;
        c.type && (c.preventDefault(), b.isOpen && c.stopPropagation()), e.el = a(c.mfpEl), e.delegate && (e.items = d.find(e.delegate)), b.open(e)
      }
    },
    updateStatus: function (a, d) {
      if (b.preloader) {
        c !== a && b.container.removeClass("mfp-s-" + c), d || "loading" !== a || (d = b.st.tLoading);
        var e = {
          status: a,
          text: d
        };
        y("UpdateStatus", e), a = e.status, d = e.text, b.preloader.html(d), b.preloader.find("a").on("click", function (a) {
          a.stopImmediatePropagation()
        }), b.container.addClass("mfp-s-" + a), c = a
      }
    },
    _checkIfClose: function (c) {
      if (!a(c).hasClass(s)) {
        var d = b.st.closeOnContentClick,
          e = b.st.closeOnBgClick;
        if (d && e) return !0;
        if (!b.content || a(c).hasClass("mfp-close") || b.preloader && c === b.preloader[0]) return !0;
        if (c === b.content[0] || a.contains(b.content[0], c)) {
          if (d) return !0
        } else if (e && a.contains(document, c)) return !0;
        return !1
      }
    },
    _addClassToMFP: function (a) {
      b.bgOverlay.addClass(a), b.wrap.addClass(a)
    },
    _removeClassFromMFP: function (a) {
      this.bgOverlay.removeClass(a), b.wrap.removeClass(a)
    },
    _hasScrollBar: function (a) {
      return (b.isIE7 ? d.height() : document.body.scrollHeight) > (a || v.height())
    },
    _setFocus: function () {
      (b.st.focus ? b.content.find(b.st.focus).eq(0) : b.wrap).focus()
    },
    _onFocusIn: function (c) {
      return c.target === b.wrap[0] || a.contains(b.wrap[0], c.target) ? void 0 : (b._setFocus(), !1)
    },
    _parseMarkup: function (b, c, d) {
      var e;
      d.data && (c = a.extend(d.data, c)), y(l, [b, c, d]), a.each(c, function (c, d) {
        if (void 0 === d || d === !1) return !0;
        if (e = c.split("_"), e.length > 1) {
          var f = b.find(p + "-" + e[0]);
          if (f.length > 0) {
            var g = e[1];
            "replaceWith" === g ? f[0] !== d[0] && f.replaceWith(d) : "img" === g ? f.is("img") ? f.attr("src", d) : f.replaceWith(a("<img>").attr("src", d).attr("class", f.attr("class"))) : f.attr(e[1], d)
          }
        } else b.find(p + "-" + c).html(d)
      })
    },
    _getScrollbarSize: function () {
      if (void 0 === b.scrollbarSize) {
        var a = document.createElement("div");
        a.style.cssText = "width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;", document.body.appendChild(a), b.scrollbarSize = a.offsetWidth - a.clientWidth, document.body.removeChild(a)
      }
      return b.scrollbarSize
    }
  }, a.magnificPopup = {
    instance: null,
    proto: t.prototype,
    modules: [],
    open: function (b, c) {
      return A(), b = b ? a.extend(!0, {}, b) : {}, b.isObj = !0, b.index = c || 0, this.instance.open(b)
    },
    close: function () {
      return a.magnificPopup.instance && a.magnificPopup.instance.close()
    },
    registerModule: function (b, c) {
      c.options && (a.magnificPopup.defaults[b] = c.options), a.extend(this.proto, c.proto), this.modules.push(b)
    },
    defaults: {
      disableOn: 0,
      key: null,
      midClick: !1,
      mainClass: "",
      preloader: !0,
      focus: "",
      closeOnContentClick: !1,
      closeOnBgClick: !0,
      closeBtnInside: !0,
      showCloseBtn: !0,
      enableEscapeKey: !0,
      modal: !1,
      alignTop: !1,
      removalDelay: 0,
      prependTo: null,
      fixedContentPos: "auto",
      fixedBgPos: "auto",
      overflowY: "auto",
      closeMarkup: '<button title="%title%" type="button" class="mfp-close">&#215;</button>',
      tClose: "Close (Esc)",
      tLoading: "Loading...",
      autoFocusLast: !0
    }
  }, a.fn.magnificPopup = function (c) {
    A();
    var d = a(this);
    if ("string" == typeof c)
      if ("open" === c) {
        var e, f = u ? d.data("magnificPopup") : d[0].magnificPopup,
          g = parseInt(arguments[1], 10) || 0;
        f.items ? e = f.items[g] : (e = d, f.delegate && (e = e.find(f.delegate)), e = e.eq(g)), b._openClick({
          mfpEl: e
        }, d, f)
      } else b.isOpen && b[c].apply(b, Array.prototype.slice.call(arguments, 1));
    else c = a.extend(!0, {}, c), u ? d.data("magnificPopup", c) : d[0].magnificPopup = c, b.addGroup(d, c);
    return d
  };
  var C, D, E, F = "inline",
    G = function () {
      E && (D.after(E.addClass(C)).detach(), E = null)
    };
  a.magnificPopup.registerModule(F, {
    options: {
      hiddenClass: "hide",
      markup: "",
      tNotFound: "Content not found"
    },
    proto: {
      initInline: function () {
        b.types.push(F), w(h + "." + F, function () {
          G()
        })
      },
      getInline: function (c, d) {
        if (G(), c.src) {
          var e = b.st.inline,
            f = a(c.src);
          if (f.length) {
            var g = f[0].parentNode;
            g && g.tagName && (D || (C = e.hiddenClass, D = x(C), C = "mfp-" + C), E = f.after(D).detach().removeClass(C)), b.updateStatus("ready")
          } else b.updateStatus("error", e.tNotFound), f = a("<div>");
          return c.inlineElement = f, f
        }
        return b.updateStatus("ready"), b._parseMarkup(d, {}, c), d
      }
    }
  });
  var H, I = "ajax",
    J = function () {
      H && a(document.body).removeClass(H)
    },
    K = function () {
      J(), b.req && b.req.abort()
    };
  a.magnificPopup.registerModule(I, {
    options: {
      settings: null,
      cursor: "mfp-ajax-cur",
      tError: '<a href="%url%">The content</a> could not be loaded.'
    },
    proto: {
      initAjax: function () {
        b.types.push(I), H = b.st.ajax.cursor, w(h + "." + I, K), w("BeforeChange." + I, K)
      },
      getAjax: function (c) {
        H && a(document.body).addClass(H), b.updateStatus("loading");
        var d = a.extend({
          url: c.src,
          success: function (d, e, f) {
            var g = {
              data: d,
              xhr: f
            };
            y("ParseAjax", g), b.appendContent(a(g.data), I), c.finished = !0, J(), b._setFocus(), setTimeout(function () {
              b.wrap.addClass(q)
            }, 16), b.updateStatus("ready"), y("AjaxContentAdded")
          },
          error: function () {
            J(), c.finished = c.loadError = !0, b.updateStatus("error", b.st.ajax.tError.replace("%url%", c.src))
          }
        }, b.st.ajax.settings);
        return b.req = a.ajax(d), ""
      }
    }
  });
  var L, M = function (c) {
    if (c.data && void 0 !== c.data.title) return c.data.title;
    var d = b.st.image.titleSrc;
    if (d) {
      if (a.isFunction(d)) return d.call(b, c);
      if (c.el) return c.el.attr(d) || ""
    }
    return ""
  };
  a.magnificPopup.registerModule("image", {
    options: {
      markup: '<div class="mfp-figure"><div class="mfp-close"></div><figure><div class="mfp-img"></div><figcaption><div class="mfp-bottom-bar"><div class="mfp-title"></div><div class="mfp-counter"></div></div></figcaption></figure></div>',
      cursor: "mfp-zoom-out-cur",
      titleSrc: "title",
      verticalFit: !0,
      tError: '<a href="%url%">The image</a> could not be loaded.'
    },
    proto: {
      initImage: function () {
        var c = b.st.image,
          d = ".image";
        b.types.push("image"), w(m + d, function () {
          "image" === b.currItem.type && c.cursor && a(document.body).addClass(c.cursor)
        }), w(h + d, function () {
          c.cursor && a(document.body).removeClass(c.cursor), v.off("resize" + p)
        }), w("Resize" + d, b.resizeImage), b.isLowIE && w("AfterChange", b.resizeImage)
      },
      resizeImage: function () {
        var a = b.currItem;
        if (a && a.img && b.st.image.verticalFit) {
          var c = 0;
          b.isLowIE && (c = parseInt(a.img.css("padding-top"), 10) + parseInt(a.img.css("padding-bottom"), 10)), a.img.css("max-height", b.wH - c)
        }
      },
      _onImageHasSize: function (a) {
        a.img && (a.hasSize = !0, L && clearInterval(L), a.isCheckingImgSize = !1, y("ImageHasSize", a), a.imgHidden && (b.content && b.content.removeClass("mfp-loading"), a.imgHidden = !1))
      },
      findImageSize: function (a) {
        var c = 0,
          d = a.img[0],
          e = function (f) {
            L && clearInterval(L), L = setInterval(function () {
              return d.naturalWidth > 0 ? void b._onImageHasSize(a) : (c > 200 && clearInterval(L), c++, void(3 === c ? e(10) : 40 === c ? e(50) : 100 === c && e(500)))
            }, f)
          };
        e(1)
      },
      getImage: function (c, d) {
        var e = 0,
          f = function () {
            c && (c.img[0].complete ? (c.img.off(".mfploader"), c === b.currItem && (b._onImageHasSize(c), b.updateStatus("ready")), c.hasSize = !0, c.loaded = !0, y("ImageLoadComplete")) : (e++, 200 > e ? setTimeout(f, 100) : g()))
          },
          g = function () {
            c && (c.img.off(".mfploader"), c === b.currItem && (b._onImageHasSize(c), b.updateStatus("error", h.tError.replace("%url%", c.src))), c.hasSize = !0, c.loaded = !0, c.loadError = !0)
          },
          h = b.st.image,
          i = d.find(".mfp-img");
        if (i.length) {
          var j = document.createElement("img");
          j.className = "mfp-img", c.el && c.el.find("img").length && (j.alt = c.el.find("img").attr("alt")), c.img = a(j).on("load.mfploader", f).on("error.mfploader", g), j.src = c.src, i.is("img") && (c.img = c.img.clone()), j = c.img[0], j.naturalWidth > 0 ? c.hasSize = !0 : j.width || (c.hasSize = !1)
        }
        return b._parseMarkup(d, {
          title: M(c),
          img_replaceWith: c.img
        }, c), b.resizeImage(), c.hasSize ? (L && clearInterval(L), c.loadError ? (d.addClass("mfp-loading"), b.updateStatus("error", h.tError.replace("%url%", c.src))) : (d.removeClass("mfp-loading"), b.updateStatus("ready")), d) : (b.updateStatus("loading"), c.loading = !0, c.hasSize || (c.imgHidden = !0, d.addClass("mfp-loading"), b.findImageSize(c)), d)
      }
    }
  });
  var N, O = function () {
    return void 0 === N && (N = void 0 !== document.createElement("p").style.MozTransform), N
  };
  a.magnificPopup.registerModule("zoom", {
    options: {
      enabled: !1,
      easing: "ease-in-out",
      duration: 300,
      opener: function (a) {
        return a.is("img") ? a : a.find("img")
      }
    },
    proto: {
      initZoom: function () {
        var a, c = b.st.zoom,
          d = ".zoom";
        if (c.enabled && b.supportsTransition) {
          var e, f, g = c.duration,
            j = function (a) {
              var b = a.clone().removeAttr("style").removeAttr("class").addClass("mfp-animated-image"),
                d = "all " + c.duration / 1e3 + "s " + c.easing,
                e = {
                  position: "fixed",
                  zIndex: 9999,
                  left: 0,
                  top: 0,
                  "-webkit-backface-visibility": "hidden"
                },
                f = "transition";
              return e["-webkit-" + f] = e["-moz-" + f] = e["-o-" + f] = e[f] = d, b.css(e), b
            },
            k = function () {
              b.content.css("visibility", "visible")
            };
          w("BuildControls" + d, function () {
            if (b._allowZoom()) {
              if (clearTimeout(e), b.content.css("visibility", "hidden"), a = b._getItemToZoom(), !a) return void k();
              f = j(a), f.css(b._getOffset()), b.wrap.append(f), e = setTimeout(function () {
                f.css(b._getOffset(!0)), e = setTimeout(function () {
                  k(), setTimeout(function () {
                    f.remove(), a = f = null, y("ZoomAnimationEnded")
                  }, 16)
                }, g)
              }, 16)
            }
          }), w(i + d, function () {
            if (b._allowZoom()) {
              if (clearTimeout(e), b.st.removalDelay = g, !a) {
                if (a = b._getItemToZoom(), !a) return;
                f = j(a)
              }
              f.css(b._getOffset(!0)), b.wrap.append(f), b.content.css("visibility", "hidden"), setTimeout(function () {
                f.css(b._getOffset())
              }, 16)
            }
          }), w(h + d, function () {
            b._allowZoom() && (k(), f && f.remove(), a = null)
          })
        }
      },
      _allowZoom: function () {
        return "image" === b.currItem.type
      },
      _getItemToZoom: function () {
        return b.currItem.hasSize ? b.currItem.img : !1
      },
      _getOffset: function (c) {
        var d;
        d = c ? b.currItem.img : b.st.zoom.opener(b.currItem.el || b.currItem);
        var e = d.offset(),
          f = parseInt(d.css("padding-top"), 10),
          g = parseInt(d.css("padding-bottom"), 10);
        e.top -= a(window).scrollTop() - f;
        var h = {
          width: d.width(),
          height: (u ? d.innerHeight() : d[0].offsetHeight) - g - f
        };
        return O() ? h["-moz-transform"] = h.transform = "translate(" + e.left + "px," + e.top + "px)" : (h.left = e.left, h.top = e.top), h
      }
    }
  });
  var P = "iframe",
    Q = "//about:blank",
    R = function (a) {
      if (b.currTemplate[P]) {
        var c = b.currTemplate[P].find("iframe");
        c.length && (a || (c[0].src = Q), b.isIE8 && c.css("display", a ? "block" : "none"))
      }
    };
  a.magnificPopup.registerModule(P, {
    options: {
      markup: '<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe></div>',
      srcAction: "iframe_src",
      patterns: {
        youtube: {
          index: "youtube.com",
          id: "v=",
          src: "http://www.youtube.com/embed/%id%?autoplay=1"
        },
        vimeo: {
          index: "vimeo.com/",
          id: "/",
          src: "http://player.vimeo.com/video/%id%?autoplay=1"
        },
        gmaps: {
          index: "http://maps.google.",
          src: "%id%&output=embed"
        }
      }
    },
    proto: {
      initIframe: function () {
        b.types.push(P), w("BeforeChange", function (a, b, c) {
          b !== c && (b === P ? R() : c === P && R(!0))
        }), w(h + "." + P, function () {
          R()
        })
      },
      getIframe: function (c, d) {
        var e = c.src,
          f = b.st.iframe;
        a.each(f.patterns, function () {
          return e.indexOf(this.index) > -1 ? (this.id && (e = "string" == typeof this.id ? e.substr(e.lastIndexOf(this.id) + this.id.length, e.length) : this.id.call(this, e)), e = this.src.replace("%id%", e), !1) : void 0
        });
        var g = {};
        return f.srcAction && (g[f.srcAction] = e), b._parseMarkup(d, g, c), b.updateStatus("ready"), d
      }
    }
  });
  var S = function (a) {
      var c = b.items.length;
      return a > c - 1 ? a - c : 0 > a ? c + a : a
    },
    T = function (a, b, c) {
      return a.replace(/%curr%/gi, b + 1).replace(/%total%/gi, c)
    };
  a.magnificPopup.registerModule("gallery", {
    options: {
      enabled: !1,
      arrowMarkup: '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',
      preload: [0, 2],
      navigateByImgClick: !0,
      arrows: !0,
      tPrev: "Previous (Left arrow key)",
      tNext: "Next (Right arrow key)",
      tCounter: "%curr% of %total%"
    },
    proto: {
      initGallery: function () {
        var c = b.st.gallery,
          e = ".mfp-gallery";
        return b.direction = !0, c && c.enabled ? (f += " mfp-gallery", w(m + e, function () {
          c.navigateByImgClick && b.wrap.on("click" + e, ".mfp-img", function () {
            return b.items.length > 1 ? (b.next(), !1) : void 0
          }), d.on("keydown" + e, function (a) {
            37 === a.keyCode ? b.prev() : 39 === a.keyCode && b.next()
          })
        }), w("UpdateStatus" + e, function (a, c) {
          c.text && (c.text = T(c.text, b.currItem.index, b.items.length))
        }), w(l + e, function (a, d, e, f) {
          var g = b.items.length;
          e.counter = g > 1 ? T(c.tCounter, f.index, g) : ""
        }), w("BuildControls" + e, function () {
          if (b.items.length > 1 && c.arrows && !b.arrowLeft) {
            var d = c.arrowMarkup,
              e = b.arrowLeft = a(d.replace(/%title%/gi, c.tPrev).replace(/%dir%/gi, "left")).addClass(s),
              f = b.arrowRight = a(d.replace(/%title%/gi, c.tNext).replace(/%dir%/gi, "right")).addClass(s);
            e.click(function () {
              b.prev()
            }), f.click(function () {
              b.next()
            }), b.container.append(e.add(f))
          }
        }), w(n + e, function () {
          b._preloadTimeout && clearTimeout(b._preloadTimeout), b._preloadTimeout = setTimeout(function () {
            b.preloadNearbyImages(), b._preloadTimeout = null
          }, 16)
        }), void w(h + e, function () {
          d.off(e), b.wrap.off("click" + e), b.arrowRight = b.arrowLeft = null
        })) : !1
      },
      next: function () {
        b.direction = !0, b.index = S(b.index + 1), b.updateItemHTML()
      },
      prev: function () {
        b.direction = !1, b.index = S(b.index - 1), b.updateItemHTML()
      },
      goTo: function (a) {
        b.direction = a >= b.index, b.index = a, b.updateItemHTML()
      },
      preloadNearbyImages: function () {
        var a, c = b.st.gallery.preload,
          d = Math.min(c[0], b.items.length),
          e = Math.min(c[1], b.items.length);
        for (a = 1; a <= (b.direction ? e : d); a++) b._preloadItem(b.index + a);
        for (a = 1; a <= (b.direction ? d : e); a++) b._preloadItem(b.index - a)
      },
      _preloadItem: function (c) {
        if (c = S(c), !b.items[c].preloaded) {
          var d = b.items[c];
          d.parsed || (d = b.parseEl(c)), y("LazyLoad", d), "image" === d.type && (d.img = a('<img class="mfp-img" />').on("load.mfploader", function () {
            d.hasSize = !0
          }).on("error.mfploader", function () {
            d.hasSize = !0, d.loadError = !0, y("LazyLoadError", d)
          }).attr("src", d.src)), d.preloaded = !0
        }
      }
    }
  });
  var U = "retina";
  a.magnificPopup.registerModule(U, {
    options: {
      replaceSrc: function (a) {
        return a.src.replace(/\.\w+$/, function (a) {
          return "@2x" + a
        })
      },
      ratio: 1
    },
    proto: {
      initRetina: function () {
        if (window.devicePixelRatio > 1) {
          var a = b.st.retina,
            c = a.ratio;
          c = isNaN(c) ? c() : c, c > 1 && (w("ImageHasSize." + U, function (a, b) {
            b.img.css({
              "max-width": b.img[0].naturalWidth / c,
              width: "100%"
            })
          }), w("ElementParse." + U, function (b, d) {
            d.src = a.replaceSrc(d, c)
          }))
        }
      }
    }
  }), A()
});

/*!
 * Smooth Scroll - v1.4.13 - 2013-11-02
 * https://github.com/kswedberg/jquery-smooth-scroll
 * Copyright (c) 2013 Karl Swedberg
 * Licensed MIT (https://github.com/kswedberg/jquery-smooth-scroll/blob/master/LICENSE-MIT)
 */
(function (t) {
  function e(t) {
    return t.replace(/(:|\.)/g, "\\$1")
  }
  var l = "1.4.13",
    o = {},
    s = {
      exclude: [],
      excludeWithin: [],
      offset: 0,
      direction: "top",
      scrollElement: null,
      scrollTarget: null,
      beforeScroll: function () {},
      afterScroll: function () {},
      easing: "swing",
      speed: 400,
      autoCoefficent: 2,
      preventDefault: !0
    },
    n = function (e) {
      var l = [],
        o = !1,
        s = e.dir && "left" == e.dir ? "scrollLeft" : "scrollTop";
      return this.each(function () {
        if (this != document && this != window) {
          var e = t(this);
          e[s]() > 0 ? l.push(this) : (e[s](1), o = e[s]() > 0, o && l.push(this), e[s](0))
        }
      }), l.length || this.each(function () {
        "BODY" === this.nodeName && (l = [this])
      }), "first" === e.el && l.length > 1 && (l = [l[0]]), l
    };
  t.fn.extend({
    scrollable: function (t) {
      var e = n.call(this, {
        dir: t
      });
      return this.pushStack(e)
    },
    firstScrollable: function (t) {
      var e = n.call(this, {
        el: "first",
        dir: t
      });
      return this.pushStack(e)
    },
    smoothScroll: function (l, o) {
      if (l = l || {}, "options" === l) return o ? this.each(function () {
        var e = t(this),
          l = t.extend(e.data("ssOpts") || {}, o);
        t(this).data("ssOpts", l)
      }) : this.first().data("ssOpts");
      var s = t.extend({}, t.fn.smoothScroll.defaults, l),
        n = t.smoothScroll.filterPath(location.pathname);
      return this.unbind("click.smoothscroll").bind("click.smoothscroll", function (l) {
        var o = this,
          r = t(this),
          i = t.extend({}, s, r.data("ssOpts") || {}),
          c = s.exclude,
          a = i.excludeWithin,
          f = 0,
          h = 0,
          u = !0,
          d = {},
          p = location.hostname === o.hostname || !o.hostname,
          m = i.scrollTarget || (t.smoothScroll.filterPath(o.pathname) || n) === n,
          S = e(o.hash);
        if (i.scrollTarget || p && m && S) {
          for (; u && c.length > f;) r.is(e(c[f++])) && (u = !1);
          for (; u && a.length > h;) r.closest(a[h++]).length && (u = !1)
        } else u = !1;
        u && (i.preventDefault && l.preventDefault(), t.extend(d, i, {
          scrollTarget: i.scrollTarget || S,
          link: o
        }), t.smoothScroll(d))
      }), this
    }
  }), t.smoothScroll = function (e, l) {
    if ("options" === e && "object" == typeof l) return t.extend(o, l);
    var s, n, r, i, c = 0,
      a = "offset",
      f = "scrollTop",
      h = {},
      u = {};
    "number" == typeof e ? (s = t.extend({
      link: null
    }, t.fn.smoothScroll.defaults, o), r = e) : (s = t.extend({
      link: null
    }, t.fn.smoothScroll.defaults, e || {}, o), s.scrollElement && (a = "position", "static" == s.scrollElement.css("position") && s.scrollElement.css("position", "relative"))), f = "left" == s.direction ? "scrollLeft" : f, s.scrollElement ? (n = s.scrollElement, /^(?:HTML|BODY)$/.test(n[0].nodeName) || (c = n[f]())) : n = t("html, body").firstScrollable(s.direction), s.beforeScroll.call(n, s), r = "number" == typeof e ? e : l || t(s.scrollTarget)[a]() && t(s.scrollTarget)[a]()[s.direction] || 0, h[f] = r + c + s.offset, i = s.speed, "auto" === i && (i = h[f] || n.scrollTop(), i /= s.autoCoefficent), u = {
      duration: i,
      easing: s.easing,
      complete: function () {
        s.afterScroll.call(s.link, s)
      }
    }, s.step && (u.step = s.step), n.length ? n.stop().animate(h, u) : s.afterScroll.call(s.link, s)
  }, t.smoothScroll.version = l, t.smoothScroll.filterPath = function (t) {
    return t.replace(/^\//, "").replace(/(?:index|default).[a-zA-Z]{3,4}$/, "").replace(/\/$/, "")
  }, t.fn.smoothScroll.defaults = s
})(jQuery);

/*!
 * scrollup v2.4.1
 * Url: http://markgoodyear.com/labs/scrollup/
 * Copyright (c) Mark Goodyear â€” @markgdyr â€” http://markgoodyear.com
 * License: MIT
 */
! function (l, o, e) {
  "use strict";
  l.fn.scrollUp = function (o) {
    l.data(e.body, "scrollUp") || (l.data(e.body, "scrollUp", !0), l.fn.scrollUp.init(o))
  }, l.fn.scrollUp.init = function (r) {
    var s, t, c, i, n, a, d, p = l.fn.scrollUp.settings = l.extend({}, l.fn.scrollUp.defaults, r),
      f = !1;
    switch (d = p.scrollTrigger ? l(p.scrollTrigger) : l("<a/>", {
      id: p.scrollName,
      href: "#top"
    }), p.scrollTitle && d.attr("title", p.scrollTitle), d.appendTo("body"), p.scrollImg || p.scrollTrigger || d.html(p.scrollText), d.css({
      display: "none",
      position: "fixed",
      zIndex: p.zIndex
    }), p.activeOverlay && l("<div/>", {
      id: p.scrollName + "-active"
    }).css({
      position: "absolute",
      top: p.scrollDistance + "px",
      width: "100%",
      borderTop: "1px dotted" + p.activeOverlay,
      zIndex: p.zIndex
    }).appendTo("body"), p.animation) {
      case "fade":
        s = "fadeIn", t = "fadeOut", c = p.animationSpeed;
        break;
      case "slide":
        s = "slideDown", t = "slideUp", c = p.animationSpeed;
        break;
      default:
        s = "show", t = "hide", c = 0
    }
    i = "top" === p.scrollFrom ? p.scrollDistance : l(e).height() - l(o).height() - p.scrollDistance, n = l(o).scroll(function () {
      l(o).scrollTop() > i ? f || (d[s](c), f = !0) : f && (d[t](c), f = !1)
    }), p.scrollTarget ? "number" == typeof p.scrollTarget ? a = p.scrollTarget : "string" == typeof p.scrollTarget && (a = Math.floor(l(p.scrollTarget).offset().top)) : a = 0, d.click(function (o) {
      o.preventDefault(), l("html, body").animate({
        scrollTop: a
      }, p.scrollSpeed, p.easingType)
    })
  }, l.fn.scrollUp.defaults = {
    scrollName: "scrollUp",
    scrollDistance: 300,
    scrollFrom: "top",
    scrollSpeed: 300,
    easingType: "linear",
    animation: "fade",
    animationSpeed: 200,
    scrollTrigger: !1,
    scrollTarget: !1,
    scrollText: "Scroll to top",
    scrollTitle: !1,
    scrollImg: !1,
    activeOverlay: !1,
    zIndex: 2147483647
  }, l.fn.scrollUp.destroy = function (r) {
    l.removeData(e.body, "scrollUp"), l("#" + l.fn.scrollUp.settings.scrollName).remove(), l("#" + l.fn.scrollUp.settings.scrollName + "-active").remove(), l.fn.jquery.split(".")[1] >= 7 ? l(o).off("scroll", r) : l(o).unbind("scroll", r)
  }, l.scrollUp = l.fn.scrollUp
}(jQuery, window, document);

/*!
 * imagesLoaded PACKAGED v4.1.1
 * JavaScript is all like "You images are done yet or what?"
 * MIT License
 */
! function (t, e) {
  "function" == typeof define && define.amd ? define("ev-emitter/ev-emitter", e) : "object" == typeof module && module.exports ? module.exports = e() : t.EvEmitter = e()
}("undefined" != typeof window ? window : this, function () {
  function t() {}
  var e = t.prototype;
  return e.on = function (t, e) {
    if (t && e) {
      var i = this._events = this._events || {},
        n = i[t] = i[t] || [];
      return -1 == n.indexOf(e) && n.push(e), this
    }
  }, e.once = function (t, e) {
    if (t && e) {
      this.on(t, e);
      var i = this._onceEvents = this._onceEvents || {},
        n = i[t] = i[t] || {};
      return n[e] = !0, this
    }
  }, e.off = function (t, e) {
    var i = this._events && this._events[t];
    if (i && i.length) {
      var n = i.indexOf(e);
      return -1 != n && i.splice(n, 1), this
    }
  }, e.emitEvent = function (t, e) {
    var i = this._events && this._events[t];
    if (i && i.length) {
      var n = 0,
        o = i[n];
      e = e || [];
      for (var r = this._onceEvents && this._onceEvents[t]; o;) {
        var s = r && r[o];
        s && (this.off(t, o), delete r[o]), o.apply(this, e), n += s ? 0 : 1, o = i[n]
      }
      return this
    }
  }, t
}),
function (t, e) {
  "use strict";
  "function" == typeof define && define.amd ? define(["ev-emitter/ev-emitter"], function (i) {
    return e(t, i)
  }) : "object" == typeof module && module.exports ? module.exports = e(t, require("ev-emitter")) : t.imagesLoaded = e(t, t.EvEmitter)
}(window, function (t, e) {
  function i(t, e) {
    for (var i in e) t[i] = e[i];
    return t
  }

  function n(t) {
    var e = [];
    if (Array.isArray(t)) e = t;
    else if ("number" == typeof t.length)
      for (var i = 0; i < t.length; i++) e.push(t[i]);
    else e.push(t);
    return e
  }

  function o(t, e, r) {
    return this instanceof o ? ("string" == typeof t && (t = document.querySelectorAll(t)), this.elements = n(t), this.options = i({}, this.options), "function" == typeof e ? r = e : i(this.options, e), r && this.on("always", r), this.getImages(), h && (this.jqDeferred = new h.Deferred), void setTimeout(function () {
      this.check()
    }.bind(this))) : new o(t, e, r)
  }

  function r(t) {
    this.img = t
  }

  function s(t, e) {
    this.url = t, this.element = e, this.img = new Image
  }
  var h = t.jQuery,
    a = t.console;
  o.prototype = Object.create(e.prototype), o.prototype.options = {}, o.prototype.getImages = function () {
    this.images = [], this.elements.forEach(this.addElementImages, this)
  }, o.prototype.addElementImages = function (t) {
    "IMG" == t.nodeName && this.addImage(t), this.options.background === !0 && this.addElementBackgroundImages(t);
    var e = t.nodeType;
    if (e && d[e]) {
      for (var i = t.querySelectorAll("img"), n = 0; n < i.length; n++) {
        var o = i[n];
        this.addImage(o)
      }
      if ("string" == typeof this.options.background) {
        var r = t.querySelectorAll(this.options.background);
        for (n = 0; n < r.length; n++) {
          var s = r[n];
          this.addElementBackgroundImages(s)
        }
      }
    }
  };
  var d = {
    1: !0,
    9: !0,
    11: !0
  };
  return o.prototype.addElementBackgroundImages = function (t) {
    var e = getComputedStyle(t);
    if (e)
      for (var i = /url\((['"])?(.*?)\1\)/gi, n = i.exec(e.backgroundImage); null !== n;) {
        var o = n && n[2];
        o && this.addBackground(o, t), n = i.exec(e.backgroundImage)
      }
  }, o.prototype.addImage = function (t) {
    var e = new r(t);
    this.images.push(e)
  }, o.prototype.addBackground = function (t, e) {
    var i = new s(t, e);
    this.images.push(i)
  }, o.prototype.check = function () {
    function t(t, i, n) {
      setTimeout(function () {
        e.progress(t, i, n)
      })
    }
    var e = this;
    return this.progressedCount = 0, this.hasAnyBroken = !1, this.images.length ? void this.images.forEach(function (e) {
      e.once("progress", t), e.check()
    }) : void this.complete()
  }, o.prototype.progress = function (t, e, i) {
    this.progressedCount++, this.hasAnyBroken = this.hasAnyBroken || !t.isLoaded, this.emitEvent("progress", [this, t, e]), this.jqDeferred && this.jqDeferred.notify && this.jqDeferred.notify(this, t), this.progressedCount == this.images.length && this.complete(), this.options.debug && a && a.log("progress: " + i, t, e)
  }, o.prototype.complete = function () {
    var t = this.hasAnyBroken ? "fail" : "done";
    if (this.isComplete = !0, this.emitEvent(t, [this]), this.emitEvent("always", [this]), this.jqDeferred) {
      var e = this.hasAnyBroken ? "reject" : "resolve";
      this.jqDeferred[e](this)
    }
  }, r.prototype = Object.create(e.prototype), r.prototype.check = function () {
    var t = this.getIsImageComplete();
    return t ? void this.confirm(0 !== this.img.naturalWidth, "naturalWidth") : (this.proxyImage = new Image, this.proxyImage.addEventListener("load", this), this.proxyImage.addEventListener("error", this), this.img.addEventListener("load", this), this.img.addEventListener("error", this), void(this.proxyImage.src = this.img.src))
  }, r.prototype.getIsImageComplete = function () {
    return this.img.complete && void 0 !== this.img.naturalWidth
  }, r.prototype.confirm = function (t, e) {
    this.isLoaded = t, this.emitEvent("progress", [this, this.img, e])
  }, r.prototype.handleEvent = function (t) {
    var e = "on" + t.type;
    this[e] && this[e](t)
  }, r.prototype.onload = function () {
    this.confirm(!0, "onload"), this.unbindEvents()
  }, r.prototype.onerror = function () {
    this.confirm(!1, "onerror"), this.unbindEvents()
  }, r.prototype.unbindEvents = function () {
    this.proxyImage.removeEventListener("load", this), this.proxyImage.removeEventListener("error", this), this.img.removeEventListener("load", this), this.img.removeEventListener("error", this)
  }, s.prototype = Object.create(r.prototype), s.prototype.check = function () {
    this.img.addEventListener("load", this), this.img.addEventListener("error", this), this.img.src = this.url;
    var t = this.getIsImageComplete();
    t && (this.confirm(0 !== this.img.naturalWidth, "naturalWidth"), this.unbindEvents())
  }, s.prototype.unbindEvents = function () {
    this.img.removeEventListener("load", this), this.img.removeEventListener("error", this)
  }, s.prototype.confirm = function (t, e) {
    this.isLoaded = t, this.emitEvent("progress", [this, this.element, e])
  }, o.makeJQueryPlugin = function (e) {
    e = e || t.jQuery, e && (h = e, h.fn.imagesLoaded = function (t, e) {
      var i = new o(this, t, e);
      return i.jqDeferred.promise(h(this))
    })
  }, o.makeJQueryPlugin(), o
});

/*
 * textillate.js
 * http://jschr.github.com/textillate
 * MIT licensed
 *
 * Copyright (C) 2012-2013 Jordan Schroter
 */
! function (t) {
  "use strict";

  function n(n) {
    return /In/.test(n) || t.inArray(n, t.fn.textillate.defaults.inEffects) >= 0
  }

  function e(n) {
    return /Out/.test(n) || t.inArray(n, t.fn.textillate.defaults.outEffects) >= 0
  }

  function i(t) {
    return "true" !== t && "false" !== t ? t : "true" === t
  }

  function a(n) {
    var e = n.attributes || [],
      a = {};
    return e.length ? (t.each(e, function (t, n) {
      var e = n.nodeName.replace(/delayscale/, "delayScale");
      /^data-in-*/.test(e) ? (a["in"] = a["in"] || {}, a["in"][e.replace(/data-in-/, "")] = i(n.nodeValue)) : /^data-out-*/.test(e) ? (a.out = a.out || {}, a.out[e.replace(/data-out-/, "")] = i(n.nodeValue)) : /^data-*/.test(e) && (a[e.replace(/data-/, "")] = i(n.nodeValue))
    }), a) : a
  }

  function o(t) {
    for (var n, e, i = t.length; i; n = parseInt(Math.random() * i), e = t[--i], t[i] = t[n], t[n] = e);
    return t
  }

  function s(t, n, e) {
    t.addClass("animated " + n).css("visibility", "visible").show(), t.one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function () {
      t.removeClass("animated " + n), e && e()
    })
  }

  function l(i, a, l) {
    var r = i.length;
    return r ? (a.shuffle && (i = o(i)), a.reverse && (i = i.toArray().reverse()), void t.each(i, function (i, o) {
      function c() {
        n(a.effect) ? u.css("visibility", "visible") : e(a.effect) && u.css("visibility", "hidden"), r -= 1, !r && l && l()
      }
      var u = t(o),
        f = a.sync ? a.delay : a.delay * i * a.delayScale;
      u.text() ? setTimeout(function () {
        s(u, a.effect, c)
      }, f) : c()
    })) : void(l && l())
  }
  var r = function (i, o) {
    var s = this,
      r = t(i);
    s.init = function () {
      s.$texts = r.find(o.selector), s.$texts.length || (s.$texts = t('<ul class="texts"><li>' + r.html() + "</li></ul>"), r.html(s.$texts)), s.$texts.hide(), s.$current = t("<span>").html(s.$texts.find(":first-child").html()).prependTo(r), n(o["in"].effect) ? s.$current.css("visibility", "hidden") : e(o.out.effect) && s.$current.css("visibility", "visible"), s.setOptions(o), s.timeoutRun = null, setTimeout(function () {
        s.options.autoStart && s.start()
      }, s.options.initialDelay)
    }, s.setOptions = function (t) {
      s.options = t
    }, s.triggerEvent = function (n) {
      var e = t.Event(n + ".tlt");
      return r.trigger(e, s), e
    }, s["in"] = function (i, o) {
      i = i || 0;
      var r, c = s.$texts.find(":nth-child(" + ((i || 0) + 1) + ")"),
        u = t.extend(!0, {}, s.options, c.length ? a(c[0]) : {});
      c.addClass("current"), s.triggerEvent("inAnimationBegin"), s.$current.html(c.html()).lettering("words"), "char" == s.options.type && s.$current.find('[class^="word"]').css({
        display: "inline-block",
        "-webkit-transform": "translate3d(0,0,0)",
        "-moz-transform": "translate3d(0,0,0)",
        "-o-transform": "translate3d(0,0,0)",
        transform: "translate3d(0,0,0)"
      }).each(function () {
        t(this).lettering()
      }), r = s.$current.find('[class^="' + s.options.type + '"]').css("display", "inline-block"), n(u["in"].effect) ? r.css("visibility", "hidden") : e(u["in"].effect) && r.css("visibility", "visible"), s.currentIndex = i, l(r, u["in"], function () {
        s.triggerEvent("inAnimationEnd"), u["in"].callback && u["in"].callback(), o && o(s)
      })
    }, s.out = function (n) {
      var e = s.$texts.find(":nth-child(" + ((s.currentIndex || 0) + 1) + ")"),
        i = s.$current.find('[class^="' + s.options.type + '"]'),
        o = t.extend(!0, {}, s.options, e.length ? a(e[0]) : {});
      s.triggerEvent("outAnimationBegin"), l(i, o.out, function () {
        e.removeClass("current"), s.triggerEvent("outAnimationEnd"), o.out.callback && o.out.callback(), n && n(s)
      })
    }, s.start = function (t) {
      setTimeout(function () {
        s.triggerEvent("start"),
          function n(t) {
            s["in"](t, function () {
              var e = s.$texts.children().length;
              t += 1, !s.options.loop && t >= e ? (s.options.callback && s.options.callback(), s.triggerEvent("end")) : (t %= e, s.timeoutRun = setTimeout(function () {
                s.out(function () {
                  n(t)
                })
              }, s.options.minDisplayTime))
            })
          }(t || 0)
      }, s.options.initialDelay)
    }, s.stop = function () {
      s.timeoutRun && (clearInterval(s.timeoutRun), s.timeoutRun = null)
    }, s.init()
  };
  t.fn.textillate = function (n, e) {
    return this.each(function () {
      var i = t(this),
        o = i.data("textillate"),
        s = t.extend(!0, {}, t.fn.textillate.defaults, a(this), "object" == typeof n && n);
      o ? "string" == typeof n ? o[n].apply(o, [].concat(e)) : o.setOptions.call(o, s) : i.data("textillate", o = new r(this, s))
    })
  }, t.fn.textillate.defaults = {
    selector: ".texts",
    loop: !1,
    minDisplayTime: 2e3,
    initialDelay: 0,
    "in": {
      effect: "fadeInLeftBig",
      delayScale: 1.5,
      delay: 50,
      sync: !1,
      reverse: !1,
      shuffle: !1,
      callback: function () {}
    },
    out: {
      effect: "hinge",
      delayScale: 1.5,
      delay: 50,
      sync: !1,
      reverse: !1,
      shuffle: !1,
      callback: function () {}
    },
    autoStart: !0,
    inEffects: [],
    outEffects: ["hinge"],
    callback: function () {},
    type: "char"
  }
}(jQuery);

/*global jQuery */
/*!	
 * Lettering.JS 0.6.1
 *
 * Copyright 2010, Dave Rupert http://daverupert.com
 * Released under the WTFPL license 
 * http://sam.zoy.org/wtfpl/
 *
 * Thanks to Paul Irish - http://paulirish.com - for the feedback.
 *
 * Date: Mon Sep 20 17:14:00 2010 -0600
 */
! function (t) {
  function n(n, e, i, r) {
    var c = n.text().split(e),
      s = "";
    c.length && (t(c).each(function (t, n) {
      s += '<span class="' + i + (t + 1) + '">' + n + "</span>" + r
    }), n.empty().append(s))
  }
  var e = {
    init: function () {
      return this.each(function () {
        n(t(this), "", "char", "")
      })
    },
    words: function () {
      return this.each(function () {
        n(t(this), " ", "word", " ")
      })
    },
    lines: function () {
      return this.each(function () {
        var e = "eefec303079ad17405c889e092e105b0";
        n(t(this).children("br").replaceWith(e).end(), e, "line", "")
      })
    }
  };
  t.fn.lettering = function (n) {
    return n && e[n] ? e[n].apply(this, [].slice.call(arguments, 1)) : "letters" !== n && n ? (t.error("Method " + n + " does not exist on jQuery.lettering"), this) : e.init.apply(this, [].slice.call(arguments, 0))
  }
}(jQuery);

/*!
 * parallax.js v1.4.2 (http://pixelcog.github.io/parallax.js/)
 * @copyright 2016 PixelCog, Inc.
 * @license MIT (https://github.com/pixelcog/parallax.js/blob/master/LICENSE)
 */
! function (t, i, e, s) {
  function o(i, e) {
    var h = this;
    "object" == typeof e && (delete e.refresh, delete e.render, t.extend(this, e)), this.$element = t(i), !this.imageSrc && this.$element.is("img") && (this.imageSrc = this.$element.attr("src"));
    var r = (this.position + "").toLowerCase().match(/\S+/g) || [];
    if (r.length < 1 && r.push("center"), 1 == r.length && r.push(r[0]), ("top" == r[0] || "bottom" == r[0] || "left" == r[1] || "right" == r[1]) && (r = [r[1], r[0]]), this.positionX != s && (r[0] = this.positionX.toLowerCase()), this.positionY != s && (r[1] = this.positionY.toLowerCase()), h.positionX = r[0], h.positionY = r[1], "left" != this.positionX && "right" != this.positionX && (this.positionX = isNaN(parseInt(this.positionX)) ? "center" : parseInt(this.positionX)), "top" != this.positionY && "bottom" != this.positionY && (this.positionY = isNaN(parseInt(this.positionY)) ? "center" : parseInt(this.positionY)), this.position = this.positionX + (isNaN(this.positionX) ? "" : "px") + " " + this.positionY + (isNaN(this.positionY) ? "" : "px"), navigator.userAgent.match(/(iPod|iPhone|iPad)/)) return this.imageSrc && this.iosFix && !this.$element.is("img") && this.$element.css({
      backgroundImage: "url(" + this.imageSrc + ")",
      backgroundSize: "cover",
      backgroundPosition: this.position
    }), this;
    if (navigator.userAgent.match(/(Android)/)) return this.imageSrc && this.androidFix && !this.$element.is("img") && this.$element.css({
      backgroundImage: "url(" + this.imageSrc + ")",
      backgroundSize: "cover",
      backgroundPosition: this.position
    }), this;
    this.$mirror = t("<div />").prependTo("body");
    var a = this.$element.find(">.parallax-slider"),
      n = !1;
    0 == a.length ? this.$slider = t("<img />").prependTo(this.$mirror) : (this.$slider = a.prependTo(this.$mirror), n = !0), this.$mirror.addClass("parallax-mirror").css({
      visibility: "hidden",
      zIndex: this.zIndex,
      position: "fixed",
      top: 0,
      left: 0,
      overflow: "hidden"
    }), this.$slider.addClass("parallax-slider").one("load", function () {
      h.naturalHeight && h.naturalWidth || (h.naturalHeight = this.naturalHeight || this.height || 1, h.naturalWidth = this.naturalWidth || this.width || 1), h.aspectRatio = h.naturalWidth / h.naturalHeight, o.isSetup || o.setup(), o.sliders.push(h), o.isFresh = !1, o.requestRender()
    }), n || (this.$slider[0].src = this.imageSrc), (this.naturalHeight && this.naturalWidth || this.$slider[0].complete || a.length > 0) && this.$slider.trigger("load")
  }

  function h(s) {
    return this.each(function () {
      var h = t(this),
        r = "object" == typeof s && s;
      this == i || this == e || h.is("body") ? o.configure(r) : h.data("px.parallax") ? "object" == typeof s && t.extend(h.data("px.parallax"), r) : (r = t.extend({}, h.data(), r), h.data("px.parallax", new o(this, r))), "string" == typeof s && ("destroy" == s ? o.destroy(this) : o[s]())
    })
  }! function () {
    for (var t = 0, e = ["ms", "moz", "webkit", "o"], s = 0; s < e.length && !i.requestAnimationFrame; ++s) i.requestAnimationFrame = i[e[s] + "RequestAnimationFrame"], i.cancelAnimationFrame = i[e[s] + "CancelAnimationFrame"] || i[e[s] + "CancelRequestAnimationFrame"];
    i.requestAnimationFrame || (i.requestAnimationFrame = function (e) {
      var s = (new Date).getTime(),
        o = Math.max(0, 16 - (s - t)),
        h = i.setTimeout(function () {
          e(s + o)
        }, o);
      return t = s + o, h
    }), i.cancelAnimationFrame || (i.cancelAnimationFrame = function (t) {
      clearTimeout(t)
    })
  }(), t.extend(o.prototype, {
    speed: .2,
    bleed: 0,
    zIndex: -100,
    iosFix: !0,
    androidFix: !0,
    position: "center",
    overScrollFix: !1,
    refresh: function () {
      this.boxWidth = this.$element.outerWidth(), this.boxHeight = this.$element.outerHeight() + 2 * this.bleed, this.boxOffsetTop = this.$element.offset().top - this.bleed, this.boxOffsetLeft = this.$element.offset().left, this.boxOffsetBottom = this.boxOffsetTop + this.boxHeight;
      var t = o.winHeight,
        i = o.docHeight,
        e = Math.min(this.boxOffsetTop, i - t),
        s = Math.max(this.boxOffsetTop + this.boxHeight - t, 0),
        h = this.boxHeight + (e - s) * (1 - this.speed) | 0,
        r = (this.boxOffsetTop - e) * (1 - this.speed) | 0;
      if (h * this.aspectRatio >= this.boxWidth) {
        this.imageWidth = h * this.aspectRatio | 0, this.imageHeight = h, this.offsetBaseTop = r;
        var a = this.imageWidth - this.boxWidth;
        this.offsetLeft = "left" == this.positionX ? 0 : "right" == this.positionX ? -a : isNaN(this.positionX) ? -a / 2 | 0 : Math.max(this.positionX, -a)
      } else {
        this.imageWidth = this.boxWidth, this.imageHeight = this.boxWidth / this.aspectRatio | 0, this.offsetLeft = 0;
        var a = this.imageHeight - h;
        this.offsetBaseTop = "top" == this.positionY ? r : "bottom" == this.positionY ? r - a : isNaN(this.positionY) ? r - a / 2 | 0 : r + Math.max(this.positionY, -a)
      }
    },
    render: function () {
      var t = o.scrollTop,
        i = o.scrollLeft,
        e = this.overScrollFix ? o.overScroll : 0,
        s = t + o.winHeight;
      this.boxOffsetBottom > t && this.boxOffsetTop <= s ? (this.visibility = "visible", this.mirrorTop = this.boxOffsetTop - t, this.mirrorLeft = this.boxOffsetLeft - i, this.offsetTop = this.offsetBaseTop - this.mirrorTop * (1 - this.speed)) : this.visibility = "hidden", this.$mirror.css({
        transform: "translate3d(0px, 0px, 0px)",
        visibility: this.visibility,
        top: this.mirrorTop - e,
        left: this.mirrorLeft,
        height: this.boxHeight,
        width: this.boxWidth
      }), this.$slider.css({
        transform: "translate3d(0px, 0px, 0px)",
        position: "absolute",
        top: this.offsetTop,
        left: this.offsetLeft,
        height: this.imageHeight,
        width: this.imageWidth,
        maxWidth: "none"
      })
    }
  }), t.extend(o, {
    scrollTop: 0,
    scrollLeft: 0,
    winHeight: 0,
    winWidth: 0,
    docHeight: 1 << 30,
    docWidth: 1 << 30,
    sliders: [],
    isReady: !1,
    isFresh: !1,
    isBusy: !1,
    setup: function () {
      if (!this.isReady) {
        var s = t(e),
          h = t(i),
          r = function () {
            o.winHeight = h.height(), o.winWidth = h.width(), o.docHeight = s.height(), o.docWidth = s.width()
          },
          a = function () {
            var t = h.scrollTop(),
              i = o.docHeight - o.winHeight,
              e = o.docWidth - o.winWidth;
            o.scrollTop = Math.max(0, Math.min(i, t)), o.scrollLeft = Math.max(0, Math.min(e, h.scrollLeft())), o.overScroll = Math.max(t - i, Math.min(t, 0))
          };
        h.on("resize.px.parallax load.px.parallax", function () {
          r(), o.isFresh = !1, o.requestRender()
        }).on("scroll.px.parallax load.px.parallax", function () {
          a(), o.requestRender()
        }), r(), a(), this.isReady = !0
      }
    },
    configure: function (i) {
      "object" == typeof i && (delete i.refresh, delete i.render, t.extend(this.prototype, i))
    },
    refresh: function () {
      t.each(this.sliders, function () {
        this.refresh()
      }), this.isFresh = !0
    },
    render: function () {
      this.isFresh || this.refresh(), t.each(this.sliders, function () {
        this.render()
      })
    },
    requestRender: function () {
      var t = this;
      this.isBusy || (this.isBusy = !0, i.requestAnimationFrame(function () {
        t.render(), t.isBusy = !1
      }))
    },
    destroy: function (e) {
      var s, h = t(e).data("px.parallax");
      for (h.$mirror.remove(), s = 0; s < this.sliders.length; s += 1) this.sliders[s] == h && this.sliders.splice(s, 1);
      t(e).data("px.parallax", !1), 0 === this.sliders.length && (t(i).off("scroll.px.parallax resize.px.parallax load.px.parallax"), this.isReady = !1, o.isSetup = !1)
    }
  });
  var r = t.fn.parallax;
  t.fn.parallax = h, t.fn.parallax.Constructor = o, t.fn.parallax.noConflict = function () {
    return t.fn.parallax = r, this
  }, t(e).on("ready.px.parallax.data-api", function () {
    t('[data-parallax="scroll"]').parallax()
  })
}(jQuery, window, document);

/*! Backstretch - v2.0.4 - 2013-06-19
 * http://srobbin.com/jquery-plugins/backstretch/
 * Copyright (c) 2013 Scott Robbin; Licensed MIT */
(function (a, d, p) {
  a.fn.backstretch = function (c, b) {
    (c === p || 0 === c.length) && a.error("No images were supplied for Backstretch");
    0 === a(d).scrollTop() && d.scrollTo(0, 0);
    return this.each(function () {
      var d = a(this),
        g = d.data("backstretch");
      if (g) {
        if ("string" == typeof c && "function" == typeof g[c]) {
          g[c](b);
          return
        }
        b = a.extend(g.options, b);
        g.destroy(!0)
      }
      g = new q(this, c, b);
      d.data("backstretch", g)
    })
  };
  a.backstretch = function (c, b) {
    return a("body").backstretch(c, b).data("backstretch")
  };
  a.expr[":"].backstretch = function (c) {
    return a(c).data("backstretch") !== p
  };
  a.fn.backstretch.defaults = {
    centeredX: !0,
    centeredY: !0,
    duration: 5E3,
    fade: 0
  };
  var r = {
      left: 0,
      top: 0,
      overflow: "hidden",
      margin: 0,
      padding: 0,
      height: "100%",
      width: "100%",
      zIndex: -999999
    },
    s = {
      position: "absolute",
      display: "none",
      margin: 0,
      padding: 0,
      border: "none",
      width: "auto",
      height: "auto",
      maxHeight: "none",
      maxWidth: "none",
      zIndex: -999999
    },
    q = function (c, b, e) {
      this.options = a.extend({}, a.fn.backstretch.defaults, e || {});
      this.images = a.isArray(b) ? b : [b];
      a.each(this.images, function () {
        a("<img />")[0].src = this
      });
      this.isBody = c === document.body;
      this.$container = a(c);
      this.$root = this.isBody ? l ? a(d) : a(document) : this.$container;
      c = this.$container.children(".backstretch").first();
      this.$wrap = c.length ? c : a('<div class="backstretch"></div>').css(r).appendTo(this.$container);
      this.isBody || (c = this.$container.css("position"), b = this.$container.css("zIndex"), this.$container.css({
        position: "static" === c ? "relative" : c,
        zIndex: "auto" === b ? 0 : b,
        background: "none"
      }), this.$wrap.css({
        zIndex: -999998
      }));
      this.$wrap.css({
        position: this.isBody && l ? "fixed" : "absolute"
      });
      this.index = 0;
      this.show(this.index);
      a(d).on("resize.backstretch", a.proxy(this.resize, this)).on("orientationchange.backstretch", a.proxy(function () {
        this.isBody && 0 === d.pageYOffset && (d.scrollTo(0, 1), this.resize())
      }, this))
    };
  q.prototype = {
    resize: function () {
      try {
        var a = {
            left: 0,
            top: 0
          },
          b = this.isBody ? this.$root.width() : this.$root.innerWidth(),
          e = b,
          g = this.isBody ? d.innerHeight ? d.innerHeight : this.$root.height() : this.$root.innerHeight(),
          j = e / this.$img.data("ratio"),
          f;
        j >= g ? (f = (j - g) / 2, this.options.centeredY && (a.top = "-" + f + "px")) : (j = g, e = j * this.$img.data("ratio"), f = (e - b) / 2, this.options.centeredX && (a.left = "-" + f + "px"));
        this.$wrap.css({
          width: b,
          height: g
        }).find("img:not(.deleteable)").css({
          width: e,
          height: j
        }).css(a)
      } catch (h) {}
      return this
    },
    show: function (c) {
      if (!(Math.abs(c) > this.images.length - 1)) {
        var b = this,
          e = b.$wrap.find("img").addClass("deleteable"),
          d = {
            relatedTarget: b.$container[0]
          };
        b.$container.trigger(a.Event("backstretch.before", d), [b, c]);
        this.index = c;
        clearInterval(b.interval);
        b.$img = a("<img />").css(s).bind("load", function (f) {
          var h = this.width || a(f.target).width();
          f = this.height || a(f.target).height();
          a(this).data("ratio", h / f);
          a(this).fadeIn(b.options.speed || b.options.fade, function () {
            e.remove();
            b.paused || b.cycle();
            a(["after", "show"]).each(function () {
              b.$container.trigger(a.Event("backstretch." + this, d), [b, c])
            })
          });
          b.resize()
        }).appendTo(b.$wrap);
        b.$img.attr("src", b.images[c]);
        return b
      }
    },
    next: function () {
      return this.show(this.index < this.images.length - 1 ? this.index + 1 : 0)
    },
    prev: function () {
      return this.show(0 === this.index ? this.images.length - 1 : this.index - 1)
    },
    pause: function () {
      this.paused = !0;
      return this
    },
    resume: function () {
      this.paused = !1;
      this.next();
      return this
    },
    cycle: function () {
      1 < this.images.length && (clearInterval(this.interval), this.interval = setInterval(a.proxy(function () {
        this.paused || this.next()
      }, this), this.options.duration));
      return this
    },
    destroy: function (c) {
      a(d).off("resize.backstretch orientationchange.backstretch");
      clearInterval(this.interval);
      c || this.$wrap.remove();
      this.$container.removeData("backstretch")
    }
  };
  var l, f = navigator.userAgent,
    m = navigator.platform,
    e = f.match(/AppleWebKit\/([0-9]+)/),
    e = !!e && e[1],
    h = f.match(/Fennec\/([0-9]+)/),
    h = !!h && h[1],
    n = f.match(/Opera Mobi\/([0-9]+)/),
    t = !!n && n[1],
    k = f.match(/MSIE ([0-9]+)/),
    k = !!k && k[1];
  l = !((-1 < m.indexOf("iPhone") || -1 < m.indexOf("iPad") || -1 < m.indexOf("iPod")) && e && 534 > e || d.operamini && "[object OperaMini]" === {}.toString.call(d.operamini) || n && 7458 > t || -1 < f.indexOf("Android") && e && 533 > e || h && 6 > h || "palmGetResource" in d && e && 534 > e || -1 < f.indexOf("MeeGo") && -1 < f.indexOf("NokiaBrowser/8.5.0") || k && 6 >= k)
})(jQuery, window);

/**
 * kenburnsy - Easy to use JQuery plugin to make slideshows with Ken Burns effect
 * @version v0.0.5
 * @link https://github.com/ZeroOneStudio/kenburnsy
 * @license MIT
 */
! function (t, e, n) {
  function i(e, n) {
    this.el = e, this.$el = t(e), this.settings = t.extend({}, r, n), this._defaults = r, this._name = s, this._slides = [], this.currentIndex = 0, this.init()
  }
  var s = "kenburnsy",
    r = {
      fullscreen: !1,
      duration: 9e3,
      fadeInDuration: 1500,
      height: null
    },
    o = {
      zoomOut: function (e, n) {
        t(e).velocity({
          rotateZ: "3deg",
          scale: "1.1"
        }, 0).velocity({
          translateZ: 0,
          rotateZ: "0deg",
          scale: "1"
        }, n)
      },
      zoomIn: function (e, n) {
        t(e).velocity({
          rotateZ: "0deg",
          scale: "1"
        }, 0).velocity({
          translateZ: 0,
          rotateZ: "3deg",
          scale: "1.1"
        }, n)
      }
    },
    a = function (e) {
      var n = function (t) {
        function n() {
          s(), setTimeout(function () {
            t.resolve(r)
          })
        }

        function i() {
          s(), t.rejectWith(r)
        }

        function s() {
          r.onload = null, r.onerror = null, r.onabort = null
        }
        var r = new Image;
        r.onload = n, r.onerror = i, r.onabort = i, r.src = e
      };
      return t.Deferred(n).promise()
    };
  Object.keys || (Object.keys = function (t) {
    if (t !== Object(t)) throw new TypeError("Object.keys called on a non-object");
    var e, n = [];
    for (e in t) Object.prototype.hasOwnProperty.call(t, e) && n.push(e);
    return n
  }), t.extend(i.prototype, {
    init: function () {
      var e, n = this.settings,
        i = this;
      e = this.$el.children().map(function (t, e) {
        return e.src
      }), this.$el.addClass(function () {
        var t = [s];
        return n.fullscreen && t.push("fullscreen"), t.join(" ")
      }), t.when.apply(t, t.map(e, a)).done(function () {
        var t = Array.prototype.slice.call(arguments);
        i.buildScene(t)
      })
    },
    reveal: function (e) {
      var n = this._slides[e],
        i = this.$el;
      t(n).velocity({
        opacity: 0
      }, 0, function () {
        t(this).appendTo(i)
      }).velocity({
        opacity: 1,
        translateZ: 0
      }, {
        duration: this.settings.fadeInDuration,
        queue: !1
      })
    },
    animate: function (t) {
      var e = Object.keys(o),
        n = o[e[Math.floor(e.length * Math.random())]],
        i = this.settings.duration,
        s = this._slides[t];
      n(s, i)
    },
    show: function (t) {
      this.reveal(t), this.animate(t)
    },
    next: function () {
      this.currentIndex = 0 === this.currentIndex ? this._slides.length - 1 : this.currentIndex - 1, this.show(this.currentIndex)
    },
    addSlides: function (e) {
      var i = this.el;
      return t.map(e.reverse(), function (t) {
        var e = n.createElement("div");
        return e.style.backgroundImage = "url(" + t.src + ")", e.className = "slide", i.appendChild(e), e
      })
    },
    buildScene: function (t) {
      var e = this,
        n = this.settings;
      this.el.innerHTML = "", this._slides = this.addSlides(t), this.currentIndex = t.length - 1, n.fullscreen || (this.el.style.height = this.settings.height || t[this.currentIndex].height + "px"), this.animate(this.currentIndex), setInterval(function () {
        e.next()
      }, n.duration - n.fadeInDuration)
    }
  }), t.fn[s] = function (e) {
    return this.each(function () {
      t.data(this, "plugin_" + s) || t.data(this, "plugin_" + s, new i(this, e))
    }), this
  }
}(jQuery, window, document);

/*!
 * Velocity.js: Accelerated JavaScript animation.
 * @version 0.11.1
 * @docs http://VelocityJS.org
 * @license Copyright 2014 Julian Shapiro. MIT License: http://en.wikipedia.org/wiki/MIT_License
 */
! function (e) {
  "function" == typeof define && define.amd ? window.Velocity ? define(e) : define(["jquery"], e) : e("object" == typeof exports ? window.Velocity ? require("jquery") : void 0 : window.jQuery)
}(function (e) {
  return function (t, r, a, o) {
    function i(e) {
      for (var t = -1, r = e ? e.length : 0, a = []; ++t < r;) {
        var o = e[t];
        o && a.push(o)
      }
      return a
    }

    function n(e) {
      var t = $.data(e, p);
      return null === t ? o : t
    }

    function s(e) {
      return function (t) {
        return Math.round(t * e) * (1 / e)
      }
    }

    function l(e, t) {
      var r = e;
      return y.isString(e) ? v.Easings[e] || (r = !1) : r = y.isArray(e) && 1 === e.length ? s.apply(null, e) : y.isArray(e) && 2 === e.length ? x.apply(null, e.concat([t])) : y.isArray(e) && 4 === e.length ? S.apply(null, e) : !1, r === !1 && (r = v.Easings[v.defaults.easing] ? v.defaults.easing : f), r
    }

    function u(e) {
      if (e)
        for (var t = (new Date).getTime(), r = 0, a = v.State.calls.length; a > r; r++)
          if (v.State.calls[r]) {
            var i = v.State.calls[r],
              s = i[0],
              l = i[2],
              p = i[3];
            p || (p = v.State.calls[r][3] = t - 16);
            for (var d = Math.min((t - p) / l.duration, 1), f = 0, g = s.length; g > f; f++) {
              var m = s[f],
                S = m.element;
              if (n(S)) {
                var x = !1;
                l.display && "none" !== l.display && b.setPropertyValue(S, "display", l.display), l.visibility && "hidden" !== l.visibility && b.setPropertyValue(S, "visibility", l.visibility);
                for (var V in m)
                  if ("element" !== V) {
                    var P = m[V],
                      w, C = y.isString(P.easing) ? v.Easings[P.easing] : P.easing;
                    if (w = 1 === d ? P.endValue : P.startValue + (P.endValue - P.startValue) * C(d), P.currentValue = w, b.Hooks.registered[V]) {
                      var T = b.Hooks.getRoot(V),
                        k = n(S).rootPropertyValueCache[T];
                      k && (P.rootPropertyValue = k)
                    }
                    var E = b.setPropertyValue(S, V, P.currentValue + (0 === parseFloat(w) ? "" : P.unitType), P.rootPropertyValue, P.scrollData);
                    b.Hooks.registered[V] && (n(S).rootPropertyValueCache[T] = b.Normalizations.registered[T] ? b.Normalizations.registered[T]("extract", null, E[1]) : E[1]), "transform" === E[0] && (x = !0)
                  } l.mobileHA && n(S).transformCache.translate3d === o && (n(S).transformCache.translate3d = "(0px, 0px, 0px)", x = !0), x && b.flushTransformCache(S)
              }
            }
            l.display && "none" !== l.display && (v.State.calls[r][2].display = !1), l.visibility && "hidden" !== l.visibility && (v.State.calls[r][2].visibility = !1), l.progress && l.progress.call(i[1], i[1], d, Math.max(0, p + l.duration - t), p), 1 === d && c(r)
          } v.State.isTicking && (v.mock ? u(!0) : h(u))
    }

    function c(e, t) {
      if (!v.State.calls[e]) return !1;
      for (var r = v.State.calls[e][0], a = v.State.calls[e][1], i = v.State.calls[e][2], s = v.State.calls[e][4], l = !1, u = 0, c = r.length; c > u; u++) {
        var p = r[u].element;
        if (t || i.loop || ("none" === i.display && b.setPropertyValue(p, "display", i.display), "hidden" === i.visibility && b.setPropertyValue(p, "visibility", i.visibility)), ($.queue(p)[1] === o || !/\.velocityQueueEntryFlag/i.test($.queue(p)[1])) && n(p)) {
          n(p).isAnimating = !1, n(p).rootPropertyValueCache = {};
          var d = !1;
          $.each(n(p).transformCache, function (e, t) {
            var r = /^scale/.test(e) ? 1 : 0;
            new RegExp("^\\(" + r + "[^.]").test(t) && (d = !0, delete n(p).transformCache[e])
          }), i.mobileHA && (d = !0, delete n(p).transformCache.translate3d), d && b.flushTransformCache(p), b.Values.removeClass(p, "velocity-animating")
        }
        if (!t && i.complete && !i.loop && u === c - 1) try {
          i.complete.call(a, a)
        } catch (f) {
          setTimeout(function () {
            throw f
          }, 1)
        }
        s && i.loop !== !0 && s(a), i.loop !== !0 || t || v.animate(p, "reverse", {
          loop: !0,
          delay: i.delay
        }), i.queue !== !1 && $.dequeue(p, i.queue)
      }
      v.State.calls[e] = !1;
      for (var g = 0, m = v.State.calls.length; m > g; g++)
        if (v.State.calls[g] !== !1) {
          l = !0;
          break
        } l === !1 && (v.State.isTicking = !1, delete v.State.calls, v.State.calls = [])
    }
    var p = "velocity",
      d = 400,
      f = "swing",
      g = function () {
        if (a.documentMode) return a.documentMode;
        for (var e = 7; e > 4; e--) {
          var t = a.createElement("div");
          if (t.innerHTML = "<!--[if IE " + e + "]><span></span><![endif]-->", t.getElementsByTagName("span").length) return t = null, e
        }
        return o
      }(),
      m = function () {
        var e = 0;
        return r.webkitRequestAnimationFrame || r.mozRequestAnimationFrame || function (t) {
          var r = (new Date).getTime(),
            a;
          return a = Math.max(0, 16 - (r - e)), e = r + a, setTimeout(function () {
            t(r + a)
          }, a)
        }
      }(),
      h = r.requestAnimationFrame || m,
      y = {
        isString: function (e) {
          return "string" == typeof e
        },
        isArray: Array.isArray || function (e) {
          return "[object Array]" === Object.prototype.toString.call(e)
        },
        isFunction: function (e) {
          return "[object Function]" === Object.prototype.toString.call(e)
        },
        isNode: function (e) {
          return e && e.nodeType
        },
        isNodeList: function (e) {
          return "object" == typeof e && /^\[object (HTMLCollection|NodeList|Object)\]$/.test(Object.prototype.toString.call(e)) && e.length !== o && (0 === e.length || "object" == typeof e[0] && e[0].nodeType > 0)
        },
        isWrapped: function (e) {
          return e && (e.jquery || r.Zepto && r.Zepto.zepto.isZ(e))
        },
        isSVG: function (e) {
          return r.SVGElement && e instanceof SVGElement
        },
        isEmptyObject: function (e) {
          var t;
          for (t in e) return !1;
          return !0
        }
      },
      $;
    if (e && e.fn !== o ? $ = e : r.Velocity && r.Velocity.Utilities && ($ = r.Velocity.Utilities), !$) throw new Error("Velocity: Either jQuery or Velocity's jQuery shim must first be loaded.");
    if (t.Velocity !== o && t.Velocity.Utilities == o) throw new Error("Velocity: Namespace is occupied.");
    if (7 >= g) {
      if (e) return void(e.fn.velocity = e.fn.animate);
      throw new Error("Velocity: For IE<=7, Velocity falls back to jQuery, which must first be loaded.")
    }
    if (8 === g && !e) throw new Error("Velocity: For IE8, Velocity requires jQuery proper to be loaded; Velocity's jQuery shim does not work with IE8.");
    var v = {
      State: {
        isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
        isAndroid: /Android/i.test(navigator.userAgent),
        isGingerbread: /Android 2\.3\.[3-7]/i.test(navigator.userAgent),
        isChrome: r.chrome,
        isFirefox: /Firefox/i.test(navigator.userAgent),
        prefixElement: a.createElement("div"),
        prefixMatches: {},
        scrollAnchor: null,
        scrollPropertyLeft: null,
        scrollPropertyTop: null,
        isTicking: !1,
        calls: []
      },
      CSS: {},
      Utilities: $,
      Sequences: {},
      Easings: {},
      Promise: r.Promise,
      defaults: {
        queue: "",
        duration: d,
        easing: f,
        begin: null,
        complete: null,
        progress: null,
        display: null,
        loop: !1,
        delay: !1,
        mobileHA: !0,
        _cacheValues: !0
      },
      init: function (e) {
        $.data(e, p, {
          isSVG: y.isSVG(e),
          isAnimating: !1,
          computedStyle: null,
          tweensContainer: null,
          rootPropertyValueCache: {},
          transformCache: {}
        })
      },
      animate: function () {},
      hook: function (e, t, r) {
        var a = o;
        return y.isWrapped(e) && (e = [].slice.call(e)), $.each(y.isNode(e) ? [e] : e, function (e, i) {
          if (n(i) === o && v.init(i), r === o) a === o && (a = v.CSS.getPropertyValue(i, t));
          else {
            var s = v.CSS.setPropertyValue(i, t, r);
            "transform" === s[0] && v.CSS.flushTransformCache(i), a = s
          }
        }), a
      },
      mock: !1,
      version: {
        major: 0,
        minor: 11,
        patch: 1
      },
      debug: !1
    };
    r.pageYOffset !== o ? (v.State.scrollAnchor = r, v.State.scrollPropertyLeft = "pageXOffset", v.State.scrollPropertyTop = "pageYOffset") : (v.State.scrollAnchor = a.documentElement || a.body.parentNode || a.body, v.State.scrollPropertyLeft = "scrollLeft", v.State.scrollPropertyTop = "scrollTop");
    var S = function () {
        function e(e, t) {
          return 1 - 3 * t + 3 * e
        }

        function t(e, t) {
          return 3 * t - 6 * e
        }

        function r(e) {
          return 3 * e
        }

        function a(a, o, i) {
          return ((e(o, i) * a + t(o, i)) * a + r(o)) * a
        }

        function o(a, o, i) {
          return 3 * e(o, i) * a * a + 2 * t(o, i) * a + r(o)
        }
        return function (e, t, r, i) {
          function n(t) {
            for (var i = t, n = 0; 8 > n; ++n) {
              var s = o(i, e, r);
              if (0 === s) return i;
              var l = a(i, e, r) - t;
              i -= l / s
            }
            return i
          }
          if (4 !== arguments.length) return !1;
          for (var s = 0; 4 > s; ++s)
            if ("number" != typeof arguments[s] || isNaN(arguments[s]) || !isFinite(arguments[s])) return !1;
          return e = Math.min(e, 1), r = Math.min(r, 1), e = Math.max(e, 0), r = Math.max(r, 0),
            function (o) {
              return e === t && r === i ? o : a(n(o), t, i)
            }
        }
      }(),
      x = function () {
        function e(e) {
          return -e.tension * e.x - e.friction * e.v
        }

        function t(t, r, a) {
          var o = {
            x: t.x + a.dx * r,
            v: t.v + a.dv * r,
            tension: t.tension,
            friction: t.friction
          };
          return {
            dx: o.v,
            dv: e(o)
          }
        }

        function r(r, a) {
          var o = {
              dx: r.v,
              dv: e(r)
            },
            i = t(r, .5 * a, o),
            n = t(r, .5 * a, i),
            s = t(r, a, n),
            l = 1 / 6 * (o.dx + 2 * (i.dx + n.dx) + s.dx),
            u = 1 / 6 * (o.dv + 2 * (i.dv + n.dv) + s.dv);
          return r.x = r.x + l * a, r.v = r.v + u * a, r
        }
        return function a(e, t, o) {
          var i = {
              x: -1,
              v: 0,
              tension: null,
              friction: null
            },
            n = [0],
            s = 0,
            l = 1e-4,
            u = .016,
            c, p, d;
          for (e = parseFloat(e) || 500, t = parseFloat(t) || 20, o = o || null, i.tension = e, i.friction = t, c = null !== o, c ? (s = a(e, t), p = s / o * u) : p = u;;)
            if (d = r(d || i, p), n.push(1 + d.x), s += 16, !(Math.abs(d.x) > l && Math.abs(d.v) > l)) break;
          return c ? function (e) {
            return n[e * (n.length - 1) | 0]
          } : s
        }
      }();
    ! function () {
      v.Easings.linear = function (e) {
        return e
      }, v.Easings.swing = function (e) {
        return .5 - Math.cos(e * Math.PI) / 2
      }, v.Easings.spring = function (e) {
        return 1 - Math.cos(4.5 * e * Math.PI) * Math.exp(6 * -e)
      }, v.Easings.ease = S(.25, .1, .25, 1), v.Easings["ease-in"] = S(.42, 0, 1, 1), v.Easings["ease-out"] = S(0, 0, .58, 1), v.Easings["ease-in-out"] = S(.42, 0, .58, 1);
      var e = {};
      $.each(["Quad", "Cubic", "Quart", "Quint", "Expo"], function (t, r) {
        e[r] = function (e) {
          return Math.pow(e, t + 2)
        }
      }), $.extend(e, {
        Sine: function (e) {
          return 1 - Math.cos(e * Math.PI / 2)
        },
        Circ: function (e) {
          return 1 - Math.sqrt(1 - e * e)
        },
        Elastic: function (e) {
          return 0 === e || 1 === e ? e : -Math.pow(2, 8 * (e - 1)) * Math.sin((80 * (e - 1) - 7.5) * Math.PI / 15)
        },
        Back: function (e) {
          return e * e * (3 * e - 2)
        },
        Bounce: function (e) {
          for (var t, r = 4; e < ((t = Math.pow(2, --r)) - 1) / 11;);
          return 1 / Math.pow(4, 3 - r) - 7.5625 * Math.pow((3 * t - 2) / 22 - e, 2)
        }
      }), $.each(e, function (e, t) {
        v.Easings["easeIn" + e] = t, v.Easings["easeOut" + e] = function (e) {
          return 1 - t(1 - e)
        }, v.Easings["easeInOut" + e] = function (e) {
          return .5 > e ? t(2 * e) / 2 : 1 - t(-2 * e + 2) / 2
        }
      })
    }();
    var b = v.CSS = {
      RegEx: {
        isHex: /^#([A-f\d]{3}){1,2}$/i,
        valueUnwrap: /^[A-z]+\((.*)\)$/i,
        wrappedValueAlreadyExtracted: /[0-9.]+ [0-9.]+ [0-9.]+( [0-9.]+)?/,
        valueSplit: /([A-z]+\(.+\))|(([A-z0-9#-.]+?)(?=\s|$))/gi
      },
      Lists: {
        colors: ["fill", "stroke", "stopColor", "color", "backgroundColor", "borderColor", "borderTopColor", "borderRightColor", "borderBottomColor", "borderLeftColor", "outlineColor"],
        transformsBase: ["translateX", "translateY", "scale", "scaleX", "scaleY", "skewX", "skewY", "rotateZ"],
        transforms3D: ["transformPerspective", "translateZ", "scaleZ", "rotateX", "rotateY"]
      },
      Hooks: {
        templates: {
          textShadow: ["Color X Y Blur", "black 0px 0px 0px"],
          boxShadow: ["Color X Y Blur Spread", "black 0px 0px 0px 0px"],
          clip: ["Top Right Bottom Left", "0px 0px 0px 0px"],
          backgroundPosition: ["X Y", "0% 0%"],
          transformOrigin: ["X Y Z", "50% 50% 0px"],
          perspectiveOrigin: ["X Y", "50% 50%"]
        },
        registered: {},
        register: function () {
          for (var e = 0; e < b.Lists.colors.length; e++) b.Hooks.templates[b.Lists.colors[e]] = ["Red Green Blue Alpha", "255 255 255 1"];
          var t, r, a;
          if (g)
            for (t in b.Hooks.templates) {
              r = b.Hooks.templates[t], a = r[0].split(" ");
              var o = r[1].match(b.RegEx.valueSplit);
              "Color" === a[0] && (a.push(a.shift()), o.push(o.shift()), b.Hooks.templates[t] = [a.join(" "), o.join(" ")])
            }
          for (t in b.Hooks.templates) {
            r = b.Hooks.templates[t], a = r[0].split(" ");
            for (var e in a) {
              var i = t + a[e],
                n = e;
              b.Hooks.registered[i] = [t, n]
            }
          }
        },
        getRoot: function (e) {
          var t = b.Hooks.registered[e];
          return t ? t[0] : e
        },
        cleanRootPropertyValue: function (e, t) {
          return b.RegEx.valueUnwrap.test(t) && (t = t.match(b.Hooks.RegEx.valueUnwrap)[1]), b.Values.isCSSNullValue(t) && (t = b.Hooks.templates[e][1]), t
        },
        extractValue: function (e, t) {
          var r = b.Hooks.registered[e];
          if (r) {
            var a = r[0],
              o = r[1];
            return t = b.Hooks.cleanRootPropertyValue(a, t), t.toString().match(b.RegEx.valueSplit)[o]
          }
          return t
        },
        injectValue: function (e, t, r) {
          var a = b.Hooks.registered[e];
          if (a) {
            var o = a[0],
              i = a[1],
              n, s;
            return r = b.Hooks.cleanRootPropertyValue(o, r), n = r.toString().match(b.RegEx.valueSplit), n[i] = t, s = n.join(" ")
          }
          return r
        }
      },
      Normalizations: {
        registered: {
          clip: function (e, t, r) {
            switch (e) {
              case "name":
                return "clip";
              case "extract":
                var a;
                return b.RegEx.wrappedValueAlreadyExtracted.test(r) ? a = r : (a = r.toString().match(b.RegEx.valueUnwrap), a = a ? a[1].replace(/,(\s+)?/g, " ") : r), a;
              case "inject":
                return "rect(" + r + ")"
            }
          },
          opacity: function (e, t, r) {
            if (8 >= g) switch (e) {
              case "name":
                return "filter";
              case "extract":
                var a = r.toString().match(/alpha\(opacity=(.*)\)/i);
                return r = a ? a[1] / 100 : 1;
              case "inject":
                return t.style.zoom = 1, parseFloat(r) >= 1 ? "" : "alpha(opacity=" + parseInt(100 * parseFloat(r), 10) + ")"
            } else switch (e) {
              case "name":
                return "opacity";
              case "extract":
                return r;
              case "inject":
                return r
            }
          }
        },
        register: function () {
          9 >= g || v.State.isGingerbread || (b.Lists.transformsBase = b.Lists.transformsBase.concat(b.Lists.transforms3D));
          for (var e = 0; e < b.Lists.transformsBase.length; e++) ! function () {
            var t = b.Lists.transformsBase[e];
            b.Normalizations.registered[t] = function (e, r, a) {
              switch (e) {
                case "name":
                  return "transform";
                case "extract":
                  return n(r) === o || n(r).transformCache[t] === o ? /^scale/i.test(t) ? 1 : 0 : n(r).transformCache[t].replace(/[()]/g, "");
                case "inject":
                  var i = !1;
                  switch (t.substr(0, t.length - 1)) {
                    case "translate":
                      i = !/(%|px|em|rem|vw|vh|\d)$/i.test(a);
                      break;
                    case "scal":
                    case "scale":
                      v.State.isAndroid && n(r).transformCache[t] === o && 1 > a && (a = 1), i = !/(\d)$/i.test(a);
                      break;
                    case "skew":
                      i = !/(deg|\d)$/i.test(a);
                      break;
                    case "rotate":
                      i = !/(deg|\d)$/i.test(a)
                  }
                  return i || (n(r).transformCache[t] = "(" + a + ")"), n(r).transformCache[t]
              }
            }
          }();
          for (var e = 0; e < b.Lists.colors.length; e++) ! function () {
            var t = b.Lists.colors[e];
            b.Normalizations.registered[t] = function (e, r, a) {
              switch (e) {
                case "name":
                  return t;
                case "extract":
                  var i;
                  if (b.RegEx.wrappedValueAlreadyExtracted.test(a)) i = a;
                  else {
                    var n, s = {
                      black: "rgb(0, 0, 0)",
                      blue: "rgb(0, 0, 255)",
                      gray: "rgb(128, 128, 128)",
                      green: "rgb(0, 128, 0)",
                      red: "rgb(255, 0, 0)",
                      white: "rgb(255, 255, 255)"
                    };
                    /^[A-z]+$/i.test(a) ? n = s[a] !== o ? s[a] : s.black : b.RegEx.isHex.test(a) ? n = "rgb(" + b.Values.hexToRgb(a).join(" ") + ")" : /^rgba?\(/i.test(a) || (n = s.black), i = (n || a).toString().match(b.RegEx.valueUnwrap)[1].replace(/,(\s+)?/g, " ")
                  }
                  return 8 >= g || 3 !== i.split(" ").length || (i += " 1"), i;
                case "inject":
                  return 8 >= g ? 4 === a.split(" ").length && (a = a.split(/\s+/).slice(0, 3).join(" ")) : 3 === a.split(" ").length && (a += " 1"), (8 >= g ? "rgb" : "rgba") + "(" + a.replace(/\s+/g, ",").replace(/\.(\d)+(?=,)/g, "") + ")"
              }
            }
          }()
        }
      },
      Names: {
        camelCase: function (e) {
          return e.replace(/-(\w)/g, function (e, t) {
            return t.toUpperCase()
          })
        },
        SVGAttribute: function (e) {
          var t = "width|height|x|y|cx|cy|r|rx|ry|x1|x2|y1|y2";
          return (g || v.State.isAndroid && !v.State.isChrome) && (t += "|transform"), new RegExp("^(" + t + ")$", "i").test(e)
        },
        prefixCheck: function (e) {
          if (v.State.prefixMatches[e]) return [v.State.prefixMatches[e], !0];
          for (var t = ["", "Webkit", "Moz", "ms", "O"], r = 0, a = t.length; a > r; r++) {
            var o;
            if (o = 0 === r ? e : t[r] + e.replace(/^\w/, function (e) {
                return e.toUpperCase()
              }), y.isString(v.State.prefixElement.style[o])) return v.State.prefixMatches[e] = o, [o, !0]
          }
          return [e, !1]
        }
      },
      Values: {
        hexToRgb: function (e) {
          var t = /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
            r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i,
            a;
          return e = e.replace(t, function (e, t, r, a) {
            return t + t + r + r + a + a
          }), a = r.exec(e), a ? [parseInt(a[1], 16), parseInt(a[2], 16), parseInt(a[3], 16)] : [0, 0, 0]
        },
        isCSSNullValue: function (e) {
          return 0 == e || /^(none|auto|transparent|(rgba\(0, ?0, ?0, ?0\)))$/i.test(e)
        },
        getUnitType: function (e) {
          return /^(rotate|skew)/i.test(e) ? "deg" : /(^(scale|scaleX|scaleY|scaleZ|alpha|flexGrow|flexHeight|zIndex|fontWeight)$)|((opacity|red|green|blue|alpha)$)/i.test(e) ? "" : "px"
        },
        getDisplayType: function (e) {
          var t = e.tagName.toString().toLowerCase();
          return /^(b|big|i|small|tt|abbr|acronym|cite|code|dfn|em|kbd|strong|samp|var|a|bdo|br|img|map|object|q|script|span|sub|sup|button|input|label|select|textarea)$/i.test(t) ? "inline" : /^(li)$/i.test(t) ? "list-item" : /^(tr)$/i.test(t) ? "table-row" : "block"
        },
        addClass: function (e, t) {
          e.classList ? e.classList.add(t) : e.className += (e.className.length ? " " : "") + t
        },
        removeClass: function (e, t) {
          e.classList ? e.classList.remove(t) : e.className = e.className.toString().replace(new RegExp("(^|\\s)" + t.split(" ").join("|") + "(\\s|$)", "gi"), " ")
        }
      },
      getPropertyValue: function (e, t, a, i) {
        function s(e, t) {
          function a() {
            u && b.setPropertyValue(e, "display", "none")
          }
          var l = 0;
          if (8 >= g) l = $.css(e, t);
          else {
            var u = !1;
            if (/^(width|height)$/.test(t) && 0 === b.getPropertyValue(e, "display") && (u = !0, b.setPropertyValue(e, "display", b.Values.getDisplayType(e))), !i) {
              if ("height" === t && "border-box" !== b.getPropertyValue(e, "boxSizing").toString().toLowerCase()) {
                var c = e.offsetHeight - (parseFloat(b.getPropertyValue(e, "borderTopWidth")) || 0) - (parseFloat(b.getPropertyValue(e, "borderBottomWidth")) || 0) - (parseFloat(b.getPropertyValue(e, "paddingTop")) || 0) - (parseFloat(b.getPropertyValue(e, "paddingBottom")) || 0);
                return a(), c
              }
              if ("width" === t && "border-box" !== b.getPropertyValue(e, "boxSizing").toString().toLowerCase()) {
                var p = e.offsetWidth - (parseFloat(b.getPropertyValue(e, "borderLeftWidth")) || 0) - (parseFloat(b.getPropertyValue(e, "borderRightWidth")) || 0) - (parseFloat(b.getPropertyValue(e, "paddingLeft")) || 0) - (parseFloat(b.getPropertyValue(e, "paddingRight")) || 0);
                return a(), p
              }
            }
            var d;
            d = n(e) === o ? r.getComputedStyle(e, null) : n(e).computedStyle ? n(e).computedStyle : n(e).computedStyle = r.getComputedStyle(e, null), (g || v.State.isFirefox) && "borderColor" === t && (t = "borderTopColor"), l = 9 === g && "filter" === t ? d.getPropertyValue(t) : d[t], ("" === l || null === l) && (l = e.style[t]), a()
          }
          if ("auto" === l && /^(top|right|bottom|left)$/i.test(t)) {
            var f = s(e, "position");
            ("fixed" === f || "absolute" === f && /top|left/i.test(t)) && (l = $(e).position()[t] + "px")
          }
          return l
        }
        var l;
        if (b.Hooks.registered[t]) {
          var u = t,
            c = b.Hooks.getRoot(u);
          a === o && (a = b.getPropertyValue(e, b.Names.prefixCheck(c)[0])), b.Normalizations.registered[c] && (a = b.Normalizations.registered[c]("extract", e, a)), l = b.Hooks.extractValue(u, a)
        } else if (b.Normalizations.registered[t]) {
          var p, d;
          p = b.Normalizations.registered[t]("name", e), "transform" !== p && (d = s(e, b.Names.prefixCheck(p)[0]), b.Values.isCSSNullValue(d) && b.Hooks.templates[t] && (d = b.Hooks.templates[t][1])), l = b.Normalizations.registered[t]("extract", e, d)
        }
        return /^[\d-]/.test(l) || (l = n(e) && n(e).isSVG && b.Names.SVGAttribute(t) ? /^(height|width)$/i.test(t) ? e.getBBox()[t] : e.getAttribute(t) : s(e, b.Names.prefixCheck(t)[0])), b.Values.isCSSNullValue(l) && (l = 0), v.debug >= 2 && console.log("Get " + t + ": " + l), l
      },
      setPropertyValue: function (e, t, a, o, i) {
        var s = t;
        if ("scroll" === t) i.container ? i.container["scroll" + i.direction] = a : "Left" === i.direction ? r.scrollTo(a, i.alternateValue) : r.scrollTo(i.alternateValue, a);
        else if (b.Normalizations.registered[t] && "transform" === b.Normalizations.registered[t]("name", e)) b.Normalizations.registered[t]("inject", e, a), s = "transform", a = n(e).transformCache[t];
        else {
          if (b.Hooks.registered[t]) {
            var l = t,
              u = b.Hooks.getRoot(t);
            o = o || b.getPropertyValue(e, u), a = b.Hooks.injectValue(l, a, o), t = u
          }
          if (b.Normalizations.registered[t] && (a = b.Normalizations.registered[t]("inject", e, a), t = b.Normalizations.registered[t]("name", e)), s = b.Names.prefixCheck(t)[0], 8 >= g) try {
            e.style[s] = a
          } catch (c) {
            v.debug && console.log("Browser does not support [" + a + "] for [" + s + "]")
          } else n(e) && n(e).isSVG && b.Names.SVGAttribute(t) ? e.setAttribute(t, a) : e.style[s] = a;
          v.debug >= 2 && console.log("Set " + t + " (" + s + "): " + a)
        }
        return [s, a]
      },
      flushTransformCache: function (e) {
        function t(t) {
          return parseFloat(b.getPropertyValue(e, t))
        }
        var r = "";
        if ((g || v.State.isAndroid && !v.State.isChrome) && n(e).isSVG) {
          var a = {
            translate: [t("translateX"), t("translateY")],
            skewX: [t("skewX")],
            skewY: [t("skewY")],
            scale: 1 !== t("scale") ? [t("scale"), t("scale")] : [t("scaleX"), t("scaleY")],
            rotate: [t("rotateZ"), 0, 0]
          };
          $.each(n(e).transformCache, function (e) {
            /^translate/i.test(e) ? e = "translate" : /^scale/i.test(e) ? e = "scale" : /^rotate/i.test(e) && (e = "rotate"), a[e] && (r += e + "(" + a[e].join(" ") + ") ", delete a[e])
          })
        } else {
          var o, i;
          $.each(n(e).transformCache, function (t) {
            return o = n(e).transformCache[t], "transformPerspective" === t ? (i = o, !0) : (9 === g && "rotateZ" === t && (t = "rotate"), void(r += t + o + " "))
          }), i && (r = "perspective" + i + " " + r)
        }
        b.setPropertyValue(e, "transform", r)
      }
    };
    b.Hooks.register(), b.Normalizations.register(), v.animate = function () {
      function e() {
        return p ? C.promise || null : f
      }

      function t() {
        function e(e) {
          function d(e, r) {
            var a = o,
              i = o,
              n = o;
            return y.isArray(e) ? (a = e[0], !y.isArray(e[1]) && /^[\d-]/.test(e[1]) || y.isFunction(e[1]) || b.RegEx.isHex.test(e[1]) ? n = e[1] : (y.isString(e[1]) && !b.RegEx.isHex.test(e[1]) || y.isArray(e[1])) && (i = r ? e[1] : l(e[1], s.duration), e[2] !== o && (n = e[2]))) : a = e, r || (i = i || s.easing), y.isFunction(a) && (a = a.call(t, V, x)), y.isFunction(n) && (n = n.call(t, V, x)), [a || 0, i, n]
          }

          function f(e, t) {
            var r, a;
            return a = (t || 0).toString().toLowerCase().replace(/[%A-z]+$/, function (e) {
              return r = e, ""
            }), r || (r = b.Values.getUnitType(e)), [a, r]
          }

          function g() {
            var e = {
                myParent: t.parentNode || a.body,
                position: b.getPropertyValue(t, "position"),
                fontSize: b.getPropertyValue(t, "fontSize")
              },
              o = e.position === N.lastPosition && e.myParent === N.lastParent,
              i = e.fontSize === N.lastFontSize;
            N.lastParent = e.myParent, N.lastPosition = e.position, N.lastFontSize = e.fontSize;
            var s = 100,
              l = {};
            if (i && o) l.emToPx = N.lastEmToPx, l.percentToPxWidth = N.lastPercentToPxWidth, l.percentToPxHeight = N.lastPercentToPxHeight;
            else {
              var u = n(t).isSVG ? a.createElementNS("http://www.w3.org/2000/svg", "rect") : a.createElement("div");
              v.init(u), e.myParent.appendChild(u), v.CSS.setPropertyValue(u, "position", e.position), v.CSS.setPropertyValue(u, "fontSize", e.fontSize), v.CSS.setPropertyValue(u, "overflow", "hidden"), v.CSS.setPropertyValue(u, "overflowX", "hidden"), v.CSS.setPropertyValue(u, "overflowY", "hidden"), v.CSS.setPropertyValue(u, "boxSizing", "content-box"), v.CSS.setPropertyValue(u, "paddingLeft", s + "em"), v.CSS.setPropertyValue(u, "minWidth", s + "%"), v.CSS.setPropertyValue(u, "maxWidth", s + "%"), v.CSS.setPropertyValue(u, "width", s + "%"), v.CSS.setPropertyValue(u, "minHeight", s + "%"), v.CSS.setPropertyValue(u, "maxHeight", s + "%"), v.CSS.setPropertyValue(u, "height", s + "%"), l.percentToPxWidth = N.lastPercentToPxWidth = (parseFloat(b.getPropertyValue(u, "width", null, !0)) || 1) / s, l.percentToPxHeight = N.lastPercentToPxHeight = (parseFloat(b.getPropertyValue(u, "height", null, !0)) || 1) / s, l.emToPx = N.lastEmToPx = (parseFloat(b.getPropertyValue(u, "paddingLeft")) || 1) / s, e.myParent.removeChild(u)
            }
            return null === N.remToPx && (N.remToPx = parseFloat(b.getPropertyValue(a.body, "fontSize")) || 16), null === N.vwToPx && (N.vwToPx = parseFloat(r.innerWidth) / 100, N.vhToPx = parseFloat(r.innerHeight) / 100), l.remToPx = N.remToPx, l.vwToPx = N.vwToPx, l.vhToPx = N.vhToPx, v.debug >= 1 && console.log("Unit ratios: " + JSON.stringify(l), t), l
          }
          if (s.begin && 0 === V) try {
            s.begin.call(m, m)
          } catch (P) {
            setTimeout(function () {
              throw P
            }, 1)
          }
          if ("scroll" === T) {
            var w = /^x$/i.test(s.axis) ? "Left" : "Top",
              k = parseFloat(s.offset) || 0,
              E, F, A;
            s.container ? y.isWrapped(s.container) || y.isNode(s.container) ? (s.container = s.container[0] || s.container, E = s.container["scroll" + w], A = E + $(t).position()[w.toLowerCase()] + k) : s.container = null : (E = v.State.scrollAnchor[v.State["scrollProperty" + w]], F = v.State.scrollAnchor[v.State["scrollProperty" + ("Left" === w ? "Top" : "Left")]], A = $(t).offset()[w.toLowerCase()] + k), c = {
              scroll: {
                rootPropertyValue: !1,
                startValue: E,
                currentValue: E,
                endValue: A,
                unitType: "",
                easing: s.easing,
                scrollData: {
                  container: s.container,
                  direction: w,
                  alternateValue: F
                }
              },
              element: t
            }, v.debug && console.log("tweensContainer (scroll): ", c.scroll, t)
          } else if ("reverse" === T) {
            if (!n(t).tweensContainer) return void $.dequeue(t, s.queue);
            "none" === n(t).opts.display && (n(t).opts.display = "block"), "hidden" === n(t).opts.visibility && (n(t).opts.visibility = "visible"), n(t).opts.loop = !1, n(t).opts.begin = null, n(t).opts.complete = null, S.easing || delete s.easing, S.duration || delete s.duration, s = $.extend({}, n(t).opts, s);
            var j = $.extend(!0, {}, n(t).tweensContainer);
            for (var L in j)
              if ("element" !== L) {
                var z = j[L].startValue;
                j[L].startValue = j[L].currentValue = j[L].endValue, j[L].endValue = z, y.isEmptyObject(S) || (j[L].easing = s.easing), v.debug && console.log("reverse tweensContainer (" + L + "): " + JSON.stringify(j[L]), t)
              } c = j
          } else if ("start" === T) {
            var j;
            n(t).tweensContainer && n(t).isAnimating === !0 && (j = n(t).tweensContainer), $.each(h, function (e, t) {
              if (RegExp("^" + b.Lists.colors.join("$|^") + "$").test(e)) {
                var r = d(t, !0),
                  a = r[0],
                  i = r[1],
                  n = r[2];
                if (b.RegEx.isHex.test(a)) {
                  for (var s = ["Red", "Green", "Blue"], l = b.Values.hexToRgb(a), u = n ? b.Values.hexToRgb(n) : o, c = 0; c < s.length; c++) h[e + s[c]] = [l[c], i, u ? u[c] : u];
                  delete h[e]
                }
              }
            });
            for (var M in h) {
              var R = d(h[M]),
                q = R[0],
                B = R[1],
                O = R[2];
              M = b.Names.camelCase(M);
              var W = b.Hooks.getRoot(M),
                X = !1;
              if (n(t).isSVG || b.Names.prefixCheck(W)[1] !== !1 || b.Normalizations.registered[W] !== o) {
                (s.display && "none" !== s.display || s.visibility && "hidden" !== s.visibility) && /opacity|filter/.test(M) && !O && 0 !== q && (O = 0), s._cacheValues && j && j[M] ? (O === o && (O = j[M].endValue + j[M].unitType), X = n(t).rootPropertyValueCache[W]) : b.Hooks.registered[M] ? O === o ? (X = b.getPropertyValue(t, W), O = b.getPropertyValue(t, M, X)) : X = b.Hooks.templates[W][1] : O === o && (O = b.getPropertyValue(t, M));
                var Y, G, I, U = !1;
                if (Y = f(M, O), O = Y[0], I = Y[1], Y = f(M, q), q = Y[0].replace(/^([+-\/*])=/, function (e, t) {
                    return U = t, ""
                  }), G = Y[1], O = parseFloat(O) || 0, q = parseFloat(q) || 0, "%" === G && (/^(fontSize|lineHeight)$/.test(M) ? (q /= 100, G = "em") : /^scale/.test(M) ? (q /= 100, G = "") : /(Red|Green|Blue)$/i.test(M) && (q = q / 100 * 255, G = "")), /[\/*]/.test(U)) G = I;
                else if (I !== G && 0 !== O)
                  if (0 === q) G = I;
                  else {
                    p = p || g();
                    var D = /margin|padding|left|right|width|text|word|letter/i.test(M) || /X$/.test(M) ? "x" : "y";
                    switch (I) {
                      case "%":
                        O *= "x" === D ? p.percentToPxWidth : p.percentToPxHeight;
                        break;
                      case "px":
                        break;
                      default:
                        O *= p[I + "ToPx"]
                    }
                    switch (G) {
                      case "%":
                        O *= 1 / ("x" === D ? p.percentToPxWidth : p.percentToPxHeight);
                        break;
                      case "px":
                        break;
                      default:
                        O *= 1 / p[G + "ToPx"]
                    }
                  } switch (U) {
                  case "+":
                    q = O + q;
                    break;
                  case "-":
                    q = O - q;
                    break;
                  case "*":
                    q = O * q;
                    break;
                  case "/":
                    q = O / q
                }
                c[M] = {
                  rootPropertyValue: X,
                  startValue: O,
                  currentValue: O,
                  endValue: q,
                  unitType: G,
                  easing: B
                }, v.debug && console.log("tweensContainer (" + M + "): " + JSON.stringify(c[M]), t)
              } else v.debug && console.log("Skipping [" + W + "] due to a lack of browser support.")
            }
            c.element = t
          }
          c.element && (b.Values.addClass(t, "velocity-animating"), H.push(c), n(t).tweensContainer = c, n(t).opts = s, n(t).isAnimating = !0, V === x - 1 ? (v.State.calls.length > 1e4 && (v.State.calls = i(v.State.calls)), v.State.calls.push([H, m, s, null, C.resolver]), v.State.isTicking === !1 && (v.State.isTicking = !0, u())) : V++)
        }
        var t = this,
          s = $.extend({}, v.defaults, S),
          c = {},
          p;
        if (n(t) === o && v.init(t), parseFloat(s.delay) && s.queue !== !1 && $.queue(t, s.queue, function (e) {
            v.velocityQueueEntryFlag = !0, n(t).delayTimer = {
              setTimeout: setTimeout(e, parseFloat(s.delay)),
              next: e
            }
          }), v.mock === !0) s.duration = 1;
        else switch (s.duration.toString().toLowerCase()) {
          case "fast":
            s.duration = 200;
            break;
          case "normal":
            s.duration = d;
            break;
          case "slow":
            s.duration = 600;
            break;
          default:
            s.duration = parseFloat(s.duration) || 1
        }
        s.easing = l(s.easing, s.duration), s.begin && !y.isFunction(s.begin) && (s.begin = null), s.progress && !y.isFunction(s.progress) && (s.progress = null), s.complete && !y.isFunction(s.complete) && (s.complete = null), s.display && (s.display = s.display.toString().toLowerCase(), "auto" === s.display && (s.display = v.CSS.Values.getDisplayType(t))), s.visibility && (s.visibility = s.visibility.toString().toLowerCase()), s.mobileHA = s.mobileHA && v.State.isMobile && !v.State.isGingerbread, s.queue === !1 ? s.delay ? setTimeout(e, s.delay) : e() : $.queue(t, s.queue, function (t, r) {
          return r === !0 ? (C.promise && C.resolver(m), !0) : (v.velocityQueueEntryFlag = !0, void e(t))
        }), "" !== s.queue && "fx" !== s.queue || "inprogress" === $.queue(t)[0] || $.dequeue(t)
      }
      var s = arguments[0] && ($.isPlainObject(arguments[0].properties) && !arguments[0].properties.names || y.isString(arguments[0].properties)),
        p, f, g, m, h, S;
      if (y.isWrapped(this) ? (p = !1, g = 0, m = this, f = this) : (p = !0, g = 1, m = s ? arguments[0].elements : arguments[0]), m = y.isWrapped(m) ? [].slice.call(m) : m) {
        s ? (h = arguments[0].properties, S = arguments[0].options) : (h = arguments[g], S = arguments[g + 1]);
        var x = y.isArray(m) || y.isNodeList(m) ? m.length : 1,
          V = 0;
        if ("stop" !== h && !$.isPlainObject(S)) {
          var P = g + 1;
          S = {};
          for (var w = P; w < arguments.length; w++) !y.isArray(arguments[w]) && /^\d/.test(arguments[w]) ? S.duration = parseFloat(arguments[w]) : y.isString(arguments[w]) || y.isArray(arguments[w]) ? S.easing = arguments[w] : y.isFunction(arguments[w]) && (S.complete = arguments[w])
        }
        var C = {
          promise: null,
          resolver: null,
          rejecter: null
        };
        p && v.Promise && (C.promise = new v.Promise(function (e, t) {
          C.resolver = e, C.rejecter = t
        }));
        var T;
        switch (h) {
          case "scroll":
            T = "scroll";
            break;
          case "reverse":
            T = "reverse";
            break;
          case "stop":
            $.each(y.isNode(m) ? [m] : m, function (e, t) {
              n(t) && n(t).delayTimer && (clearTimeout(n(t).delayTimer.setTimeout), n(t).delayTimer.next && n(t).delayTimer.next(), delete n(t).delayTimer)
            });
            var k = [];
            return $.each(v.State.calls, function (e, t) {
              t && $.each(y.isNode(t[1]) ? [t[1]] : t[1], function (t, r) {
                $.each(y.isNode(m) ? [m] : m, function (t, a) {
                  if (a === r) {
                    if (n(a) && $.each(n(a).tweensContainer, function (e, t) {
                        t.endValue = t.currentValue
                      }), S === !0 || y.isString(S)) {
                      var o = y.isString(S) ? S : "";
                      $.each($.queue(a, o), function (e, t) {
                        y.isFunction(t) && t(null, !0)
                      }), $.queue(a, o, [])
                    }
                    k.push(e)
                  }
                })
              })
            }), $.each(k, function (e, t) {
              c(t, !0)
            }), C.promise && C.resolver(m), e();
          default:
            if (!$.isPlainObject(h) || y.isEmptyObject(h)) {
              if (y.isString(h) && v.Sequences[h]) {
                var E = S.duration,
                  F = S.delay || 0;
                return S.backwards === !0 && (m = (y.isWrapped(m) ? [].slice.call(m) : m).reverse()), $.each(m, function (e, t) {
                  parseFloat(S.stagger) ? S.delay = F + parseFloat(S.stagger) * e : y.isFunction(S.stagger) && (S.delay = F + S.stagger.call(t, e, x)), S.drag && (S.duration = parseFloat(E) || (/^(callout|transition)/.test(h) ? 1e3 : d), S.duration = Math.max(S.duration * (S.backwards ? 1 - e / x : (e + 1) / x), .75 * S.duration, 200)), v.Sequences[h].call(t, t, S || {}, e, x, m, C.promise ? C : o)
                }), e()
              }
              var A = "Velocity: First argument (" + h + ") was not a property map, a known action, or a registered sequence. Aborting.";
              return C.promise ? C.rejecter(new Error(A)) : console.log(A), e()
            }
            T = "start"
        }
        var N = {
            lastParent: null,
            lastPosition: null,
            lastFontSize: null,
            lastPercentToPxWidth: null,
            lastPercentToPxHeight: null,
            lastEmToPx: null,
            remToPx: null,
            vwToPx: null,
            vhToPx: null
          },
          H = [];
        $.each(y.isNode(m) ? [m] : m, function (e, r) {
          y.isNode(r) && t.call(r)
        });
        var j = $.extend({}, v.defaults, S),
          L;
        if (j.loop = parseInt(j.loop), L = 2 * j.loop - 1, j.loop)
          for (var z = 0; L > z; z++) {
            var M = {
              delay: j.delay
            };
            z === L - 1 && (M.display = j.display, M.visibility = j.visibility, M.complete = j.complete), v.animate(m, "reverse", M)
          }
        return e()
      }
    }, v.State.isMobile || a.hidden === o || a.addEventListener("visibilitychange", function () {
      a.hidden ? (h = function (e) {
        return setTimeout(function () {
          e(!0)
        }, 16)
      }, u()) : h = r.requestAnimationFrame || m
    });
    var V;
    return e && e.fn ? V = e : r.Zepto && (V = r.Zepto), (V || r).Velocity = v, V && (V.fn.velocity = v.animate, V.fn.velocity.defaults = v.defaults), $.each(["Down", "Up"], function (e, t) {
      v.Sequences["slide" + t] = function (e, r, a, o, i, n) {
        var s = $.extend({}, r),
          l = {
            height: null,
            marginTop: null,
            marginBottom: null,
            paddingTop: null,
            paddingBottom: null,
            overflow: null,
            overflowX: null,
            overflowY: null
          },
          u = s.begin,
          c = s.complete,
          p = !1;
        null !== s.display && (s.display = "Down" === t ? s.display || "auto" : s.display || "none"), s.begin = function () {
          function r() {
            l.height = parseFloat(v.CSS.getPropertyValue(e, "height")), e.style.height = "auto", parseFloat(v.CSS.getPropertyValue(e, "height")) === l.height && (p = !0), v.CSS.setPropertyValue(e, "height", l.height + "px")
          }
          if ("Down" === t) {
            l.overflow = [v.CSS.getPropertyValue(e, "overflow"), 0], l.overflowX = [v.CSS.getPropertyValue(e, "overflowX"), 0], l.overflowY = [v.CSS.getPropertyValue(e, "overflowY"), 0], e.style.overflow = "hidden", e.style.overflowX = "visible", e.style.overflowY = "hidden", r();
            for (var a in l)
              if (!/^overflow/.test(a)) {
                var o = v.CSS.getPropertyValue(e, a);
                "height" === a && (o = parseFloat(o)), l[a] = [o, 0]
              }
          } else {
            r();
            for (var a in l) {
              var o = v.CSS.getPropertyValue(e, a);
              "height" === a && (o = parseFloat(o)), l[a] = [0, o]
            }
            e.style.overflow = "hidden", e.style.overflowX = "visible", e.style.overflowY = "hidden"
          }
          u && u.call(e, e)
        }, s.complete = function (e) {
          var r = "Down" === t ? 0 : 1;
          p === !0 ? l.height[r] = "auto" : l.height[r] += "px";
          for (var a in l) e.style[a] = l[a][r];
          c && c.call(e, e), n && n.resolver(i || e)
        }, v.animate(e, l, s)
      }
    }), $.each(["In", "Out"], function (e, t) {
      v.Sequences["fade" + t] = function (e, r, a, o, i, n) {
        var s = $.extend({}, r),
          l = {
            opacity: "In" === t ? 1 : 0
          };
        if (a !== o - 1) s.complete = s.begin = null;
        else {
          var u = s.complete;
          s.complete = function () {
            u && u.call(e, e), n && n.resolver(i || e)
          }
        }
        null !== s.display && (s.display = s.display || ("In" === t ? "auto" : "none")), v.animate(this, l, s)
      }
    }), v
  }(e || window, window, document)
});



/*jquery.mb.YTPlayer 25-07-2016
 _ jquery.mb.components 
 _ email: matteo@open-lab.com 
 _ Copyright (c) 2001-2016. Matteo Bicocchi (Pupunzi); 
 _ blog: http://pupunzi.open-lab.com 
 _ Open Lab s.r.l., Florence - Italy 
 */
function onYouTubeIframeAPIReady() {
  ytp.YTAPIReady || (ytp.YTAPIReady = !0, jQuery(document).trigger("YTAPIReady"))
}

function uncamel(a) {
  return a.replace(/([A-Z])/g, function (a) {
    return "-" + a.toLowerCase()
  })
}

function setUnit(a, b) {
  return "string" != typeof a || a.match(/^[\-0-9\.]+jQuery/) ? "" + a + b : a
}

function setFilter(a, b, c) {
  var d = uncamel(b),
    e = jQuery.browser.mozilla ? "" : jQuery.CSS.sfx;
  a[e + "filter"] = a[e + "filter"] || "", c = setUnit(c > jQuery.CSS.filters[b].max ? jQuery.CSS.filters[b].max : c, jQuery.CSS.filters[b].unit), a[e + "filter"] += d + "(" + c + ") ", delete a[b]
}
var ytp = ytp || {},
  getYTPVideoID = function (a) {
    var b, c;
    return a.indexOf("youtu.be") > 0 ? (b = a.substr(a.lastIndexOf("/") + 1, a.length), c = b.indexOf("?list=") > 0 ? b.substr(b.lastIndexOf("="), b.length) : null, b = c ? b.substr(0, b.lastIndexOf("?")) : b) : a.indexOf("http") > -1 ? (b = a.match(/[\\?&]v=([^&#]*)/)[1], c = a.indexOf("list=") > 0 ? a.match(/[\\?&]list=([^&#]*)/)[1] : null) : (b = a.length > 15 ? null : a, c = b ? null : a), {
      videoID: b,
      playlistID: c
    }
  };
! function (jQuery, ytp) {
  jQuery.mbYTPlayer = {
    name: "jquery.mb.YTPlayer",
    version: "3.0.8",
    build: "5878",
    author: "Matteo Bicocchi",
    apiKey: "",
    defaults: {
      containment: "body",
      ratio: "auto",
      videoURL: null,
      playlistURL: null,
      startAt: 0,
      stopAt: 0,
      autoPlay: !0,
      vol: 50,
      addRaster: !1,
      mask: !1,
      opacity: 1,
      quality: "default",
      mute: !1,
      loop: !0,
      showControls: !0,
      showAnnotations: !1,
      showYTLogo: !0,
      stopMovieOnBlur: !0,
      realfullscreen: !0,
      mobileFallbackImage: null,
      gaTrack: !0,
      optimizeDisplay: !0,
      align: "center,center",
      onReady: function (a) {}
    },
    controls: {
      play: "P",
      pause: "p",
      mute: "M",
      unmute: "A",
      onlyYT: "O",
      showSite: "R",
      ytLogo: "Y"
    },
    controlBar: null,
    loading: null,
    locationProtocol: "https:",
    filters: {
      grayscale: {
        value: 0,
        unit: "%"
      },
      hue_rotate: {
        value: 0,
        unit: "deg"
      },
      invert: {
        value: 0,
        unit: "%"
      },
      opacity: {
        value: 0,
        unit: "%"
      },
      saturate: {
        value: 0,
        unit: "%"
      },
      sepia: {
        value: 0,
        unit: "%"
      },
      brightness: {
        value: 0,
        unit: "%"
      },
      contrast: {
        value: 0,
        unit: "%"
      },
      blur: {
        value: 0,
        unit: "px"
      }
    },
    buildPlayer: function (options) {
      return this.each(function () {
        var YTPlayer = this,
          $YTPlayer = jQuery(YTPlayer);
        YTPlayer.loop = 0, YTPlayer.opt = {}, YTPlayer.state = {}, YTPlayer.filters = jQuery.mbYTPlayer.filters, YTPlayer.filtersEnabled = !0, YTPlayer.id = YTPlayer.id || "YTP_" + (new Date).getTime(), $YTPlayer.addClass("mb_YTPlayer");
        var property = $YTPlayer.data("property") && "string" == typeof $YTPlayer.data("property") ? eval("(" + $YTPlayer.data("property") + ")") : $YTPlayer.data("property");
        "undefined" != typeof property && "undefined" != typeof property.vol && (property.vol = 0 === property.vol ? property.vol = 1 : property.vol), jQuery.extend(YTPlayer.opt, jQuery.mbYTPlayer.defaults, options, property), YTPlayer.hasChanged || (YTPlayer.defaultOpt = {}, jQuery.extend(YTPlayer.defaultOpt, jQuery.mbYTPlayer.defaults, options)), "true" == YTPlayer.opt.loop && (YTPlayer.opt.loop = 9999), YTPlayer.isRetina = window.retina || window.devicePixelRatio > 1;
        var isIframe = function () {
          var a = !1;
          try {
            self.location.href != top.location.href && (a = !0)
          } catch (b) {
            a = !0
          }
          return a
        };
        YTPlayer.canGoFullScreen = !(jQuery.browser.msie || jQuery.browser.opera || isIframe()), YTPlayer.canGoFullScreen || (YTPlayer.opt.realfullscreen = !1), $YTPlayer.attr("id") || $YTPlayer.attr("id", "video_" + (new Date).getTime());
        var playerID = "mbYTP_" + YTPlayer.id;
        YTPlayer.isAlone = !1, YTPlayer.hasFocus = !0;
        var videoID = this.opt.videoURL ? getYTPVideoID(this.opt.videoURL).videoID : $YTPlayer.attr("href") ? getYTPVideoID($YTPlayer.attr("href")).videoID : !1,
          playlistID = this.opt.videoURL ? getYTPVideoID(this.opt.videoURL).playlistID : $YTPlayer.attr("href") ? getYTPVideoID($YTPlayer.attr("href")).playlistID : !1;
        YTPlayer.videoID = videoID, YTPlayer.playlistID = playlistID, YTPlayer.opt.showAnnotations = YTPlayer.opt.showAnnotations ? "0" : "3";
        var playerVars = {
          modestbranding: 1,
          autoplay: 0,
          controls: 0,
          showinfo: 0,
          rel: 0,
          enablejsapi: 1,
          version: 3,
          playerapiid: playerID,
          origin: "*",
          allowfullscreen: !0,
          wmode: "transparent",
          iv_load_policy: YTPlayer.opt.showAnnotations
        };
        if (document.createElement("video").canPlayType && jQuery.extend(playerVars, {
            html5: 1
          }), jQuery.browser.msie && jQuery.browser.version < 9 && (this.opt.opacity = 1), YTPlayer.isSelf = "self" == YTPlayer.opt.containment, YTPlayer.defaultOpt.containment = YTPlayer.opt.containment = jQuery("self" == YTPlayer.opt.containment ? this : YTPlayer.opt.containment), YTPlayer.isBackground = YTPlayer.opt.containment.is("body"), !YTPlayer.isBackground || !ytp.backgroundIsInited) {
          var isPlayer = YTPlayer.opt.containment.is(jQuery(this));
          YTPlayer.canPlayOnMobile = isPlayer && 0 === jQuery(this).children().length, YTPlayer.isPlayer = !1, isPlayer ? YTPlayer.isPlayer = !0 : $YTPlayer.hide();
          var overlay = jQuery("<div/>").css({
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%"
          }).addClass("YTPOverlay");
          YTPlayer.isPlayer && overlay.on("click", function () {
            $YTPlayer.YTPTogglePlay()
          });
          var wrapper = jQuery("<div/>").addClass("mbYTP_wrapper").attr("id", "wrapper_" + playerID);
          wrapper.css({
            position: "absolute",
            zIndex: 0,
            minWidth: "100%",
            minHeight: "100%",
            left: 0,
            top: 0,
            overflow: "hidden",
            opacity: 0
          });
          var playerBox = jQuery("<div/>").attr("id", playerID).addClass("playerBox");
          if (playerBox.css({
              position: "absolute",
              zIndex: 0,
              width: "100%",
              height: "100%",
              top: 0,
              left: 0,
              overflow: "hidden"
            }), wrapper.append(playerBox), YTPlayer.opt.containment.children().not("script, style").each(function () {
              "static" == jQuery(this).css("position") && jQuery(this).css("position", "relative")
            }), YTPlayer.isBackground ? (jQuery("body").css({
              boxSizing: "border-box"
            }), wrapper.css({
              position: "fixed",
              top: 0,
              left: 0,
              zIndex: 0
            }), $YTPlayer.hide()) : "static" == YTPlayer.opt.containment.css("position") && YTPlayer.opt.containment.css({
              position: "relative"
            }), YTPlayer.opt.containment.prepend(wrapper), YTPlayer.wrapper = wrapper, playerBox.css({
              opacity: 1
            }), jQuery.browser.mobile || (playerBox.after(overlay), YTPlayer.overlay = overlay), YTPlayer.isBackground || overlay.on("mouseenter", function () {
              YTPlayer.controlBar.length && YTPlayer.controlBar.addClass("visible")
            }).on("mouseleave", function () {
              YTPlayer.controlBar.length && YTPlayer.controlBar.removeClass("visible")
            }), ytp.YTAPIReady) setTimeout(function () {
            jQuery(document).trigger("YTAPIReady")
          }, 100);
          else {
            jQuery("#YTAPI").remove();
            var tag = jQuery("<script></script>").attr({
              src: jQuery.mbYTPlayer.locationProtocol + "//www.youtube.com/iframe_api?v=" + jQuery.mbYTPlayer.version,
              id: "YTAPI"
            });
            jQuery("head").prepend(tag)
          }
          if (jQuery.browser.mobile && !YTPlayer.canPlayOnMobile) return YTPlayer.opt.mobileFallbackImage && YTPlayer.opt.containment.css({
            backgroundImage: "url(" + YTPlayer.opt.mobileFallbackImage + ")",
            backgroundPosition: "center center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat"
          }), $YTPlayer.remove(), void jQuery(document).trigger("YTPUnavailable");
          jQuery(document).on("YTAPIReady", function () {
            YTPlayer.isBackground && ytp.backgroundIsInited || YTPlayer.isInit || (YTPlayer.isBackground && (ytp.backgroundIsInited = !0), YTPlayer.opt.autoPlay = "undefined" == typeof YTPlayer.opt.autoPlay ? YTPlayer.isBackground ? !0 : !1 : YTPlayer.opt.autoPlay, YTPlayer.opt.vol = YTPlayer.opt.vol ? YTPlayer.opt.vol : 100, jQuery.mbYTPlayer.getDataFromAPI(YTPlayer), jQuery(YTPlayer).on("YTPChanged", function () {
              if (!YTPlayer.isInit) {
                if (YTPlayer.isInit = !0, jQuery.browser.mobile && YTPlayer.canPlayOnMobile) {
                  if (YTPlayer.opt.containment.outerWidth() > jQuery(window).width()) {
                    YTPlayer.opt.containment.css({
                      maxWidth: "100%"
                    });
                    var h = .563 * YTPlayer.opt.containment.outerWidth();
                    YTPlayer.opt.containment.css({
                      maxHeight: h
                    })
                  }
                  return void new YT.Player(playerID, {
                    videoId: YTPlayer.videoID.toString(),
                    width: "100%",
                    height: h,
                    playerVars: playerVars,
                    events: {
                      onReady: function (a) {
                        YTPlayer.player = a.target, playerBox.css({
                          opacity: 1
                        }), YTPlayer.wrapper.css({
                          opacity: 1
                        })
                      }
                    }
                  })
                }
                new YT.Player(playerID, {
                  videoId: YTPlayer.videoID.toString(),
                  playerVars: playerVars,
                  events: {
                    onReady: function (a) {
                      YTPlayer.player = a.target, YTPlayer.isReady || (YTPlayer.isReady = YTPlayer.isPlayer && !YTPlayer.opt.autoPlay ? !1 : !0, YTPlayer.playerEl = YTPlayer.player.getIframe(), jQuery(YTPlayer.playerEl).unselectable(), $YTPlayer.optimizeDisplay(), YTPlayer.videoID = videoID, jQuery(window).off("resize.YTP_" + YTPlayer.id).on("resize.YTP_" + YTPlayer.id, function () {
                        $YTPlayer.optimizeDisplay()
                      }), jQuery.mbYTPlayer.checkForState(YTPlayer))
                    },
                    onStateChange: function (event) {
                      if ("function" == typeof event.target.getPlayerState) {
                        var state = event.target.getPlayerState();
                        if (YTPlayer.preventTrigger) return void(YTPlayer.preventTrigger = !1);
                        YTPlayer.state = state;
                        var eventType;
                        switch (state) {
                          case -1:
                            eventType = "YTPUnstarted";
                            break;
                          case 0:
                            eventType = "YTPEnd";
                            break;
                          case 1:
                            eventType = "YTPPlay", YTPlayer.controlBar.length && YTPlayer.controlBar.find(".mb_YTPPlaypause").html(jQuery.mbYTPlayer.controls.pause), "undefined" != typeof _gaq && eval(YTPlayer.opt.gaTrack) && _gaq.push(["_trackEvent", "YTPlayer", "Play", YTPlayer.hasData ? YTPlayer.videoData.title : YTPlayer.videoID.toString()]), "undefined" != typeof ga && eval(YTPlayer.opt.gaTrack) && ga("send", "event", "YTPlayer", "play", YTPlayer.hasData ? YTPlayer.videoData.title : YTPlayer.videoID.toString());
                            break;
                          case 2:
                            eventType = "YTPPause", YTPlayer.controlBar.length && YTPlayer.controlBar.find(".mb_YTPPlaypause").html(jQuery.mbYTPlayer.controls.play);
                            break;
                          case 3:
                            YTPlayer.player.setPlaybackQuality(YTPlayer.opt.quality), eventType = "YTPBuffering", YTPlayer.controlBar.length && YTPlayer.controlBar.find(".mb_YTPPlaypause").html(jQuery.mbYTPlayer.controls.play);
                            break;
                          case 5:
                            eventType = "YTPCued"
                        }
                        var YTPEvent = jQuery.Event(eventType);
                        YTPEvent.time = YTPlayer.currentTime, YTPlayer.canTrigger && jQuery(YTPlayer).trigger(YTPEvent)
                      }
                    },
                    onPlaybackQualityChange: function (a) {
                      var b = a.target.getPlaybackQuality(),
                        c = jQuery.Event("YTPQualityChange");
                      c.quality = b, jQuery(YTPlayer).trigger(c)
                    },
                    onError: function (a) {
                      150 == a.data && (console.log("Embedding this video is restricted by Youtube."), YTPlayer.isPlayList && jQuery(YTPlayer).playNext()), 2 == a.data && YTPlayer.isPlayList && jQuery(YTPlayer).playNext(), "function" == typeof YTPlayer.opt.onError && YTPlayer.opt.onError($YTPlayer, a)
                    }
                  }
                })
              }
            }))
          }), $YTPlayer.off("YTPTime.mask"), jQuery.mbYTPlayer.applyMask(YTPlayer)
        }
      })
    },
    getDataFromAPI: function (a) {
      if (a.videoData = jQuery.mbStorage.get("YTPlayer_data_" + a.videoID), jQuery(a).off("YTPData.YTPlayer").on("YTPData.YTPlayer", function () {
          if (a.hasData && a.isPlayer && !a.opt.autoPlay) {
            var b = a.videoData.thumb_max || a.videoData.thumb_high || a.videoData.thumb_medium;
            a.opt.containment.css({
              background: "rgba(0,0,0,0.5) url(" + b + ") center center",
              backgroundSize: "cover"
            }), a.opt.backgroundUrl = b
          }
        }), a.videoData) setTimeout(function () {
        a.opt.ratio = "auto" == a.opt.ratio ? "16/9" : a.opt.ratio, a.dataReceived = !0, jQuery(a).trigger("YTPChanged");
        var b = jQuery.Event("YTPData");
        b.prop = {};
        for (var c in a.videoData) b.prop[c] = a.videoData[c];
        jQuery(a).trigger(b)
      }, 500), a.hasData = !0;
      else if (jQuery.mbYTPlayer.apiKey) jQuery.getJSON(jQuery.mbYTPlayer.locationProtocol + "//www.googleapis.com/youtube/v3/videos?id=" + a.videoID + "&key=" + jQuery.mbYTPlayer.apiKey + "&part=snippet", function (b) {
        function c(b) {
          a.videoData = {}, a.videoData.id = a.videoID, a.videoData.channelTitle = b.channelTitle, a.videoData.title = b.title, a.videoData.description = b.description.length < 400 ? b.description : b.description.substring(0, 400) + " ...", a.videoData.aspectratio = "auto" == a.opt.ratio ? "16/9" : a.opt.ratio, a.opt.ratio = a.videoData.aspectratio, a.videoData.thumb_max = b.thumbnails.maxres ? b.thumbnails.maxres.url : null, a.videoData.thumb_high = b.thumbnails.high ? b.thumbnails.high.url : null, a.videoData.thumb_medium = b.thumbnails.medium ? b.thumbnails.medium.url : null, jQuery.mbStorage.set("YTPlayer_data_" + a.videoID, a.videoData)
        }
        a.dataReceived = !0, jQuery(a).trigger("YTPChanged"), c(b.items[0].snippet), a.hasData = !0;
        var d = jQuery.Event("YTPData");
        d.prop = {};
        for (var e in a.videoData) d.prop[e] = a.videoData[e];
        jQuery(a).trigger(d)
      });
      else {
        if (setTimeout(function () {
            jQuery(a).trigger("YTPChanged")
          }, 50), a.isPlayer && !a.opt.autoPlay) {
          var b = jQuery.mbYTPlayer.locationProtocol + "//i.ytimg.com/vi/" + a.videoID + "/hqdefault.jpg";
          a.opt.containment.css({
            background: "rgba(0,0,0,0.5) url(" + b + ") center center",
            backgroundSize: "cover"
          }), a.opt.backgroundUrl = b
        }
        a.videoData = null, a.opt.ratio = "auto" == a.opt.ratio ? "16/9" : a.opt.ratio
      }!a.isPlayer || a.opt.autoPlay || jQuery.browser.mobile || (a.loading = jQuery("<div/>").addClass("loading").html("Loading").hide(), jQuery(a).append(a.loading), a.loading.fadeIn())
    },
    removeStoredData: function () {
      jQuery.mbStorage.remove()
    },
    getVideoData: function () {
      var a = this.get(0);
      return a.videoData
    },
    getVideoID: function () {
      var a = this.get(0);
      return a.videoID || !1
    },
    setVideoQuality: function (a) {
      var b = this.get(0);
      b.player.setPlaybackQuality(a)
    },
    playlist: function (a, b, c, d) {
      var e = this,
        f = e.get(0);
      return f.isPlayList = !0, b && (a = jQuery.shuffle(a)), f.videoID || (f.videos = a, f.videoCounter = 0, f.videoLength = a.length, jQuery(f).data("property", a[0]), jQuery(f).mb_YTPlayer()), "function" == typeof c && jQuery(f).one("YTPChanged", function () {
        c(f)
      }), jQuery(f).on("YTPEnd", function () {
        d = "undefined" == typeof d ? !0 : d, jQuery(f).playNext(d)
      }), e
    },
    playNext: function (a) {
      var b = this.get(0);
      return b.checkForStartAt && (clearTimeout(b.checkForStartAt), clearInterval(b.getState)), b.videoCounter++, b.videoCounter >= b.videoLength && a && (b.videoCounter = 0), b.videoCounter < b.videoLength ? jQuery(b).changeMovie(b.videos[b.videoCounter]) : b.videoCounter--, this
    },
    playPrev: function () {
      var a = this.get(0);
      return a.checkForStartAt && (clearInterval(a.checkForStartAt), clearInterval(a.getState)), a.videoCounter--, a.videoCounter < 0 && (a.videoCounter = a.videoLength - 1), jQuery(a).changeMovie(a.videos[a.videoCounter]), this
    },
    playIndex: function (a) {
      var b = this.get(0);
      return a -= 1, b.checkForStartAt && (clearInterval(b.checkForStartAt), clearInterval(b.getState)), b.videoCounter = a, b.videoCounter >= b.videoLength - 1 && (b.videoCounter = b.videoLength - 1), jQuery(b).changeMovie(b.videos[b.videoCounter]), this
    },
    changeMovie: function (a) {
      var b = this,
        c = b.get(0);
      c.opt.startAt = 0, c.opt.stopAt = 0, c.opt.mask = !1, c.opt.mute = !0, c.hasData = !1, c.hasChanged = !0, c.player.loopTime = void 0, a && jQuery.extend(c.opt, a), c.videoID = getYTPVideoID(c.opt.videoURL).videoID, "true" == c.opt.loop && (c.opt.loop = 9999), jQuery(c.playerEl).CSSAnimate({
        opacity: 0
      }, 200, function () {
        var a = jQuery.Event("YTPChangeMovie");
        a.time = c.currentTime, a.videoId = c.videoID, jQuery(c).trigger(a), jQuery(c).YTPGetPlayer().cueVideoByUrl(encodeURI(jQuery.mbYTPlayer.locationProtocol + "//www.youtube.com/v/" + c.videoID), 1, c.opt.quality), jQuery(c).optimizeDisplay(), jQuery.mbYTPlayer.checkForState(c), jQuery.mbYTPlayer.getDataFromAPI(c)
      }), jQuery.mbYTPlayer.applyMask(c)
    },
    getPlayer: function () {
      return jQuery(this).get(0).player
    },
    playerDestroy: function () {
      var a = this.get(0);
      ytp.YTAPIReady = !0, ytp.backgroundIsInited = !1, a.isInit = !1, a.videoID = null;
      var b = a.wrapper;
      return b.remove(), jQuery("#controlBar_" + a.id).remove(), clearInterval(a.checkForStartAt), clearInterval(a.getState), this
    },
    fullscreen: function (real) {
      function hideMouse() {
        YTPlayer.overlay.css({
          cursor: "none"
        })
      }

      function RunPrefixMethod(a, b) {
        for (var c, d, e = ["webkit", "moz", "ms", "o", ""], f = 0; f < e.length && !a[c];) {
          if (c = b, "" == e[f] && (c = c.substr(0, 1).toLowerCase() + c.substr(1)), c = e[f] + c, d = typeof a[c], "undefined" != d) return e = [e[f]], "function" == d ? a[c]() : a[c];
          f++
        }
      }

      function launchFullscreen(a) {
        RunPrefixMethod(a, "RequestFullScreen")
      }

      function cancelFullscreen() {
        (RunPrefixMethod(document, "FullScreen") || RunPrefixMethod(document, "IsFullScreen")) && RunPrefixMethod(document, "CancelFullScreen")
      }
      var YTPlayer = this.get(0);
      "undefined" == typeof real && (real = YTPlayer.opt.realfullscreen), real = eval(real);
      var controls = jQuery("#controlBar_" + YTPlayer.id),
        fullScreenBtn = controls.find(".mb_OnlyYT"),
        videoWrapper = YTPlayer.isSelf ? YTPlayer.opt.containment : YTPlayer.wrapper;
      if (real) {
        var fullscreenchange = jQuery.browser.mozilla ? "mozfullscreenchange" : jQuery.browser.webkit ? "webkitfullscreenchange" : "fullscreenchange";
        jQuery(document).off(fullscreenchange).on(fullscreenchange, function () {
          var a = RunPrefixMethod(document, "IsFullScreen") || RunPrefixMethod(document, "FullScreen");
          a ? (jQuery(YTPlayer).YTPSetVideoQuality("default"), jQuery(YTPlayer).trigger("YTPFullScreenStart")) : (YTPlayer.isAlone = !1, fullScreenBtn.html(jQuery.mbYTPlayer.controls.onlyYT), jQuery(YTPlayer).YTPSetVideoQuality(YTPlayer.opt.quality), videoWrapper.removeClass("YTPFullscreen"), videoWrapper.CSSAnimate({
            opacity: YTPlayer.opt.opacity
          }, 500), videoWrapper.css({
            zIndex: 0
          }), YTPlayer.isBackground ? jQuery("body").after(controls) : YTPlayer.wrapper.before(controls), jQuery(window).resize(), jQuery(YTPlayer).trigger("YTPFullScreenEnd"))
        })
      }
      return YTPlayer.isAlone ? (jQuery(document).off("mousemove.YTPlayer"), clearTimeout(YTPlayer.hideCursor), YTPlayer.overlay.css({
        cursor: "auto"
      }), real ? cancelFullscreen() : (videoWrapper.CSSAnimate({
        opacity: YTPlayer.opt.opacity
      }, 500), videoWrapper.css({
        zIndex: 0
      })), fullScreenBtn.html(jQuery.mbYTPlayer.controls.onlyYT), YTPlayer.isAlone = !1) : (jQuery(document).on("mousemove.YTPlayer", function (a) {
        YTPlayer.overlay.css({
          cursor: "auto"
        }), clearTimeout(YTPlayer.hideCursor), jQuery(a.target).parents().is(".mb_YTPBar") || (YTPlayer.hideCursor = setTimeout(hideMouse, 3e3))
      }), hideMouse(), real ? (videoWrapper.css({
        opacity: 0
      }), videoWrapper.addClass("YTPFullscreen"), launchFullscreen(videoWrapper.get(0)), setTimeout(function () {
        videoWrapper.CSSAnimate({
          opacity: 1
        }, 1e3), YTPlayer.wrapper.append(controls), jQuery(YTPlayer).optimizeDisplay(), YTPlayer.player.seekTo(YTPlayer.player.getCurrentTime() + .1, !0)
      }, 500)) : videoWrapper.css({
        zIndex: 1e4
      }).CSSAnimate({
        opacity: 1
      }, 1e3), fullScreenBtn.html(jQuery.mbYTPlayer.controls.showSite), YTPlayer.isAlone = !0), this
    },
    toggleLoops: function () {
      var a = this.get(0),
        b = a.opt;
      return 1 == b.loop ? b.loop = 0 : (b.startAt ? a.player.seekTo(b.startAt) : a.player.playVideo(), b.loop = 1), this
    },
    play: function () {
      var a = this.get(0);
      if (!a.isReady) return this;
      a.player.playVideo(), a.wrapper.CSSAnimate({
        opacity: a.isAlone ? 1 : a.opt.opacity
      }, 2e3), jQuery(a.playerEl).CSSAnimate({
        opacity: 1
      }, 1e3);
      var b = jQuery("#controlBar_" + a.id),
        c = b.find(".mb_YTPPlaypause");
      return c.html(jQuery.mbYTPlayer.controls.pause), a.state = 1, jQuery(a).css("background-image", "none"), this
    },
    togglePlay: function (a) {
      var b = this.get(0);
      return 1 == b.state ? this.YTPPause() : this.YTPPlay(), "function" == typeof a && a(b.state), this
    },
    stop: function () {
      var a = this.get(0),
        b = jQuery("#controlBar_" + a.id),
        c = b.find(".mb_YTPPlaypause");
      return c.html(jQuery.mbYTPlayer.controls.play), a.player.stopVideo(), this
    },
    pause: function () {
      var a = this.get(0);
      return a.player.pauseVideo(), a.state = 2, this
    },
    seekTo: function (a) {
      var b = this.get(0);
      return b.player.seekTo(a, !0), this
    },
    setVolume: function (a) {
      var b = this.get(0);
      return a || b.opt.vol || 0 != b.player.getVolume() ? !a && b.player.getVolume() > 0 || a && b.opt.vol == a ? b.isMute ? jQuery(b).YTPUnmute() : jQuery(b).YTPMute() : (b.opt.vol = a, b.player.setVolume(b.opt.vol), b.volumeBar && b.volumeBar.length && b.volumeBar.updateSliderVal(a)) : jQuery(b).YTPUnmute(), this
    },
    toggleVolume: function () {
      var a = this.get(0);
      if (a) return a.player.isMuted() ? (jQuery(a).YTPUnmute(), !0) : (jQuery(a).YTPMute(), !1)
    },
    mute: function () {
      var a = this.get(0);
      if (!a.isMute) {
        a.player.mute(), a.isMute = !0, a.player.setVolume(0), a.volumeBar && a.volumeBar.length && a.volumeBar.width() > 10 && a.volumeBar.updateSliderVal(0);
        var b = jQuery("#controlBar_" + a.id),
          c = b.find(".mb_YTPMuteUnmute");
        c.html(jQuery.mbYTPlayer.controls.unmute), jQuery(a).addClass("isMuted"), a.volumeBar && a.volumeBar.length && a.volumeBar.addClass("muted");
        var d = jQuery.Event("YTPMuted");
        return d.time = a.currentTime, a.canTrigger && jQuery(a).trigger(d), this
      }
    },
    unmute: function () {
      var a = this.get(0);
      if (a.isMute) {
        a.player.unMute(), a.isMute = !1, a.player.setVolume(a.opt.vol), a.volumeBar && a.volumeBar.length && a.volumeBar.updateSliderVal(a.opt.vol > 10 ? a.opt.vol : 10);
        var b = jQuery("#controlBar_" + a.id),
          c = b.find(".mb_YTPMuteUnmute");
        c.html(jQuery.mbYTPlayer.controls.mute), jQuery(a).removeClass("isMuted"), a.volumeBar && a.volumeBar.length && a.volumeBar.removeClass("muted");
        var d = jQuery.Event("YTPUnmuted");
        return d.time = a.currentTime, a.canTrigger && jQuery(a).trigger(d), this
      }
    },
    applyFilter: function (a, b) {
      return this.each(function () {
        var c = this;
        c.filters[a].value = b, c.filtersEnabled && jQuery(c).YTPEnableFilters()
      })
    },
    applyFilters: function (a) {
      return this.each(function () {
        var b = this;
        if (!b.isReady) return void jQuery(b).on("YTPReady", function () {
          jQuery(b).YTPApplyFilters(a)
        });
        for (var c in a) jQuery(b).YTPApplyFilter(c, a[c]);
        jQuery(b).trigger("YTPFiltersApplied")
      })
    },
    toggleFilter: function (a, b) {
      return this.each(function () {
        var c = this;
        c.filters[a].value ? c.filters[a].value = 0 : c.filters[a].value = b, c.filtersEnabled && jQuery(this).YTPEnableFilters()
      })
    },
    toggleFilters: function (a) {
      return this.each(function () {
        var b = this;
        b.filtersEnabled ? (jQuery(b).trigger("YTPDisableFilters"), jQuery(b).YTPDisableFilters()) : (jQuery(b).YTPEnableFilters(), jQuery(b).trigger("YTPEnableFilters")), "function" == typeof a && a(b.filtersEnabled)
      })
    },
    disableFilters: function () {
      return this.each(function () {
        var a = this,
          b = jQuery(a.playerEl);
        b.css("-webkit-filter", ""), b.css("filter", ""), a.filtersEnabled = !1
      })
    },
    enableFilters: function () {
      return this.each(function () {
        var a = this,
          b = jQuery(a.playerEl),
          c = "";
        for (var d in a.filters) a.filters[d].value && (c += d.replace("_", "-") + "(" + a.filters[d].value + a.filters[d].unit + ") ");
        b.css("-webkit-filter", c), b.css("filter", c), a.filtersEnabled = !0
      })
    },
    removeFilter: function (a, b) {
      return this.each(function () {
        var c = this;
        if ("function" == typeof a && (b = a, a = null), a) jQuery(this).YTPApplyFilter(a, 0), "function" == typeof b && b(a);
        else
          for (var d in c.filters) jQuery(this).YTPApplyFilter(d, 0), "function" == typeof b && b(d)
      })
    },
    getFilters: function () {
      var a = this.get(0);
      return a.filters
    },
    addMask: function (a) {
      var b = this.get(0),
        c = b.overlay;
      a || (a = b.actualMask);
      var d = jQuery("<img/>").attr("src", a).on("load", function () {
        c.CSSAnimate({
          opacity: 0
        }, 500, function () {
          b.hasMask = !0, d.remove(), c.css({
            backgroundImage: "url(" + a + ")",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center center",
            backgroundSize: "cover"
          }), c.CSSAnimate({
            opacity: 1
          }, 500)
        })
      });
      return this
    },
    removeMask: function () {
      var a = this.get(0),
        b = a.overlay;
      return b.CSSAnimate({
        opacity: 0
      }, 500, function () {
        a.hasMask = !1, b.css({
          backgroundImage: "",
          backgroundRepeat: "",
          backgroundPosition: "",
          backgroundSize: ""
        }), b.CSSAnimate({
          opacity: 1
        }, 500)
      }), this
    },
    applyMask: function (a) {
      var b = jQuery(a);
      if (b.off("YTPTime.mask"), a.opt.mask)
        if ("string" == typeof a.opt.mask) b.YTPAddMask(a.opt.mask), a.actualMask = a.opt.mask;
        else if ("object" == typeof a.opt.mask) {
        for (var c in a.opt.mask)
          if (a.opt.mask[c]) {
            jQuery("<img/>").attr("src", a.opt.mask[c])
          } a.opt.mask[0] && b.YTPAddMask(a.opt.mask[0]), b.on("YTPTime.mask", function (c) {
          for (var d in a.opt.mask) c.time == d && (a.opt.mask[d] ? (b.YTPAddMask(a.opt.mask[d]), a.actualMask = a.opt.mask[d]) : b.YTPRemoveMask())
        })
      }
    },
    toggleMask: function () {
      var a = this.get(0),
        b = $(a);
      return a.hasMask ? b.YTPRemoveMask() : b.YTPAddMask(), this
    },
    manageProgress: function () {
      var a = this.get(0),
        b = jQuery("#controlBar_" + a.id),
        c = b.find(".mb_YTPProgress"),
        d = b.find(".mb_YTPLoaded"),
        e = b.find(".mb_YTPseekbar"),
        f = c.outerWidth(),
        g = Math.floor(a.player.getCurrentTime()),
        h = Math.floor(a.player.getDuration()),
        i = g * f / h,
        j = 0,
        k = 100 * a.player.getVideoLoadedFraction();
      return d.css({
        left: j,
        width: k + "%"
      }), e.css({
        left: 0,
        width: i
      }), {
        totalTime: h,
        currentTime: g
      }
    },
    buildControls: function (YTPlayer) {
      var data = YTPlayer.opt;
      if (data.showYTLogo = data.showYTLogo || data.printUrl, !jQuery("#controlBar_" + YTPlayer.id).length) {
        YTPlayer.controlBar = jQuery("<span/>").attr("id", "controlBar_" + YTPlayer.id).addClass("mb_YTPBar").css({
          whiteSpace: "noWrap",
          position: YTPlayer.isBackground ? "fixed" : "absolute",
          zIndex: YTPlayer.isBackground ? 1e4 : 1e3
        }).hide();
        var buttonBar = jQuery("<div/>").addClass("buttonBar"),
          playpause = jQuery("<span>" + jQuery.mbYTPlayer.controls.play + "</span>").addClass("mb_YTPPlaypause ytpicon").click(function () {
            1 == YTPlayer.player.getPlayerState() ? jQuery(YTPlayer).YTPPause() : jQuery(YTPlayer).YTPPlay()
          }),
          MuteUnmute = jQuery("<span>" + jQuery.mbYTPlayer.controls.mute + "</span>").addClass("mb_YTPMuteUnmute ytpicon").click(function () {
            0 == YTPlayer.player.getVolume() ? jQuery(YTPlayer).YTPUnmute() : jQuery(YTPlayer).YTPMute()
          }),
          volumeBar = jQuery("<div/>").addClass("mb_YTPVolumeBar").css({
            display: "inline-block"
          });
        YTPlayer.volumeBar = volumeBar;
        var idx = jQuery("<span/>").addClass("mb_YTPTime"),
          vURL = data.videoURL ? data.videoURL : "";
        vURL.indexOf("http") < 0 && (vURL = jQuery.mbYTPlayer.locationProtocol + "//www.youtube.com/watch?v=" + data.videoURL);
        var movieUrl = jQuery("<span/>").html(jQuery.mbYTPlayer.controls.ytLogo).addClass("mb_YTPUrl ytpicon").attr("title", "view on YouTube").on("click", function () {
            window.open(vURL, "viewOnYT")
          }),
          onlyVideo = jQuery("<span/>").html(jQuery.mbYTPlayer.controls.onlyYT).addClass("mb_OnlyYT ytpicon").on("click", function () {
            jQuery(YTPlayer).YTPFullscreen(data.realfullscreen)
          }),
          progressBar = jQuery("<div/>").addClass("mb_YTPProgress").css("position", "absolute").click(function (a) {
            timeBar.css({
              width: a.clientX - timeBar.offset().left
            }), YTPlayer.timeW = a.clientX - timeBar.offset().left, YTPlayer.controlBar.find(".mb_YTPLoaded").css({
              width: 0
            });
            var b = Math.floor(YTPlayer.player.getDuration());
            YTPlayer["goto"] = timeBar.outerWidth() * b / progressBar.outerWidth(), YTPlayer.player.seekTo(parseFloat(YTPlayer["goto"]), !0), YTPlayer.controlBar.find(".mb_YTPLoaded").css({
              width: 0
            })
          }),
          loadedBar = jQuery("<div/>").addClass("mb_YTPLoaded").css("position", "absolute"),
          timeBar = jQuery("<div/>").addClass("mb_YTPseekbar").css("position", "absolute");
        progressBar.append(loadedBar).append(timeBar), buttonBar.append(playpause).append(MuteUnmute).append(volumeBar).append(idx), data.showYTLogo && buttonBar.append(movieUrl), (YTPlayer.isBackground || eval(YTPlayer.opt.realfullscreen) && !YTPlayer.isBackground) && buttonBar.append(onlyVideo), YTPlayer.controlBar.append(buttonBar).append(progressBar), YTPlayer.isBackground ? jQuery("body").after(YTPlayer.controlBar) : (YTPlayer.controlBar.addClass("inlinePlayer"), YTPlayer.wrapper.before(YTPlayer.controlBar)), volumeBar.simpleSlider({
          initialval: YTPlayer.opt.vol,
          scale: 100,
          orientation: "h",
          callback: function (a) {
            0 == a.value ? jQuery(YTPlayer).YTPMute() : jQuery(YTPlayer).YTPUnmute(), YTPlayer.player.setVolume(a.value), YTPlayer.isMute || (YTPlayer.opt.vol = a.value)
          }
        })
      }
    },
    checkForState: function (YTPlayer) {
      var interval = YTPlayer.opt.showControls ? 100 : 400;
      return clearInterval(YTPlayer.getState), jQuery.contains(document, YTPlayer) ? (jQuery.mbYTPlayer.checkForStart(YTPlayer), void(YTPlayer.getState = setInterval(function () {
        var prog = jQuery(YTPlayer).YTPManageProgress(),
          $YTPlayer = jQuery(YTPlayer),
          data = YTPlayer.opt,
          startAt = YTPlayer.opt.startAt ? YTPlayer.opt.startAt : 1,
          stopAt = YTPlayer.opt.stopAt > YTPlayer.opt.startAt ? YTPlayer.opt.stopAt : 0;
        if (stopAt = stopAt < YTPlayer.player.getDuration() ? stopAt : 0, YTPlayer.currentTime != prog.currentTime) {
          var YTPEvent = jQuery.Event("YTPTime");
          YTPEvent.time = YTPlayer.currentTime, jQuery(YTPlayer).trigger(YTPEvent)
        }
        if (YTPlayer.currentTime = prog.currentTime, YTPlayer.totalTime = YTPlayer.player.getDuration(), 0 == YTPlayer.player.getVolume() ? $YTPlayer.addClass("isMuted") : $YTPlayer.removeClass("isMuted"), YTPlayer.opt.showControls && (prog.totalTime ? YTPlayer.controlBar.find(".mb_YTPTime").html(jQuery.mbYTPlayer.formatTime(prog.currentTime) + " / " + jQuery.mbYTPlayer.formatTime(prog.totalTime)) : YTPlayer.controlBar.find(".mb_YTPTime").html("-- : -- / -- : --")), eval(YTPlayer.opt.stopMovieOnBlur) && (document.hasFocus() ? document.hasFocus() && !YTPlayer.hasFocus && -1 != YTPlayer.state && 0 != YTPlayer.state && (YTPlayer.hasFocus = !0, $YTPlayer.YTPPlay()) : 1 == YTPlayer.state && (YTPlayer.hasFocus = !1, $YTPlayer.YTPPause())), YTPlayer.controlBar.length && YTPlayer.controlBar.outerWidth() <= 400 && !YTPlayer.isCompact ? (YTPlayer.controlBar.addClass("compact"), YTPlayer.isCompact = !0, !YTPlayer.isMute && YTPlayer.volumeBar && YTPlayer.volumeBar.updateSliderVal(YTPlayer.opt.vol)) : YTPlayer.controlBar.length && YTPlayer.controlBar.outerWidth() > 400 && YTPlayer.isCompact && (YTPlayer.controlBar.removeClass("compact"), YTPlayer.isCompact = !1, !YTPlayer.isMute && YTPlayer.volumeBar && YTPlayer.volumeBar.updateSliderVal(YTPlayer.opt.vol)), 1 == YTPlayer.player.getPlayerState() && (parseFloat(YTPlayer.player.getDuration() - 1.5) < YTPlayer.player.getCurrentTime() || stopAt > 0 && parseFloat(YTPlayer.player.getCurrentTime()) > stopAt)) {
          if (YTPlayer.isEnded) return;
          if (YTPlayer.isEnded = !0, setTimeout(function () {
              YTPlayer.isEnded = !1
            }, 1e3), YTPlayer.isPlayList) {
            if (!data.loop || data.loop > 0 && YTPlayer.player.loopTime === data.loop - 1) {
              YTPlayer.player.loopTime = void 0, clearInterval(YTPlayer.getState);
              var YTPEnd = jQuery.Event("YTPEnd");
              return YTPEnd.time = YTPlayer.currentTime, void jQuery(YTPlayer).trigger(YTPEnd)
            }
          } else if (!data.loop || data.loop > 0 && YTPlayer.player.loopTime === data.loop - 1) return YTPlayer.player.loopTime = void 0, YTPlayer.preventTrigger = !0, YTPlayer.state = 2, jQuery(YTPlayer).YTPPause(), void YTPlayer.wrapper.CSSAnimate({
            opacity: 0
          }, 500, function () {
            YTPlayer.controlBar.length && YTPlayer.controlBar.find(".mb_YTPPlaypause").html(jQuery.mbYTPlayer.controls.play);
            var a = jQuery.Event("YTPEnd");
            a.time = YTPlayer.currentTime, jQuery(YTPlayer).trigger(a), YTPlayer.player.seekTo(startAt, !0), YTPlayer.isBackground || YTPlayer.opt.containment.css({
              background: "rgba(0,0,0,0.5) url(" + YTPlayer.opt.backgroundUrl + ") center center",
              backgroundSize: "cover"
            })
          });
          YTPlayer.player.loopTime = YTPlayer.player.loopTime ? ++YTPlayer.player.loopTime : 1, startAt = startAt || 1, YTPlayer.preventTrigger = !0, YTPlayer.state = 2, jQuery(YTPlayer).YTPPause(), YTPlayer.player.seekTo(startAt, !0), $YTPlayer.YTPPlay()
        }
      }, interval))) : (jQuery(YTPlayer).YTPPlayerDestroy(), clearInterval(YTPlayer.getState), void clearInterval(YTPlayer.checkForStartAt))
    },
    getTime: function () {
      var a = this.get(0);
      return jQuery.mbYTPlayer.formatTime(a.currentTime)
    },
    getTotalTime: function () {
      var a = this.get(0);
      return jQuery.mbYTPlayer.formatTime(a.totalTime)
    },
    checkForStart: function (a) {
      var b = jQuery(a);
      if (!jQuery.contains(document, a)) return void jQuery(a).YTPPlayerDestroy();
      if (a.preventTrigger = !0, a.state = 2, jQuery(a).YTPPause(), jQuery(a).muteYTPVolume(), jQuery("#controlBar_" + a.id).remove(), a.controlBar = !1, a.opt.showControls && jQuery.mbYTPlayer.buildControls(a), a.opt.addRaster) {
        var c = "dot" == a.opt.addRaster ? "raster-dot" : "raster";
        a.overlay.addClass(a.isRetina ? c + " retina" : c)
      } else a.overlay.removeClass(function (a, b) {
        var c = b.split(" "),
          d = [];
        return jQuery.each(c, function (a, b) {
          /raster.*/.test(b) && d.push(b)
        }), d.push("retina"), d.join(" ")
      });
      var d = a.opt.startAt ? a.opt.startAt : 1;
      a.player.playVideo(), a.player.seekTo(d, !0), a.checkForStartAt = setInterval(function () {
        jQuery(a).YTPMute();
        var c = a.player.getVideoLoadedFraction() >= d / a.player.getDuration();
        if (a.player.getDuration() > 0 && a.player.getCurrentTime() >= d && c) {
          clearInterval(a.checkForStartAt), "function" == typeof a.opt.onReady && a.opt.onReady(a), a.isReady = !0;
          var e = jQuery.Event("YTPReady");
          if (e.time = a.currentTime, jQuery(a).trigger(e), a.preventTrigger = !0, a.state = 2, jQuery(a).YTPPause(), a.opt.mute || jQuery(a).YTPUnmute(), a.canTrigger = !0, a.opt.autoPlay) {
            var f = jQuery.Event("YTPStart");
            f.time = a.currentTime, jQuery(a).trigger(f), b.css("background-image", "none"), jQuery(a.playerEl).CSSAnimate({
              opacity: 1
            }, 1e3), b.YTPPlay(), a.wrapper.CSSAnimate({
              opacity: a.isAlone ? 1 : a.opt.opacity
            }, 1e3), jQuery.browser.safari && (a.safariPlay = setInterval(function () {
              1 != a.state ? b.YTPPlay() : clearInterval(a.safariPlay)
            }, 10)), b.on("YTPReady", function () {
              b.YTPPlay()
            })
          } else a.player.pauseVideo(), a.isPlayer || (jQuery(a.playerEl).CSSAnimate({
            opacity: 1
          }, 500), a.wrapper.CSSAnimate({
            opacity: a.isAlone ? 1 : a.opt.opacity
          }, 500)), a.controlBar.length && a.controlBar.find(".mb_YTPPlaypause").html(jQuery.mbYTPlayer.controls.play);
          a.isPlayer && !a.opt.autoPlay && a.loading && a.loading.length && (a.loading.html("Ready"), setTimeout(function () {
            a.loading.fadeOut()
          }, 100)), a.controlBar && a.controlBar.length && a.controlBar.slideDown(1e3)
        } else jQuery.browser.safari && (a.player.playVideo(), d >= 0 && a.player.seekTo(d, !0))
      }, 1)
    },
    setAlign: function (a) {
      var b = this;
      b.optimizeDisplay(a)
    },
    getAlign: function () {
      var a = this.get(0);
      return a.opt.align
    },
    formatTime: function (a) {
      var b = Math.floor(a / 60),
        c = Math.floor(a - 60 * b);
      return (9 >= b ? "0" + b : b) + " : " + (9 >= c ? "0" + c : c)
    }
  }, jQuery.fn.optimizeDisplay = function (a) {
    var b = this.get(0),
      c = jQuery(b.playerEl),
      d = {};
    b.opt.align = a || b.opt.align, b.opt.align = "undefined " != typeof b.opt.align ? b.opt.align : "center,center";
    var e = b.opt.align.split(",");
    if (b.opt.optimizeDisplay) {
      var f = {},
        g = b.wrapper;
      f.width = g.outerWidth(), f.height = g.outerHeight(), d.width = f.width, d.height = "16/9" == b.opt.ratio ? Math.ceil(f.width * (9 / 16)) : Math.ceil(.75 * f.width), d.width = f.width, d.height = "16/9" == b.opt.ratio ? Math.ceil(f.width * (9 / 16)) : Math.ceil(.75 * f.width), d.marginTop = -((d.height - f.height) / 2), d.marginLeft = 0;
      var h = d.height < f.height;
      h && (d.height = f.height, d.width = "16/9" == b.opt.ratio ? Math.floor(f.height * (16 / 9)) : Math.floor(f.height * (4 / 3)), d.marginTop = 0, d.marginLeft = -((d.width - f.width) / 2));
      for (var i in e) {
        var j = e[i].trim();
        switch (j) {
          case "top":
            d.marginTop = h ? -((d.height - f.height) / 2) : 0;
            break;
          case "bottom":
            d.marginTop = h ? 0 : -(d.height - f.height);
            break;
          case "left":
            d.marginLeft = 0;
            break;
          case "right":
            d.marginLeft = h ? -(d.width - f.width) : 0
        }
      }
    } else d.width = "100%", d.height = "100%", d.marginTop = 0, d.marginLeft = 0;
    c.css({
      width: d.width,
      height: d.height,
      marginTop: d.marginTop,
      marginLeft: d.marginLeft
    })
  }, jQuery.shuffle = function (a) {
    for (var b = a.slice(), c = b.length, d = c; d--;) {
      var e = parseInt(Math.random() * c),
        f = b[d];
      b[d] = b[e], b[e] = f
    }
    return b
  }, jQuery.fn.unselectable = function () {
    return this.each(function () {
      jQuery(this).css({
        "-moz-user-select": "none",
        "-webkit-user-select": "none",
        "user-select": "none"
      }).attr("unselectable", "on")
    })
  }, jQuery.fn.YTPlayer = jQuery.mbYTPlayer.buildPlayer, jQuery.fn.YTPGetPlayer = jQuery.mbYTPlayer.getPlayer, jQuery.fn.YTPGetVideoID = jQuery.mbYTPlayer.getVideoID, jQuery.fn.YTPChangeMovie = jQuery.mbYTPlayer.changeMovie, jQuery.fn.YTPPlayerDestroy = jQuery.mbYTPlayer.playerDestroy, jQuery.fn.YTPPlay = jQuery.mbYTPlayer.play, jQuery.fn.YTPTogglePlay = jQuery.mbYTPlayer.togglePlay, jQuery.fn.YTPStop = jQuery.mbYTPlayer.stop, jQuery.fn.YTPPause = jQuery.mbYTPlayer.pause, jQuery.fn.YTPSeekTo = jQuery.mbYTPlayer.seekTo, jQuery.fn.YTPlaylist = jQuery.mbYTPlayer.playlist, jQuery.fn.YTPPlayNext = jQuery.mbYTPlayer.playNext, jQuery.fn.YTPPlayPrev = jQuery.mbYTPlayer.playPrev, jQuery.fn.YTPPlayIndex = jQuery.mbYTPlayer.playIndex, jQuery.fn.YTPMute = jQuery.mbYTPlayer.mute, jQuery.fn.YTPUnmute = jQuery.mbYTPlayer.unmute, jQuery.fn.YTPToggleVolume = jQuery.mbYTPlayer.toggleVolume, jQuery.fn.YTPSetVolume = jQuery.mbYTPlayer.setVolume, jQuery.fn.YTPGetVideoData = jQuery.mbYTPlayer.getVideoData, jQuery.fn.YTPFullscreen = jQuery.mbYTPlayer.fullscreen, jQuery.fn.YTPToggleLoops = jQuery.mbYTPlayer.toggleLoops, jQuery.fn.YTPSetVideoQuality = jQuery.mbYTPlayer.setVideoQuality, jQuery.fn.YTPManageProgress = jQuery.mbYTPlayer.manageProgress, jQuery.fn.YTPApplyFilter = jQuery.mbYTPlayer.applyFilter, jQuery.fn.YTPApplyFilters = jQuery.mbYTPlayer.applyFilters, jQuery.fn.YTPToggleFilter = jQuery.mbYTPlayer.toggleFilter, jQuery.fn.YTPToggleFilters = jQuery.mbYTPlayer.toggleFilters, jQuery.fn.YTPRemoveFilter = jQuery.mbYTPlayer.removeFilter, jQuery.fn.YTPDisableFilters = jQuery.mbYTPlayer.disableFilters, jQuery.fn.YTPEnableFilters = jQuery.mbYTPlayer.enableFilters, jQuery.fn.YTPGetFilters = jQuery.mbYTPlayer.getFilters, jQuery.fn.YTPGetTime = jQuery.mbYTPlayer.getTime, jQuery.fn.YTPGetTotalTime = jQuery.mbYTPlayer.getTotalTime, jQuery.fn.YTPAddMask = jQuery.mbYTPlayer.addMask, jQuery.fn.YTPRemoveMask = jQuery.mbYTPlayer.removeMask, jQuery.fn.YTPToggleMask = jQuery.mbYTPlayer.toggleMask, jQuery.fn.YTPSetAlign = jQuery.mbYTPlayer.setAlign, jQuery.fn.YTPGetAlign = jQuery.mbYTPlayer.getAlign, jQuery.fn.mb_YTPlayer = jQuery.mbYTPlayer.buildPlayer, jQuery.fn.playNext = jQuery.mbYTPlayer.playNext, jQuery.fn.playPrev = jQuery.mbYTPlayer.playPrev, jQuery.fn.changeMovie = jQuery.mbYTPlayer.changeMovie, jQuery.fn.getVideoID = jQuery.mbYTPlayer.getVideoID, jQuery.fn.getPlayer = jQuery.mbYTPlayer.getPlayer, jQuery.fn.playerDestroy = jQuery.mbYTPlayer.playerDestroy, jQuery.fn.fullscreen = jQuery.mbYTPlayer.fullscreen, jQuery.fn.buildYTPControls = jQuery.mbYTPlayer.buildControls, jQuery.fn.playYTP = jQuery.mbYTPlayer.play, jQuery.fn.toggleLoops = jQuery.mbYTPlayer.toggleLoops, jQuery.fn.stopYTP = jQuery.mbYTPlayer.stop, jQuery.fn.pauseYTP = jQuery.mbYTPlayer.pause, jQuery.fn.seekToYTP = jQuery.mbYTPlayer.seekTo, jQuery.fn.muteYTPVolume = jQuery.mbYTPlayer.mute, jQuery.fn.unmuteYTPVolume = jQuery.mbYTPlayer.unmute, jQuery.fn.setYTPVolume = jQuery.mbYTPlayer.setVolume, jQuery.fn.setVideoQuality = jQuery.mbYTPlayer.setVideoQuality, jQuery.fn.manageYTPProgress = jQuery.mbYTPlayer.manageProgress, jQuery.fn.YTPGetDataFromFeed = jQuery.mbYTPlayer.getVideoData
}(jQuery, ytp), jQuery.support.CSStransition = function () {
  var a = document.body || document.documentElement,
    b = a.style;
  return void 0 !== b.transition || void 0 !== b.WebkitTransition || void 0 !== b.MozTransition || void 0 !== b.MsTransition || void 0 !== b.OTransition
}(), jQuery.CSS = {
  name: "mb.CSSAnimate",
  author: "Matteo Bicocchi",
  version: "2.0.0",
  transitionEnd: "transitionEnd",
  sfx: "",
  filters: {
    blur: {
      min: 0,
      max: 100,
      unit: "px"
    },
    brightness: {
      min: 0,
      max: 400,
      unit: "%"
    },
    contrast: {
      min: 0,
      max: 400,
      unit: "%"
    },
    grayscale: {
      min: 0,
      max: 100,
      unit: "%"
    },
    hueRotate: {
      min: 0,
      max: 360,
      unit: "deg"
    },
    invert: {
      min: 0,
      max: 100,
      unit: "%"
    },
    saturate: {
      min: 0,
      max: 400,
      unit: "%"
    },
    sepia: {
      min: 0,
      max: 100,
      unit: "%"
    }
  },
  normalizeCss: function (a) {
    var b = jQuery.extend(!0, {}, a);
    jQuery.browser.webkit || jQuery.browser.opera ? jQuery.CSS.sfx = "-webkit-" : jQuery.browser.mozilla ? jQuery.CSS.sfx = "-moz-" : jQuery.browser.msie && (jQuery.CSS.sfx = "-ms-");
    for (var c in b) {
      "transform" === c && (b[jQuery.CSS.sfx + "transform"] = b[c], delete b[c]), "transform-origin" === c && (b[jQuery.CSS.sfx + "transform-origin"] = a[c], delete b[c]), "filter" !== c || jQuery.browser.mozilla || (b[jQuery.CSS.sfx + "filter"] = a[c], delete b[c]), "blur" === c && setFilter(b, "blur", a[c]), "brightness" === c && setFilter(b, "brightness", a[c]), "contrast" === c && setFilter(b, "contrast", a[c]), "grayscale" === c && setFilter(b, "grayscale", a[c]), "hueRotate" === c && setFilter(b, "hueRotate", a[c]), "invert" === c && setFilter(b, "invert", a[c]), "saturate" === c && setFilter(b, "saturate", a[c]), "sepia" === c && setFilter(b, "sepia", a[c]);
      var d = "";
      "x" === c && (d = jQuery.CSS.sfx + "transform", b[d] = b[d] || "", b[d] += " translateX(" + setUnit(a[c], "px") + ")", delete b[c]), "y" === c && (d = jQuery.CSS.sfx + "transform", b[d] = b[d] || "", b[d] += " translateY(" + setUnit(a[c], "px") + ")", delete b[c]), "z" === c && (d = jQuery.CSS.sfx + "transform", b[d] = b[d] || "", b[d] += " translateZ(" + setUnit(a[c], "px") + ")", delete b[c]), "rotate" === c && (d = jQuery.CSS.sfx + "transform", b[d] = b[d] || "", b[d] += " rotate(" + setUnit(a[c], "deg") + ")", delete b[c]), "rotateX" === c && (d = jQuery.CSS.sfx + "transform", b[d] = b[d] || "", b[d] += " rotateX(" + setUnit(a[c], "deg") + ")", delete b[c]), "rotateY" === c && (d = jQuery.CSS.sfx + "transform", b[d] = b[d] || "", b[d] += " rotateY(" + setUnit(a[c], "deg") + ")", delete b[c]), "rotateZ" === c && (d = jQuery.CSS.sfx + "transform", b[d] = b[d] || "", b[d] += " rotateZ(" + setUnit(a[c], "deg") + ")", delete b[c]), "scale" === c && (d = jQuery.CSS.sfx + "transform", b[d] = b[d] || "", b[d] += " scale(" + setUnit(a[c], "") + ")", delete b[c]), "scaleX" === c && (d = jQuery.CSS.sfx + "transform", b[d] = b[d] || "", b[d] += " scaleX(" + setUnit(a[c], "") + ")", delete b[c]), "scaleY" === c && (d = jQuery.CSS.sfx + "transform", b[d] = b[d] || "", b[d] += " scaleY(" + setUnit(a[c], "") + ")", delete b[c]), "scaleZ" === c && (d = jQuery.CSS.sfx + "transform", b[d] = b[d] || "", b[d] += " scaleZ(" + setUnit(a[c], "") + ")", delete b[c]), "skew" === c && (d = jQuery.CSS.sfx + "transform", b[d] = b[d] || "", b[d] += " skew(" + setUnit(a[c], "deg") + ")", delete b[c]), "skewX" === c && (d = jQuery.CSS.sfx + "transform", b[d] = b[d] || "", b[d] += " skewX(" + setUnit(a[c], "deg") + ")", delete b[c]), "skewY" === c && (d = jQuery.CSS.sfx + "transform", b[d] = b[d] || "", b[d] += " skewY(" + setUnit(a[c], "deg") + ")", delete b[c]), "perspective" === c && (d = jQuery.CSS.sfx + "transform", b[d] = b[d] || "", b[d] += " perspective(" + setUnit(a[c], "px") + ")", delete b[c])
    }
    return b
  },
  getProp: function (a) {
    var b = [];
    for (var c in a) b.indexOf(c) < 0 && b.push(uncamel(c));
    return b.join(",")
  },
  animate: function (a, b, c, d, e) {
    return this.each(function () {
      function f() {
        g.called = !0, g.CSSAIsRunning = !1, h.off(jQuery.CSS.transitionEnd + "." + g.id), clearTimeout(g.timeout), h.css(jQuery.CSS.sfx + "transition", ""), "function" == typeof e && e.apply(g), "function" == typeof g.CSSqueue && (g.CSSqueue(), g.CSSqueue = null)
      }
      var g = this,
        h = jQuery(this);
      g.id = g.id || "CSSA_" + (new Date).getTime();
      var i = i || {
        type: "noEvent"
      };
      if (g.CSSAIsRunning && g.eventType == i.type && !jQuery.browser.msie && jQuery.browser.version <= 9) return void(g.CSSqueue = function () {
        h.CSSAnimate(a, b, c, d, e)
      });
      if (g.CSSqueue = null, g.eventType = i.type, 0 !== h.length && a) {
        if (a = jQuery.normalizeCss(a), g.CSSAIsRunning = !0, "function" == typeof b && (e = b, b = jQuery.fx.speeds._default), "function" == typeof c && (d = c, c = 0), "string" == typeof c && (e = c, c = 0), "function" == typeof d && (e = d, d = "cubic-bezier(0.65,0.03,0.36,0.72)"), "string" == typeof b)
          for (var j in jQuery.fx.speeds) {
            if (b == j) {
              b = jQuery.fx.speeds[j];
              break
            }
            b = jQuery.fx.speeds._default
          }
        if (b || (b = jQuery.fx.speeds._default), "string" == typeof e && (d = e, e = null), !jQuery.support.CSStransition) {
          for (var k in a) {
            if ("transform" === k && delete a[k], "filter" === k && delete a[k], "transform-origin" === k && delete a[k], "auto" === a[k] && delete a[k], "x" === k) {
              var l = a[k],
                m = "left";
              a[m] = l, delete a[k]
            }
            if ("y" === k) {
              var l = a[k],
                m = "top";
              a[m] = l, delete a[k]
            }("-ms-transform" === k || "-ms-filter" === k) && delete a[k]
          }
          return void h.delay(c).animate(a, b, e)
        }
        var n = {
          "default": "ease",
          "in": "ease-in",
          out: "ease-out",
          "in-out": "ease-in-out",
          snap: "cubic-bezier(0,1,.5,1)",
          easeOutCubic: "cubic-bezier(.215,.61,.355,1)",
          easeInOutCubic: "cubic-bezier(.645,.045,.355,1)",
          easeInCirc: "cubic-bezier(.6,.04,.98,.335)",
          easeOutCirc: "cubic-bezier(.075,.82,.165,1)",
          easeInOutCirc: "cubic-bezier(.785,.135,.15,.86)",
          easeInExpo: "cubic-bezier(.95,.05,.795,.035)",
          easeOutExpo: "cubic-bezier(.19,1,.22,1)",
          easeInOutExpo: "cubic-bezier(1,0,0,1)",
          easeInQuad: "cubic-bezier(.55,.085,.68,.53)",
          easeOutQuad: "cubic-bezier(.25,.46,.45,.94)",
          easeInOutQuad: "cubic-bezier(.455,.03,.515,.955)",
          easeInQuart: "cubic-bezier(.895,.03,.685,.22)",
          easeOutQuart: "cubic-bezier(.165,.84,.44,1)",
          easeInOutQuart: "cubic-bezier(.77,0,.175,1)",
          easeInQuint: "cubic-bezier(.755,.05,.855,.06)",
          easeOutQuint: "cubic-bezier(.23,1,.32,1)",
          easeInOutQuint: "cubic-bezier(.86,0,.07,1)",
          easeInSine: "cubic-bezier(.47,0,.745,.715)",
          easeOutSine: "cubic-bezier(.39,.575,.565,1)",
          easeInOutSine: "cubic-bezier(.445,.05,.55,.95)",
          easeInBack: "cubic-bezier(.6,-.28,.735,.045)",
          easeOutBack: "cubic-bezier(.175, .885,.32,1.275)",
          easeInOutBack: "cubic-bezier(.68,-.55,.265,1.55)"
        };
        n[d] && (d = n[d]), h.off(jQuery.CSS.transitionEnd + "." + g.id);
        var o = jQuery.CSS.getProp(a),
          p = {};
        jQuery.extend(p, a), p[jQuery.CSS.sfx + "transition-property"] = o, p[jQuery.CSS.sfx + "transition-duration"] = b + "ms", p[jQuery.CSS.sfx + "transition-delay"] = c + "ms", p[jQuery.CSS.sfx + "transition-timing-function"] = d, setTimeout(function () {
          h.one(jQuery.CSS.transitionEnd + "." + g.id, f), h.css(p)
        }, 1), g.timeout = setTimeout(function () {
          return g.called || !e ? (g.called = !1, void(g.CSSAIsRunning = !1)) : (h.css(jQuery.CSS.sfx + "transition", ""), e.apply(g), g.CSSAIsRunning = !1, void("function" == typeof g.CSSqueue && (g.CSSqueue(), g.CSSqueue = null)))
        }, b + c + 10)
      }
    })
  }
}, jQuery.fn.CSSAnimate = jQuery.CSS.animate, jQuery.normalizeCss = jQuery.CSS.normalizeCss, jQuery.fn.css3 = function (a) {
  return this.each(function () {
    var b = jQuery(this),
      c = jQuery.normalizeCss(a);
    b.css(c)
  })
};
var nAgt = navigator.userAgent;
if (!jQuery.browser) {
  jQuery.browser = {}, jQuery.browser.mozilla = !1, jQuery.browser.webkit = !1, jQuery.browser.opera = !1, jQuery.browser.safari = !1, jQuery.browser.chrome = !1, jQuery.browser.androidStock = !1, jQuery.browser.msie = !1, jQuery.browser.ua = nAgt, jQuery.browser.name = navigator.appName, jQuery.browser.fullVersion = "" + parseFloat(navigator.appVersion), jQuery.browser.majorVersion = parseInt(navigator.appVersion, 10);
  var nameOffset, verOffset, ix;
  if (-1 != (verOffset = nAgt.indexOf("Opera"))) jQuery.browser.opera = !0, jQuery.browser.name = "Opera", jQuery.browser.fullVersion = nAgt.substring(verOffset + 6), -1 != (verOffset = nAgt.indexOf("Version")) && (jQuery.browser.fullVersion = nAgt.substring(verOffset + 8));
  else if (-1 != (verOffset = nAgt.indexOf("OPR"))) jQuery.browser.opera = !0, jQuery.browser.name = "Opera", jQuery.browser.fullVersion = nAgt.substring(verOffset + 4);
  else if (-1 != (verOffset = nAgt.indexOf("MSIE"))) jQuery.browser.msie = !0, jQuery.browser.name = "Microsoft Internet Explorer", jQuery.browser.fullVersion = nAgt.substring(verOffset + 5);
  else if (-1 != nAgt.indexOf("Trident") || -1 != nAgt.indexOf("Edge")) {
    jQuery.browser.msie = !0, jQuery.browser.name = "Microsoft Internet Explorer";
    var start = nAgt.indexOf("rv:") + 3,
      end = start + 4;
    jQuery.browser.fullVersion = nAgt.substring(start, end)
  } else -1 != (verOffset = nAgt.indexOf("Chrome")) ? (jQuery.browser.webkit = !0, jQuery.browser.chrome = !0, jQuery.browser.name = "Chrome", jQuery.browser.fullVersion = nAgt.substring(verOffset + 7)) : nAgt.indexOf("mozilla/5.0") > -1 && nAgt.indexOf("android ") > -1 && nAgt.indexOf("applewebkit") > -1 && !(nAgt.indexOf("chrome") > -1) ? (verOffset = nAgt.indexOf("Chrome"), jQuery.browser.webkit = !0, jQuery.browser.androidStock = !0, jQuery.browser.name = "androidStock", jQuery.browser.fullVersion = nAgt.substring(verOffset + 7)) : -1 != (verOffset = nAgt.indexOf("Safari")) ? (jQuery.browser.webkit = !0, jQuery.browser.safari = !0, jQuery.browser.name = "Safari", jQuery.browser.fullVersion = nAgt.substring(verOffset + 7), -1 != (verOffset = nAgt.indexOf("Version")) && (jQuery.browser.fullVersion = nAgt.substring(verOffset + 8))) : -1 != (verOffset = nAgt.indexOf("AppleWebkit")) ? (jQuery.browser.webkit = !0, jQuery.browser.safari = !0, jQuery.browser.name = "Safari", jQuery.browser.fullVersion = nAgt.substring(verOffset + 7), -1 != (verOffset = nAgt.indexOf("Version")) && (jQuery.browser.fullVersion = nAgt.substring(verOffset + 8))) : -1 != (verOffset = nAgt.indexOf("Firefox")) ? (jQuery.browser.mozilla = !0, jQuery.browser.name = "Firefox", jQuery.browser.fullVersion = nAgt.substring(verOffset + 8)) : (nameOffset = nAgt.lastIndexOf(" ") + 1) < (verOffset = nAgt.lastIndexOf("/")) && (jQuery.browser.name = nAgt.substring(nameOffset, verOffset), jQuery.browser.fullVersion = nAgt.substring(verOffset + 1), jQuery.browser.name.toLowerCase() == jQuery.browser.name.toUpperCase() && (jQuery.browser.name = navigator.appName)); - 1 != (ix = jQuery.browser.fullVersion.indexOf(";")) && (jQuery.browser.fullVersion = jQuery.browser.fullVersion.substring(0, ix)), -1 != (ix = jQuery.browser.fullVersion.indexOf(" ")) && (jQuery.browser.fullVersion = jQuery.browser.fullVersion.substring(0, ix)), jQuery.browser.majorVersion = parseInt("" + jQuery.browser.fullVersion, 10), isNaN(jQuery.browser.majorVersion) && (jQuery.browser.fullVersion = "" + parseFloat(navigator.appVersion), jQuery.browser.majorVersion = parseInt(navigator.appVersion, 10)), jQuery.browser.version = jQuery.browser.majorVersion
}
jQuery.browser.android = /Android/i.test(nAgt), jQuery.browser.blackberry = /BlackBerry|BB|PlayBook/i.test(nAgt), jQuery.browser.ios = /iPhone|iPad|iPod|webOS/i.test(nAgt), jQuery.browser.operaMobile = /Opera Mini/i.test(nAgt), jQuery.browser.windowsMobile = /IEMobile|Windows Phone/i.test(nAgt), jQuery.browser.kindle = /Kindle|Silk/i.test(nAgt), jQuery.browser.mobile = jQuery.browser.android || jQuery.browser.blackberry || jQuery.browser.ios || jQuery.browser.windowsMobile || jQuery.browser.operaMobile || jQuery.browser.kindle, jQuery.isMobile = jQuery.browser.mobile, jQuery.isTablet = jQuery.browser.mobile && jQuery(window).width() > 765, jQuery.isAndroidDefault = jQuery.browser.android && !/chrome/i.test(nAgt), ! function (a) {
  var b = (/iphone|ipod|ipad|android|ie|blackberry|fennec/.test(navigator.userAgent.toLowerCase()), "ontouchstart" in window || window.navigator && window.navigator.msPointerEnabled && window.MSGesture || window.DocumentTouch && document instanceof DocumentTouch || !1);
  a.simpleSlider = {
    defaults: {
      initialval: 0,
      scale: 100,
      orientation: "h",
      readonly: !1,
      callback: !1
    },
    events: {
      start: b ? "touchstart" : "mousedown",
      end: b ? "touchend" : "mouseup",
      move: b ? "touchmove" : "mousemove"
    },
    init: function (c) {
      return this.each(function () {
        var d = this,
          e = a(d);
        e.addClass("simpleSlider"), d.opt = {}, a.extend(d.opt, a.simpleSlider.defaults, c), a.extend(d.opt, e.data());
        var f = "h" == d.opt.orientation ? "horizontal" : "vertical",
          g = a("<div/>").addClass("level").addClass(f);
        e.prepend(g), d.level = g, e.css({
          cursor: "default"
        }), "auto" == d.opt.scale && (d.opt.scale = a(d).outerWidth()), e.updateSliderVal(), d.opt.readonly || (e.on(a.simpleSlider.events.start, function (a) {
          b && (a = a.changedTouches[0]), d.canSlide = !0, e.updateSliderVal(a), e.css({
            cursor: "col-resize"
          }), a.preventDefault(), a.stopPropagation()
        }), a(document).on(a.simpleSlider.events.move, function (c) {
          b && (c = c.changedTouches[0]), d.canSlide && (a(document).css({
            cursor: "default"
          }), e.updateSliderVal(c), c.preventDefault(), c.stopPropagation())
        }).on(a.simpleSlider.events.end, function () {
          a(document).css({
            cursor: "auto"
          }), d.canSlide = !1, e.css({
            cursor: "auto"
          })
        }))
      })
    },
    updateSliderVal: function (b) {
      function c(a, b) {
        return Math.floor(100 * a / b)
      }
      var d = this,
        e = d.get(0);
      if (e.opt) {
        e.opt.initialval = "number" == typeof e.opt.initialval ? e.opt.initialval : e.opt.initialval(e);
        var f = a(e).outerWidth(),
          g = a(e).outerHeight();
        e.x = "object" == typeof b ? b.clientX + document.body.scrollLeft - d.offset().left : "number" == typeof b ? b * f / e.opt.scale : e.opt.initialval * f / e.opt.scale, e.y = "object" == typeof b ? b.clientY + document.body.scrollTop - d.offset().top : "number" == typeof b ? (e.opt.scale - e.opt.initialval - b) * g / e.opt.scale : e.opt.initialval * g / e.opt.scale, e.y = d.outerHeight() - e.y, e.scaleX = e.x * e.opt.scale / f, e.scaleY = e.y * e.opt.scale / g, e.outOfRangeX = e.scaleX > e.opt.scale ? e.scaleX - e.opt.scale : e.scaleX < 0 ? e.scaleX : 0, e.outOfRangeY = e.scaleY > e.opt.scale ? e.scaleY - e.opt.scale : e.scaleY < 0 ? e.scaleY : 0, e.outOfRange = "h" == e.opt.orientation ? e.outOfRangeX : e.outOfRangeY, "undefined" != typeof b ? e.value = "h" == e.opt.orientation ? e.x >= d.outerWidth() ? e.opt.scale : e.x <= 0 ? 0 : e.scaleX : e.y >= d.outerHeight() ? e.opt.scale : e.y <= 0 ? 0 : e.scaleY : e.value = "h" == e.opt.orientation ? e.scaleX : e.scaleY, "h" == e.opt.orientation ? e.level.width(c(e.x, f) + "%") : e.level.height(c(e.y, g)), "function" == typeof e.opt.callback && e.opt.callback(e)
      }
    }
  }, a.fn.simpleSlider = a.simpleSlider.init, a.fn.updateSliderVal = a.simpleSlider.updateSliderVal
}(jQuery), ! function (a) {
  a.mbCookie = {
    set: function (a, b, c, d) {
      b = JSON.stringify(b), c || (c = 7), d = d ? "; domain=" + d : "";
      var e, f = new Date;
      f.setTime(f.getTime() + 864e5 * c), e = "; expires=" + f.toGMTString(), document.cookie = a + "=" + b + e + "; path=/" + d
    },
    get: function (a) {
      for (var b = a + "=", c = document.cookie.split(";"), d = 0; d < c.length; d++) {
        for (var e = c[d];
          " " == e.charAt(0);) e = e.substring(1, e.length);
        if (0 == e.indexOf(b)) return JSON.parse(e.substring(b.length, e.length))
      }
      return null
    },
    remove: function (b) {
      a.mbCookie.set(b, "", -1)
    }
  }, a.mbStorage = {
    set: function (a, b) {
      b = JSON.stringify(b), localStorage.setItem(a, b)
    },
    get: function (a) {
      return localStorage[a] ? JSON.parse(localStorage[a]) : null
    },
    remove: function (a) {
      a ? localStorage.removeItem(a) : localStorage.clear()
    }
  }
}(jQuery);