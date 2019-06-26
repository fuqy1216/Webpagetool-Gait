
function startTable(aMax, tMax, aMin, tMin, n) {
  var myTable = document.getElementById('dataTable');
  var myRow = myTable.insertRow(-1);
  var myCellValue = "\u0398" + n + ": " + aMax + "&#64;" + tMax + "; " + aMin + '@' + tMin + '';
  var myCell = myRow.insertCell(0);
  myCell = myRow.insertCell(1);
  myCell = myRow.insertCell(2);
  myCell = myRow.insertCell(3);
  myCell = myRow.insertCell(4);
  myCell.innerHTML = myCellValue;
}

function enterHeaders() {
  var myTable = document.getElementById('dataTable');
  var myRow = myTable.insertRow(-1);
  var myCell = myRow.insertCell(0);
  myCell.innerHTML = "Time (s)";
  myCell = myRow.insertCell(1);
  myCell.innerHTML = "\u03981 (deg)";
  myCell = myRow.insertCell(2);
  myCell.innerHTML = "\u03982 (deg)";
  myCell = myRow.insertCell(3);
  myCell.innerHTML = "\u03983 (deg)";
  myCell = myRow.insertCell(4);
  myCell.innerHTML = "Comment";
}

function clearTable() {
  var myTable = document.getElementById('dataTable');
  myTable.innerHTML = "";
}


function enterRow() {
  var myTable = document.getElementById('dataTable');
  var myRow = myTable.insertRow(-1);
  var myCellValue = round(drawIndex*deltaT*1000)/1000;
  var myCell = myRow.insertCell(0);
  myCell.innerHTML = myCellValue;
  myCellValue = round((drawTheta1 - PI/2)*180/PI*100)/100;
  myCell = myRow.insertCell(1);
  myCell.innerHTML =  myCellValue;
  if (pendState > 1) {
    myCellValue = round((drawTheta2 - PI/2)*180/PI*100)/100;
    myCell = myRow.insertCell(2);
    myCell.innerHTML = myCellValue;
  }
  if (pendState > 2) {
    myCellValue = round((drawTheta3 - PI/2)*180/PI*100)/100;
    myCell = myRow.insertCell(3);
    myCell.innerHTML = myCellValue;
  }
  myCellValue = annInput.value();
  myCell = myRow.insertCell(pendState + 1);
  myCell.innerHTML = myCellValue;

  onRowClick("dataTable", function (row) {
    var value = row.getElementsByTagName("td")[0].innerHTML;
    drawIndex = round(value/deltaT);
  });
}

function onRowClick(tableId, callback) {
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
