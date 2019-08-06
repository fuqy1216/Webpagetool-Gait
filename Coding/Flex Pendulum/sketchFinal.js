loadScript('leg-solver.js', function() {
  //alert('script ready!'); 
});
// Canvas
var myCan;

// G
var g = 9.8;

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
// Initial Angular Velocity of First Pendulum
var thetaDot0_1 = -170.0;
var thetaDot0_1_Input;
var thetaDot0_1_Label;
// Initial Angular Velocity of Second Pendulum
var thetaDot0_2 = 120.0;
var thetaDot0_2_Input;
var thetaDot0_2_Label;
// Initial Angular Velocity of Inverted Pendulum
var thetaDot0_4 = -95.0;
var thetaDot0_4_Input;
var thetaDot0_4_Label;
// Mu - Coefficient of Viscous Damping
var mu_ = 0.1;
var mu_Input;
var mu_Label;
// K - Coefficient of Spring Constant
var k_ = 10.0;
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
  // Length of Ankle Height
    len5Input = createInput();
    len5Input.position(1030, len4Input.y + 30);
    len5Input.value(len5);
    len5Input.style('width', '70px');
    len5Input.input(updateICs);
    len5Label = createDiv('Length 5: ' + len5 + ' m');
    len5Label.position(880, len4Input.y + 30);
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
    mass4Input.position(len5Input.x, len5Input.y + 30);
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
    drawIndex = drawIndex + 1000*add;
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


  // Joint Angle // Position Labels
  jAng1Label = createDiv();
  jAng1Label.position(pauseB.x, pauseB.y + pauseB.height + 10);
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


}


