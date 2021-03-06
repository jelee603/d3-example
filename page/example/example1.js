var Header = function module() {
  var opts = {
    width: 200,
    height: 200,
    margins: { top: 20, right: 20, bottom: 20, left: 20 },
  };

  function test(selection) {
    selection.each(function (dataset) {
      //________________________________________________
      // Data
      //________________________________________________
      var columnLabel = dataset.columnLabel;
      var rowLabel = dataset.rowLabel;
      var value = dataset.value;

      //________________________________________________
      // DOM preparation
      //________________________________________________
      // Size
      var chartW = Math.max(
        opts.width - opts.margins.left - opts.margins.right,
        0.1
      );
      var chartH = Math.max(
        opts.height - opts.margins.top - opts.margins.bottom,
        0.1
      );

      // SVG
      var parentDiv = d3.select(this).html(''); //body
      var svg = parentDiv
        .append('svg')
        .attr('width', opts.width)
        .attr('height', opts.height);
      var visSvg = svg
        .append('g')
        .attr('class', 'vis-group')
        .attr(
          'transform',
          'translate(' + opts.margins.left + ',' + opts.margins.top + ')'
        );

      //   var tableBodySvg = visSvg.append('g').attr('class', 'table-body');
      var tableHeaderSvg = visSvg.append('g').attr('class', 'table-header');
      //   var rowHeaderSvg = tableBodySvg.append('g').attr('class', 'row-header');
      var colHeaderSvg = tableHeaderSvg.append('g').attr('class', 'col-header');

      //________________________________________________
      // Table
      //________________________________________________
      var rowHeaderLevelNum = 1;
      var colHeaderLevelNum = 1;
      var cellH = chartH / (value.length + rowHeaderLevelNum);
      var cellW = chartW / (value[0].length + colHeaderLevelNum);

      // Col header
      var colHeaderCell = colHeaderSvg
        .selectAll('rect.col-header-cell')
        .data(columnLabel);
      colHeaderCell
        .enter()
        .append('rect')
        .attr({
          class: 'col-header-cell',
          width: cellW,
          height: cellH,
          x: function (d, i) {
            return i * cellW + cellW * rowHeaderLevelNum;
          },
          y: 0,
        })
        .style({ fill: '#eee', stroke: 'silver' });

      // Col header text
      colHeaderCell
        .enter()
        .append('text')
        .attr({
          class: 'col-header-content',
          x: function (d, i) {
            return i * cellW + cellW * rowHeaderLevelNum;
          },
          y: 0,
          dx: cellW / 2,
          dy: cellH / 2,
        })
        .style({ fill: 'black', 'text-anchor': 'middle' })
        .text(function (d, i) {
          return d;
        });
    });
  }

  test.opts = opts;
  createAccessors(test, opts);
  return test;
};

