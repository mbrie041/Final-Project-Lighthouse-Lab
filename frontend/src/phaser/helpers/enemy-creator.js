import Phaser from "phaser";
const dead = "dead";
const alive = "alive";
//Function that creates enemies
//Takes the following params:
//1. (String) Name of the object layer that the enemies are on from tiled
//2. (String) Name of the movment annimation from the enemy sprite your generating
//3. (Constructor) The enemy constructor you're passing in
//4. (String) The name of the object in the objectlayer JSON file
//5. (this) The scene
//6. (Array) An array containing the layers you want the sprite to collide with (not including the ground layer)
//7. (Variable) The tile map
//8. (Variable) The ground layer
//*Remember you need an enemyArray declared in your constructor to store enemy sprites for update */
export default function enemyCreator(
  objects,
  annimationName,
  enemyName,
  scene,
  collisionArray,
  enemySpeed,
  deathAnnimationName,
  deathSFX
) {
  const enemyArray = [];
  for (let obj of objects) {
    createEnemy(
      enemyName,
      enemySpeed,
      scene,
      obj,
      enemyArray,
      annimationName,
      collisionArray,
      deathAnnimationName,
      deathSFX
    );
  }
  return enemyArray;
}
function createEnemy(
  enemyName,
  enemySpeed,
  scene,
  obj,
  enemyArray,
  annimationName,
  collisionArray,
  deathAnnimationName,
  deathSFX
) {
  let enemyAlive = true;
  const createdEnemy = new enemyName(enemySpeed, scene, obj.x, obj.y);
  enemyArray.push(createdEnemy);
  createdEnemy.sprite.setFlipX(false);
  createdEnemy.sprite.anims.play(annimationName, true);
  createdEnemy.sprite.body.collideWorldBounds = true;

  const colliderArray = [];

  for (let wall of collisionArray) {
    colliderArray.push(
      scene.physics.world.addCollider(createdEnemy.sprite, wall, (sprite) => {
        if (sprite.body.touching.right || sprite.body.blocked.right) {
          sprite.setFlipX(true);
          sprite.anims.play(annimationName, true);
          sprite.setVelocityX(-enemySpeed);
        } else if (sprite.body.touching.left || sprite.body.blocked.left) {
          sprite.setFlipX(false);
          sprite.anims.play(annimationName, true);
          sprite.setVelocityX(enemySpeed);
        }
      })
    );
  }

  scene.physics.add.collider(
    scene.player.sprite,
    createdEnemy.sprite,
    (player, enemy) => {
      if (enemyAlive) {
        if (enemy.body.touching.up && player.body.touching.down) {
          enemyAlive = false;
          createdEnemy.sprite.body.setAllowGravity(true);
          for (let c of colliderArray) {
            scene.physics.world.removeCollider(c);
          }
          enemy.setFlipY(true);
          enemy.setVelocityX(0);
          enemy.anims.play(deathAnnimationName)
          deathSFX.play()
          enemy.on(Phaser.Animations.Events.ANIMATION_COMPLETE,()=>enemy.destroy());
        } else {
          if (scene.state === alive) {
            scene.state = dead;
          }
        }
      }
    },
    null,
    scene
  );
}
