var Roads = {
  
  size: 38,
  doubleSize: 76,
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

  grid: [],
  
  gridCellCenter: function(cell){
    return [cell[0].isoX, cell[0].isoY];
  },
  
  update: function(yVelocity){
        
    var headY = roadGroup.getChildAt(1).y - this.size + 10;
    if( headY >= this.size){
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
    var tile = [];

    for (var y = this.size + 1; y <= game.physics.isoArcade.bounds.frontY - this.doubleSize; y += this.doubleSize) {
      var tiles = Roads.addRoad(y, game.rnd.pick([0,2,4]));
      //add in reverse order to make indexing additions easier : /r
      this.grid.unshift(tiles);
    }
  },

  addRoad: function(y, tileType, yVelocity){
    var orientation = game.rnd.pick(["left", "right"]);
    var roadTile = this.tileArray[tileType];  
    var tileBuffer = [];
    var tileSet = [];
    var actTile;
    var count = 0;
    for (var x = 1; x <= game.physics.isoArcade.bounds.frontX - this.size; x += this.size) {
        if (x <= this.size * 8 || x >= this.size * 26) { actTile = this.tileArray[8]; } else { actTile = roadTile } 
        var tile = game.add.isoSprite(x, y, 0, 'tileset', actTile, roadGroup);
        var tile2 = game.add.isoSprite(x, y + this.size - 1, 0, 'tileset', actTile, roadGroup);
        Roads.setRoadTileProperties(tile, yVelocity);
        Roads.setRoadTileProperties(tile2, yVelocity);
        
        if (count == 2){
          tileSet.push(tile, tile2);
          tileBuffer.push(tileSet);
          tileSet = [];
          count = 0;
        } else {
          tileSet.push(tile, tile2);
        }
        count += 1;
    }
    if (roadTile == this.tileArray[4]){
      Roads.loadCars(y, orientation, tileBuffer);
    }
    return tileBuffer;
  },
  
  loadCars: function(y, orientation, tile){
    if (orientation == "right"){
      var frontX = game.physics.isoArcade.bounds.frontX
      Cars.addCars(frontX - (this.doubleSize * 2), y - (this.size + 10), 0 - game.rnd.between(50, 200), tile.pop()[0]);
    } else {
      Cars.addCars((this.doubleSize * 2), y - (this.size + 10), game.rnd.between(50, 200), tile[0][0]);
    }
  },
  
  setRoadTileProperties: function(tile, yVelocity){
    game.physics.isoArcade.enable(tile);
    tile.body.collideWorldBounds = true;

    tile.body.maxVelocity = new Phaser.Plugin.Isometric.Point3(200,200,200);
    tile.body.immovable = true;
    tile.body.drag.set(200, 200, 200);
    tile.body.velocity.y = yVelocity;
    tile.smoothed = false;
  },
  
  createNewRoads: function(yVelocity){
    var tiles = Roads.addRoad(game.physics.isoArcade.bounds.backY + this.doubleSize, game.rnd.pick([2,4,5]), yVelocity)
    this.grid.push(tiles);
    game.iso.simpleSort(roadGroup);
  }
}