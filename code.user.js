// ==UserScript==
// @name        GDQ Schedule Marker
// @namespace   https://github.com/MateusZ36
// @match       https://gamesdonequick.com/schedule
// @grant       none
// @version     1.3
// @author      MateusZ3
// @homepageURL https://github.com/MateusZ36/GDQ-SChedule-Marker
// @downloadURL https://github.com/MateusZ36/GDQ-SChedule-Marker/raw/main/code.user.js
// @updateURL   https://github.com/MateusZ36/GDQ-SChedule-Marker/raw/main/code.user.js
// ==/UserScript==

Date.prototype.sum_str = function(time) {
  var date = new Date(this.valueOf())
  var res = time.trim().match(/(\d+)/g)
  hours = parseInt(res[0])
  minutes = parseInt(res[1])
  seconds = parseInt(res[2])
  date.setHours(date.getHours()+hours)
  date.setMinutes(date.getMinutes()+minutes)
  date.setSeconds(date.getSeconds()+seconds)
  return date
}

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
const current_date = new Date()

for(i=0;i<table_rows.length;i++){
  if(table_rows[0].className == ""){
    var run_time = new Date($(table_rows[i]).children('td.start-time').html())
    if(run_time > current_date){
      $(table_rows[i-2]).addClass("current").attr('id', 'current').next().addClass("current")
      break
    }
  }
  
  if(i==table_rows.length-1){
    console.log("ultima linha")
    run_time = new Date($(table_rows[i-1]).children('td.start-time').html())
    run_time = run_time.sum_str($(table_rows[i]).children("td.text-right").text())    
    if(current_date < run_time){
      $(table_rows[i-1]).addClass("current").attr('id','current').next().addClass("current")
    }
  }
}

var link = $("<a></a>").text("Scroll to current run").prepend("<br>")
link.attr("href","#current")
$("#white-bg > div.container.text-center > h4").append(link)
