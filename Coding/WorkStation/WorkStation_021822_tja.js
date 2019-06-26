//https://p5js.org/reference/
//https://www.myphysicslab.com/index-en.html
//t armstrong & m daley 2/15/19

var alertBool = 0;
var y0=400;
var canv;
var blocx=0;
var blocy=50;
var blocz=0;
var bdelx=50;
var bdely=5;
var bdelz=200;

var benchHtIn;
var benchHtInLabel;
var benchForwardIn;
var benchForwardInLabel;
var benchRightIn;
var benchRtInLabel;

var camRadius;
var camAngle;

var locHd;
var bnchDmsHd;

var benchWdthIn;
var benchWdthInLabel;
var benchDepthIn;
var benchDepthInLabel;
var benchThickIn;
var benchThikcInLabel;

var bx;
var by;
var bz;
var bdelx;
var bdely;
var bdelz;

var scaleFactor;
var scaleFactorLabel;

var Stature;
var StatureLabel;

var HandPosture;
var HandLabel;

var wrkerX;
var wrkerXLabel;
var wrkerY;
var wrkerYLabel;
var wrkerZ;
var wrkerZLabel;

var f0 = 0.152;  //Toe_ankle
var f1 = 0.039;  //Floor_ankle
var f2 = 0.246;  //Ankle_knee
var f3 = 0.245;  //Knee_hip
var f4 = 0.096;  //Hip_cntr
var f5 = 0.288;  //Hip_shoulder
var f6 = 0.129;  //Cntr_shoulder
var f7 = 0.186;  //Shoulder_elbow
var f8 = 0.146;  //Elbow-wrist
var f9 = 0.108;  //wrist_hand
var f10 = 0.182;  //Shoulder-Head

var L0; //Toe_ankle
var L1; //Floor_ankle
var L2; //Ankle_knee
var L3;  // Knee_hip
var L4;  //hip_cntr
var L5;  //Hip_sholulder
var L6;  //Cntr_shoulder
var L7;  //Shoulder_elbow
var L8;  //Elbow-wrist
var L9;  //wrist_hand
var L10;  //Shoulder-Head

var HipHt; //(f1 + f2 + f3) * Stature;
var HipWd;
var ShldHt;
var HdNk;
var ShldWd;
var ArmLn;
var LFtx;
var LFty;
var LFtz;
var LHipx;
var LHipy;
var LHipz;

var RFtx;
var RFty;
var RFtz;
var RHipx;
var RHipy;
var RHipz;
var LShdx;
var LShdz;
var LShdx;
var LShdz;

var Hdz;

var hemi;

function preload() {
  hemi = loadModel('thin_Hemi360.obj');
  //for obj exclusively
  //loadImage for jpg, png
}

