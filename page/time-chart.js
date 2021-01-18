class timeChart {
  constructor(options) {
    this.width = options.width;
    this.height = options.height;
    this.margin = options.margin;
    this.rowCount = this.rowCount;
    this.elQuery = options.elQuery;

    this.xScale = this.createXScale();
    this.xAxis = this.createXAxis();
    this.barHeight = 50;

    new timeHeader({
      ...options,
      margin: 50,
      width: 1800,
      height: 50,
      xScale: this.xScale,
      xAxis: this.xAxis,
      elQuery: '#x_axis',
    });

    new timeTable({
      ...options,
      margin: 0,
      scrollWrapperEl: '.table_wrapper',
      xScale: this.xScale,
      xAxis: this.xAxis,
      barHeight: this.barHeight,
      elQuery: '#table',
    });
  }

  createXScale() {
    // const xMax = d3.max(this.data, d => d.x);
    return d3
      .scaleLinear()
      .range([VIEW_BOX.margin, VIEW_BOX.width - VIEW_BOX.margin])
      .domain([0, 24]);
  }

  createXAxis() {
    return d3.axisTop(this.xScale).ticks(10);
  }
  // createXScale() {
  //   var mindate = new Date(2020, 12, 1),
  //     maxdate = new Date(2020, 12, 31);

  //   return d3
  //     .scaleTime()
  //     .range([this.margin, this.width - this.margin])
  //     .domain([mindate, maxdate]);
  // }

  // createXAxis() {
  //   var timeFormat = d3.utcFormat('%I:%M');
  //   return d3.axisTop(this.xScale).ticks(this.width / 40);
  // }
}
