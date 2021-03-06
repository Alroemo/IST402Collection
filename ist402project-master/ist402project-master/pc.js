//initalizes the margin, width, and height for the canvas
var margin = {top: 10, right: 30, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;
	
//initalizes the x and y coordinates for the PC graph
var x = d3.scale.ordinal().rangePoints([0, 480], 1),
    y = {};

//initalizes the x and y coordinates for the Scatterplot graph	
var x = d3.scale.linear().range([480, width]),
    y = d3.scale.linear().range([height-20,0]);
	
//initalizes the x and y axis for the scatterplot graph
	var xAxis = d3.svg.axis().scale(x).orient("bottom");
	var yAxis = d3.svg.axis().scale(y).orient("left");
	
//initalizes the axis for the PC graph
	var axis = d3.svg.axis().orient("left");
	
var line = d3.svg.line() 
    .x(function(d) { return d.x; })
    .y(function(d) { return d.y; })
    .interpolate("linear");//line style. 

//initalizes the chart width, height, and attributes
var chart = d3.select(".chart")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
	

var cars=[];

//reads the data and stores it
d3.csv("cars.csv", type, function(error, data) {
    cars = data;
	
//Draws both line and dot graph
    //drawPCGraph();
	drawScatterPlot();
});

function drawScatterPlot(){
    x.domain([d3.min(cars, function(d) { return d.year; }), d3.max(cars, function(d) { return d.year; })]);
    y.domain([d3.min(cars, function(d) { return d.power; }), d3.max(cars, function(d) { return d.power; })]);

    var yPos = height -20;
    chart.append("g")
	   .attr("class", "xaxis")
	   .attr("transform", "translate(0," + yPos + ")")
	   .call(xAxis);
	chart.append("g")
	   .attr("class", "yaxis")
	   .attr("transform", "translate(480,0)")
	   .call(yAxis);

    chart.selectAll(".dot")
	   .data(cars)
	   .enter().append("circle")
	   .attr("class", "dot")
	   .attr("cx", function(d) { return x(d.year); })
	   .attr("cy", function(d) { return y(d.power); })
	   .attr("r", 3)

	 .on("mouseover", function(){
			d3.select(this)
			.attr("fill", "red")
	 })
	 
	.on("mouseout", function(){
		d3.select(this)
		.attr("fill", "black")
		
})
	
  
}  


//this function coerces numerical data to numbers  
function type(d) {
    d.economy = +d.economy; // coerce to number
    d.displacement = +d.displacement; // coerce to number
    d.power = +d.power; // coerce to number
    d.weight = +d.weight; // coerce to number
    d.year = +d.year;
    return d;
}



