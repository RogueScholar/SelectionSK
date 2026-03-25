/**
 * SPDX-FileCopyrightText: © 2011–2023, Andrey Shemetov <ashemetov@gmail.com>
 *
 * SPDX-License-Identifier: MPL-2.0 OR GPL-3.0-or-later OR LGPL-3.0-or-later
 */
'use strict';

var utils = {
  CMD_GET_MENU: 'cmd_get_menu',
  CMD_GET_PANEL: 'cmd_get_panel',
  CMD_GET_TRANSLATION_PANEL: 'get_translation_panel',
  CMD_GET_CONVERT_PANEL: 'get_convert_panel',
  CMD_OPEN_URL: 'cmd_open_url',
  CMD_OPEN_BOOKMARK: 'cmd_open_bookmark',
  CMD_ADD_BOOKMARK: 'cmn_add_bookmark',
  CMD_BLINK: 'cmd_blink',
  CMD_SET_BADGE_TEXT: 'cmd_set_badge_text',
  CMD_DEFAULT_TRANSLATE: 'cmd_default_translate',
  CMD_GOOGLE_DICT: 'cmd_google_dict',
  CMD_GOOGLE_TRANSLATE: 'cmd_google_translate',
  CMD_WORDNIK_DICT: 'cmd_wordnik_dict',
  CMD_URBAN_DICT: 'cmd_urban_dict',
  CMD_YANDEX_DETECT_LNG: 'cmd_yandex_detect_lng',
  CMD_YANDEX_DICT: 'cmd_yandex_dict',
  CMD_YANDEX_TRANSLATE: 'cmd_yandex_translate',
  CMD_MS_DETECT_LNG: 'cmd_ms_detect_lng',
  CMD_MS_DICT: 'cmd_ms_dict',
  CMD_MS_TRANSLATOR: 'cmd_ms_translator',
  CMD_PLAY: 'cmd_play',
  CMD_HIGHLIGHT: 'cmd_highlight',
  CMD_CONVERT: 'cmd_convert',
  CMD_UPS: 'cmd_ups',
  CMD_USPS: 'cmd_usps',
  CMD_Fedex: 'cmd_fedex',
  CMD_CONV_CURRENCY_CRYPTOCOMPARE: 'cmd_conv_currency_cryptocompare',
  CMD_MAILTO: 'cmd_mailto',
  CMD_SEARCH: 'cmd_search',

  ID_SEPARATOR: 'ssk_id_separator',
  ID_POPUP_BUTTON: 'ssk_id_button_img',
  ID_CUT: 'ssk_id_cut',
  ID_COPY: 'ssk_id_copy',
  ID_PASTE: 'ssk_id_paste',
  ID_DELETE: 'ssk_id_delete',
  ID_COPY_PLAIN: 'ssk_id_copy_plain',
  ID_COPY_HTML: 'ssk_id_copy_html',
  ID_GOOGLE_TRANSLATE: 'ssk_id_google_translate',
  ID_WORDNIK_DICT: 'ssk_id_wordnik_dict',
  ID_URBAN_DICT: 'ssk_id_urban_dict',
  ID_YANDEX_TRANSLATE: 'ssk_id_yandex_translate',
  ID_MS_TRANSLATOR: 'ssk_id_ms_translator',
  ID_OPEN_URL: 'ssk_id_open_url',
  ID_OPEN_ALL_URLS: 'ssk_id_open_all_urls',
  ID_COPY_ALL_URLS: 'ssk_id_copy_all_urls',
  ID_HIGHLIGHT: 'ssk_id_highlight',
  ID_CONVERT: 'ssk_id_convert',
  ID_UPS: 'ssk_id_ups',
  ID_USPS: 'ssk_id_usps',
  ID_Fedex: 'ssk_id_fedex',
  ID_CONV_CURRENCY: 'ssk_id_conv_currency',
  ID_CONV_TEMPERATURE: 'ssk_id_conv_temperature',
  ID_CONV_MASS: 'ssk_id_conv_mass',
  ID_CONV_LEN: 'ssk_id_conv_len',
  ID_MAILTO: 'ssk_id_mailto',
  ID_SEARCH: 'ssk_id_search',

  MOUSE_BUTTON_CLICK_DELAY_MS: 500,

  extractURLs: function (s, node) {
    try {
      s = s.replace(/ /gi, '');
      // The original regular expression was taken from
	  // <https://www.regextester.com/96504>, with some modifications added.
      var e =
        /(?:(?:https?|ftp):\/\/|\b(?:[a-z\d\-]+\.))(?:(?:[ ]+|[^\s()<>]+|\((?:[^\s()<>]+|(?:\([^\s()<>]+\)))?\))+(?:\((?:[^\s()<>]+|(?:\(?:[^\s()<>]+\)))?\)|[^\s`!()\[\]{};:\'\".,<>?]))?/gi;
      var m1 = s.match(e);
      if (m1 == null) m1 = [];

      var extractAnchors = function (links, node) {
        if (node.nodeType == 1 && node.tagName == 'A') {
          if (node.href.match(e)) {
            links.push(node.href);
          }
          node.parentNode.removeChild(node);
        }
        if (node.nodeType == 1 && node.tagName == 'IMG') {
          if (node.src.match(e)) {
            links.push(node.src);
          }
          node.parentNode.removeChild(node);
        }
        if (
          node.hasChildNodes()
          && node.tagName != 'A'
          && node.tagName != 'IMG'
        ) {
          for (var i = 0; i < node.childNodes.length; i++) {
            extractAnchors(links, node.childNodes[i]);
          }
        }
      };

      var m2 = [];
      extractAnchors(m2, node);

      var links = m2.concat(m1);

      // Normalize links and eliminate duplicates.
      var out = [],
        uniq = {};
      for (var i = 0; i < links.length; i++) {
        var str = links[i].trim().replace(/&amp;/g, '&');
        str = (str.indexOf('://') == -1 ? 'http://' : '') + str;
        // Make nicer by eliminating false URLs and search-related queries.
        if (str.indexOf('cache:') == -1 && str.indexOf('related:') == -1) {
          uniq[str] = true;
        }
      }
      for (var u in uniq) {
        if (u.substr(-1) == '/') {
          uniq[u.substr(0, u.length - 1)] = false;
        }
        if (u.substr(-1) == '.') {
          uniq[u] = false;
        }
        if (u.startsWith('https://')) {
          uniq['http://' + u.substr(8)] = false;
        }
      }
      for (var u in uniq) {
        if (uniq[u]) {
          out.push(u);
        }
      }

      return out;
    } catch (ex) {
      cmn.log(ex.toString());
    }
    return [];
  },

  extractEmailAddress: function (s) {
    try {
      s = s.replace(/ /gi, '');
      s = s.toLowerCase();
      // the original regex was taken from https://www.regular-expressions.info/email.html, some modifications made
      var e = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b/gi;
      var m = s.match(e);
      if (m) {
        return m[0];
      }
    } catch (ex) {
      cmn.log(ex.toString());
    }
    return '';
  },

  removeHtmlTags: function (txt) {
    return txt.replace(/<\/?[^>]+(>|$)/g, '');
  },

  getTextWidth: function (txt, size) {
    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');
    context.font = 'normal {0}pt Roboto'._format(size);
    var metrics = context.measureText(txt);
    return metrics.width + 'px';
  },

  hasDigit: function (txt) {
    return /\d/.test(txt);
  },

  isNumber: function (txt) {
    return /^[\d.]+$/.test(txt);
  },

  isWord: function (txt) {
    return (
      txt.indexOf(' ') == -1
      && txt.indexOf('\n') == -1
      && txt.indexOf('\r') == -1
    );
  },

  getNumber: function (txt) {
    var neg = txt.indexOf('-') > -1 ? '-' : '';
    txt = txt.replace(/[^\d.]/g, ''); // remove non-numeric symbols
    txt = txt.replace(/^\.+/, ''); // remove leading dots
    txt = txt.replace(/\.+$/, ''); // remove trailing dots
    txt = txt != '' ? neg + txt : '0';
    return txt;
  },

  getNumberEur: function (txt) {
    txt = txt.replace(',', '.');
    return utils.getNumber(txt);
  },

  formatFloat: function (f, n) {
    f = parseFloat(f).toFixed(n);
    f = f.replace(/0+$/, ''); // remove trailing zeroes
    f = f.endsWith('.') ? f + '0' : f;
    return f;
  },

  getAdjustedXY: function (e) {
    var x = e.pageX,
      y = e.pageY,
      x_client = e.clientX,
      y_client = e.clientY;
    if (x_client < 0) {
      x -= x_client;
      x_client = 0;
    } else if (x_client > window.innerWidth) {
      x -= x_client - window.innerWidth;
      x_client = window.innerWidth;
    }
    if (y_client < 0) {
      y -= y_client;
      y_client = 0;
    } else if (
      document.body.clientHeight
      && y_client > document.body.clientHeight
    ) {
      // y -= (y_client-document.body.clientHeight);
      // y_client = document.body.clientHeight;
    }
    return [x, y, x_client, y_client];
  },

  getAdjustedSize: function (obj, zoom) {
    var client_w = obj.clientWidth,
      client_h = obj.clientHeight,
      offset_w = 0,
      offset_h = 0;
    if (g_zoom != 1) {
      client_w = client_w / zoom;
      client_h = client_h / zoom;
      offset_w = (obj.clientWidth - client_w) / 2;
      offset_h = (obj.clientHeight - client_h) / 2;
    }
    return [
      client_w._round(0),
      client_h._round(0),
      offset_w._round(0),
      offset_h._round(0)
    ];
  },

  insertHtml: function (html) {
    if (cmn.isFirefox()) {
      document.body.insertAdjacentHTML('afterend', html);
    } else {
      document.body.insertAdjacentHTML('beforeend', html);
    }
  },

  isUPSTrackingNumber: function (s) {
    // <https://en.wikipedia.org/wiki/Tracking_number>
    // <https://www.ups.com/us/en/help-center/sri/tracking-number.page>
    s = s.replace(/ /gi, '').toLowerCase();
    return (
      (s.length == 18 && s.startsWith('1z') && utils.isNumber(s.substring(14)))
      || (s.length == 11 && s.startsWith('t') && utils.isNumber(s.substring(1)))
    );
  },

  isUSPSTrackingNumber: function (s) {
    // https://uspsgudies.com/usps-tracking-number/
    s = s.replace(/ /gi, '').toLowerCase();
    if (s.length == 22) {
      return (
        utils.isNumber(s)
        && [
          '92021',
          '92055',
          '92088',
          '92701',
          '93033',
          '93748',
          '94001',
          '94055',
          '94071',
          '94073'
        ].indexOf(s.substring(0, 5)) > -1
      );
    }
    return (
      s.length == 13
      && (s.startsWith('ec') || s.startsWith('ea') || s.startsWith('cp'))
      && s.endsWith('us')
    );
  },

  isFedexTrackingNumber: function (s) {
    // <https://answers.google.com/answers/threadview/id/207899.html>
    // <https://www.fedex.com/us/solutions/ppe/FedEx_Ground_Label_Layout_Specification.pdf>
    // <https://stackoverflow.com/questions/11049025/how-to-get-fedex-testing-tracking-number>
    s = s.replace(/ /gi, '');
    if (s.length == 12 && utils.isNumber(s)) {
      var weights = [3, 1, 7, 3, 1, 7, 3, 1, 7, 3, 1];
      var num = Array.from(s, Number);
      var sum = 0;
      for (var i = 0; i < weights.length; i++) {
        sum += weights[i] * num[i];
      }
      sum = sum % 11;
      return sum == num[11];
    }
    return false;
  }
};
