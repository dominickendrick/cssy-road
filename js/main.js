var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game', null, true, false);

var BasicGame = function (game) { };

BasicGame.Boot = function (game) { };

var carsGroup, player;
var interval = 68;
var speed = 300;
var worldWidth = 3560;
var worldHeight = 2512;

//  The Google WebFont Loader will look for this object, so create it before loading the script.
WebFontConfig = {

    //  'active' means all requested fonts have finished loading
    //  We set a 1 second delay before calling 'createText'.
    //  For some reason if we don't the browser cannot render the text the first time it's created.
    active: function() { game.time.events.add(10, Player.showLabels, this, game); },

    //  The Google Fonts we want to load (specify as many as you like in the array)
    google: {
      families: ['VT323']
    }

};

BasicGame.Boot.prototype =
{

    preload: function () {
      
        game.load.image('bus', 'assets/bus1.png');
        game.load.image('player', 'assets/chicken.png');
        
        game.time.advancedTiming = true;
        game.stage.disableVisibilityChange = true;
        game.plugins.add(new Phaser.Plugin.Isometric(game));

        game.world.setBounds(0, 0, worldWidth , worldHeight);
        // Start the IsoArcade physics system.
        game.physics.startSystem(Phaser.Plugin.Isometric.ISOARCADE);
        
        game.load.atlasJSONHash('tiles', 'sprites/tiles.png', 'sprites/tiles.json');
        
        game.iso.anchor.setTo(0.6, 0);
        game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');

    },
    create: function () {
      
        roadGroup = game.add.group();
        carsGroup = game.add.group();

        game.physics.isoArcade.gravity.setTo(0, 0, -100);
        game.physics.isoArcade.useQuadTree = true;
        
        Roads.loadTiles();
        player = Player.init(game);

    },
    
    update: function () {    
      Player.update(player);

      game.physics.isoArcade.collide(carsGroup, player, Player.hitCar, null, this, carsGroup, player);
      game.physics.isoArcade.collide(roadGroup, player);

    },
    render: function () {
        game.debug.text(game.time.fps || '--', 2, 14, "#a7aebe");
        // carsGroup.forEach(function (tile) {
        //     game.debug.body(tile, 'rgba(189, 221, 235, 0.6)', false);
        // });
    }
};



game.state.add('Boot', BasicGame.Boot);
game.state.start('Boot');