function draw() {
  Ratio = 2;
  var length1 = len1 * Ratio;
  var length2 = len2 * Ratio;
  var length3 = len3 * Ratio;
  var length4 = len4 * Ratio;
  var length5 = len5 * Ratio;

  background(220);
  //pre-load interface
  if (active == 0) {
    fill(0);
    //hip joint
    ellipse(width/2, height/2, 5, 5);
    //two angles
    var theta1 = Number(theta0_1_Input.value())*PI/180.0 + PI/2;
    var theta2 = Number(theta0_2_Input.value())*PI/180.0 + PI/2;
    var theta4 = Number(theta0_4_Input.value())*PI/180.0 + PI/2;
    //upper leg
    line(width/2, height/2, width/2 + length1*100*Math.cos(theta1), height/2 + length1*100*Math.sin(theta1));
    //lower leg
    line(width/2 + length1*100*Math.cos(theta1), height/2 + length1*100*Math.sin(theta1), width/2 + length1*100*Math.cos(theta1) + length2*100*Math.cos(theta2), height/2 + length1*100*Math.sin(theta1) + length2*100*Math.sin(theta2));
    //knee
   // ellipse(width/2 + length1*100*Math.cos(theta1), height/2 + length1*100*Math.sin(theta1), mass1*4, mass1*4);
    ellipse(width/2 + length1*100*Math.cos(theta1), height/2 + length1*100*Math.sin(theta1), 4, 4);
    //ankle joint
    //ellipse(width/2 + length1*100*Math.cos(theta1) + length2*100*Math.cos(theta2), height/2 + length1*100*Math.sin(theta1) + length2*100*Math.sin(theta2), mass2*4, mass2*4);
    ellipse(width/2 + length1*100*Math.cos(theta1) + length2*100*Math.cos(theta2), height/2 + length1*100*Math.sin(theta1) + length2*100*Math.sin(theta2), 4, 4);
    
      //foot link
      line(width/2 + length1*100*Math.cos(theta1) + length2*100*Math.cos(theta2), height/2 + length1*100*Math.sin(theta1) + length2*100*Math.sin(theta2), width/2 + length1*100*Math.cos(theta1) + (length2+length5)*100*Math.cos(theta2), height/2 + length1*100*Math.sin(theta1) + (length2+length5)*100*Math.sin(theta2));
      line(width/2 + length1*100*Math.cos(theta1) + (length2+length5)*100*Math.cos(theta2), height/2 + length1*100*Math.sin(theta1) + (length2+length5)*100*Math.sin(theta2), width/2 + length1*100*Math.cos(theta1) + (length2+length5)*100*Math.cos(theta2) + footFraction*length3*100*Math.cos(theta2 + PI/2), height/2 + length1*100*Math.sin(theta1) + (length2+length5)*100*Math.sin(theta2) + footFraction*length3*100*Math.sin(theta2 + PI/2));
      line(width/2 + length1*100*Math.cos(theta1) + (length2+length5)*100*Math.cos(theta2), height/2 + length1*100*Math.sin(theta1) + (length2+length5)*100*Math.sin(theta2), width/2 + length1*100*Math.cos(theta1) + (length2+length5)*100*Math.cos(theta2) + (1 - footFraction)*length3*100*Math.cos(theta2 - PI/2), height/2 + length1*100*Math.sin(theta1) + (length2+length5)*100*Math.sin(theta2) + (1 - footFraction)*length3*100*Math.sin(theta2 - PI/2));

      //knee joint
     // ellipse(width/2 + (length1)*100*Math.cos(theta4), height/2 + (length1)*100*Math.sin(theta4), mass1*4, mass1*4);
      ellipse(width/2 + (length1)*100*Math.cos(theta4), height/2 + (length1)*100*Math.sin(theta4), 4, 4);

      //stance leg
      line(width/2, height/2, width/2 + (length4)*100*Math.cos(theta4), height/2 + (length4)*100*Math.sin(theta4));
      //ankle joint
      //ellipse(width/2 + (length4)*100*Math.cos(theta4), height/2 + (length4)*100*Math.sin(theta4), mass2*4, mass2*4);
      ellipse(width/2 + (length4)*100*Math.cos(theta4), height/2 + (length4)*100*Math.sin(theta4), 4, 4);

      //foot
      line(width/2 + (length4)*100*Math.cos(theta4), height/2 + (length4)*100*Math.sin(theta4), width/2 + (length4)*100*Math.cos(theta4), height/2 + (length4)*100*Math.sin(theta4) + length5*100);
      line(width/2 + (length4)*100*Math.cos(theta4), height/2 + (length4)*100*Math.sin(theta4) + length5*100, width/2 + (length4)*100*Math.cos(theta4) - footFraction*length3*100, height/2 + (length4)*100*Math.sin(theta4) + length5*100);
      line(width/2 + (length4)*100*Math.cos(theta4), height/2 + (length4)*100*Math.sin(theta4) + length5*100, width/2 + (length4)*100*Math.cos(theta4) + (1 - footFraction)*length3*100, height/2 + (length4)*100*Math.sin(theta4) + length5*100);
    
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
      var skneeY = height/2 + (length1)*100*Math.sin(drawTheta3);
      //upper leg
      line(width/2, height/2, skneeX, skneeY);
      //knee joint
      //ellipse(skneeX, skneeY, mass1*4, mass1*4);
    ellipse(skneeX, skneeY, 4, 4);
    var sankleX = skneeX + (length2)*100*Math.cos(drawTheta3 + drawTheta2);
    var sankleY = skneeY + (length2)*100*Math.sin(drawTheta3 + drawTheta2);
    //lower leg
    line(skneeX, skneeY, sankleX, sankleY);
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
      //show the angle and joint location
      if (isPaused == 1) {
        jAng1Label.html('\u0398(1) = ' + round((drawTheta1 - PI/2)*180/PI*100)/100 + ' deg');
        jPos1Label.html('Stance Toe: (' + round((stoeX-sheelX)*100)/100 + ', ' + -1*round((stoeY-sheelY)*100)/100 + ')');
        jPos11Label.html('Stance Heel: (' + round((sheelX-sheelX)*100)/100 + ', ' + -1*round((sheelY-sheelY)*100)/100 + ')');
        drawTimeLabel.html('Time: ' + drawIndex/1000 + ' seconds');
      }  
    
    //calculated theta1 value
   // drawTheta1 = theta1Array[drawIndex] + PI/2;
    stroke(0)
    fill(0);
    //upper leg
    var kneeX = width/2 + (length1)*100*Math.cos(drawTheta4);
      var kneeY = height/2 + (length1)*100*Math.sin(drawTheta4);
      //upper leg
      line(width/2, height/2, kneeX, kneeY);
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
        jPos2Label.html('Swing Toe: (' + round((toeX-sheelX)*100)/100 + ', ' + -1*round((toeY-sheelY)*100)/100 + ')');
        jPos21Label.html('Swing Heel: (' + round((heelX-sheelX)*100)/100 + ', ' + -1*round((heelY-sheelY)*100)/100 + ')');
      }
      //calculated theta3 value (global angle)
      
      
    

    // Draw Progres Bar
    fill(0, 255, 0);  // Green
    rect(5, height - 15, (width - 10)*(drawIndex/intertheta1.length), 10);

    // Advance frame
    if (isPaused == 0) drawIndex = drawIndex + 10;

    // Check drawIndex amd loop back to beginning
    if (drawIndex >= intertheta1.length)  {
      var myBool = loopC.checked();
      if (myBool) drawIndex = 0;
      if (!myBool) drawIndex = intertheta1.length - 1;
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
  thetaDot0_1 = Number(thetaDot0_1_Input.value());
  thetaDot0_1_Label.html('Initial \u0398\u0027 1: ' + thetaDot0_1 + ' deg/s');
  thetaDot0_2 = Number(thetaDot0_2_Input.value());
  thetaDot0_2_Label.html('Initial \u0398\u0027 2: ' + thetaDot0_2 + ' deg/s');
  thetaDot0_4 = Number(thetaDot0_4_Input.value());
  thetaDot0_4_Label.html('Initial \u0398\u0027 4: ' + thetaDot0_4 + ' deg/s');
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
  if (pendRadio.value() == 'Swing-Stance') {
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
  time_Input.attribute('disabled', '');
  startB.attribute('disabled', '');
  resetB.removeAttribute('disabled');
  pauseB.removeAttribute('disabled');
  recB.removeAttribute('disabled');

  calculateTheta(time_);


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
  jPos21Label.html('');
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
