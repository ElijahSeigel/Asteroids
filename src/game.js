//game.js

import Ship from './ship';
import Asteroids from './asteroids';

//a class which encoumpasses the entire game
//controls interaction between entities
//updates and renders each frame
export default class Game{
  constructor(){
	//boring game state variables
	this.paused = true;
	this.level = 1;
	this.lives = 3;
	this.score = 0;
	this.over = false;
	this.input = [];
	
	//construct game entities
	this.ship = new Ship(400,400);
	this.asteroids = new Asteroids(this.level); 
    
	// Create the back buffer canvas
    this.backBufferCanvas = document.createElement('canvas');
    this.backBufferCanvas.width = 800;
    this.backBufferCanvas.height = 800;
    this.backBufferContext = this.backBufferCanvas.getContext('2d');

    // Create the screen buffer canvas
    this.screenBufferCanvas = document.createElement('canvas');
    this.screenBufferCanvas.width = 800;
    this.screenBufferCanvas.height = 800;
    document.body.appendChild(this.screenBufferCanvas);
    this.screenBufferContext = this.screenBufferCanvas.getContext('2d');

    // Create HTML UI Elements
    var message = document.createElement('div');
    message.id = "message";
    message.textContent = "";
    document.body.appendChild(message);

    // Bind class functions
	this.checkCrash = this.checkCrash.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.update = this.update.bind(this);
    this.render = this.render.bind(this);
    this.loop = this.loop.bind(this);

    // Set up event handlers
    window.onkeydown = this.handleInput;
	window.onkeyup = this.handleInput;
	//initial render
	this.render();
	
	// Start the game loop
    this.interval = setInterval(this.loop, 60);


  }

  //function which builds a list of input 
  //keeping track of what keys are currently being pressed 
  //to allow for countinuous input from multiple keys
  handleInput(e) {
    var map = {};
	var map2 = {};
	map2[e.keyCode] = e.type == 'keyup';
	if(!this.paused){
	    if (map2[87] || map2[38]){//w//up
		  this.input = this.input.filter(function(i){
			return i!== 'forward';  
		  });
		}
	    if (map2[65] || map2[37]){//a//left
		  this.input = this.input.filter(function(i){
			return i!== 'left';  
		  });
		}

	    if (map2[68] || map2[39]){//d//right
		  this.input = this.input.filter(function(i){
			return i!== 'right';  
		  });
		}
	    if (map2[83] || map2[40]){//s//down
		  this.input = this.input.filter(function(i){
			return i!== 'brake';  
		  });
		}
	    if (map2[32]){//space
		  this.input = this.input.filter(function(i){
			return i!== 'fire';  
		  });
		}
	}
	map[e.keyCode] = e.type == 'keydown';
	if(!this.paused){
	    if ((map[87] || map[38])&& this.input.findIndex(function(i){return i=== 'forward'})=== -1 )//w//up
  	  	  this.input.push('forward');
	    if ((map[65] || map[37])&& this.input.findIndex(function(i){return i=== 'left'})=== -1 )//a//left
		  this.input.push('left');
	    if ((map[68] || map[39])&& this.input.findIndex(function(i){return i=== 'right'})=== -1 )//d//right
		  this.input.push('right');
	    if ((map[83] || map[40])&& this.input.findIndex(function(i){return i=== 'brake'})=== -1 )//s//down
		  this.input.push('brake');
	    if ((map[32])&& this.input.findIndex(function(i){return i=== 'fire'})=== -1 )//space
		  this.input.push('fire');
		if (map[27])//esc
  	  	  this.paused=true;
	}else{
		if (map[27])//esc
  	  	  this.paused=false;
		  this.render();
	}
  }
  
