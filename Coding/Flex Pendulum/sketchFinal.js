// Canvas
var myCan;

// G
var g = 9.8;

// Radio Button to Switch # of Pendulums
var pendRadio;
var pendState; // Number of Pendulums

// Length of First Pendulum
var len1 = 1.0;
var len1Input;
var len1Label;
// Length of Second Pendulum
var len2 = 1.0;
var len2Input;
var len2Label;
// Length of Third Pendulum
var len3 = 0.5;
var len3Input;
var len3Label;
// Mass of First Pendulum
var mass1 = 1.0;
var mass1Input;
var mass1Label
// Mass of Second Pendulum
var mass2 = 1.0;
var mass2Input;
var mass2Label;
// Mass of Third Pendulum
var mass3 = 0.5;
var mass3Input;
var mass3Label;
// Initial Angle of First Pendulum
var theta0_1 = 15.0;
var theta0_1_Input;
var theta0_1_Label;
// Initial Angle of Second Pendulum
var theta0_2 = 30.0;
var theta0_2_Input;
var theta0_2_Label;
// Initial Angular Velocity of First Pendulum
var thetaDot0_1 = 0.0;
var thetaDot0_1_Input;
var thetaDot0_1_Label;
// Initial Angular Velocity of Second Pendulum
var thetaDot0_2 = 0.0;
var thetaDot0_2_Input;
var thetaDot0_2_Label;
// Mu - Coefficient of Viscous Damping
var mu_ = 0.1;
var mu_Input;
var mu_Label;
// K - Coefficient of Spring Constant
var k_ = 0.0;
var k_Input;
var k_Label;
// Time Interval
var time_ = 10.0;
var time_Input;
var time_Label;
// Start Button
var startB;
var active;
// Reset Button
var resetB;
// Delta T
var deltaT = 0.001;
// Loop Checkbox
var loopC;

// Arrays for Calculations
var timeArray;
var theta1Array;
var theta2Array;
var theta3Array;
var thetaDot1Array;
var thetaDot2Array;
var thetaDot3Array;
var thetaDbDot1Array;
var thetaDbDot2Array;
var thetaDbDot3Array;

// Animation Indices/Variables
var drawIndex;
var drawTheta1;
var drawTheta2;
var drawTheta3;
var isPaused;

// UI DOM elements for Time Togglinng
var pauseB;
var toggleForB;
var toggleBacB;
var toggleIncInput; // Time Increment

var drawTimeLabel;
var annInput;
var recB;

// Joint Angle // Position Labels
var jAng1Label;
var jAng2Label;
var jPos1Label;
var jPos2Label;

// Foot Fraction
var footFraction;
var footFractionSlider;
var footFractionLabel;

