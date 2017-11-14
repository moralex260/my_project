document.getElementById("mybtn").onclick = function() {
    const myaudio = document.getElementById("myaudio");
    if (myaudio.paused == true) {
        myaudio.play();
        this.style.backgroundImage ="url(imgs/color-violin.jpg)";
    }
    else if (myaudio.paused == false) {
        myaudio.pause();
        this.style.backgroundImage = "url(imgs/btn.png)";
    }
};
    function makeEaseOut(timing) {
      return function(timeFraction) {
        return 1 - timing(1 - timeFraction);
      }
    }

