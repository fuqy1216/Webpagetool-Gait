// Javascript for Walk Animation

var p = 0;        // Variable for incrementing through CSV data
var loopBool = 1; // Boolean to switch from looping and toggling
var firstLoop = 0;
var lowP = 0;
var diff;
var myBool = 1;   // Switch between default draw and data draw
var arrayT = [];  // Array for time values from CSV
var arrayR1 = []; // Array for Right Hip Angle
var arrayL1 = []; // Array for Left Hip Angle
var arrayR2 = []; // Array for Right Knee Angle
var arrayL2 = []; // Array for Left Knee Angle
var arrayR3 = []; // Array for Right Ankle Angle
var arrayL3 = []; // Array for Left Ankle Angle
var pi = 3.1415926535;
var deltaR1 = pi/180;  // Default
var deltaL1 = pi/180;  // Default
var rightHipX = 300;   // Default
var rightHipY = 300;   // Default
var rightHipZ = 50;   // Default
var leftHipX = 300;   // Default
var leftHipY = 300;    // Default
var leftHipZ = -50;   // Default

var rightUpperLegLength = 198;  // Default
var leftUpperLegLength = 198;   // Default

var angleR1 = -140*pi/180;    // Defualt
var angleL1 = -50*pi/180;    // Default

var rightKneeX = Math.round(rightHipX + rightUpperLegLength*Math.cos(angleR1));
var rightKneeY = Math.round(rightHipY - rightUpperLegLength*Math.sin(angleR1));
var rightKneeZ = rightHipZ;

var leftKneeX = Math.round(leftHipX + leftUpperLegLength*Math.cos(angleL1));
var leftKneeY = Math.round(leftHipY - leftUpperLegLength*Math.sin(angleL1));
var leftKneeZ = leftHipZ;

var rightLowerLegLength = 199;
var leftLowerLegLength = 199;

var angleR2 = -pi/2;
var angleL2 = -pi/2;

var rightAnkleX = Math.round(rightKneeX + rightLowerLegLength*Math.cos(angleR2));
var rightAnkleY = Math.round(rightKneeY - rightLowerLegLength*Math.sin(angleR2));
var rightAnkleZ = rightKneeZ;

var leftAnkleX = Math.round(leftKneeX + leftLowerLegLength*Math.cos(angleR2));
var leftAnkleY = Math.round(leftKneeY - leftLowerLegLength*Math.sin(angleR2));
var leftAnkleZ = leftKneeZ;

var rightAnkleLength = 32;
var leftAnkleLength = 32;

var angleR3 = -pi/2;
var angleL3 = -pi/2;

var rightPivotX = Math.round(rightAnkleX + rightAnkleLength*Math.cos(angleR3));
var rightPivotY = Math.round(rightAnkleY - rightAnkleLength*Math.sin(angleR3));
var rightPivotZ = rightAnkleZ;

var leftPivotX = Math.round(leftAnkleX + leftAnkleLength*Math.cos(angleL3));
var leftPivotY = Math.round(leftAnkleY - leftAnkleLength*Math.sin(angleL3));
var leftPivotZ = leftAnkleZ;

var rightFootLength = 81;
var leftFootLength = 81;
var rightHeelLength = 20;
var leftHeelLength = 20;

var angleR4 = pi/4; // Default
var angleL4 = pi/4; // Default

var rightHeelX = Math.round(rightPivotX + rightHeelLength*Math.cos(angleR4));
var rightHeelY = Math.round(rightPivotY - rightHeelLength*Math.sin(angleR4));
var rightHeelZ = rightPivotZ;

var leftHeelX = Math.round(leftPivotX + leftHeelLength*Math.cos(angleL4));
var leftHeelY = Math.round(leftPivotY - leftHeelLength*Math.sin(angleL4));
var leftHeelZ = leftPivotZ;

var rightBallX = Math.round(rightPivotX - rightFootLength*Math.cos(angleR4));
var rightBallY = Math.round(rightPivotY + rightFootLength*Math.sin(angleR4));
var rightBallZ = rightPivotZ;

var leftBallX = Math.round(leftPivotX - leftFootLength*Math.cos(angleL4));
var leftBallY = Math.round(leftPivotY + leftFootLength*Math.sin(angleL4));
var leftBallZ = leftPivotZ;

var angleR5 = pi/8; // Default
var angleL5 = pi/8; // Default
var rightToeLength = 22;
var leftToeLength = 22;

var rightToeX = Math.round(rightBallX + rightToeLength*Math.cos(angleR5));
var rightToeY = Math.round(rightBallY - rightToeLength*Math.sin(angleR5));
var rightToez = rightBallZ;

var leftToeX = Math.round(leftBallX + leftToeLength*Math.cos(angleL5));
var leftToeY = Math.round(leftBallY - leftToeLength*Math.sin(angleL5));
var leftToez = leftBallZ;

var ground = 300;

var torso = 200;
var shoulderWidth = 100;

// Don't let user pause or increment until data is loaded
document.getElementById("backward").disabled = true;
document.getElementById("pauseButton").disabled = true;
document.getElementById("forward").disabled = true;

