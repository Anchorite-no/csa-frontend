<script setup>
import { onMounted, ref } from 'vue'

const visionCards = ref([])

onMounted(() => {
  // 为每个卡片添加延迟动画
  visionCards.value = document.querySelectorAll('.vision-card')
  visionCards.value.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.2}s`
  })
})
</script>

<template>
  <section id="vision" class="section">
    <div class="fade-in content-wrapper">
      <h2>协会愿景</h2>
      <p class="vision-description">
        我们致力于打造一个充满活力、技术领先的网络安全学习社区，为每一位成员提供成长和发展的平台
      </p>
      <div class="vision-grid">
        <div class="vision-card card-interest fade-in">
          <div class="card-header">
            <div class="vision-icon">🎮</div>
            <h3>培养兴趣爱好</h3>
          </div>
          <p>激发对网络安全的热情，通过有趣的活动和项目，让每位成员在探索中找到乐趣，培养持久的学习动力。</p>
          <div class="card-decoration"></div>
        </div>
        <div class="vision-card card-skill fade-in">
          <div class="card-header">
            <div class="vision-icon">💪</div>
            <h3>提高学习与实践能力</h3>
          </div>
          <p>通过系统化的培训体系和实战演练，帮助成员掌握专业技能，提升实践能力，打造过硬的技术本领。</p>
          <div class="card-decoration"></div>
        </div>
        <div class="vision-card card-vision fade-in">
          <div class="card-header">
            <div class="vision-icon">🔭</div>
            <h3>开拓知识视野</h3>
          </div>
          <p>定期举办技术讲座和交流活动，邀请业内专家分享经验，帮助成员了解行业动态，拓展专业视野。</p>
          <div class="card-decoration"></div>
        </div>
        <div class="vision-card card-career fade-in">
          <div class="card-header">
            <div class="vision-icon">🌈</div>
            <h3>拓宽就业渠道</h3>
          </div>
          <p>搭建校企合作平台，培养成员从业技能，为成员提供优质的就业资源，助力职业发展。</p>
          <div class="card-decoration"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.content-wrapper {
  max-width: 80vw;
  margin: 0 auto;
  padding: 4vh 0;
}

.vision-description {
  font-size: 1.2rem;
  color: #6b7280;
  text-align: center;
  margin-bottom: 4rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
}

/* 协会愿景样式 */
.vision-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
}

.vision-card {
  padding: 2.5rem;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.vision-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, var(--card-color), var(--card-color-secondary));
  transition: height 0.3s ease;
}

.vision-card:hover::before {
  height: 8px;
}

.vision-card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  border-color: rgba(59, 130, 246, 0.3);
}

.card-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.vision-icon {
  font-size: 2.5rem;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--card-color), var(--card-color-secondary));
  border-radius: 50%;
  color: white;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.vision-card h3 {
  font-size: 1.4rem;
  color: #1e293b;
  margin: 0;
  font-weight: 600;
}

.vision-card p {
  color: #4b5563;
  line-height: 1.7;
  margin: 0;
  flex-grow: 1;
}

.card-decoration {
  position: absolute;
  top: -50%;
  right: -50%;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
  border-radius: 50%;
  transition: all 0.3s ease;
}

.vision-card:hover .card-decoration {
  transform: scale(1.5);
  opacity: 0.3;
}

/* 卡片颜色主题 */
.card-interest {
  --card-color: #3b82f6;
  --card-color-secondary: #1d4ed8;
}

.card-skill {
  --card-color: #8b5cf6;
  --card-color-secondary: #7c3aed;
}

.card-vision {
  --card-color: #06b6d4;
  --card-color-secondary: #0891b2;
}

.card-career {
  --card-color: #10b981;
  --card-color-secondary: #059669;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .content-wrapper {
    max-width: 95vw;
    padding: 2vh 0;
  }
  
  .vision-description {
    font-size: 1.1rem;
    margin-bottom: 3rem;
  }
  
  .vision-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .vision-card {
    padding: 2rem;
  }
  
  .card-header {
    flex-direction: column;
    text-align: center;
    gap: 0.5rem;
  }
  
  .vision-icon {
    width: 50px;
    height: 50px;
    font-size: 2rem;
  }
  
  .vision-card h3 {
    font-size: 1.3rem;
  }
}

/* 深色模式支持 */
@media (prefers-color-scheme: dark) {
  .vision-description {
    color: #9ca3af;
  }
  
  .vision-card {
    background: rgba(0, 0, 0, 0.3);
    border-color: rgba(255, 255, 255, 0.1);
  }
  
  .vision-card:hover {
    border-color: rgba(59, 130, 246, 0.5);
  }
  
  .vision-card h3 {
    color: #e2e8f0;
  }
  
  .vision-card p {
    color: #9ca3af;
  }
}

/* 动画优化 */
.vision-card {
  animation: cardSlideIn 0.8s ease-out forwards;
  opacity: 0;
  transform: translateY(30px);
}

@keyframes cardSlideIn {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
