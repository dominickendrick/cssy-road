var Cars = {
 
  update: function(yVelocity){   
    carsGroup.forEach(function(cars){
      if (cars.key != 'player'){
        cars.body.velocity.y = yVelocity;
        if ( cars.body.onWall() ){
          cars.kill();
        }
      }
    });    
  },
  
  addCars: function(x,y, velocity, tile){   
    game.time.events.repeat(Phaser.Timer.SECOND * game.rnd.pick([3, 4, 5]), 100, this.createCar,this, x, tile, velocity);
  },
  
  createCar: function(x,tile,velocity){
    car = game.add.isoSprite(x, tile.isoY - (size + 5), 0, 'bus', 0, carsGroup);
    car.anchor.set(0.5);
    // Enable the physics body on this car.
    game.physics.isoArcade.enable(car);
    // Collide with the world bounds so it doesn't go falling forever or fly off the screen!
    car.body.collideWorldBounds = true;
    car.body.setSize(145,40,60,0,40,10);
    car.body.velocity.x = velocity;
    car.body.maxVelocity = new Phaser.Plugin.Isometric.Point3(200,200,200);
    // Add some X and Y drag to make cars slow down after being pushed.
    car.body.drag.set(0, 200, 200);
    game.iso.topologicalSort(carsGroup,5);
  }
}