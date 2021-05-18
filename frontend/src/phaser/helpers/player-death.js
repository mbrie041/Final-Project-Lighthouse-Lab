function playerDied(player) {
  player.sprite.setFlipY(true);
  player.sprite.setVelocityX(0);
  player.sprite.anims.play("player-death");
  player.sprite.on(Phaser.Animations.Events.ANIMATION_COMPLETE, () => player.destroy()
  );
}

export {
  playerDied
}