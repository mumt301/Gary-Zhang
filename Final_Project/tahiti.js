"use strict";

let notes = [{'C' : "sounds/xylo_c.wav"}]

function play1(){

    //create a synth and connect it to the main output (your speakers)
    const synth = new Tone.Synth().toDestination();

    let notes = ["G4", "E4", "G4", "E4", "G4", "E4","G4", "E4", "G4", "E4", "G4", "E4", "G4", "E4","G4", "E4",
                 "A4", "F4", "A4", "F4", "A4", "F4","A4", "F4", "A4", "F4", "A4", "F4", "A4", "F4","A4", "F4"];
    Tone.Transport.bpm.value = 120;

    // define a list of notes
  //  let notes = ["C4", "D4", "D#4", "F4", "G4", "Bb4", "C5", "D5", "Ab4", "Ab3"];

    let i = 0;
    const loop = new Tone.Loop(function (time) {
        // every single loop iteration, pick a new pitch from the list and play it
        synth.triggerAttackRelease(notes[i % notes.length], '32n', time);
        i++;
        console.log("i is " + i);
    }, "16n").start(0);

    Tone.Transport.start('+0.1');
    return loop;
}


function play2() {
    const synth = new Tone.Synth().toDestination();

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

}

/*function play3(){
  const sampler = new Tone.Sampler({
  	urls: {
  		"C4": "C4.mp3",
  		"D#4": "Ds4.mp3",
  		"F#4": "Fs4.mp3",
  		"A4": "A4.mp3",
  	},
  	release: 1,
  	baseUrl: "https://github.com/mumt301/Gary-Zhang/tree/main/Final_Project/sounds/",
  }).toDestination();

  Tone.loaded().then(() => {
  	sampler.triggerAttackRelease(["Eb4", "G4", "Bb4"], 4);
  })

}*/

/*function play3(){
  const synthA = new Tone.FMSynth().toDestination();
  const synthB = new Tone.AMSynth().toDestination();
  //play a note every quarter-note
  const loopA = new Tone.Loop(time => {
  	synthA.triggerAttackRelease("C2", "16n", time);
  }, "4n").start(0);
  //play another note every off quarter-note, by starting it "8n"
  const loopB = new Tone.Loop(time => {
  	synthB.triggerAttackRelease("C4", "16n", time);
  }, "4n").start("8n");
  // the loops start when the Transport is started
  Tone.Transport.start()
  // ramp up to 800 bpm over 10 seconds
  Tone.Transport.bpm.rampTo(800, 10);
}*/


function play3(){
  const synth = new Tone.Synth().toDestination();
/*  let notes =  ["A4", "A4", "A4", "G4", "F4",
                "F4", "F4", "F4", "A4", "G4",
                "C5", "C5", "C5", "A#4", "A4",
                "A4", "A4", "A4", "G4", "F4"];*/

  let notes =  [["A4", "A4", "A4", "G4", "F4"],
                ["F4", "F4", "F4", "A4", "G4"],
                ["C5", "C5", "C5", "A#4", "A4"],
                ["A4", "A4", "A4", "G4", "F4"]];

  let pattern = 0;

  Tone.Transport.bpm.value = 120;
  var seq = new Tone.Sequence(function(time, index){

    //if we are at the correct position on the score
    if ([2,3,5,6,8].indexOf(index) >=0){
      //get the current note index, which goes from 0 to 4
      var getNote = ([2,3,5,6,8].indexOf(index));

      console.log("getNote is index is " + getNote + " pattern is " + (pattern % 4) + " and its note is " + notes[pattern % 4][getNote]);
      synth.triggerAttackRelease(notes[pattern % 4][getNote], "16n", time);
    }

    //update which pattern to use
    if ([15].indexOf(index)>=0){
      pattern++;
    }

  }, [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15], "8n");

  Tone.Transport.start();
  seq.start();
}
