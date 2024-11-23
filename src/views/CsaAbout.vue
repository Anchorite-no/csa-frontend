<!--  关于我们  -->




<template>
  <head>
    <title>关于我们-CSA-网络空间安全协会</title>
    <meta name = 'about' content="协会介绍-about界面">
    <!-- <link ref="stylesheet" href="../style-particles.css"> -->
  </head>

  <div id="particles-js"></div>      <!-- particles.js container -->


  <section id="about">
      <div>
        <h2 class ="fade-in">关于我们</h2>
        <p>
            <span class = 'fade-in'> 浙江大学学生网络空间协会致力于网络安全、前沿技术探索以及实践学习... </span>

        </p>
      </div>
  </section>


</template>


<script >
  console.log('reach');
  console.log('reach2');

  export default{
    mounted() {
      console.log('mounted');
      //const script = document.createElement('script');
      //script.src = '../particles.js';
//       script.onload = () => {
//         console.log('particles.js loaded');
//         particlesJS('particles-js',

//   {
//     "particles": {
//       "number": {
//         "value": 80,
//         "density": {
//           "enable": true,
//           "value_area": 800
//         }
//       },
//       "color": {
//         "value": "#ffffff"
//       },
//       "shape": {
//         "type": "circle",
//         "stroke": {
//           "width": 0,
//           "color": "#000000"
//         },
//         "polygon": {
//           "nb_sides": 5
//         },
//         "image": {
//           "src": "img/github.svg",
//           "width": 100,
//           "height": 100
//         }
//       },
//       "opacity": {
//         "value": 0.5,
//         "random": false,
//         "anim": {
//           "enable": false,
//           "speed": 1,
//           "opacity_min": 0.1,
//           "sync": false
//         }
//       },
//       "size": {
//         "value": 5,
//         "random": true,
//         "anim": {
//           "enable": false,
//           "speed": 40,
//           "size_min": 0.1,
//           "sync": false
//         }
//       },
//       "line_linked": {
//         "enable": true,
//         "distance": 150,
//         "color": "#ffffff",
//         "opacity": 0.4,
//         "width": 1
//       },
//       "move": {
//         "enable": true,
//         "speed": 6,
//         "direction": "none",
//         "random": false,
//         "straight": false,
//         "out_mode": "out",
//         "attract": {
//           "enable": false,
//           "rotateX": 600,
//           "rotateY": 1200
//         }
//       }
//     },
//     "interactivity": {
//       "detect_on": "canvas",
//       "events": {
//         "onhover": {
//           "enable": true,
//           "mode": "repulse"
//         },
//         "onclick": {
//           "enable": true,
//           "mode": "push"
//         },
//         "resize": true
//       },
//       "modes": {
//         "grab": {
//           "distance": 400,
//           "line_linked": {
//             "opacity": 1
//           }
//         },
//         "bubble": {
//           "distance": 400,
//           "size": 40,
//           "duration": 2,
//           "opacity": 8,
//           "speed": 3
//         },
//         "repulse": {
//           "distance": 200
//         },
//         "push": {
//           "particles_nb": 4
//         },
//         "remove": {
//           "particles_nb": 2
//         }
//       }
//     },
//     "retina_detect": true,
//     "config_demo": {
//       "hide_card": false,
//       "background_color": "#b61924",
//       "background_image": "",
//       "background_position": "50% 50%",
//       "background_repeat": "no-repeat",
//       "background_size": "cover"
//     }
//   }

// );
//       }
      console.log('reach3');
    }
  }

</script>



<style>
#about {
    padding: 2rem;
    text-align: center;
}

#about h2 {
    font-size: 2.5rem;
}

#about p {
    font-size: 1.2rem;
}

/*淡入动画 */
.fade-in {
  animation: fadeIn_ani 2s ease-out forwards; /*2s， 使用ease-out缓动动画效果， forwards表示动画结束后保持最后一帧*/
}

/* 实现一下淡入的动画 */
@keyframes fadeIn_ani {
  /* 注: 可以用百分比定义不同时间的细节，微调动画效果*/
  /* 定义一下初始状态 */
  from{
    opacity: 0;  /*透明度*/
    transform: translateY(20px); /*初始位置向下偏移20px，向上浮起来看起来可能更有感觉*/
  }
  /* 定义结束状态 */
  to {
    opacity: 1;/* 最后是不透明的 */
    transform: translateY(0); /* 最后是没有偏移的 */
  }
}

/* 网页背景粒子效果 -- 借助 particles.js 实现 */


/* 开发中 */


</style>










<!--
  废案，太丑了
<style>

body {/* 稍微修改一下body样式， 尤其是滚动条给它关了，不然很烦 */
      margin: 0;
      padding: 0;
      overflow: hidden; /* 防止滚动条 */
      background-color: #f3c4c4;
    }

.particle {
      position: absolute;
      width: 10px;
      height: 10px;
      background-color: rgba(231, 19, 19, 0.8);
      border-radius: 50%;
      animation: moveParticle 2s infinite ease-in-out;
    }

    /* 粒子动画 */
    @keyframes moveParticle {
      0% {
        transform: translate(0, 0);
        opacity: 1;
      }
      50% {
        transform: translate(200px, -100px);
        opacity: 0.5;
      }
      100% {
        transform: translate(-200px, 200px);
        opacity: 0;
      }
    }

</style>


<script>
// 动态生成粒子效果
function createParticles() {
  const numParticles = 50; // 粒子数量
  const body = document.body;

  for (let i = 0; i < numParticles; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    particle.style.left = `${Math.random() * window.innerWidth}px`;
    particle.style.top = `${Math.random() * window.innerHeight}px`;
    body.appendChild(particle);

    // 添加随机动画延迟
    particle.style.animationDelay = `${Math.random() * 2}s`;
  }
}

// 生成粒子
createParticles();
</script>

-->