  //function to update the game world
  update() {
    if(!this.over) {
      // Update ship and asteroids
      this.asteroids.update();
      this.ship.update(this.input);
	  //check if any bullets hit any asteroids
	  this.ship.bullets.forEach((bullet)=>{
		this.asteroids.asteroidList.forEach((asteroid)=>{
		  var distanceSquared = (Math.pow(asteroid.positionVector.x - bullet.x, 2)+Math.pow(asteroid.positionVector.y - bullet.y, 2));
		  if(distanceSquared < Math.pow(asteroid.radius, 2)){
			this.ship.bullets.splice(this.ship.bullets.findIndex((bult)=>{return(bult.x === bullet.x && bult.y === bullet.y);}),1);
			this.asteroids.breakAsteroid(asteroid);
			this.score += 5;
		  }
		});
	  });
      //level cleared
	  if(this.asteroids.asteroidList.length <=0){
		this.level ++;
		this.score += 100;
		this.ship.positionVector.x = 400;
		this.ship.positionVector.y = 400;
		this.ship.velocityVector.x = 0;
		this.ship.velocityVector.y = 0;
		this.asteroids.makeAsteroids(this.level);
	  }
	  //checks if the ship hit an asteroid
	  if(this.ship.imortal <= 0){
	    var v1 = {x: this.ship.positionVector.x+Math.cos(this.ship.angle)* 20, y: this.ship.positionVector.y+Math.sin(this.ship.angle)*20};
	    var v2 = {x: this.ship.positionVector.x+Math.cos(this.ship.angle+2.1588)* 18.0277, y: this.ship.positionVector.y+Math.sin(this.ship.angle+2.1588)*18.0277};
	    var v3 = {x: this.ship.positionVector.x+Math.cos(this.ship.angle+4.1244)* 18.0277, y: this.ship.positionVector.y+Math.sin(this.ship.angle+4.1244)*18.0277};
	    this.asteroids.asteroidList.forEach((asteroid)=>{
		    if(this.checkCrash(v1, v2, v3, asteroid.positionVector, asteroid.radius)){
			  if(this.lives<=0){
			    this.over = true;
			  }
			  else{
			    this.lives --;
		        this.ship.positionVector.x = 400;
		  	    this.ship.positionVector.y = 400;
		  	    this.ship.imortal = 50;
			  }
		    }
	    });
	  }
	}
  }

  //render the game world
  render() {
    //render packground and write from the back buffer
	this.backBufferContext.fillStyle = '#000';
    this.backBufferContext.fillRect(0, 0, 800, 800);
	this.asteroids.render(this.backBufferContext);
    this.ship.render(this.backBufferContext, this.input);
    this.screenBufferContext.drawImage(this.backBufferCanvas,0,0);
	
	//display game over and message
	if(this.over){
	 this.screenBufferContext.fillStyle = 'rgba(255,255,255, .2)';
     this.screenBufferContext.fillRect(0,0, 800, 800);
     this.screenBufferContext.fillStyle = "white";
	 this.screenBufferContext.strokeStyle = "black";
     this.screenBufferContext.fillText("Game Over", 20, 200);
	 this.screenBufferContext.strokeText("Game Over", 20, 200);
	 this.screenBufferContext.fillText("Points: "+ this.score, 20, 250);
	 this.screenBufferContext.strokeText("Points: "+ this.score, 20, 250);
	  }
	//display paused screen and instructions  
    if(this.paused && ! this.over){
	  this.screenBufferContext.fillStyle = 'rgba(255,255,255, .2)';
      this.screenBufferContext.fillRect(0,0, 800, 800);
      this.screenBufferContext.fillStyle = "white";
	  this.screenBufferContext.strokeStyle = "black";
      this.screenBufferContext.font = '40px sans-serif';
	  this.screenBufferContext.fillText("Game Paused", 20, 200);
	  this.screenBufferContext.strokeText("Game Paused", 20, 200);
	  this.screenBufferContext.font = '30px sans-serif';
      this.screenBufferContext.fillText("Press esc to resume", 20, 240);
	  this.screenBufferContext.strokeText("Press esc to resume", 20, 240);
	  this.screenBufferContext.font = '40px sans-serif';
	  this.screenBufferContext.fillText("Instructions", 20, 290);
	  this.screenBufferContext.strokeText("Instructions", 20, 290);
	  this.screenBufferContext.font = '30px sans-serif';
	  this.screenBufferContext.fillText("Destroy all the asteroids to clear a level", 20, 330);
	  this.screenBufferContext.fillText("Forward: 'w' or up arrow", 20, 370);
	  this.screenBufferContext.fillText("Rotate right: 'd' or right arrow", 20, 410);
	  this.screenBufferContext.fillText("Rotate left: 'a' or left arrow", 20, 450);
	  this.screenBufferContext.fillText("Stop: 's' or down arrow", 20, 490);
	  this.screenBufferContext.fillText("Fire blaster: space bar", 20, 530);
	  this.screenBufferContext.strokeText("Destroy all the asteroids to clear a level", 20, 330);
	  this.screenBufferContext.strokeText("Forward: 'w' or up arrow", 20, 370);
	  this.screenBufferContext.strokeText("Rotate right: 'd' or right arrow", 20, 410);
	  this.screenBufferContext.strokeText("Rotate left: 'a' or left arrow", 20, 450);
	  this.screenBufferContext.strokeText("Stop: 's' or down arrow", 20, 490);
	  this.screenBufferContext.strokeText("Fire blaster: space bar", 20, 530);
	  this.screenBufferContext.fillStyle = "white";
      this.screenBufferContext.font = '16px sans-serif';
      this.screenBufferContext.fillText("Points: "+ this.score, 10, 795);
	  this.screenBufferContext.fillText("lives: "+ this.lives, 740, 795);
	  this.screenBufferContext.fillStyle = "white";
	  this.screenBufferContext.font = '30px sans-serif';
	  this.screenBufferContext.fillText("level: "+ this.level, 10, 30);
      }
	//GUI overlay  
	this.screenBufferContext.fillStyle = "white";
    this.screenBufferContext.font = '16px sans-serif';
    this.screenBufferContext.fillText("Points: "+ this.score, 10, 795);
	this.screenBufferContext.fillText("lives: "+ this.lives, 740, 795);
	this.screenBufferContext.fillStyle = "white";
    this.screenBufferContext.font = '30px sans-serif';
	this.screenBufferContext.fillText("level: "+ this.level, 10, 30);
  }
  
