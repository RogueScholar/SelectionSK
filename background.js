/**
 * SPDX-FileCopyrightText: © 2011–2023, Andrey Shemetov <ashemetov@gmail.com>
 * SPDX-FileCopyrightText: © 2026, Peter J. Mello <admin@petermello.net>
 *
 * SPDX-License-Identifier: MPL-2.0 OR GPL-3.0-or-later OR LGPL-3.0-or-later
 */
'use strict';

// Initialization
var g_bookmark_folder = null;
var g_search_engines = [];
var g_zooms = {};
var g_icons = {};

function getDefaultPrefs(prefs) {
  // default preferences, javascript style
  // internal
  prefs.prefBlacklist =
    prefs.prefBlacklist != undefined ? prefs.prefBlacklist : [];
  prefs.prefAutoMark =
    prefs.prefAutoMark != undefined ? prefs.prefAutoMark : '';
  prefs.prefTkk = prefs.prefTkk != undefined ? prefs.prefTkk : '';
  prefs.ffVersion = prefs.ffVersion != undefined ? prefs.ffVersion : 0;
  // general
  prefs.prefBookmarkFolder =
    prefs.prefBookmarkFolder != undefined ?
      prefs.prefBookmarkFolder
    : 'SelectionSK';
  prefs.prefShowPopupOnly =
    prefs.prefShowPopupOnly != undefined ? prefs.prefShowPopupOnly : false;
  prefs.prefShowContextOnly =
    prefs.prefShowContextOnly != undefined ? prefs.prefShowContextOnly : false;
  prefs.prefShowPopupContext =
    prefs.prefShowPopupContext != undefined ? prefs.prefShowPopupContext : true;
  prefs.prefAutoCopy =
    prefs.prefAutoCopy != undefined ? prefs.prefAutoCopy : true;
  prefs.prefAutoCopyPlain =
    prefs.prefAutoCopyPlain != undefined ? prefs.prefAutoCopyPlain : false;
  prefs.prefAllowACInTextBox =
    prefs.prefAllowACInTextBox != undefined ?
      prefs.prefAllowACInTextBox
    : false;
  prefs.prefBlinkOnCopy =
    prefs.prefBlinkOnCopy != undefined ? prefs.prefBlinkOnCopy : true;
  prefs.prefCountWords =
    prefs.prefCountWords != undefined ? prefs.prefCountWords : true;
  prefs.prefCtrlC = prefs.prefCtrlC != undefined ? prefs.prefCtrlC : true;
  prefs.prefCtrlCPattern =
    prefs.prefCtrlCPattern != undefined ?
      prefs.prefCtrlCPattern
    : '{title} ({URL})';
  prefs.prefOpenInNewTab =
    prefs.prefOpenInNewTab != undefined ? prefs.prefOpenInNewTab : true;
  prefs.prefOpenInBgTab =
    prefs.prefOpenInBgTab != undefined ? prefs.prefOpenInBgTab : false;
  prefs.prefOpenInCurrTab =
    prefs.prefOpenInCurrTab != undefined ? prefs.prefOpenInCurrTab : false;
  prefs.prefReuseContainer =
    prefs.prefReuseContainer != undefined ? prefs.prefReuseContainer : false;
  prefs.prefFavDuck = prefs.prefFavDuck != undefined ? prefs.prefFavDuck : true;
  prefs.prefFavGoogle =
    prefs.prefFavGoogle != undefined ? prefs.prefFavGoogle : false;
  prefs.prefEnableSelection =
    prefs.prefEnableSelection != undefined ? prefs.prefEnableSelection : true;
  // popup
  prefs.prefShowAsMenu =
    prefs.prefShowAsMenu != undefined ? prefs.prefShowAsMenu : true;
  prefs.prefShowAsPanel =
    prefs.prefShowAsPanel != undefined ? prefs.prefShowAsPanel : false;
  prefs.prefShowAsTranslation =
    prefs.prefShowAsTranslation != undefined ?
      prefs.prefShowAsTranslation
    : false;
  prefs.prefUnobtrusive =
    prefs.prefUnobtrusive != undefined ? prefs.prefUnobtrusive : false;
  prefs.prefShowCopy =
    prefs.prefShowCopy != undefined ? prefs.prefShowCopy : true;
  prefs.prefShowCopyPlain =
    prefs.prefShowCopyPlain != undefined ? prefs.prefShowCopyPlain : true;
  prefs.prefShowCopyHtml =
    prefs.prefShowCopyHtml != undefined ? prefs.prefShowCopyHtml : false;
  prefs.prefShowGoogleTranslate =
    prefs.prefShowGoogleTranslate != undefined ?
      prefs.prefShowGoogleTranslate
    : true;
  prefs.prefShowWordnikDictionary =
    prefs.prefShowWordnikDictionary != undefined ?
      prefs.prefShowWordnikDictionary
    : true;
  prefs.prefShowUrbanDictionary =
    prefs.prefShowUrbanDictionary != undefined ?
      prefs.prefShowUrbanDictionary
    : true;
  prefs.prefShowYandexTranslate =
    prefs.prefShowYandexTranslate != undefined ?
      prefs.prefShowYandexTranslate
    : false;
  prefs.prefShowMsTranslator =
    prefs.prefShowMsTranslator != undefined ? prefs.prefShowMsTranslator : true;
  prefs.prefShowOpenUrl =
    prefs.prefShowOpenUrl != undefined ? prefs.prefShowOpenUrl : true;
  prefs.prefShowHighlight =
    prefs.prefShowHighlight != undefined ? prefs.prefShowHighlight : true;
  prefs.prefShowConvert =
    prefs.prefShowConvert != undefined ? prefs.prefShowConvert : true;
  prefs.prefShowTrackingNumbers =
    prefs.prefShowTrackingNumbers != undefined ?
      prefs.prefShowTrackingNumbers
    : true;
  prefs.prefShowMailto =
    prefs.prefShowMailto != undefined ? prefs.prefShowMailto : true;
  prefs.prefShowSearch =
    prefs.prefShowSearch != undefined ? prefs.prefShowSearch : false;
  prefs.prefShowBookmarks =
    prefs.prefShowBookmarks != undefined ? prefs.prefShowBookmarks : true;
  prefs.prefAllowInTextBox =
    prefs.prefAllowInTextBox != undefined ? prefs.prefAllowInTextBox : true;
  prefs.prefHideOnScroll =
    prefs.prefHideOnScroll != undefined ? prefs.prefHideOnScroll : true;
  prefs.prefHideOnMoveMouseAway =
    prefs.prefHideOnMoveMouseAway != undefined ?
      prefs.prefHideOnMoveMouseAway
    : true;
  prefs.prefKeepSelection =
    prefs.prefKeepSelection != undefined ? prefs.prefKeepSelection : false;
  prefs.prefKeepPopup =
    prefs.prefKeepPopup != undefined ? prefs.prefKeepPopup : false;
  // translation
  prefs.prefTranslationDestLng =
    prefs.prefTranslationDestLng != undefined ?
      prefs.prefTranslationDestLng
    : 'en';
  prefs.prefTranslationSelectedLng =
    prefs.prefTranslationSelectedLng != undefined ?
      prefs.prefTranslationSelectedLng
    : ['all'];
  prefs.prefDefaultTranslator =
    prefs.prefDefaultTranslator != undefined ?
      prefs.prefDefaultTranslator
    : utils.CMD_GOOGLE_TRANSLATE;
  prefs.prefTranscriptionOwnLine =
    prefs.prefTranscriptionOwnLine != undefined ?
      prefs.prefTranscriptionOwnLine
    : false;
  prefs.prefShortcutPageTranslate =
    prefs.prefShortcutPageTranslate != undefined ?
      prefs.prefShortcutPageTranslate
    : 'Ctrl+Shift+0';
  prefs.prefInstantTranslationKey =
    prefs.prefInstantTranslationKey != undefined ?
      prefs.prefInstantTranslationKey
    : 'ControlLeftControlRight';
  // highligher
  prefs.prefAutoSelectColors =
    prefs.prefAutoSelectColors != undefined ? prefs.prefAutoSelectColors : true;
  prefs.prefIgnorePunctuation =
    prefs.prefIgnorePunctuation != undefined ?
      prefs.prefIgnorePunctuation
    : false;
  prefs.prefAutoHighlight =
    prefs.prefAutoHighlight != undefined ? prefs.prefAutoHighlight : false;
  prefs.prefInstantHighlightKey =
    prefs.prefInstantHighlightKey != undefined ?
      prefs.prefInstantHighlightKey
    : 'ShiftLeftShiftRight';
  // highligher's colors
  prefs.prefBkColor_0 =
    prefs.prefBkColor_0 != undefined ? prefs.prefBkColor_0 : '#C100C1';
  prefs.prefTxColor_0 =
    prefs.prefTxColor_0 != undefined ? prefs.prefTxColor_0 : '#FFFFFF';
  prefs.prefBkColor_1 =
    prefs.prefBkColor_1 != undefined ? prefs.prefBkColor_1 : '#FFA500';
  prefs.prefTxColor_1 =
    prefs.prefTxColor_1 != undefined ? prefs.prefTxColor_1 : '#000000';
  prefs.prefBkColor_2 =
    prefs.prefBkColor_2 != undefined ? prefs.prefBkColor_2 : '#0000FF';
  prefs.prefTxColor_2 =
    prefs.prefTxColor_2 != undefined ? prefs.prefTxColor_2 : '#FFFFFF';
  prefs.prefBkColor_3 =
    prefs.prefBkColor_3 != undefined ? prefs.prefBkColor_3 : '#FFFF00';
  prefs.prefTxColor_3 =
    prefs.prefTxColor_3 != undefined ? prefs.prefTxColor_3 : '#000000';
  prefs.prefBkColor_4 =
    prefs.prefBkColor_4 != undefined ? prefs.prefBkColor_4 : '#B22222';
  prefs.prefTxColor_4 =
    prefs.prefTxColor_4 != undefined ? prefs.prefTxColor_4 : '#FFFFFF';
  prefs.prefBkColor_5 =
    prefs.prefBkColor_5 != undefined ? prefs.prefBkColor_5 : '#00FF40';
  prefs.prefTxColor_5 =
    prefs.prefTxColor_5 != undefined ? prefs.prefTxColor_5 : '#000000';
  prefs.prefBkColor_6 =
    prefs.prefBkColor_6 != undefined ? prefs.prefBkColor_6 : '#0080C0';
  prefs.prefTxColor_6 =
    prefs.prefTxColor_6 != undefined ? prefs.prefTxColor_6 : '#FFFFFF';
  prefs.prefBkColor_7 =
    prefs.prefBkColor_7 != undefined ? prefs.prefBkColor_7 : '#FF8080';
  prefs.prefTxColor_7 =
    prefs.prefTxColor_7 != undefined ? prefs.prefTxColor_7 : '#000000';
  prefs.prefBkColor_8 =
    prefs.prefBkColor_8 != undefined ? prefs.prefBkColor_8 : '#4B0082';
  prefs.prefTxColor_8 =
    prefs.prefTxColor_8 != undefined ? prefs.prefTxColor_8 : '#FFFFFF';
  prefs.prefBkColor_9 =
    prefs.prefBkColor_9 != undefined ? prefs.prefBkColor_9 : '#80FFFF';
  prefs.prefTxColor_9 =
    prefs.prefTxColor_9 != undefined ? prefs.prefTxColor_9 : '#000000';
  // conversion
  prefs.prefConversionDestCur =
    prefs.prefConversionDestCur != undefined ?
      prefs.prefConversionDestCur
    : 'USD';
  prefs.prefConversionDestTemp =
    prefs.prefConversionDestTemp != undefined ?
      prefs.prefConversionDestTemp
    : 'F';
  prefs.prefConversionDestMass =
    prefs.prefConversionDestMass != undefined ?
      prefs.prefConversionDestMass
    : 'P_1';
  prefs.prefConversionDestLen =
    prefs.prefConversionDestLen != undefined ?
      prefs.prefConversionDestLen
    : 'F_1';
  prefs.prefShortcutShowConverter =
    prefs.prefShortcutShowConverter != undefined ?
      prefs.prefShortcutShowConverter
    : 'Ctrl+Shift+1';
  prefs.prefInstantConversionKey =
    prefs.prefInstantConversionKey != undefined ?
      prefs.prefInstantConversionKey
    : 'AltLeftAltRight';
  // appearance - menu
  prefs.prefMenuFontSize =
    prefs.prefMenuFontSize != undefined ? prefs.prefMenuFontSize : 15;
  prefs.prefMenuFontColor =
    prefs.prefMenuFontColor != undefined ?
      prefs.prefMenuFontColor
    : '#0D0D0D';
  prefs.prefMenuIconsColor =
    prefs.prefMenuIconsColor != undefined ?
      prefs.prefMenuIconsColor
    : 'rgb(0, 0, 0)';
  prefs.prefMenuBkColor =
    prefs.prefMenuBkColor != undefined ? prefs.prefMenuBkColor : '#F0F0F0';
  // appearance - panel
  prefs.prefPanelItemsN =
    prefs.prefPanelItemsN != undefined ? prefs.prefPanelItemsN : 0;
  prefs.prefPanelItemsNRows =
    prefs.prefPanelItemsNRows != undefined ? prefs.prefPanelItemsNRows : true;
  prefs.prefPanelItemsNCols =
    prefs.prefPanelItemsNCols != undefined ? prefs.prefPanelItemsNCols : false;
  prefs.prefPanelBkColor =
    prefs.prefPanelBkColor != undefined ? prefs.prefPanelBkColor : '#F0F0F0';
  prefs.prefPanelIconsColor =
    prefs.prefPanelIconsColor != undefined ?
      prefs.prefPanelIconsColor
    : 'rgb(0, 0, 0)';
  prefs.prefPanelPadding =
    prefs.prefPanelPadding != undefined ? prefs.prefPanelPadding : 1;
  prefs.prefPanelRoundness =
    prefs.prefPanelRoundness != undefined ? prefs.prefPanelRoundness : 2;
  prefs.prefPanelIconSize =
    prefs.prefPanelIconSize != undefined ? prefs.prefPanelIconSize : 18;
  prefs.prefPanelIconPadding =
    prefs.prefPanelIconPadding != undefined ? prefs.prefPanelIconPadding : 2;
  // appearance - translation
  prefs.prefTranslationFontSize =
    prefs.prefTranslationFontSize != undefined ?
      prefs.prefTranslationFontSize
    : 14;
  prefs.prefTranslationFontColor =
    prefs.prefTranslationFontColor != undefined ?
      prefs.prefTranslationFontColor
    : '#000000';
  prefs.prefTransIconsColor =
    prefs.prefTransIconsColor != undefined ?
      prefs.prefTransIconsColor
    : 'rgb(0, 0, 0)';
  prefs.prefTranslationBkColor =
    prefs.prefTranslationBkColor != undefined ?
      prefs.prefTranslationBkColor
    : '#fffef2';
  prefs.prefTranslationBorderColor =
    prefs.prefTranslationBorderColor != undefined ?
      prefs.prefTranslationBorderColor
    : '#2e5186';
  prefs.prefTranslationLngColor =
    prefs.prefTranslationLngColor != undefined ?
      prefs.prefTranslationLngColor
    : '#993333';
  prefs.prefTranslationEngineColor =
    prefs.prefTranslationEngineColor != undefined ?
      prefs.prefTranslationEngineColor
    : '#2e5186';
  // appearance - conversion
  prefs.prefConversionFontSize =
    prefs.prefConversionFontSize != undefined ?
      prefs.prefConversionFontSize
    : 14;
  prefs.prefConversionFontColor =
    prefs.prefConversionFontColor != undefined ?
      prefs.prefConversionFontColor
    : '#000000';
  prefs.prefConversionIconsColor =
    prefs.prefConversionIconsColor != undefined ?
      prefs.prefConversionIconsColor
    : 'rgb(0, 0, 0)';
  prefs.prefConversionBkColor =
    prefs.prefConversionBkColor != undefined ?
      prefs.prefConversionBkColor
    : '#fffef2';
  prefs.prefConversionBorderColor =
    prefs.prefConversionBorderColor != undefined ?
      prefs.prefConversionBorderColor
    : '#5d6d79';
  prefs.prefConversionConverterColor =
    prefs.prefConversionConverterColor != undefined ?
      prefs.prefConversionConverterColor
    : '#2e5186';
  prefs.prefConversionUnitColor =
    prefs.prefConversionUnitColor != undefined ?
      prefs.prefConversionUnitColor
    : '#993333';

  return prefs;
}

