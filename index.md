---
layout: page
title: 盐水冲茶的个人博客
tagline: 尘世中一个迷途小菜鸟
---
{% include JB/setup %}

    
## My Posts



<ul class="posts">
  {% for post in site.posts %}
    <li><span>{{ post.date | date_to_string }}</span> &raquo; <a href="{{ BASE_PATH }}{{ post.url }}">{{ post.title }}</a></li>
  {% endfor %}
</ul>



