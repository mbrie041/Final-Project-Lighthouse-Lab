import Phaser from "phaser";

export default class Player {
  constructor(scene, x, y) {
    //when initialized, you need to pass the scene in that the sprite is generated on
    this.scene = scene;

    //player sound effect defined in the scene
    this.jumpSFX;

    // Create the animations we need from the player spritesheet
    const anims = scene.anims;
    anims.create({
      key: "player-idle",
      frames: anims.generateFrameNames("player", {
        prefix: "Tommy-idle",
        suffix: ".png",
        start: 1,
        end: 4,
      }),
      frameRate: 1,
      repeat: -1,
    });
    anims.create({
      key: "player-run",
      frames: anims.generateFrameNames("player", {
        prefix: "Tommy-run",
        suffix: ".png",
        start: 1,
        end: 8,
      }),
      frameRate: 16,
      repeat: -1,
    });
    anims.create({
      key: "player-falling",
      frames: anims.generateFrameNames("player", {
        prefix: "Tommy-jump",
        suffix: ".png",
        start: 1,
        end: 3,
      }),
      frameRate: 10,
      repeat: -1,
    });
    anims.create({
      key: "player-death",
      frames: anims.generateFrameNames("player", {
        prefix: "Tommy-hurt",
        suffix: ".png",
        start: 1,
        end: 2,
      }),
      frameRate: 20,
      repeat: 1,
    });
    anims.create({
      key: "player-victory",
      frames: anims.generateFrameNames("player", {
        prefix: "Tommy-pose",
        suffix: ".png",
        start: 1,
        end: 11,
      }),
      frameRate: 10,
      repeat: 0,
    });

    // Create the physics-based sprite that we will move around and animate
    this.sprite = scene.physics.add
      .sprite(x, y, "player", 0)
      .setDrag(1000, 0)
      .setMaxVelocity(300, 400);

    // Track the arrow keys & WASD
    const { LEFT, RIGHT, UP, SPACE, W, A, D } = Phaser.Input.Keyboard.KeyCodes;
    this.keys = scene.input.keyboard.addKeys({
      left: LEFT,
      right: RIGHT,
      up: UP,
      SPACE: SPACE,
    });
  }

  update() {
    //short cut variables
    const keys = this.keys;
    const sprite = this.sprite;
    const onGround = sprite.body.blocked.down;
    const acceleration = onGround ? 600 : 200;

    // Apply horizontal acceleration when left/a or right/d are applied
    if (keys.left.isDown) {
      sprite.setAccelerationX(-acceleration);
      // No need to have a separate set of graphics for running to the left & to the right. Instead
      // we can just mirror the sprite.
      sprite.setFlipX(true);
    } else if (keys.right.isDown) {
      sprite.setAccelerationX(acceleration);
      sprite.setFlipX(false);
    } else {
      sprite.setAccelerationX(0);
    }

    // Only allow the player to jump if they are on the ground
    if (onGround && (keys.up.isDown || keys.SPACE.isDown)) {
      sprite.setVelocityY(-500);
      this.scene.jumpSFX.play();
    }

    // Update the animation based on the state of the player
    if (onGround) {
      if (sprite.body.velocity.x !== 0) sprite.anims.play("player-run", true);
      else sprite.anims.play("player-idle", true);
    } else {
      sprite.anims.play("player-falling", true);
    }
  }

  destroy() {
    //when sprite destory is called, the following gets called
    this.sprite.destroy();
  }
}
