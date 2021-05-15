import Phaser from "phaser";


export default class Bat {
  constructor(speed, scene, x, y) {
    this.scene = scene;

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

    this.sprite = scene.physics.add
      .sprite(x, y, "bat", 0)
      this.sprite.body.setAllowGravity(false)
      // .setDrag(1000, 0)
      // .setMaxVelocity(300, 400);
    this.sprite.setVelocityX(speed);
    
  }
  update() {

  }
  destroy() {
    this.sprite.destroy();
  }
}
