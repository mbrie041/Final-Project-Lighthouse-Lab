import Phaser from "phaser";
import Player from "./characters/player.js";

export default class GameWinScene extends Phaser.Scene {
  constructor() {
    super("GameWinScene");
    this.gameWinTheme;
  }
  // init(data) {
  //   this.location = data.location;
  // }
  preload() {
    this.load.html("form", "src/assets/form.html");
  }
  create() {
    this.sound.remove(this.gameOverTheme);
    this.gameWinTheme = this.sound.add("gameWin");
    this.gameWinTheme.play();

    // Display Score
    this.add
      .text(20, 5, `Score: ${global.score}`, {
        fontSize: "10px",
        fill: "#ffffff",
        fontFamily: ' "Press Start 2P" ',
      })
      .setScrollFactor(0);
    // Display Life
    this.add
      .text(150, 5, `Life: ${global.life}`, {
        fontSize: "10px",
        fill: "#ffffff",
        fontFamily: ' "Press Start 2P" ',
      })
      .setScrollFactor(0);

    // Display Timer

    this.add
      .text(250, 5, `Time: ${global.finalTimer}`, {
        fontSize: "10px",
        fill: "#ffffff",
        fontFamily: ' "Press Start 2P" ',
      })
      .setScrollFactor(0);

    this.nameInput = this.add.dom(410, 340).createFromCache("form");
    this.message = this.add
      .text(145, 100, "You Win!", {
        color: "#FFFFFF",
        fontSize: "25px",
        fontStyle: "bold",
        align: "center",
      })
      .setOrigin(0);
    this.message = this.add
      .text(130, 150, "ENTER YOUR NAME\n\n\n\nPRESS RETURN TO CONITNUE", {
        color: "#FFFFFF",
        fontSize: "10px",
        align: "center",
      })
      .setOrigin(0);

    console.log(`geolocation data = [${global.latitude}, ${global.longitude}]`);

    this.returnKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.ENTER
    );

    this.returnKey.on("down", (event) => {
      this.gameWinTheme.stop();
      let name = this.nameInput.getChildByName("name");
      if (name.value != "" && global.aboutToChange === 1) {
        global.aboutToChange = 0;
        // post score and username to database
        fetch("http://localhost:3001/api/stats", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            score: global.score,
            name: name.value,
            time: global.finalTimer,
            geolocation: global.latitude,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("Success:", data);
            global.life = 3;
            global.score = 0;
            global.time = 0;
            this.scene.start("IntroScene");
            this.scene.stop("GameWinScene");
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      }
    });
  }
}