import Phaser from "phaser";


export default class Roach {
  constructor(speed, scene, x, y) {
    this.scene = scene;

    const anims = scene.anims;

    anims.create({
      key: "roach-jump",
      frames: anims.generateFrameNames("roach", {
        prefix: "Roach-jump",
        suffix: ".png",
        start: 1,
        end: 3,
      }),
      frameRate: 12,
      repeat: -1,
    });
    anims.create({
      key: "roach-hurt",
      frames: anims.generateFrameNames("roach", {
        prefix: "Roach-jump",
        suffix: ".png",
        start: 1,
        end: 3,
      }),
      frameRate: 20,
      repeat: 3,
    });

    this.sprite = scene.physics.add
      .sprite(x, y, "roach", 0)
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
