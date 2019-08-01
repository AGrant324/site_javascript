YAHOO.namespace("BBlibraryviewtable");
	
YAHOO.util.Event.addListener(window, "load", function() { 
	
  // initialise logger
  // myLogConfigs = {width: "500px", right: "10em", top: "10%", fontSize: "80%" };
  // myLogContainer = null;
  // myLogReader = new YAHOO.widget.LogReader(myLogContainer, myLogConfigs);
  // YAHOO.log("init called","info");	

  YAHOO.example.EnhanceFromMarkup = new function() { 
    var myColumnDefs = [ 
     {key:"date",label:"Date",width:40,resizeable:true,sortable:true}, 
     {key:"title",label:"Title",width:180,resizeable:true, sortable:true}, 
     {key:"filename",label:"File Name",width:180,resizeable:true,sortable:true},
     {key:"author",label:"Author",width:60,resizeable:true,sortable:true},     
     {key:"description",label:"Description",width:180,resizeable:true,sortable:true},
     {key:"view",label:"View",width:30,resizeable:true,sortable:true}     
   ];

   this.myDataSource = new YAHOO.util.DataSource(YAHOO.util.Dom.get("assets")); 
   this.myDataSource.responseType = YAHOO.util.DataSource.TYPE_HTMLTABLE; 
   this.myDataSource.responseSchema = { 
     fields: [{key:"date"}, 
          {key:"title"}, 
          {key:"filename"},
          {key:"author"},          
          {key:"description"},
          {key:"view"}          
     ]  
    }; 

    this.myDataTable = new YAHOO.widget.DataTable("libraryview", myColumnDefs, this.myDataSource, 
     {caption:"Library View", 
      sortedBy:{key:"date",dir:"asc"}} 
    );  
    
  };
  
});
