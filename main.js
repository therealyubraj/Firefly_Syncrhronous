let fireflies = [];
let closestTable = {};
let population = 100;
let maxSeconds = 5;

let testF;

function setup() {
  frameRate(30);
  createCanvas(480, 600);

  for (let i = 0; i < population; i++) {
    fireflies.push(new Firefly());
  }
  testF = new Firefly();
}


function draw() {
  background(0);
  for (let i = 0; i < population; i++) {
    fireflies[i].show();
  }
  let avg = 0;
  for (let t = 0; t < 10; t++) {
    getClosest();
    avg = 0;
    for (let i = 0; i < population; i++) {
      fireflies[i].adjustTime(fireflies[closestTable[i]].timePeriod);
      avg += fireflies[i].timePeriod / 30;
    }
    avg /= population;
  }
}

function getClosest() {
  closestTable = {};
  fireflies.forEach((f1, i) => {
    if (!closestTable[i]) {
      let closest = {
        ind: -1,
        dist: +Infinity
      };
      fireflies.forEach((f2, j) => {
        if (i != j) {
          let distance = distanceSquare(f1.x, f1.y, f2.x, f2.y);
          if (distance < closest.dist) {
            closest.ind = j;
            closest.dist = distance;
          }
        }
      });
      closestTable[i] = closest.ind;
      closestTable[closest.ind] = i;
    }
  });
}

function distanceSquare(x1, y1, x2, y2) {
  return Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2);
}