function setup() {
  myCan = createCanvas(600, 500);
  myCan.position(30, 250);
  background(220);
  // Radio Button for # of Pendulums
  pendRadio = createRadio();
  pendRadio.option('Single Pendulum');
  pendRadio.option('Double Pendulum');
  pendRadio.option('Double Pendulum with Foot');
  pendRadio.option('Inverted Pendulum');
  pendRadio.position(130, 10);
  pendRadio.style('text-align', 'center');
  pendRadio.value('Double Pendulum with Foot');
  pendState = 3;
  pendRadio.changed(switchState);
  // Length of First Pendulum
  len1Input = createInput();
  len1Input.position(175, 60);
  len1Input.style('width', '70px');
  len1Input.value(len1);
  len1Input.input(updateICs);
  len1Label = createDiv('Length 1: ' + len1 + ' m');
  len1Label.position(10, len1Input.y);
  // Length of Second Pendulum
  len2Input = createInput();
  len2Input.position(460, 60);
  len2Input.value(len2);
  len2Input.style('width', '70px');
  len2Input.input(updateICs);
  len2Label = createDiv('Length 2: ' + len2 + ' m');
  len2Label.position(300, len2Input.y);
  // Length of Third Pendulum
  len3Input = createInput();
  len3Input.position(745, 60);
  len3Input.value(len3);
  len3Input.style('width', '70px');
  len3Input.input(updateICs);
  len3Label = createDiv('Length 3: ' + len3 + ' m');
  len3Label.position(590, len3Input.y);
  // Mass of First Pendulum
  mass1Input = createInput();
  mass1Input.position(len1Input.x, len1Input.y + 30);
  mass1Input.style('width', '70px');
  mass1Input.value(mass1);
  mass1Input.input(updateICs);
  mass1Label = createDiv('Mass 1: ' + mass1 + ' kg');
  mass1Label.position(len1Label.x, mass1Input.y);
  // Mass of Second Pendulum
  mass2Input = createInput();
  mass2Input.position(len2Input.x, len2Input.y + 30);
  mass2Input.style('width', '70px');
  mass2Input.value(mass2);
  mass2Input.input(updateICs);
  mass2Label = createDiv('Mass 2: ' + mass2 + ' kg');
  mass2Label.position(len2Label.x, mass2Input.y);
  // Mass of Third Pendulum
  mass3Input = createInput();
  mass3Input.position(len3Input.x, len3Input.y + 30);
  mass3Input.style('width', '70px');
  mass3Input.value(mass3);
  mass3Input.input(updateICs);
  mass3Label = createDiv('Mass 3: ' + mass3 + ' kg');
  mass3Label.position(len3Label.x, mass3Input.y);
  // Initial Angle of First Pendulum
  theta0_1_Input = createInput();
  theta0_1_Input.position(mass1Input.x, mass1Input.y + 30);
  theta0_1_Input.style('width', '70px');
  theta0_1_Input.value(theta0_1);
  theta0_1_Input.input(updateICs);
  theta0_1_Label = createDiv('Initial \u0398 1: ' + theta0_1 + ' deg');
  theta0_1_Label.position(mass1Label.x, theta0_1_Input.y);
  // Initial Angle of Second Pendulum
  theta0_2_Input = createInput();
  theta0_2_Input.position(mass2Input.x, mass2Input.y + 30);
  theta0_2_Input.style('width', '70px');
  theta0_2_Input.value(theta0_2);
  theta0_2_Input.input(updateICs);
  theta0_2_Label = createDiv('Initial \u0398 2: ' + theta0_2 + ' deg');
  theta0_2_Label.position(mass2Label.x, theta0_2_Input.y);
  // Initial Angular Velocity of First Pendulum
  thetaDot0_1_Input = createInput();
  thetaDot0_1_Input.position(theta0_1_Input.x, theta0_1_Input.y + 30);
  thetaDot0_1_Input.style('width', '70px');
  thetaDot0_1_Input.value(thetaDot0_1);
  thetaDot0_1_Input.input(updateICs);
  thetaDot0_1_Label = createDiv('Initial \u0398\u0027 1: ' + thetaDot0_1 + ' deg/s')
  thetaDot0_1_Label.position(theta0_1_Label.x, thetaDot0_1_Input.y);
  // Initial Angular Velocity of Second Pendulum
  thetaDot0_2_Input = createInput();
  thetaDot0_2_Input.position(theta0_2_Input.x, theta0_2_Input.y + 30);
  thetaDot0_2_Input.style('width', '70px');
  thetaDot0_2_Input.value(thetaDot0_2);
  thetaDot0_2_Input.input(updateICs);
  thetaDot0_2_Label = createDiv('Initial \u0398\u0027 2: ' + thetaDot0_2 + ' deg/s')
  thetaDot0_2_Label.position(theta0_2_Label.x, thetaDot0_2_Input.y);
  // Mu
  mu_Input = createInput();
  mu_Input.position(thetaDot0_1_Input.x, thetaDot0_1_Input.y + 30);
  mu_Input.style('width', '70px');
  mu_Input.value(mu_);
  mu_Input.input(updateICs);
  mu_Input.attribute('disabled', '');
  mu_Label = createDiv('Mu: ' + mu_);
  mu_Label.position(thetaDot0_1_Label.x, mu_Input.y);
  // K
  k_Input = createInput();
  k_Input.position(thetaDot0_2_Input.x, thetaDot0_2_Input.y + 30);
  k_Input.style('width', '70px');
  k_Input.value(k_);
  k_Input.input(updateICs);
  k_Input.attribute('disabled', '');
  k_Label = createDiv('K: ' + k_);
  k_Label.position(thetaDot0_2_Label.x, k_Input.y);
  // Time
  time_Input = createInput();
  time_Input.position(mu_Input.x, mu_Input.y + 30);
  time_Input.style('width', '70px');
  time_Input.value(time_);
  time_Input.input(updateICs);
  time_Label = createDiv('Time: ' + time_ + ' sec(s)');
  time_Label.position(mu_Label.x, time_Input.y);
  // Start Button
  startB = createButton('Load');
  startB.position(k_Label.x, k_Label.y + 30);
  startB.style('width', '100px');
  startB.style('height', '30px');
  startB.mousePressed(start);
  active = 0;
  isPaused = 0;
  // Reset Button
  resetB = createButton('Reset');
  resetB.position(startB.x + startB.width + 10, startB.y);
  resetB.style('width', '100px');
  resetB.style('height', '30px');
  resetB.mousePressed(reset);
  resetB.attribute('disabled', '');

  // Loop Checkbox;
  loopC = createCheckbox('Loop', false);
  loopC.position(myCan.x + myCan.width - 50, myCan.y - 25);

  // Pause Button
  pauseB = createButton('Pause');
  pauseB.position(myCan.x, myCan.y + myCan.height + 10);
  pauseB.style('width', '75px');
  pauseB.attribute('disabled', '');
  pauseB.mousePressed(pause);

  // Time Toggles
  toggleBacB = createButton('<');
  toggleBacB.position(pauseB.x + pauseB.width + 5, pauseB.y);
  toggleBacB.attribute('disabled', '');
  toggleBacB.mousePressed(function() {
    var min = Number(toggleIncInput.value());
    if (isNaN(min) || min <= 0) {
      alert("Invalid Time Step");
      return;
    }
    drawIndex = drawIndex - 1000*min;
    if (drawIndex < 0) drawIndex = drawIndex + theta1Array.length;
  });
  toggleIncInput = createInput();
  toggleIncInput.position(toggleBacB.x + toggleBacB.width + 5, toggleBacB.y);
  toggleIncInput.style('width', '50px');
  toggleIncInput.value(0.1);
  toggleIncInput.attribute('disabled', '');
  toggleForB = createButton('>');
  toggleForB.position(toggleIncInput.x + toggleIncInput.width + 10, toggleIncInput.y);
  toggleForB.attribute('disabled', '');
  toggleForB.mousePressed(function() {
    var add = Number(toggleIncInput.value());
    if (isNaN(add) || add <= 0) {
      alert("Invalid Time Step");
      return;
    }
    drawIndex = drawIndex + 1000*add;
    if (drawIndex >= theta1Array.length) drawIndex = drawIndex - theta1Array.length;
  });

  // Time Label
  drawTimeLabel = createDiv();
  drawTimeLabel.position(toggleForB.x + toggleForB.width + 5, toggleForB.y);
  drawTimeLabel.style('width', '150px');

  // Annotation Input
  annInput = createInput();
  annInput.position(drawTimeLabel.x + drawTimeLabel.width + 5, drawTimeLabel.y);
  annInput.style('width', '150px');
  annInput.value('Insert Annotation');

  // Record Button
  recB = createButton('Record');
  recB.position(annInput.x + annInput.width + 10, annInput.y);
  recB.style('width', '75px');
  recB.attribute('disabled', '');
  recB.mousePressed(enterRow);


  // Joint Angle // Position Labels
  jAng1Label = createDiv();
  jAng1Label.position(pauseB.x, pauseB.y + pauseB.height + 10);
  jAng1Label.style('width', '140px');
  jPos1Label = createDiv();
  jPos1Label.position(jAng1Label.x + jAng1Label.width + 5, jAng1Label.y);
  jPos1Label.style('width', '150px');
  jAng2Label = createDiv();
  jAng2Label.position(jPos1Label.x + jPos1Label.width + 5, jPos1Label.y);
  jAng2Label.style('width', '140px');
  jPos2Label = createDiv();
  jPos2Label.position(jAng2Label.x + jAng2Label.width + 5, jAng2Label.y);
  jPos2Label.style('width', '150px');

  // Foot Fraction
  footFraction = 0.33;
  footFractionSlider = createSlider(0, 1, footFraction, 0.01);
  footFractionSlider.position(mass3Label.x, mass3Label.y + 30);
  footFractionSlider.style('width', '100px');
  footFractionLabel = createDiv('Foot Fraction: ' + footFraction);
  footFractionLabel.position(footFractionSlider.x + footFractionSlider.width + 5, footFractionSlider.y);
  footFractionSlider.input(function() {
    footFraction = footFractionSlider.value();
    footFractionLabel.html('Foot Fraction: ' + footFraction);
  });

  // Select HTML Table and Specify Position
  var recTable = select('#dataTable');
  recTable.position(myCan.x + myCan.width + 10, myCan.y);

}


