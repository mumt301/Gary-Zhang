"use strict";

function m1(){
  const melody = new Tone.Synth().toDestination();
  let notes1 =  [["A4", "A4", "A4", "G4", "F4"],
                ["F4", "F4", "F4", "E4", "D4"],
                ["A#4", "A#4", "A#4", "A4","G4"],
                ["G4", "G4", "G4", "F4", "E4"]];
  let pattern = 0;
  Tone.Transport.bpm.value = 170;
  var seq = new Tone.Sequence(function(time, index){

    //if we are at the correct position on the melody score
    if ([2,3,5,6,8].indexOf(index) >=0){
      //get the current note index, which goes from 0 to 4
      var getNote = ([2,3,5,6,8].indexOf(index));
      melody.triggerAttackRelease(notes1[pattern % 4][getNote], "16n", time);

      melody.volume.value = -7;

    }
    //update which pattern to use
    if ([15].indexOf(index)>=0){
      pattern++;
    }
  }, [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15], "8n");

  Tone.Transport.start('+0.2');
  seq.start();
}

function m2(){
  const melody = new Tone.Synth().toDestination();
  let notes1 =  [["A5", "A5", "A5", "G5","F5"],
                ["F5", "F5", "F5", "E5","D5"],
                ["A#5", "A#5", "A#5","A5","G5"],
                ["G5", "G5", "G5", "F5","E5"]];
  let pattern = 0;
  Tone.Transport.bpm.value = 170;
  var seq = new Tone.Sequence(function(time, index){

    //if we are at the correct position on the melody score
    if ([8,9,11,12,14].indexOf(index) >=0){
      //get the current note index, which goes from 0 to 4
      var getNote = ([8,9,11,12,14].indexOf(index));
      melody.triggerAttackRelease(notes1[pattern % 4][getNote], "16n", time);

      melody.volume.value = -10;

    }
    //update which pattern to use
    if ([15].indexOf(index)>=0){
      pattern++;
    }
  }, [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15], "8n");

  Tone.Transport.start('+0.2');
  seq.start();
}

function m3(){
  const melody = new Tone.Synth().toDestination();
  let notes1 =  [["F4","A5","G5","F5","A4","F4","A5","G5","F5","A4"],
                ["D4", "F5", "E5", "D5","A4","D4", "F5", "E5","D5","D4"],
                ["G4", "A#5", "A5", "G5","A#4","G4","A#5","A5","G5","G4"],
                ["C4","G5","F5","E5","G4","C4","G5","F5","E5","C4"]];
  let pattern = 0;
  Tone.Transport.bpm.value = 170;
  var seq = new Tone.Sequence(function(time, index){

    //if we are at the correct position on the melody score
    if ([0,2,3,4,6,8,10,11,12,14].indexOf(index) >=0){
      //get the current note index, which goes from 0 to 4
      var getNote = ([0,2,3,4,6,8,10,11,12,14].indexOf(index));
      melody.triggerAttackRelease(notes1[pattern % 4][getNote], "16n", time);

      melody.volume.value = -10;

    }
    //update which pattern to use
    if ([15].indexOf(index)>=0){
      pattern++;
    }
  }, [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15], "8n");

  Tone.Transport.start('+0.2');
  seq.start();
}





function b1(){
    const bass = new Tone.FMSynth().toDestination();
    let notes2 = [["F3","F3","F3","F3","A3"],
                  ["D3","D3","D3","D3"],
                  ["G3","G3","G3","G3","A#3"],
                  ["C3","C3","C3","C3"]];
    let pattern = 0;

    Tone.Transport.bpm.value = 170;
    var seq = new Tone.Sequence(function(time, index){
      //bass pattern
      if ([0,2,8,10,12].indexOf(index) >=0){
        var getNote = ([0,2,8,10,12].indexOf(index));
        bass.triggerAttackRelease(notes2[pattern % 4][getNote], "8n", time);
        bass.volume.value = -12;
      }
      //update which pattern to use
      if ([15].indexOf(index)>=0){
        pattern++;
      }
    }, [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15], "8n");

    Tone.Transport.start('+0.2');
    seq.start();
}

function b2(){
    const bass = new Tone.FMSynth().toDestination();
    let notes2 = [["A3","A3","A3","A3"],
                  ["A3","A3","A3","A3"],
                  ["A#3","A#3","A#3","A#3"],
                  ["E3","E3","E3","E3"]];
    let pattern = 0;

    Tone.Transport.bpm.value = 170;
    var seq = new Tone.Sequence(function(time, index){
      //bass pattern
      if ([2,6,10,14].indexOf(index) >=0){
        var getNote = ([2,6,10,14].indexOf(index));
        bass.triggerAttackRelease(notes2[pattern % 4][getNote], "8n", time);
        bass.volume.value = -12;
      }
      //update which pattern to use
      if ([15].indexOf(index)>=0){
        pattern++;
      }
    }, [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15], "8n");

    Tone.Transport.start('+0.2');
    seq.start();
}

