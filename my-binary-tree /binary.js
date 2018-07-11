var tree;
var root;
var inNodeVal, button, addText,searchVal,searchText,anwerT;
var canva;
function setup()
{ 
   root= null;	
	canva=createCanvas(1000,500);
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
 
	inNodeVal.value('');
	if(val=="")
	{
		window.alert('The node must have a value!');
		
	}
	else {
	
 var n=new Node(val);
 if(root == null)
  {
  	root=n;
  	root.printit();
  }	
 if(n!=root) root.addNode(n,0);
 console.log(n.value);

}

}

function searchNode(inNodeVal,answerT) {
var val=inNodeVal.value();
 
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
	clear();
	canva=createCanvas(1000,500);
	background(125);
answerT.html('');
root.visit();

	
}