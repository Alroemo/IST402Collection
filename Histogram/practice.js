var margin = {top: 50, right: 30, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

var mode = 0;

//Here the chart is made
var chart = d3.select(".chart")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//This scales the x-axis
var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);

//This scales the y-axis
var y = d3.scale.linear()
    .range([height, 0]);

//Here the axis are defined and scaled
var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");
	
//here is the array the data from histogramdata.tsv is stored in
var bardata = [ ];

//read data and create chart
d3.tsv("data.tsv", type, function(error, data) {
 bardata= data;
 checkbardata= data;
 
    //X and Y's dimensions are set
    x.domain(data.map(function(d) { return d.name; }));
    y.domain([0, d3.max(data, function(d) { return d.count; })]);

    //The x-axis is made and put in the bottom 
    chart.append("g")
	   .attr("class", "axis")
	   .attr("transform", "translate(0," + height + ")")
	   .call(xAxis);

    //The y-axis is made
    chart.append("g")
	   .attr("class", "axis")
	   .call(yAxis);

    //The dots are made
    chart.selectAll(".dot")
	   .data(bardata)
	   .enter().append("circle")
	   .attr("class", "dot")
	   .attr("cx", function(d) { return x(d.name); }) //this is the x-position
	   .attr("cy", function(d) { return y(d.count); })//this is the y-position
	   .attr("r", function(d) { return (height - y(d.count))/50; })//Sets the sixe of the rectangle
	   .attr("width", x.rangeBand()); //The width is set
	 
	  
});


function type(d) {
    d.value = +d.value; // coerce to number
    return d;
    
}
d3.select("svg")
    .on("mousedown", function(){
        //console.log("x:" + d3.mouse(this)[0]+"y:"+d3.mouse(this)[1]);
		var mousePosition = d3.mouse(this);
		mousedown(mousePosition)});

	function mousedown(mousePosition){
		var xPress = mousePosition[0];
		var yPress = mousePosition[1];
		
		if(xPress < 50){
			if(mode == 1){
				bardata.sort(function(a,b){return b.value - a.value});
				mode = 2;
			}
			else{
				bardata.sort(function(a,b) {return b.value - a.value;});
				mode = 1;
			}
			bardata.sort((mode == 1)
				 ? function(a,b) {return b.value-a.value;}
				 : function(a,b) {return a.value-b.value;})
			mode = ((mode == 1) ? 2 : 1);
			update();
		} else if (yPress >= 470){
			if (mode == 3 ){
				bardata.sort(function(a,b) {return d3.descending(a.name, b.name);}); //descending on x
				mode = 4;
			} else {
				bardata.sort(function(a,b) {return d3.ascending(a.name, b.name);}); //ascending on x
				mode = 3;
			}
			bardata.sort((mode == 3)
				 ? function(a,b) {return d3.descending(a.name, b.name);}
				 : function(a,b) {return  d3.ascending(a.name, b.name);})
			mode = ((mode == 3) ? 4: 3);
			update();
		}
	}
	
	function update(){
		var x0 = x.domain(bardata.map(function(d) {return d.name; })).copy();
		d3.selectAll(".dot")
			.transition()
			.duration(2000)
			.attr("x",function(d){return x0(d.name);});
		d3.select(".xaxis")
			.transition()
			.duration(2000)
			.call(xAxis)
	}	draw();

	function draw(){
    console.log("abc");
    console.log( bardata);
    x.domain(bardata.map(function(d) { return d.name; }));
    y.domain([0, d3.max(bardata, function(d) { return d.value; })]);

    chart.append("g")
	   .attr("class", "xaxis")
	   .attr("transform", "translate(0," + height + ")")
	   .call(xAxis);

    chart.append("g")
	   .attr("class", "yaxis")
	   .call(yAxis);
	   
	//The dots are made
    chart.selectAll(".dot")
	   .data(bardata)
	   .enter().append("circle")
	   .attr("class", "dot")
	   .attr("cx", function(d) { return x(d.name); }) //this is the x-position
	   .attr("cy", function(d) { return y(d.count); })//this is the y-position
	   .attr("r", function(d) { return (height - y(d.count))/50; })//Sets the sixe of the rectangle
	   .attr("width", x.rangeBand()); //The width is set

}





