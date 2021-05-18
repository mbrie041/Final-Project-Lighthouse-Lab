import Phaser from "phaser";

export default class TransitionL3Scene extends Phaser.Scene {
    constructor() {
      super("TransitionL3Scene");
    }

    preload() {

    }

    typewriteText(text) {
      const length = text.length
      let i = 0
      this.time.addEvent({
        callback: () => {
          this.label.text += text[i]
            ++i
        },
        repeat: length - 1,
        delay: 30
      })
    }

    typewriteTextWrapped(text) {
      const lines = this.label.getWrappedText(text)
      const wrappedText = lines.join('\n')

      this.typewriteText(wrappedText)
    }

    create(data) {

      this.cameras.main.fadeIn(3000);

      //set x/y coordinates of text and max width in px
      this.label = this.add.text(50, 50, '').setWordWrapWidth(300);

      this.typewriteText('to the dark outdoor scene');

  
      // this.label.setInteractive();
        
      // this.label.on("pointerdown", () => {
      //     this.scene.start("LevelOneScene");
      //   });

      //transition scene when return key is entered
      this.returnKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
      this.returnKey.on("down", event => {
          this.scene.start("LevelThreeScene");
        });
      }
    }