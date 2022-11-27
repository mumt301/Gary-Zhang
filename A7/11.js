"use strict";

//var delay = new Pizzicato.Effects.Delay();
//var tremolo = new Pizzicato.Effects.Tremolo();
//var distortion = new Pizzicato.Effects.Distortion();

let minFreq = 220;
let maxFreq = 880;

function minfreqRange(){
  let slider = document.getElementById("minSlider");
  minFreq = Math.round(slider.value * 4.4);
  console.log("minFreq is " + minFreq);
}

function maxfreqRange(){
  let slider = document.getElementById("maxSlider");
  maxFreq = Math.round((slider.value * 4.4) + 660);
    console.log("maxFreq is " + maxFreq);
}



let autotune = false;

//sound1 and sound2 are used to turn off sounds when we select a new waveform
let sound1 = false;
let sound2 = false;
let selectedSound = Object.create(null);

//let delayOn = false;
//let tremoloOn = false;
//let distortionOn = false;


// Turn theremin on
function thereminOn(oscillator) {
    oscillator.play();
}

// Control the theremin
function thereminControl(e, oscillator, theremin) {
    let x = e.offsetX;
    let y = e.offsetY;
  //  console.log(x, y);

  //  let minFrequency = 220.0;
//    let maxFrequency = 880.0;
//    let freqRange = maxFrequency - minFrequency ;
    let freqRange = maxFreq - minFreq;
    let thereminFreq = minFreq + (x / theremin.clientWidth) * freqRange;
    let thereminVolume = (1.0 - (y / theremin.clientHeight))/4;

    let placeholder1 = document.getElementById("frequency");
    let placeholder2 = document.getElementById("note");

    if (autotune == false){
      console.log("Frequency: ", thereminFreq);
      oscillator.frequency = thereminFreq;
      console.log("Volume: ", thereminVolume);
      oscillator.volume = thereminVolume;

      let noteName = noteFromFrequency(thereminFreq);
      let midiNumber = frequencyToMidi(thereminFreq);

      placeholder1.innerHTML = `Frequency: ${thereminFreq.toFixed(2)}`;
      placeholder2.innerHTML = `Note: ${noteName}`;
    }

    //if auto-tune is true, then we round midiNumber to the nearest integer
    else{
      let midiNumber = frequencyToMidi(thereminFreq);
      midiNumber = Math.round(midiNumber);
      thereminFreq = midiToFrequency(midiNumber);
      console.log("Frequency: ", thereminFreq);
      oscillator.frequency = thereminFreq;
      console.log("Volume: ", thereminVolume);
      oscillator.volume = thereminVolume;

      let noteName = noteFromFrequency(thereminFreq);

      placeholder1.innerHTML = `Frequency: ${thereminFreq.toFixed(2)}`;
      placeholder2.innerHTML = `Note: ${noteName}`;
    }
}

// Turn theremin off
function thereminOff(oscillator) {
    oscillator.stop();
}

function run() {
    /*
    if (delayOn == true){
      console.log("adding delay")
      selectedSound.addEffect(delay);
    }

    else if (delayOn == false){
      console.log("removing delay");
      selectedSound.removeEffect(delay);
    }

    if (tremoloOn == true){
      console.log("adding tremolo")
      selectedSound.addEffect(tremolo);
    }

    else if (tremoloOn == false){
      console.log("removing tremolo");
      selectedSound.removeEffect(tremolo);
    }

    if (distortionOn == true){
      console.log("adding distortion")
      selectedSound.addEffect(distortion);
    }

    else if (distortionOn == false){
      console.log("removing distortion");
      selectedSound.removeEffect(distortion);
    }
    */



    let oscillator = selectedSound;
    console.log("oscillator is  " + oscillator);
    // Get the theremin div from the html
    const theremin = document.getElementById("thereminZone");

    // Theremin plays when the mouse enters the theremin div
    theremin.addEventListener("mouseenter", function () {

        //unhinged way of turning off sound when selecting a second waveform
        if (sound1 && sound2){
          console.log("sound1 and sound2");
          thereminOff(oscillator);
          oscillator = null;
          sound2 = false;       //do i even need this?
        }

        else{
          thereminOn(oscillator);
        }
    });

    // Theremin is controlled while the mouse is inside the theremin div
    theremin.addEventListener("mousemove", function (e) {

      //unhinged way of turning off sound when selecting a second waveform
      if (sound1 && sound2){
        console.log("sound1 and sound2");
        thereminOff(oscillator);
        oscillator = null;
        sound2 = false;
      }

      else{
          thereminControl(e, oscillator, theremin);
      }
    });

    // Theremin stops when the mouse leaves the theremin div
    theremin.addEventListener("mouseleave", function () {
      if (sound1 && sound2){
        oscillator = null;
        sound2 = false;
      }
        thereminOff(oscillator);
    });
}

function autoTune(){
  var checkBox = document.getElementById("myCheck");
  if (checkBox.checked == true){
    autotune = true;
    console.log("autotune is on" + autotune);
  }
  else{
    autotune = false;
    console.log("autotune is off" + autotune);
  }
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////

function selectWave(wave){
  let sound = new Pizzicato.Sound({
      source: 'wave',
      options: {
          type: wave,
          frequency: 220
      }
  });
  if (sound1 == false){
    sound1 = true;
  }
  else{
    sound2 = true;
  }
  selectedSound = sound;
  run();
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////














////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//THE EFFECTS ADDED TOGETHER REALLY HURTS MY EARS WHY???

/*
function myDelay(){
  var checkBox = document.getElementById("myDelay");
  if (checkBox.checked == true){
    console.log("delayOn is true");
    delayOn = true;
  }
  else{
    console.log("delayOn is false");
    delayOn = false;
  }

  if (sound1 == true){
    sound2 = true;
  }

  run();
}

function myTremolo(){
  var checkBox = document.getElementById("myTremolo");
  if (checkBox.checked == true){
    console.log("tremoloOn is true");
    tremoloOn = true;
  }
  else{
    console.log("tremoloOn is false");
    tremoloOn = false;
  }
  if (sound1 == true){
    sound2 = true;
  }
  run();
}

function myDistortion(){
  var checkBox = document.getElementById("myDistortion");
  if (checkBox.checked == true){
    console.log("distortionOn is true");
    distortionOn = true;
  }
  else{
    console.log("distortionOn is false");
    distortionOn = false;
  }
  if (sound1 == true){
    sound2 = true;
  }
  run();
}
*/

//window.onload = run();