function createDefaultSskBookmarks(root) {
  var ssk = 'SSK: {0}',
    http = 'https://{0}/';
  chrome.bookmarks.create(
    cmn.isFirefox() ?
      {parentId: root.id, index: 0, type: 'separator'}
    : {
        title: ssk._format('Separator'),
        parentId: root.id,
        index: 0,
        url: http._format(utils.ID_SEPARATOR)
      }
  );
  if (cmn.isFirefox()) {
    chrome.bookmarks.create({
      title: ssk._format(chrome.i18n.getMessage('txtInitSearch')),
      parentId: root.id,
      index: 0,
      url: http._format(utils.ID_SEARCH)
    }); // placeholder for Firefox search engines
  }
  chrome.bookmarks.create({
    title: ssk._format(chrome.i18n.getMessage('txtMailto')),
    parentId: root.id,
    index: 0,
    url: http._format(utils.ID_MAILTO)
  });
  chrome.bookmarks.create({
    title: ssk._format(chrome.i18n.getMessage('txtFedex')),
    parentId: root.id,
    index: 0,
    url: http._format(utils.ID_Fedex)
  });
  chrome.bookmarks.create({
    title: ssk._format(chrome.i18n.getMessage('txtUSPS')),
    parentId: root.id,
    index: 0,
    url: http._format(utils.ID_USPS)
  });
  chrome.bookmarks.create({
    title: ssk._format(chrome.i18n.getMessage('txtUPS')),
    parentId: root.id,
    index: 0,
    url: http._format(utils.ID_UPS)
  });
  chrome.bookmarks.create({
    title: ssk._format(chrome.i18n.getMessage('txtConvert')),
    parentId: root.id,
    index: 0,
    url: http._format(utils.ID_CONVERT)
  });
  chrome.bookmarks.create({
    title: ssk._format(chrome.i18n.getMessage('txtHighlight')),
    parentId: root.id,
    index: 0,
    url: http._format(utils.ID_HIGHLIGHT)
  }); // placeholder for highlight colors
  chrome.bookmarks.create({
    title: ssk._format(chrome.i18n.getMessage('txtOpenUrl')),
    parentId: root.id,
    index: 0,
    url: http._format(utils.ID_OPEN_URL)
  }); // placeholder for detected urls
  chrome.bookmarks.create(
    {
      title: chrome.i18n.getMessage('txtLngTools'),
      parentId: root.id,
      index: 0
    },
    function (lng_tools) {
      chrome.bookmarks.create({
        title: ssk._format(chrome.i18n.getMessage('txtMsTranslator')),
        parentId: lng_tools.id,
        index: 0,
        url: http._format(utils.ID_MS_TRANSLATOR)
      });
      chrome.bookmarks.create({
        title: ssk._format(chrome.i18n.getMessage('txtYandexTranslate')),
        parentId: lng_tools.id,
        index: 0,
        url: http._format(utils.ID_YANDEX_TRANSLATE)
      });
      chrome.bookmarks.create({
        title: ssk._format(chrome.i18n.getMessage('txtUrbanDictionary')),
        parentId: lng_tools.id,
        index: 0,
        url: http._format(utils.ID_URBAN_DICT)
      });
      chrome.bookmarks.create({
        title: ssk._format(chrome.i18n.getMessage('txtWordnikDictionary')),
        parentId: lng_tools.id,
        index: 0,
        url: http._format(utils.ID_WORDNIK_DICT)
      });
      chrome.bookmarks.create({
        title: ssk._format(chrome.i18n.getMessage('txtGoogleTranslate')),
        parentId: lng_tools.id,
        index: 0,
        url: http._format(utils.ID_GOOGLE_TRANSLATE)
      });
    }
  );
  chrome.bookmarks.create({
    title: ssk._format(chrome.i18n.getMessage('txtCopyHtml')),
    parentId: root.id,
    index: 0,
    url: http._format(utils.ID_COPY_HTML)
  });
  chrome.bookmarks.create({
    title: ssk._format(chrome.i18n.getMessage('txtCopyPlain')),
    parentId: root.id,
    index: 0,
    url: http._format(utils.ID_COPY_PLAIN)
  });
  chrome.bookmarks.create({
    title: ssk._format(chrome.i18n.getMessage('txtDelete')),
    parentId: root.id,
    index: 0,
    url: http._format(utils.ID_DELETE)
  });
  chrome.bookmarks.create({
    title: ssk._format(chrome.i18n.getMessage('txtCut')),
    parentId: root.id,
    index: 0,
    url: http._format(utils.ID_CUT)
  });
  chrome.bookmarks.create({
    title: ssk._format(chrome.i18n.getMessage('txtPaste')),
    parentId: root.id,
    index: 0,
    url: http._format(utils.ID_PASTE)
  });
  chrome.bookmarks.create({
    title: ssk._format(chrome.i18n.getMessage('txtCopy')),
    parentId: root.id,
    index: 0,
    url: http._format(utils.ID_COPY)
  });
}