function b3(){

    const filter = new Tone.Filter(100, 'lowpass').toDestination();
    const bass = new Tone.FMSynth().toDestination().connect(filter);

    let notes2 = [["F3"],
                  ["D3"],
                  ["G3"],
                  ["C3"]];
    let pattern = 0;

    Tone.Transport.bpm.value = 170;
    var seq = new Tone.Sequence(function(time, index){
      //bass pattern
      if ([0].indexOf(index) >=0){
        var getNote = ([0].indexOf(index));
        bass.triggerAttackRelease(notes2[pattern % 4][getNote]);
        bass.volume.value = -14;
      }

      //update which pattern to use
      if ([15].indexOf(index)>=0){
        pattern++;
      }
    }, [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15], "8n");

    Tone.Transport.start('+0.2');
    seq.start();
}

function d1(){

  const drum = new Tone.Player("https://tonejs.github.io/audio/berklee/goat_hoof_2.mp3").toDestination();
  let pattern = 0;

  Tone.Transport.bpm.value = 170;
  var seq = new Tone.Sequence(function(time, index){
    if ([0,8].indexOf(index) >=0){
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
}

function d2(){

  const drum = new Tone.Player("https://tonejs.github.io/audio/berklee/coocoo_flute1.mp3").toDestination();
  let pattern = 0;

  Tone.Transport.bpm.value = 170;
  var seq = new Tone.Sequence(function(time, index){
    if ([0].indexOf(index) >=0 && pattern%4 == 2){
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
}

function d3(){

  const drum = new Tone.Player("https://tonejs.github.io/audio/berklee/anklung_scale_1.mp3").toDestination();
  let pattern = 0;

  Tone.Transport.bpm.value = 170;
  var seq = new Tone.Sequence(function(time, index){
    if ([0].indexOf(index) >=0 && (pattern%4 == 1 || pattern%4 == 3)){
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
  const melody2 = document.getElementById("melody2");
  const melody3 = document.getElementById("melody3");
  const bass1 = document.getElementById("bass1");
  const bass2 = document.getElementById("bass2");
  const bass3 = document.getElementById("bass3");
  const drum1 = document.getElementById("drum1");
  const drum2 = document.getElementById("drum2");
  const drum3 = document.getElementById("drum3");

  toggle.addEventListener("click", function(){
    console.log("WE ARE TOGGLING");
    toggle.style.backgroundColor = "green"
    index++;

    if (alpha1 > 0){
      m1();
    }

    if (alpha2 > 0){
      m2();
    }

    if (alpha3 > 0){
      m3();
    }

    if (beta1 > 0){
      b1();
    }

    if (beta2 > 0){
      b2();
    }

    if (beta3 > 0){
      b3();
    }

    if (sigma1 > 0){
      d1();
    }

    if (sigma2 > 0){
      d2();
    }

    if (sigma3 > 0){
      d3();
    }

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

 melody2.addEventListener("click", async() => {
  if (melody2.checked){
    console.log("We are on!");
    alpha2++;
    console.log("alpha2 is " + alpha2);
  }
  else{
    console.log("Turned off!");
    alpha2--;
    console.log("alpha2 is " + alpha2);
  }
});
  melody3.addEventListener("click", async() => {
   if (melody3.checked){
     console.log("We are on!");
     alpha3++;
     console.log("alpha3 is " + alpha3);
   }
   else{
     console.log("Turned off!");
     alpha3--;
     console.log("alpha3 is " + alpha3);
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

   bass2.addEventListener("click", async() => {
     if (bass2.checked){
       console.log("We are on!");
       beta2++;
       console.log("beta2 is " + beta2);
     }
     else{
       console.log("Turned off!");
       beta2--;
       console.log("bass2 is " + beta2);
     }
  });

    bass3.addEventListener("click", async() => {
      if (bass3.checked){
        console.log("We are on!");
        beta3++;
        console.log("beta3 is " + beta3);
      }
      else{
        console.log("Turned off!");
        beta3--;
        console.log("beta3 is " + beta3);
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
   drum2.addEventListener("click", async() => {
     if (drum2.checked){
       console.log("We are on!");
       sigma2++;
       console.log("sigma2 is " + sigma2);
     }
     else{
       console.log("Turned off!");
       sigma2--;
       console.log("sigma2 is " + sigma2);
     }
  });
    drum3.addEventListener("click", async() => {
      if (drum3.checked){
        console.log("We are on!");
        sigma3++;
        console.log("sigma3 is currently" + sigma3);
      }
      else{
        console.log("Turned off!");
        sigma3--;
        console.log("sigma3 is currently" + sigma3);
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
