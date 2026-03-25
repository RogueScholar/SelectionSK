'use strict';

var selected_lng;

function savePrefs(e) {
	e.preventDefault();
	var dst_lng = document.getElementById('prefTranslationDestLng');
	var def_trans = document.getElementById('prefTranslationDefTrans');
	var dst_cur = document.getElementById('prefConversionDestCur');
	var dst_temp = document.getElementById('prefConversionDestTemp');
	var dst_mass = document.getElementById('prefConversionDestMass');
	var dst_len = document.getElementById('prefConversionDestLen');
	var instant_translation_key = document.getElementById('prefInstantTranslationKey');
	var instant_highlight_key = document.getElementById('prefInstantHighlightKey');
	var instant_conversion_key = document.getElementById('prefInstantConversionKey');
	var res = {
		// general
		prefBookmarkFolder: document.getElementById('prefBookmarkFolder').value,
		prefShowPopupOnly: document.getElementById('prefShowPopupOnly').checked,
		prefShowContextOnly: document.getElementById('prefShowContextOnly').checked,
		prefShowPopupContext: document.getElementById('prefShowPopupContext').checked,
		prefAutoCopy: document.getElementById('prefAutoCopy').checked,
		prefAutoCopyPlain: document.getElementById('prefAutoCopyPlain').checked,
		prefAllowACInTextBox: document.getElementById('prefAllowACInTextBox').checked,
		prefBlinkOnCopy: document.getElementById('prefBlinkOnCopy').checked,
		prefCountWords: document.getElementById('prefCountWords').checked,
		prefCtrlC: document.getElementById('prefCtrlC').checked,
		prefCtrlCPattern: document.getElementById('prefCtrlCPattern').value,
		prefOpenInNewTab: document.getElementById('prefOpenInNewTab').checked,
		prefOpenInBgTab: document.getElementById('prefOpenInBgTab').checked,
		prefOpenInCurrTab: document.getElementById('prefOpenInCurrTab').checked,
		prefReuseContainer: document.getElementById('prefReuseContainer').checked,
		prefFavDuck: document.getElementById('prefFavDuck').checked,
		prefFavGoogle: document.getElementById('prefFavGoogle').checked,
		prefEnableSelection: document.getElementById('prefEnableSelection').checked,
		// popup
		prefShowAsMenu: document.getElementById('prefShowAsMenu').checked,
		prefShowAsPanel: document.getElementById('prefShowAsPanel').checked,
		prefShowAsTranslation: document.getElementById('prefShowAsTranslation').checked,
		prefUnobtrusive: document.getElementById('prefUnobtrusive').checked,
		prefShowCopy: document.getElementById('prefShowCopy').checked,
		prefShowCopyPlain: document.getElementById('prefShowCopyPlain').checked,
		prefShowCopyHtml: document.getElementById('prefShowCopyHtml').checked,
		prefShowGoogleTranslate: document.getElementById('prefShowGoogleTranslate').checked,
		prefShowWordnikDictionary: document.getElementById('prefShowWordnikDictionary').checked,
		prefShowUrbanDictionary: document.getElementById('prefShowUrbanDictionary').checked,
		prefShowYandexTranslate: document.getElementById('prefShowYandexTranslate').checked,
		prefShowMsTranslator: document.getElementById('prefShowMsTranslator').checked,
		prefShowOpenUrl: document.getElementById('prefShowOpenUrl').checked,
		prefShowHighlight: document.getElementById('prefShowHighlight').checked,
		prefShowConvert: document.getElementById('prefShowConvert').checked,
		prefShowTrackingNumbers: document.getElementById('prefShowTrackingNumbers').checked,
		prefShowMailto: document.getElementById('prefShowMailto').checked,
		prefShowSearch: document.getElementById('prefShowSearch').checked,
		prefShowBookmarks: document.getElementById('prefShowBookmarks').checked,
		prefAllowInTextBox: document.getElementById('prefAllowInTextBox').checked,
		prefHideOnScroll: document.getElementById('prefHideOnScroll').checked,
		prefHideOnMoveMouseAway: document.getElementById('prefHideOnMoveMouseAway').checked,
		prefKeepSelection: document.getElementById('prefKeepSelection').checked,
		prefKeepPopup: document.getElementById('prefKeepPopup').checked,
		// translation
		prefTranslationDestLng: dst_lng.options[dst_lng.selectedIndex].value,
		prefTranslationSelectedLng: selected_lng.selected(),
		prefDefaultTranslator: def_trans.options[def_trans.selectedIndex].value,
		prefTranscriptionOwnLine: document.getElementById('prefTranscriptionOwnLine').checked,
		prefShortcutPageTranslate: document.getElementById('prefShortcutPageTranslate').value,
		prefInstantTranslationKey: instant_translation_key.options[instant_translation_key.selectedIndex].value,
		// highligher
		prefAutoSelectColors: document.getElementById('prefAutoSelectColors').checked,
		prefIgnorePunctuation: document.getElementById('prefIgnorePunctuation').checked,
		prefAutoHighlight: document.getElementById('prefAutoHighlight').checked,
		prefInstantHighlightKey: instant_highlight_key.options[instant_highlight_key.selectedIndex].value,
		// conversion
		prefConversionDestCur: dst_cur.options[dst_cur.selectedIndex].value,
		prefConversionDestTemp: dst_temp.options[dst_temp.selectedIndex].value,
		prefConversionDestMass: dst_mass.options[dst_mass.selectedIndex].value,
		prefConversionDestLen: dst_len.options[dst_len.selectedIndex].value,
		prefShortcutShowConverter: document.getElementById('prefShortcutShowConverter').value,
		prefInstantConversionKey: instant_conversion_key.options[instant_conversion_key.selectedIndex].value,
		// appearance - menu
		prefMenuFontSize: document.getElementById('prefMenuFontSize').value,
		prefMenuFontColor: document.getElementById('prefMenuFontColor').style.backgroundColor,
		prefMenuIconsColor: document.getElementById('prefMenuIconsColor').style.backgroundColor,
		prefMenuBkColor: document.getElementById('prefMenuBkColor').style.backgroundColor,
		// appearance - panel
		prefPanelItemsN: document.getElementById('prefPanelItemsN').value,
		prefPanelItemsNRows: document.getElementById('prefPanelItemsNRows').checked,
		prefPanelItemsNCols: document.getElementById('prefPanelItemsNCols').checked,
		prefPanelBkColor: document.getElementById('prefPanelBkColor').style.backgroundColor,
		prefPanelIconsColor: document.getElementById('prefPanelIconsColor').style.backgroundColor,
		prefPanelPadding: document.getElementById('prefPanelPadding').value,
		prefPanelRoundness: document.getElementById('prefPanelRoundness').value,
		prefPanelIconSize: document.getElementById('prefPanelIconSize').value,
		prefPanelIconPadding: document.getElementById('prefPanelIconPadding').value,
		// appearance - translation
		prefTranslationFontSize: document.getElementById('prefTranslationFontSize').value,
		prefTranslationFontColor: document.getElementById('prefTranslationFontColor').style.backgroundColor,
		prefTransIconsColor: document.getElementById('prefTransIconsColor').style.backgroundColor,
		prefTranslationBkColor: document.getElementById('prefTranslationBkColor').style.backgroundColor,
		prefTranslationBorderColor: document.getElementById('prefTranslationBorderColor').style.backgroundColor,
		prefTranslationLngColor: document.getElementById('prefTranslationLngColor').style.backgroundColor,
		prefTranslationEngineColor: document.getElementById('prefTranslationEngineColor').style.backgroundColor,
		// appearance - conversion
		prefConversionFontSize: document.getElementById('prefConversionFontSize').value,
		prefConversionFontColor: document.getElementById('prefConversionFontColor').style.backgroundColor,
		prefConversionIconsColor: document.getElementById('prefConversionIconsColor').style.backgroundColor,
		prefConversionBkColor: document.getElementById('prefConversionBkColor').style.backgroundColor,
		prefConversionBorderColor: document.getElementById('prefConversionBorderColor').style.backgroundColor,
		prefConversionConverterColor: document.getElementById('prefConversionConverterColor').style.backgroundColor,
		prefConversionUnitColor: document.getElementById('prefConversionUnitColor').style.backgroundColor
	}
	// highligher's colors
	for (var i = 0; i < 10; i++) {
		var bk_clr = 'prefBkColor_' + i, tx_clr = 'prefTxColor_' + i;
		res[bk_clr] = document.getElementById(bk_clr).style.backgroundColor;
		res[tx_clr] = document.getElementById(tx_clr).style.backgroundColor;
	}
	chrome.storage.local.set(res);

	var page = chrome.extension.getBackgroundPage();
	page.getBookmarkFolder();
	page.updateShortcuts();
	page.notification('\n' + chrome.i18n.getMessage('txtPrefSaved'));
}