function createDefaultBookmarks(folder, keep) {
  // (re)create folder and populate it with default bookmarks
  chrome.bookmarks.search({title: folder}, function (bookmarks) {
    if (!keep) {
      try {
        for (var i in bookmarks) {
          chrome.bookmarks.removeTree(bookmarks[i].id);
        }
      } catch (ex) {
        cmn.log(ex.toString());
      }
    }
    if (!bookmarks.length || !keep) {
      // reverse order cause index=0 places it on top
      chrome.bookmarks.create({title: folder, index: 0}, function (root) {
        chrome.bookmarks.create(
          {
            title: chrome.i18n.getMessage('txtInitDictionary'),
            parentId: root.id,
            index: 0
          },
          function (dictionary) {
            chrome.bookmarks.create({
              title: 'OneLook',
              parentId: dictionary.id,
              index: 0,
              url: 'https://onelook.com/?w=%s'
            });
            chrome.bookmarks.create({
              title: 'Dictionary.com',
              parentId: dictionary.id,
              index: 0,
              url: 'http://www.dictionary.com/browse/%s'
            });
            chrome.bookmarks.create({
              title: 'The Free Dictionary',
              parentId: dictionary.id,
              index: 0,
              url: 'https://www.thefreedictionary.com/%s'
            });
            chrome.bookmarks.create({
              title: 'Merriam-Webster',
              parentId: dictionary.id,
              index: 0,
              url: 'https://www.merriam-webster.com/dictionary?s=%s'
            });
          }
        );
        chrome.bookmarks.create(
          {
            title: chrome.i18n.getMessage('txtInitSearch'),
            parentId: root.id,
            index: 0
          },
          function (search_with) {
            chrome.bookmarks.create({
              title: 'Google Images',
              parentId: search_with.id,
              index: 0,
              url: 'https://www.google.com/search?site=imghp&tbm=isch&q=%s'
            });
            chrome.bookmarks.create({
              title: 'Google Maps',
              parentId: search_with.id,
              index: 0,
              url: 'https://maps.google.com/?q=%s'
            });
            chrome.bookmarks.create({
              title: 'Wikipedia (en)',
              parentId: search_with.id,
              index: 0,
              url: 'https://en.wikipedia.org/w/index.php?search=%s'
            });
            chrome.bookmarks.create({
              title: 'Wolfram|Alpha',
              parentId: search_with.id,
              index: 0,
              url: 'https://www.wolframalpha.com/input/?i=%s'
            });
            chrome.bookmarks.create({
              title: 'Bing',
              parentId: search_with.id,
              index: 0,
              url: 'https://www.bing.com/search?q=%s'
            });
            chrome.bookmarks.create({
              title: 'DuckDuckGo',
              parentId: search_with.id,
              index: 0,
              url: 'https://duckduckgo.com/?q=%s'
            });
            chrome.bookmarks.create({
              title: 'Google',
              parentId: search_with.id,
              index: 0,
              url: 'https://www.google.com/search?q=%s'
            });
          }
        );
        chrome.bookmarks.create({
          title: 'StartPage',
          parentId: root.id,
          index: 0,
          url: 'https://www.startpage.com/do/search?query=%s'
        });
        createDefaultSskBookmarks(root);
      });
    } else {
      // if there are no bookmark-based SSK items then create them
      var sub_tree_id = bookmarks[0].id;
      chrome.bookmarks.getSubTree(sub_tree_id, function (bookmark) {
        var root = bookmark[0];
        for (let child of root.children) {
          if (child.url && child.url.startsWith('https://ssk_id_')) {
            return;
          }
        }
        createDefaultSskBookmarks(root);
      });
    }
  });
}

function installed(details) {
  chrome.storage.local.get(null, function (prefs) {
    prefs = getDefaultPrefs(prefs);
    chrome.storage.local.set(prefs);
    createDefaultBookmarks(prefs.prefBookmarkFolder, true);
  });
}

function updateShortcuts() {
  if (cmn.isFirefox()) {
    chrome.storage.local.get(null, function (prefs) {
      browser.commands.update({
        name: 'page_translate',
        shortcut: prefs.prefShortcutPageTranslate
      });
      browser.commands.update({
        name: 'conversion',
        shortcut: prefs.prefShortcutShowConverter
      });
    });
  }
}

function getBookmarkFolder() {
  g_bookmark_folder = null;
  chrome.storage.local.get(null, function (prefs) {
    chrome.bookmarks.search(
      {title: prefs.prefBookmarkFolder},
      function (bookmarks) {
        if (bookmarks.length) {
          var sub_tree_id = bookmarks[0].id;
          chrome.bookmarks.getSubTree(sub_tree_id, function (bookmark) {
            g_bookmark_folder = bookmark[0];
            chrome.contextMenus.removeAll(function () {
              createContextMenu();
            });
          });
        }
      }
    );
  });
}

function initialize() {
  chrome.storage.local.get(null, function (prefs) {
    if (cmn.isFirefox()) {
      browser.runtime.getBrowserInfo(function (info) {
        try {
          // eventually set up min FF version to 63 and get rid of all check for FF version
          prefs.ffVersion = Number(info.version.split('.')[0]);
        } catch (ex) {
          cmn.log(ex.toString());
        }
        chrome.storage.local.set(prefs);
        // search API was introduced in version 63, non-firefox browsers will always have ffVersion=0
        if (prefs.ffVersion > 62) {
          browser.search.get().then(function (engines) {
            g_search_engines = engines;
            getBookmarkFolder();
          });
        }
      });
    }
    getBookmarkFolder();
  });
  loadGoogleTk();
  updateShortcuts();
  loadIcons();
}

initialize();

