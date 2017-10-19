import Ship from './ship';
import Asteroids from './asteroids';

export default class Game{
  constructor(){
	  this.level = 1;
	  this.lives = 3;
	  this.score = 0;
	  this.over = false;
	  this.input = [];
	  this.ship = new Ship(500,500);
	  this.asteroids = new Asteroids(this.level); 
     // Create the back buffer canvas
    this.backBufferCanvas = document.createElement('canvas');
    this.backBufferCanvas.width = 1000;
    this.backBufferCanvas.height = 1000;
    this.backBufferContext = this.backBufferCanvas.getContext('2d');
    // Create the screen buffer canvas
    this.screenBufferCanvas = document.createElement('canvas');
    this.screenBufferCanvas.width = 1000;
    this.screenBufferCanvas.height = 1000;
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
    this.interval = setInterval(this.loop, 500);
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
	  if (map[87])//w
		this.input.push('up');
	  if (map[65])//a
		this.input.push('left');
	  if (map[83])//s
		this.input.push('down');
	  if (map[68])//d
		this.input.push('right');
	  if (map[32])//space
		this.input.push('fire');
  }
  /** @method update
    * Updates the game world.
    */
  update() {
    if(!this.over) {
      // Update ship and asteroids
      this.asteroids.update(this.level);
      this.snake.update(this.input);
    }
  }
  /** @method render
    * Renders the game world
    */
  render() {
    this.backBufferContext.fillStyle = '#ccc';
    this.backBufferContext.fillRect(0, 0, 100, 100);
	this.asteroids.render(this.backBufferContext);
    this.ship.render(this.backBufferContext);
    this.screenBufferContext.drawImage(this.backBufferCanvas,0,0);
  }
  loop() {
    this.update();
    this.render();
  }
}