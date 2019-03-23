/*
                Project:
    Needs to process the Turing Machine:
            {w#w|w in {0,1}*}
*/

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var arrowCanvas = document.getElementById("myCanvas");
var actx = arrowCanvas.getContext("2d");
ctx.font = "30px Arial"
drawTape();
// Draw Tape on screen
function drawTape() {
    // Vertical Lines
    var x = 0;
    for(var i=0; i<=canvas.width; i++) {
        ctx.moveTo(x,70);
        ctx.lineTo(x,130);
        x += 50;
    }
    tapeLength = x - 50;
    // Top Line
    ctx.moveTo(0,70);
    ctx.lineTo(canvas.width,70);
    // Bottom Line
    ctx.moveTo(0,130);
    ctx.lineTo(canvas.width,130);
    ctx.stroke();
}

var leftString;
var rightString;
// Process Input String
function processInput() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    leftString = document.getElementById("left").value;
    rightString = document.getElementById("right").value;
    if(leftString.length == rightString.length) {
        var xstart = 0;
        var xend = 50;
        if(xstart != 400)
        for(var i=0; i<leftString.length; i++) {
            var char = leftString.charAt(i);
            ctx.fillText(char, ((xstart+xend)/2)-8, 110);
            xstart = xend;
            xend += 50;
        } 
        ctx.fillText('#', ((xstart+xend)/2)-8, 110);
        xstart = xend;
        xend += 50;
        for(var i=0; i<rightString.length; i++) {
            var char = rightString.charAt(i);
            ctx.fillText(char, ((xstart+xend)/2)-8, 110);
            xstart = xend;
            xend += 50;
        }
        var tapeSize = leftString.length + rightString.length + 1;
        drawTape(tapeSize);
        ctx.stroke();
    }
}

// Draw Arrow on screen over specified tape
function drawArrow(position) {
    if(start) {
        // Get position
        var x = 0;
        for(var i=0; i<=position; i++)
            x += 50;
        // Arrow Vertical Line
        actx.moveTo(x-25,30);
        actx.lineTo(x-25,60);
        // Arrow Left Side
        actx.moveTo(x-35,45);
        actx.lineTo(x-25,60);
        // Arrow Right Size
        actx.moveTo(x-15,45);
        actx.lineTo(x-25,60);
        // Display
        actx.stroke();
    }
}

// Restrict input to binary values
function restrictInput(evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 49))
       return false;

    return true;
}

var state = true;

function replaceString(left, right) {

    if(left.length == right.length) {
        var xstart = 0;
        var xend = 50;
        console.log(left, right);
        if(xstart != 400)
        for(var i=0; i<left.length; i++) {
            var char = left.charAt(i);
            ctx.fillText(char, ((xstart+xend)/2)-8, 110);
            xstart = xend;
            xend += 50;
        } 
        ctx.fillText('#', ((xstart+xend)/2)-8, 110);
        xstart = xend;
        xend += 50;
        for(var i=0; i<right.length; i++) {
            var char = right.charAt(i);
            ctx.fillText(char, ((xstart+xend)/2)-8, 110);
            xstart = xend;
            xend += 50;
        }
        var tapeSize = left.length + right.length + 1;
        drawTape(tapeSize);
        ctx.stroke();
    }
}

var leftIndex = 0;
var rightIndex = 0;
var start = false;
var leftCheck = false;
var rightCheck = false;
var totalString = leftString + '#' + rightString;
function processNext() {
    if(!isEmpty(leftString)) {
        if(start != false) {
            var leftSize = leftString.length; // Get size of left String
            var leftVar = leftString.charAt(leftIndex); // Get character at index in leftString
            leftString = setCharAt(leftString, leftIndex, 'x'); // Replace character at index with 'x'
             // Draw updated String

            if(leftString.charAt(leftIndex) === 'x') {
                leftIndex++;
                 // Draw updated String
                drawArrow(leftIndex);
                
            }
        }
        else {
            start = true;
            drawArrow(leftIndex);
            replaceString(leftString, rightString);
        }
    }
}

function processPrevious() {
    
}

// Make a next and previous button that allows you to
// view the next and previous states of the tape.

function setCharAt(str,index,chr) {
    if(index > str.length-1) return str;
    return str.substr(0,index) + chr + str.substr(index+1);
}

function isEmpty(str) {
    return (!str || 0 === str.length);
}