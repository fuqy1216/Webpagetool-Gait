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

var pendState = 4; // Number of Pendulums

//titles
var Title;
var Anthro;
var IMUtitle;
var AFO;
var SwingStance;
var Att1;
var Att2;
var Att3;
var Opttitle;
var Optmuscle;
var Optangle;
//sw st time
var TSW_Input;
var TSW_Label;
var Tsw = 0.4;
var TST_Input;
var TST_Label;
var Tst = 0.8;
// Length of First Pendulum
var len1 = 0.41;
var len1Input;
var len1Label;
// Length of Second Pendulum
var len2 = .4;
var len2Input;
var len2Label;
// Length of Third Pendulum
var len3 = 0.22;
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
var mass4 = 42.8;
var mass4Input;
var mass4Label;
// Initial Angle of Stance Inverted Pendulum
var Stheta0_1 = 52.0;
var Stheta0_1_Input;
var Stheta0_1_Label;
// Initial Angle of Stance Inverted Pendulum
var Stheta0_2 = -15.0;
var Stheta0_2_Input;
var Stheta0_2_Label;
// Initial Angle of Stance Inverted Pendulum
var Stheta0_3 = -15.0;
var Stheta0_3_Input;
var Stheta0_3_Label;
// Initial Angular Velocity of First Pendulum
var SthetaDot0_1 = 550.0;
var SthetaDot0_1_Input;
var SthetaDot0_1_Label;
// Initial Angular Velocity of Second Pendulum
var SthetaDot0_2 = 500.0;
var SthetaDot0_2_Input;
var SthetaDot0_2_Label;
// Initial Angular Velocity of Second Pendulum
var SthetaDot0_3 = 500.0;
var SthetaDot0_3_Input;
var SthetaDot0_3_Label;
// Initial Angle of First Pendulum
var theta0_1 = 14.0;
var theta0_1_Input;
var theta0_1_Label;
// Initial Angle of Second Pendulum
var theta0_2 = 35.0;
var theta0_2_Input;
var theta0_2_Label;
// Initial Angle of Stance Inverted Pendulum
var theta0_4 = -17.0;
var theta0_4_Input;
var theta0_4_Label;
// Initial Angle for DS stance leg
var theta0_5 = 0;
var theta0_5_Input;
var theta0_5_Label;
// Initial Angular Velocity of First Pendulum
var thetaDot0_1 = -150.0;
var thetaDot0_1_Input;
var thetaDot0_1_Label;
// Initial Angular Velocity of Second Pendulum
var thetaDot0_2 = 400.0;
var thetaDot0_2_Input;
var thetaDot0_2_Label;
// Initial Angular Velocity of Second Pendulum
var thetaDot0_3 = 500.0;
var thetaDot0_3_Input;
var thetaDot0_3_Label;
// Initial Angular Velocity of Inverted Pendulum
var thetaDot0_4 = -150.0;
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
var k_1 = 10.0;
var k_Input;
var k_Label;
// K - Coefficient of Spring Constant knee swing
var k_2 = 8.0;
var k2_Input;
var k2_Label;
//DS hip
var k_3 = 20.0;
var k3_Input;
var k3_Label;
// DS KNEE
var k_4 = 20.0;
var k4_Input;
var k4_Label;
// K - Coefficient of Spring Constant hip swing
var k_5 = 10.0;
var k5_Input;
var k5_Label;
// K - Coefficient of Spring Constant knee swing
var k_6 = 8.0;
var k6_Input;
var k6_Label;
//DS hip
var k_7 = 20.0;
var k7_Input;
var k7_Label;
// DS KNEE
var k_8 = 20.0;
var k8_Input;
var k8_Label;
// DS KNEE
var T13 = 120.0;
var T13_Input;
var T13_Label;
// DS KNEE
var T23 = 120.0;
var T23_Input;
var T23_Label;
// Time Interval
var time_ = 3.0;
// Start Button
var startB;
var active;
// Reset Button
var resetB;
var loadB;
// Delta T, minimum time units in second
var deltaT = 0.001;
// Loop Checkbox
var Refervec;
var Errorvec;
var iteration;
var loopC;
var Optimizestep;
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
  myCan.position(30, 880);
  background(220);
  // Radio Button for # of Pendulums
  // Length of First Pendulum
  Title = createDiv('Lumped Parameter Model for Prediction on Gait with AFO by Qianyi (Albert) Fu @ U of M');
  Title.position(10, 0);
  Title.style('font-size', '32px');
  Anthro = createDiv('Anthropometry');
  Anthro.position(10, 50);
  Anthro.style('font-weight', 'bold');
  Anthro.style('font-size', '26px');
  len1Input = createInput();
  len1Input.position(250, Anthro.y+30);
  len1Input.style('width', '70px');
  len1Input.value(len1);
  len1Input.input(updateICs);
  len1Label = createDiv('Upperleg Length L<sub>1</sub> (m):');
  len1Label.position(10, len1Input.y);
  // Length of Second Pendulum
  len2Input = createInput();
  len2Input.position(575, len1Input.y);
  len2Input.value(len2);
  len2Input.style('width', '70px');
  len2Input.input(updateICs);
  len2Label = createDiv('Lowerleg Length L<sub>2</sub> (m):');
  len2Label.position(340, len2Input.y);
  // Length of Third Pendulum
  len3Input = createInput();
  len3Input.position(900, len1Input.y);
  len3Input.value(len3);
  len3Input.style('width', '70px');
  len3Input.input(updateICs);
  len3Label = createDiv('Foot Length L<sub>3</sub>+L<sub>5</sub>+L<sub>6</sub> (m):');
  len3Label.position(670, len3Input.y);
  // Length of Forth Pendulum
   /*  len4Input = createInput();
    len4Input.position(1030, 60);
    len4Input.value(len4);
    len4Input.style('width', '70px');
    len4Input.input(updateICs);
    len4Label = createDiv('N/A: ' + len4 + ' m');
    len4Label.position(880, len4Input.y);   */
    DoublePenRefer = createDiv('Double Pendulum Reference: http://scienceworld.wolfram.com/physics/DoublePendulum.html');
    //DoublePenRefer.href = "https://www.myphysicslab.com/pendulum/double-pendulum-en.html";
    //DoublePenRefer = document.createElement("LINK");
    DoublePenRefer.position(1445, len3Input.y);
  // Length of Ankle Height
    len5Input = createInput();
    len5Input.position(1225, len3Input.y);
    len5Input.value(len5);
    len5Input.style('width', '70px');
    len5Input.input(updateICs);
    len5Label = createDiv('Ankle Height L<sub>4</sub> (m): ');
    len5Label.position(1000, len3Input.y);
   /*  //front stance knee
    theta0_5_Input = createInput();
    theta0_5_Input.position(len5Input.x, len5Input.y + 30);
    theta0_5_Input.style('width', '70px');
    theta0_5_Input.value(theta0_5);
    theta0_5_Input.input(updateICs);
    theta0_5_Label = createDiv('N/A: ' + theta0_5 + ' deg');
    theta0_5_Label.position(len5Label.x, theta0_5_Input.y);
    //fron stance knee speed
    thetaDot0_5_Input = createInput();
    thetaDot0_5_Input.position(theta0_5_Input.x, theta0_5_Input.y + 30);
    thetaDot0_5_Input.style('width', '70px');
    thetaDot0_5_Input.value(thetaDot0_5);
    thetaDot0_5_Input.input(updateICs);
    thetaDot0_5_Label = createDiv('N/A: ' + thetaDot0_5 + ' deg/s')
    thetaDot0_5_Label.position(theta0_5_Label.x, thetaDot0_5_Input.y); */
  // Mass of First Pendulum
  mass1Input = createInput();
  mass1Input.position(len1Input.x, len1Input.y + 30);
  mass1Input.style('width', '70px');
  mass1Input.value(mass1);
  mass1Input.input(updateICs);
  mass1Label = createDiv('Upperleg Mass M<sub>1</sub> (kg): ');
  mass1Label.position(len1Label.x, mass1Input.y);
  // Mass of Second Pendulum
  mass2Input = createInput();
  mass2Input.position(len2Input.x, len2Input.y + 30);
  mass2Input.style('width', '70px');
  mass2Input.value(mass2);
  mass2Input.input(updateICs);
  mass2Label = createDiv('Lowerleg Mass M<sub>2</sub> (kg): ');
  mass2Label.position(len2Label.x, mass2Input.y);
  // Mass of Third Pendulum
  mass3Input = createInput();
  mass3Input.position(len3Input.x, len3Input.y + 30);
  mass3Input.style('width', '70px');
  mass3Input.value(mass3);
  mass3Input.input(updateICs);
  mass3Label = createDiv('Foot Mass M<sub>3</sub> (kg): ');
  mass3Label.position(len3Label.x, mass3Input.y);
    // Mass of Forth Pendulum
    mass4Input = createInput();
    mass4Input.position(len5Input.x, len5Input.y + 30);
    mass4Input.style('width', '70px');
    mass4Input.value(mass4);
    mass4Input.input(updateICs);
    mass4Label = createDiv('Upperbody Mass M (kg): ');
    mass4Label.position(len5Label.x, mass4Input.y);
