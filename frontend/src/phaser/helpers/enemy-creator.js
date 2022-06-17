import Phaser from "phaser";
//scene state machine
const dead = "dead";
const alive = "alive";

//Function that creates enemies
export default function enemyCreator(
  ArrayOfObjects, //array of enemy objects created by parsing the levels JSON file using the getObjectLayer function. Used for spawn locations.
  animationName, //passed in sprite movement animation
  enemyName, //enemy constructor
  scene, //the scene you want to generate the enemy on
  collisionArray, //an array of the layers you want the enemy to collide with
  enemySpeed, //enemys speed that will replace the sprites update() speed
  deathAnimationName, //passed in sprite death animation
  deathSFX //passed in sound effect to play on enemy death
) {
  const enemyArray = []; //set up an array to hold the created enemy objects.

  //iterate through the enemy object in the array and create an enemy for each spawn point
  for (let obj of ArrayOfObjects) {
    //all of these values are being passed in by the enemyCreator function
    createEnemy(
      enemyName,
      enemySpeed,
      scene,
      obj,
      enemyArray,
      animationName,
      collisionArray,
      deathAnimationName,
      deathSFX
    );
  }
  //need to return all of the created enemies objects to the scene to perform update()
  return enemyArray;
}
//function to create the enemies.
function createEnemy(
  enemyName,
  enemySpeed,
  scene,
  obj, //enemy object currently being iterated
  enemyArray,
  animationName,
  collisionArray,
  deathAnimationName,
  deathSFX
) {
  //set enemy initial state
  let enemyAlive = true;

  //initialize new enemy from the current iterations scene, spawn point x/y, and speed
  const createdEnemy = new enemyName(enemySpeed, scene, obj.x, obj.y);

  //push the created enemy object into the array we're returning
  enemyArray.push(createdEnemy);

  //set initial visuals
  createdEnemy.sprite.setFlipX(false);
  createdEnemy.sprite.anims.play(animationName, true);

  //sets up enemy collision with the world bounds
  createdEnemy.sprite.body.collideWorldBounds = true;

  //placeholder array for all of the created enemies collision values
  const colliderArray = [];

  //iterate through each layer that you want the enemy to have collision with
  for (let wall of collisionArray) {
    //push the collsions for the created enemy to the placeholder array
    colliderArray.push(
      //sets up inital collision between the enemy and the layer
      scene.physics.world.addCollider(createdEnemy.sprite, wall, (sprite) => {
        //checks to see if the enemy is touching right against a wall and tells it to turn around
        if (sprite.body.touching.right || sprite.body.blocked.right) {
          sprite.setFlipX(true);
          sprite.anims.play(animationName, true);
          sprite.setVelocityX(-enemySpeed);
          //checks to see if the enemy is touching left against a wall and tells it to turn around
        } else if (sprite.body.touching.left || sprite.body.blocked.left) {
          sprite.setFlipX(false);
          sprite.anims.play(animationName, true);
          sprite.setVelocityX(enemySpeed);
        }
      })
    );
  }
  //sets up collision between created enemy and player
  scene.physics.add.collider(
    scene.player.sprite, //player sprite from the scene
    createdEnemy.sprite, //curent created enemy
    //pass in player and enemy sprite
    (player, enemy) => {
      //using the enemy state, check to see if the player is stomping the enemy
      if (enemyAlive) {
        //if player is stomping the enemy, kill the created enemy
        if (enemy.body.touching.up && player.body.touching.down) {
          //change enemy state to false
          enemyAlive = false;
          //turn on gravity so the enemy death annimation will let it fall of the screen
          createdEnemy.sprite.body.setAllowGravity(true);
          //iterate through each of the of collisions for the created enemy and remove them
          for (let c of colliderArray) {
            //this is primarily so the enemy can't kill the player after the player has killed the enemy
            scene.physics.world.removeCollider(c);
          }
          //enemy death animation event knocking it off the screen
          enemy.setFlipY(true);
          enemy.setVelocityX(0);
          enemy.anims.play(deathAnimationName);
          deathSFX.play();
          //upon completion of death animation event, destory the enemy sprite
          enemy.on(Phaser.Animations.Events.ANIMATION_COMPLETE, () =>
            enemy.destroy()
          );
          //any other collision between the player and created enemy should result in the players death
        } else {
          //checks to see if the scene state is alive
          if (scene.state === alive) {
            //turns the sceen state to dead so the player doesn't get caught getting killed forever.
            scene.state = dead;
          }
        }
      }
    },
    null, //values passed through for the collider function
    scene //current scene to set the colliders in
  );
}
