//Asteroids.js

export default class Asteroids{
  //constructs the asteroids entity, takes level as parameter
  constructor(level){
		//initialize asteroid list  
	this.asteroidList = [];
    
	//bind class functions
	this.update = this.update.bind(this);
    this.render = this.render.bind(this);
	this.breakAsteroid = this.breakAsteroid.bind(this);
	this.basicCheckCollision = this.basicCheckCollision.bind(this);
	this.advancedCheckCollision = this.advancedCheckCollision.bind(this);
	this.bounce = this.bounce.bind(this);
    this.makeAsteroids.bind(this);
	
	//randomly generate asteroids to fill asteroid list
	this.makeAsteroids(level);
	
	//load Audio
	this.bounceSound = new Audio("AsteroidBounce.wav")
  }
  
  //breaks an asteroid into two smaller asteroids
  breakAsteroid(asteroid){
	  //delete original asteroid
	  this.asteroidList.splice(this.asteroidList.findIndex((ast)=>{return(ast.positionVector.x === asteroid.positionVector.x && ast.positionVector.y === asteroid.positionVector.y);}),1);
	  
	  //make sure the asteroid needs to be split
	  if (asteroid.radius > 25)
	  {
		//create first asteroid  
		var rad = asteroid.radius / 1.5;
	    var positionX = asteroid.positionVector.x + asteroid.radius * .75;
	    var positionY = asteroid.positionVector.y + asteroid.radius * .75; 
	    var velocityX = asteroid.velocityVector.x * 2;
	    var velocityY = asteroid.velocityVector.y / 2;
		  
		this.asteroidList.push({
		  positionVector: {x: positionX, y: positionY},
		  velocityVector: {x: velocityX, y: velocityY},
		  radius: rad,
		  mass: rad,
		  lastBounce: null
		  });
	    
		//create second asteroid
		positionX = asteroid.positionVector.x - asteroid.radius * .75;
	    positionY = asteroid.positionVector.y - asteroid.radius * .75; 
	    velocityX = asteroid.velocityVector.x / 2;
	    velocityY = asteroid.velocityVector.y * 2;
		  
		this.asteroidList.push({
		  positionVector: {x: positionX, y: positionY},
		  velocityVector: {x: velocityX, y: velocityY},
		  radius: rad,
		  mass: rad,
		  lastBounce: null
		  });
	  }
  }
  
  //this preforms a 2d bounce given two asteroids
  //adapted from https://en.wikipedia.org/wiki/Elastic_collision#Two-dimensional_collision_with_two_moving_objects
  bounce(asteroid1, asteroid2){
	  //v1 and v2 are the magnitude of the velocity vector calculated from the x and y components
	  var v1 = Math.sqrt(Math.pow(asteroid1.velocityVector.x, 2)+Math.pow(asteroid1.velocityVector.y, 2));
	  var v2 = Math.sqrt(Math.pow(asteroid2.velocityVector.x, 2)+Math.pow(asteroid2.velocityVector.y, 2));
	  
	  //theta1 and theta are the angles which go along with the magnitude of the velocity vector
	  var theta1 = Math.acos(asteroid1.velocityVector.x/v1);
	  var theta2 = Math.acos(asteroid2.velocityVector.x/v2);
	  
	  //phi is the angle of collision
	  var phi = Math.atan(Math.abs(asteroid2.positionVector.y - asteroid1.positionVector.y) / Math.abs(asteroid2.positionVector.x - asteroid1.positionVector.x));
	  
	  //this is the actual calculation, for an in-depth explanation see the wikipedia page linked above
	  asteroid1.velocityVector.x = (((v1 * Math.cos(theta1 - phi) * (asteroid1.mass - asteroid2.mass))+(2 * asteroid2.mass * v2 * Math.cos(theta2 - phi)))/(asteroid1.mass + asteroid2.mass)) * Math.cos(phi) + v1 * Math.sin(theta1 - phi) * Math.cos(phi + (Math.PI/2));
	  asteroid1.velocityVector.y = (((v1 * Math.cos(theta1 - phi) * (asteroid1.mass - asteroid2.mass))+(2 * asteroid2.mass * v2 * Math.cos(theta2 - phi)))/(asteroid1.mass + asteroid2.mass)) * Math.sin(phi) + v1 * Math.sin(theta1 - phi) * Math.sin(phi + (Math.PI/2));
	  
	  asteroid2.velocityVector.x = (((v2 * Math.cos(theta2 - phi) * (asteroid2.mass - asteroid1.mass))+(2 * asteroid1.mass * v1 * Math.cos(theta1 - phi)))/(asteroid2.mass + asteroid1.mass)) * Math.cos(phi) + v2 * Math.sin(theta2 - phi) * Math.cos(phi + (Math.PI/2));
	  asteroid2.velocityVector.y = (((v2 * Math.cos(theta2 - phi) * (asteroid2.mass - asteroid1.mass))+(2 * asteroid1.mass * v1 * Math.cos(theta1 - phi)))/(asteroid2.mass + asteroid1.mass)) * Math.sin(phi) + v2 * Math.sin(theta2 - phi) * Math.sin(phi + (Math.PI/2));
	  
	  // this prevents the asteroids from double bouncing if contact is greater that one frame
	  asteroid1.lastBounce = asteroid2;
	  asteroid2.lastBounce = asteroid1;
  }
  
  //very simple check collision function that is used 
  //only when ensuring new asteroid lists don't contain overlapping asteroids
  basicCheckCollision(x, y, r){
	  var ret = false;
	  this.asteroidList.forEach((asteroid)=>{
		var distanceSquared =
		  Math.pow(x - asteroid.positionVector.x, 2) +
		  Math.pow(y - asteroid.positionVector.y, 2);
		if(distanceSquared < Math.pow(r + asteroid.radius, 2)) {
			ret= true;
		}
	  });
	  return ret;
  }
  
