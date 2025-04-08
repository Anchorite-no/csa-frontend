<script setup>
import { ref, onMounted } from 'vue'

const isAllExpanded = ref(true)// 是否展开

const containerRef = ref(null)
const containerHeight = ref(0)

onMounted(() => {
  // 计算容器高度, 用于动态赋值
  if (containerRef.value) {
    containerHeight.value = containerRef.value.scrollHeight
  }
})

</script>

<template>
  <section id="about" class="section">
    <div class="fade-in content-wrapper">
      <h2>关于我们</h2>
      <p class="description">
        浙江大学学生网络空间安全协会（CSA）成立于2023年，旨在成为浙江大学网络空间安全领域的重要育苗基地。我们致力于培养对网络安全感兴趣的学生，通过举办各类技术讲座、实践演练、竞赛培训等活动，为同学们提供全方位的学习和交流平台，助力他们在网络空间安全领域的成长与发展。
      </p>

      <div class="toggle-rope" @click="isAllExpanded = !isAllExpanded">
        <div class="rope-line" :class="{expanded: isAllExpanded}"></div>
        <div class="rope-knot"></div>
      </div>

      <div class="fade-in info-sections-container" ref="containerRef" :class="{collapsed: !isAllExpanded}">
        <div class="info-section">
          <h3 class="info-title">基本情况</h3>
          <p class="info-content">
            浙江大学学生网络空间安全协会，是一个由浙江大学网络空间安全学院与信息技术中心联合成立的全校唯一网络空间安全相关的学生社团。协会于2023年5月顺利完成学校社团成立答辩，并于同年7月10日正式成立。协会聘请了由院士级学者、白帽黑客和产业精英组成的导师团队，包括德育导师宋炜铁、学术导师李松、张聪，以及产业导师李均等。
          </p>
        </div>




        <div class="info-section">
          <h3 class="info-title">发展宗旨</h3>
          <p class="info-content">
            协会定位为网络安全育苗基地，秉承"全师生、多平台、共运维，务创新、培英才、肩大任"的团队理念，旨在培养学生对网络空间安全的兴趣爱好，提高学生网络空间安全学习和实践能力，开拓学生网络空间安全知识视野，并拓宽学生就业渠道。
          </p>
        </div>

        <div class="info-section">
          <h3 class="info-title">活动情况</h3>
          <p class="info-content">
            协会自成立以来，积极开展了网安知识的宣传与科普、网安主题暑期学校、国家网络安全周等系列活动，并通过代表学校参与各级攻防演练、参与或组办网络空间安全相关比赛等方式，为学生提供更多"实战"演练机会。
          </p>
        </div>

        <div class="info-section">
          <h3 class="info-title">成果成就</h3>
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
  overflow-y: scroll; /* 始终显示滚动条， 不然的话绳子展开的时候那个进度条总要跳一下，很难绷 */
  scrollbar-width: thin;
  scrollbar-color: transparent transparent; /* 默认透明 */
}

.description {
  font-size: 1.2rem;
  line-height: 1.8;
  color: #34495e;
  margin-bottom: 5rem;
}

.info-section {
  margin-bottom: 2.5rem;
  translate: 3vw 0;
}

.info-title {
  font-size: 1.4rem;
  color: #2c3e50;
  margin-bottom: 1rem;
  position: relative;
  padding-left: 1rem;
}

.info-title::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0.3em;
  height: 1em;
  width: 0.3rem;
  background-color: #3498db;
}

.info-content {
  font-size: 1.1rem;
  line-height: 1.8;
  color: #34495e;
  text-align: justify;
  padding-top: 1rem;
  transition: all 1s ease;
}

/* 展开收起 */
.info-sections-container {
  transition: all 1s ease;
  max-height: 1000px;
  overflow: hidden;
}

.info-sections-container.collapsed {
  max-height: 0;
  opacity: 0;
}

/*绳子*/
.toggle-rope {
  position: relative;
  width: 24px;
  margin: 2rem 0;
  cursor: pointer;
  translate: 0 -5vh;
}

.rope-line {
  position: absolute;
  left: 50%;
  top: 0;
  transform: translateX(-50%);
  width: 2px;
  height: 8vh;
  background-color: #3498db;
  transition: height 0.3s ease;
}

.rope-line.expanded {
  height: v-bind(containerHeight + 'px')
}

.rope-knot {
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: #3498db;
  z-index: 1;
}

</style>
