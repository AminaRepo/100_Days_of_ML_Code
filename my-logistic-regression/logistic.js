var xstart=30;
var arLen=5;
var myWidth =800+ xstart;
var myHeight =400+xstart;
var axDist=30;
var grLEnx=3;
var grLEny=3;
var xdata=[];
var ydata=[];
var xdataI=[];
var testData=[];
var xSdata=[];
var mxdataI;
var ydataI=[];
var xmData=[];
var ymData=[];
var myStds=[];
var myMeans=[];
var xLen;
var xDim;
var yLen;
var dataM=0.05;
var xunitVal;
var yunitVal;
var everyNx=5;
var everyNy=5;
var minX;
var minY;
var maxX;
var maxY;
var theta1=0;
var theta2=1;
var dontstop=false;
var Paused=false;
var alphaIn,alphaText,t1Text,t2Text,calcButton,stopButton,resetButton,divPlot,estimateButton,inputData1,inputDataT1,inputData2,inputDataT2;
var tText=[];
var h;
var J=[];
var alphaValue;
var Iteration=[];
var numIt=0;
var everyI=50;
var plot,data,layout;
var myCanvas;
var tArr,theArr;
var xReady=0, yReady=0;
var xChanged=0,yChange=0;
var xinputT,yinputT;
var elementsArray=[],elementsArray3=[];
var saveT,saveB,predictT,predictI,predictionM,classifyT,classifyB,classificationM;
var	xTReady=false,
	xTdata,
	xTChanged=1,xTLen,xTmData=[],
	xTDim;


function setup() 
{  
	myCanvas=createCanvas(myWidth,myHeight);
	background(255, 204, 0);
   createMyElements1();

  plotCost();



}
function loadxData(result) {

	console.log("x ready "+result);
	xReady=1;
	}




function handleFileX(file) {
	if (file.type === 'text')
	{
	xReady=0;
	xdata=file.data;
	xReady=1;
	xChanged=1;

	}
	else {
		window.alert("You must select a text file !");
		}
	}
	
function handleFileY(file) {
	if (file.type === 'text')
	{
	yReady=0;
	ydata=file.data;
	yReady=1;
	yChanged=1;

	}
	else {
		window.alert("You must select a text file !");
		}
	}	
	function createMyElements1() {

	 setupPlotArea();

	xinputT=createElement('h5','x Data');
	xinputT.position(10,myHeight+10);
	inputData1 = createFileInput(handleFileX);
	inputData1.position(xinputT.x+60, xinputT.y+20);
	yinputT=createElement('h5','y Data');
	yinputT.position(xinputT.x,xinputT.height+xinputT.y+20);
	inputData2 = createFileInput(handleFileY);
	inputData2.position(inputData1.x,yinputT.y+20);

}

function removeMyElements()
{
	  for (i=0;i< elementsArray.length;i++)
	   elementsArray[i].remove();
	   
	elementsArray=[];
}
function createMyElements2() 
	{var t;
	
	


removeMyElements();



	alphaText=createElement('h5','&alpha;');
	alphaText.position(10,17);
	append(elementsArray,alphaText);	
	
	alphaIn=createInput();
	alphaIn.value('');
	alphaIn.position(alphaText.x+ 15,alphaText.y+10);
	append(elementsArray,alphaIn);
	
		for (i=0;i<xDim+1;i++)
		{
			t=createElement('h5','&Theta;'+i+'= 0');

			t.position(alphaIn.x+alphaIn.width+10,alphaText.y+i*(t.height));
			tText.push(t);
			append(elementsArray,t);
		}
	tText[0].html('&Theta;0= 0');
		
	calcButton=createButton('Optimization');
	calcButton.position(tText[0].x+255,tText[0].y);
	calcButton.mousePressed(startCalc);
	append(elementsArray,calcButton);
	
	stopButton=createButton('Pause');
	stopButton.mousePressed(stopCalc);
	stopButton.position(calcButton.x+calcButton.width+10,tText[0].y);
	append(elementsArray,stopButton);
	
	resetButton=createButton('Reset');
	resetButton.mousePressed(resetCalc);
	resetButton.position(stopButton.x+stopButton.width+10,tText[0].y);
	append(elementsArray,resetButton);
	

	}

function estimate() {
	var result=[];
	 for (i=0;i<xTLen;i++)
       {
       	 append(result,0);
       }
      

		for (i=0;i<xTLen;i++)
		{
		  result[i]=theArr[0];
		  for(j=1;j<xDim+1;j++)
		   result[i]=result[i]+ theArr[j]*xTmData[i][j-1];
       		 
		  result[i]=sigmoid(result[i]);
		 
		  
		 }
		save(result,'Prediction-'+numIt,'txt');

   	//predictionM.html('Prediction saved');

	
	}