function draw() {
  background(220);
  if (active == 0) {
    fill(0);
    ellipse(width/2, height/2, 5, 5);
    var theta1 = Number(theta0_1_Input.value())*PI/180.0 + PI/2;
    var theta2 = Number(theta0_2_Input.value())*PI/180.0 + PI/2;
    line(width/2, height/2, width/2 + len1*100*Math.cos(theta1), height/2 + len1*100*Math.sin(theta1));
    if (pendState < 4){
    if (pendState >= 2) line(width/2 + len1*100*Math.cos(theta1), height/2 + len1*100*Math.sin(theta1), width/2 + len1*100*Math.cos(theta1) + len2*100*Math.cos(theta2), height/2 + len1*100*Math.sin(theta1) + len2*100*Math.sin(theta2));
    ellipse(width/2 + len1*100*Math.cos(theta1), height/2 + len1*100*Math.sin(theta1), mass1*4, mass1*4);
    if (pendState >= 2) ellipse(width/2 + len1*100*Math.cos(theta1) + len2*100*Math.cos(theta2), height/2 + len1*100*Math.sin(theta1) + len2*100*Math.sin(theta2), mass2*4, mass2*4);
    if (pendState >= 3) {
      line(width/2 + len1*100*Math.cos(theta1) + len2*100*Math.cos(theta2), height/2 + len1*100*Math.sin(theta1) + len2*100*Math.sin(theta2), width/2 + len1*100*Math.cos(theta1) + len2*100*Math.cos(theta2) + footFraction*len3*100*Math.cos(theta2 + PI/2), height/2 + len1*100*Math.sin(theta1) + len2*100*Math.sin(theta2) + footFraction*len3*100*Math.sin(theta2 + PI/2));
      line(width/2 + len1*100*Math.cos(theta1) + len2*100*Math.cos(theta2), height/2 + len1*100*Math.sin(theta1) + len2*100*Math.sin(theta2), width/2 + len1*100*Math.cos(theta1) + len2*100*Math.cos(theta2) + (1 - footFraction)*len3*100*Math.cos(theta2 - PI/2), height/2 + len1*100*Math.sin(theta1) + len2*100*Math.sin(theta2) + (1 - footFraction)*len3*100*Math.sin(theta2 - PI/2));
    }
    }
  }
  if (active == 1) {
    drawTheta1 = theta1Array[drawIndex] + PI/2;
    stroke(0)
    fill(0);
    line(width/2, height/2, width/2 + len1*100*Math.cos(drawTheta1), height/2 + len1*100*Math.sin(drawTheta1));
    ellipse(width/2 + len1*100*Math.cos(drawTheta1), height/2 + len1*100*Math.sin(drawTheta1), mass1*4, mass1*4);
    if (isPaused == 1) {
      jAng1Label.html('\u0398(1) = ' + round((drawTheta1 - PI/2)*180/PI*100)/100 + ' deg');
      jPos1Label.html('(' + round(len1*100*Math.cos(drawTheta1)*100)/100 + ', ' + -1*round(len1*100*Math.sin(drawTheta1)*100)/100 +')');
      drawTimeLabel.html('Time: ' + drawIndex/1000 + ' seconds');
    }
    if ((pendState >= 2)&&(pendState < 4)) {
      drawTheta2 = theta2Array[drawIndex] + PI/2;
      var jointX = width/2 + (len1*100)*Math.cos(drawTheta1);
      var jointY = height/2 + (len1*100)*Math.sin(drawTheta1);
      var endX = jointX + (len2*100)*Math.cos(drawTheta2);
      var endY = jointY + (len2*100)*Math.sin(drawTheta2);
      line(jointX, jointY, jointX + (len2*100)*Math.cos(drawTheta2), jointY + (len2*100)*Math.sin(drawTheta2));
      // console.log(jointX + (len2*100)*Math.cos(drawTheta2 + PI/2) + " " + jointY + (len2*100)*Math.sin(drawTheta2 + PI/2));
      ellipse(jointX + (len2*100)*Math.cos(drawTheta2), jointY + (len2*100)*Math.sin(drawTheta2), mass2*4, mass2*4);
      if (isPaused == 1) {
        jAng2Label.html('\u0398(2) = ' + round((drawTheta2 - PI/2)*180/PI*100)/100 + ' deg');
        jPos2Label.html('(' + round((jointX + (len2*100)*Math.cos(drawTheta2) - width/2)*100)/100 + ', ' + -1*round((jointY + (len2*100)*Math.sin(drawTheta2) - height/2)*100)/100 + ')');
      }

      if (pendState >= 3) {
        drawTheta3 = drawTheta2 + PI/2; //theta3Array[drawIndex] + PI/2;
        line(endX, endY, endX + footFraction*len3*100*Math.cos(drawTheta3), endY + footFraction*len3*100*Math.sin(drawTheta3));
        line(endX, endY, endX + (1 - footFraction)*len3*100*Math.cos(drawTheta3 - PI), endY + (1 - footFraction)*len3*100*Math.sin(drawTheta3 - PI));
      }
    }

    // Draw Progres Bar
    fill(0, 255, 0);  // Green
    rect(5, height - 15, (width - 10)*(drawIndex/theta1Array.length), 10);

    // Advance frame
    if (isPaused == 0) drawIndex = drawIndex + 10;

    // Check drawIndex amd loop back to beginning
    if (drawIndex >= theta1Array.length)  {
      var myBool = loopC.checked();
      if (myBool) drawIndex = 0;
      if (!myBool) drawIndex = theta1Array.length - 1;
    }
  }
}