//
    IMUtitle = createDiv('IMU Information');
    IMUtitle.position(10, mass1Input.y+40);
    IMUtitle.style('font-weight', 'bold');
    IMUtitle.style('font-size', '26px');
//AFO
  AFO = createDiv('AFO stiffness');
  AFO.position(10, IMUtitle.y+40);
  AFO.style('font-weight', 'bold');
  AFO.style('font-style', 'italic');
  AFO.style('font-size', '20px');

  mu_Input = createInput();
  mu_Input.position(mass1Input.x-50, AFO.y+30);
  mu_Input.style('width', '70px');
  mu_Input.value(mu_);
  mu_Input.input(updateICs);
  mu_Label = createDiv('K<sub>AFO</sub> (Nm/deg):');
  mu_Label.position(mass1Label.x, mu_Input.y);

  //Swing and Stance Time
  SwingStance = createDiv('Swing and Stance Time');
  SwingStance.position(mass2Label.x, IMUtitle.y+40);
  SwingStance.style('font-weight', 'bold');
  SwingStance.style('font-style', 'italic');
  SwingStance.style('font-size', '20px');

  TSW_Input = createInput();
  TSW_Input.position(mass2Input.x-100, AFO.y+30);
  TSW_Input.style('width', '70px');
  TSW_Input.value(Tsw);
  TSW_Input.input(updateICs);
  TSW_Label = createDiv('T<sub>SW</sub> (sec): ');
  TSW_Label.position(mass2Label.x, mu_Input.y);

  TST_Input = createInput();
  TST_Input.position(mass3Input.x-200, AFO.y+30);
  TST_Input.style('width', '70px');
  TST_Input.value(Tst);
  TST_Input.input(updateICs);
  TST_Label = createDiv('T<sub>ST</sub> (sec): ');
  TST_Label.position(mass3Label.x-100, mu_Input.y);

 //Att1
 Att1 = createDiv('Angular Information at Initial Toe-off, t<sub>1</sub>');
 Att1.position(10, mu_Input.y+40);
 Att1.style('font-weight', 'bold');
 Att1.style('font-style', 'italic');
 Att1.style('font-size', '20px');

 Stheta0_1_Input = createInput();
 Stheta0_1_Input.position(mass1Input.x, Att1.y + 30);
 Stheta0_1_Input.style('width', '70px');
 Stheta0_1_Input.value(Stheta0_1);
 Stheta0_1_Input.input(updateICs);
 Stheta0_1_Label = createDiv('Shank Flex Angle \u03B8(t<sub>1</sub>) (deg): ');
 Stheta0_1_Label.position(mass1Label.x, Stheta0_1_Input.y);

 SthetaDot0_1_Input = createInput();
 SthetaDot0_1_Input.position(mass2Input.x , Stheta0_1_Input.y);
 SthetaDot0_1_Input.style('width', '70px');
 SthetaDot0_1_Input.value(SthetaDot0_1);
 SthetaDot0_1_Input.input(updateICs);
 SthetaDot0_1_Label = createDiv('Shank Flex Vel \u03C9(t<sub>1</sub>) (deg/s): ')
 SthetaDot0_1_Label.position(mass2Label.x, SthetaDot0_1_Input.y);

 //Att2
 Att2 = createDiv('Angular Information at Heel Strike, t<sub>2</sub>');
 Att2.position(10, Stheta0_1_Input.y+40);
 Att2.style('font-weight', 'bold');
 Att2.style('font-style', 'italic');
 Att2.style('font-size', '20px');

 Stheta0_2_Input = createInput();
 Stheta0_2_Input.position(mass1Input.x, Att2.y + 30);
 Stheta0_2_Input.style('width', '70px');
 Stheta0_2_Input.value(Stheta0_2);
 Stheta0_2_Input.input(updateICs);
 Stheta0_2_Label = createDiv('Shank Flex Angle \u03B8(t<sub>2</sub>) (deg): ');
 Stheta0_2_Label.position(mass1Label.x, Stheta0_2_Input.y);

 SthetaDot0_2_Input = createInput();
 SthetaDot0_2_Input.position(mass2Input.x , Stheta0_2_Input.y);
 SthetaDot0_2_Input.style('width', '70px');
 SthetaDot0_2_Input.value(SthetaDot0_2);
 SthetaDot0_2_Input.input(updateICs);
 SthetaDot0_2_Label = createDiv('Shank Flex Vel \u03C9(t<sub>2</sub>) (deg/s): ')
 SthetaDot0_2_Label.position(mass2Label.x, SthetaDot0_2_Input.y);

 //Att3
 Att3 = createDiv('Angular Information at Ending Toe-off , t<sub>3</sub>');
 Att3.position(10, Stheta0_2_Input.y+40);
 Att3.style('font-weight', 'bold');
 Att3.style('font-style', 'italic');
 Att3.style('font-size', '20px');

 Stheta0_3_Input = createInput();
 Stheta0_3_Input.position(mass1Input.x, Att3.y + 30);
 Stheta0_3_Input.style('width', '70px');
 Stheta0_3_Input.value(Stheta0_3);
 Stheta0_3_Input.input(updateICs);
 Stheta0_3_Label = createDiv('Shank Flex Angle \u03B8(t<sub>3</sub>) (deg): ');
 Stheta0_3_Label.position(mass1Label.x, Stheta0_3_Input.y);

 SthetaDot0_3_Input = createInput();
 SthetaDot0_3_Input.position(mass2Input.x , Stheta0_3_Input.y);
 SthetaDot0_3_Input.style('width', '70px');
 SthetaDot0_3_Input.value(SthetaDot0_3);
 SthetaDot0_3_Input.input(updateICs);
 SthetaDot0_3_Label = createDiv('Shank Flex Vel \u03C9(t<sub>3</sub>) (deg/s): ')
 SthetaDot0_3_Label.position(mass2Label.x, SthetaDot0_3_Input.y);

  //Optimization Result:
  Opttitle = createDiv('Optimization Result');
  Opttitle.position(10, Stheta0_3_Input.y+40);
  Opttitle.style('font-weight', 'bold');
  Opttitle.style('font-size', '26px');
 //Optimization Result:
 Optangle = createDiv('Initial Joint Angles');
 Optangle.position(10, Opttitle.y+40);
 Optangle.style('font-weight', 'bold');
 Optangle.style('font-style', 'italic');
 Optangle.style('font-size', '20px');

