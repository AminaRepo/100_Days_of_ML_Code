#! /usr/local/bin/octave -qf
x = load('ex2x.dat');
y = load('ex2y.dat');
figure 
plot(x, y, 'o');
ylabel('Height in meters')
xlabel('Age in years')
m = length(y);
x = [ones(m, 1), x];
RH =zeros(m,1);
allT=[0;0];
teta=[0;0]
RJ=zeros(maxIt+1,maxIt+1);
Rhteta=zeros(maxIt+1,maxIt+1,m);
hteta=x * teta;
maxIt=300;
v=hteta- y;
vv=power(v,2);
vvv=sum(vv);
J=[(1/(2*m))* vvv];
for k=1:maxIt
tetaT=[0;0]
  tetaT=[0;0]
 for i=1:2
   for j=1:m
    tetaT(i)=tetaT(i)+  (hteta(j,k)-y(j))*x(j,i);
   end
   tetaT(i)=teta(i)-0.07/50*tetaT(i);
 end
 teta=tetaT
 hteta=[hteta,x *teta];
 allT=[allT,teta]
 v=hteta(:,k)-y;
 vv=power(v,2);
 vvv=sum(vv);
 
 J=[J,(1/(2*m))* vvv];
end
%hteta
%teta



hold on

plot(x(:,2), hteta(:,k), '-')

xA= linspace(0,maxIt,maxIt+1);

figure
plot(xA,J,'-');


for i=1:maxIt+1
  for j=1:maxIt+1
    Rhteta(i,j,:) = x * [allT(1,i);allT(2,j)];
    for k=1:m
      RH(k)=Rhteta(i,j,k)
      end
    v=RH-y;
 vv=power(v,2);
 vvv=sum(vv);
 RJ(i,j)= (1/(2*m))* vvv;

   end
end
      
figure
surf(allT(1,:),allT(2,:), RJ')
xlabel('\theta_0'); ylabel('\theta_1')


