(function() 
{
    var margin = {top: 10, right: 30, bottom: 30, left: 60},
    width = 900 - margin.left - margin.right,
    height = 550 - margin.top - margin.bottom;

// append the svg object to the body of the page
var Svg = d3.select("#map")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform","translate(" + margin.left + "," + margin.top + ")");
  

     d3.queue()
    .defer(d3.json,"https://skgrange.github.io/www/data/london_boroughs.json")
    .defer(d3.csv,"london_stations.csv")
    .defer(d3.csv,"data.csv")
    .await(ready)



    var projection= d3.geoAlbers()
    .center([10.5, 55.2])
    .rotate([8, 0])
    .parallels([0, 15])
   .scale(59000)
    .translate([width / 2 +2350, height /2 - 2600 ]);


    var path = d3.geoPath()
        .projection(projection)

    
function ready(error,data,london_stations,bike_data)
{
       
   
    //zoom 
    const g = Svg.append('g')
      Svg.call(d3.zoom().on('zoom',()=>{g.attr('transform',d3.event.transform)}))



    var link = []
    bike_data.forEach(function(row)
    {
      source = [+row.end_longitude, +row.end_latitude]
      target = [+row.start_longitude, +row.start_latitude]
      topush = {type: "LineString", coordinates: [source, target]}
      link.push(topush)
    })


  // Add X
  var x = d3.scaleLinear()
    .domain([0, 8])
    .range([ 0, width ]);
  var xAxis = g.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

  // Add
  var y = d3.scaleLinear()
    .domain([0, 9])
    .range([ height, 0]);
  g.append("g")
    .call(d3.axisLeft(y));

    // Add a clipPath: everything out of this area won't be drawn.
  var clip = g.append("defs").append("svg:clipPath")
  .attr("id", "clip")
  .append("svg:rect")
  .attr("width", width )
  .attr("height", height )
  .attr("x", 0)
  .attr("y", 0);



    // Add brushing
    var brush = d3.brushX()                 // Add the brush feature using the d3.brush function
    .extent( [ [0,0], [width,height] ] ) // initialise the brush area: start at 0,0 and finishes at width,height: it means I select the whole graph area
    .on("end", updateChart) // Each time the brush selection changes, trigger the 'updateChart' function

// Create the scatter variable: where both the circles and the brush take place
    var scatter = g.append('g')
  .attr("clip-path", "url(#clip)")


    
    //path

         scatter.selectAll(".subunits")
        .data(data.features)
        .enter().append("path")
        .attr("class","subunits")
        .attr("d",path)
        .append('title')
        .text('London')
        

 


//circle

        scatter.selectAll(".london_stations")
        .data(london_stations)
        .enter().append("circle")
        .attr("fill", "grey")
        .attr("class","london_stations")
        .attr("r",0.2)
        .attr("cx", function(d)
                        {
                            //console.log(d)
                            var coords = projection([d.longitude,d.latitude])
                        // console.log(coords)
                            return coords[0]
                        })
        .attr("cy",function(d)
                        {
                            //console.log(d)
                            var coords = projection([d.longitude,d.latitude])
                            //console.log(coords)
                            return coords[1]
                        })


  // Add the brushing
  scatter
    .append("g")
      .attr("class", "brush")
      .call(brush);

  // A function that set idleTimeOut to null
  var idleTimeout
  function idled() { idleTimeout = null; }

  // A function that update the chart for given boundaries
  function updateChart() {

    extent = d3.event.selection

    // If no selection, back to initial coordinate. Otherwise, update X axis domain
    if(!extent){
      if (!idleTimeout) return idleTimeout = setTimeout(idled, 350); // This allows to wait a little bit
      x.domain([ 4,8])
    }else{
      x.domain([ x.invert(extent[0]), x.invert(extent[1]) ])
      scatter.select(".brush").call(brush.move, null) // This remove the grey brush area as soon as the selection has been done
    }

    // Update axis and circle position
    xAxis.transition().duration(1000).call(d3.axisBottom(x))
    scatter
      .selectAll(".london_stations")
      .transition().duration(1000)
      .attr("cx", function(d)
      {
          //console.log(d)
          var coords = projection([d.longitude,d.latitude])
      // console.log(coords)
          return coords[0]
      })
.attr("cy",function(d)
      {
          //console.log(d)
          var coords = projection([d.longitude,d.latitude])
          //console.log(coords)
          return coords[1]
      })

    }





   // Add the edges path
   var Edges=g.selectAll(".edge")
   .data(link)
   .enter()
   .append("path")
   .attr("class",".edge")
   .attr("d", function(d){ return path(d)})
   .style("fill", "none")
   .style("stroke", () => {
       let color = '#'+Math.floor(Math.random() * Math.pow(2,32) ^ 0xffffff).toString(16).substr(-6);
     //  console.log(color);
       return color;
     })
   .style("stroke-width", '0.05px')
   .style("opacity", 0.9)


   
  var sliderSimple = d3
  .sliderBottom()
  .min(1)
  .max(840)
  .width(300)
  .default(0.015)
  .on('onchange', val => {
    d3.select('p#value-simple').text(val);
  });

var gSimple = d3
  .select('div#slider-simple')
  .append('svg')
  .attr('width', 500)
  .attr('height', 100)
  .append('g')
  .attr('transform', 'translate(30,30)');

gSimple.call(sliderSimple);

d3.select('p#value-simple').text(sliderSimple.value());

    

 }    
})();


