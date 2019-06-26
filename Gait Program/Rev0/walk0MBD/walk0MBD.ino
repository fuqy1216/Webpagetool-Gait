// Processing sketch for canvas illustration

int camRadius = 692.8; //(height/2.0) / tan(PI*30.0 / 180.0)
float camAngle = 0;
int camX = 300 + round(camRadius*sin(camAngle)); //width/2.0
int camZ = round(camRadius*cos(camAngle));

void setup() {
  size(600, 800, P3D);
  background(160);
  frameRate(100);
}

void draw() {
background(238, 232, 170);
fill(0);
camera(camX, height/2.0, camZ, width/2.0, height/2.0, 0, 0, 1, 0);
if (myBool) defaultDraw();
if (!myBool) newDraw();
}

void calculateJoints() {
  rightKneeX = round(rightHipX + rightUpperLegLength*Math.cos(angleR1));
  rightKneeY = round(rightHipY - rightUpperLegLength*Math.sin(angleR1));
  rightKneeZ = rightHipZ;
  leftKneeX = round(leftHipX + leftUpperLegLength*Math.cos(angleL1));
  leftKneeY = round(leftHipY - leftUpperLegLength*Math.sin(angleL1));
  leftKneeZ = leftHipZ;
  rightAnkleX = Math.round(rightKneeX + rightLowerLegLength*Math.cos(angleR2));
  rightAnkleY = Math.round(rightKneeY - rightLowerLegLength*Math.sin(angleR2));
  rightAnkleZ = rightKneeZ;
  leftAnkleX = Math.round(leftKneeX + leftLowerLegLength*Math.cos(angleL2));
  leftAnkleY = Math.round(leftKneeY - leftLowerLegLength*Math.sin(angleL2));
  leftAnkleZ = leftKneeZ;
  rightPivotX = Math.round(rightAnkleX + rightAnkleLength*Math.cos(angleR3));
  rightPivotY = Math.round(rightAnkleY - rightAnkleLength*Math.sin(angleR3));
  rightPivotZ = rightAnkleZ;
  leftPivotX = Math.round(leftAnkleX + leftAnkleLength*Math.cos(angleL3));
  leftPivotY = Math.round(leftAnkleY - leftAnkleLength*Math.sin(angleL3));
  leftPivotZ = leftAnkleZ;
  angleR4 = angleR3 - pi/2;
  angleL4 = angleL3 - pi/2;
  rightHeelX = Math.round(rightPivotX + rightHeelLength*Math.cos(angleR4));
  rightHeelY = Math.round(rightPivotY - rightHeelLength*Math.sin(angleR4));
  rightHeelZ = rightPivotZ;
  leftHeelX = Math.round(leftPivotX + leftHeelLength*Math.cos(angleL4));
  leftHeelY = Math.round(leftPivotY - leftHeelLength*Math.sin(angleL4));
  leftHeelZ = leftPivotZ;
  rightBallX = Math.round(rightPivotX - rightFootLength*Math.cos(angleR4));
  rightBallY = Math.round(rightPivotY + rightFootLength*Math.sin(angleR4));
  rightBallZ = rightPivotZ;
  leftBallX = Math.round(leftPivotX - leftFootLength*Math.cos(angleL4));
  leftBallY = Math.round(leftPivotY + leftFootLength*Math.sin(angleL4));
  leftBallZ = leftPivotZ;
  rightToeX = Math.round(rightBallX + rightToeLength*Math.cos(angleR5));
  rightToeY = Math.round(rightBallY - rightToeLength*Math.sin(angleR5));
  rightToez = rightBallZ;
  leftToeX = Math.round(leftBallX + leftToeLength*Math.cos(angleL5));
  leftToeY = Math.round(leftBallY - leftToeLength*Math.sin(angleL5));
  leftToez = leftBallZ;
}

