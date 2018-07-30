# -*- coding: utf-8 -*-
""" code from https://colab.research.google.com/notebooks/mlcc/tensorflow_programming_concepts.ipynb
and from https://colab.research.google.com/notebooks/mlcc/creating_and_manipulating_tensors.ipynb """

import tensorflow as tf
import matplotlib.pyplot as plt 
import numpy as np              
import pandas as pd             
g = tf.Graph()

with g.as_default():
  
  x = tf.constant(8, name="x_const")
  y = tf.constant(5, name="y_const")
  z = tf.constant(4, name="z_const")
  my_sum = tf.add(z,tf.add(x, y, name="x_y_sum"),name="x_y_z_sum")
  
  primes = tf.constant([2,3,5,7,11,13],dtype=tf.int32,name="vect1")
  ones = tf.ones([6], dtype=tf.int32, name="vect2")
  primes_ones= tf.add(primes,ones,name="vect1_2_sum")
  ones2 = tf.constant(1,dtype=tf.int32,name="one")
  primes_ones2=tf.add(primes,ones2,name="vect1_one_sum")
  
  scalar = tf.zeros([],name="sc_const")
  vector = tf.zeros([3],name="vt_const")
  matrix = tf.zeros([2, 3],name="mx_const")
  
  
  mat1 = tf.constant([[5,2,4,3],[5,1,6,-2],[-1,3,-1,-2]],dtype=tf.int32,name="mat1_init")
  mat2 = tf.constant([[2, 2],[3,5],[4,5],[1,6]],dtype=tf.int32,name="mat2_init")
  matrix_mul = tf.matmul(mat1,mat2,name="mat1_mat2_mul")
  
  mat3 = tf.constant([[1,2], [3,4], [5,6], [7,8],[9,10], [11,12], [13, 14], [15,16]], dtype=tf.int32,name="mat3_init")
  resh_2x8= tf.reshape(mat3,[2,8],name="resh_2x8")
  resh_4x4= tf.reshape(mat3,[4,4],name="resh_4x4")
  resh_2x2x4= tf.reshape(mat3,[2,2,4],name="resh_2x2x4")
  resh_16= tf.reshape(mat3,[16],name="resh_16")
  
  a = tf.constant([5, 3, 2, 7, 1, 4],dtype=tf.int32,name="a_vect")
  b = tf.constant([4, 6, 3],dtype=tf.int32,name="b_vect")
  resh_a_2x3 = tf.reshape(a,[2,3],name="resh_a_2x3")
  resh_b_3x1 = tf.reshape(b,[3,1],name="resh_b_3x1")
  mul_a_b = tf.matmul(resh_a_2x3,resh_b_3x1,name="mul_ab")
  
  
  v= tf.Variable([3],name="v_init")
  w= tf.Variable(tf.random_normal([1],mean=1.0,stddev=0.35),name="w_init")
  assignment = tf.assign(v, [7],name="assign_v")

 
  dice1_sim = tf.Variable(tf.random_uniform([10,1],1,7,dtype=tf.int32,name="dice1_random"),name="dice1_init")
  dice2_sim = tf.Variable(tf.random_uniform([10,1],1,7,dtype=tf.int32,name="dice2_random"),name="dice2_init")
  dice3_sim = tf.add(dice1_sim,dice2_sim,name="dice1_2_sum")
  dice_sim = tf.concat([dice1_sim,dice2_sim,dice3_sim],1,name="dice_sum")


  initialization=tf.global_variables_initializer()

  with tf.Session() as sess:
    sess.run(initialization)
    print 'first sum ',my_sum.eval()
    print 'second sum ',primes_ones.eval()
    print 'third sum ',primes_ones2.eval(),'\n'
    print 'shape of a scalar= ',scalar.get_shape(),', value= ',scalar.eval()
    print 'shape of a vector= ',vector.get_shape(),' , value= ',vector.eval()
    print 'shape of a matrix= ',matrix.get_shape(),' , value= ',matrix.eval()    
    print 'matrix multiplication result ',matrix_mul.eval(),'\n'
    print 'original matrix 3 (8x2) ',mat3.eval()
    print 'reshaped matrix 3 to a 2x8 matrix ',resh_2x8.eval()
    print 'reshaped matrix 3 to a 4x4 matrix ',resh_4x4.eval()
    print 'reshaped matrix 3 to a 2x2x4 3-D matrix ',resh_2x2x4.eval()
    print 'reshaped matrix 3 to a 16 element vector ',resh_16.eval(),'\n'
    print 'a b multiplication = ', mul_a_b.eval(),'\n'
    print 'v initial value= ', v.eval()
    print 'w initial value= ', w.eval()
    sess.run(assignment)
    print 'v modified value= ', v.eval(),'\n'
    print 'dice_sim  value= ', dice_sim.eval()