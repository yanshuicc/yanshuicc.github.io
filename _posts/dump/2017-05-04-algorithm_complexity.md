---
layout: post
title: 算法复杂度
category: dump
description: 记录一个大概估算算法复杂度的表格
---

算法复杂度是衡量算法效率的重要标准，今天看见一个比较直观的算法复杂度表格，做一个记录备份。
（其中若1.e+5形式，实际表示若1.0×10^5）

<table>
   <tr>
      <td rowspan="2">问题规模n</td>
      <td colspan="5" width="385" align="middle">多项式函数</td>
      <td colspan="2" width="206" align="middle">指数函数</td>
   </tr>
   <tr>
      <td>logn</td>
      <td>n</td>
      <td>nlogn</td>
      <td>n^2</td>
      <td>n^3</td>
      <td>2^n</td>
      <td>n!</td>
   </tr>
   <tr>
      <td align="right">1</td>
      <td align="right">0</td>
      <td align="right">1</td>
      <td align="right">0</td>
      <td align="right">1</td>
      <td align="right">1</td>
      <td align="right">2</td>
      <td align="right">1</td>
   </tr>
   <tr>
      <td align="right">10</td>
      <td align="right">3.32</td>
      <td align="right">10</td>
      <td align="right">33.21928095</td>
      <td align="right">100</td>
      <td align="right">1000</td>
      <td align="right">1024</td>
      <td align="right">3628800</td>
   </tr>
   <tr>
      <td align="right">20</td>
      <td align="right">4.32</td>
      <td align="right">20</td>
      <td align="right">86.4385619</td>
      <td align="right">400</td>
      <td align="right">8000</td>
      <td align="right">1048576</td>
      <td align="right">2.4329E+18</td>
   </tr>
   <tr>
      <td align="right">30</td>
      <td align="right">4.91</td>
      <td align="right">30</td>
      <td align="right">147.2067179</td>
      <td align="right">900</td>
      <td align="right">27000</td>
      <td align="right">1073741824</td>
      <td align="right">2.65253E+32</td>
   </tr>
   <tr>
      <td align="right">40</td>
      <td align="right">5.32</td>
      <td align="right">40</td>
      <td align="right">212.8771238</td>
      <td align="right">1600</td>
      <td align="right">64000</td>
      <td align="right">1.09951E+12</td>
      <td align="right">8.15915E+47</td>
   </tr>
   <tr>
      <td align="right">50</td>
      <td align="right">5.64</td>
      <td align="right">50</td>
      <td align="right">282.1928095</td>
      <td align="right">2500</td>
      <td align="right">125000</td>
      <td align="right">1.1259E+15</td>
      <td align="right">3.04141E+64</td>
   </tr>
   <tr>
      <td align="right">100</td>
      <td align="right">6.64</td>
      <td align="right">100</td>
      <td align="right">664.385619</td>
      <td align="right">10000</td>
      <td align="right">1000000</td>
      <td align="right">1.26765E+30</td>
      <td align="right">9.3326E+157</td>
   </tr>
</table>


>PS:jekyll来做表格真是麻烦，折腾了大半个上午。