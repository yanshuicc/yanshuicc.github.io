---
layout: post
title: C++指针/引用/地址/函数参数
category: dump
description: C++指针相关的技巧用法记录
---

指针一向是C/C++的一个难点，一方面是概念方面的理解问题，一方面是具体使用的语法问题，在此对常见用法做一个记录。



### 完整代码


    #include<iostream>
    #include<string>
    using namespace std;
    #pragma warning( disable : 4996 ) 


    void test_pointer() {
        cout << "------------test_pointer-------" << endl;
        int donuts = 6;
        double cups = 4.5;
        cout << "donuts value = " << donuts;
        cout << " and donuts address = " << unsigned(&donuts) << endl;
        cout << "cups value = " << cups;
        cout << " and cups address = " << unsigned(&cups) << endl;
        cout << "donuts 和 cups 的地址差值:"<< unsigned(&donuts) - unsigned(&cups) << endl;

        int updates = 6;
        int* p_updates;
        //指针初始化是将对象的地址赋值给p_updates，而不是赋值给*p_updates
        //指针一定要记得初始化后，才能给指向的对象赋值
        p_updates = &updates;

        //整数和地址直接需要进行类型转换
        int ad = (int)&updates;
        p_updates = (int *)ad;
        
        //显示值
        cout << "Values: updates = " << updates;
        cout << ", *p_updates = " << *p_updates << endl;
        
        //显示地址
        cout << "Addresses: &updates" << &updates;
        cout << ", p_updates = " << p_updates << endl;
        
        //使用指针更改值
        *p_updates = *p_updates + 1;
        cout << "Now updates = " << updates << endl;
    }

    void test_chars_pointer() {
        cout << "------------test_chars_pointer-------" << endl;
        char animal[20] = "bear";
        //对于字符串数组的名称，会看着地址
        //即animal == &animal[0]
        //&animal[i] == animal +i
        //animal[i] == *(animal+i) 
        //相应的对于字符串数组的下标寻址也会进行转换
        //animal[i]会被转换成*(animal+i)
        const char *bird = "wren";
        char* ps = animal;

        cout << animal << " and ";
        cout << bird << endl;
        
        cout << "before using strcpy():" << endl;
        cout << animal << " at " << (int*)animal << endl;
        cout << ps << " at " << (int*)ps << endl;

        ps = new char[strlen(animal) + 1];
        strcpy(ps, animal);
        cout << "After using strcpy():\n";
        cout << animal << " at " << (int*)animal << endl;
        cout << ps << " at " << (int*)ps << endl;
        delete[] ps;
    }

    //在函数头/函数原型中，int* arr和int arr[]是唯一完全等价的地方。
    //int test_sum_arr(int* arr, int n);

    //向test_sum_arr传递的是数组的地址
    int test_sum_arr(int arr[], int n) {
        cout << "------------test_sum_arr-------" << endl;
        int total = 0;
        for (int i = 0; i < n; i++) {
            total += arr[i];
        }
        cout << total << endl;
        return total;
    }

    //程序访问的是原始数组而不是副本，所以可以使用const保护数组
    void test_show_arr(const double arr[],int n) {
        for (int i = 0; i < n; i++) {
            cout << "arr[" << i << "]" << arr[i];
        }
        cout << endl;
    }

    //使用数组区间的函数
    int test_sum_arr2(const int* begin, const int* end) {
        const int *pt;
        int total = 0;
        for (pt = begin; pt != end; pt++) {
            total += *pt;
        }
        return total;
    }

    //我们要尽可能的使用const
    void test_const() {
        cout << "---------------test_const--------" << endl;
        int age = 39;
        const int *pt1 = &age;
        //pt指向一个const int，存储其地址，不能使用pt来修改这个值，即不能使用*pt来修改值
        //*pt += 1;

        const float g = 1.1f;
        //我们只能将const变量的地址赋值给const的指针
        const float* p = &g;
        //不能将const变量的地址赋值给常规指针，如果想这么做需要使用const_cast进行强制类型转换
        //float* pt = &g;


        //在一级间接关系中，可以将非const指针赋给const指针
        int* pd = &age;
        const int* pt2 = pd;

        //在二级间接关系中，const和非const混合的指针赋值方式不再安全
        //将非const地址(&p1)赋给const指针(pp2)，因此可以使用p1修改const数据
        /**
        *		const **pp2		const n = 13	int *p1
        *		*pp2	=		&n				p1
        *		pp2				=				&p1
        **/
        //const int** pp2;
        //int *p1;
        //const int n = 13;
        //pp2 = &p1;		//编译报错error C2440: “=”: 无法从“int **”转换为“const int **”
        //*pp2 = &n;
        //*p1 = 10;
        //cout << "const n changed:" << n << endl;


        const int* pt3 = &age;	//指向const int的指针
        int sage = 80;
        pt3 = &sage;			//不可以通过指针修改对象的值，但是可以修改指针指向另外的整数
        int* const pt4 = &sage;	//指向int的const指针
    }

    //二维数组
    //int test_sum_arr3(int (*arr)[4], int n);
    int test_sum_arr3(int arr[][4], int n) {
        cout << "---------------test_sum_arr3--------" << endl;
        //arr[i][j] == *(*(arr + i) + j)
        int total = 0;
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < 4; j++) {
                total += arr[i][j];
            }
        }
        cout << total << endl;
        return total;
    }

    //返回字符串可以返回字符串的地址
    char* buildstr(char c, int n) {
        cout << "---------------buildstr--------" << endl;
        char *str = new char[n + 1];
        str[n] = '\0';
        while(n--) {
            str[n] = c;
        }
        return str;
    }

    void test_ref(int &a) {
        int rat;
        //引用必须在声明的时候初始化
        //int &rodent;
        //rodent = rat;
        int &rodent = rat;
        //等效于
        int* const pr = &rat;
    }

    //引用传参更加严格
    void swapr(int &a, int &b) {
        cout << "---------------swapr--------" << endl;
        int temp;
        temp = a;
        a = b;
        b = temp;
    }

    void swapp(int *a, int *b) {
        cout << "---------------swapp--------" << endl;
        int temp;
        temp = *a;
        *a = *b;
        *b = temp;
    }

    //按值传递可以使用下面两种方式
    //swapv(a+2,b);			//引用不可以
    //swapv(arr1[1],b);		//引用可以
    void swapv(int a, int b) {
        cout << "---------------swapv--------" << endl;
        int temp;
        temp = a;
        a = b;
        b = temp;
    }

    double test_ref_cube(const double &a) {
        cout << "---------------test_ref_cube--------" << endl;
        cout << &a << endl;
        return a*a*a;
    }



    int main() {
        test_pointer();
        test_chars_pointer();
        int arr1[5] = { 1,2,3,4,5 };
        test_sum_arr(arr1, 5);
        int arr2[3][4] = { {1,2,3,4},{9,8,7,6},{2,4,6,8} };
        test_sum_arr3(arr2, 3);
        char *str = buildstr('a', 10);
        cout << "buildstr res:" << str << endl;
        int a = 1, b = 2;
        cout << "-------------原始值-----------" << endl;
        cout << "a:" << a << "b:" << b << endl;
        swapr(a, b);
        cout << "a:" << a << "b:" << b << endl;
        swapp(&a, &b);
        cout << "a:" << a << "b:" << b << endl;
        swapv(a, b);
        cout << "a:" << a << "b:" << b << endl;
        double side = 3.0;
        double len[3] = { 1,2,3 };
        long edge = 5L;
        double c1 = test_ref_cube(side);			//side的引用
        double c2 = test_ref_cube(len[1]);			//len[1]的引用
        double c3 = test_ref_cube(edge);			//临时变量的引用
        double c4 = test_ref_cube(7.0);				//临时变量的引用
        double c5 = test_ref_cube(side + 10.0);		//临时变量的引用
        system("PAUSE");
        return 0;
    }

	
	
## 未完待续