let text = `blah blah blah blah 
blah blah blah blah blah blah blah blah 
blah blah blah 
 `;

 export default class TransitionL1Scene extends Phaser.Scene {
  constructor() {
    super("TransitionL1Scene");
  }

  preload() {

  }
  create(data) {
      
    this.cameras.main.fadeIn(3000);
      
    this.text = this.add.text(0, 100, text, {
          fontSize: '10px',
          fill: '#ffffff',
          fontFamily: ' "Press Start 2P" '
        }).setOrigin(0,0);

        
        this.text.setInteractive();
        this.text.on("pointerdown", () => {
          this.scene.start("LevelOneScene");
        });


      }
    }
    