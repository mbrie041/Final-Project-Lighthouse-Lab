import Phaser from "phaser";
import Player from "./player.js";
import Robot from "./robot1.js";
const alive = "alive";
const dead = "dead";
let state = alive;
let zone;

let scoreText;
let timeText;
let pancake;

export default class LevelOneScene extends Phaser.Scene {
  constructor() {
    super("LevelOneScene");
  }
  robotArray = [];
  preload() {
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
    this.load.tilemapTiledJSON("level1map", "src/assets/tilemaps/Level2.json");
    this.load.image("pancake", "src/assets/images/Pancake_Stack (16 x 16).png");
  }

  create() {
    state = alive;

    console.log("This is in sequence");

    const map = this.make.tilemap({ key: "level1map" });
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

    // map.createLayer("Ground", groundTiles)
    map.createLayer("Background", scaffoldingTiles);
    map.createLayer("LightPosts", scaffoldingTiles);
    map.createLayer("Hillside", scaffoldingTiles);
    map.createLayer("ExitDoor", exitDoorTiles);
    map.createLayer("ExitSign", exitSignTiles);
    this.enemyWalls = map.createLayer("InvisibleWalls", invisibleTiles);
    this.enemyWalls.visible = false;
    this.scaffoldingLayer = map.createLayer("Scaffolding", scaffoldingTiles);

    this.groundLayer = map.createLayer("Ground", groundTiles);

    const spawnPoint = map.findObject(
      "Objects",
      (obj) => obj.name === "Spawn Point"
    );

    // const robotSpawn = map.findObject(
    //   "Enemies",
    //   (obj) => obj.name === "Robot1"
    // );
    this.player = new Player(this, spawnPoint.x, spawnPoint.y);
    // this.robot1 = new Robot(this, robotSpawn.x, robotSpawn.y);

    for (let obj of map.getObjectLayer("Enemies").objects) {
      switch (obj.name) {
        case "Robot1":
          const collsionArray = [this.enemyWalls, this.scaffoldingLayer];
          const robot = new Robot(this, obj.x, obj.y);
          this.robotArray.push(robot);
          robot.sprite.setFlipX(false);
          robot.sprite.anims.play("robot-walk", true);
          robot.sprite.body.collideWorldBounds = true;

          for (let wall of collsionArray) {
            this.physics.world.addCollider(robot.sprite, wall, (sprite) => {
              if (sprite.body.touching.right || sprite.body.blocked.right) {
                sprite.setFlipX(true);
                sprite.anims.play("robot-walk", true);
                sprite.setVelocityX(-10); // turn left
              } else if (
                sprite.body.touching.left ||
                sprite.body.blocked.left
              ) {
                sprite.setFlipX(false);
                sprite.anims.play("robot-walk", true);
                sprite.setVelocityX(10); // turn right
              }
            });
          }
          this.physics.world.addCollider(robot.sprite, this.groundLayer);

          this.physics.add.collider(
            this.player.sprite,
            robot.sprite,
            function (player, enemy) {
              if (enemy.body.touching.up && player.body.touching.down) {
                // destroy the enemy
                enemy.destroy();
              } else {
                // any other way to collide on an enemy will restart the game
                state = dead;
              }
            },
            null,
            this
          );

          break;
      }
    }

    // Collide the player against the ground layer - here we are grabbing the sprite property from
    // the player (since the Player class is not a Phaser.Sprite).
    this.scaffoldingLayer.setCollisionByProperty({ collides: true });
    this.groundLayer.setCollisionByProperty({ collides: true });
    this.enemyWalls.setCollisionByProperty({ collides: true });
    this.physics.world.addCollider(this.player.sprite, this.scaffoldingLayer);
    // this.physics.world.addCollider(this.robot1.sprite, this.groundLayer);
    this.physics.world.addCollider(this.player.sprite, this.groundLayer);

    this.player.sprite.body.collideWorldBounds = true;
    this.physics.world.setBoundsCollision(true, true, true, false);
    this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

    this.cameras.main.startFollow(this.player.sprite);
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    // this.cameras.main.setZoom(1,2)
    // this.physics.world.addCollider(this.robot1.sprite, this.enemyWalls);

    // this.physics.add.collider(
    //   this.player.sprite,
    //   this.robot1.sprite,
    //   function (player, enemy) {
    //     if (enemy.body.touching.up && player.body.touching.down) {
    //       // destroy the enemy
    //       enemy.destroy();
    //     } else {
    //       // any other way to collide on an enemy will restart the game
    //       state = dead;
    //     }
    //   },
    //   null,
    //   this
    // );

    scoreText = this.add
      .text(20, 0, `Score: ${global.score}`, {
        fontSize: "16px",
        fill: "#ffffff",
      })
      .setScrollFactor(0);

    //timer text
    timeText = this.add
      .text(250, 0, `Time: ${global.elaspedTime}`, {
        fontSize: "16px",
        fill: "#ffffff",
      })
      .setScrollFactor(0);

    //populate pancake group and populates it. Repeats x amount of times and spreads them stepX apart
    pancake = this.physics.add.group({
      key: "pancake",
      repeat: 20,
      setXY: { x: 400, y: 0, stepX: 100 },
    });

    //set bounce when items are initially dropped
    pancake.children.iterate(function (child) {
      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.6));

      //pancakes will collide with ground layer to keep them from falling off page
    });
    this.physics.add.collider(
      pancake,
      this.groundLayer && this.scaffoldingLayer
    );

    this.physics.add.overlap(this.player.sprite, pancake, collectItem, null);
  }

  update(time, delta) {
    // Allow the player to respond to key presses and move itself

    if (state === dead) {
      this.player.destroy();
      this.scene.restart();
    } else {
      //state is alive
      this.player.update();
      for (let robot of this.robotArray) {
        robot.update();
      }
      if (this.player.sprite.y > this.groundLayer.height) {
        state = dead;
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
