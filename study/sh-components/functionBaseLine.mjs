import { line } from "./index.mjs";

export default function functionBaseLine() {
  var firstXCoord = 10,
    xDistanceBetweenPoints = 50,
    lineGenerator,
    svgHeight = 200;

  lineGenerator = line()
    .x(function (d, i) {
      return firstXCoord + i * xDistanceBetweenPoints;
    })
    .y(function (d) {
      return svgHeight - this.getValue(d);
    });

  return lineGenerator;
}
