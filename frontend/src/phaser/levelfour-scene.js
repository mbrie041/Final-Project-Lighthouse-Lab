import Phaser from "phaser";
import Player from "./characters/player.js";
import Tweeter from "./characters/tweeter";
import flyingJumpEnemyCreator from "./helpers/flying-jump-enemy-creator.js";
import createItem from "./helpers/item-creator";
import { playerDied, playerFinish } from "./helpers/player-states";
import {
  collectItem,
  displayTimeElapsed,
  finalTimeSetter,
} from "./helpers/interface-managers";
const alive = "alive";
const dead = "dead";
const transitioning = "transitioning";
const victory = "victory";

export default class LevelFourScene extends Phaser.Scene {
  constructor() {
    super("LevelFourScene");
    this.state = alive; //sets up state machine
    this.enemyArray = []; //holds all the enemies created through the enemyCreator function
    this.finishZone;
    //Sound variables
    this.sceneFourTheme;
    this.jumpSFX;
    this.gemSFX;
    this.playerDeathSFX;
    this.enemyDeathSFX;
    this.fanfareSFX;
    //UI variables
    this.timeText;
    this.scoreText;
    this.lifeText;
  }
  preload() {
    //moved everything to Intro Scenes preload
  }

  create() {
    this.input.keyboard.enabled = true;
    this.sound.remove(this.sceneFourTheme);
    this.jumpSFX = this.sound.add("jump");
    this.gemSFX = this.sound.add("gem");
    this.fanfareSFX = this.sound.add("fanfare");
    this.playerDeathSFX = this.sound.add("playerDeath");
    this.enemyDeathSFX = this.sound.add("enemyDeath");
    this.sceneFourTheme = this.sound.add("level4", { loop: true });
    this.sceneFourTheme.play();
    //sets state machine
    this.state = alive;
    this.cameras.main.fadeIn(1000);

    //stores level map
    const map = this.make.tilemap({ key: "level4map" });

    //store values for tiles that require collision
    const invisibleTiles = map.addTilesetImage(
      "Blocks (16 x 16)",
      "invisibleWalls"
    );
    const groundTiles = map.addTilesetImage(
      "Terrain (16 x 16)",
      "lightBrownTiles"
    );
    const exitDoorTiles = map.addTilesetImage(
      "House (Outside And Inside) Tileset",
      "exitDoorTiles"
    );
    const labTiles = map.addTilesetImage("prop pack", "labTiles");
    const platformTiles = map.addTilesetImage("DarkLab", "darkLabTiles");
    const fenceTiles = map.addTilesetImage(
      "Grassland_entities (16 x 16)",
      "fenceTiles"
    );

    //create layers from tiled names
    map.createLayer("Fence", fenceTiles);
    map.createLayer("LabLayer", platformTiles);
    map.createLayer("Lab", labTiles);
    map.createLayer("Signs", labTiles);
    map.createLayer("ExitDoor", exitDoorTiles);

    this.enemyWalls = map.createLayer("InvisibleWalls", invisibleTiles);
    this.enemyWalls.visible = false;
    this.groundLayer = map.createLayer("Ground", groundTiles);
    
    //parallax
    this.add
      .image(this.width, this.height, "Level4Sky")
      .setOrigin(0, 0)
      .setDepth(-1);
    this.add
      .image(this.width, this.height, "Level4Clouds")
      .setOrigin(0, 0)
      .setDepth(-1)
      .setScrollFactor(1.03);
    this.add
      .image(this.width, this.height, "Level4Cloudcover")
      .setOrigin(0, 0)
      .setDepth(-1)
      .setScrollFactor(1.03);
    this.add
      .image(this.width, this.height, "Level4Hills")
      .setOrigin(0, 0)
      .setDepth(-1)
      .setScrollFactor(1.08);
    this.add
      .image(this.width, this.height, "Level4Foreground")
      .setOrigin(0, 0)
      .setDepth(-1)
      .setScrollFactor(1.15);
      this.add
      .image(this.width, this.height, "Level4Preforeground")
      .setOrigin(0, 0)
      .setDepth(-1)
      .setScrollFactor(1.2);

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
    this.finishZone = this.add
      .zone(finishPoint.x, finishPoint.y)
      .setSize(finishPoint.width, finishPoint.height);
    this.physics.world.enable(this.finishZone);
    this.finishZone.body.setAllowGravity(false);
    this.finishZone.body.moves = false;

    //Initialize player and start them at spawn point.
    this.player = new Player(this, spawnPoint.x, spawnPoint.y);

    //Array containing walls that the enemies needs to collide with
    const collisionArray = [this.enemyWalls, this.groundLayer];
    const objects1 = map
      .getObjectLayer("Enemies")
      .objects.filter((obj) => obj.name === "Tweeter");

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

    //set up collision with player and exit door
    this.physics.add.overlap(this.player.sprite, this.finishZone, () => {
      this.physics.world.disable(this.finishZone);
      this.state = victory;
    });

    //set up camera to have bounds on the level and follow the player
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameraDolly = new Phaser.Geom.Point(this.player.x, this.player.y);
    this.cameras.main.startFollow(this.cameraDolly);

    //creates score text at the top of the screen
    this.scoreText = this.add
      .text(20, 5, `Score: ${global.score}`, {
        fontSize: "10px",
        fill: "#ffffff",
        fontFamily: ' "Press Start 2P" ',
      })
      .setScrollFactor(0);

    // Life text at the top of the screen
    this.lifeText = this.add
      .text(150, 5, `Life: ${global.life}`, {
        fontSize: "10px",
        fill: "#ffffff",
        fontFamily: ' "Press Start 2P" ',
      })
      .setScrollFactor(0);

    //timer text at the top of the screen
    this.timeText = this.add
      .text(250, 5, `Time: ${global.elaspedTime}`, {
        fontSize: "10px",
        fill: "#ffffff",
        fontFamily: ' "Press Start 2P" ',
      })
      .setScrollFactor(0);

    const item = "ruby";
    const layerArray = [this.groundLayer];
    const physics = this.physics;
    const playerSprite = this.player.sprite;

    createItem(
      map.getObjectLayer("Gems").objects,
      item,
      (player, item) => collectItem(player, item, this.gemSFX),
      physics,
      layerArray,
      playerSprite
    );

    //Enemy creating function calls
    this.enemyArray.concat(
      flyingJumpEnemyCreator(
        objects1,
        "tweeter-fly",
        Tweeter,
        this,
        collisionArray,
        500,
        "tweeter-hurt",
        this.enemyDeathSFX
      )
    );
  }

