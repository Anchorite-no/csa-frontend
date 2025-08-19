<script setup>
import { ref, inject, onMounted } from 'vue'

const axios = inject('axios')

const data = ref([])
const loading = ref(true)

const fetchNews = async () => {
    try {
        const response = await axios.get('/news/list', {
            params: { page: 1, size: 8, category: 1 },
        })
        data.value = response.data
    } catch (error) {
        console.error('获取新闻失败:', error)
    } finally {
        loading.value = false
    }
}

onMounted(() => {
    fetchNews()
})
</script>

<template>
    <div class="news-container">
        <div class="news-header">
            <div class="header-icon">
                <i class="pi pi-clock"></i>
            </div>
            <div class="header-content">
                <h3 class="section-title">最新动态</h3>
                <p class="section-subtitle">Latest News</p>
            </div>
        </div>

        <div class="news-content">
            <div v-if="!loading && data.length > 0" class="news-list">
                <div 
                    v-for="(item, index) in data" 
                    :key="item.nid"
                    class="news-item"
                    :style="{ animationDelay: `${index * 0.1}s` }"
                >
                    <router-link
                        class="news-link"
                        :to="{ name: 'news', params: { id: item.nid } }"
                    >
                        <div class="news-thumbnail" v-if="item.image || item.cover_image || item.thumbnail">
                            <img :src="item.image || item.cover_image || item.thumbnail" :alt="item.title" />
                        </div>
                        <div class="news-info">
                            <h4 class="news-title">{{ item.title }}</h4>
                            <div class="news-meta">
                                <span class="news-date">
                                    <i class="pi pi-calendar"></i>
                                    {{ new Date(item.first_publish * 1000).toLocaleDateString('zh-CN', {
                                        month: '2-digit',
                                        day: '2-digit',
                                    }) }}
                                </span>
                            </div>
                        </div>
                        <div class="news-arrow">
                            <i class="pi pi-arrow-right"></i>
                        </div>
                    </router-link>
                </div>
            </div>

            <div v-else-if="loading" class="loading-state">
                <div v-for="i in 6" :key="i" class="skeleton-item">
                    <div class="skeleton-title"></div>
                    <div class="skeleton-date"></div>
                </div>
            </div>

            <div v-else class="empty-state">
                <div class="empty-icon">
                    <i class="pi pi-inbox"></i>
                </div>
                <p class="empty-text">暂无最新动态</p>
            </div>
        </div>

        <div class="news-footer">
            <router-link to="/news" class="view-more-btn">
                查看更多
                <i class="pi pi-arrow-right"></i>
            </router-link>
        </div>
    </div>
</template>

<style scoped>
.news-container {
    padding: 30px;
    height: 100%;
    display: flex;
    flex-direction: column;
}

.news-header {
    display: flex;
    align-items: center;
    gap: 15px;
    margin-bottom: 30px;
    padding-bottom: 20px;
    border-bottom: 2px solid #f0f0f0;
}

.header-icon {
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 1.5rem;
}

.header-content {
    flex: 1;
}

.section-title {
    font-size: 1.5rem;
    font-weight: 700;
    color: #333;
    margin: 0 0 5px 0;
}

.section-subtitle {
    font-size: 0.9rem;
    color: #666;
    margin: 0;
    font-weight: 400;
}

.news-content {
    flex: 1;
    overflow: hidden;
}

.news-list {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.news-item {
    animation: slideInLeft 0.6s ease-out forwards;
    opacity: 0;
    transform: translateX(-20px);
}

@keyframes slideInLeft {
    to {
        opacity: 1;
        transform: translateX(0);
    }
}

.news-link {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
    background: #f8f9fa;
    border-radius: 12px;
    text-decoration: none;
    color: inherit;
    transition: all 0.3s ease;
    border: 1px solid transparent;
    gap: 15px;
}

.news-thumbnail {
    width: 60px;
    height: 60px;
    border-radius: 8px;
    overflow: hidden;
    flex-shrink: 0;
}

.news-thumbnail img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.news-link:hover {
    background: white;
    border-color: #667eea;
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.15);
}

.news-info {
    flex: 1;
    min-width: 0;
}

.news-title {
    font-size: 1rem;
    font-weight: 600;
    color: #333;
    margin: 0 0 8px 0;
    line-height: 1.4;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.news-meta {
    display: flex;
    align-items: center;
    gap: 10px;
}

.news-date {
    font-size: 0.85rem;
    color: #666;
    display: flex;
    align-items: center;
    gap: 5px;
}

.news-arrow {
    color: #667eea;
    font-size: 1.2rem;
    transition: transform 0.3s ease;
    flex-shrink: 0;
    margin-left: 15px;
}

.news-link:hover .news-arrow {
    transform: translateX(5px);
}

.loading-state {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.skeleton-item {
    padding: 20px;
    background: #f8f9fa;
    border-radius: 12px;
}

.skeleton-title {
    height: 16px;
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: loading 1.5s infinite;
    border-radius: 4px;
    margin-bottom: 8px;
}

.skeleton-date {
    height: 12px;
    width: 60px;
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: loading 1.5s infinite;
    border-radius: 4px;
}

@keyframes loading {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
}

.empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 60px 20px;
    text-align: center;
}

.empty-icon {
    font-size: 3rem;
    color: #ccc;
    margin-bottom: 15px;
}

.empty-text {
    color: #666;
    font-size: 1rem;
    margin: 0;
}

.news-footer {
    margin-top: 30px;
    padding-top: 20px;
    border-top: 1px solid #f0f0f0;
    text-align: center;
}

.view-more-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 12px 24px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    text-decoration: none;
    border-radius: 25px;
    font-weight: 600;
    font-size: 0.9rem;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
}

.view-more-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
}

/* 响应式设计 */
@media (max-width: 768px) {
    .news-container {
        padding: 20px;
    }
    
    .news-header {
        margin-bottom: 20px;
    }
    
    .header-icon {
        width: 40px;
        height: 40px;
        font-size: 1.2rem;
    }
    
    .section-title {
        font-size: 1.3rem;
    }
    
    .news-link {
        padding: 15px;
    }
    
    .news-title {
        font-size: 0.95rem;
    }
}
</style>
