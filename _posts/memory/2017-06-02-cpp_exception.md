---
layout: post
title: C++异常
category: dump
description: C++异常相关的技巧用法记录
---

C++异常应用表现的并不好，而vs 2017也不支持异常类的throw，会弹一个warning，gcc是支持的。  
当项目含有大量的Exception的时候就显得很讨厌，可以用以下语句取消这个warning

    #pragma warning( disable : C4290 ) 
	
    class Exception {
    public:
        Exception(const char* s) {
            name = s;
        }
        ~Exception() {}
    private:
        std::string name;
    };

    void f1(void) throw(Exception) {}       // C4290  
             
    void f2(void) throw() {}                // OK  
    void f3(void) throw(...) {}
	
	
## 未完待续