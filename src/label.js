import * as d3 from 'd3';
import Observable from './Observable';

export default class Label {
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
    this.y_axis_width = 0;
    this.cursor_width = 10;

    // Element
    this.svgElement = this.createSvgElement();
    this.rectElement = this.createRectElement();
    this.textElement = this.createTextElement();

    // handler
    Observable.subscribe('hover', this.mouseMoveHandler.bind(this));
  }

  createSvgElement() {
    return d3
      .select(this.elQuery)
      .append('svg')
      .attr('width', this.width)
      .attr('height', this.height);
  }

  createTextElement() {
    const textWrapper = this.svgElement
      .append('g')
      .attr('class', 'text_wrapper');

    return textWrapper
      .selectAll('text')
      .data(new Array(this.rowCount).fill(0))
      .enter()
      .append('text')
      .attr('x', this.width / 2)
      .attr(
        'y',
        (d, i) => this.barHeight * i + this.margin + this.barHeight / 2
      )
      .text((d, i) => i)
      .attr('font-family', 'sans-serif')
      .attr('font-size', '11px')
      .attr('fill', 'black')
      .attr('text-anchor', 'middle');
  }

  createRectElement() {
    const rectGroup = this.svgElement.append('g').attr('class', 'rect_wrapper');

    return rectGroup
      .selectAll('rect')
      .data(new Array(this.rowCount).fill(0))
      .enter()
      .append('rect')
      .attr('class', 'row')
      .attr('data-idx', (_, i) => i)
      .attr('x', 0)
      .attr('y', (_, i) => i * this.barHeight + this.margin)
      .attr('width', this.width)
      .attr('height', this.barHeight)
      .style('fill', 'none')
      .style('stroke', 'black');
  }

  mouseMoveHandler(rowIndex) {
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
  }
}
