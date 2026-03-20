<script setup>
import { computed, inject, onMounted, ref } from 'vue'

const axios = inject('axios')

const sectionData = ref({
    notice: [],
    knowledge: [],
    contest: [],
})
const loading = ref(true)

const sectionMeta = {
    notice: {
        title: '通知公告',
        subtitle: 'Announcement & Notice',
        icon: 'pi pi-bell',
        iconClass: 'icon-blue',
        emptyText: '暂无通知公告',
        emptyIcon: 'pi pi-inbox',
        category: 2,
    },
    knowledge: {
        title: '网安知识',
        subtitle: 'Cyber Security Knowledge',
        icon: 'pi pi-book',
        iconClass: 'icon-purple',
        emptyText: '暂无网安知识',
        emptyIcon: 'pi pi-bookmark',
        category: 3,
    },
    contest: {
        title: '赛事信息',
        subtitle: 'Contest Information',
        icon: 'pi pi-trophy',
        iconClass: 'icon-orange',
        emptyText: '暂无赛事信息',
        emptyIcon: 'pi pi-calendar-times',
        category: 5,
    },
}

const fetchCategory = async category => {
    const response = await axios.get('/news/list', {
        params: { page: 1, size: 5, category },
    })
    return response.data || []
}

const fetchData = async () => {
    const [noticeResult, knowledgeResult, contestResult] = await Promise.allSettled([
        fetchCategory(sectionMeta.notice.category),
        fetchCategory(sectionMeta.knowledge.category),
        fetchCategory(sectionMeta.contest.category),
    ])

    sectionData.value.notice =
        noticeResult.status === 'fulfilled' ? noticeResult.value : []
    sectionData.value.knowledge =
        knowledgeResult.status === 'fulfilled' ? knowledgeResult.value : []
    sectionData.value.contest =
        contestResult.status === 'fulfilled' ? contestResult.value : []

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

const sections = computed(() => [
    {
        key: 'notice',
        ...sectionMeta.notice,
        items: sectionData.value.notice,
    },
    {
        key: 'knowledge',
        ...sectionMeta.knowledge,
        items: sectionData.value.knowledge,
    },
    {
        key: 'contest',
        ...sectionMeta.contest,
        items: sectionData.value.contest,
    },
])

const formatDate = timestamp =>
    new Date(timestamp * 1000).toLocaleDateString('zh-CN', {
        month: '2-digit',
        day: '2-digit',
    })

const getSectionCount = items => {
    if (loading.value) return '加载中'
    if (!items.length) return '暂无'
    return `${items.length} 条`
}

const getPrimaryTag = tagValue => {
    if (!tagValue) return ''
    return tagValue
        .split(/[\s,，]+/)
        .map(tag => tag.trim())
        .find(Boolean) || ''
}

onMounted(() => {
    fetchData()
})
</script>

<template>
    <div class="info-layout">
        <div
            v-for="section in sections"
            :key="section.key"
            class="info-section"
        >
            <div class="section-header">
                <div class="section-heading">
                    <div class="section-icon" :class="section.iconClass">
                        <i :class="section.icon"></i>
                    </div>
                    <div class="section-copy">
                        <h3 class="section-title">{{ section.title }}</h3>
                        <p class="section-subtitle">{{ section.subtitle }}</p>
                    </div>
                </div>
                <span class="section-count">{{ getSectionCount(section.items) }}</span>
            </div>

            <div class="info-list">
                <div v-if="loading" class="loading-state">
                    <div v-for="i in 5" :key="i" class="skeleton-item">
                        <div class="skeleton-main">
                            <div class="skeleton-title"></div>
                            <div class="skeleton-meta"></div>
                        </div>
                        <div class="skeleton-date"></div>
                    </div>
                </div>

                <div v-else-if="section.items.length" class="list-content">
                    <div
                        v-for="(item, index) in section.items"
                        :key="item.nid"
                        class="list-item"
                        :style="{ animationDelay: `${index * 0.06}s` }"
                    >
                        <router-link
                            class="item-link"
                            :to="{ name: 'news', params: { id: item.nid } }"
                        >
                            <div class="item-main">
                                <div class="item-top">
                                    <span class="item-title">{{ item.title }}</span>
                                    <span class="item-date">{{
                                        formatDate(item.first_publish)
                                    }}</span>
                                </div>
                                <div
                                    v-if="getPrimaryTag(item.tag)"
                                    class="item-meta"
                                >
                                    <span class="item-tag">
                                        {{ getPrimaryTag(item.tag) }}
                                    </span>
                                </div>
                            </div>
                            <i class="pi pi-angle-right item-arrow"></i>
                        </router-link>
                    </div>
                </div>

                <div v-else class="empty-state">
                    <div class="empty-icon">
                        <i :class="section.emptyIcon"></i>
                    </div>
                    <p class="empty-text">{{ section.emptyText }}</p>
                    <p class="empty-hint">新的内容发布后会在这里展示</p>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.info-layout {
    position: relative;
    display: flex;
    width: 100%;
    overflow: hidden;
    border-radius: 18px;
    border: 1px solid rgba(99, 102, 241, 0.08);
    background:
        linear-gradient(
            180deg,
            rgba(var(--bg-surface-rgb, 255, 255, 255), 0.98) 0%,
            rgba(var(--bg-surface-rgb, 255, 255, 255), 0.94) 100%
        );
    box-shadow:
        0 16px 40px rgba(15, 23, 42, 0.08),
        0 1px 0 rgba(255, 255, 255, 0.7) inset;
    backdrop-filter: blur(14px);
}

.info-layout::before {
    content: '';
    position: absolute;
    inset: 0 0 auto;
    height: 1px;
    background: linear-gradient(
        90deg,
        transparent 0%,
        rgba(99, 102, 241, 0.18) 20%,
        rgba(139, 92, 246, 0.18) 50%,
        rgba(245, 158, 11, 0.16) 80%,
        transparent 100%
    );
}

.info-section {
    position: relative;
    flex: 1 1 0;
    min-height: 440px;
    padding: 28px 24px 24px;
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.info-section:not(:last-child)::after {
    content: '';
    position: absolute;
    right: 0;
    top: 28px;
    bottom: 24px;
    width: 1px;
    background: linear-gradient(
        180deg,
        rgba(99, 102, 241, 0) 0%,
        rgba(99, 102, 241, 0.12) 15%,
        rgba(99, 102, 241, 0.12) 85%,
        rgba(99, 102, 241, 0) 100%
    );
}

.section-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 14px;
    padding-bottom: 16px;
    border-bottom: 1px solid rgba(99, 102, 241, 0.08);
}

.section-heading {
    display: flex;
    align-items: center;
    gap: 14px;
    min-width: 0;
}

.section-icon {
    width: 44px;
    height: 44px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    font-size: 1.15rem;
}

.icon-blue {
    background: rgba(59, 130, 246, 0.1);
    color: #3b82f6;
}

.icon-purple {
    background: rgba(139, 92, 246, 0.1);
    color: #8b5cf6;
}

.icon-orange {
    background: rgba(245, 158, 11, 0.12);
    color: #f59e0b;
}

.section-copy {
    min-width: 0;
}

.section-title {
    margin: 0 0 4px;
    font-size: 1.15rem;
    font-weight: 700;
    color: var(--text-primary);
}

.section-subtitle {
    margin: 0;
    font-size: 0.82rem;
    color: var(--text-secondary);
    letter-spacing: 0.01em;
}

.section-count {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.4rem 0.7rem;
    border-radius: 999px;
    background: rgba(99, 102, 241, 0.08);
    color: var(--accent-color);
    border: 1px solid rgba(99, 102, 241, 0.12);
    font-size: 0.78rem;
    font-weight: 600;
    white-space: nowrap;
    font-variant-numeric: tabular-nums;
}

.info-list,
.list-content,
.loading-state,
.empty-state {
    flex: 1;
}

.list-content,
.loading-state {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.list-item {
    opacity: 0;
    transform: translateY(10px);
    animation: fadeInUp 0.45s ease-out forwards;
}

@keyframes fadeInUp {
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.item-link {
    display: flex;
    align-items: center;
    gap: 12px;
    min-height: 76px;
    padding: 14px 16px;
    text-decoration: none;
    color: inherit;
    border-radius: 14px;
    border: 1px solid transparent;
    background: rgba(99, 102, 241, 0.03);
    transition:
        background-color 0.2s ease,
        border-color 0.2s ease,
        color 0.2s ease;
}

.item-link:hover {
    background: rgba(99, 102, 241, 0.06);
    border-color: rgba(99, 102, 241, 0.14);
}

.item-main {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.item-top {
    display: flex;
    align-items: flex-start;
    gap: 12px;
}

.item-title {
    flex: 1;
    min-width: 0;
    color: var(--text-primary);
    font-size: 0.96rem;
    font-weight: 600;
    line-height: 1.45;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.item-date {
    flex-shrink: 0;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 52px;
    padding: 0.28rem 0.55rem;
    border-radius: 999px;
    background: rgba(var(--bg-surface-rgb, 255, 255, 255), 0.9);
    border: 1px solid rgba(99, 102, 241, 0.08);
    color: var(--text-secondary);
    font-size: 0.78rem;
    font-weight: 600;
    font-variant-numeric: tabular-nums;
}

.item-meta {
    display: flex;
    align-items: center;
    gap: 8px;
    min-height: 20px;
}

.item-tag {
    display: inline-flex;
    align-items: center;
    max-width: 100%;
    padding: 0.22rem 0.55rem;
    border-radius: 999px;
    background: rgba(99, 102, 241, 0.08);
    color: var(--accent-color);
    font-size: 0.74rem;
    font-weight: 600;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.item-arrow {
    flex-shrink: 0;
    color: var(--text-secondary);
    font-size: 0.9rem;
    transition: color 0.2s ease, transform 0.2s ease;
}

.item-link:hover .item-arrow {
    color: var(--accent-color);
    transform: translateX(2px);
}

.loading-state {
    justify-content: flex-start;
}

.skeleton-item {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 14px;
    min-height: 76px;
    padding: 14px 16px;
    border-radius: 14px;
    background: rgba(99, 102, 241, 0.03);
    border: 1px solid rgba(99, 102, 241, 0.05);
}

.skeleton-main {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.skeleton-title,
.skeleton-meta,
.skeleton-date {
    background: linear-gradient(
        90deg,
        rgba(148, 163, 184, 0.12) 0%,
        rgba(148, 163, 184, 0.24) 50%,
        rgba(148, 163, 184, 0.12) 100%
    );
    background-size: 200% 100%;
    animation: shimmer 1.4s infinite linear;
}

.skeleton-title {
    width: 82%;
    height: 16px;
    border-radius: 999px;
}

.skeleton-meta {
    width: 28%;
    height: 18px;
    border-radius: 999px;
}

.skeleton-date {
    width: 52px;
    height: 28px;
    border-radius: 999px;
    flex-shrink: 0;
}

@keyframes shimmer {
    0% {
        background-position: 200% 0;
    }

    100% {
        background-position: -200% 0;
    }
}

.empty-state {
    min-height: 260px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 28px 24px;
    border-radius: 16px;
    background: linear-gradient(
        180deg,
        rgba(99, 102, 241, 0.04) 0%,
        rgba(99, 102, 241, 0.015) 100%
    );
    border: 1px solid rgba(99, 102, 241, 0.08);
    text-align: center;
}

.empty-icon {
    width: 54px;
    height: 54px;
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(99, 102, 241, 0.08);
    color: var(--accent-color);
    font-size: 1.2rem;
}

.empty-text {
    margin: 0;
    color: var(--text-primary);
    font-size: 0.98rem;
    font-weight: 600;
}

.empty-hint {
    margin: 0;
    color: var(--text-secondary);
    font-size: 0.84rem;
    line-height: 1.6;
}

@media (max-width: 1200px) {
    .info-section {
        padding: 24px 20px 20px;
    }

    .item-link,
    .skeleton-item {
        padding: 14px;
    }
}

@media (max-width: 992px) {
    .info-layout {
        flex-direction: column;
    }

    .info-section {
        min-height: auto;
    }

    .info-section:not(:last-child)::after {
        content: none;
    }

    .info-section:not(:last-child) {
        border-bottom: 1px solid rgba(99, 102, 241, 0.08);
    }
}

@media (max-width: 768px) {
    .info-layout {
        border-radius: 16px;
    }

    .info-section {
        padding: 20px 16px 16px;
    }

    .section-header {
        align-items: center;
    }

    .section-icon {
        width: 40px;
        height: 40px;
        border-radius: 12px;
        font-size: 1rem;
    }

    .section-title {
        font-size: 1.02rem;
    }

    .section-subtitle {
        font-size: 0.78rem;
    }

    .section-count {
        padding: 0.32rem 0.58rem;
        font-size: 0.74rem;
    }

    .item-link,
    .skeleton-item {
        min-height: 72px;
        padding: 12px;
    }

    .item-top {
        gap: 10px;
    }

    .item-title {
        font-size: 0.92rem;
    }

    .item-date {
        min-width: 48px;
        padding: 0.24rem 0.48rem;
        font-size: 0.74rem;
    }

    .empty-state {
        min-height: 200px;
    }
}
</style>