function createColorElemHL(prefs, name, pos) {
	var elem = document.getElementById(name);
	elem.style.backgroundColor = prefs[name];
	var ondone = function (color) {
		elem.style.backgroundColor = color.rgbaString;
		var id = elem.id.split('_')[1];
		document.getElementById('prefText_' + id).src = cmn.getLetterIcon(String.fromCharCode(65 + Number(id)), document.getElementById('prefTxColor_' + id).style.backgroundColor, document.getElementById('prefBkColor_' + id).style.backgroundColor);
	};
	new Picker({ parent: elem, color: prefs[name], popup: pos, onDone: ondone });
}

function createColorElem(prefs, name, pos) {
	var elem = document.getElementById(name);
	elem.style.backgroundColor = prefs[name];
	var ondone = function (color) { elem.style.backgroundColor = color.rgbaString; };
	new Picker({ parent: elem, color: prefs[name], popup: pos, onDone: ondone });
}

function createSelectElem(name, obj, lst, def) {
	var dst = document.getElementById(name);
	for (var l in lst) {
		var elem = document.createElement('option');
		elem.textContent = obj.getDescription(l);
		elem.value = l;
		if (l == def) { elem.selected = true; }
		dst.appendChild(elem);
	}
}

function createMultiSelectElem(name, obj, lst, def) {
	var dst = document.getElementById(name);
	selected_lng = new SlimSelect({
		select: dst, limit: 10, showSearch: false
	})
	var data = [{ text: 'All', value: 'all' }];
	for (var l in lst) {
		data.push({ text: obj.getDescription(l), value: l })
	}
	selected_lng.setData(data);
	selected_lng.set(def);
}

