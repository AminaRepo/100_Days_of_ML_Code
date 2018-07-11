function Node(val)
{

	this.value=val;
	this.left=null;
	this.right=null;
	this.parent=null;
	this.order=0;
	this.x=width/2;
	this.y= 15;
	this.shape= new shape(this,1);
}

Node.prototype.addNode =function (n,order)
{

	if ( n.value < this.value)
	{
		if (this.left==null)
		{
			this.left= n;
			this.left.parent=this;
			this.left.order=order+1;
			var currO=order+1;
         this.left.setPos(this.x-parseInt(((width/pow(2,currO))-2*20)/2)-1,this.y+125);
         this.left.printit();
         console.log(this.left.x,this.left.y);
       			
		}
		else 
		{
			 this.left.addNode(n,order+1);
		}
	}
		else if (n.value > this.value)
	{
			 if (this.right==null)
			 {
				 this.right= n;
			this.right.parent=this;
			this.right.order=order+1;
			var currO=order+1;

				    this.right.setPos(this.x+parseInt(((width/pow(2,currO))-2*20)/2)-1,this.y+125);
				    			this.right.printit();
				    console.log(this.right.x,this.right.y);
			 }
	else
	 {
		this.right.addNode(n,order+1);
	 }
    }
    
    
    	
    	 
    
}

Node.prototype.search=function(val)
{
	 if (this.value == val)
	 {
this.shape.lightUp();			   
	   return "The node is found";
	   
	 }
	 else
	 {
	 if (val < this.value && this.left !=null)
	 {
		 return this.left.search(val);
	 }
	
else
	 if (val > this.value && this.right !=null)

	{ 		
		return this.right.search(val);
	}
	
	 }
	 return "The node doesn't exist";
}
Node.prototype.setPos=function(x,y)
{this.x=x;
	this.y=y;
	this.shape.setPos(x,y);
	}
Node.prototype.printit=function()
{
	this.shape.printit(this.shape);
}
	
Node.prototype.visit=function(parent)
{
	 if (this.left !=null)
	 {
		 this.left.visit(this);
	 }
	console.log(this.value);
   this.shape.printit();
	 

	//	line(parent.x,parent.y,this.x,this.y);



    if (this.right !=null)
	{
		this.right.visit(this);
	}
   
}
