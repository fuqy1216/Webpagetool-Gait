// Javascript for Walk Animation

var p = 0;        // Variable for incrementing through CSV data
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
var rightHipY = 50;   // Default
var rightHipZ = 50;   // Default
var leftHipX = 300;   // Default
var leftHipY = 50;    // Default
var leftHipZ = -50;   // Default

var rightUpperLegLength = 200;  // Default
var leftUpperLegLength = 200;   // Default

var angleR1 = -60*pi/180;    // Defualt
var angleL1 = -60*pi/180;    // Default

var rightKneeX = Math.round(rightHipX + rightUpperLegLength*Math.cos(angleR1));
var rightKneeY = Math.round(rightHipY - rightUpperLegLength*Math.sin(angleR1));
var rightKneeZ = rightHipZ;

var leftKneeX = Math.round(leftHipX + leftUpperLegLength*Math.cos(angleL1));
var leftKneeY = Math.round(leftHipY - leftUpperLegLength*Math.sin(angleL1));
var leftKneeZ = leftHipZ;

var rightLowerLegLength = 200;
var leftLowerLegLength = 200;

var angleR2 = -pi/2;
var angleL2 = -pi/2;

var rightAnkleX = Math.round(rightKneeX + rightLowerLegLength*Math.cos(angleR2));
var rightAnkleY = Math.round(rightKneeY - rightLowerLegLength*Math.sin(angleR2));
var rightAnkleZ = rightKneeZ;

var leftAnkleX = Math.round(leftKneeX + leftLowerLegLength*Math.cos(angleR2));
var leftAnkleY = Math.round(leftKneeY - leftLowerLegLength*Math.sin(angleR2));
var leftAnkleZ = leftKneeZ;

var rightAnkleLength = 40;
var leftAnkleLength = 40;

var angleR3 = -pi/18;
var angleL3 = pi/18;

var rightPivotX = Math.round(rightAnkleX + rightAnkleLength*Math.cos(angleR3));
var rightPivotY = Math.round(rightAnkleY - rightAnkleLength*Math.sin(angleR3));
var rightPivotZ = rightAnkleZ;

var leftPivotX = Math.round(leftAnkleX + leftAnkleLength*Math.cos(angleL3));
var leftPivotY = Math.round(leftAnkleY - leftAnkleLength*Math.sin(angleL3));
var leftPivotZ = leftAnkleZ;

// Update limb lengths based on user input
function update() {
  rightUpperLegLength = document.getElementById("R1").value;
  leftUpperLegLength = document.getElementById("L1").value;
  rightLowerLegLength = document.getElementById("R2").value;
  leftLowerLegLength = document.getElementById("L2").value;
  rightAnkleLength = document.getElementById("R3").value;
  leftAnkleLength = document.getElementById("L3").value;
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
