$(function () {

//    INCOMING DATA STREAM
//    0 eventtype
//    ---- direct mapping to fullcalendar event elements *
//    1 color
//    2 id
//    3 title
//    4 allDay
//    5 start
//    6 end
//    7 url
//    ---- indirect mapping to fullcalendar event elements
//    8 personid
//    9 description
//    10 raisedbyorgtype
//    11 raisedbyorgid
//    12 raisedbypersonid
//
//    FULLCALENDAR EVENT PARAMETERS
//    id
//    title
//    allDay
//    start
//    end
//    url
//    className
//    editable
//    startEditable
//    durationEditable
//    resourceEditable
//    rendering
//    overlap
//    constraint
//    source
//    color
//    backgroundColor
//    borderColor
//    textColor


    var todayDate = moment().startOf('day');
    var YM = todayDate.format('YYYY-MM');
    var YESTERDAY = todayDate.clone().subtract(1, 'day').format('YYYY-MM-DD');
    var TODAY = todayDate.format('YYYY-MM-DD');
    var TOMORROW = todayDate.clone().add(1, 'day').format('YYYY-MM-DD');

    setupWait();
    startWait();

    $('#calendar').fullCalendar({
        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaWeek,agendaDay,listWeek'
        },
        editable: false,
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
                  console.log(eea);
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
