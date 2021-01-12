function draw(data) {
  var margin = 50,
    width = 700,
    height = 300;

  d3.select('body')
    .append('svg')
    .attr('width', width - margin)
    .attr('height', height - margin)
    .attr('class', 'chart');

  d3.select('svg')
    .selectAll('circle.time_square')
    .data(data.times_square)
    .enter()
    .append('circle')
    .attr('class', 'times_square');

  var count_extent = d3.extent(
    data.times_square.concat(data.grand_central),
    function (d) {
      return d.count;
    }
  );

  var count_scale = d3.scale
    .linear()
    .domain(count_extent)
    .range([height, margin]);

  d3.selectAll('circle').attr('cy', function (d) {
    return count_scale(d.count);
  });

  var time_extent = d3.extent(
    data.times_square.concat(data.grand_central),
    function (d) {
      return d.time;
    }
  );
  var time_scale = d3.time.scale().domain(time_extent).range([margin, width]);

  d3.selectAll('circle').attr('cx', function (d) {
    return time_scale(d.time);
  });

  d3.selectAll('circle')
    .attr('cy', function (d) {
      return count_scale(d.count);
    })
    .attr('cx', function (d) {
      return time_scale(d.time);
    })
    .attr('r', 3);
}

d3.json('data/example2.json', draw);
