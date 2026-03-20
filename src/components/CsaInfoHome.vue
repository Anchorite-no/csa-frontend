<script setup>
import { inject, onMounted, ref } from 'vue'

const axios = inject('axios')

const data1 = ref([])
const data2 = ref([])
const data3 = ref([])
const loading = ref(true)

const fetchCategory = async category => {
    const response = await axios.get('/news/list', {
        params: { page: 1, size: 6, category },
    })
    return response.data || []
}

const fetchData = async () => {
    const [noticeResult, knowledgeResult, contestResult] = await Promise.allSettled([
        fetchCategory(2),
        fetchCategory(3),
        fetchCategory(5),
    ])

    data1.value = noticeResult.status === 'fulfilled' ? noticeResult.value : []
    data2.value = knowledgeResult.status === 'fulfilled' ? knowledgeResult.value : []
    data3.value = contestResult.status === 'fulfilled' ? contestResult.value : []

    if (noticeResult.status === 'rejected') {
        console.error('获取通知公告失败:', noticeResult.reason)
    }
    if (knowledgeResult.status === 'rejected') {
        console.error('获取网安知识失败:', knowledgeResult.reason)
    }
    if (contestResult.status === 'rejected') {
        console.error('获取赛事信息失败:', contestResult.reason)
    }

    loading.value = false
}

onMounted(() => {
    fetchData()
})
</script>

<template>
    <div class="info-layout">
        <div class="info-section">
            <div class="section-header">
                <h3 class="section-title">通知公告</h3>
                <p class="section-subtitle">Announcement & Notice</p>
            </div>
            <div class="info-list">
                <div v-if="!loading && data1.length > 0" class="list-content">
                    <div
                        v-for="(item, index) in data1"
                        :key="item.nid"
                        class="list-item"
                        :style="{ animationDelay: `${index * 0.1}s` }"
                    >
                        <router-link
                            class="item-link"
                            :to="{ name: 'news', params: { id: item.nid } }"
                        >
                            <span class="item-title">{{ item.title }}</span>
                            <span class="item-date">
                                {{
                                    new Date(item.first_publish * 1000).toLocaleDateString(
                                        'zh-CN',
                                        {
                                            month: '2-digit',
                                            day: '2-digit',
                                        }
                                    )
                                }}
                            </span>
                        </router-link>
                    </div>
                </div>
                <div v-else-if="loading" class="loading-state">
                    <div v-for="i in 4" :key="i" class="skeleton-item">
                        <div class="skeleton-title"></div>
                        <div class="skeleton-date"></div>
                    </div>
                </div>
                <div v-else class="empty-state">
                    <p class="empty-text">暂无通知公告</p>
                </div>
            </div>
        </div>

        <div class="info-section">
            <div class="section-header">
                <h3 class="section-title">网安知识</h3>
                <p class="section-subtitle">Cyber Security Knowledge</p>
            </div>
            <div class="info-list">
                <div v-if="!loading && data2.length > 0" class="list-content">
                    <div
                        v-for="(item, index) in data2"
                        :key="item.kid || item.nid"
                        class="list-item"
                        :style="{ animationDelay: `${index * 0.1}s` }"
                    >
                        <router-link
                            class="item-link"
                            :to="{ name: item.kid ? 'admin-knowledge' : 'news', params: { id: item.kid || item.nid } }"
                        >
                            <span class="item-title">{{ item.title }}</span>
                            <span class="item-date">
                                {{
                                    new Date(
                                        (item.publish_date || item.first_publish) * 1000
                                    ).toLocaleDateString('zh-CN', {
                                        month: '2-digit',
                                        day: '2-digit',
                                    })
                                }}
                            </span>
                        </router-link>
                    </div>
                </div>
                <div v-else-if="loading" class="loading-state">
                    <div v-for="i in 4" :key="i" class="skeleton-item">
                        <div class="skeleton-title"></div>
                        <div class="skeleton-date"></div>
                    </div>
                </div>
                <div v-else class="empty-state">
                    <p class="empty-text">暂无网安知识</p>
                </div>
            </div>
        </div>

        <div class="info-section">
            <div class="section-header">
                <h3 class="section-title">赛事信息</h3>
                <p class="section-subtitle">Contest Information</p>
            </div>
            <div class="info-list">
                <div v-if="!loading && data3.length > 0" class="list-content">
                    <div
                        v-for="(item, index) in data3"
                        :key="item.nid"
                        class="list-item"
                        :style="{ animationDelay: `${index * 0.1}s` }"
                    >
                        <router-link
                            class="item-link"
                            :to="{ name: 'news', params: { id: item.nid } }"
                        >
                            <span class="item-title">{{ item.title }}</span>
                            <span class="item-date">
                                {{
                                    new Date(item.first_publish * 1000).toLocaleDateString(
                                        'zh-CN',
                                        {
                                            month: '2-digit',
                                            day: '2-digit',
                                        }
                                    )
                                }}
                            </span>
                        </router-link>
                    </div>
                </div>
                <div v-else-if="loading" class="loading-state">
                    <div v-for="i in 4" :key="i" class="skeleton-item">
                        <div class="skeleton-title"></div>
                        <div class="skeleton-date"></div>
                    </div>
                </div>
                <div v-else class="empty-state">
                    <p class="empty-text">暂无赛事信息</p>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.info-layout {
    display: flex;
    width: 100%;
}

