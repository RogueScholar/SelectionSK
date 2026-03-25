/**
 * SPDX-FileCopyrightText: © 2011–2023, Andrey Shemetov <ashemetov@gmail.com>
 *
 * SPDX-License-Identifier: MPL-2.0 OR GPL-3.0-or-later OR LGPL-3.0-or-later
 */
/**
 * Supported languages by Google Translate:
 *   <https://cloud.google.com/translate/docs/languages>
 * Supported languages by Microsoft Bing Translate:
 *   <https://api.cognitive.microsofttranslator.com/languages?api-version=3.0>
 * Supported languages by Yandex Translate:
 *   <https://yandex.com/dev/translate/doc/dg/concepts/api-overview.html#api-overview__languages>
 * English Wikipedia language name reference:
 *   <https://en.wikipedia.org/wiki/List_of_language_names>
 */
var const_lng = {
  L: {
    'af': {name: 'Afrikaans', native_name: '', gt: true, y: true, ms: true},
    'sq': {name: 'Albanian', native_name: 'Shqip', gt: true, y: true, ms: true},
    'am': {name: 'Amharic', native_name: 'ኣማርኛ', gt: true, y: true, ms: true},
    'ar': {name: 'Arabic', native_name: 'العربية', gt: true, y: true, ms: true},
    'as': {
      name: 'Assamese',
      native_name: 'অসমীয়া',
      gt: false,
      y: false,
      ms: true
    },
    'hy': {
      name: 'Armenian',
      native_name: 'Հայերեն',
      gt: true,
      y: true,
      ms: true
    },
    'az': {
      name: 'Azerbaijani',
      native_name: 'Azərbaycan',
      gt: true,
      y: true,
      ms: true
    },
    'ba': {
      name: 'Bashkir',
      native_name: 'Başqort Tele',
      gt: false,
      y: true,
      ms: true
    },
    'eu': {
      name: 'Basque',
      native_name: 'Euskera',
      gt: true,
      y: true,
      ms: false
    },
    'be': {
      name: 'Belarusian',
      native_name: 'Беларуская',
      gt: true,
      y: true,
      ms: false
    },
    'bn': {
      name: 'Bengali',
      native_name: 'বাঙ্গালী',
      gt: true,
      y: true,
      ms: true
    },
    'bs': {
      name: 'Bosnian',
      native_name: 'Босански',
      gt: true,
      y: true,
      ms: true
    },
    'bg': {
      name: 'Bulgarian',
      native_name: 'Български',
      gt: true,
      y: true,
      ms: true
    },
    'yue': {
      name: 'Cantonese (Traditional)',
      native_name: '粵語 (繁體中文)',
      gt: false,
      y: false,
      ms: true
    },
    'ca': {name: 'Catalan', native_name: 'Català', gt: true, y: true, ms: true},
    'ceb': {
      name: 'Cebuano',
      native_name: 'Sinugboanon',
      gt: true,
      y: true,
      ms: false
    },
    'zh-CN': {
      name: 'Chinese Simplified',
      native_name: '简体中文',
      gt: true,
      y: true,
      ms: true
    },
    'zh-TW': {
      name: 'Chinese Traditional',
      native_name: '繁體中文',
      gt: true,
      y: false,
      ms: true
    },
    'lzh': {
      name: 'Chinese (Literary)',
      native_name: '中文 (文言文)',
      gt: false,
      y: false,
      ms: true
    },
    'co': {
      name: 'Corsican',
      native_name: 'Corsu',
      gt: true,
      y: true,
      ms: false
    },
    'hr': {
      name: 'Croatian',
      native_name: 'Hrvatski',
      gt: true,
      y: true,
      ms: true
    },
    'cs': {name: 'Czech', native_name: 'Čeština', gt: true, y: true, ms: true},
    'da': {name: 'Danish', native_name: 'Dansk', gt: true, y: true, ms: true},
    'prs': {
      name: 'Dari',
      native_name: 'فارسی, دری, دريلو',
      gt: false,
      y: false,
      ms: true
    },
    'dv': {
      name: 'Divehi',
      native_name: 'ދިވެހިބަސް',
      gt: false,
      y: false,
      ms: true
    },
    'nl': {
      name: 'Dutch',
      native_name: 'Nederlands',
      gt: true,
      y: true,
      ms: true
    },
    'en': {name: 'English', native_name: '', gt: true, y: true, ms: true},
    'eo': {
      name: 'Esperanto',
      native_name: 'Esperantaj',
      gt: true,
      y: true,
      ms: false
    },
    'et': {name: 'Estonian', native_name: 'Eesti', gt: true, y: true, ms: true},
    'fi': {name: 'Finnish', native_name: 'Suomi', gt: true, y: true, ms: true},
    'fil': {
      name: 'Filipino',
      native_name: 'Wikang Filipino',
      gt: false,
      y: false,
      ms: true
    },
    'fj': {
      name: 'Fijian',
      native_name: 'Vakaviti',
      gt: false,
      y: false,
      ms: true
    },
    'fy': {
      name: 'Frisian',
      native_name: 'Frysk',
      gt: true,
      y: false,
      ms: false
    },
    'fr': {
      name: 'French',
      native_name: 'Français',
      gt: true,
      y: true,
      ms: true
    },
    'fr-CA': {
      name: 'French (Canada)',
      native_name: 'Français (Canada)',
      gt: false,
      y: false,
      ms: true
    },
    'fy': {name: 'Frisian', native_name: 'Frysk', gt: true, y: true, ms: false},
    'gl': {
      name: 'Galician',
      native_name: 'Galego',
      gt: true,
      y: true,
      ms: false
    },
    'ka': {
      name: 'Georgian',
      native_name: 'საქართველოს',
      gt: true,
      y: true,
      ms: true
    },
    'de': {name: 'German', native_name: 'Deutsch', gt: true, y: true, ms: true},
    'el': {name: 'Greek', native_name: 'Ελληνικά', gt: true, y: true, ms: true},
    'gu': {
      name: 'Gujarati',
      native_name: 'ગુજરાતી',
      gt: true,
      y: true,
      ms: true
    },
    'ht': {
      name: 'Haitian Creole',
      native_name: 'Kreyòl ayisyen',
      gt: true,
      y: true,
      ms: true
    },
    'ha': {name: 'Hausa', native_name: 'حَوْسَ', gt: true, y: true, ms: false},
    'haw': {
      name: 'Hawaiian',
      native_name: 'ʻŌlelo Hawaiʻi',
      gt: true,
      y: true,
      ms: false
    },
    'he': {name: 'Hebrew', native_name: 'עברית', gt: true, y: true, ms: true},
    'mrj': {
      name: 'Hill Mari',
      native_name: 'Мары йӹлмӹ',
      gt: false,
      y: true,
      ms: false
    },
    'hi': {name: 'Hindi', native_name: 'हिंदी', gt: true, y: true, ms: true},
    'hmn': {
      name: 'Hmong',
      native_name: 'lol Hmongb',
      gt: true,
      y: true,
      ms: false
    },
    'hu': {
      name: 'Hungarian',
      native_name: 'Magyar',
      gt: true,
      y: true,
      ms: true
    },
    'is': {
      name: 'Icelandic',
      native_name: 'Íslenska',
      gt: true,
      y: true,
      ms: true
    },
    'ig': {
      name: 'Igbo',
      native_name: 'Asụsụ Igbo',
      gt: true,
      y: true,
      ms: false
    },
    'id': {
      name: 'Indonesian',
      native_name: 'Bahasa indonesia',
      gt: true,
      y: true,
      ms: true
    },
    'iu': {
      name: 'Inuktitut',
      native_name: 'ᐃᓄᒃᑎᑐᑦ',
      gt: false,
      y: false,
      ms: true
    },
    'ga': {name: 'Irish', native_name: 'Gaeilge', gt: true, y: true, ms: true},
    'it': {
      name: 'Italian',
      native_name: 'Italiano',
      gt: true,
      y: true,
      ms: true
    },
    'ja': {
      name: 'Japanese',
      native_name: '日本語',
      gt: true,
      y: true,
      ms: true
    },
    'jw': {name: 'Javanese', native_name: '', gt: true, y: true, ms: false},
    'kn': {name: 'Kannada', native_name: 'ಕನ್ನಡ', gt: true, y: true, ms: true},
    'kk': {
      name: 'Kazakh',
      native_name: 'Қазақ Tілі',
      gt: true,
      y: true,
      ms: true
    },
    'km': {
      name: 'Khmer',
      native_name: 'ភាសាខ្មែរ',
      gt: true,
      y: true,
      ms: true
    },
    'rw': {name: 'Kinyarwanda', native_name: '', gt: true, y: false, ms: false},
    'tlh-Latn': {
      name: 'Klingon (Latin)',
      native_name: '',
      gt: false,
      y: false,
      ms: true
    },
    'tlh-Piqd': {
      name: 'Klingon (pIqaD)',
      native_name: '',
      gt: false,
      y: false,
      ms: true
    },
    'ku': {
      name: 'Kurdish (Central)',
      native_name: 'Kurdî (Navîn)',
      gt: true,
      y: false,
      ms: true
    },
    'kmr': {
      name: 'Kurdish (Northern)',
      native_name: '',
      gt: false,
      y: false,
      ms: true
    },
    'ko': {name: 'Korean', native_name: '한국어', gt: true, y: true, ms: true},
    'ku': {name: 'Kurdish', native_name: 'کوردی', gt: true, y: true, ms: true},
    'ky': {
      name: 'Kyrgyz',
      native_name: 'Кыргызча',
      gt: true,
      y: true,
      ms: true
    },
    'lo': {name: 'Lao', native_name: 'ພາສາລາວ', gt: true, y: true, ms: true},
    'la': {name: 'Latin', native_name: 'Latinus', gt: true, y: true, ms: false},
    'lv': {
      name: 'Latvian',
      native_name: 'Latviešu',
      gt: true,
      y: true,
      ms: true
    },
    'lt': {
      name: 'Lithuanian',
      native_name: 'Lietuviškai',
      gt: true,
      y: true,
      ms: true
    },
    'lb': {
      name: 'Luxembourgish',
      native_name: 'Lèmburgs',
      gt: true,
      y: true,
      ms: false
    },
    'mhr': {
      name: 'Mari',
      native_name: 'Марий йылме',
      gt: false,
      y: true,
      ms: false
    },
    'mk': {
      name: 'Macedonian',
      native_name: 'Македонски',
      gt: true,
      y: true,
      ms: true
    },
    'mg': {name: 'Malagasy', native_name: '', gt: true, y: true, ms: true},
    'ms': {
      name: 'Malay',
      native_name: 'Bahasa melayu',
      gt: true,
      y: true,
      ms: true
    },
    'ml': {
      name: 'Malayalam',
      native_name: 'മലയാളം',
      gt: true,
      y: true,
      ms: true
    },
    'mt': {name: 'Maltese', native_name: 'Malti', gt: true, y: true, ms: true},
    'mi': {
      name: 'Maori',
      native_name: 'te Reo Māori',
      gt: true,
      y: true,
      ms: true
    },
    'mr': {name: 'Marathi', native_name: 'मराठी', gt: true, y: true, ms: true},
    'mn': {
      name: 'Mongolian',
      native_name: 'ᠮᠣᠨᠭᠭᠣᠯ ᠬᠡᠯᠡ',
      gt: true,
      y: true,
      ms: true
    },
    'my': {
      name: 'Myanmar',
      native_name: 'Burmese',
      gt: true,
      y: true,
      ms: true
    },
    'mww': {name: 'Hmong Daw', native_name: '', gt: false, y: false, ms: true},
    'ne': {name: 'Nepali', native_name: 'नेपाली', gt: true, y: true, ms: true},
    'no': {
      name: 'Norwegian',
      native_name: 'Norsk',
      gt: true,
      y: true,
      ms: true
    },
    'ny': {
      name: 'Nyanja',
      native_name: 'Chichewa',
      gt: true,
      y: true,
      ms: false
    },
    'or': {name: 'Odia', native_name: 'ଓଡ଼ିଆ', gt: true, y: false, ms: true},
    'pap': {name: 'Papiamento', native_name: '', gt: false, y: true, ms: false},
    'ps': {name: 'Pashto', native_name: 'پښتو', gt: true, y: true, ms: true},
    'fa': {name: 'Persian', native_name: 'فارسی', gt: true, y: true, ms: true},
    'pl': {name: 'Polish', native_name: 'Polski', gt: true, y: true, ms: true},
    'pt': {
      name: 'Portuguese (Brazil)',
      native_name: 'Português (Brazil)',
      gt: true,
      y: true,
      ms: true
    },
    'pt-PT': {
      name: 'Portuguese (Portugal)',
      native_name: 'Português (Portugal)',
      gt: false,
      y: false,
      ms: true
    },
    'pa': {name: 'Punjabi', native_name: 'पंजाबी', gt: true, y: true, ms: true},
    'otq': {
      name: 'Querétaro Otomi',
      native_name: '',
      gt: false,
      y: false,
      ms: true
    },
    'ro': {
      name: 'Romanian',
      native_name: 'Română',
      gt: true,
      y: true,
      ms: true
    },
    'ru': {
      name: 'Russian',
      native_name: 'Русский',
      gt: true,
      y: true,
      ms: true
    },
    'sm': {
      name: 'Samoan',
      native_name: 'Gagana Sāmoa',
      gt: true,
      y: true,
      ms: true
    },
    'gd': {
      name: 'Scots Gaelic',
      native_name: 'Gàidhlig',
      gt: true,
      y: true,
      ms: false
    },
    'sr': {name: 'Serbian', native_name: 'Српски', gt: true, y: true, ms: true},
    'sr-Latn': {
      name: 'Serbian',
      native_name: 'Srpski (latinica)',
      gt: false,
      y: false,
      ms: true
    },
    'st': {name: 'Sesotho', native_name: '', gt: true, y: true, ms: false},
    'sn': {name: 'Shona', native_name: '', gt: true, y: true, ms: false},
    'sd': {name: 'Sindhi', native_name: 'سنڌي', gt: true, y: true, ms: false},
    'si': {
      name: 'Sinhala',
      native_name: 'Sinhalese',
      gt: true,
      y: true,
      ms: false
    },
    'sk': {
      name: 'Slovak',
      native_name: 'Slovenčina',
      gt: true,
      y: true,
      ms: true
    },
    'sl': {
      name: 'Slovenian',
      native_name: 'Slovenščina',
      gt: true,
      y: true,
      ms: true
    },
    'so': {
      name: 'Somali',
      native_name: 'اللغة الصومالية',
      gt: true,
      y: true,
      ms: false
    },
    'es': {
      name: 'Spanish',
      native_name: 'Español',
      gt: true,
      y: true,
      ms: true
    },
    'su': {name: 'Sundanese', native_name: '', gt: true, y: true, ms: false},
    'sw': {
      name: 'Swahili',
      native_name: 'Kiswahili',
      gt: true,
      y: true,
      ms: true
    },
    'sv': {
      name: 'Swedish',
      native_name: 'Svenska',
      gt: true,
      y: true,
      ms: true
    },
    'tl': {
      name: 'Tagalog',
      native_name: 'Filipino',
      gt: true,
      y: true,
      ms: false
    },
    'ty': {name: 'Tahitian', native_name: '', gt: false, y: false, ms: true},
    'tg': {
      name: 'Tajik',
      native_name: 'Забони тоҷикӣ',
      gt: true,
      y: true,
      ms: false
    },
    'ta': {name: 'Tamil', native_name: 'தமிழ்', gt: true, y: true, ms: true},
    'tt': {name: 'Tatar', native_name: 'Tatarça', gt: true, y: true, ms: true},
    'te': {name: 'Telugu', native_name: 'తెలుగు', gt: true, y: true, ms: true},
    'th': {name: 'Thai', native_name: 'ภาษาไทย', gt: true, y: true, ms: true},
    'bo': {
      name: 'Tibetan',
      native_name: 'བོད་སྐད་',
      gt: false,
      y: false,
      ms: true
    },
    'ti': {name: 'Tigrinya', native_name: 'ትግር', gt: false, y: false, ms: true},
    'to': {
      name: 'Tongan',
      native_name: 'Lea fakatonga',
      gt: false,
      y: false,
      ms: true
    },
    'tr': {name: 'Turkish', native_name: 'Tϋrkçe', gt: true, y: true, ms: true},
    'tk': {
      name: 'Turkmen',
      native_name: 'Türkmençe',
      gt: true,
      y: false,
      ms: true
    },
    'udm': {
      name: 'Udmurt',
      native_name: 'Удмурт кыл',
      gt: false,
      y: true,
      ms: false
    },
    'uk': {
      name: 'Ukrainian',
      native_name: 'Українська',
      gt: true,
      y: true,
      ms: true
    },
    'ur': {name: 'Urdu', native_name: 'اُردُو', gt: true, y: true, ms: true},
    'ug': {
      name: 'Uyghur',
      native_name: 'ئۇيغۇر تىلى',
      gt: true,
      y: false,
      ms: true
    },
    'uz': {name: 'Uzbek', native_name: 'اوزبیک', gt: true, y: true, ms: true},
    'vi': {
      name: 'Vietnamese',
      native_name: 'Tiếng Việt',
      gt: true,
      y: true,
      ms: true
    },
    'cy': {name: 'Welsh', native_name: 'Cymraeg', gt: true, y: true, ms: true},
    'xh': {
      name: 'Xhosa',
      native_name: 'isiXhosa',
      gt: true,
      y: true,
      ms: false
    },
    'yi': {name: 'Yiddish', native_name: 'יידיש', gt: true, y: true, ms: false},
    'yo': {
      name: 'Yoruba',
      native_name: 'Èdè Yorùbá',
      gt: true,
      y: true,
      ms: false
    },
    'yua': {
      name: 'Yucatec Maya',
      native_name: '',
      gt: false,
      y: false,
      ms: true
    },
    'zu': {name: 'Zulu', native_name: 'Shiwi’ma', gt: true, y: false, ms: false}
  },

  Override: {
    // ms
    'zh-Hans': 'zh-CN',
    'zh-Hant': 'zh-TW',
    'mn-Mong': 'mn',
    'nb': 'no',
    'sr-Cyrl': 'sr',
    // y
    'zh': 'zh-CN'
  },

  getName: function (lng_code) {
    var lng =
      const_lng.L[
        lng_code in const_lng.Override ? Override[lng_code] : lng_code
      ];
    return lng ? lng.name : lng_code;
  },

  getNativeName: function (lng_code) {
    var lng =
      const_lng.L[
        lng_code in const_lng.Override ? Override[lng_code] : lng_code
      ];
    return (
      lng ?
        lng.native_name ?
          lng.native_name
        : lng.name
      : lng_code
    );
  },

  getDescription: function (lng_code) {
    var lng =
      const_lng.L[
        lng_code in const_lng.Override ? Override[lng_code] : lng_code
      ];
    return (
      lng ?
        lng.native_name ?
          '{0} ({1})'._format(lng.name, lng.native_name)
        : lng.name
      : lng_code
    );
  },

  getShortDescription: function (lng_code) {
    var lng =
      const_lng.L[
        lng_code in const_lng.Override ? Override[lng_code] : lng_code
      ];
    return (
      lng ?
        lng.native_name ?
          '{0} ({1})'._format(lng.name, lng.native_name)
        : ''
      : ''
    );
  },

  isSupported: function (lng_code, engine, supported_lng) {
    lng_code = lng_code in const_lng.Override ? Override[lng_code] : lng_code;
    var lng = const_lng.L[lng_code];
    return (
      lng ?
        supported_lng.includes('all') || supported_lng.includes(lng_code) ?
          engine in lng ?
            lng[engine]
          : false
        : false
      : false
    );
  }
};

