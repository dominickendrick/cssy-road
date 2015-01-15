var Roads = {
  
  size: 34,
  
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
  count: 64,
  update: function(){
    this.count += 1
    if (this.count == 65){
      this.count = 0;
      Roads.createNewRoads();
    }
    game.iso.simpleSort(tileGroup);
    tileGroup.forEach(function(road){
        road.isoY += 0.5;
    });
  },

  loadTiles: function(){  
    var tile;
    for (var y = this.size; y <= game.physics.isoArcade.bounds.frontY - this.size; y += this.size) {
      Roads.addRoad(y, game.rnd.pick([0,1,2]));
    }
  },

  addRoad: function(y, type){
//    var road = game.add.group(tileGroup, 'road' + x);
    var rowTile = this.tileArray[type];
    for (var x = this.size; x <= game.physics.isoArcade.bounds.frontX - this.size; x += this.size) {
        var tile = game.add.isoSprite(x, y, -1, 'tileset', rowTile, tileGroup);
        //tile.anchor.set(0.5);
        tile.smoothed = false;
    }
  },
  
  createNewRoads: function(){
    Roads.addRoad(game.physics.isoArcade.bounds.backY, game.rnd.pick([0,1,2]))
  }
}