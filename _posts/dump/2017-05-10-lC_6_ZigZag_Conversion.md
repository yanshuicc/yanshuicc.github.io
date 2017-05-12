---
layout: post
title: leetcode 6 ZigZag Conversion
category: dump
description: leetcode 第五题，求最长回归子串
---

[leetcode 6 ZigZag Conversion](https://leetcode.com/problems/zigzag-conversion/)

The string "PAYPALISHIRING" is written in a zigzag pattern on a given number of rows like this: (you may want to display this pattern in a fixed font for better legibility)

P A H N  
A P L S I I G  
Y I R

And then read line by line: "PAHNAPLSIIGYIR"\\
Write the code that will take a string and make this conversion given a number of rows:
>string convert(string text, int nRows);

convert("PAYPALISHIRING", 3) should return "PAHNAPLSIIGYIR".

----------------------


题目大概意思是：给定字符串text和行数nRows，对字符串按照列进行排列，将排列好的字符串按行连接起来作为返回值。  


"abcdefghijklmnopqrstuvwxyz",4

a		g		m		s		y  
b	f	h	l	n	r	t	x	z  
c	e	i	k	o	q	u	w  
d		j		p		v	

"abcdefghijklmnopqrstuvwxyz",5					

a		i		q		y  
b	h	j	p	r	x	z  
c	g	k	o	s	w  
d	f	l	n	t	v  
e		m		u				

用一个数组来存储每一行的字符，用变量row来记录当前访问到的行，依次将字符串text中的字符放入不同的行，然后将所有行的字符串串联起来。


	# coding:utf-8
	class Solution(object):
		def convert(self, s, numRows):
			if numRows == 1:
				return s
			zigzag = ['' for i in range(numRows)]
			row = 0
			step = 1
			for c in s:
				if row == 0:
					step = 1
				if row == numRows - 1:
					step = -1
				zigzag[row] += c
				row += step
			return ''.join(zigzag)


	if __name__ == "__main__":
		so = Solution()
		print so.convert("", 1)
		print so.convert("PAYPALISHIRING", 3)
		print so.convert("abcdefghijklmnopqrstuvwxyz", 4)
		print so.convert("abcdefghijklmnopqrstuvwxyz", 5)

参考
[Leetcode 6. ZigZag Conversion @python](http://blog.csdn.net/qian2729/article/details/50507694)