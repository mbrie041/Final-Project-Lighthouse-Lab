 function collectItem(player, item, soundEffect) {
  console.log("COLLISION WITH ITEM!");
  item.disableBody(`${item}`, `${item}`);
  soundEffect.play();
  global.score += 10;
}

function displayTimeElapsed(time, passedTimeText) {
  global.elapsedTime += time * 0.001;
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
  passedTimeText.setText(`Time: ${min}:${sec}:${mili}`);
}

function finalTimeSetter() {
  global.finalTimer = global.elapsedTime;
  //format timer
  let min = Math.floor(global.finalTimer / 60);
  let sec = (global.finalTimer % 60).toFixed(2);
  if (min < 10) {
    min = "0" + min;
  }
  if (sec < 10) {
    sec = "0" + sec;
  }
  global.finalTimer = `${min}:${sec}`;
  global.aboutToChange = 1;
}

export {
  collectItem,
  displayTimeElapsed,
  finalTimeSetter
}