"use strict";

let autotune = false;
let exist = false;
let delay = false;
let selectedSound = null;

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

    if (delay == true){
      console.log("adding delay")
      selectedSound.addEffect(delay);
    }

    else if (delay == false){
      selectedSound.removeEffect(delay);
    }

    let oscillator = selectedSound;

    console.log("oscillator is  " + oscillator);
    // Get the theremin div from the html
    const theremin = document.getElementById("thereminZone");

    // Theremin plays when the mouse enters the theremin div
    theremin.addEventListener("mouseenter", function () {
        thereminOn(oscillator);
    });

    // Theremin is controlled while the mouse is inside the theremin div
    theremin.addEventListener("mousemove", function (e) {
        thereminControl(e, oscillator, theremin);
    });

    // Theremin stops when the mouse leaves the theremin div
    theremin.addEventListener("mouseleave", function () {
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

  selectedSound = sound;
  run();
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function myDelay(){
  var checkBox = document.getElementById("myDelay");
  var delay = new Pizzicato.Effects.Delay();
  if (checkBox.checked == true){
    delay = true;
  }
  else{
    delay = false;
  }
  run();
}





//window.onload = runAfterLoadingPage;
