<script setup>
import CsaEmpty from '@/components/CsaEmpty.vue'
import { useRouter } from 'vue-router'
import { ref, inject, watch, onMounted } from 'vue'

const router = useRouter()
const axios = inject('axios')

const data = ref([])
const loading = ref(true)

const page = ref(1)
const total = ref(0)
const size = ref(10)
const category = ref(1)

const table = [
    {
        name: 'associationNews',
        title: '协会新闻',
        english: 'Association News',
        category: 1,
        icon: 'pi pi-home'
    },
    {
        name: 'latestAnnouncement',
        title: '最新公告',
        english: 'Latest Announcement',
        category: 2,
        icon: 'pi pi-bell'
    },
    {
        name: 'cybersecurityKnowledge',
        title: '网安知识',
        english: 'Cybersecurity Knowledge',
        category: 3,
        icon: 'pi pi-book'
    },
    {
        name: 'teamInfomation',
        title: '战队信息',
        english: 'Team Information',
        category: 4,
        icon: 'pi pi-users'
    },
    {
        name: 'matchInfomation',
        title: '赛事信息',
        english: 'Match Information',
        category: 5,
        icon: 'pi pi-trophy'
    },
]

const fetchContent = async () => {
    loading.value = true
    try {
        const response = await axios.get('/news/list', {
            params: {
                page: page.value,
                size: size.value,
                category: category.value,
            },
        })
        data.value = response.data
    } catch (error) {
        console.error('获取新闻列表失败:', error)
    } finally {
        loading.value = false
    }
}

const fetchCount = async () => {
    try {
        const response = await axios.get('/news/count', {
            params: {
                category: category.value,
            },
        })
        total.value = response.data.count
        await fetchContent()
    } catch (error) {
        console.error('获取新闻数量失败:', error)
    }
}

const handleClick = item => {
    router.push({
        name: 'news',
        params: {
            id: item.nid,
        },
    })
}

onMounted(() => {
    fetchCount()
})

watch([page, size, category], () => {
    fetchContent()
})
</script>

<template>
    <div class="news-container">
        <!-- 页面标题 -->
        <div class="page-header">
            <h1 class="page-title">新闻资讯</h1>
            <p class="page-subtitle">Stay Updated with Latest News</p>
        </div>

        <div class="content-wrapper">
            <!-- 侧边栏 -->
            <div class="sidebar">
                <div class="sidebar-header">
                    <h3 class="sidebar-title">内容分类</h3>
                    <p class="sidebar-subtitle">Content Categories</p>
                </div>
                
                <div class="category-list">
                    <button
                        class="category-button"
                        :class="{ active: category === item.category }"
                        @click="category = item.category"
                        v-for="item in table"
                        :key="item.name"
                    >
                        <div class="category-icon">
                            <i :class="item.icon"></i>
                        </div>
                        <div class="category-content">
                            <span class="category-title">{{ item.title }}</span>
                            <span class="category-english">{{ item.english }}</span>
                        </div>
                    </button>
                </div>
            </div>

            <!-- 主内容区 -->
            <div class="main-content">
                <div class="content-header">
                    <div class="header-info">
                        <h2 class="content-title">{{ table[category - 1].title }}</h2>
                        <p class="content-subtitle">{{ table[category - 1].english }}</p>
                    </div>
                    <div class="header-stats">
                        <span class="stats-text">共 {{ total }} 条内容</span>
                    </div>
                </div>

                <!-- 新闻列表 -->
                <div class="news-list">
                    <div v-if="loading" class="loading-state">
                        <div v-for="i in 6" :key="i" class="news-skeleton">
                            <div class="skeleton-image"></div>
                            <div class="skeleton-content">
                                <div class="skeleton-title"></div>
                                <div class="skeleton-date"></div>
                                <div class="skeleton-tags">
                                    <div class="skeleton-tag"></div>
                                    <div class="skeleton-tag"></div>
                                </div>
                                <div class="skeleton-summary"></div>
                            </div>
                        </div>
                    </div>

                    <div v-else-if="data.length === 0" class="empty-state">
                        <CsaEmpty />
                    </div>

                    <div v-else class="news-grid">
                        <div 
                            v-for="(item, index) in data" 
                            :key="index"
                            class="news-card"
                            :style="{ animationDelay: `${index * 0.1}s` }"
                            @click="() => handleClick(item)"
                        >
                            <div class="news-image" v-if="item.image || item.cover_image || item.thumbnail">
                                <img :src="item.image || item.cover_image || item.thumbnail" :alt="item.title" />
                                <div class="news-overlay">
                                    <i class="pi pi-arrow-right"></i>
                                </div>
                            </div>
                            
                            <div class="news-content">
                                <div class="news-header">
                                    <h3 class="news-title">{{ item.title }}</h3>
                                    <div class="news-date">
                                        <i class="pi pi-calendar"></i>
                                        {{ new Date(item.first_publish * 1000).toLocaleDateString('zh-CN') }}
                                    </div>
                                </div>

                                <div class="news-tags" v-if="item.tag">
                                    <span 
                                        v-for="tag in item.tag.split(' ')" 
                                        :key="tag"
                                        class="news-tag"
                                    >
                                        {{ tag }}
                                    </span>
                                </div>

                                <p class="news-summary" v-if="item.summary">
                                    {{ item.summary }}
                                </p>

                                <div class="news-footer">
                                    <span class="view-more">
                                        阅读全文
                                        <i class="pi pi-arrow-right"></i>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 分页 -->
                <div class="pagination-wrapper">
                    <Paginator
                        v-model:page="page"
                        v-model:rows="size"
                        :totalRecords="total"
                        :rowsPerPageOptions="[10, 20, 30]"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.news-container {
    min-height: 100vh;
    background: #f8f9fa;
    padding: 0;
}

