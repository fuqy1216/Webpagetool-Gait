// Processing sketch for canvas illustration

void setup() {
  size(600, 600, P3D);
  background(160);
  frameRate(100);
}

void draw() {
background(238, 232, 170);
fill(0);
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
}

void defaultDraw() {
  // Construct Hips
  stroke(0);
  line(rightHipX, rightHipY - 10, rightHipZ, leftHipX, leftHipY - 10, leftHipZ);
  line(rightHipX, rightHipY - 10, rightHipZ, rightHipX, rightHipY, rightHipZ);
  line(leftHipX, leftHipY - 10, leftHipZ, leftHipX, leftHipY, leftHipZ);
  // Construct Right Leg
  stroke(255, 0, 0);
  line(rightHipX, rightHipY, rightHipZ, rightKneeX, rightKneeY, rightKneeZ);
  line(rightKneeX, rightKneeY, rightKneeZ, rightAnkleX, rightAnkleY, rightAnkleZ);
  line(rightAnkleX, rightAnkleY, rightAnkleZ, rightPivotX, rightPivotY, rightPivotZ);
  // Constuct Left Leg
  stroke(0, 0, 255);
  line(leftHipX, leftHipY, leftHipZ, leftKneeX, leftKneeY, leftKneeZ);
  line(leftKneeX, leftKneeY, leftKneeZ, leftAnkleX, leftAnkleY, leftAnkleZ);
  line(leftAnkleX, leftAnkleY, leftAnkleZ, leftPivotX, leftPivotY, leftPivotZ);


  angleR1 = angleR1 + deltaR1;
  angleL1 = angleL1 + deltaL1;
  if (angleR1 > -pi/4 || angleR1 < -5*pi/6) deltaR1 = -deltaR1;
  if (angleL1 > -pi/4 || angleL1 < -5*pi/6) deltaL1 = -deltaL1;
  angleR2 = angleR1 - pi/6;
  angleL2 = angleL1 - pi/6;

  calculateJoints();
}

void newDraw() {

    if (p > arrayT.length) p = 0;

    angleR1 = arrayR1[p]*pi/180;
    angleR2 = arrayR2[p]*pi/180;
    angleR3 = arrayR3[p]*pi/180;
    angleL1 = arrayL1[p]*pi/180;
    angleL2 = arrayL2[p]*pi/180;
    angleL3 = arrayL3[p]*pi/180;

    calculateJoints();

    stroke(0);
    // alert(leftKneeY);
    // alert(leftAnkleY);
    line(rightHipX, rightHipY - 10, rightHipZ, leftHipX, leftHipY - 10, leftHipZ);
    line(rightHipX, rightHipY - 10, rightHipZ, rightHipX, rightHipY, rightHipZ);
    line(leftHipX, leftHipY - 10, leftHipZ, leftHipX, leftHipY, leftHipZ);

    stroke(255, 0, 0);
    line(rightHipX, rightHipY, rightHipZ, rightKneeX, rightKneeY, rightKneeZ);
    line(rightKneeX, rightKneeY, rightKneeZ, rightAnkleX, rightAnkleY, rightAnkleZ);
    line(rightAnkleX, rightAnkleY, rightAnkleZ, rightPivotX, rightPivotY, rightPivotZ);
    stroke(0, 0, 255);
    line(leftHipX, leftHipY, leftHipZ, leftKneeX, leftKneeY, leftKneeZ);
    line(leftKneeX, leftKneeY, leftKneeZ, leftAnkleX, leftAnkleY, leftAnkleZ);
    line(leftAnkleX, leftAnkleY, leftAnkleZ, leftPivotX, leftPivotY, leftPivotZ);

    p++;
}
