"use strict";

var value1 = 20;
var value2 = 20;


function play1(){
  const player = new Tone.Player("https://tonejs.github.io/audio/berklee/hand_drum_.mp3").toDestination();
  Tone.loaded().then(() => {
  	player.start();
  });
}


/*function play2() {

    const synth = new Tone.Synth().toDestination();

    var freeverb = new Tone.Freeverb(0.4).toDestination();
  //  freeverb.dampening.value = 0;
    synth.connect(freeverb);

    // this time also define a list of durations
    let notes = ["C4", "D4", "D#4", "F4", "G4", "Bb4", "C5", "D5", "Ab4", "Ab3"];
    let durations = ["8n", "8n", "8n", "16n", "16n"];

    //
    let i = 0;
    const loop = new Tone.Loop(function (time) {
        // every single loop iteration, pick a new duration from the list and set the loop's timer to it
        this.interval = durations[i % durations.length];
        synth.triggerAttackRelease(notes[i % notes.length], '8n', time);
        i++;
        console.log("i is " + i);
    }, "8n").start(0);

    Tone.Transport.start();
    return loop;

}*/

function play2(){
  const player = new Tone.Player({
	url: "https://tonejs.github.io/audio/drum-samples/loops/ominous.mp3",
	autostart: true,
});
const filter = new Tone.Filter(0, 'highpass').toDestination();
//const feedbackDelay = new Tone.FeedbackDelay(0.125, 0.5).toDestination();

// connect the player to the feedback delay and filter in parallel
player.connect(filter);
//player.connect(feedbackDelay);
}



function play3(){
  const melody = new Tone.Synth().toDestination();
  const bass = new Tone.AMSynth().toDestination();
  const drum = new Tone.Player("https://tonejs.github.io/audio/berklee/hand_drum_.mp3").toDestination();

  let notes1 =  [["A4", "A4", "A4", "G4", "F4"],
                ["F4", "F4", "F4", "A4", "G4"],
                ["C5", "C5", "C5", "A#4", "A4"],
                ["A4", "A4", "A4", "G4", "F4"]];

  let notes2 = [["F2"],
                ["D2"],
                ["G2"],
                ["C2"]];

  let pattern = 0;

  Tone.Transport.bpm.value = 170;
  var seq = new Tone.Sequence(function(time, index){

    //if we are at the correct position on the melody score
    if ([2,3,5,6,8].indexOf(index) >=0){
      //get the current note index, which goes from 0 to 4
      var getNote = ([2,3,5,6,8].indexOf(index));

      console.log("getNote is index is " + getNote + " pattern is " + (pattern % 4) + " and its note is " + notes1[pattern % 4][getNote]);
      melody.triggerAttackRelease(notes1[pattern % 4][getNote], "16n", time);
      melody.volume.value = -5;
    }

    //bass pattern
    if ([0].indexOf(index) >=0){
      var getNote = ([0].indexOf(index));
      bass.triggerAttackRelease(notes2[pattern % 4][getNote]);
      bass.volume.value = -8;
    }

    if ([0,1,4,8,9,12].indexOf(index) >=0){
      drum.start();
      drum.volume.value = -7;
    }

    //update which pattern to use
    if ([15].indexOf(index)>=0){
      pattern++;
    }
  }, [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15], "8n");

  Tone.Transport.start('+0.2');
  seq.start();
  return seq;
}

function runAfterLoadingPage(){

  //get all relevant divs from the html
  const toggle = document.getElementById("toggle");
  const colors = ["green", "white"];
  let index = 0;

  const music1 = document.getElementById("pattern1");
  const music2 = document.getElementById("pattern2");
  const music3 = document.getElementById("pattern3");
  const sequence = document.getElementById("sequence");
  let loop = null;

  var reverb = document.getElementById("reverb");
  var delay = document.getElementById("delay");

  var slider1 = document.getElementById("reverbSlider");
  var slider2 = document.getElementById("delaySlider");

  toggle.addEventListener("click", function(){
    console.log("WE ARE TOGGLING");
    toggle.style.backgroundColor = colors[index%2];
    index++;

    if (index%2 == 1){
      console.log("We are on!");

    }
  });


  music1.addEventListener("click", async() => {
    await Tone.start();
    loop = play1();
  });

  music2.addEventListener("click", async() => {
    await Tone.start();
    loop = play2();
  });

  music3.addEventListener("click", async() => {
    await Tone.start();
    loop = play3();
  });

  sequence.addEventListener('click', async () => {
        loop.stop();
        loop = null;
        console.log("we stopped, loop is now " + loop);
  });

  reverbSlider.oninput = function(){
    value1 = slider1.value;
    if (reverb.checked){
      console.log("reverb value is " + value1);
    }
    else {
      console.log("reverb is not checked");
    }
  }

  delaySlider.oninput = function(){
    value2 = slider2.value;
    if (delay.checked){
      console.log("delay value is " + value2);
    }
    else {
      console.log("delay is not checked");
    }
  }


}

window.onload = runAfterLoadingPage;
