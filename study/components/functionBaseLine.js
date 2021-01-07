rj3.svg.samples = {};

rj3.svg.samples.functionBaseLine = function () {
  var firstXCoord = 10,
    xDistanceBetweenPoints = 50,
    lineGenerator,
    svgHeight = 200;

  lineGenerator = rj3.svg
    .line()
    .x(function (d, i) {
      return firstXCoord + i * xDistanceBetweenPoints;
    })
    .y(function (d) {
      return svgHeight - this.getValue(d);
    });

  return lineGenerator;
};
