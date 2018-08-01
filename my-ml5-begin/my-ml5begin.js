let img;
let mobilenet;
var input;
var change=false;
var myLabel,myPb,myRes,myLabel2,myTitle;

	function imageReady()
	{
		console.log('image ready');
	}
function setup()
{
	
	createCanvas(640,480);

  createSpans();

  background(color(255, 204, 0));




}

 function handleFile(file) {

 	 if (file.type === 'image')
 	  { img = createImg(file.data,imageReady);
 	  img.hide(); 
 	  change=true;
 	  } 
 	 }

function modelReady()
{
	console.log('model ready');

   
}

function gotResults(error,results)
{
	if (error){
		console.log(error);
	}
	else {
		   console.log(results);
			myLabel.html("The image is ");	
			myPb.html('% '+100*(results[0].probability.toFixed(4)));	
		   myLabel2.html(" a(n) ");
		   myRes.html(results[0].className);		   

}
}
function createSpans()
{
	
input = createFileInput(handleFile); 
  input.position(width+40, 60);  
  
	myTitle=createSpan("Upload an image:");		
		myTitle.style('position', 'absolute');
		myTitle.style('top', '20px');
		myTitle.style('left', width+40+'px');
		myTitle.style('color', 'Black');
		myTitle.style('font-weight', 'bold');
		myTitle.style('font-size', '16');
	
	myLabel=createSpan("");		
		myLabel.style('position', 'absolute');
		myLabel.style('top', height+20+'px');
		myLabel.style('left', '10px');
		myLabel.style('color', 'Black');
		myLabel.style('font-weight', 'normal');
		myLabel.style('font-size', '14');

		
		myPb=createSpan("");
		myPb.style('position', 'absolute');
		myPb.style('top', height+20+'px');		
		myPb.style('left', '110px');		
		myPb.style('color', 'Blue');
		myPb.style('font-weight', 'bold');
		myPb.style('font-size', '14');

				
		myLabel2=createSpan("");
		myLabel2.style('position', 'absolute');
		myLabel2.style('top', height+20+'px');
		myLabel2.style('left', '180px');
		myLabel2.style('color', 'Black');
		myLabel2.style('font-weight', 'normal');
		myLabel2.style('font-size', '14');
		

		myRes=createSpan("");
		myRes.style('position', 'absolute');
		myRes.style('top', height+20+'px');
		myRes.style('left','220px');
		myRes.style('color', 'Blue');
		myRes.style('font-weight', 'bold');
		myRes.style('font-size', '14');
		
		
		
		
		

}
function waitPredict()
{
			myLabel.html("");	
			myPb.html("Waiting Prediction Results ....");	
		   myLabel2.html("");
		   myRes.html("");	
}

		
		

	function draw() {
			
		if (img ) 
		{ 
		 image(img, 0, 0, width, height);
		 if (!mobilenet)
		 mobilenet=ml5.imageClassifier('MobileNet',modelReady);
		 if (change)
		 { 
	   	 waitPredict();
		 	mobilenet.predict(img,gotResults);
         change=false;  
		
		 }
	

} 
	 else {
  background(color(255, 204, 0));
		}
		}