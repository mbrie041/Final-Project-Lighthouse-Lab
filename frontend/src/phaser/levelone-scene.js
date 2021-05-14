import Phaser from "phaser";
import Player from "./player.js";
import Robot from "./robot1.js";
// import Pancake from "./currency.js";
import enemyCreator from "./helpers/enemy-creator.js";
import createItem from "./helpers/item-creator";
const alive = "alive";
const dead = "dead";

let scoreText;
let timeText;
let newItemGroup;

export default class LevelOneScene extends Phaser.Scene {
  constructor() {
    super("LevelOneScene");
    this.state = alive; //sets up state machine
    this.enemyArray = []; //holds all the enemies created through the enemyCreator function
  }
  preload() {
    //load sprite sheets for level characters
    this.load.atlas(
      "player",
      "src/assets/spritesheets/Agent_Mike.png",
      "src/assets/spritesheets/Agent_Mike.json"
    );
    this.load.atlas(
      "robot",
      "src/assets/spritesheets/Robot.png",
      "src/assets/spritesheets/Robot.json"
    );

    //load tileset images for layers
    this.load.image(
      "groundTiles",
      "src/assets/tilesets/Gray_Tile_Terrain (16 x 16).png"
    );
    this.load.image(
      "scaffoldingTiles",
      "src/assets/tilesets/Scaffolding_and_BG_Parts (16 x 16).png"
    );
    this.load.image("exitSignTiles", "src/assets/tilesets/prop pack.png");
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
    this.load.image(
      "invisibleWalls",
      "src/assets/tilesets/Blocks (16 x 16).png"
    );

    //load map from Json file
    this.load.tilemapTiledJSON("level1map", "src/assets/tilemaps/Level2.json");

    //placeholer for score increasing item
    this.load.image("pancake", "src/assets/images/Pancake_Stack (16 x 16).png");
  }

  create() {
    //sets state machine
    this.state = alive;

    //stores level map
    const map = this.make.tilemap({ key: "level1map" });

    //store values for tiles that require collision
    const invisibleTiles = map.addTilesetImage(
      "Blocks (16 x 16)",
      "invisibleWalls"
    );
    const groundTiles = map.addTilesetImage(
      "Gray_Tile_Terrain (16 x 16)",
      "groundTiles"
    );
    const scaffoldingTiles = map.addTilesetImage(
      "Scaffolding_and_BG_Parts (16 x 16)",
      "scaffoldingTiles"
    );
    const exitSignTiles = map.addTilesetImage("prop pack", "exitSignTiles");
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

    //Initialize player and start them at spawn point.
    this.player = new Player(this, spawnPoint.x, spawnPoint.y);

    //Array containing walls that the enemies needs to collide with
    const collisionArray = [this.enemyWalls, this.scaffoldingLayer];
    const objects = map.getObjectLayer("Enemies").objects.filter((obj)=>obj.name === "Robot1");
    this.enemyArray.concat(
      enemyCreator(
        objects,
        "robot-walk",
        Robot,
        this,
        collisionArray,
        this.groundLayer,
        50
      )
    );

    //set up collision for the level
    this.scaffoldingLayer.setCollisionByProperty({ collides: true });
    this.groundLayer.setCollisionByProperty({ collides: true });
    this.enemyWalls.setCollisionByProperty({ collides: true });
    this.physics.world.setBoundsCollision(true, true, true, false);
    this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

    //sets up collision for the player
    this.physics.world.addCollider(this.player.sprite, this.scaffoldingLayer);
    this.physics.world.addCollider(this.player.sprite, this.groundLayer);
    this.player.sprite.body.collideWorldBounds = true;

    //set up camera to have bounds on the level and follow the player
    this.cameras.main.startFollow(this.player.sprite);
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

    //creates score text at the top of the screen
    scoreText = this.add
    .text(20, 5, 'Score: 0', {
      fontSize: '10px',
      fill: '#ffffff',
      fontFamily: ' "Press Start 2P" '
    })
    .setScrollFactor(0);

    //timer text at the top of the screen
    timeText = this.add
      .text(250, 5, `Time: ${global.elaspedTime}`, {
        fontSize: "10px",
        fill: "#ffffff",
        fontFamily: ' "Press Start 2P" '
      })
      .setScrollFactor(0);

    const item = "pancake";
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
    //state update check
    if (this.state === dead) {
      this.player.destroy();
      this.scene.restart();
    } else {
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
  let sec = (global.elapsedTime % 60).toFixed(2);

  if (min < 10) {
    min = "0" + min;
  }
  if (sec < 10) {
    sec = "0" + sec;
  }
  timeText.setText("Time: " + min + ":" + sec);
}
