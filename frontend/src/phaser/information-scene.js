import Phaser from "phaser";
import Player from "./player.js";
// global.score = 0;
// let score = 0;


export default class InformationScene extends Phaser.Scene {
  constructor() {
    super("InformationScene");
  }
  init(data) {
    this.location = data.location;
  }
  preload() {
    this.load.html("form", "src/assets/form.html");
  }
  create() {
    console.log("Information Scene")

    this.nameInput = this.add.dom(640, 360).createFromCache("form");
    this.message = this.add.text(640, 250, "Hello, --", {
      color: "#FFFFFF",
      fontSize: 60,
      fontStyle: "bold"
    }).setOrigin(0.5);

    // Display GEO location data
    // this.locationText = this.add.text(200, 300,
    //   `[${this.location.coordinates[1]}, ${this.location.coordinates[0]}]`,
    //   {
    //     color: "#FFFFFF",
    //     fontSize: 20
    //   }
    // ).setOrigin(0.5);

    this.returnKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

    this.returnKey.on("down", event => {
      let name = this.nameInput.getChildByName("name");
      if (name.value != "") {
        // this.message.setText("Hello, " + name.value);
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
};