// Initial Angle of First Pendulum
theta0_1_Input = createInput();
theta0_1_Input.position(mass1Input.x, Optangle.y + 30);
theta0_1_Input.style('width', '70px');
theta0_1_Input.value(-theta0_1);
theta0_1_Input.input(updateICs);
theta0_1_Label = createDiv('L Hip Angle \u03B8<sub>11</sub>(t<sub>1</sub>) (deg): ');
theta0_1_Label.position(mass1Label.x, theta0_1_Input.y);
// Initial Angle of Second Pendulum
theta0_2_Input = createInput();
theta0_2_Input.position(mass1Input.x, theta0_1_Input.y + 30);
theta0_2_Input.style('width', '70px');
theta0_2_Input.value(theta0_2);
theta0_2_Input.input(updateICs);
theta0_2_Label = createDiv('L Knee Angle \u03B8<sub>12</sub>(t<sub>1</sub>) (deg): ');
theta0_2_Label.position(mass1Label.x, theta0_2_Input.y);
  // Initial Angle of Inverted Pendulum
  theta0_4_Input = createInput();
  theta0_4_Input.position(mass1Input.x, theta0_2_Input.y + 30);
  theta0_4_Input.style('width', '70px');
  theta0_4_Input.value(-Math.round(theta0_4));
  theta0_4_Input.input(updateICs);
  theta0_4_Label = createDiv('R Hip Angle \u03B8<sub>21</sub>(t<sub>1</sub>) (deg): ');
  theta0_4_Label.position(mass1Label.x, theta0_4_Input.y);
// Initial Angular Velocity of First Pendulum
thetaDot0_1_Input = createInput();
thetaDot0_1_Input.position(mass2Input.x, theta0_1_Input.y);
thetaDot0_1_Input.style('width', '70px');
thetaDot0_1_Input.value(-thetaDot0_1);
thetaDot0_1_Input.input(updateICs);
thetaDot0_1_Label = createDiv('L Hip Vel \u03C9<sub>11</sub>(t<sub>1</sub>) (deg/s): ')
thetaDot0_1_Label.position(mass2Label.x, theta0_1_Input.y);
// Initial Angular Velocity of Second Pendulum
thetaDot0_2_Input = createInput();
thetaDot0_2_Input.position(mass2Input.x, theta0_2_Input.y);
thetaDot0_2_Input.style('width', '70px');
thetaDot0_2_Input.value(thetaDot0_2);
thetaDot0_2_Input.input(updateICs);
thetaDot0_2_Label = createDiv('L Knee Vel \u03C9<sub>12</sub>(t<sub>1</sub>) (deg/s): ')
thetaDot0_2_Label.position(mass2Label.x, theta0_2_Input.y);
  // Initial Angular Velocity of Inverted Pendulum
  thetaDot0_4_Input = createInput();
  thetaDot0_4_Input.position(mass2Input.x, theta0_4_Input.y);
  thetaDot0_4_Input.style('width', '70px');
  thetaDot0_4_Input.value(Math.round(thetaDot0_4));
  thetaDot0_4_Input.input(updateICs);
  thetaDot0_4_Label = createDiv('R Hip Vel \u03C9<sub>21</sub>(t<sub>1</sub>) (deg/s): ')
  thetaDot0_4_Label.position(mass2Label.x, theta0_4_Input.y);

