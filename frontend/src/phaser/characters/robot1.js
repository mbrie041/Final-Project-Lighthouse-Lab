import Phaser from "phaser";

export default class Robot {
  constructor(speed, scene, x, y) {
    //when initialized, you need to pass the scene in that the sprite is generated on
    this.scene = scene;

    //set up character animations
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
    anims.create({
      key: "robot-hurt",
      frames: anims.generateFrameNames("robot", {
        prefix: "Robot-hurt",
        suffix: ".png",
        start: 1,
        end: 2,
      }),
      frameRate: 12,
      repeat: 3,
    });

    //sets up the sprite position when initialized
    this.sprite = scene.physics.add.sprite(x, y, "robot", 0);

    //set ups initial speed
    this.sprite.setVelocityX(speed);
  }
  update() {}
  destroy() {
    //when sprite destory is called, the following gets called
    this.sprite.destroy();
  }
}
