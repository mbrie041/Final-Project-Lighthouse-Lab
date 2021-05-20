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

//states
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
  preload() {}

  create() {
    //adds controls that were removed in previous game
    this.input.keyboard.enabled = true;

    //remove sound carryover from previous game
    this.sound.remove(this.sceneFourTheme);

    //sets the scene music
    this.jumpSFX = this.sound.add("jump", { volume: 0.5 });
    this.gemSFX = this.sound.add("gem", { volume: 0.5 });
    this.fanfareSFX = this.sound.add("fanfare", { volume: 0.5 });
    this.playerDeathSFX = this.sound.add("playerDeath", { volume: 0.5 });
    this.enemyDeathSFX = this.sound.add("enemyDeath", { volume: 0.5 });
    this.sceneFourTheme = this.sound.add("level4", { volume: 0.5, loop: true });
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

    //parallax imaging
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
    //Sets zone from finish point x/y
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

    //creates and array of enemy objects for their locations
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

    //set up item and enemy values before passing them to create item function
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
    //Fix for phaser pixel line issue
    this.cameraDolly.x = Math.floor(this.player.sprite.x);
    this.cameraDolly.y = Math.floor(this.player.sprite.y);

    //updates the play score
    this.scoreText.setText("Score: " + global.score);

    //state update check
    if (this.state === dead) {
      //sets the game start for when a player is dead
      this.cameras.main.fadeOut(1000);
      this.sceneFourTheme.stop();
      global.life -= 1;
      this.playerDeathSFX.play();
      playerDied(this.player);

      //in the dead state, if the player runs out of lives
      if (global.life === 0) {
        //submits final time and ends the scene
        finalTimeSetter();
        this.cameras.main.once("camerafadeoutcomplete", () => {
          this.scene.stop("LevelFourScene");
          this.scene.start("GameOverScene");
        });
      } else {
        //otherwise reset the scene
        this.cameras.main.once("camerafadeoutcomplete", () => {
          this.scene.restart();
        });
      }
      //sets the state to transitioning at the end so you don't loop in dead state
      this.state = transitioning;
    } else if (this.state === transitioning) {
      //state to avoid looping infinitely in other states
    } else if (this.state === victory) {
      //sets the game state for when a player has finished the stage
      //logs the final time since this is the last level
      finalTimeSetter();
      //plays victory music and event by removing player controls
      this.sceneFourTheme.stop();
      this.fanfareSFX.play();
      this.input.keyboard.enabled = false;
      playerFinish(this.player.sprite);
      this.cameras.main.fadeOut(2000);
      //once the camera fade out is complete, the scene ends
      this.cameras.main.once("camerafadeoutcomplete", () => {
        this.scene.start("GameWinScene");
        this.scene.stop("LevelFourScene");
      });
      //sets the state to transitioning at the end so you don't loop in state
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
      //updates the play time
      displayTimeElapsed(delta, this.timeText);
    }
  }
}
