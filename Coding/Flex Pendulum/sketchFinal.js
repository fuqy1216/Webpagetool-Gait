loadScript('leg-solver.js', function() {
  //alert('script ready!'); 
});
loadScript('leg-solver-AFO.js', function() {
  //alert('script ready!'); 
});
// Canvas
var myCan;
var T1stswing;
//IMU data
var StrikeValue;
var StrikeIndexRaw = [];
var StrikeIndex = [];
var ACC = [];
// G
var g = 9.8;
var IMUdata;
var IMUMatrix = [];
//For interpolation
var NewarrayX = [];

// Radio Button to Switch # of Pendulums
var pendRadio;
var pendState; // Number of Pendulums

// Length of First Pendulum
var len1 = 0.446;
var len1Input;
var len1Label;
// Length of Second Pendulum
var len2 = .4;
var len2Input;
var len2Label;
// Length of Third Pendulum
var len3 = 0.15;
var len3Input;
var len3Label;
// Length of Forth Pendulum
var len4 = 0.846;
var len4Input;
var len4Label;
var DoublePenRefer;
// Length of Forth Pendulum
var len5 = 0.07;
var len5Input;
var len5Label;
// Mass of First Pendulum
var mass1 = 9.1;
var mass1Input;
var mass1Label
// Mass of Second Pendulum
var mass2 = 3.04;
var mass2Input;
var mass2Label;
// Mass of Third Pendulum
var mass3 = 2.4;
var mass3Input;
var mass3Label;
// Mass of Forth Pendulum
var mass4 = 12.14;
var mass4Input;
var mass4Label;
// Initial Angle of First Pendulum
var theta0_1 = 15.0;
var theta0_1_Input;
var theta0_1_Label;
// Initial Angle of Second Pendulum
var theta0_2 = 30.0;
var theta0_2_Input;
var theta0_2_Label;
// Initial Angle of Stance Inverted Pendulum
var theta0_4 = -15.0;
var theta0_4_Input;
var theta0_4_Label;
// Initial Angle for DS stance leg
var theta0_5 = 0;
var theta0_5_Input;
var theta0_5_Label;
// Initial Angular Velocity of First Pendulum
var thetaDot0_1 = -250.0;
var thetaDot0_1_Input;
var thetaDot0_1_Label;
// Initial Angular Velocity of Second Pendulum
var thetaDot0_2 = 500.0;
var thetaDot0_2_Input;
var thetaDot0_2_Label;
// Initial Angular Velocity of Inverted Pendulum
var thetaDot0_4 = -130.0;
var thetaDot0_4_Input;
var thetaDot0_4_Label;
// Initial Angular Velocity of DS Stance knee
var thetaDot0_5 = 0;
var thetaDot0_5_Input;
var thetaDot0_5_Label;
// Mu - Coefficient of Viscous Damping
var mu_ = 0.0;
var mu_Input;
var mu_Label;
// K - Coefficient of Spring Constant hip swing
var k_1 = 5.0;
var k_Input;
var k_Label;
// K - Coefficient of Spring Constant knee swing
var k_2 = 8.0;
var k2_Input;
var k2_Label;
// Time Interval
var time_ = 10.0;
var time_Input;
var time_Label;
// Start Button
var startB;
var active;
// Reset Button
var resetB;
var loadB;
// Delta T, minimum time units in second
var deltaT = 0.001;
// Loop Checkbox
var loopC;

// Arrays for Calculations
var timeArray;
var theta1Array;
var theta2Array;
var theta3Array;
var theta4Array;
var thetaDot1Array;
var thetaDot2Array;
var thetaDot3Array;
var thetaDot4Array;
var thetaDbDot1Array;
var thetaDbDot2Array;
var thetaDbDot3Array;
var thetaDbDot4Array;
var  Maxankle = 15/180*PI;
//Array for animation
var intertheta1;
var intertheta2;
var intertheta3;
var intertheta4;
var intertheta5;
var intertheta6;

// Animation Indices/Variables
var drawIndex;
var drawTheta1;
var drawTheta2;
var drawTheta3;
var drawTheta4;
var isPaused;

//for doublestance solver
var DSItheta0;
var DSItheta1;
var DSItheta2;
var DSItheta4;
var DSIdtheta0;
var DSIdtheta1;
var DSIdtheta2;
var DSIdtheta4;

// UI DOM elements for Time Togglinng
var pauseB;
var toggleForB;
var toggleBacB;
var toggleIncInput; // Time Increment

var drawTimeLabel;
var annInput;
var recB;