chrome.runtime.onInstalled.addListener(installed);
chrome.runtime.onMessage.addListener(notify);
chrome.commands.onCommand.addListener(onCommand);
chrome.bookmarks.onCreated.addListener(getBookmarkFolder);
chrome.bookmarks.onRemoved.addListener(getBookmarkFolder);
chrome.bookmarks.onChanged.addListener(getBookmarkFolder);
chrome.bookmarks.onMoved.addListener(getBookmarkFolder);
chrome.browserAction.onClicked.addListener(toggleStatus);
chrome.omnibox.onInputEntered.addListener(omniboxOnInputEntered);
chrome.omnibox.setDefaultSuggestion({
  description: 'SSK ' + chrome.i18n.getMessage('txtPrefTranslation')
});
chrome.alarms.onAlarm.addListener(alarm);
chrome.tabs.onActivated.addListener(tabActivated);
chrome.tabs.onZoomChange.addListener(zoomChanged);
chrome.webRequest.onBeforeSendHeaders.addListener(
  addGoogleReferer,
  {urls: ['https://translate.google.com/translate_tts*']},
  ['blocking', 'requestHeaders']
);

// handler that gets messages from content script
function notify(msg, sender, sendResponse) {
  switch (msg.cmd) {
    case utils.CMD_GET_MENU:
      sendResponse({menu: getMenu(msg), zoom: g_zooms[sender.tab.id] || 1.0});
      break;
    case utils.CMD_GET_PANEL:
      sendResponse({
        panel: getPanel(msg),
        zoom: g_zooms[sender.tab.id] || 1.0
      });
      break;
    case utils.CMD_GET_TRANSLATION_PANEL:
      sendResponse({
        panel: getTranslationPanel(msg),
        zoom: g_zooms[sender.tab.id] || 1.0,
        play_img: getIcon('play', msg.icnsClr)
      });
      break;
    case utils.CMD_GET_CONVERT_PANEL:
      sendResponse({
        panel: getConvertPanel(msg),
        zoom: g_zooms[sender.tab.id] || 1.0
      });
      break;
    case utils.CMD_OPEN_URL:
      openURL(msg.url);
      break;
    case utils.CMD_MAILTO:
      openEmail(msg.to, msg.subj, msg.selection);
      break;
    case utils.CMD_SEARCH:
      search(msg.engine, msg.selection);
      break;
    case utils.CMD_OPEN_BOOKMARK:
      openBookmark(msg.id, msg.selection);
      break;
    case utils.CMD_BLINK:
      blink();
      break;
    case utils.CMD_SET_BADGE_TEXT:
      setBadgeText(msg);
      break;
    case utils.CMD_ADD_BOOKMARK:
      opensearch.getSearchURL(msg.url).then(function (url) {
        opensearch.addBookmark(g_bookmark_folder, msg.title, url);
        notification('\n"{0}" added to favorites.'._format(msg.title));
      });
      break;
  }
}

function onCommand(cmd) {
  chrome.tabs.query({currentWindow: true, active: true}, function (tabs) {
    if (tabs.length) {
      switch (cmd) {
        case 'page_translate':
          translatePage(null, tabs[0]);
          break;
        case 'conversion':
          showConverter(null, tabs[0]);
          break;
      }
    }
  });
}

// sets addon status when tab gets activated
function tabActivated(activeInfo) {
  var count = 0;
  function isTabLoaded() {
    chrome.tabs.get(activeInfo.tabId, function (same_tab) {
      if (
        (same_tab != undefined
          && same_tab.status == 'complete'
          && same_tab.url != 'about:blank')
        || count > 100
      ) {
        var domain = same_tab.url.split('/')[2];
        setStatus(domain);
        chrome.tabs.getZoom(function (zoom) {
          g_zooms[same_tab.id] = zoom;
        });
      } else {
        count += 1;
        window.setTimeout(isTabLoaded, 100);
      }
    });
  }
  isTabLoaded();
}

function zoomChanged(zoomChangeInfo) {
  g_zooms[zoomChangeInfo.tabId] = zoomChangeInfo.newZoomFactor;
}

// set toolbar icon and hint according to current status
function setStatus(domain) {
  chrome.storage.local.get(null, function (prefs) {
    var blacklist = prefs.prefBlacklist;
    // following is workiaround for first start after installation
    blacklist = blacklist != undefined ? blacklist : [];
    // undefined domain means technical page like 'about:addons'
    if (
      blacklist.indexOf(domain) > -1
      || domain == undefined
      || domain == 'this-firefox'
    ) {
      setBadgeText({txt: '', color: '#000000'});
      chrome.browserAction.setIcon({
        path: {
          16: 'icons/SelectionSK_16_grey.png',
          24: 'icons/SelectionSK_24_grey.png',
          32: 'icons/SelectionSK_32_grey.png',
          48: 'icons/SelectionSK_48_grey.png',
          64: 'icons/SelectionSK_64_grey.png'
        }
      });
      chrome.browserAction.setTitle({
        title: chrome.i18n.getMessage('txtEnableAddon') + ' "' + domain + '"'
      });
    } else {
      chrome.browserAction.setIcon({
        path: {
          16: 'icons/SelectionSK_16.png',
          24: 'icons/SelectionSK_24.png',
          32: 'icons/SelectionSK_32.png',
          48: 'icons/SelectionSK_48.png',
          64: 'icons/SelectionSK_64.png'
        }
      });
      chrome.browserAction.setTitle({
        title: chrome.i18n.getMessage('txtDisableAddon') + ' "' + domain + '"'
      });
    }
  });
}

// called when user click on the toolbar icon; switches status
function toggleStatus(tab) {
  chrome.storage.local.get(null, function (prefs) {
    var blacklist = prefs.prefBlacklist;
    var domain = tab.url.split('/')[2];
    var idx = blacklist.indexOf(domain);
    if (idx > -1) {
      blacklist.splice(idx, 1);
    } else {
      blacklist.push(domain);
    }
    chrome.storage.local.set({prefBlacklist: blacklist});
    setStatus(domain);
  });
}

function omniboxOnInputEntered(input, disposition) {
  chrome.tabs.query({currentWindow: true, active: true}, function (tabs) {
    if (tabs.length) {
      chrome.tabs.sendMessage(tabs[0].id, {
        cmd: utils.CMD_DEFAULT_TRANSLATE,
        txt: input
      });
    }
  });
}

// alarm fired
function alarm(alarm) {
  switch (alarm.name) {
    case 'blink':
      chrome.alarms.clear('blink');
      chrome.browserAction.setIcon({
        path: {
          16: 'icons/SelectionSK_16.png',
          24: 'icons/SelectionSK_24.png',
          32: 'icons/SelectionSK_32.png',
          48: 'icons/SelectionSK_48.png',
          64: 'icons/SelectionSK_64.png'
        }
      });
      break;
    case 'notification':
      chrome.notifications.clear('notification');
      break;
  }
}

