// ==UserScript==
// @name        GDQ Schedule Marker
// @namespace   https://github.com/MateusZ36
// @match       https://gamesdonequick.com/schedule
// @grant       none
// @version     1.1
// @author      MateusZ3
// @homepageURL https://github.com/MateusZ36/GDQ-SChedule-Marker
// @downloadURL https://github.com/MateusZ36/GDQ-SChedule-Marker/raw/main/code.user.js
// @updateURL   https://github.com/MateusZ36/GDQ-SChedule-Marker/raw/main/code.user.js
// @description Highlights the current run in the event
// ==/UserScript==

function GM_addStyle(cssStr) {
    var D = document;
    var newNode = D.createElement ('style');
    newNode.textContent = cssStr;

    var targ = D.getElementsByTagName ('head')[0] || D.body || D.documentElement;
    targ.appendChild (newNode);
}

GM_addStyle(`
  .current {
    background-color: #b3ff99;
    font-weight: bold;
  }
`)

const table_rows = $("#runTable tbody tr")
const data_atual = new Date()

for(i=0;i<table_rows.length;i++){
  if(table_rows[0].className == ""){
    if(new Date($(table_rows[i]).children('td.start-time').html()) > data_atual){
      $(table_rows[i-2]).addClass("current").next().addClass("current")
      break
    }
  }
}