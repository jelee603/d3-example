function responsivefy(svg) {
    // get container + svg aspect ratio
    var container = d3.select(svg.node().parentNode),
        width = parseInt(svg.style("width")),
        height = parseInt(svg.style("height")),
        aspect = width / height;

    // add viewBox and preserveAspectRatio properties,
    // and call resize so that svg resizes on inital page load
    svg.attr("viewBox", "0 0 " + width + " " + height)
        .attr("perserveAspectRatio", "xMinYMid")
        .call(resize);

    d3.select(window).on("resize." + container.attr("id"), resize);

    // get width of container and resize svg to fit it
    function resize() {
        var targetWidth = parseInt(container.style("width"));
        svg.attr("height", Math.round(targetWidth / aspect));
        svg.attr("width", targetWidth);
    }
}

var arrData = [
    {"category":"Diversity & Inlusion 1", "actual":4.2, "target":5, "prediction":40, "skala":"20%"},
    {"category":"Image 1", "actual":4.5, "target":4.2,"prediction":60, "skala":"40%"},
    {"category":"Image 2", "actual":4.1, "target":4,"prediction":80, "skala":"60%"},
    {"category":"Job Security 1", "actual":4.4, "target":4.3,"prediction":60, "skala":"100%"},
    {"category":"Job Security 2", "actual":4.4, "target":4.3,"prediction":40, "skala":"100%"},
    {"category":"Job Security 3", "actual":4.4, "target":4.3,"prediction":20, "skala":"100%"},
    {"category":"Image 3", "actual":4.4, "target":4.3,"prediction":10, "skala":"100%"},
    {"category":"Diversity & Inlusion 2", "actual":4.4, "target":4.3,"prediction":30, "skala":"100%"},
    {"category":"Values", "actual":4.4, "target":4.3,"prediction":75, "skala":"100%"},
    {"category":"Collaboration", "actual":4.4, "target":4.3,"prediction":45, "skala":"100%"}
];

//console.log(arrData);

//set up svg using margin conventions - we'll need plenty of room on the left for labels
var margin = {
    top: 15, right: 95, bottom: 15, left: 60
};

var marginBar2 = {
    top:10
};

var width = 650 - margin.left - margin.right;
var height = 768 - margin.top - margin.bottom;
var svgColor = "white";
var barHeight = 200;

//Create Main SVG
var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .style("background-color", svgColor);
// .call(responsivefy);

//Create xScale and yScale
var xScale1 = d3.scale.linear()
    .range([0, width * 0.70])
    .domain([0, d3.max(arrData, function (d) {
        return d.prediction;
    })]);

var xScale2 = d3.scale.linear()
    .range([0, width * 0.70])
    .domain([0, d3.max(arrData, function (d) {
        return d.target;
    })]);

var xScale3 = d3.scale.ordinal()
    .rangeRoundBands([0, width * 0.93])
    .domain(arrData.map(function (d) {
        return d.skala;
    }));

var yScale = d3.scale.ordinal()
    .rangeRoundBands([0, height])
    .domain(arrData.map(function (d) {
        return d.category;
    }));

//Make yAxis to Show Category
var yAxis = d3.svg.axis()
    .scale(yScale)
    .tickSize(0)
    .orient("left");

var gyAxis = svg.append("g")
    //.attr("class", "y axis")
    .attr("transform", "translate(" + width * 0.35   + "," + height * 0 + ")")
    .style("text-anchor", "start")
    .style("font-size", 12)
    .style("font-weight", "bold")
    .style("fill", "#212121")
    .call(yAxis);

//Make xAxis to Show Category
// var xAxis = d3.svg.axis()
//     .scale(xScale3)
//     .tickSize(5)
//     .orient("bottom");

// var gxAxis = svg.append("g")
//     .attr("class", "x axis")
//     .style("font-size", 14)
//     .style("font-weight", "bold")
//     .style("fill", "#212121")
//     .attr("transform", "translate(" + width * 0.385  + "," + height * 1 + ")")
//     .call(xAxis);

var bars1 = svg.selectAll(".bar")
    .data(arrData).enter()
    .append("g")
    .attr("transform", "translate(" + width * 0.50  + "," + 0 + ")");