.page-header {
    text-align: center;
    margin-bottom: 40px;
    color: #333;
    padding: 40px 20px;
    background: white;
    border-bottom: 1px solid #e9ecef;
}

.page-title {
    font-size: 3rem;
    font-weight: 700;
    margin: 0 0 10px 0;
    color: #333;
}

.page-subtitle {
    font-size: 1.2rem;
    color: #666;
    margin: 0;
}

.content-wrapper {
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 300px 1fr;
    gap: 0;
    background: white;
    min-height: calc(100vh - 200px);
}

.sidebar {
    background: #f8f9fa;
    border-right: 1px solid #e9ecef;
    padding: 30px 25px;
    height: 100%;
}

.sidebar-header {
    text-align: center;
    margin-bottom: 25px;
    padding-bottom: 20px;
    border-bottom: 2px solid #f0f0f0;
}

.sidebar-title {
    font-size: 1.5rem;
    font-weight: 700;
    color: #333;
    margin: 0 0 5px 0;
}

.sidebar-subtitle {
    font-size: 0.9rem;
    color: #666;
    margin: 0;
}

.category-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.category-button {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 15px;
    background: #f8f9fa;
    border: 2px solid transparent;
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.3s ease;
    text-align: left;
    width: 100%;
}

.category-button:hover {
    background: white;
    border-color: #667eea;
    transform: translateX(5px);
    box-shadow: 0 5px 15px rgba(102, 126, 234, 0.1);
}

.category-button.active {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border-color: #667eea;
}

.category-icon {
    width: 40px;
    height: 40px;
    background: rgba(102, 126, 234, 0.1);
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #667eea;
    font-size: 1.2rem;
    flex-shrink: 0;
}

.category-button.active .category-icon {
    background: rgba(255, 255, 255, 0.2);
    color: white;
}

.category-content {
    display: flex;
    flex-direction: column;
}

.category-title {
    font-size: 1rem;
    font-weight: 600;
    margin-bottom: 2px;
}

.category-english {
    font-size: 0.8rem;
    opacity: 0.7;
}

.main-content {
    background: white;
    padding: 30px;
    overflow-y: auto;
}

.content-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
    padding-bottom: 20px;
    border-bottom: 2px solid #f0f0f0;
}

.content-title {
    font-size: 2rem;
    font-weight: 700;
    color: #333;
    margin: 0 0 5px 0;
}

.content-subtitle {
    font-size: 1rem;
    color: #666;
    margin: 0;
}

.stats-text {
    font-size: 0.9rem;
    color: #667eea;
    font-weight: 600;
    padding: 8px 16px;
    background: rgba(102, 126, 234, 0.1);
    border-radius: 20px;
}

