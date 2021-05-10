import Phaser from "phaser";
import Player from "./player.js";

let groundLayer;
let zone;
let pancake;
let player;
let score = 0;
let scoreText;

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
    this.load.image(
      "pancake",
      "src/assets/images/Pancake_Stack (16 x 16).png"
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

    //add static pancake image and double the scale
    // this.add.image(400, 208,'pancake').setScale(2);

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
      player = new Player(this, spawnPoint.x, spawnPoint.y);
      
      
      // Collide the player against the ground layer - here we are grabbing the sprite property from
      // the player (since the Player class is not a Phaser.Sprite).
      this.groundLayer.setCollisionByProperty({ collides: true });
      this.physics.world.addCollider(player.sprite, this.groundLayer);
      
      this.cameras.main.startFollow(player.sprite);
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
     

      //create score text
      scoreText = this.add
        .text(600, 550, 'score: 0', { 
          fontSize: '32px', 
          fill: '#ffffff' 
      }) 
      .setScrollFactor(0);
      
    levelTwoDoor.setCollisionByProperty({ collides: true });

    this.physics.add.overlap(player.sprite, zone, () => {
      this.physics.world.disable(zone);
      console.log("You hit the door!");
      this.scene.start('LevelTwoScene')
      this.scene.stop('PlatformerScene')
      // portalCallback(player, tile, this, data);
    });

    //populate pancake group and populates it. Repeats x amount of times and spreads them stepX apart
    pancake = this.physics.add.group({
      key:'pancake',
      repeat: 11,
      setXY: {x: 400, y:1, stepX: 200}
    });

   //set bounce when items are initially dropped 
    pancake.children.iterate(function (child) {

      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.6));

  });


    //pancakes will collide with ground layer to keep them from falling off page
    this.physics.add.collider(pancake, this.groundLayer);

    this.physics.add.overlap(player.sprite, pancake, collectItem, null);

  }
  
  update(time, delta) {
    // Allow the player to respond to key presses and move itself
    player.update();
    
    if (player.sprite.y > this.groundLayer.height) {
      player.destroy();
      this.scene.restart();
    }
  }
}; 



function collectItem (player, item) {
  console.log("COLLISION WITH ITEM!")
  item.disableBody('pancake','pancake')

  score +=10;
  scoreText.setText('Score: ' + score);
}
