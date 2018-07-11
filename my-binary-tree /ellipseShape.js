function ellipseShape(n){
this.x=n.x;
this.y=n.y;
this.width=20;
this.height=20;
this.val=n.value;

}
ellipseShape.prototype.lightUp= function () 
{
	
  stroke(0,255,0);
	 fill(0,255,0);
  ellipse(this.x,this.y,this.width,this.height);
   fill(0);
  noStroke();
  textAlign(CENTER);

  text(this.val,this.x,this.y);
  console.log(this.x,this.y);
}
 ellipseShape.prototype.lightOff= function () {
 this.printit();

}
ellipseShape.prototype.printit=function () 
{
  fill(255);
  noStroke();
  textAlign(CENTER);

  text(this.val,this.x,this.y);
  console.log(this.x,this.y);
  stroke(255);
  noFill();
  ellipse(this.x,this.y,this.width,this.height);
}
ellipseShape.prototype.setPos=function(x,y)
{this.x=x;
	this.y=y;

	}