---
layout: post
title: VTK的Tutorial使用记录
category: dump
Description: VTK官方的Example记录
---


第一个例子是创建多边形的圆锥，并渲染到屏幕上，圆锥旋转360度后退出程序。  
VTK程序的典型流程：基本的设置->映射->动作设置->渲染->窗口显示。


首先是添加VTK用到的类文件


	#include "vtkConeSource.h"
	#include "vtkPolyDataMapper.h"
	#include "vtkRenderWindow.h"
	#include "vtkCamera.h"
	#include "vtkActor.h"
	#include "vtkRenderer.h"
	
	

然后我们创建一个圆锥类vtkConeSource的实例，并设置它的一些属性值。  
vtkConeSource的实例cone是可视化管道(visualization pipeline)，可以输出vtkPolyData类型的数据，其他的filters可以对这些数据进行处理。
	
	vtkConeSource *cone = vtkConeSource::New();
	cone->SetHeight(3.0);
	cone->SetRadius(1.0);
	cone->SetResolution(10);
	 

我们用mapper处理对象终止管道。
我们创建一个vtkpolydatamapper实例来映射多边形数据为图形元素。
我们把圆锥的输出源连接到这个mapper的输入。
	
	vtkPolyDataMapper *coneMapper = vtkPolyDataMapper::New();
	coneMapper->SetInputConnection(cone->GetOutputPort());
	

创建一个圆锥的actor，actor管理mapper图像单元的动作绘制。
actor可以通过vtkProperty实例来控制属性，如矩阵转移调整图形的移动防缩。
我们设置这个actor的mapper为刚刚创建的coneMapper。

	vtkActor *coneActor = vtkActor::New();
	coneActor->SetMapper(coneMapper);


创建一个Renderer，给它分配actor。Renderer类似于视口(viewport)，是actor要显示在窗口中的部分，所以我们在这里要设置背景色。

	vtkRenderer *ren1 = vtkRenderer::New();
	ren1->AddActor(coneActor);
	ren1->SetBackground(0.1, 0.2, 0.4);

最后我们创建一个绘制窗口，我们使用AddRenderer方法将Renderer放到窗口里面。设置窗口像素300X300。

	vtkRenderWindow *renWin = vtkRenderWindow::New();
	renWin->AddRenderer(ren1);
	renWin->SetSize(300, 300);


现在我们循环旋转360度，然后每旋转1度绘制一次圆锥。

	int i;
	for (i = 0; i < 360; ++i)
	{
		// render the image
		renWin->Render();
		// rotate the active camera by one degree
		ren1->GetActiveCamera()->Azimuth(1);
	}


释放对象，所有的VTK对象都使用Delete()方法释放。

	cone->Delete();
	coneMapper->Delete();
	coneActor->Delete();
	ren1->Delete();
	renWin->Delete();