function loadPrefs() {
	// localization
	var elems = document.getElementsByClassName('i18n');
	for (var elem of elems) {
		var keep = elem.textContent;
		elem.textContent = chrome.i18n.getMessage(elem.textContent);
		elem.textContent = elem.textContent == '' ? keep : elem.textContent;
	}

	if (cmn.isFirefox()) {
		document.getElementById('btnConfigureShortcuts').style.display = 'none';
	} else {
		document.getElementById('prefReuseContainer').style.display = 'none';
		document.getElementById('prefShowSearch').style.display = 'none';
		document.getElementById('prefShowSearchLbl').style.display = 'none';
		document.getElementById('prefPageTranslate').style.display = 'none';
		document.getElementById('prefShowConverter').style.display = 'none';
		document.getElementById('prefTitle').style.display = 'block';
		var elems = document.getElementsByClassName('ssk-hl-btn');
		for (var elem of elems) {
			elem.style.padding = '0';
		}
	}

	chrome.storage.local.get(null, function (prefs) {
		// general
		document.getElementById('prefBookmarkFolder').value = prefs.prefBookmarkFolder;
		document.getElementById('prefShowPopupOnly').checked = prefs.prefShowPopupOnly;
		document.getElementById('prefShowContextOnly').checked = prefs.prefShowContextOnly;
		document.getElementById('prefShowPopupContext').checked = prefs.prefShowPopupContext;
		document.getElementById('prefAutoCopy').checked = prefs.prefAutoCopy;
		document.getElementById('prefAutoCopyPlain').checked = prefs.prefAutoCopyPlain;
		document.getElementById('prefAllowACInTextBox').checked = prefs.prefAllowACInTextBox;
		document.getElementById('prefBlinkOnCopy').checked = prefs.prefBlinkOnCopy;
		document.getElementById('prefCountWords').checked = prefs.prefCountWords;
		document.getElementById('prefCtrlC').checked = prefs.prefCtrlC;
		document.getElementById('prefCtrlCPattern').value = prefs.prefCtrlCPattern;
		document.getElementById('prefOpenInNewTab').checked = prefs.prefOpenInNewTab;
		document.getElementById('prefOpenInBgTab').checked = prefs.prefOpenInBgTab;
		document.getElementById('prefOpenInCurrTab').checked = prefs.prefOpenInCurrTab;
		document.getElementById('prefReuseContainer').checked = prefs.prefReuseContainer;
		document.getElementById('prefFavDuck').checked = prefs.prefFavDuck;
		document.getElementById('prefFavGoogle').checked = prefs.prefFavGoogle;
		document.getElementById('prefEnableSelection').checked = prefs.prefEnableSelection;
		// popup
		document.getElementById('prefShowAsMenu').checked = prefs.prefShowAsMenu;
		document.getElementById('prefShowAsPanel').checked = prefs.prefShowAsPanel;
		document.getElementById('prefShowAsTranslation').checked = prefs.prefShowAsTranslation;
		document.getElementById('prefUnobtrusive').checked = prefs.prefUnobtrusive;
		document.getElementById('prefShowCopy').checked = prefs.prefShowCopy;
		document.getElementById('prefShowCopyPlain').checked = prefs.prefShowCopyPlain;
		document.getElementById('prefShowCopyHtml').checked = prefs.prefShowCopyHtml;
		document.getElementById('prefShowGoogleTranslate').checked = prefs.prefShowGoogleTranslate;
		document.getElementById('prefShowWordnikDictionary').checked = prefs.prefShowWordnikDictionary;
		document.getElementById('prefShowUrbanDictionary').checked = prefs.prefShowUrbanDictionary;
		document.getElementById('prefShowYandexTranslate').checked = prefs.prefShowYandexTranslate;
		document.getElementById('prefShowMsTranslator').checked = prefs.prefShowMsTranslator;
		document.getElementById('prefShowOpenUrl').checked = prefs.prefShowOpenUrl;
		document.getElementById('prefShowHighlight').checked = prefs.prefShowHighlight;
		document.getElementById('prefShowConvert').checked = prefs.prefShowConvert;
		document.getElementById('prefShowTrackingNumbers').checked = prefs.prefShowTrackingNumbers;
		document.getElementById('prefShowMailto').checked = prefs.prefShowMailto;
		document.getElementById('prefShowSearch').checked = prefs.prefShowSearch;
		document.getElementById('prefShowBookmarks').checked = prefs.prefShowBookmarks;
		document.getElementById('prefAllowInTextBox').checked = prefs.prefAllowInTextBox;
		document.getElementById('prefHideOnScroll').checked = prefs.prefHideOnScroll;
		document.getElementById('prefHideOnMoveMouseAway').checked = prefs.prefHideOnMoveMouseAway;
		document.getElementById('prefKeepSelection').checked = prefs.prefKeepSelection;
		document.getElementById('prefKeepPopup').checked = prefs.prefKeepPopup;
		// translation
		createSelectElem('prefTranslationDestLng', const_lng, const_lng.L, prefs.prefTranslationDestLng);
		createMultiSelectElem('prefTranslationSelectedLng', const_lng, const_lng.L, prefs.prefTranslationSelectedLng);
		createSelectElem('prefTranslationDefTrans', const_def_trans, const_def_trans.T, prefs.prefDefaultTranslator);
		document.getElementById('prefTranscriptionOwnLine').checked = prefs.prefTranscriptionOwnLine;
		document.getElementById('prefShortcutPageTranslate').value = prefs.prefShortcutPageTranslate;
		// highligher
		document.getElementById('prefAutoSelectColors').checked = prefs.prefAutoSelectColors;
		document.getElementById('prefIgnorePunctuation').checked = prefs.prefIgnorePunctuation;
		document.getElementById('prefAutoHighlight').checked = prefs.prefAutoHighlight;
		// highligher's colors
		for (var i = 0; i < 10; i++) {
			var bk_clr = 'prefBkColor_' + i, tx = 'prefText_' + i, tx_clr = 'prefTxColor_' + i;
			var pos = [0, 1, 2, 5, 6, 7].indexOf(i) > -1 ? 'top' : cmn.isFirefox() ? 'left' : 'top';
			createColorElemHL(prefs, bk_clr, pos);
			createColorElemHL(prefs, tx_clr, pos);
			document.getElementById(tx).src = cmn.getLetterIcon(String.fromCharCode(65 + i), prefs[tx_clr], prefs[bk_clr]);
		}
		// conversion
		createSelectElem('prefConversionDestCur', const_cur, const_cur.C, prefs.prefConversionDestCur);
		createSelectElem('prefConversionDestTemp', const_temp, const_temp.T, prefs.prefConversionDestTemp);
		createSelectElem('prefConversionDestMass', const_mass, const_mass.M, prefs.prefConversionDestMass);
		createSelectElem('prefConversionDestLen', const_len, const_len.L, prefs.prefConversionDestLen);
		document.getElementById('prefShortcutShowConverter').value = prefs.prefShortcutShowConverter;
		// appearance - menu
		document.getElementById('prefMenuFontSize').value = prefs.prefMenuFontSize;
		createColorElem(prefs, 'prefMenuFontColor', 'top');
		createColorElem(prefs, 'prefMenuIconsColor', 'left');
		createColorElem(prefs, 'prefMenuBkColor', 'top');
		// appearance - panel
		document.getElementById('prefPanelItemsN').value = prefs.prefPanelItemsN;
		document.getElementById('prefPanelItemsNRows').checked = prefs.prefPanelItemsNRows;
		document.getElementById('prefPanelItemsNCols').checked = prefs.prefPanelItemsNCols;
		createColorElem(prefs, 'prefPanelBkColor', cmn.isFirefox() ? 'left' : 'top');
		createColorElem(prefs, 'prefPanelIconsColor', 'left');
		document.getElementById('prefPanelPadding').value = prefs.prefPanelPadding;
		document.getElementById('prefPanelRoundness').value = prefs.prefPanelRoundness;
		document.getElementById('prefPanelIconSize').value = prefs.prefPanelIconSize;
		document.getElementById('prefPanelIconPadding').value = prefs.prefPanelIconPadding;
		// appearance - translation
		document.getElementById('prefTranslationFontSize').value = prefs.prefTranslationFontSize;
		createColorElem(prefs, 'prefTranslationFontColor', 'top');
		createColorElem(prefs, 'prefTransIconsColor', 'left');
		createColorElem(prefs, 'prefTranslationBkColor', 'top');
		createColorElem(prefs, 'prefTranslationBorderColor', 'top');
		createColorElem(prefs, 'prefTranslationLngColor', 'top');
		createColorElem(prefs, 'prefTranslationEngineColor', 'top');
		// appearance - conversion
		document.getElementById('prefConversionFontSize').value = prefs.prefConversionFontSize;
		createColorElem(prefs, 'prefConversionFontColor', 'top');
		createColorElem(prefs, 'prefConversionIconsColor', 'left');
		createColorElem(prefs, 'prefConversionBkColor', 'top');
		createColorElem(prefs, 'prefConversionBorderColor', 'top');
		createColorElem(prefs, 'prefConversionConverterColor', 'top');
		createColorElem(prefs, 'prefConversionUnitColor', 'top');
		// search API was introduced in version 63, non-firefox browsers will always have ffVersion=0
		if (prefs.ffVersion < 63) {
			document.getElementById('prefShowSearch').style.display = 'none';
			document.getElementById('prefShowSearchLbl').style.display = 'none';
		}
		// instant keys
		createSelectElem('prefInstantTranslationKey', const_keys, const_keys.K, prefs.prefInstantTranslationKey);
		createSelectElem('prefInstantHighlightKey', const_keys, const_keys.K, prefs.prefInstantHighlightKey);
		createSelectElem('prefInstantConversionKey', const_keys, const_keys.K, prefs.prefInstantConversionKey);
	});
}

