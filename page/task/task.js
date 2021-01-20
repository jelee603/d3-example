class Task {
  constructor(options) {
    this.width = options.width;
    this.height = options.height;
    this.parentEl = options.parentEl;
    this.headerEl = options.headerEl;
    this.data = options.data;
    this.barWidth = 10;
    this.barHeight = 50;
    this.rowCount = 10;

    this.createHeader();
    this.chartSvg = this.createTable();
    this.xAxis = this.createScale();
    this.focus = this.createTooltip();
    this.render();
  }

  createHeader() {
    return d3
      .select(this.headerEl)
      .append('svg')
      .attr('class', 'header')
      .attr('width', this.width)
      .attr('height', 40);
  }
  createTable() {
    return d3
      .select(this.parentEl)
      .append('svg')
      .attr('class', 'table')
      .attr('width', this.width)
      .attr('height', this.height)
      .selectAll('rect')
      .data(this.data.data)
      .enter();
  }
  createScale() {
    var x = d3.scaleTime().domain([0, this.width]);
    return d3.axisBottom(x);
  }
  createTooltip() {
    return this.chartSvg
      .append('g')
      .attr('class', 'focus')
      .style('display', 'none')
      .append('rect')
      .attr('class', 'tooltip')
      .attr('width', 100)
      .attr('height', 50)
      .attr('x', 10)
      .attr('y', -22)
      .attr('rx', 4)
      .attr('ry', 4)
      .append('text')
      .attr('class', 'tooltip-date')
      .attr('x', 18)
      .attr('y', -2);
  }
  render() {
    const hours = Array.from(Array(24), (_, idx) => `${idx + 1}:00`);
    const focus = this.focus;
    var headerSvg = d3
      .select('svg.header')
      .selectAll('box')
      .data(hours)
      .enter();

    // 헤더
    headerSvg
      .append('text')
      .attr('height', 10)
      .attr('x', function (d, i) {
        return 60 * (i + 1);
      })
      .attr('y', function (d, i) {
        return 20;
      })
      .text(function (d, i) {
        return d;
      });

    // 막대 바
    this.chartSvg
      .append('rect')
      .attr('class', 'row')
      .attr('height', 40)
      .attr('width', this.barWidth)
      .attr('x', (d, i) => {
        return this.barX(d.Date);
      })
      .attr('y', (d, i) => {
        return this.barHeight * i;
      })
      .on('mouseover', function () {
        focus.style('display', null);
      })
      .on('mouseout', function () {
        focus.style('display', 'none');
      })
      .on('mousemove', function (e) {
        focus.attr('transform', 'translate(40,40)');
        focus.select('.tooltip-date').text(this.__data__.Name);
      });

    // 라벨명
    this.chartSvg
      .append('text')
      .attr('x', 0)
      .attr('y', function (d, i) {
        return 50 * i;
      })
      .attr('dx', 15)
      .attr('dy', 15)
      .text(function (d, i) {
        return d.Name;
      });

    this.createRowLine();
  }
  createRowLine() {
    const dummy = Array(this.rowCount).fill(0);
    this.chartSvg
      .append('g')
      .selectAll('rect')
      .data(dummy)
      .enter()
      .attr('class', 'row')
      .attr('data-idx', (_, i) => i)
      .attr('x', 0)
      .attr('y', (d, i) => i * this.barHeight)
      .attr('width', this.width * 2)
      .attr('height', this.barHeight)
      .style('fill', 'none')
      .style('stroke', 'black')
      .style('stroke-width', 0.5);
  }
  barX(date) {
    const [hh, mm] = date.split(':');

    return 60 * parseInt(hh) + this.barWidth * (parseInt(mm) / 10);
  }
}
