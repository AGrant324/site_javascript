YAHOO.namespace ("BBcalendarpopup");

function initCalendar() {
//  myLogConfigs = {width: "500px", right: "10em", top: "10%", fontSize: "80%" };
//  myLogContainer = null;
//  myLogReader = new YAHOO.widget.LogReader(myLogContainer, myLogConfigs);
// YAHOO.log("init called","info");
 calendarFound = "0";  
 popCalIndex = ""; oldPopCalIndex = "";  
 for (var ti=0; ti<document.images.length; ti++) {
	var imageId = document.images[ti].id;
	if(imageId.search("_miniCal") != -1) {
      calendarFound = "1";        
      popCalIndex = imageId.replace("_miniCal","");
	  // YAHOO.log(popCalIndex+" - addListener","info");
	  YAHOO.util.Event.addListener(popCalIndex+"_miniCal","click",toggleCalPopUp);
	  YAHOO.util.Event.addListener(popCalIndex+"_DDpart","change",changeSelDate);
	  YAHOO.util.Event.addListener(popCalIndex+"_MMpart","change",changeSelDate);
	  YAHOO.util.Event.addListener(popCalIndex+"_YYYYpart","change",changeSelDate);
    }
 }
 
 // alert("Calendarpopup called "+calendarFound);  
 if (calendarFound == "1") {
  this.today = new Date();
  thisDD = this.today.getDate();
  thisMM = this.today.getMonth()+1;
  thisYYYY = this.today.getFullYear();
  
  baseYYYY = 1990;
  if ($("#"+popCalIndex+"_YYYYBase").length > 0) { baseYYYY = $("#"+popCalIndex+"_YYYYBase").val(); }
  // CHECK - This does not permit mixed date calendars on same page
  baseYYYY = baseYYYY - 1;  
  // alert(baseYYYY);
  
  calDivOuter = document.getElementById("cal1Containerouter");
  calDivOuter.style.zIndex = 40;    
  calDiv = document.getElementById("cal1Container");
  calDiv.style.border = '3px solid silver';
  calDiv.style.zIndex = 30;    
  
  calendar = new YAHOO.widget.Calendar("cal1","cal1Container", { close:true, title:"Select Date", navigator:true });    
  calendar.selectEvent.subscribe(xferCal2Sel, calendar, true);
  calendar.hide();

  calendar.renderEvent.subscribe(function() {
    // Tell Dialog it's contents have changed, Currently used by container for IE6/Safari2 to sync underlay size
    calpopup.fireEvent("changeContent");
  });

//  YAHOO.util.Event.on("show", "click", function() {
//	calpopup.show();
//	if (YAHOO.env.ua.opera && document.documentElement) {
//	  // Opera needs to force a repaint
//	  document.documentElement.className += "";
//	} 
//  });
  
 } 
}

function toggleCalPopUp(e) {

 if($('#cal1Container').is(':visible')) {
  // alert("calPoppedUp");	 
  closeCalPopUp(e);
 } else {
  // alert("not calPoppedUp");
  if (oldPopCalIndex !== "") {document.getElementById(oldPopCalIndex + "_miniCal").src = "../site_assets/minical.gif";};	
  var imgEl = YAHOO.util.Event.getTarget(e);
  if (imgEl.id.indexOf("_miniCal") !== -1) { popCalIndex = imgEl.id.replace("_miniCal",""); }
  else {alert(popCalIndex+" Not Found");}
  YAHOO.log("toggleCalPopUpX initiated - "+ popCalIndex,"info");	  
  xferSel2Cal(e);
  popUpAtXY(e);  
 }
}

function closeCalPopUp(e) {
//  YAHOO.log("closeCalPopUp initiated","info");	
  document.getElementById(popCalIndex + "_miniCal").src = "../site_assets/minical.gif";
  popCalIndex = ""; 
  // oldPopCalIndex = "";  // CHECK
  calendar.hide();  
}

function xferCal2Sel(e) {
  YAHOO.log("xferCal2Sel initiated - "+ popCalIndex,"info");
  // alert("xferCal2Sel initiated - "+ popCalIndex);
  document.getElementById(popCalIndex + "_miniCal").src = "../site_assets/minical.gif";	  
  var pickedDate = calendar.getSelectedDates()[0];
  var tempDD = pickedDate.getDate();	
  var tempMM = pickedDate.getMonth()+1;
  var tempYYYY = pickedDate.getFullYear();
  YAHOO.log("date"+tempDD+"|"+tempMM+"|"+tempYYYY,"info");
  document.getElementById(popCalIndex + "_DDpart").selectedIndex=pickedDate.getDate();
  document.getElementById(popCalIndex + "_MMpart").selectedIndex=pickedDate.getMonth()+1;
  document.getElementById(popCalIndex + "_YYYYpart").selectedIndex=(pickedDate.getFullYear() - baseYYYY);
  // closeCalPopUp(e);
}