  //a more advanced check collision with quick reject used 
  //to see if any asteroids collide and need to bounce
  advancedCheckCollision(){
	  for(var i = 0; i< this.asteroidList.length; i++){
		for(var j = i+1; j< this.asteroidList.length; j++){
		  var distanceSquared =
		  Math.pow(this.asteroidList[i].positionVector.x - this.asteroidList[j].positionVector.x, 2) +
		  Math.pow(this.asteroidList[i].positionVector.y - this.asteroidList[j].positionVector.y, 2);
		  if(distanceSquared < Math.pow(this.asteroidList[i].radius + this.asteroidList[j].radius, 2) && (this.asteroidList[i].lastBounce !==  this.asteroidList[j] && this.asteroidList[j].lastBounce !== this.asteroidList[i])) {
			this.bounce(this.asteroidList[i], this.asteroidList[j]);
			//plays bounce audio, with out overlapping audio or skipping audio
			if (!this.bounceSound.ended){
		      this.bounceSound.pause();
		      this.bounceSound.currentTime = 0;
		    }
		    this.bounceSound.play();
		  }
	    }  		  
	  }
	  
  }
  
  //generates an asteroid list,
  //parameter level is used to determine how many asteroids to construct
  makeAsteroids(level){
	for(var i = 0; i < 8+level*2; i ++){
	  //randomly generate the radius
	  var rad = Math.floor(Math.random()*(21))+30;
	  
	  //generate x and y coordinates that do not collide with any
	  //other asteroids and are not too close to the spaceship
	  var positionX = 400;
	  var positionY = 400;
	  var collide = true;
	  while(collide)
	  {	  
	    positionX = 400;
	    while(positionX<450 && positionX>350)
	  	  positionX = Math.floor(Math.random()*(860))-30;
	    
		positionY = 400;
	    while(positionY<450 && positionY >350)
		  positionY = Math.floor(Math.random()*(860))-30;
	    
		collide = this.basicCheckCollision(positionX, positionY, rad);
	  }
	  
	  //generate x and y components of the velocity vector 
	  //making sure none are 0, that's too boring
	  var velocityX = Math.floor(Math.random()*(6))-3;
	  while (velocityX === 0)
		  velocityX = Math.floor(Math.random()*(6))-3;
	  var velocityY = Math.floor(Math.random()*(6))-3;
	  while (velocityY === 0)
		  velocityY = Math.floor(Math.random()*(6))-3;
	  //pushing new asteroid to asteroid list
	  this.asteroidList.push({
		  positionVector: {x: positionX, y: positionY},
		  velocityVector: {x: velocityX, y: velocityY},
		  radius: rad,
		  // mass is set equal to radius on the assumption that the meteors are of uniform density
		  mass: rad,
		  // this prevents the asteroids from double bouncing if contact is greater that one frame
		  bounceBuffer: 0
		  });
	}
  }
  
  //updates the asteroids
  update(){
	this.asteroidList.forEach((asteroid)=>{
	 
	//update position according to velocity  
	asteroid.positionVector.x += asteroid.velocityVector.x;
	asteroid.positionVector.y += asteroid.velocityVector.y;
	 
	//wrap around
	if (asteroid.positionVector.x> 860)
	  asteroid.positionVector.x = -59;
	if (asteroid.positionVector.x< -60)
	  asteroid.positionVector.x = 859;
		
	if (asteroid.positionVector.y> 860)
	  asteroid.positionVector.y = -59;
	if (asteroid.positionVector.y< -60)
	  asteroid.positionVector.y = 859;
	}); 
	//check for asteroid on asteroid collision 
	this.advancedCheckCollision();
  }
  
  render(ctx){
	this.asteroidList.forEach((asteroid)=>{

		//render asteroid
		ctx.save();
		ctx.fillStyle = 'LightGrey';
		ctx.strokeStyle = 'LightGrey';
		ctx.beginPath();
		ctx.arc(asteroid.positionVector.x,asteroid.positionVector.y,asteroid.radius,0,Math.PI/6);
		ctx.lineTo(asteroid.positionVector.x + asteroid.radus / 2, asteroid.positionVector.y + asteroid.radus * Math.sqrt(3)/2);
		ctx.arc(asteroid.positionVector.x,asteroid.positionVector.y,asteroid.radius,Math.PI/3,Math.PI/2);
		ctx.lineTo(asteroid.positionVector.x - asteroid.radus / 2, asteroid.positionVector.y + asteroid.radus * Math.sqrt(3)/2);
		ctx.arc(asteroid.positionVector.x,asteroid.positionVector.y,asteroid.radius,2*Math.PI/3,5*Math.PI/6);
		ctx.lineTo(asteroid.positionVector.x - asteroid.radus, asteroid.positionVector.y);
		ctx.arc(asteroid.positionVector.x,asteroid.positionVector.y,asteroid.radius,Math.PI,7*Math.PI/6);
		ctx.lineTo(asteroid.positionVector.x - asteroid.radus / 2, asteroid.positionVector.y - asteroid.radus * Math.sqrt(3)/2);
		ctx.arc(asteroid.positionVector.x,asteroid.positionVector.y,asteroid.radius,4*Math.PI/3,3*Math.PI/2);
		ctx.lineTo(asteroid.positionVector.x + asteroid.radus / 2, asteroid.positionVector.y - asteroid.radus * Math.sqrt(3)/2);
		ctx.arc(asteroid.positionVector.x,asteroid.positionVector.y,asteroid.radius,5*Math.PI/3,11*Math.PI/6);
		ctx.stroke();
		ctx.fill();
		ctx.restore();
		
	});
  }

}