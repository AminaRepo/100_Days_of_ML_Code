#! /usr/local/bin/octave -qf
x = load('ex2x.dat');
y = load('ex2y.dat');
figure 
plot(x, y, 'o');
ylabel('Height in meters')
xlabel('Age in years')
m = length(y);
x = [ones(m, 1), x];
allT=[0;0];
teta=[0;0]
hteta=x *teta;
for k=1:1500
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
end
hteta
teta
hold on
plot(x(:,2), hteta(:,k), '-')