void defaultDraw() {
  // Construct Hips
  stroke(0);
  line(rightHipX, rightHipY - 10, rightHipZ, leftHipX, leftHipY - 10, leftHipZ);
  line(rightHipX, rightHipY - 10, rightHipZ, rightHipX, rightHipY, rightHipZ);
  line(leftHipX, leftHipY - 10, leftHipZ, leftHipX, leftHipY, leftHipZ);

  // Construct Right Leg
  stroke(0, 0, 255);
  line(rightHipX, rightHipY, rightHipZ, rightKneeX, rightKneeY, rightKneeZ);
  line(rightKneeX, rightKneeY, rightKneeZ, rightAnkleX, rightAnkleY, rightAnkleZ);
  line(rightAnkleX, rightAnkleY, rightAnkleZ, rightPivotX, rightPivotY, rightPivotZ);
  line(rightPivotX, rightPivotY, rightPivotZ, rightHeelX, rightHeelY, rightHeelZ);
  line(rightPivotX, rightPivotY, rightPivotZ, rightBallX, rightBallY, rightBallZ);
  line(rightBallX, rightBallY, rightBallZ, rightToeX, rightToeY, rightToez);

  // Constuct Left Leg
  stroke(255, 0, 0);
  line(leftHipX, leftHipY, leftHipZ, leftKneeX, leftKneeY, leftKneeZ);
  line(leftKneeX, leftKneeY, leftKneeZ, leftAnkleX, leftAnkleY, leftAnkleZ);
  line(leftAnkleX, leftAnkleY, leftAnkleZ, leftPivotX, leftPivotY, leftPivotZ);
  line(leftPivotX, leftPivotY, leftPivotZ, leftHeelX, leftHeelY, leftHeelZ);
  line(leftPivotX, leftPivotY, leftPivotZ, leftBallX, leftBallY, leftBallZ);
  line(leftBallX, leftBallY, leftBallZ, leftToeX, leftToeY, leftToez);


  angleR1 = angleR1 + deltaR1;
  angleL1 = angleL1 + deltaL1;
  if (angleR1 > -pi/4 || angleR1 < -5*pi/6) deltaR1 = -deltaR1;
  if (angleL1 > -pi/4 || angleL1 < -5*pi/6) deltaL1 = -deltaL1;
  angleR2 = angleR1 - pi/6;
  angleL2 = angleL1 - pi/6;

  calculateJoints();
}

