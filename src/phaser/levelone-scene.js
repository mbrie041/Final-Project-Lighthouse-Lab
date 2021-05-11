import Phaser from "phaser";
import Player from "./player.js";
import Robot from "./robot1.js";

export default class LevelOneScene extends Phaser.Scene {
  constructor() {
    super("LevelOneScene");
  }
  preload() {
    this.load.atlas(
      "player",
      "src/assets/spritesheets/Agent_Mike.png",
      "src/assets/spritesheets/Agent_Mike.json"
    );
    this.load.atlas(
      "robot",
      "src/assets/spritesheets/Robot.png",
      "src/assets/spritesheets/Robot.json"
    );
    this.load.image(
      "groundTiles",
      "src/assets/tilesets/Gray_Tile_Terrain (16 x 16).png"
    );
    this.load.image(
      "scaffoldingTiles",
      "src/assets/tilesets/Scaffolding_and_BG_Parts (16 x 16).png"
    );
    this.load.image("exitSignTiles", "src/assets/tilesets/prop pack.png");
    this.load.image(
      "exitDoorTiles",
      "src/assets/tilesets/House (Outside And Inside) Tileset.png"
    );
    this.load.image(
      "hillTiles",
      "src/assets/tilesets/Scaffolding_and_BG_Parts (16 x 16).png"
    );
    this.load.image(
      "lightTiles",
      "src/assets/tilesets/Scaffolding_and_BG_Parts (16 x 16).png"
    );
    this.load.image(
      "backgroundTiles",
      "src/assets/tilesets/Scaffolding_and_BG_Parts (16 x 16).png"
    );
    this.load.tilemapTiledJSON("level1map", "src/assets/tilemaps/Level2.json");
    this.load.image("pancake", "src/assets/images/Pancake_Stack (16 x 16).png");
  }

  create() {
    console.log("This is in sequence")
    const map = this.make.tilemap({ key: "level1map" });
    const groundTiles = map.addTilesetImage(
      "Gray_Tile_Terrain (16 x 16)",
      "groundTiles"
    );
    const scaffoldingTiles = map.addTilesetImage(
      "Scaffolding_and_BG_Parts (16 x 16)",
      "scaffoldingTiles"
    );
    const exitSignTiles = map.addTilesetImage("prop pack", "exitSignTiles");
    const exitDoorTiles = map.addTilesetImage(
      "House (Outside And Inside) Tileset",
      "exitDoorTiles"
    );

    // map.createLayer("Ground", groundTiles)
    map.createLayer("Background", scaffoldingTiles);
    map.createLayer("LightPosts", scaffoldingTiles);
    map.createLayer("Hillside", scaffoldingTiles);
    map.createLayer("ExitDoor", exitDoorTiles);
    map.createLayer("ExitSign", exitSignTiles);

    this.scaffoldingLayer = map.createLayer("Scaffolding", scaffoldingTiles);
    this.groundLayer = map.createLayer("Ground", groundTiles);

    const spawnPoint = map.findObject(
      "Objects",
      (obj) => obj.name === "Spawn Point"
    );
    const robotSpawn = map.findObject(
      "Enemies",
      (obj) => obj.name === "Robot1"
    );
    this.player = new Player(this, spawnPoint.x, spawnPoint.y);
    this.robot1 = new Robot(this, robotSpawn.x, robotSpawn.y);

    // Collide the player against the ground layer - here we are grabbing the sprite property from
    // the player (since the Player class is not a Phaser.Sprite).
    this.scaffoldingLayer.setCollisionByProperty({ collides: true });
    this.groundLayer.setCollisionByProperty({ collides: true });
    this.physics.world.addCollider(this.player.sprite, this.scaffoldingLayer);

    this.physics.world.addCollider(this.robot1.sprite, this.groundLayer);

    this.physics.world.addCollider(this.player.sprite, this.groundLayer);

    this.cameras.main.startFollow(this.player.sprite);
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

    this.physics.add.collider(
      this.player.sprite,
      this.robot1.sprite,
      function (player, enemy) {
        if (enemy.body.touching.up && player.body.touching.down) {
          // destroy the enemy
          enemy.destroy();
        } else {
          // any other way to collide on an enemy will restart the game
          player.destroy()
          this.scene.restart();
        }
      },
      null,
      this
    );
  }
  update(time, delta) {
    // Allow the player to respond to key presses and move itself
    this.player.update();

    if (this.player.sprite.y > this.groundLayer.height) {
      this.player.destroy();
      this.scene.restart();
    }

    // handling collision between enemy and hero

  }
}
