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
        
    var headY = roadGroup.getChildAt(1).y - this.size;
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
      //add in reverse order to make indexing additions easier : /
      this.grid.unshift(tiles);
    }
    console.log(this.grid);
  },

  addRoad: function(y, tileType, yVelocity){
    var orientation = game.rnd.pick(["left", "right"]);
    var roadTile = this.tileArray[tileType];  
    var tileBuffer = [];
    var tileSet = [];
    for (var x = 1; x <= game.physics.isoArcade.bounds.frontX - this.size; x += this.size) {
        var tile = game.add.isoSprite(x, y, 0, 'tileset', roadTile, roadGroup);
        var tile2 = game.add.isoSprite(x, y + this.size - 1, 0, 'tileset', roadTile, roadGroup);
        Roads.setRoadTileProperties(tile, yVelocity);
        Roads.setRoadTileProperties(tile2, yVelocity);
        
        if (x % (this.size * 2) || x == this.size){
          tileSet.push(tile, tile2);
          tileBuffer.push(tileSet);
          tileSet = [];
        } else {
          tileSet.push(tile, tile2);
        }
    }
    if (roadTile == this.tileArray[2]){
      Roads.loadCars(y, orientation);
    }
    return tileBuffer;
  },
  
  loadCars: function(y, orientation){
    if (orientation == "right"){
      Cars.addCar(game.physics.isoArcade.bounds.frontX - (this.doubleSize * 2), y - (this.size + 10), 0 - game.rnd.between(50, 200));
    } else {
      Cars.addCar((this.doubleSize * 2), y - (this.size + 10), game.rnd.between(50, 200));
    }
  },
  
  setRoadTileProperties: function(tile, yVelocity){
    game.physics.isoArcade.enable(tile);
    tile.body.collideWorldBounds = true;

    tile.body.maxVelocity = new Phaser.Plugin.Isometric.Point3(200,200,200);

    tile.body.drag.set(0, 200, 200);
    tile.body.velocity.y = yVelocity;
    tile.smoothed = false;
  },
  
  createNewRoads: function(yVelocity){
    var tiles = Roads.addRoad(game.physics.isoArcade.bounds.backY + this.doubleSize, game.rnd.pick([2,4,5]), yVelocity)
    this.grid.push(tiles);
    game.iso.simpleSort(roadGroup);
  }
}