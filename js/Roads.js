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
        tile = game.add.isoSprite(x, y, 2, 'tileset', rowTile, road);
        tile.anchor.set(0.5);
        tile.smoothed = false;
    }
  }
}