// add items to context menu
function createContextMenu() {
  chrome.storage.local.get(null, function (prefs) {
    var translate_page_data = {
      title: chrome.i18n.getMessage('txtTranslatePage'),
      contexts: ['browser_action'],
      onclick: translatePage
    };
    if (cmn.isFirefox()) {
      translate_page_data['icons'] = {
        16: 'icons/lng_tools.svg',
        32: 'icons/lng_tools.svg'
      };
    } // chrome\opera doesn't support 'icons' in the context menu
    chrome.contextMenus.create(translate_page_data);
    var show_converter_data = {
      title: chrome.i18n.getMessage('txtShowConverter'),
      contexts: ['browser_action'],
      onclick: showConverter
    };
    if (cmn.isFirefox()) {
      show_converter_data['icons'] = {
        16: 'icons/convert.svg',
        32: 'icons/convert.svg'
      };
    } // chrome\opera doesn't support 'icons' in the context menu
    chrome.contextMenus.create(show_converter_data);
    if (cmn.isFirefox()) {
      chrome.contextMenus.create({
        type: 'separator',
        contexts: ['browser_action']
      });
      var options_data = {
        title: chrome.i18n.getMessage('txtPrefPreferences'),
        contexts: ['browser_action'],
        onclick: function (info, tab) {
          chrome.runtime.openOptionsPage();
        }
      };
      options_data['icons'] = {
        16: 'icons/settings.svg',
        32: 'icons/settings.svg'
      };
      chrome.contextMenus.create(options_data);
    }

    var idx = Math.floor(Math.random() * (Number.MAX_SAFE_INTEGER - 10000) + 1);

    function addBookmarkItem(bookmark, root) {
      if (!bookmark.url && bookmark.children.length == 0) {
        return;
      } // empty folder
      var item_data = {
        parentId: root ? null : bookmark.parentId,
        id: bookmark.url ? '{0}_{1}'._format(idx, bookmark.url) : bookmark.id,
        title: root ? chrome.i18n.getMessage('txtSendTo') : bookmark.title,
        contexts: ['selection'],
        onclick: onMenuItemClick
      };
      idx += 1;
      if (bookmark.type == 'separator') {
        item_data['type'] = 'separator';
      }
      if (bookmark.title == chrome.i18n.getMessage('txtLngTools')) {
        // special case - 'Language tools' is SSK bookmap folder
        if (
          !prefs.prefShowGoogleTranslate
          && !prefs.prefShowWordnikDictionary
          && !prefs.prefShowUrbanDictionary
          && !prefs.prefShowYandexTranslate
          && !prefs.prefShowMsTranslator
        ) {
          return;
        }
        if (cmn.isFirefox()) {
          item_data['icons'] = {
            16: 'icons/lng_tools.svg',
            32: 'icons/lng_tools.svg'
          };
        }
      }
      if (cmn.isFirefox()) {
        // chrome\opera doesn't support 'icons' in the context menu
        if (root) {
          item_data['icons'] = {
            16: 'icons/SelectionSK_16.png',
            32: 'icons/SelectionSK_32.png'
          };
        } else if (bookmark.type == 'bookmark') {
          var url = favicons.getFavIconURL(bookmark.url, prefs);
          item_data['icons'] = {16: url, 32: url};
        }
      }
      chrome.contextMenus.create(item_data);
    }

    function addItem(parent, id, title, icon) {
      var data = {
        parentId: parent,
        id: id,
        title: title,
        contexts: ['selection'],
        onclick: onMenuItemClick
      };
      if (cmn.isFirefox()) {
        data['icons'] = {16: icon, 32: icon};
      } // chrome doesn't support 'icons' in the context menu
      chrome.contextMenus.create(data);
    }

    function addSskItem(bookmark) {
      var id = bookmark.url.slice(8, -1);
      if (id == utils.ID_SEPARATOR) {
        chrome.contextMenus.create({
          parentId: bookmark.parentId,
          id: '{0}_{1}'._format(idx, utils.ID_SEPARATOR),
          contexts: ['selection'],
          type: 'separator'
        });
        idx += 1;
      }
      if (id == utils.ID_GOOGLE_TRANSLATE && prefs.prefShowGoogleTranslate) {
        addItem(
          bookmark.parentId,
          utils.ID_GOOGLE_TRANSLATE,
          chrome.i18n.getMessage('txtGoogleTranslate'),
          cmn.getIconURL('favicons/translate.google.com.svg')
        );
      }
      if (id == utils.ID_WORDNIK_DICT && prefs.prefShowWordnikDictionary) {
        addItem(
          bookmark.parentId,
          utils.ID_WORDNIK_DICT,
          chrome.i18n.getMessage('txtWordnikDictionary'),
          cmn.getIconURL('favicons/www.wordnik.com.png')
        );
      }
      if (id == utils.ID_URBAN_DICT && prefs.prefShowUrbanDictionary) {
        addItem(
          bookmark.parentId,
          utils.ID_URBAN_DICT,
          chrome.i18n.getMessage('txtUrbanDictionary'),
          cmn.getIconURL('favicons/www.urbandictionary.com.png')
        );
      }
      if (id == utils.ID_YANDEX_TRANSLATE && prefs.prefShowYandexTranslate) {
        addItem(
          bookmark.parentId,
          utils.ID_YANDEX_TRANSLATE,
          chrome.i18n.getMessage('txtYandexTranslate'),
          cmn.getIconURL('favicons/translate.yandex.com.png')
        );
      }
      if (id == utils.ID_MS_TRANSLATOR && prefs.prefShowMsTranslator) {
        addItem(
          bookmark.parentId,
          utils.ID_MS_TRANSLATOR,
          chrome.i18n.getMessage('txtMsTranslator'),
          cmn.getIconURL('favicons/ms.translate.png')
        );
      }
      if (id == utils.ID_HIGHLIGHT && prefs.prefShowHighlight) {
        addItem(
          bookmark.parentId,
          utils.ID_HIGHLIGHT,
          chrome.i18n.getMessage('txtHighlight'),
          cmn.getIconURL('highlight.svg')
        );
      }
      if (id == utils.ID_CONVERT && prefs.prefShowConvert) {
        addItem(
          bookmark.parentId,
          utils.ID_CONVERT,
          chrome.i18n.getMessage('txtConvert'),
          cmn.getIconURL('convert.svg')
        );
      }
      if (id == utils.ID_MAILTO && prefs.prefShowMailto) {
        addItem(
          bookmark.parentId,
          utils.ID_MAILTO,
          chrome.i18n.getMessage('txtMailto'),
          cmn.getIconURL('mailto.svg')
        );
      }
      if (id == utils.ID_SEARCH && prefs.prefShowSearch && g_search_engines) {
        for (let e of g_search_engines) {
          if (e.isDefault) {
            addItem(
              bookmark.parentId,
              '{0}_{1}'._format('!search!', e.name),
              e.name,
              e.favIconUrl
            );
          }
        }
        addItem(
          bookmark.parentId,
          'txtInitSearch',
          chrome.i18n.getMessage('txtInitSearch'),
          cmn.getIconURL('search.svg')
        );
        for (let e of g_search_engines) {
          if (!e.isDefault) {
            addItem(
              'txtInitSearch',
              '{0}_{1}'._format('!search!', e.name),
              e.name,
              e.favIconUrl
            );
          }
        }
      }
    }

    function addBookmark(bookmark, root) {
      if (bookmark.url && bookmark.url.startsWith('https://ssk_id_')) {
        addSskItem(bookmark);
      } else {
        if (prefs.prefShowBookmarks) {
          addBookmarkItem(bookmark, root);
        }
      }
      if (bookmark.children) {
        for (let child of bookmark.children) {
          addBookmark(child, false);
        }
      }
    }

    if (!prefs.prefShowPopupOnly && g_bookmark_folder) {
      addBookmark(g_bookmark_folder, true);
    }
  });
}

function translatePage(info, tab) {
  chrome.storage.local.get(null, function (prefs) {
    var url =
      'https://translate.google.com/translate?sl=auto&tl='
      + prefs.prefTranslationDestLng
      + '&js=y&u='
      + encodeURIComponent(tab.url);
    openURL(url);
  });
}

function showConverter(info, tab) {
  chrome.tabs.sendMessage(tab.id, {cmd: utils.CMD_CONVERT, txt: '0'});
}

// callback from context menu
function onMenuItemClick(info, tab) {
  var s = info.menuItemId;
  switch (s) {
    case utils.ID_GOOGLE_TRANSLATE:
      chrome.tabs.sendMessage(tab.id, {
        cmd: utils.CMD_GOOGLE_TRANSLATE,
        txt: info.selectionText
      });
      break;
    case utils.ID_WORDNIK_DICT:
      chrome.tabs.sendMessage(tab.id, {
        cmd: utils.CMD_WORDNIK_DICT,
        txt: info.selectionText
      });
      break;
    case utils.ID_URBAN_DICT:
      chrome.tabs.sendMessage(tab.id, {
        cmd: utils.CMD_URBAN_DICT,
        txt: info.selectionText
      });
      break;
    case utils.ID_YANDEX_TRANSLATE:
      chrome.tabs.sendMessage(tab.id, {
        cmd: utils.CMD_YANDEX_TRANSLATE,
        txt: info.selectionText
      });
      break;
    case utils.ID_MS_TRANSLATOR:
      chrome.tabs.sendMessage(tab.id, {
        cmd: utils.CMD_MS_TRANSLATOR,
        txt: info.selectionText
      });
      break;
    case utils.ID_HIGHLIGHT:
      chrome.tabs.sendMessage(tab.id, {
        cmd: utils.CMD_HIGHLIGHT,
        txt: info.selectionText
      });
      break;
    case utils.ID_CONVERT:
      chrome.tabs.sendMessage(tab.id, {
        cmd: utils.CMD_CONVERT,
        txt: info.selectionText
      });
      break;
    case utils.ID_MAILTO:
      openEmail('', tab.url, info.selectionText);
      break;
    default:
      if (s.startsWith('!search!')) {
        // FF search engine
        search(s.slice(s.indexOf('_') + 1), info.selectionText);
      } else {
        // bookmark
        openSelectionURL(s.slice(s.indexOf('_') + 1), info.selectionText);
        browser.browserAction.openPopup();
      }
  }
}

