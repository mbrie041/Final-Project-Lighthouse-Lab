import Phaser from "phaser";
import Player from "./player.js";
// global.score = 0;
// global.score = 99;


export default class GameOverScene extends Phaser.Scene {
  constructor() {
    super("GameOverScene");
  }
  init(data) {
    this.location = data.location;
  }
  preload() {
    this.load.html("form", "src/assets/form.html");
  }
  create() {
    console.log("GameOver Scene")

    // Display Score
    this.add
      .text(20, 0, `Score: ${global.score}`, {
        fontSize: "16px",
        fill: "#ffffff",
      })
      .setScrollFactor(0);
    // Display Life
    this.add
      .text(150, 0, `Life: ${global.life}`, {
        fontSize: "16px",
        fill: "#ffffff",
      })
      .setScrollFactor(0);

    // Display Timer
    this.add
      .text(250, 0, `Time: ${global.finalTimer}`, {
        fontSize: "16px",
        fill: "#ffffff",
      })
      .setScrollFactor(0);

    this.nameInput = this.add.dom(410, 340).createFromCache("form");
    this.message = this.add.text(130, 100, "GAME OVER!", {
      color: "#FFFFFF",
      fontSize: "25px",
      fontStyle: "bold",
      align: "center"
    }).setOrigin(0);
    this.message = this.add.text(130, 150, "ENTER YOUR NAME\n\n\n\nPRESS RETURN TO CONITNUE", {
      color: "#FFFFFF",
      fontSize: "10px",
      align: "center"
    }).setOrigin(0);

    this.returnKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

    this.returnKey.on("down", event => {

      let name = this.nameInput.getChildByName("name");
      if (name.value != "") {
        // post score and username to database
        fetch('http://localhost:3001/api/scores', {
          'method': 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          'body': JSON.stringify({ 'score': global.score, 'name': name.value })
        })
          .then(response => response.json())
          .then(data => {
            console.log('Success:', data);
            global.life = 3;
            this.scene.start('PlatformerScene', { score: score, life: life });
            this.scene.stop('GameOverScene');
          })
          .catch((error) => {
            console.error('Error:', error);
          });
      }
    });
  }
};