export default class IntroScene extends Phaser.Scene {
  constructor() {
    super("IntroScene");
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

    

    this.returnKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

    this.returnKey.on("down", event => {

      let name = this.nameInput.getChildByName("name");
      if (name.value != "") {
        this.message.setText("Hello, " + name.value);
        // post score and username to database
        fetch('http://localhost:3001/api/scores', {
          'method': 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          'body': JSON.stringify({ 'score': 50, 'name': name.value })
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

  }
};