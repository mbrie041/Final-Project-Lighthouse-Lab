


//sets score and text when there is collision between player and item
function collectItem (player, item) {
  let scoreText;
  console.log("COLLISION WITH ITEM!")
  item.disableBody(`${item}`,`${item}`)

  this.score += 10;
  scoreText.setText('Score: ' + this.score);
}


//get the current elapsed time then convert that into minutes and seconds to display on-screen as text.
  //how to reset time when gameover?
  //delay timer when prompted to start game?
function displayTimeElapsed(time) {
  let timeText;
  let elapsedTime = time * .001;
  let min = Math.floor(elapsedTime / 60);
  let sec = (elapsedTime % 60).toFixed(2);

  if (min < 10) {
      min = '0' + min;
  }
  if (sec < 10) {
      sec = '0' + sec;
  }
return timeText.setText('Time: ' + min + ':' + sec);

} 

export {
  collectItem, 
  displayTimeElapsed,
}