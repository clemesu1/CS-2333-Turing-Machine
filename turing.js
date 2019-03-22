// Draw Tape on screen

function drawTape(input) {
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
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

function processInput() {
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = "30px Arial";
    var x = document.getElementById("myText").value;
    var xstart = 0;
    var xend = 50;
    if(xstart != 400)
    for(var i=0; i<x.length; i++) {
        var char = x.charAt(i);
        ctx.fillText(char, ((xstart+xend)/2)-8, 110);
        xstart = xend;
        xend += 50;
    } 
    drawTape(x.length);
    ctx.stroke();
}

/*
function restrictInput(evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 49))
       return false;

    return true;
}
*/