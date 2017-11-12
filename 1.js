window.onerror = new Function("return true");
screen.bufferDepth = 16;
object = new Array();

am = 60;
TEMPO = 6000;

W0 = 0;
H0 = 0;
nx = 0;
ny = 0;
K  = 0;
Kb = -1;

function zoomIn(N){
    object[N].img.cursor="crosshair";
    object[N].zoomIn();
    object[N].img.zIndex=0;
}

function zoomOut(N){
    object[N].img.cursor="pointer";
    object[N].zoomOut();
}

function zyva(N){
    if(N!=Kb){
        clearTimeout(object[Kb].TO);
        zoomIn(N);
        object[Kb].BR=true;
        zoomOut(Kb);
        Kb=N;
    }
}

function nextImg(){
    if(Kb>=0)zoomOut(Kb);
    Kb=K%nbI;
    zoomIn(Kb);
    K++;
}

function CObj(N,img){
    this.A   = Math.round(Math.random()*10)+1;
    this.B   = Math.round(Math.random()*10)+3;
    this.k   = 0.1 * N;
    this.L   = 0;
    this.T   = 0;
    this.W   = W0;
    this.H   = H0;
    this.xb  = 0;
    this.img = img.style;
    this.img.zIndex = 1;
    this.obj = "object["+N+"].";
    this.BR  = false;
    this.TO  = 0;

    this.mainloop = function () {
        with (this) {
            k += 0.001;
            L  = ((nx-W) * .5) + (Math.cos(k * A) * .5) * (nx - W);
            T  = ((ny-H) * .5) + (Math.cos(k * B) * .5) * (ny - H);
            with(img){
                width  = Math.floor(W);
                height = Math.floor(H);
                top    = Math.floor(T);
                left   = Math.floor(L);
            }
            setTimeout(obj+"mainloop();", 32);
        }
    }

    this.zoomIn  = function() {
        with (this) {
            W += (nx - W) * (.1 * am/(.01+(nx - W)));
            H += (ny - H) * (.1 * am/(.01+(nx - W)));
            if(!BR){
                if(W >= nx) TO=setTimeout("nextImg();", TEMPO);
                else setTimeout(obj+"zoomIn();", 32);
            }
        }
    }

    this.zoomOut  = function() {
        with (this) {
            W -= W / (am * .5);
            H -= H / (am * .5);
            if(W >= 2) setTimeout(obj+"zoomOut();", 32);
            else {
                BR=false;
                img.zIndex=1;
                zoomStart();
            }
        }
    }
    this.zoomStart = function() {
        with (this) {
            W++;
            H += H0 / W0;
            if(W<W0 || H<H0)setTimeout(obj+"zoomStart();", 32);
        }
    }

    this.mainloop();
}

function resize() {
    nx = document.body.clientWidth;
    ny = document.body.clientHeight;
    W0  = nx / nbI;
    H0  = ny / nbI;
    if(H0<W0*.56)H0=W0*.56;
}
onresize = resize;

onload = function() {
    img = document.getElementById("IMG").getElementsByTagName("img");
    nbI = img.length;
    resize();
    for(i=0;i<nbI;i++) object[i] = new CObj(i,img[i]);
    nextImg();
}