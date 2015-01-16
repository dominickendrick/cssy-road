var Player = {
  
  player: '',
  
  init: function(game) {
   this.player = game.add.isoSprite(game.physics.isoArcade.bounds.frontY / 2, game.physics.isoArcade.bounds.frontX / 2, 0, 'player', 0, carsGroup);
   this.player.tint = 0x86bfda;
   this.player.anchor.set(0.5);

   game.physics.isoArcade.enable(this.player);
   this.player.moveable = false;  
   this.player.body.collideWorldBounds = true;
   this.player.body.maxVelocity = new Phaser.Plugin.Isometric.Point3(200,200,200);
   this.player.body.drag.set(200, 200, 200);
   Player.setControls(game, this.player);
   
   return this.player;
  },
  
  update: function(player, yVelocity){
    var zSpeed = -500;
    var playerVelocity = yVelocity;
    
    if(!player.moving){
     player.body.velocity.y = playerVelocity;
    }
    
    if (player.yUpDest > player.body.y){
      player.body.velocity.y = playerVelocity;
      player.yUpDest = player.body.y
      player.body.velocity.z = zSpeed;
      player.moving = false;
    }
    
    if (player.yDownDest < player.body.y){
      player.body.velocity.y = playerVelocity;
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
    
    //speed  = distance / time
    
    // 30 = 64 / 2.2

    this.cursors.up.onDown.add(function () {
       var offset = (GLOBAL_VELOCITY / 8)
       if(!player.moving){
        player.body.velocity.y = -speed - offset;
        player.body.velocity.z = speed - offset / 2;
        player.yUpDest = player.body.y - (interval - offset)
        player.moving = true;
        Player.checkLocation(player);
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