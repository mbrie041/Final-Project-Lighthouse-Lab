import Phaser from "phaser";

export default class Tweeter {
  constructor(speed, scene, x, y) {
    this.scene = scene;

    const anims = scene.anims;

    anims.create({
      key: "tweeter-fly",
      frames: anims.generateFrameNames("tweeter", {
        prefix: "Tweeter-Fly",
        suffix: ".png",
        start: 1,
        end: 3,
      }),
      frameRate: 12,
      repeat: -1,
    });
    anims.create({
      key: "tweeter-hurt",
      frames: anims.generateFrameNames("tweeter", {
        prefix: "Tweeter-Hurt",
        suffix: ".png",
        start: 1,
        end: 2,
      }),
      frameRate: 20,
      repeat: 3,
    });

    this.sprite = scene.physics.add.sprite(x, y, "tweeter", 0)
    this.sprite.setVelocityY(speed);
  }
  update() {
  this.scene.sprite.setVelocityX(10);
  }
  destroy() {
    this.sprite.destroy();
  }
}
