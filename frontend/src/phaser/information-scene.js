import Phaser from "phaser";
import Player from "./player.js";
global.score = 5;

export default class InformationScene extends Phaser.Scene {
  constructor() {
    super("InformationScene");
  }
  preload() {
    this.load.html("form", "src/assets/form.html");
    // this.load.spritesheet(
    //   "player",
    //   "src/assets/spritesheets/0x72-industrial-player-32px-extruded.png",
    //   {
    //     frameWidth: 32,
    //     frameHeight: 32,
    //     margin: 1,
    //     spacing: 2
    //   }
    // );
    // this.load.image(
    //   "tiles",
    //   "src/assets/tilesets/0x72-industrial-tileset-32px-extruded.png"
    // );
    // this.load.tilemapTiledJSON(
    //   "level2Map",
    //   "src/assets/tilemaps/platformer-simple2.json"
    // );
  }
  create() {
    console.log("Information Scene")
    var text = this.add.text(30, 50, 'Enter your leaderboard name: ', { color: 'white', fontFamily: 'Arial', fontSize: '15px ' });

    this.nameInput = this.add.dom(640, 360).createFromCache("form");
    this.message = this.add.text(640, 250, "Hello, --", {
      color: "#FFFFFF",
      fontSize: 60,
      fontStyle: "bold"
    }).setOrigin(0.5);

    this.returnKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

    this.returnKey.on("down", event => {
      let name = this.nameInput.getChildByName("name");
      if (name.value != "") {
        this.message.setText("Hello, " + name.value);
        // name.value = "";

        // post score and username to database
        fetch('http://localhost:3001/api/scores', {
          'method': 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          'body': JSON.stringify({ 'score': score, 'name': name.value })
        })
          .then(response => response.json())
          .then(data => {
            console.log('Success:', data);
          })
          .catch((error) => {
            console.error('Error:', error);
          });
      }
    });

    // create submit button
    this.submitButton = this.add
      .text(150, 0, "SUBMIT", {
        font: "18px monospace",
        fill: "#000000",
        padding: { x: 20, y: 10 },
        backgroundColor: "#ffffff"
      }).setScrollFactor(0);

    this.submitButton.setInteractive();
    this.submitButton.on("pointerdown", () => {
      fetch('http://localhost:3001/api/scores', {
        'method': 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        'body': JSON.stringify({ score })
      })
        .then(response => response.json())
        .then(data => {
          console.log('Success:', data);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    });
  }
  // update(time, delta) {
  //   // Allow the player to respond to key presses and move itself
  //   this.player.update();

  //   if (this.player.sprite.y > this.groundLayer.height) {
  //     this.player.destroy();
  //     this.scene.restart();
  //   }
  // }
};