import Phaser from "phaser";


export default class Robot {
  constructor(speed, scene, x, y) {
    this.scene = scene;

    const anims = scene.anims;

    anims.create({
      key: "robot-walk",
      frames: anims.generateFrameNames("robot", {
        prefix: "Robot-walk",
        suffix: ".png",
        start: 1,
        end: 4,
      }),
      frameRate: 12,
      repeat: -1,
    });

    this.sprite = scene.physics.add
      .sprite(x, y, "robot", 0)
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
