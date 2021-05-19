import Phaser from "phaser";

export default class TransitionL1Scene extends Phaser.Scene {
  constructor() {
    super("TransitionL1Scene");
    this.transitionSFX;
  }

  preload() {}
  //moving text function
  typewriteText(text) {
    const length = text.length;
    let i = 0;
    this.time.addEvent({
      callback: () => {
        this.label.text += text[i];
        ++i;
      },
      repeat: length - 1,
      delay: 10,
    });
  }
  //Set up to wrap the text in camera size
  typewriteTextWrapped(text) {
    const lines = this.label.getWrappedText(text);
    const wrappedText = lines.join("\n");
    this.typewriteText(wrappedText);
  }

  create(data) {
    //sets the scene music
    this.transitionSFX = this.sound.add("transition", { volume: 0.5 });
    this.transitionSFX.play();

    this.cameras.main.fadeIn(1000);

    //set x/y coordinates of text and max width in px
    this.label = this.add.text(50, 50, "").setWordWrapWidth(300);

    this.typewriteText(`
            Level One: 
        Lighthouse Lobby
       Welcome to the Lab!


      Press Enter To Start!`);

    //scene stop and change on button push
    this.returnKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.ENTER
    );
    this.returnKey.on("down", (event) => {
      this.transitionSFX.stop();
      this.scene.start("LevelOneScene");
      this.scene.stop("TransitionL1Scene");
    });
  }
}