var const_def_trans = {
  T: {
    g: chrome.i18n.getMessage('txtGoogleTranslate'),
    y: chrome.i18n.getMessage('txtYandexTranslate'),
    m: chrome.i18n.getMessage('txtMsTranslator')
  },

  getDescription: function (key_code) {
    var key = const_def_trans.T[key_code];
    return key ? key : key_code;
  }
};

var const_keys = {
  K: {
    None: 'None',
    ControlLeftControlRight: 'Ctrl',
    ControlLeft: 'Left Ctrl',
    ControlRight: 'Right Ctrl',
    ShiftLeftShiftRight: 'Shift',
    ShiftLeft: 'Left Shift',
    ShiftRight: 'Right Shift',
    AltLeftAltRight: 'Alt',
    AltLeft: 'Left Alt',
    AltRight: 'Right Alt'
    // 'OSLeftOSRight':		'OS Key',
    // 'OSLeft':			'OS Left Key',
    // 'OSRight':			'OS Right Key'
  },

  getDescription: function (key_code) {
    var key = const_keys.K[key_code];
    return key ? key : key_code;
  }
};

/**
 * English Wikipedia currency symbol reference:
 *   <https://en.wikipedia.org/wiki/Currency_symbol>
 * <https://www.geoplugin.com/iso4217>
 * API for exchange rates published by the European Central Bank:
 *   <https://exchangeratesapi.io/>
 * Free API allowing 100 requests per hour, including Bitcoin prices:
 *   <https://www.currencyconverterapi.com/>
 * <https://api.forex/>
 * <https://www.cryptocompare.com/>
 */