function updateICs() {
  len1 = Number(len1Input.value());
  len1Label.html('Length 1: ' + len1 + ' m');
  len2 = Number(len2Input.value());
  len2Label.html('Length 2: ' + len2 + ' m');
  len3 = Number(len3Input.value());
  len3Label.html('Length 3: ' + len3 + ' m');
  mass1 = Number(mass1Input.value());
  mass1Label.html('Mass 1: ' + mass1 + ' kg');
  mass2 = Number(mass2Input.value());
  mass2Label.html('Mass 2: ' + mass2 + ' kg');
  mass3 = Number(mass3Input.value());
  mass3Label.html('Mass 3: ' + mass3 + ' kg');
  theta0_1 = Number(theta0_1_Input.value());
  theta0_1_Label.html('Initial \u0398 1: ' + theta0_1 + ' deg');
  theta0_2 = Number(theta0_2_Input.value());
  theta0_2_Label.html('Initial \u0398 2: ' + theta0_2 + ' deg');
  thetaDot0_1 = Number(thetaDot0_1_Input.value());
  thetaDot0_1_Label.html('Initial \u0398\u0027 1: ' + thetaDot0_1 + ' deg/s');
  thetaDot0_2 = Number(thetaDot0_2_Input.value());
  thetaDot0_2_Label.html('Initial \u0398\u0027 2: ' + thetaDot0_2 + ' deg/s');
  mu_ = Number(mu_Input.value());
  mu_Label.html('Mu: ' + mu_);
  k_ = Number(k_Input.value());
  k_Label.html('K: ' + k_);
  time_ = Number(time_Input.value());
  time_Label.html('Time: ' + time_ + ' sec(s)');
}

