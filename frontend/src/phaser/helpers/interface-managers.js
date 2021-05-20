 function collectItem(player, item, soundEffect) {
   //when the player collides with the enemy, remove it from the scene
  item.disableBody(`${item}`, `${item}`);
   //plays the collect sound on collision
  soundEffect.play();
  //increase the global score on collision
  global.score += 10;
}

function displayTimeElapsed(time, passedTimeText) {
  //updates the time ui with the current game clock
  global.elapsedTime += time * 0.001;

  //formatting time to display
  let min = Math.floor(global.elapsedTime / 60);
  let sec = (global.elapsedTime % 60).toFixed(0);
  let mili = (((global.elapsedTime % 60) % 1) * 100).toFixed(0);

  if (min < 10) {
    min = "0" + min;
  }
  if (sec < 10) {
    sec = "0" + sec;
  }
  if (mili < 10) {
    mili = "0" + mili;
  }
  //places the formated time on the screen
  passedTimeText.setText(`Time: ${min}:${sec}:${mili}`);
}

function finalTimeSetter() {
  //saves the time when the player runs out of lives
  global.finalTimer = global.elapsedTime;

  //formatting time to display
  let min = Math.floor(global.finalTimer / 60);
  let sec = (global.elapsedTime % 60).toFixed(0);
  let mili = (((global.elapsedTime % 60) % 1) * 100).toFixed(0);
  if (min < 10) {
    min = "0" + min;
  }
  if (sec < 10) {
    sec = "0" + sec;
  }
  if (mili < 10) {
    mili = "0" + mili;
  }
  //adds the final timer and sets up a placeholder value to pass it to the database
  global.finalTimer = `${min}:${sec}:${mili}`;
  global.aboutToChange = 1;
}

export {
  collectItem,
  displayTimeElapsed,
  finalTimeSetter
}