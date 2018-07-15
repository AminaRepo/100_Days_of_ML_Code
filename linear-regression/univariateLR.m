#! /usr/local/bin/octave -qf
x = load('ex2x.dat');
y = load('ex2y.dat');
maxIt = 1500;

% plot of the training set
figure ;
plot(x, y, 'o');
ylabel('Height in meters');
xlabel('Age in years');

%initialisations
m = length(y);
x = [ones(m, 1), x];
allT=[0;0];
teta=[0;0];
RJ=zeros(100,100);


hteta=x * teta;
J=[(sum(power(hteta-y,2)))/(2*m)];

% minimising cost function using gradient descent algorithm
for k=1:maxIt
tetaT=[0;0];
 for i=1:2
   for j=1:m
    tetaT(i)=tetaT(i)+  (hteta(j,k)-y(j))*x(j,i);
   end
   tetaT(i)=teta(i)-0.07/50*tetaT(i);
 end
 teta=tetaT;
 hteta=[hteta,x *teta];
 allT=[allT,teta];
 
 J=[J,(sum(power(hteta(:,k)-y,2)))/(2*m)];
end


% plot of the final linear regression
hold on;

plot(x(:,2), hteta(:,k), '-');




% plot of the the cost function depending the iteration number
xA= linspace(0,maxIt,maxIt+1);
figure;
plot(xA,J,'-');
xlabel('Number of iteration'); ylabel('J(theta)');


% plot of J depending on thetat variations      
hold on;
figure;
plot3(allT(1,:),allT(2,:),J,'-');
xlabel('Thetat 0'); ylabel('Thetat 1');zlabel('J(theta)');


% plot of the cost function J(theta)
theta0_vals = linspace(-3, 3, 100);
theta1_vals = linspace(-1, 1, 100);
for i = 1:length(theta0_vals)
	  for j = 1:length(theta1_vals)
	  t = [theta0_vals(i); theta1_vals(j)];
	  RJ(i,j) = (sum(power ((x *t) -y,2)))/(2*m);
    end
end

RJ = RJ';
figure;
surf(theta0_vals, theta1_vals, RJ);
xlabel('\theta_0'); ylabel('\theta_1');zlabel('J(theta)');



