
let frame=0;
let xLocation = 0;
let yLocation = 100;
let t1;
let t2;
let t3;
let ctx;
let shots = 0;
let hits = 0;
document.getElementById("gameGround").style.cursor="crosshair";



//alustus
function init(){
    let canvas = document.getElementById("gameGround");
    ctx = canvas.getContext("2d");
    duck = new Image();
    duck.src="media/ducks.png";
    duck.onload = function() {
        ctx.drawImage(duck,(frame *55),0,55,27,xLocation,yLocation,55,27);
    }
    window.addEventListener("click",shoot);
        spriteAnimation();
        flyAnimation();

}



//spriteanimation
function spriteAnimation(){
    if(frame < 1){
        frame++;
    }
    else {
        frame = 0;
    }
    ctx.clearRect(0,0,842,596);
   t1 = setTimeout(spriteAnimation,200);

}

//flying

function flyAnimation(){

    xLocation= xLocation+30;
    yLocation=yLocation;
    ctx.drawImage(duck,(frame * 55),0,55,27,xLocation,yLocation,55,27);
    
    if(xLocation>842){
        xLocation=-100;
        yLocation=Math.random()*596;
    }

    t2=setTimeout(flyAnimation,200);
}


//shooting

function shoot(event){

    shots++;

    
    let canvas = document.getElementById("gameGround");
    let rect = canvas.getBoundingClientRect();
    let posX = event.clientX - rect.left;
    let posY = event.clientY - rect.top;

    if(posX > xLocation && posX < xLocation+ 55 && posY > yLocation && posY < yLocation +27){
    
        hits++;
        document.getElementById("hit").play();
        xLocation= -100;
        yLocation = Math.random()*596;
    }
    
    else{
        document.getElementById("miss").play();
    }
    
    if(shots >=10){
        gameOver();
    }
    
    
    
    
}        

       


//game over

function gameOver(){
    clearTimeout(t1);
    clearTimeout(t2);
    ctx.clearRect(0,0,842,298);
    ctx.font="40px Georgia";
    ctx.fillStyle = "red";
    ctx.fillText("Game Over",300 ,200);
    ctx.font="20px Georgia";
    ctx.fillStyle="red";
    ctx.fillText("Shots:"+ shots,300,250);
    ctx.fillText("Hits on target:" +hits,300,270);
    


}
