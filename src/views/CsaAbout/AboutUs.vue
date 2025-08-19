<script setup>
// 移除展开收起功能，内容始终显示
</script>

<template>
  <section id="about" class="section">
    <div class="fade-in content-wrapper">
      <h2>关于我们</h2>
      <p class="description">
        浙江大学学生网络空间安全协会（CSA）成立于2023年，旨在成为浙江大学网络空间安全领域的重要育苗基地。我们致力于培养对网络安全感兴趣的学生，通过举办各类技术讲座、实践演练、竞赛培训等活动，为同学们提供全方位的学习和交流平台，助力他们在网络空间安全领域的成长与发展。
      </p>

      <div class="fade-in info-sections-container">
        <div class="info-section card slide-in-left">
          <div class="section-header">
            <div class="section-icon">🏛️</div>
            <h3 class="info-title">基本情况</h3>
          </div>
          <p class="info-content">
            浙江大学学生网络空间安全协会，是一个由浙江大学网络空间安全学院与信息技术中心联合成立的全校唯一网络空间安全相关的学生社团。协会于2023年5月顺利完成学校社团成立答辩，并于同年7月10日正式成立。协会聘请了由院士级学者、白帽黑客和产业精英组成的导师团队，包括德育导师宋炜铁、学术导师李松、张聪，以及产业导师李均等。
          </p>
        </div>

        <div class="info-section card slide-in-right">
          <div class="section-header">
            <div class="section-icon">🎯</div>
            <h3 class="info-title">发展宗旨</h3>
          </div>
          <p class="info-content">
            协会定位为网络安全育苗基地，秉承"全师生、多平台、共运维，务创新、培英才、肩大任"的团队理念，旨在培养学生对网络空间安全的兴趣爱好，提高学生网络空间安全学习和实践能力，开拓学生网络空间安全知识视野，并拓宽学生就业渠道。
          </p>
        </div>

        <div class="info-section card slide-in-left">
          <div class="section-header">
            <div class="section-icon">🎪</div>
            <h3 class="info-title">活动情况</h3>
          </div>
          <p class="info-content">
            协会自成立以来，积极开展了网安知识的宣传与科普、网安主题暑期学校、国家网络安全周等系列活动，并通过代表学校参与各级攻防演练、参与或组办网络空间安全相关比赛等方式，为学生提供更多"实战"演练机会。
          </p>
        </div>

        <div class="info-section card slide-in-right">
          <div class="section-header">
            <div class="section-icon">🏆</div>
            <h3 class="info-title">成果成就</h3>
          </div>
          <p class="info-content">
            协会在网络安全领域取得了一定的学术成果，曾参与或主导过一些网络安全研究项目，为学校的网络空间安全学科发展做出了贡献。协会以AAA战队为技术核心，搭建了CTF竞赛平台和攻防演练系统，形成"赛训结合"的特色模式，在众多赛事中均取得成就。在学术创新方面，协会深度参与智能语音安全、物联网安全等前沿研究，其成果在许多方面均有推动作用。协会成员开发的开源项目获得多次实践应用。
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.content-wrapper {
  max-width: 70vw;
  margin-top: 5rem;
  translate: 0 -10vh;  /* 向上移动 */
  overflow-y: auto; /* 改为auto，只在需要时显示滚动条 */
  scrollbar-width: none; /* 隐藏滚动条 */
  -ms-overflow-style: none; /* IE和Edge隐藏滚动条 */
}

.content-wrapper::-webkit-scrollbar {
  display: none; /* Chrome、Safari和Opera隐藏滚动条 */
}

.description {
  font-size: 1.3rem;
  line-height: 1.8;
  color: #374151;
  margin-bottom: 5rem;
  text-align: center;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  font-weight: 400;
}

.info-section {
  margin-bottom: 2rem;
  position: relative;
  overflow: hidden;
}

.info-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 100%;
  background: linear-gradient(180deg, #3b82f6, #8b5cf6);
  border-radius: 2px;
}

.section-header {
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
  gap: 1rem;
}

.section-icon {
  font-size: 2rem;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  border-radius: 50%;
  color: white;
  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);
}

.info-title {
  font-size: 1.6rem;
  color: #1e293b;
  margin-bottom: 0;
  position: relative;
  padding-left: 0;
  font-weight: 600;
}

.info-title::before {
  display: none;
}

.info-content {
  font-size: 1.1rem;
  line-height: 1.8;
  color: #4b5563;
  text-align: justify;
  padding-top: 0;
  transition: all 1s ease;
  margin: 0;
}

/* 内容容器 */
.info-sections-container {
  margin-top: 2rem;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .content-wrapper {
    max-width: 90vw;
  }
  
  .description {
    font-size: 1.1rem;
    margin-bottom: 3rem;
  }
  
  .section-header {
    flex-direction: column;
    text-align: center;
    gap: 0.5rem;
  }
  
  .section-icon {
    width: 50px;
    height: 50px;
    font-size: 1.5rem;
  }
  
  .info-title {
    font-size: 1.4rem;
  }
  
  .info-content {
    font-size: 1rem;
  }
  
  .rope-knot {
    width: 40px;
    height: 40px;
  }
  
  .knot-icon {
    font-size: 1.2rem;
  }
}

/* 深色模式支持 */
@media (prefers-color-scheme: dark) {
  .description {
    color: #d1d5db;
  }
  
  .info-content {
    color: #9ca3af;
  }
  
  .toggle-text {
    color: #9ca3af;
  }
  
  .toggle-container:hover .toggle-text {
    color: #60a5fa;
  }
}
</style>
