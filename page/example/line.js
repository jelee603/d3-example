var width = 400;
var height = 400;
var svg = d3.select('body').append('svg');
svg.attr('width', width);
svg.attr('height', height);

function getLine(posArray) {
  return d3.line()(posArray);
}

svg
  .append('path')
  .attr(
    'd',
    getLine([
      [30, 0],
      [30, 30],
    ])
  )
  .attr('stroke', 'blue');