var Table = function module() {
  var opts = {
    width: 200,
    height: 200,
    margins: { top: 20, right: 20, bottom: 20, left: 20 },
  };

  function createBody(tableBodySvg, value, cellW, cellH, rowHeaderLevelNum) {
    var row = tableBodySvg.selectAll('g.row').data(value);
    row
      .enter()
      .append('g')
      .attr('class', 'cell row')
      .each(function (pD, pI) {
        // Cells
        var cell = d3.select(this).selectAll('rect.cell').data(pD);
        cell
          .enter()
          .append('rect')
          .attr({
            class: 'cell',
            width: cellW,
            height: cellH,
            x: function (d, i) {
              return i * cellW + cellW * rowHeaderLevelNum;
            },
            y: function (d, i) {
              return pI * cellH;
            },
          })
          .style({ fill: 'white', stroke: 'silver' });

        // Bar
        cell
          .enter()
          .append('rect')
          .attr({
            class: 'cell-content',
            width: 5,
            height: 35,
            x: function (d, i) {
              return i * cellW + cellW * rowHeaderLevelNum + d;
            },
            y: function (d, i) {
              return pI * cellH + 5;
            },
          })
          .style({ fill: 'pink' });
        // Text
        cell
          .enter()
          .append('text')
          .attr({
            class: 'cell-content',
            width: cellW,
            height: cellH,
            x: function (d, i) {
              return i * cellW + cellW * rowHeaderLevelNum;
            },
            y: function (d, i) {
              return pI * cellH;
            },
            dx: cellW / 2,
            dy: cellH / 2,
          })
          .style({ fill: 'black', 'text-anchor': 'middle' })
          .text(function (d, i) {
            return d;
          });
      });
  }

  function createMouseLine(tableBodySvg, width, height) {
    tableBodySvg
      .append('svg:rect')
      .attr('width', width) // can't catch mouse events on a g element
      .attr('height', height)
      .attr('fill', 'none')
      .attr('pointer-events', 'all')
      .on('mouseout', function () {
        // on mouse out hide line, circles and text
        d3.select('.mouse-line').style('opacity', '0');
        d3.selectAll('.mouse-per-line circle').style('opacity', '0');
        d3.selectAll('.mouse-per-line text').style('opacity', '0');
      })
      .on('mouseover', function () {
        // on mouse in show line, circles and text
        d3.select('.mouse-line').style('opacity', '1');
        d3.selectAll('.mouse-per-line circle').style('opacity', '1');
        d3.selectAll('.mouse-per-line text').style('opacity', '1');
      })
      .on('mousemove', function () {
        var mouse = d3.mouse(this);
        console.log('hihi', mouse[0]);
      });
  }

  function exports(selection) {
    selection.each(function (dataset) {
      //________________________________________________
      // Data
      //________________________________________________
      var rowLabel = dataset.rowLabel;
      var value = dataset.value;

      //________________________________________________
      // DOM preparation
      //________________________________________________
      // Size
      var chartW = Math.max(
        opts.width - opts.margins.left - opts.margins.right,
        0.1
      );
      var chartH = Math.max(
        opts.height - opts.margins.top - opts.margins.bottom,
        0.1
      );

      // SVG
      var parentDiv = d3.select(this).html(''); //body
      var svg = parentDiv
        .append('svg')
        .attr('width', opts.width)
        .attr('height', opts.height);
      var visSvg = svg
        .append('g')
        .attr('class', 'vis-group')
        .attr(
          'transform',
          //   'translate(' + opts.margins.left + ',' + opts.margins.top + ')'
          'translate(' + opts.margins.left + ', 3)'
        );

      var tableBodySvg = visSvg.append('g').attr('class', 'table-body');
      //   var tableHeaderSvg = visSvg.append('g').attr('class', 'table-header');
      var rowHeaderSvg = tableBodySvg.append('g').attr('class', 'row-header');
      //   var colHeaderSvg = tableHeaderSvg.append('g').attr('class', 'col-header');

      //________________________________________________
      // Table
      //________________________________________________
      var rowHeaderLevelNum = 1;
      var colHeaderLevelNum = 1;
      var cellH = chartH / (value.length + rowHeaderLevelNum);
      var cellW = chartW / (value[0].length + colHeaderLevelNum);

      // Row header
      var rowHeaderCell = rowHeaderSvg
        .selectAll('rect.row-header-cell')
        .data(rowLabel);
      rowHeaderCell
        .enter()
        .append('rect')
        .attr({
          class: 'row-header-cell',
          width: cellW,
          height: cellH,
          x: 0,
          y: function (d, i) {
            // return i * cellH + cellH * colHeaderLevelNum;
            return i * cellH * colHeaderLevelNum;
          },
        })
        .style({ fill: '#eee', stroke: 'silver' });

      // Row header text
      rowHeaderCell
        .enter()
        .append('text')
        .attr({
          class: 'row-header-content',
          x: 0,
          y: function (d, i) {
            return i * cellH * colHeaderLevelNum;
          },
          dx: cellW / 2,
          dy: cellH / 2,
        })
        .style({ fill: 'black', 'text-anchor': 'middle' })
        .text(function (d, i) {
          return d;
        });

      // Body
      createBody(tableBodySvg, value, cellW, cellH, rowHeaderLevelNum);
      createMouseLine(tableBodySvg, opts.width, opts.height);
    });
  }

  exports.opts = opts;
  createAccessors(exports, opts);
  return exports;
};

// Helper function ////////////////////////////////////
var createAccessors = function (visExport) {
  for (var n in visExport.opts) {
    if (!visExport.opts.hasOwnProperty(n)) continue;
    visExport[n] = (function (n) {
      return function (v) {
        return arguments.length
          ? ((visExport.opts[n] = v), this)
          : visExport.opts[n];
      };
    })(n);
  }
};

// Usage ////////////////////////////////////
var dataset = {
  rowLabel: ['A', 'B', 'C', 'D', 'E'],
  columnLabel: ['P', 'Q', 'R', 'S'],
  value: [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, 16],
    [17, 18, 19, 20],
  ],
};

var width = 400;
var height = 300;

var table = Table().width(width).height(height);
var header = Header().width(width).height(height);

d3.select('#tableHeader').datum(dataset).call(header);
d3.select('#tableContent').datum(dataset).call(table);

var onMax = function () {
  console.log('max');
};

// rows.forEach(row => {
//     row.onmouseover = () => row.style.opacity = 0.5;
//     row.onmouseleave = () => row.style.opacity = 1;
// });
