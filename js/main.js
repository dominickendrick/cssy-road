var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game', null, true, false);

var BasicGame = function (game) { };

BasicGame.Boot = function (game) { };

var carsGroup, player;
var interval = 68;
var speed = 300;
var GLOBAL_VELOCITY = 50;

BasicGame.Boot.prototype =
{

    preload: function () {
        game.load.image('bus', 'assets/bus1.png');
        game.load.image('player', 'assets/cube.png');
        
        game.time.advancedTiming = true;
        game.stage.disableVisibilityChange = true;
        game.plugins.add(new Phaser.Plugin.Isometric(game));

        game.world.setBounds(0, 0, 2048 , 1024);
        // Start the IsoArcade physics system.
        game.physics.startSystem(Phaser.Plugin.Isometric.ISOARCADE);
        
        game.load.atlasJSONHash('tileset', 'assets/tileset.png', 'assets/tileset.json');

        game.iso.anchor.setTo(0.5, 0);

    },
    create: function () {
        roadGroup = game.add.group();
        carsGroup = game.add.group();

        game.physics.isoArcade.gravity.setTo(0, 0, -500);
        game.physics.isoArcade.useQuadTree = true;
        
        Roads.loadTiles();
        player = Player.init(game);

        game.camera.follow(player,Phaser.Camera.FOLLOW_TOPDOWN_TIGHT);
        game.camera.roundPx = false;
    },
    
    update: function () {    
      game.iso.simpleSort(carsGroup);
      Player.update(player, GLOBAL_VELOCITY);
      Roads.update(GLOBAL_VELOCITY);
      Cars.update(GLOBAL_VELOCITY);

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