// Update limb lengths based on user input
function update() {
  rightUpperLegLength = document.getElementById("R1").value/2;
  leftUpperLegLength = document.getElementById("L1").value/2;
  rightLowerLegLength = document.getElementById("R2").value/2;
  leftLowerLegLength = document.getElementById("L2").value/2;
  rightAnkleLength = document.getElementById("R3").value/2;
  leftAnkleLength = document.getElementById("L3").value/2;
  rightHeelLength = document.getElementById("RHeel").value/2;
  leftHeelLength = document.getElementById("LHeel").value/2;
  rightFootLength = document.getElementById("RFoot").value/2;
  leftFootLength = document.getElementById("LFoot").value/2;
  rightToeLength = document.getElementById("RToe").value/2;
  leftToeLength = document.getElementById("LToe").value/2;
  torso = document.getElementById("SH").value/2 - rightUpperLegLength - rightLowerLegLength - rightAnkleLength;
  shoulderWidth = document.getElementById("SC").value/2;
}

function handleFiles(files) {
  //Check for the various File API support
  if (window.FileReader) {
    // FileReader are supported
    getAsText(files[0]);
  } else {
    alert('FileReader are not supported in this browser');
  }
}

// Read input file
function getAsText(fileToRead) {
  var reader = new FileReader();
  reader.readAsText(fileToRead);
  reader.onload = loadHandler;
  reader.onerror = errorHandler;
}

// Successful read function
function loadHandler(event) {
  var csv = event.target.result;
  processData(csv);
}

// Split CSV text into arrays
function processData(csv) {
  var table = document.getElementById("dataTable");
  var allTextLines = csv.split("\n");  //("/\r\n|\n/")
  //var lines = [];
  for (var i = 0; i < allTextLines.length; i++) {
    var row = table.insertRow(i);
    var data = allTextLines[i].split(",");
    //var cell = [];
    for (var j = 0; j < data.length; j++) {
      if (i > 1) {
        if (j == 0) arrayT.push(Number(data[j]));
        if (j == 1) arrayL1.push(Number(data[j]));
        if (j == 2) arrayL2.push(Number(data[j]));
        if (j == 3) arrayL3.push(Number(data[j]));
        if (j == 4) arrayR1.push(Number(data[j]));
        if (j == 5) arrayR2.push(Number(data[j]));
        if (j == 6) arrayR3.push(Number(data[j]));
      }
      //cell.push(data[j]);
      var myCell = row.insertCell(j);
      myCell.innerHTML = data[j];
    }
    //lines.push(cell);
  }
  localToGlobal();
  myBool = 0;
  document.getElementById("pauseButton").disabled = false;
}

// Convert Local Angles to Global Angles
function localToGlobal() {
  for (var i = 0; i < arrayT.length; i++) {
    arrayR1[i] = -90 + arrayR1[i];
    arrayL1[i] = -90 + arrayL1[i];
    arrayR2[i] = arrayR1[i] - arrayR2[i];
    arrayL2[i] = arrayL1[i] - arrayL2[i];
    arrayR3[i] = arrayR2[i] - arrayR3[i];
    arrayL3[i] = arrayL2[i] - arrayL3[i];
  }
}

function errorHandler(evt) {
  if(evt.target.error.name == "NotReadableError") {
    alert("Cannot read file");
  }
}

function pause() {
  if (loopBool == 1) {
    loopBool = 0;
    document.getElementById("backward").disabled = false;
    document.getElementById("forward").disabled = false;
    document.getElementById("pauseButton").innerHTML = "Resume";
    return;
  }
  if (loopBool == 0) {
    loopBool = 1;
    document.getElementById("backward").disabled = true;
    document.getElementById("forward").disabled = true;
    document.getElementById("pauseButton").innerHTML = "Pause";
    return;
  }
}

function minus1() {
  p = p - 1;
  if (p < 0) p = arrayT.length - 2;
}

function plus1() {
  p = p + 1;
  if (p > arrayT.length) p = 0;
}

function postCoords() {
  document.getElementById("cell1").innerHTML = "(" + rightHipX + "," + rightHipY + ")";
  document.getElementById("cell2").innerHTML = "(" + rightKneeX + "," + rightKneeY + ")";
  document.getElementById("cell3").innerHTML = "(" + rightAnkleX + "," + rightAnkleY + ")";
  document.getElementById("cell4").innerHTML = "(" + rightPivotX + "," + rightPivotY + ")";
  document.getElementById("cell5").innerHTML = "(" + rightToeX + "," + rightToeY + ")";
  document.getElementById("cell6").innerHTML = "(" + leftHipX + "," + leftHipY + ")";
  document.getElementById("cell7").innerHTML = "(" + leftKneeX + "," + leftKneeY + ")";
  document.getElementById("cell8").innerHTML = "(" + leftAnkleX + "," + leftAnkleY + ")";
  document.getElementById("cell9").innerHTML = "(" + leftPivotX + "," + leftPivotY + ")";
  document.getElementById("cell10").innerHTML = "(" + leftToeX + "," + leftToeY + ")";
}

function postTIme() {
  document.getElementById("ti").innerHTML = arrayT[p];
}