  //function that takes in the three vertecies of a triangle,
  //the center of a circle, and the radius of a circle
  //and returns true if they collide
  //adapted from http://www.phatcode.net/articles.php?id=459
  checkCrash(v1, v2, v3, c, r){
	var c1 = {x: c.x - v1.x, y: c.y - v1.y};
	if((c1.x*c1.x + c1.y*c1.y) <= r*r)
		return true;
	var c2 = {x: c.x - v2.x, y: c.y - v2.y};;
	if((c2.x*c2.x + c2.y*c2.y) <= r*r)
		return true;
	var c3 = {x: c.x - v3.x, y: c.y - v3.y};
	if((c3.x*c3.x + c3.y*c3.y) <= r*r)
		return true;
	
	var e1 = {x: v2.x - v1.x, y: v2.y - v1.y};
	var e2 = {x: v3.x - v2.x, y: v3.y - v2.y};
	var e3 = {x: v1.x - v3.x, y: v1.y - v3.y};
	if((e1.y*c1.x)-(e1.x*c1.y) >= 0 &&
	  (e2.y*c2.x)-(e2.x*c2.y) >= 0 &&
	  (e3.y*c3.x)-(e3.x*c3.y) >= 0 ){
	    return true;
	}
	
	var k = c1.x * e1.x + c1.y * e1.y;
	if(k>0){
		var len = e1.x * e1.x + e1.y * e1.y;
		k = (k * k)/len;
		if(k<len){
			if((c1.x*c1.x + c1.y*c1.y) - k <= r*r)
				return true
		}
	}
	
	k = c2.x * e2.x + c2.y * e2.y;
	if(k>0){
		len = e2.x * e2.x + e2.y * e2.y;
		k = (k * k)/len;
		if(k<len){
			if((c2.x*c2.x + c2.y*c2.y) - k <= r*r)
				return true
		}
	}
	
	k = c3.x * e3.x + c3.y * e3.y;
	if(k>0){
		len = e3.x * e3.x + e3.y * e3.y;
		k = (k * k)/len;
		if(k<len){
			if((c3.x*c3.x + c3.y*c3.y) - k <= r*r)
				return true
		}
	}
	
  }
  //game loop, updates and renders each frame
  loop() {
	if(!this.paused){
      this.update();
      this.render();
	}
  }
}