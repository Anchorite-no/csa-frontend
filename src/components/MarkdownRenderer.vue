<template>
    <div class="markdown-renderer" v-html="renderedContent"></div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { marked } from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/github.css'

const props = defineProps({
    content: {
        type: String,
        default: ''
    }
})

// 配置marked
marked.setOptions({
    highlight: function(code, lang) {
        if (lang && hljs.getLanguage(lang)) {
            try {
                return hljs.highlight(code, { language: lang }).value
            } catch (err) {
                console.warn('代码高亮失败:', err)
            }
        }
        return hljs.highlightAuto(code).value
    },
    breaks: true,
    gfm: true,
    tables: true,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false
})

const renderedContent = computed(() => {
    if (!props.content) return ''
    return marked(props.content)
})

onMounted(() => {
    // 确保代码高亮样式加载
    if (!document.querySelector('link[href*="highlight.js"]')) {
        const link = document.createElement('link')
        link.rel = 'stylesheet'
        link.href = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github.min.css'
        document.head.appendChild(link)
    }
})
</script>

<style scoped>
.markdown-renderer {
    line-height: 1.8;
    color: var(--text-primary);
    font-size: 1.05rem;
    transition: color 0.3s ease;
}

/* 标题样式 */
.markdown-renderer :deep(h1) {
    font-size: 2.2rem;
    font-weight: 700;
    color: var(--text-primary);
    margin: 2.5rem 0 1.5rem 0;
    padding-bottom: 0.8rem;
    border-bottom: 3px solid var(--accent-color);
    text-transform: uppercase;
    letter-spacing: 0.5px;
    line-height: 1.2;
    transition: color 0.3s ease, border-color 0.3s ease;
}

.markdown-renderer :deep(h2) {
    font-size: 1.8rem;
    font-weight: 600;
    color: var(--text-primary);
    margin: 2rem 0 1rem 0;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid var(--accent-color);
    text-transform: uppercase;
    letter-spacing: 0.3px;
    line-height: 1.3;
    transition: color 0.3s ease, border-color 0.3s ease;
}

.markdown-renderer :deep(h3) {
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--text-primary);
    margin: 1.8rem 0 0.8rem 0;
    text-transform: uppercase;
    letter-spacing: 0.2px;
    line-height: 1.4;
    transition: color 0.3s ease;
}

.markdown-renderer :deep(h4) {
    font-size: 1.3rem;
    font-weight: 600;
    color: var(--text-primary);
    margin: 1.5rem 0 0.6rem 0;
    text-transform: uppercase;
    letter-spacing: 0.1px;
    line-height: 1.4;
    transition: color 0.3s ease;
}

.markdown-renderer :deep(h5) {
    font-size: 1.1rem;
    font-weight: 600;
    color: var(--text-primary);
    margin: 1.2rem 0 0.5rem 0;
    text-transform: uppercase;
    letter-spacing: 0.1px;
    line-height: 1.4;
    transition: color 0.3s ease;
}

.markdown-renderer :deep(h6) {
    font-size: 1rem;
    font-weight: 600;
    color: var(--text-primary);
    margin: 1rem 0 0.4rem 0;
    text-transform: uppercase;
    letter-spacing: 0.1px;
    line-height: 1.4;
    transition: color 0.3s ease;
}

/* 段落样式 */
.markdown-renderer :deep(p) {
    margin: 1.2rem 0;
    text-align: justify;
    line-height: 1.8;
}

/* 列表样式 */
.markdown-renderer :deep(ul),
.markdown-renderer :deep(ol) {
    margin: 1.2rem 0;
    padding-left: 2rem;
}

.markdown-renderer :deep(li) {
    margin: 0.5rem 0;
    line-height: 1.6;
}

.markdown-renderer :deep(ul li) {
    list-style-type: disc;
}

.markdown-renderer :deep(ol li) {
    list-style-type: decimal;
}

