var tree;
function setup()
{
	noCanvas();
	tree=new Tree();
	for (var i=0; i< 10; i++)
	{
		tree.addValue(floor(random(0,100)));
	}
/*	tree.addValue(5);
	tree.addValue(3);
	tree.addValue(7);
	tree.addValue(6);
*/		
	console.log(tree);
	tree.traverse();
	var t=prompt(" Give the value you are searching for " );
    var result=tree.search(t);
	if (result == null)
	{
		console.log('Not found');
	}
	else
	{
		console.log(result);
	}
	
}