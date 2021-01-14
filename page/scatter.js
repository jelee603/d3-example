/** chart zoom */
function scatter(data) {
  var margin = { top: 10, right: 30, bottom: 30, left: 60 };
  var width = 460 - margin.left - margin.right;
  var height = 400 - margin.top - margin.bottom;
  var SVG = d3
    .select('#zoom_scatter')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g') // g 를 추가하고 translate 해주면, y축 라벨이 보인다.
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

  var x = d3.scaleLinear().domain([1, 9]).range([0, width]);
  var xAxis = SVG.append('g')
    .attr('transform', 'translate(0,' + height + ')')
    .call(d3.axisBottom(x));

  var y = d3.scaleLinear().domain([0, 9]).range([height, 0]);
  var yAxis = SVG.append('g').call(d3.axisLeft(y));
  var clip = SVG.append('defs')
    .append('SVG:clipPath')
    .attr('id', 'clip')
    .append('SVG:rect')
    .attr('width', width)
    .attr('height', height)
    .attr('x', 0)
    .attr('y', 0);
  var scatter = SVG.append('g').attr('clip-path', 'url(#clip)');

  scatter
    .selectAll('circle')
    .data(data)
    .enter()
    .append('circle')
    .attr('cx', function (d) {
      return x(d.Sepal_Length);
    })
    .attr('cy', function (d) {
      return y(d.Petal_Length);
    })
    .attr('r', 8)
    .style('fill', '#61a3a9')
    .style('opacity', 0.5);

  var zoom = d3
    .zoom()
    .scaleExtent([0.5, 20]) // This control how much you can unzoom (x0.5) and zoom (x20)
    .extent([
      [0, 0],
      [width, height],
    ])
    .on('zoom', updateChart);

  SVG.append('rect')
    .attr('width', width)
    .attr('height', height)
    .style('fill', 'none')
    .style('pointer-events', 'all')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
    .call(zoom);

  SVG.append('text')
    .attr('text-anchor', 'end')
    .attr('transform', 'rotate(-90)')
    .attr('y', -margin.left + 20)
    .attr('x', -margin.top)
    .text('Y axis title');

  function updateChart() {
    // recover the new scale
    var transform = d3.zoomTransform(this);
    var newX = transform.rescaleX(x);
    var newY = transform.rescaleY(y);

    // update axes with these new boundaries
    xAxis.call(d3.axisBottom(newX));
    yAxis.call(d3.axisLeft(newY));

    // update circle position
    scatter
      .selectAll('circle')
      .attr('cx', function (d) {
        return newX(d.Sepal_Length);
      })
      .attr('cy', function (d) {
        return newY(d.Petal_Length);
      });
  }
}

d3.csv('data/scatter.csv').then(scatter);

function test() {
  var margin = { top: 20, right: 20, bottom: 40, left: 60 },
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

  // create svg element, respecting margins
  var svg = d3
    .select('#title')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

  // Add X axis
  var x = d3.scaleLinear().domain([0, 100]).range([0, width]);
  svg
    .append('g')
    .attr('transform', 'translate(0,' + height + ')')
    .call(d3.axisBottom(x));

  // Add Y axis
  var y = d3.scaleLinear().domain([0, 100]).range([height, 0]);
  svg.append('g').call(d3.axisLeft(y));

  // Add X axis label:
  svg
    .append('text')
    .attr('text-anchor', 'end')
    .attr('x', width)
    .attr('y', height + margin.top + 20)
    .text('X axis title');

  // Y axis label:
  svg
    .append('text')
    .attr('text-anchor', 'end')
    .attr('transform', 'rotate(-90)')
    .attr('y', -margin.left + 20)
    .attr('x', -margin.top)
    .text('Y axis title');
}