//opt muscle
 Optmuscle = createDiv('Muscle Parameters');
 Optmuscle.position(10, theta0_4_Input.y+40);
 Optmuscle.style('font-weight', 'bold');
 Optmuscle.style('font-style', 'italic');
 Optmuscle.style('font-size', '20px');
 // KhipSW
 k_Input = createInput();
 k_Input.position(mass1Input.x, Optmuscle.y + 30);
 k_Input.style('width', '70px');
 k_Input.value(k_1);
 k_Input.input(updateICs);
 k_Label = createDiv('K<sub>11SW</sub> (Nm/deg):');
 k_Label.position(mass1Label.x, k_Input.y);
 //kknee
 k2_Input = createInput();
 k2_Input.position(k_Input.x, k_Input.y + 30);
 k2_Input.style('width', '70px');
 k2_Input.value(k_2);
 k2_Input.input(updateICs);
 k2_Label = createDiv('K<sub>12SW</sub> (Nm/deg): ');
 k2_Label.position(k_Label.x, k2_Input.y);
   // K
   k3_Input = createInput();
   k3_Input.position(mass2Input.x, Optmuscle.y + 30);
   k3_Input.style('width', '70px');
   k3_Input.value(k_3);
   k3_Input.input(updateICs);
   k3_Label = createDiv('K<sub>11DS</sub> (Nm/deg):');
   k3_Label.position(mass2Label.x, k_Input.y);
   //kknee
   k4_Input = createInput();
   k4_Input.position(k3_Input.x, k3_Input.y + 30);
   k4_Input.style('width', '70px');
   k4_Input.value(k_4);
   k4_Input.input(updateICs);
   k4_Label = createDiv('K<sub>12DS</sub> (Nm/deg): ');
   k4_Label.position(mass2Label.x, k4_Input.y);
   //kknee
   T13_Input = createInput();
   T13_Input.position(k4_Input.x, k2_Input.y + 30);
   T13_Input.style('width', '70px');
   T13_Input.value(T13);
   T13_Input.input(updateICs);
   T13_Label = createDiv('T<sub>13DS</sub> (Nm): ');
   T13_Label.position(k4_Label.x, T13_Input.y);

   // KhipSW
 k5_Input = createInput();
 k5_Input.position(mass3Input.x, Optmuscle.y + 30);
 k5_Input.style('width', '70px');
 k5_Input.value(k_5);
 k5_Input.input(updateICs);
 k5_Label = createDiv('K<sub>21SW</sub> (Nm/deg):');
 k5_Label.position(mass3Label.x, k5_Input.y);
 //kknee
 k6_Input = createInput();
 k6_Input.position(k5_Input.x, k5_Input.y + 30);
 k6_Input.style('width', '70px');
 k6_Input.value(k_6);
 k6_Input.input(updateICs);
 k6_Label = createDiv('K<sub>22SW</sub> (Nm/deg): ');
 k6_Label.position(k5_Label.x, k6_Input.y);
   // K
   k7_Input = createInput();
   k7_Input.position(mass4Input.x, Optmuscle.y + 30);
   k7_Input.style('width', '70px');
   k7_Input.value(k_7);
   k7_Input.input(updateICs);
   k7_Label = createDiv('K<sub>21DS</sub> (Nm/deg):');
   k7_Label.position(mass4Label.x, k7_Input.y);
   //kknee
   k8_Input = createInput();
   k8_Input.position(k7_Input.x, k7_Input.y + 30);
   k8_Input.style('width', '70px');
   k8_Input.value(k_8);
   k8_Input.input(updateICs);
   k8_Label = createDiv('K<sub>22DS</sub> (Nm/deg): ');
   k8_Label.position(mass4Label.x, k8_Input.y);
   //kknee
   T23_Input = createInput();
   T23_Input.position(k8_Input.x, k6_Input.y + 30);
   T23_Input.style('width', '70px');
   T23_Input.value(T23);
   T23_Input.input(updateICs);
   T23_Label = createDiv('T<sub>23DS</sub> (Nm): ');
   T23_Label.position(k8_Label.x, T23_Input.y);
  // Start Button
  startB = createButton('Load');
  startB.position(mass2Label.x, Att1.y + 500);
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
  loopC = createCheckbox('Loop Animation', true);
  //loopC.position(myCan.x + myCan.width - 50, myCan.y - 25);
  loopC.position(loadB.x + loadB.width + 210, loadB.y);
  Optimizestep = createCheckbox('Search Feasible Gait (Gradient-based Search)', true);
  Optimizestep.position(loopC.x + 170, loopC.y);
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
    if (drawIndex < 0) drawIndex = drawIndex + intertheta1V.length;
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
    if (drawIndex >= intertheta1V.length) drawIndex = drawIndex - intertheta1V.length;
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
  footFraction = 0.31;
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

  theta0_1_Input.attribute('disabled', '');
  theta0_2_Input.attribute('disabled', '');
  thetaDot0_1_Input.attribute('disabled', '');
  thetaDot0_2_Input.attribute('disabled', '');
  theta0_4_Input.attribute('disabled', '');
  thetaDot0_4_Input.attribute('disabled', '');
  k_Input.attribute('disabled', '');
  k2_Input.attribute('disabled', ''); 
  k3_Input.attribute('disabled', '');
  k4_Input.attribute('disabled', ''); 
  k5_Input.attribute('disabled', '');
  k6_Input.attribute('disabled', ''); 
  k7_Input.attribute('disabled', '');
  k8_Input.attribute('disabled', '');
  T13_Input.attribute('disabled', '');
  T23_Input.attribute('disabled', '');
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
    fill(0,255,0);
    stroke(0,155,0);

    //hip joint
    ellipse(width/2, height/4, 5, 5);
    //two angles
    var theta1 = -Number(theta0_1_Input.value())*PI/180.0 + PI/2;
    var theta2 = Number(theta0_2_Input.value())*PI/180.0;
    var theta4 = -Number(theta0_4_Input.value())*PI/180.0 + PI/2;
    //var theta5 = Number(theta0_5_Input.value())*PI/180.0;
    var theta5 = 0;
    //upper leg
    line(width/2, height/4, width/2 + length1*100*Math.cos(theta1), height/4 + length1*100*Math.sin(theta1));
    //lower leg
    line(width/2 + length1*100*Math.cos(theta1), height/4 + length1*100*Math.sin(theta1), width/2 + length1*100*Math.cos(theta1) + length2*100*Math.cos(theta1 + theta2), height/4 + length1*100*Math.sin(theta1) + length2*100*Math.sin(theta1 + theta2));
    if((mu_ > 0)||(mu_ < 0))
    {
      line(width/2 - 4 + length1*100*Math.cos(theta1), height/4 + length1*100*Math.sin(theta1), width/2 - 4 + length1*100*Math.cos(theta1) + length2*100*Math.cos(theta1 + theta2), height/4 + length1*100*Math.sin(theta1) + length2*100*Math.sin(theta1 + theta2));
       }
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
      if((mu_ > 0)||(mu_ < 0))
      {
        line(width/2 - 4 + length1*100*Math.cos(theta1) + length2*100*Math.cos(theta1 + theta2), height/4 + length1*100*Math.sin(theta1) + length2*100*Math.sin(theta1 + theta2), width/2 - 4 + length1*100*Math.cos(theta1) + (length2+length5)*100*Math.cos(theta1 + theta2), height/4 + length1*100*Math.sin(theta1) + (length2+length5)*100*Math.sin(theta1 + theta2));
        line(width/2 + length1*100*Math.cos(theta1) + (length2+length5)*100*Math.cos(theta1 + theta2), height/4 - 4 + length1*100*Math.sin(theta1) + (length2+length5)*100*Math.sin(theta1 + theta2), width/2 + length1*100*Math.cos(theta1) + (length2+length5)*100*Math.cos(theta1 + theta2) + footFraction*length3*100*Math.cos(theta1 + theta2 + PI/2), height/4 - 4 + length1*100*Math.sin(theta1) + (length2+length5)*100*Math.sin(theta1 + theta2) + footFraction*length3*100*Math.sin(theta1 + theta2 + PI/2));
        line(width/2 + length1*100*Math.cos(theta1) + (length2+length5)*100*Math.cos(theta1 + theta2), height/4 - 4 + length1*100*Math.sin(theta1) + (length2+length5)*100*Math.sin(theta1 + theta2), width/2 + length1*100*Math.cos(theta1) + (length2+length5)*100*Math.cos(theta1 + theta2) + (1 - footFraction)*length3*100*Math.cos(theta1 + theta2 - PI/2), height/4 - 4 + length1*100*Math.sin(theta1) + (length2+length5)*100*Math.sin(theta1 + theta2) + (1 - footFraction)*length3*100*Math.sin(theta1 + theta2 - PI/2));
        }

      fill(0);
      stroke(0);
      //knee joint
     // ellipse(width/2 + (length1)*100*Math.cos(theta4), height/2 + (length1)*100*Math.sin(theta4), mass1*4, mass1*4);
     ellipse(width/2 + (length1)*100*Math.cos(theta4), height/4 + (length1)*100*Math.sin(theta4), 4, 4);

     //stance leg
     line(width/2, height/4, width/2 + (length1)*100*Math.cos(theta4), height/4 + (length1)*100*Math.sin(theta4));
     //stance lowerleg
     line(width/2 + length1*100*Math.cos(theta4), height/4 + length1*100*Math.sin(theta4), width/2 + length1*100*Math.cos(theta4) + length2*100*Math.cos(theta4 + theta5), height/4 + length1*100*Math.sin(theta4) + length2*100*Math.sin(theta4 + theta5));

     //ankle joint
     //ellipse(width/2 + (length4)*100*Math.cos(theta4), height/2 + (length4)*100*Math.sin(theta4), mass2*4, mass2*4);
     ellipse(width/2 + length1*100*Math.cos(theta4) + length2*100*Math.cos(theta4 + theta5), height/4 + length1*100*Math.sin(theta4) + length2*100*Math.sin(theta4 + theta5), 4, 4);

     //foot
     line(width/2 + length1*100*Math.cos(theta4) + length2*100*Math.cos(theta4 + theta5), height/4 + length1*100*Math.sin(theta4) + length2*100*Math.sin(theta4 + theta5), width/2 + length1*100*Math.cos(theta4) + (length2+length5)*100*Math.cos(theta4 + theta5), height/4 + length1*100*Math.sin(theta4) + (length2+length5)*100*Math.sin(theta4 + theta5));
     line(width/2 + length1*100*Math.cos(theta4) + (length2+length5)*100*Math.cos(theta4 + theta5), height/4 + length1*100*Math.sin(theta4) + (length2+length5)*100*Math.sin(theta4 + theta5), width/2 + length1*100*Math.cos(theta4) + (length2+length5)*100*Math.cos(theta4 + theta5) + footFraction*length3*100*Math.cos(theta4 + theta5 + PI/2), height/4 + length1*100*Math.sin(theta4) + (length2+length5)*100*Math.sin(theta4 + theta5) + footFraction*length3*100*Math.sin(theta4 + theta5 + PI/2));
     line(width/2 + length1*100*Math.cos(theta4) + (length2+length5)*100*Math.cos(theta4 + theta5), height/4 + length1*100*Math.sin(theta4) + (length2+length5)*100*Math.sin(theta4 + theta5), width/2 + length1*100*Math.cos(theta4) + (length2+length5)*100*Math.cos(theta4 + theta5) + (1 - footFraction)*length3*100*Math.cos(theta4 + theta5 - PI/2), height/4 + length1*100*Math.sin(theta4) + (length2+length5)*100*Math.sin(theta4 + theta5) + (1 - footFraction)*length3*100*Math.sin(theta4 + theta5 - PI/2));


  }
  //loading interface
  if (active == 1) {
    fill(0);
    stroke(0);
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
   
    
    //calculated theta1 value
   // drawTheta1 = theta1Array[drawIndex] + PI/2;
   fill(0, 255, 0);
   stroke(0,155,0);
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
    if((mu_ > 0)||(mu_ < 0))
    {
      line(kneeX - 4, kneeY, ankleX - 4, ankleY);
    }
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
    if((mu_ > 0)||(mu_ < 0))
    {
      line(ankleX - 4, ankleY, footX - 4,footY);
      line(footX, footY - 4, heelX, heelY - 4);
      line(footX, footY - 4, toeX, toeY - 4);
    }
      //show the infor when paused
      if (isPaused == 1) {
        jAng2Label.html('\u0398(2) = ' + round((drawTheta2 - PI/2)*180/PI*100)/100 + ' deg');
        jPos2Label.html('Right (Black) Toe: (' + round((stoeX-sheelX)*100)/100 + ', ' + -1*round((stoeY-sheelY)*100)/100 + ')');
        jPos21Label.html('Right (Black) Heel: (' + round((sheelX-sheelX)*100)/100 + ', ' + -1*round((sheelY-sheelY)*100)/100 + ')');
      }
      if (isPaused == 1) {
        jAng1Label.html('\u0398(1) = ' + round((drawTheta1 - PI/2)*180/PI*100)/100 + ' deg');
        jPos1Label.html('Left (Green) Toe: (' + round((toeX-sheelX)*100)/100 + ', ' + -1*round((toeY-sheelY)*100)/100 + ')');
        jPos11Label.html('Left (Green) Heel: (' + round((heelX-sheelX)*100)/100 + ', ' + -1*round((heelY-sheelY)*100)/100 + ')');
        drawTimeLabel.html('Time: ' + drawIndex/100 + ' seconds');
      }  
      //calculated theta3 value (global angle)
      
    // Draw Progres Bar
    fill(0, 255, 0);
    stroke(0,155,0);
    // Green

    rect(5, height - 15, (width - 10)*(drawIndex/intertheta1V.length), 10);
    if (drawIndex >= intertheta1V.length)  {
      var myBool = loopC.checked();
      if (myBool) drawIndex = 0;
      if (!myBool) drawIndex = intertheta1V.length - 1;
    }
    // Advance frame
    if (isPaused == 0) drawIndex = drawIndex + 1;

    // Check drawIndex amd loop back to beginning


    var rownum;

/*     console.log('drawIndex:' + drawIndex);
    console.log('length1:' + T1);
    console.log('length2:' + T2); */
    if(drawIndex == 0)
    rownum = 0;
    else if(drawIndex < round(T1 * 0.2))
    rownum = 1;
    else if(drawIndex == round(T1 * 0.2))
    rownum = 2;
    else if((drawIndex > round(T1 * 0.2))&&(drawIndex < round((T1+T2) * 0.2)))
    rownum = 3;
    else if(drawIndex == round((T1+T2) * 0.2))
    rownum = 4;
    else if((drawIndex < round((T1 + T3 + T2) * 0.2))&&(drawIndex > round((T1+T2) * 0.2)))
    rownum = 5;
    else if(drawIndex == round((T1 + T3 + T2) * 0.2))
    rownum = 6;
    else if((drawIndex > round((T1 + T3 + T2) * 0.2))&&(drawIndex< round((T1+T2+T3+T4) * 0.2)))
    rownum = 7;
    else if(drawIndex == round((T1+T2+T3+T4) * 0.2))
    rownum = 8;
    else
    rownum = -1;

    //console.log('rownum:' + rownum);
    UpdateRow(rownum,T1,T2,T3,T4);
  }
}

