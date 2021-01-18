class timeHeader {
  constructor(options) {
    this.width = options.width;
    this.height = options.height;
    this.margin = options.margin;
    this.data = options.data;
    this.elQuery = options.elQuery;

    this.xScale = options.xScale;
    this.xAxis = options.xAxis;

    this.svgElement = this.createSvgElement();
    this.xAxisElement = this.createXAxisElement();

    Observable.subscribe('zoom', this.zoomhandler.bind(this));
  }

  createSvgElement() {
    return d3
      .select(this.elQuery)
      .append('svg')
      .attr('width', this.width)
      .attr('height', this.height)
      .attr('overflow', 'scroll');
  }

  createXAxisElement() {
    return this.svgElement
      .append('g')
      .attr('class', 'axis_x')
      .attr('transform', `translate(0,${this.margin})`)
      .call(this.xAxis);
  }

  zoomhandler(event) {
    this.xScale.range(
      [0, this.width - 0].map((d) => event.transform.applyX(d))
    );

    this.xAxis.ticks(this.xAxisElement.node().getBBox().width / 40);
    this.xAxisElement.call(this.xAxis);
  }
}