function classify() {
	var result=[];
	
	if(xTReady)
	{
	 for (i=0;i<xTLen;i++)
       {
       	 append(result,0);

       }
      

		for (i=0;i<xTLen;i++)
		{
		  result[i]=theArr[0];
		  for(j=1;j<xDim+1;j++)
		   result[i]=result[i]+ theArr[j]*xTmData[i][j-1];
       		 
		  result[i]=sigmoid(result[i]);
		  if (result[i]>=0.5)		  
		  result[i]=1;
		  else
		  result[i]=0;
		  
		 }

		save(result,'classification-'+numIt,'txt');
   	//classificationM.html('Classification saved');
   }
   else {
   	window.alert('You must select test data first !\n');
   	}
	
	}


function findDim2() {
	var s;
//	s=split(trim(xdata[0]),' ');
	 s=xmData[0].length;
    tArr=[];
	 theArr=[];	
	
	for (i=0;i<s+1;i++)
	 append(theArr,0);
	theArr[0]= 0;
	return s;
	    

	}
	
	function findDim3() {
	var s;
//	s=split(trim(xdata[0]),' ');
	 s=xTmData[0].length;


	return s;
	    

	}

function setupPlotArea() {
   divPlot=createDiv('');
   divPlot.id('myDivPlot');
   divPlot.style('position','absolute');
	divPlot.style('width', (windowWidth- myWidth-40)+'px');
	divPlot.style('height', myHeight+'px');
	divPlot.style('top','0px');
	divPlot.style('left',(myWidth+20)+'px');	 
	divPlot.style('borderStyle','solid');
	divPlot.style('borderColor','Yellow');	

			
	
	}
	
	

function resetCalc() {

	dontstop=false;
	Paused=false;
	
	for (i=0;i<xDim+1;i++)
	 tText[i].html('&Theta;'+i+'= 0');
	
	tText[0].html('&Theta;0= 0');
	
	for (i=0;i<xDim+1;i++)
	 theArr[i]=0;
	theArr[0]= 0;
	

	//alphaIn.value('');		
   calcButton.html('Optimization');	
   numIt=0;
   J=[];
  
   Iteration=[];

  plotCost();

removeMyElements3();
	
	}
	
function findXTlenght()
{
			t=split(xTdata,"\n");
		console.log(t.length);

		xTmData=[];
		for (i=0;i<t.length;i++)
		{
			t2=splitTokens(t[i]);
			append(xTmData,t2);
      }		
		console.log(xTmData[0].length);
		
		for (i=0;i<t.length;i++)
		 for (j=0;j<xTmData[0].length;j++)
		xTmData[i][j]=parseFloat(xTmData[i][j]);

		return t.length;

}
function handleClassify(file)
{
	if (file.type === 'text')
	{

	xTdata=file.data;

   xTLen=findXTlenght();
   xTDim=findDim3();
   if (xTDim != xDim)
   {
   window.alert("Test Data must have the same number of features !\n,x number of features="+xDim+"\n test Data number of Features="+xDim);	
   }
   else {
   	estimate();
 
	}
	}
	else {
		window.alert("You must select a text file !");
		}
}	
	
	
function handlePredict(file)
{
	if (file.type === 'text')
	{
   xTReady=false;
	xTdata=file.data;

   xTLen=findXTlenght();
   xTDim=findDim3();
   if (xTDim != xDim)
   {
   window.alert("Test Data must have the same number of features !\n number of features of x="+xDim+"\n number of Features of test data="+xTDim);	
   }
   else {
   	xTReady=true;
   	estimate();
 
	}
	}
	else {
		window.alert("You must select a text file !");
		}
}	
	
	function createMyElements3()
	{
		removeMyElements3();
		saveT= createElement('h5','Save &Theta;')
					.position(calcButton.x+30,calcButton.y+calcButton.height+20);
	
	 append(elementsArray3,saveT);		
     saveB= createButton('save')
			.position(calcButton.x+100, saveT.y+15)
			.mousePressed(function() {
  			 save(theArr,'myThetas-'+numIt,'txt');
		});		
	append(elementsArray3,saveB);	
	
	 predictT= createElement('h5','Predict')
					.position(saveT.x, saveB.height+saveB.y+20);
	
	 append(elementsArray3,predictT);		
     predictI= createFileInput(handlePredict)
			.position(saveB.x, predictT.y+15);
			
	append(elementsArray3,predictI);	
		predictionM=createElement('h5','')
						.position(predictI.x,predictI.y+predictI.height+15)
						.style('color', 'Green');
		append(elementsArray3,predictionM);		
		
			 classifyT= createElement('h5','Classify')
					.position(predictT.x, predictionM.height+predictionM.y+20);
	
	 append(elementsArray3,classifyT);		
     classifyB= createButton('Classification')
			.position(predictI.x, classifyT.y+15)
			.mousePressed(classify);
			
	append(elementsArray3,classifyB);	
		classificationM=createElement('h5','')
						.position(classifyB.x,classifyB.y+classifyB.height+15)
						.style('color', 'Green');
		append(elementsArray3,classificationM);				
	}
	
	function removeMyElements3()
	{
	  for (i=0;i< elementsArray3.length;i++)
	   elementsArray3[i].remove();
	   
	elementsArray3=[];
	}
	
