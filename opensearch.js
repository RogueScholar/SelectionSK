/**
 * SPDX-FileCopyrightText: © 2011–2023, Andrey Shemetov <ashemetov@gmail.com>
 *
 * SPDX-License-Identifier: MPL-2.0 OR GPL-3.0-or-later OR LGPL-3.0-or-later
 */
'use strict';

var opensearch = {
  getSearchEngine: function () {
    var engines = document.querySelectorAll(
      'link[type="application/opensearchdescription+xml" i]'
    );
    return engines.length > 0 && engines[0].href.indexOf('xml') > -1 ?
        {title: engines[0].title, url: engines[0].href}
      : false;
  },

  getSearchURL: function (xml_url) {
    return fetch(xml_url, {method: 'get'})
      .then(function (response) {
        return response.text().then(function (data) {
          var parser = new DOMParser();
          var xml_data = parser.parseFromString(data, 'text/xml');
          var elems = xml_data.getElementsByTagName('Url');
          for (let elem of elems) {
            if (elem.getAttribute('type') == 'text/html') {
              var search_url = elem.getAttribute('template');
              var params = elem.getElementsByTagName('Param');
              for (let param of params) {
                search_url += '{0}{1}={2}'._format(
                  search_url.indexOf('?') == -1 ? '?' : '&',
                  param.getAttribute('name'),
                  param.getAttribute('value')
                );
              }
              search_url = search_url
                .replace(/{searchTerms}/gi, '%s')
                .replace(/{startIndex}/gi, '1')
                .replace(/{startPage}/gi, '1')
                .replace(/{startIndex\?}/gi, '1')
                .replace(/{startPage\?}/gi, '1');
              return search_url;
            }
          }
          return '';
        });
      })
      .catch(function (ex) {
        cmn.log(ex.toString());
        return '';
      });
  },

  addBookmark: function (folder, title, url) {
    chrome.bookmarks.create({
      title: title,
      parentId: folder.id,
      index: folder.children.length,
      url: url
    });
  },

  addMycroftIntegration: function (
    icon_url,
    extn_name,
    extn_url_ff,
    extn_url_cr
  ) {
    if (document.URL.indexOf('mycroftproject.com') != -1) {
      var elems = document.querySelectorAll('a');
      for (let elem of elems) {
        var items = elem.title
          .replace(/\(/gi, '')
          .replace(/\)/gi, '')
          .split(' ');
        if (items[0] == 'Ref:') {
          var xml_url =
            'https://mycroftproject.com/installos.php/{0}/{1}.xml'._format(
              items[2],
              items[1]
            );
          var id = '{0}_{1}_{2}'._format(extn_name, items[1], items[2]);
          var html =
            '<img class="icon ssk-mycroft-icon" src="{0}" title=\'Add "{1}" to the {2} extension\' id="{3}"/>'._format(
              cmn.getIconURL(icon_url),
              elem.innerText,
              extn_name,
              id
            );
          elem.insertAdjacentHTML('beforebegin', html);
          var icon = document.getElementById(id);
          icon.value = {url: xml_url, title: elem.innerText};
          icon.onclick = function (e) {
            chrome.runtime.sendMessage({
              cmd: utils.CMD_ADD_BOOKMARK,
              title: e.target.value.title,
              url: e.target.value.url
            });
          };
        }
      }
      elems = document.getElementsByClassName('altrowgw');
      if (elems.length > 0) {
        var html =
          '<tr><td><img class="icon" src="{0}" />Add search engine to the '
		  + '<a href="{1}"><b><u>{2}</u></b></a> extension.</td></tr>'._format(
            cmn.getIconURL(icon_url),
            cmn.isFirefox() ? extn_url_ff : extn_url_cr,
            extn_name
          );
        elems[0].lastChild.firstChild.insertAdjacentHTML('afterend', html);
      }
    }
  }
};
