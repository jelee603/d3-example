var margin = 50,
  width = 1024,
  height = 300,
  headerH = 40,
  barW = 10;

function draw(data) {
  d3.select('#header')
    .append('svg')
    .attr({
      class: 'header',
      width: width - margin,
      height: headerH,
    });

  d3.select('#table')
    .append('svg')
    .attr({
      class: 'table',
      width: width - margin,
      height: height - margin,
    });

  d3.select('#chart')
    .append('svg')
    .attr({
      class: 'chart',
      width: width - margin,
      height: height - margin,
    })
    .on('mouseleave', function () {
      //   d3.select('line').remove();
    })
    .on('mouseover', function () {
      //   d3.select('line').remove();
    })
    .on('mouseout', function () {
      //   d3.select('line').remove();
    })
    .on('mousemove', function (e) {
      //   chartSvg.append('line').attr({
      //     class: 'stroke',
      //     x1: d3.mouse(this)[0],
      //     y1: 0,
      //     x2: d3.mouse(this)[0],
      //     y2: 150,
      //   });
    });

  /** 해더 부분 */
  const hours = Array.from(Array(24), (_, idx) => `${idx + 1}:00`);
  // .header => 스타일 클래스명으로 찾기
  var headerSvg = d3.select('svg.header').selectAll('box').data(hours).enter();
  var chartSvg = d3
    .select('svg.chart')
    .selectAll('box')
    .data(data.data)
    .enter();
  var tableSvg = d3
    .select('svg.table')
    .selectAll('box')
    .data(data.data)
    .enter();

  /** 테이블 부분 */
  // 테이블 헤더
  headerSvg.append('rect').attr({
    class: 'cell',
    height: 40,
    width: 120,
    x: function (d, i) {
      return 60 * (i + 1);
    },
    y: function (d, i) {
      return 0;
    },
  });

  // 테이블 라벨
  chartSvg.append('rect').attr({
    class: 'cell',
    height: 40,
    width: 60,
    x: function (d, i) {
      return 0;
    },
    y: function (d, i) {
      return 50 * i;
    },
  });

  // 테이블 막대
  hours.forEach((v) => {
    tableSvg.append('rect').attr({
      class: 'cell',
      height: 40,
      width: 60,
      x: function (d, i) {
        return cellX(v);
        // return cellX(d.Date);
      },
      y: function (d, i) {
        return 50 * i;
      },
    });
  });
  /** 차트 부분 */

  // 헤더
  headerSvg
    .append('text')
    .attr({
      height: 10,
      x: function (d, i) {
        return 60 * (i + 1);
      },
      y: function (d, i) {
        return 20;
      },
    })
    .text(function (d, i) {
      return d;
    });
  // 막대 바
  chartSvg
    .append('rect')
    .attr({
      height: 40,
      width: barW,
      x: function (d, i) {
        return barX(d.Date);
      },
      y: function (d, i) {
        return 50 * i;
      },
    })
    .on('mouseover', function () {
      focus.style('display', null);
    })
    .on('mouseout', function () {
      focus.style('display', 'none');
    })
    .on('mousemove', function (e) {
      focus.attr('transform', 'translate(40,40)');
      focus.select('.tooltip-date').text(e.Name);
    });

  // 라벨명
  chartSvg
    .append('text')
    .attr({
      x: 0,
      y: function (d, i) {
        return 50 * i;
      },
      dx: 15,
      dy: 15,
    })
    .text(function (d, i) {
      return d.Name;
    });

  // 툴팁
  var focus = chartSvg
    .append('g')
    .attr('class', 'focus')
    .style({ display: 'none' });

  //   focus.append('circle').attr('r', 5);
  focus.append('rect').attr({
    class: 'tooltip',
    width: 100,
    height: 50,
    x: 10,
    y: -22,
    rx: 4,
    ry: 4,
  });
  focus.append('text').attr({ class: 'tooltip-date', x: 18, y: -2 });

  //   chartSvg
  //     .append('line')
  //     .attr('x1', 0)
  //     .attr('y1', 0)
  //     .attr('x2', 0)
  //     .attr('y2', 120)
  //     .attr('stroke', 'red');
}

function cellX(date) {
  const [hh, mm] = date.split(':');

  return 60 * parseInt(hh);
}

function barX(date) {
  const [hh, mm] = date.split(':');

  return 60 * parseInt(hh) + barW * (parseInt(mm) / 10);
}

d3.json('data/example3.json', draw);