function stopCalc() {
if (dontstop)
Paused=true;
			dontstop=false;
calcButton.html('Continue');
  xtReady=false;	
  createMyElements3();		
	}
	
function startCalc() {

	if (alphaIn.value()=='')
 {
 	window.alert('You must give a value for '+alphaText.html());
 	return;
 }

 alphaValue= parseFloat(alphaIn.value());
 removeMyElements3();
			dontstop=true;
			Paused=false;
   calcButton.html('-');	
			

	}
	
function sigmoid(tX) {
	return 1/(1+exp(-tX));
	
	
	}
		
	function calculateLR2()
	{
		var t,j;
     
      for (i=0;i<xDim+1;i++)
       append(tArr,0);
     
    for (i=0;i<xLen;i++)
        append(h,0);
       


		for (i=0;i<xLen;i++)
		{
		  h[i]=theArr[0];
		  for(j=1;j<xDim+1;j++)
		   h[i]=h[i]+ theArr[j]*xmData[i][j-1];
       		 
		  h[i]=sigmoid(h[i]);

		   
		  tArr[0]=tArr[0]+ (h[i]-ymData[i][0]) ;
		  for(j=1;j<xDim+1;j++)
        {tArr[j]=tArr[j]+(h[i]-ymData[i][0])*xmData[i][j-1]}

		  	  
		}
        	  
		  for(j=0;j<xDim+1;j++)
		   
        tArr[j]=theArr[j]-(alphaValue/xLen)*tArr[j];

		for(j=0;j<xDim+1;j++)
	     theArr[j]=tArr[j];
	    	     
	     numIt=numIt+1;

	     j=0;
        for (i=0;i<xLen;i++)
        {
        	h[i]=theArr[0];
		  for(j=1;j<xDim+1;j++)
		   h[i]=h[i]+ theArr[j]*xmData[i][j-1];
		   
		   h[i]=sigmoid(h[i]);

		  t=(-ymData[i][0]*log(h[i]))-((1-ymData[i][0])*log(1-h[i]));
	
  
        	j=j+ t;
        }	     
        j=j/(xLen); 
           
        append(J,j);
        append(Iteration,numIt); 	
        
 
       
	     
       	for(j=0;j<xDim+1;j++)
	     
	     
	     tText[j].html('&Theta;'+j+'= '+theArr[j]);

	     
	}


function plotCost(){
if (numIt% parseInt(everyI)==0)

{	
	 plot = {
  x: Iteration,
  y: J,
  mode: 'lines'
};

 data =[plot];

 layout = {
  title:'Cost Function (every '+everyI+ ' Iteration(s))',
   xaxis: {
    title: 'Number of Iterations'
  },
  yaxis: {
    title: 'Cost Value'
  }
};
Plotly.newPlot('myDivPlot',data,layout);
}	}


function findXlenght() {
    
		t=split(xdata,"\n");
		console.log(t.length);

		xmData=[];
		for (i=0;i<t.length;i++)
		{
			t2=splitTokens(t[i]);
			append(xmData,t2);
      }		
		console.log(xmData[0].length);
		
		for (i=0;i<t.length;i++)
		 for (j=0;j<xmData[0].length;j++)
		xmData[i][j]=parseFloat(xmData[i][j]);

		return t.length;

	}
	function findYlenght() {
    
		t=split(ydata,"\n");
		console.log(t.length);

		ymData=[];
		for (i=0;i<t.length;i++)
		{
			t2=splitTokens(t[i]);
			append(ymData,t2);
      }		
		console.log(ymData[0].length);
		
		for (i=0;i<t.length;i++)
		 for (j=0;j<ymData[0].length;j++)
		ymData[i][j]=parseFloat(ymData[i][j]);

		return t.length;

	}
	
function draw() 
{ ok=0;
	clear();

	background(255, 204, 0);

 if (xReady && xChanged)  
   {
   	xLen=findXlenght();
    	h=[];
   	xDim=findDim2();
        	ok=(xLen==yLen);
        	   	if (!ok){
						 window.alert("x and y must have the same length!\n x size = "+ xLen+" and y size = "+yLen);        	   		 
        	   		 removeMyElements();
        	   		 

        	   	}
}

   if (yReady && yChanged)  
   {
   	yLen=findYlenght();
    	h=[];
   	ok=(xLen==yLen);
   	if (!ok) 
   	{  
   		window.alert("x and y must have the same length!\n x size = "+ xLen+" and y size = "+yLen);
   		removeMyElements();
   		
		}   		

}

  
if ( xReady && yReady && ok && (xChanged||yChanged))
{
 createMyElements2();
}
xChanged=0;
 yChanged=0;
   

   if (Paused && xReady && yReady && ok)	
   {	
   
   plotCost();
   }
	if(dontstop && xReady && yReady)
	{
		calculateLR2();

		plotCost();
	}
		
}