void newDraw() {

    if (p >= arrayT.length - 1){
     p = 0;
     if (firstLoop == 0) {
      firstLoop = 1;
      ground = lowP;
     }
    }

    angleR1 = arrayR1[p]*pi/180;
    angleR2 = arrayR2[p]*pi/180;
    angleR3 = arrayR3[p]*pi/180;
    angleL1 = arrayL1[p]*pi/180;
    angleL2 = arrayL2[p]*pi/180;
    angleL3 = arrayL3[p]*pi/180;

    pushMatrix();
      stroke(0, 0, 255);
      translate(rightHipX, rightHipY, rightHipZ)
      sphereDetail(10);
      sphere(5);
    popMatrix();

    pushMatrix();
      stroke(255, 0, 0);
      translate(leftHipX, leftHipY, leftHipZ)
      sphereDetail(10);
      sphere(5);
    popMatrix();

    pushMatrix();
      stroke(0, 0, 255);
      translate(rightKneeX, rightKneeY, rightKneeZ)
      sphereDetail(10);
      sphere(5);
    popMatrix();

    pushMatrix();
      stroke(255, 0, 0);
      translate(leftKneeX, leftKneeY, leftKneeZ)
      sphereDetail(10);
      sphere(5);
    popMatrix();

    pushMatrix();
      stroke(0, 0, 255);
      translate(rightAnkleX, rightAnkleY, rightAnkleZ)
      sphereDetail(5);
      sphere(5);
    popMatrix();

    pushMatrix();
      stroke(255, 0, 0);
      translate(leftAnkleX, leftAnkleY, leftAnkleZ)
      sphereDetail(5);
      sphere(5);
    popMatrix();

    pushMatrix();
      stroke(0);
      translate(rightHipX, rightHipY, 0)
      sphereDetail(5);
      sphere(5);
    popMatrix();

    pushMatrix();
      stroke(0);
      translate(rightHipX, rightHipY - torso, 0)
      sphereDetail(5);
      sphere(5);
    popMatrix();

    pushMatrix();   // Right Shoulder
      stroke(0, 0, 255);
      translate(rightHipX, rightHipY - torso, shoulderWidth)
      sphereDetail(5);
      sphere(5);
    popMatrix();

    pushMatrix();   // Left Shoulder
      stroke(255, 0, 0);
      translate(rightHipX, rightHipY - torso, -shoulderWidth)
      sphereDetail(5);
      sphere(5);
    popMatrix();

    calculateJoints();

    if (firstLoop == 0) {
      if (leftPivotY > lowP) lowP = leftPivotY;
      if (rightPivotY > lowP) lowP = rightPivotY;
      if (rightHeelY > lowP) lowP = rightHeelY;
      if (leftHeelY > lowP) lowP = leftHeelY;
      if (rightBallY > lowP) lowP = rightBallY;
      if (leftBallY > lowP) lowP = leftBallY;
      if (rightToeY > lowP) lowP = rightToeY;
      if (leftToeY > lowP) lowP = leftToeY;
    }

    if (firstLoop == 1) {
      lowP = 0;
      if (leftPivotY > lowP) lowP = leftPivotY;
      if (rightPivotY > lowP) lowP = rightPivotY;
      if (rightHeelY > lowP) lowP = rightHeelY;
      if (leftHeelY > lowP) lowP = leftHeelY;
      if (rightBallY > lowP) lowP = rightBallY;
      if (leftBallY > lowP) lowP = leftBallY;
      if (rightToeY > lowP) lowP = rightToeY;
      if (leftToeY > lowP) lowP = leftToeY;
      diff = lowP - ground;
      rightHipY = rightHipY - diff;
      leftHipY = leftHipY - diff;
      calculateJoints();
    }

    pushMatrix();
      noStroke();
      fill(200);
      translate(width/2 - 150, ground, -100);
      rotateX(radians(90));
      rect(0, 0, 300, 200);
    popMatrix();

    // Construct Hips and Torso
    stroke(0);
    line(rightHipX, rightHipY - 10, rightHipZ, leftHipX, leftHipY - 10, leftHipZ);
    line(rightHipX, rightHipY - 10, rightHipZ, rightHipX, rightHipY, rightHipZ);
    line(leftHipX, leftHipY - 10, leftHipZ, leftHipX, leftHipY, leftHipZ);
    line(leftHipX, leftHipY, 0, leftHipX, leftHipY - torso, 0);
    line(leftHipX, leftHipY - torso, -shoulderWidth, leftHipX, leftHipY - torso, shoulderWidth);

    // Construct Right Leg
    stroke(0, 0, 255);
    line(rightHipX, rightHipY, rightHipZ, rightKneeX, rightKneeY, rightKneeZ);
    line(rightKneeX, rightKneeY, rightKneeZ, rightAnkleX, rightAnkleY, rightAnkleZ);
    line(rightAnkleX, rightAnkleY, rightAnkleZ, rightPivotX, rightPivotY, rightPivotZ);
    line(rightPivotX, rightPivotY, rightPivotZ, rightHeelX, rightHeelY, rightHeelZ);
    line(rightPivotX, rightPivotY, rightPivotZ, rightBallX, rightBallY, rightBallZ);
    line(rightBallX, rightBallY, rightBallZ, rightToeX, rightToeY, rightToez);

    // Constuct Left Leg
    stroke(255, 0, 0);
    line(leftHipX, leftHipY, leftHipZ, leftKneeX, leftKneeY, leftKneeZ);
    line(leftKneeX, leftKneeY, leftKneeZ, leftAnkleX, leftAnkleY, leftAnkleZ);
    line(leftAnkleX, leftAnkleY, leftAnkleZ, leftPivotX, leftPivotY, leftPivotZ);
    line(leftPivotX, leftPivotY, leftPivotZ, leftHeelX, leftHeelY, leftHeelZ);
    line(leftPivotX, leftPivotY, leftPivotZ, leftBallX, leftBallY, leftBallZ);
    line(leftBallX, leftBallY, leftBallZ, leftToeX, leftToeY, leftToez);

    if (loopBool == 1) p++;
    if (!loopBool) postTIme();
    postCoords();
}

void adjustCam() {
  camX = 300 + round(camRadius*sin(camAngle)); //width/2.0
  camZ = round(camRadius*cos(camAngle));
}

void keyPressed() {
  if (key == CODED) {
    if (keyCode == UP) {
      camRadius = camRadius - 10;
    } else if (keyCode == DOWN) {
      camRadius = camRadius + 10;
    } else if (keyCode == RIGHT){
      camAngle = camAngle + 0.2;
    } else if (keyCode == LEFT) {
      camAngle = camAngle - 0.2;
    }
  }
  if (key == 'w') { // w = UP
      camRadius = camRadius - 10;
  } else if (key == 's') {
      camRadius = camRadius + 10;
  } else if (key == 'd') {
      camAngle = camAngle + 0.2;
  } else if (key == 'a') {
    camAngle = camAngle - 0.2;
  }
  adjustCam();
}