//STEP INFOS
var StrideT;
var LeftStepT;
var RightStepT;
var StrideL;
var LeftStepL;
var RightStepL;

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
  myCan = createCanvas(1000, 500);
  myCan.position(30, 280);
  background(220);
  // Radio Button for # of Pendulums
  pendRadio = createRadio();
  pendRadio.option('Single Pendulum');
  pendRadio.option('Double Pendulum');
  pendRadio.option('Double Pendulum with Foot');
  pendRadio.option('Swing-Stance');
  pendRadio.position(130, 10);
  pendRadio.style('text-align', 'center');
  pendRadio.value('Swing-Stance');
  pendState = 4;
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
  // Length of Forth Pendulum
    len4Input = createInput();
    len4Input.position(1030, 60);
    len4Input.value(len4);
    len4Input.style('width', '70px');
    len4Input.input(updateICs);
    len4Label = createDiv('Length 4: ' + len4 + ' m');
    len4Label.position(880, len4Input.y);  
    DoublePenRefer = createDiv('Double Pendulum Reference: http://scienceworld.wolfram.com/physics/DoublePendulum.html');
    //DoublePenRefer.href = "https://www.myphysicslab.com/pendulum/double-pendulum-en.html";
    //DoublePenRefer = document.createElement("LINK");
    DoublePenRefer.position(1420, len4Input.y);
  // Length of Ankle Height
    len5Input = createInput();
    len5Input.position(1300, len4Input.y);
    len5Input.value(len5);
    len5Input.style('width', '70px');
    len5Input.input(updateICs);
    len5Label = createDiv('Length 5: ' + len5 + ' m');
    len5Label.position(1150, len4Input.y);
    //front stance knee
    theta0_5_Input = createInput();
    theta0_5_Input.position(len5Input.x, len5Input.y + 30);
    theta0_5_Input.style('width', '70px');
    theta0_5_Input.value(theta0_5);
    theta0_5_Input.input(updateICs);
    theta0_5_Label = createDiv('Initial \u0398 5: ' + theta0_5 + ' deg');
    theta0_5_Label.position(len5Label.x, theta0_5_Input.y);
    //fron stance knee speed
    thetaDot0_5_Input = createInput();
    thetaDot0_5_Input.position(theta0_5_Input.x, theta0_5_Input.y + 30);
    thetaDot0_5_Input.style('width', '70px');
    thetaDot0_5_Input.value(thetaDot0_5);
    thetaDot0_5_Input.input(updateICs);
    thetaDot0_5_Label = createDiv('Initial \u0398\u0027 5: ' + thetaDot0_5 + ' deg/s')
    thetaDot0_5_Label.position(theta0_5_Label.x, thetaDot0_5_Input.y);
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
    // Mass of Forth Pendulum
    mass4Input = createInput();
    mass4Input.position(len4Input.x, len4Input.y + 30);
    mass4Input.style('width', '70px');
    mass4Input.value(mass4);
    mass4Input.input(updateICs);
    mass4Label = createDiv('Mass 4: ' + mass4 + ' kg');
    mass4Label.position(len4Label.x, mass4Input.y);
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
    // Initial Angle of Inverted Pendulum
    theta0_4_Input = createInput();
    theta0_4_Input.position(mass4Input.x, mass4Input.y + 30);
    theta0_4_Input.style('width', '70px');
    theta0_4_Input.value(theta0_4);
    theta0_4_Input.input(updateICs);
    theta0_4_Label = createDiv('Initial \u0398 4: ' + theta0_4 + ' deg');
    theta0_4_Label.position(mass4Label.x, theta0_4_Input.y);
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
    // Initial Angular Velocity of Inverted Pendulum
    thetaDot0_4_Input = createInput();
    thetaDot0_4_Input.position(theta0_4_Input.x, theta0_4_Input.y + 30);
    thetaDot0_4_Input.style('width', '70px');
    thetaDot0_4_Input.value(thetaDot0_4);
    thetaDot0_4_Input.input(updateICs);
    thetaDot0_4_Label = createDiv('Initial \u0398\u0027 4: ' + thetaDot0_4 + ' deg/s')
    thetaDot0_4_Label.position(theta0_4_Label.x, thetaDot0_4_Input.y);
  // Mu
  mu_Input = createInput();
  mu_Input.position(thetaDot0_1_Input.x, thetaDot0_1_Input.y + 30);
  mu_Input.style('width', '70px');
  mu_Input.value(mu_);
  mu_Input.input(updateICs);
  mu_Label = createDiv('KAFO: ' + mu_ + ' Nm/deg');
  mu_Label.position(thetaDot0_1_Label.x, mu_Input.y);
  // K
  k_Input = createInput();
  k_Input.position(thetaDot0_2_Input.x, thetaDot0_2_Input.y + 30);
  k_Input.style('width', '70px');
  k_Input.value(k_1);
  k_Input.input(updateICs);
  k_Label = createDiv('KhipSW: ' + k_1 + ' Nm/deg');
  k_Label.position(thetaDot0_2_Label.x, k_Input.y);
  //kknee
  k2_Input = createInput();
  k2_Input.position(k_Input.x, k_Input.y + 30);
  k2_Input.style('width', '70px');
  k2_Input.value(k_2);
  k2_Input.input(updateICs);
  k2_Label = createDiv('KkneeSW: ' + k_2 + ' Nm/deg');
  k2_Label.position(thetaDot0_2_Label.x, k2_Input.y);
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
  startB.position(k2_Label.x, k2_Label.y + 30);
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
 // Load IMU Button
 loadB = createButton('Load IMU');
 loadB.position(resetB.x + resetB.width + 10, resetB.y);
 loadB.style('width', '100px');
 loadB.style('height', '30px');
 loadB.mousePressed(load);
 //LoadB.attribute('disabled', '');
  // Loop Checkbox;
  loopC = createCheckbox('Loop', true);
  //loopC.position(myCan.x + myCan.width - 50, myCan.y - 25);
  loopC.position(loadB.x + loadB.width + 10, loadB.y);
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
    drawIndex = drawIndex - 1000*min/10;
    if (drawIndex < 0) drawIndex = drawIndex + intertheta1.length;
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
    drawIndex = drawIndex + 1000*add/10;
    if (drawIndex >= intertheta1.length) drawIndex = drawIndex - intertheta1.length;
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

  //gait infor labels
  StrideT = createDiv();
  StrideT.position(pauseB.x, pauseB.y + pauseB.height + 10);
  StrideT.style('width', '140px');
  LeftStepT = createDiv();
  LeftStepT.position(StrideT.x + StrideT.width + 5, StrideT.y);
  LeftStepT.style('width', '140px');
  RightStepT = createDiv();
  RightStepT.position(LeftStepT.x + LeftStepT.width + 5, LeftStepT.y);
  RightStepT.style('width', '140px');
  StrideL = createDiv();
  StrideL.position(RightStepT.x + RightStepT.width + 5, RightStepT.y);
  StrideL.style('width', '140px');
  LeftStepL = createDiv();
  LeftStepL.position(StrideL.x + StrideL.width + 5, StrideL.y);
  LeftStepL.style('width', '140px');
  RightStepL = createDiv();
  RightStepL.position(LeftStepL.x + LeftStepL.width + 5, LeftStepL.y);
  RightStepL.style('width', '140px');
  // Joint Angle // Position Labels
  jAng1Label = createDiv();
  jAng1Label.position(StrideT.x, StrideT.y + StrideT.height + 10);
  jAng1Label.style('width', '140px');
  jPos1Label = createDiv();
  jPos1Label.position(jAng1Label.x + jAng1Label.width + 5, jAng1Label.y);
  jPos1Label.style('width', '200px');
  jPos11Label = createDiv();
  jPos11Label.position(jPos1Label.x + jPos1Label.width + 5, jPos1Label.y);
  jPos11Label.style('width', '200px');
  jAng2Label = createDiv();
  jAng2Label.position(jPos11Label.x + jPos11Label.width + 5, jPos11Label.y);
  jAng2Label.style('width', '140px');
  jPos2Label = createDiv();
  jPos2Label.position(jAng2Label.x + jAng2Label.width + 5, jAng2Label.y);
  jPos2Label.style('width', '200px');
  jPos21Label = createDiv();
  jPos21Label.position(jPos2Label.x + jPos2Label.width + 5, jPos2Label.y);
  jPos21Label.style('width', '200px');
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

  enterHeaders();
}


