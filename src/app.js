import * as d3 from 'd3';

const svg = d3.select('body')
    .append('svg')
    .attr('width', 500).attr('height', 200);
svg.append('rect')
    .attr('x', 10)
    .attr('y', 10)
    .attr('width', 80)
    .attr('height', 80)
    .attr('fill', 'blue');
