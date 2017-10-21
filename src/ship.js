//ship.js

//helpful constant
var PiDiv180 = Math.PI / 180;

export default class Ship{
  //constructs the ship, takes starting coordinates as parameters	
  constructor(xCenter,yCenter){
	//ship variables  
    this.positionVector = {x: xCenter, y: yCenter};
	this.velocityVector = {x: 0, y: 0};
	this.angle = 0.0;
	this.maxSpeed = 3;
	this.bullets = [];
	this.fireRate = 10;
	this.fireDelay=0;
	this.imortal = 0;
	
	// bind class methods
    this.update = this.update.bind(this);
    this.render = this.render.bind(this);
	
	//load sound
	this.fireSound = new Audio("laserFire.wav");
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
	//update velocity vectors according to new angle and input
	if(input.includes('forward'))
	{	
		this.velocityVector.x= Math.max(0-this.maxSpeed, Math.min(this.velocityVector.x+Math.cos(this.angle), this.maxSpeed));
		this.velocityVector.y= Math.max(0-this.maxSpeed, Math.min(this.velocityVector.y+Math.sin(this.angle), this.maxSpeed));
	}
	else if(input.includes('brake'))
	{
		this.velocityVector.x=0;
		this.velocityVector.y=0;
	}
	
	//fire lasers
	if(input.includes('fire') && this.bullets.length < this.fireRate && this.imortal<=0){
	  if(this.fireDelay === 0){
		this.bullets.push({x:this.positionVector.x+Math.cos(this.angle)*20, y: this.positionVector.y+Math.sin(this.angle)*20, angle: this.angle });		
		this.fireDelay = 10;
		
		//plays laser audio, with out overlapping audio or skipping audio
		if (!this.fireSound.ended){
		  this.fireSound.pause();
		  this.fireSound.currentTime = 0;
		}
		this.fireSound.play();
	  }		  
	}
	if(this.fireDelay>0)
		this.fireDelay --;
	if(this.imortal > 0)
		this.imortal --;
	
	//apply velocity
	this.positionVector.x+=this.velocityVector.x;
	this.positionVector.y+=this.velocityVector.y;
	
	//wrap around
	if (this.positionVector.x-30> 800)
	  this.positionVector.x = 1;
	if (this.positionVector.x+30< 0)
	  this.positionVector.x = 799;
		
	if (this.positionVector.y-30> 800)
	  this.positionVector.y = 1;
	if (this.positionVector.y+30< 0)
	  this.positionVector.y = 799;
  
  //move bullet
  this.bullets.forEach((bullet)=>{
	  bullet.x+= 6 * Math.cos(bullet.angle);
	  bullet.y+= 6 * Math.sin(bullet.angle);
	  //remove bullet
	  if(bullet.x>800 || bullet.x<0 || bullet.y>800 || bullet.y<0)
	  {
		  this.bullets.splice(this.bullets.find((bult)=>{return(bult.x === bullet.x && bult.y === bullet.y);}),1);
	  }
	  
  });
  
	
  }
  
  render(ctx, input)
  {
    //render ship
	ctx.save();
	ctx.fillStyle='Lime';
	ctx.translate(this.positionVector.x,this.positionVector.y)
	ctx.rotate(this.angle);
	ctx.beginPath();
	ctx.moveTo(20, 0);
	ctx.lineTo(-5,-5);
	ctx.lineTo(0,-10);
	ctx.lineTo(-10,-15);
	ctx.lineTo(-10, 15);
	ctx.lineTo(0, 10);
	ctx.lineTo(-5, 5);
	ctx.fill();
	
	//render "imortal bubble"
	if(this.imortal > 0)
	{
	  ctx.strokeStyle='Aqua';
	  ctx.beginPath();
	  ctx.arc(0,0,25,0,2*Math.PI);
	  ctx.stroke();
	}
	
	//render thrusters
	if(input.includes('forward')){
		ctx.strokeStyle = 'OrangeRed';
		ctx.beginPath();
		ctx.moveTo(-15, 5);
		ctx.lineTo(-25, 0);
		ctx.lineTo(-15, -5);
		ctx.stroke();
	}
	if(input.includes('right')){
		ctx.strokeStyle = 'OrangeRed';
		ctx.beginPath();
		ctx.moveTo(-15, -5);
		ctx.lineTo(-20, -10);
		ctx.lineTo(-15, -15);
		ctx.stroke();
	}
	if(input.includes('left')){
		ctx.strokeStyle = 'OrangeRed';
		ctx.beginPath();
		ctx.moveTo(-15, 5);
		ctx.lineTo(-20, 10);
		ctx.lineTo(-15, 15);
		ctx.stroke();
	}
	ctx.setTransform(1, 0, 0, 1, 0, 0);
	ctx.restore();
	
	//render bullet
	this.bullets.forEach((bullet)=>{
	  ctx.save();
		ctx.fillStyle = 'red';
		ctx.strokeStyle = 'red';
		ctx.beginPath();
		ctx.arc(bullet.x, bullet.y,2 ,0,2*Math.PI);
		ctx.stroke();
		ctx.fill();
		ctx.restore();
	});
  }
  
}