function changeSelDate(e) {
  if (oldPopCalIndex !== "") {document.getElementById(oldPopCalIndex + "_miniCal").src = "../site_assets/minical.gif";};		
  var selEl = YAHOO.util.Event.getTarget(e);
  var selfound = "0";
  if (selEl.id.indexOf("_DDpart") !== -1) { popCalIndex = selEl.id.replace("_DDpart",""); selfound = "1";}
  if (selEl.id.indexOf("_MMpart") !== -1) { popCalIndex = selEl.id.replace("_MMpart",""); selfound = "1";}	
  if (selEl.id.indexOf("_YYYYpart") !== -1) { popCalIndex = selEl.id.replace("_YYYYpart",""); selfound = "1";}	
  if (selfound !== "1") { alert(popCalIndex+" Not Found");}
  YAHOO.log("changeSelDate initiated - "+ popCalIndex,"info");
  if ((document.getElementById(popCalIndex + "_DDpart").selectedIndex == 0)||
      (document.getElementById(popCalIndex + "_MMpart").selectedIndex == 0)||
      (document.getElementById(popCalIndex + "_YYYYpart").selectedIndex == 0)){
	  // Allows zeroing out of dates
  } else {  
	  xferSel2Cal(e);	  
      if($('#cal1Container').is(':visible')) {  
        calendar.render();
        calendar.show();
      }	  
  }
}

function xferSel2Cal(e) {
  YAHOO.log("xferSel2Cal initiated - "+ popCalIndex,"info");		  
  YAHOO.log(popCalIndex + "_DDpart","info");  
  var tempDD = document.getElementById(popCalIndex + "_DDpart").selectedIndex;	
  var tempMM = document.getElementById(popCalIndex + "_MMpart").selectedIndex;
  var tempYYYY = baseYYYY + document.getElementById(popCalIndex + "_YYYYpart").selectedIndex;	
  var tempDDMMYYYY = tempDD+tempMM+tempYYYY;
  YAHOO.log("date"+"|"+tempDD+"|"+tempMM+"|"+tempYYYY,"info");
  // alert("date"+"|"+popCalIndex+"|"+tempDD+"|"+tempMM+"|"+tempYYYY);
  if (tempDDMMYYYY == baseYYYY) {
   // oldPopCalIndex = "";  // CHECK
   if (oldPopCalIndex != "") {
    YAHOO.log("null date - copy from previous","info");
    // alert("null date - copy from previous");
    var tempDD = document.getElementById(oldPopCalIndex + "_DDpart").selectedIndex;	
    var tempMM = document.getElementById(oldPopCalIndex + "_MMpart").selectedIndex;
    var tempYYYY = baseYYYY + document.getElementById(oldPopCalIndex + "_YYYYpart").selectedIndex;	
   } else {
	YAHOO.log("null date - use current date ","info");
	// alert("null date - use current date ");
	var tempDD = thisDD;	
	var tempMM = thisMM;
	var tempYYYY = thisYYYY;	
   }
  }
  YAHOO.log("temp "+tempMM + "/" + tempDD + "/" + tempYYYY,"info");
  calendar.select(tempMM + "/" + tempDD + "/" + tempYYYY);
  calendar.setMonth(tempMM-1);
  calendar.setYear(tempYYYY);
}

function popUpAtXY(e) {
  YAHOO.log("popUpAtXY initiated - "+ popCalIndex,"info");	
  xy = YAHOO.util.Dom.getXY(popCalIndex + "_miniCal");
  xy[0] = xy[0] + 19;      
  xy[1] = xy[1] + -4;
  calendar.render();
  calendar.show(); 
  YAHOO.util.Dom.setXY('cal1Containerouter', xy);  
  document.getElementById(popCalIndex + "_miniCal").src = "../site_assets/minicalon.gif";
  oldPopCalIndex = popCalIndex;
}
  
YAHOO.util.Event.addListener(window, "load", initCalendar);

