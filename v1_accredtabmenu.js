YAHOO.namespace ("BBaccredtabmenu");
var accredtabView;
function initPage() {
    tabView = new YAHOO.widget.TabView('accredtabmenu');
	//set the active Tab to the cookie value, if present:
	if (YAHOO.util.Cookie.get("accredtabcookie")) {
		tabView.set("activeTab", tabView.getTab(YAHOO.util.Cookie.get("accredtabcookie")));
	};
	//when a Tab changes, set the cookie:
	tabView.on("activeTabChange", function(o) {
		YAHOO.util.Cookie.set("accredtabcookie", this.getTabIndex(o.newValue));
	});
}
function gotoTab (ndx) {
	accredtabView.set('accredactiveIndex', ndx);
}
YAHOO.util.Event.addListener(window, "load", initPage);