function setup() {
  canv=createCanvas(500, 500, WEBGL); //WEBGL -- specifies 3-D canvas
  canv.position(50,y0+250); //specify canvas loc w.r.t. upper left corner of screen
  frameRate(60); //default frame is 60/s unless specified
  camRadius=(500/2.0)/tan(PI*30.0/180.0);
  camAngle=0;

  bnchDmsHd=createDiv("Bench Dimensions");
  bnchDmsHd.position(10,y0);
  locHd=createDiv("Bench Location");
  locHd.position(150,y0);

  WorkerHd=createDiv("Worker Information");
  WorkerHd.position(10,y0+100);

//Bench Width
  benchWdthIn=createInput(); //text box for bench width
  benchWdthIn.position(100,y0+20);
  benchWdthIn.style("width", "30px");
  benchWdthIn.value(200);
  benchWdthInLabel=createDiv("Width:");
  benchWdthInLabel.position(30,benchWdthIn.y);

//Bench Depth
  benchDepthIn=createInput(); //text box for bench width
  benchDepthIn.position(100,y0+40);
  benchDepthIn.style("width", "30px");
  benchDepthIn.value(100);
  benchDepthInLabel=createDiv("Depth:");
  benchDepthInLabel.position(30,benchDepthIn.y);

//Bench Thick
  benchThickIn=createInput(); //text box for bench width
  benchThickIn.position(100,y0+60), //http://www-personal.umich.edu/~tja/WorkStation.html);
  benchThickIn.style("width", "30px");
  benchThickIn.value(5);
  benchThickInLabel=createDiv("Width:");
  benchThickInLabel.position(30,benchThickIn.y);

//Bench Ht
  benchHtIn=createInput(); //text box for bench height
  benchHtIn.position(220,y0+20);
  benchHtIn.style("width", "30px");
  benchHtIn.value(100);
  benchHtInLabel=createDiv("Height:");
  benchHtInLabel.position(160,benchHtIn.y)

//Bench Forward
  benchForwardIn=createInput(); //text box for bench height
  benchForwardIn.position(220,y0+40);
  benchForwardIn.style("width", "30px");
  benchForwardIn.value(60);
  benchForwardInLabel=createDiv("Forward:");
  benchForwardInLabel.position(160,benchForwardIn.y)

//Bench Right
  benchRightIn=createInput(); //text box for bench height
  benchRightIn.position(220,y0+60);
  benchRightIn.style("width", "30px");
  benchRightIn.value(0);
  benchHtRightInLabel=createDiv("Right:");
  benchHtRightInLabel.position(160,benchRightIn.y)

//Worker Stature
  Stature=createInput(); //text box for bench height
  Stature.position(120,y0+120);
  Stature.style("width", "30px");
  Stature.value(150);
  StatureLabel=createDiv("Stature:");
  StatureLabel.position(20,Stature.y)

//Worker location vertical
  wrkerZ=createInput(); //text box for bench height
  wrkerZ.position(120,y0+140);
  wrkerZ.style("width", "30px");
  wrkerZ.value(0);
  wrkerZLabel=createDiv("Loc Vertical:");
  wrkerZLabel.position(20,wrkerZ.y)

//Worker fore/aft
  wrkerY=createInput(); //text box for bench height
  wrkerY.position(120,y0+160);
  wrkerY.style("width", "30px");
  wrkerY.value(-10);
  wrkerYLabel=createDiv("Loc Fore/Aft:");
  wrkerYLabel.position(20,wrkerY.y);

//Worker location right/left
  wrkerX=createInput(); //text box for bench height
  wrkerX.position(120,y0+180);
  wrkerX.style("width", "30px");
  wrkerX.value(0);
  wrkerXLabel=createDiv("Loc Right/Left:");
  wrkerXLabel.position(20,wrkerX.y);

//Scale
  scaleFactor=createInput(); //text box for bench height
  scaleFactor.position(120,y0+200);
  scaleFactor.style("width", "30px");
  scaleFactor.value(1.00);
  scaleFactorLabel=createDiv("Overall scale:");
  scaleFactorLabel.position(20,scaleFactor.y);
}

