var testArray = [6,1,8,5,2,7,4,3,9];
var bardata = [];
var mode = 1;

//margins, width, and height of the chart
var margin = {top: 50, right: 30, bottom: 30, left: 40},
    width = 500 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var svg = d3.select("body").append("svg")
.attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//create the chart
var chart = d3.select(".chart")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//scale of x axis
var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], 0.2);
	

//scale of y axis
var y = d3.scale.linear()
    .range([height, 0]);

//define axes
var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

//read data and create chart
d3.tsv("data.tsv", type, function(error, data) {
    bardata = data;
    //define the domains of x and y dimensions
    x.domain(data.map(function(d) { return d.name; }));
    y.domain([0, d3.max(data, function(d) { return d.value; })]);

    //create x axis and place it at the bottom
    chart.append("g")
	   .attr("class", "axis")
	   .attr("transform", "translate(0," + height + ")")
	   .call(xAxis);
	   


    //create y axis
    chart.append("g")
	   .attr("class", "axis")
	   .call(yAxis);

	   

    //create bars
    chart.selectAll(".bar")
	   .data(data)
	   .enter().append("rect")
	   .attr("class", "bar")
	   .attr("x", function(d) { return x(d.name); }) //x position
	   .attr("y", function(d) { return y(d.value); })//y position
	   .attr("height", function(d) { return height - y(d.value); })//size of rect
	   .on("mouseover", function(){
	       d3.select(this).style("fill", "green"); })
	   .on("mouseout", function(){d3.select(this).style("fill","steelblue"); })
	   
	   //.attr("height", function(d) { return 10; })//size of rect
	   .attr("width", x.rangeBand()); //width
	   
	  
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
		d3.selectAll(".bar")
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
    
    chart.selectAll(".bar")
	   .data(bardata)
	   .enter().append("rect")
	   .attr("class", "bar")
	   .attr("x", function(d) { return x(d.name); })
	   .attr("y", function(d) { return y(d.value); })
	   .attr("height", function(d) { return height - y(d.value); })
	   .attr("width", x.rangeBand())

}





