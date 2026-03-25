/**
 * SPDX-FileCopyrightText: © 2011–2023, Andrey Shemetov <ashemetov@gmail.com>
 *
 * SPDX-License-Identifier: MPL-2.0 OR GPL-3.0-or-later OR LGPL-3.0-or-later
 */
'use strict';

if (!String.prototype._format) {
  String.prototype._format = function () {
    var str = this.toString();
    if (arguments.length) {
      var t = typeof arguments[0];
      var args =
        'string' === t || 'number' === t ?
          Array.prototype.slice.call(arguments)
        : arguments[0];
      for (var key in args) {
        str = str.replace(new RegExp('\\{' + key + '\\}', 'gi'), args[key]);
      }
    }
    return str;
  };
}

if (!String.prototype._replace_all) {
  // Replaces all occurancies of 'strReplace' with 'strWith', ignoring case
  // sensetivity.
  String.prototype._replace_all = function (strReplace, strWith) {
    // Allow use of any of the special characters literally, see
	// <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#Escaping>
    var esc = strReplace.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    return this.replace(new RegExp(esc, 'ig'), strWith);
  };
}

if (!Array.prototype._peek) {
  // returns last element of array, useful for stack implementation
  Array.prototype._peek = function () {
    return this.length > 0 ? this[this.length - 1] : undefined;
  };
}

if (!Array.prototype._insert) {
  // inserts an item to array at the given position
  Array.prototype._insert = function (item, idx) {
    this.splice(idx, 0, item);
  };
}

if (!Number.prototype._round) {
  // correctly rounds to N decimal places
  Number.prototype._round = function (places) {
    return +(Math.round(this + 'e+' + places) + 'e-' + places);
  };
}

