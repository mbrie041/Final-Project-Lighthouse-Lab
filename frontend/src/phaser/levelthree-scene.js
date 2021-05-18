import Phaser from "phaser";
import Player from "./characters/player.js";
import JumpRoach from "./characters/jumpRoach.js";
import Roach from "./characters/roach.js";
import enemyCreator from "./helpers/enemy-creator.js";
import jumpEnemyCreator from "./helpers/jump-enemy-creator.js";
import createItem from "./helpers/item-creator";
// import { collectItem, displayTimeElapsed } from "./helpers/dataHelpers"
const alive = "alive";
const dead = "dead";
const transitioning = "transitioning";

let zone;
let scoreText;
let timeText;

export default class LevelThreeScene extends Phaser.Scene {
  constructor() {
    super("LevelThreeScene");
    this.state = alive; //sets up state machine
    this.enemyArray = []; //holds all the enemies created through the enemyCreator function
  }
  preload() {
    //moved everything to Intro Scenes preload
  }

  create() {
    //sets state machine
    this.state = alive;
    this.cameras.main.fadeIn(1000);

    //stores level map
    const map = this.make.tilemap({ key: "level3map" });

    //store values for tiles that require collision
    const invisibleTiles = map.addTilesetImage(
      "Blocks (16 x 16)",
      "invisibleWalls"
    );
    const labTiles = map.addTilesetImage("prop pack", "labTiles");
    const platformTiles = map.addTilesetImage("DarkLab", "darkLabTiles");
    const exitDoorTiles = map.addTilesetImage(
      "House (Outside And Inside) Tileset",
      "exitDoorTiles"
    );
    const closeNightSkyTiles = map.addTilesetImage(
      "Night Close",
      "closeNightSky"
    );
    const farNightSkyTiles = map.addTilesetImage("Night Far", "farNightSky");
    const moonNightSkyTiles = map.addTilesetImage("NightSky", "moonNightSky");

    //create layers from tiled names
    map.createLayer("Sky", moonNightSkyTiles);
    map.createLayer("NightFar", farNightSkyTiles);
    map.createLayer("Moon", moonNightSkyTiles);
    map.createLayer("NightMid", closeNightSkyTiles);
    map.createLayer("NightClosest", farNightSkyTiles);
    map.createLayer("LabLayer", labTiles);
    map.createLayer("Signs", labTiles);
    map.createLayer("ExitSign", labTiles);
    map.createLayer("EntryTiles", platformTiles);
    this.enemyWalls = map.createLayer("InvisibleWalls", invisibleTiles);
    this.enemyWalls.visible = false;
    this.groundLayer = map.createLayer("Platforms", platformTiles);
    map.createLayer("ExitDoor", exitDoorTiles);

    //set up player start point
    const spawnPoint = map.findObject(
      "Objects",
      (obj) => obj.name === "Spawn Point"
    );

    //Bring finish point in from Json file
    const finishPoint = map.findObject(
      "Objects",
      (obj) => obj.name === "Finish Point"
    );
    zone = this.add
      .zone(finishPoint.x, finishPoint.y)
      .setSize(finishPoint.width, finishPoint.height);
    this.physics.world.enable(zone);
    zone.body.setAllowGravity(false);
    zone.body.moves = false;

    //Initialize player and start them at spawn point.
    this.player = new Player(this, spawnPoint.x, spawnPoint.y);

    //Array containing walls that the enemies needs to collide with
    const collisionArray = [this.enemyWalls, this.groundLayer];
    const objects1 = map
      .getObjectLayer("Enemies")
      .objects.filter((obj) => obj.name === "JumpRoach");
    const objects2 = map
      .getObjectLayer("Enemies")
      .objects.filter((obj) => obj.name === "Roach");

    const item = "gem";
    const layerArray = [this.groundLayer];
    const physics = this.physics;
    const playerSprite = this.player.sprite;
    createItem(
      map.getObjectLayer("Gems").objects,
      item,
      collectItem,
      physics,
      layerArray,
      playerSprite
    );
    //Enemy creating function calls
    this.enemyArray.concat(
      jumpEnemyCreator(
        objects1,
        "roach-jump",
        JumpRoach,
        this,
        collisionArray,
        250,
        "roach-hurt"
      )
    );
    this.enemyArray.concat(
      enemyCreator(
        objects2,
        "roach-jump",
        Roach,
        this,
        collisionArray,
        50,
        "roach-hurt"
      )
    );
    //set up collision for the level
    this.groundLayer.setCollisionByProperty({ collides: true });
    this.enemyWalls.setCollisionByProperty({ collides: true });
    this.physics.world.setBoundsCollision(true, true, true, false);
    this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

    //sets up collision for the player
    const groundCollider = this.physics.world.addCollider(
      this.player.sprite,
      this.groundLayer
    );
    this.player.sprite.body.collideWorldBounds = true;

    this.physics.add.overlap(this.player.sprite, zone, () => {
      this.physics.world.disable(zone);
      console.log("You hit the door!");
      this.scene.start("LevelFourScene", { score: score, life: life });
      // this.scene.start('InformationScene')
      this.scene.stop("LevelThreeScene");
      // portalCallback(player, tile, this, data);
    });

    //set up camera to have bounds on the level and follow the player
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameraDolly = new Phaser.Geom.Point(this.player.x, this.player.y);
    this.cameras.main.startFollow(this.cameraDolly);

    //creates score text at the top of the screen
    scoreText = this.add
      .text(20, 5, "Score: 0", {
        fontSize: "10px",
        fill: "#ffffff",
        fontFamily: ' "Press Start 2P" ',
      })
      .setScrollFactor(0);

    // Life text at the top of the screen
    const lifeText = this.add
      .text(150, 5, `Life: ${global.life}`, {
        fontSize: "10px",
        fill: "#ffffff",
        fontFamily: ' "Press Start 2P" ',
      })
      .setScrollFactor(0);

    //timer text at the top of the screen
    timeText = this.add
      .text(250, 5, `Time: ${global.elaspedTime}`, {
        fontSize: "10px",
        fill: "#ffffff",
        fontFamily: ' "Press Start 2P" ',
      })
      .setScrollFactor(0);
  }

