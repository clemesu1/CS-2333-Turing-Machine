/*
                Project:
    Needs to process the Turing Machine:
            {w#w|w in {0,1}*}
*/

var canvas = document.getElementById("Tape");
var ctx = canvas.getContext("2d");
var arrowCanvas = document.getElementById("Arrow");
var actx = arrowCanvas.getContext("2d");
var numCanvas = document.getElementById("Numbers");
var nctx = numCanvas.getContext("2d");
nctx.font = "30px Arial"
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
    actx.clearRect(0, 0, canvas.width, canvas.height);
    nctx.clearRect(0, 0, canvas.width, canvas.height);
    leftIndex = 0;
    rightIndex = 0;

    leftString = document.getElementById("left").value;
    rightString = document.getElementById("right").value;
    if(leftString.length == rightString.length) {
        var xstart = 0;
        var xend = 50;
        if(xstart != 400)
        for(var i=0; i<leftString.length; i++) {
            var char = leftString.charAt(i);
            nctx.fillText(char, ((xstart+xend)/2)-8, 110);
            xstart = xend;
            xend += 50;
        } 
        nctx.fillText('#', ((xstart+xend)/2)-8, 110);
        xstart = xend;
        xend += 50;
        for(var i=0; i<rightString.length; i++) {
            var char = rightString.charAt(i);
            nctx.fillText(char, ((xstart+xend)/2)-8, 110);
            xstart = xend;
            xend += 50;
        }
        var tapeSize = leftString.length + rightString.length + 1;
        nctx.stroke();
    }
}

// Draw Arrow on screen over specified tape
function drawArrow(position) {
    actx.beginPath();
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
    nctx.clearRect(0, 0, canvas.width, canvas.height);
    if(left.length == right.length) {
        var xstart = 0;
        var xend = 50;
        if(xstart != 400)
        for(var i=0; i<left.length; i++) {
            var char = left.charAt(i);
            nctx.fillText(char, ((xstart+xend)/2)-8, 110);
            xstart = xend;
            xend += 50;
        } 
        nctx.fillText('#', ((xstart+xend)/2)-8, 110);
        xstart = xend;
        xend += 50;
        for(var i=0; i<right.length; i++) {
            var char = right.charAt(i);
            nctx.fillText(char, ((xstart+xend)/2)-8, 110);
            xstart = xend;
            xend += 50;
        }
        var tapeSize = left.length + right.length + 1;
        nctx.stroke();
    }
}

var leftIndex = 0;
var rightIndex = 0;
var leftCheck = false;
var rightCheck = false;
var leftVar;
var rightVar;
var start = false;
var totalString = leftString + '#' + rightString;
var size;
var counter;
function processNext() {
    actx.clearRect(0, 0, canvas.width, canvas.height);
    if(!isEmpty(leftString)) {
        if(start != false) {
            size = leftString.length; // Get size of left String
            if(leftCheck == false) {
                leftVar = leftString.charAt(leftIndex); // Get character at index in leftString
                leftString = setCharAt(leftString, leftIndex, 'x'); // Replace character at index with 'x'
                replaceString(leftString, rightString);
                if(leftString.charAt(leftIndex) === 'x') {
                    if(rightCheck == false) {
                        leftIndex++;
                        drawArrow(leftIndex);
                        leftCheck = true;
                    }
                    else {
                        rightCheck = false;
                        drawArrow(leftIndex);
                        leftCheck = true;
                    }    
                }
            }
            else if(rightCheck == false) {
                if(totalString.charAt(leftIndex) === 'n' && leftCheck == true) {
                    drawArrow(size + 1 + rightIndex);
                    rightVar = rightString.charAt(rightIndex);
                    rightCheck = true;
                    rightString = setCharAt(rightString, rightIndex, 'x');
                    rightIndex++;
                    replaceString(leftString, rightString);
                    if(leftVar != rightVar) {
                        document.getElementById("output").innerHTML = "Rejected";
                        leftIndex = 0;
                }
                    leftCheck = false;
                }
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

function setCharAt(str,index,chr) {
    if(index > str.length-1) return str;
    return str.substr(0,index) + chr + str.substr(index+1);
}

function isEmpty(str) {
    return (!str || 0 === str.length);
}

for(var i=0; i<size; i++) {
    if(leftString.charAt(i) === 'x' && rightString.charAt(i) === 'x') {
        console.log(i, size)
        if(i == size ) {
            if(rightCheck == false) {
                document.getElementById("output").innerHTML = "Accepted";
                drawArrow(leftString.length + rightString.length + 1);
            }
        }
    }
}