.info-section {
    flex: 1 1 0%;
    min-height: 360px;
    padding: 20px;
    background-color: var(--bg-surface);
    position: relative;
    display: flex;
    flex-direction: column;
}

.info-section:not(:last-child)::after {
    content: '';
    position: absolute;
    right: 0;
    top: 20px;
    bottom: 20px;
    width: 1px;
    background-color: var(--border-color);
}

.section-header {
    margin-bottom: 20px;
    border-bottom: 2px solid var(--border-color);
    padding-bottom: 10px;
}

.section-title {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--text-primary);
    margin: 0 0 5px 0;
}

.section-subtitle {
    font-size: 0.9rem;
    color: var(--text-secondary);
    margin: 0;
}

.info-list {
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: 10px;
    min-height: 0;
}

.list-content,
.loading-state,
.empty-state {
    flex: 1;
}

.list-content {
    display: flex;
    flex-direction: column;
}

.list-item {
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

.item-link {
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-decoration: none;
    color: var(--text-primary);
    padding: 10px 0;
    border-bottom: 1px solid var(--border-color);
    transition: all 0.2s ease;
}

.item-link:hover {
    color: var(--accent-color);
    transform: translateX(5px);
}

.item-title {
    flex: 1;
    font-size: 0.95rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    line-height: 1.5;
}

.item-date {
    font-size: 0.85rem;
    color: var(--text-secondary);
    white-space: nowrap;
    margin-left: 15px;
}

.loading-state {
    display: flex;
    flex-direction: column;
    gap: 10px;
    justify-content: flex-start;
}

.skeleton-item {
    display: flex;
    justify-content: space-between;
    padding: 10px 0;
    border-bottom: 1px solid var(--border-color);
}

.skeleton-title {
    height: 14px;
    width: 70%;
    background-color: var(--bg-secondary);
    border-radius: 4px;
    animation: pulse 1.5s infinite ease-in-out;
}

.skeleton-date {
    height: 14px;
    width: 20%;
    background-color: var(--bg-secondary);
    border-radius: 4px;
    animation: pulse 1.5s infinite ease-in-out;
}

@keyframes pulse {
    0% {
        opacity: 0.5;
    }

    50% {
        opacity: 1;
    }

    100% {
        opacity: 0.5;
    }
}

.empty-state {
    display: flex;
    min-height: 220px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8px;
    text-align: center;
    padding: 20px;
    border: 1px dashed var(--border-color);
    border-radius: 16px;
    background: linear-gradient(
        180deg,
        rgba(var(--bg-surface-rgb), 0.55) 0%,
        rgba(var(--bg-surface-rgb), 0.12) 100%
    );
}

.empty-text {
    color: var(--text-secondary);
    font-size: 0.95rem;
    font-weight: 600;
    margin: 0;
}

@media (max-width: 992px) {
    .info-layout {
        flex-direction: column;
    }

    .info-section {
        min-height: 320px;
    }

    .info-section:not(:last-child)::after {
        content: none;
    }

    .info-section:not(:last-child) {
        border-bottom: 1px solid var(--border-color);
    }
}
</style>
