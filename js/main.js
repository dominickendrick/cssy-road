var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game', null, true, false);

var BasicGame = function (game) { };

BasicGame.Boot = function (game) { };

var isoGroup, player;
var jumpTimer = 0;
var interval = 64;
var speed = 300;

BasicGame.Boot.prototype =
{

    preload: function () {
        game.load.image('cube', 'assets/cube.png');
        game.load.image('player', 'assets/cube.png');
        
        game.time.advancedTiming = true;
        
        game.stage.disableVisibilityChange = true;

        // Add and enable the plug-in.
        game.plugins.add(new Phaser.Plugin.Isometric(game));

        // In order to have the camera move, we need to increase the size of our world bounds.
        game.world.setBounds(0, 0, 2048 , 1024);

        // Start the IsoArcade physics system.
        game.physics.startSystem(Phaser.Plugin.Isometric.ISOARCADE);
        
        game.load.atlasJSONHash('tileset', 'assets/tileset.png', 'assets/tileset.json');
        // This is used to set a game canvas-based offset for the 0, 0, 0 isometric coordinate - by default
        // this point would be at screen coordinates 0, 0 (top left) which is usually undesirable.
        // When using camera following, it's best to keep the Y anchor set to 0, which will let the camera
        // cover the full size of your world bounds.
        game.iso.anchor.setTo(0.5, 0);
    },
    create: function () {
        // Create a group for our tiles, so we can use Group.sort

        tileGroup = game.add.group();
        isoGroup = game.add.group();


        // Set the global gravity for IsoArcade.
        game.physics.isoArcade.gravity.setTo(0, 0, -500);

        // Let's make a load of cubes on a grid, but do it back-to-front so they get added out of order.
        var cube;
        //for (var xx = 1024; xx > 0; xx -= 140) {
            for (var yy = 1024; yy > 0; yy -= 140) {
                // Create a cube using the new game.add.isoSprite factory method at the specified position.
                // The last parameter is the group you want to add it to (just like game.add.sprite)
                cube = game.add.isoSprite(0, yy, 0, 'cube', 0, isoGroup);
                cube.anchor.set(0.5);

                // Enable the physics body on this cube.
                game.physics.isoArcade.enable(cube);

                // Collide with the world bounds so it doesn't go falling forever or fly off the screen!
                cube.body.collideWorldBounds = true;
                cube.body.velocity.x = 100;
                // Add a full bounce on the x and y axes, and a bit on the z axis.
                cube.body.bounce.set(1, 1, 0.2);

                // Add some X and Y drag to make cubes slow down after being pushed.
                cube.body.drag.set(0, 0, 0);
            }
        //}
        Roads.loadTiles();

        player = Player.init(game);

        game.camera.follow(player,Phaser.Camera.FOLLOW_PLATFORMER);
    },
    update: function () {
        var zSpeed = -500;

        if (player.yUpDest > player.body.y){
          player.body.velocity.y = 0;
          player.yUpDest = player.body.y
          player.body.velocity.z = zSpeed;
          player.moving = false;
        }
        
        if (player.yDownDest < player.body.y){
          player.body.velocity.y = 0;
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
      // the y offset and the height of the world are adjusted
        // to match the highest point the hero has reached
      //  this.world.setBounds( 0, player.body.y, this.world.width, this.game.height + player.body.y );
      game.world.setBounds(0, 0, 2048 , player.body.y);
        // the built in camera follow methods won't work for our needs
        // this is a custom follow style that will not ever move down, it only moves up
      //  this.cameraYMin = Math.min( this.cameraYMin, player.body.y - this.game.height + 130 );
      //  this.camera.y = this.cameraYMin;

        // for each plat form, find out which is the highest
        // if one goes below the camera view, then create a new one at a distance from the highest one
        // these are pooled so they are very performant
        // tileGroup.forEachAlive( function( elem ) {
        //   this.platformYMin = Math.min( this.platformYMin, elem.y );
        //   if( elem.y > this.camera.y + this.game.height ) {
        //     elem.kill();
        //     this.platformsCreateOne( this.rnd.integerInRange( 0, this.world.width - 50 ), this.platformYMin - 100, 50 );
        //   }
        // }, this );
        //
        
        // Our collision and sorting code again.
        game.physics.isoArcade.collide(isoGroup, this.processCallback, this.collisionCallback);
        
        game.physics.isoArcade.collide(isoGroup, tileGroup);

        game.iso.topologicalSort(isoGroup);
    },
    render: function () {
        game.debug.text(game.time.fps || '--', 2, 14, "#a7aebe");
    },
    
    prcessCallback: function (obj1, obj2) {
        console.log("collided");
        return true;
    },

    collisionCallback: function (obj1, obj2) {
        if (obj1.key === obj2.key) {
          console.log("cubes collided");
        }
        if (obj1.key == "cube" && obj2.key == "player") {
          console.log("died");
        }

        game.stage.backgroundColor = '#992d2d';

    },
    
    platformsCreateOne: function( x, y, width ) {
      // this is a helper function since writing all of this out can get verbose elsewhere
      var platform = this.tileGroup.getFirstDead();
      platform.reset( x, y );
      platform.scale.x = width;
      platform.scale.y = 16;
      platform.body.immovable = true;
      return platform;
    }
    
};



game.state.add('Boot', BasicGame.Boot);
game.state.start('Boot');