/* 图片样式 */
.markdown-renderer :deep(img) {
    max-width: 100%;
    height: auto;
    border-radius: 12px;
    margin: 2rem auto;
    display: block;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.markdown-renderer :deep(img):hover {
    transform: scale(1.02);
    box-shadow: 0 12px 35px rgba(0, 0, 0, 0.2);
}

/* 引用样式 */
.markdown-renderer :deep(blockquote) {
    border-left: 5px solid var(--accent-color);
    padding: 1.5rem 2rem;
    margin: 2rem 0;
    background: rgba(102, 126, 234, 0.05);
    border-radius: 0 12px 12px 0;
    font-style: italic;
    position: relative;
    box-shadow: 0 4px 15px var(--shadow-color);
    color: var(--text-primary);
    transition: all 0.3s ease;
}

.dark .markdown-renderer :deep(blockquote) {
    background: rgba(66, 165, 245, 0.05);
}

.markdown-renderer :deep(blockquote::before) {
    content: '"';
    font-size: 4rem;
    color: var(--accent-color);
    position: absolute;
    top: -10px;
    left: 10px;
    opacity: 0.3;
    font-family: serif;
    transition: color 0.3s ease;
}

/* 代码样式 */
.markdown-renderer :deep(code) {
    background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
    padding: 3px 8px;
    border-radius: 6px;
    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', monospace;
    font-size: 0.9rem;
    color: #e83e8c;
    font-weight: 500;
    border: 1px solid #dee2e6;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.markdown-renderer :deep(pre) {
    background: linear-gradient(135deg, #2d3748 0%, #1a202c 100%);
    padding: 2rem;
    border-radius: 12px;
    overflow-x: auto;
    border: 1px solid #4a5568;
    margin: 2rem 0;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    position: relative;
}

.markdown-renderer :deep(pre::before) {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #feca57);
    border-radius: 12px 12px 0 0;
}

.markdown-renderer :deep(pre code) {
    background: none;
    padding: 0;
    color: #e2e8f0;
    border: none;
    box-shadow: none;
    font-size: 0.9rem;
    line-height: 1.6;
}

/* 表格样式 */
.markdown-renderer :deep(table) {
    width: 100%;
    border-collapse: collapse;
    margin: 2rem 0;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 8px 25px var(--shadow-color);
    background: var(--bg-surface);
    transition: background 0.3s ease, box-shadow 0.3s ease;
}

.markdown-renderer :deep(th),
.markdown-renderer :deep(td) {
    padding: 15px 20px;
    text-align: left;
    border-bottom: 1px solid var(--border-color);
    word-wrap: break-word;
    word-break: break-word;
    overflow-wrap: break-word;
    color: var(--text-primary);
    transition: color 0.3s ease, border-color 0.3s ease;
}

.markdown-renderer :deep(th) {
    background: var(--gradient-primary);
    color: white;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    font-size: 0.9rem;
}

.markdown-renderer :deep(tr:nth-child(even)) {
    background: var(--bg-secondary);
    transition: background 0.3s ease;
}

.markdown-renderer :deep(tr:hover) {
    background: rgba(102, 126, 234, 0.1);
    transition: background-color 0.3s ease;
}

.dark .markdown-renderer :deep(tr:hover) {
    background: rgba(66, 165, 245, 0.1);
}

/* 链接样式 */
.markdown-renderer :deep(a) {
    color: var(--accent-color);
    text-decoration: none;
    font-weight: 500;
    border-bottom: 2px solid transparent;
    transition: all 0.3s ease;
}

.markdown-renderer :deep(a:hover) {
    color: var(--accent-hover);
    border-bottom-color: var(--accent-color);
}

/* 强调样式 */
.markdown-renderer :deep(strong) {
    font-weight: 700;
    color: var(--text-primary);
    transition: color 0.3s ease;
}

.markdown-renderer :deep(em) {
    font-style: italic;
    color: var(--text-secondary);
    transition: color 0.3s ease;
}

/* 分割线样式 */
.markdown-renderer :deep(hr) {
    border: none;
    height: 3px;
    background: linear-gradient(90deg, transparent, var(--accent-color), transparent);
    margin: 3rem 0;
    border-radius: 2px;
    transition: background 0.3s ease;
}

/* 响应式设计 */
@media (max-width: 768px) {
    .markdown-renderer {
        font-size: 1rem;
    }
    
    .markdown-renderer :deep(h1) {
        font-size: 1.8rem;
    }
    
    .markdown-renderer :deep(h2) {
        font-size: 1.5rem;
    }
    
    .markdown-renderer :deep(h3) {
        font-size: 1.3rem;
    }
    
    .markdown-renderer :deep(pre) {
        padding: 1.5rem;
        font-size: 0.8rem;
    }
    
    .markdown-renderer :deep(table) {
        font-size: 0.9rem;
    }
    
    .markdown-renderer :deep(th),
    .markdown-renderer :deep(td) {
        padding: 10px 15px;
    }
}
</style>
