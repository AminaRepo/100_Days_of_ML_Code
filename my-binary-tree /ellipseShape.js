function ellipseShape(n){
this.x=n.x;
this.y=n.y;
this.width=20;
this.height=20;
this.val=n.value;

}
ellipseShape.prototype.lighUp= function () 
{
	
}
 ellipseShape.prototype.lightOff= function () {

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