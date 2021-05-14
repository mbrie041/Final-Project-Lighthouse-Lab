export default function createItem(objects, item, collectCallback, physics, layerArray, player) {
    // const objects = map.getObjectLayer("Gems").objects;
    const newArray = [...objects];
    const newItemGroup = physics.add.group({
      key: item,
      repeat: newArray.length - 1,
      setXY: { x: 400, y: 0, stepX: 100 },
    });

    //set bounce when items are initially dropped
    newItemGroup.children.iterate(function (child) {
      const loadedData = newArray.pop();
      child.x = loadedData.x;
      child.y = loadedData.y;
      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.6));
      child.body.setAllowGravity(false)
    });
    //pancakes will collide with ground layer to keep them from falling off page
    for (let layer of layerArray) {
      physics.add.collider(newItemGroup, layer);
    }

    //collects on player and pancake overlap
    physics.add.overlap(player, newItemGroup, collectCallback, null);
  }
