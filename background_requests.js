/**
 * SPDX-FileCopyrightText: © 2011–2023, Andrey Shemetov <ashemetov@gmail.com>
 * SPDX-FileCopyrightText: © 2026, Peter J. Mello <admin@petermello.net>
 *
 * SPDX-License-Identifier: MPL-2.0 OR GPL-3.0-or-later OR LGPL-3.0-or-later
 */
'use strict';
require('@dotenvx/dotenvx').config()
chrome.runtime.onMessage.addListener(notify);

// Following requests needs to be done in the background because content script
// cannot do it due to CORB.
function notify(msg, sender, sendResponse) {
  switch (msg.cmd) {
    case utils.CMD_GOOGLE_DICT:
      // var url = 
      // 'https://clients5.google.com/translate_a/t?client=dict-chrome-ex&sl=' +
      // msg.lngSrc + '&tl=' + msg.lngDst + '&q=' + encodeURIComponent(msg.txt);
      var url =
        'https://clients5.google.com/translate_a/single?dj=1&dt=t&dt=sp&dt=ld' +
        '&dt=bd&client=dict-chrome-ex&sl=' + msg.lngSrc + '&tl=' + msg.lngDst +
        '&q=' + encodeURIComponent(msg.txt);
      fetch(url, { method: 'get' })
        .then(function (response) {
          response.text().then(function (json_data) {
            var data = JSON.parse(json_data);
            sendResponse({ 'data': data });
          });
        })
        .catch(function (err) {
          notification(err.toString());
          sendResponse({ 'data': { 'ssk_error': true } });
        });
      return true;
    case utils.CMD_GOOGLE_TRANSLATE:
      var url =
        'https://translate.googleapis.com/translate_a/single?client=gtx&sl=' +
        msg.lngSrc + '&tl=' + msg.lngDst + '&dt=t&q=' +
        encodeURIComponent(msg.txt);
      fetch(url, { method: 'get' })
        .then(function (response) {
          response.text().then(function (json_data) {
            var data = JSON.parse(json_data);
            sendResponse({ 'data': data });
          });
        })
        .catch(function (err) {
          notification(err.toString());
          sendResponse({ 'data': { 'ssk_error': true } });
        });
      return true;
    case utils.CMD_WORDNIK_DICT:
      var url =
        'https://api.wordnik.com/v4/word.json/' + encodeURIComponent(msg.txt) +
        '/definitions?limit=30&includeRelated=false&useCanonical=true' +
        '&includeTags=true&api_key=' + process.env.WORDNIK_API_KEY;
      fetch(url, { method: 'get' })
        .then(function (response) {
          response.text().then(function (json_data) {
            var data = JSON.parse(json_data);
            sendResponse({ 'data': data });
          });
        })
        .catch(function (err) {
          notification(err.toString());
          sendResponse({ 'data': { 'ssk_error': true } });
        });
      return true;
    case utils.CMD_URBAN_DICT:
      var url =
        'https://api.urbandictionary.com/v0/define?term=' +
        encodeURIComponent(msg.txt);
      fetch(url, { method: 'get' })
        .then(function (response) {
          response.text().then(function (json_data) {
            var data = JSON.parse(json_data);
            sendResponse({ 'data': data });
          });
        })
        .catch(function (err) {
          notification(err.toString());
          sendResponse({ 'data': { 'ssk_error': true } });
        });
      return true;
    case utils.CMD_YANDEX_DETECT_LNG:
      var url =
        'https://translate.yandex.net/api/v1.5/tr.json/detect?text=' +
        encodeURIComponent(msg.txt) + '&key=' +
        process.env.YANDEX_DETECTLANG_API_KEY;
      fetch(url, { method: 'get' })
        .then(function (response) {
          response.text().then(function (json_data) {
            var data = JSON.parse(json_data);
            sendResponse({ 'data': data });
          });
        })
        .catch(function (err) {
          notification(err.toString());
          sendResponse({ 'data': { 'ssk_error': true } });
        });
      return true;
    case utils.CMD_YANDEX_DICT:
      url =
        'https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=' +
        process.env.YANDEX_DICTIONARY_API_KEY + '&lang=' + msg.lngSrc + '-' +
        msg.lngDst + '&text=' + encodeURIComponent(msg.txt) + '&flags=4';
      fetch(url, { method: 'get' })
        .then(function (response) {
          response.text().then(function (json_data) {
            var data = JSON.parse(json_data);
            sendResponse({ 'data': data });
          });
        })
        .catch(function (err) {
          notification(err.toString());
          sendResponse({ 'data': { 'ssk_error': true } });
        });
      return true;
    case utils.CMD_YANDEX_TRANSLATE:
      var url =
        'https://translate.yandex.net/api/v1.5/tr.json/translate?key='
        process.env.YANDEX_TRANSLATE_API_KEY + '&text=' +
        encodeURIComponent(msg.txt) + '&lang=' + msg.lng_pair + '&options=1';
      fetch(url, { method: 'get' })
        .then(function (response) {
          response.text().then(function (json_data) {
            var data = JSON.parse(json_data);
            sendResponse({ 'data': data });
          });
        })
        .catch(function (err) {
          notification(err.toString());
          sendResponse({ 'data': { 'ssk_error': true } });
        });
      return true;
    case utils.CMD_MS_DETECT_LNG:
      var url_auth = 'https://edge.microsoft.com/translate/auth';
      var url =
        'https://api.cognitive.microsofttranslator.com/detect?api-version=3.0';
      fetch(url_auth, { method: 'get' })
        .then(function (response) {
          response
            .text()
            .then(function (token) {
              fetch(url, {
                headers: {
                  "authorization": "Bearer " + token,
                  "content-type": "application/json",
                },
                body: '[{"Text": "' + encodeURIComponent(msg.txt) + '"}]',
                method: "post",
              }).then(function (response) {
                response.text().then(function (json_data) {
                  var data = JSON.parse(json_data);
                  sendResponse({ 'data': data });
                });
              });
            })
            .catch(function (err) {
              notification(err.toString());
              sendResponse({ 'data': { 'ssk_error': true } });
            });
        })
        .catch(function (err) {
          notification(err.toString());
          sendResponse({ 'data': { 'ssk_error': true } });
        });
      return true;
    case utils.CMD_MS_DICT:
      var url_auth = 'https://edge.microsoft.com/translate/auth';
      var url =
        'https://api.cognitive.microsofttranslator.com/dictionary/lookup' +
        '?from=' + msg.lngSrc + '&to=' + msg.lngDst + '&api-version=3.0';
      fetch(url_auth, { method: 'get' })
        .then(function (response) {
          response
            .text()
            .then(function (token) {
              fetch(url, {
                headers: {
                  "authorization": "Bearer " + token,
                  "content-type": "application/json",
                },
                body: '[{"Text": "' + msg.txt + '"}]',
                method: "post",
              }).then(function (response) {
                response.text().then(function (json_data) {
                  var data = JSON.parse(json_data);
                  sendResponse({ 'data': data });
                });
              });
            })
            .catch(function (err) {
              notification(err.toString());
              sendResponse({ 'data': { 'ssk_error': true } });
            });
        })
        .catch(function (err) {
          notification(err.toString());
          sendResponse({ 'data': { 'ssk_error': true } });
        });
      return true;
    case utils.CMD_MS_TRANSLATOR:
      var url_auth = 'https://edge.microsoft.com/translate/auth';
      var url =
        'https://api.cognitive.microsofttranslator.com/translate?from=&to=' +
        msg.lngDst + '&api-version=3.0';
      fetch(url_auth, { method: 'get' })
        .then(function (response) {
          response
            .text()
            .then(function (token) {
              fetch(url, {
                headers: {
                  "authorization": "Bearer " + token,
                  "content-type": "application/json",
                },
                body: '[{"Text": "' + msg.txt + '"}]',
                method: "post",
              }).then(function (response) {
                response.text().then(function (json_data) {
                  var data = JSON.parse(json_data);
                  sendResponse({ 'data': data });
                });
              });
            })
            .catch(function (err) {
              notification(err.toString());
              sendResponse({ 'data': { 'ssk_error': true } });
            });
        })
        .catch(function (err) {
          notification(err.toString());
          sendResponse({ 'data': { 'ssk_error': true } });
        });
      return true;
    case utils.CMD_PLAY:
      chrome.storage.local.get(null, function (prefs) {
        var url =
          'https://translate.google.com/translate_tts?ie=UTF-8&q=' +
          encodeURIComponent(msg.txt) + '&tl=' + msg.lng +
          '&total=1&idx=0&textlen=' + msg.txt.length + '&client=gtx&tk=' +
          google_value_tk(prefs.prefTkk, msg.txt);
        var audio = new Audio();
        audio.preload = 'auto';
        audio.src = url;
        audio.addEventListener('ended', function (e) {
          cmn.log('onPlayEnded');
        });
        audio.addEventListener('error', function (e) {
          cmn.log('onPlayError');
        });
        audio.load();
        audio.play();
      });
      return true;
    case utils.CMD_CONV_CURRENCY_CRYPTOCOMPARE:
      var url =
        'https://min-api.cryptocompare.com/data/price?fsym=' + msg.src_conv +
        '&tsyms=' + msg.dst_conv + '&api_key=' +
        process.env.CRYPTOCOMPARE_API_KEY;
      fetch(url, { method: 'get' })
        .then(function (response) {
          response.text().then(function (json_data) {
            try {
              var data = JSON.parse(json_data);
              var rate = data[msg.dst_conv];
              sendResponse({ 'rate': rate });
            } catch (ex) {
              sendResponse({ 'rate': 0.0 });
            }
          });
        })
        .catch(function (err) {
          notification(err.toString());
          sendResponse({ 'rate': 'ssk_error' });
        });
      return true;
  }
}

