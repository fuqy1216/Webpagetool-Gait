//https://p5js.org/reference/
//https://www.myphysicslab.com/index-en.html
//t armstrong & m daley 2/15/19

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

var Stature=150;
var StatureLabel;

var HandPosture;
var HandLabel;

var wrkerX;
var wrkerXLabel;
var wrkerY;
var wrkerYLabel;
var wrkerZ;
var wrkerZLabel;

var f_fl_hip=0.530;
var f_cntr_hip=0.096
var f_hip_shld=0.288;
var f_shld_head=0.188;
var f_cntr_shld=0.129;
var f_arm=0.188;
var f_forearm=0.145;
var f_hand=0.108;

var fl_hip=0.530*Stature;
var cntr_hip=0.096*Stature;
var hip_shld=0.288*Stature;
var shld_head=0.188*Stature;
var cntr_shld=0.129*Stature;
var arm=0.188*Stature;
var forearm=0.145*Stature;
var hand=0.108*Stature;

function setup() {
  canv=createCanvas(500, 500, WEBGL); //WEBGL -- specifies 3-D canvas
  canv.position(50,210); //specify canvas loc w.r.t. upper left corner of screen
  frameRate(60); //default frame is 60/s unless specified
  camRadius=(500/2.0)/tan(PI*30.0/180.0);
  camAngle=0;

  bnchDmsHd=createDiv("Bench Dimensions");
  bnchDmsHd.position(10,0);
  locHd=createDiv("Bench Location");
  locHd.position(150,0);

  WorkerHd=createDiv("Worker Information");
  WorkerHd.position(10,100);

//Bench Width
  benchWdthIn=createInput(); //text box for bench width
  benchWdthIn.position(100,20);
  benchWdthIn.style("width", "30px");
  benchWdthIn.value(200);
  benchWdthInLabel=createDiv("Width:");
  benchWdthInLabel.position(30,benchWdthIn.y);

//Bench Depth
  benchDepthIn=createInput(); //text box for bench width
  benchDepthIn.position(100,40);
  benchDepthIn.style("width", "30px");
  benchDepthIn.value(100);
  benchDepthInLabel=createDiv("Depth:");
  benchDepthInLabel.position(30,benchDepthIn.y);

//Bench Thick
  benchThickIn=createInput(); //text box for bench width
  benchThickIn.position(100,60);
  benchThickIn.style("width", "30px");
  benchThickIn.value(5);
  benchThickInLabel=createDiv("Width:");
  benchThickInLabel.position(30,benchThickIn.y);

//Bench Ht
  benchHtIn=createInput(); //text box for bench height
  benchHtIn.position(220,20);
  benchHtIn.style("width", "30px");
  benchHtIn.value(100);
  benchHtInLabel=createDiv("Height:");
  benchHtInLabel.position(160,benchHtIn.y)

//Bench Forward
  benchForwardIn=createInput(); //text box for bench height
  benchForwardIn.position(220,40);
  benchForwardIn.style("width", "30px");
  benchForwardIn.value(50);
  benchForwardInLabel=createDiv("Forward:");
  benchForwardInLabel.position(160,benchForwardIn.y)

//Bench Right
  benchRightIn=createInput(); //text box for bench height
  benchRightIn.position(220,60);
  benchRightIn.style("width", "30px");
  benchRightIn.value(0);
  benchHtRightInLabel=createDiv("Height:");
  benchHtRightInLabel.position(160,benchRightIn.y)

//Worker Stature
  Stature=createInput(); //text box for bench height
  Stature.position(120,120);
  Stature.style("width", "30px");
  Stature.value(150);
  StatureLabel=createDiv("Stature:");
  StatureLabel.position(20,Stature.y)

//Worker location vertical
  wrkerZ=createInput(); //text box for bench height
  wrkerZ.position(120,140);
  wrkerZ.style("width", "30px");
  wrkerZ.value(0);
  wrkerZLabel=createDiv("Loc Vertical:");
  wrkerZLabel.position(20,wrkerZ.y)

//Worker fore/aft
  wrkerY=createInput(); //text box for bench height
  wrkerY.position(120,160);
  wrkerY.style("width", "30px");
  wrkerY.value(0);
  wrkerYLabel=createDiv("Loc Fore/Aft:");
  wrkerYLabel.position(20,wrkerY.y);

//Worker location right/left
  wrkerX=createInput(); //text box for bench height
  wrkerX.position(120,180);
  wrkerX.style("width", "30px");
  wrkerX.value(0);
  wrkerXLabel=createDiv("Loc Right/Left:");
  wrkerXLabel.position(20,wrkerX.y);
}

function draw() {
  background(200);
  camera(camRadius*sin(camAngle),-200,camRadius*cos(camAngle),0,0,0,0,1,0);
  fill(0);
// create ref axes
  line(0,200,0,50,200,0);
  line(0,200,0,0,150,0);  //z -- vertical
  line(0,200,0,0,200,50);
  fill(100);
  push();  //resets loc of 3D object to orgin
    translate(benchForwardIn.value(),-benchHtIn.value()+200,benchRightIn.value());
    box(benchDepthIn.value(),benchThickIn.value(),benchWdthIn.value()); //bench
//    line(0,200,0,0,200-stature*0.818,0);
//    line(0,200-stature*0.818,0,stature*0.129);
  pop(); //closes translation
  if (keyIsPressed){
    if(keyCode===LEFT_ARROW){
      camAngle=camAngle+.02;
    }
    else if (keyCode===UP_ARROW){
      camRadius=camRadius-10;
    }
  }
  // if (mouseIsPressed) {
  //   fill(0);
  // } else {
  //   fill(255,0, 0);
  // }
//  ellipse(mouseX, mouseY, 80, 80);
}

function keyPressed(){
  if(keyCode===LEFT_ARROW){
    camAngle=camAngle+.02;
  }
  else if (keyCode===UP_ARROW){
    camRadius=camRadius-10;
  }
}
