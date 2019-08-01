var todoarray = [];
var todoidlist = [];
var devplanarray = [];
var devplanidlist = [];
var idlist = [];
var loc = "";

$(function () {
  // var elem = document.getElementById(todoidlist[0]);
  // while (elem == null) {
  //
  //   sleep(1000);
  //   console.log(elem);
  // }
  createArray();
  // setTimeout(addListener,1000);
  // if (location == "v1_calendarout.php") {g
  //   sleep(5000);
  //   addListener();
  // }
  // fillFullList();
    $('.dot' ).on('click', function(event) {
      // console.log(this.id);
      fillPopUp(this);

	    $("#CalendarEventField").html("somevalue");


        $("#fullyearpopup").show();
        $("#fullyearpopup").dialog("open");
	});


  //   console.log("test2");
  //   console.log(document.readyState);
  //   // var idlist = document.getElementsByClassName("fc-event-container");
  //   idlist = document.getElementsByClassName("fc-day-grid-event");
  //   idlist = document.getElementsByTagName("td");
  //   // idlist = document.getElementById("fc");
  //   console.log(idlist);
  //   console.log(idlist.length);
  //   // console.log(idlist.item());
  //   console.log(idlist.item(0));
  //   console.log(idlist['0']);
  //   console.log(idlist)[0];
  //   createArrayAlt();
  // });
// function sleep(milliseconds) {
//   var start = new Date().getTime();
//   for (var i = 0; i < 1e7; i++) {
//     if ((new Date().getTime() - start) > milliseconds){
//       break;
//     }
//   }
// }

	$("#fullyearpopup").dialog({
		autoOpen: false,
		width: "50%",
		height: "400",
		overflow: "auto"
	});
  $("#fullyearpopup").hide();
});


window.onload = function(){
  // console.log(document.readyState);
  // console.log("document.readyState");
  // loc = document.getElementById("fc").id;
  // console.log(loc);
  setTimeout(addListener,1000);
  $('.btn-default').on('click', function(event) {
    setTimeout(addListener,1000);
    // addListener()
  });
  // $('.fc-title' ).on('click', function(event) {alert("test1")});
  // $('.fc-content' ).on('click', function(event) {alert("test2")});
  // $('.fc-event' ).on('click', function(event) {alert("test3")});
  // $('.fc-event-container' ).on('click', function(event) {alert("test4")});
  // // document.getElementsByClassName('fc-title')[0].addEventListener("click",function(){alert("test1")});
  // // document.getElementsByClassName('fc-content').addEventListener("click",function(){alert("test2")});
  // // document.getElementsByClassName('fc-fc-day-grid-event').addEventListener("click",function(){alert("test3")});
  // document.getElementById('T20190703094703').addEventListener("click",function(){alert("test4")});
  // setTimeout(testOne,1000);
}

async function testOne(){
  $('.fc-title' ).on('click', function(event) {
    alert("test1")

  });
  // $('.fc-content' ).on('click', function(event) {alert("test2")});
  // $('.fc-event' ).on('click', function(event) {alert("test3")});
  // $('.fc-event-container' ).on('click', function(event) {alert("test4")});
  // document.getElementsByClassName('fc-title')[0].addEventListener("click",function(){alert("test1")});
  // document.getElementsByClassName('fc-content').addEventListener("click",function(){alert("test2")});
  // document.getElementsByClassName('fc-fc-day-grid-event').addEventListener("click",function(){alert("test3")});
  // document.getElementById('T20190703094703').addEventListener("click",function(){alert("test4")});

}
//   var elem = document.getElementById(todoidlist[0]);
//   while (elem == null) {
//
//     sleep(1000);
//     console.log(elem);
//   }
//   console.log(document.readyState);
//
//   console.log(document.readyState);
//   addListener();
// }
// window.addEventListener('load', function () {
//   if (location == "v1_calendarout.php") {
//   }
// });


async function addListener(){
  // alert("testing");
  // console.log(todoidlist);
  // for (var i = 0; i < todoidlist.length; i++) {
  //   console.log(todoidlist[i]);
    // var elem = document.getElementById(todoidlist[i]).children[0];
  //   console.log(elem);
  //   console.log(elem.children[0]);
    createArray();
    // elem.addEventListener("click",fillPopUp(this));

    $('.fc-event-container').on('click', function(event) {
    // $('#'+todoidlist[i]).on('click', function(event) {
      // console.log(this.id);
      fillPopUp(this);

      $("#CalendarEventField").html("somevalue");


        $("#fullyearpopup").show();
        $("#fullyearpopup").dialog("open");
  });

  // }
}

