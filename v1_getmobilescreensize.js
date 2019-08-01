
function initPage() 
{
 xWidth = "default";
 if(window.screen != "default") { xWidth = window.screen.availWidth; }
 if(window.innerWidth != "default") { xWidth = window.innerWidth; }
 if(document.body != "default") { xWidth = document.body.clientWidth; }
 document.getElementById("MobileScreenWidth").value = xWidth;
// alert("width|"+xWidth);
 xHeight = "default";
 if(window.screen != "default")  { xHeight = window.screen.availHeight; }
 if(window.innerHeight != "default") { xHeight = window.innerHeight; }
 if(document.body != "default") { xHeight = document.body.clientHeight; }
 document.getElementById("MobileScreenHeight").value = xHeight;
// alert("height|"+xHeight);
}	 

window.onload = initPage;