var tree;
var root;
var inNodeVal, button, addText,searchVal,searchText,anwerT;
var canva;
var maxOrder=4;
var initialW=1000;
var initialH=500;
function setup()
{ 
   root= null;	
	canva=createCanvas(initialW,initialH);
	background(125);
   addText = createElement('h4', 'Value of the node you want to add: ');
  
   addText.position(width+20, 10);
   
   inNodeVal = createInput();
   inNodeVal.position(width+20,addText.y +addText.height+40 );
   
   button = createButton('Add Node');
   button.position(inNodeVal.x + inNodeVal.width+10, inNodeVal.y );
   var val =inNodeVal.value();

   button.mousePressed(function() { addNode(inNodeVal);});
   
   
     searchText = createElement('h4', 'The value you are searching for: ');
   searchText.position(width+20, inNodeVal.y+30);
   answerT= createElement('h4', '');
   
   searchVal = createInput();
   searchVal.position(width+20,searchText.y +searchText.height+40 );
   
   button2 = createButton('Search');
   button2.position(searchVal.x + searchVal.width+10, searchVal.y );
   answerT.position(searchVal.x,searchVal.y +20);
   button3 = createButton('Clear');
   button3.position(button2.x, button2.y+button2.height+20 );
   var val2 =searchVal.value();

   button2.mousePressed(function() { searchNode(searchVal,answerT);});
      button3.mousePressed(function() { clearSearch(answerT,root);});
      
      button4 = createButton('New Tree');
      button4.position(button3.x,button3.y+button3.height+50);
      button4.mousePressed(newTree);
   var k=1000/50;
   console.log('k='+k);
  var clc=Math.log2(k);
  var inClc=parseInt(clc);

  var nb=0;
	for (i=0;i<=inClc;i++)
	nb=nb+ Math.pow(2,i);
	
	
	console.log(nb);
	console.log(500/inClc);
	console.log(pow(2,4));

	
}
function draw() {

}


function addNode(inNodeVal) {
var val=inNodeVal.value();
 var order;
	inNodeVal.value('');
	if(val=="")
	{
		window.alert('The node must have a value!');
		
	}
	else {
	
 var n=new Node(parseInt(val));
 if(root == null)
  {
	  
  	root=n;
  	root.setPos(width/2,15);
  		
  	root.printit();
  }	
  else
  {
  
  order=root.addNode(n,0,maxOrder);
  if(order > maxOrder)
  {
	  maxOrder=order;
	  resizeET();
	  root.visit(root);
  }
}
 console.log(n.value);

}

}

function searchNode(inNodeVal,answerT) {
var val=parseInt(inNodeVal.value());
 
	inNodeVal.value('');
	if(val=="")
	{
		window.alert('The node must have a value!');
		
	}
	else {
	
 answerT.html(root.search(val));
}

}

	
function clearSearch(answerT,root)
{
  
resizeCanvas(width,height);
	background(125);
answerT.html('');
root.visit();

	
}
function  resizeET()
{var nw=50*pow(2,maxOrder)+1;
var nh=50*(maxOrder+1);  
resizeCanvas(nw,nh);
background(125);
addText.position(width+20, 10);
addText.html('Add');
  inNodeVal.position(width+20,addText.y +addText.height+40 );  
	 button.position(inNodeVal.x + inNodeVal.width+10, inNodeVal.y );
 searchText.position(width+20, inNodeVal.y+30);
 searchText.html('Search');
  searchVal.position(width+20,searchText.y +searchText.height+40 );
    button2.position(searchVal.x + searchVal.width+10, searchVal.y );
   answerT.position(searchVal.x,searchVal.y +20);
    button3.position(button2.x, button2.y+button2.height+20 );
          button4.position(button3.x,button3.y+button3.height+50);

    	root.reSize(maxOrder,parseInt(width/2),15);
}
function newTree()
{
	root=null;
	resizeCanvas(initialW,initialH);
	background(125);
	addText.position(width+20, 10);
addText.html('Value of the node you want to add: ');
  inNodeVal.position(width+20,addText.y +addText.height+40 );  
	 button.position(inNodeVal.x + inNodeVal.width+10, inNodeVal.y );
 searchText.position(width+20, inNodeVal.y+30);
 searchText.html('The value you are searching for: ');
  searchVal.position(width+20,searchText.y +searchText.height+40 );
    button2.position(searchVal.x + searchVal.width+10, searchVal.y );
   answerT.position(searchVal.x,searchVal.y +20);
    button3.position(button2.x, button2.y+button2.height+20 );
          button4.position(button3.x,button3.y+button3.height+50);
}
