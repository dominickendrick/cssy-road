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
    return [cell.isoX - this.size * 0.5, cell.isoY - this.size * 0.5];
  },

  loadTiles: function(){  
    for (var y = this.size; y <= game.physics.isoArcade.bounds.frontY - this.doubleSize; y += this.size) {
      var tiles = Roads.addRoad(y, game.rnd.pick([0,1,2,3,4,5,6,7,8]));
      //add in reverse order to make indexing additions easier : /
      this.grid.unshift(tiles);
    }
  },

  addRoad: function(y, tileType, yVelocity){
    var orientation = game.rnd.pick(["left", "right"]);
    var roadTile = this.tileArray[tileType];  
    var tileContainer = [];
    for (var x = 1; x <= game.physics.isoArcade.bounds.frontX - this.size; x += this.size) {
      var tile = game.add.isoSprite(x, y, 0, 'tiles', roadTile, roadGroup);
      Roads.setRoadTileProperties(tile, yVelocity);
        
        //set tint for bound edges
      if (x <= this.size * 7 || x >= this.size * 17) { tile.tint = 0x86bfda } 

      tile.body.immovable = true;
      tileContainer.push(tile);
    }
    switch (roadTile) {
      case "road_bottom":
      case "road_center":
      case "road_single":
      case "road_top":
        Cars.loadCars(orientation, tileContainer);
      break;

    }
    return tileContainer;
  },
  
  setRoadTileProperties: function(tile, yVelocity){
    game.physics.isoArcade.enable(tile);
    tile.body.maxVelocity = new Phaser.Plugin.Isometric.Point3(200,200,200);
    tile.body.drag.set(200, 200, 200);
    tile.body.setSize(74,74,4,0,0,0)
    tile.body.velocity.y = yVelocity;
    tile.body.allowGravity = false;
    tile.body.blocked = {"down" : true}
    tile.smoothed = false;
  },
  
  createNewRoads: function(yVelocity){
    //get top tile from grid 
    var tile = this.grid[this.grid.length - 1][0]
    var yValue = tile.isoY - this.size
    var tiles = Roads.addRoad(yValue, game.rnd.pick([0,1,2,3,4,5,6,7]), yVelocity)
    this.grid.push(tiles);
    game.iso.simpleSort(roadGroup);
  }
}