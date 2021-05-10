import Phaser from "phaser";
import Player from "./player.js";

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
    this.load.image(
    "groundTiles",
    "src/assets/tilesets/Gray_Tile_Terrain (16 x 16).png"
    );
    this.load.image(
    "scaffoldingTiles",
    "src/assets/tilesets/Scaffolding_and_BG_Parts (16 x 16).png"
    );
    this.load.image(
    "exitSignTiles",
    "src/assets/tilesets/prop pack.png"
    );
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
    this.load.tilemapTiledJSON(
    "level1map",
    "src/assets/tilemaps/Level2.json"
    );
    this.load.image(
    "pancake",
    "src/assets/images/Pancake_Stack (16 x 16).png"
    );
    }
    
    create() {
    
    const map = this.make.tilemap({ key: "level1map" });
    const groundTiles = map.addTilesetImage(
    "Gray_Tile_Terrain (16 x 16)",
    "groundTiles"
    );
    const scaffoldingTiles = map.addTilesetImage(
      "Scaffolding_and_BG_Parts (16 x 16)",
      "scaffoldingTiles"
    );
    const exitSignTiles = map.addTilesetImage(
      "prop pack",
      "exitSignTiles"
    );
    const exitDoorTiles = map.addTilesetImage(
      "House (Outside And Inside) Tileset",
      "exitDoorTiles"
    );
    
    // map.createLayer("Ground", groundTiles)
    map.createLayer("Background", scaffoldingTiles)
    map.createLayer("LightPosts", scaffoldingTiles)
    map.createLayer("Hillside", scaffoldingTiles)
    map.createLayer("ExitDoor", exitDoorTiles)
    map.createLayer("ExitSign", exitSignTiles)
    
    
    
    this.scaffoldingLayer = map.createLayer("Scaffolding", scaffoldingTiles)
    this.groundLayer = map.createLayer("Ground", groundTiles);
  
    const spawnPoint = map.findObject(
      "Objects",
      obj => obj.name === "Spawn Point"
    );
    this.player = new Player(this, spawnPoint.x, spawnPoint.y);

    // Collide the player against the ground layer - here we are grabbing the sprite property from
    // the player (since the Player class is not a Phaser.Sprite).
    this.scaffoldingLayer.setCollisionByProperty({ collides: true });
    this.physics.world.addCollider(this.player.sprite, this.scaffoldingLayer);


    this.groundLayer.setCollisionByProperty({ collides: true });
    this.physics.world.addCollider(this.player.sprite, this.groundLayer);

    this.cameras.main.startFollow(this.player.sprite);
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

    // Help text that has a "fixed" position on the screen
    // this.add
    //   .text(16, 16, "Arrow keys or WASD to move & jump", {
    //     font: "18px monospace",
    //     fill: "#000000",
    //     padding: { x: 20, y: 10 },
    //     backgroundColor: "#ffffff"
    //   })
    //   .setScrollFactor(0);
  }
  update(time, delta) {
    // Allow the player to respond to key presses and move itself
    this.player.update();

    if (this.player.sprite.y > this.groundLayer.height) {
      this.player.destroy();
      this.scene.restart();
    }
  }
};