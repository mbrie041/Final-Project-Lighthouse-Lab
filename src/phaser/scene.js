import Phaser, { Curves } from "phaser";
let player;
let cursors;

class playGame extends Phaser.Scene {
  constructor() {
    super("PlayGame");
  }
  
  preload() {
    this.load.atlas(
      "Agent_Mike",
      "src/assets/sprites/Agent_Mike.png",
      "src/assets/sprites/Agent_Mike.json"
    );
    // this.load.image("background",'src/assets/backgrounds/Cave.png')

    //tile map and images:
    this.load.image("tiles","src/assets/tiles_sets/Gray_Tile_Terrain (16 x 16).png");
    this.load.tilemapTiledJSON("map", "src/assets/mapsets/first_try.json");
  }
  create() {
    const map = this.make.tilemap({ key: "map" });
    const tileset = map.addTilesetImage('Gray_Tile_Terrain (16 x 16)', 'tiles')

    const belowLayer = map.createLayer("Tile Layer 1", tileset, 0,0);

    belowLayer.setCollisionByProperty({ collides: true });

    const spawnPoint = map.findObject("Objects", obj => obj.name === "Spawn Point");

    player = this.physics.add
    .sprite(spawnPoint.x, spawnPoint.y, "Agent_Mike", "Mike-Right1.png")
    .setSize(30, 40)
    // .setOffset(0, 24);

    this.physics.add.collider(player, belowLayer)

    const anims = this.anims;

    anims.create({
      key: "Mike-walk-right",
      frames: anims.generateFrameNames("Agent_Mike", { prefix: "Mike-Right", suffix: '.png',  start: 1, end: 6}),
      frameRate: 10,
      repeat: -1
    });
    anims.create({
      key: "Mike-walk-left",
      frames: anims.generateFrameNames("Agent_Mike", { prefix: "Mike-left", suffix: '.png',  start: 1, end: 6}),
      frameRate: 10,
      repeat: -1
    });
    anims.create({
      key: "Mike-Right-Idle",
      frames: anims.generateFrameNames("Agent_Mike", { prefix: "MikeRight-Idle", suffix: '.png', start: 1, end: 2}),
      frameRate: 10,
      repeat: -1
    });

    const camera = this.cameras.main;
    camera.startFollow(player);


    cursors = this.input.keyboard.createCursorKeys();
  }
  update() {
    const onGround = player.body.blocked.down
    player.body.setVelocity(0)
    let speed = 175;
    

    if (cursors.right.isDown) {
      player.flipX = false;
      player.body.setVelocityX(175)
      player.anims.play("Mike-walk-right", true)
    } else if (cursors.left.isDown) {
      player.flipX = true;
      player.body.setVelocityX(-175)
      player.anims.play("Mike-walk-right", true)
    } else {
      player.body.setVelocityX(0)
      player.anims.play("Mike-Right-Idle", true)
    }
    if (cursors.space.isDown && onGround){
      player.body.setVelocityY(-29000)
    }
  }
}

export default playGame;