function google_value_tk(ttk, txt) {
  // Text To Speech, thanks to S3.Translator.
  // translate.google.com/translate/releases/twsfe_w_20151214_RC03/r/js/desktop_module_main.js
  // && TKK from HTML
  var uM = ttk;
  var cb = '&';
  var k = '';
  var Gf = '=';
  var Vb = '+-a^+6';
  var t = 'a';
  var Yb = '+';
  var Zb = '+-3^+b+-f';
  var jd = '.';
  var sM = function (a) {
    return function () {
      return a;
    };
  };
  var tM = function (a, b) {
    for (var c = 0; c < b.length - 2; c += 3) {
      var d = b.charAt(c + 2),
        d = d >= t ? d.charCodeAt(0) - 87 : Number(d),
        d = b.charAt(c + 1) == Yb ? a >>> d : a << d;
      a = b.charAt(c) == Yb ? (a + d) & 4294967295 : a ^ d;
    }
    return a;
  };
  var vM = function (a) {
    var b;
    if (null !== uM) {
      b = uM;
    } else {
      b = sM(String.fromCharCode(84));
      var c = sM(String.fromCharCode(75));
      b = [b(), b()];
      b[1] = c();
      b = (uM = window[b.join(c())] || k) || k;
    }
    var d = sM(String.fromCharCode(116)),
      c = sM(String.fromCharCode(107)),
      d = [d(), d()];
    d[1] = c();
    c = cb + d.join(k) + Gf;
    d = b.split(jd);
    b = Number(d[0]) || 0;

    for (var e = [], f = 0, g = 0; g < a.length; g++) {
      var m = a.charCodeAt(g);
      128 > m
        ? (e[f++] = m)
        : (2048 > m
            ? (e[f++] = (m >> 6) | 192)
            : (55296 == (m & 64512) &&
              g + 1 < a.length &&
              56320 == (a.charCodeAt(g + 1) & 64512)
                ? ((m =
                    65536 + ((m & 1023) << 10) + (a.charCodeAt(++g) & 1023)),
                  (e[f++] = (m >> 18) | 240),
                  (e[f++] = ((m >> 12) & 63) | 128))
                : (e[f++] = (m >> 12) | 224),
              (e[f++] = ((m >> 6) & 63) | 128)),
          (e[f++] = (m & 63) | 128));
    }
    a = b || 0;
    for (f = 0; f < e.length; f++) {
      ((a += e[f]), (a = tM(a, Vb)));
    }
    a = tM(a, Zb);
    a ^= Number(d[1]) || 0;
    0 > a && (a = (a & 2147483647) + 2147483648);
    a %= 1e6;
    return a.toString() + jd + (a ^ b);
  };
  return vM(txt);
}