function updateICs() {
  len1 = Number(len1Input.value());
  len1Label.html('Upperleg Length L<sub>1</sub> (m):');
  len2 = Number(len2Input.value());
  len2Label.html('Lowerleg Length L<sub>2</sub> (m):');
  len3 = Number(len3Input.value());
  len3Label.html('Foot Length L<sub>3</sub> (m):');
  /* len4 = Number(len4Input.value());
  len4Label.html('Length 4: ' + len4 + ' m'); */
  DoublePenRefer.html('Double Pendulum Reference: https://www.myphysicslab.com/pendulum/double-pendulum-en.html');
  len5 = Number(len5Input.value());
  len5Label.html('Ankle Height L<sub>4</sub> (m):');
  mass1 = Number(mass1Input.value());
  mass1Label.html('Upperleg Mass M<sub>1</sub> (kg): ');
  mass2 = Number(mass2Input.value());
  mass2Label.html('Lowerleg Mass M<sub>2</sub> (kg): ');
  mass3 = Number(mass3Input.value());
  mass3Label.html('Foot Mass M<sub>3</sub> (kg): ');
  mass4 = Number(mass4Input.value());
  mass4Label.html('Upperbody Mass M<sub></sub> (kg): ');
  theta0_1 = -Number(theta0_1_Input.value());
  theta0_1_Label.html('L Hip Angle \u03B8 <sub>21</sub> (deg): ');
  theta0_2 = Number(theta0_2_Input.value());
  theta0_2_Label.html('L Knee Angle \u03B8 <sub>22</sub> (deg): ');
  theta0_4 = -Number(theta0_4_Input.value());
  theta0_4_Label.html('R Hip Angle \u03B8 <sub>11</sub> (deg): ');
/*   theta0_5 = Number(theta0_5_Input.value());
  theta0_5_Label.html('Initial \u0398 5: ' + theta0_5 + ' deg'); */
  thetaDot0_1 = -Number(thetaDot0_1_Input.value());
  thetaDot0_1_Label.html('L Hip Vel \u03C9<sub>21</sub> (deg/s): ');
  thetaDot0_2 = Number(thetaDot0_2_Input.value());
  thetaDot0_2_Label.html('L Knee Vel \u03C9<sub>22</sub> (deg/s): ');
  thetaDot0_4 = Number(thetaDot0_4_Input.value());
  thetaDot0_4_Label.html('R Hip Vel \u03C9<sub>11</sub> (deg/s): ');
/*   thetaDot0_5 = Number(thetaDot0_5_Input.value());
  thetaDot0_5_Label.html('Initial \u0398\u0027 5: ' + thetaDot0_5 + ' deg/s'); */
  mu_ = Number(mu_Input.value());
  mu_Label.html('K<sub>AFO</sub> (Nm/deg):');
  Tsw = Number(TSW_Input.value());
  TSW_Label.html('T<sub>SW</sub> (sec): ');
  Tst = Number(TST_Input.value());
  TST_Label.html('T<sub>ST</sub> (sec): ');

  k_1 = Number(k_Input.value());
  k_Label.html('K<sub>11SW</sub> (Nm/deg):');
  k_2 = Number(k2_Input.value());
  k2_Label.html('K<sub>12SW</sub> (Nm/deg):');
  k_3 = Number(k3_Input.value());
  k3_Label.html('K<sub>11DS</sub> (Nm/deg):');
  k_4 = Number(k4_Input.value());
  k4_Label.html('K<sub>12DS</sub> (Nm/deg):');
  k_5 = Number(k5_Input.value());
  k5_Label.html('K<sub>21SW</sub> (Nm/deg):');
  k_6 = Number(k6_Input.value());
  k6_Label.html('K<sub>22SW</sub> (Nm/deg):');
  k_7 = Number(k7_Input.value());
  k7_Label.html('K<sub>21DS</sub> (Nm/deg):');
  k_8 = Number(k8_Input.value());
  k8_Label.html('K<sub>22DS</sub> (Nm/deg):');

  T13 = Number(T13_Input.value());
  T13_Label.html('T<sub>13DS</sub> (Nm): ');
  T23 = Number(T23_Input.value());
  T23_Label.html('T<sub>23DS</sub> (Nm): ');

  Stheta0_1 = -Number(Stheta0_1_Input.value());
  Stheta0_1_Label.html('Shank Flex Angle \u03B8(t<sub>1</sub>) (deg): ');
  Stheta0_2 = Number(Stheta0_2_Input.value());
  Stheta0_2_Label.html('Shank Flex Angle \u03B8(t<sub>2</sub>) (deg): ');
  Stheta0_3 = -Number(Stheta0_3_Input.value());
  Stheta0_3_Label.html('Shank Flex Angle \u03B8(t<sub>3</sub>) (deg): ');
/*   theta0_5 = Number(theta0_5_Input.value());
  theta0_5_Label.html('Initial \u0398 5: ' + theta0_5 + ' deg'); */
  SthetaDot0_1 = -Number(SthetaDot0_1_Input.value());
  SthetaDot0_1_Label.html('Shank Flex Vel \u03C9(t<sub>1</sub>) (deg/s): ');
  SthetaDot0_2 = Number(SthetaDot0_2_Input.value());
  SthetaDot0_2_Label.html('Shank Flex Vel \u03C9(t<sub>2</sub>) (deg/s): ');
  SthetaDot0_3 = Number(SthetaDot0_3_Input.value());
  SthetaDot0_3_Label.html('Shank Flex Vel \u03C9(t<sub>3</sub>) (deg/s): ');
}

