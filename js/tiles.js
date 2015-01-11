var loadTiles = function(){
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

  var tiles = [
      9, 2, 1, 1, 4, 4, 1, 6, 2, 10, 2,
      2, 6, 1, 0, 4, 4, 0, 0, 2, 2, 2,
      6, 1, 0, 0, 4, 4, 0, 0, 8, 8, 2,
      0, 0, 0, 0, 4, 4, 0, 0, 0, 9, 2,
      0, 0, 0, 0, 4, 4, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 4, 4, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 4, 4, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 4, 4, 0, 0, 0, 0, 0,
      11, 11, 12, 11, 3, 3, 11, 12, 11, 11, 11,
      3, 7, 3, 3, 3, 3, 3, 3, 7, 3, 3,
      7, 1, 7, 7, 3, 3, 7, 7, 1, 1, 7,
      2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 
      2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 
      2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 
      2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 
      2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 
      2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 
      2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 
      2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 
      2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 
      2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 
      2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 
      2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 
      2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 
      2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 
      2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 
      2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 
      2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 
      2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 
      2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 
      2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 
      2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 
      2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 
      2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 
      2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 
  
      ];

  var size = 32;

  var i = 0, tile;
  for (var y = size; y <= game.physics.isoArcade.bounds.frontY - size; y += size) {
      for (var x = size; x <= game.physics.isoArcade.bounds.frontX - size; x += size) {
          // this bit would've been so much cleaner if I'd ordered the tileArray better, but I can't be bothered fixing it :P

          tile = game.add.isoSprite(x, y, 2, 'tileset', tileArray[game.rnd.pick([0,1,2])], tileGroup);
          tile.anchor.set(0.5);
          tile.smoothed = false;
          if (tiles[i] === 4) {
              tile.isoZ += 6;
          }
          if (tiles[i] <= 10 && (tiles[i] < 5 || tiles[i] > 6)) {
             tile.scale.x = game.rnd.pick([-1, 1]);
          }
          i++;
      }
  }
}