// prepares popup menu that will be inserted into web page; needs to be done at background because content script doesn't have access to bookmarks
function getMenu(msg) {
  var txtItemEnd = '</span></button></li>';
  var txtItemEnd2 = '</span></button></li></ul></li>';
  var separator = "<li class='ssk-menu-separator'></li>";

  function addItem(name, id, img, title = null) {
    return (
      "<li class='ssk-menu-item'"
      + (id ? " id='" + id + "'" : '')
      + (title ? " title='" + title + "'" : '')
      + "><button type='button' class='ssk-menu-btn'>"
      + (img ?
        "<img src='"
        + img
        + "' onerror='this.src=\""
        + cmn.getIconURL('url_blocked.svg')
        + "\"' class='ssk-button-img'/>"
      : '')
      + "<span class='ssk-menu-text'>"
      + name
      + txtItemEnd
    );
  }

  function addSskItem(url) {
    var id = url.slice(8, -1);
    if (id == utils.ID_SEPARATOR) {
      return separator;
    }
    if (id == utils.ID_COPY) {
      return msg.showCopy ?
          addItem(
            chrome.i18n.getMessage('txtCopy'),
            utils.ID_COPY,
            getIcon('copy', msg.mnIcnsClr)
          )
        : '';
    }
    if (id == utils.ID_PASTE) {
      return msg.showPaste ?
          addItem(
            chrome.i18n.getMessage('txtPaste'),
            utils.ID_PASTE,
            getIcon('paste', msg.mnIcnsClr)
          )
        : '';
    }
    if (id == utils.ID_CUT) {
      return msg.showCut ?
          addItem(
            chrome.i18n.getMessage('txtCut'),
            utils.ID_CUT,
            getIcon('cut', msg.mnIcnsClr)
          )
        : '';
    }
    if (id == utils.ID_DELETE) {
      return msg.showDelete ?
          addItem(
            chrome.i18n.getMessage('txtDelete'),
            utils.ID_DELETE,
            getIcon('delete', msg.mnIcnsClr)
          )
        : '';
    }
    if (id == utils.ID_COPY_PLAIN) {
      return msg.showCopyPlain ?
          addItem(
            chrome.i18n.getMessage('txtCopyPlain'),
            utils.ID_COPY_PLAIN,
            getIcon('copy_plain', msg.mnIcnsClr)
          )
        : '';
    }
    if (id == utils.ID_COPY_HTML) {
      return msg.showCopyHtml ?
          addItem(
            chrome.i18n.getMessage('txtCopyHtml'),
            utils.ID_COPY_HTML,
            getIcon('copy_html', msg.mnIcnsClr)
          )
        : '';
    }
    if (id == utils.ID_GOOGLE_TRANSLATE) {
      return msg.showGoogleTranslate ?
          addItem(
            chrome.i18n.getMessage('txtGoogleTranslate'),
            utils.ID_GOOGLE_TRANSLATE,
            cmn.getIconURL('favicons/translate.google.com.svg')
          )
        : '';
    }
    if (id == utils.ID_WORDNIK_DICT) {
      return msg.showWordnikDictionary ?
          addItem(
            chrome.i18n.getMessage('txtWordnikDictionary'),
            utils.ID_WORDNIK_DICT,
            cmn.getIconURL('favicons/www.wordnik.com.png')
          )
        : '';
    }
    if (id == utils.ID_URBAN_DICT) {
      return msg.showUrbanDictionary ?
          addItem(
            chrome.i18n.getMessage('txtUrbanDictionary'),
            utils.ID_URBAN_DICT,
            cmn.getIconURL('favicons/www.urbandictionary.com.png')
          )
        : '';
    }
    if (id == utils.ID_YANDEX_TRANSLATE) {
      return msg.showYandexTranslate ?
          addItem(
            chrome.i18n.getMessage('txtYandexTranslate'),
            utils.ID_YANDEX_TRANSLATE,
            cmn.getIconURL('favicons/translate.yandex.com.png')
          )
        : '';
    }
    if (id == utils.ID_MS_TRANSLATOR) {
      return msg.showMsTranslator ?
          addItem(
            chrome.i18n.getMessage('txtMsTranslator'),
            utils.ID_MS_TRANSLATOR,
            cmn.getIconURL('favicons/ms.translate.png')
          )
        : '';
    }
    if (id == utils.ID_OPEN_URL && msg.showOpenUrl && msg.urls.length > 0) {
      if (msg.urls.length == 1) {
        return addItem(
          chrome.i18n.getMessage('txtOpenUrl'),
          utils.ID_OPEN_URL,
          getIcon('open_url', msg.mnIcnsClr),
          msg.urls[0]
        );
      } else {
        var submenu = addItem(
          chrome.i18n.getMessage('txtOpenUrl'),
          null,
          getIcon('open_url', msg.mnIcnsClr)
        );
        submenu = submenu.replace(
          /ssk-menu-item/gi,
          'ssk-menu-item ssk-submenu'
        );
        submenu = submenu.replace(
          /<\/li>/gi,
          '<ul class="ssk-menu ssk-submenu-pos-normal">'
        );
        for (var i = 0; i < msg.urls.length; i++) {
          submenu += addItem(msg.urls[i], utils.ID_OPEN_URL + '_' + i, null);
        }
        submenu += separator;
        submenu += addItem(
          chrome.i18n.getMessage('txtOpenUrlAll'),
          utils.ID_OPEN_ALL_URLS,
          getIcon('open_url', msg.mnIcnsClr)
        );
        submenu += addItem(
          chrome.i18n.getMessage('txtCopyUrlAll'),
          utils.ID_COPY_ALL_URLS,
          getIcon('copy_plain', msg.mnIcnsClr)
        );
        return submenu + '</ul></li>';
      }
    }
    if (id == utils.ID_HIGHLIGHT && msg.showOpenUrl) {
      if (msg.prefs.prefAutoSelectColors) {
        return addItem(
          chrome.i18n.getMessage('txtHighlight'),
          utils.ID_HIGHLIGHT,
          getIcon('highlight', msg.mnIcnsClr)
        );
      } else {
        var submenu = addItem(
          chrome.i18n.getMessage('txtHighlight'),
          null,
          getIcon('highlight', msg.mnIcnsClr)
        );
        submenu = submenu.replace(
          /ssk-menu-item/gi,
          'ssk-menu-item ssk-submenu'
        );
        submenu = submenu.replace(
          /<\/li>/gi,
          '<ul class="ssk-menu ssk-submenu-pos-normal">'
        );
        for (var i = 0; i < 10; i++) {
          var bk_clr = 'prefBkColor_' + i,
            tx_clr = 'prefTxColor_' + i;
          submenu += addItem(
            '',
            utils.ID_HIGHLIGHT + '_' + i,
            cmn.getLetterIcon(
              String.fromCharCode(65 + i),
              msg.prefs[tx_clr],
              msg.prefs[bk_clr]
            )
          );
        }
        return submenu + '</ul></li>';
      }
    }
    if (id == utils.ID_CONVERT) {
      return msg.showConvert ?
          addItem(
            chrome.i18n.getMessage('txtConvert'),
            utils.ID_CONVERT,
            getIcon('convert', msg.mnIcnsClr)
          )
        : '';
    }
    if (id == utils.ID_UPS) {
      return msg.showUPS ?
          addItem(
            chrome.i18n.getMessage('txtUPS'),
            utils.ID_UPS,
            getIcon('ups', msg.mnIcnsClr)
          )
        : '';
    }
    if (id == utils.ID_USPS) {
      return msg.showUSPS ?
          addItem(
            chrome.i18n.getMessage('txtUSPS'),
            utils.ID_USPS,
            getIcon('usps', msg.mnIcnsClr)
          )
        : '';
    }
    if (id == utils.ID_Fedex) {
      return msg.showFedex ?
          addItem(
            chrome.i18n.getMessage('txtFedex'),
            utils.ID_Fedex,
            getIcon('fedex', msg.mnIcnsClr)
          )
        : '';
    }
    if (id == utils.ID_MAILTO) {
      return msg.showMailto ?
          addItem(
            chrome.i18n.getMessage('txtMailto'),
            utils.ID_MAILTO,
            getIcon('mailto', msg.mnIcnsClr),
            msg.email
          )
        : '';
    }
    if (id == utils.ID_SEARCH && msg.showSearch && g_search_engines) {
      var default_engine = '';
      var submenu = addItem(
        chrome.i18n.getMessage('txtInitSearch'),
        null,
        getIcon('search', msg.mnIcnsClr)
      );
      submenu = submenu.replace(/ssk-menu-item/gi, 'ssk-menu-item ssk-submenu');
      submenu = submenu.replace(
        /<\/li>/gi,
        '<ul class="ssk-menu ssk-submenu-pos-normal">'
      );
      for (let e of g_search_engines) {
        if (e.isDefault) {
          default_engine = addItem(
            e.name,
            utils.ID_SEARCH + '_' + e.name,
            e.favIconUrl
          );
        } else {
          submenu += addItem(
            e.name,
            utils.ID_SEARCH + '_' + e.name,
            e.favIconUrl
          );
        }
      }
      return default_engine + submenu + '</ul></li>';
    }
    return '';
  }

  function addBookmark(bookmark) {
    if (bookmark.children) {
      // special case - 'Language tools' is SSK bookmap folder
      var submenu = addItem(
        bookmark.title,
        null,
        bookmark.title == chrome.i18n.getMessage('txtLngTools') ?
          getIcon('lng_tools', msg.mnIcnsClr)
        : null
      );
      submenu = submenu.replace(/ssk-menu-item/gi, 'ssk-menu-item ssk-submenu');
      submenu = submenu.replace(
        /<\/li>/gi,
        '<ul class="ssk-menu ssk-submenu-pos-normal">'
      );
      for (let child of bookmark.children) {
        submenu += addBookmark(child);
      }
      return submenu.endsWith(txtItemEnd) || submenu.endsWith(txtItemEnd2) ?
          submenu + '</ul></li>'
        : ''; // remove empty folders
    } else {
      if (bookmark.type == 'separator') {
        return separator;
      } else if (bookmark.url.startsWith('https://ssk_id_')) {
        return addSskItem(bookmark.url);
      } else {
        return msg.showBookmarks ?
            addItem(
              bookmark.title,
              bookmark.id,
              favicons.getFavIconURL(bookmark.url, msg.prefs)
            )
          : '';
      }
    }
  }

  var bookmarks = '';
  if (g_bookmark_folder) {
    for (let child of g_bookmark_folder.children) {
      bookmarks += addBookmark(child);
    }
  }

  return (
    "<ul id='ssk_id_popup' spellcheck='false' class='ssk-menu ssk-show-menu notranslate'>"
    + bookmarks
    + '</ul>'
  );
}

