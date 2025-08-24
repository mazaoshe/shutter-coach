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