function restorePrefs(e) {
	alerty.confirm(chrome.i18n.getMessage('txtPrefRestorePrefsQ'), { title: 'SelectionSK', cancelLabel: chrome.i18n.getMessage('txtCancel'), okLabel: chrome.i18n.getMessage('txtOK') },
		function () {
			chrome.storage.local.get(null, function (prefs) {
				var page = chrome.extension.getBackgroundPage();
				prefs = page.getDefaultPrefs({ ffVersion: prefs.ffVersion });
				chrome.storage.local.set(prefs);
				loadPrefs();
			});
		},
		function () { }
	)
}

chrome.management.getSelf(function (info) {
	document.getElementById('prefTitleTxt').textContent = '{0} {1}'._format(info.name, info.version);
});

document.addEventListener('DOMContentLoaded', loadPrefs);
document.querySelector('form').addEventListener('submit', savePrefs);
document.getElementById('btnConfigureShortcuts').addEventListener('click', function () { chrome.tabs.create({ url: 'chrome://extensions/configureCommands' }); });
document.getElementById('btnRestorePrefs').addEventListener('click', restorePrefs);
document.getElementById('btnRestoreBookmarks').addEventListener('click', function () { cmn.prefsRestoreBookmarks('SelectionSK'); });
document.getElementById('btnBackupToFile').addEventListener('click', function () { cmn.prefsBackupToFile('SelectionSK', ['prefAutoMark', 'prefTkk', 'ffVersion']); });
document.getElementById('prefSelectedFile').addEventListener('input', cmn.prefsFileSelected);
document.getElementById('btnRestoreFromFile').addEventListener('click', function () { document.getElementById('prefSelectedFile').click(); });
