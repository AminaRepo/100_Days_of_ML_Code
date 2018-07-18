
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

function draw() 
{
		
}


