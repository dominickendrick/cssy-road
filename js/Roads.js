var Roads = {
  
  size: 32,
  
  tileArray: [
      'water',
      'sand',
      'grass',
      'stone',
      'wood',
      'watersand',
      'grasssand',
      'sandstone',
      'bush1',
      'bush2',
      'mushroom',
      'wall',
      'window'
  ],

  loadTiles: function(){  
    var tile;
    for (var y = this.size; y <= game.physics.isoArcade.bounds.frontY - this.size; y += this.size) {
      Roads.addRoad(y, game.rnd.pick([0,1,2]));
    }
  },

  addRoad: function(y, type){
    var road = game.add.group(tileGroup, 'road' + x);
    var rowTile = this.tileArray[type];
    for (var x = this.size; x <= game.physics.isoArcade.bounds.frontX - this.size; x += this.size) {
        var tile = game.add.isoSprite(x, y, 2, 'tileset', rowTile, road);
        tile.anchor.set(0.5);
        tile.smoothed = false;
        //game.physics.isoArcade.enable(tile);

        // Collide with the world bounds so it doesn't go falling forever or fly off the screen!
        //tile.body.collideWorldBounds = true;
    }
  },
  
  createNewRoads: function(){
    console.log("called")
    Roads.addRoad(game.physics.isoArcade.bounds.backY, game.rnd.pick([0,1,2]))
    //move current roads back one tile space
   // tileGroup.getChildAt(30).forEach(function(tiles){ tiles.kill();});
    tileGroup.forEach(function(roads){
      console.log("roads")
     // roads.isoY += this.size;
      roads.forEach(function(tile){
        tile.isoY += 32;
        //tile.body.velocity = 0;
      });
    });
    isoGroup.forEach(function(cubes){
//        cubes.isoY += 32;
    });
  }
}