var cmn = {
  bk_colors: [
    '#1628aa',
    '#93711d',
    '#e91e63',
    '#5a3877',
    '#42365f',
    '#5006ca',
    '#17cbe8',
    '#3f3e03',
    '#277634',
    '#4a1a00',
    '#fd079f',
    '#256437',
    '#000000',
    '#17a361',
    '#cf17ba',
    '#1e38f3',
    '#f92947',
    '#0d8abc',
    '#0080c0',
    '#e44201',
    '#009688'
  ],

  log_enabled: true,
  ash_log: console.log.bind(console, 'ash:'),

  log: function (msg) {
    if (!cmn.log_enabled) {
      return;
    }
    cmn.ash_log(msg);
  },

  isFirefox: function () {
    var mfest = chrome.runtime.getManifest();
    return mfest.applications ? true : false;
  },

  isChrome: function () {
    var mfest = chrome.runtime.getManifest();
    return mfest.applications ? false : true;
  },

  getIconURL: function (name) {
    return chrome.runtime.getURL('/icons/' + name);
  },

  hex2rgb: function (hex) {
    return 'rgb({0},{1},{2})'._format(
      parseInt('0x' + hex[1] + hex[2], 16),
      parseInt('0x' + hex[3] + hex[4], 16),
      parseInt('0x' + hex[5] + hex[6], 16)
    );
  },

  getFolderIcon(letter) {
    // returns a folder icon with 'letter'
    var img =
      'data:image/svg+xml;utf8,<svg width="96" height="96" viewBox="5 16 86 66" xmlns="http://www.w3.org/2000/svg"><path d="M31.859,16l5.555,8.438L39.718,28H44h36c2.206,0,4,1.794,4,4v44c0,2.206-1.794,4-4,4H16c-2.206,0-4-1.794-4-4V20  c0-2.206,1.794-4,4-4h16 M36,8H16C9.37,8,4,13.37,4,20v56c0,6.63,5.37,12,12,12h64c6.63,0,12-5.37,12-12V32c0-6.63-5.37-12-12-12H44  L36,8L36,8z" style="fill:rgb(96,96,91)"/><text x="45" y="75" font-family="sans-serif" text-anchor="middle" font-weight="700" font-size="55px" style="fill:rgb(96,96,91)">{0}</text></svg>';
    img = img._format(letter);
    return img;
  },

  getLetterIcon: function (letter, cl, bk) {
    // returns an icon with 'letter' using 'cl' and 'bk' as colors
    var img =
      'data:image/svg+xml;utf8,<svg width="160" height="160" viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg"><rect x="0" y="0" rx="10" ry="10" width="160" height="160" style="fill:{0}"/><text x="80" y="140" font-family="sans-serif" text-anchor="middle" font-weight="500" font-size="170px" style="fill:{1}">{2}</text></svg>';
    img = img._format(
      bk.startsWith('rgb') ? bk : cmn.hex2rgb(bk),
      cl.startsWith('rgb') ? cl : cmn.hex2rgb(cl),
      letter
    );
    return img;
  },

  getTxtLetterIcon: function (txt) {
    // returns letter icon with background color based on text
    var s = [0].concat(txt.split('')).reduce((a, b) => a + b.charCodeAt(0));
    txt = txt.replace(/\W/g, ''); //~ removing non-alphanumeric chars
    return cmn.getLetterIcon(
      txt.length > 0 ? txt[0] : 'A',
      '#ffffff',
      cmn.bk_colors[s % cmn.bk_colors.length]
    );
  },

  setStyleProp: function (cls, props_values) {
    const elems = document.getElementsByClassName(cls);
    for (const elem of elems) {
      for (const [props, value] of Object.entries(props_values)) {
        for (const prop of props.split(';')) {
          elem.style.setProperty(prop, value, 'important');
        }
      }
    }
  },

  prepareSearchUrl: function (url, txt) {
    if (url.indexOf('%s') != -1) {
      url = url.replace('%s', encodeURIComponent(txt));
    } else {
      url += encodeURIComponent(txt);
    }
    return url;
  },

  prefsRestoreBookmarks: function (name) {
    alerty.confirm(
      chrome.i18n.getMessage('txtPrefRestoreBookmarksQ'),
      {
        title: name,
        cancelLabel: chrome.i18n.getMessage('txtCancel'),
        okLabel: chrome.i18n.getMessage('txtOK')
      },
      function () {
        chrome.storage.local.get(null, function (prefs) {
          var page = chrome.extension.getBackgroundPage();
          page.createDefaultBookmarks(prefs.prefBookmarkFolder, false);
          page.getBookmarks();
        });
      },
      function () {}
    );
  },

  prefsBackupToFile: function (name, internal_prefs) {
    chrome.storage.local.get(null, function (prefs) {
      for (let p of internal_prefs) {
        delete prefs[p];
      }
      var blob = new Blob([JSON.stringify(prefs)], {
        type: 'text/plain;charset=utf-8'
      });
      var d = new Date();
      saveAs(
        blob,
        '{0}-backup-{1}-{2}-{3}.txt'._format(
          name,
          d.getFullYear(),
          d.getMonth() + 1,
          d.getDate()
        )
      );
    });
  },

  prefsFileSelected: function (e) {
    var selected_file = document.getElementById('prefSelectedFile');
    var fn = selected_file.files[0];
    var reader = new FileReader();
    reader.onload = function (e) {
      var res = JSON.parse(reader.result);
      chrome.storage.local.get(null, function (prefs) {
        prefs = Object.assign({}, prefs, res);
        chrome.storage.local.set(prefs);
        loadPrefs();
      });
    };
    reader.readAsText(fn);
  },

  prefsClearHistory: function (name) {
    alerty.confirm(
      chrome.i18n.getMessage('txtPrefClearHistoryQ'),
      {
        title: name,
        cancelLabel: chrome.i18n.getMessage('txtCancel'),
        okLabel: chrome.i18n.getMessage('txtOK')
      },
      function () {
        chrome.storage.local.get(null, function (prefs) {
          prefs.history = [];
          chrome.storage.local.set(prefs);
        });
      },
      function () {}
    );
  }
};
