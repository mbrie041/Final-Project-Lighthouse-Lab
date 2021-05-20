import Phaser from "phaser";

export default class GameOverScene extends Phaser.Scene {
  constructor() {
    super("GameOverScene");
    this.gameOverTheme
  }

  preload() {
    //loads the submit form
    this.load.html("form", "src/assets/form.html");
  }
  create() {
    //remove sound carryover from previous game
    this.sound.remove(this.gameOverTheme);
    //sets the scene music
    this.gameOverTheme = this.sound.add("gameOver", { volume: 0.5 });
    this.gameOverTheme.play();

    // Display Score
    this.add
      .text(20, 5, `Score: ${global.score}`, {
        fontSize: "10px",
        fill: "#ffffff",
        fontFamily: ' "Press Start 2P" '
      })
      .setScrollFactor(0);
    // Display Life
    this.add
      .text(150, 5, `Life: ${global.life}`, {
        fontSize: "10px",
        fill: "#ffffff",
        fontFamily: ' "Press Start 2P" '
      })
      .setScrollFactor(0);

    // Display Timer
    this.add
      .text(250, 5, `Time: ${global.finalTimer}`, {
        fontSize: "10px",
        fill: "#ffffff",
        fontFamily: ' "Press Start 2P" '
      })
      .setScrollFactor(0);

    //set up values for scoreboard submission
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

    //scene stop on and database submission on button push or click
    this.returnKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    this.returnKey.on("down", event => {
      this.gameOverTheme.stop()
      let name = this.nameInput.getChildByName("name");
      if (name.value != "" && global.aboutToChange === 1) {
        global.aboutToChange = 0;
        // post score and username to database
        fetch('https://5be549b49cb6.ngrok.io/api/stats', {
          'method': 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          'body': JSON.stringify({ 'score': global.score, 'name': name.value, 'time': global.finalTimer })
        })
          .then(response => response.json())
          //restart the game after submission
          .then(data => {
            console.log('Success:', data);
            global.life = 3;
            global.score = 0;
            global.time = 0;
            this.scene.start('IntroScene');
            this.scene.stop('GameOverScene');
          })
          .catch((error) => {
            console.error('Error:', error);
          });
      }
    });
  }
};