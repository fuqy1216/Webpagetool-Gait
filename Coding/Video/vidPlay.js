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
      function stopVideo() {
        player.stopVideo();
      }


       function loadVid() {
         var videoAdd=document.getElementById("VidURL").value;
                console.log(videoAdd);
                player.loadVideoById(videoAdd);
       }

       function vidPause() {
         player.pauseVideo();
         var t1=Math.round(player.getCurrentTime()*1000)/1000;
         document.getElementById("txtWrkTime").value=t1;
      }

      function recT() {
         document.getElementById("txtTimeRecord").value=document.getElementById("txtTimeRecord").value+", "+document.getElementById("txtWrkTime").value;

         var node = document.createElement("LI");  //defines node as list element
         var textnode = document.createTextNode(document.getElementById("txtWrkTime").value);
         node.appendChild(textnode);
         document.getElementById("lstTimes").appendChild(node);
         //console.log(t1);

         var e1=document.getElementById("txtWrkStep").value;
         document.getElementById("txtWrkStep").value=e1;
         var node = document.createElement("LI");  //defines node as list element
         var textnode = document.createTextNode(document.getElementById("txtWrkStep").value);
         node.appendChild(textnode);
         document.getElementById("lstSteps").appendChild(node);
         //console.log(e1);
        }

       function GoToT() {
         var T1=document.getElementById("txtWrkTime").value;
//         console.log(T1);
         player.seekTo(T1);
       }

       function contPlay(){
        var T1=document.getElementById("txtWrkTime").value;
        player.playVideo();
        player.seekTo(T1);
        //player.play();
       }
