{\rtf1\ansi\ansicpg1252\cocoartf2868
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 const avatar = document.getElementById("avatar");\
const sensitivitySlider = document.getElementById("sensitivity");\
\
let audioContext;\
let analyser;\
let dataArray;\
let sensitivity = 20;\
\
sensitivitySlider.addEventListener("input", () => \{\
  sensitivity = sensitivitySlider.value;\
\});\
\
async function setupMic() \{\
  const stream = await navigator.mediaDevices.getUserMedia(\{ audio: true \});\
  audioContext = new AudioContext();\
  const source = audioContext.createMediaStreamSource(stream);\
\
  analyser = audioContext.createAnalyser();\
  analyser.fftSize = 512;\
\
  const bufferLength = analyser.frequencyBinCount;\
  dataArray = new Uint8Array(bufferLength);\
\
  source.connect(analyser);\
\
  monitorAudio();\
\}\
\
function monitorAudio() \{\
  requestAnimationFrame(monitorAudio);\
\
  analyser.getByteFrequencyData(dataArray);\
\
  let volume = dataArray.reduce((a, b) => a + b) / dataArray.length;\
\
  if (volume > sensitivity) \{\
    avatar.src = "talk.png";\
  \} else \{\
    avatar.src = "idle.png";\
  \}\
\}\
\
setupMic();}