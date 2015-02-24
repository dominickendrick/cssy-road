var Player = {
  
  player: '',
  snapLocation: { x: 0, y: 0},
  moving: false,
  jumping: false,
  playerScore: 0,
  init: function(game) {
    var bounds = game.physics.isoArcade.bounds;
    this.player = game.add.isoSprite(bounds.frontY/ 2, bounds.frontX, 0, 'player', 0, carsGroup);
    this.player.anchor.set(0.5);
    game.physics.isoArcade.enable(this.player);
    this.player.body.moves = false;
    this.player.body.setSize(50,40,60,-10,0,0);
    Player.setControls(game, this.player);

    return this.player;
  },
  
  currentLocation: [2,12],
  
  moving: false,
  update: function(player, yVelocity){
    this.snapToGrid(this.currentLocation);
  },

  inBoundsLeft: function (){
    return this.currentLocation[1] >= 9
  },

  inBoundsRight: function (){
    return this.currentLocation[1] <= 16
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
        startMod = player.isoY > (this.snapLocation.y - (Roads.size));
        endMod = player.isoY < (this.snapLocation.y - (Roads.size));
        moveAxis = "isoY";
        jumpFunc = function(subject, value){player[subject] -= value};
        break;
      case "down":
        startMod = player.isoY < (this.snapLocation.y + (Roads.size + 5));
        endMod = player.isoY > (this.snapLocation.y + (Roads.size + 5));
        moveAxis = "isoY";
        jumpFunc = function(subject, value){player[subject] += value};
        break;
      case "left":
        startMod = player.isoX > (this.snapLocation.x - (Roads.size + 5));
        endMod = player.isoX < (this.snapLocation.x - (Roads.size + 5));
        moveAxis = 'isoX';
        jumpFunc = function(subject, value){player[subject] -= value};
        break;
      case "right":
        startMod = player.isoX < (this.snapLocation.x + (Roads.size + 5));
        endMod = player.isoX > (this.snapLocation.x + (Roads.size + 5));   
        moveAxis = 'isoX';
        jumpFunc = function(subject, value){player[subject] += value};  
        break;
    }  
    
    if (startMod && player.isoZ < 15) {
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
    game.iso.topologicalSort(carsGroup, 20);
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
      this.updateScore(game);
    }, this);
    

    this.cursors.down.onDown.add(function () {
      this.moving = true;
      this.currentLocation[0] -= 1;
      this.direction = "down";
    }, this);

    this.cursors.left.onDown.add(function () {
      if(this.inBoundsLeft()){
        this.moving = true;
        this.currentLocation[1] -= 1;
        this.direction = "left";
      }
    }, this);

    this.cursors.right.onDown.add(function () {
      if(this.inBoundsRight()){
        this.moving = true;
        this.currentLocation[1] += 1;
        this.direction = "right";
      }
    }, this);
  },
  
  checkLocation: function(player){
    //add new road when player moves forward
    if (game.scoreCount.text == (this.currentLocation[0] - 1) || game.scoreCount.text == 0){
      Roads.createNewRoads(GLOBAL_VELOCITY);
    }
    
    if(player.y < 600){
      GLOBAL_VELOCITY = 70;
    } else if (player.y < 400){
      GLOBAL_VELOCITY = 300;
    } else {
      GLOBAL_VELOCITY = 60;
    }
    GLOBAL_VELOCITY = 0;
  },
  updateScore: function(game){
    if (game.scoreCount.text == (this.currentLocation[0] - 1) || game.scoreCount.text == 0){
      game.scoreCount.text = this.currentLocation[0]
    }
  },
  showLabels: function(game) {
      var style = { font: "20px Arial", fill: "#fff", align: "center" };
      //score text
      var text = "Score :";
      game.scoreLabel = game.add.text(game.width-150, 10, text, style);
      Player.fontStyle(game.scoreLabel)
      
      var count = "0";
      game.scoreCount = game.add.text(game.width-50, 10, count, style);
      Player.fontStyle(game.scoreCount)
  },
  fontStyle: function(item){
    item.fixedToCamera = true;
    item.font = 'VT323';
    item.fontSize = 30;
    item.stroke = '#000000';
    item.strokeThickness = 6;
  },

  hitCar: function(playerSprite, carsGroup, player){
    console.log(playerSprite)
    console.log(carsGroup)
    console.log(player)
    //playerSprite.destroy();
    game.time.events.add(0, Player.gameOver, this);
  },

  gameOver: function() {    
      //Player.currentLocation = [5,12]
      this.game.state.start('Boot', true, false)
  }
}