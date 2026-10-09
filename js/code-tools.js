---
---
(function () {
    function getCodeText(pre) {
        /* 1. Rouge table 模式：代码在 td.rouge-code 里 */
        var codeCell = pre.querySelector('td.rouge-code');
        if (codeCell) {
            return codeCell.innerText;
        }

        /* 2. 有 <code> 子元素：取 code 内容 */
        var codeEl = pre.querySelector('code');
        if (codeEl) {
            return codeEl.innerText;
        }

        /* 3. 兜底：直接取 pre，去掉可能的行号 span */
        var clone = pre.cloneNode(true);
        clone.querySelectorAll('.lineno, .lineno-span, .rouge-gutter')
             .forEach(function (n) { n.remove(); });
        return clone.innerText;
    }

    function initCopyButtons() {
        var pres = document.querySelectorAll('div.highlight pre, pre.highlight');

        pres.forEach(function (pre) {
            /* 避免重复处理 */
            if (pre.classList.contains('lineno')) return;

            var wrapper = pre.closest('div.highlight') || pre.parentNode;
            if (!wrapper || wrapper.querySelector('.copy-btn')) return;

            /* 行号列的 pre 不是代码本体，跳过 */
            if (pre.classList.contains('lineno') || pre.classList.contains('rouge-gutter')) return;

            var btn = document.createElement('button');
            btn.className = 'copy-btn';
            btn.type = 'button';
            btn.innerHTML = '<span class="copy-icon">⧉</span><span class="copy-text">复制</span>';

            wrapper.appendChild(btn);

            var clipboard = new ClipboardJS(btn, {
                text: function () { return getCodeText(pre); }
            });

            clipboard.on('success', function () {
                btn.classList.add('copied');
                btn.querySelector('.copy-text').textContent = '已复制';
                setTimeout(function () {
                    btn.classList.remove('copied');
                    btn.querySelector('.copy-text').textContent = '复制';
                }, 1500);
            });

            clipboard.on('error', function () {
                btn.querySelector('.copy-text').textContent = '失败';
                setTimeout(function () {
                    btn.querySelector('.copy-text').textContent = '复制';
                }, 1500);
            });
        });
    }

    document.addEventListener('DOMContentLoaded', initCopyButtons);
})();