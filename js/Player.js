var Player = {
  
  player: '',
  
  init: function(game) {
   this.player = game.add.isoSprite(game.physics.isoArcade.bounds.frontY / 2, game.physics.isoArcade.bounds.frontX / 2, 0, 'player', 0, carsGroup);
   this.player.tint = 0x86bfda;
   this.player.anchor.set(0.5);

   game.physics.isoArcade.enable(this.player);
   this.player.body.collideWorldBounds = true;
   this.player.body.velocity.y = 100; 
   this.player.body.maxVelocity = new Phaser.Plugin.Isometric.Point3(200,200,200);
  // Add some X and Y drag to make cars slow down after being pushed.
   this.player.body.drag.set(200, 100, 200);
   Player.setControls(game, this.player);
   
   return this.player;
  },
  
  update: function(player){
    var zSpeed = -500;
    
    if(!player.moving){
     player.body.velocity.y = 30;
    }
    
    if (player.yUpDest > player.body.y){
      player.body.velocity.y = 30;
      player.yUpDest = player.body.y
      player.body.velocity.z = zSpeed;
      player.moving = false;
    }
    
    if (player.yDownDest < player.body.y){
      player.body.velocity.y = 30;
      player.yDownDest = player.body.y
      player.body.velocity.z = zSpeed;
      player.moving = false;
    }

    if (player.xLeftDest > player.body.x){
      player.body.velocity.x = 0;
      player.xLeftDest = player.body.x
      player.body.velocity.z = zSpeed;
      player.moving = false;
    }
    
    if (player.xRightDest < player.body.x){
      player.body.velocity.x = 0;
      player.xRightDest = player.body.x
      player.body.velocity.z = zSpeed;
      player.moving = false;
    }
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
       if(!player.moving){
        player.body.velocity.y = -speed / 2;
        player.body.velocity.z = speed / 2;
        player.yUpDest = player.body.y - interval
        player.moving = true;
      }
      
    }, this);

    this.cursors.down.onDown.add(function () {
      if(!player.moving){
        player.body.velocity.y = speed;
        player.body.velocity.z = speed / 2;
        player.yDownDest = player.body.y + interval;
        player.moving = true;
      }
    }, this);

    this.cursors.left.onDown.add(function () {
      if(!player.moving){
        player.body.velocity.x = -speed;
        player.body.velocity.z = speed / 2;
        player.xLeftDest = player.body.x - interval;
        player.moving = true;
      }
    }, this);

    this.cursors.right.onDown.add(function () {
      if(!player.moving){
        player.body.velocity.x = speed;
        player.body.velocity.z = speed / 2;
        player.xRightDest = player.body.x + interval;
        player.moving = true;
      }
    }, this);
  }
}