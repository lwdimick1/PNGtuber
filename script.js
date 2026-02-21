const avatar = document.getElementById("avatar");

// Ask for microphone access
navigator.mediaDevices.getUserMedia({ audio: true })
  .then(stream => {
    // Create AudioContext (Safari compatible)
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const source = audioContext.createMediaStreamSource(stream);
    const analyser = audioContext.createAnalyser();
    source.connect(analyser);

    // Set up data array for audio samples
    analyser.fftSize = 1024;
    const dataArray = new Uint8Array(analyser.fftSize);

    function update() {
      analyser.getByteTimeDomainData(dataArray);

      // Compute simple RMS (volume)
      let sum = 0;
      for (let i = 0; i < dataArray.length; i++) {
        const v = (dataArray[i] - 128) / 128; // -1 to 1
        sum += v * v;
      }
      const rms = Math.sqrt(sum / dataArray.length);

      // Threshold: adjust to your microphone / environment
      if (rms > 0.02) {
        avatar.src = "talk.png"; // mouth opens
      } else {
        avatar.src = "idle.png"; // mouth closes
      }

      requestAnimationFrame(update); // smooth continuous update
    }

    update();
  })
  .catch(err => console.error("Microphone access error:", err));