// function createArrayAlt(){
//   console.log("test");
//   idlist = document.getElementsByClassName("fc-event-container");
//   console.log(idlist);
//   console.log(idlist.item(0));
//   console.log(idlist[0]);
//   console.log(idlist[1]);
//   console.log(idlist.length);
//   for (var i = 0; i < idlist.length; i++) {
//     console.log("1");
//     idlist[i] = idlist[i]['id'];
//     console.log(idlist);
//   }
//   console.log(idlist);
// }

function createArray(){
  var todo = document.getElementById('todoa').innerHTML;//loads the html array
  var todoa = todo.split(';');//splits into main arrays
  var todoa0 = todoa[0].split(',');//seperates into columns
  for (var i = 1; i < todoa.length; i++) {
    todoarray[i-1] = todoa[i].split(',');
    todoidlist[i-1] = todoarray[i-1][2];
  }
  var devplan = document.getElementById('devplana').innerHTML;
  var devplana = devplan.split(';');
  var devplana0 = devplana[0].split(',');
  for (var i = 1; i < devplana.length; i++) {
    devplanarray[i-1] = devplana[i].split(',');
    devplanidlist[i-1] = devplanarray[i-1][3];
  }
  console.log(todoidlist);
  console.log(devplanidlist);
}

function fillPopUp(elem){
  id = elem.id;
  console.log(id);
  if (loc == "fc") {
    type = "todo";
  } else {
    type = elem.className.substr(4,4);
  }
  var body = "";
  if (type == "todo") {
    var link = document.getElementById("todol").children[0].getAttribute("href");
    // console.log(todoarray);
    // console.log(id);
    // console.log(todoidlist);
    // console.log(todoarray[todoidlist.indexOf(id)]);
    // console.log(todoarray[todoidlist.indexOf(id)][2]);
    link += "&todo_id="+todoarray[todoidlist.indexOf(id)][2];
    document.getElementById("fullyearpopup").children[2].href = link;

    document.getElementById("fullyearpopup").previousSibling.getElementsByTagName('span')[0].innerHTML = todoarray[todoidlist.indexOf(id)][4];
    document.getElementById("fullyearpopup").children[0].innerHTML = todoarray[todoidlist.indexOf(id)][4];
    document.getElementById("fullyearpopup").children[1].innerHTML = todoarray[todoidlist.indexOf(id)][5];
  }else{
    var link = document.getElementById("devplanl").children[0].getAttribute("href");
    console.log(devplanarray);
    console.log(devplanarray[0]);
    console.log(devplanarray[devplanidlist.indexOf(id)][1]);
    link += "&accredaction_schemeid="+devplanarray[devplanidlist.indexOf(id)][1];
    link += "&accredaction_clubid="+devplanarray[devplanidlist.indexOf(id)][2];
    link += "&accredaction_id="+devplanarray[devplanidlist.indexOf(id)][3];
    document.getElementById("fullyearpopup").children[2].href = link;

    document.getElementById("fullyearpopup").previousSibling.getElementsByTagName('span')[0].innerHTML = devplanarray[devplanidlist.indexOf(id)][4];
    document.getElementById("fullyearpopup").children[0].innerHTML = devplanarray[devplanidlist.indexOf(id)][4];
    body += "<b>Section topic:</b> " + devplanarray[devplanidlist.indexOf(id)][5] + "</br>";
    body += "<b>Objective:</b> " + devplanarray[devplanidlist.indexOf(id)][7];
    document.getElementById("fullyearpopup").children[1].innerHTML = body;
  }
}


function populateYear(events){
  var modal = document.getElementById("myModal");
  for (var i = 0; i < events.length; i++) {
    var event = '<a class="fc-day-grid-event fc-h-event fc-event fc-start fc-end fc-draggable fc-resizable popup" style="background-color:'+events[i]['color']+';border-color:'+events[i]['color']+'"><div class="fc-content noText">Title: '+events[i]['title']+'\n</br>Start date: '+events[i]['start']+'</br>End date: '+events[i]['end']+'<div id="'+events[i]['id']+'"></div></div><div class="fc-resizer fc-end-resizer"></div></a>';
    // console.log(events[i]['start']);
    for (var x = 0; x < 2; x++) {
      if (x==0) {
        var orientation = 'fyh';
      }else{
        var orientation = 'fyv';
      }
      var elem = document.getElementById(orientation+events[i]['start']);
      // console.log(elem);
      elem.innerHTML += "</br>"+event;
      elem.addEventListener("click", function(){resetTimeoutHandle()});
      // elem.addEventListener("click", function(){moreInfo(this)});
      // elem.addEventListener("click", function() {modal.style.display = "block";});
    }
  }
}

