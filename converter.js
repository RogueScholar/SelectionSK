/**
 * SPDX-FileCopyrightText: © 2011–2023, Andrey Shemetov <ashemetov@gmail.com>
 *
 * SPDX-License-Identifier: MPL-2.0 OR GPL-3.0-or-later OR LGPL-3.0-or-later
 */
'use strict';

var converter = {
  event: null,
  converter: utils.ID_CONV_TEMPERATURE,
  src_conv: null,
  dst_conv: null,
  src_val: '',
  dst_val: '',
  wait_timeout: null,
  zoom: 1.0,

  addConverterValues: function (src_conv, dst_conv) {
    var conv_src = document.getElementById('ssk_id_conv_src');
    var conv_dst = document.getElementById('ssk_id_conv_dst');
    if (conv_src.options.length > 0) {
      while (conv_src.options.length > 0) {
        conv_src.remove(conv_src.options.length - 1);
      }
      while (conv_dst.options.length > 0) {
        conv_dst.remove(conv_dst.options.length - 1);
      }
    } else {
      conv_src.onchange = converter.onChange;
      conv_dst.onchange = converter.onChange;
    }
    if (converter.converter == utils.ID_CONV_CURRENCY) {
      var obj = const_cur;
      var items = const_cur.C;
    }
    if (converter.converter == utils.ID_CONV_TEMPERATURE) {
      var obj = const_temp;
      var items = const_temp.T;
    }
    if (converter.converter == utils.ID_CONV_MASS) {
      var obj = const_mass;
      var items = const_mass.M;
    }
    if (converter.converter == utils.ID_CONV_LEN) {
      var obj = const_len;
      var items = const_len.L;
    }
    for (var item in items) {
      var src_elem = document.createElement('option'),
        dst_elem = document.createElement('option');
      var s = obj.getDescription(item);
      src_elem.textContent = dst_elem.textContent = s;
      src_elem.value = dst_elem.value = item;
      src_elem.id = 'ssk_id_conv_src' + item;
      dst_elem.id = 'ssk_id_conv_dst' + item;
      src_elem.classList.add('ssk-converterpanel-select-option');
      dst_elem.classList.add('ssk-converterpanel-select-option');
      if (item == src_conv) {
        src_elem.selected = true;
        src_elem.textContent = s;
        conv_src.style.setProperty(
          'width',
          utils.getTextWidth(s, g_prefs.prefConversionFontSize - 2),
          'important'
        );
      }
      if (item == dst_conv) {
        dst_elem.selected = true;
        dst_elem.textContent = s;
        conv_dst.style.setProperty(
          'width',
          utils.getTextWidth(s, g_prefs.prefConversionFontSize - 2),
          'important'
        );
      }
      conv_src.appendChild(src_elem);
      conv_dst.appendChild(dst_elem);
    }
  },

  addConverters: function () {
    var converters = document.getElementById('ssk_id_conv');
    if (converters.options.length > 0) {
      while (converters.options.length > 0) {
        converters.remove(converters.options.length - 1);
      }
    } else {
      converters.onchange = converter.onChange;
    }
    var data = {
      txtConvCurrency: utils.ID_CONV_CURRENCY,
      txtConvTemperature: utils.ID_CONV_TEMPERATURE,
      txtConvMass: utils.ID_CONV_MASS,
      txtConvLen: utils.ID_CONV_LEN
    };
    for (var id in data) {
      var elem = document.createElement('option');
      elem.value = data[id];
      elem.textContent = chrome.i18n.getMessage(id);
      elem.id = 'ssk_id_conv' + id;
      elem.classList.add('ssk-converterpanel-select-option');
      if (elem.value == converter.converter) {
        elem.selected = true;
        converters.style.setProperty(
          'width',
          utils.getTextWidth(
            elem.textContent,
            g_prefs.prefConversionFontSize - 2
          ),
          'important'
        );
      }
      converters.appendChild(elem);
    }
  },

  onChange: function (e) {
    var conv_src = document.getElementById('ssk_id_conv_src');
    var conv_dst = document.getElementById('ssk_id_conv_dst');
    var conv = document.getElementById('ssk_id_conv');
    conv_src = conv_src.options[conv_src.selectedIndex].value;
    conv_dst = conv_dst.options[conv_dst.selectedIndex].value;
    conv = conv.options[conv.selectedIndex].value;
    var val = utils.getNumber(
      document.getElementById('ssk_id_conv_src_val').value
    );
    if (e == null) {
      [conv_src, conv_dst] = [conv_dst, conv_src];
      val = converter.dst_val;
    } else {
      if (conv != converter.converter) {
        conv_src = null;
        conv_dst = null;
      }
    }
    if (conv == utils.ID_CONV_CURRENCY) {
      converter.currency(null, val, conv_src, conv_dst);
    }
    if (conv == utils.ID_CONV_TEMPERATURE) {
      converter.temperature(null, val, conv_src, conv_dst);
    }
    if (conv == utils.ID_CONV_MASS) {
      converter.mass(null, val, conv_src, conv_dst);
    }
    if (conv == utils.ID_CONV_LEN) {
      converter.len(null, val, conv_src, conv_dst);
    }
  },

  onMouseUp: function (e) {
    switch (e.target.id) {
      case 'ssk_id_conv_reverse':
        converter.onChange(null);
        return;
      case 'ssk_id_conv_close':
        converter.hideConverter();
        return;
    }
    if (e.target.id.startsWith('ssk_')) {
      return;
    } else {
      converter.hideConverter();
    }
  },

  showWaitCursor: function () {
    if (converter.wait_timeout) {
      window.clearTimeout(converter.wait_timeout);
    }
    converter.wait_timeout = window.setTimeout(function () {
      converter.hideWaitCursor();
    }, 5000);
    document.body.classList.add('ssk-converterpanel-waiting');
  },

  hideWaitCursor: function () {
    if (converter.wait_timeout) {
      window.clearTimeout(converter.wait_timeout);
      converter.wait_timeout = null;
    }
    document.body.classList.remove('ssk-converterpanel-waiting');
  },

  convert: function (e, txt) {
    var cur_code = const_cur.hasSymbol(txt);
    if (cur_code != '') {
      converter.converter = utils.ID_CONV_CURRENCY;
      var num =
        ['EUR', 'PLN'].indexOf(cur_code) > -1 ?
          utils.getNumberEur(txt)
        : utils.getNumber(txt);
      converter.currency(e, num, cur_code, g_prefs.prefConversionDestCur);
      return;
    }
    var temp = const_temp.hasSymbol(txt);
    if (temp != '') {
      converter.converter = utils.ID_CONV_TEMPERATURE;
      converter.temperature(
        e,
        utils.getNumber(txt),
        temp,
        g_prefs.prefConversionDestTemp
      );
      return;
    }
    var mass = const_mass.hasSymbol(txt);
    if (mass != '') {
      converter.converter = utils.ID_CONV_MASS;
      converter.mass(
        e,
        utils.getNumber(txt),
        mass,
        g_prefs.prefConversionDestMass
      );
      return;
    }
    var len = const_len.hasSymbol(txt);
    if (len != '') {
      converter.converter = utils.ID_CONV_LEN;
      converter.len(
        e,
        utils.getNumber(txt),
        len,
        g_prefs.prefConversionDestLen
      );
      return;
    }
    converter.temperature(
      e,
      utils.getNumber(txt),
      'C',
      g_prefs.prefConversionDestTemp
    );
  },

  currency: function (e, value, src_cur, dst_cur) {
    converter.showWaitCursor();
    converter.converter = utils.ID_CONV_CURRENCY;
    converter.src_conv = src_cur ? src_cur : 'EUR';
    converter.dst_conv = dst_cur ? dst_cur : g_prefs.prefConversionDestCur;
    if (converter.src_conv == converter.dst_conv) {
      converter.showConverter(
        e,
        utils.formatFloat(value, 4),
        utils.formatFloat(value, 4)
      );
      return;
    }
    chrome.runtime.sendMessage(
      {
        cmd: utils.CMD_CONV_CURRENCY_CRYPTOCOMPARE,
        src_conv: converter.src_conv,
        dst_conv: converter.dst_conv
      },
      function (response) {
        if (response.rate == 'ssk_error') {
          converter.hideWaitCursor();
          return;
        }
        converter.showConverter(
          e,
          utils.formatFloat(value, 4),
          utils.formatFloat(value * response.rate, 4)
        );
      }
    );
  },

  temperature: function (e, value, src_temp, dst_temp) {
    converter.converter = utils.ID_CONV_TEMPERATURE;
    converter.src_conv = src_temp ? src_temp : 'C';
    converter.dst_conv = dst_temp ? dst_temp : g_prefs.prefConversionDestTemp;
    value = Number(value) ? Number(value) : 0.0;
    var value_dst = 0.0;
    switch (converter.src_conv + converter.dst_conv) {
      case 'FC':
        value_dst = ((value - 32) * 5) / 9;
        break;
      case 'CF':
        value_dst = (value * 9) / 5 + 32;
        break;
      case 'CK':
        value_dst = value + 273.15;
        break;
      case 'KC':
        value_dst = value - 273.15;
        break;
      case 'KF':
        value_dst = ((value - 273.15) * 9) / 5 + 32;
        break;
      case 'FK':
        value_dst = ((value - 32) * 5) / 9 + 273.15;
        break;
      default:
        value_dst = value;
    }
    window.setTimeout(function () {
      converter.showConverter(
        e,
        utils.formatFloat(value, 2),
        utils.formatFloat(value_dst, 2)
      );
    }, 100);
  },

  mass: function (e, value, src_mass, dst_mass) {
    converter.converter = utils.ID_CONV_MASS;
    converter.src_conv = src_mass ? src_mass : 'KG_1';
    converter.dst_conv = dst_mass ? dst_mass : g_prefs.prefConversionDestMass;
    var src_mass_detail = converter.src_conv.split('_');
    var dst_mass_detail = converter.dst_conv.split('_');
    var coef = parseFloat(src_mass_detail[1]) / parseFloat(dst_mass_detail[1]);
    value = Number(value) ? Number(value) : 0.0;
    var value_dst = 0.0;
    switch (src_mass_detail[0] + dst_mass_detail[0]) {
      case 'KGP':
        value_dst = value * 2.20462262 * coef;
        break;
      case 'PKG':
        value_dst = value * 0.45359237 * coef;
        break;
      default:
        value_dst = value * coef;
    }
    window.setTimeout(function () {
      converter.showConverter(
        e,
        utils.formatFloat(value, 12),
        utils.formatFloat(value_dst, 12)
      );
    }, 100);
  },

  len: function (e, value, src_len, dst_len) {
    converter.converter = utils.ID_CONV_LEN;
    converter.src_conv = src_len ? src_len : 'M_1';
    converter.dst_conv = dst_len ? dst_len : g_prefs.prefConversionDestLen;
    var src_len_detail = converter.src_conv.split('_');
    var dst_len_detail = converter.dst_conv.split('_');
    var coef = parseFloat(src_len_detail[1]) / parseFloat(dst_len_detail[1]);
    value = Number(value) ? Number(value) : 0.0;
    var value_dst = 0.0;
    switch (src_len_detail[0] + dst_len_detail[0]) {
      case 'MF':
        value_dst = value * 3.28084 * coef;
        break;
      case 'FM':
        value_dst = value * 0.3048 * coef;
        break;
      default:
        value_dst = value * coef;
    }
    window.setTimeout(function () {
      converter.showConverter(
        e,
        utils.formatFloat(value, 12),
        utils.formatFloat(value_dst, 12)
      );
    }, 100);
  },

  styleConverter: function () {
    if (converter.zoom != 1) {
      var panel = document.getElementById('ssk_id_converter_panel');
      var zoom = 1 / converter.zoom;
      panel.style.setProperty(
        'transform',
        'scale({0})'._format(zoom._round(2)),
        'important'
      );
    }
    // user customization
    var size = parseInt(g_prefs.prefConversionFontSize, 10);
    cmn.setStyleProp('ssk-converterpanel', {
      'font-size': size + 'px',
      'background-color': g_prefs.prefConversionBkColor,
      'color': g_prefs.prefConversionFontColor,
      'border-color': g_prefs.prefConversionBorderColor,
      'font-family': 'Roboto,sans-serif'
    });
    cmn.setStyleProp('ssk-converterpanel-value', {
      'font-size': size + 'px',
      'min-height;max-height': size + 2 + 'px',
      'color;-webkit-text-fill-color': g_prefs.prefConversionFontColor,
      'border-color': g_prefs.prefConversionUnitColor,
      'font-family': 'Roboto,sans-serif'
    });
    cmn.setStyleProp('ssk-converterpanel-select', {
      'font-size': size + 'px',
      'min-height;max-height': size + 2 + 'px',
      'color': g_prefs.prefConversionUnitColor,
      'font-family': 'Roboto,sans-serif'
    });
    cmn.setStyleProp('ssk-converterpanel-select-converter', {
      'font-size': size + 'px',
      'color': g_prefs.prefConversionConverterColor
    });
    cmn.setStyleProp('ssk-converterpanel-button', {
      'min-width;max-width;min-height;max-height': size + 2 + 'px'
    });
    // next three  lines is a workaround for some stupid sites that define global attributes with '!important'
    cmn.setStyleProp('ssk-converterpanel', {'line-height': 'normal'});
    cmn.setStyleProp('ssk-converterpanel-value', {
      'width': 'auto',
      'padding': '2px',
      'background-color': '#fff',
      'border': '1px solid ' + g_prefs.prefConversionUnitColor,
      'box-sizing': 'content-box'
    });
    cmn.setStyleProp('ssk-converterpanel-select', {
      'background-color': 'transparent'
    });
  },

  adjustConverter(e, val, val_conv) {
    converter.addConverterValues(converter.src_conv, converter.dst_conv);
    converter.addConverters();
    if (e != null) {
      document.getElementById('ssk_id_conv_src_val').value = val;
    }
    document.getElementById('ssk_id_conv_dst_val').value = val_conv;
    converter.styleConverter();
    e = converter.event;
    var panel = document.getElementById('ssk_id_converter_panel');
    var [x, y, x_client, y_client] = utils.getAdjustedXY(e);
    var [client_w, client_h, offset_w, offset_h] = utils.getAdjustedSize(
      panel,
      converter.zoom
    );
    if (e.pageX == 0 && e.pageY == 0) {
      x = (window.innerWidth - client_w) / 2;
      y = (window.innerHeight - client_h) / 2;
    } else if (!g_prefs.prefHideOnScroll) {
      x = x_client - offset_w;
      y = y_client - offset_h;
    }
    if (x_client + client_w + 10 > window.innerWidth) {
      x = Math.max(x - client_w, 0);
    }
    if (y_client + client_h + 10 > window.innerHeight) {
      y = Math.max(y - y_client, Math.max(y - client_h - 10, 0));
    }
    panel.style.setProperty('left', x + 'px', 'important');
    panel.style.setProperty('top', y + 'px', 'important');
  },

  showConverter: function (e, val, val_conv) {
    converter.hideWaitCursor();
    g_entered_ssk = false;
    converter.src_val = val;
    converter.dst_val = val_conv;
    if (e != null) {
      converter.event = e;
      var pos_fixed =
        (e.pageX == 0 && e.pageY == 0) || !g_prefs.prefHideOnScroll;
      chrome.runtime.sendMessage(
        {
          cmd: utils.CMD_GET_CONVERT_PANEL,
          pos_fixed: pos_fixed,
          icnsClr: g_prefs.prefConversionIconsColor
        },
        function (response) {
          converter.zoom = response.zoom;
          utils.insertHtml(response.panel);
          window.addEventListener('mouseup', converter.onMouseUp, true);
          if (g_prefs.prefHideOnMoveMouseAway) {
            window.addEventListener('mousemove', onMouseMove);
          }
          window.addEventListener('contextmenu', onStopEvent, true);
          document.getElementById('ssk_id_conv_src_val').oninput =
            converter.onChange;
          converter.adjustConverter(e, val, val_conv);
        }
      );
    } else {
      converter.adjustConverter(e, val, val_conv);
    }
  },

  hideConverter: function () {
    converter.hideWaitCursor();
    window.removeEventListener('mouseup', converter.onMouseUp, true);
    window.removeEventListener('mousemove', onMouseMove);
    window.setTimeout(function () {
      window.removeEventListener('contextmenu', onStopEvent, true);
    }, utils.MOUSE_BUTTON_CLICK_DELAY_MS);
    var panel = document.getElementById('ssk_id_converter_panel');
    if (panel) {
      panel.parentNode.removeChild(panel);
    }
  }
};
