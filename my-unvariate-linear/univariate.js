
var xstart=10;

var arLen=5;
var myWidth =800+ xstart;
var myHeight =500+xstart;
var axDist=20;
var grLEn=3;
var xdata=[];
var ydata=[];
var xdataI=[];
var ydataI=[];
var xmData=[];
var ymData=[];
var xLen;
var yLen;
var dataM=0.05;

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
	
	for (i=0;i<xLen;i++)
	
	console.log(ydataI[i]);
	console.log('here y data');
		for (i=0;i<yLen;i++)
	
	console.log(ydataI[i]);
	myCPlot();
	plotData();

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
	}


function myCPlot() {


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
line(xstart,myHeight-xstart,myWidth,myHeight-xstart);

//the y axis
line(xstart,0,xstart,myHeight-xstart);

//the graduation

//the x axis 
for (i=xstart+axDist;i<myWidth;i+=axDist)
{		
line(i,myHeight-xstart,i,myHeight-xstart-grLEn);	
}	

//the y axis 
for (i=myHeight-xstart+axDist;i>0;i-=axDist)
{		
line(xstart,i,xstart+grLEn,i);	
}	

function draw() 
{
		
}


}