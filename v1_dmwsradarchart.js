// ============ Drawing Object =====================================																																												;	

$(document).ready( function() {

var DMWSRadarChart = {
  draw: function(id, prevd, thisd, options, showprevdata){
	  var cfg = {
		 radius: 5,
		 w: 600,
		 h: 600,
		 factor: 1,
		 factorLegend: .85,
		 levels: 3,
		 maxValue: 0,
		 radians: 2 * Math.PI,
		 opacityArea: 0.5,
		 ToRight: 5,
		 TranslateX: 80,
		 TranslateY: 30,
		 ExtraWidthX: 100,
		 ExtraWidthY: 100,
		 color: d3.scale.category10()
		};
		
		if('undefined' !== typeof options){
		  for(var i in options){
			if('undefined' !== typeof options[i]){
			  cfg[i] = options[i];
			}
		  }
		}
		cfg.maxValue = Math.max(cfg.maxValue, d3.max(prevd, function(i){return d3.max(i.map(function(o){return o.value;}))}));
		var allAxis = (prevd[0].map(function(i, j){return i.axis}));
		var total = allAxis.length;
		var radius = cfg.factor*Math.min(cfg.w/2, cfg.h/2);
		var Format = d3.format('%');
		d3.select(id).select("svg").remove();
		
		var g = d3.select(id)
				.append("svg")
				.attr("width", cfg.w+cfg.ExtraWidthX)
				.attr("height", cfg.h+cfg.ExtraWidthY)
				.append("g")
				.attr("transform", "translate(" + cfg.TranslateX + "," + cfg.TranslateY + ")");
				;
	
		var tooltip;
		
		//Circular segments
		for(var j=0; j<cfg.levels; j++){
		  var levelFactor = cfg.factor*radius*((j+1)/cfg.levels);
		  g.selectAll(".levels")
		   .data(allAxis)
		   .enter()
		   .append("svg:line")
		   .attr("x1", function(d, i){return levelFactor*(1-cfg.factor*Math.sin(i*cfg.radians/total));})
		   .attr("y1", function(d, i){return levelFactor*(1-cfg.factor*Math.cos(i*cfg.radians/total));})
		   .attr("x2", function(d, i){return levelFactor*(1-cfg.factor*Math.sin((i+1)*cfg.radians/total));})
		   .attr("y2", function(d, i){return levelFactor*(1-cfg.factor*Math.cos((i+1)*cfg.radians/total));})
		   .attr("class", "line")
		   .style("stroke", "grey")
		   .style("stroke-opacity", "0.75")
		   .style("stroke-width", "1.3px")
		   .attr("transform", "translate(" + (cfg.w/2-levelFactor) + ", " + (cfg.h/2-levelFactor) + ")");
		}
	
		
		//Text indicating at what acore each level is
		for(var j=0; j<cfg.levels; j++){
		  var levelFactor = cfg.factor*radius*((j+1)/cfg.levels);
		  g.selectAll(".levels")
		   .data([1]) //dummy data
		   .enter()
		   .append("svg:text")
		   .attr("x", function(d){return levelFactor*(1-cfg.factor*Math.sin(0));})
		   .attr("y", function(d){return levelFactor*(1-cfg.factor*Math.cos(0));})
		   .attr("class", "legend")
		   .style("font-family", "sans-serif")
		   .style("font-size", "10px")
		   .attr("transform", "translate(" + (cfg.w/2-levelFactor + cfg.ToRight) + ", " + (cfg.h/2-levelFactor) + ")")
		   .attr("fill", "#737373")
	//	   .text(Format((j+1)));
		   .text(".."+(j+1));
		}
		
		series = 0;
	
		var axis = g.selectAll(".axis")
				.data(allAxis)
				.enter()
				.append("g")
				.attr("class", "axis");
	
		axis.append("line")
			.attr("x1", cfg.w/2)
			.attr("y1", cfg.h/2)
			.attr("x2", function(d, i){return cfg.w/2*(1-cfg.factor*Math.sin(i*cfg.radians/total));})
			.attr("y2", function(d, i){return cfg.h/2*(1-cfg.factor*Math.cos(i*cfg.radians/total));})
			.attr("class", "line")
			.style("stroke", "grey")
			.style("stroke-width", "1px");
	
		axis.append("text")
			.attr("class", "legend")
			.text(function(d){return d})
			.style("font-family", "sans-serif")
			.style("font-size", "11px")
			.attr("text-anchor", "middle")
			.attr("dy", "1.5em")
			.attr("transform", function(d, i){return "translate(0, -10)"})
			.attr("x", function(d, i){return cfg.w/2*(1-cfg.factorLegend*Math.sin(i*cfg.radians/total))-60*Math.sin(i*cfg.radians/total);})
			.attr("y", function(d, i){return cfg.h/2*(1-Math.cos(i*cfg.radians/total))-20*Math.cos(i*cfg.radians/total);});
	
	 
		if (showprevdata == "ShowPrevData") {
		
			prevd.forEach(function(y, x){
			  dataValues = [];
			  g.selectAll(".nodes")
				.data(y, function(j, i){
				  dataValues.push([
					cfg.w/2*(1-(parseFloat(Math.max(j.value, 0))/cfg.maxValue)*cfg.factor*Math.sin(i*cfg.radians/total)), 
					cfg.h/2*(1-(parseFloat(Math.max(j.value, 0))/cfg.maxValue)*cfg.factor*Math.cos(i*cfg.radians/total))
				  ]);
				});
			  dataValues.push(dataValues[0]);
			  g.selectAll(".area")
							 .data([dataValues])
							 .enter()
							 .append("polygon")
							 .attr("class", "radar-chart-serie"+series)
							 .style("stroke-width", "2px")
							 .style("stroke", cfg.color(series))
							 .attr("points",function(prevd) {
								 var str="";
								 for(var pti=0;pti<prevd.length;pti++){
									 str=str+prevd[pti][0]+","+prevd[pti][1]+" ";
								 }
								 return str;
							  })
							 .style("fill", function(j, i){return cfg.color(series)})
							 .style("fill-opacity", cfg.opacityArea)
							 .on('mouseover', function (prevd){
												z = "polygon."+d3.select(this).attr("class");
												g.selectAll("polygon")
												 .transition(200)
												 .style("fill-opacity", 0.1); 
												g.selectAll(z)
												 .transition(200)
												 .style("fill-opacity", .7);
											  })
							 .on('mouseout', function(){
												g.selectAll("polygon")
												 .transition(200)
												 .style("fill-opacity", cfg.opacityArea);
							 });
			  series++;
			});
			series=0;
			
			prevd.forEach(function(y, x){
			  g.selectAll(".nodes")
				.data(y).enter()
				.append("svg:circle")
				.attr("class", "radar-chart-serie"+series)
				.attr('r', cfg.radius)
				.attr("alt", function(j){return Math.max(j.value, 0)})
				.attr("cx", function(j, i){
				  dataValues.push([
					cfg.w/2*(1-(parseFloat(Math.max(j.value, 0))/cfg.maxValue)*cfg.factor*Math.sin(i*cfg.radians/total)), 
					cfg.h/2*(1-(parseFloat(Math.max(j.value, 0))/cfg.maxValue)*cfg.factor*Math.cos(i*cfg.radians/total))
				]);
				return cfg.w/2*(1-(Math.max(j.value, 0)/cfg.maxValue)*cfg.factor*Math.sin(i*cfg.radians/total));
				})
				.attr("cy", function(j, i){
				  return cfg.h/2*(1-(Math.max(j.value, 0)/cfg.maxValue)*cfg.factor*Math.cos(i*cfg.radians/total));
				})
				.attr("data-id", function(j){return j.axis})
				.style("fill", cfg.color(series)).style("fill-opacity", .9)
				.on('mouseover', function (prevd){
							newX =  parseFloat(d3.select(this).attr('cx')) - 10;
							newY =  parseFloat(d3.select(this).attr('cy')) - 5;
							
							tooltip
								.attr('x', newX)
								.attr('y', newY)
								.text(Format(prevd.value))
								.transition(200)
								.style('opacity', 1);
								
							z = "polygon."+d3.select(this).attr("class");
							g.selectAll("polygon")
								.transition(200)
								.style("fill-opacity", 0.1); 
							g.selectAll(z)
								.transition(200)
								.style("fill-opacity", .7);
						  })
				.on('mouseout', function(){
							tooltip
								.transition(200)
								.style('opacity', 0);
							g.selectAll("polygon")
								.transition(200)
								.style("fill-opacity", cfg.opacityArea);
						  })
				.append("svg:title")
				.text(function(j){return Math.max(j.value, 0)});
		
			  series++;
			});
		}

		
		//Join up latest scores if polygon complete
		var thisdcount = 0;
		for(var ai=0; ai<10; ai++){				
			if ( thisd[ai] >0 ) {
				thisdcount++;
			}
		}		
		
		if ( thisdcount == 10 ) {
			// alert("Complete");
			thisdataValues = [];
			for(var ai=0; ai<10; ai++){
			  // alert(thisd[ai]);
			  thisdataValues.push([
				cfg.w/2*(1-(parseFloat(Math.max(thisd[ai], 0))/cfg.maxValue)*cfg.factor*Math.sin(ai*cfg.radians/total)), 
				cfg.h/2*(1-(parseFloat(Math.max(thisd[ai], 0))/cfg.maxValue)*cfg.factor*Math.cos(ai*cfg.radians/total))
			  ]);
			}  
			thisdataValues.push(thisdataValues[0]);
			// alert(thisdataValues);
			
			g.selectAll(".area")
				 .data([thisdataValues])
				 .enter()
				 .append("polygon")
				 // .attr("class", "radar-chart-serie1")
				 .style("stroke-width", "2px")
				 .style("stroke", "blue")
				.attr("points",function(thisd) {
					 var str="";
					 for(var pti=0;pti<thisd.length;pti++){
						 str=str+thisd[pti][0]+","+thisd[pti][1]+" ";
					 }
					 return str;
				  })	 
				 .style("fill", "transparent")				 
				 // .attr("transform", "translate(" + (cfg.w/2-levelFactor) + ", " + (cfg.h/2-levelFactor) + ")");
		}
			
		//Circular axis markers
		for(var j=0; j<cfg.levels; j++){
		  var levelFactor = cfg.factor*radius*((j+1)/cfg.levels);
		  var level = j+1;
		  g.selectAll(".levels")
		  	.data(allAxis)
		  	.enter()	  
			.append("svg:circle")
			.attr("id", function(j, i){return "selectpoint_"+i+"_"+level})		
			.attr("class", "radar-chart-selectpoint")
			.attr('r', cfg.radius*2)
			.attr("alt", function(j){return Math.max(j.value, 0)})
			.attr("cx", function(j, i){return levelFactor*(1-cfg.factor*Math.sin((i)*cfg.radians/total));})
			.attr("cy", function(j, i){return levelFactor*(1-cfg.factor*Math.cos((i)*cfg.radians/total));})
			.style("fill", "#888888").style("fill-opacity", .3)
			.attr("transform", "translate(" + (cfg.w/2-levelFactor) + ", " + (cfg.h/2-levelFactor) + ")");
		}
		
		for(var ai=0; ai<10; ai++){
			for(var vi=0; vi<5; vi++){			
				$('#'+"selectpoint_"+ai+"_"+(vi+1)).css({ 'fill': "#888888" });
				$('#'+"selectpoint_"+ai+"_"+(vi+1)).css({ 'fill-opacity': "0.3" });
			}				
			if ( thisd[ai] >0 ) {
				$('#'+"selectpoint_"+ai+"_"+thisd[ai]).css({ 'fill': "#0000FF" });
				$('#'+"selectpoint_"+ai+"_"+thisd[ai]).css({ 'fill-opacity': "1.0" });
			}
		}
		
		$('.radar-chart-selectpoint').on('click', function(event) {
			currentselectpointid = $(this).attr("id");
			var ida = currentselectpointid.split("_");
			var thisaxis = ida[1];
			var thisvalue = ida[2];
			thisd[thisaxis] = thisvalue;
			for(var vi=0; vi<5; vi++){			
				$('#'+"selectpoint_"+thisaxis+"_"+(vi+1)).css({ 'fill': "#888888" });
				$('#'+"selectpoint_"+thisaxis+"_"+(vi+1)).css({ 'fill-opacity': "0.3" });
			}		
			$('#'+currentselectpointid).css({ 'fill': "#0000FF" });
			$('#'+"selectpoint_"+thisaxis+"_"+thisvalue).css({ 'fill-opacity': "1.0" });
			redrawRadarChart();
			
		});	
		
		//Tooltip
		tooltip = g.append('text')
				   .style('opacity', 0)
				   .style('font-family', 'sans-serif')
				   .style('font-size', '13px');
  }
};



//============ Code executed on load =====================================	
  

	
	var w = 500,
	h = 500;

	var colorscale = d3.scale.category10();

	//Legend titles
	var LegendOptions = ['Smartphone','Tablet'];

	//Data
	
	var dmwsprogressidlist = $('#dmwsprogressidlist').val();
	var listida = dmwsprogressidlist.split(",");
	var prevd = [];
	var thisd = [0,0,0,0,0,0,0,0,0,0];
	for (var key in listida) {
		var da2 = [];
		var da3 = [];
		da3["axis"] = "Current Admission or Treatment";
		da3["value"] = $('#dmwsprogress_treatment_'+listida[key]).val();
		da2.push(da3);
		var da3 = [];
		da3["axis"] = "General Health";
		da3["value"] = $('#dmwsprogress_health_'+listida[key]).val();
		da2.push(da3);
		var da3 = [];
		da3["axis"] = "General Wellbeing";
		da3["value"] = $('#dmwsprogress_wellbeing_'+listida[key]).val();
		da2.push(da3);		
		var da3 = [];
		da3["axis"] = "Family";
		da3["value"] = $('#dmwsprogress_family_'+listida[key]).val();
		da2.push(da3);		
		var da3 = [];
		da3["axis"] = "Relationships";
		da3["value"] = $('#dmwsprogress_relationships_'+listida[key]).val();
		da2.push(da3);		
		var da3 = [];
		da3["axis"] = "Housing";
		da3["value"] = $('#dmwsprogress_housing_'+listida[key]).val();
		da2.push(da3);		
		var da3 = [];
		da3["axis"] = "Finance";
		da3["value"] = $('#dmwsprogress_finance_'+listida[key]).val();
		da2.push(da3);
		var da3 = [];
		da3["axis"] = "Work";
		da3["value"] = $('#dmwsprogress_work_'+listida[key]).val();
		da2.push(da3);	
		var da3 = [];
		da3["axis"] = "Social Life";
		da3["value"] = $('#dmwsprogress_social_'+listida[key]).val();
		da2.push(da3);
		var da3 = [];
		da3["axis"] = "Activities";
		da3["value"] = $('#dmwsprogress_activities_'+listida[key]).val();
		da2.push(da3);
		prevd.push(da2);
	}
	
	
	//Options for the Radar chart, other than default
	var mycfg = {
	  w: w,
	  h: h,
	  maxValue: 5,
	  levels: 5,
	  ExtraWidthX: 300
	}

	//Call function to draw the Radar chart
	//Will expect that data is in %'s
	DMWSRadarChart.draw("#chart", prevd, thisd, mycfg, "HidePrevData");
	
	////////////////////////////////////////////
	/////////// Initiate legend ////////////////
	////////////////////////////////////////////
	
	var svg = d3.select('#body')
		.selectAll('svg')
		.append('svg')
		.attr("width", w+300)
		.attr("height", h)
	
	//Create the title for the legend
	var text = svg.append("text")
		.attr("class", "title")
		.attr('transform', 'translate(90,0)') 
		.attr("x", w - 70)
		.attr("y", 10)
		.attr("font-size", "12px")
		.attr("fill", "#404040")
		.text("What % of owners use a specific service in a week");
			
	//Initiate Legend	
	var legend = svg.append("g")
		.attr("class", "legend")
		.attr("height", 100)
		.attr("width", 200)
		.attr('transform', 'translate(90,20)') 
		;
	//Create colour squares
	legend.selectAll('rect')
	  .data(LegendOptions)
	  .enter()
	  .append("rect")
	  .attr("x", w - 65)
	  .attr("y", function(d, i){ return i * 20;})
	  .attr("width", 10)
	  .attr("height", 10)
	  .style("fill", function(d, i){ return colorscale(i);})
	  ;
	//Create text next to squares
	legend.selectAll('text')
	  .data(LegendOptions)
	  .enter()
	  .append("text")
	  .attr("x", w - 52)
	  .attr("y", function(d, i){ return i * 20 + 9;})
	  .attr("font-size", "11px")
	  .attr("fill", "#737373")
	  .text(function(d) { return d; })
	  ;	

	$('#ShowDataButton').on('click', function(event) {
		var showdatabuttontext = $('#ShowDataButton').html();
		if (showdatabuttontext == "Show Previous Data" ) {
			DMWSRadarChart.draw("#chart", prevd, thisd, mycfg, "ShowPrevData");
			$('#ShowDataButton').html("Hide Previous Data");
		} else {
			DMWSRadarChart.draw("#chart", prevd, thisd, mycfg, "HidePrevData");
			$('#ShowDataButton').html("Show Previous Data");
		}
	})			
	
	function redrawRadarChart() {
		var showdatabuttontext = $('#ShowDataButton').html();
		if (showdatabuttontext == "Show Previous Data" ) {
			DMWSRadarChart.draw("#chart", prevd, thisd, mycfg, "HidePrevData");
		} else {
			DMWSRadarChart.draw("#chart", prevd, thisd, mycfg, "ShowPrevData");
		}
	}
	
	
});
        