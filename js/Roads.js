var Roads = {
  
  size: 74,
  doubleSize: 152,
  tileArray: [
    "grass",
    "pavement_bottom",
    "pavement_center",
    "pavement_top",
    "road_bottom",
    "road_center",
    "road_single",
    "road_top",
    "water"
  ],

  grid: [],
  
  gridCellCenter: function(cell){
    return [cell.isoX, cell.isoY];
  },
  
  update: function(yVelocity){
        
    var headY = roadGroup.getChildAt(1).isoY - this.size;
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

    for (var y = this.size; y <= game.physics.isoArcade.bounds.frontY - this.doubleSize; y += this.size) {
      var tiles = Roads.addRoad(y, game.rnd.pick([0,1,2,3,4,5,6,7,8]));
      //add in reverse order to make indexing additions easier : /r
      this.grid.unshift(tiles);
    }
  },

  addRoad: function(y, tileType, yVelocity){
    var orientation = game.rnd.pick(["left", "right"]);
    var roadTile = this.tileArray[tileType];  
    var tileBuffer = [];
    var actTile;
    for (var x = 1; x <= game.physics.isoArcade.bounds.frontX - this.size; x += this.size) {
        if (x <= this.size * 4 || x >= this.size * 13) { actTile = this.tileArray[8]; } else { actTile = roadTile } 
        var tile = game.add.isoSprite(x, y, 0, 'tiles', actTile, roadGroup);
        Roads.setRoadTileProperties(tile, yVelocity);
        tileBuffer.push(tile);
    }
    if (roadTile == this.tileArray[7]){
      Roads.loadCars(y, orientation, tileBuffer);
    }
    return tileBuffer;
  },
  
  loadCars: function(y, orientation, tile){
    if (orientation == "right"){
      var frontX = game.physics.isoArcade.bounds.frontX
      Cars.addCars(frontX - (this.doubleSize * 2), y - (this.size + 10), 0 - game.rnd.between(50, 200), tile.pop());
    } else {
      Cars.addCars((this.doubleSize * 2), y - (this.size + 10), game.rnd.between(50, 200), tile[0]);
    }
  },
  
  setRoadTileProperties: function(tile, yVelocity){
    game.physics.isoArcade.enable(tile);
    tile.body.collideWorldBounds = true;

    tile.body.maxVelocity = new Phaser.Plugin.Isometric.Point3(200,200,200);
    tile.body.immovable = true;
    tile.body.drag.set(200, 200, 200);
    tile.body.setSize(74,74,4,0,0,0)
    tile.body.velocity.y = yVelocity;
    tile.smoothed = false;
  },
  
  createNewRoads: function(yVelocity){
    var tiles = Roads.addRoad(game.physics.isoArcade.bounds.backY + this.size, game.rnd.pick([0,1,2,3,4,5,6,7]), yVelocity)
    this.grid.push(tiles);
    game.iso.simpleSort(roadGroup);
  }
}