//Asteroids.js

export default class Asteroids{
  constructor(level){
	this.asteroidList = [];
    this.update = this.update.bind(this);
    this.render = this.render.bind(this);
	this.breakAsteroid = this.breakAsteroid.bind(this);
	this.basicCheckCollision = this.basicCheckCollision.bind(this);
	this.advancedCheckCollision = this.advancedCheckCollision.bind(this);
	this.bounce = this.bounce.bind(this);
    this.makeAsteroids.bind(this);
	this.makeAsteroids(level);
  }
  
  breakAsteroid(asteroid){
	  this.asteroidList.splice(this.asteroidList.findIndex((ast)=>{return(ast.positionVector.x === asteroid.positionVector.x && ast.positionVector.y === asteroid.positionVector.y);}),1);
	  if (asteroid.radius > 25)
	  {
		var rad = asteroid.radius / 2.5;
	    var positionX = asteroid.positionVector.x + asteroid.radius * .75;
	    var positionY = asteroid.positionVector.y + asteroid.radius * .75; 
	    var velocityX = asteroid.velocityVector.x * 2;
	    var velocityY = asteroid.velocityVector.y / 2;
		  
		this.asteroidList.push({
		  positionVector: {x: positionX, y: positionY},
		  velocityVector: {x: velocityX, y: velocityY},
		  radius: rad,
		  mass: rad,
		  bounceBuffer: 0
		  });
		  
		rad = asteroid.radius / 2.5;
	    positionX = asteroid.positionVector.x - asteroid.radius * .75;
	    positionY = asteroid.positionVector.y - asteroid.radius * .75; 
	    velocityX = asteroid.velocityVector.x / 2;
	    velocityY = asteroid.velocityVector.y * 2;
		  
		this.asteroidList.push({
		  positionVector: {x: positionX, y: positionY},
		  velocityVector: {x: velocityX, y: velocityY},
		  radius: rad,
		  mass: rad,
		  bounceBuffer: 0
		  });
	  }
  }
  
  bounce(asteroid1, asteroid2){
	  var v1 = Math.sqrt(Math.pow(asteroid1.velocityVector.x, 2)+Math.pow(asteroid1.velocityVector.y, 2));
	  var v2 = Math.sqrt(Math.pow(asteroid2.velocityVector.x, 2)+Math.pow(asteroid2.velocityVector.y, 2));
	  var theta1 = Math.acos(asteroid1.velocityVector.x/v1);
	  var theta2 = Math.acos(asteroid2.velocityVector.x/v2);
	  var phi = Math.atan(Math.abs(asteroid2.positionVector.y - asteroid1.positionVector.y) / Math.abs(asteroid2.positionVector.x - asteroid1.positionVector.x));
	  
	  asteroid1.velocityVector.x = (((v1 * Math.cos(theta1 - phi) * (asteroid1.mass - asteroid2.mass))+(2 * asteroid2.mass * v2 * Math.cos(theta2 - phi)))/(asteroid1.mass + asteroid2.mass)) * Math.cos(phi) + v1 * Math.sin(theta1 - phi) * Math.cos(phi + (Math.PI/2));
	  asteroid1.velocityVector.y = (((v1 * Math.cos(theta1 - phi) * (asteroid1.mass - asteroid2.mass))+(2 * asteroid2.mass * v2 * Math.cos(theta2 - phi)))/(asteroid1.mass + asteroid2.mass)) * Math.sin(phi) + v1 * Math.sin(theta1 - phi) * Math.sin(phi + (Math.PI/2));
	  
	  asteroid2.velocityVector.x = (((v2 * Math.cos(theta2 - phi) * (asteroid2.mass - asteroid1.mass))+(2 * asteroid1.mass * v1 * Math.cos(theta1 - phi)))/(asteroid2.mass + asteroid1.mass)) * Math.cos(phi) + v2 * Math.sin(theta2 - phi) * Math.cos(phi + (Math.PI/2));
	  asteroid2.velocityVector.y = (((v2 * Math.cos(theta2 - phi) * (asteroid2.mass - asteroid1.mass))+(2 * asteroid1.mass * v1 * Math.cos(theta1 - phi)))/(asteroid2.mass + asteroid1.mass)) * Math.sin(phi) + v2 * Math.sin(theta2 - phi) * Math.sin(phi + (Math.PI/2));
	  
	  asteroid1.bounceBuffer = 5;
	  asteroid2.bounceBuffer = 5;
  }
  
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
  
  advancedCheckCollision(){
	  for(var i = 0; i< this.asteroidList.length; i++){
		for(var j = i+1; j< this.asteroidList.length; j++){
		  var distanceSquared =
		  Math.pow(this.asteroidList[i].positionVector.x - this.asteroidList[j].positionVector.x, 2) +
		  Math.pow(this.asteroidList[i].positionVector.y - this.asteroidList[j].positionVector.y, 2);
		  if(distanceSquared < Math.pow(this.asteroidList[i].radius + this.asteroidList[j].radius, 2) && (this.asteroidList[i].bounceBuffer === 0 || this.asteroidList[j].bounceBuffer === 0)) {
			this.bounce(this.asteroidList[i], this.asteroidList[j]);

		  }
	    }  		  
	  }
	  
  }
  
  makeAsteroids(level){
	for(var i = 0; i < 8+level*2; i ++){
	  var rad = Math.floor(Math.random()*(21))+30;
	  
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
	  
	  var velocityX = Math.floor(Math.random()*(6))-3;
	  var velocityY = Math.floor(Math.random()*(6))-3;

	  this.asteroidList.push({
		  positionVector: {x: positionX, y: positionY},
		  velocityVector: {x: velocityX, y: velocityY},
		  radius: rad,
		  mass: rad,
		  bounceBuffer: 0
		  });
	}
  }
  
  update(){
	this.asteroidList.forEach((asteroid)=>{
		
	  if(asteroid.bounceBuffer > 0)
		 asteroid.bounceBuffer --;
	 
	  asteroid.positionVector.x +=	asteroid.velocityVector.x;
	  asteroid.positionVector.y +=	asteroid.velocityVector.y;
	  
	if (asteroid.positionVector.x-30> 800)
	  asteroid.positionVector.x = -30;
	if (asteroid.positionVector.x+30< 0)
	  asteroid.positionVector.x = 830;
		
	if (asteroid.positionVector.y-30> 800)
	  asteroid.positionVector.y = 1;
	if (asteroid.positionVector.y+30< 0)
	  asteroid.positionVector.y = 799;
	}); 
	this.advancedCheckCollision();
  }
  
  render(ctx){
	this.asteroidList.forEach((asteroid)=>{
		//render hitbox
		/*
		ctx.save();
		ctx.fillStyle = 'LightGrey';
		ctx.strokeStyle = 'LightGrey';
		ctx.beginPath();
		ctx.arc(asteroid.positionVector.x,asteroid.positionVector.y,asteroid.radius,0,2*Math.PI);
		ctx.stroke();
		ctx.fill();
		ctx.restore();
		*/
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