bars1.append("rect")
    .attr("class", "bar")
    .attr("y", function (d) {
        return yScale(d.category);
    })
    .attr("height", barHeight - 140)
    .attr("x", 0)
    // .style("fill", "#c0c0c0")
    .attr("width", function(d){
        return xScale2(d.target);
    })
    .on("mouseover", function(){
        tooltip1.style("display", null);
    })
    .on("mouseout", function(){
        tooltip1.style("display", "none");
    })
    .on("mousemove", function(d){
        var xPos = d3.mouse(this)[0] - 10;
        var yPos = d3.mouse(this)[1] - 15;
        tooltip1.attr("transform", "translate(" + xPos + "," + yPos +")");
        tooltip1.selectAll("text").text("DI4");
        tooltip1.selectAll("rect")
            .attr("width", 250)
            .attr("width", (function(d) {
                return this.parentNode.getBBox().width;
            }));
    });

var bars2 = svg.selectAll(".bar2nd")
    .data(arrData).enter()
    .append("g")
    .attr("transform", "translate(" + width * 0.50 + "," + marginBar2.top  + ")");

bars2.append("rect")
    .attr("class", "bar2nd")
    .attr("y", function (d) {
        return yScale(d.category);
    })
    .attr("height", barHeight - 160)
    .attr("x", 0)
    .attr("width", function (d) {
        return xScale1(d.prediction);
    })
    .on("mouseover", function(){
        tooltip2.style("display", null);
    })
    .on("mouseout", function(){
        tooltip2.style("display", "none");
    })
    .on("mousemove", function(d){
        var xPos = d3.mouse(this)[0] - 10;
        var yPos = d3.mouse(this)[1] - 15;
        tooltip2.attr("transform", "translate(" + xPos + "," + yPos +")");
        tooltip2.selectAll("text").html("DI3");
        tooltip2.selectAll("rect")
            .attr("width", 250)
            .attr("width", (function(d) {
                return this.parentNode.getBBox().width;
            }));
    });

var barValue1 = svg.selectAll(".barValue1")
    .data(arrData).enter()
    .append("g")
    .attr("transform", "translate(" + width * 0.40 + "," + height * 0.055 + ")");

barValue1.append("text")
    .attr("class", "barValue1")
    .attr("y", function (d) {
        return yScale(d.category);
    })
    .attr("x", 0)
    .style("font-size", 18)
    .style("font-weight", "bold")
    .style("fill", "#212121")
    .html(function(d){
        return d3.format(",.2r")(d.actual);
    });

var barValue2 = svg.selectAll(".barValue2")
    .data(arrData).enter()
    .append("g")
    .attr("transform", "translate(" + width * 0.51 + "," + height * 0.055 + ")");

barValue2.append("text")
    .attr("class", "barValue2")
    .attr("y", function (d) {
        return yScale(d.category);
    })
    .attr("x", 0)
    .style("font-size", 18)
    // .style("font-weight", "bold")
    .style("fill", "white")
    .text(function(d){
        return d3.format(".2%")(d.prediction / 100);
    });

var tooltip1 = svg.selectAll("g.tooltip1")
    .data(arrData)
    .enter()
    .append("g")
    .attr("class", "tooltip")
    .style("display", "none");

tooltip1.append("rect")
    // .attr("width", width * 0.7)
    .attr("height", height * 0.2)
    .style("fill", "white")
    .style("stroke", "#969696")
    .attr("stroke-width",1)
    .style("opacity", 1);

tooltip1.append("text")
    .attr("id", "txt1")
    .attr("x", width * 0.05)
    .attr("dy", height * 0.05)
    .attr("font-size", 18)
    .attr("font-weight", "bold");

var tooltip2 = svg.selectAll("g.tooltip1")
    .data(arrData)
    .enter()
    .append("g")
    .attr("class", "tooltip")
    .style("display", "none");

tooltip2.append("rect")
    // .attr("width", width * 0.7)
    .attr("height", height * 0.2)
    .style("fill", "white")
    .style("stroke", "#969696")
    .attr("stroke-width",1)
    .style("opacity", 1);

tooltip2.append("text")
    .attr("id", "txt1")
    .attr("x", width * 0.05)
    .attr("dy", height * 0.05)
    .attr("font-size", 18)
    .attr("font-weight", "bold");