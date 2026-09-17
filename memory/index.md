---
layout: home
---

<div class="index-content">
    <div class="section">
        <table class="artical-list">
            <thead>
                <tr>
                    <th class="col-date">日期</th>
                    <th class="col-title">标题</th>
                </tr>
            </thead>
            <tbody>
            {% for post in site.categories.memory %}
                <tr>
                    <td class="col-date">{{ post.date | date: "%Y-%m-%d" }}</td>
                    <td class="col-title">
                        <a href="{{ post.url }}">{{ post.title }}</a>
                        {% if post.description %}
                        <div class="title-desc">{{ post.description }}</div>
                        {% endif %}
                    </td>
                </tr>
            {% endfor %}
            </tbody>
        </table>
    </div>
</div>
