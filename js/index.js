document.getElementById("mybtn").onclick = function() {
    const myaudio = document.getElementById("myaudio");
    if (myaudio.paused == true) {
        myaudio.play();
        this.style.backgroundImage = "url(../images/color-violin.jpg)";
    }
    else if (myaudio.paused == false) {
        myaudio.pause();
        this.style.backgroundImage = "url(../images/btn.png)";
    }
};