// function fillFullList(events){
//   var list = document.getElementById("fullList");
//   var dates = [];
//   var lists = [];
//   lists[0] = todoarray;
//   lists[1] = devplanarray;
//   console.log(lists);
//   for (var x = 0; x < lists.length; x++) {
//     // console.log(lists);
//     // console.log(lists[0]);
//     // console.log(lists[1]);
//     // console.log(lists[x]);
//     for (var i = 0; i < lists[x].length; i++) {
//       if (x == 0) {
//         dates.push(lists[x][i][11]);
//       }else {
//         dates.push(lists[x][i][17]);
//       }
//       var date = new Date(dates[i]);
//       var day = date.getDay();
//       var month = date.getMonth();
//       console.log(day);
//       switch (day) {
//         case 0:
//           day = "Sunday"
//           break;
//         case 1:
//           day = "Monday"
//           break;
//         case 2:
//           day = "Tuesday"
//           break;
//         case 3:
//           day = "Wednesday"
//           break;
//         case 4:
//           day = "Thursday"
//           break;
//         case 5:
//           day = "Saturday"
//           break;
//         case 6:
//           day = "Sunday"
//           break;
//         default:
//           day = "";
//       }
//       switch (month) {
//         case 0:
//           month = "January"
//           break;
//         case 1:
//           month = "February"
//           break;
//         case 2:
//           month = "March"
//           break;
//         case 3:
//           month = "April"
//           break;
//         case 4:
//           month = "May"
//           break;
//         case 5:
//           month = "June"
//           break;
//         case 6:
//           month = "July"
//           break;
//         case 7:
//           month = "August"
//           break;
//         case 8:
//           month = "September"
//           break;
//         case 9:
//           month = "October"
//           break;
//         case 10:
//           month = "November"
//           break;
//         case 11:
//           month = "December"
//           break;
//         default:
//
//       }
//       var formattedDate = month+" "+date.getDate()+", "+date.getUTCFullYear();
//       if (lists[x][i]['allDay'] == true) {
//         var allDay = "All Day";
//       }else{
//         var allDay = "Not";
//       }
//       if (x == 0) {
//         var category = "To Do";
//       }else{
//         var category = "Devplan";
//       }
//       // var d = day.getDay;
//       console.log(lists[x][i]);
//       console.log(lists[x][i]['allday']);
//       var newItem = "<tr><th>"+day+"</th><th></th><th>"+formattedDate+"</th></tr><tr><td>"+allDay+" "+category+"</td><td>"+lists[x][i]['title']+"</td><td></td></tr>";
//       // var newItem = "<tr><td>"+day+"</td><td></td><td>"+dates[i]+"</td></tr><tr><td>"+allDay+" "+category+"</td><td>"+events[i]['title']+"</td><td></td></tr>";
//       // var newItem = "<tr><td>"+day+"</td><td></td><td>"+dates[i]+"</td></tr><tr><td></td></tr>";
//       list.children[0].children[0].innerHTML += newItem;
//       // console.log(list.children[0].children[0].children[0]);
//     }
//   }
//   console.log(dates);
// }


