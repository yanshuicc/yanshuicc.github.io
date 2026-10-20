---
layout: post
title: leetcode 4 Median of Two Sorted Arrays
category: dump
description: leetcode 第四题，求两个有序数组的中位数
---



[leetcode 4 Median of Two Sorted Arrays](https://leetcode.com/problems/median-of-two-sorted-arrays)
### Description
There are two sorted arrays nums1 and nums2 of size m and n respectively.

Find the median of the two sorted arrays. The overall run time complexity should be O(log (m+n)).

Example 1:

	nums1 = [1, 3]
	nums2 = [2]

The median is 2.0

Example 2:

	nums1 = [1, 2]
	nums2 = [3, 4]

The median is (2 + 3)/2 = 2.5

-----------------------

题目意思大概是，在两个排好序的数组中，查找中位数。如下：

[1,2,3,4,5]
[6,7,8,9]
中位数为5

若是偶数个数，则去中间两个数的平均值。如下：

[1,2,3,4,5]
[6,7,8,9,10]
中位数为5.5


题目也可以置换为求两个排好序的数组中，第k大的数（k为两个数组的长度和除以2），因为时间要求是log(m+n)，所以使用二分查找。

在一个数组中套用二分查找很简单，递归即可。（当然一个数组也没必要用二分了，已经是有序数组）

在两个数组中套用二分查找，需要考虑的情况比较复杂。

不妨令数组A的长度小于等于数组B的长度

（1）k为1或者数组1的长度为0时，为递归出口，可以直接找到两个数组中第k大的数。

（2）pa取k/2，分别在A和B中分别找第k/2大的数。如果A的长度小于k/2，pa就取A的长度，pb取k-pa。

（3）A[pa]小于B[pa]，则第k大的数肯定不会出现在pa之前，把A数组在pa之前的去掉，同理，如果A[k/2]大于B[k/2]，则第k大的数肯定不会出现在pb之后，去掉数组B在pb后的数。

代码如下：

	# coding:utf-8

	class Solution(object):
		def findK(self, nums1, nums2, k):
			if len(nums1) > len(nums2):
				return self.findK(nums2, nums1, k)
			if len(nums1) == 0 :
				return nums2[k - 1]
			if k == 1:
				return min(nums1[0], nums2[0])
			pa = min(k / 2, len(nums1))
			pb = k - pa

			if nums1[pa - 1] < nums2[pb - 1]:
				return self.findK(nums1[pa:], nums2, k - pa)
			elif nums1[pa - 1] > nums2[pb - 1]:
				return self.findK(nums1, nums2[pb:], k - pb)
			else:
				return nums1[pa - 1]

		def findMedianSortedArrays(self, nums1, nums2):
			len2 = len(nums1)+len(nums2)
			if len2 % 2 == 1:
				k = len2 / 2 + 1
				return self.findK(nums1, nums2, k)
			else:
				s1 = self.findK(nums1, nums2,len2 / 2)
				s2 = self.findK(nums1, nums2, len2 / 2 + 1)
				return (float)(s1 + s2) / 2

	# 测试用例
	if __name__ == "__main__":
		so = Solution()
		print so.findMedianSortedArrays([], [1])
		print so.findMedianSortedArrays([1], [])
		print so.findMedianSortedArrays([1, 2, 3], [])
		print so.findMedianSortedArrays([1], [2])
		print so.findMedianSortedArrays([1], [1])
		print so.findMedianSortedArrays([1, 3], [2])
		print so.findMedianSortedArrays([1], [2, 3])
		print so.findMedianSortedArrays([1, 2], [3, 4])
		print so.findMedianSortedArrays([1, 3, 5, 7, 9, 11], 
						[2, 4, 6, 8, 10])
		print so.findMedianSortedArrays([1, 3, 5, 7, 9, 11], 
						[2, 4, 6, 8, 10, 12])
		print so.findMedianSortedArrays([1, 11], 
						[2, 3, 4, 5, 6, 7, 8, 9, 10])
		print so.findMedianSortedArrays([1, 11], 
						[2, 3, 4, 5, 6, 7, 8, 9, 10, 12])

测试用例中的坑主要是

（1）一个数组为空
[1],[]

（2）两个相同数组
[1],[1]


