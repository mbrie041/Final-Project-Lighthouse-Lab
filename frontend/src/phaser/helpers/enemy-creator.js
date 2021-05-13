import Robot from "../robot1.js";
const dead = "dead";

export default function enemyCreator(scene,collisionArray, givenMap, givenGroundLayer) {

  for (let obj of givenMap.getObjectLayer("Enemies").objects) {
    switch (obj.name) {
      case "Robot1":
;
        const robot = new Robot(scene, obj.x, obj.y);
        scene.robotArray.push(robot);
        robot.sprite.setFlipX(false);
        robot.sprite.anims.play("robot-walk", true);
        robot.sprite.body.collideWorldBounds = true;

        for (let wall of collisionArray) {
          scene.physics.world.addCollider(robot.sprite, wall, (sprite) => {
            if (sprite.body.touching.right || sprite.body.blocked.right) {
              sprite.setFlipX(true);
              sprite.anims.play("robot-walk", true);
              sprite.setVelocityX(-10); // turn left
            } else if (
              sprite.body.touching.left ||
              sprite.body.blocked.left
            ) {
              sprite.setFlipX(false);
              sprite.anims.play("robot-walk", true);
              sprite.setVelocityX(10); // turn right
            }
          });
        }
        scene.physics.world.addCollider(robot.sprite, givenGroundLayer);

        scene.physics.add.collider(
          scene.player.sprite,
          robot.sprite,
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