function switchState() {
  if (pendRadio.value() == 'Single Pendulum') {
    mu_Input.removeAttribute('disabled');
    len2Input.attribute('disabled', '');
    mass2Input.attribute('disabled', '');
    len3Input.attribute('disabled', '');
    mass3Input.attribute('disabled', '');
    theta0_2_Input.attribute('disabled', '');
    thetaDot0_2_Input.attribute('disabled', '');
    pendState = 1;
  }
  if (pendRadio.value() == 'Double Pendulum') {
    mu_Input.attribute('disabled', '');
    len3Input.attribute('disabled', '');
    mass3Input.attribute('disabled', '');
    len2Input.removeAttribute('disabled');
    mass2Input.removeAttribute('disabled');
    theta0_2_Input.removeAttribute('disabled');
    thetaDot0_2_Input.removeAttribute('disabled');
    pendState = 2;
  }
  if (pendRadio.value() == 'Double Pendulum with Foot') {
    mu_Input.attribute('disabled', '');
    len3Input.removeAttribute('disabled');
    mass3Input.removeAttribute('disabled');
    pendState = 3;
  }
  if (pendRadio.value() == 'Inverted Pendulum') {
    mu_Input.removeAttribute('disabled');
    len2Input.attribute('disabled', '');
    mass2Input.attribute('disabled', '');
    len3Input.attribute('disabled', '');
    mass3Input.attribute('disabled', '');
    theta0_2_Input.attribute('disabled', '');
    thetaDot0_2_Input.attribute('disabled', '');
    pendState = 4;
  }
}

