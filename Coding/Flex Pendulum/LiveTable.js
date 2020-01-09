
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
  myTable.style.borderStyle = "solid";
  var myRow = myTable.insertRow(0);
  var myCell = myRow.insertCell(-1);
  myCell.innerHTML = "Phase Order";
  myCell = myRow.insertCell(-1);
  myCell.innerHTML = "Left Side (Green)";
  myCell = myRow.insertCell(-1);
  myCell = myRow.insertCell(-1);
  myCell.innerHTML = "Right Side";
  myCell = myRow.insertCell(-1);
  myCell.innerHTML = "Duration (s)";
  myRow.setAttribute("align", "center");
  myRow.style.fontWeight = "900";

  myRow = myTable.insertRow(-1);
  myCell = myRow.insertCell(-1);
  myCell.innerHTML = "1";
  myCell = myRow.insertCell(-1);
  myCell.innerHTML = "Single Stance";
  myCell = myRow.insertCell(-1);
  myCell = myRow.insertCell(-1);
  myCell.innerHTML = "Swing";
  myCell = myRow.insertCell(-1);
  myRow.setAttribute("align", "center");

  myRow = myTable.insertRow(-1);
  myCell = myRow.insertCell(-1);
  myCell.innerHTML = "-";
  myCell = myRow.insertCell(-1);
  myCell = myRow.insertCell(-1);
  myCell = myRow.insertCell(-1);
  myCell.innerHTML = "Heel Strike";
  myCell.style.fontStyle = "italic";
  myCell = myRow.insertCell(-1);
  myRow.setAttribute("align", "center");

  myRow = myTable.insertRow(-1);
  myCell = myRow.insertCell(-1);
  myCell.innerHTML = "2";
  myCell = myRow.insertCell(-1);
  myCell.innerHTML = "Double Stance (Latter)";
  myCell = myRow.insertCell(-1);
  myCell = myRow.insertCell(-1);
  myCell.innerHTML = "Double Stance (Front)";
  myCell = myRow.insertCell(-1);
  myRow.setAttribute("align", "center");

  myRow = myTable.insertRow(-1);
  myCell = myRow.insertCell(-1);
  myCell.innerHTML = "-";
  myCell = myRow.insertCell(-1);
  myCell.innerHTML = "Toe-off";
  myCell.style.fontStyle = "italic";
  myCell = myRow.insertCell(-1);
  myCell = myRow.insertCell(-1);
  myCell = myRow.insertCell(-1);
  myRow.setAttribute("align", "center");

  myRow = myTable.insertRow(-1);
  myCell = myRow.insertCell(-1);
  myCell.innerHTML = "3";
  myCell = myRow.insertCell(-1);
  myCell.innerHTML = "Swing";
  myCell = myRow.insertCell(-1);
  myCell = myRow.insertCell(-1);
  myCell.innerHTML = "Single Stance";
  myCell = myRow.insertCell(-1);
  myRow.setAttribute("align", "center");

  myRow = myTable.insertRow(-1);
  myCell = myRow.insertCell(-1);
  myCell.innerHTML = "-";
  myCell = myRow.insertCell(-1);
  myCell.innerHTML = "Heel Strike";
  myCell.style.fontStyle = "italic";
  myCell = myRow.insertCell(-1);
  myCell = myRow.insertCell(-1);
  myCell = myRow.insertCell(-1);
  myRow.setAttribute("align", "center");

  myRow = myTable.insertRow(-1);
  myCell = myRow.insertCell(-1);
  myCell.innerHTML = "4";
  myCell = myRow.insertCell(-1);
  myCell.innerHTML = "Double Stance (Front)";
  myCell = myRow.insertCell(-1);
  myCell = myRow.insertCell(-1);
  myCell.innerHTML = "Double Stance (Latter)";
  myCell = myRow.insertCell(-1);
  myRow.setAttribute("align", "center");

  myRow = myTable.insertRow(-1);
  myCell = myRow.insertCell(-1);
  myCell.innerHTML = "-";
  myCell = myRow.insertCell(-1);
  myCell = myRow.insertCell(-1);
  myCell = myRow.insertCell(-1);
  myCell.innerHTML = "Toe-off";
  myCell.style.fontStyle = "italic";
  myCell = myRow.insertCell(-1);
  myRow.setAttribute("align", "center");
/* 
  myRow = myTable.insertRow(-1);
  myCell = myRow.insertCell(-1);
  myCell.innerHTML = "1";
  myCell = myRow.insertCell(-1);
  myCell.innerHTML = "Single Stance";
  myCell = myRow.insertCell(-1);
  myCell = myRow.insertCell(-1);
  myCell.innerHTML = "Swing";
  myRow.setAttribute("align", "center"); */
}

function clearTable() {
  var myTable = document.getElementById('dataTable');
  myTable.innerHTML = "";
}

function UpdateRow(rownum,T1,T2,T3,T4) {
  var myTable = document.getElementById('dataTable');
  //myTable.style.backgroundColor = "white";
  //myTable.setAttribute("bgcolor","#FF0000");
  myTable.rows[1].cells[4].innerHTML = round(T1 * 0.2)/100;
  myTable.rows[3].cells[4].innerHTML = round(T2 * 0.2)/100;
  myTable.rows[5].cells[4].innerHTML = round(T3 * 0.2)/100;
  myTable.rows[7].cells[4].innerHTML = round(T4 * 0.2)/100;
  if(rownum == 0)
  {myTable.rows[8].style.backgroundColor = "yellow";
  myTable.rows[7].style.backgroundColor = "white";}
  else if(rownum == 1)
  {myTable.rows[rownum].style.backgroundColor = "yellow";
  myTable.rows[8].style.backgroundColor = "white";}
  else if(rownum > 1)
  {myTable.rows[rownum].style.backgroundColor = "yellow";
  myTable.rows[rownum-1].style.backgroundColor = "white";}
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
