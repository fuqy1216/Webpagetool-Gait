var tag = document.createElement('script');
       tag.src = "http://www.youtube.com/player_api"; //get's api from youtube
       var firstScriptTag = document.getElementsByTagName('script')[0];
       firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
       var player;
       var ttot="time (sec)";


       function onYouTubePlayerAPIReady() {
           player = new YT.Player('player', {
               height: '600',
               width: '800',
               events: {
                 'onReady': onPlayerReady,
                 'onStateChange': onPlayerStateChange
               },
               playerVars: {
                 fs: 0,
                 playsinline: 1   //unique to IOS
               }
           });
       }

       function onPlayerReady(event) {
        event.target.playVideo();
      }



      //    The API calls this function when the player's state changes.
      //    The function indicates that when playing a video (state=1),
      //    the player should play for six seconds and then stop.
      var done = false;
      function onPlayerStateChange(event) {
        if (event.data == YT.PlayerState.PLAYING && !done) {
          //setTimeout(stopVideo, 6000); // stops video in 6s
          done = true;
        }
      }


       function loadVid() {
         var videoAdd=document.getElementById("VidURL").value;
            //    console.log(videoAdd);
                player.loadVideoById(videoAdd);
       }


       function vidPause() {
         player.pauseVideo();
         var t1=Math.round(player.getCurrentTime()*1000)/1000;
         document.getElementById("txtWrkTime").value=t1;
      }

      function contPlay(){
       //var t1=document.getElementById("txtWrkTime").value;
       player.playVideo();
       console.log(document.getElementById("txtWrkTime").value);
       player.seekTo(document.getElementById("txtWrkTime").value);
      }

      function recT() {

          var t1=Math.round(player.getCurrentTime()*1000)/1000;
          document.getElementById("txtWrkTime").value=t1;
        //  var lstTimes=document.getElementById('timeRecord').value;
          console.log(t1);
        //  console.log(lstTimes);
        //  document.getElementById('timeRecord').value=lstTimes + ", " + t1;

           var myTable = document.getElementById('dataTable');
           var myRow = myTable.insertRow(-1);
           var myCellValue = document.getElementById('txtWrkTime').value;
           var myCell = myRow.insertCell(0);
           myCell.innerHTML = myCellValue;
           myCellValue = document.getElementById('txtWrkStep').value;
           myCell = myRow.insertCell(1);
           myCell.innerHTML = myCellValue;

           onRowClick("dataTable", function (row) {
             var recTime = row.getElementsByTagName("td")[0].innerHTML;
             var recStep = row.getElementsByTagName("td")[1].innerHTML;
             console.log("recTime>>", recTime);
          //   document.getElementById('clickedRowText').value = recTime;
             document.getElementById('txtWrkTime').value = recTime;
             document.getElementById('txtWrkStep').value = recStep;
             player.playVideo();
             console.log(document.getElementById("txtWrkTime").value);
             player.seekTo(document.getElementById("txtWrkTime").value);

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
