"use strict";

var value1 = 20;
var value2 = 20;


function play1(){
  const player = new Tone.Player("https://tonejs.github.io/audio/berklee/hand_drum_.mp3").toDestination();
  Tone.loaded().then(() => {
  	player.start();
  });
}


function play2(){
  const player = new Tone.Player({
	url: "https://tonejs.github.io/audio/drum-samples/loops/ominous.mp3",
	autostart: true,
});
const filter = new Tone.Filter(400, 'lowpass').toDestination();
const feedbackDelay = new Tone.FeedbackDelay(0.125, 0.5).toDestination();

// connect the player to the feedback delay and filter in parallel
player.connect(filter);
player.connect(feedbackDelay);
}



function play3(){
  const filter = new Tone.Filter(200, 'lowpass').toDestination();
  const feedbackDelay = new Tone.FeedbackDelay(0.5, 0.7).toDestination();

  const melody = new Tone.Synth().toDestination();
  const bass = new Tone.AMSynth().toDestination();
  const drum = new Tone.Player("https://tonejs.github.io/audio/berklee/hand_drum_.mp3").toDestination();


  bass.connect(filter);
  bass.connect(feedbackDelay);

  drum.connect(feedbackDelay);
  drum.connect(filter);

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

      melody.connect(filter);
      melody.connect(feedbackDelay);
      melody.triggerAttackRelease(notes1[pattern % 4][getNote], "16n", time);

      melody.volume.value = -5;

    }

    //bass pattern
    if ([0].indexOf(index) >=0){
      var getNote = ([0].indexOf(index));
      bass.connect(filter);
      bass.connect(feedbackDelay);
      bass.triggerAttackRelease(notes2[pattern % 4][getNote]);
      bass.volume.value = -8;
    }

    if ([0,1,4,8,9,12].indexOf(index) >=0){
      drum.connect(feedbackDelay);
      drum.connect(filter);
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
