<script setup>
import { ref, onUnmounted } from 'vue'
import { useNavbarStore } from '@/stores/navbar'

const navbarStore = useNavbarStore() //引入navbarStore， 方便修改navbar的状态
let originalNavbarState = false //存储当前状态，在特殊事件结束后可以恢复
navbarStore.setCollapsed(true) //关闭导航栏，默认关它一手， 但是默认一开始又是开的，所以能看到关的动画

const showModal = ref(false)
const currentDepartment = ref('')

import departmentsData from '@/assets/about/department/departments.json'
const departments = ref(departmentsData) //使用外部的json文件

import {
    disableBodyScroll,
    enableBodyScroll,
    clearAllBodyScrollLocks,
} from 'body-scroll-lock' //使用专门的滚动库来更进一步控制模态框打开时的滚动行为

const openModal = dept => {
    // 禁用主页面滚动   //滚动过程中就把滚轮禁用了，免得出幺蛾子
    disableBodyScroll(document.body)

    // 移动到指定位置，保证显示正常
    const section = document.getElementById('team')
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
        })
    }

    //记录当前导航栏状态，并关闭导航栏
    originalNavbarState = navbarStore.isCollapsed //存储当前状态，以便恢复
    navbarStore.setCollapsed(true)

    // 300ms后显示模态框，确保滚动动画完成再显示模态框
    setTimeout(() => {
        currentDepartment.value = dept
        showModal.value = true
    }, 350)
}

const closeModal = () => {
    showModal.value = false

    // 启用主页面滚动
    enableBodyScroll(document.body)

    //恢复导航栏
    navbarStore.setCollapsed(originalNavbarState)
}

// 组件卸载时清理事件监听
onUnmounted(() => {
    // 清理所有滚动锁
    clearAllBodyScrollLocks()
})
</script>

<template>
    <section id="team" class="section">
        <div class="content-wrapper">
            <h2>核心部门</h2>
            <!-- 部门卡片 -->
            <div class="team-grid">
                <div
                    class="team-member"
                    v-for="(dept, key) in departments"
                    :key="key"
                    @click="openModal(key)"
                >
                    <img
                        :src="`src/assets/about/department/team-avatar/${dept.avatar}`"
                        class="member-avatar"
                        :alt="`${dept.name}头像`"
                    />
                    <!-- 这里不能用@ -->
                    <h3>{{ dept.name }}</h3>
                    <p>{{ dept.shortDescription }}</p>
                </div>
            </div>

            <!-- 模态框 -->
            <Transition name="modal">
                <div
                    v-if="showModal"
                    class="department-modal"
                    @click.self="closeModal"
                >
                    <!-- 点击外面也能关闭 -->
                    <div class="modal-content">
                        <button class="close-btn" @click="closeModal">×</button>
                        <h2>{{ departments[currentDepartment].name }}</h2>
                        <!-- 直接使用对应部门提供的说明， 通过html尽可能保留必要的格式 -->
                        <div
                            class="modal-body"
                            v-html="departments[currentDepartment].description"
                        ></div>
                    </div>
                </div>
            </Transition>
        </div>
    </section>
</template>

<style scoped>
.content-wrapper {
    max-width: 70vw;
    margin: 0 auto;
    padding: 2vh 0;
}

.team-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 2rem;
    margin-top: 2rem;
}

.team-member {
    cursor: pointer; /* 鼠标悬停时显示手型 */
    text-align: center;
    padding: 1.5rem;
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
}

.team-member:hover {
    transform: translateY(-5px);
}

.member-avatar {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    object-fit: cover; /* 保持图片比例，那么截图的logo只要全部1:1即可*/
    object-position: center;
    margin-bottom: 1rem;
    border: 3px solid #f8f9fa;
    transition: border-color 0.3s ease;
    display: block;
    margin-left: auto;
    margin-right: auto;
    user-select: none; /* 防止图片被选中 */
    -webkit-user-drag: none;
}

.team-member:hover .member-avatar {
    border-color: #3498db;
}

.team-member h3 {
    font-size: 1.2rem;
    color: #2c3e50;
    margin-bottom: 0.5rem;
}

.team-member p {
    color: #666;
    font-size: 0.9rem;
}

.modal-enter-active,
.modal-leave-active {
    transition: opacity 0.3s ease;
}

.modal-enter-from, /* 进入和离开时均为透明度0 */
.modal-leave-to {
    opacity: 0;
}

.modal-enter-active .modal-content,
.modal-leave-active .modal-content {
    transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); /* 随便用个贝塞尔曲线实现弹性效果 */
}

.modal-enter-from .modal-content,  /* 进入和离开时大小都小一号， 可以产生一个跳动的效果 */
.modal-leave-to .modal-content {
    /*大小变 */
    transform: scale(0.9);
}

.department-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    /* overflow: hidden; */
}

.modal-content {
    position: relative;
    background: white;
    padding: 2.5rem;
    border-radius: 12px;
    max-width: 800px;
    width: 90%;
    max-height: 90vh;
    display: flex;
    flex-direction: column;
    /* overflow: hidden; */
    transform: scale(1);
    opacity: 1;
}

.modal-body {
    overflow-y: auto;
    flex-grow: 1;
    padding: 0 1rem;
    margin-top: 1rem;
    max-height: 70vh; /* 预留标题和按钮空间 */
    scrollbar-width: thin; /* 更细的滚动条 */
    overscroll-behavior: contain; /* 阻止滚动穿透—— 具体来说就是滚到底部的时候不会移动其它内容 */
}
/* 有必要的话， 对内部description需要进一步定义，因为提供的直接就是html， 但是有点麻烦*/

.close-btn {
    position: absolute;
    top: 15px;
    right: 15px;
    font-size: 2rem;
    line-height: 1;
    background: none;
    border: none;
    cursor: pointer;
    color: #666;
    transition: color 0.2s;
}

.close-btn:hover {
    color: #333;
}
</style>
