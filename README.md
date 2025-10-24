# ZJUCSA Website

> **浙江大学学生网络空间安全协会官网前端**  
> *现代化、响应式、企业级的Vue 3 Web应用*

[![Vue](https://img.shields.io/badge/Vue-3.5+-green.svg)](https://vuejs.org)
[![Vite](https://img.shields.io/badge/Vite-5.4+-blue.svg)](https://vitejs.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://typescriptlang.org)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## 🚀 快速开始

### 📋 环境要求
- **Node.js**: 18+ (推荐 20+)
- **包管理器**: pnpm (推荐) 或 npm/yarn
- **浏览器**: 现代浏览器 (Chrome 90+, Firefox 88+, Safari 14+)

### 🔧 安装步骤

#### 1. 克隆项目
```bash
git clone https://github.com/zjucsa/csa-website.git
cd csa-website
```

#### 2. 安装依赖
```bash
# 使用 pnpm (推荐)
pnpm install

# 或使用 npm
npm install

# 或使用 yarn
yarn install
```

#### 3. 环境配置
创建 `.env.local` 文件：
```env
# API 基础地址
VITE_API_BASE_URL=http://localhost:8000

# 应用标题
VITE_APP_TITLE=浙江大学学生网络空间安全协会

# 是否启用调试模式
VITE_DEBUG=true
```

#### 4. 启动开发服务器
```bash
# 开发环境
pnpm dev

# 或
npm run dev
```

#### 5. 访问应用
- **本地地址**: http://localhost:5173
- **网络地址**: http://[your-ip]:5173

## 📁 项目结构

```
csa-website/
├── 📁 public/                 # 静态资源
├── 📁 src/
│   ├── 📁 assets/             # 资源文件
│   │   ├── 📁 about/          # 关于页面资源
│   │   └── 📁 images/         # 图片资源
│   ├── 📁 components/         # 公共组件
│   │   ├── CsaBanner.vue      # 轮播图组件
│   │   ├── CsaNavbar.vue      # 导航栏组件
│   │   ├── CsaFooter.vue      # 页脚组件
│   │   └── ...
│   ├── 📁 views/              # 页面组件
│   │   ├── CsaHome.vue        # 首页
│   │   ├── CsaAbout.vue       # 关于我们
│   │   ├── CsaNews.vue         # 新闻中心
│   │   ├── CsaEvents.vue       # 活动中心
│   │   ├── CsaRecruit.vue      # 招新报名
│   │   └── CsaAdmin*.vue       # 管理后台
│   ├── 📁 stores/              # 状态管理
│   │   ├── user.js            # 用户状态
│   │   ├── theme.js           # 主题状态
│   │   └── navbar.js          # 导航状态
│   ├── 📁 router/              # 路由配置
│   ├── 📁 utils/               # 工具函数
│   ├── App.vue                # 根组件
│   └── main.js                # 入口文件
├── 📄 package.json            # 项目配置
├── 📄 vite.config.js          # Vite配置
├── 📄 tailwind.config.js       # Tailwind配置
└── 📄 README.md               # 项目说明
```

## 🛠️ 技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| **Vue** | 3.5+ | 前端框架 |
| **Vite** | 5.4+ | 构建工具 |
| **Vue Router** | 4.4+ | 路由管理 |
| **Pinia** | 2.2+ | 状态管理 |
| **PrimeVue** | 4.1+ | UI组件库 |
| **Element Plus** | 2.10+ | 组件库 |
| **Tailwind CSS** | 3.4+ | CSS框架 |
| **Axios** | 1.11+ | HTTP客户端 |

## 📜 开发命令

```bash
# 开发环境启动
pnpm dev

# 生产环境构建
pnpm build

# 预览构建结果
pnpm preview

# 代码检查
pnpm lint

# 代码格式化
pnpm format
```


## 🔧 开发指南

### IDE 配置
推荐使用 [VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) 插件

### 代码规范
- 使用 ESLint 进行代码检查
- 使用 Prettier 进行代码格式化
- 遵循 Vue 3 组合式 API 规范

### 组件开发
```vue
<template>
  <div class="component-name">
    <!-- 组件模板 -->
  </div>
</template>

<script setup>
// 组合式 API
import { ref, computed } from 'vue'

// 响应式数据
const data = ref('')

// 计算属性
const computedValue = computed(() => {
  return data.value.toUpperCase()
})
</script>

<style scoped>
/* 组件样式 */
</style>
```

## 🚀 部署指南

### 构建生产版本
```bash
pnpm build
```

### 部署到服务器
```bash
# 将 dist 目录上传到服务器
scp -r dist/* user@server:/var/www/html/
```

### Nginx 配置
```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /var/www/html;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

## 🤝 贡献指南

1. **Fork** 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 **Pull Request**

## 📄 许可证

本项目采用 [MIT License](LICENSE) 许可证。

---

<div align="center">


Made with ❤️ by [ZJU CSA Team](https://github.com/zjucsa)

</div>