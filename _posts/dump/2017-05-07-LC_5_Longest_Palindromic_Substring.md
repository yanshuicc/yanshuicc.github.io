---
layout: post
title: leetcode 5 Longest Palindromic Substring
category: dump
description: leetcode 第五题，求最长回归子串
---

[leetcode 5 Longest Palindromic Substring](https://leetcode.com/problems/longest-palindromic-substring/)
### Description
Given a string s, find the longest palindromic substring in s. You may assume that the maximum length of s is 1000.

Example:

Input: "babad"

Output: "bab"

Note: "aba" is also a valid answer.
Example:

Input: "cbbd"

Output: "bb"

-----------------------

题目意思大概是，在字符串中查找最长的一个回文串，返回字符串。如果有几个相同长度的回文串，返回任何一个都可以。

题目难度中等，也没做什么特别的算法优化。

### 解题思路
对每个字符分别做奇数、偶数的检查，注意下标转换即可。
	class Solution(object):
    def oddCheck(self, s, i):
        len1 = 1
        while True:
            if i - len1 < 0 or i + len1 +1 > len(s):
                break
            if s[i - len1] == s[i + len1]:
                len1 += 1
                continue
            else:
                return len1
        return len1

    def evenCheck(self, s, i):
        len1 = 0
        while True:
            if i - len1 < 0 or i + len1 + 2 > len(s):
                break
            if s[i - len1] == s[i + len1 + 1]:
                len1 += 1
                continue
            else:
                return len1
        return len1

    def longestPalindrome(self, s):
        flag = 0
        pos = 0
        maxo = 0
        for i in range(0, len(s) + 1):
            odd = self.oddCheck(s, i)
            even = self.evenCheck(s, i) + 1
            if maxo < even:
                maxo = even - 1
                pos = i
                flag = 2
            if(maxo < odd):
                maxo = odd
                pos = i
                flag = 1
        if flag == 1:
            return s[pos - maxo + 1: pos + maxo]
        else:
            return s[pos - maxo + 1: pos + 1 + maxo]

	# 测试用例
	if __name__ == "__main__":
		so = Solution()
		print so.longestPalindrome("a")
		print so.longestPalindrome("aa")
		print so.longestPalindrome("ab")
		print so.longestPalindrome("aba")
		print so.longestPalindrome("acc")
		print so.longestPalindrome("babad")
		print so.longestPalindrome("babab")
		print so.longestPalindrome("bacaa")
		print so.longestPalindrome("babbad")
		print so.longestPalindrome("abbacaa")
		print so.longestPalindrome("abbacab")
		
		
	
		