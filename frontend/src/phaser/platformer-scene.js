import Phaser from "phaser";
import Player from "./characters/player.js";


let groundLayer;
let zone;
let pancake;
let player;
global.score = 0;
let scoreText;
let timeText;
global.elapsedTime;
global.life = 3;


export default class PlatformerScene extends Phaser.Scene {
  constructor() {
    super("PlatformerScene");
  }

  preload() {
    this.load.atlas(
      "player",
      "src/assets/spritesheets/Agent_Mike.png",
      "src/assets/spritesheets/Agent_Mike.json",
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

    map.createLayer("Background", tiles);
    // const levelTwoDoor = map.createLayer("Level_2_door", tiles, 0, 0);
    this.groundLayer = map.createLayer("Ground", tiles);
    map.createLayer("Foreground", tiles);

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
    // this.add
    // .text(16, 16, "Arrow keys or WASD to move & jump", {
    //   font: "18px monospace",
    //   fill: "#000000",
    //   padding: { x: 20, y: 10 },
    //   backgroundColor: "#ffffff",
    // })
    // .setScrollFactor(0);


    //create score text
    scoreText = this.add
      .text(20, 5, `Score: ${global.score}`, {
        fontSize: '10px',
        fill: '#ffffff',
        fontFamily: ' "Press Start 2P" '
      })
      .setScrollFactor(0);

    //timer text
    timeText = this.add
      .text(240, 5, '', {
        fontSize: '10px',
        fill: '#ffffff',
        fontFamily: ' "Press Start 2P" '
      })
      .setScrollFactor(0);

    // levelTwoDoor.setCollisionByProperty({ collides: true });

    this.physics.add.overlap(player.sprite, zone, () => {
      this.physics.world.disable(zone);
      console.log("You hit the door!");
      this.scene.start('LevelOneScene', { score: score, life: life })
      // this.scene.start('InformationScene')
      this.scene.stop('PlatformerScene')
      // portalCallback(player, tile, this, data);
    });

    //populate pancake group and populates it. Repeats x amount of times and spreads them stepX apart
    pancake = this.physics.add.group({
      key: 'pancake',
      repeat: 11,
      setXY: { x: 400, y: 0, stepX: 150 }
    });

    //set bounce when items are initially dropped 
    pancake.children.iterate(function (child) {

      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.6));

    });


    //pancakes will collide with ground layer to keep them from falling off page
    this.physics.add.collider(pancake, this.groundLayer);

    this.physics.add.overlap(player.sprite, pancake, collectItem, null);

    // this.add.text('Elapsed seconds: ' + this.game.time.totalElapsedSeconds(), 32, 32);
  }

  update(time, delta) {
    // Allow the player to respond to key presses and move itself
    player.update();

    if (player.sprite.y > this.groundLayer.height) {
      player.destroy();
      this.scene.restart();
    }

    displayTimeElapsed(time)

  }

};

function collectItem(player, item) {
  console.log("COLLISION WITH ITEM!")
  item.disableBody(`${item}`, `${item}`)

  global.score += 10;
  scoreText.setText('Score: ' + global.score);
}




//get the current elapsed time then convert that into minutes and seconds to display on-screen as text.
//how to reset time when gameover?
//delay timer when prompted to start game?
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


