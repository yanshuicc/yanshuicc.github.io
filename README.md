# 心物婉转的个人小站

基于 Jekyll + GitHub Pages 搭建的个人静态博客，用于记录个人随笔、编程感悟与项目展示。

- 站点地址：https://yscc.xyz
- GitHub Pages：https://yanshuicc.github.io

## 目录结构

```text
.
├── _layouts/      # 页面布局模板
├── _posts/        # 博客文章源文件
├── _site/         # Jekyll 构建结果
├── css/           # 样式
├── js/            # 脚本
├── images/        # 图片
├── fonts/         # 字体
├── CNAME          # 自定义域名
└── 404.html       # 404 页面
```

_layouts 中的html文件是页面布局模板，thinking/project/中页面、Markdown文章 里的 layout配置指定使用哪一个页面布局模板。页面正文最终会被插入到页面布局模板中 {{ content }} 所在的位置。

## 本地运行

```bash
git clone https://github.com/yanshuicc/yanshuicc.github.io.git
cd yanshuicc.github.io
jekyll serve
```

然后访问：

```text
http://localhost:4000
```

## 部署

推送到 GitHub 仓库后，通过 GitHub Pages 发布。

自定义域名在 `CNAME` 文件中配置。