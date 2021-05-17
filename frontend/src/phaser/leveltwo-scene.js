import Phaser from "phaser";
import Player from "./characters/player.js";
import Robot from "./characters/robot1.js";
import Python from "./characters/python.js";
import Bat from "./characters/bat.js";
import enemyCreator from "./helpers/enemy-creator.js";
import createItem from "./helpers/item-creator";
const alive = "alive";
const dead = "dead";
const transitioning = "transitioning";

let zone
let scoreText;
let timeText;

export default class LevelTwoScene extends Phaser.Scene {
  constructor() {
    super("LevelTwoScene");
    this.state = alive; //sets up state machine
    this.enemyArray = []; //holds all the enemies created through the enemyCreator function
  }
  preload() {

  }

  create() {
    //sets state machine
    this.state = alive;
    this.cameras.main.fadeIn(1000);

    //stores level map
    const map = this.make.tilemap({ key: "level2map" });

    //store values for tiles that require collision
    const invisibleTiles = map.addTilesetImage(
      "Blocks (16 x 16)",
      "invisibleWalls"
    );
    const groundTiles = map.addTilesetImage(
      "Gray_Tile_Terrain (16 x 16)",
      "greyTiles"
    );
    const scaffoldingTiles = map.addTilesetImage(
      "Scaffolding_and_BG_Parts (16 x 16)",
      "scaffoldingTiles"
    );
    const exitSignTiles = map.addTilesetImage("prop pack", "labTiles");
    const exitDoorTiles = map.addTilesetImage(
      "House (Outside And Inside) Tileset",
      "exitDoorTiles"
    );

    //create layers from tiled names
    map.createLayer("Background", scaffoldingTiles);
    map.createLayer("LightPosts", scaffoldingTiles);
    map.createLayer("Hillside", scaffoldingTiles);
    map.createLayer("ExitDoor", exitDoorTiles);
    map.createLayer("ExitSign", exitSignTiles);
    this.enemyWalls = map.createLayer("InvisibleWalls", invisibleTiles);
    this.enemyWalls.visible = false;
    this.scaffoldingLayer = map.createLayer("Scaffolding", scaffoldingTiles);
    this.groundLayer = map.createLayer("Ground", groundTiles);

    //set up player start point
    const spawnPoint = map.findObject(
      "Objects",
      (obj) => obj.name === "Spawn Point"
    );
    const finishPoint = map.findObject(
      "Objects",
      (obj) => obj.name === "Finish Point"
    );
  //sets up exit door zone
    zone = this.add
    .zone(finishPoint.x, finishPoint.y)
    .setSize(finishPoint.width, finishPoint.height);
  this.physics.world.enable(zone);
  zone.body.setAllowGravity(false);
  zone.body.moves = false;


    //Initialize player and start them at spawn point.
    this.player = new Player(this, spawnPoint.x, spawnPoint.y);

    //Array containing walls that the enemies needs to collide with
    const collisionArray = [
      this.enemyWalls,
      this.scaffoldingLayer,
      this.groundLayer,
    ];
    const objects1 = map
      .getObjectLayer("Enemies")
      .objects.filter((obj) => obj.name === "Robot1");
    const objects2 = map
      .getObjectLayer("Enemies")
      .objects.filter((obj) => obj.name === "Python");
    const objects3 = map
      .getObjectLayer("Enemies")
      .objects.filter((obj) => obj.name === "Bat");
    //Enemy creating function calls
    this.enemyArray.concat(
      enemyCreator(
        objects1,
        "robot-walk",
        Robot,
        this,
        collisionArray,
        50,
        "robot-hurt"
      )
    );
    this.enemyArray.concat(
      enemyCreator(
        objects2,
        "python-walk",
        Python,
        this,
        collisionArray,
        50,
        "python-hurt"
      )
    );
    this.enemyArray.concat(
      enemyCreator(
        objects3,
        "bat-fly",
        Bat,
        this,
        collisionArray,
        50,
        "bat-hurt"
      )
    );

    //set up collision for the level
    this.scaffoldingLayer.setCollisionByProperty({ collides: true });
    this.groundLayer.setCollisionByProperty({ collides: true });
    this.enemyWalls.setCollisionByProperty({ collides: true });
    this.physics.world.setBoundsCollision(true, true, true, false);
    this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

    //sets up collision for the player
    const scaffoldingCollider = this.physics.world.addCollider(
      this.player.sprite,
      this.scaffoldingLayer
    );
    const groundCollider = this.physics.world.addCollider(
      this.player.sprite,
      this.groundLayer
    );
    this.player.sprite.body.collideWorldBounds = true;

        //set up collision with player and exit door
        this.physics.add.overlap(this.player.sprite, zone, () => {
          this.physics.world.disable(zone);
          console.log("You hit the door!");
          this.scene.start("LevelThreeScene", { score: score, life: life });
          // this.scene.start('InformationScene')
          this.scene.stop("LevelTwoScene");
          // portalCallback(player, tile, this, data);
        });

    //set up camera to have bounds on the level and follow the player
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameraDolly = new Phaser.Geom.Point(this.player.x, this.player.y);
    this.cameras.main.startFollow(this.cameraDolly);

    //creates score text at the top of the screen
    scoreText = this.add
      .text(20, 5, `Score: ${global.score}`, {
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

    const item = "gem";
    const layerArray = [this.groundLayer, this.scaffoldingLayer];
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
      this.player.sprite.anims.play("player-death")
      this.player.sprite.on(Phaser.Animations.Events.ANIMATION_COMPLETE,()=>this.player.destroy())

      if (global.life === 0) {
        global.finalTimer = global.elapsedTime;
        global.aboutToChange = 1;
        this.cameras.main.once("camerafadeoutcomplete", () => {
          this.scene.start("GameOverScene");
          this.scene.stop("LevelTwoScene");
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
    }
    displayTimeElapsed(time);
  }
}

function collectItem(player, item) {
  console.log("COLLISION WITH ITEM!");
  item.disableBody(`${item}`, `${item}`);
  global.score += 10;
  scoreText.setText("Score: " + global.score);
}

function displayTimeElapsed(time) {
  global.elapsedTime = time * 0.001;
  let min = Math.floor(global.elapsedTime / 60);
  let sec = (global.elapsedTime % 60).toFixed(0);
  let mili = (((global.elapsedTime % 60) % 1) * 100).toFixed(0);

  if (min < 10) {
    min = "0" + min;
  }
  if (sec < 10) {
    sec = "0" + sec;
  }
  if (mili < 10) {
    mili = "0" + mili;
  }
  timeText.setText("Time: " + min + ":" + sec + ":" + mili);
}
