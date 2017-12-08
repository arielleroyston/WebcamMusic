

//image capture variables
var capture;
var previousPixels;
var flow;
var w = 640,
    h = 480;
var step = 480/20;

var uMotionGraph, vMotionGraph;

// sound variables 
var osc;
var playing = false;

var circles = [];

function setup() {
    // canvas and flow set-up
    createCanvas(w, h);
    capture = createCapture(VIDEO);
    capture.hide();
    flow = new FlowCalculator(step);
    uMotionGraph = new Graph(100, -step / 2, +step / 2);
    vMotionGraph = new Graph(100, -step / 2, +step / 2);
    tint(0, 255, 208);

    // osc set-up
    osc = new p5.Oscillator();
    osc.setType('sine');
    osc.amp(0);
    osc.start();
}


function playNote(x, y){

    addCircle(x, y);
    playSound(y);
}

function playSound(y){

    osc.amp(0.5, 1);
    var note = convertYToNote(y)
    var freq = convertNoteToFrequency(note)

    print(note)

    osc.freq(freq);
    playing = true;

}

function convertYToNote(y){

    var note = "a";
    var rowHeight = h / 12
    var rowNumber = round(y/rowHeight)
    switch(rowNumber){
        case 0: note = "c sharp"
        break;
        case 1: note = "d"
        break;
        case 2: note = "d sharp"
        break;
        case 3: note = "e"
        break;
        case 4: note = "f"
        break;
        case 5: note = "f sharp"
        break;
        case 6: note = "g"
        break;
        case 7: note = "g sharp"
        break;
        case 8: note = "a"
        break;
        case 9: note = "a sharp"
        break;
        case 10: note = "b"
        break;
        case 11: note = "c"
        break;

    }
    return note;
}

function convertNoteToFrequency(note){

    var frequency = 441.49; //standard a note tuning fork
     switch(note){
        case "c sharp": frequency = 279.39
        break;
        case "d": frequency = 294.33
        break;
        case "d sharp": frequency = 310.08
        break;
        case "e": frequency = 331.11
        break;
        case "f": frequency = 348.83
        break;
        case "f sharp": frequency = 372.52
        break;
        case "g": frequency = 392.44
        break;
        case "g sharp": frequency = 413.42
        break;
        case "a": frequency = 441.49
        break;
        case "a sharp": frequency = 465.12
        break;
        case "b": frequency = 496.67
        break;
        case "c": frequency = 523.25
        break;
    }
    return frequency;

}
function soundStuff(){
    var found = false; // found means a long line is found
    var y = 0;
    var x = 0;
    capture.loadPixels();
    if (capture.pixels.length > 0) {
        if (previousPixels) {

            // cheap way to ignore duplicate frames
            if (same(previousPixels, capture.pixels, 4, width)) {
                return;
            }

            flow.calculate(previousPixels, capture.pixels, capture.width, capture.height);
        }
        previousPixels = copyImage(capture.pixels, previousPixels);
        image(capture, 0, 0, w, h);

        if (flow.flow && flow.flow.u != 0 && flow.flow.v != 0) {
            uMotionGraph.addSample(flow.flow.u);
            vMotionGraph.addSample(flow.flow.v);

            strokeWeight(2);
            flow.flow.zones.forEach(function (zone) {
                stroke(map(zone.u, -step, +step, 0, 255),
                       map(zone.v, -step, +step, 0, 255), 128);
                //line(zone.x, zone.y, zone.x + zone.u, zone.y + zone.v);
                var length = sqrt(zone.u*zone.u + zone.v*zone.v);
                //print(length)
                if (!found){
                    if (length > 16.0) {
                        y = h - zone.y
                        x = zone.x
                        found = true
                    }
                }

            })
        }

        noFill();
        stroke(255);

    }
    if(found){
        playNote(x,y);        

    }else{
        osc.amp(0, 12);
        playing = false;
    }
}

function addCircle(x, y){

    fill(255, 0, 0);
    var r = Math.floor(Math.random() * 255);
    var g = Math.floor(Math.random() * 255);
    var b = Math.floor(Math.random() * 255);
    var color = {'r':r, 'g':g, 'b':b, 'a':200}
    circles.push({'x':x,'y':y,'radius':64,'color':color})
}


function draw() {
    soundStuff();
    noStroke();
    var newCircles = [];
    var numCircles = circles.length
    for(var i = 0; i<numCircles; i++) {
        
        var color = circles[i].color;
        fill(color.r, color.g, color.b, color.a);

        ellipse(circles[i].x, h-circles[i].y, circles[i].radius, circles[i].radius);
        
        circles[i].color.a = circles[i].color.a - 8;
        circles[i].radius = circles[i].radius + 4;
        if(circles[i].color.a > 0){
            newCircles.push(circles[i])
        }
    }

    circles = newCircles;
    
}


