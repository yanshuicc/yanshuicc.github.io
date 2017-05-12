---
layout: post
title: 移动平均法
category: dump
description: 移动平均法例子的记录，很简单的一个预测方法。
---

----
$$
F_{t+1}=\frac{1}{n} \sum\limits_{i=t+1-n}^t x_i
$$
<table>
<tr>
  <td align="middle">时间</td>
  <td align="middle">&nbsp;&nbsp;t-时序</td>
  <td align="middle">实际销售量 （台）</td>
  <td align="middle">3个月移动平均预测</td>
 </tr>
 <tr>
  <td align="middle">2005.1</td>
  <td align="middle">1</td>
  <td align="middle">53</td>
  <td align="middle">&nbsp;</td>
 </tr>
 <tr>
  <td align="middle">2005.2</td>
  <td align="middle">2</td>
  <td align="middle">46</td>
  <td align="middle">&nbsp;</td>
 </tr>
 <tr>
  <td align="middle">2005.3</td>
  <td align="middle">3</td>
  <td align="middle">28</td>
  <td align="middle">&nbsp;</td>
 </tr>
 <tr>
  <td align="middle">2005.4</td>
  <td align="middle">4</td>
  <td align="middle">35</td>
  <td align="middle">42</td>
 </tr>
 <tr>
  <td align="middle">2005.5</td>
  <td align="middle">5</td>
  <td align="middle">48</td>
  <td align="middle">36</td>
 </tr>
 <tr>
  <td align="middle">2005.3</td>
  <td align="middle">6</td>
  <td align="middle">50</td>
  <td align="middle">37</td>
 </tr>
 <tr>
  <td align="middle">2005.7</td>
  <td align="middle">7</td>
  <td align="middle">38</td>
  <td align="middle">44</td>
 </tr>
 <tr>
  <td align="middle">2005.8</td>
  <td align="middle">8</td>
  <td align="middle">34</td>
  <td align="middle">45</td>
 </tr>
 <tr>
  <td align="middle">2005.9</td>
  <td align="middle">9</td>
  <td align="middle">58</td>
  <td align="middle">41</td>
 </tr>
 <tr>
  <td align="middle">2005.1</td>
  <td align="middle">10</td>
  <td align="middle">64</td>
  <td align="middle">43</td>
 </tr>
 <tr>
  <td align="middle">2005.11</td>
  <td align="middle">11</td>
  <td align="middle">45</td>
  <td align="middle">52</td>
 </tr>
 <tr>
  <td align="middle">2005.12</td>
  <td align="middle">12</td>
  <td align="middle">42</td>
  <td align="middle">56</td>
 </tr>
</table>

$$
F_1=53\\

F_2=46\\

F_3=28\\

F_4=\frac{1}{3}*(F_1+F_2+F_3)\\

F_5=\frac{1}{3}*(F_2+F_3+F_4)\\

...


$$


优点:简单易行。\\
缺点:适用于简单水平型历史数据，但是现实中数据情况更加复杂，一般不适合这种方法。