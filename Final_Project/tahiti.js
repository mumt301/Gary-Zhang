"use strict";

function play1(){
  const player = new Tone.Player("https://tonejs.github.io/audio/berklee/hand_drum_.mp3").toDestination();
  Tone.loaded().then(() => {
  	player.start();
  });
}

function m1(){
  const melody = new Tone.Synth().toDestination();
  let notes1 =  [["A4", "A4", "A4", "G4", "F4"],
                ["F4", "F4", "F4", "A4", "G4"],
                ["C5", "C5", "C5", "A#4", "A4"],
                ["A4", "A4", "A4", "G4", "F4"]];
  let pattern = 0;
  Tone.Transport.bpm.value = 170;
  var seq = new Tone.Sequence(function(time, index){

    //if we are at the correct position on the melody score
    if ([2,3,5,6,8].indexOf(index) >=0){
      //get the current note index, which goes from 0 to 4
      var getNote = ([2,3,5,6,8].indexOf(index));
      melody.triggerAttackRelease(notes1[pattern % 4][getNote], "16n", time);

      melody.volume.value = -5;

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

function b1(){
    const bass = new Tone.AMSynth().toDestination();
    let notes2 = [["F2"],
                  ["D2"],
                  ["G2"],
                  ["C2"]];
    let pattern = 0;

    Tone.Transport.bpm.value = 170;
    var seq = new Tone.Sequence(function(time, index){
      //bass pattern
      if ([0].indexOf(index) >=0){
        var getNote = ([0].indexOf(index));
        bass.triggerAttackRelease(notes2[pattern % 4][getNote]);
        bass.volume.value = -8;
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


function d1(){

  const drum = new Tone.Player("https://tonejs.github.io/audio/berklee/hand_drum_.mp3").toDestination();
  let pattern = 0;

  Tone.Transport.bpm.value = 170;
  var seq = new Tone.Sequence(function(time, index){
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
  const colors = ["white", "green"];
  let index = 0;

  //im running out of variable names...
  let alpha1 = 0;
  let alpha2 = 0;
  let alpha3 = 0;
  let beta1 = 0;
  let beta2 = 0;
  let beta3 = 0;
  let sigma1 = 0;
  let sigma2 = 0;
  let sigma3 = 0;

  const melody1 = document.getElementById("melody1");
  const bass1 = document.getElementById("bass1");
  const drum1 = document.getElementById("drum1");

  const sequence = document.getElementById("sequence");
  let loop = null;

  toggle.addEventListener("click", function(){
    console.log("WE ARE TOGGLING");
    toggle.style.backgroundColor = "green"
    index++;

    if (index > 1){
      location.reload();
    }
  });

  melody1.addEventListener("click", async() => {
   if (melody1.checked){
     console.log("We are on!");
     alpha1++;
     console.log("alpha1 is " + alpha1);
   }
   else{
     console.log("Turned off!");
     alpha1--;
     console.log("alpha1 is " + alpha1);
   }
 });

  bass1.addEventListener("click", async() => {
    if (bass1.checked){
      console.log("We are on!");
      beta1++;
      console.log("beta1 is " + beta1);
    }
    else{
      console.log("Turned off!");
      beta1--;
      console.log("bass1 is " + beta1);
    }
 });

  drum1.addEventListener("click", async() => {
    if (drum1.checked){
      console.log("We are on!");
      sigma1++;
      console.log("sigma1 is " + sigma1);
    }
    else{
      console.log("Turned off!");
      sigma1--;
      console.log("sigma1 is " + sigma1);
    }
 });

 /*var reverb = document.getElementById("reverb");
 reverbSlider.oninput = function(){
     value1 = slider1.value;
     if (reverb.checked){
       console.log("reverb value is " + value1);
     }
     else {
       console.log("reverb is not checked");
     }
   }*/
}

window.onload = runAfterLoadingPage;
