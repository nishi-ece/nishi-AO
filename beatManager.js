export async function setupBeatManager(audioUrl, onBeatCallback) {
    const context = new AudioContext();
    const res = await fetch(audioUrl);
    const arrayBuffer = await res.arrayBuffer();
    const audioBuffer = await context.decodeAudioData(arrayBuffer);
    const source = context.createBufferSource();
    source.buffer = audioBuffer;
  
    const analyser = context.createAnalyser();
    const gain = context.createGain();
    gain.gain.value = 0.6;
  
    const scriptProcessor = context.createScriptProcessor(2048, 1, 1);
  
    source.connect(analyser);
    analyser.connect(scriptProcessor);
    scriptProcessor.connect(context.destination);
    source.connect(gain);
    gain.connect(context.destination);
  
    const data = new Uint8Array(analyser.frequencyBinCount);
    let beatHoldTime = 30, beatDecayRate = 0.98, beatMin = 0.15;
    let beatCutOff = 0, beatTime = 0;
  
    function detectBeat() {
      analyser.getByteFrequencyData(data);
      let sum = 0;
      for (let i = 0; i < data.length; i++) {
        sum += data[i];
      }
      let average = sum / data.length / 256;
  
      if (average > beatCutOff && average > beatMin) {
        beatCutOff = average * 1.1;
        beatTime = 0;
        onBeatCallback();
      } else {
        if (beatTime <= beatHoldTime) {
          beatTime++;
        } else {
          beatCutOff *= beatDecayRate;
          beatCutOff = Math.max(beatCutOff, beatMin);
        }
      }
    }
  
    scriptProcessor.onaudioprocess = detectBeat;
  
    source.start();
    return context;
  }
  