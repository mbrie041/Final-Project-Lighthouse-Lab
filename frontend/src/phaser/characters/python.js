import Phaser from "phaser";


export default class Python {
  constructor(speed, scene, x, y) {
    this.scene = scene;

    const anims = scene.anims;

    anims.create({
      key: "python-walk",
      frames: anims.generateFrameNames("python", {
        prefix: "python-walk",
        suffix: ".png",
        start: 1,
        end: 3,
      }),
      frameRate: 12,
      repeat: -1,
    });

    anims.create({
      key: "python-hurt",
      frames: anims.generateFrameNames("python", {
        prefix: "python-walk",
        suffix: ".png",
        start: 1,
        end: 3,
      }),
      frameRate: 24,
      repeat: -1,
    });

    this.sprite = scene.physics.add
      .sprite(x, y, "python", 0)
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
