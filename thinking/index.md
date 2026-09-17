---
layout: home
---


<div class="index-content">
    <div class="section">

        <div class="list-toolbar">
            <input type="text" id="searchInput" class="search-input"
                   placeholder="搜索标题或描述…" autocomplete="off" />
        </div>

        <table class="artical-list" id="articalTable">
            <thead>
                <tr>
                    <th class="col-date">日期</th>
                    <th class="col-title">标题</th>
                </tr>
            </thead>
            <tbody>
            {% for post in site.categories.thinking %}
                <tr class="artical-row"
                    data-search="{{ post.title | downcase | escape }} {{ post.description | downcase | escape }}">
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

        <div class="list-empty" id="listEmpty" style="display:none;">没有找到匹配的文章</div>

        <div class="pagination" id="pagination"></div>

    </div>
</div>

<script>
(function () {
    var PAGE_SIZE = 20;                    // 每页条数
    var $rows = $('.artical-row');
    var $empty = $('#listEmpty');
    var $pagination = $('#pagination');
    var currentPage = 1;
    var filteredRows = $rows;

    function render() {
        var total = filteredRows.length;
        var totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
        if (currentPage > totalPages) currentPage = totalPages;

        $rows.removeClass('is-visible');
        var start = (currentPage - 1) * PAGE_SIZE;
        filteredRows.slice(start, start + PAGE_SIZE).addClass('is-visible');

        $empty.toggle(total === 0);

        // 渲染页码
        $pagination.empty();
        if (totalPages <= 1) return;

        var html = '';
        if (currentPage > 1) {
            html += '<a href="#" class="page-btn" data-page="' + (currentPage - 1) + '">上一页</a>';
        }
        for (var i = 1; i <= totalPages; i++) {
            if (i === currentPage) {
                html += '<span class="page-btn active">' + i + '</span>';
            } else {
                html += '<a href="#" class="page-btn" data-page="' + i + '">' + i + '</a>';
            }
        }
        if (currentPage < totalPages) {
            html += '<a href="#" class="page-btn" data-page="' + (currentPage + 1) + '">下一页</a>';
        }
        $pagination.html(html);
    }

    // 搜索
    $('#searchInput').on('input', function () {
        var kw = $.trim($(this).val()).toLowerCase();
        if (!kw) {
            filteredRows = $rows;
        } else {
            filteredRows = $rows.filter(function () {
                return ($(this).attr('data-search') || '').indexOf(kw) !== -1;
            });
        }
        currentPage = 1;
        render();
    });

    // 翻页
    $pagination.on('click', '.page-btn', function (e) {
        e.preventDefault();
        var p = parseInt($(this).attr('data-page'), 10);
        if (!p) return;
        currentPage = p;
        render();
        $('html, body').animate(
            { scrollTop: $('.index-content').offset().top - 80 }, 200
        );
    });

    render();
})();
</script>