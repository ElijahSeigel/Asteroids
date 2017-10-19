//ship.js
var PiDiv180 = Math.PI / 180;
export default class Ship{
  constructor(xCenter,yCenter){
    this.positionVector = {x: xCenter, y: yCenter};
	this.velocityVector = {x: 0, y: 0};
	this.angle = 0.0;
	this.maxSpeed = 1;
	this.mass = 25;//mass is entirely irrelevant because any collision with this resets the level
	this.bullets = [];
	this.fireRate = 5;
	// bind class methods
    this.update = this.update.bind(this);
    this.render = this.render.bind(this);
    this.getPosition = this.getPosition.bind(this);
	this.getVelocity = this.getVelocity.bind(this);
  }
  
  getPosition()
  {
	return this.positionVector;
  }
  getVelocity()
  {
    return this.velocityVector;
  }
  
  update(input){
	//update the angle
	if(input.includes("right"))
	{
	  this.angle+= 10*PiDiv180;
	}
	else if(input.includes("left"))
	{
	  this.angle-=10*PiDiv180;
	}
	//update velocity vectors according to new angle
	if(input.includes('forward'))
	{
		var xComponent = Math.cos(this.angle);
		var yComponent = Math.sin(this.angle);
		this.velocityVector.x= Math.max(0-this.maxSpeed, Math.min(this.velocityVector.x+Math.cos(this.angle), this.maxSpeed));
		this.velocityVector.y= Math.max(0-this.maxSpeed, Math.min(this.velocityVector.y+Math.sin(this.angle), this.maxSpeed));
	}
	else if(input.includes('brake'))
	{
		this.velocityVector.x=0;
		this.velocityVector.y=0;
	}
	
	//apply velocity
	this.positionVector.x+=this.velocityVector.x;
	this.positionVector.y+=this.velocityVector.y;
	
  }
  
  render(ctx)
  {
    ctx.save();
	ctx.translate(this.positionVector.x,this.positionVector.y)
	ctx.rotate(this.angle);
	ctx.fillStyle = 'green';
    ctx.fillRect(0,0,10,10);
	ctx.setTransform(1, 0, 0, 1, 0, 0);
	ctx.restore();
  }
  
}