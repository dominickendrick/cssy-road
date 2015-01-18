var Player = {
  
  player: '',
  
  init: function(game) {
    var bounds = game.physics.isoArcade.bounds;
    this.player = game.add.isoSprite(bounds.frontY / 2, bounds.frontX / 2, 0, 'player', 0, carsGroup);
    this.player.tint = 0x86bfda;
    this.player.anchor.set(0.5);

    // game.physics.isoArcade.enable(this.player);
   //  this.player.moveable = false;
   //  this.player.body.collideWorldBounds = true;
   //  this.player.body.maxVelocity = new Phaser.Plugin.Isometric.Point3(200,200,200);
   //  this.player.body.drag.set(200, 200, 200);
    Player.setControls(game, this.player);

    return this.player;
  },
  
  currentLocation: [7,7],
  
  update: function(player, yVelocity){
    // var zSpeed = -500;
  //   var playerVelocity = yVelocity;
  //
  //   if(!player.moving){
  //    player.body.velocity.y = playerVelocity;
  //   }
  //
  //   if (player.yUpDest > player.body.y){
  //     player.body.velocity.y = playerVelocity;
  //     player.yUpDest = player.body.y
  //     player.body.velocity.z = zSpeed;
  //     player.moving = false;
  //   }
  //
  //   if (player.yDownDest < player.body.y){
  //     player.body.velocity.y = playerVelocity;
  //     player.yDownDest = player.body.y
  //     player.body.velocity.z = zSpeed;
  //     player.moving = false;
  //   }
  //
  //   if (player.xLeftDest > player.body.x){
  //     player.body.velocity.x = 0;
  //     player.xLeftDest = player.body.x
  //     player.body.velocity.z = zSpeed;
  //     player.moving = false;
  //   }
  //
  //   if (player.xRightDest < player.body.x){
  //     player.body.velocity.x = 0;
  //     player.xRightDest = player.body.x
  //     player.body.velocity.z = zSpeed;
  //     player.moving = false;
  //   }
    //this.currentLocation = this.getGridLocation(player);
    this.snapToGrid(this.currentLocation);
  },
  
  snapToGrid: function(currentLocation){
    var gridCell = Roads.grid[currentLocation[0]][currentLocation[1]];
    var snapLocation = Roads.gridCellCenter(gridCell);
    player.isoX = snapLocation[0];
    player.isoY = snapLocation[1];
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
      this.currentLocation[0] -= 1;
    }, this);
    

    this.cursors.down.onDown.add(function () {
      this.currentLocation[0] += 1;
    }, this);

    this.cursors.left.onDown.add(function () {
      this.currentLocation[1] -= 1;
    }, this);

    this.cursors.right.onDown.add(function () {
      this.currentLocation[1] += 1;
    }, this);
  },
  
  checkLocation: function(player){
    // if(player.body.y < 400){
    //   GLOBAL_VELOCITY = 120;
    // } else if (player.body.y < 500){
    //   GLOBAL_VELOCITY = 150;
    // } else {
      GLOBAL_VELOCITY = 30;
  //  }
    
  }
}