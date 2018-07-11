function shape(n,stype)
{
	if (stype==1)
	sh= new ellipseShape(n);
	this.value=sh;

	
}
shape.prototype.lightUp= function () 
{
	this.value.lightUp();
}
 shape.prototype.lightOff= function () {
	this.value.lightOff();
}
shape.prototype.printit=function () 
{
	this.value.printit();
}
shape.prototype.setPos=function(x,y)
{
	this.value.setPos(x,y);
	}