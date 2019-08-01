
GLOBALS = new Array();

function JSServiceId() { 
	var JSServiceId = ""; if ($("#JSServiceId").length > 0) { JSServiceId = $("#JSServiceId").val(); }
	return JSServiceId;
}
function JSDomainId() { 
	var JSDomainId = ""; if ($("#JSDomainId").length > 0) { JSDomainId = $("#JSDomainId").val(); }
	return JSDomainId;
}
function JSModeId() { 
	var JSModeId = ""; if ($("#JSModeId").length > 0) { JSModeId = $("#JSModeId").val(); }
	return JSModeId;
}
function JSSitePerlURL() { 
	var JSSitePerlURL = ""; if ($("#JSSitePerlURL").length > 0) { JSSitePerlURL = $("#JSSitePerlURL").val(); }
	return JSSitePerlURL;
}
function JSSitePHPURL() { 
	var JSSitePHPURL = ""; if ($("#JSSitePHPURL").length > 0) { JSSitePHPURL = $("#JSSitePHPURL").val(); }
	return JSSitePHPURL;
}
function JSSiteWWWURL() { 
	var JSSiteWWWURL = ""; if ($("#JSSiteWWWURL").length > 0) { JSSiteWWWURL = $("#JSSiteWWWURL").val(); }
	return JSSiteWWWURL;
}
function JSSiteWWWPath() { 
	var JSSiteWWWPath = ""; if ($("#JSSiteWWWPath").length > 0) { JSSiteWWWPath = $("#JSSiteWWWPath").val(); }
	return JSSiteWWWPath;
}
function JSSiteFilePath() { 
	var JSSiteFilePath = ""; if ($("#JSSiteFilePath").length > 0) { JSSiteFilePath = $("#JSSiteFilePath").val(); }
	return JSSiteFilePath;
}
function JSDomainWWWPath() { 
	var JSDomainWWWPath = ""; if ($("#JSDomainWWWPath").length > 0) { JSDomainWWWPath = $("#JSDomainWWWPath").val(); }
	return JSDomainWWWPath;
}
function JSDomainWWWURL() { 
	var JSDomainWWWURL = ""; if ($("#JSDomainWWWURL").length > 0) { JSDomainWWWURL = $("#JSDomainWWWURL").val(); }
	return JSDomainWWWURL;
}
function JSCodeVersion() { 
	var JSCodeVersion = ""; if ($("#JSCodeVersion").length > 0) { JSCodeVersion = $("#JSCodeVersion").val(); }
	return JSCodeVersion;
}
function JSActualURL() { 
	var JSActualURL = ""; if ($("#JSActualURL").length > 0) { JSActualURL = $("#JSActualURL").val(); }
	return JSActualURL;
}

function JSPersonId() { 
	var JSPersonId = ""; if ($("#JSPersonId").length > 0) { JSPersonId = $("#JSPersonId").val(); }
	return JSPersonId;
}
function JSSessionId() { 
	var JSSessionId = ""; if ($("#JSSessionId").length > 0) { JSSessionId = $("#JSSessionId").val(); }
	return JSSessionId;
}
function JSLoginModeId() { 
	var JSLoginModeId = ""; if ($("#JSLoginModeId").length > 0) { JSLoginModeId = $("#JSLoginModeId").val(); }
	return JSLoginModeId;
}
function JSMenuId() { 
	var JSMenuId = ""; if ($("#JSMenuId").length > 0) { JSMenuId = $("#JSMenuId").val(); }
	return JSMenuId;
}
function JSCanvasId() { 
	var JSCanvasId = ""; if ($("#JSCanvasId").length > 0) { JSCanvasId = $("#JSCanvasId").val(); }
	return JSCanvasId;
}
function JSOrgTypeId() { 
	var JSOrgTypeId = ""; if ($("#JSOrgTypeId").length > 0) { JSOrgTypeId = $("#JSOrgTypeId").val(); }
	return JSOrgTypeId;
}
function JSOrgId() { 
	var JSOrgId = ""; if ($("#JSOrgId").length > 0) { JSOrgId = $("#JSOrgId").val(); }
	return JSOrgId;
}

function MINPARMS() { 
	 return "?ServiceId="+$("#JSServiceId").val()+"&DomainId="+$("#JSDomainId").val()+"&ModeId="+$("#JSModeId").val();
}
function STDPARMS() {  
         var stdparms = MINPARMS()+"&PersonId="+$("#JSPersonId").val()+"&SessionId="+$("#JSSessionId").val()+"&LoginModeId="+$("#JSLoginModeId").val()+"&MenuId="+$("#JSMenuId").val();
         if ($("#JSCanvasId").length > 0) { stdparms = stdparms+"&CanvasId="+$("#JSCanvasId").val(); }
         if ($("#JSOrgTypeId").length > 0) { stdparms = stdparms+"&OrgTypeId="+$("#JSOrgTypeId").val(); }
         if ($("#JSOrgId").length > 0) { stdparms = stdparms+"&OrgId="+$("#JSOrgId").val(); }
	 return stdparms;     
}




