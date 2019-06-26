var myCan;

var g = 9.8;
var len1 = 1;
var len2 = 1;
var mu = 0.1;                   // Viscous damping

var m1 = 1;
var m2 = 1;

var theta_0_1 = 0.5;            // ~ 30 degrees
var theta_dot_0_1 = 0;          // No initial velocity
var theta_0_2 = 0.0;
var theta_dot_0_2 = 0;;

var deltaT = 0.001;



// Pendulum 1 Parameters
var theta0_1_Input;
var thetaDot0_1_Input;
var muSlider;         // Mu for both
var theta0Label;
var thetaDot0Label;
var muLabel;          // Mu for both
var len1Input;
var len1Label;


// Pendulum 2 Parameters
var theta0_2_Input;
var thetaDot0_2_Input;
var theta0_2_Label;
var thetaDot0_2_Label;
var len2Input;
var len2Label;

var startB;

var timeArray;
var thetaArray1;
var thetaArray2;
var thetaDotArray1;
var thetaDotArray2;

var active;
var myIndex;
var myTheta1;
var myTheta2;


function setup() {
  myCan = createCanvas(600, 500);
  myCan.position(50, 250);
  background(220);

  // Pendulum 1 --------------------------------
  // Initial Angle
  theta0Label = createP('theta_0_1: ' + theta_0_1 + ' rad');
  theta0Label.position(10, 0);
  theta0_1_Input = createInput();
  theta0_1_Input.position(160, 10);
  theta0_1_Input.value(theta_0_1);
  theta0_1_Input.style('width', '70px');
  theta0_1_Input.input(updateICs);
  // Initial Angular Velocity
  thetaDot0_1_Input = createInput();
  thetaDot0_1_Input.position(theta0_1_Input.x, 35);
  thetaDot0_1_Input.value(theta_dot_0_1);
  thetaDot0_1_Input.style('width', '70px');
  thetaDot0_1_Input.input(updateICs);
  len1Input = createInput();
  len1Input.position(theta0_1_Input.x, 60);
  len1Input.style('width', '70px');
  len1Input.value(len1);
  muSlider = createSlider(0, 1, mu, 0.05);
  muSlider.position(theta0_1_Input.x, 85);


  muSlider.input(updateICs);
  len1Input.input(updateICs);

  thetaDot0Label = createP('ThetaDot_0: ' + theta_dot_0_1 + ' rad/s');
  thetaDot0Label.position(10, 25);
  len1Label = createP('Length 1: ' + len1 + ' m');
  len1Label.position(10, 50);
  muLabel = createP('Mu: ' + mu);
  muLabel.position(10, 75);

  // Pendulum 2 ------------------------
  // Initial Angle
  theta0_2_Label = createP('theta_0_2: ' + theta_0_2 + ' rad');
  theta0_2_Label.position(320, 0);
  theta0_2_Input = createInput();
  theta0_2_Input.position(500, 10);
  theta0_2_Input.value(theta_0_2);
  theta0_2_Input.style('width', '70px');
  theta0_2_Input.style('type', 'number');
  theta0_2_Input.input(updateICs);
  // Initial Angular Velocity
  thetaDot0_2_Label = createP('ThetaDot_0_2: ' + theta_dot_0_2 + ' rad/s');
  thetaDot0_2_Label.position(theta0_2_Label.x, 25);
  thetaDot0_2_Input = createInput();
  thetaDot0_2_Input.position(theta0_2_Input.x, 35);
  thetaDot0_2_Input.value(theta_dot_0_2);
  thetaDot0_2_Input.style('width', '70px');
  thetaDot0_2_Input.input(updateICs);
  // Length
  len2Label = createP('Length 2: ' + len2 + ' m');
  len2Label.position(theta0_2_Label.x, 50);
  len2Input = createInput();
  len2Input.position(theta0_2_Input.x, 60);
  len2Input.value(len2);
  len2Input.style('width', '70px');
  len2Input.input(updateICs);
  // ----------------------------------

  // Start Button
  startB = createButton('Start');
  startB.position(310, 190);
  startB.style('width', '80px');
  startB.style('height', '50px');
  startB.mousePressed(start);

  active = 0;

  updateICs();
}

function draw() {
  if (active == 1) {
    background(220);
    myTheta1 = thetaArray1[myIndex];
    myTheta2 = thetaArray2[myIndex];
    stroke(0);
    var jointX = 2*width/4 + (len1*100)*Math.cos(myTheta1 + PI/2);
    var jointY = height/5 + (len1*100)*Math.sin(myTheta1 + PI/2);
    line(2*width/4, height/5, jointX, jointY);
    line(jointX, jointY, jointX + (len2*100)*Math.cos(myTheta2 + PI/2), jointY + (len2*100)*Math.sin(myTheta2 + PI/2));
    myIndex = myIndex + 10;
    if (myIndex >= thetaArray1.length) myIndex = 0;
  }

}