.news-list {
    margin-bottom: 30px;
}

.loading-state {
    display: grid;
    gap: 20px;
}

.news-skeleton {
    display: flex;
    gap: 20px;
    padding: 20px;
    background: #f8f9fa;
    border-radius: 12px;
    animation: pulse 1.5s infinite;
}

.skeleton-image {
    width: 200px;
    height: 120px;
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
    border-radius: 8px;
    flex-shrink: 0;
}

.skeleton-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.skeleton-title {
    height: 20px;
    width: 80%;
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
    border-radius: 4px;
}

.skeleton-date {
    height: 14px;
    width: 40%;
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
    border-radius: 4px;
}

.skeleton-tags {
    display: flex;
    gap: 8px;
}

.skeleton-tag {
    height: 16px;
    width: 60px;
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
    border-radius: 4px;
}

.skeleton-summary {
    height: 16px;
    width: 100%;
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
    border-radius: 4px;
}

@keyframes shimmer {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
}

@keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
}

.empty-state {
    text-align: center;
    padding: 60px 20px;
}

.news-grid {
    display: grid;
    gap: 20px;
}

.news-card {
    display: flex;
    gap: 20px;
    padding: 25px 0;
    cursor: pointer;
    transition: all 0.3s ease;
    border-bottom: 1px solid #e9ecef;
    animation: slideInUp 0.6s ease-out forwards;
    opacity: 0;
    transform: translateY(20px);
}

@keyframes slideInUp {
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.news-card:hover {
    background: #f8f9fa;
    transform: translateX(5px);
}

.news-image {
    position: relative;
    width: 200px;
    height: 120px;
    border-radius: 8px;
    overflow: hidden;
    flex-shrink: 0;
}

.news-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.news-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(102, 126, 234, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 1.5rem;
    opacity: 0;
    transition: opacity 0.3s ease;
}

.news-card:hover .news-overlay {
    opacity: 1;
}

.news-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.news-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 15px;
}

.news-title {
    font-size: 1.2rem;
    font-weight: 700;
    color: #333;
    margin: 0;
    line-height: 1.3;
}

.news-date {
    font-size: 0.85rem;
    color: #666;
    display: flex;
    align-items: center;
    gap: 4px;
    white-space: nowrap;
    flex-shrink: 0;
}

.news-tags {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
}

.news-tag {
    padding: 4px 12px;
    background: rgba(102, 126, 234, 0.1);
    color: #667eea;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 600;
}

.news-summary {
    color: #666;
    line-height: 1.5;
    margin: 0;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.news-footer {
    margin-top: auto;
}

.view-more {
    color: #667eea;
    font-weight: 600;
    font-size: 0.9rem;
    display: flex;
    align-items: center;
    gap: 5px;
    transition: gap 0.3s ease;
}

.news-card:hover .view-more {
    gap: 8px;
}

.pagination-wrapper {
    display: flex;
    justify-content: center;
    margin-top: 30px;
}

/* 响应式设计 */
@media (max-width: 1024px) {
    .content-wrapper {
        grid-template-columns: 1fr;
        gap: 0;
    }
    
    .sidebar {
        order: 2;
        border-right: none;
        border-bottom: 1px solid #e9ecef;
    }
    
    .main-content {
        order: 1;
    }
}

@media (max-width: 768px) {
    .news-container {
        padding: 0;
    }
    
    .page-header {
        padding: 30px 20px;
    }
    
    .page-title {
        font-size: 2rem;
    }
    
    .content-wrapper {
        max-width: 100%;
        padding: 0 20px;
    }
    
    .sidebar {
        padding: 20px;
    }
    
    .main-content {
        padding: 20px;
    }
    
    .news-card {
        flex-direction: column;
        gap: 15px;
    }
    
    .news-image {
        width: 100%;
        height: 200px;
    }
    
    .news-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 10px;
    }
    
    .news-date {
        text-align: left;
    }
    
    .category-list {
        flex-direction: row;
        overflow-x: auto;
        padding-bottom: 10px;
    }
    
    .category-button {
        min-width: 150px;
        flex-shrink: 0;
    }
}
</style>
