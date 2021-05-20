function playerDied(player) {
  //runs the player death annimation event and then kills the player
  player.sprite.setFlipY(true);
  player.sprite.setVelocityX(0);
  player.sprite.anims.play("player-death");
  player.sprite.on(Phaser.Animations.Events.ANIMATION_COMPLETE, () => player.destroy()
  );
}
function playerFinish(player) {
  //runs the player victory annimation event
  player.setVelocityX(0);
  player.setAccelerationX(0);
  player.setAccelerationY(0);
  player.setDrag(0);
  player.anims.play("player-victory");
}
export {
  playerDied,
  playerFinish
}

