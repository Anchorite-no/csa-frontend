<script setup>
import { ref, inject, onMounted } from 'vue'

const axios = inject('axios')

const data1 = ref([])
const data2 = ref([])
const data3 = ref([])
const loading = ref(true)

const fetchData = async () => {
    try {
        const [res1, res2, res3] = await Promise.all([
            axios.get('/news/list', { params: { page: 1, size: 6, category: 2 } }),
            axios.get('/news/list', { params: { page: 1, size: 6, category: 3 } }),
            axios.get('/news/list', { params: { page: 1, size: 6, category: 5 } })
        ])
        
        data1.value = res1.data
        data2.value = res2.data || []
        data3.value = res3.data
    } catch (error) {
        console.error('获取信息失败:', error)
        try {
            const fallbackRes = await axios.get('/news/list', { params: { page: 1, size: 6, category: 3 } })
            data2.value = fallbackRes.data
        } catch (fallbackError) {
            console.error('获取网安知识失败:', fallbackError)
            data2.value = []
        }
    } finally {
        loading.value = false
    }
}

onMounted(() => {
    fetchData()
})
</script>

<template>
    <div class="info-container">
        <!-- 通知公告 -->
        <div class="info-card announcement-card">
            <div class="card-header">
                <div class="header-icon">
                    <i class="pi pi-bell"></i>
                </div>
                <div class="header-content">
                    <h3 class="card-title">通知公告</h3>
                    <p class="card-subtitle">Announcement & Notice</p>
                </div>
            </div>

            <div class="card-content">
                <div v-if="!loading && data1.length > 0" class="info-list">
                    <div 
                        v-for="(item, index) in data1" 
                        :key="item.nid"
                        class="info-item"
                        :style="{ animationDelay: `${index * 0.1}s` }"
                    >
                        <router-link
                            class="info-link"
                            :to="{ name: 'news', params: { id: item.nid } }"
                        >
                            <div class="info-badge">
                                <i class="pi pi-bell"></i>
                            </div>
                            <div class="info-content">
                                <h4 class="info-title">{{ item.title }}</h4>
                                <div class="info-meta">
                                    <span class="info-date">
                                        <i class="pi pi-calendar"></i>
                                        {{ new Date(item.first_publish * 1000).toLocaleDateString('zh-CN', {
                                            month: '2-digit',
                                            day: '2-digit',
                                        }) }}
                                    </span>
                                </div>
                            </div>
                            <div class="info-arrow">
                                <i class="pi pi-arrow-right"></i>
                            </div>
                        </router-link>
                    </div>
                </div>

                <div v-else-if="loading" class="loading-state">
                    <div v-for="i in 4" :key="i" class="skeleton-item">
                        <div class="skeleton-badge"></div>
                        <div class="skeleton-content">
                            <div class="skeleton-title"></div>
                            <div class="skeleton-date"></div>
                        </div>
                    </div>
                </div>

                <div v-else class="empty-state">
                    <div class="empty-icon">
                        <i class="pi pi-bell-slash"></i>
                    </div>
                    <p class="empty-text">暂无通知公告</p>
                </div>
            </div>
        </div>

        <!-- 网安知识 -->
        <div class="info-card knowledge-card">
            <div class="card-header">
                <div class="header-icon">
                    <i class="pi pi-book"></i>
                </div>
                <div class="header-content">
                    <h3 class="card-title">网安知识</h3>
                    <p class="card-subtitle">Cyber Security Knowledge</p>
                </div>
            </div>

            <div class="card-content">
                <div v-if="!loading && data2.length > 0" class="info-list">
                    <div 
                        v-for="(item, index) in data2" 
                        :key="item.kid || item.nid"
                        class="info-item"
                        :style="{ animationDelay: `${index * 0.1}s` }"
                    >
                        <router-link
                            class="info-link"
                            :to="{ name: item.kid ? 'admin-knowledge' : 'news', params: { id: item.kid || item.nid } }"
                        >
                            <div class="info-badge">
                                <i class="pi pi-book"></i>
                            </div>
                            <div class="info-content">
                                <h4 class="info-title">{{ item.title }}</h4>
                                <div class="info-meta">
                                    <span class="info-date">
                                        <i class="pi pi-calendar"></i>
                                        {{ new Date((item.publish_date || item.first_publish) * 1000).toLocaleDateString('zh-CN', {
                                            month: '2-digit',
                                            day: '2-digit',
                                        }) }}
                                    </span>
                                    <span v-if="item.category" class="info-category">
                                        <i class="pi pi-tag"></i>
                                        {{ item.category }}
                                    </span>
                                </div>
                            </div>
                            <div class="info-arrow">
                                <i class="pi pi-arrow-right"></i>
                            </div>
                        </router-link>
                    </div>
                </div>

                <div v-else-if="loading" class="loading-state">
                    <div v-for="i in 4" :key="i" class="skeleton-item">
                        <div class="skeleton-badge"></div>
                        <div class="skeleton-content">
                            <div class="skeleton-title"></div>
                            <div class="skeleton-date"></div>
                        </div>
                    </div>
                </div>

                <div v-else class="empty-state">
                    <div class="empty-icon">
                        <i class="pi pi-book"></i>
                    </div>
                    <p class="empty-text">暂无网安知识</p>
                </div>
            </div>
        </div>

        <!-- 赛事信息 -->
        <div class="info-card contest-card">
            <div class="card-header">
                <div class="header-icon">
                    <i class="pi pi-trophy"></i>
                </div>
                <div class="header-content">
                    <h3 class="card-title">赛事信息</h3>
                    <p class="card-subtitle">Contest Information</p>
                </div>
            </div>

            <div class="card-content">
                <div v-if="!loading && data3.length > 0" class="info-list">
                    <div 
                        v-for="(item, index) in data3" 
                        :key="item.nid"
                        class="info-item"
                        :style="{ animationDelay: `${index * 0.1}s` }"
                    >
                        <router-link
                            class="info-link"
                            :to="{ name: 'news', params: { id: item.nid } }"
                        >
                            <div class="info-badge">
                                <i class="pi pi-trophy"></i>
                            </div>
                            <div class="info-content">
                                <h4 class="info-title">{{ item.title }}</h4>
                                <div class="info-meta">
                                    <span class="info-date">
                                        <i class="pi pi-calendar"></i>
                                        {{ new Date(item.first_publish * 1000).toLocaleDateString('zh-CN', {
                                            month: '2-digit',
                                            day: '2-digit',
                                        }) }}
                                    </span>
                                </div>
                            </div>
                            <div class="info-arrow">
                                <i class="pi pi-arrow-right"></i>
                            </div>
                        </router-link>
                    </div>
                </div>

                <div v-else-if="loading" class="loading-state">
                    <div v-for="i in 4" :key="i" class="skeleton-item">
                        <div class="skeleton-badge"></div>
                        <div class="skeleton-content">
                            <div class="skeleton-title"></div>
                            <div class="skeleton-date"></div>
                        </div>
                    </div>
                </div>

                <div v-else class="empty-state">
                    <div class="empty-icon">
                        <i class="pi pi-trophy"></i>
                    </div>
                    <p class="empty-text">暂无赛事信息</p>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.info-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 30px;
    width: 100%;
}

