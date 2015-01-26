var Player = {
  
  player: '',
  snapLocation: { x: 0, y: 0},
  moving: false,
  jumping: false,
  init: function(game) {
    var bounds = game.physics.isoArcade.bounds;
   // this.player = game.add.isoSprite(bounds.frontY / 2, bounds.frontX / 2, 0, 'player', 0, carsGroup);
    this.player = game.add.isoSprite(bounds.frontY/ 2, bounds.frontX, 0, 'player', 0, carsGroup);
    this.player.tint = 0x86bfda;
    this.player.anchor.set(0.5);
    game.physics.isoArcade.enable(this.player);
    this.player.body.moves = false;
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
      this.snapStop();
    } else {
      this.snapJump();
    }
  },
  
  snapJump: function(){
    var startMod;
    var endMod;
    var moveAxis;
    var jumpFunc;
    switch (this.direction) {
      case "up":
        startMod = player.isoY > (this.snapLocation.y - (size));
        endMod = player.isoY < (this.snapLocation.y - (size));
        moveAxis = "isoY";
        jumpFunc = function(subject, value){player[subject] -= value};
        break;
      case "down":
        startMod = player.isoY < (this.snapLocation.y + (size + 5));
        endMod = player.isoY > (this.snapLocation.y + (size + 5));
        moveAxis = "isoY";
        jumpFunc = function(subject, value){player[subject] += value};
        break;
      case "left":
        startMod = player.isoX > (this.snapLocation.x - (size + 5));
        endMod = player.isoX < (this.snapLocation.x - (size + 5));
        moveAxis = 'isoX';
        jumpFunc = function(subject, value){player[subject] -= value};
        break;
      case "right":
        startMod = player.isoX > (this.snapLocation.y + (size + 5));
        endMod = player.isoX < (this.snapLocation.y + (size + 5));   
        moveAxis = 'isoX';
        jumpFunc = function(subject, value){player[subject] += value};  
        break;
    }  
    
    if (startMod && player.isoZ < 20) {
      player.isoZ += 2;
      jumpFunc(moveAxis,7);
    } else if (endMod && player.isoZ > 0){
      player.isoZ -= 2;
      jumpFunc(player[moveAxis],3);
    } else {
      this.snapStop();
    }
    
  },
  
  snapStop: function(){
    player.isoZ = 0;
    player.isoX = this.snapLocation.x;
    player.isoY = this.snapLocation.y;
    this.moving = false;
    game.iso.simpleSort(carsGroup);
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
    
    this.cursors.up.onDown.add(function () {
      this.moving = true;
      this.currentLocation[0] += 1;
      this.direction = "up";
      this.checkLocation(player);
    }, this);
    

    this.cursors.down.onDown.add(function () {
      this.moving = true;
      this.currentLocation[0] -= 1;
      this.direction = "down";
    }, this);

    this.cursors.left.onDown.add(function () {
      this.moving = true;
      this.currentLocation[1] -= 1;
      this.direction = "left";
    }, this);

    this.cursors.right.onDown.add(function () {
      this.moving = true;
      this.currentLocation[1] += 1;
      this.direction = "right";
    }, this);
  },
  
  checkLocation: function(player){
    // if(player.y < 400){
    //   GLOBAL_VELOCITY = 20;
    // } else if (player.y < 500){
    //   GLOBAL_VELOCITY = 400;
    // } else {
    //   GLOBAL_VELOCITY = 30;
    // }
    GLOBAL_VELOCITY = 30;
  }
}