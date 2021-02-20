var stlen = 120;
var redval = 0.7;
var counter = 10;
var seconds;
var norminutes;
var clockGraphics;
var s, m;
function setup() {
  pixelDensity(1);
  createCanvas(windowWidth, windowHeight, P2D);
  colorMode(HSB);
  strokeWeight(2);
  stroke(255);
  noFill();
  startup();
}

function startup() {
  const norm = minute();
  const secondss = second();
  norminutes = norm;
  seconds = second();
  clockGraphics = drawClock(stlen * 1.1);
}

function clock(stlen) {
  var date = new Date();
  var currentMillisecond = date.getMilliseconds();
  let radius = stlen;
  needleLength = radius * 0.74;
  s = map(second() - seconds - 1, 0, 60, 0, TWO_PI) + map(currentMillisecond, 0, 1000, 0, PI/30) - HALF_PI;
  m = map(minute() - norminutes + norm(second() - seconds - 1, 0, 60), 0, 60, 0, TWO_PI) - HALF_PI;
  let cos_s = cos(s);
  let cos_m = cos(m);
  let sin_s = sin(s);
  let sin_m = sin(m);
  line(0, 0, cos_s * needleLength, sin_s * needleLength);
  line(0, 0, cos_m * needleLength, sin_m * needleLength);
  push();
  translate(needleLength*cos_m, needleLength*sin_m);
  fractal(0, needleLength*redval, redval, s + HALF_PI, m + HALF_PI, counter);
  pop();
  push();
  translate(needleLength*cos_s, needleLength*sin_s);
  fractal(0, needleLength*redval, redval, s + HALF_PI, m + HALF_PI, counter);
  pop();
}

function drawClock(radius) {
  var getGraphics = createGraphics(windowWidth, windowHeight, P2D);
  getGraphics.clear();
  getGraphics.translate(width/2, height/2);
  getGraphics.fill(255);
  getGraphics.push();
  getGraphics.strokeWeight(5);
  getGraphics.point(0, 0);
  getGraphics.pop();
  getGraphics.push();
  for (i = 0; i < 60; i++) {
    let p = map(i, 0, 60, 0, TWO_PI) - HALF_PI;
    getGraphics.stroke(255); 
    if (i%15 === 0) {
      getGraphics.line(cos(p)*radius*0.85, sin(p)*radius*0.85, cos(p)*radius, sin(p)*radius);
    } else if (i%5 === 0) {
      getGraphics.line(cos(p)*radius*0.90, sin(p)*radius*0.90, cos(p)*radius, sin(p)*radius);
    } else {
      getGraphics.line(cos(p)*radius*0.95, sin(p)*radius*0.95, cos(p)*radius, sin(p)*radius);
    }
    if (i%5 == 0) {
      getGraphics.textAlign(CENTER, CENTER);
      if (i%15 === 10) {
        getGraphics.push();
        getGraphics.strokeWeight(1);
        getGraphics.text(str((i/5+1)), cos(p+PI/6)*radius*0.77, sin(p+PI/6)*radius*0.77);
        getGraphics.pop();
      } else {
        getGraphics.push();
        getGraphics.strokeWeight(1);
        getGraphics.text(str((i/5+1)), cos(p+PI/6)*radius*0.83, sin(p+PI/6)*radius*0.83);
        getGraphics.pop();
      }
    }
  }
  getGraphics.pop();
  return getGraphics;
}

function fractal(prelen, len, a, angle1, angle2, count) {
  if (count > 0) {
    push();
    translate(0, -prelen);
    rotate(angle1);
    stroke(abs(sin(count*angle1))*255, 255, 255);
    line(0, 0, 0, -len);
    fractal(len, len*a, a, angle1, angle2, count-1);
    pop();
    push();
    translate(0, -prelen);
    rotate(angle2);
    stroke(abs(sin(count*angle1))*255, 255, 255);
    line(0, 0, 0, -len);
    fractal(len, len*a, a, angle1, angle2, count-1);
    pop();
  }
}

function draw() {
  background(0);
  image(clockGraphics, 0, 0);
  translate(width/2, height/2);
  clock(stlen);
}
