function shape(n,stype)
{
	if (stype==1)
	sh= new ellipseShape(n);
	this.value=sh;

	
}
shape.prototype.lighUp= function () 
{
	
}
 shape.prototype.lightOff= function () {

}
shape.prototype.printit=function () 
{
	this.value.printit();
}
Node.prototype.setPos=function(x,y)
{this.x=x;
	this.y=y;
	this.shape.value.setPos(x,y);
	}