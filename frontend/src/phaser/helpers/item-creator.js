export default function createItem(objects, item, collectCallback, physics, layerArray, player) {
    //creates a placeholder array and spreads the item objects to it
    const newArray = [...objects];
    //create new group of items and gives initial xy locations
    const newItemGroup = physics.add.group({
      key: item,
      repeat: newArray.length - 1,
      setXY: { x: 400, y: 0, stepX: 100 },
    });

    newItemGroup.children.iterate(function (child) {
      //iterate through each item object and remove the item once it's been placed at it's location
      const loadedData = newArray.pop();
      //location info from the levels json file
      child.x = loadedData.x;
      child.y = loadedData.y;
      //sets up bounce and gravity
      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.6));
      child.body.setAllowGravity(false)
    });
    //item will given layers to keep them from falling off page
    for (let layer of layerArray) {
      physics.add.collider(newItemGroup, layer);
    }

    //collects on player and item overlap while passing in the sound effect call back
    physics.add.overlap(player, newItemGroup, collectCallback, null);
  }
