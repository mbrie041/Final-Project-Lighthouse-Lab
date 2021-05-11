import Phaser from "phaser";
import Player from "./player.js";


export default class LevelTwoScene extends Phaser.Scene {
  constructor() {
    super("LevelTwoScene");
  }
  preload() {
    this.load.spritesheet(
      "player",
      "src/assets/spritesheets/0x72-industrial-player-32px-extruded.png",
      {
        frameWidth: 32,
        frameHeight: 32,
        margin: 1,
        spacing: 2
      }
    );
    this.load.atlas(
      "robot",
      "src/assets/spritesheets/Robot.png",
      "src/assets/spritesheets/Robot.json",
    );
    this.load.image(
      "tiles",
      "src/assets/tilesets/0x72-industrial-tileset-32px-extruded.png"
    );
    this.load.tilemapTiledJSON(
      "level2Map",
      "src/assets/tilemaps/platformer-simple2.json"
    );
  }
  create() {
    console.log("we are actually here")
    const map = this.make.tilemap({ key: "level2Map" });
    const tiles = map.addTilesetImage(
      "0x72-industrial-tileset-32px-extruded",
      "tiles"
    );

    map.createDynamicLayer("Background", tiles);
    this.groundLayer = map.createDynamicLayer("Ground", tiles);
    map.createDynamicLayer("Foreground", tiles);
    const spawnPoint = map.findObject(
      "Objects",
      obj => obj.name === "Spawn Point"
    );
    const robotSpawn = map.findObject(
      "Enemies",
      obj => obj.name === "Robot1"
    );
    this.player = new Player(this, spawnPoint.x, spawnPoint.y);
    this.robot1 = new Robot(this, robotSpawn.x, robotSpawn.y);
    // Collide the player against the ground layer - here we are grabbing the sprite property from
    // the player (since the Player class is not a Phaser.Sprite).
    this.groundLayer.setCollisionByProperty({ collides: true });
    this.physics.world.addCollider(this.player.sprite, this.groundLayer);
    this.physics.world.addCollider(this.robot1.sprite, this.groundLayer);

    this.cameras.main.startFollow(this.player.sprite);
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

    // Help text that has a "fixed" position on the screen
    this.add
      .text(16, 16, "Arrow keys or WASD to move & jump", {
        font: "18px monospace",
        fill: "#000000",
        padding: { x: 20, y: 10 },
        backgroundColor: "#ffffff"
      })
      .setScrollFactor(0);
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