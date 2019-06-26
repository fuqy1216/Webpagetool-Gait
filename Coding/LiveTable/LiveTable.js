


function enterRow() {
  var myTable = document.getElementById('dataTable');
  var myRow = myTable.insertRow(-1);
  var myCellValue = document.getElementById('timeInput').value;
  var myCell = myRow.insertCell(0);
  myCell.innerHTML = myCellValue;
  myCellValue = document.getElementById('textInput').value;
  myCell = myRow.insertCell(1);
  myCell.innerHTML = myCellValue;

  onRowClick("dataTable", function (row) {
    var value = row.getElementsByTagName("td")[0].innerHTML;
    //console.log("value>>", value);
    document.getElementById('clickedRowText').innerHTML = value;
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
