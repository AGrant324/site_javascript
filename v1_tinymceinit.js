tinymce.init({
  selector: 'textarea.mceEditor',
  height : "500px",	
  theme: 'modern',
  convert_urls:true,
  relative_urls:false,
  remove_script_host:false,
  file_browser_callback : tinyMCECallUpload,
  /*
  file_picker_callback: function (callback, value, meta) {
	  tinyMCECallUpload(callback, value, meta);
  },
  */
  plugins: [
    'advlist autolink lists link image charmap print preview hr anchor pagebreak',
    'searchreplace wordcount visualblocks visualchars code fullscreen',
    'insertdatetime media nonbreaking save table contextmenu directionality',
    'emoticons template paste textcolor colorpicker textpattern imagetools'
  ],
  // following line is to preserve bootstrap formatted sections
  extended_valid_elements : "*[*]",

  toolbar1: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
  toolbar2: 'print preview media | forecolor backcolor emoticons | formattedsection board photogallery videogallery eventlist articlelist courselist shop contacts frs | code',
  image_advtab: true,
  templates: [
    { title: 'Test template 1', content: 'Test 1' },
    { title: 'Test template 2', content: 'Test 2' }
  ],
  code_dialog_height: 1500,
  code_dialog_height: 600,
  
  
  setup: function (editor) {
	// Add a formatted section
	editor.addButton('formattedsection', {
		   title : 'Insert Formatted Section',
		   image : '../site_assets/formattedsection.gif',
		   onclick : function() {
			$("#formattedsectionpopup").dialog("open");
			$("#formattedsectionpopup").css({height:"600px", overflow:"auto"});
		    // Add you own code to execute something on click
		    // editor.focus();
		    // editor.selection.setContent("\n"+'<p><img src="../site_assets/bulletinboard.gif"> [Name=xxxxxx]</p>'+"\n");
		   }
	});
	// Add a bulletin board
	editor.addButton('board', {
		   title : 'Insert Bulletin Board',
		   image : '../site_assets/bulletinboard.gif',
		   onclick : function() {
		    // Add you own code to execute something on click
		    editor.focus();
		    editor.selection.setContent("\n"+'<p><img src="../site_assets/bulletinboard.gif"> [Name=xxxxxx]</p>'+"\n");
		   }
	});
	// Add a photogallery button
	editor.addButton('photogallery', {
		   title : 'Insert Photo Gallery',
		   image : '../site_assets/photogallery.gif',
		   onclick : function() {
		    // Add you own code to execute something on click
		    editor.focus();
		    editor.selection.setContent("\n"+'<p><img src="../site_assets/photogallery.gif"> [LibrarySection=xxxxxx]</p>'+"\n");
		   }
	});
	// Add a videogallery button
	editor.addButton('videogallery', {
		   title : 'Insert Video Gallery',
		   image : '../site_assets/videogallery.gif',
		   onclick : function() {
		    // Add you own code to execute something on click
		    editor.focus();
		    editor.selection.setContent("\n"+'<p><img src="../site_assets/videogallery.gif"> [LibrarySection=xxxxxx]</p>'+"\n");
		   }
	});
	// Add a events list button
	editor.addButton('eventlist', {
		   title : 'Insert Events List',
		   image : '../site_assets/event.gif',
		   onclick : function() {
		    // Add you own code to execute something on click
		    editor.focus();
		    editor.selection.setContent("\n"+'<p id="EventList"><img src="../site_assets/event.gif"> [EventList:categoryid=all;date=future;sortby=date;sortseq=asc;show=full;max=10]</p>'+"\n");
		   }
	});
	editor.addButton('articlelist', {
		   title : 'Insert Articles List',
		   image : '../site_assets/article.gif',
		   onclick : function() {
		    // Add you own code to execute something on click
		    editor.focus();
		    editor.selection.setContent("\n"+'<p id="ArticleList"><img src="../site_assets/article.gif"> [ArticleList:categoryid=all;sortby=date;sortseq=desc;show=full;max=10]</p>'+"\n");
		   }
	});
	editor.addButton('courselist', {
		   title : 'Insert Courses List',
		   image : '../site_assets/course.gif',
		   onclick : function() {
		    // Add you own code to execute something on click
		    editor.focus();
		    editor.selection.setContent("\n"+'<p id="CourseList"><img src="../site_assets/course.gif"> [CourseList:categoryid=all;sortby=date;sortseq=desc;show=full;max=10]</p>'+"\n");
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