.info-card {
    background: white;
    border-radius: 20px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    transition: all 0.3s ease;
    position: relative;
}

.info-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.announcement-card::before {
    background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%);
}

.knowledge-card::before {
    background: linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%);
}

.contest-card::before {
    background: linear-gradient(135deg, #f9ca24 0%, #f0932b 100%);
}

.info-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
}

.card-header {
    display: flex;
    align-items: center;
    gap: 15px;
    padding: 25px 25px 20px;
    border-bottom: 1px solid #f0f0f0;
}

.header-icon {
    width: 45px;
    height: 45px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 1.3rem;
}

.announcement-card .header-icon {
    background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%);
}

.knowledge-card .header-icon {
    background: linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%);
}

.contest-card .header-icon {
    background: linear-gradient(135deg, #f9ca24 0%, #f0932b 100%);
}

.header-content {
    flex: 1;
}

.card-title {
    font-size: 1.3rem;
    font-weight: 700;
    color: #333;
    margin: 0 0 5px 0;
}

.card-subtitle {
    font-size: 0.85rem;
    color: #666;
    margin: 0;
    font-weight: 400;
}

.card-content {
    padding: 15px 20px 20px;
}

.info-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.info-item {
    animation: fadeInUp 0.6s ease-out forwards;
    opacity: 0;
    transform: translateY(20px);
}

@keyframes fadeInUp {
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.info-link {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 15px;
    background: #f8f9fa;
    border-radius: 8px;
    text-decoration: none;
    color: inherit;
    transition: all 0.3s ease;
    border: 1px solid transparent;
    min-height: 60px;
}

.info-link:hover {
    background: white;
    border-color: #667eea;
    transform: translateX(5px);
    box-shadow: 0 5px 15px rgba(102, 126, 234, 0.1);
}

.info-badge {
    width: 30px;
    height: 30px;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 0.8rem;
    flex-shrink: 0;
}

.announcement-card .info-badge {
    background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%);
}

.knowledge-card .info-badge {
    background: linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%);
}

