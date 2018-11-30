// SELECTS ELEMENT FROM HTML
var canvas = document.querySelector('canvas');

// MAKES CANVAS SPAN WIDTH & HEIGHT OF WINDOW
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// CONTEXT
var c = canvas.getContext('2d');

// FILLRECT NEEDS x COORDINATE, y COORDINATE, width, height
/*c.fillStyle = "#e6ccff72";
c.fillRect(100, 100, 100, 100);
c.fillStyle = "#ccf5ff65";
c.fillRect(300, 400, 100, 100);
c.fillStyle = "#ffffcc";
c.fillRect(550, 600, 50, 50);
c.fillStyle = "#c2f0c270";
c.fillRect(400, 700, 100, 100);
console.log(canvas);

// LINES
c.beginPath();
c.moveTo(50, 300); // NEEDS X & Y COORDINATES
c.lineTo(300, 120);
c.lineTo(400, 350);
c.lineTo(950, 660);
c.strokeStyle = "#400080";
c.stroke();

// ARCS & CIRCLES -
// NEEDS X & Y COORDINATES, RADIUS, START & END ANGLE


for (var i = 0; i < 50; i++) {
    var x = Math.random() * window.innerWidth;
    var y = Math.random() * window.innerHeight;
    // RANDOMIZES COLORS
    var length = 6;
    var chars = '0123456789ABCDEF';
    var hex = '#';
    while (length--) hex += chars[(Math.random() * 16) | 0];
    
    c.beginPath();
    c.arc(x, y, 10, 0, Math.PI * 2,false);
    c.strokeStyle = hex;
    c.stroke();
}*/

/*var x = Math.random() * innerWidth;
var y = Math.random() * innerHeight;
var dx = (Math.random() - 0.5) * 16;
var dy = (Math.random() - 0.5) * 16;
var radius = 30;*/

var mouse = {
    x: undefined,
    y: undefined
}

var maxRadius = 40;
//var minRadius = 2;

var colorArray = [
    "#4281A4",
    "#FF4F79",
    "#A11692",
    "#22AAA1",
    "#17183B",  
];

// 'touchstart', touchHandler, false,

canvas.addEventListener('mousemove', 
    function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
})

window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    init();
})

function Circle(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)]

    this.draw = function () {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
    };

    this.update = function() {
        if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }
        if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }

        this.x += this.dx;
        this.y += this.dy;

        if (mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
            if (this.radius < maxRadius) {
                this.radius += 1;
            }
        } else if(this.radius > this.minRadius) {
            this.radius -= 1;
        }

        this.draw();
    }
};

/*var x = Math.random() * innerWidth;
var y = Math.random() * innerHeight;
var dx = (Math.random() - 0.5) * 16;
var dy = (Math.random() - 0.5) * 16;
var radius = 30;*/
   
var circleArray = [];

function init() {
    circleArray = [];
    for (var i = 0; i < 3000; i++) {
        var x = Math.random() * (innerWidth - radius * 2) + radius;
        var y = Math.random() * (innerHeight - radius * 2) + radius;
        var dx = (Math.random() - 0.5) * 8;
        var dy = (Math.random() - 0.5) * 8;
        var radius = Math.random() * 3 + 1;
        circleArray.push(new Circle(x, y, dx, dy, radius));
    };
}

function touchHandler(event) {
    // Get a reference to our coordinates div
    var coords = document.getElementById("coords");
    // Write the coordinates of the touch to the div
    coords.innerHTML = 'x: ' + event.touches[0].pageX + ', y: ' + event.touches[0].pageY;
}

function animation() {
    requestAnimationFrame(animation);
    c.clearRect(0, 0, innerWidth, innerHeight);

    for (var i = 0; i < circleArray.length; i++) {
        circleArray[i].update();
    }
};

init();
animation();