// prepares popup panel that will be inserted into web page; needs to be done at background because content script doesn't have access to bookmarks
function getPanel(msg) {
  var items = [];
  var separator = "<span class='ssk-panel-separator'></span>";
  var separator_placeholder =
    "<span class='ssk-panel-separator-placeholder'></span>";

  function addItem(name, id, img) {
    items.push(
      "<img id='"
        + id
        + "' "
        + "src='"
        + img
        + "' title='"
        + name
        + "' alt='"
        + name
        + "' onerror='this.src=\""
        + cmn.getIconURL('url_blocked.svg')
        + "\"' class='ssk-panel-img'/>"
    );
  }

  function addSskItem(url) {
    var id = url.slice(8, -1);
    if (id == utils.ID_SEPARATOR) {
      items.push(separator);
    }
    if (id == utils.ID_COPY && msg.showCopy) {
      addItem(
        chrome.i18n.getMessage('txtCopy'),
        utils.ID_COPY,
        getIcon('copy', msg.pnIcnsClr)
      );
    }
    if (id == utils.ID_PASTE && msg.showPaste) {
      addItem(
        chrome.i18n.getMessage('txtPaste'),
        utils.ID_PASTE,
        getIcon('paste', msg.pnIcnsClr)
      );
    }
    if (id == utils.ID_CUT && msg.showCut) {
      addItem(
        chrome.i18n.getMessage('txtCut'),
        utils.ID_CUT,
        getIcon('cut', msg.pnIcnsClr)
      );
    }
    if (id == utils.ID_DELETE && msg.showDelete) {
      addItem(
        chrome.i18n.getMessage('txtDelete'),
        utils.ID_DELETE,
        getIcon('delete', msg.pnIcnsClr)
      );
    }
    if (id == utils.ID_COPY_PLAIN && msg.showCopyPlain) {
      addItem(
        chrome.i18n.getMessage('txtCopyPlain'),
        utils.ID_COPY_PLAIN,
        getIcon('copy_plain', msg.pnIcnsClr)
      );
    }
    if (id == utils.ID_COPY_HTML && msg.showCopyHtml) {
      addItem(
        chrome.i18n.getMessage('txtCopyHtml'),
        utils.ID_COPY_HTML,
        getIcon('copy_html', msg.pnIcnsClr)
      );
    }
    if (id == utils.ID_GOOGLE_TRANSLATE && msg.showGoogleTranslate) {
      addItem(
        chrome.i18n.getMessage('txtGoogleTranslate'),
        utils.ID_GOOGLE_TRANSLATE,
        cmn.getIconURL('favicons/translate.google.com.svg')
      );
    }
    if (id == utils.ID_WORDNIK_DICT && msg.showWordnikDictionary) {
      addItem(
        chrome.i18n.getMessage('txtWordnikDictionary'),
        utils.ID_WORDNIK_DICT,
        cmn.getIconURL('favicons/www.wordnik.com.png')
      );
    }
    if (id == utils.ID_URBAN_DICT && msg.showUrbanDictionary) {
      addItem(
        chrome.i18n.getMessage('txtUrbanDictionary'),
        utils.ID_URBAN_DICT,
        cmn.getIconURL('favicons/www.urbandictionary.com.png')
      );
    }
    if (id == utils.ID_YANDEX_TRANSLATE && msg.showYandexTranslate) {
      addItem(
        chrome.i18n.getMessage('txtYandexTranslate'),
        utils.ID_YANDEX_TRANSLATE,
        cmn.getIconURL('favicons/translate.yandex.com.png')
      );
    }
    if (id == utils.ID_MS_TRANSLATOR && msg.showMsTranslator) {
      addItem(
        chrome.i18n.getMessage('txtMsTranslator'),
        utils.ID_MS_TRANSLATOR,
        cmn.getIconURL('favicons/ms.translate.png')
      );
    }
    if (id == utils.ID_OPEN_URL && msg.showOpenUrl && msg.urls.length > 0) {
      addItem(
        chrome.i18n.getMessage('txtOpenUrl') + ' - ' + msg.urls[0],
        utils.ID_OPEN_URL,
        getIcon('open_url', msg.pnIcnsClr)
      );
    }
    if (id == utils.ID_HIGHLIGHT && msg.showHighlight) {
      addItem(
        chrome.i18n.getMessage('txtHighlight'),
        utils.ID_HIGHLIGHT,
        getIcon('highlight', msg.pnIcnsClr)
      );
    }
    if (id == utils.ID_CONVERT && msg.showConvert) {
      addItem(
        chrome.i18n.getMessage('txtConvert'),
        utils.ID_CONVERT,
        getIcon('convert', msg.pnIcnsClr)
      );
    }
    if (id == utils.ID_UPS && msg.showUPS) {
      addItem(
        chrome.i18n.getMessage('txtUPS'),
        utils.ID_UPS,
        getIcon('ups', msg.pnIcnsClr)
      );
    }
    if (id == utils.ID_USPS && msg.showUSPS) {
      addItem(
        chrome.i18n.getMessage('txtUSPS'),
        utils.ID_USPS,
        getIcon('usps', msg.pnIcnsClr)
      );
    }
    if (id == utils.ID_Fedex && msg.showFedex) {
      addItem(
        chrome.i18n.getMessage('txtFedex'),
        utils.ID_Fedex,
        getIcon('fedex', msg.pnIcnsClr)
      );
    }
    if (id == utils.ID_MAILTO && msg.showMailto) {
      addItem(
        chrome.i18n.getMessage('txtMailto')
          + (msg.email ? ': ' + msg.email : ''),
        utils.ID_MAILTO,
        getIcon('mailto', msg.pnIcnsClr)
      );
    }
    if (id == utils.ID_SEARCH && msg.showSearch && g_search_engines) {
      for (let e of g_search_engines) {
        addItem(e.name, utils.ID_SEARCH + '_' + e.name, e.favIconUrl);
      }
    }
  }

  function addBookmark(bookmark) {
    if (bookmark.children) {
      items.push(separator);
      for (let child of bookmark.children) {
        addBookmark(child);
      }
      items.push(separator);
    } else {
      if (bookmark.type == 'separator') {
        items.push(separator);
      } else if (bookmark.url.startsWith('https://ssk_id_')) {
        addSskItem(bookmark.url);
      } else {
        if (msg.showBookmarks) {
          addItem(
            bookmark.title,
            bookmark.id,
            favicons.getFavIconURL(bookmark.url, msg.prefs)
          );
        }
      }
    }
  }

  if (g_bookmark_folder) {
    for (let child of g_bookmark_folder.children) {
      addBookmark(child);
    }
  }

  // remove duplicate separators as well as last one
  for (var i = items.length - 1; i >= 0; i--) {
    if (
      items[i] == separator
      && ((i > 0 && items[i - 1] == separator) || i == items.length - 1)
    ) {
      items.splice(i, 1);
    }
  }

  // remove separators but remember their positions
  var sepIdx = [];
  for (let i = items.length - 1; i >= 0; i--) {
    if (items[i] == separator) {
      sepIdx.push(i);
      items.splice(i, 1);
    }
  }

  // by default size is number of icons in column
  var size = msg.prefs.prefPanelItemsN,
    isRows = msg.prefs.prefPanelItemsNRows;
  if (size == 0) {
    // fit as many icons as possible
    size = 1000;
  } else if (isRows) {
    // adjust size to number of icons in row
    size = Math.ceil(items.length / size);
  }

  // Tricky part: split per row, insert separators in their place, empty
  // separators in other rows.
  var rows = [];
  while (items.length) {
    rows.push(items.splice(0, size));
  }
  var sepPos = [];
  for (let i = 0; i < sepIdx.length; i++) {
    sepPos.push([
      ((sepIdx[i] - (sepIdx.length - 1 - i)) / size) | 0,
      (sepIdx[i] - (sepIdx.length - 1 - i)) % size
    ]);
  }
  sepPos.sort(function (a, b) {
    return b[1] - a[1];
  });
  for (let i = 0; i < sepPos.length; i++) {
    for (let j = 0; j < rows.length; j++) {
      if (j == sepPos[i][0]) {
        if (rows[j][sepPos[i][1]] == separator_placeholder) {
          rows[j][sepPos[i][1]] = separator;
        } else if (rows[j][sepPos[i][1]] != separator) {
          rows[j]._insert(separator, sepPos[i][1]);
        }
      } else {
        if (
          rows[j][sepPos[i][1]] != separator
          && rows[j][sepPos[i][1]] != separator_placeholder
        ) {
          rows[j]._insert(separator_placeholder, sepPos[i][1]);
        }
      }
    }
  }

  // Easy part: add rows to the panel.
  var res = "<span id='ssk_id_popup' class='ssk-panel'>";
  rows.forEach(r => {
    res += "<span class='ssk-panel-row'>" + r.join('') + '</span>';
  });
  res += '</span>';
  return res;
}

