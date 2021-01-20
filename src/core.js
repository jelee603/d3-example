import * as d3 from 'd3';
import moment from 'moment';
import Header from './header';
import Chart from './chart';
import Label from './label';

export default class Core {
  constructor(options) {
    this.width = options.width;
    this.height = options.height;
    this.rowCount = options.rowCount;
    this.barHeight = options.barHeight;
    this.elQuery = options.elQuery;
    this.data = options.data;
    this.margin = options.margin;

    // Element\
    this.xScale = this.createXScale();
    this.xAxis = this.createXAxis();

    const wrapper = document.getElementById('app').offsetWidth;
    const header_temp = document.getElementById('temp').offsetWidth;
    new Header({
      ...options,
      elQuery: '#x_axis',
      width: wrapper - header_temp,
      height: 50,
      margin: 50,
      xScale: this.xScale,
      xAxis: this.xAxis,
    });

    new Chart({
      ...options,
      margin: 50,
      height: this.height + 50,
      scrollWrapperEl: '.graph',
      elQuery: '#table',
      xScale: this.xScale,
      xAxis: this.xAxis,
      barHeight: this.barHeight,
    });

    new Label({
      ...options,
      width: 100,
      margin: 0,
      height: this.height + 50,
      scrollWrapperEl: '.graph',
      elQuery: '#y_axis',
      xScale: this.xScale,
      xAxis: this.xAxis,
      barHeight: this.barHeight,
    });
  }

  createXScale() {
    const [today, tomorrow] = this.getTodayAndTomorrowTimeStamp();

    return d3
      .scaleTime()
      .range([this.margin / 2, this.width - this.margin / 2])
      .domain([today, tomorrow]);
  }

  getTodayAndTomorrowTimeStamp() {
    const tomorrow = moment(new Date()).add(1, 'days').startOf('day');
    return [moment(new Date()).startOf('day'), tomorrow];
  }

  createXAxis() {
    return d3
      .axisTop(this.xScale)
      .ticks(d3.timeHour)
      .tickFormat(d3.timeFormat('%H:%M'));
  }
}
