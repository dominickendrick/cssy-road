var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game', null, true, false);

var BasicGame = function (game) { };

BasicGame.Boot = function (game) { };

var carsGroup, player;
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
//        game.iso.projectionAngle = Phaser.Plugin.Isometric.CLASSIC;
    },
    create: function () {
        // Create a group for our tiles, so we can use Group.sort
        
        worldGroup = game.add.group();
        
        tileGroup = game.add.group(worldGroup);
        carsGroup = game.add.group(worldGroup);

        game.physics.isoArcade.gravity.setTo(0, 0, -500);

        Roads.loadTiles();
        Cars.loadCar();

        player = Player.init(game);

        game.camera.follow(player,Phaser.Camera.FOLLOW_PLATFORMER);
    },
    
    update: function () {    
      Player.update(player);
      Roads.update();
      Cars.update();

      game.physics.isoArcade.collide(carsGroup, player);

    },
    render: function () {
        game.debug.text(game.time.fps || '--', 2, 14, "#a7aebe");
        // carsGroup.forEach(function (tile) {
        //     game.debug.body(tile, 'rgba(189, 221, 235, 0.6)', false);
        // });
    },
    
    
};



game.state.add('Boot', BasicGame.Boot);
game.state.start('Boot');