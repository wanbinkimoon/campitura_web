// Getting elements
var canvas = document.getElementsByTagName('canvas')[0];
var ctx = canvas.getContext('2d');

// defining canvas size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// canvas background
canvas.style.background = 'transparent';


//define dot
var dot = {
    size: 20,
    color: '#fff'
};

dot.distX = dot.size * 4;
dot.distY = Math.sqrt(dot.size * dot.size * 16 - (dot.size * dot.size * 4));

//init dots array
var dots = [];

// define beginning mouse position
var mouse = {
    posX: canvas.width / 2,
    posY: canvas.height / 2
};


//initializing dots the actual dots on the whole canvas
function init() {
    // cols
    for (var i = 0; i < canvas.width + dot.distX; i += dot.distX) {
        //rows
        for (var j = 0, a = 0; j < canvas.height + dot.distX; j += dot.distY, a++) {
            // add dots to the empty array defined before
            dots.push({
                posX: (a % 2 === 0) ? i : i + dot.distX / 2,
                posY: j
            });
        }
    }
}

//drawing dots
function render() {
    // define drawing context
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // render the dots looping the array
    for (var i = 0; i < dots.length; i++) {

        //define the distnce of the dots based on the position
        // this var return the suqare root of the square of the sum of the initial mouse position wich is the center of the canvas minus the dot X/Y coordinate
        //var dist = Math.sqrt(Math.pow(mouse.posX - dots[i].posX, 2) + Math.pow(mouse.posY - dots[i].posY, 2));
        var dist = Math.sqrt(Math.pow(mouse.posX - dots[i].posX, 2) + Math.pow(mouse.posY - dots[i].posY, 2));

        // here we deifne the size which is what contols the area affected by the mouse position
        //var size = dist/canvas.height * dot.size*3;
        var size = dist / canvas.height * dot.size * 4;


        ctx.beginPath();
        ctx.arc(dots[i].posX, dots[i].posY, size, 0, 2 * Math.PI);
        ctx.fillStyle = dot.color;
        ctx.fill();
    }
}


document.onmousemove = function(ev) {
    mouse.posX = ev.pageX - canvas.offsetLeft;
    mouse.posY = ev.pageY - canvas.offsetTop;

    if (window.requestAnimationFrame) {
        requestAnimationFrame(render);
    } else {
        render();
    }
};

//calling drawing function
init();
render();
