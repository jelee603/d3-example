import * as d3 from 'd3';
import Observable from './Observable';

export default class Chart {
  constructor(options) {
    this.width = options.width;
    this.height = options.height;
    this.margin = options.margin;
    this.rowCount = options.rowCount;
    this.barHeight = options.barHeight;
    this.elQuery = options.elQuery;
    this.data = options.data;
    this.xScale = options.xScale;
    this.scrollWrapperEl = options.scrollWrapperEl;

    // static
    this.HEADER_H = 50;
    this.LABEL_W = 100;

    // Element
    this.svgElement = this.createSvgElement();
    this.tableElement = this.createTableElement();
    this.rowSeperator = this.createRowSeperators();

    // handler
    this.bindZoomHandler();
    this.bindHoverHandler();
  }

  createSvgElement() {
    return d3
      .select(this.elQuery)
      .append('svg')
      .attr('width', this.width)
      .attr('height', this.height)
      .attr('overflow', 'scroll');
  }

  createTableElement() {
    const table = this.svgElement.append('g').attr('class', 'table');

    return table
      .selectAll('rect')
      .data(this.data)
      .enter()
      .append('rect')
      .attr('class', 'bars')
      .attr('x', (d) => this.xScale(d.x))
      .attr('y', (d) => d.z * this.barHeight)
      .attr('width', (d) => d.y)
      .attr('height', (d) => (d.y ? this.barHeight : 0));
  }

  createRowSeperators() {
    const dummy = Array(this.rowCount).fill(0);

    return d3
      .select('g.table')
      .selectAll('rect.row')
      .data(dummy)
      .enter()
      .append('rect')
      .attr('class', 'row')
      .attr('data-idx', (_, i) => i)
      .attr('x', 0)
      .attr('y', (d, i) => i * this.barHeight)
      .attr('width', this.width)
      .attr('height', this.barHeight)
      .style('fill', 'none')
      .style('stroke', 'black')
      .style('stroke-width', 0.5);
  }

  bindZoomHandler() {
    const zoomExtent = [
      [0, 0],
      [this.width, this.height],
    ];

    this.svgElement.call(
      d3
        .zoom()
        .scaleExtent([1, 8])
        .translateExtent(zoomExtent)
        .extent(zoomExtent)
        .on('zoom', this.zoomHandler.bind(this))
    );
  }

  getLine(posArray) {
    return d3.line()(posArray);
  }

  zoomHandler(event) {
    const rescaleX = this.getRescaleHandler(
      this.xScale,
      event.transform.rescaleX(this.xScale)
    );

    this.svgElement
      .selectAll('rect.bars')
      .attr('x', (d) => this.xScale(d.x))
      .attr('width', (d) => rescaleX(d.y));

    Observable.publish('zoom', event);
  }

  getRescaleHandler(originScale, targetScale) {
    const [min1, max1] = originScale.domain();
    const [min2, max2] = targetScale.domain();
    const scaleRate = (max1 - min1) / (max2 - min2);

    return (value) => Math.floor(value * scaleRate);
  }

  bindHoverHandler() {
    this.svgElement
      .on('mousemove', this.mouseMoveHandler.bind(this))
      .on('mouseover', this.mouseOverHandler.bind(this))
      .on('mouseout', this.mouseOutHandler.bind(this));
  }

  mouseMoveHandler(event) {
    this.hoverLineElement.attr('d', () =>
      this.getLine([
        [event.x - this.LABEL_W, 0],
        [event.x - this.LABEL_W, this.barHeight * this.rowCount],
      ])
    );

    const scrollTop = document.querySelector(this.scrollWrapperEl).scrollTop;
    const rowIndex = this.getRowIndexFromMousePos(
      event.screenX,
      event.y + scrollTop
    );

    if (rowIndex === -1) {
      this.svgElement.selectAll('rect.row').style('fill', 'none');
    } else if (this.preHoverRowIndex !== rowIndex) {
      this.svgElement
        .select(`rect.row[data-idx="${this.preHoverRowIndex}"]`)
        .style('fill', 'none');

      this.svgElement
        .select(`rect.row[data-idx="${rowIndex}"]`)
        .style('fill', 'rgba(0,0,0,.2)');

      this.preHoverRowIndex = rowIndex;
    }

    Observable.publish('hover', rowIndex);
  }

  mouseOverHandler(event) {
    this.hoverLineElement = this.svgElement
      .append('path')
      .attr('class', 'hoverline')
      .attr('d', () =>
        this.getLine([
          [event.x - this.LABEL_W, 0],
          [event.x - this.LABEL_W, this.barHeight * this.rowCount],
        ])
      )
      .attr('stroke', 'black');
  }

  mouseOutHandler() {
    this.hoverLineElement.remove();
  }

  getRowIndexFromMousePos(posX, posY) {
    const rowIndex = Math.floor((posY - this.HEADER_H) / this.barHeight);
    return posX < this.width ? rowIndex : -1;
  }
}
