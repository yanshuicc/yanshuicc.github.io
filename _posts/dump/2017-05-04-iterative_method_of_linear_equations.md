---
layout: post
title: 线性方程组的迭代求解
category: dump
description: 针对多元线性方程组的逐次逼近求解方法记录
---

线性方程组在线性代数里面常被表示为如下形式：

$$
\begin{align}
Ax=b
\end{align}
$$

其中A是n阶非奇异矩阵，x和b为n维列向量  
从小学开始，我们便掌握了求解多元线性方程组的高斯消去方法。但是当矩阵A的阶数很大，应用到矩阵中的数据集达到几MB以上时，高斯消元显得力不从心了。
因而在此总结介绍，计算机中迭代求解线性方程组的方法。  
迭代的方法有很多种，这里先介绍雅可比迭代（Jacobi iteration）。迭代推导过程如下：

$$
\begin{align}
A=L+D+U
\end{align}
$$


$$
\begin{align}
L=\left[
\begin{matrix}
0&&\\
a_{21}&0&\\
a_{31}&a_{32}&0\\
...&...&...&0\\
a_{n1}&a_{n2}&...&a_{n,n-1}&0
\end{matrix}
\right]
\\
\\
\end{align}
$$

$$
\begin{align}
D=diag(a_11,a_22,...,a_nn)
\\
\\
\end{align}
$$


$$
\begin{align}
U=\left[
\begin{matrix}
0&a_{12}&a_{13}&...&a_{1n}\\
&0&a_{23}&...&a_{2n}\\
&&0&...&...\\
&&&&0
\end{matrix}
\right]

\end{align}
$$

$$
\begin{align*}
&\because
Ax=b\\
&\therefore
(L+D+U)x=b\\
&Dx=-(L+U)x+b\\
&x=-D^{-1}(L+U)x+D^{-1}b=Bx+f
\end{align*}
$$

其中,
$$
\begin{align*}
B=D^{-1}(L+U);\quad f=D^{-1}b
\end{align*}
$$  
迭代格式为
$$
\begin{align*}
x^{k+1}=Bx^k+f;\quad k=0,1,2,...
\end{align*}
$$

该迭代过程的python代码如下：

	# coding:utf-8

	import numpy as np
	from numpy import *

	A = mat([[8, -3, 2], [4, 11, -1], [6, 3, 12]])
	b = mat([20, 33, 36])

	# 迭代函数，steps表示迭代次数，error表示误差向量范数
	def iterat(A, b, steps, error):
		if shape(A)[0] != shape(A)[1]:
			return
		# 对矩阵A进行处理，转换为矩阵B0
		n = shape(A)[0]
		tmp = []
		for i in xrange(n):
			tmp.append(1./A[i, i])
		tmp = mat(tmp).T
		B0 = -multiply(A, tmp) + np.eye(n)
		# 对矩阵b进行处理转换为矩阵f
		tmp1 = multiply(b, tmp)
		tmp2 = []
		for i in xrange(n):
			tmp2.append(tmp1[i, i])
		f = mat(tmp2).T
		xk = zeros((n, 1))
		errorlist = []
		# 进行迭代
		for k in xrange(steps):
			xk_1 = xk
			xk = B0 * xk +f
			errorlist.append(linalg.norm(xk - xk_1))
			if errorlist[-1]<error:
				print k+1
				break
		print xk

	if __name__ == "__main__":
		iterat(A, b, 100, 1.0e-6)
			
输出结果如下：


	16
	[[ 2.99999999]
	 [ 1.99999975]
	 [ 0.99999987]]
	 
## 后面还有一些坑，有空慢慢填
迭代过程误差的图形留个坑，以后某日再画。
 
参考文献：  
机器学习算法原理与编程实践  
[迭代法解方程：牛顿迭代法、Jacobi迭代法](http://blog.csdn.net/xiaowei_cqu/article/details/8585703/)