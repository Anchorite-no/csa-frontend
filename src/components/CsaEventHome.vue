<script setup>
import { ref, inject, onMounted } from 'vue'

const axios = inject('axios')

const data = ref([])
const loading = ref(true)

const fetchEvents = async () => {
    try {
        const response = await axios.get('/event/list', {
            params: { page: 1, size: 8 },
        })
        data.value = response.data
    } catch (error) {
        console.error('获取活动失败:', error)
    } finally {
        loading.value = false
    }
}

onMounted(() => {
    fetchEvents()
})
</script>

<template>
    <div class="event-container">
        <div class="event-header">
            <div class="header-icon">
                <i class="pi pi-calendar"></i>
            </div>
            <div class="header-content">
                <h3 class="section-title">活动一览</h3>
                <p class="section-subtitle">Upcoming Events</p>
            </div>
        </div>

        <div class="event-content">
            <div v-if="!loading && data.length > 0" class="event-list">
                <div 
                    v-for="(item, index) in data" 
                    :key="item.eid"
                    class="event-item"
                    :style="{ animationDelay: `${index * 0.1}s` }"
                >
                    <router-link
                        class="event-link"
                        :to="{ name: 'event', params: { id: item.eid } }"
                    >
                        <div class="event-info">
                            <h4 class="event-title">{{ item.title }}</h4>
                            <div class="event-meta">
                                <span class="event-date">
                                    <i class="pi pi-clock"></i>
                                    {{ new Date(item.start_time * 1000).toLocaleDateString('zh-CN', {
                                        month: '2-digit',
                                        day: '2-digit',
                                    }) }}
                                </span>
                                <span v-if="item.place" class="event-location">
                                    <i class="pi pi-map-marker"></i>
                                    {{ item.place }}
                                </span>
                            </div>
                        </div>
                        <div class="event-status">
                            <span class="status-badge" :class="getStatusClass(item)">
                                {{ getStatusText(item) }}
                            </span>
                        </div>
                        <div class="event-arrow">
                            <i class="pi pi-arrow-right"></i>
                        </div>
                    </router-link>
                </div>
            </div>

            <div v-else-if="loading" class="loading-state">
                <div v-for="i in 6" :key="i" class="skeleton-item">
                    <div class="skeleton-title"></div>
                    <div class="skeleton-meta">
                        <div class="skeleton-date"></div>
                        <div class="skeleton-location"></div>
                    </div>
                </div>
            </div>

            <div v-else class="empty-state">
                <div class="empty-icon">
                    <i class="pi pi-calendar-times"></i>
                </div>
                <p class="empty-text">暂无活动安排</p>
            </div>
        </div>

        <div class="event-footer">
            <router-link to="/events" class="view-more-btn">
                查看更多
                <i class="pi pi-arrow-right"></i>
            </router-link>
        </div>
    </div>
</template>

<script>
// 获取活动状态的样式类
const getStatusClass = (event) => {
    const now = Date.now() / 1000
    if (event.start_time > now) {
        return 'status-upcoming'
    } else if (event.end_time > now) {
        return 'status-ongoing'
    } else {
        return 'status-finished'
    }
}

// 获取活动状态文本
const getStatusText = (event) => {
    const now = Date.now() / 1000
    if (event.start_time > now) {
        return '即将开始'
    } else if (event.end_time > now) {
        return '进行中'
    } else {
        return '已结束'
    }
}
</script>

<style scoped>
.event-container {
    padding: 30px;
    height: 100%;
    display: flex;
    flex-direction: column;
}

.event-header {
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

.event-content {
    flex: 1;
    overflow: hidden;
}

.event-list {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.event-item {
    animation: slideInRight 0.6s ease-out forwards;
    opacity: 0;
    transform: translateX(20px);
}

@keyframes slideInRight {
    to {
        opacity: 1;
        transform: translateX(0);
    }
}

.event-link {
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
    position: relative;
    overflow: hidden;
}

.event-link::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    transform: scaleY(0);
    transition: transform 0.3s ease;
}

.event-link:hover::before {
    transform: scaleY(1);
}

.event-link:hover {
    background: white;
    border-color: #667eea;
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.15);
}

.event-info {
    flex: 1;
    min-width: 0;
}

.event-title {
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

.event-meta {
    display: flex;
    align-items: center;
    gap: 15px;
    flex-wrap: wrap;
}

.event-date,
.event-location {
    font-size: 0.85rem;
    color: #666;
    display: flex;
    align-items: center;
    gap: 5px;
}

.event-status {
    margin: 0 15px;
}

.status-badge {
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.status-upcoming {
    background: rgba(52, 152, 219, 0.1);
    color: #3498db;
}

.status-ongoing {
    background: rgba(46, 204, 113, 0.1);
    color: #2ecc71;
}

.status-finished {
    background: rgba(149, 165, 166, 0.1);
    color: #95a5a6;
}

.event-arrow {
    color: #667eea;
    font-size: 1.2rem;
    transition: transform 0.3s ease;
    flex-shrink: 0;
}

.event-link:hover .event-arrow {
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

.skeleton-meta {
    display: flex;
    gap: 15px;
}

.skeleton-date,
.skeleton-location {
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

.event-footer {
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
    .event-container {
        padding: 20px;
    }
    
    .event-header {
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
    
    .event-link {
        padding: 15px;
        flex-direction: column;
        align-items: flex-start;
        gap: 10px;
    }
    
    .event-status {
        margin: 0;
        align-self: flex-end;
    }
    
    .event-arrow {
        position: absolute;
        top: 15px;
        right: 15px;
    }
    
    .event-meta {
        gap: 10px;
    }
}
</style>
