---
layout: post
title: python matplotlib库和numpy库的基本操作记录
category: dump
description: python针对矩阵的基本操作
---

>本文注释中的列数行数从0开始

	# 全0阵
	myZero = np.zeros([3, 5])
	print myZero

	# 全1阵
	myOnes = np.ones([3, 5])
	print myOnes
	# 矩阵第0/1/2/3/4列全部设置为0/1/2/3/4
	myZero[:, 0] = 0	
	myZero[:, 1] = 1
	myZero[:, 2] = 2
	myZero[:, 3] = 3
    myZero[:, 4] = 4
    print "-----"
    print myZero

    print "*****"
	# 打印从第1列开始以后的每一列（包含第一列）
    print myZero[:, 1:]
	# 打印最后一列之前的每一列（不包含最后一列）
    print myZero[:, :-1]
	