function start() {
  pendRadio.attribute('disabled', '');
  len1Input.attribute('disabled', '');
  len2Input.attribute('disabled', '');
  mass1Input.attribute('disabled', '');
  mass2Input.attribute('disabled', '');
  theta0_1_Input.attribute('disabled', '');
  theta0_2_Input.attribute('disabled', '');
  thetaDot0_1_Input.attribute('disabled', '');
  thetaDot0_2_Input.attribute('disabled', '');
  mu_Input.attribute('disabled', '');
  k_Input.attribute('disabled', '');
  time_Input.attribute('disabled', '');
  startB.attribute('disabled', '');
  resetB.removeAttribute('disabled');
  pauseB.removeAttribute('disabled');
  recB.removeAttribute('disabled');

  calculateTheta(time_);


  // Print Min/Max of Motion
  //console.log('Theta 1:');
  findMotionData(theta1Array, 1);
  if ((pendState == 1)||(pendState == 4)) findPeriod(theta1Array);
  if ((pendState > 1)&&(pendState < 4)) {
    //console.log('Theta 2:');
    findMotionData(theta2Array, 2);
  }

  enterHeaders();

  drawIndex = 0;
  active = 1;
  pause();
}

function reset() {
  pendRadio.removeAttribute('disabled');
  len1Input.removeAttribute('disabled');
  len2Input.removeAttribute('disabled');
  mass1Input.removeAttribute('disabled');
  mass2Input.removeAttribute('disabled');
  theta0_1_Input.removeAttribute('disabled');
  theta0_2_Input.removeAttribute('disabled');
  thetaDot0_1_Input.removeAttribute('disabled');
  thetaDot0_2_Input.removeAttribute('disabled');
  mu_Input.removeAttribute('disabled');
  k_Input.removeAttribute('disabled');
  time_Input.removeAttribute('disabled');
  startB.removeAttribute('disabled');
  resetB.attribute('disabled', '');
  pauseB.attribute('disabled', '');
  recB.attribute('disabled', '');
  toggleBacB.attribute('disabled', '');
  toggleIncInput.attribute('disabled', '');
  toggleForB.attribute('disabled', '');

  jAng1Label.html('');
  jAng2Label.html('');
  jPos1Label.html('');
  jPos2Label.html('');
  drawTimeLabel.html('');

  clearTable();

  active = 0;
  isPaused = 0;
}

function pause() {
  if (isPaused == 0) {
    isPaused = 1;
    pauseB.html('Go');
    toggleBacB.removeAttribute('disabled');
    toggleIncInput.removeAttribute('disabled');
    toggleForB.removeAttribute('disabled');
    return;
  } else {
    isPaused = 0;
    pauseB.html('Pause');
    toggleBacB.attribute('disabled', '');
    toggleIncInput.attribute('disabled', '');
    toggleForB.attribute('disabled', '');
    // Clear Labels
    jAng1Label.html('');
    jAng2Label.html('');
    jPos1Label.html('');
    jPos2Label.html('');
    drawTimeLabel.html('');
    return;
  }
}

