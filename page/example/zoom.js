/** circle zoom */
var svg = d3
  .select('#zoom_circle')
  .append('svg')
  .attr('width', 300)
  .attr('height', 300)
  .call(
    d3.zoom().on('zoom', function (event) {
      svg.attr('transform', event.transform);
    })
  )
  .append('g');

svg
  .append('circle')
  .attr('cx', 100)
  .attr('cy', 100)
  .attr('r', 40)
  .style('fill', '#68b2a1');
