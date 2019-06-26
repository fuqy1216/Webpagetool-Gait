
function loadMyVideo() {
  var URL = window.URL || window.webkitURL;
  var video = document.getElementById("movie");
  var fileItem = document.getElementById("vidInput");
  var files = fileItem.files;
  var file = files.item(0);
  var url = URL.createObjectURL(file);
  video.src = url;
  video.load();
  video.onloadeddata = function() {
    video.play();
    video.loop = true;
    document.getElementById("pauseButton").disabled = false;
    document.getElementById("myTime").disabled = false;
    document.getElementById("myAnn").disabled = false;
    document.getElementById("recordButton").disabled = false;
    document.getElementById("screenshotButton").disabled = false;

    printVideoInfo();
  }
}

function showCoords(e) {
  var checkInput = document.getElementById('showCoordsCheck');
  var showCs = checkInput.checked;
  if (showCs) {
    var x = event.offsetX;
    var y = event.offsetY;
    var coor = "X: " + x + ", Y: " + y;
    document.getElementById('mouseCoords').innerHTML = coor;
  }
}

function pauseButtonF() {
  var video = document.getElementById("movie");
  var str = document.getElementById("pauseButton").innerHTML;
  if (str == "Pause") {
    var myTime = video.currentTime;
    document.getElementById("myTime").value = myTime;
    video.pause();
    document.getElementById("pauseButton").innerHTML = "Resume";
  } else {
    video.play();
    document.getElementById("pauseButton").innerHTML = "Pause";
  }
}

function recT() {
  var video = document.getElementById("movie");
  var myTime = video.currentTime;
  document.getElementById("myTime").value = myTime;

  var myTable = document.getElementById('dataTable');
  var myRow = myTable.insertRow(-1);
  //var myCellValue = document.getElementById('txtWrkTime').value;
  var myCell = myRow.insertCell(0);
  myCell.innerHTML = myTime;
  myCellValue = document.getElementById('myAnn').value;
  myCell = myRow.insertCell(1);
  myCell.innerHTML = myCellValue;

  onRowClick("dataTable", function (row) {   // adds click listener to each row -- row is an input
    var recTime = row.getElementsByTagName("td")[0].innerHTML;
    var recAnn = row.getElementsByTagName("td")[1].innerHTML;
    // console.log("recTime>>", recTime);
    // console.log("Row: " +  row.rowIndex);
    document.getElementById('myTime').value = recTime;
    document.getElementById('myAnn').value = recAnn;
    video.currentTime = recTime;
  });
}

function onRowClick(tableId, callback) { // works for any table
  var table = document.getElementById(tableId);
  var rows = table.getElementsByTagName("tr");
  var i;
  for (i = 0; i < rows.length; i++) {
    table.rows[i].onclick = function (row) {
      return function () {
        callback(row);
      }
    } (table.rows[i]);
  }
}

function takeScreenshot() {
  var video = document.getElementById("movie");
  var myCan = document.getElementById("c1");
  var ctx = myCan.getContext('2d');
  // Scale Factor
  var scaleFactor;
  if (video.videoWidth > video.videoHeight) scaleFactor = myCan.width/video.videoWidth;
  if (video.videoHeight >= video.videoWidth) scaleFactor = myCan.height/video.videoHeight;
  ctx.drawImage(video, 0, 0, scaleFactor*video.videoWidth, scaleFactor*video.videoHeight);
  // Retrieve Pixel Array (Ref: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/getImageData)
  var pixelData = ctx.getImageData(0, 0, scaleFactor*video.videoWidth, scaleFactor*video.videoHeight);
  console.log(pixelData);
}

function printVideoInfo() {
  var video = document.getElementById("movie");
  console.log("Video Native Width: " + video.videoWidth);
  console.log("Video Native Height: " + video.videoHeight);
  console.log("Duration: " + video.duration + " seconds");
}
