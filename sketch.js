

// Canvas and Image Capture and Variables
var capture;
var previousPixels;
var flow;
var w = 640,
    h = 480;
var step = 480/20;
var uMotionGraph, vMotionGraph;

// Sound Variables
//var osc; // Use if using frequency synth
var playing = false;

var circles = [];

function setup() {
    // Canvas and Flow Se-up
    var canvas = createCanvas(w, h);
    canvas.parent("center-canvas");
    capture = createCapture(VIDEO);
    capture.hide();
    flow = new FlowCalculator(step);
    uMotionGraph = new Graph(100, -step / 2, +step / 2);
    vMotionGraph = new Graph(100, -step / 2, +step / 2);
    tint(0, 255, 208);

    // Use if using frequency synth
    // osc set-up
    // osc = new p5.Oscillator();
    // osc.setType('sine');
    // osc.amp(0);
    // osc.start();
}

function preload(){

    print("test")
    noteCSharp = loadSound("http://res.cloudinary.com/dnplskmo3/video/upload/v1512507648/68440__pinkyfinger__piano-c_gcsfxw.wav")
    noteD = loadSound("http://res.cloudinary.com/dnplskmo3/video/upload/v1512507647/68442__pinkyfinger__piano-d_ukf5yo.wav")
    noteDSharp = loadSound("http://res.cloudinary.com/dnplskmo3/video/upload/v1512507649/68444__pinkyfinger__piano-eb_cnohme.wav")
    noteE = loadSound("http://res.cloudinary.com/dnplskmo3/video/upload/v1512507649/68443__pinkyfinger__piano-e_vhqjov.wav")
    noteF = loadSound("http://res.cloudinary.com/dnplskmo3/video/upload/v1512507649/68446__pinkyfinger__piano-f_c7kk0s.wav")
    noteFSharp = loadSound("http://res.cloudinary.com/dnplskmo3/video/upload/v1512507648/68445__pinkyfinger__piano-f_a5lvi3.wav")
    noteG = loadSound("http://res.cloudinary.com/dnplskmo3/video/upload/v1512507649/68448__pinkyfinger__piano-g_wtzb7y.wav")
    noteGSharp = loadSound("http://res.cloudinary.com/dnplskmo3/video/upload/v1512507648/68447__pinkyfinger__piano-g_ku79fc.wav")
    noteA = loadSound("http://res.cloudinary.com/dnplskmo3/video/upload/v1512507646/68437__pinkyfinger__piano-a_gfqqwz.wav")
    noteASharp = loadSound("http://res.cloudinary.com/dnplskmo3/video/upload/v1512507648/68439__pinkyfinger__piano-bb_cnoe1m.wav")
    noteB = loadSound("http://res.cloudinary.com/dnplskmo3/video/upload/v1512507646/68438__pinkyfinger__piano-b_eh9cpq.wav")
    noteC = loadSound("http://res.cloudinary.com/dnplskmo3/video/upload/v1512507645/68441__pinkyfinger__piano-c_yqppot.wav")

}

function playNoteAndCircle(x, y){

    addCircle(x, y);
    playSound(y);
}

function playSound(y){

    // osc.amp(0.5, 1); //Use if using frequency synth
    var note = convertYToNote(y)
    var waveform = convertNoteToWaveform(note)
    waveform.setVolume(0);
    waveform.setVolume(1, .25, .25);
    waveform.setVolume(0, .25, .75);
    waveform.play();
    var freq = convertNoteToFrequency(note)
    print(note)
    // osc.freq(freq); //Use if using frequency synth
    // playing = true; //Use if using frequency synth

}

function convertYToNote(y){

    var note = "a";
    var rowHeight = h / 12
    var rowNumber = round(y/rowHeight)
    switch(rowNumber){
        case 0: note = "g sharp"
        break;
        case 1: note = "a"
        break;
        case 2: note = "a sharp"
        break;
        case 3: note = "b"
        break;
        case 4: note = "c"
        break;
        case 5: note = "c sharp"
        break;
        case 6: note = "d"
        break;
        case 7: note = "d sharp"
        break;
        case 8: note = "e"
        break;
        case 9: note = "f"
        break;
        case 10: note = "f sharp"
        break;
        case 11: note = "g"
        break;

    }
    return note;
}

function convertNoteToFrequency(note){

    var frequency = 441.49; //Standard A Note Tuning Fork
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
function convertNoteToWaveform(note){

    var waveform = noteA; //Standard A Note Tuning Fork
     switch(note){
        case "c sharp": waveform = noteCSharp
        break;
        case "d": waveform = noteD
        break;
        case "d sharp": waveform = noteDSharp
        break;
        case "e": waveform = noteE
        break;
        case "f": waveform = noteF
        break;
        case "f sharp": waveform = noteFSharp
        break;
        case "g": waveform = noteG
        break;
        case "g sharp": waveform = noteGSharp
        break;
        case "a": waveform = noteA
        break;
        case "a sharp": waveform = noteASharp
        break;
        case "b": waveform = noteB
        break;
        case "c": waveform = noteC
        break;
    }
    return waveform;

}
function processTouchInput(){ //Hacked code from Computer Visioning Template
    
    var found = false; // found means a long line is found
    var y = 0;
    var x = 0;
    capture.loadPixels();
    if (capture.pixels.length > 0) {
        if (previousPixels) {
            // Cheap way to ignore duplicate frames
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
                    if (length > 25.0) {
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
        playNoteAndCircle(x,y);        
    }else{
        // osc.amp(0, 12);
        // playing = false;
    }
}

function addCircle(x, y){

    fill(255, 0, 0);
    var r = Math.floor(Math.random() * 255);
    var g = 0;//Math.floor(Math.random() * 255);
    var b = 255/2 + Math.floor(Math.random() * 255/2);
    var color = {'r':r, 'g':g, 'b':b, 'a':200}
    circles.push({'x':x,'y':y,'radius':64,'color':color})
}


function draw() {
    processTouchInput();
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
