# Code_Lit_Final_Proj
Final Project, Code Lit 2017

# Project Proposal
Wouldn't it be fun if you could play music through moving your hands through space? And then a screen could capture a beautiful image based on the sound you play? That was my initial idea for my Code Literacy final. I wanted to build a way for people to abstractly play music and create visual art while playing sound.

To do this, I drew inspiration from Memo Akten's Webcam Piano. However, isntead of using OSC (an oscillator that sends code to a keyboard), I planned to build my webcam piano by leveraging the application to create music. I would need to think through how a touch gesture would ignite a sound, and how to integrate sounds into an applicaion. I decided to use P5 Processing libraries for this, and subsequently leveraged the p5 DOM, Flow, and Sound Libraries to make my idea come to ife.

# Step 1: Adding Touch-Sensor Sound
I began my project through thinking throug the different aspects of the piano that I wanted to create. I decided to break up my end product into several pieces: 1) a touch sensor that would pick up finger movements / input through the camera; 2) sound from processing touch; and 3) introducing visuals for each sound / touch combination.

I worked off an existing Computer Visioning codebase from our class examples that gave me a base with camera capture logic to track edges and movements. I set out to use the Optical Flow file to lay the ground work for my project. Next, I would need to translate specific movements into sound.  

Once I had my baseline file, I began introducing sound through using the P5 Oscillator, code that creates a signal that oscillates between -1.0 and 1.0. (By default, the oscillation takes the form of a sinusoidal shape ('sine'). The frequency defaults to 440 oscillations per second (440Hz, equal to the pitch of an 'A' note).) I started with building a basic function that allowed me to click anywhere on the canvas and hear a sound. 

Now, I was ready to tweak the Optical Flow logic to integrate the sound playing logic. To do this, I set logic that would play sound whenever a long line was created through movement. Long line creation was part of the initial flow code -- I creaed a variable that was length to indicate the length of a movement. A long line indicates a great deal of movement, a type of movement that is most representative of what a finger movement would look like. The camera would pick up lots of movements, but only the most dramatic movements would create a long line, and only the longest lines would produce sound. Therefore, finger movements ended up creating sound.

To create the sound, I set up a few functions. I first created switch functions to convert a Y area into a note, and then a note into a sine frequency. The Y area represents a part of the canvas that would be associated to a different sound. The sound octave goes up and down, and different areas of the canvas represent different ntoes. I used the functions convertYtoNote and convertNotetoFrequency to first convert a section of the canvas to a note, and then convert a note to a sound frequency. Then I put this logic into a playSound function to bring it all together. The sound would essentially play wherever my finger hit (and where my invisible optical flow line is longest).

# Step 2: Adding Color Effects
Using the p5 reference library, I learned how to create a circle. I made an addCircle funciton, that would create circles with different RGB values that were generated randomly. I then uploaded this function into my playNote function so that circles appeared when sound was initiated.

I then created a new function called playNote that would add sound and circles together.

Tweaking the circle color and stlye was the fun part. I wanted the circles to disappear slowly after they were introduced. I also tweaked the color to only loop around blues and reds, and produce blue, pink, and purple circles. I initially had the colors random, but found the green and yellow colors offputting. Finally, I introduced a blue tint to create the cool color pallette of the webcam piano.

# Step 3: Adding Piano Notes
I wasn't pleased with the synthesizer sound of my project. The sinewave made all the noises sound like alien communication. I wanted something more music. I decided to introduce piano waveform files to create a more piano-y sound.

I found an octave's worth of waveform files, and uploaded them to Cloudinary, a file saving platform. I then preloaded those files into my sketch and tweaked the code to call the files, rather than create a signwave. The sound of the piano was too "clicky", meaning it started at a high volume with a lot of attack. I needed to edit this out - reduce the amount of attack - so I needed to lower the volume through other p5 code.

Through adding new lines of code - waveform.setVolume(0); waveform.setVolume(1, .25, .25); and waveform.setVolume(0, .25, .75); - I was able to alter the volume of each waveform file when it plays to reduce the "click-y" sound.

# Step 4: Creating a URL
Last, I uploaded my code to a gh-pages branch to enable me to display my project on a URL than anyone could access. I added some HTML formatting into the index file so that I could center the canvas and add a more ominous black background. Now, people who access my application can maximize the screen and be able to focus on only their image and music.