/* Original Code

    setupWait();
    startWait();



    $('#calendar').fullCalendar({
        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'year,month,agendaWeek,agendaDay,listWeek'
        },
        editable: true,
        eventLimit: true, // allow "more" link when too many events
        navLinks: true,
        themeSystem: 'bootstrap3',
        bootstrapGlyphicons: false,
        events: function(start, end, timezone, callback) {
          var sUrl = JSSitePHPURL()+"/"+JSCodeVersion()+"_calendareventsfeed.php";
          $.ajax({
            url: sUrl,
            data: {
                ServiceId: JSServiceId(),
                DomainId: JSDomainId(),
                ModeId: JSModeId(),
                PersonId: JSPersonId(),
                SessionId: JSSessionId(),
                LoginModeId: JSLoginModeId(),
                MenuId: JSMenuId(),
                OrgTypeId: JSOrgTypeId(),
		OrgId: JSOrgId()
            },
            type: "POST",
	    dataType: "text",
	    timeout: 10000,
	    success: function(data) {
                // alert(data);
                var eventstringa = data.split('^');
                var events = [];
                for (var ei in eventstringa) {
                  var eea = eventstringa[ei].split('|');
                  // alert(eventstringa[ei]);
                  if ( eea[1] != "" ) {
                      colorparm = eea[1];
                  } else {
                      colorparm = "blue";
                  }
                  if ( eea[2] != "" ) {
                      idparm = eea[2];
                  } else {
                      idparm = "";
                  }
                  if ( eea[3] != "" ) {
                      titleparm = eea[3];
                  } else {
                      titleparm = "";
                  }
                  if ( eea[4] == "allDay" ) {
                      alldayparm = true;
                  } else {
                      alldayparm = false;
                  }

                  if ( eea[5] != "" ) {
                      startparm = eea[5];
                  } else {
                      startparm = "";
                  }
                  if ( eea[6] != "" ) {
                      endparm = eea[6];
                  } else {
                      endparm = "";
                  }
                  if ( eea[7] != "" ) {
                      urlparm = eea[7];
                  } else {
                      urlparm = "";
                  }
                  events.push({
                    color: colorparm,
                    id: idparm,
                    allDay: alldayparm,
                    title: titleparm,
                    start: startparm,
                    end: endparm,
                    url: urlparm
                  });
                };
                // console.log(events);
                fillFullList(events);
                populateYear(events);
                callback(events);
                stopWait();
            },
            error: function(xhr, reason, ex) {
                messagealert("Error Reason = "+"|"+xhr+"|"+reason+"|"+ex+"|");
            }
          });
        }
    });
});


function populateYear(events){
  // console.log(events);
  var modal = document.getElementById("myModal");
  for (var i = 0; i < events.length; i++) {
    var event = '<a class="fc-day-grid-event fc-h-event fc-event fc-start fc-end fc-draggable fc-resizable popup" style="background-color:'+events[i]['color']+';border-color:'+events[i]['color']+'"><div class="fc-content noText">Title: '+events[i]['title']+'\n</br>Start date: '+events[i]['start']+'</br>End date: '+events[i]['end']+'<div id="'+events[i]['id']+'"></div></div><div class="fc-resizer fc-end-resizer"></div></a>';
    console.log(events[i]['start']);
    for (var x = 0; x < 2; x++) {
      if (x==0) {
        var orientation = 'fyh';
      }else{
        var orientation = 'fyv';
      }
      var elem = document.getElementById(orientation+events[i]['start']);
      console.log(elem);
      elem.innerHTML += "</br>"+event;
      elem.addEventListener("click", function(){resetTimeoutHandle()});
      // elem.addEventListener("click", function(){moreInfo(this)});
      // elem.addEventListener("click", function() {modal.style.display = "block";});
    }
  }
}
  function moreInfo(elem){
    // var popup = document.getElementById("myPopup1");
    // console.log(popup);
    // popup.classList.toggle("show");
    // console.log(elem.children[1]);
    // console.log(elem.children[1].children[0].textContent);
    // console.log(elem.children[1].children[0].value);
    // alert(elem.children[1].children[0].textContent);


    // Get the modal
    var modal = document.getElementById("myModal");
    modal.children[0].children[1].innerHTML = elem.children[1].children[0].innerHTML;
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks on the button, open the modal
    elem.onclick = function() {
      modal.style.display = "block";
    }

    // When the user clicks on <span> (x), close the modal
    document.getElementById("Close").addEventListener("click",function(){modal.style.display = "none";});
    span.onclick = function() {
      modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }
  }
  // var event = "<div class='calItem'>";
  // events[i]
  // var i = 0;
  // console.log(events[i]);
  // console.log(events[i]['color']);
  // console.log(document.getElementById("fy"+events[i]['start']));


// <a class="fc-day-grid-event fc-h-event fc-event fc-start fc-end fc-draggable fc-resizable" style="background-color:green;border-color:green"><div class="fc-content"> <span class="fc-title">Insurance</span></div><div class="fc-resizer fc-end-resizer"></div></a>

*/
