const avatar = document.getElementById("avatar");

// For testing: just switch images every 1 second
setInterval(() => {
  if (avatar.src.includes("idle.png")) {
    avatar.src = "talk.png";
  } else {
    avatar.src = "idle.png";
  }
}, 1000);
