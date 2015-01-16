var Roads = {
  
  size: 38,
  doubleSize: 72,
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

  update: function(yVelocity){
        
    var headY = roadGroup.getChildAt(1).body.y;
    if( headY >= this.doubleSize + 60){
      Roads.createNewRoads(yVelocity);
    }
    
    roadGroup.forEach(function(roads){
      if ( roads.body.onWall() ){
        roads.kill();
      }
      roads.body.velocity.y = yVelocity;
    });

  },

  loadTiles: function(){  
    var tile;
    for (var y = this.doubleSize; y <= game.physics.isoArcade.bounds.frontY - this.doubleSize; y += this.doubleSize) {
      Roads.addRoad(y, game.rnd.pick([2,4,5]));
    }
  },

  addRoad: function(y, type, yVelocity){
    var roadTile = this.tileArray[type];
    
    for (var x = this.size; x <= game.physics.isoArcade.bounds.frontX - this.size; x += this.size) {
        var tile = game.add.isoSprite(x, y, 0, 'tileset', roadTile, roadGroup);
        var tile2 = game.add.isoSprite(x, y + this.size, 0, 'tileset', roadTile, roadGroup);
        
        game.physics.isoArcade.enable(tile);
        tile.body.collideWorldBounds = true;

        tile.body.maxVelocity = new Phaser.Plugin.Isometric.Point3(200,200,200);

        tile.body.drag.set(0, 200, 200);
        tile.body.velocity.y = yVelocity;
        tile.smoothed = false;
        
        game.physics.isoArcade.enable(tile2);
        tile2.body.collideWorldBounds = true;

        tile2.body.maxVelocity = new Phaser.Plugin.Isometric.Point3(200,200,200);

        tile2.body.drag.set(0, 200, 200);
        tile2.body.velocity.y = yVelocity;
        tile2.smoothed = false;
    }
  },
  
  createNewRoads: function(yVelocity){
    Roads.addRoad(game.physics.isoArcade.bounds.backY + this.size, game.rnd.pick([2,4,5]), yVelocity)
    game.iso.simpleSort(roadGroup);
  }
}