import Phaser, { Curves } from "phaser";
let player;
let cursors;
class playGame extends Phaser.Scene {
  constructor() {
    super("PlayGame");
  }
  
  preload() {
    this.load.atlas(
      "Agent_Mike",
      "src/assets/sprites/Agent_Mike.png",
      "src/assets/sprites/Agent_Mike.json"
    );
    this.load.image("background",'src/assets/backgrounds/Cave.png')
    this.load.image(
      "tiles",
      "src/assets/tiles_sets/Gray_Tile_Terrain (16 x 16).png"
    );
    this.load.tilemapTiledJSON("tilemap", "src/assets/mapsets/first_try.json");
  }
  create() {
    this.add.image(400, 300, 'background')
    cursors = this.input.keyboard.createCursorKeys();
    player = Phaser.Physics.Matter.sprite

    this.createAgentMikeAnimations()

    const map = this.make.tilemap({ key: "tilemap" });
    const tileset = map.addTilesetImage("Gray_Tile_Terrain (16 x 16)", "tiles");

    const ground = map.createLayer("Tile Layer 1", tileset);
    ground.setCollisionByProperty({ collides: true })

    this.matter.world.convertTilemapLayer(ground)

    const { width, height } = this.scale

    this.player = this.matter.add.sprite(width * 0.1, height * 0.23, 'Agent_Mike')
      .setFixedRotation()
      // .play('player-idle')


    
    this.cameras.main.startFollow(this.player)

  }
  update() {
    this.player.setVelocity(0);
    let speed = 3;

    if (cursors.left.isDown)
    {
      this.player.flipX = true;
      this.player.setVelocityX(-speed);
      this.player.play('player-walk', true);
    }
    else if (cursors.right.isDown)
    {
      this.player.flipX = false;
      this.player.setVelocityX(speed);
      this.player.play('player-walk', true);
    } 
    else 
    {
      this.player.setVelocityX(0);
      this.player.play('player-idle', true);
    }

    const spaceJustPressed = Phaser.Input.Keyboard.JustDown(cursors.space)
    if (spaceJustPressed)
    {
      this.player.setVelocityY(-20);
    }


  }
  createAgentMikeAnimations() {
    this.anims.create({
      key: 'player-idle',
      frameRate: 2,
      frames: this.anims.generateFrameNames('Agent_Mike', {
        start: 1,
        end: 2,
        prefix: 'MikeRight-Idle',
        suffix: '.png'
      }),
      repeat: -1
    })

    this.anims.create({
      key: 'player-walk',
      frameRate: 10,
      frames: this.anims.generateFrameNames('Agent_Mike', {
        start: 1,
        end: 6,
        prefix: 'Mike-Right',
        suffix: '.png'
      }),
      repeat: -1
    })
  }
}

export default playGame;