function calculateTheta(t) {
  timeArray = [];
  theta1Array = [];
  theta2Array = [];
  theta3Array = [];
  thetaDot1Array = [];
  thetaDot2Array = [];
  thetaDot3Array = [];
  thetaDbDot1Array = [];
  thetaDbDot2Array = [];
  thetaDbDot3Array = [];

  if (pendState == 1) {
    var theta = theta0_1*PI/180.0;
    var thetaDot = thetaDot0_1*PI/180.0;
    var thetaDoubleDot;
    var index = 0;
    for (var i = 0; i < t; i = i + deltaT) {
      thetaDoubleDot = singlePend_getThetaDoubleDot(theta, thetaDot);
      theta = theta + thetaDot * deltaT;
      thetaDot = thetaDot + thetaDoubleDot * deltaT;
      timeArray[index] = i;
      theta1Array[index] = theta;
      thetaDot1Array[index] = thetaDot;
      thetaDbDot1Array[index] = thetaDoubleDot;
      index = index + 1;
    }
  }
  if (pendState == 2) {
    var theta1 = theta0_1*PI/180.0;
    var theta2 = theta0_2*PI/180.0;
    var thetaDot1 = thetaDot0_1*PI/180.0;
    var thetaDot2 = thetaDot0_2*PI/180.0;
    // console.log('theta 1: ' + theta1 + ' theta 2: ' + theta2 + ' thetaDot1: ' + thetaDot1 + ' thetaDot2: ' + thetaDot2);
    var thetaDoubleDot1;
    var thetaDoubleDot2;
    var index = 0;
    for (var i = 0; i < t; i = i + deltaT) {
      thetaDoubleDot1 = doublePend_getThetaDoubleDot_1(theta1, theta2, thetaDot1, thetaDot2);
      thetaDoubleDot2 = doublePend_getThetaDoubleDot_2(theta1, theta2, thetaDot1, thetaDot2);
      theta1 = theta1 + thetaDot1 * deltaT;
      theta2 = theta2 + thetaDot2 * deltaT;
      thetaDot1 = thetaDot1 + thetaDoubleDot1 * deltaT;
      thetaDot2 = thetaDot2 + thetaDoubleDot2 * deltaT;
      timeArray[index] = i;
      theta1Array[index] = theta1;
      theta2Array[index] = theta2;
      thetaDot1Array[index] = thetaDot1;
      thetaDot2Array[index] = thetaDot2;
      thetaDbDot1Array[index] = thetaDoubleDot1;
      thetaDbDot2Array[index] = thetaDoubleDot2;
      index = index + 1;
    }
  }
  if (pendState == 3) {
    var theta1 = theta0_1*PI/180.0;
    var theta2 = theta0_2*PI/180.0;
    var theta3 = theta2 + PI/2;
    var thetaDot1 = thetaDot0_1*PI/180.0;
    var thetaDot2 = thetaDot0_2*PI/180.0;
    var thetaDot3 = 0;
    var thetaDoubleDot1;
    var thetaDoubleDot2;
    var thetaDoubleDot3;
    var index = 0;
    for (var i = 0; i < t; i = i + deltaT) {
      thetaDoubleDot1 = triplePend_getThetaDoubleDot_1(theta1, theta2, thetaDot1, thetaDot2);
      thetaDoubleDot2 = triplePend_getThetaDoubleDot_2(theta1, theta2, thetaDot1, thetaDot2);
      thetaDoubleDot3 = triplePend_getThetaDoubleDot_3(theta1, theta2, thetaDot1, thetaDot2);
      theta1 = theta1 + thetaDot1 * deltaT;
      theta2 = theta2 + thetaDot2 * deltaT;
      // theta3 = theta3 + thetaDot3 * deltaT;
      theta3 = theta2 + PI/2; // Hard-coded
      thetaDot1 = thetaDot1 + thetaDoubleDot1 * deltaT;
      thetaDot2 = thetaDot2 + thetaDoubleDot2 * deltaT;
      thetaDot3 = thetaDot3 + thetaDoubleDot3 * deltaT;
      timeArray[index] = i;
      theta1Array[index] = theta1;
      theta2Array[index] = theta2;
      theta3Array[index] = theta3;
      thetaDot1Array[index] = thetaDot1;
      thetaDot2Array[index] = thetaDot2;
      thetaDot3Array[index] = thetaDot3;
      thetaDbDot1Array[index] = thetaDoubleDot1;
      thetaDbDot2Array[index] = thetaDoubleDot2;
      thetaDbDot3Array[index] = thetaDoubleDot3;
      index = index + 1;
    }
  }
  if (pendState == 4) {
    var theta =  PI - theta0_1*PI/180.0;
    var thetaDot = thetaDot0_1*PI/180.0;
    var thetaDoubleDot;
    var index = 0;
    for (var i = 0; i < t; i = i + deltaT) {
      thetaDoubleDot = singlePend_getThetaDoubleDot(theta, thetaDot);
      theta = theta + thetaDot * deltaT;
      thetaDot = thetaDot + thetaDoubleDot * deltaT;
      timeArray[index] = i;
      theta1Array[index] = theta;
      thetaDot1Array[index] = thetaDot;
      thetaDbDot1Array[index] = thetaDoubleDot;
      index = index + 1;
    }
  }
}



