var Player = {
  
  player: '',
  
  init: function(game) {
   this.player = game.add.isoSprite(game.physics.isoArcade.bounds.frontY / 2, game.physics.isoArcade.bounds.frontX, 0, 'player', 0, isoGroup);
   this.player.tint = 0x86bfda;
   this.player.anchor.set(0.5);

   game.physics.isoArcade.enable(this.player);
   
   this.player.body.collideWorldBounds = true;
 
   Player.setControls(game);
   
   return this.player;
  },
 
  setControls: function(game){
    // Set up our controls.
    this.cursors = game.input.keyboard.createCursorKeys();

    game.input.keyboard.addKeyCapture([
       Phaser.Keyboard.LEFT,
       Phaser.Keyboard.RIGHT,
       Phaser.Keyboard.UP,
       Phaser.Keyboard.DOWN,
       Phaser.Keyboard.SPACEBAR
    ]);

    this.player.moving = false;

    this.cursors.up.onDown.add(function () {
      if(!this.player.moving){
        this.player.body.velocity.y = -speed;
        this.player.body.velocity.z = speed / 2;
        this.player.yUpDest = this.player.body.y - interval
        this.player.moving = true;
      }
    }, this);

    this.cursors.down.onDown.add(function () {
      if(!this.player.moving){
        this.player.body.velocity.y = speed;
        this.player.body.velocity.z = speed / 2;
        this.player.yDownDest = this.player.body.y + interval;
        this.player.moving = true;
      }
    }, this);

    this.cursors.left.onDown.add(function () {
      if(!this.player.moving){
        this.player.body.velocity.x = -speed;
        this.player.body.velocity.z = speed / 2;
        this.player.xLeftDest = this.player.body.x - interval;
        this.player.moving = true;
      }
    }, this);

    this.cursors.right.onDown.add(function () {
      if(!this.player.moving){
        this.player.body.velocity.x = speed;
        this.player.body.velocity.z = speed / 2;
        this.player.xRightDest = this.player.body.x + interval;
        this.player.moving = true;
      }
    }, this);
  }
}