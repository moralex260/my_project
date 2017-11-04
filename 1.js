//Does a switch of the play/pause with one button.
function playPause(id) {

  //Sets the active song since one of the functions could be play.
  activeSong = document.getElementById(id);

  //Checks to see if the song is paused, if it is, play it from where it left off otherwise pause it.
  if (activeSong.paused) {
     global activeSong.play();
  }
  else {
    
    activeSong.pause();
  }
}
1
2
3
4
