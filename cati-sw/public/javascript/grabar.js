var mic, recorder, soundFile;
var nowDate;

var state = 0; // mousePress will increment from Record, to Stop, to Play

function setup() {
    //createCanvas(400,400);
    //background(200);
    //fill(0);
    //text('Enable mic and click the mouse to begin recording', 20, 20);

    // create an audio in
    mic = new p5.AudioIn();

    // users must manually enable their browser microphone for recording to work properly!
    mic.start();

    // create a sound recorder
    recorder = new p5.SoundRecorder();

    // connect the mic to the recorder
    recorder.setInput(mic);

    // create an empty sound file that we will use to playback the recording
    soundFile = new p5.SoundFile();
    console.log("SETUP OK");
    document.getElementById("recordingMessage").innerHTML = "Haga click aqui para empezar una grabación";
}

function mousePressButton(){
    // use the '.enabled' boolean to make sure user enabled the mic (otherwise we'd record silence)
    var recordingMessage = document.getElementById("recordingMessage");
    var hiddenNumber = document.getElementById("hiddenNumber").value;
    var defaultCanvas0;
    if(defaultCanvas0 = document.getElementById("defaultCanvas0")){
        defaultCanvas0.remove();
    }
    if(!mic.enabled){
        recordingMessage.innerHTML = "Ha ocurrido un problema";
    }
    else if(state % 2 == 0 && mic.enabled){

        // Tell recorder to record to a p5.SoundFile which we will use for playback
        recorder.record(soundFile);

        background(255,0,0);
        //text('Recording now! Click to stop.', 20, 20);
        nowDate = getNowDate();
        console.log(getNowDate());
        console.log("RECORDING");
        state++;
        recordingMessage.innerHTML = "Grabando. Haga click para detener";
    }

    else if(state % 2 == 1){
        recorder.stop(); // stop recorder, and send the result to soundFile
        //background(0,255,0);
        console.log("STOPPED  AND SAVED... CLICK TO PLAY");
        saveSound(soundFile, nowDate + " - " + hiddenNumber + '.wav'); // save file
        //text('Recording stopped. Click to play & save', 20, 20);
        state++;
        recordingMessage.innerHTML = "Grabacion finalizada. Haga click aqui para empezar a grabar";
        console.log(state/2);
    }
/*
    else if(state === 2){
        //soundFile.play(); // play the result!
        console.log("SAVED ... CLICK TO RECORD");

        state++;
    }
    */
}
