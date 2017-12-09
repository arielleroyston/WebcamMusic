# Code_Lit_Final_Proj
Final Project, Code Lit 2017

# Project Proposal
Wouldn't it be fun if you could play music in mid-air? And then a screen could capture a beautiful image based on the sound you play? That was my initial idea for my Code Literacy final. I wanted to build a way for people to abstractly play music and create visual art while they did that.

To do this, I drew inspiration from XX's Webcam Piano. However, isntead of using OSC (an oscillator that sends code off to a keyboard), I would be building all of the music interpretations in my application. I would need to think through how a touch gesture would kick off a sound, and how to integrate sounds into an applicaion. I will be using P5 Processing software for this, and subsequently will be leveraging the p5 DOM, Flow, and Sound Libraries to make my idea come to ife.

# Step 1: Adding Touch-Sensor Sound
I began my project through thinking throug the different aspects of the piano that I wanted to create. I decided to break up my end product into several pieces: 1) a touch sensor that would pick up finger movements through the camera; 2) sound cues from touch; and 3) introducing visuals for each sound / touch combination.

I decided to leverage existing Computer Visioning code from our class examples to introduce the camera capture logic to track edges and movements. I set out to use the Optical Flow file to lay the ground work for my project. However, I didn't yet do anything to the movements to create sound. 

Once I had my baseline file, I began introducing sound through using the P5 Oscillator, code that creates a signal that oscillates between -1.0 and 1.0. (By default, the oscillation takes the form of a sinusoidal shape ('sine'). The frequency defaults to 440 oscillations per second (440Hz, equal to the pitch of an 'A' note).) I started with building a basic function that allowed me to click anywhere on the canvas and hear a sound. 

Now, I was ready to tweak the Optical Flow logic to integrate the sound playing logic. To do this, I set logic that would tee off sound whenever a long line was created through movement. The long line indicates a great deal of movement, a type of movement that is most representative of what a finger movement would look like (i.e. the camera picks up all sorts of movmeents, but by setting sound to trigger only when sweeping movmeents are made, we could assign large finger movements to play a sound.

To create the sound, I set up a few functions to help me out. I first created switch functions to convert a Y area into a note, and then a note into a sine frequency. Functiosn were convertYtoNote and convertNotetoFrequency respectively. Then I put this logic into a playSound function to bring it all together. The sound would essentially play wherever my finger hit (and where my invisible optical flow line is longest).

# Step 2: Adding Color Effects
Using the p5 reference library, I learned how to create a circle. I made an addCircle funciton, that would create circles with different RGB values that were generated randomly. I then uploaded this function into my playNote function so that circles appeared when sound was initiated.

I then created a new function called playNote that would add sound and circles together.

# Step 3: Adding Piano Notes
I wasn't pleased with the synthesizer sound of my project. The sinewave made all the noises sound like alien communication. I wanted something more music. I decided to introduce piano waveform files to create a more piano-y sound.

I found an octave's worth of waveform files, and uploaded them to Cloudinary, a file saving platform. I then preloaded those files into my sketch and tweaked the code to call the files, rather than create a signwave. The sound of the piano was too "clicky", meaning it started at a high volume with a lot of attack. I needed to edit this out - reduce the amount of attack - so I needed to lower the volume through other p5 code.

Through adding new lines of code - waveform.setVolume(0); waveform.setVolume(1, .25, .25); and waveform.setVolume(0, .25, .75); - I was able to alter the volume of each waveform file when it plays to reduce the "click-y" sound.

# Step 4: Creating a URL
Last, I uploaded my code to a gh-pages branch to enable me to display my project on a URL than anyone could access. I added some HTML formatting into the index file so that I could center the canvas and add a more ominous black background. Now, people who access my application can maximize the screen and be able to focus on only their image and music.
