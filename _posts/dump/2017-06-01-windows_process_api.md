---
layout: post
title: windows进程相关的api记录
category: dump
description: windows与进程相关的API演示demo
---


[CreateToolhelp32Snapshot function](https://msdn.microsoft.com/en-us/library/windows/desktop/ms682489(v=vs.85).aspx)

	HANDLE WINAPI CreateToolhelp32Snapshot(
		_In_ DWORD dwFlags,
		_In_ DWORD th32ProcessID
	);


CreateToolhelp32Snapshot函数为指定的进程、进程使用的堆[HEAP]、模块[MODULE]、线程[THREAD]）建立一个快照[snapshot]。

dwFlags:指定将要创建包含哪一类系统信息的快照句柄，这个参数能够使用下列数值（变量）中的一个：  
* TH32CS_INHERIT - 声明快照句柄是可继承的。
* TH32CS_SNAPALL - 在快照中包含系统中所有的进程和线程。
* TH32CS_SNAPHEAPLIST - 在快照中包含在th32ProcessID中指定的进程的所有的堆。
* TH32CS_SNAPMODULE - 在快照中包含在th32ProcessID中指定的进程的所有的模块。
* TH32CS_SNAPPROCESS - 在快照中包含系统中所有的进程。
* TH32CS_SNAPTHREAD - 在快照中包含系统中所有的线程。


th32ProcessID：指定了进程的标识号，当设置为0时指定当前进程。该参数只有在设置了TH32CS_SNAPHEAPLIST或TH32CS_SNAPMOUDLE后才有效，在其他情况下该参数被忽略，所有的进程都会被快照。


返回值：调用成功，返回快照的句柄，调用失败，返回INVAID_HANDLE_VALUE。

-------

下面是几个类似的遍历调用接口：

	//从Snapshot得到第一个进程记录信息
	BOOL Process32First(
		HANDLE hSnapshot,
		LPPROCESSENTRY32 lppe
    );
	

	//从Snapshot得到下一个Module记录信息
	BOOL Process32Next(){
		HANDLE hSnapshot,
		LPPROCESSENTRY32 lppe 
	};


	BOOL Module32First(){
		HANDLE hSnapshot,
		PMODULEENTRY3 lpme
	};

	BOOL Module32Next(){
		HANDLE hSnapshot,
		LPMODULEENTRY3 lpme
	};


	BOOL Thread32First(){
		HANDLE hSnapshot,
		LPTHREADENTRY32 lpte
	};


	BOOL Thread32Next(){
		HANDLE hSnapshot,
		LPTHREADENTRY32 lpte
	};

	
	Toolhelp32ReadProcessMemory(){
		_In_  DWORD   th32ProcessID,
		_In_  LPCVOID lpBaseAddress,
		_Out_ LPVOID  lpBuffer,
		_In_  SIZE_T  cbRead,
		_Out_ SIZE_T  lpNumberOfBytesRead
	};
	
	
	HANDLE OpenProcess(){}
	
参数：DWORD dwDesiredAccess 权限描叙信息
这里我用到了PROCESS_ALL_ACCESS功能是具有所有权限
参数：BOOL bInheritHandle 确定该句柄是否可以被程继承
参数：dwPrcessID 进程ID号
作用：打开一个存在的进程对象