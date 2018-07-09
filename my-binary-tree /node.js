function Node(val)
{

	this.value=val;
	this.left=null;
	this.right=null;
	this.parent=null;
	this.order=0;
	this.x=width/2;
	this.y= 10;
	this.shape= new shape(this,1);
}

Node.prototype.addNode =function (n,order)
{

	if ( n.value < this.value)
	{
		if (this.left==null)
		{
			this.left= n;
			n.parent=this;
			n.order=this.order+1;
         this.left.setPos(this.x- width / pow(2,n.order),0.25*height*n.order);
       			
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
				 this.right=n;
				 n.parent=this;
				    this.right.setPos(this.x+ width / pow(2,n.order),0.25*height*n.order);
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
	   return this;		
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
	 return null;
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

	fill(255);
noStroke();
textAlign(CENTER);
	 text(this.value,this.x,this.y);
	 stroke(255);
	 noFill();
ellipse(this.x,this.y,20,20); 

		line(parent.x,parent.y,this.x,this.y);



    if (this.right !=null)
	{
		this.right.visit(this);
	}
   
}
