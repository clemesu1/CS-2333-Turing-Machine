/*
                Project:
    Needs to process the Turing Machine:
            {w#w|w in {0,1}*}
*/
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

// Draw Tape on screen
function drawTape(input) {
    // Vertical Lines
    var x = 0;
    for(var i=0; i<=input; i++) {
        ctx.moveTo(x,70);
        ctx.lineTo(x,130);
        x += 50;
    }
    tapeLength = x - 50;
    // Top Line
    ctx.moveTo(0,70);
    ctx.lineTo(tapeLength,70);
    // Bottom Line
    ctx.moveTo(0,130);
    ctx.lineTo(tapeLength,130);
    ctx.stroke();
}
// Process Input String
function processInput() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = "30px Arial";
    var leftString = document.getElementById("left").value;
    var rightString = document.getElementById("right").value;
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
    TuringMachine(leftString, rightString);
}

// Draw Arrow on screen over specified tape
function drawArrow(position) {
    // Get position
    var x = 0;
    for(var i=0; i<=position; i++)
        x += 50;
    // Arrow Vertical Line
    ctx.moveTo(x-25,30);
    ctx.lineTo(x-25,60);
    // Arrow Left Side
    ctx.moveTo(x-35,45);
    ctx.lineTo(x-25,60);
    // Arrow Right Size
    ctx.moveTo(x-15,45);
    ctx.lineTo(x-25,60);
    // Display
    ctx.stroke();
}

// Restrict input to binary values
function restrictInput(evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 49))
       return false;

    return true;
}

var state = true;

function TuringMachine(left, right) {
    left += '#';
    var i = 0;
    while(state == true) {
        var leftVar = left.charAt(i);
        drawArrow(i);
        if(leftVar == '#')
            state = false;
        left.charAt(i) = 'x';

        var rightVar = right.charAt(i);
        drawArrow(left.length + i);
        right.charAt(i) = 'x';
        if(leftVar != rightVar)
            state = false;

        if(left.charAt(i) != 'x' || right.charAt(i) != 'x')
            state = false;
        i++;
    }
}