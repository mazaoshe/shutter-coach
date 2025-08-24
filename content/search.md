---
title: "Search"
---

<div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-6">Search Snippets</h1>
    
    <div class="mb-8">
        <div class="relative max-w-2xl">
            <input type="text" id="search-input" placeholder="Enter keywords to search..." 
                   class="w-full px-4 py-3 pl-12 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:bg-gray-800 dark:text-white">
            <svg class="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" 
                 xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
        </div>
    </div>
    
    <div id="search-results" class="space-y-4">
        <!-- 搜索结果将在这里显示 -->
    </div>
</div>

<script>
// 搜索功能实现
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');
    
    // 获取搜索索引
    fetch('/index.json')
        .then(response => response.json())
        .then(data => {
            searchInput.addEventListener('input', function() {
                const query = this.value.trim().toLowerCase();
                if (query.length === 0) {
                    searchResults.innerHTML = '';
                    return;
                }
                
                // 执行搜索
                const results = data.filter(item => {
                    return (
                        (item.title && item.title.toLowerCase().includes(query)) ||
                        (item.description && item.description.toLowerCase().includes(query)) ||
                        (item.content && item.content.toLowerCase().includes(query)) ||
                        (item.tags && item.tags.some(tag => tag.toLowerCase().includes(query)))
                    );
                });
                
                // 显示结果
                displayResults(results, query);
            });
        })
        .catch(error => {
            console.error('Error loading search index:', error);
            searchResults.innerHTML = '<p class="text-red-500">Failed to load search index.</p>';
        });
    
    function displayResults(results, query) {
        if (results.length === 0) {
            searchResults.innerHTML = '<p class="text-gray-500 dark:text-gray-400">No results found.</p>';
            return;
        }
        
        const resultsHTML = results.map(item => `
            <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition duration-300">
                <h3 class="text-xl font-semibold mb-2">
                    <a href="${item.permalink}" class="text-cyan-600 dark:text-cyan-400 hover:underline">${highlightText(item.title, query)}</a>
                </h3>
                <p class="text-gray-600 dark:text-gray-300 mb-3">${highlightText(item.description || '', query)}</p>
                ${item.tags && item.tags.length > 0 ? `
                    <div class="flex flex-wrap gap-2">
                        ${item.tags.map(tag => `
                            <span class="px-2 py-1 text-xs rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                                ${tag}
                            </span>
                        `).join('')}
                    </div>
                ` : ''}
            </div>
        `).join('');
        
        searchResults.innerHTML = resultsHTML;
    }
    
    function highlightText(text, query) {
        if (!query) return text;
        const regex = new RegExp(`(${query})`, 'gi');
        return text.replace(regex, '<span class="bg-yellow-200 dark:bg-yellow-600">$1</span>');
    }
});
</script>