import Phaser from "phaser";

export default class Tweeter {
  constructor(speed, scene, x, y) {
    //when initialized, you need to pass the scene in that the sprite is generated on
    this.scene = scene;

    //set up character animations
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

    //sets up the sprite position when initialized
    this.sprite = scene.physics.add.sprite(x, y, "tweeter", 0);
    //set ups height and initial speed
    this.sprite.setVelocityY(speed);
  }
  update() {
    //when sprite update gets called, updates height
    this.scene.sprite.setVelocityX(10);
  }
  destroy() {
    //when sprite destory is called, the following gets called
    this.sprite.destroy();
  }
}
