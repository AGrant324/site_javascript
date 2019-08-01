tinymce.init({
  selector: 'textarea.mceEditor',
  height : "300px",	
  theme: 'modern',
  forced_root_block : "", 
  force_br_newlines : true,
  force_p_newlines : false,
  convert_urls:true,
  relative_urls:false,
  remove_script_host:false,
  file_browser_callback : tinyMCESlimCallUpload,
  /*
  file_picker_callback: function (callback, value, meta) {
	  tinyMCECallUpload(callback, value, meta);
  },
  */  
  plugins: [
      "code table"
  ],
  menubar: "format table tools",
  // following line is to preserve bootstrap formatted sections
  extended_valid_elements : "ol[class],ul[class],li[class|data-target|data-slide-to|a|i],a[class|href|data-slide|span],span[*],i[class],div[*],p[*],br[*],hr[*],section[*],script[*]",
  
  // forced_root_block : false,
  toolbar1: 'undo redo | styleselect fontsizeselect |forecolor backcolor | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image code',
  image_advtab: true,
  templates: [
    { title: 'Test template 1', content: 'Test 1' },
    { title: 'Test template 2', content: 'Test 2' }
  ],
  code_dialog_height: 1500,
  code_dialog_height: 600,
  entity_encoding : "named",
  
  setup: function (editor) {
	
	// Add a pluginarea
	editor.addButton('pluginarea', {
		   title : 'Insert Plugin Area',
		   image : '../site_assets/pluginarea.gif',
		   onclick : function() {
		    // Add you own code to execute something on click
		    editor.focus();
		    var insertedsection = "\n";		    
		    insertedsection = insertedsection + '<div class="editablepluginarea" style="height:100px; width:100%; border: 2px dotted navy; text-align: center; padding-top: 40px;" >';
			insertedsection = insertedsection + "\n"+'<div class="editablepluginareamarker" >';
			insertedsection = insertedsection + '<button type="button" class="btn btn-warning" title="Add Plugin">Add Plugin</button>';			
			insertedsection = insertedsection + '</div>';
			insertedsection = insertedsection + "\n" + '</div>' + "\n";				
		    editor.selection.setContent(insertedsection);
		   }
	});		
  
  },
  
  /*
  content_css: [
    '//fast.fonts.net/cssapi/e6dc9b99-64fe-4292-ad98-6974f93cd2a2.css',
    '//www.tinymce.com/css/codepen.min.css'
  ]
 */
    
    });

