/**
 * SPDX-FileCopyrightText: © 2011–2023, Andrey Shemetov <ashemetov@gmail.com>
 *
 * SPDX-License-Identifier: MPL-2.0 OR GPL-3.0-or-later OR LGPL-3.0-or-later
 */
'use strict';

var favicons = {
  // Quality icons for most popular sites deployed with extension.
  cached_favicons: [
    'canacopegdl.com.svg',
    'docs.microsoft.com.svg',
    'duckduckgo.com.svg',
    'en.wikipedia.org.svg',
    'gibiru.com.png',
    'maps.google.com.png',
    'ms.translate.png',
    'news.google.com.png',
    'onelook.com.png',
    'open.spotify.com.svg',
    'rutube.ru.svg',
    'scholar.google.com.png',
    'search.aol.com.svg',
    'search.lilo.org.png',
    'search.lycos.com.png',
    'search.yahoo.com.svg',
    'scholar.google.com.png',
    'stackoverflow.com.svg',
    'swisscows.ch.png',
    'translate.google.com.svg',
    'translate.yandex.com.png',
    'twitter.com.svg',
    'www.amazon.com.svg',
    'www.baidu.com.svg',
    'www.bing.com.svg',
    'www.britannica.com.png',
    'www.dictionary.com.png',
    'www.dogpile.com.png',
    'www.facebook.com.svg',
    'www.flickr.com.svg',
    'www.google.com.png',
    'www.imdb.com.png',
    'www.merriam-webster.com.svg',
    'www.mojeek.com.png',
    'www.mouser.com.png',
    'www.qwant.com.png',
    'www.rottentomatoes.com.png',
    'www.startpage.com.png',
    'www.thefreedictionary.com.svg',
    'www.urbandictionary.com.png',
    'www.wolframalpha.com.svg',
    'www.wordnik.com.png',
    'www.yandex.com.svg',
    'www.youtube.com.svg'
  ],

  //~ return favorites icon url
  getFavIconURL: function (url, prefs) {
    if (url) {
      if (url.indexOf('site=imghp&tbm=isch') != -1) {
        //~ special case for google image search
        return cmn.getIconURL('favicons/google_image.png');
      } else if (url.indexOf('encrypted.google.com') != -1) {
        //~ special case for encrypted google
        return cmn.getIconURL('favicons/www.google.com.png');
      } else if (url.indexOf('start.duckduckgo.com') != -1) {
        //~ special case for DDG
        return cmn.getIconURL('favicons/duckduckgo.com.svg');
      } else if (url.indexOf('www.bing.com/translator') != -1) {
        //~ special case for MS Translate
        return cmn.getIconURL('favicons/ms.translate.png');
      } else {
        var chunks = url.split('/'),
          favicon_url = '';
        if (favicons.cached_favicons.indexOf(chunks[2] + '.svg') > -1) {
          favicon_url = cmn.getIconURL('favicons/{0}.svg'._format(chunks[2]));
        } else if (favicons.cached_favicons.indexOf(chunks[2] + '.png') > -1) {
          favicon_url = cmn.getIconURL('favicons/{0}.png'._format(chunks[2]));
        } else {
          if (prefs.prefFavDuck) {
            favicon_url =
              'https://icons.duckduckgo.com/ip2/' + chunks[2] + '.ico';
          } else {
            favicon_url =
              'https://www.google.com/s2/favicons?domain=' + chunks[0] + '//'
              + chunks[2];
          }
        }
        return favicon_url;
      }
    }
    return '';
  }
};
