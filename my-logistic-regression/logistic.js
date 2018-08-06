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
var everyI=1;
var plot,data,layout;
var myCanvas;
var tArr,theArr;
var xReady=0, yReady=0;
var xChanged=0,yChange=0;
var xinputT,yinputT;



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
	inputData1 = createFileInput(handleFileX);
	yinputT=createElement('h5','y Data');

	inputData2 = createFileInput(handleFileY);

}
function createMyElements2() {
	var t;
	
	


removeElements();

   createMyElements1();

	alphaText=createElement('h5','&alpha;');
	alphaText.position(10,17);
	alphaIn=createInput();
	alphaIn.value('');
	alphaIn.position(alphaText.x+ 15,alphaText.y+10);
		for (i=0;i<xDim+1;i++)
		{
			t=createElement('h5','&Theta;'+i+'= 0');
			t.position(alphaIn.x+alphaIn.width+10,alphaText.y+i*(t.height));
			tText.push(t);
		}
	tText[0].html('&Theta;0= 0');
		
	calcButton=createButton('Estimation');
	calcButton.position(tText[0].x+250,tText[0].y);
	calcButton.mousePressed(startCalc);
	stopButton=createButton('Pause');
	stopButton.mousePressed(stopCalc);
	stopButton.position(calcButton.x+calcButton.width+10,tText[0].y);
	resetButton=createButton('Reset');
	resetButton.mousePressed(resetCalc);
	resetButton.position(stopButton.x+stopButton.width+10,tText[0].y);
	
	

	}

function estimate() {
	
	}

function normalizeData() {
var t=[];
	for (i=0;i<xDim;i++)
	 {
      t=math.squeeze(math.subset(xmData,math.index(math.range(0,xLen),i)));


	 	append(myStds,math.std(t));

	 	append(myMeans,math.mean(t));
	 	for (k=0;k<xLen;k++)
	 	 {

	 	 	xmData[k][i]=((t[k]-myMeans[i])/myStds[i]);

	 	 }	 	
	  	
	 }
	
	
	}
function findDim2() {
	var s;
//	s=split(trim(xdata[0]),' ');
	 s=xmData[0].length;
    tArr=new Array(s+1);
	 theArr=new Array(s+1);	
	
	for (i=0;i<s+1;i++)
	 theArr[i]=0;
	theArr[0]= 0;
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
   calcButton.html('Estimation');	
   numIt=0;
   J=[];
   Iteration=[];
  plotCost();
	
	}
function stopCalc() {
if (dontstop)
Paused=true;
			dontstop=false;
calcButton.html('Continue');			
	}
	
function startCalc() {

	if (alphaIn.value()=='')
 {
 	window.alert('You must give a value for '+alphaText.html());
 	return;
 }

 alphaValue= parseFloat(alphaIn.value());
			dontstop=true;
			Paused=false;
   calcButton.html('-');				

	}
	
	function calculateLR2()
	{
		var t,j;
     
      for (i=0;i<xDim+1;i++)
       tArr[i]=0;


  

		for (i=0;i<xLen;i++)
		{
		  h[i]=theArr[0];
		  for(j=1;j<xDim+1;j++)
		   h[i]=h[i]+ theArr[j]*xmData[i][j-1];
		  
		  tArr[0]=tArr[0]+ (h[i]-ydataI[i]) ;
		  for(j=1;j<xDim+1;j++)
        tArr[j]=tArr[j]+(h[i]-ydataI[i])*xmData[i][j-1] ;

		  	  
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
        	t=h[i]-ydataI[i];
        	t=pow(t,2);
        	j=j+ t;
        }	     
        j=j/(2*xLen);        
        append(J,j);
        append(Iteration,numIt); 	
	     
       	for(j=0;j<xDim+1;j++)
	     
	     
	     tText[j].html('&Theta;'+j+'= '+theArr[j]);

	     
	}


function plotCost() {
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
    	h=new Array(xLen);
   	xDim=findDim2();
        	ok=(xLen==yLen);
        	   	if (!ok) window.alert("x and y must have the same length!");
}

   if (yReady && yChanged)  
   {
   	yLen=findYlenght();
    	h=new Array(yLen);
   	ok=(xLen==yLen);
   	if (!ok) window.alert("x and y must have the same length!");

}
  
if ( xReady && yReady && ok && (xChanged || yChanged))
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


