import Robot from "../robot1.js";
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
export default function enemyCreator(objectLayerName, annimationName, enemyName, objName, scene, collisionArray, givenMap, givenGroundLayer, enemySpeed) {

  for (let obj of givenMap.getObjectLayer(objectLayerName).objects) {
    switch (obj.name) {
      case objName:

        const createdEnemy = new enemyName(enemySpeed,scene, obj.x, obj.y);
        scene.enemyArray.push(createdEnemy);
        createdEnemy.sprite.setFlipX(false);
        createdEnemy.sprite.anims.play(annimationName, true);
        createdEnemy.sprite.body.collideWorldBounds = true;

        for (let wall of collisionArray) {
          scene.physics.world.addCollider(createdEnemy.sprite, wall, (sprite) => {
            if (sprite.body.touching.right || sprite.body.blocked.right) {
              sprite.setFlipX(true);
              sprite.anims.play(annimationName, true);
              sprite.setVelocityX(-enemySpeed); // turn left
            } else if (
              sprite.body.touching.left ||
              sprite.body.blocked.left
            ) {
              sprite.setFlipX(false);
              sprite.anims.play(annimationName, true);
              sprite.setVelocityX(enemySpeed); // turn right
            }
          });
        }
        scene.physics.world.addCollider(createdEnemy.sprite, givenGroundLayer);

        scene.physics.add.collider(
          scene.player.sprite,
          createdEnemy.sprite,
          function (player, enemy) {
            if (enemy.body.touching.up && player.body.touching.down) {
              // destroy the enemy
              enemy.destroy();
            } else {
              // any other way to collide on an enemy will restart the game
              scene.state = dead;
            }
          },
          null,
          scene
        );

        break;
    }
  }
};