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
    constructor(x, y,dx,dy,radius) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.radius = radius;
        //this.radius = radius;
    }

    drawCircle() {
        //console.log(this.dy);
        //console.log(this.y);
            c.beginPath();
            c.arc(this.x,this.y,this.radius,0,Math.PI * 2,false);
            c.stroke();
    }

    //TODO: NEXT STEP CASES LOGIC
    //some bug in the left corner
    //Cases: hits off top, hits of left, hits off right, hits of paddle (random), hits of object (random), goes through bottom it is out
    update() {
        //hits paddle
        if (this.y >= 700 - this.radius && this.x <= mouse.x + 40 && this.x >= mouse.x - 40) {
            this.dy = this.dy * Math.random() + 1; 
            this.dx = this.dx * Math.random() + 1;
            this.dy = -1 * this.dy;
            //randomize towards which side the ball goes
            if (Math.random >= .5) {
                this.dx = -1 * this.dx;
            }
            this.x += this.dx * 3;
            this.y += this.dy * 3;
            this.drawCircle();
        }
        //hits top of screen
        else if (this.y <= this.radius) {
            this.dy = -1 * this.dy;
            this.x += this.dx;
            this.y += this.dy;
            this.drawCircle;
        }
        //goes through bottom
        else if(this.y >= 800) {
            lives--;
            if (lives > 0) {
                this.x = 100;
                this.y = 100;
                this.dx = 1;
                this.dy = 1;
                this.radius = 20
                this.drawCircle;
            }
            else {
                endAnimation = true;
                this.x = 100;
                this.y = 100;
                this.dx = 1;
                this.dy = 1;
                this.radius = 20
            }
            //if number of lives is 0 say game over; should work on keeping sperate fucntions; check in animate
            //else start ball again from random spot
        }
        //right side of screen
        else if (this.x + this.radius >= 800) {
            this.dy = this.dy * Math.random() + 1; 
            this.dx = this.dx * Math.random() + 1;
            this.dx = -1 * this.dx;
            this.x += this.dx * 3;
            this.y += this.dy * 3;
            this.drawCircle;
        }
        //left side of screen
        else if (this.x - this.radius <= 0) {
            this.dx = -1 * this.dx;
            this.dy = this.dy * Math.random() + 1; 
            this.dx = this.dx * Math.random() + 1;
            this.x += this.dx * 3;
            this.y += this.dy * 3;
            this.drawCircle;
        }
        //initialize ball begining of game and needed for when ball does not hit special case
        else {
        this.x += this.dx;
        this.y += this.dy;
        this.drawCircle();
        }
    }
}

function gameOver() {
    c.beginPath();
    c.font = "30px Comic Sans MS";
    c.fillStyle = "red";
    c.textAlign = "center";
    c.fillText("GameOver",400,400);
    c.closePath();
}

function animate() {
    requestAnimationFrame(animate);
    //clears old Rect every iteration
    c.clearRect(0,0,800,800);

    if (mouse.x > 8 && mouse.x <= 720) {
        c.fillRect(mouse.x - 40,700,80,20);
    }
    else if(mouse.x > 720) {
        c.fillRect(720,700,80,20);
    }
    else {
        c.fillRect(0,700,80,20);
    }

    //builds the upper blocks
    for (var j = 0; j < 6; j++) {
        for (var i = 0; i < 9; i++) {
            c.fillRect(i * 88 + 8,70 + j * 40,80,30);
        }
    }

    myCircle.update();
    if (endAnimation) {
            c.clearRect(0,0,800,800)
            gameOver();
            cancelAnimationFrame();
    }
    c.font = "30px Comic Sans MS";
    c.fillText("Number of Lives:", 480, 50)
    c.fillText(lives, 730, 50); 
}

var beginGame = true;
lives = 3;
var endAnimation = false;
myCircle = new Circle(100,320,1,1,20);
animate();
