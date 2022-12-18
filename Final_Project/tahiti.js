"use strict";

function play1(){
  const player = new Tone.Player("https://tonejs.github.io/audio/berklee/hand_drum_.mp3").toDestination();
  Tone.loaded().then(() => {
  	player.start();
  });
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
    }

    //update which pattern to use
    if ([15].indexOf(index)>=0){
      pattern++;
    }
  }, [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15], "8n");

  Tone.Transport.start('+0.5');
  seq.start();
  return seq;
}

function runAfterLoadingPage(){

  //get all relevant divs from the html
  const music2 = document.getElementById("pattern2");
  const sequence = document.getElementById("sequence");
  let loop = null;

  music2.addEventListener("click", async() => {
    await Tone.start();
    loop = play2();
    console.log("hello");
  });

  sequence.addEventListener('click', async () => {
        loop.stop();
        console.log("we stopped, loop is now " + loop);
  });


}

window.onload = runAfterLoadingPage;
