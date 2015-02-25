var Cars = {
  
  cullCars: function(playerLocation){
    carsGroup.forEach(function(car){
      if (car && car.key != 'player' && car.isoY - playerLocation > 50){
        carsGroup.remove(car);
        car.destroy();
      }
    });
  },

  loadCars: function(orientation, tile){
    if (orientation == "left"){
      var frontX = game.physics.isoArcade.bounds.frontX
      Cars.addCarDispatcher(frontX - (Roads.doubleSize ), 0 - game.rnd.between(50, 200), tile[0], orientation);
    } else {
      Cars.addCarDispatcher((Roads.doubleSize), game.rnd.between(50, 200), tile[0], orientation);
    }
  },
  
  addCarDispatcher: function(x, velocity, tile, orientation){   
    this.createCar(x, tile, velocity, orientation)
    game.time.events.repeat(Phaser.Timer.SECOND * game.rnd.pick([3, 4, 5]), 100, this.createCar, this, x, tile, velocity, orientation);
  },
  
  createCar: function(x, tile, velocity, orientation){
    car = game.add.isoSprite(x, tile.isoY , 0, 'tiles', 'car_' + orientation, carsGroup);
    car.anchor.set(0.5);
    // Enable the physics body on this car.
    game.physics.isoArcade.enable(car);
    // Collide with the world bounds so it doesn't go falling forever or fly off the screen!
    car.body.setSize(90,50,60,-25,10,0);
    car.body.velocity.x = velocity;
    car.body.maxVelocity = new Phaser.Plugin.Isometric.Point3(200,200,200);
    car.body.drag.set(0, 200, 200);
    game.iso.topologicalSort(carsGroup, 20);
    return car;
  }
}