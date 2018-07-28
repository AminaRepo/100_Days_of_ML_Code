let img;
let mobilenet;

	function imageReady()
	{
		console.log('image ready');
	}
function setup()
{
	createCanvas(640,480);

	img=createImg("images/puffin.jpg",imageReady);
	img.hide();
		background(0);
	image(img,0,0,width,height)
 mobilenet=ml5.imageClassifier('MobileNet',modelReady);
}



function modelReady()
{
	console.log('model ready');
	mobilenet.predict(img,gotResults);
   
}

function gotResults(error,results)
{var myLabel,myPb,myRes,myLabel2;
	if (error){
		console.log(error);
	}
	else {
		console.log(results);



		myLabel=createSpan("The image is ");		
		myLabel.style('position', 'absolute');
		myLabel.style('top', height+20+'px');
		myLabel.style('left', '10px');
		myLabel.style('color', 'Black');
		myLabel.style('font-weight', 'normal');
		myLabel.style('font-size', '14');

		
		myPb=createSpan('% '+100*(results[0].probability.toFixed(4)));
		myPb.style('position', 'absolute');
		myPb.style('top', height+20+'px');		
		myPb.style('left', '110px');		
		myPb.style('color', 'Blue');
		myPb.style('font-weight', 'bold');
		myPb.style('font-size', '14');

				
		myLabel2=createSpan(" a(n) ");
		myLabel2.style('position', 'absolute');
		myLabel2.style('top', height+20+'px');
		myLabel2.style('left', '180px');
		myLabel2.style('color', 'Black');
		myLabel2.style('font-weight', 'normal');
		myLabel2.style('font-size', '14');
		

		myRes=createSpan(results[0].className);
		myRes.style('position', 'absolute');
		myRes.style('top', height+20+'px');
		myRes.style('left','220px');
		myRes.style('color', 'Blue');
		myRes.style('font-weight', 'bold');
		myRes.style('font-size', '14');
		
		
		
		
		

		}
		}

	

 
