<template>
  <div class="admin-settings-container">
    <h2>💻 纳新截止日期管理</h2>
    
    <div class="status-display">
      <p>当前纳新状态: 
        <span :class="{'active': isRecruiting, 'closed': !isRecruiting}">
          {{ isRecruiting ? '开放中' : '已截止' }}
        </span>
      </p>
      <p>当前截止日期: 
        <span class="deadline-value">{{ currentDeadline || '未设置' }}</span>
        <button @click="fetchDeadline" class="refresh-button" :disabled="isLoading">
          <i class="pi pi-refresh" :class="{'pi-spin': isLoading}"></i> 刷新
        </button>
      </p>
    </div>

    <hr>
    
    <div class="input-section">
      <h3>📅 设置新的截止日期</h3>
      <label for="deadline-input">选择日期:</label>
      <input 
        type="date" 
        id="deadline-input"
        v-model="newDeadline"
      />
      <p class="hint">注意：时间默认为当日 23:59:59，日期格式为 YYYY-MM-DD。</p>
      <button @click="handleSetDeadline" :disabled="!newDeadline || isSubmitting" class="set-button">
        {{ isSubmitting ? '保存中...' : '💾 保存截止日期' }}
      </button>
    </div>
    
    <div v-if="message" :class="['message-box', messageType]">
        {{ message }}
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
// 从 utils 目录引入 API 服务
import { getRecruitDeadline, setRecruitDeadline } from '../utils/recruitService'; 

// 状态变量
const newDeadline = ref('');
const currentDeadline = ref('正在加载...');
const isRecruiting = ref(false);
const isLoading = ref(false);
const isSubmitting = ref(false);
const message = ref('');
const messageType = ref(''); // success | error

// 1. 获取当前截止日期
const fetchDeadline = async () => {
    isLoading.value = true;
    message.value = '';
    currentDeadline.value = '正在加载...';
    try {
        const response = await getRecruitDeadline();
        const deadlineString = response.data.deadline; // 假设返回 "YYYY-MM-DD"
        
        if (deadlineString) {
            currentDeadline.value = deadlineString;
            // 简单判断是否开放：检查当前时间是否小于截止日期
            const deadlineDate = new Date(deadlineString);
            const currentDate = new Date();
            isRecruiting.value = currentDate < deadlineDate;
            
            // 将当前截止日期设置到输入框，方便管理员基于此修改
            newDeadline.value = deadlineString.split('T')[0] || deadlineString; 
        } else {
            currentDeadline.value = '未设置截止日期';
            isRecruiting.value = false;
        }
    } catch (error) {
        console.error("获取截止日期失败:", error);
        currentDeadline.value = '获取失败';
        message.value = `❌ 获取失败：${error.response?.data?.message || '请检查网络或后端接口'}`;
        messageType.value = 'error';
        isRecruiting.value = false;
    } finally {
        isLoading.value = false;
    }
};

// 2. 设置新的截止日期
const handleSetDeadline = async () => {
    if (!newDeadline.value) {
        message.value = '请选择一个截止日期！';
        messageType.value = 'error';
        return;
    }

    isSubmitting.value = true;
    message.value = '';
    
    try {
        // 调用 API 服务，发送 YYYY-MM-DD 格式
        await setRecruitDeadline(newDeadline.value);
        
        message.value = `✅ 截止日期设置成功：${newDeadline.value}`;
        messageType.value = 'success';
        
        // 设置成功后刷新状态
        fetchDeadline(); 
    } catch (error) {
        console.error("设置截止日期失败:", error);
        message.value = `❌ 设置失败：${error.response?.data?.message || '请检查您的管理员权限或后端'}`;
        messageType.value = 'error';
    } finally {
        isSubmitting.value = false;
    }
};

// 组件加载时获取当前状态
onMounted(fetchDeadline);
</script>

<style scoped>
.admin-settings-container {
    max-width: 700px;
    margin: 3rem auto;
    padding: 2rem;
    background-color: #ffffff;
    border-radius: 12px;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
    border: 1px solid #e0e0e0;
}

h2 {
    text-align: center;
    color: #333;
    margin-bottom: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
}

.status-display {
    background-color: #f5f5f5;
    padding: 15px;
    border-radius: 8px;
    margin-bottom: 1.5rem;
    border-left: 4px solid #3f51b5;
}

.status-display p {
    margin: 0.5rem 0;
    font-size: 1.1rem;
    color: #555;
}

.status-display span {
    font-weight: bold;
    padding: 3px 8px;
    border-radius: 4px;
    display: inline-block;
}

.active {
    background-color: #e8f5e9;
    color: #4caf50;
}

.closed {
    background-color: #ffebee;
    color: #f44336;
}

.deadline-value {
    color: #3f51b5;
}

.refresh-button {
    margin-left: 15px;
    padding: 5px 10px;
    background-color: #9e9e9e;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.2s;
}

.refresh-button:hover:not(:disabled) {
    background-color: #757575;
}

.refresh-button:disabled {
    cursor: not-allowed;
    opacity: 0.6;
}

.input-section {
    padding: 1rem 0;
}

.input-section h3 {
    color: #333;
    margin-top: 0;
    margin-bottom: 1rem;
    border-bottom: 1px dashed #ccc;
    padding-bottom: 10px;
}

label {
    display: block;
    font-weight: bold;
    margin-bottom: 0.5rem;
    color: #555;
}

input[type="date"] {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    font-size: 1rem;
}

.hint {
    font-size: 0.9rem;
    color: #777;
    margin-bottom: 1.5rem;
}

.set-button {
    width: 100%;
    padding: 12px;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 1.1rem;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.1s;
}

.set-button:hover:not(:disabled) {
    background-color: #388e3c;
    transform: translateY(-1px);
}

.set-button:disabled {
    background-color: #a5d6a7;
    cursor: not-allowed;
}

.message-box {
    margin-top: 1.5rem;
    padding: 15px;
    border-radius: 8px;
    font-weight: bold;
    border: 1px solid;
}

.message-box.success {
    background-color: #e8f5e9;
    color: #2e7d32;
    border-color: #4caf50;
}

.message-box.error {
    background-color: #ffebee;
    color: #c62828;
    border-color: #f44336;
}

/* 旋转图标用于加载 */
.pi-spin {
    animation: pi-spin 2s infinite linear;
}

@keyframes pi-spin {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}
</style>