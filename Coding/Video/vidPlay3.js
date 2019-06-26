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
         //event.target.playVideo();
         recT();
         vidPause();
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
        if (event.data == YT.PlayerState.PAUSED){
          var t1=Math.round(player.getCurrentTime()*1000)/1000;
          document.getElementById("txtWrkTime").value=t1;
        }
      }


      function loadVid() {
        var videoAdd=document.getElementById("VidURL").value;
           //    console.log(videoAdd);
               player.loadVideoById(videoAdd);
               //recT();
               //vidPause();
               //var tmax=player.getDuration():Number;
               //console.log(tmax);
               //Returns the duration in seconds of the currently playing video.
               //Note that getDuration() will return 0 until the video's metadata is loaded,
               //which normally happens just after the video starts playing.
      }


       function minusPtOneSec(){
         var t1=Math.round(player.getCurrentTime()*1000)/1000;

         if (t1 < 0.1) {
           document.getElementById("txtWrkTime").value=0;
         } else {
           document.getElementById("txtWrkTime").value=t1-0.1;
         }
         player.playVideo();
         console.log(document.getElementById("txtWrkTime").value);
         player.seekTo(document.getElementById("txtWrkTime").value);
         player.pauseVideo();
       }

       function plusPtOneSec(){
         var t1=Math.round(player.getCurrentTime()*1000)/1000;
         document.getElementById("txtWrkTime").value=t1+0.1;
         player.playVideo();
         console.log(document.getElementById("txtWrkTime").value);
         player.seekTo(document.getElementById("txtWrkTime").value);
         player.pauseVideo();
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
        var lstTimes=document.getElementById('timeRecord').innerHTML;
          console.log(t1);
        console.log(lstTimes);
          document.getElementById('timeRecord').innerHTML=document.getElementById('timeRecord').innerHTML + ", " + t1;

        var myTable = document.getElementById('dataTable');
        var myRow = myTable.insertRow(-1); // -1 to insert row at bottom or 0 to insert at top

        var myCellValue = document.getElementById('txtWrkTime').value;
        var myCell = myRow.insertCell(0); // insert a cell with index 0 into new row
        myCell.innerHTML = myCellValue;

        myCellValue = document.getElementById('txtA1').value;
        myCell = myRow.insertCell(1);
        myCell.innerHTML = myCellValue;

           myCellValue = document.getElementById('txtA2').value;
           myCell = myRow.insertCell(2);
           myCell.innerHTML = myCellValue;

           myCellValue = document.getElementById('txtA3').value;
           myCell = myRow.insertCell(3);
           myCell.innerHTML = myCellValue;

           onRowClick("dataTable", function (row) {   // adds click listener to each row -- row is an input
             var recTime = row.getElementsByTagName("td")[0].innerHTML;
             var recA1 = row.getElementsByTagName("td")[1].innerHTML;
             var recA2 = row.getElementsByTagName("td")[2].innerHTML;
             var recA3 = row.getElementsByTagName("td")[3].innerHTML;
          // console.log("recTime>>", recTime);
             console.log("Row: " +  row.rowIndex);
             document.getElementById('lastSelRow').innerHTML="Last selected row: "+row.rowIndex;
             document.getElementById('txtWrkTime').value = recTime;
             document.getElementById('txtA1').value = recA1;
             document.getElementById('txtA2').value = recA2;
             document.getElementById('txtA3').value = recA3;
             player.playVideo();
             console.log(document.getElementById("txtWrkTime").value);
             player.seekTo(document.getElementById("txtWrkTime").value);
             player.pauseVideo();

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