function start() {
  len1Input.attribute('disabled', '');
  len2Input.attribute('disabled', '');
  len3Input.attribute('disabled', '');
  len5Input.attribute('disabled', '');
  mass1Input.attribute('disabled', '');
  mass2Input.attribute('disabled', '');
  mass3Input.attribute('disabled', '');
  mass4Input.attribute('disabled', '');
  Stheta0_1_Input.attribute('disabled', '');
  Stheta0_2_Input.attribute('disabled', '');
  SthetaDot0_1_Input.attribute('disabled', '');
  SthetaDot0_2_Input.attribute('disabled', '');
  Stheta0_3_Input.attribute('disabled', '');
  SthetaDot0_3_Input.attribute('disabled', '');
  TSW_Input.attribute('disabled', '');
  TST_Input.attribute('disabled', '');
  mu_Input.attribute('disabled', '');
  startB.attribute('disabled', '');
  loadB.attribute('disabled', '');
  resetB.removeAttribute('disabled');
  pauseB.removeAttribute('disabled');
  recB.removeAttribute('disabled');
//add loop to search for optimal solution
//Errorvec = [theta1, theta2, theta4, dtheta1, dtheta2, dtheta4]

Refervec = [];
Errorvec = 999;
if(Optimizestep.checked())
{ 
  alert("This SW optimization process may take up to several minutes. Please wait.");
  var StartT = Date.now();
  iterationSW = 0;

  iteration = 0;
  var CalculatedT = StepsearchSW();
  if((Errorvec == 999)||(CheckNaNSW(CalculatedT)))
  alert("No feaible solution, please try other initial input.");
  else{
  var EndT = Date.now();
  var Time = EndT-StartT;
  alert("Optimal input found. \nIterations: "+ iteration+1 +"\nProcess Time: "+round(Time/1000)+" sec"+"\nError:"+Errorvec);
  }
  var TimeReport;
  TimeReport = calculateSW();   
  alert("Predicted SW Time"+ TimeReport);
}
else{
  calculateThetaAFO(time_,true);   
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
  len1Input.removeAttribute('disabled');
  len2Input.removeAttribute('disabled');
  len3Input.removeAttribute('disabled');
  len5Input.removeAttribute('disabled');
  mass1Input.removeAttribute('disabled');
  mass2Input.removeAttribute('disabled');
  mass3Input.removeAttribute('disabled');
  mass4Input.removeAttribute('disabled');
  Stheta0_1_Input.removeAttribute('disabled');
  Stheta0_2_Input.removeAttribute('disabled');
  SthetaDot0_1_Input.removeAttribute('disabled');
  SthetaDot0_2_Input.removeAttribute('disabled');
  Stheta0_3_Input.removeAttribute('disabled');
  SthetaDot0_3_Input.removeAttribute('disabled');
  TSW_Input.removeAttribute('disabled');
  TST_Input.removeAttribute('disabled');
  mu_Input.removeAttribute('disabled');
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
function doublePend_getThetaDoubleDot_1(myTheta1, myTheta2, myThetaDot1, myThetaDot2, khip, kknee) {
  var num = 9*len1*Math.cos(myTheta1-myTheta2)*(mass2*len1*len2*pow(myThetaDot1,2)*Math.sin(myTheta1-myTheta2)-mass2*len2*g*Math.sin(myTheta2)-2*kknee)+6*len2*(mass2*len1*len2*pow(myThetaDot2,2)*Math.sin(myTheta1-myTheta2)+mass1*len1*g*Math.sin(myTheta1)+2*mass2*len1*g*Math.sin(myTheta1)+2*khip);
  var den = 4*mass1*pow(len1,2)*len2 + 12*mass2*pow(len1,2)*len2 - 9 * mass2*pow(len1,2)*len2*pow(Math.cos(myTheta1-myTheta2),2);
  return -num / den;
}

function doublePend_getThetaDoubleDot_2 (myTheta1, myTheta2, myThetaDot1, myThetaDot2, myThetaDDot1, kknee) {
  var num = 3*mass2*len1*len2*myThetaDDot1*Math.cos(myTheta1-myTheta2)-3*mass2*len1*len2*pow(myThetaDot1,2)*Math.sin(myTheta1-myTheta2)+3*mass2*len2*g*Math.sin(myTheta2)+6*kknee;
  var den = 2*mass2*pow(len2,2);
  return -num / den;
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

function Stepsearch(){
  var anglesteplength = 2;
  var speedsteplength = 50;
  var errorlist = [];//theta0_1, theta0_4, thetaDot0_1, thetaDot0_2, thetaDot0_$
  //calculate theta
  BETA = findfronthip(len1,len2,len3,len5,footFraction,theta0_1,Stheta0_1,thetaDot0_1,SthetaDot0_1);
  theta0_2 = Stheta0_1-theta0_1;
  theta0_4 = BETA[0];
  thetaDot0_2 = SthetaDot0_1-thetaDot0_1;
  thetaDot0_4 = BETA[1];
  try{
      calculateThetaAFO(time_,false);   
      res = pow(pow(Realdiffhip1,2)+pow(Realdiffhip2,2)+pow(Realdiffknee,2),0.5)/3;
  }
  catch(err)
    {
      console.error(err);
      res = 999;
    }
  if(res <= Errorvec)
  {
  Refervec =  [theta0_1,theta0_2, theta0_4, thetaDot0_1,thetaDot0_2,thetaDot0_4];
  Errorvec = res;
  //alert("New error is: "+Errorvec);
  }
  //theta0_1
  theta0_1 = theta0_1 + anglesteplength;
  Updateinit();
  try{
      calculateThetaAFO(time_,false);   
  if(CheckNaN())
  errorlist[0] = 999;
  else
  errorlist[0] = pow(pow(Realdiffhip1,2)+pow(Realdiffhip2,2)+pow(Realdiffknee,2),0.5)/3;
  }
  catch(err)
  {
    console.error(err);
    errorlist[0] = 999;
  }
  theta0_1 = theta0_1 - 2*anglesteplength;
  Updateinit();
  try{
      calculateThetaAFO(time_,false);   
    if(CheckNaN())
    errorlist[1] = 999;
    else
    errorlist[1] = pow(pow(Realdiffhip1,2)+pow(Realdiffhip2,2)+pow(Realdiffknee,2),0.5)/3;
    }
    catch(err)
    {
      console.error(err);
      errorlist[1] = 999;
    }
  theta0_1 = theta0_1 + anglesteplength;
  //theta0_4
  theta0_4 = theta0_4 + anglesteplength;
  Updateinit();
  try{
      calculateThetaAFO(time_,false);   
    if(CheckNaN())
    errorlist[2] = 999;
    else
    errorlist[2] = pow(pow(Realdiffhip1,2)+pow(Realdiffhip2,2)+pow(Realdiffknee,2),0.5)/3;
    }
    catch(err)
    {
      console.error(err);
      errorlist[2] = 999;
    }
  theta0_4 = theta0_4 - 2*anglesteplength;
  Updateinit();
  try{
      calculateThetaAFO(time_,false);   
    if(CheckNaN())
    errorlist[3] = 999;
    else
    errorlist[3] = pow(pow(Realdiffhip1,2)+pow(Realdiffhip2,2)+pow(Realdiffknee,2),0.5)/3;
    }
    catch(err)
    {
      console.error(err);
      errorlist[3] = 999;
    }
  theta0_4 = theta0_4 + anglesteplength;
  //thetaDot0_1
  thetaDot0_1 = thetaDot0_1 + speedsteplength;
  Updateinit();
  try{
      calculateThetaAFO(time_,false);   
    if(CheckNaN())
    errorlist[4] = 999;
    else
    errorlist[4] = pow(pow(Realdiffhip1,2)+pow(Realdiffhip2,2)+pow(Realdiffknee,2),0.5)/3;
    }
    catch(err)
    {
      console.error(err);
      errorlist[4] = 999;
    }
  thetaDot0_1 = thetaDot0_1 - 2*speedsteplength;
  Updateinit();
  try{
      calculateThetaAFO(time_,false);   
    if(CheckNaN())
    errorlist[5] = 999;
    else
    errorlist[5] = pow(pow(Realdiffhip1,2)+pow(Realdiffhip2,2)+pow(Realdiffknee,2),0.5)/3;
    }
    catch(err)
    {
      console.error(err);
      errorlist[5] = 999;
    }
  thetaDot0_1= thetaDot0_1 + speedsteplength;
  //thetaDot0_2
  thetaDot0_2 = thetaDot0_2 + speedsteplength;
  Updateinit();
  try{
      calculateThetaAFO(time_,false);   
    if(CheckNaN())
    errorlist[6] = 999;
    else
    errorlist[6] = pow(pow(Realdiffhip1,2)+pow(Realdiffhip2,2)+pow(Realdiffknee,2),0.5)/3;
    }
    catch(err)
    {
      console.error(err);
      errorlist[6] = 999;
    }
  thetaDot0_2 = thetaDot0_2 - 2*speedsteplength;
  Updateinit();
  try{
      calculateThetaAFO(time_,false);   
    if(CheckNaN())
    errorlist[7] = 999;
    else
    errorlist[7] = pow(pow(Realdiffhip1,2)+pow(Realdiffhip2,2)+pow(Realdiffknee,2),0.5)/3;
    }
    catch(err)
    {
      console.error(err);
      errorlist[7] = 999;
    }
  thetaDot0_2= thetaDot0_2 + speedsteplength;
  //thetaDot0_4
  thetaDot0_4 = thetaDot0_4 + speedsteplength;
  Updateinit();
  try{
      calculateThetaAFO(time_,false);   
    if(CheckNaN())
    errorlist[8] = 999;
    else
    errorlist[8] = pow(pow(Realdiffhip1,2)+pow(Realdiffhip2,2)+pow(Realdiffknee,2),0.5)/3;
    }
    catch(err)
    {
      console.error(err);
      errorlist[8] = 999;
    }
  thetaDot0_4 = thetaDot0_4 - 2*speedsteplength;
  Updateinit();
  try{
      calculateThetaAFO(time_,false);   
    if(CheckNaN())
    errorlist[9] = 999;
    else
    errorlist[9] = pow(pow(Realdiffhip1,2)+pow(Realdiffhip2,2)+pow(Realdiffknee,2),0.5)/3;
    }
    catch(err)
    {
      console.error(err);
      errorlist[9] = 999;
    }
  thetaDot0_4= thetaDot0_4 + speedsteplength;  
  Updateinit();
  if(min(errorlist) >= Errorvec)
  {
    return;
  }
  else{
    var index = errorlist.indexOf(min(errorlist));
    if( index == 0)
    {
      theta0_1 = theta0_1 + anglesteplength;
    }
    else if(index == 1)
    {
      theta0_1 = theta0_1 - anglesteplength;
    }
    else if( index == 2)
    {
      theta0_4 = theta0_4 + anglesteplength;
    }
    else if(index == 3)
    {
      theta0_4 = theta0_4 - anglesteplength;
    }
    else if( index == 4)
    {
      thetaDot0_1 = thetaDot0_1 + speedsteplength;
    }
    else if(index == 5)
    {
      thetaDot0_1 = thetaDot0_1 - speedsteplength;
    }
    else if( index == 6)
    {
      thetaDot0_2 = thetaDot0_2 + speedsteplength;
    }
    else if(index == 7)
    {
      thetaDot0_2 = thetaDot0_2 - speedsteplength;
    }
    else if( index == 8)
    {
      thetaDot0_4 = thetaDot0_4 + speedsteplength;
    }
    else if(index == 9)
    {
      thetaDot0_4 = thetaDot0_4 - speedsteplength;
    }
    Updateinit();
    iteration = iteration + 1;
    Stepsearch();
  }
}

function Updateinit(){
  theta0_2 = round(180/PI*acos(((len1+len2+len5)*cos(-theta0_4/180*PI)+len3*footFraction*sin(-theta0_4/180*PI)-0.1-len3*(1-footFraction)*sin(1.5*theta0_1/180*PI)-len1*cos(theta0_1/180*PI))/(len2+len5)))-theta0_1;
  theta0_1_Input.value(-theta0_1);
  theta0_2_Input.value(theta0_2);
  theta0_4_Input.value(-theta0_4);
  thetaDot0_1_Input.value(-thetaDot0_1);
  thetaDot0_2_Input.value(thetaDot0_2);
  thetaDot0_4_Input.value(thetaDot0_4);
}

function UpdateinitSW(){
  BETA = findfronthip(len1,len2,len3,len5,footFraction,theta0_1,Stheta0_1,thetaDot0_1,SthetaDot0_1);
  theta0_2 = Stheta0_1-theta0_1;
  theta0_4 = BETA[0];
  thetaDot0_2 = SthetaDot0_1-thetaDot0_1;
  thetaDot0_4 = BETA[1];
  theta0_1_Input.value(-theta0_1);
  theta0_2_Input.value(theta0_2);
  theta0_4_Input.value(-Math.round(theta0_4));
  thetaDot0_1_Input.value(-thetaDot0_1);
  thetaDot0_2_Input.value(thetaDot0_2);
  thetaDot0_4_Input.value(Math.round(thetaDot0_4));
  k_Input.value(k_1);
  k2_Input.value(k_2);
}

function CheckNaN(){
  if((ifnan(intertheta1V))||(ifnan(intertheta2V))||(ifnan(intertheta3V))||(ifnan(intertheta4V))||(ifnan(intertheta5V))||(ifnan(intertheta6V)))
  {
    return true;
  }
  else 
  return false;
}
function CheckNaNSW(T){
  if(T > 1.5)
  {
    return true;
  }
  else 
  return false;
}

function ifnan(vector){
for(i=0;i<vector.length;i++)
{
  if(Number.isNaN(vector[i]))
  {
   // alert("index: "+i);
  return true;
  }
}
return false;
}

function findfronthip(len1,len2,len3,len5,footFraction,alpha,theta,Dalpha,Dtheta){
  var beta = [];
  beta[0] = 180/PI*acos((len1*cos(alpha/180*PI)+len2*cos(theta/180*PI)+len5*cos(theta/180*PI+10/180*PI)+(1-footFraction)*len3*sin(theta/180*PI+10/180*PI)-len5)/(len1+len2));
  beta[1] = 180/PI*(Dalpha/180*PI*len1*sin(alpha/180*PI)+Dtheta/180*PI*len2*sin(theta/180*PI)+Dtheta/180*PI*len5*sin(theta/180*PI+10/180*PI)-Dtheta/180*PI*(1-footFraction)*len3*cos(theta/180*PI+10/180*PI))/((len1+len2)*sin(beta[0]/180*PI));
return beta;
}

function StepsearchSW(){
  var anglesteplength = 2;
  var speedsteplength = 10;
  var musclesteplength = 0.5;
  var errorlist = [];//theta0_1, theta0_4, thetaDot0_1, thetaDot0_2, thetaDot0_$
  var CalculatedT;
  //calculate theta
  UpdateinitSW();
  try{
      CalculatedT = calculateSW();   
      res = abs(CalculatedT - Tsw);
  }
  catch(err)
    {
      console.error(err);
      res = 999;
    }
  if(res <= Errorvec)
  {
  Refervec =  [theta0_1,theta0_2, theta0_4, thetaDot0_1,thetaDot0_2,thetaDot0_4];
  Errorvec = res;
  //alert("New error is: "+Errorvec);
  }
  //theta0_1
  theta0_1 = theta0_1 + anglesteplength;
  UpdateinitSW();
  try{
    CalculatedT = calculateSW();   
    
  if(CheckNaNSW(CalculatedT))
  errorlist[0] = 999;
  else
  errorlist[0] = abs(CalculatedT - Tsw);
  }
  catch(err)
  {
    console.error(err);
    errorlist[0] = 999;
  }
  theta0_1 = theta0_1 - 2*anglesteplength;
  UpdateinitSW();
  try{
    CalculatedT = calculateSW();   
    if(CheckNaNSW(CalculatedT))
    errorlist[1] = 999;
    else
    errorlist[1] = abs(CalculatedT - Tsw);
    }
    catch(err)
    {
      console.error(err);
      errorlist[1] = 999;
    }
  theta0_1 = theta0_1 + anglesteplength;
  //thetaDot0_1
  thetaDot0_1 = thetaDot0_1 + speedsteplength;
  UpdateinitSW();
  try{
    CalculatedT = calculateSW();   
    if(CheckNaNSW(CalculatedT))
    errorlist[2] = 999;
    else
    errorlist[2] = abs(CalculatedT - Tsw);
    }
    catch(err)
    {
      console.error(err);
      errorlist[2] = 999;
    }
  thetaDot0_1 = thetaDot0_1 - 2*speedsteplength;
  UpdateinitSW();
  try{
    CalculatedT = calculateSW();   
    if(CheckNaNSW(CalculatedT))
    errorlist[3] = 999;
    else
    errorlist[3] = abs(CalculatedT - Tsw);
    }
    catch(err)
    {
      console.error(err);
      errorlist[3] = 999;
    }
  thetaDot0_1= thetaDot0_1 + speedsteplength;
  //KneeSWMuscle
  k_2 = k_2 + musclesteplength;
  UpdateinitSW();
  try{
    CalculatedT = calculateSW();   
    if(CheckNaNSW(CalculatedT))
    errorlist[4] = 999;
    else
    errorlist[4] = abs(CalculatedT - Tsw);
    }
    catch(err)
    {
      console.error(err);
      errorlist[4] = 999;
    }
    k_2 = k_2 - 2 * musclesteplength;
  UpdateinitSW();
  try{
    CalculatedT = calculateSW();   
    if(CheckNaNSW(CalculatedT))
    errorlist[5] = 999;
    else
    errorlist[5] = abs(CalculatedT - Tsw);
    }
    catch(err)
    {
      console.error(err);
      errorlist[5] = 999;
    }
    k_2 = k_2 + musclesteplength;
  //thetaDot0_4
  k_1 = k_1 + musclesteplength;
  UpdateinitSW();
  try{
    CalculatedT = calculateSW();    
    if(CheckNaNSW(CalculatedT))
    errorlist[6] = 999;
    else
    errorlist[6] = abs(CalculatedT - Tsw);
    }
    catch(err)
    {
      console.error(err);
      errorlist[6] = 999;
    }
    k_1 = k_1 - 2 * musclesteplength;
  UpdateinitSW();
  try{
    CalculatedT = calculateSW();   
    if(CheckNaNSW(CalculatedT))
    errorlist[7] = 999;
    else
    errorlist[7] = abs(CalculatedT - Tsw);
    }
    catch(err)
    {
      console.error(err);
      errorlist[7] = 999;
    }
    k_1 = k_1 + musclesteplength;
  UpdateinitSW();
  if(min(errorlist) >= Errorvec)
  {
    return;
  }
  else{
    var index = errorlist.indexOf(min(errorlist));
    if( index == 0)
    {
      theta0_1 = theta0_1 + anglesteplength;
    }
    else if(index == 1)
    {
      theta0_1 = theta0_1 - anglesteplength;
    }
    else if( index == 2)
    {
      thetaDot0_1 = thetaDot0_1 + speedsteplength;
    }
    else if(index == 3)
    {
      thetaDot0_1 = thetaDot0_1 - speedsteplength;
    }
    else if( index == 4)
    {
      k_2 = k_2 + musclesteplength;
    }
    else if(index == 5)
    {
      k_2 = k_2 - musclesteplength;
    }
    else if( index == 6)
    {
      k_ = k_ + musclesteplength;
    }
    else if(index == 7)
    {
      k_ = k_ - musclesteplength;
    }
    UpdateinitSW();
    iteration = iteration + 1;
    StepsearchSW();
    return CalculatedT
  }
}