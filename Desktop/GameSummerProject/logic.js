// this below selects the canvas to be referred to in html file
var canvas = document.querySelector('canvas');
//assigns size of gameplay screen
canvas.width = 800;
canvas.height = 800;

// c is an object with a ton of methods to draw on canvas
var c = canvas.getContext('2d');

var mouse = {
    x: undefined,
    y: undefined
}

//mouse tracker; function called when we move the mouse
window.addEventListener('mousemove', function(event) {
    mouse.x = event.x;
    mouse.y = event.y
})


//this will not do anything new construcor is called everytime; must be updates outside of class.
class Circle {
    constructor(x, y,dx,dy) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        //this.radius = radius;
    }

    drawCircle() {
        //console.log(this.dy);
        //console.log(this.y);
            c.beginPath();
            c.arc(this.x,this.y,20,0,Math.PI * 2,false);
            c.stroke();
    }

    //TODO: NEXT STEP CASES LOGIC
    //Cases: hits off top, hits of left, hits off right, hits of paddle (random), hits of object (random), goes through bottom it is out
    update() {
        this.x += this.dx;
        this.y += this.dy;
        this.drawCircle()
    }
}



//make the paddle 
//loops through animate function to create illusion of animation
//Done TODO: prevent paddle from leaving screen 
//TODO: make paddle appear before we put cursor on screen

//var x = -1;


function animate() {
    requestAnimationFrame(animate);
    //clears old Rect every iteration
    c.clearRect(0,0,800,800);

    //this creates a clear circle on the canvas
    //TODO: figure out what color I want to use here

    //still being reset by consturctor
   //myCircle = new Circle(100,100,0,1);
    myCircle.update();
   // x--;



    //canvas has a border 8 pixels away
    //prevent the paddle from moving out of canvas
    if (mouse.x > 8 && mouse.x <= 720) {
        c.fillRect(mouse.x,700,80,20);
    }
    else if(mouse.x > 720) {
        c.fillRect(720,700,80,20);
    }
    else {
        c.fillRect(0,700,80,20);
    }
}

//sort of where main starts
//the ball is declared
myCircle = new Circle(100,100,0,1);
animate();
