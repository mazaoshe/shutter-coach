document.addEventListener('DOMContentLoaded', function () {
    const toggleBtn = document.getElementById('mobile-menu-toggle');
    const menu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');
    const closeIcon = document.getElementById('close-icon');

    toggleBtn.addEventListener('click', () => {
        menu.classList.toggle('hidden');
        menuIcon.classList.toggle('hidden');
        closeIcon.classList.toggle('hidden');

        const expanded = toggleBtn.getAttribute('aria-expanded') === 'true' || false;
        toggleBtn.setAttribute('aria-expanded', !expanded);
    });
});
document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('modal-search-input');
    const resultsList = document.getElementById('modal-search-results');
    const dialog = document.getElementById('search-dialog');
    const trigger = document.getElementById('search-trigger');
    const mobileTrigger = document.getElementById('mobile-search-trigger');
    const closeBtn = document.getElementById('close-dialog');

    let fuse;

    // 加载 JSON 数据
    fetch('/index.json')
        .then(response => response.json())
        .then(data => {
            // 初始化 Fuse.js
            fuse = new Fuse(data, {
                keys: ['title', 'description', 'content', 'tags'],
                includeScore: true,
                minMatchCharLength: 2,
                threshold: 0.3
            });

            searchInput.addEventListener('input', function () {
                const query = this.value.trim();
                resultsList.innerHTML = '';

                if (!fuse || query.length === 0) return;

                const results = fuse.search(query);

                if (results.length === 0) {
                    resultsList.innerHTML = '<li class="py-4 text-gray-500 dark:text-gray-400 text-center">No results found</li>';
                    return;
                }

                // 限制显示前10个结果
                results.slice(0, 10).forEach(result => {
                    const item = result.item;
                    const li = document.createElement('li');

                    // 创建结果项
                    const a = document.createElement('a');
                    a.href = item.permalink;
                    a.className = 'block py-4 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors no-underline';

                    // 标题
                    const title = document.createElement('h3');
                    title.className = 'font-semibold text-gray-900 dark:text-white';
                    title.textContent = item.title;

                    // 描述
                    const desc = document.createElement('p');
                    desc.className = 'text-sm text-gray-600 dark:text-gray-300 mt-1';
                    desc.textContent = item.description || '';

                    // 标签
                    if (item.tags && item.tags.length > 0) {
                        const tagsDiv = document.createElement('div');
                        tagsDiv.className = 'flex flex-wrap gap-1 mt-2';

                        item.tags.slice(0, 3).forEach(tag => {
                            const tagSpan = document.createElement('span');
                            tagSpan.className = 'px-2 py-1 text-xs rounded-full bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-300';
                            tagSpan.textContent = tag;
                            tagsDiv.appendChild(tagSpan);
                        });

                        a.appendChild(tagsDiv);
                    }

                    a.appendChild(title);
                    a.appendChild(desc);
                    li.appendChild(a);
                    resultsList.appendChild(li);
                });
            });
        })
        .catch(error => {
            console.error('Error loading search index:', error);
        });

    // 打开弹窗
    function openDialog () {
        dialog.classList.remove('hidden');
        searchInput.focus();
    }

    // 关闭弹窗
    function closeDialog () {
        dialog.classList.add('hidden');
        searchInput.value = '';
        resultsList.innerHTML = '';
    }

    // 事件绑定
    if (trigger) trigger.addEventListener('click', openDialog);
    if (mobileTrigger) mobileTrigger.addEventListener('click', openDialog);
    if (closeBtn) closeBtn.addEventListener('click', closeDialog);

    if (dialog) {
        dialog.addEventListener('click', function (e) {
            if (e.target === dialog) closeDialog();
        });
    }

    // 快捷键 Ctrl + K / Cmd + K 打开搜索
    document.body.addEventListener('keydown', function (e) {
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
            e.preventDefault();
            openDialog();
        }
    });

    // ESC 关闭搜索框
    document.body.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            closeDialog();
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    // 查找所有代码块容器
    const codeBlocks = document.querySelectorAll('pre');

    codeBlocks.forEach(block => {
        // 创建复制按钮
        const copyButton = document.createElement('button');
        copyButton.className = 'copy-code-button absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-md bg-gray-700 hover:bg-gray-600 text-gray-200 hover:text-white opacity-0 transition-opacity duration-200 cursor-pointer';
        copyButton.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" class="copy-icon w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
      <svg xmlns="http://www.w3.org/2000/svg" class="copied-icon w-4 h-4 hidden text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
      </svg>
    `;
        copyButton.title = 'Copy to clipboard';

        // 显示/隐藏按钮
        block.style.position = 'relative';
        block.addEventListener('mouseenter', () => {
            copyButton.style.opacity = '1';
        });

        block.addEventListener('mouseleave', () => {
            copyButton.style.opacity = '0';
        });

        // 复制功能
        copyButton.addEventListener('click', () => {
            const code = block.querySelector('code');
            if (code) {
                navigator.clipboard.writeText(code.innerText).then(() => {
                    // 显示复制成功状态
                    copyButton.querySelector('.copy-icon').classList.add('hidden');
                    copyButton.querySelector('.copied-icon').classList.remove('hidden');

                    // 2秒后恢复原状态
                    setTimeout(() => {
                        copyButton.querySelector('.copy-icon').classList.remove('hidden');
                        copyButton.querySelector('.copied-icon').classList.add('hidden');
                    }, 2000);
                }).catch(err => {
                    console.error('Failed to copy code: ', err);
                });
            }
        });

        // 将按钮添加到代码块
        block.appendChild(copyButton);
    });
});