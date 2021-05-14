import Robot from "../robot1.js";
import Phaser from "phaser";
const dead = "dead";
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
  givenGroundLayer,
  enemySpeed
) {
  const enemyArray = [];
  //Iterates through an array of objects create from the tilemaps JSON file
  for (let obj of objects) {
    //switches based on the objects given name

    //set up the initial enemy sprite and stores them in the levels enemy array
    const createdEnemy = new enemyName(enemySpeed, scene, obj.x, obj.y);
    enemyArray.push(createdEnemy);
    createdEnemy.sprite.setFlipX(false);
    createdEnemy.sprite.anims.play(annimationName, true);
    createdEnemy.sprite.body.collideWorldBounds = true;

    //sets up collision for the sprite and when to reverse direction
    for (let wall of collisionArray) {
      scene.physics.world.addCollider(createdEnemy.sprite, wall, (sprite) => {
        if (sprite.body.touching.right || sprite.body.blocked.right) {
          sprite.setFlipX(true);
          sprite.anims.play(annimationName, true);
          sprite.setVelocityX(-enemySpeed); // turn left
        } else if (sprite.body.touching.left || sprite.body.blocked.left) {
          sprite.setFlipX(false);
          sprite.anims.play(annimationName, true);
          sprite.setVelocityX(enemySpeed); // turn right
        }
      });
    }

    //sets up world and player collision for the sprite
    scene.physics.world.addCollider(createdEnemy.sprite, givenGroundLayer);
    scene.physics.add.collider(
      scene.player.sprite,
      createdEnemy.sprite,
      function (player, enemy) {
        if (enemy.body.touching.up && player.body.touching.down) {
          // destroy the enemy
          enemy.destroy();
        } else {
          // any other way to collide on an enemy will kill the player
          scene.state = dead;
        }
      },
      null,
      scene
    );
  }
  return enemyArray;
}
