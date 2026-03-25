/**
 * SPDX-FileCopyrightText: © 2011–2023, Andrey Shemetov <ashemetov@gmail.com>
 *
 * SPDX-License-Identifier: MPL-2.0 OR GPL-3.0-or-later OR LGPL-3.0-or-later
 */
'use strict';

var translator = {
  event: null,
  engine: utils.ID_GOOGLE_TRANSLATE,
  details_url: '',
  src_lng: null,
  dst_lng: null,
  txt: '',
  trans_txt: '',
  trans_txt_copy: '',
  wait_timeout: null,
  play_img: '',
  zoom: 1.0,

  addLanguages: function (lngSrc, lngDst) {
    var src_lng = document.getElementById('ssk_id_lng_src');
    var dst_lng = document.getElementById('ssk_id_lng_dst');
    if (src_lng.options.length > 0) {
      while (src_lng.options.length > 0) {
        src_lng.remove(src_lng.options.length - 1);
      }
      while (dst_lng.options.length > 0) {
        dst_lng.remove(dst_lng.options.length - 1);
      }
    } else {
      src_lng.onchange = translator.onChange;
      dst_lng.onchange = translator.onChange;
    }
    var engine_code =
      translator.engine == utils.ID_GOOGLE_TRANSLATE ? 'gt'
      : translator.engine == utils.ID_YANDEX_TRANSLATE ? 'y'
      : translator.engine == utils.ID_MS_TRANSLATOR ? 'ms'
      : '';
    for (var lng_code in const_lng.L) {
      if (
        const_lng.isSupported(
          lng_code,
          engine_code,
          g_prefs.prefTranslationSelectedLng
        )
        || lng_code == lngSrc
        || lng_code == lngDst
      ) {
        var src_elem = document.createElement('option'),
          dst_elem = document.createElement('option');
        var s1 = const_lng.getNativeName(lng_code);
        var s2 = const_lng.getDescription(lng_code);
        src_elem.textContent = dst_elem.textContent = s2;
        src_elem.value = dst_elem.value = lng_code;
        src_elem.id = 'ssk_id_src' + lng_code;
        dst_elem.id = 'ssk_id_dst' + lng_code;
        src_elem.classList.add('ssk-translationpanel-select-option');
        dst_elem.classList.add('ssk-translationpanel-select-option');
        if (lng_code == lngSrc) {
          src_elem.selected = true;
          src_elem.textContent = s1;
          src_elem.title = src_lng.title =
            const_lng.getShortDescription(lngSrc);
          src_lng.style.setProperty(
            'width',
            utils.getTextWidth(s1, g_prefs.prefTranslationFontSize - 2),
            'important'
          );
        }
        if (lng_code == lngDst) {
          dst_elem.selected = true;
          dst_elem.textContent = s1;
          dst_elem.title = dst_lng.title =
            const_lng.getShortDescription(lngDst);
          dst_lng.style.setProperty(
            'width',
            utils.getTextWidth(s1, g_prefs.prefTranslationFontSize - 2),
            'important'
          );
        }
        src_lng.appendChild(src_elem);
        dst_lng.appendChild(dst_elem);
      }
    }
  },

  addEngines: function () {
    var engines = document.getElementById('ssk_id_engine');
    if (engines.options.length > 0) {
      while (engines.options.length > 0) {
        engines.remove(engines.options.length - 1);
      }
    } else {
      engines.onchange = translator.onChange;
    }
    var src_lng = document.getElementById('ssk_id_lng_src');
    src_lng = src_lng.options[src_lng.selectedIndex].value;
    var data = {
      txtGoogleTranslate: utils.ID_GOOGLE_TRANSLATE,
      txtWordnikDictionary: utils.ID_WORDNIK_DICT,
      txtUrbanDictionary: utils.ID_URBAN_DICT,
      txtYandexTranslate: utils.ID_YANDEX_TRANSLATE,
      txtMsTranslator: utils.ID_MS_TRANSLATOR
    };
    for (var id in data) {
      var elem = document.createElement('option');
      elem.value = data[id];
      elem.textContent = chrome.i18n.getMessage(id);
      elem.id = 'ssk_id_engine' + id;
      elem.classList.add('ssk-translationpanel-select-option');
      if (elem.value == translator.engine) {
        elem.selected = true;
        engines.style.setProperty(
          'width',
          utils.getTextWidth(
            elem.textContent,
            g_prefs.prefTranslationFontSize - 2
          ),
          'important'
        );
      }
      engines.appendChild(elem);
    }
  },

  onChange: function (e) {
    var src_lng = document.getElementById('ssk_id_lng_src');
    var dst_lng = document.getElementById('ssk_id_lng_dst');
    var engine = document.getElementById('ssk_id_engine');
    src_lng = src_lng.options[src_lng.selectedIndex].value;
    dst_lng = dst_lng.options[dst_lng.selectedIndex].value;
    engine = engine.options[engine.selectedIndex].value;
    var txt = translator.txt;
    if (e == null) {
      [src_lng, dst_lng] = [dst_lng, src_lng];
      txt = translator.trans_txt;
    } else {
      src_lng = e.target.id == 'ssk_id_engine' ? 'auto' : src_lng;
    }
    if (engine == utils.ID_GOOGLE_TRANSLATE) {
      translator.googleTranslate(null, txt, src_lng, dst_lng);
    }
    if (engine == utils.ID_WORDNIK_DICT) {
      translator.wordnikDict(null, txt);
    }
    if (engine == utils.ID_URBAN_DICT) {
      translator.urbanDict(null, txt);
    }
    if (engine == utils.ID_YANDEX_TRANSLATE) {
      translator.yandexTranslate(null, txt, src_lng, dst_lng);
    }
    if (engine == utils.ID_MS_TRANSLATOR) {
      translator.msTranslator(null, txt, src_lng, dst_lng);
    }
  },

  onMouseUp: function (e) {
    switch (e.target.id) {
      case 'ssk_id_translation_open':
        chrome.runtime.sendMessage({
          cmd: utils.CMD_OPEN_URL,
          url: translator.details_url
        });
        translator.hideTranslation();
        return;
      case 'ssk_id_translation_copy':
        copyPlain(
          e.button == 2 ?
            [translator.txt, ': ', translator.trans_txt_copy]
          : [translator.trans_txt_copy]
        );
        translator.hideTranslation();
        return;
      case 'ssk_id_lng_reverse':
        translator.onChange(null);
        return;
      case 'ssk_id_translation_close':
        translator.hideTranslation();
        return;
      case 'ssk_id_translation_play_orig':
        translator.play(true);
        return;
      case 'ssk_id_translation_play_trans':
        translator.play(false);
        return;
    }
    if (
      e.target.id.startsWith('ssk_')
      || e.target.className.startsWith('ssk-')
    ) {
      return;
    } else {
      translator.hideTranslation();
    }
  },

  play: function (isOrig) {
    var txt = isOrig ? translator.txt : translator.trans_txt;
    var lng = isOrig ? translator.src_lng : translator.dst_lng;
    chrome.runtime.sendMessage(
      {cmd: utils.CMD_PLAY, txt: txt, lng: lng},
      function (response) {}
    );
  },

  showWaitCursor: function () {
    if (translator.wait_timeout) {
      window.clearTimeout(translator.wait_timeout);
    }
    translator.wait_timeout = window.setTimeout(function () {
      translator.hideWaitCursor();
    }, 5000);
    document.body.classList.add('ssk-translationpanel-waiting');
  },

  hideWaitCursor: function () {
    if (translator.wait_timeout) {
      window.clearTimeout(translator.wait_timeout);
      translator.wait_timeout = null;
    }
    document.body.classList.remove('ssk-translationpanel-waiting');
  },

  defaultTranslate: function (e, txt) {
    if (g_prefs.prefDefaultTranslator == 'y') {
      translator.yandexTranslate(
        e,
        txt,
        'auto',
        g_prefs.prefTranslationDestLng
      );
    } else if (g_prefs.prefDefaultTranslator == 'm') {
      translator.msTranslator(e, txt, 'auto', g_prefs.prefTranslationDestLng);
    } else {
      translator.googleTranslate(
        e,
        txt,
        'auto',
        g_prefs.prefTranslationDestLng
      );
    }
  },

  googleDict: function (e, txt, lngSrc, lngDst) {
    translator.showWaitCursor();
    translator.details_url =
      'https://translate.google.com/?text=' + encodeURIComponent(txt)
	  + '&langpair=' + lngSrc + '|' + lngDst;
    chrome.runtime.sendMessage(
      {cmd: utils.CMD_GOOGLE_DICT, txt: txt, lngSrc: lngSrc, lngDst: lngDst},
      function (response) {
        if ('ssk_error' in response.data) {
          translator.hideWaitCursor();
          return;
        }
        var strings = [];
        if ('sentences' in response.data) {
          var transcription =
            response.data.sentences.length > 1 ?
              response.data.sentences[1].src_translit
            : '';
          translator.trans_txt = response.data.sentences[0].trans;
          strings.push(translator.trans_txt);
        } else {
          strings.push(response.data[0]);
        }
        if ('dict' in response.data) {
          strings.push('');
          for (var i = 0; i < response.data.dict.length; i++) {
            var part =
              response.data.dict[i].pos ?
                '<em class="ssk-translationpanel-em">'
				+ response.data.dict[i].pos + ':</em>&nbsp;'
              : '&nbsp;&nbsp;&nbsp;';
            strings.push(part + response.data.dict[i].terms.join(', '));
          }
        }
        if ('src' in response.data) {
          lngSrc = response.data.src == 'iw' ? 'he' : response.data.src; // workaround for google bug
        }
        translator.showTranslation(
          e,
          txt,
          transcription,
          strings,
          true,
          lngSrc,
          lngDst
        );
      }
    );
  },

  googleTranslate: function (e, txt, lngSrc, lngDst) {
    translator.showWaitCursor();
    translator.engine = utils.ID_GOOGLE_TRANSLATE;
    if (utils.isWord(txt)) {
      translator.googleDict(e, txt, lngSrc, lngDst);
      return;
    }
    translator.details_url =
      'https://translate.google.com/?text=' + encodeURIComponent(txt)
	  + '&langpair=' + lngSrc + '|' + lngDst;
    chrome.runtime.sendMessage(
      {
        cmd: utils.CMD_GOOGLE_TRANSLATE,
        txt: txt,
        lngSrc: lngSrc,
        lngDst: lngDst
      },
      function (response) {
        if ('ssk_error' in response.data) {
          translator.hideWaitCursor();
          return;
        }
        var strings = [];
        for (var i = 0; i < response.data[0].length; i++) {
          strings.push(
            response.data[0][i][0].replace(/\r/gi, '').replace(/\n/gi, '')
          );
        }
        translator.trans_txt = strings.join('. ');
        lngSrc = response.data[2] == 'iw' ? 'he' : response.data[2]; // workaround for google bug
        translator.showTranslation(e, txt, '', strings, true, lngSrc, lngDst);
      }
    );
  },

  wordnikDict: function (e, txt) {
    translator.showWaitCursor();
    translator.engine = utils.ID_WORDNIK_DICT;
    translator.details_url =
      'https://www.wordnik.com/words/' + encodeURIComponent(txt);
    chrome.runtime.sendMessage(
      {cmd: utils.CMD_WORDNIK_DICT, txt: txt},
      function (response) {
        if ('ssk_error' in response.data) {
          translator.hideWaitCursor();
          return;
        }
        var strings = [];
        for (var i = 0; i < response.data.length; i++) {
          var text = response.data[i].text;
          if (text) {
            var part =
              response.data[i].partOfSpeech ?
                '<em class="ssk-translationpanel-em">'
                + response.data[i].partOfSpeech
                + ':</em>&nbsp;'
              : '&nbsp;&nbsp;&nbsp;';
            text = text.replace(
              /<xref>|<strong>/gi,
              '<xref class="ssk-translationpanel-xref">'
            );
            text = text.replace(/<\/strong>/gi, '</xref>');
            strings.push(part + text);
          }
        }
        if (response.data.message) {
          strings.push(response.data.message);
        }
        if (txt != txt.toLowerCase()) {
          strings.push(
            'You may find more data at <xref class="ssk-translationpanel-xref">'
              + txt.toLowerCase() + '</xref>'
          );
        }
        translator.showTranslation(
          e,
          txt,
          '',
          strings,
          false,
          translator.src_lng ? translator.src_lng : 'en',
          translator.dst_lng ?
            translator.dst_lng
          : g_prefs.prefTranslationDestLng
        );
      }
    );
  },

  urbanDict: function (e, txt) {
    translator.showWaitCursor();
    translator.engine = utils.ID_URBAN_DICT;
    translator.details_url =
      'https://www.urbandictionary.com/define.php?term='
      + encodeURIComponent(txt);
    chrome.runtime.sendMessage(
      {cmd: utils.CMD_URBAN_DICT, txt: txt},
      function (response) {
        if ('ssk_error' in response.data) {
          translator.hideWaitCursor();
          return;
        }
        var strings = [];
        for (var i = 0; i < response.data.list.length; i++) {
          var text = response.data.list[i].definition;
          text = text.replace(
            /\[/gi,
            '<xref class="ssk-translationpanel-xref">'
          );
          text = text.replace(/\]/gi, '</xref>');
          strings.push('&nbsp;&nbsp;&nbsp;' + text);
        }
        translator.showTranslation(
          e,
          txt,
          '',
          strings,
          false,
          translator.src_lng ? translator.src_lng : 'en',
          translator.dst_lng ?
            translator.dst_lng
          : g_prefs.prefTranslationDestLng
        );
      }
    );
  },

  yandexDict: function (e, txt, lngSrc, lngDst) {
    translator.showWaitCursor();
    translator.details_url =
      'https://translate.yandex.com/?text=' + encodeURIComponent(txt);
    // Yandex is greedy and wants money starting from 8/2020, so use MS
	// Translator for detecting source languages.
    chrome.runtime.sendMessage(
      {cmd: utils.CMD_MS_DETECT_LNG, txt: txt},
      function (response) {
        if ('ssk_error' in response.data) {
          translator.hideWaitCursor();
          return;
        }
        lngSrc = lngSrc == 'auto' ? response.data[0].language : lngSrc;
        lngSrc = lngSrc ? lngSrc : 'en';
        chrome.runtime.sendMessage(
          {
            cmd: utils.CMD_YANDEX_DICT,
            txt: txt,
            lngSrc: lngSrc,
            lngDst: lngDst
          },
          function (response) {
            if ('ssk_error' in response.data) {
              translator.hideWaitCursor();
              return;
            }
            var strings = [];
            var transcription = '';
            if ('def' in response.data) {
              for (var i = 0; i < response.data.def.length; i++) {
                if (i == 0) {
                  transcription = response.data.def[i].ts;
                  translator.trans_txt = response.data.def[0].tr[0].text;
                  strings.push(translator.trans_txt);
                  strings.push('');
                }
                var all = [];
                for (var j = 0; j < response.data.def[i].tr.length; j++) {
                  all.push(response.data.def[i].tr[j].text);
                }
                var part =
                  response.data.def[i].pos ?
                    '<em class="ssk-translationpanel-em">'
                    + response.data.def[i].pos
                    + ':</em>&nbsp;'
                  : '&nbsp;&nbsp;&nbsp;';
                strings.push(part + all.join(', '));
              }
            }
            if (strings.length) {
              translator.showTranslation(
                e,
                txt,
                transcription,
                strings,
                true,
                lngSrc,
                lngDst
              );
            } else {
              translator.yandexTranslate(e, txt, 'auto', lngDst, true);
            }
          }
        );
      }
    );
  },

  yandexTranslate: function (e, txt, lngSrc, lngDst, force = false) {
    translator.showWaitCursor();
    translator.engine = utils.ID_YANDEX_TRANSLATE;
    if (!force && utils.isWord(txt)) {
      translator.yandexDict(e, txt, lngSrc, lngDst);
      return;
    }
    translator.engine = utils.ID_YANDEX_TRANSLATE;
    // Yandex is greedy and wants money starting from 8/2020, so use MS
	// Translator for translation.
    // var lng_pair = (lngSrc=='auto' ? '' : lngSrc+'-') + lngDst;
    translator.details_url =
      'https://translate.yandex.com/?text=' + encodeURIComponent(txt);
    // chrome.runtime.sendMessage({
	//   cmd: utils.CMD_YANDEX_TRANSLATE,
	//   txt: txt,
	//   lng_pair: lng_pair
	// }, function(response) {
    //   if ('ssk_error' in response.data) {
	//     translator.hideWaitCursor(); return;
	//   }
    //   translator.trans_txt = response.data.text.join('. ');
    //   translator.showTranslation(e, txt, '', response.data.text, true,
	//     lngSrc=='auto' ? response.data.detected.lang : lngSrc,
	//     lngDst
	//   );
    // });
    chrome.runtime.sendMessage(
      {cmd: utils.CMD_MS_TRANSLATOR, txt: txt, lngSrc: lngSrc, lngDst: lngDst},
      function (response) {
        if ('ssk_error' in response.data) {
          translator.hideWaitCursor();
          return;
        }
        translator.showTranslation(
          e,
          txt,
          '',
          [response.data[0].translations[0].text],
          true,
          response.data[0].detectedLanguage.language,
          lngDst
        );
      }
    );
  },

  msDict: function (e, txt, lngSrc, lngDst) {
    translator.showWaitCursor();
    translator.details_url =
      'https://www.bing.com/translator/?text='
      + encodeURIComponent(txt)
      + '&to='
      + lngDst;
    chrome.runtime.sendMessage(
      {cmd: utils.CMD_MS_DETECT_LNG, txt: txt},
      function (response) {
        if ('ssk_error' in response.data) {
          translator.hideWaitCursor();
          return;
        }
        lngSrc = lngSrc == 'auto' ? response.data[0].language : lngSrc;
        lngSrc = lngSrc ? lngSrc : 'en';
        chrome.runtime.sendMessage(
          {cmd: utils.CMD_MS_DICT, txt: txt, lngSrc: lngSrc, lngDst: lngDst},
          function (response) {
            if ('ssk_error' in response.data) {
              translator.hideWaitCursor();
              return;
            }
            var strings = [];
            if (response.data[0]) {
              for (var i = 0; i < response.data[0].translations.length; i++) {
                if (i == 0) {
                  translator.trans_txt =
                    response.data[0].translations[i].displayTarget;
                  strings.push(translator.trans_txt);
                  strings.push('');
                }
                strings.push(
                  '<em class="ssk-translationpanel-em">'
                    + response.data[0].translations[i].posTag.toLowerCase()
                    + ':</em>&nbsp;'
                    + response.data[0].translations[i].displayTarget
                );
              }
            }
            if (strings.length) {
              translator.showTranslation(
                e,
                txt,
                '',
                strings,
                true,
                lngSrc,
                lngDst
              );
            } else {
              translator.msTranslator(e, txt, 'auto', lngDst, true);
            }
          }
        );
      }
    );
  },

  msTranslator: function (e, txt, lngSrc, lngDst, force = false) {
    translator.showWaitCursor();
    translator.engine = utils.ID_MS_TRANSLATOR;
    if (!force && utils.isWord(txt)) {
      translator.msDict(e, txt, lngSrc, lngDst);
      return;
    }
    translator.details_url =
      'https://www.bing.com/translator/?text=' + encodeURIComponent(txt)
	  + '&to=' + lngDst;
    chrome.runtime.sendMessage(
      {cmd: utils.CMD_MS_TRANSLATOR, txt: txt, lngSrc: lngSrc, lngDst: lngDst},
      function (response) {
        if ('ssk_error' in response.data) {
          translator.hideWaitCursor();
          return;
        }
        translator.showTranslation(
          e,
          txt,
          '',
          [response.data[0].translations[0].text],
          true,
          response.data[0].detectedLanguage.language,
          lngDst
        );
      }
    );
  },

  styleTranslation: function (isMultiLng, transcription) {
    if (translator.zoom != 1) {
      var panel = document.getElementById('ssk_id_translation_panel');
      var zoom = 1 / translator.zoom;
      panel.style.setProperty(
        'transform',
        'scale({0})'._format(zoom._round(2)),
        'important'
      );
    }
    // show\hide elements according to engine and language
    document
      .getElementById('ssk_id_lng_src')
      .style.setProperty(
        'display',
        isMultiLng ? 'inline' : 'none',
        'important'
      );
    document
      .getElementById('ssk_id_lng_reverse')
      .style.setProperty(
        'display',
        isMultiLng ? 'inline' : 'none',
        'important'
      );
    document
      .getElementById('ssk_id_lng_dst')
      .style.setProperty(
        'display',
        isMultiLng ? 'inline' : 'none',
        'important'
      );
    document
      .getElementById('ssk_id_engine')
      .style.setProperty('display', 'inline', 'important');
    // user customization
    var size = parseInt(g_prefs.prefTranslationFontSize, 10);
    cmn.setStyleProp('ssk-translationpanel', {
      'font-size': size + 'px',
      'background-color': g_prefs.prefTranslationBkColor,
      'color': g_prefs.prefTranslationFontColor,
      'border-color': g_prefs.prefTranslationBorderColor,
      'font-family': 'Roboto,sans-serif'
    });
    cmn.setStyleProp('ssk-translationpanel-origtext', {
      'font-size': size + 'px',
      'background-color': g_prefs.prefTranslationBkColor,
      'color': g_prefs.prefTranslationFontColor,
      'font-family': 'Roboto,sans-serif'
    });
    if (g_prefs.prefTranscriptionOwnLine && transcription) {
      cmn.setStyleProp('ssk-translationpanel-origtext', {'line-height': '1.0'});
    }
    cmn.setStyleProp('ssk-translationpanel-translation', {
      'font-size': size + 'px',
      'background-color': g_prefs.prefTranslationBkColor,
      'color': g_prefs.prefTranslationFontColor,
      'font-family': 'Roboto,sans-serif'
    });
    cmn.setStyleProp('ssk-translationpanel-select', {
      'font-size': size - 2 + 'px',
      'min-height;max-height': size + 2 + 'px',
      'color': g_prefs.prefTranslationLngColor,
      'font-family': 'Roboto,sans-serif'
    });
    cmn.setStyleProp('ssk-translationpanel-select-engine', {
      'font-size': size - 2 + 'px',
      'color': g_prefs.prefTranslationEngineColor
    });
    cmn.setStyleProp('ssk-translationpanel-button', {
      'min-width;max-width;min-height;max-height': size + 2 + 'px'
    });
    cmn.setStyleProp('ssk-translationpanel-em', {
      color: g_prefs.prefTransIconsColor
    });
    // next line is a workaround for some stupid sites that define global attributes with '!important'
    cmn.setStyleProp('ssk-translationpanel-select', {
      'background-color': 'transparent'
    });
  },

  adjustTranslation(e, txt, transcription, strings, isMultiLng) {
    translator.addLanguages(translator.src_lng, translator.dst_lng);
    translator.addEngines();
    if (txt.length > 100) {
      txt = txt.substr(0, 100) + '...';
    }
    var translation = document.getElementById('ssk_id_translation');
    var play_orig =
      '<img id="ssk_id_translation_play_orig" src="' + translator.play_img
      + '" class="ssk-translationpanel-button '
	  + 'ssk-translationpanel-playbutton" />&nbsp;';
    var play_trans =
      isMultiLng ?
        '<img id="ssk_id_translation_play_trans" src="' + translator.play_img
        + '" class="ssk-translationpanel-button '
		+ 'ssk-translationpanel-playbutton" />&nbsp;'
      : '';
    transcription =
      transcription ?
        (g_prefs.prefTranscriptionOwnLine ?
          '<br class="ssk-translationpanel-eol" />'
		  + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'
        : ' ')
        + '[' + transcription + ']'
      : '';
    translation.innerHTML =
      '<span id="ssk_id_translation_origtext" '
	  + 'class="ssk-translationpanel-origtext" />' + play_orig + txt
	  + transcription + '</span>' + play_trans
      + strings.join('<br class="ssk-translationpanel-eol" />');
    translator.styleTranslation(isMultiLng, transcription);
    translator.trans_txt_copy = strings.join('\n');
    translator.trans_txt_copy = utils.removeHtmlTags(translator.trans_txt_copy);
    translator.trans_txt_copy = translator.trans_txt_copy.replace(
      /&nbsp;/gi,
      ' '
    );
    e = translator.event;
    var panel = document.getElementById('ssk_id_translation_panel');
    var [x, y, x_client, y_client] = utils.getAdjustedXY(e);
    var [client_w, client_h, offset_w, offset_h] = utils.getAdjustedSize(
      panel,
      translator.zoom
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
    // this is special case for Wordnik and Urban dictionary, they are using <xref> tag
    const elems = document.getElementsByClassName('ssk-translationpanel-xref');
    for (const elem of elems) {
      if (translator.engine == utils.ID_WORDNIK_DICT) {
        elem.addEventListener('click', function (e) {
          translator.wordnikDict(null, e.target.textContent);
        });
      }
      if (translator.engine == utils.ID_URBAN_DICT) {
        elem.addEventListener('click', function (e) {
          translator.urbanDict(null, e.target.textContent);
        });
      }
    }
  },

  showTranslation: function (
    e,
    txt,
    transcription,
    strings,
    isMultiLng,
    lngSrc,
    lngDst
  ) {
    translator.hideWaitCursor();
    g_entered_ssk = false;
    translator.txt = txt;
    translator.src_lng = lngSrc ? lngSrc : translator.src_lng;
    translator.dst_lng = lngDst ? lngDst : translator.dst_lng;
    if (e != null) {
      translator.event = e;
      var pos_fixed =
        (e.pageX == 0 && e.pageY == 0) || !g_prefs.prefHideOnScroll;
      chrome.runtime.sendMessage(
        {
          cmd: utils.CMD_GET_TRANSLATION_PANEL,
          pos_fixed: pos_fixed,
          icnsClr: g_prefs.prefTransIconsColor
        },
        function (response) {
          translator.play_img = response.play_img;
          translator.zoom = response.zoom;
          utils.insertHtml(response.panel);
          window.addEventListener('mouseup', translator.onMouseUp, true);
          if (g_prefs.prefHideOnMoveMouseAway) {
            window.addEventListener('mousemove', onMouseMove);
          }
          window.setTimeout(function () {
            window.addEventListener('contextmenu', onStopEvent, true);
          }, utils.MOUSE_BUTTON_CLICK_DELAY_MS);
          translator.adjustTranslation(
            e,
            txt,
            transcription,
            strings,
            isMultiLng
          );
        }
      );
    } else {
      translator.adjustTranslation(e, txt, transcription, strings, isMultiLng);
    }
  },

  hideTranslation: function () {
    translator.hideWaitCursor();
    window.removeEventListener('mouseup', translator.onMouseUp, true);
    window.removeEventListener('mousemove', onMouseMove);
    window.setTimeout(function () {
      window.removeEventListener('contextmenu', onStopEvent, true);
    }, utils.MOUSE_BUTTON_CLICK_DELAY_MS);
    var panel = document.getElementById('ssk_id_translation_panel');
    if (panel) {
      panel.parentNode.removeChild(panel);
    }
  }
};
