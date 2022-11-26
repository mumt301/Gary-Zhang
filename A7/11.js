"use strict";

let autotune = false;

// Turn theremin on
function thereminOn(oscillator) {
    oscillator.play();
}

// Control the theremin
function thereminControl(e, oscillator, theremin) {
    let x = e.offsetX;
    let y = e.offsetY;
    console.log(x, y);

    let minFrequency = 220.0;
    let maxFrequency = 880.0;
    let freqRange = maxFrequency - minFrequency;
    let thereminFreq = minFrequency + (x / theremin.clientWidth) * freqRange;
    let thereminVolume = 1.0 - (y / theremin.clientHeight);

    if (autotune == false){
      console.log("Frequency: ", thereminFreq);
      oscillator.frequency = thereminFreq;
      console.log("Volume: ", thereminVolume);
      oscillator.volume = thereminVolume;
    }

    else{
      let midiNumber = frequencyToMidi(thereminFreq);
      midiNumber = Math.round(midiNumber);
      thereminFreq = midiToFrequency(midiNumber);
      console.log("Frequency: ", thereminFreq)
      oscillator.frequency = thereminFreq;
      console.log("Volume: ", thereminVolume);
      oscillator.volume = thereminVolume;
    }
}

// Turn theremin off
function thereminOff(oscillator) {
    oscillator.stop();
}

function runAfterLoadingPage() {
    // Instantiate a sine wave with pizzicato.js
    const oscillator = new Pizzicato.Sound({
        source: 'wave',
        options: {
            type: "sine",
            frequency: 220
        }
    });

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
  //  runAfterLoadingPage()

  //  let midiNumber = frequencyToMidi(oscillator.frequency);
  //  console.log("midiNumber is " + midiNumber);
  }
  else{
    autotune = false;
    console.log("autotune is off" + autotune);
  //  runAfterLoadingPage();
  }
}

window.onload = runAfterLoadingPage;
