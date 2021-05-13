import Phaser from "phaser";

let introText = `blah blah blah blah 
blah blah blah blah blah blah blah blah 
blah blah blah 
 `;

export default class IntroScene extends Phaser.Scene {
  constructor() {
    super("IntroScene");
  }
  init(data) {
    this.location = data.location;
  }
  preload() {
    this.load.image("lighthouseIntro", "src/assets/images/lighthouse-intro.png");
    this.load.image("lighthouseColor", "src/assets/images/lighthouseColor.png");
  
  }
  create() {
   this.cameras.main.fadeIn(5000);
  //  this.cameras.main.setBounds(0, 0, lighthouse.widthInPixels, lighthouse.heightInPixels);
  let lighthouse = this.add.image(0, 0, "lighthouseIntro").setOrigin(0, 0)


  let image = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'lighthouseIntro')
  let scaleX = this.cameras.main.width / image.width
  let scaleY = this.cameras.main.height / image.height
  let scale = Math.max(scaleX, scaleY)
  image.setScale(scale).setScrollFactor(0)

    this.logo = this.add.text(30, 50, 'Lighthouse Labs', {
      fontSize: '20px',
      fill: '#ffffff',
      fontFamily: ' "Press Start 2P" ',
      
    }).setOrigin(0,0);

    // this.introText = this.add.text(0, 100, introText, {
    //   fontSize: '10px',
    //   fill: '#ffffff',
    //   fontFamily: ' "Press Start 2P" '
    // }).setOrigin(0,0);

  

  }
};