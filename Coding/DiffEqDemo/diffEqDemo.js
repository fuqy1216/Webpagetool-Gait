var myCan;

var g = 9.8;
var l = 1;
var mu = 0.1;                   // Viscous damping

var theta_0 = 0.5;            // ~ 30 degrees
var theta_dot_0 = 0;          // No initial velocity

var deltaT = 0.001;

var theta0Slider;
var thetaDot0Slider;
var muSlider;
var theta0Label;
var thetaDot0Label;
var muLabel;

var startB;

var timeArray;
var thetaArray;

var active;
var myI;
var myT;


function setup() {
  myCan = createCanvas(600, 500);
  myCan.position(50, 100);
  background(220);
  theta0Slider = createSlider(0, 3.1, theta_0, 0.1);
  theta0Slider.position(160, 10);
  thetaDot0Slider = createSlider(-5, 5, theta_dot_0, 0.1);
  thetaDot0Slider.position(theta0Slider.x, 35);
  muSlider = createSlider(0, 1, mu, 0.05);
  muSlider.position(theta0Slider.x, 60);
  theta0Slider.input(updateICs);
  thetaDot0Slider.input(updateICs);
  muSlider.input(updateICs);
  theta0Label = createP('Theta_0: ' + theta_0 + ' rad');
  theta0Label.position(10, 0);
  thetaDot0Label = createP('ThetaDot_0: ' + theta_dot_0 + ' rad/s');
  thetaDot0Label.position(10, 25);
  muLabel = createP('Mu: ' + mu);
  muLabel.position(10, 50);

  startB = createButton('Start');
  startB.position(350, 25);
  startB.style('width', '80px');
  startB.style('height', '50px');
  startB.mousePressed(start);

  active = 0;

  updateICs();
}

function draw() {
  if (active == 1) {
    fill(220);
    noStroke();
    rect(width/2 + 10, 0, width/2, height);
    myT = thetaArray[myI];
    stroke(0);
    line(3*width/4, height/5, 3*width/4 + (l*100)*Math.cos(myT + PI/2), height/5 + (l*100)*Math.sin(myT + PI/2));
    myI = myI + 10;
    if (myI >= thetaArray.length) myI = 0;
  }

}

function updateICs() {
  theta_0 = theta0Slider.value();
  theta_dot_0 = thetaDot0Slider.value();
  mu = muSlider.value();
  theta0Label.html('Theta_0: ' + theta_0 + ' rad');
  thetaDot0Label.html('ThetaDot_0: ' + theta_dot_0 + ' rad/s');
  muLabel.html('Mu: ' + mu);

  noStroke();
  // Clear Background
  background(220);
  // Draw Axis
  stroke(0);
  line(width/4, 10, width/4, height - 10);
  line(10, height/2, width/2 - 10, height/2);
  noStroke();
  fill(255, 0, 0);
  theta(10);
  // Draw Penmdulum
  stroke(0);
  strokeWeight(2);
  line(3*width/4, height/5, 3*width/4 + (l*100)*Math.cos(theta_0 + PI/2), height/5 + (l*100)*Math.sin(theta_0 + PI/2));
}

function start() {
  startB.attribute('disabled', '');
  theta0Slider.attribute('disabled', '');
  thetaDot0Slider.attribute('disabled', '');
  muSlider.attribute('disabled', '');

  myI = 0;
  active = 1;
}

function get_theta_double_dot(theta, theta_dot) {
  return -1 * mu * theta_dot - (g/l) * Math.sin(theta);
}

function theta(t) {
  timeArray = [];
  thetaArray = [];
  var theta = theta_0;
  var theta_dot = theta_dot_0;
  var theta_double_dot;
  var index = 0;
  for (var i = 0; i < t; i = i + deltaT) {
    theta_double_dot = get_theta_double_dot(theta, theta_dot);
    theta = theta + theta_dot * deltaT;
    theta_dot = theta_dot + theta_double_dot * deltaT;
    timeArray[index] = i;
    thetaArray[index] = theta;
    index = index + 1;
    ellipse(width/4 + theta*50, height/2 - theta_dot*50, 2, 2);
    //console.log("Time: " + i + " Theta: " + theta + " Theta_Dot:  " +  theta_dot);
  }
}