function findMotionData(inputArr, num) {
  // Calculate Min and Max Theta and Find Corresponding Times
  var myMax = -99999;
  var myMaxI;
  var myMin = 99999;
  var myMinI;
  for (var i = 0; i < inputArr.length; i++) {
    if (inputArr[i] > myMax) {
      myMax = inputArr[i];
      myMaxI = i;
    }
    if (inputArr[i] < myMin) {
      myMin = inputArr[i];
      myMinI = i;
    }
  }
  //console.log('Abs. Max of ' + round(myMax*180.0/PI*100)/100 + ' deg occurs at ' + round(myMaxI*deltaT*100)/100 + ' seconds');
  //console.log('Abs. Min of ' + round(myMin*180.0/PI*100)/100 + ' deg occurs at ' + round(myMinI*deltaT*100)/100 + ' seconds');
  startTable(round(myMax*180.0/PI*100)/100, round(myMaxI*deltaT*100)/100, round(myMin*180.0/PI*100)/100, round(myMinI*deltaT*100)/100, num)
}

function findPeriod(inputArr) { // No longer wanted by TJA (5/2/2019)
  var critPts = [];
  for (var i = 0; i < inputArr.length; i++) {
    if ((i > 0) && i < (inputArr.length - 1)) {
      if (inputArr[i] > inputArr[i - 1] && inputArr[i] > inputArr[i + 1]) critPts[critPts.length] = i; // Maximum
      if (inputArr[i] < inputArr[i - 1] && inputArr[i] < inputArr[i + 1]) critPts[critPts.length] = i; // Minimum
    }
  }
  var myDiffs = [];
  for (var j = 0; j < critPts.length - 1; j++) myDiffs[j] = critPts[j + 1] - critPts[j];
  var myTotal = 0;
  for (var k = 0; k < myDiffs.length; k++) myTotal = myTotal + myDiffs[k];
  var myAvg = myTotal/myDiffs.length;
  // console.log('Estimated Period: ' + round(myAvg*2/1000*100)/100 + ' seconds');
}



function singlePend_getThetaDoubleDot(myTheta, myThetaDot) {
  return -1 * mu_ * myThetaDot - (g/len1) * Math.sin(myTheta);
}

function doublePend_getThetaDoubleDot_1(myTheta1, myTheta2, myThetaDot1, myThetaDot2) {
  var num = (-1*g*(2*mass1 + mass2)*Math.sin(myTheta1) - mass2*g*Math.sin(myTheta1 - 2*myTheta2) - 2*Math.sin(myTheta1 - myTheta2)*mass2*(myThetaDot2*myThetaDot2*len2 + myThetaDot1*myThetaDot1*Math.cos(myTheta1 - myTheta2)));
  var den = len1*(2*mass1 + mass2 - mass2*Math.cos(2*myTheta1 - 2*myTheta2));
  return num / den;
}

function doublePend_getThetaDoubleDot_2 (myTheta1, myTheta2, myThetaDot1, myThetaDot2) {
  var num = 2*Math.sin(myTheta1 - myTheta2)*(myThetaDot1*myThetaDot1*len1*(mass1 + mass2) + g*(mass1 + mass2)*Math.cos(myTheta1) + myThetaDot2*myThetaDot2*len2*mass2*Math.cos(myTheta1 - myTheta2));
  var den = len2*(2*mass1 + mass2 - mass2*Math.cos(2*myTheta1 - 2*myTheta2));
  return num / den;
}

function triplePend_getThetaDoubleDot_1(myTheta1, myTheta2, myThetaDot1, myThetaDot2) {
  var num = (-1*g*(2*mass1 + mass2)*Math.sin(myTheta1) - mass2*g*Math.sin(myTheta1 - 2*myTheta2) - 2*Math.sin(myTheta1 - myTheta2)*mass2*(myThetaDot2*myThetaDot2*len2 + myThetaDot1*myThetaDot1*Math.cos(myTheta1 - myTheta2)));
  var den = len1*(2*mass1 + mass2 - mass2*Math.cos(2*myTheta1 - 2*myTheta2));
  return num / den;
}

function triplePend_getThetaDoubleDot_2 (myTheta1, myTheta2, myThetaDot1, myThetaDot2) {
  var num = 2*Math.sin(myTheta1 - myTheta2)*(myThetaDot1*myThetaDot1*len1*(mass1 + mass2) + g*(mass1 + mass2)*Math.cos(myTheta1) + myThetaDot2*myThetaDot2*len2*mass2*Math.cos(myTheta1 - myTheta2));
  var den = len2*(2*mass1 + mass2 - mass2*Math.cos(2*myTheta1 - 2*myTheta2));
  return num / den;
}

function triplePend_getThetaDoubleDot_3 (myTheta1, myTheta2, myThetaDot1, myThetaDot2) {
  return 0;
}