  update(time, delta) {
    this.cameraDolly.x = Math.floor(this.player.sprite.x);
    this.cameraDolly.y = Math.floor(this.player.sprite.y);

    //state update check
    if (this.state === dead) {
      this.cameras.main.fadeOut(3000);
      global.life -= 1;
      this.player.sprite.setFlipY(true);
      this.player.sprite.setVelocityX(0);
      this.player.sprite.anims.play("player-death");
      this.player.sprite.on(Phaser.Animations.Events.ANIMATION_COMPLETE, () =>
        this.player.destroy()
      );

      if (global.life === 0) {
        global.finalTimer = global.elapsedTime;
        global.aboutToChange = 1;
        this.cameras.main.once("camerafadeoutcomplete", () => {
          this.scene.start("GameOverScene");
          this.scene.stop("LevelThreeScene");
        });
      } else {
        this.cameras.main.once("camerafadeoutcomplete", () => {
          this.scene.restart();
        });
      }

      this.state = transitioning;
    } else if (this.state === transitioning) {
      // console.log("we're transitioning")
    } else if (this.state === alive) {
      //calls the player update on alive
      this.player.update();
      //calls the update on every enemy created and stored in enemyArray
      for (let enemy of this.enemyArray) {
        enemy.update();
      }
      //changes state to dead if a player falls down a hole
      if (this.player.sprite.y > this.groundLayer.height) {
        this.state = dead;
      }
      displayTimeElapsed(delta);
    }
  }
}

function collectItem(player, item) {
  console.log("COLLISION WITH ITEM!");
  item.disableBody(`${item}`, `${item}`);
  global.score += 10;
  scoreText.setText("Score: " + global.score);
}

function displayTimeElapsed(time) {
  global.elapsedTime += time * 0.001;
  let min = Math.floor(global.elapsedTime / 60);
  let sec = (global.elapsedTime % 60).toFixed(2);

  if (min < 10) {
    min = "0" + min;
  }
  if (sec < 10) {
    sec = "0" + sec;
  }
  timeText.setText("Time: " + min + ":" + sec);
}
