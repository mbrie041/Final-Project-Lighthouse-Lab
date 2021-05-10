import Phaser from "phaser";
import Player from "./player.js";



let scoreText;
let timeText;
let pancake;
let player;




export default class LevelTwoScene extends Phaser.Scene {
  constructor() {
    super("LevelTwoScene");
  }

  init(data) {
    // console.log('init', data);
    // this.score = data.score
    // this.elaspedTime = data.time
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
    this.load.image(
      "tiles",
      "src/assets/tilesets/0x72-industrial-tileset-32px-extruded.png"
    );
    this.load.tilemapTiledJSON(
      "level2Map",
      "src/assets/tilemaps/platformer-simple2.json"
    );
    this.load.image(
      "pancake",
      "src/assets/images/Pancake_Stack (16 x 16).png"
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
        backgroundColor: "#ffffff"
      })
      .setScrollFactor(0);

    scoreText = this.add
      .text(600, 550, `Score: ${global.score}`, { 
        fontSize: '32px', 
        fill: '#ffffff' 
    }) 
    .setScrollFactor(0);

     //timer text
    timeText = this.add
     .text(50, 550,`Time: ${global.elaspedTime}`, {
       fontSize: '32px', 
       fill: '#ffffff' 
     })
     .setScrollFactor(0);


     //populate pancake group and populates it. Repeats x amount of times and spreads them stepX apart
    pancake = this.physics.add.group({
      key:'pancake',
      repeat: 11,
      setXY: {x: 400, y:0, stepX: 100}
    });

   //set bounce when items are initially dropped 
    pancake.children.iterate(function (child) {

      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.6));

  });


    //pancakes will collide with ground layer to keep them from falling off page
    this.physics.add.collider(pancake, this.groundLayer);

    this.physics.add.overlap(this.player.sprite, pancake, collectItem, null);
  }
  update(time, delta) {
    // Allow the player to respond to key presses and move itself
    this.player.update();

    if (this.player.sprite.y > this.groundLayer.height) {
      this.player.destroy();
      this.scene.restart();
    }

    displayTimeElapsed(time)
  }
};

function collectItem (player, item) {
  console.log("COLLISION WITH ITEM!")
  item.disableBody(`${item}`,`${item}`)
  global.score += 10;
  scoreText.setText('Score: ' + global.score);
}



function displayTimeElapsed(time) {
  global.elapsedTime = time * .001;
  let min = Math.floor(global.elapsedTime / 60);
  let sec = (global.elapsedTime % 60).toFixed(2);

  if (min < 10) {
      min = '0' + min;
  }
  if (sec < 10) {
      sec = '0' + sec;
  }
  timeText.setText('Time: ' + min + ':' + sec);
} 

