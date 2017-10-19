import Ship from './ship';
//import Asteroids from './asteroids';

export default class Game{
  constructor(){
	  this.level = 1;
	  this.lives = 3;
	  this.score = 0;
	  this.over = false;
	  this.input = [];
	  this.ship = new Ship(150,150);
	 //this.asteroids = new Asteroids(this.level); 
     // Create the back buffer canvas
    this.backBufferCanvas = document.createElement('canvas');
    this.backBufferCanvas.width = 300;
    this.backBufferCanvas.height = 300;
    this.backBufferContext = this.backBufferCanvas.getContext('2d');
    // Create the screen buffer canvas
    this.screenBufferCanvas = document.createElement('canvas');
    this.screenBufferCanvas.width = 300;
    this.screenBufferCanvas.height = 300;
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
    //console.log(event.key);
	var map = {};
	map[e.keyCode] = e.type == 'keydown';
	  if (map[87] || map[38])//w//up
		this.input.push('forward');
	  if (map[65] || map[37])//a//left
		this.input.push('left');
	  if (map[68] || map[39])//d//right
		this.input.push('right');
	  if (map[83] || map[40])//s//down
		this.input.push('brake');
	  if (map[32])//space
		this.input.push('fire');
  }
  /** @method update
    * Updates the game world.
    */
  update() {
    if(!this.over) {
      // Update ship and asteroids
      //this.asteroids.update(this.level);
      this.ship.update(this.input);
    }
  }
  /** @method render
    * Renders the game world
    */
  render() {
    this.backBufferContext.fillStyle = '#ccc';
    this.backBufferContext.fillRect(0, 0, 300, 300);
	//this.asteroids.render(this.backBufferContext);
    this.ship.render(this.backBufferContext);
    this.screenBufferContext.drawImage(this.backBufferCanvas,0,0);
  }
  loop() {
    this.update();
    this.render();
	this.input = [];
  }
}