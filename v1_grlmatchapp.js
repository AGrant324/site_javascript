$(document).ready( function() { 
	//$("#addeventdiv").hide();
	$("#grlleagueid").change(function(){
		//var leagueid = $(this).val();
	})
	
	
	$("#grlgoalicon").click(function(){
		//alert("here");
		var newref = TtimeStamp();
		var insertgoalinfo = "";
		insertgoalinfo = insertgoalinfo + '<input type=hidden id="grlgoalupdate_startfield_'+newref+'" name="grlgoalupdate_startfield_'+newref+'" value="">';
		insertgoalinfo = insertgoalinfo + '<div class="row row-eq-height">';
		insertgoalinfo = insertgoalinfo + '<div class="vcenter col-sm-2 goal'+newref+'" style="background-color:#539D2F; color:white;"><b>Team</b></div>';
		insertgoalinfo = insertgoalinfo + '<div class="vcenter col-sm-2 goal'+newref+'" style="background-color:#539D2F; color:white;"><b>Player</b></div>';
		insertgoalinfo = insertgoalinfo + '<div class="vcenter col-sm-2 goal'+newref+'" style="background-color:#539D2F; color:white;"><b>Minute</b></div>';
		insertgoalinfo = insertgoalinfo + '<div class="vcenter col-sm-2 goal'+newref+'" style="background-color:#539D2F; color:white;"><b>Penalty?</b></div>';
		insertgoalinfo = insertgoalinfo + '</div>';		
		insertgoalinfo = insertgoalinfo + '<br/>';
		insertgoalinfo = insertgoalinfo + '<div class="row row-eq-height">';
		insertgoalinfo = insertgoalinfo + '<div class="col-sm-2"><input id="grlgoal_personid_new'+newref+'" name="grlgoal_personid_new'+newref+'" class="form-control" type="text" value=""></div>';
		insertgoalinfo = insertgoalinfo + '<div class="col-sm-2"><input id="grlgoal_contactref_new'+newref+'" name="grlgoal_contactref_new'+newref+'" class="form-control" type="text" value=""></div>';
		insertgoalinfo = insertgoalinfo + '<div class="col-sm-2"><input id="grlgoal_statusupdate_new'+newref+'" name="grlgoal_statusupdate_new'+newref+'" class="form-control" type="text" value=""></div>';
		insertgoalinfo = insertgoalinfo + '<div class="col-sm-2"><input id="grlgoal_response_new'+newref+'" name="grlgoal_response_new'+newref+'" class="form-control" type="text" value=""></div>';	
		insertgoalinfo = insertgoalinfo + '<button id="dmwsserviceprovided_add_new" type="button" class="btn btn-info">+</button>';
		insertgoalinfo = insertgoalinfo + '<div class="col-sm-1">';
		insertgoalinfo = insertgoalinfo + '<button id="grlevent_goal_delete_'+newref+'" class="grleventdelete btn btn-danger" type="button" >x</button>';
		insertgoalinfo = insertgoalinfo + '</div>';	
		insertgoalinfo = insertgoalinfo + '<input type=hidden id="grlgoalupdate_endfield_'+newref+'" name="grlgoalupdate_endfield_'+newref+'" value="">';
		insertgoalinfo = insertgoalinfo + '</div>';	
		insertgoalinfo = insertgoalinfo + '<br/>';
		insertgoalinfo = insertgoalinfo + '<hr/>';
		//dmwsreferrerupdateida["new"+refinnewindex] = "new"+refinnewindex;
		$("#grlmatchupdatelistend" ).before( insertgoalinfo );
		grleventdeletelistener();

	});
	
	$("#grlcardicon").click(function(){
		//alert("here");
		var newref = TtimeStamp();
		var insertcardinfo = "";
		insertcardinfo = insertcardinfo + '<input type=hidden id="grlgoalupdate_startfield_'+newref+'" name="grlgoalupdate_startfield_'+newref+'" value="">';
		insertcardinfo = insertcardinfo + '<div class="row row-eq-height">';
		insertcardinfo = insertcardinfo + '<div class="vcenter col-sm-2 card'+newref+'" style="background-color:#539D2F; color:white;"><b>Team</b></div>';
		insertcardinfo = insertcardinfo + '<div class="vcenter col-sm-2 card'+newref+'" style="background-color:#539D2F; color:white;"><b>Player</b></div>';
		insertcardinfo = insertcardinfo + '<div class="vcenter col-sm-2 card'+newref+'" style="background-color:#539D2F; color:white;"><b>Minute</b></div>';
		insertcardinfo = insertcardinfo + '<div class="vcenter col-sm-2 card'+newref+'" style="background-color:#539D2F; color:white;"><b>Card</b></div>';
		insertcardinfo = insertcardinfo + '</div>';
		insertcardinfo = insertcardinfo + '<br/>';
		insertcardinfo = insertcardinfo + '<div class="row row-eq-height">';
		insertcardinfo = insertcardinfo + '<div class="col-sm-2"><input id="grlcard_personid_new'+newref+'" name="grlcard_personid_new'+newref+'" class="form-control" type="text" value=""></div>';
		insertcardinfo = insertcardinfo + '<div class="col-sm-2"><input id="grlcard_contactref_new'+newref+'" name="grlcard_contactref_new'+newref+'" class="form-control" type="text" value=""></div>';
		insertcardinfo = insertcardinfo + '<div class="col-sm-2"><input id="grlcard_statusupdate_new'+newref+'" name="grlcard_statusupdate_new'+newref+'" class="form-control" type="text" value=""></div>';
		insertcardinfo = insertcardinfo + '<div class="col-sm-2"><input id="grlcard_response_new'+newref+'" name="grlcard_response_new'+newref+'" class="form-control" type="text" value=""></div>';	
		insertcardinfo = insertcardinfo + '<button id="dmwsserviceprovided_add_new" type="button" class="btn btn-info">+</button>';
		insertcardinfo = insertcardinfo + '<div class="col-sm-1">';
		insertcardinfo = insertcardinfo + '<button id="grlevent_card_delete_'+newref+'" class="grleventdelete btn btn-danger" type="button" >x</button>';
		insertcardinfo = insertcardinfo + '</div>';
		insertcardinfo = insertcardinfo + '<input type=hidden id="grlgoalupdate_endfield_'+newref+'" name="grlgoalupdate_endfield_'+newref+'" value="">';
		insertcardinfo = insertcardinfo + '</div>';
		insertcardinfo = insertcardinfo + '<br/>';
		insertcardinfo = insertcardinfo + '<hr/>';
		//dmwsreferrerupdateida["new"+refinnewindex] = "new"+refinnewindex;
		$("#grlmatchupdatelistend" ).before( insertcardinfo );
		grleventdeletelistener();

	});
	
	$("#grlinjuryicon").click(function(){
		//alert("here");
		var newref = TtimeStamp();
		var insertinjuryinfo = "";
		insertinjuryinfo = insertinjuryinfo + '<input type=hidden id="grlgoalupdate_startfield_'+newref+'" name="grlgoalupdate_startfield_'+newref+'" value="">';
		insertinjuryinfo = insertinjuryinfo + '<div class="row row-eq-height">';
		insertinjuryinfo = insertinjuryinfo + '<div class="vcenter col-sm-2 injury'+newref+'" style="background-color:#539D2F; color:white;"><b>Team</b></div>';
		insertinjuryinfo = insertinjuryinfo + '<div class="vcenter col-sm-2 injury'+newref+'" style="background-color:#539D2F; color:white;"><b>Player</b></div>';
		insertinjuryinfo = insertinjuryinfo + '<div class="vcenter col-sm-2 injury'+newref+'" style="background-color:#539D2F; color:white;"><b>Minute</b></div>';
		insertinjuryinfo = insertinjuryinfo + '</div>';
		insertinjuryinfo = insertinjuryinfo + '<br/>';
		insertinjuryinfo = insertinjuryinfo + '<div class="row row-eq-height">';
		insertinjuryinfo = insertinjuryinfo + '<div class="col-sm-2"><input id="grlinjury_personid_new'+newref+'" name="grlinjury_personid_new'+newref+'" class="form-control" type="text" value=""></div>';
		insertinjuryinfo = insertinjuryinfo + '<div class="col-sm-2"><input id="grlinjury_contactref_new'+newref+'" name="grlinjury_contactref_new'+newref+'" class="form-control" type="text" value=""></div>';
		insertinjuryinfo = insertinjuryinfo + '<div class="col-sm-2"><input id="grlinjury_statusupdate_new'+newref+'" name="grlinjury_statusupdate_new'+newref+'" class="form-control" type="text" value=""></div>';
		insertinjuryinfo = insertinjuryinfo + '<button id="dmwsserviceprovided_add_new" type="button" class="btn btn-info">+</button>';
		insertinjuryinfo = insertinjuryinfo + '<div class="col-sm-1">';
		insertinjuryinfo = insertinjuryinfo + '<button id="grlevent_injury_delete_'+newref+'" class="grleventdelete btn btn-danger" type="button" >x</button>';
		insertinjuryinfo = insertinjuryinfo + '</div>';
		insertinjuryinfo = insertinjuryinfo + '<input type=hidden id="grlgoalupdate_endfield_'+newref+'" name="grlgoalupdate_endfield_'+newref+'" value="">';
		insertinjuryinfo = insertinjuryinfo + '</div>';
		insertinjuryinfo = insertinjuryinfo + '<br/>';
		insertinjuryinfo = insertinjuryinfo + '<hr/>';
		//dmwsreferrerupdateida["new"+refinnewindex] = "new"+refinnewindex;
		$("#grlmatchupdatelistend" ).before( insertinjuryinfo );
		grleventdeletelistener();
	});
	
	$("#grlsubicon").click(function(){
		//alert("here");
		var newref = TtimeStamp();
		var insertsubinfo = "";
		insertsubinfo = insertsubinfo + '<input type=hidden id="grlgoalupdate_startfield_'+newref+'" name="grlgoalupdate_startfield_'+newref+'" value="">';
		insertsubinfo = insertsubinfo + '<div class="row row-eq-height">';
		insertsubinfo = insertsubinfo + '<div class="vcenter col-sm-2 sub'+newref+'" style="background-color:#539D2F; color:white;"><b>Team</b></div>';
		insertsubinfo = insertsubinfo + '<div class="vcenter col-sm-2 sub'+newref+'" style="background-color:#539D2F; color:white;"><b>Player Off</b></div>';
		insertsubinfo = insertsubinfo + '<div class="vcenter col-sm-2 sub'+newref+'" style="background-color:#539D2F; color:white;"><b>Player On</b></div>';
		insertsubinfo = insertsubinfo + '<div class="vcenter col-sm-2 sub'+newref+'" style="background-color:#539D2F; color:white;"><b>Minute</b></div>';
		insertsubinfo = insertsubinfo + '</div>';
		insertsubinfo = insertsubinfo + '<br/>';
		insertsubinfo = insertsubinfo + '<div class="row row-eq-height">';
		insertsubinfo = insertsubinfo + '<div class="col-sm-2"><input id="grlsub_personid_new'+newref+'" name="grlsub_personid_new'+newref+'" class="form-control" type="text" value=""></div>';
		insertsubinfo = insertsubinfo + '<div class="col-sm-2"><input id="grlsub_contactref_new'+newref+'" name="grlsub_contactref_new'+newref+'" class="form-control" type="text" value=""></div>';
		insertsubinfo = insertsubinfo + '<div class="col-sm-2"><input id="grlsub_contactref_new'+newref+'" name="grlsub_contactref_new'+newref+'" class="form-control" type="text" value=""></div>';
		insertsubinfo = insertsubinfo + '<div class="col-sm-2"><input id="grlsub_statusupdate_new'+newref+'" name="grlsub_statusupdate_new'+newref+'" class="form-control" type="text" value=""></div>';	
		insertsubinfo = insertsubinfo + '<button id="dmwsserviceprovided_add_new" type="button" class="btn btn-info">+</button>';
		insertsubinfo = insertsubinfo + '<div class="col-sm-1">';
		insertsubinfo = insertsubinfo + '<button id="grlevent_sub_delete_'+newref+'" class="grleventdelete btn btn-danger" type="button" >x</button>';
		insertsubinfo = insertsubinfo + '</div>';
		insertsubinfo = insertsubinfo + '<input type=hidden id="grlgoalupdate_endfield_'+newref+'" name="grlgoalupdate_endfield_'+newref+'" value="">';
		insertsubinfo = insertsubinfo + '</div>';
		insertsubinfo = insertsubinfo + '<br/>';
		insertsubinfo = insertsubinfo + '<hr/>';
		//dmwsreferrerupdateida["new"+refinnewindex] = "new"+refinnewindex;
		$("#grlmatchupdatelistend").before( insertsubinfo );
		grleventdeletelistener();
	});
	
	
	function grleventdeletelistener() {
		$('.grleventdelete').on('click', function(event) {			
			var result = confirm("Do you want to delete this entry?");
			if (result) {
			    var id = $(this).attr("id");
			    var ida = id.split("_");
			    var btnclass = ida[1];
			    var tstamp = ida[3];
				$(this).parent().parent().remove();	
				$('.'+btnclass+tstamp).each(function(){
					$(this).remove();	
				})
			}			
		})	
	}

})