var const_cur = {
  C: {
    AUD: {name: 'Australian dollar', symbols: ['A$', 'AUD']}, // $
    BTC: {name: 'Bitcoin', symbols: ['₿', 'BTC', 'XBT']}, // crypto
    BCH: {name: 'Bitcoin Cash', symbols: ['BCH']}, // crypto
    BRL: {name: 'Brazilian real', symbols: ['R$', 'BRL']},
    BGN: {name: 'Bulgarian lev', symbols: ['лв', 'BGN']},
    CAD: {name: 'Canadian dollar', symbols: ['C$', 'CA$', 'Can$', 'CAD']}, // $
    CNY: {name: 'Chinese yuan', symbols: ['¥', 'RMB', 'CNY']},
    // 'CNH':	{'name':'Chinese yuan renminbi',	'symbols':['¥', 'CNH']},
    HRK: {name: 'Croatian kuna', symbols: ['kn', 'HRK']},
    CZK: {name: 'Czech koruna', symbols: ['Kč', 'CZK']},
    DKK: {name: 'Danish krone', symbols: ['DKK']}, // kr
    DSH: {name: 'Dash', symbols: ['DSH']}, // crypto
    DOGE: {name: 'Dogecoin', symbols: ['Ð', 'DOGE']}, // crypto
    DOP: {name: 'Dominican Peso', symbols: ['RD$', 'DOP']},
    ETH: {name: 'Ethereum', symbols: ['Ξ', 'ETH']}, // crypto
    EUR: {name: 'Euro', symbols: ['€', 'EUR', 'Euro']},
    XAU: {name: 'Gold (troy ounce)', symbols: ['t oz', 'oz t', 'XAU']},
    HKD: {name: 'Hong Kong dollar', symbols: ['元', 'HK$', 'HKD']}, // $
    HUF: {name: 'Hungarian forint', symbols: ['Ft', 'HUF']},
    ISK: {name: 'Icelandic krona', symbols: ['ISK']}, // kr
    INR: {name: 'Indian rupee', symbols: ['₹', 'INR']},
    IDR: {name: 'Indonesian rupiah', symbols: ['Rp', 'IDR']},
    ILS: {name: 'Israeli shekel', symbols: ['₪', 'ILS']},
    JPY: {name: 'Japanese yen', symbols: ['円', 'JPY']}, // ¥
    LTC: {name: 'Litecoin', symbols: ['Ł', 'LTC']}, // crypto
    MYR: {name: 'Malaysian ringgit', symbols: ['RM', 'MYR']},
    MXN: {name: 'Mexican peso', symbols: ['MX$', 'Mex$', 'MXN']}, // $
    NEO: {name: 'NEO', symbols: ['NEO']}, // crypto
    NZD: {name: 'New Zealand dollar', symbols: ['NZ$', 'NZD']}, // $
    NOK: {name: 'Norwegian krone', symbols: ['NOK']}, // kr
    XPD: {name: 'Palladium (troy ounce)', symbols: ['XPD']},
    PHP: {name: 'Philippine peso', symbols: ['₱', 'PHP']},
    // 'XPT':	{'name':'Platinum (troy ounce)',		'symbols':['XPT']},
    PLN: {name: 'Polish zloty', symbols: ['zł', 'PLN']},
    GBP: {name: 'Pound sterling', symbols: ['£', 'GBP']},
    XRP: {name: 'Ripple', symbols: ['XRP']}, // crypto
    RON: {name: 'Romanian leu', symbols: ['lei', 'RON']},
    RUB: {name: 'Russian rouble', symbols: ['₽', 'руб', 'RUB']},
    // 'XAG':	{'name':'Silver (troy ounce)',		'symbols':['XAG']},
    SGD: {name: 'Singapore dollar', symbols: ['S$', 'SG$', 'SGD']}, // $
    ZAR: {name: 'South African rand', symbols: ['ZAR']}, // R
    KRW: {name: 'South Korean won', symbols: ['₩', 'KRW']},
    SEK: {name: 'Swedish krona', symbols: ['kr']},
    CHF: {name: 'Swiss franc', symbols: ['₣', 'SFr', 'CHF']},
    THB: {name: 'Thai baht', symbols: ['฿', 'THB']},
    TRY: {name: 'Turkish lira', symbols: ['₺', 'TRY']},
    UAH: {name: 'Ukrainian hryvnia', symbols: ['₴', 'грн', 'UAH']},
    USD: {name: 'US dollar', symbols: ['$', 'US$', 'USD']}
  },

  getDescription: function (cur_code) {
    var cur = const_cur.C[cur_code];
    return cur ? '{0} ({1})'._format(cur.name, cur_code) : cur_code;
  },

  hasSymbol: function (txt) {
    for (var cur_code in const_cur.C) {
      for (var i = 0; i < const_cur.C[cur_code].symbols.length; i++) {
        var symbol = const_cur.C[cur_code].symbols[i];
        if (symbol != '' && txt.indexOf(symbol) != -1) {
          return cur_code;
        }
      }
    }
    return '';
  }
};