function getTranslationPanel(msg) {
  return (
    '<span id="ssk_id_translation_panel" spellcheck="false" '
    + 'class="ssk-translationpanel'
    + (msg.pos_fixed ? ' ssk-translationpanel-fixed' : '') + ' notranslate">'
		+ '<img id="ssk_id_translation_open" src="'
    + getIcon('open_url', msg.icnsClr) + '" title="'
    + chrome.i18n.getMessage('txtTranslationDetails')
    + '" class="ssk-translationpanel-button" /><img '
    + 'id="ssk_id_translation_copy" src="' + getIcon('copy_plain', msg.icnsClr)
    + '" title="' + chrome.i18n.getMessage('txtCopyTranslation')
    + '" class="ssk-translationpanel-button" />&nbsp;<select '
    + 'id="ssk_id_lng_src" class="ssk-translationpanel-select"></select><img '
    + 'id="ssk_id_lng_reverse" src="' + getIcon('reverse', msg.icnsClr)
    + '" title="' + chrome.i18n.getMessage('txtTranslateReverse')
    + '" class="ssk-translationpanel-button" /><select id="ssk_id_lng_dst" '
    + 'class="ssk-translationpanel-select"></select>&nbsp;<select '
    + 'id="ssk_id_engine" class="ssk-translationpanel-select '
    + 'ssk-translationpanel-select-engine"></select>&nbsp;<img '
    + 'id="ssk_id_translation_close" src="' + getIcon('close', msg.icnsClr)
    + '" class="ssk-translationpanel-button ssk-translationpanel-button-close" '
    + '/><br /><span id="ssk_id_translation" '
    + 'class="ssk-translationpanel-translation" /></span>'
  );
}

function getConvertPanel(msg) {
  return (
    '<span id="ssk_id_converter_panel" spellcheck="false" '
    + 'class="ssk-converterpanel '
    + (msg.pos_fixed ? 'ssk-converterpanel-fixed' : '') + 'notranslate">'
		+ '<select id="ssk_id_conv" class="ssk-converterpanel-select '
    + 'ssk-converterpanel-select-converter"></select><img '
    + 'id="ssk_id_conv_close" src="' + getIcon('close', msg.icnsClr)
    + '" class="ssk-converterpanel-button ssk-converterpanel-button-close" />'
		+ '<br class="ssk-converterpanel-br" /><br class="ssk-converterpanel-br" />'
		+ '<input type="text" id="ssk_id_conv_src_val" '
    + 'class="ssk-converterpanel-value"><select id="ssk_id_conv_src" '
    + 'class="ssk-converterpanel-select"></select><img id="ssk_id_conv_reverse"'
    + ' src="' + getIcon('reverse', msg.icnsClr) + '" title="'
    + chrome.i18n.getMessage('txtReverse')
    + '" class="ssk-converterpanel-button" /><input type="text" '
    + 'id="ssk_id_conv_dst_val" class="ssk-converterpanel-value" disabled>'
		+ '<select id="ssk_id_conv_dst" class="ssk-converterpanel-select"></select>'
  	+ '</span>'
  );
}

// opens selection in the specified FF search engine
function search(engine, selection) {
  chrome.storage.local.get(null, function (prefs) {
    chrome.tabs.query({currentWindow: true, active: true}, function (tabs) {
      if (prefs.prefOpenInCurrTab) {
        browser.search.search({
          query: selection,
          engine: engine,
          tabId: tabs[0].id
        });
      } else {
        browser.search.search({query: selection, engine: engine});
      }
    });
  });
}

// opens new tab with specified url
function openURL(url) {
  if (url) {
    chrome.storage.local.get(null, function (prefs) {
      chrome.tabs.query({currentWindow: true, active: true}, function (tabs) {
        if (prefs.prefOpenInCurrTab) {
          chrome.tabs.update(tabs[0].id, {url: url, active: true});
        } else {
          if (cmn.isFirefox() && prefs.prefReuseContainer) {
            chrome.tabs.create({
              url: url,
              index: tabs[0].index + 1,
              openerTabId: tabs[0].id,
              active: prefs.prefOpenInNewTab,
              cookieStoreId: tabs[0].cookieStoreId
            });
          } else {
            chrome.tabs.create({
              url: url,
              index: tabs[0].index + 1,
              openerTabId: tabs[0].id,
              active: prefs.prefOpenInNewTab
            });
          }
        }
      });
    });
  }
}

// add selected text to url and open it
function openSelectionURL(url, selection) {
  url = cmn.prepareSearchUrl(url, selection);
  openURL(url);
}

// pass selection to bookmark
function openBookmark(id, selection) {
  chrome.bookmarks.get(id, function (bookmark) {
    openSelectionURL(bookmark[0].url, selection);
  });
}

// create email window
function openEmail(to, subj, body) {
  var email = 'mailto:';
  if (to) email += encodeURIComponent(to);
  if (subj && body) {
    email += '?';
    email += 'subject=' + encodeURIComponent(subj);
    email += '&body=' + encodeURIComponent(body);
  }
  chrome.tabs.create({url: email, active: false}, function (tab) {
    // firefox allow just close tab, but chrome require that it will be in completed state, otherwise email will not open
    function isTabLoaded() {
      chrome.tabs.get(tab.id, function (same_tab) {
        if (same_tab.status == 'complete') {
          chrome.tabs.remove(tab.id);
        } else {
          window.setTimeout(isTabLoaded, 10);
        }
      });
    }
    isTabLoaded();
  });
}

// shortly change icon
function blink() {
  chrome.browserAction.setIcon({
    path: {
      16: 'icons/SelectionSK_16_grey.png',
      24: 'icons/SelectionSK_24_grey.png',
      32: 'icons/SelectionSK_32_grey.png',
      48: 'icons/SelectionSK_48_grey.png',
      64: 'icons/SelectionSK_64_grey.png'
    }
  });
  chrome.alarms.create('blink', {when: Date.now() + 500});
}

// show notification
function notification(txt) {
  chrome.notifications.create('notification', {
    type: 'basic',
    iconUrl: cmn.getIconURL('SelectionSK_32.png'),
    title: cmn.isFirefox() ? 'SelectionSK' : '',
    message: txt
  });
  chrome.alarms.create('notification', {when: Date.now() + 2000});
}

// shows small text on the top of toolbar icon
function setBadgeText(msg) {
  chrome.storage.local.get(null, function (prefs) {
    if (prefs.prefCountWords) {
      chrome.tabs.query({currentWindow: true, active: true}, function (tabs) {
        chrome.browserAction.setBadgeBackgroundColor({
          color: msg.color,
          tabId: tabs[0].id
        });
        if (cmn.isFirefox()) {
          chrome.browserAction.setBadgeTextColor({
            color: '#FFFFFF',
            tabId: tabs[0].id
          });
        }
        chrome.browserAction.setBadgeText({text: msg.txt, tabId: tabs[0].id});
      });
    }
  });
}

function loadIcons() {
  const fns = [
    'close',
    'convert',
    'copy',
    'copy_html',
    'copy_plain',
    'cut',
    'delete',
    'favicons',
    'fedex',
    'highlight',
    'lng_tools',
    'mailto',
    'open_url',
    'paste',
    'play',
    'reverse',
    'search',
    'settings',
    'ups',
    'url_blocked',
    'usps'
  ];
  for (const name of fns) {
    const url = cmn.getIconURL(name + '.svg');
    fetch(url).then(function (response) {
      response.text().then(function (data) {
        g_icons[name] = data;
      });
    });
  }
}

function getIcon(name, color) {
  // Content Security Policy may block loading of a resource at inline, so do not create it if it is default one
  if (color == 'rgb(0, 0, 0)') {
    return cmn.getIconURL(name + '.svg');
  } else {
    var svg = g_icons[name];
    svg = svg._replace_all('fill:rgb(0,0,0)', 'fill:{0}'._format(color));
    return 'data:image/svg+xml;utf8,' + svg;
  }
}

// tts, thanks to S3.Translator
function loadGoogleTk() {
  var req = new XMLHttpRequest();
  var url = 'https://translate.google.com';
  var timeout = setTimeout(function () {
    req.abort();
  }, 5000);
  req.onreadystatechange = function () {
    if (req.readyState == 4) {
      clearTimeout(timeout);
      if (req.status == 200) {
        parseGoogleTk(req.responseText);
      }
    }
  };
  req.open('GET', url, true);
  req.send(null);
}

function parseGoogleTk(responseText) {
  var res = /;TKK=(.*?\'\));/i.exec(responseText);
  if (res == null) {
    res = /\,tkk\:(\'.*?\')/i.exec(responseText);
  }
  if (res != null) {
    var tkk = '';
    if (/^\'\d+\.\d+/.test(res[1])) {
      var res2 = /^\'(\d+\.\d+)/i.exec(res[1]);
      if (res2 != null) {
        tkk = res2[1];
      }
    } else {
      var res2 = /var a=(.*?);.*?var b=(.*?);.*?return (\d+)/i.exec(
        res[1].replace(/\\x3d/g, '=')
      );
      if (res2 != null) {
        tkk = Number(res2[3]) + '.' + (Number(res2[1]) + Number(res2[2]));
      }
    }
    chrome.storage.local.get(null, function (prefs) {
      prefs.prefTkk = tkk;
      chrome.storage.local.set(prefs);
    });
  }
}

function addGoogleReferer(info) {
  for (var i = 0; i < info.requestHeaders.length; i++) {
    if (info.requestHeaders[i].name.toLowerCase() == 'referer') {
      info.requestHeaders.splice(i, 1);
      break;
    }
  }
  info.requestHeaders.push({
    name: 'Referer',
    value: 'https://translate.google.com/'
  });
  return {requestHeaders: info.requestHeaders};
}
