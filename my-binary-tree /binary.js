var tree;
var root;
var inNodeVal, button, addText;
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
   var k=1000/50;
   console.log('k='+k);
  var clc=Math.log2(k);
  var inClc=parseInt(clc);
  inNodeVal.value(inClc);
  var nb=0;
	for (i=0;i<=inClc;i++)
	nb=nb+ Math.pow(2,i);
	
	
	console.log(nb);
	console.log(500/inClc);
	console.log(pow(2,4));
	/*for (var i=0; i< 10; i++)
	{
		tree.addValue(floor(random(0,100)));
	}
/*	tree.addValue(5);
	tree.addValue(3);
	tree.addValue(7);
	tree.addValue(6);
*/		
/*	console.log(tree);
	tree.traverse();
	var t=15;
    var result=tree.search(t);
	if (result == null)
	{
		console.log('Not found');
	}
	else
	{
		console.log(result);
	}*/
	
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
  }	
 if(n!=root) root.addNode(n,0);
 console.log(n.value);
 n.printit();
}

}

function test(val) {
	 var name =val ;
  addText.html('hello '+name+'!');
  inNodeVal.value('');

  for (var i=0; i<200; i++) {
    push();
    fill(random(255), 255, 255);
    translate(random(width), random(height));
    rotate(random(2*PI));
    text(name, 0, 0);
    pop();
  }
	}
