import Phaser from "phaser";

export default class IntroScene extends Phaser.Scene {
  constructor() {
    super("IntroScene");
    this.introMusic;
  }

  preload() {
    //images for intro scene
    this.load.image("play", "src/assets/images/play.png");

    this.load.image(
      "lighthouseIntro",
      "src/assets/images/lighthouse-intro.png"
    );
    this.load.image("lighthouseColor", "src/assets/images/lighthouseColor.png");

    //load sprite sheets for level characters
    this.load.atlas(
      "player",
      "src/assets/spritesheets/Tommy.png",
      "src/assets/spritesheets/Tommy.json"
    );
    this.load.atlas(
      "robot",
      "src/assets/spritesheets/Robot.png",
      "src/assets/spritesheets/Robot.json"
    );
    this.load.atlas(
      "python",
      "src/assets/spritesheets/Python.png",
      "src/assets/spritesheets/Python.json"
    );
    this.load.atlas(
      "bat",
      "src/assets/spritesheets/Bat.png",
      "src/assets/spritesheets/Bat.json"
    );
    this.load.atlas(
      "monitor",
      "src/assets/spritesheets/Monitor.png",
      "src/assets/spritesheets/Monitor.json"
    );
    this.load.atlas(
      "roach",
      "src/assets/spritesheets/Roach.png",
      "src/assets/spritesheets/Roach.json"
    );
    this.load.atlas(
      "tweeter",
      "src/assets/spritesheets/Tweeter.png",
      "src/assets/spritesheets/Tweeter.json"
    );
    //images for story scene
    //images for level one scene
    //load tileset images for layers
    this.load.image("labTiles", "src/assets/tilesets/prop pack.png");
    this.load.image(
      "exitDoorTiles",
      "src/assets/tilesets/House (Outside And Inside) Tileset.png"
    );

    this.load.image("windowTiles", "src/assets/tilesets/background-tiles.png");

    this.load.image(
      "darkIndustrialTiles",
      "src/assets/tilesets/0x72-industrial-tileset-32px-extruded.png"
    );

    this.load.image(
      "invisibleWalls",
      "src/assets/tilesets/Blocks (16 x 16).png"
    );
    this.load.image("closeDaySky", "src/assets/tilesets/Day Close.png");
    this.load.image("midDaySky", "src/assets/tilesets/Day Mid.png");
    this.load.image("farDaySky", "src/assets/tilesets/Day Far.png");
    this.load.image("cloudyDaySky", "src/assets/tilesets/Day Far.png");
    //load map from Json file
    this.load.tilemapTiledJSON("level1map", "src/assets/tilemaps/Level1.json");

    //score increasing items
    this.load.image("gem", "src/assets/images/gem.png");
    this.load.image("ruby", "src/assets/images/ruby.png");
    //images for level two scene

    //load tileset images for layers
    this.load.image(
      "greyTiles",
      "src/assets/tilesets/Gray_Tile_Terrain (16 x 16).png"
    );
    this.load.image(
      "scaffoldingTiles",
      "src/assets/tilesets/Scaffolding_and_BG_Parts (16 x 16).png"
    );
    //load map from Json file
    this.load.tilemapTiledJSON("level2map", "src/assets/tilemaps/Level2.json");

    //images for level three scene
    this.load.image("darkLabTiles", "src/assets/tilesets/DarkLab.png");
    this.load.image("closeNightSky", "src/assets/tilesets/Night Close.png");
    this.load.image("farNightSky", "src/assets/tilesets/Night Far.png");
    this.load.image("moonNightSky", "src/assets/tilesets/NightSky.png");
    //load map from Json file
    this.load.tilemapTiledJSON("level3map", "src/assets/tilemaps/Level3.json");
    //images for level four scene
    this.load.image(
      "lightBrownTiles",
      "src/assets/tilesets/Terrain (16 x 16).png"
    );
    this.load.image(
      "fenceTiles",
      "src/assets/tilesets/Grassland_entities (16 x 16).png"
    );
    this.load.image(
      "foregroundTreeTiles",
      "src/assets/tilesets/1 - Foreground_scenery.png"
    );
    this.load.image("greenHillTiles", "src/assets/tilesets/2 - Hills.png");
    this.load.image(
      "largeCloudTiles",
      "src/assets/tilesets/4 - Cloud_cover_2.png"
    );
    this.load.image(
      "smallCloudTiles",
      "src/assets/tilesets/3 - Cloud_cover_1.png"
    );
    this.load.image("blueSkyTiles", "src/assets/tilesets/5 - Sky_color.png");

    this.load.tilemapTiledJSON("level4map", "src/assets/tilemaps/Level4.json");

    //Sound for Sprites
    this.load.audio("jump", "src/assets/audio/Jump.mp3");
    this.load.audio("playerDeath", "src/assets/audio/Player Death.mp3");
    this.load.audio("enemyDeath", "src/assets/audio/Enemy Death.mp3");
    this.load.audio("fanfare", "src/assets/audio/Fanfare.mp3");

    //Sound for Gems
    this.load.audio("gem", "src/assets/audio/Gem.mp3");

    //Sound for title screen
    this.load.audio("start-menu", "src/assets/audio/Start Menu.mp3");
    //Sound for Story screen
    this.load.audio("story", "src/assets/audio/Story.mp3");
    //Sound for Transition screens
    this.load.audio("transition", "src/assets/audio/Transition.mp3");
    //Sound for Game Over
    this.load.audio("gameOver", "src/assets/audio/Game Over.mp3");
    //Sound for level 1
    this.load.audio("level1", "src/assets/audio/Level1.mp3");
    //Sound for level 2
    this.load.audio("level2", "src/assets/audio/Level2.mp3");
    //Sound for level 3
    this.load.audio("level3", "src/assets/audio/Level3.mp3");
  }
  create(data) {
    this.sound.remove(this.introMusic);

    this.introMusic = this.sound.add("start-menu", { loop: true });

    this.introMusic.play();
    this.cameras.main.fadeIn(3000);
    // let lighthouse = this.add.image(0, 0, "lighthouseIntro").setOrigin(0, 0);

    let image = this.add.image(
      this.cameras.main.width / 2,
      this.cameras.main.height / 2,
      "lighthouseIntro"
    );

    let scaleX = this.cameras.main.width / image.width;
    let scaleY = this.cameras.main.height / image.height;
    let scale = Math.max(scaleX, scaleY);
    image.setScale(scale).setScrollFactor(0);

    this.logo = this.add
      .text(30, 50, "Lighthouse Labs", {
        fontSize: "20px",
        fill: "#ffffff",
        fontFamily: ' "Press Start 2P" ',
      })
      .setOrigin(0, 0);

    this.playButton = this.add.image(200, 140, "play").setScale(1.5);

    this.playButton.setInteractive();

    this.playButton.on("pointerdown", () => {
      global.elapsedTime = 0;
      this.introMusic.stop();
      this.scene.start("StoryScene");
      this.scene.stop("IntroScene");
    });

    this.returnKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.ENTER
    );
    this.returnKey.on("down", (event) => {
      this.introMusic.stop();
      this.scene.start("StoryScene");
      this.scene.stop("IntroScene");
    });
  }
}
