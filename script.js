const avatar = document.getElementById("avatar");

navigator.mediaDevices.getUserMedia({ audio: true })
  .then(stream => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const source = audioContext.createMediaStreamSource(stream);
    const analyser = audioContext.createAnalyser();
    source.connect(analyser);

    const dataArray = new Uint8Array(analyser.fftSize);

    function update() {
      analyser.getByteTimeDomainData(dataArray);

      let sum = 0;
      for (let i = 0; i < dataArray.length; i++) {
        const v = (dataArray[i] - 128) / 128;
        sum += v * v;
      }
      const rms = Math.sqrt(sum / dataArray.length);

      // Adjust threshold as needed
      if (rms > 0.02) {
        avatar.src = "talk.png";
      } else {
        avatar.src = "idle.png";
      }

      requestAnimationFrame(update);
    }

    update();
  })
  .catch(err => console.error("Microphone access error:", err));
