// ==UserScript==
// @name        GDQ Schedule Marker
// @namespace   https://github.com/MateusZ36
// @match       https://gamesdonequick.com/schedule
// @grant       none
// @version     1.0
// @author      MateusZ3
// @description 04/01/2021 15:12:31
// ==/UserScript==

const table_rows = $("#runTable tbody tr")
const data_atual = new Date()

for(i=0;i<table_rows.length;i++){
  if(table_rows[0].className == ""){
    if(new Date($(table_rows[i]).children('td.start-time').html()) > data_atual){
      $(table_rows[i-1]).css("background-color","#b3ff99")
      $(table_rows[i-2]).css("background-color","#b3ff99")
      break
    }
  }
}