var const_temp = {
  T: {
    C: {name: 'Celsius', symbols: ['°C', 'градус']},
    F: {name: 'Fahrenheit', symbols: ['°F']},
    K: {name: 'Kelvin', symbols: []}
  },

  getDescription: function (temp_code) {
    var temp = const_temp.T[temp_code];
    return temp ? temp.name : temp_code;
  },

  hasSymbol: function (txt) {
    for (var temp in const_temp.T) {
      for (var i = 0; i < const_temp.T[temp].symbols.length; i++) {
        var symbol = const_temp.T[temp].symbols[i];
        if (symbol != '' && txt.indexOf(symbol) != -1) {
          return temp;
        }
      }
    }
    return '';
  }
};

var const_mass = {
  M: {
    'KG_1000': {
      name: 'Metric ton',
      symbols: ['Mg', 'ton', 'tonne', 'тонн', '公噸']
    },
    'KG_1': {
      name: 'Kilogram',
      symbols: ['kg', 'кг', 'kilogram', 'килограмм', '千克']
    },
    'KG_0.001': {name: 'Gram', symbols: ['gram', 'gramme', 'грамм', '克']},
    'KG_0.000001': {
      name: 'Milligram',
      symbols: ['mg', 'мг', 'milligram', 'milligramme', 'миллиграмм', '发音']
    },
    'P_2240': {name: 'Imperial ton', symbols: []},
    'P_2000': {name: 'US ton', symbols: []},
    'P_14': {name: 'Stone', symbols: ['st.', 'stone', '英石']},
    'P_1': {name: 'Pound', symbols: ['lb', '℔', 'pound', 'фунт', '磅']},
    'P_0.0625': {name: 'Ounce', symbols: ['oz', '℥', 'ounce', 'унци', '盎司']}
  },

  getDescription: function (mass_code) {
    var mass = const_mass.M[mass_code];
    return mass ? mass.name : mass_code;
  },

  hasSymbol: function (txt) {
    for (var mass in const_mass.M) {
      for (var i = 0; i < const_mass.M[mass].symbols.length; i++) {
        var symbol = const_mass.M[mass].symbols[i];
        if (symbol != '' && txt.indexOf(symbol) != -1) {
          return mass;
        }
      }
    }
    return '';
  }
};

