var xstart=30;
var arLen=5;
var myWidth =800+ xstart;
var myHeight =500+xstart;
var axDist=30;
var grLEnx=3;
var grLEny=3;
var xdata=[];
var ydata=[];
var xdataI=[];
var ydataI=[];
var xmData=[];
var ymData=[];
var xLen;
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
var alphaIn,alphaText,t1Text,t2Text,calcButton,stopButton,resetButton,divPlot;
var h;
var J=[];
var alphaValue;
var Iteration=[];
var numIt=0;
var everyI=50;
var plot,data,layout;

function preload() {
	xdata=loadStrings('ex2x.txt');
	ydata=loadStrings('ex2y.txt');

	}

function setup() 
{  
	createCanvas(myWidth,myHeight);
	background(255, 204, 0);
	xLen=xdata.length;
	yLen=ydata.length;
	
	for(i=0;i<xLen;i++)
	{
		append(xdataI,parseFloat(xdata[i]));
	}
	
		for(i=0;i<yLen;i++)
	{
		append(ydataI,parseFloat(ydata[i]));
	}
	
	mapData();
	
	
	myCPlot();
	plotData();   
	createMyElements();
   setupPlotArea();
   plotCost();


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
	theta1=0;
	theta2=1;
	dontstop=false;
	Paused=false;
	t1Text.html('&Theta;1= 0');
	t2Text.html(',&Theta;2= 1');		
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
function calculateLR()
{var t1,t2,t3,j;

    t1=0;
    t2=0;

		for (i=0;i<xLen;i++)
		{
		  h[i]=0;
		  h[i]=h[i]+ theta1+theta2*xdataI[i];
		  t1=t1+h[i]-ydataI[i];
		  t2=t2+(h[i]-ydataI[i])*xdataI[i];	  
		  	  
		}
        	  
		  
        t1=theta1-(alphaValue/xLen)*t1;
		  t2=theta2-(alphaValue/xLen)*t2;
	
	     theta1=t1;
	     theta2=t2;
	     
	     numIt=numIt+1;
	     j=0;
        for (i=0;i<xLen;i++)
        {
        	h[i]=0;
        	h[i]=h[i]+ theta1+theta2*xdataI[i];
        	t3=h[i]-ydataI[i];
        	t3=pow(t3,2);
        	j=j+ t3;
        }	     
        j=j/(2*xLen);        
        append(J,j);
        append(Iteration,numIt); 	
	     
	     t1Text.html('&Theta;1= '+theta1);
	     t2Text.html('&Theta;2= '+theta2);
	     
	
}


function createMyElements() {

	alphaText=createElement('h5','&alpha;');
	alphaText.position(10,myHeight+17);
	alphaIn=createInput();
	alphaIn.value('');
	alphaIn.position(alphaText.x+ 15,myHeight+10);
	t1Text=createElement('h5',',&Theta;1= 0');
	t1Text.position(alphaIn.x+alphaIn.width+10,myHeight);
	t2Text=createElement('h5',',&Theta;2= 1');
	t2Text.position(alphaIn.x+alphaIn.width+250,myHeight);
	calcButton=createButton('Estimation');
	calcButton.position(t2Text.x+250,myHeight+17);
	calcButton.mousePressed(startCalc);
	stopButton=createButton('Pause');
	stopButton.mousePressed(stopCalc);
	stopButton.position(calcButton.x+calcButton.width+10,myHeight+17);
	resetButton=createButton('Reset');
	resetButton.mousePressed(resetCalc);
	resetButton.position(stopButton.x+stopButton.width+10,myHeight+17);
	
	}



function plotData() {
	stroke('#222222');
fill(0,0,0);



strokeWeight(3);
	for(i=0;i<xLen;i++)
	{      
      

		point(xmData[i],ymData[i]);
		
	}
	
	}
	
function mapData() {
	for (i=0;i<xLen;i++)
	{
		xmData[i]=map(xdataI[i],(1-dataM)*min(xdataI),(1+dataM)*max(xdataI),xstart,myWidth);
	}


	for (i=0;i<xLen;i++)
	{
		ymData[i]=map(ydataI[i],(1-dataM)*min(ydataI),(1+dataM)*max(ydataI),myHeight-xstart,0);
	}
	
	// the unit values
xunitVal= (map(axDist+xstart,xstart,myWidth,(1-dataM)*min(xdataI),(1+dataM)*max(xdataI))-map(xstart,xstart,myWidth,(1-dataM)*min(xdataI),(1+dataM)*max(xdataI))).toFixed(2);
yunitVal=(map(myHeight-xstart-axDist,myHeight-xstart,0,(1-dataM)*min(ydataI),(1+dataM)*max(ydataI))-map(myHeight-xstart,myHeight-xstart,0,(1-dataM)*min(ydataI),(1+dataM)*max(ydataI))).toFixed(2);
//the origin values
minX=((1-dataM)*min(xdataI)).toFixed(2);
minY=((1-dataM)*min(ydataI)).toFixed(2);

maxX=((1+dataM)*max(xdataI)).toFixed(2);
maxY=((1+dataM)*max(ydataI)).toFixed(2);
// estimation array
h=new Array(xLen);
	}


function myCPlot() {
var val;

// the directional arrows
stroke('#222222');
fill(0,0,0);
strokeJoin(MITER);
strokeWeight(1);

//the y arrow
beginShape();
vertex(xstart-arLen,arLen);
vertex(xstart,0);
vertex(xstart+arLen,arLen);
vertex(xstart-arLen,arLen);
endShape();

//the x arrow
beginShape();
vertex(myWidth-arLen,myHeight-xstart+arLen);
vertex(myWidth,myHeight-xstart);
vertex(myWidth-arLen,myHeight-xstart-arLen);
vertex(myWidth-arLen,myHeight-xstart+arLen);
endShape();

//the x y coordinates axis
strokeWeight(1);


//the x axis
textSize(10);
textStyle(NORMAL);
text(nfc(minX,2),xstart,myHeight-xstart+15);
line(xstart,myHeight-xstart,myWidth,myHeight-xstart);
text('X',myWidth-10,myHeight-xstart+15);

for (j=1,i=xstart+axDist;i<myWidth;i+=axDist,j++)
{
if (j%everyNx==0)
{
	
	val=parseFloat(parseInt(j)*parseFloat(xunitVal)+parseFloat(minX)).toFixed(2);
	text(nfc(val),i,myHeight-xstart+textSize(nfc(val)));
	strokeWeight(3);
}
line(i,myHeight-xstart,i,myHeight-xstart-grLEnx);	
strokeWeight(1);

}

	
//the y axis
text(nfc(minY,2),xstart-textWidth(nfc(minY,2)),myHeight-xstart);
line(xstart,0,xstart,myHeight-xstart);
text('Y',xstart-15,15);



for (j=1,i=myHeight-xstart+axDist;i>0;i-=axDist,j++)
{		
if (j%everyNy==0)
{
	
	val=parseFloat(parseInt(j)*parseFloat(yunitVal)+parseFloat(minY)).toFixed(2);
	text(nfc(val),xstart-textWidth(nfc(val)),i);
	strokeWeight(3);
}
line(xstart,i,xstart+grLEny,i);	
strokeWeight(1);
}	





// the scale
noFill();
line(myWidth/2,axDist+xstart,myWidth/2+axDist,axDist+xstart);
textSize(10);
textStyle(NORMAL);
text(nfc(xunitVal,2),myWidth/2,axDist+xstart+15);

beginShape();
vertex(myWidth/2+axDist-arLen,axDist+xstart+arLen);
vertex(myWidth/2+axDist,axDist+xstart);
vertex(myWidth/2+axDist-arLen,axDist+xstart-arLen);

endShape();

line(myWidth/2,axDist+xstart,myWidth/2,xstart);
text(nfc(yunitVal,2),myWidth/2-textWidth(nfc(xunitVal,2)),axDist/2+xstart);
beginShape();
vertex(myWidth/2-arLen,xstart+arLen);
vertex(myWidth/2,xstart);
vertex(myWidth/2+arLen,xstart+arLen);

endShape();



}

function plotTheLine() {
	var y1,y2,px1,px2,py1,py2;
	
strokeWeight(1);	
	stroke(color(0,0,255));
	y1= theta2*minX+theta1;
	y2=theta2*maxX+theta1;
	
	
	px1=map(minX,(1-dataM)*min(xdataI),(1+dataM)*max(xdataI),xstart,myWidth);
   py1=map(y1,(1-dataM)*min(ydataI),(1+dataM)*max(ydataI),myHeight-xstart,0);	
	px2=map(maxX,(1-dataM)*min(xdataI),(1+dataM)*max(xdataI),xstart,myWidth);	
	py2=map(y2,(1-dataM)*min(ydataI),(1+dataM)*max(ydataI),myHeight-xstart,0);
	
	
	line(px1,py1,px2,py2);
	stroke(color(0,0,0));
	
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
  title:'Cost Function (every '+everyI+ ' Iterations)'
};
Plotly.newPlot('myDivPlot',data,layout);
}	}
function draw() 
{
	clear();
		createCanvas(myWidth,myHeight);
	background(255, 204, 0);
	myCPlot();
	plotData();

   if (Paused)	
   {	
   plotTheLine();
   		//plotCost();
   }
	if(dontstop)
	{
		calculateLR();
		plotTheLine();
		plotCost();
	}
		
}


