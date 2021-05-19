import Phaser from "phaser";

export default class TransitionL4Scene extends Phaser.Scene {
  constructor() {
    super("TransitionL4Scene");
    this.transitionSFX;
  }

  preload() {}

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

  typewriteTextWrapped(text) {
    const lines = this.label.getWrappedText(text);
    const wrappedText = lines.join("\n");

    this.typewriteText(wrappedText);
  }

  create(data) {
    this.transitionSFX = this.sound.add("transition", {volume: 0.5});
    this.transitionSFX.play();
    this.cameras.main.fadeIn(1000);

    //set x/y coordinates of text and max width in px
    this.label = this.add.text(50, 50, "").setWordWrapWidth(300);

    this.typewriteText(`
          Level Four: 
       Tweeter Sanctuary
  Don't Forget to get outside!


      Press Enter To Start!`);

    this.returnKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.ENTER
    );
    this.returnKey.on("down", (event) => {
      this.transitionSFX.stop();
      this.scene.start("LevelFourScene");
      this.scene.stop("TransitionL4Scene");
    });
  }
}