  update(time, delta) {
    this.cameraDolly.x = Math.floor(this.player.sprite.x);
    this.cameraDolly.y = Math.floor(this.player.sprite.y);
    this.scoreText.setText("Score: " + global.score);

    //state update check
    if (this.state === dead) {
      this.cameras.main.fadeOut(1000);
      this.sceneFourTheme.stop();

      global.life -= 1;
      this.playerDeathSFX.play();
      playerDied(this.player);

      if (global.life === 0) {
        finalTimeSetter();
        this.cameras.main.once("camerafadeoutcomplete", () => {
          this.scene.stop("LevelFourScene");
          this.scene.start("GameOverScene");
        });
      } else {
        this.cameras.main.once("camerafadeoutcomplete", () => {
          this.scene.restart();
        });
      }

      this.state = transitioning;
    } else if (this.state === transitioning) {
    } else if (this.state === victory) {
      finalTimeSetter();
      this.sceneFourTheme.stop();
      this.fanfareSFX.play();
      this.input.keyboard.enabled = false;
      playerFinish(this.player.sprite);
      this.cameras.main.fadeOut(2000);
      this.cameras.main.once("camerafadeoutcomplete", () => {
        this.scene.start("GameWinScene");
        this.scene.stop("LevelFourScene");
      });
      this.state = transitioning;
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
      displayTimeElapsed(delta, this.timeText);
    }
  }
}
