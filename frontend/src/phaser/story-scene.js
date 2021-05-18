import Phaser from "phaser";

export default class StoryScene extends Phaser.Scene {
    constructor() {
      super("StoryScene");
      this.storyMusic;
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
        delay: 50
      })
    }

    typewriteTextWrapped(text) {
      const lines = this.label.getWrappedText(text)
      const wrappedText = lines.join('\n')

      this.typewriteText(wrappedText)
    }

    create(data) {
    this.storyMusic =  this.sound.add("story", {loop:false})
    this.storyMusic.play()
      this.cameras.main.fadeIn(3000);
      let image = this.add.image(
        this.cameras.main.width / 4,
        this.cameras.main.height / 2,
        "lighthouseColor"
        );
        let scaleX = this.cameras.main.width*0.55 / image.width;
        let scaleY = this.cameras.main.height*0.2 / image.height;
        let scale = Math.max(scaleX, scaleY);
        image.setScale(scale).setScrollFactor(0);
        

      //set x/y coordinates of text and max width in px
      this.label = this.add.text(213.5, 10, '', {
        fontSize: 10
      }).setWordWrapWidth(190);

      this.typewriteText(`      While walking through a coastal location, as one does on a regular evening, you notice a rotating light and a giant tower you've apparently never noticed before.

      You decide to investigate only to realize that the tower is a lighthouse! Against your better judgement you venture inside... 

      Oh No! You're trapped inside the lighthouse! The only way to escape is to power through...
      
      Press Enter to start!`);

      this.returnKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
      this.returnKey.on("down", event => {
          this.storyMusic.stop()
          this.scene.start("LevelOneScene");
          this.scene.stop("StoryScene")

        });
      }
    }