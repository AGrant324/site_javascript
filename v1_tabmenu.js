YAHOO.namespace ("BBtabmenu");
var tabView;
function initPage() {
	var element = YAHOO.util.Dom.getElementsByClassName('yui-navset')[0];
    tabView = new YAHOO.widget.TabView(element.id);
	var cookiename = element.id + "_tabcookie";
//	alert(cookiename);
    //set the active Tab to the cookie value, if present:
	if (YAHOO.util.Cookie.get(cookiename)) {
		tabView.set("activeTab", tabView.getTab(YAHOO.util.Cookie.get(cookiename)));
	};	
	//when a Tab changes, set the cookie:
	tabView.on("activeTabChange", function(o) {
		YAHOO.util.Cookie.set(cookiename, this.getTabIndex(o.newValue));
	});
}
function gotoTab (ndx) {
	tabView.set('activeIndex', ndx);
}
YAHOO.util.Event.addListener(window, "load", initPage);