var const_len = {
  L: {
    'M_1852': {name: 'Nautical mile', symbols: ['NM', 'nmi', '海里']},
    'M_1000': {
      name: 'Kilometer',
      symbols: ['km', 'kilometer', 'kilometre', '㎞', 'км', 'километр', '公里']
    },
    'M_1': {name: 'Meter', symbols: ['meter', 'metre', 'метр', '米']},
    'M_0.01': {
      name: 'Centimeter',
      symbols: ['cm', 'centimeter', 'centimetre', 'см', 'сантиметр', '厘米']
    },
    'M_0.001': {
      name: 'Millimeter',
      symbols: ['mm', 'millimeter', 'millimetre', 'мм', 'миллиметр', '毫米']
    },
    'M_0.000001': {
      name: 'Micrometer',
      symbols: [
        'μm',
        'micrometer',
        'micrometre',
        'micron',
        'мкм',
        'микрометр',
        'микрон',
        '微米'
      ]
    },
    'M_0.000000001': {
      name: 'Nanometer',
      symbols: [
        'nm',
        'mµ',
        'µµ',
        'nanometer',
        'nanometre',
        'нм',
        'нанометр',
        '纳米'
      ]
    },
    'F_5280': {name: 'Mile', symbols: ['mi', 'mile', 'мил', '英里或哩']},
    'F_3': {name: 'Yard', symbols: ['yd', 'yard', 'ярд', '碼']},
    'F_1': {
      name: 'Foot',
      symbols: ['ft', 'foot', 'feet', '′', "'", 'фут', '英尺']
    },
    'F_0.08333333': {
      name: 'Inch',
      symbols: ['in', 'inch', '″', "''", 'дюйм', '英寸']
    }
  },

  getDescription: function (len_code) {
    var len = const_len.L[len_code];
    return len ? len.name : len_code;
  },

  hasSymbol: function (txt) {
    for (var len in const_len.L) {
      for (var i = 0; i < const_len.L[len].symbols.length; i++) {
        var symbol = const_len.L[len].symbols[i];
        if (symbol != '' && txt.indexOf(symbol) != -1) {
          return len;
        }
      }
    }
    return '';
  }
};
