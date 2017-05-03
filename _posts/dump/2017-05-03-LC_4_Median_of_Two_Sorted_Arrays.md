---
layout: post
title: leetcode 4 Median of Two Sorted Arrays
category: dump
---

###Description
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

不妨令数组1的长度小于等于数组2的长度

（1）k为1或者数组1的长度为0时，为递归出口，可以直接找到两个数组中第k大的数。

（2）将k一分为二，在数组1和数组2中分别找第k/2大的数。如果数组1的长度小于k/2，就直接调用数组1的长度

（3）如果pa的值 < pb的值，那证明第K个数肯定不会出现在pa之前，递归，把A数组pa之前的砍掉，同理递归砍B数组。

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
			print so.findMedianSortedArrays([1], [2])
			print so.findMedianSortedArrays([1], [1])
			print so.findMedianSortedArrays([1, 3], [2])
			print so.findMedianSortedArrays([1], [2, 3])
			print so.findMedianSortedArrays([1, 2], [3, 4])
			print so.findMedianSortedArrays([1, 3, 5, 7, 9, 11], [2, 4, 6, 8, 10])
			print so.findMedianSortedArrays([1, 3, 5, 7, 9, 11], [2, 4, 6, 8, 10, 12])
			print so.findMedianSortedArrays([1, 11], [2, 3, 4, 5, 6, 7, 8, 9, 10])
			print so.findMedianSortedArrays([1, 11], [2, 3, 4, 5, 6, 7, 8, 9, 10, 12])

