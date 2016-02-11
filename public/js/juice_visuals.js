d3.json('data.json',function(err,data){
    var scale = d3.scale.linear().domain([0,6000]).range([0,700]);

    var w = 800;
    var h = 800;
    var color = d3.scale.category20b();

    var pieChart = d3.select("body").selectAll("p")
                .data([data])
                .enter()
                .append("svg:svg")
                .attr("width", w)
                .attr("height", h)
                .append("svg:g")
                .attr("transform", "translate(400,400)")
                

    var pie = d3.layout.pie().value(function(d){return d.count;});

    var arc = d3.svg.arc().outerRadius(300);

    var arcs = pieChart.selectAll("g")
                  .data(pie)
                  .enter()
                  .append("svg:g")
                  .attr("class", "sector");
    arcs.append("svg:path")
        .attr("fill", function(d, i){ return color(i); })
        .attr("d", function (d){ return arc(d); });

    arcs.append("svg:text")
        .attr("transform", function(d){
            d.innerRadius = 400;
            d.outerRadius = 500;
            console.log(d)
            return "translate(" + arc.centroid(d) + ")";})
        .attr("text-anchor", "middle")
        .text( function(d, i){return data[i].name; });
});