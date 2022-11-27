"use strict";

var delay = new Pizzicato.Effects.Delay();

let autotune = false;

//sound1 and sound2 are used to turn off sounds when we select a new waveform
let sound1 = false;
let sound2 = false;
let selectedSound = Object.create(null);

let delayOn = false;


// Turn theremin on
function thereminOn(oscillator) {
    oscillator.play();
}

// Control the theremin
function thereminControl(e, oscillator, theremin) {
    let x = e.offsetX;
    let y = e.offsetY;
  //  console.log(x, y);

    let minFrequency = 220.0;
    let maxFrequency = 880.0;
    let freqRange = maxFrequency - minFrequency;
    let thereminFreq = minFrequency + (x / theremin.clientWidth) * freqRange;
    let thereminVolume = 1.0 - (y / theremin.clientHeight);

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

    if (delayOn == true){
      console.log("adding delay")
      selectedSound.addEffect(delay);
    }

    else if (delayOn == false){
      console.log("removing delay");
      selectedSound.removeEffect(delay);
    }

    let oscillator = selectedSound;
    console.log("oscillator is  " + oscillator);
    // Get the theremin div from the html
    const theremin = document.getElementById("thereminZone");

    // Theremin plays when the mouse enters the theremin div
    theremin.addEventListener("mouseenter", function () {

        if (sound1 && sound2){
          console.log("sound1 and sound2");
          thereminOff(oscillator);
          oscillator = null;
          sound2 = false;
          return;
        }

        else{
          thereminOn(oscillator);
        }
    });

    // Theremin is controlled while the mouse is inside the theremin div
    theremin.addEventListener("mousemove", function (e) {
        thereminControl(e, oscillator, theremin);
    });

    // Theremin stops when the mouse leaves the theremin div
    theremin.addEventListener("mouseleave", function () {
        thereminOff(oscillator);
    });

    //if there already exists a sound, then we turn this one off.
//    if (exist == false){
//      console.log("exist is false")
//      theremin.addEventListener("mouseenter", function () {
//          thereminOff(oscillator);
//      });

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
//  run();
}


//window.onload = run();
