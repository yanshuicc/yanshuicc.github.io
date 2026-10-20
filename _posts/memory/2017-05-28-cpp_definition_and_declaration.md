---
layout: post
title: C++中的定义与声明
category: dump
description: 包括多个文件结构、多文件间的相互包含引用、定义、声明、作用域，变量初始化等相关议题
---


编程是模块化、接口化的工作，C++鼓励将组件函数放在独立的文件中，然后单独编译这些文件，连接成可执行程序。所以对项目工程进行多文件的管理是一项非常重要的工作。

<div  style="display:block;align:left">
<img   height="150" width="150" src="images/weight.jpg">
</div>

### 1、头文件与源码文件

C++文件分为头文件和源码文件。  
头文件：包含结构声明和使用这些结构声明的函数原型。  
源码文件：包含结构相关的函数的代码和调用与结构相关的函数的代码

>>不要将函数定义或者变量声明放到头文件中。  
>>不要在源码文件中使用#include来包含其他源码文件，这会导致多重定义。

头文件常包含：

* 函数原型
* 使用#define和const定义的符号常量
* 结构声明
* 类声明
* 模版声明
* 内联函数




### 2、变量声明

C++提供了两种变量声明，  
一种是定义声明（defining declaration），简称定义（definition）；  
一种是引用声明（referencing declaration），简称声明（declaration）。


定义声明给变量分配存储空间，引用声明使用关键字extern且不进行初始化，否则转换为定义声明。

	double up;				//定义
	extern int blem;		//blem是声明，并在其他地方进行定义
	extern char gr = 'z';	//gr因为进行了初始化，所以转换为定义声明

需要注意的是，
>>在每个使用外部变量的文件中，都必须声明这个外部变量。
>>C++有单定义规则（One Definition Rule, ODR），变量只能进行一次定义。

如果要在多个文件中使用外部变量，只需在一个文件中包含该变量的定义，但是在使用改变了的其他所有文件中，必须使用extern关键字声明它。

	//file01.cpp
	extern int cats = 30;		//对3个变量的定义，
	int dogs = 22;				//这里的定义，extern可以省略
	int fleas;
	
	//fle02.cpp
	extern int cats;			//外部声明，
	extern int dogs;			//因为不是定义，所以不进行初始化
	
	//file98.cpp
	extern int cats;			//file02.cpp因为没有声明fleas，
	extern int dogs;			//所以无法使用fleas
	extern int fleas;
	
另外，单定义规则允许多个变量的名称相同。例如在不同函数中的自动变量是彼此独立的，它们有自己的地址；局部变量会隐藏同名的全局变量。虽然程序中可能包含多个同名的变量，但是每个变量的定义是唯一的。

### 3、持续性与作用域

持续性是指数据在内存中持续的存在，它分别为：
* 自动存储持续性
* 静态存储持续性
* 线程存储持续性
* 动态存储持续性

后面两个本文暂不做讨论

#### 3.1 自动存储持续性
如果在代码块中定义了变量，那么该变量的存储时间和作用域将被限制在该代码块内。

	#include<iostream>
	using namespace std;
	
	int main(){
		int a = 5;
		cout << "a in scope 1" << a << endl;
		{
			int a = -2;
			cout << "a in scope 2" << a << endl;
		}
		cout << "a in scope 1" << a << endl;
	}

#### 3.2 静态持续变量

静态变量是指代码在整个程序执行期间一直存在的变量。由于静态变量的数目在程序运行期间是不变的，因此程序不需要使用特殊的装置（如栈）来管理它们。


C++为静态存储持续性变量提供了3种链接性：

* 外部连接性，可在其他文件中访问
* 内部连接性，只能在当前文件中访问
* 无连接性，只能在当前作用域内访问

-------

	int bloab = 1000;				//静态声明，外部链接
	static int one_file = 50;		//静态声明，内部链接
	void func()
	{
		static int count = 0;		//静态声明，无链接
	}


	
	
	