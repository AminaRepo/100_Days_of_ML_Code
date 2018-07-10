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
shape.prototype.setPos=function(x,y)
{
	this.value.setPos(x,y);
	}