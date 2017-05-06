---
layout: post
title: 配置Piwik站长统计
category: dump
description: Piwik是一款开源的站长统计工具，记录一下
---

Piwik是一款开源的站长统计工具，配置简单而功能强大。

[Piwik官网](https://piwik.org/)

Piwik是PHP语言开发的系统，对环境有一定要求。

requirements：
>Webserver such as Apache, Nginx, IIS, etc.\\
>PHP version 5.5.9 or greater\\
>MySQL version 5.5 or greater, or MariaDB\\
>(enabled by default) PHP extension pdo and pdo_mysql, or the mysqli extension.

服务器/PHP/MySQL的配置过程在[ubuntu配置ss服务端的记录](/bwh_ss)中已经有所记录，其他还需要安装一些php的扩展模块

	sudo apt-get install php7.0 php7.0-curl php7.0-gd php7.0-cli mysql-server php7.0-mysql php-xml php7.0-mbstring