.contest-card .info-badge {
    background: linear-gradient(135deg, #f9ca24 0%, #f0932b 100%);
}

.info-content {
    flex: 1;
    min-width: 0;
}

.info-title {
    font-size: 0.9rem;
    font-weight: 600;
    color: #333;
    margin: 0 0 3px 0;
    line-height: 1.3;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.info-meta {
    display: flex;
    align-items: center;
    gap: 10px;
}

.info-date,
.info-category {
    font-size: 0.75rem;
    color: #666;
    display: flex;
    align-items: center;
    gap: 4px;
}

.info-arrow {
    color: #667eea;
    font-size: 0.9rem;
    transition: transform 0.3s ease;
    flex-shrink: 0;
}

.info-link:hover .info-arrow {
    transform: translateX(3px);
}

.loading-state {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.skeleton-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 15px;
    background: #f8f9fa;
    border-radius: 8px;
    min-height: 60px;
}

.skeleton-badge {
    width: 30px;
    height: 30px;
    border-radius: 6px;
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: loading 1.5s infinite;
    flex-shrink: 0;
}

.skeleton-content {
    flex: 1;
}

.skeleton-title {
    height: 12px;
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: loading 1.5s infinite;
    border-radius: 4px;
    margin-bottom: 3px;
}

.skeleton-date {
    height: 8px;
    width: 40px;
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
    padding: 40px 20px;
    text-align: center;
}

.empty-icon {
    font-size: 2.5rem;
    color: #ccc;
    margin-bottom: 10px;
}

.empty-text {
    color: #666;
    font-size: 0.9rem;
    margin: 0;
}

/* 响应式设计 */
@media (max-width: 768px) {
    .info-container {
        grid-template-columns: 1fr;
        gap: 20px;
    }
    
    .card-header {
        padding: 20px 20px 15px;
    }
    
    .header-icon {
        width: 40px;
        height: 40px;
        font-size: 1.1rem;
    }
    
    .card-title {
        font-size: 1.2rem;
    }
    
    .card-content {
        padding: 15px 20px 20px;
    }
    
    .info-link {
        padding: 12px;
    }
    
    .info-badge {
        width: 30px;
        height: 30px;
        font-size: 0.8rem;
    }
    
    .info-title {
        font-size: 0.9rem;
    }
}
</style>
