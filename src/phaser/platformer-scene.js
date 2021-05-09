import Phaser from "phaser";
import Player from "./player.js";

let groundLayer;
let zone;

export default class PlatformerScene extends Phaser.Scene {
  constructor() {
    super("PlatformerScene");
  }
  preload() {
    this.load.spritesheet(
      "player",
      "src/assets/spritesheets/0x72-industrial-player-32px-extruded.png",
      {
        frameWidth: 32,
        frameHeight: 32,
        margin: 1,
        spacing: 2,
      }
    );
    this.load.image(
      "tiles",
      "src/assets/tilesets/0x72-industrial-tileset-32px-extruded.png"
    );
    this.load.tilemapTiledJSON(
      "map",
      "src/assets/tilemaps/platformer-simple.json"
    );
  }

  create() {
    const map = this.make.tilemap({ key: "map" });
    const tiles = map.addTilesetImage(
      "0x72-industrial-tileset-32px-extruded",
      "tiles"
    );

    map.createDynamicLayer("Background", tiles);
    const levelTwoDoor = map.createLayer("Level_2_door", tiles, 0, 0);
    this.groundLayer = map.createDynamicLayer("Ground", tiles);
    map.createDynamicLayer("Foreground", tiles);

    //Bring finish point in from Json file
    const finishPoint = map.findObject(
      "Objects",
      (obj) => obj.name === "Finish Point"
    );

    //Set finish zone values in level
    zone = this.add
      .zone(finishPoint.x, finishPoint.y)
      .setSize(finishPoint.width, finishPoint.height);
    this.physics.world.enable(zone);
    zone.body.setAllowGravity(false);
    zone.body.moves = false;
    // Instantiate a player instance at the location of the "Spawn Point" object in the Tiled map.
    // Note: instead of storing the player in a global variable, it's stored as a property of the
    // scene.
    const spawnPoint = map.findObject(
      "Objects",
      (obj) => obj.name === "Spawn Point"
    );
    this.player = new Player(this, spawnPoint.x, spawnPoint.y);

    // Collide the player against the ground layer - here we are grabbing the sprite property from
    // the player (since the Player class is not a Phaser.Sprite).
    this.groundLayer.setCollisionByProperty({ collides: true });
    this.physics.world.addCollider(this.player.sprite, this.groundLayer);

    this.cameras.main.startFollow(this.player.sprite);
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

    // Help text that has a "fixed" position on the screen
    this.add
      .text(16, 16, "Arrow keys or WASD to move & jump", {
        font: "18px monospace",
        fill: "#000000",
        padding: { x: 20, y: 10 },
        backgroundColor: "#ffffff",
      })
      .setScrollFactor(0);

    levelTwoDoor.setCollisionByProperty({ collides: true });

    this.physics.add.overlap(this.player.sprite, zone, () => {
      this.physics.world.disable(zone);
      console.log("You hit the door!");
      this.scene.start('LevelTwoScene')
      this.scene.stop('PlatformerScene')
      // portalCallback(player, tile, this, data);
    });
  }

  update(time, delta) {
    // Allow the player to respond to key presses and move itself
    this.player.update();

    if (this.player.sprite.y > this.groundLayer.height) {
      this.player.destroy();
      this.scene.restart();
    }
  }
}
