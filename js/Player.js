var Player = {
  
  player: '',
  snapLocation: { x: 0, y: 0},
  moving: false,
  init: function(game) {
    var bounds = game.physics.isoArcade.bounds;
   // this.player = game.add.isoSprite(bounds.frontY / 2, bounds.frontX / 2, 0, 'player', 0, carsGroup);
    this.player = game.add.isoSprite(bounds.frontY/ 2, bounds.frontX, 0, 'player', 0, carsGroup);
    this.player.tint = 0x86bfda;
    this.player.anchor.set(0.5);

    Player.setControls(game, this.player);

    return this.player;
  },
  
  currentLocation: [7,7],
  
  moving: false,
  update: function(player, yVelocity){
    this.snapToGrid(this.currentLocation);
  },
  
  snapToGrid: function(currentLocation){

    var gridCell = Roads.grid[currentLocation[0]][currentLocation[1]];
    var destination = Roads.gridCellCenter(gridCell);
    this.snapLocation.x = destination[0];
    this.snapLocation.y = destination[1];

    if (!this.moving){
      player.isoX = this.snapLocation.x;
      player.isoY = this.snapLocation.y;
    } else {
      if (player.isoY > (this.snapLocation.y - (size + 5)) && player.isoZ < 20) {
        player.isoZ += 2;
        player.isoY -= 7;        
      } else if (player.isoY < (this.snapLocation.y - (size + 5)) && player.isoZ > 0){
        player.isoZ -= 2;
        player.isoY -= 4;
      } else {
        player.isoZ = 0;
        player.isoX = this.snapLocation.x;
        player.isoY = this.snapLocation.y;
        this.moving = false;
      }
      
    }

  },
  
  getGridLocation: function (player) {
    row = Math.round(player.isoX / doubleSize);
    column = Math.round(player.isoY / doubleSize);
    return [row, column];
  },
 
  setControls: function(game, player){
    // Set up our controls.
    this.cursors = game.input.keyboard.createCursorKeys();

    game.input.keyboard.addKeyCapture([
       Phaser.Keyboard.LEFT,
       Phaser.Keyboard.RIGHT,
       Phaser.Keyboard.UP,
       Phaser.Keyboard.DOWN,
       Phaser.Keyboard.SPACEBAR
    ]);

    player.moving = false;
    
    //speed  = distance / time
    
    // 30 = 64 / 2.2

    this.cursors.up.onDown.add(function () {
      this.moving = true;
      this.currentLocation[0] += 1;
      this.checkLocation(player);
    }, this);
    

    this.cursors.down.onDown.add(function () {
      this.currentLocation[0] -= 1;
    }, this);

    this.cursors.left.onDown.add(function () {
      this.currentLocation[1] -= 1;
    }, this);

    this.cursors.right.onDown.add(function () {
      this.currentLocation[1] += 1;
    }, this);
  },
  
  checkLocation: function(player){
    if(player.y < 400){
      GLOBAL_VELOCITY = 20;
    } else if (player.y < 500){
      GLOBAL_VELOCITY = 400;
    } else {
      GLOBAL_VELOCITY = 30;
    }
    
  }
}