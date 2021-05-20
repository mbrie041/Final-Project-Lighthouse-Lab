import Phaser from "phaser";

export default class Python {
  constructor(speed, scene, x, y) {
    //when initialized, you need to pass the scene in that the sprite is generated on
    this.scene = scene;

    //set up character animations
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
      frameRate: 40,
      repeat: 3,
    });

    //sets up the sprite position when initialized
    this.sprite = scene.physics.add.sprite(x, y, "python", 0);
    //set ups initial speed
    this.sprite.setVelocityX(speed);
  }
  update() {}
  destroy() {
    //when sprite destory is called, the following gets called
    this.sprite.destroy();
  }
}
