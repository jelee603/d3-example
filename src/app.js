import Core from './core.js';

const rowCount = 20;
const barHeight = 50;
const VIEW_BOX = {
  width: 1000,
  height: rowCount * barHeight,
  margin: 50,
};

function mockData(length = rowCount) {
  return Array(length)
    .fill(0)
    .map(() => ({
      x: Date.now() + Math.floor(Math.random() * 1e8),
      y: Math.floor(Math.random() * 10),
      z: Math.floor(Math.random() * rowCount),
    }));
}

const data = mockData();

console.log(data);

new Core({
  ...VIEW_BOX,
  data: data,
  rowCount,
  barHeight,
  elQuery: '#table',
});
