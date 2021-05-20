import Phaser from "phaser";

export default class Bat {
  constructor(speed, scene, x, y) {
    //when initialized, you need to pass the scene in that the sprite is generated on
    this.scene = scene;

    //set up character animations
    const anims = scene.anims;
    anims.create({
      key: "bat-fly",
      frames: anims.generateFrameNames("bat", {
        prefix: "Bat",
        suffix: ".png",
        start: 1,
        end: 10,
      }),
      frameRate: 16,
      repeat: -1,
    });
    anims.create({
      key: "bat-hurt",
      frames: anims.generateFrameNames("bat", {
        prefix: "Bat",
        suffix: ".png",
        start: 1,
        end: 3,
      }),
      frameRate: 30,
      repeat: 3,
    });

    //sets up the sprite position when initialized
    this.sprite = scene.physics.add.sprite(x, y, "bat", 0);
    //set ups gravity and initial speed
    this.sprite.body.setAllowGravity(false);
    this.sprite.setVelocityX(speed);
  }
  update() {}
  destroy() {
    //when sprite destory is called, the following gets called
    this.sprite.destroy();
  }
}