function updateICs() {
  // Pendulum 1
  theta_0_1 = Number(theta0_1_Input.value());
  theta0Label.html('theta_0_1: ' + theta_0_1 + ' rad');
  theta_dot_0_1 = Number(thetaDot0_1_Input.value());
  thetaDot0Label.html('ThetaDot_0: ' + theta_dot_0_1 + ' rad/s');
  len1 = len1Input.value();
  len1Label.html('Length 1: ' + len1 + ' m');
  // Mu
  mu = muSlider.value();
  muLabel.html('Mu: ' + mu);
  // Pendulum 2
  theta_0_2 = Number(theta0_2_Input.value());
  theta0_2_Label.html('theta_0_2: ' + theta_0_2 + ' rad');
  theta_dot_0_2 = Number(thetaDot0_2_Input.value());
  thetaDot0_2_Label.html('ThetaDot_0_2: ' + theta_dot_0_2 + ' rad/s');
  len2 = Number(len2Input.value());
  len2Label.html('Length 2: ' + len2 + ' m');

  noStroke();
  // Clear Background
  background(220);
  theta(10);
  // Draw Penmdulum
  stroke(0);
  strokeWeight(2);
  var jointX = 2*width/4 + (len1*100)*Math.cos(theta_0_1 + PI/2);
  var jointY = height/5 + (len1*100)*Math.sin(theta_0_1 + PI/2);
  line(2*width/4, height/5, jointX, jointY);
  line(jointX, jointY, jointX + (len2*100)*Math.cos(theta_0_2 + PI/2), jointY + (len2*100)*Math.sin(theta_0_2 + PI/2));
}

function start() {
  startB.attribute('disabled', '');
  theta0_1_Input.attribute('disabled', '');
  theta0_2_Input.attribute('disabled', '');
  thetaDot0_1_Input.attribute('disabled', '');
  thetaDot0_2_Input.attribute('disabled', '');
  muSlider.attribute('disabled', '');
  len1Input.attribute('disabled', '');
  len2Input.attribute('disabled', '');

  myIndex = 0;
  active = 1;
}

function get_theta_double_dot(theta, theta_dot) {
  return -1 * mu * theta_dot - (g/len1) * Math.sin(theta);
}

function get_theta_double_dot_1(theta1, theta2, theta_dot1, theta_dot2) {
  var num = (-1*g*(2*m1 + m2)*Math.sin(theta1) - m2*g*Math.sin(theta1 - 2*theta2) - 2*Math.sin(theta1 - theta2)*m2*(theta_dot2*theta_dot2*len2 + theta_dot1*theta_dot1*Math.cos(theta1 - theta2)));
  var den = len1*(2*m1 + m2 - m2*Math.cos(2*theta1 - 2*theta2));
  //if (isNaN(num/den)) background(255, 0, 0);
  return num / den;
}

function get_theta_double_dot_2 (theta1, theta2, theta_dot1, theta_dot2) {
  var num = 2*sin(theta1 - theta2)*(theta_dot1*theta_dot1*len1*(m1 + m2) + g*(m1 + m2)*Math.cos(theta1) + theta_dot2*theta_dot2*len2*m2*Math.cos(theta1 - theta2));
  var den = len2*(2*m1 + m2 - m2*Math.cos(2*theta1 - 2*theta2));
  return num / den;
}


function theta(t) {
  timeArray = [];
  thetaArray1 = [];
  thetaArray2 = [];
  thetaDotArray1 = [];
  thetaDotArray2 = [];
  var theta1 = theta_0_1;
  var theta2 = theta_0_2;
  var theta_dot1 = theta_dot_0_1;
  var theta_dot2 = theta_dot_0_2;
  var theta_double_dot_1;
  var theta_double_dot_2;
  var index = 0;
  for (var i = 0; i < t; i = i + deltaT) {
    //console.log(theta1 + " " + theta2 + " " + theta_dot1 + " " + theta_dot2);
    theta_double_dot_1 = get_theta_double_dot_1(theta1, theta2, theta_dot1, theta_dot2);
    theta_double_dot_2 = get_theta_double_dot_2(theta1, theta2, theta_dot1, theta_dot2);
    theta1 = theta1 + theta_dot1 * deltaT;
    theta2 = theta2 + theta_dot2 * deltaT;
    theta_dot1 = theta_dot1 + theta_double_dot_1 * deltaT;
    theta_dot2 = theta_dot2 + theta_double_dot_2 * deltaT;
    timeArray[index] = i;
    thetaArray1[index] = theta1;
    thetaArray2[index] = theta2;
    index = index + 1;
    // ellipse(width/4 + theta*50, height/2 - theta_dot*50, 2, 2);
    //console.log("Time: " + i + " Theta: " + theta + " Theta_Dot:  " +  theta_dot);
  }
}