function draw() {
  background(200);
  camera(camRadius*sin(camAngle),-200,camRadius*cos(camAngle),0,0,0,0,1,0);
  fill(0);
// Show ref axes
  line(0,200*scaleFactor.value(),0,50,200*scaleFactor.value(),0);
  line(0,200*scaleFactor.value(),0,0,150*scaleFactor.value(),0);  //z -- vertical
  line(0,200*scaleFactor.value(),0,0,200*scaleFactor.value(),50);  //x -- side-to-side

  HipHt = (f1 + f2 + f3) * Stature.value()*scaleFactor.value();
  HipWd = f4 * Stature.value()*scaleFactor.value();
  ShldHt = (f1 + f2 + f3 + f5) * Stature.value()*scaleFactor.value();
  ShldWd = f6 * Stature.value()*scaleFactor.value();
  ArmLn=(f7+f8+f9)*Stature.value()*scaleFactor.value();
  HdNk=f10*Stature.value()*scaleFactor.value();

  RFtx=0+f4*Stature.value()*scaleFactor.value();
  RFtz=200*scaleFactor.value();
  RHipx=0+f4*Stature.value()*scaleFactor.value();
  RHipz=200*scaleFactor.value()-1*(f1+f2+f3)*Stature.value()*scaleFactor.value();

  LFtx=0-f4*Stature.value()*scaleFactor.value();
  LFtz=200*scaleFactor.value();
  LHipx=0-f4*Stature.value()*scaleFactor.value();
  LHipz=200*scaleFactor.value()-1*(f1+f2+f3)*Stature.value()*scaleFactor.value();

  LShdx=0-f6*Stature.value()*scaleFactor.value();
  LShdz=200*scaleFactor.value()-(f1 + f2 + f3 + f5) * Stature.value()*scaleFactor.value();
  RShdx=0+f6*Stature.value()*scaleFactor.value();
  RShdz=200*scaleFactor.value()-(f1 + f2 + f3 + f5) * Stature.value()*scaleFactor.value();

  Hdz=200*scaleFactor.value()-Stature.value()*scaleFactor.value();


  line(0,LHipz,LHipx,0,RHipz,RHipx);  //Hips
  line(0,LFtz,LFtx,0,LHipz,LHipx);      //Left leg
  line(0,RFtz,RFtx,0,RHipz,RHipx);   //Right leg
  line(0,LHipz,0,0,LShdz,0);           //Hip_shoulder
  line(0,LShdz,LShdx,0,RShdz,RShdx); //Shoulders
  line(0,RShdz,RShdx,ArmLn,RShdz,RShdx);  //Right Arm
  line(0,LShdz,LShdx,ArmLn,LShdz,LShdx);  // Left Arm
  line(0,LShdz,0,0,Hdz,0); // Head-neck
  //print("Shoulder Height: " + ShldHt + " Head: " + 200);
  // if (alertBool == 0) {
  //   alert("Shoulder Height: " + ShldHt + " Head: " + 200);
  //   alertBool = 1;
  // }

  bx=benchRightIn.value()*scaleFactor.value();
  by=benchForwardIn.value()*scaleFactor.value();
  bz=200*scaleFactor.value()-benchHtIn.value()*scaleFactor.value();
  bdelx=benchWdthIn.value()*scaleFactor.value();
  bdely=benchDepthIn.value()*scaleFactor.value();
  bdelz=benchThickIn.value()*scaleFactor.value();


  fill(100); // color of bench
  push();  //resets loc of 3D object to orgin
    translate(by,bz,bx);
    box(bdely,bdelz,bdelx); //bench
  pop(); //closes translation

// Right Reach
  push();  //resets loc of 3D object to orgin
    translate(0,RShdz,RShdx);
    scale(ArmLn / 50.0);    // scale=ArmLn / 50.0;
    fill(0,255,0,150);//opacity 0-255
    noStroke();  //hides grid that makes up hemisphere
//    rotateY(-PI/2); // rotat hemisphere to align with stick figure
    //sphere(ArmLn); //bench
    model(hemi);
  pop(); //closes translation

// Left Reach
  push();  //resets loc of 3D object to orgin
    translate(0,LShdz,LShdx);
    scale(ArmLn / 50.0);    // scale=ArmLn / 50.0;
    fill(255,0,0,150);//opacity 0-255
    noStroke();  //hides grid that makes up hemisphere
//    rotateY(-PI/2); // rotat hemisphere to align with stick figure
    //sphere(ArmLn); //bench
    model(hemi);
  pop(); //closes translation


    if (keyIsPressed){
      if(keyCode===LEFT_ARROW){
        camAngle=camAngle+.02;
      }
      else if (keyCode===UP_ARROW){
        camRadius=camRadius-10;
      }
    }


  }

  function keyPressed(){
    if(keyCode===LEFT_ARROW){
      camAngle=camAngle+.02;
    }
    else if (keyCode===UP_ARROW){
      camRadius=camRadius-10;
    }
  }
