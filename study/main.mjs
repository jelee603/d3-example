import { functionBaseLine, line } from "./sh-components/index.mjs";

function drawline() {
  var objectData = [
      { x: 10, y: 130 },
      { x: 100, y: 60 },
      { x: 190, y: 160 },
      { x: 280, y: 10 },
    ],
    lineGenerator = line()
      .x(function (d) {
        return d.x;
      })
      .y(function (d) {
        return d.y;
      }),
    path = lineGenerator(objectData);

  document.getElementById("pathFromArrays").setAttribute("d", path);
}

function drawline2() {
  var yearlyPriceGrapher = {
      lineGenerator: functionBaseLine(),

      getValue: function getValue(year) {
        return 10 * Math.pow(1.8, year - 2010);
      },
    },
    year = [2010, 2011, 2012, 2013, 2014, 2015],
    path = yearlyPriceGrapher.lineGenerator(year);

  document.getElementById("pathFromFunction").setAttribute("d", path);
}

function main() {
  drawline();
  drawline2();
}

main();
