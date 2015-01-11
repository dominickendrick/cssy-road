tileArray = [];
tileArray[0] = 'water';
tileArray[1] = 'sand';
tileArray[2] = 'grass';
tileArray[3] = 'stone';
tileArray[4] = 'wood';
tileArray[5] = 'watersand';
tileArray[6] = 'grasssand';
tileArray[7] = 'sandstone';
tileArray[8] = 'bush1';
tileArray[9] = 'bush2';
tileArray[10] = 'mushroom';
tileArray[11] = 'wall';
tileArray[12] = 'window';

var loadTiles = function(){
  var size = 32;

  var i = 0, tile;
  for (var y = size; y <= game.physics.isoArcade.bounds.frontY - size; y += size) {
    var rowTile = tileArray[game.rnd.pick([0,1,2])];
      for (var x = size; x <= game.physics.isoArcade.bounds.frontX - size; x += size) {
          tile = game.add.isoSprite(x, y, 2, 'tileset', rowTile, tileGroup);
          tile.anchor.set(0.5);
          tile.smoothed = false;

          i++;
      }
  }
}