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
        loadTiles();

        // Create another cube as our 'player', and set it up just like the cubes above.
        player = game.add.isoSprite(game.physics.isoArcade.bounds.frontY, game.physics.isoArcade.bounds.frontX, 0, 'player', 0, isoGroup);
        player.tint = 0x86bfda;
        player.anchor.set(0.5);

        
        game.physics.isoArcade.enable(player);
        player.body.collideWorldBounds = true;

        player.moving = false;
        player.currentPos = player.body.position

        // Set up our controls.
        this.cursors = game.input.keyboard.createCursorKeys();

        this.game.input.keyboard.addKeyCapture([
            Phaser.Keyboard.LEFT,
            Phaser.Keyboard.RIGHT,
            Phaser.Keyboard.UP,
            Phaser.Keyboard.DOWN,
            Phaser.Keyboard.SPACEBAR
        ]);

        var space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        
       this.cursors.up.onDown.add(function () {
           player.body.velocity.y = -speed;
           player.yUpDest = player.body.y - interval
       }, this);
       
       this.cursors.down.onDown.add(function () {
           player.body.velocity.y = speed;
           player.yDownDest = player.body.y + interval
       }, this);
       
       this.cursors.left.onDown.add(function () {
           player.body.velocity.x = -speed;
           player.xLeftDest = player.body.x - interval
       }, this);
       
       this.cursors.right.onDown.add(function () {
           player.body.velocity.x = speed;
           player.xRightDest = player.body.x + interval
       }, this);

        game.camera.follow(player);
    },
    update: function () {

        if (player.yUpDest > player.body.y){
          player.body.velocity.y = 0;
          player.yUpDest = player.body.y
        }
        
        if (player.yDownDest < player.body.y){
          player.body.velocity.y = 0;
          player.yDownDest = player.body.y
        }

        if (player.xLeftDest > player.body.x){
          player.body.velocity.x = 0;
          player.xLeftDest = player.body.x
        }
        
        if (player.xRightDest < player.body.x){
          player.body.velocity.x = 0;
          player.xRightDest = player.body.x
        }
        
        if (player.yDownDest < player.body.y){
          player.body.velocity.y = 0;
          player.yDownDest = player.body.y
        }

        // Our collision and sorting code again.
        game.physics.isoArcade.collide(isoGroup, this.processCallback, this.collisionCallback);
        
        game.physics.isoArcade.collide(isoGroup, tileGroup);

        game.iso.topologicalSort(isoGroup);
    },
    render: function () {
      
        game.debug.text("Move with cursors, jump with space!", 2, 36, "#ffffff");
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

    }
};



game.state.add('Boot', BasicGame.Boot);
game.state.start('Boot');