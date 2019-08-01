    $(document).ready( function() {
    	
    	$.fn.getTab = function () {
    	    this.keydown(function (e) {
    	        if (e.keyCode === 9) {
    	            var val = this.value,
    	                start = this.selectionStart,
    	                end = this.selectionEnd;
    	            this.value = val.substring(0, start) + '\t' + val.substring(end);
    	            this.selectionStart = this.selectionEnd = start + 1;
    	            return false;
    	        }
    	        return true;
    	    });
    	    return this;
    	};

    	$("textarea").getTab();
    	
    	$("textarea").css("font-family", "Courier");
    	
    	
    	
    });