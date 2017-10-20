import Ship from './ship';
import Asteroids from './asteroids';

export default class Game{
  constructor(){
	  this.paused = true;
	  this.level = 1;
	  this.lives = 3;
	  this.score = 0;
	  this.over = false;
	  this.input = [];
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
    this.gameOver = this.gameOver.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.update = this.update.bind(this);
    this.render = this.render.bind(this);
    this.loop = this.loop.bind(this);
    // Set up event handlers
    window.onkeydown = this.handleInput;
	window.onkeyup = this.handleInput;
	// Start the game loop
    this.interval = setInterval(this.loop, 50);
    // Game music
	/***ADD GAME MUSIC HERE LATER***/
	this.render();
  }
	/** @function gameOver
    * Displays a game over message using the DOM
    */
  gameOver() {
    var message = document.getElementById("message");
    message.innerText = "Game Over";
    this.over = true;
  }
  /** @method handleKeyDown
    * register when a key is pressed and change
    * our input object.
    */
  handleInput(e) {
    var map = {};
	var map2 = {};
	map2[e.keyCode] = e.type == 'keyup';
	if(!this.paused){
	    if (map2[87] || map2[38]){
		  this.input = this.input.filter(function(i){
			return i!== 'forward';  
		  });
		}
	    if (map2[65] || map2[37]){
		  this.input = this.input.filter(function(i){
			return i!== 'left';  
		  });
		}

	    if (map2[68] || map2[39]){
		  this.input = this.input.filter(function(i){
			return i!== 'right';  
		  });
		}
	    if (map2[83] || map2[40]){
		  this.input = this.input.filter(function(i){
			return i!== 'brake';  
		  });
		}
	    if (map2[32]){
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
  /** @method update
    * Updates the game world.
    */
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
    }
  }
  /** @method render
    * Renders the game world
    */
  render() {
    this.backBufferContext.fillStyle = '#000';
    this.backBufferContext.fillRect(0, 0, 800, 800);
	this.asteroids.render(this.backBufferContext);
    this.ship.render(this.backBufferContext, this.input);
    this.screenBufferContext.drawImage(this.backBufferCanvas,0,0);
	if(this.paused){
	  this.screenBufferContext.fillStyle = 'rgba(255,255,255, .4)';
      this.screenBufferContext.fillRect(0,0, 800, 800);
      this.screenBufferContext.fillStyle = "white";
	  this.screenBufferContext.strokeStyle = "black";
      this.screenBufferContext.font = '40px sans-serif';
	  if(this.over)
	  {
        this.screenBufferContext.fillText("Game Over", 20, 200);
		this.screenBufferContext.strokeText("Game Over", 20, 200);
		this.screenBufferContext.fillText("Points: "+ this.score, 20, 250);
		this.screenBufferContext.strokeText("Points: "+ this.score, 20, 250);
	  }else{
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
      return;
	}
	this.screenBufferContext.fillStyle = "white";
    this.screenBufferContext.font = '16px sans-serif';
    this.screenBufferContext.fillText("Points: "+ this.score, 10, 795);
	this.screenBufferContext.fillText("lives: "+ this.lives, 740, 795);
	this.screenBufferContext.fillStyle = "white";
    this.screenBufferContext.font = '30px sans-serif';
	this.screenBufferContext.fillText("level: "+ this.level, 10, 30);
  }
  loop() {
	if(!this.paused){
      this.update();
      this.render();
	}
  }
}