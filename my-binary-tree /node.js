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

Node.prototype.addNode =function (n,order,maxOrder)
{		var dist=(width/(Math.pow(2,order+1))-20)/2;
     var hdist= ((height-20*(maxOrder+1))/maxOrder);

	if ( n.value < this.value)
	{
		if (this.left==null)
		{
			this.left= n;
			this.left.parent=this;
			this.left.order=order+1;
         this.left.setPos(this.x-parseInt(dist),this.y+	parseInt(hdist));
         this.left.printit();
         console.log(this.left.x,this.left.y);
       			return order+1;
		}
		else 
		{
			 return this.left.addNode(n,order+1,maxOrder);
		}
	}
		else if (n.value > this.value)
	{
			 if (this.right==null)
			 {
				 this.right= n;
			this.right.parent=this;
			this.right.order=order+1;

				    this.right.setPos(this.x + parseInt(dist),this.y+	parseInt(hdist));
				    			this.right.printit();
				    console.log(this.right.x,this.right.y);
				    return order+1;
			 }
	else
	 {
		return this.right.addNode(n,order+1,maxOrder);
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
	this.shape.printit();
}
	
Node.prototype.visit=function(parent)
{
	 if (this.left !=null)
	 {
		 this.left.visit(this);
	 }
	console.log(this.value);
   this.printit();
	 




    if (this.right !=null)
	{
		this.right.visit(this);
	}
   
}
Node.prototype.reSize= function(maxOr,nx,ny)
{		 var distance=(width/(Math.pow(2,this.order+1))-20)/2;
	      var hdist= ((height-20*(maxOr+1))/maxOr);	
		  var chiLx=nx - parseInt(distance);
		   var chiRx=nx + parseInt(distance);

	var chiY=ny+parseInt(hdist);
	 this.setPos(nx,ny);
	 console.log(nx,ny);
	 if (this.left !=null)
	 {  
          
		 this.left.reSize(maxOr,chiLx,chiY);
	 }
	
	
	   if (this.right !=null)
	{
		this.right.reSize(maxOr,chiRx,chiY);
	}
	 
}

