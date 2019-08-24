/**
 * Helper function to select stock data
 * Returns an array of values
 * @param {array} rows
 * @param {integer} index
 * index 0 - Date
 * index 1 - Open
 * index 2 - High
 * index 3 - Low
 * index 4 - Close
 * index 5 - Volume
 */
//----------------------------------------------------------------------------------------------------
// set the dimensions and margins of the graph
var margin = { top: 10, right: 30, bottom: 30, left: 20 },
  width = 460 - margin.left - margin.right,
  height = 400 - margin.top - margin.bottom;


// append the svg object to the body of the page
var svg = d3.select("#myPlot")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform",
    "translate(" + margin.left + "," + margin.top + ")");
//----------------------------------------------------------------------------------------------------
// append the svg object to the body of the page
var svg1 = d3.select("#myPlot1")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform",
    "translate(" + margin.left + "," + margin.top + ")");
//----------------------------------------------------------------------------------------------------

function unpack(rows, index) {
  return rows.map(function (row) {
    return row[index];
  });
}

// Submit Button handler
function handleSubmit() {
  // Prevent the page from refreshing
  d3.event.preventDefault();

  // Select the input value from the form
  var CountryName = d3.select("#Country").node().value;
  console.log(CountryName);

  // clear the input value
  d3.select("#Country").node().value = "";

  // Build the plot with the new CountryName
  buildPlot(CountryName);

}

function buildPlot(Country) {
  d3.csv("../db/PerCapCO2Emsn.csv",
    function (d) {
      return { countryName: d.countryName == Country, Year: +d.Year, Value: +d.Value }
    }).then(
      function (data) {

        // Add X axis --> it is a date format
        var x = d3.scaleTime()
          .domain(d3.extent(data, function (d) { return d.Year; }))
          .range([0, width]);
        svg.append("g")
          .attr("transform", "translate(0," + height + ")")
          .call(d3.axisBottom(x));

        // Add Y axis
        var y = d3.scaleLinear()
          .domain([0, d3.max(data, function (d) { return +d.Value; })])
          .range([height, 0]);
        svg.append("g")
          .call(d3.axisLeft(y));

        // Add the line
        svg.append("path")
          
          .datum(data)
          .attr("fill", "none")
          .attr("stroke", "steelblue")
          .attr("stroke-width", 1.5)
          .attr("d", d3.line()
            .x(function (d) {
              return x(d.Year)
            })
            .y(function (d) {
              return y(d.Value)
            })
          );
      });
}
// Add event listener for submit button
d3.select("#submit").on("click", handleSubmit);