function draw() {
  Ratio = 3;
  var length1 = len1 * Ratio;
  var length2 = len2 * Ratio;
  var length3 = len3 * Ratio;
  var length4 = len4 * Ratio;
  var length5 = len5 * Ratio;

  background(220);
  //pre-load interface
  if (active == 0) {
    fill(0);
    stroke(0);
    //hip joint
    ellipse(width/2, height/4, 5, 5);
    //two angles
    var theta1 = Number(theta0_1_Input.value())*PI/180.0 + PI/2;
    var theta2 = Number(theta0_2_Input.value())*PI/180.0;
    var theta4 = Number(theta0_4_Input.value())*PI/180.0 + PI/2;
    var theta5 = Number(theta0_5_Input.value())*PI/180.0;
    //upper leg
    line(width/2, height/4, width/2 + length1*100*Math.cos(theta1), height/4 + length1*100*Math.sin(theta1));
    //lower leg
    line(width/2 + length1*100*Math.cos(theta1), height/4 + length1*100*Math.sin(theta1), width/2 + length1*100*Math.cos(theta1) + length2*100*Math.cos(theta1 + theta2), height/4 + length1*100*Math.sin(theta1) + length2*100*Math.sin(theta1 + theta2));

    //knee
   // ellipse(width/2 + length1*100*Math.cos(theta1), height/2 + length1*100*Math.sin(theta1), mass1*4, mass1*4);
    ellipse(width/2 + length1*100*Math.cos(theta1), height/4 + length1*100*Math.sin(theta1), 4, 4);
    //ankle joint
    //ellipse(width/2 + length1*100*Math.cos(theta1) + length2*100*Math.cos(theta2), height/2 + length1*100*Math.sin(theta1) + length2*100*Math.sin(theta2), mass2*4, mass2*4);
    ellipse(width/2 + length1*100*Math.cos(theta1) + length2*100*Math.cos(theta1 + theta2), height/4 + length1*100*Math.sin(theta1) + length2*100*Math.sin(theta1 + theta2), 4, 4);

      //foot link
      line(width/2 + length1*100*Math.cos(theta1) + length2*100*Math.cos(theta1 + theta2), height/4 + length1*100*Math.sin(theta1) + length2*100*Math.sin(theta1 + theta2), width/2 + length1*100*Math.cos(theta1) + (length2+length5)*100*Math.cos(theta1 + theta2), height/4 + length1*100*Math.sin(theta1) + (length2+length5)*100*Math.sin(theta1 + theta2));
      line(width/2 + length1*100*Math.cos(theta1) + (length2+length5)*100*Math.cos(theta1 + theta2), height/4 + length1*100*Math.sin(theta1) + (length2+length5)*100*Math.sin(theta1 + theta2), width/2 + length1*100*Math.cos(theta1) + (length2+length5)*100*Math.cos(theta1 + theta2) + footFraction*length3*100*Math.cos(theta1 + theta2 + PI/2), height/4 + length1*100*Math.sin(theta1) + (length2+length5)*100*Math.sin(theta1 + theta2) + footFraction*length3*100*Math.sin(theta1 + theta2 + PI/2));
      line(width/2 + length1*100*Math.cos(theta1) + (length2+length5)*100*Math.cos(theta1 + theta2), height/4 + length1*100*Math.sin(theta1) + (length2+length5)*100*Math.sin(theta1 + theta2), width/2 + length1*100*Math.cos(theta1) + (length2+length5)*100*Math.cos(theta1 + theta2) + (1 - footFraction)*length3*100*Math.cos(theta1 + theta2 - PI/2), height/4 + length1*100*Math.sin(theta1) + (length2+length5)*100*Math.sin(theta1 + theta2) + (1 - footFraction)*length3*100*Math.sin(theta1 + theta2 - PI/2));
      fill(0,255,0);
      stroke(0,155,0);
      //knee joint
     // ellipse(width/2 + (length1)*100*Math.cos(theta4), height/2 + (length1)*100*Math.sin(theta4), mass1*4, mass1*4);
     ellipse(width/2 + (length1)*100*Math.cos(theta4), height/4 + (length1)*100*Math.sin(theta4), 4, 4);

     //stance leg
     line(width/2, height/4, width/2 + (length1)*100*Math.cos(theta4), height/4 + (length1)*100*Math.sin(theta4));
     //stance lowerleg
     line(width/2 + length1*100*Math.cos(theta4), height/4 + length1*100*Math.sin(theta4), width/2 + length1*100*Math.cos(theta4) + length2*100*Math.cos(theta4 + theta5), height/4 + length1*100*Math.sin(theta4) + length2*100*Math.sin(theta4 + theta5));
     if((mu_ > 0)||(mu_ < 0))
     {
      line(width/2 - 2 + length1*100*Math.cos(theta4), height/4 + length1*100*Math.sin(theta4), width/2 - 2 + length1*100*Math.cos(theta4) + length2*100*Math.cos(theta4 + theta5), height/4 + length1*100*Math.sin(theta4) + length2*100*Math.sin(theta4 + theta5));
    }
     //ankle joint
     //ellipse(width/2 + (length4)*100*Math.cos(theta4), height/2 + (length4)*100*Math.sin(theta4), mass2*4, mass2*4);
     ellipse(width/2 + length1*100*Math.cos(theta4) + length2*100*Math.cos(theta4 + theta5), height/4 + length1*100*Math.sin(theta4) + length2*100*Math.sin(theta4 + theta5), 4, 4);

     //foot
     line(width/2 + length1*100*Math.cos(theta4) + length2*100*Math.cos(theta4 + theta5), height/4 + length1*100*Math.sin(theta4) + length2*100*Math.sin(theta4 + theta5), width/2 + length1*100*Math.cos(theta4) + (length2+length5)*100*Math.cos(theta4 + theta5), height/4 + length1*100*Math.sin(theta4) + (length2+length5)*100*Math.sin(theta4 + theta5));
     line(width/2 + length1*100*Math.cos(theta4) + (length2+length5)*100*Math.cos(theta4 + theta5), height/4 + length1*100*Math.sin(theta4) + (length2+length5)*100*Math.sin(theta4 + theta5), width/2 + length1*100*Math.cos(theta4) + (length2+length5)*100*Math.cos(theta4 + theta5) + footFraction*length3*100*Math.cos(theta4 + theta5 + PI/2), height/4 + length1*100*Math.sin(theta4) + (length2+length5)*100*Math.sin(theta4 + theta5) + footFraction*length3*100*Math.sin(theta4 + theta5 + PI/2));
     line(width/2 + length1*100*Math.cos(theta4) + (length2+length5)*100*Math.cos(theta4 + theta5), height/4 + length1*100*Math.sin(theta4) + (length2+length5)*100*Math.sin(theta4 + theta5), width/2 + length1*100*Math.cos(theta4) + (length2+length5)*100*Math.cos(theta4 + theta5) + (1 - footFraction)*length3*100*Math.cos(theta4 + theta5 - PI/2), height/4 + length1*100*Math.sin(theta4) + (length2+length5)*100*Math.sin(theta4 + theta5) + (1 - footFraction)*length3*100*Math.sin(theta4 + theta5 - PI/2));
     if((mu_ > 0)||(mu_ < 0))
     {
      line(width/2 - 2 + length1*100*Math.cos(theta4) + length2*100*Math.cos(theta4 + theta5), height/4 + length1*100*Math.sin(theta4) + length2*100*Math.sin(theta4 + theta5), width/2 - 2 + length1*100*Math.cos(theta4) + (length2+length5)*100*Math.cos(theta4 + theta5), height/4 + length1*100*Math.sin(theta4) + (length2+length5)*100*Math.sin(theta4 + theta5));
      line(width/2 + length1*100*Math.cos(theta4) + (length2+length5)*100*Math.cos(theta4 + theta5), height/4 - 1 + length1*100*Math.sin(theta4) + (length2+length5)*100*Math.sin(theta4 + theta5), width/2 + length1*100*Math.cos(theta4) + (length2+length5)*100*Math.cos(theta4 + theta5) + footFraction*length3*100*Math.cos(theta4 + theta5 + PI/2), height/4 - 1 + length1*100*Math.sin(theta4) + (length2+length5)*100*Math.sin(theta4 + theta5) + footFraction*length3*100*Math.sin(theta4 + theta5 + PI/2));
      line(width/2 + length1*100*Math.cos(theta4) + (length2+length5)*100*Math.cos(theta4 + theta5), height/4 - 1 + length1*100*Math.sin(theta4) + (length2+length5)*100*Math.sin(theta4 + theta5), width/2 + length1*100*Math.cos(theta4) + (length2+length5)*100*Math.cos(theta4 + theta5) + (1 - footFraction)*length3*100*Math.cos(theta4 + theta5 - PI/2), height/4 - 1 + length1*100*Math.sin(theta4) + (length2+length5)*100*Math.sin(theta4 + theta5) + (1 - footFraction)*length3*100*Math.sin(theta4 + theta5 - PI/2));
     }

  }
  //loading interface
  if (active == 1) {
      //All local angle
      drawTheta1 = intertheta1V[drawIndex]/180*PI;
      drawTheta2 = intertheta2V[drawIndex]/180*PI;
      drawTheta3 = -intertheta3V[drawIndex]/180*PI + 1/2*PI;
      drawTheta4 = -intertheta4V[drawIndex]/180*PI + 1/2*PI;
      drawTheta5 = intertheta5V[drawIndex]/180*PI;
      drawTheta6 = intertheta6V[drawIndex]/180*PI;
      //left side (start with stance)
      var skneeX = width/2 + (length1)*100*Math.cos(drawTheta3);
      var skneeY = height/4 + (length1)*100*Math.sin(drawTheta3);
      //upper leg
      line(width/2, height/4, skneeX, skneeY);
      
      //knee joint
      //ellipse(skneeX, skneeY, mass1*4, mass1*4);
    ellipse(skneeX, skneeY, 4, 4);
    var sankleX = skneeX + (length2)*100*Math.cos(drawTheta3 + drawTheta2);
    var sankleY = skneeY + (length2)*100*Math.sin(drawTheta3 + drawTheta2);
    //lower leg
    line(skneeX, skneeY, sankleX, sankleY);
    if((mu_ > 0)||(mu_ < 0))
    {
      line(skneeX - 2, skneeY, sankleX - 2, sankleY);
    }
    //ankle joint
    //ellipse(sankleX, sankleY, mass2*4, mass2*4);
    ellipse(sankleX, sankleY, 4, 4);
    //foot
    var sfootX = sankleX + length5*100 * Math.cos(drawTheta3 + drawTheta2 - drawTheta1);
    var sfootY = sankleY + length5*100 * Math.sin(drawTheta3 + drawTheta2 - drawTheta1);
    var sheelX = sfootX - footFraction*length3*100 * Math.sin(drawTheta3 + drawTheta2 - drawTheta1);
    var sheelY = sfootY + footFraction*length3*100 * Math.cos(drawTheta3 + drawTheta2 - drawTheta1);
    var stoeX = sfootX + (1 - footFraction)*length3*100 * Math.sin(drawTheta3 + drawTheta2 - drawTheta1);
    var stoeY = sfootY - (1 - footFraction)*length3*100 * Math.cos(drawTheta3 + drawTheta2 - drawTheta1);
    //line(width/2 + (length4)*100*Math.cos(2*PI - drawTheta4), height/2 + (length4)*100*Math.sin(2*PI - drawTheta4), width/2 + (length4 + length5)*100*Math.cos(2*PI - drawTheta4), height/2 + (length4 + length5)*100*Math.sin(2*PI - drawTheta4));
    line(sankleX, sankleY, sfootX, sfootY);
    line(sfootX, sfootY, sheelX, sheelY);
    line(sfootX, sfootY, stoeX, stoeY);
    if((mu_ > 0)||(mu_ < 0))
    {
      line(sankleX - 2, sankleY, sfootX - 2, sfootY);
      line(sfootX, sfootY - 1, sheelX, sheelY - 1);
      line(sfootX, sfootY - 1, stoeX, stoeY - 1);
    }
      //show the angle and joint location
      if (isPaused == 1) {
        jAng1Label.html('\u0398(1) = ' + round((drawTheta1 - PI/2)*180/PI*100)/100 + ' deg');
        jPos1Label.html('Left (Green) Toe: (' + round((stoeX-sheelX)*100)/100 + ', ' + -1*round((stoeY-sheelY)*100)/100 + ')');
        jPos11Label.html('Left (Green) Heel: (' + round((sheelX-sheelX)*100)/100 + ', ' + -1*round((sheelY-sheelY)*100)/100 + ')');
        drawTimeLabel.html('Time: ' + drawIndex/100 + ' seconds');
      }  
    
    //calculated theta1 value
   // drawTheta1 = theta1Array[drawIndex] + PI/2;
    stroke(0);
    fill(0);
    //upper leg
    var kneeX = width/2 + (length1)*100*Math.cos(drawTheta4);
      var kneeY = height/4 + (length1)*100*Math.sin(drawTheta4);
      //upper leg
      line(width/2, height/4, kneeX, kneeY);
      //knee joint
      //ellipse(skneeX, skneeY, mass1*4, mass1*4);
    ellipse(kneeX, kneeY, 4, 4);
    var ankleX = kneeX + (length2)*100*Math.cos(drawTheta4 + drawTheta5);
    var ankleY = kneeY + (length2)*100*Math.sin(drawTheta4 + drawTheta5);
    //lower leg
    line(kneeX, kneeY, ankleX, ankleY);
    //ankle joint
    //ellipse(sankleX, sankleY, mass2*4, mass2*4);
    ellipse(ankleX, ankleY, 4, 4);
    //foot
    var footX = ankleX + length5*100 * Math.cos(drawTheta4 + drawTheta5 - drawTheta6);
    var footY = ankleY + length5*100 * Math.sin(drawTheta4 + drawTheta5 - drawTheta6);
    var heelX = footX - footFraction*length3*100 * Math.sin(drawTheta4 + drawTheta5 - drawTheta6);
    var heelY = footY + footFraction*length3*100 * Math.cos(drawTheta4 + drawTheta5 - drawTheta6);
    var toeX = footX + (1 - footFraction)*length3*100 * Math.sin(drawTheta4 + drawTheta5 - drawTheta6);
    var toeY = footY - (1 - footFraction)*length3*100 * Math.cos(drawTheta4 + drawTheta5 - drawTheta6);
    //line(width/2 + (length4)*100*Math.cos(2*PI - drawTheta4), height/2 + (length4)*100*Math.sin(2*PI - drawTheta4), width/2 + (length4 + length5)*100*Math.cos(2*PI - drawTheta4), height/2 + (length4 + length5)*100*Math.sin(2*PI - drawTheta4));
    line(ankleX, ankleY, footX, footY);
    line(footX, footY, heelX, heelY);
    line(footX, footY, toeX, toeY);

      //show the infor when paused
      if (isPaused == 1) {
        jAng2Label.html('\u0398(2) = ' + round((drawTheta2 - PI/2)*180/PI*100)/100 + ' deg');
        jPos2Label.html('Right (Black) Toe: (' + round((toeX-sheelX)*100)/100 + ', ' + -1*round((toeY-sheelY)*100)/100 + ')');
        jPos21Label.html('Right (Black) Heel: (' + round((heelX-sheelX)*100)/100 + ', ' + -1*round((heelY-sheelY)*100)/100 + ')');
      }
      //calculated theta3 value (global angle)
      
    // Draw Progres Bar
    fill(0, 255, 0);
    stroke(0,155,0);
    // Green
    rect(5, height - 15, (width - 10)*(3*drawIndex/intertheta1V.length), 10);

    // Advance frame
    if (isPaused == 0) drawIndex = drawIndex + 1;

    // Check drawIndex amd loop back to beginning
    if (drawIndex >= intertheta1V.length/3)  {
      var myBool = loopC.checked();
      if (myBool) drawIndex = 0;
      if (!myBool) drawIndex = intertheta1V.length/3 - 1;
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
  len4 = Number(len4Input.value());
  len4Label.html('Length 4: ' + len4 + ' m');
  DoublePenRefer.html('Double Pendulum Reference: https://www.myphysicslab.com/pendulum/double-pendulum-en.html');
  len5 = Number(len5Input.value());
  len5Label.html('Length 5: ' + len5 + ' m');
  mass1 = Number(mass1Input.value());
  mass1Label.html('Mass 1: ' + mass1 + ' kg');
  mass2 = Number(mass2Input.value());
  mass2Label.html('Mass 2: ' + mass2 + ' kg');
  mass3 = Number(mass3Input.value());
  mass3Label.html('Mass 3: ' + mass3 + ' kg');
  mass4 = Number(mass4Input.value());
  mass4Label.html('Mass 4: ' + mass4 + ' kg');
  theta0_1 = Number(theta0_1_Input.value());
  theta0_1_Label.html('Initial \u0398 1: ' + theta0_1 + ' deg');
  theta0_2 = Number(theta0_2_Input.value());
  theta0_2_Label.html('Initial \u0398 2: ' + theta0_2 + ' deg');
  theta0_4 = Number(theta0_4_Input.value());
  theta0_4_Label.html('Initial \u0398 4: ' + theta0_4 + ' deg');
  theta0_5 = Number(theta0_5_Input.value());
  theta0_5_Label.html('Initial \u0398 5: ' + theta0_5 + ' deg');
  thetaDot0_1 = Number(thetaDot0_1_Input.value());
  thetaDot0_1_Label.html('Initial \u0398\u0027 1: ' + thetaDot0_1 + ' deg/s');
  thetaDot0_2 = Number(thetaDot0_2_Input.value());
  thetaDot0_2_Label.html('Initial \u0398\u0027 2: ' + thetaDot0_2 + ' deg/s');
  thetaDot0_4 = Number(thetaDot0_4_Input.value());
  thetaDot0_4_Label.html('Initial \u0398\u0027 4: ' + thetaDot0_4 + ' deg/s');
  thetaDot0_5 = Number(thetaDot0_5_Input.value());
  thetaDot0_5_Label.html('Initial \u0398\u0027 5: ' + thetaDot0_5 + ' deg/s');
  mu_ = Number(mu_Input.value());
  mu_Label.html('KAFO: ' + mu_ + ' Nm/deg');
  k_1 = Number(k_Input.value());
  k_Label.html('KhipSW: ' + k_1 + ' Nm/deg');
  k_2 = Number(k2_Input.value());
  k2_Label.html('KkneeSW: ' + k_2 + ' Nm/deg');
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
    mu_Input.removeAttribute('disabled');
    k_Input.removeAttribute('disabled');
    k2_Input.removeAttribute('disabled');
    len3Input.removeAttribute('disabled');
    mass3Input.removeAttribute('disabled');
    pendState = 3;
  }
  if (pendRadio.value() == 'Swing-Stance') {
    mu_Input.removeAttribute('disabled');
    k_Input.removeAttribute('disabled');
    k2_Input.removeAttribute('disabled');
    /*mu_Input.removeAttribute('disabled');
    len2Input.attribute('disabled', '');
    mass2Input.attribute('disabled', '');
    len3Input.attribute('disabled', '');
    mass3Input.attribute('disabled', '');
    theta0_2_Input.attribute('disabled', '');
    thetaDot0_2_Input.attribute('disabled', '');*/
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
  k2_Input.attribute('disabled', '');
  time_Input.attribute('disabled', '');
  startB.attribute('disabled', '');
  loadB.attribute('disabled', '');
  resetB.removeAttribute('disabled');
  pauseB.removeAttribute('disabled');
  recB.removeAttribute('disabled');

  if(mu_ == 0){
  calculateTheta(time_);
  }else{
  calculateThetaAFO(time_);   
  }

  // Print Min/Max of Motion
  //console.log('Theta 1:');
 /* findMotionData(theta1Array, 1);
  if (pendState == 1) findPeriod(theta1Array);
  if (pendState > 1) {
    //console.log('Theta 2:');
    findMotionData(theta2Array, 2);
  }
  if (pendState >=4) {
    findMotionData(theta4Array, 3);
  }
*/

  drawIndex = 0;
  active = 1;
  pause();
}

function load() {

      var rawFile = new XMLHttpRequest();
      rawFile.open("GET", "IMUDATA.TXT", false);
      rawFile.onreadystatechange = function ()
      {
          if(rawFile.readyState === 4)
          {
              if(rawFile.status === 200 || rawFile.status == 0)
              {
                  var allText = rawFile.responseText;
                  IMUdata = allText.split("\n");
                  //console.log(IMUdata);
              }else{
                alert("Open IMU Data Failed.");
                return;
              }
          }
          else{
            alert("Open IMU Data Failed.");
            return;
          }
      }
      rawFile.send(null);
      for(var i = 0; i<IMUdata.length; i = i +1){
        IMUMatrix[i] = IMUdata[i].split(",");
        for(var j = 0; j<IMUMatrix[i].length;j = j+1){
          IMUMatrix[i][j] = parseFloat(IMUMatrix[i][j]);
        }
      }
      //coloumn 0 time stamp; 1-3 acc; 4-6 orientation (4 for lateral axis rotation)
      
      for(var i = 0; i<IMUMatrix.length; i = i +1){
        ACC[i] = pow(pow(IMUMatrix[i][1],2)+pow(IMUMatrix[i][2],2)+pow(IMUMatrix[i][3],2),0.5);//resultant acc
      }
      StrikeValue = ACC.filter(isStrike);
      for(var i = 0; i<StrikeValue.length; i = i +1){
        if(i == 1)
        StrikeIndexRaw[i] = ACC.indexOf(StrikeValue[i]);
        else
         StrikeIndexRaw[i] = ACC.indexOf(StrikeValue[i],StrikeIndexRaw[i-1]);
      }
      //Find strikes that longer than 0.5 sec
      StrikeIndexnum = 0;
      for(var i = 0; i<StrikeIndexRaw.length-1; i = i +1){
        if (IMUMatrix[StrikeIndexRaw[i+1]][0] - IMUMatrix[StrikeIndexRaw[i]][0]>0.5)
        {
          StrikeIndex[StrikeIndexnum] = StrikeIndexRaw[i];
          StrikeIndexnum = StrikeIndexnum + 1;
        }
      }
      alert("Identified Stride Numbers: " + StrikeIndexnum.toString());
      //use orientation for further phase identification

} 

function isStrike(value) {
  return value >= 15;
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
  k2_Input.removeAttribute('disabled');
  time_Input.removeAttribute('disabled');
  startB.removeAttribute('disabled');
  loadB.removeAttribute('disabled');
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
  jPos21Label.html('');
  drawTimeLabel.html('');

  clearTable();
  enterHeaders();
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
    jPos21Label.html('');
    drawTimeLabel.html('');
    return;
  }
}

/*
//find maximum data value
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
*/


function singlePendAFO_getThetaDoubleDot(myTheta, myThetaDot) {
  return -1 * mu_*180/PI * myTheta*3/pow(len1+len2,2)/(mass1+mass2) - (g/(len1+len2) * Math.sin(myTheta));
  //return  - (g/(len1+len2)) * Math.sin(myTheta);
}
function singlePend_getThetaDoubleDot(myTheta, myThetaDot) {
  return  - (g/(len1+len2)) * Math.sin(myTheta);
}
//www.myphysicslab.com/pendulum/double-pendulum-en.html
function doublePend_getThetaDoubleDot_1(myTheta1, myTheta2, myThetaDot1, myThetaDot2) {
  var num = 9*len1*Math.cos(myTheta1-myTheta2)*(mass2*len1*len2*pow(myThetaDot1,2)*Math.sin(myTheta1-myTheta2)-mass2*len2*g*Math.sin(myTheta2)-2*k_2)+6*len2*(mass2*len1*len2*pow(myThetaDot2,2)*Math.sin(myTheta1-myTheta2)+mass1*len1*g*Math.sin(myTheta1)+2*mass2*len1*g*Math.sin(myTheta1)+2*k_1);
  var den = 4*mass1*pow(len1,2)*len2 + 12*mass2*pow(len1,2)*len2 - 9 * mass2*pow(len1,2)*len2*pow(Math.cos(myTheta1-myTheta2),2);
  return -num / den;
}

function doublePend_getThetaDoubleDot_2 (myTheta1, myTheta2, myThetaDot1, myThetaDot2, myThetaDDot1) {
  var num = 3*mass2*len1*len2*myThetaDDot1*Math.cos(myTheta1-myTheta2)-3*mass2*len1*len2*pow(myThetaDot1,2)*Math.sin(myTheta1-myTheta2)+3*mass2*len2*g*Math.sin(myTheta2)+6*k_2;
  var den = 2*mass2*pow(len2,2);
  return -num / den;
}

function triplePend_getThetaDoubleDot_1(myTheta1, myTheta2, myThetaDot1, myThetaDot2) {
  var len1E = len1/3;
  var len2E = len2/3;
  var len2CE = pow(len1*len1 + len2*len2/4 - len1*len2/2*cos(myTheta1+myTheta2),0.5);
  var num = (-1*g*(2*mass1 + mass2)*Math.sin(myTheta1) - mass2*g*Math.sin(myTheta1 - 2*myTheta2) - 2*Math.sin(myTheta1 - myTheta2)*mass2*(myThetaDot2*myThetaDot2*len2E + myThetaDot1*myThetaDot1*len1E*Math.cos(myTheta1 - myTheta2)));
  var den = len1E*(2*mass1 + mass2 - mass2*Math.cos(2*myTheta1 - 2*myTheta2));
  return num / den - k_1*180/PI*myTheta1/(len1E*len1E*mass1 + len2E*len2E*mass2 + mass2*len2CE*len2CE);
}

function triplePend_getThetaDoubleDot_2 (myTheta1, myTheta2, myThetaDot1, myThetaDot2) {
  var len1E = len1/3;
  var len2E = len2/3
  var num = 2*Math.sin(myTheta1 - myTheta2)*(myThetaDot1*myThetaDot1*len1E*(mass1 + mass2) + g*(mass1 + mass2)*Math.cos(myTheta1) + myThetaDot2*myThetaDot2*len2E*mass2*Math.cos(myTheta1 - myTheta2));
  var den = len2E*(2*mass1 + mass2 - mass2*Math.cos(2*myTheta1 - 2*myTheta2));
  return num / den;
}

function triplePend_getThetaDoubleDot_3 (myTheta1, myTheta2, myThetaDot1, myThetaDot2) {
  return 0;
}

function loadScript( url, callback ) {
  var script = document.createElement( "script" )
  script.type = "text/javascript";
  if(script.readyState) {  // only required for IE <9
    script.onreadystatechange = function() {
      if ( script.readyState === "loaded" || script.readyState === "complete" ) {
        script.onreadystatechange = null;
        callback();
      }
    };
  } else {  //Others
    script.onload = function() {
      callback();
    };
  }

  script.src = url;
  document.getElementsByTagName( "head" )[0].appendChild( script );
}
