import Phaser from "phaser";

export default class JumpRoach {
  constructor(speed, scene, x, y) {
    //when initialized, you need to pass the scene in that the sprite is generated on
    this.scene = scene;
   
    //set up character animations
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
    //sets up the sprite position when initialized
    this.sprite = scene.physics.add.sprite(x, y, "roach", 0).setFlipX(true);
    //set ups initial speed
    this.sprite.setVelocityY(speed);
  }
  update() {}
  destroy() {
    //when sprite destory is called, the following gets called
    this.sprite.destroy();
  }
}
