var testArray = [6,1,8,5,2,7,4,3,9];
var bardata = [];

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
	   .call(xAxis)
	   .on("click", function() {sortBars(); console.log("Sort Pressed");});
	   

    //create y axis
    chart.append("g")
	   .attr("class", "axis")
	   .call(yAxis)
	   .on("click", function() {sortBars(); console.log("Sort Pressed");});

	   

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

var sortOrder = false;


//Define sort function
var sortBars = function() {
    //Flip value of sortOrder
    sortOrder = !sortOrder;
    svg.selectAll("rect")
        .sort(function(a, b) {
                if (sortOrder) {
                    return d3.ascending(a.value, b.value);
                } else {
                    return d3.descending(a.value, b.value);
                }})
        .transition()
        .delay(function(d, i) {
            return i * 50;
        })
        .duration(1000)
        .attr("x", function(d, i) {
            return xScale(i);
        });
};   

function type(d) {
    d.value = +d.value; // coerce to number
    return d;
    
}

svg.selectAll(".bar")
        .sort(function(a, b) { return d3.ascending(a.value, b.value); });
        
d3.select("svg")
    .on("mousedown", function(){
        console.log("x:" + d3.mouse(this)[0]+"y:"+d3.mouse(this)[1]);

        
    })
    ;
 
        
d3.select(this).style("fill", "green").on("mouseover",function(){});
    




