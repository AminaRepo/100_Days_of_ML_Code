clear ;
close all;
clc;

%load data
data = load('ex1data2.txt');
X = data(:, 1:2);
y = data(:, 3);
m = length(y);

%normalize features
X_norm = X;
mu = zeros(1, size(X, 2));
sigma = zeros(1, size(X, 2));
for i=1:size(X,2)
  mu(1,i)= mean(X(:,i));
  X_norm(:,i)=X(:,i) - mu(1,i);
  sigma(1,i)=std(X(:,i));
  X_norm(:,i)=X_norm(:,i)/sigma(1,i);
endfor

X = [ones(m, 1) X_norm];

num_iters = 50;
theta = zeros(3, 1);
alpha = 0.88;
%calculate estimation using gradient descent

m = length(y); 
J_history = zeros(num_iters, 1);
t=zeros(size(X,2),1);


for iter = 1:num_iters
  for j=1:size(X,2)
 t(j) = theta(j) - (alpha /m)* sum((X*theta-y).*X(:,j)); 
endfor
    theta =t;
    J_history(iter) = sum(power(X*theta-y,2))/(2*m);

endfor

% ploting the cost function
figure;
plot(1:num_iters, J_history(1:num_iters), 'b');

fprintf('Nex Theta computed from gradient descent for alpha= %.4f: \n',alpha);
fprintf(' %f \n', theta);
fprintf('\n');


% calculate extimation using Normal equations


%load data
data = load('ex1data2.txt');
X = data(:, 1:2);
y = data(:, 3);
m = length(y);

X = [ones(m, 1) X];
theta2 = pinv(X'*X)*X'*y;

% verification of the estimation of theta and theta2

% for a house's surface with 1650 sq-ft and 3 bed room

% estimate price using theta

%normalize the example
example=zeros(1,size(X,2)-1);
example(1,1)=1650;
example(1,2)=3;
for i=1:size(X,2)-1
  example(1,i)= (example(1,i)-mu(1,i))/sigma(1,i); 
endfor

example=[1 example];
price = example*theta;


fprintf('Predicted price of a 1650 sq-ft, 3 br house using gradient descent =  $%f\n', price);

% estimate price using theta2 (no need for normalization)

example2=ones(1,size(X,2));
example2(1,2)=1650;
example2(1,3)=3;
price2 = example2*theta2; 

fprintf('Predicted price of a 1650 sq-ft, 3 br house using normal equation =   $%f\n', price2);

