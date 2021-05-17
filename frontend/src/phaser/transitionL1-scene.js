import Phaser from "phaser";

export default class TransitionL1Scene extends Phaser.Scene {
  constructor() {
    super("TransitionL1Scene");
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

    this.cameras.main.fadeIn(3000);

    this.label = this.add.text(50, 50, '').setWordWrapWidth(300)

    this.typewriteText('blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah ')
  }
}
