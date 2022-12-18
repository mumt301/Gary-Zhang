"use strict";

let notes = [{'C' : "sounds/xylo_c.wav"}]
//let notes = ["C4", "D4", "D#4", "F4", "G4", "Bb4", "C5", "D5", "Ab4", "Ab3"];

function play1(){

    //create a synth and connect it to the main output (your speakers)
//    const synth = new Tone.Synth().toDestination();

    // define a list of notes
    //let notes = ["C4", "D4", "D#4", "F4", "G4", "Bb4", "C5", "D5", "Ab4", "Ab3"];
    var c = new Pizzicato.Sound('sounds/xylo_c.wav', function(){
      c.play();
    });
  //  let d = new Pizzicato.Sound('sounds/xylo_d.wav');
//    let notes = [c,d];
//    notes.play();

    /*let i = 0;
    const loop = new Tone.Loop(function (time) {
        // every single loop iteration, pick a new pitch from the list and play it
        synth.triggerAttackRelease(notes[i % notes.length], '8n', time);
        i++;
    }, "8n").start(0);

    Tone.Transport.start();*/
//    return loop;
}

function play2(){
  var acousticGuitar = new Pizzicato.Sound('./audio/acoustic.wav', function() {
    // Sound loaded!
    acousticGuitar.play();
});
}
