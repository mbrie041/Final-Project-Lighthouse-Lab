import Phaser from "phaser";


export default class Monitor {
  constructor(speed, scene, x, y) {
    this.scene = scene;

    const anims = scene.anims;

    anims.create({
      key: "monitor-walk",
      frames: anims.generateFrameNames("monitor", {
        prefix: "Monitor",
        suffix: ".png",
        start: 1,
        end: 3,
      }),
      frameRate: 12,
      repeat: -1,
    });
    anims.create({
      key: "monitor-hurt",
      frames: anims.generateFrameNames("monitor", {
        prefix: "Monitor-hurt",
        suffix: ".png",
        start: 1,
        end: 2,
      }),
      frameRate: 12,
      repeat: 3,
    });

    this.sprite = scene.physics.add
      .sprite(x, y, "monitor", 0)
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
