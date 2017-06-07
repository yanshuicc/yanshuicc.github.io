---
layout: post
title: python@的用法记录
category: dump
---

一直使用python写代码，做的业务方面的比较多，比较少使用它的高级特性。但是因为需要，所以做一点记录。


@ 定义类的静态方法

	class Person(object):
		@staticmethod
		
		def hello():
			print 'hello world!!!'
			
			
	if __name__ == '__main__':
		Pserson.hello()

@ 做装饰器	
		
	def log(func):
		# *args, **kw 方法接收任何形式的参数
		def wrapper(*args, **kw):
			print('call %s():' % func.__name__)
			return func(*args, **kw)
		return wrapper


	@log
	def now():
		print('2017-05-27')

		
	if __name__ == '__main__':
		# 相当于执行 now = log(now)
		now() 
		
@ 做装饰器接受参数

	def log(text):
		def decorator(func):
			def wrap(*args, **kw):
				print(text)
				return func(*args, **kw)
			return wrap
		return decorator


	@log('2017-05-27')
	def now():
		print('2017-05-28')


	def now1():
		print('2017-05-28')
	
	
	if __name__ == "__main__":
		now()
		# 前者等价于
		log('2017-05-27')(now1)()
		
		
修正函数属性错误的问题

	from functools import wraps

	def log(text):
		def decorator(func):
			@wraps(func)
			def wrap(*args, **kw):
				print(text)
				return func(*args, **kw)
			return wrap
		return decorator

		
	@log('2017-05-27')
	def now():
		print('2017-05-28')


	if __name__ == "__main__":
		now()
		print now.__name__  
	