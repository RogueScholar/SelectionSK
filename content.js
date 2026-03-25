/**
 * SPDX-FileCopyrightText: © 2011–2023, Andrey Shemetov <ashemetov@gmail.com>
 *
 * SPDX-License-Identifier: MPL-2.0 OR GPL-3.0-or-later OR LGPL-3.0-or-later
 */
'use strict';

// Initialization.
var g_selection = ''; // Current selection as a string.
var g_selection_html = ''; // Current selection in HTML format.
var g_selection_obj = null; // HTML object that holds selection (for HTML pages)
var g_selection_text_box = null; // Selection happened within this text box.
var g_selection_email = ''; // Selected text is email address.
var g_selection_urls = []; // Selected text is URI.
var g_event = null;
var g_close_timeout = null;
var g_button_timeout = null;
var g_copy_data = null;
var g_prefs = {};
var g_mark_count = 0; // Total number of highlighed words.
var g_mark_idx = 0; // Index of current color for highlighting.
var g_mark_cur = null; // Currently selected mark.
var g_hold_key_code = null;
var g_entered_ssk = false;
var g_zoom = 1.0;

window.addEventListener('load', onLoad, true);
window.addEventListener('mouseup', onMouseUp, true);
window.addEventListener('mousedown', onMouseDown);
window.addEventListener('keyup', onKeyUp, true);
window.addEventListener('keydown', onKeyDown, true);
window.addEventListener('copy', onCopy, true);
window.addEventListener('scroll', onScroll);
chrome.runtime.onMessage.addListener(notify);
chrome.storage.onChanged.addListener(prefChange);

prefChange(null, null);
setBadgeText();

function onLoad(e) {
  autoMark();
  enableTextSelection();
  addMycroftIntegration();
}

function isTextBoxDesignMode(e) {
  try {
    return (
      (e.target.ownerDocument
        && e.target.ownerDocument.designMode
        && e.target.ownerDocument.designMode == 'on')
      || (e.target.isContentEditable && e.target.isContentEditable == true)
    );
  } catch (ex) {
    cmn.log(ex.toString());
    return false;
  }
}

function isTextBox(elem) {
  try {
    return (
      (elem instanceof HTMLInputElement
        && ['text', 'search', 'password'].indexOf(elem.type) > -1)
      || elem instanceof HTMLTextAreaElement
    );
  } catch (ex) {
    cmn.log(ex.toString());
    return false;
  }
}

function isTextArea() {
  try {
    return (
      document.activeElement
      && document.activeElement.tagName.toUpperCase() == 'TEXTAREA'
    );
  } catch (ex) {
    cmn.log(ex.toString());
    return false;
  }
}

function isGoogleCalendarDateTime(e) {
  try {
    if (
      e.target instanceof HTMLInputElement
      && e.target.type == 'text'
      && e.target.baseURI.indexOf('calendar.google.com') > -1
    ) {
      var idx1 = e.target.value.indexOf('am'),
        idx2 = e.target.value.indexOf('pm'),
        idx3 = e.target.value.indexOf(', 1'),
        idx4 = e.target.value.indexOf(', 2');
      return (
        idx1 == 4
        || idx1 == 5
        || idx2 == 4
        || idx2 == 5
        || idx3 == 5
        || idx3 == 6
        || idx4 == 5
        || idx4 == 6
      );
    }
    return false;
  } catch (ex) {
    cmn.log(ex.toString());
    return false;
  }
}

function isGoogleDocs() {
  return (
    document.URL.indexOf('docs.google.com') > -1
    || document.URL.indexOf('keep.google.com') > -1
  );
}

function isSSKActionElement(e) {
  try {
    return (
      [
        'ssk-menu-btn',
        'ssk-menu-text',
        'ssk-button-img',
        'ssk-panel-img',
        'ssk-popup-button-img'
      ].indexOf(e.target.className.split(' ')[0]) > -1
    );
  } catch (ex) {
    cmn.log(ex.toString());
    return false;
  }
}

function isDisabledEx(prefs) {
  try {
    return prefs.prefBlacklist.indexOf(document.URL.split('/')[2]) > -1;
  } catch (ex) {
    cmn.log(ex.toString());
    return false;
  }
}

function isDisabled() {
  return isDisabledEx(g_prefs);
}

function getPageDetails(pattern) {
  var params = {};
  for (let p of pattern.split('{')) {
    if (p.indexOf('}') != -1) {
      try {
        var n = p.split('}')[0];
        params[n] = document[n].toString();
      } catch (ex) {
        cmn.log(ex.toString());
      }
    }
  }
  return pattern._format(params);
}

