/* code-viewer.js — 美化版代码查看器
 * 点击文件卡片「查看」→ fetch 源码 → 新窗口渲染带语法高亮 + 行号的查看器
 * 用法：文章 front matter 加 features: [code-viewer]
 */
(function () {
  'use strict';
  if (!document.querySelector('.file-card')) return;

  // 扩展名 → Prism language token
  var EXT_LANG = {
    py: 'python', go: 'go', rs: 'rust', rb: 'ruby', java: 'java',
    js: 'javascript', jsx: 'jsx', ts: 'typescript', tsx: 'tsx',
    c: 'c', h: 'c', cpp: 'cpp', cc: 'cpp', cxx: 'cpp', hpp: 'cpp',
    sh: 'bash', bash: 'bash', zsh: 'bash',
    sql: 'sql', html: 'markup', htm: 'markup', xml: 'markup', svg: 'markup',
    css: 'css', scss: 'scss', less: 'less',
    json: 'json', yml: 'yaml', yaml: 'yaml',
    md: 'markdown', txt: 'plaintext', log: 'plaintext',
    php: 'php', swift: 'swift', kt: 'kotlin', scala: 'scala',
    lua: 'lua', pl: 'perl', r: 'r', cs: 'csharp', dart: 'dart',
    vue: 'markup'
  };

  function extOf(filename) {
    var m = /\.(\w+)$/.exec(filename || '');
    return m ? m[1].toLowerCase() : 'txt';
  }
  function langOf(filename) {
    return EXT_LANG[extOf(filename)] || 'plaintext';
  }

  document.addEventListener('click', function (e) {
    var btn = e.target.closest('.file-card-btn[data-action="view"]');
    if (!btn) return;

    e.preventDefault();
    var url = btn.getAttribute('data-path') || btn.href;
    var filename = btn.getAttribute('data-filename') || url.split('/').pop() || 'code';
    if (!url) return;

    var originalText = btn.textContent;
    btn.textContent = '加载中…';
    btn.disabled = true;

    fetch(url)
      .then(function (res) {
        if (!res.ok) throw new Error('HTTP ' + res.status);
        return res.text();
      })
      .then(function (text) {
        btn.textContent = originalText;
        btn.disabled = false;
        openViewer(filename, url, text);
      })
      .catch(function (err) {
        btn.textContent = originalText;
        btn.disabled = false;
        alert('加载失败：' + err.message + '\n请点「下载」按钮保存后用编辑器打开。');
      });
  });

  // —— 生成查看器 HTML ——
  function openViewer(filename, url, text) {
    var ext = extOf(filename);
    var lang = langOf(filename);
    var lineCount = text.split('\n').length;
    var viewer = window.open('', '_blank');
    if (!viewer) return alert('请允许浏览器弹窗，或右键 → 在新标签页打开。');

    // 把文本转义为 HTML 安全（Prism 会做 tokenize，但 pre 里内容仍要 escape）
    var safeText = text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');

    var html = buildDoc(filename, url, ext, lang, lineCount, safeText);
    viewer.document.open();
    viewer.document.write(html);
    viewer.document.close();
  }

  function buildDoc(filename, url, ext, lang, lineCount, safeText) {
    return '<!DOCTYPE html>\n<html lang="zh-CN">\n<head>\n' +
      '<meta charset="utf-8" />\n' +
      '<meta name="viewport" content="width=device-width,initial-scale=1" />\n' +
      '<title>' + escapeHTML(filename) + ' — 代码查看器</title>\n' +

      // Prism 主题（Tomorrow Dark）+ 行号插件
      '<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/prismjs@1/themes/prism-tomorrow.min.css" />\n' +
      '<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/prismjs@1/plugins/line-numbers/prism-line-numbers.min.css" />\n' +

      '<style>\n' +
      '  * { box-sizing: border-box; margin: 0; padding: 0; }\n' +
      '  html, body { height: 100%; background: #1c1f21; color: #ccc; font-family: -apple-system, "Segoe UI", "PingFang SC", "Microsoft YaHei", sans-serif; }\n' +

      // 标题栏
      '  header { display: flex; align-items: center; gap: 14px; padding: 10px 20px; background: #2a2d2f; border-bottom: 1px solid #3a3d3f; }\n' +
      '  header .file-icon { width: 32px; height: 32px; border-radius: 4px; background: #5a8a4a; display: flex; align-items: center; justify-content: center; font-size: 10px; font-weight: bold; color: #fff; letter-spacing: 0.5px; font-family: Consolas, monospace; }\n' +
      '  header .file-info { flex: 1; min-width: 0; }\n' +
      '  header .file-name { font-size: 15px; font-weight: 600; color: #e6e6e6; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }\n' +
      '  header .file-meta { font-size: 12px; color: #7a7d7f; margin-top: 2px; }\n' +
      '  header .file-meta span { margin-right: 10px; }\n' +

      // 按钮
      '  header .actions { display: flex; gap: 8px; flex-shrink: 0; }\n' +
      '  header button { padding: 6px 14px; font-size: 12px; font-family: inherit; color: #c8c8c8; background: #3a3d3f; border: 1px solid #4a4d4f; border-radius: 4px; cursor: pointer; transition: background 0.15s; }\n' +
      '  header button:hover { background: #4a4d4f; color: #fff; }\n' +
      '  header button.primary { background: #5a8a4a; border-color: #5a8a4a; color: #fff; }\n' +
      '  header button.primary:hover { background: #6a9a5a; }\n' +
      '  header button.copied { background: #4a8a6a; border-color: #4a8a6a; color: #fff; }\n' +

      // 代码区
      '  main { height: calc(100% - 53px); overflow: auto; }\n' +
      '  pre { margin: 0; padding: 0 !important; border-radius: 0 !important; background: #1c1f21 !important; font-size: 13px; line-height: 1.6; font-family: Consolas, "Fira Code", "JetBrains Mono", monospace; }\n' +
      '  pre code { display: block; padding: 20px 24px !important; background: #1c1f21 !important; }\n' +
      '  pre.line-numbers { padding-left: 0 !important; }\n' +
      '  pre.line-numbers code { padding-left: 64px !important; }\n' +
      '  .line-numbers-rows { border-right-color: #3a3d3f !important; padding-right: 16px !important; }\n' +
      '  .line-numbers-rows > span::before { color: #6a6d6f !important; }\n' +

      // 加载中
      '  .loading { display: flex; align-items: center; justify-content: center; height: 100%; color: #7a7d7f; font-size: 14px; }\n' +
      '</style>\n' +
      '</head>\n<body>\n' +

      '<header>\n' +
      '  <div class="file-icon">' + escapeHTML(ext.toUpperCase().slice(0, 4)) + '</div>\n' +
      '  <div class="file-info">\n' +
      '    <div class="file-name">' + escapeHTML(filename) + '</div>\n' +
      '    <div class="file-meta"><span>' + lineCount + ' 行</span><span>' + ext + '</span><span>' + lang + '</span></div>\n' +
      '  </div>\n' +
      '  <div class="actions">\n' +
      '    <button id="btn-copy">复制</button>\n' +
      '    <button id="btn-download">下载</button>\n' +
      '    <button id="btn-close" class="primary">关闭</button>\n' +
      '  </div>\n' +
      '</header>\n' +

      '<main>\n' +
      '<pre id="code-box" class="line-numbers"><code class="language-' + lang + '">' + safeText + '</code></pre>\n' +
      '</main>\n' +

      // Prism + 行号
      '<script src="https://cdn.jsdelivr.net/npm/prismjs@1/prism.min.js"><\/script>\n' +
      '<script src="https://cdn.jsdelivr.net/npm/prismjs@1/plugins/line-numbers/prism-line-numbers.min.js"><\/script>\n' +
      (lang === 'plaintext' ? '' : '<script src="https://cdn.jsdelivr.net/npm/prismjs@1/components/prism-' + lang + '.min.js"><\/script>\n') +

      '<script>\n' +
      '  var $code = document.getElementById("code-box");\n' +
      '  if (window.Prism) { Prism.highlightElement($code.querySelector("code")); Prism.plugins.lineNumbers ? Prism.plugins.lineNumbers.resize($code) : null; }\n' +

      '  document.getElementById("btn-copy").onclick = function () {\n' +
      '    var text = document.getElementById("code-box").innerText;\n' +
      '    navigator.clipboard.writeText(text).then(function () {\n' +
      '      var b = document.getElementById("btn-copy"); b.textContent = "已复制"; b.classList.add("copied");\n' +
      '      setTimeout(function () { b.textContent = "复制"; b.classList.remove("copied"); }, 1500);\n' +
      '    }, function () { alert("复制失败，请手动选择文本复制。"); });\n' +
      '  };\n' +

      '  document.getElementById("btn-download").onclick = function () {\n' +
      '    var blob = new Blob([document.getElementById("code-box").innerText], { type: "text/plain;charset=utf-8" });\n' +
      '    var a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = ' + JSON.stringify(filename) + '; a.click();\n' +
      '    setTimeout(function () { URL.revokeObjectURL(a.href); }, 1000);\n' +
      '  };\n' +

      '  document.getElementById("btn-close").onclick = function () { window.close(); };\n' +
      '</script>\n' +
      '</body>\n</html>';
  }

  function escapeHTML(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
})();
