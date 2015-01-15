var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game', null, true, false);

var BasicGame = function (game) { };

BasicGame.Boot = function (game) { };

var isoGroup, player;
var interval = 64;
var speed = 300;

BasicGame.Boot.prototype =
{

    preload: function () {
        game.load.image('bus', 'assets/bus1.png');
        game.load.image('player', 'assets/cube.png');
        
        game.time.advancedTiming = true;
        
        game.stage.disableVisibilityChange = true;

        // Add and enable the plug-in.
        game.plugins.add(new Phaser.Plugin.Isometric(game));

        // In order to have the camera move, we need to increase the size of our world bounds.
        //game.world.setBounds(0, 0, 3074 , 1536);
        game.world.setBounds(0, 0, 2048 , 1024);
        // Start the IsoArcade physics system.
        game.physics.startSystem(Phaser.Plugin.Isometric.ISOARCADE);
        
        game.load.atlasJSONHash('tileset', 'assets/tileset.png', 'assets/tileset.json');
   //     game.load.atlasJSONHash('buses', 'assets/bus1.png', 'assets/buses.json');
        // This is used to set a game canvas-based offset for the 0, 0, 0 isometric coordinate - by default
        // this point would be at screen coordinates 0, 0 (top left) which is usually undesirable.
        // When using camera following, it's best to keep the Y anchor set to 0, which will let the camera
        // cover the full size of your world bounds.
        game.iso.anchor.setTo(0.5, 0);
    },
    create: function () {
        // Create a group for our tiles, so we can use Group.sort
        
        worldGroup = game.add.group();
        
        tileGroup = game.add.group(worldGroup);
        isoGroup = game.add.group(worldGroup);
        playerGroup = game.add.group(worldGroup);

        game.physics.isoArcade.gravity.setTo(0, 0, -500);

        var cube;

        for (var yy = 1024; yy > 0; yy -= 140) {

            cube = game.add.isoSprite(0, yy, 10, 'bus', 0, isoGroup);
            cube.anchor.set(0.5);

            // Enable the physics body on this cube.
            game.physics.isoArcade.enable(cube);

            // Collide with the world bounds so it doesn't go falling forever or fly off the screen!
             cube.body.collideWorldBounds = true;
    
             cube.body.setSize(145,40,60,0,40,10);
             cube.body.velocity.x = 100;

             cube.body.maxVelocity = new Phaser.Plugin.Isometric.Point3(200,200,200);
            // Add some X and Y drag to make cubes slow down after being pushed.
             cube.body.drag.set(0, 200, 200);
        }

        Roads.loadTiles();

        player = Player.init(game);

        game.camera.follow(player,Phaser.Camera.FOLLOW_PLATFORMER);
    },
    
    update: function () {
        
      Player.update(player);

              
      game.physics.isoArcade.collide(isoGroup, tileGroup);
      game.physics.isoArcade.collide(isoGroup, player);

      //game.iso.topologicalSort(tileGroup);
      game.iso.simpleSort(tileGroup);
//      game.iso.topologicalSort(playerGroup);
    },
    render: function () {
        game.debug.text(game.time.fps || '--', 2, 14, "#a7aebe");
        isoGroup.forEach(function (tile) {
                    game.debug.body(tile, 'rgba(189, 221, 235, 0.6)', false);
                });
    },
    
    
};



game.state.add('Boot', BasicGame.Boot);
game.state.start('Boot');