function onMouseUp(e) {
  if (document.getElementById('ssk_id_translation_panel')) {
    return;
  }
  if (document.getElementById('ssk_id_converter_panel')) {
    return;
  }
  if (isSSKActionElement(e)) {
    onAction(e);
    return;
  }
  if (e.button != 0) {
    return;
  }
  if (isGoogleCalendarDateTime(e)) {
    return;
  }
  if (isDisabled()) {
    return;
  }
  if (isTextBoxDesignMode(e)) {
    g_selection_obj = document.getSelection();
    g_selection_text_box = e.target;
    g_selection = g_selection_obj.toString().trim();
  } else {
    if (isTextBox(e.target)) {
      g_selection_obj = null;
      g_selection_text_box = e.target;
      g_selection = g_selection_text_box.value
        .substring(
          g_selection_text_box.selectionStart,
          g_selection_text_box.selectionEnd
        )
        .trim();
    } else {
      if (isTextArea() || isTextBox(document.activeElement)) {
        g_selection_obj = null;
        g_selection_text_box = document.activeElement;
        g_selection = g_selection_text_box.value
          .substring(
            g_selection_text_box.selectionStart,
            g_selection_text_box.selectionEnd
          )
          .trim();
      } else {
        if (isGoogleDocs()) {
          g_selection_obj = null;
          g_selection_text_box = null;
          var googleDocument = googleDocsUtil.getGoogleDocument();
          g_selection = googleDocument.selectedText;
        }
        // some google docs (like google form) are working like regular html page, so treat them accordingly
        if (g_selection == '') {
          g_selection_obj = document.getSelection();
          g_selection_text_box = null;
          if (g_selection_obj) {
            g_selection = g_selection_obj.toString().trim();
          }
        }
      }
    }
  }
  if (g_selection_text_box && !g_prefs.prefAllowInTextBox) {
    return;
  }
  if (g_selection != '') {
    if (
      g_prefs.prefAutoCopy
      && (g_prefs.prefAllowACInTextBox || !g_selection_text_box)
    ) {
      if (g_prefs.prefAutoCopyPlain) {
        copyPlain(g_selection);
      } else {
        document.execCommand('copy');
      }
      if (g_prefs.prefBlinkOnCopy) {
        chrome.runtime.sendMessage({cmd: utils.CMD_BLINK});
      }
    }
    var hold_key_code = g_hold_key_code;
    g_hold_key_code = null;
    var not_link = e.target.tagName.toLowerCase() != 'a';
    if (
      not_link
      && (g_prefs.prefInstantTranslationKey.indexOf(hold_key_code) != -1
        || g_prefs.prefShowAsTranslation)
    ) {
      translator.defaultTranslate(e, g_selection);
      clearSelection();
    } else if (
      not_link
      && g_prefs.prefInstantHighlightKey.indexOf(hold_key_code) != -1
    ) {
      mark(g_selection);
      clearSelection();
    } else if (
      not_link
      && g_prefs.prefInstantConversionKey.indexOf(hold_key_code) != -1
    ) {
      converter.convert(e, g_selection);
      clearSelection();
    } else if (!g_prefs.prefShowContextOnly) {
      g_event = e;
      var obj = document.createElement('div');
      if (g_selection_obj) {
        obj.appendChild(g_selection_obj.getRangeAt(0).cloneContents());
        g_selection_html = obj.innerHTML.trim();
        g_selection_html =
          (
            g_selection_html != g_selection
            && g_selection_html.indexOf('<') != -1
          ) ?
            g_selection_html
          : '';
      }
      var sel = g_selection;
      // detect obfuscated urls and emails
      sel = sel.replace(/hxxp|_ttp| ttp|h\?\?p|h\+\+p|h\*\*p/gi, 'http');
      sel = sel.replace(
        /\(@\)|\[@\]|\{@\}|_@_| @ | \(@\) | \[@\] | \{@\} | _@_ /gi,
        '@'
      );
      sel = sel.replace(
        /\(at\)|\[at\]|\{at\}|_at_| \(at\) | \[at\] | \{at\} | _at_ /gi,
        '@'
      );
      sel = sel.replace(
        /\(#\)|\[#\]|\{#\}|_#_| # | \(#\) | \[#\] | \{#\} | _#_ /gi,
        '@'
      );
      sel = sel.replace(
        /\(\.\)|\[\.\]|\{\.\}|_\._| \. | \(\.\) | \[\.\] | \{\.\} | _\._ /gi,
        '.'
      );
      sel = sel.replace(
        /\(dot\)|\[dot\]|\{dot\}|_dot_| dot | \(dot\) | \[dot\] | \{dot\} | _dot_ /gi,
        '.'
      );
      sel = sel.replace(
        /\(point\)|\[point\]|\{point\}|_point_| point | \(point\) | \[point\] | \{point\} | _point_ /gi,
        '.'
      );
      sel = sel.replace(
        /\(точка\)|\[точка\]|\{точка\}|_точка_| точка | \(точка\) | \[точка\] | \{точка\} | _точка_ /gi,
        '.'
      );
      sel = sel.replace(
        /\(punkt\)|\[punkt\]|\{punkt\}|_punkt_| punkt | \(punkt\) | \[punkt\] | \{punkt\} | _punkt_ /gi,
        '.'
      );
      g_selection_email = utils.extractEmailAddress(sel);
      if (!g_selection_email) {
        g_selection_urls = utils.extractURLs(sel, obj);
      }
      setBadgeText();
      if (g_prefs.prefUnobtrusive) {
        window.addEventListener('mousemove', onMouseMove);
        showPopupButton(e);
      } else {
        showPopup(e);
      }
    } else {
      setBadgeText();
    }
  } else {
    setBadgeText();
    clearSelectionVars();
  }
}

function onAction(e) {
  setBadgeText();
  // ff and chrome have different behavior, so check all class names
  var id = '';
  switch (e.target.className.split(' ')[0]) {
    case 'ssk-menu-btn':
      id = e.target.parentNode.id;
      break;
    case 'ssk-menu-text':
      id = e.target.parentNode.parentNode.id;
      break;
    case 'ssk-button-img':
      id = e.target.parentNode.parentNode.id;
      break;
    case 'ssk-panel-img':
      id = e.target.id;
      break;
    case 'ssk-popup-button-img':
      id = e.target.id;
      break;
  }
  switch (id) {
    case utils.ID_POPUP_BUTTON:
      if (g_button_timeout) {
        window.clearTimeout(g_button_timeout);
        g_button_timeout = null;
      }
      var button = document.getElementById('ssk_id_button');
      if (button) {
        button.parentNode.removeChild(button);
      }
      showPopup(g_event);
      return;
    case utils.ID_CUT:
      if (g_selection_text_box) {
        g_selection_text_box.focus();
      }
      document.execCommand('cut');
      break;
    case utils.ID_COPY:
      if (
        isGoogleDocs()
      ) // special case - google apps doesn't support standard browser commands
      {
        copyPlain(g_selection);
        break;
      }
      if (e.button == 2) {
        copyPlain(g_selection);
      } else {
        if (g_selection_text_box) {
          g_selection_text_box.focus();
        }
        document.execCommand('copy');
      }
      break;
    case utils.ID_PASTE:
      if (g_selection_text_box) {
        g_selection_text_box.focus();
      }
      document.execCommand('paste');
      break;
    case utils.ID_DELETE:
      if (g_selection_text_box) {
        g_selection_text_box.focus();
      }
      document.execCommand('delete');
      break;
    case utils.ID_COPY_PLAIN:
      if (e.button == 2) {
        if (g_selection_text_box) {
          g_selection_text_box.focus();
        }
        document.execCommand('copy');
      } else {
        copyPlain(g_selection);
      }
      break;
    case utils.ID_COPY_HTML:
      copyPlain(g_selection_html);
      break;
    case utils.ID_GOOGLE_TRANSLATE:
      translator.googleTranslate(
        g_prefs.prefShowAsMenu ? g_event : e,
        g_selection,
        'auto',
        g_prefs.prefTranslationDestLng
      );
      break;
    case utils.ID_WORDNIK_DICT:
      translator.wordnikDict(g_prefs.prefShowAsMenu ? g_event : e, g_selection);
      break;
    case utils.ID_URBAN_DICT:
      translator.urbanDict(g_prefs.prefShowAsMenu ? g_event : e, g_selection);
      break;
    case utils.ID_YANDEX_TRANSLATE:
      translator.yandexTranslate(
        g_prefs.prefShowAsMenu ? g_event : e,
        g_selection,
        'auto',
        g_prefs.prefTranslationDestLng
      );
      break;
    case utils.ID_MS_TRANSLATOR:
      translator.msTranslator(
        g_prefs.prefShowAsMenu ? g_event : e,
        g_selection,
        'auto',
        g_prefs.prefTranslationDestLng
      );
      break;
    case utils.ID_OPEN_URL:
      chrome.runtime.sendMessage({
        cmd: utils.CMD_OPEN_URL,
        url: g_selection_urls[0]
      });
      break;
    case utils.ID_OPEN_ALL_URLS:
      for (var i = 0; i < g_selection_urls.length; i++) {
        chrome.runtime.sendMessage({
          cmd: utils.CMD_OPEN_URL,
          url: g_selection_urls[i]
        });
      }
      break;
    case utils.ID_COPY_ALL_URLS:
      copyURLs();
      break;
    case utils.ID_HIGHLIGHT:
      mark(g_selection, e.button == 2, e.button == 1);
      break;
    case utils.ID_CONVERT:
      converter.convert(g_prefs.prefShowAsMenu ? g_event : e, g_selection);
      break;
    case utils.ID_MAILTO:
      if (g_selection_email) {
        chrome.runtime.sendMessage({
          cmd: utils.CMD_MAILTO,
          to: g_selection_email,
          subj: '',
          selection: ''
        });
      } else {
        document.execCommand('copy');
        chrome.runtime.sendMessage({
          cmd: utils.CMD_MAILTO,
          to: '',
          subj: getPageDetails(g_prefs.prefCtrlCPattern),
          selection: g_selection
        });
      }
      break;
    default:
      if (id) {
        if (id.startsWith(utils.ID_OPEN_URL)) {
          // url
          var idx = id.substr(utils.ID_OPEN_URL.length + 1);
          chrome.runtime.sendMessage({
            cmd: utils.CMD_OPEN_URL,
            url: g_selection_urls[idx]
          });
        } else if (id.startsWith(utils.ID_HIGHLIGHT)) {
          // highlight with specific color
          g_mark_idx = id.substr(utils.ID_HIGHLIGHT.length + 1);
          mark(g_selection, e.button == 2, e.button == 1);
        } else if (id.startsWith(utils.ID_SEARCH)) {
          // FF search engine
          var engine = id.substr(utils.ID_SEARCH.length + 1);
          var sel = g_selection;
          if (g_prefs.prefAutoHighlight || e.button == 1) {
            setAutoMark(g_prefs, sel);
          }
          if (e.button == 2) {
            sel = '"' + sel + '"';
          }
          chrome.runtime.sendMessage({
            cmd: utils.CMD_SEARCH,
            engine: engine,
            selection: sel
          });
        } else if (id.startsWith(utils.ID_UPS)) {
          // UPS Tracking
          chrome.runtime.sendMessage({
            cmd: utils.CMD_OPEN_URL,
            url: 'https://www.ups.com/track?tracknum=' + g_selection
          });
        } else if (id.startsWith(utils.ID_USPS)) {
          // USPS Tracking
          chrome.runtime.sendMessage({
            cmd: utils.CMD_OPEN_URL,
            url:
              'https://tools.usps.com/go/TrackConfirmAction.action?tLabels='
              + g_selection
          });
        } else if (id.startsWith(utils.ID_Fedex)) {
          // Fedex Tracking
          chrome.runtime.sendMessage({
            cmd: utils.CMD_OPEN_URL,
            url:
              'https://www.fedex.com/apps/fedextrack/?action=track&trackingnumber='
              + g_selection
          });
        } else {
          // bookmark
          var sel = g_selection;
          if (g_prefs.prefAutoHighlight || e.button == 1) {
            setAutoMark(g_prefs, sel);
          }
          if (e.button == 2) {
            sel = '"' + sel + '"';
          }
          chrome.runtime.sendMessage({
            cmd: utils.CMD_OPEN_BOOKMARK,
            id: id,
            selection: sel
          });
        }
      } else {
        // click on the submenu item, do nothing
        return;
      }
  }
  if (!g_prefs.prefKeepPopup) {
    if (g_close_timeout) {
      window.clearTimeout(g_close_timeout);
      g_close_timeout = null;
    }
    hidePopup();
    clearSelection(!g_prefs.prefKeepSelection);
  }
}

function onMouseDown(e) {
  if (
    !e.target.id.startsWith('ssk_')
    && !e.target.className.startsWith('ssk-')
  ) {
    if (g_close_timeout) {
      window.clearTimeout(g_close_timeout);
      g_close_timeout = null;
    }
    if (e.button == 0) {
      clearSelection(false);
    }
    hidePopup();
    translator.hideTranslation();
    converter.hideConverter();
  } else {
    // disable middle button scroll if cliked on SSK
    if (e.button == 1) {
      onStopEvent(e);
    }
  }
}

function onMouseMove(e) {
  if (e.target.id.startsWith('ssk_') || e.target.className.startsWith('ssk-')) {
    g_entered_ssk = true;
    if (g_close_timeout) {
      window.clearTimeout(g_close_timeout);
      g_close_timeout = null;
    }
    if (e.target.id == 'ssk_id_button_img') {
      if (!g_button_timeout) {
        g_button_timeout = window.setTimeout(function () {
          onAction(e);
        }, 600);
      }
    }
  } else {
    if (!g_close_timeout) {
      g_close_timeout = window.setTimeout(function () {
        var is_open = document.getElementById('ssk_id_popup') != null;
        var is_button = document.getElementById('ssk_id_button') != null;
        var is_translation_open =
          document.getElementById('ssk_id_translation_panel') != null;
        var is_converter_open =
          document.getElementById('ssk_id_converter_panel') != null;
        if ((is_open && g_entered_ssk) || is_button) {
          hidePopup();
        }
        if (is_translation_open && g_entered_ssk) {
          translator.hideTranslation();
        }
        if (is_converter_open && g_entered_ssk) {
          converter.hideConverter();
        }
      }, 1200);
    }
    if (g_button_timeout) {
      window.clearTimeout(g_button_timeout);
      g_button_timeout = null;
    }
  }
}

function onScroll(e) {
  if (g_prefs.prefHideOnScroll) {
    if (g_close_timeout) {
      window.clearTimeout(g_close_timeout);
      g_close_timeout = null;
    }
    hidePopup();
    translator.hideTranslation();
    converter.hideConverter();
  }
}

function onStopEvent(e) {
  if (e.preventDefault != undefined) {
    e.preventDefault();
  }
  if (e.stopPropagation != undefined) {
    e.stopPropagation();
  }
  if (e.stopImmediatePropagation != undefined) {
    e.stopImmediatePropagation();
  }
  return false;
}

function onKeyUp(e) {
  g_hold_key_code = null;
  if (isDisabled()) {
    return;
  }
  var is_open = document.getElementById('ssk_id_popup') != null;
  var is_button = document.getElementById('ssk_id_button') != null;
  var is_translation_open =
    document.getElementById('ssk_id_translation_panel') != null;
  var is_converter_open =
    document.getElementById('ssk_id_converter_panel') != null;
  // 27 == Escape; cannot use e.DOM_VK_ESCAPE cause chrome doesn't uderstand it
  if (e.keyCode == 27) {
    if (is_open || is_button) {
      hidePopup();
    } else {
      if (is_translation_open) {
        translator.hideTranslation();
      } else {
        if (is_converter_open) {
          converter.hideConverter();
        } else {
          try {
            var marker = new Mark(document.querySelector('body'));
            marker.unmark();
            g_mark_count = 0;
            g_mark_idx = 0;
            clearSelection();
            setAutoMark(g_prefs, '');
          } catch (ex) {
            cmn.log(ex.toString());
          }
        }
      }
    }
  }
  if (e.keyCode == 83 || e.keyCode == 87) {
    // S || W
    var all_marks = document.querySelectorAll('[data-markjs="true"]');
    if (all_marks && all_marks.length) {
      if (g_mark_cur == null) {
        g_mark_cur = 0;
      } else {
        all_marks[g_mark_cur].style.setProperty(
          'outline',
          'unset',
          'important'
        );
        if (e.keyCode == 83) {
          g_mark_cur = g_mark_cur < all_marks.length - 1 ? g_mark_cur + 1 : 0;
        } else {
          g_mark_cur = g_mark_cur == 0 ? all_marks.length - 1 : g_mark_cur - 1;
        }
      }
      all_marks[g_mark_cur].style.setProperty(
        'outline',
        '4px ridge #00ffff',
        'important'
      );
      all_marks[g_mark_cur].scrollIntoView({
        block: 'nearest',
        inline: 'nearest'
      });
    }
  }
  // press on any button within text box should close popup
  if (is_open && g_selection_text_box) {
    hidePopup();
  }
}

function onKeyDown(e) {
  // Ctrl+C copies url and page description to the clipboard if there is no selection
  if (e.ctrlKey && e.code == 'KeyC' && !isDisabled()) {
    if (
      e.target.selectionStart == e.target.selectionEnd
      && document.getSelection().toString() == ''
    ) {
      copyPlain(getPageDetails(g_prefs.prefCtrlCPattern));
      chrome.runtime.sendMessage({cmd: utils.CMD_BLINK});
    }
  }
  g_hold_key_code = e.code;
}

function onCopy(e) {
  if (g_copy_data) {
    if ('text' in g_copy_data) {
      e.clipboardData.setData('text/plain', g_copy_data['text']);
    }
    if ('html' in g_copy_data) {
      e.clipboardData.setData('text/html', g_copy_data['html']);
    }
    g_copy_data = null;
    return onStopEvent(e);
  }
}

function copyPlain(strings) {
  if (typeof strings === 'string' || strings instanceof String) {
    strings = [strings];
  }
  g_copy_data = {text: strings.join('\r\n')};
  document.execCommand('copy');
}

function copyURLs() {
  var html = '';
  for (var i = 0; i < g_selection_urls.length; i++) {
    html += '<a href="{0}">{0}</a><br/>'._format(g_selection_urls[i]);
  }
  g_copy_data = {text: g_selection_urls.join('\r\n'), html: html};
  document.execCommand('copy');
}

function notify(msg, sender, sendResponse) {
  onKeyUp({keyCode: 27}); // clean up everything by simulating esc keypress
  var e = {pageX: 0, pageY: 0, clientX: 0, clientY: 0};
  var txt = msg.txt.trim();
  switch (msg.cmd) {
    case utils.CMD_DEFAULT_TRANSLATE:
      if (window == window.top) {
        translator.defaultTranslate(e, txt);
      } // only show in main window, not in frames
      break;
    case utils.CMD_GOOGLE_TRANSLATE:
      if (window == window.top) {
        translator.googleTranslate(
          e,
          txt,
          'auto',
          g_prefs.prefTranslationDestLng
        );
      }
      break;
    case utils.CMD_WORDNIK_DICT:
      if (window == window.top) {
        translator.wordnikDict(e, txt);
      }
      break;
    case utils.CMD_URBAN_DICT:
      if (window == window.top) {
        translator.urbanDict(e, txt);
      }
      break;
    case utils.CMD_YANDEX_TRANSLATE:
      if (window == window.top) {
        translator.yandexTranslate(
          e,
          txt,
          'auto',
          g_prefs.prefTranslationDestLng
        );
      }
      break;
    case utils.CMD_MS_TRANSLATOR:
      if (window == window.top) {
        translator.msTranslator(e, txt, 'auto', g_prefs.prefTranslationDestLng);
      }
      break;
    case utils.CMD_HIGHLIGHT:
      mark(txt, false);
      break;
    case utils.CMD_CONVERT:
      if (window == window.top) {
        converter.convert(e, txt);
      }
      break;
  }
}

function prefChange(changes, area) {
  chrome.storage.local.get(null, function (prefs) {
    g_prefs = prefs;
  });
}

function getMsg(cmd) {
  var isTrackingNumber =
    utils.isUPSTrackingNumber(g_selection)
    || utils.isUSPSTrackingNumber(g_selection)
    || utils.isFedexTrackingNumber(g_selection);
  var showTxtControls = g_prefs.prefShowCopy && g_selection_text_box != null;
  return {
    cmd: cmd,
    urls: g_selection_urls,
    email: g_selection_email,
    mnIcnsClr: g_prefs.prefMenuIconsColor,
    pnIcnsClr: g_prefs.prefPanelIconsColor,
    showCopy: g_prefs.prefShowCopy,
    showPaste: showTxtControls,
    showCut: showTxtControls,
    showDelete: showTxtControls,
    showCopyPlain:
      g_prefs.prefShowCopyPlain
      && g_selection_text_box == null
      && !isGoogleDocs(),
    showCopyHtml:
      g_prefs.prefShowCopyHtml
      && g_selection_html != ''
      && g_selection_text_box == null,
    showGoogleTranslate: g_prefs.prefShowGoogleTranslate,
    showWordnikDictionary: g_prefs.prefShowWordnikDictionary,
    showUrbanDictionary: g_prefs.prefShowUrbanDictionary,
    showYandexTranslate: g_prefs.prefShowYandexTranslate,
    showMsTranslator: g_prefs.prefShowMsTranslator,
    showOpenUrl: g_prefs.prefShowOpenUrl,
    showHighlight: g_prefs.prefShowHighlight,
    showConvert:
      g_prefs.prefShowConvert
      && !isTrackingNumber
      && ((utils.hasDigit(g_selection)
        && (const_cur.hasSymbol(g_selection)
          || const_temp.hasSymbol(g_selection)
          || const_mass.hasSymbol(g_selection)
          || const_len.hasSymbol(g_selection)))
        || utils.isNumber(g_selection)),
    showUPS:
      g_prefs.prefShowTrackingNumbers && utils.isUPSTrackingNumber(g_selection),
    showUSPS:
      g_prefs.prefShowTrackingNumbers
      && utils.isUSPSTrackingNumber(g_selection),
    showFedex:
      g_prefs.prefShowTrackingNumbers
      && utils.isFedexTrackingNumber(g_selection),
    showMailto: g_prefs.prefShowMailto,
    showSearch: g_prefs.prefShowSearch,
    showBookmarks: g_prefs.prefShowBookmarks,
    prefs: g_prefs
  };
}

function onImgError(isPopup) {
  var imgs = document.getElementsByClassName(
    isPopup ? 'ssk-button-img' : 'ssk-panel-img'
  );
  for (var img of imgs) {
    if (
      img.src.endsWith('url_blocked.svg')
      || img.height == 0 /* workaround for Content Security Policy */
    ) {
      img.src = cmn.getTxtLetterIcon(
        isPopup ? img.nextSibling.textContent : img.title
      );
    }
  }
}

function showPopupButton(e) {
  g_entered_ssk = false;
  var url_button = cmn.getIconURL('SelectionSK_24.png');
  var button_str =
    " \
	<span id='ssk_id_button' class='ssk-popup-button'> \
		<img id='"
    + utils.ID_POPUP_BUTTON
    + "' class='ssk-popup-button-img' src='"
    + url_button
    + "'/> \
	</span>";
  utils.insertHtml(button_str);
  var [x, y, x_client, y_client] = utils.getAdjustedXY(e);
  x = x + 35 < window.innerWidth ? x + 10 : x - 35;
  var button = document.getElementById('ssk_id_button');
  button.style.setProperty('left', x + 'px', 'important');
  button.style.setProperty('top', y + 'px', 'important');
}

function showPopup(e) {
  g_entered_ssk = false;
  if (g_close_timeout) {
    window.clearTimeout(g_close_timeout);
    g_close_timeout = null;
  }
  hidePopup();
  translator.hideTranslation();
  converter.hideConverter();
  if (g_prefs.prefHideOnMoveMouseAway) {
    window.addEventListener('mousemove', onMouseMove);
  }
  // right click handled by extension, so disable standard context menu if extension is up
  window.setTimeout(function () {
    window.addEventListener('contextmenu', onStopEvent, true);
  }, utils.MOUSE_BUTTON_CLICK_DELAY_MS);
  g_prefs.prefShowAsMenu ? showPopupMenu(e) : showPopupPanel(e);
}

function stylePopupMenu() {
  if (g_zoom != 1) {
    var menu = document.getElementById('ssk_id_popup');
    var zoom = 1 / g_zoom;
    menu.style.setProperty(
      'transform',
      'scale({0})'._format(zoom._round(2)),
      'important'
    );
  }
  cmn.setStyleProp('ssk-menu', {
    'margin': '0',
    'overflow': 'visible',
    'background-color': g_prefs.prefMenuBkColor,
    'color': g_prefs.prefMenuFontColor
  });
  var size = parseInt(g_prefs.prefMenuFontSize, 10);
  cmn.setStyleProp('ssk-menu-item', {
    'font-size': size + 'px',
    'color': g_prefs.prefMenuFontColor,
    'font-family': 'Roboto,sans-serif'
  });
  cmn.setStyleProp('ssk-menu-btn', {
    'border': '1px solid transparent',
    'opacity': '1',
    'background-color': g_prefs.prefMenuBkColor,
    'font-size': size + 'px',
    'min-height;max-height': size + 9 + 'px',
    'color': g_prefs.prefMenuFontColor,
    'text-transform': 'none',
    'padding': '1px 6px',
    'font-family': 'Roboto,sans-serif'
  });
  cmn.setStyleProp('ssk-menu-text', {
    'font-size': size + 'px',
    'margin-left': size + 1 + 'px',
    'text-transform': 'none',
    'font-family': 'Roboto,sans-serif'
  });
  cmn.setStyleProp('ssk-button-img', {
    'min-width;max-width;min-height;max-height': size + 1 + 'px'
  });
}

function showPopupMenu(e) {
  chrome.runtime.sendMessage(getMsg(utils.CMD_GET_MENU), function (response) {
    var menu_str = response.menu;
    g_zoom = response.zoom;
    utils.insertHtml(menu_str);
    stylePopupMenu();
    var menu = document.getElementById('ssk_id_popup');
    var [x, y, x_client, y_client] = utils.getAdjustedXY(e),
      pos = '';
    var [client_w, client_h, offset_w, offset_h] = utils.getAdjustedSize(
      menu,
      g_zoom
    );
    ((x -= offset_w), (y -= offset_h));
    if (x_client + client_w + 25 > window.innerWidth) {
      x = Math.max(x - menu.clientWidth, 0);
      y += 3; // by moving it a bit we allow to work with triple click in Chrome
    } else if (x_client + 2 * client_w + 25 > window.innerWidth) {
      x += 2 * offset_w;
      pos += '-left';
      y += 3; // by moving it a bit we allow to work with triple click in Chrome
    } else {
      x += 3; // by moving it a bit we allow to work with triple click in Chrome
    }
    if (y_client + client_h + 25 > window.innerHeight) {
      y = Math.max(y - client_h, 0);
      pos += '-top';
    }
    if (pos) {
      menu.parentNode.removeChild(menu);
      menu_str = menu_str.replace(
        /ssk-submenu-pos-normal/gi,
        'ssk-submenu-pos' + pos
      );
      utils.insertHtml(menu_str);
      stylePopupMenu();
      menu = document.getElementById('ssk_id_popup');
    }
    menu.style.setProperty('left', x + 'px', 'important');
    menu.style.setProperty('top', y + 'px', 'important');
    window.setTimeout(function () {
      onImgError(true);
    }, 1000);
  });
}

function stylePopupPanel() {
  if (g_zoom != 1) {
    var panel = document.getElementById('ssk_id_popup');
    var zoom = 1 / g_zoom;
    panel.style.setProperty(
      'transform',
      'scale({0})'._format(zoom._round(2)),
      'important'
    );
  }
  cmn.setStyleProp('ssk-panel', {
    'background-color': g_prefs.prefPanelBkColor,
    'padding': g_prefs.prefPanelPadding + 'px',
    'border-radius': g_prefs.prefPanelRoundness + 'px'
  });
  cmn.setStyleProp('ssk-panel-img', {
    'min-width;max-width;min-height;max-height':
      g_prefs.prefPanelIconSize + 'px',
    'padding': g_prefs.prefPanelIconPadding + 'px'
  });
  cmn.setStyleProp('ssk-panel-separator', {
    'min-height;max-height':
      1 * g_prefs.prefPanelIconSize + 2 * g_prefs.prefPanelIconPadding + 'px'
  });
  cmn.setStyleProp('ssk-panel-separator-placeholder', {
    'min-height;max-height':
      1 * g_prefs.prefPanelIconSize + 2 * g_prefs.prefPanelIconPadding + 'px'
  });
}

function showPopupPanel(e) {
  chrome.runtime.sendMessage(getMsg(utils.CMD_GET_PANEL), function (response) {
    utils.insertHtml(response.panel);
    g_zoom = response.zoom;
    stylePopupPanel();
    var panel = document.getElementById('ssk_id_popup');
    var [x, y, x_client, y_client] = utils.getAdjustedXY(e);
    var [client_w, client_h, offset_w, offset_h] = utils.getAdjustedSize(
      panel,
      g_zoom
    );
    x = x - client_w / 2;
    x = Math.min(x, window.innerWidth - client_w - 30);
    x = Math.max(x, 0);
    x = x - offset_w;
    if (y_client - client_h - 20 < 0) {
      y += 15;
    } else {
      y = y - client_h - 20;
    }
    panel.style.setProperty('left', x + 'px', 'important');
    panel.style.setProperty('top', y + 'px', 'important');
    window.setTimeout(function () {
      onImgError(false);
    }, 1000);
  });
}

function hidePopup() {
  window.removeEventListener('mousemove', onMouseMove);
  window.setTimeout(function () {
    window.removeEventListener('contextmenu', onStopEvent, true);
  }, utils.MOUSE_BUTTON_CLICK_DELAY_MS);
  var popup = document.getElementById('ssk_id_popup');
  if (popup) {
    popup.parentNode.removeChild(popup);
  }
  var button = document.getElementById('ssk_id_button');
  if (button) {
    button.parentNode.removeChild(button);
  }
}

function mark(txt, wholeWords = false, caseSensitive = false) {
  try {
    var idx = (g_mark_idx % 10).toString();
    var cls = 'ssk-color-' + idx;
    var marker = new Mark(document.querySelector('body'));
    var options = {
      className: cls,
      separateWordSearch: false,
      accuracy: wholeWords ? 'exactly' : 'partially',
      caseSensitive: caseSensitive,
      // 'iframes': true,
      // 'acrossElements': true,
      done: function (c) {
        window.setTimeout(function () {
          g_mark_count += c;
          setBadgeText();
        }, utils.MOUSE_BUTTON_CLICK_DELAY_MS);
      }
    };
    var all_marks = document.querySelectorAll('[data-markjs="true"]');
    if (all_marks && all_marks.length && g_mark_cur) {
      all_marks[g_mark_cur].style.setProperty('outline', 'unset', 'important');
    }
    if (g_prefs.prefIgnorePunctuation) {
      txt = txt.replace(/:|;|\.|,|-|\?|_|\(|\)|\{|\}|\[|\]|!|'|"|\+|=/gi, '');
    }
    marker.mark(txt, options);
    g_mark_cur = null;
    var elems = document.getElementsByClassName(cls);
    for (var elem of elems) {
      elem.style.setProperty(
        'background',
        g_prefs['prefBkColor_' + idx],
        'important'
      );
      elem.style.setProperty(
        'color',
        g_prefs['prefTxColor_' + idx],
        'important'
      );
    }
    g_mark_idx += 1;
  } catch (ex) {
    cmn.log(ex.toString());
  }
}

function setAutoMark(prefs, txt) {
  prefs.prefAutoMark = txt;
  chrome.storage.local.set(prefs);
}

function autoMark() {
  // g_prefs can not be used here because they maybe not loaded yet due to async call
  chrome.storage.local.get(null, function (prefs) {
    if (isDisabledEx(prefs)) {
      return;
    }
    if (prefs.prefAutoMark) {
      mark(prefs.prefAutoMark);
      setAutoMark(prefs, '');
    }
  });
}

function setBadgeText() {
  try {
    if (g_selection) {
      chrome.runtime.sendMessage({
        cmd: utils.CMD_SET_BADGE_TEXT,
        txt: g_selection.split(' ').length.toString(),
        color: '#3399FF'
      });
    } else if (g_mark_count) {
      chrome.runtime.sendMessage({
        cmd: utils.CMD_SET_BADGE_TEXT,
        txt: g_mark_count.toString(),
        color: '#C100C1'
      });
    } else {
      chrome.runtime.sendMessage({
        cmd: utils.CMD_SET_BADGE_TEXT,
        txt: '',
        color: '#000000'
      });
    }
  } catch (ex) {
    cmn.log(ex.toString());
  }
}

function clearSelectionVars() {
  g_selection = '';
  g_selection_html = '';
  g_selection_obj = null;
  g_selection_text_box = null;
  g_selection_email = '';
  g_selection_urls = [];
  g_event = null;
  if (g_close_timeout) {
    window.clearTimeout(g_close_timeout);
    g_close_timeout = null;
  }
  if (g_button_timeout) {
    window.clearTimeout(g_button_timeout);
    g_button_timeout = null;
  }
}

function clearSelection(clear_all = true) {
  if (clear_all) {
    if (g_selection_obj) {
      g_selection_obj.removeAllRanges();
    }
    if (g_selection_text_box) {
      g_selection_text_box.selectionStart = g_selection_text_box.selectionEnd;
    }
  }
  clearSelectionVars();
  setBadgeText();
}

function addMycroftIntegration() {
  // g_prefs can not be used here because they maybe not loaded yet due to async call
  chrome.storage.local.get(null, function (prefs) {
    if (isDisabledEx(prefs)) {
      return;
    }
    opensearch.addMycroftIntegration(
      'SelectionSK_32.png',
      'SelectionSK',
      'https://addons.mozilla.org/en-US/firefox/addon/selectionsk/',
      'https://chrome.google.com/webstore/detail/selectionsk/npohodmlkdednnlbhfegpnhohpgckocf'
    );
  });
}

function enableTextSelection() {
  function enable() {
    return true;
  }
  // g_prefs can not be used here because they maybe not loaded yet due to async call
  chrome.storage.local.get(null, function (prefs) {
    if (isDisabledEx(prefs)) {
      return;
    }
    if (prefs.prefEnableSelection) {
      var elems = document.querySelectorAll('*');
      for (let elem of elems) {
        if (
          ['none', 'all'].indexOf(
            window.getComputedStyle(elem).userSelect.toLowerCase()
          ) > -1
        ) {
          elem.style.setProperty('user-select', 'auto', 'important');
        }
        if (elem.onselectstart) {
          elem.onselectstart = enable;
        }
        if (elem.oncopy) {
          elem.oncopy = enable;
        }
        if (elem.onmousedown) {
          elem.onmousedown = enable;
        }
      }
      if (document.onselectstart) {
        document.onselectstart = enable;
      }
      if (document.oncopy) {
        document.oncopy = enable;
      }
      if (document.onmousedown) {
        document.onmousedown = enable;
      }
    }
  });
}
