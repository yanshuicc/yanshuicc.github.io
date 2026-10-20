(function () {
    var el = document.getElementById('random-line');
    if (!el) return;

    // baseurl 是为了让 JS 在子路径部署时也能正确拼路径。如果站点部署在根路径，baseurl 是空字符串，baseurl 就是 ""，拼出来的 URL 是 /assets/data/flash_of_insight.json
    var base = "";
    // Liquid 传一个构建时间，这样每次重新构建，版本号会变，浏览器会重新拉数据；同一次构建内，多个页面共用缓存。
    var ver = "1792427846";
    var url = base + '/assets/data/flash_of_insight.json?v=' + ver;

    fetch(url)
        .then(function (res) {
            if (!res.ok) throw new Error('加载失败');
            return res.json();
        })
        .then(function (lines) {
            if (!lines || !lines.length) return;
            var line = lines[Math.floor(Math.random() * lines.length)];
            el.textContent = line.content || '';
            if (line.ref) el.title = line.ref;
        })
        .catch(function () {
            el.textContent = '';
        });
})();