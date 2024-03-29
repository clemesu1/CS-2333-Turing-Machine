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
nctx.font = "30px Comic Sans MS";
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
    document.getElementById("output").innerHTML = "";
    actx.clearRect(0, 0, canvas.width, canvas.height);
    nctx.clearRect(0, 0, canvas.width, canvas.height);
    leftIndex = 0;
    rightIndex = 0;

    leftString = document.getElementById("left").value;
    rightString = document.getElementById("right").value;
    if(leftString.length == rightString.length) {
        var totalString = checkString(leftString, rightString);
        var xstart = 0;
        var xend = 50;
        if(xstart != 400)
        for(var i=0; i<totalString.length; i++) {
            var char = totalString.charAt(i);
            nctx.fillText(char, ((xstart+xend)/2)-8, 110);
            xstart = xend;
            xend += 50;
        } 
        var tapeSize = leftString.length + rightString.length + 1;
        nctx.stroke();
    }
    else {
        document.getElementById("output").innerHTML = "Please have the two sides be of equal length.";
    }
    runMachine(totalString);
}

function checkString(right, left) {
    if(left == null)
        left = "";
    if(right == null)
        right = "";
    totalString = left + '#' + right;
    return totalString;
}
// Draw Arrow on screen over specified tape
function drawArrow(position) {
    var x = 0;
    for(var i=0; i<=position; i++)
        x += 50; 
    actx.clearRect(0, 0, canvas.width, canvas.height);
    actx.beginPath();
    // Arrow Vertical Line
    actx.moveTo(x-25,30);
    actx.lineTo(x-25,60);
    // Arrow Left Side
    actx.moveTo(x-35,45);
    actx.lineTo(x-25,60);
    // Arrow Right Size
    actx.moveTo(x-15,45);
    actx.lineTo(x-25,60);
    actx.stroke();
}

// Restrict input to binary values
function restrictInput(evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 49))
       return false;
    return true;
}

function replaceString(totalString) {

    nctx.clearRect(0, 0, canvas.width, canvas.height);
    var xstart = 0;
    var xend = 50;
    if(xstart != 400)
    for(var i=0; i<totalString.length; i++) {
        var char = totalString.charAt(i);
        nctx.fillText(char, ((xstart+xend)/2)-8, 110);
        xstart = xend;
        xend += 50;
    } 
    nctx.stroke();
}

function runMachine(totalString) {
    
    var head = 0;
    q1(totalString, head);
    
    function q1(totalString, head) {
        if(totalString.charAt(head) == '#') {
            drawArrow(head);
            q8(totalString, head);
        }
        else if(totalString.charAt(head) == '0')  {
            drawArrow(head);
            totalString = setCharAt(totalString, head, 'x');
            setInterval(replaceString(totalString), 1000);
            head++;
            q2(totalString, head);
        }
        else if(totalString.charAt(head) == '1')  {
            drawArrow(head);
            totalString = setCharAt(totalString, head, 'x');
            replaceString(totalString);
            head++;
            q3(totalString, head);
        }
        else {
            drawArrow(head);
            document.getElementById("output").innerHTML = "Rejected";
        }
    }

    function q2(totalString, head) {
        if(totalString.charAt(head) == '0' || totalString.charAt(head) == '1') {
            drawArrow(head);
            head++;
            q2(totalString, head);
        }
        else if(totalString.charAt(head) == '#') {
            drawArrow(head);
            head++;
            q4(totalString, head);
        }
        else {
            drawArrow(head);
            document.getElementById("output").innerHTML = "Rejected";
        }
    }

    function q3(totalString, head) {
        if(totalString.charAt(head) == '0' || totalString.charAt(head) == '1') {
            drawArrow(head);
            head++;
            q3(totalString, head);
        }
        else if(totalString.charAt(head) == '#') {
            drawArrow(head);
            head++;
            q5(totalString, head);
        }
        else {
            drawArrow(head);
            document.getElementById("output").innerHTML = "Rejected";
        }
    }

    function q4(totalString, head) {
        if(totalString.charAt(head) == 'x') {
            drawArrow(head);
            head++;
            q4(totalString, head);
        }
        else if(totalString.charAt(head) == '0') {
            drawArrow(head);
            totalString = setCharAt(totalString, head, 'x');
            replaceString(totalString);
            head--;
            q6(totalString, head);
        }
        else {
            drawArrow(head);
            document.getElementById("output").innerHTML = "Rejected";
        }
    }

    function q5(totalString, head) {
        if(totalString.charAt(head) == 'x') {
            drawArrow(head);
            head++;
            q5(totalString, head);
        }
        else if(totalString.charAt(head) == '1') {
            drawArrow(head);
            totalString = setCharAt(totalString, head, 'x');
            replaceString(totalString);
            head--;
            q6(totalString, head);
        }
        else {
            drawArrow(head);
            document.getElementById("output").innerHTML = "Rejected";
        }
    }

    function q6(totalString, head) {
        if(totalString.charAt(head) == '0' || totalString.charAt(head) == '1' || totalString.charAt(head) == 'x') {
            drawArrow(head);
            head--;
            q6(totalString, head);
        }
        else if(totalString.charAt(head) == '#') {
            drawArrow(head);
            head--;
            q7(totalString, head);
        }
        else {
            drawArrow(head);
            document.getElementById("output").innerHTML = "Rejected";
        }
    }

    function q7(totalString, head) {
        if(totalString.charAt(head) == '0' || totalString.charAt(head) == '1') {
            drawArrow(head);
            head--;
            q7(totalString, head);
        }
        else if(totalString.charAt(head) == 'x') {
            drawArrow(head);
            head++;
            q1(totalString, head);
        }
        else {
            drawArrow(head);
            document.getElementById("output").innerHTML = "Rejected";
        }
    }

    function q8(totalString, head) {
        if(totalString.charAt(head) == 'x') {
            drawArrow(head);
            head++;
            q8(totalString, head);
        }
        else {
            drawArrow(head);
            head++;
            qAccept(totalString, head);
        }
    }

    function qAccept(totalString, head) {
        if(leftString != "" || rightString != "") {
            drawArrow(head);
            document.getElementById("output").innerHTML = "Accepted"; 
        }
        else {
            drawArrow(head);
            document.getElementById("output").innerHTML = "Rejected";
        }
            
    }
}

function setCharAt(str,index,chr) {
    if(index > str.length-1) return str;
    return str.substr(0,index) + chr + str.substr(index+1);
}
