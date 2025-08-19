<script setup>
import { ref, reactive, inject, onMounted } from 'vue';
import { useConfirm } from 'primevue/useconfirm';

const confirm = useConfirm();
const axios = inject('axios');

// 数据状态
const recruits = ref([]);
const loading = ref(false);
const total = ref(0);
const currentPage = ref(1);
const pageSize = ref(10);

// 筛选条件
const filters = reactive({
  name: '',
  uid: '',
  degree: '',
  grade: '',
  major_name: '',
  status: 'all', // all, pending, accepted, rejected
  department: 'all' // all, office, competition, research, activity
});

// 评价状态
const evaluationStatuses = [
  { value: 'pending', label: '待评价' },
  { value: 'accepted', label: '已通过' },
  { value: 'rejected', label: '已拒绝' }
];

// 学位选项
const degreeOptions = [
  { value: 0, label: '学士' },
  { value: 1, label: '硕士' },
  { value: 2, label: '博士' },
  { value: 3, label: '博士后' }
];

// 部门选项
const departmentOptions = [
  { value: 'all', label: '全部部门' },
  { value: 'office', label: '办公室部' },
  { value: 'competition', label: '竞赛部' },
  { value: 'research', label: '科研部' },
  { value: 'activity', label: '活动部' }
];

// 年级选项
const gradeOptions = [
  { value: 21, label: '21级' },
  { value: 22, label: '22级' },
  { value: 23, label: '23级' },
  { value: 24, label: '24级' },
  { value: 25, label: '25级' }
];

// 获取纳新者列表
const fetchRecruits = async () => {
  loading.value = true;
  try {
    const params = {
      page: currentPage.value,
      size: pageSize.value,
      ...filters
    };
    
    const response = await axios.get('/admin/recruits', { params });
    recruits.value = response.data.recruits;
    total.value = response.data.total;
  } catch (error) {
    console.error('Failed to fetch recruits:', error);
  } finally {
    loading.value = false;
  }
};

// 更新评价状态
const updateEvaluation = async (uid, status, comment = '') => {
  try {
    await axios.post('/admin/update_evaluation', {
      uid,
      status,
      comment
    });
    
    // 刷新列表
    await fetchRecruits();
    alert('评价更新成功');
  } catch (error) {
    console.error('Failed to update evaluation:', error);
    alert('评价更新失败');
  }
};

// 批量操作
const batchUpdateStatus = async (status) => {
  const selectedRecruits = recruits.value.filter(r => r.selected);
  if (selectedRecruits.length === 0) {
    alert('请选择要操作的纳新者');
    return;
  }
  
  confirm.require({
    message: `确定要将选中的 ${selectedRecruits.length} 名纳新者状态更新为"${status}"吗？`,
    header: '确认操作',
    icon: 'pi pi-exclamation-triangle',
    accept: async () => {
      try {
        const uids = selectedRecruits.map(r => r.uid);
        await axios.post('/admin/batch_update_evaluation', {
          uids,
          status
        });
        
        await fetchRecruits();
        alert('批量操作成功');
      } catch (error) {
        console.error('Batch update failed:', error);
        alert('批量操作失败');
      }
    }
  });
};

// 导出数据
const exportData = async () => {
  try {
    const response = await axios.get('/admin/export_recruits', {
      params: filters,
      responseType: 'blob'
    });
    
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', '纳新者数据.xlsx');
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (error) {
    console.error('Export failed:', error);
    alert('导出失败');
  }
};

// 获取部门意愿排序
const getDepartmentOrder = (recruit) => {
  const departments = [
    { id: 'office', name: '办公室部', score: recruit.office_department_willing },
    { id: 'competition', name: '竞赛部', score: recruit.competition_department_willing },
    { id: 'research', name: '科研部', score: recruit.research_department_willing },
    { id: 'activity', name: '活动部', score: recruit.activity_department_willing }
  ];
  
  return departments.sort((a, b) => a.score - b.score);
};

// 获取学位标签
const getDegreeLabel = (degree) => {
  const option = degreeOptions.find(d => d.value === degree);
  return option ? option.label : '未知';
};

// 获取状态样式
const getStatusStyle = (status) => {
  switch (status) {
    case 'pending':
      return { color: '#ff9800', backgroundColor: '#fff3e0' };
    case 'accepted':
      return { color: '#4caf50', backgroundColor: '#e8f5e8' };
    case 'rejected':
      return { color: '#f44336', backgroundColor: '#ffebee' };
    default:
      return { color: '#666', backgroundColor: '#f5f5f5' };
  }
};

// 监听筛选条件变化
const handleFilterChange = () => {
  currentPage.value = 1;
  fetchRecruits();
};

// 页面加载时获取数据
onMounted(() => {
  fetchRecruits();
});
</script>

<template>
  <div class="admin-recruit-container">
    <h2>纳新管理</h2>
    
    <!-- 筛选条件 -->
    <div class="filter-section">
      <div class="filter-row">
        <div class="filter-item">
          <label>姓名:</label>
          <input v-model="filters.name" @input="handleFilterChange" placeholder="搜索姓名">
        </div>
        <div class="filter-item">
          <label>学号:</label>
          <input v-model="filters.uid" @input="handleFilterChange" placeholder="搜索学号">
        </div>
        <div class="filter-item">
          <label>学位:</label>
          <select v-model="filters.degree" @change="handleFilterChange">
            <option value="">全部</option>
            <option v-for="option in degreeOptions" :key="option.value" :value="option.value">
              {{ option.label }}
            </option>
          </select>
        </div>
        <div class="filter-item">
          <label>年级:</label>
          <select v-model="filters.grade" @change="handleFilterChange">
            <option value="">全部</option>
            <option v-for="option in gradeOptions" :key="option.value" :value="option.value">
              {{ option.label }}
            </option>
          </select>
        </div>
      </div>
      <div class="filter-row">
        <div class="filter-item">
          <label>专业:</label>
          <input v-model="filters.major_name" @input="handleFilterChange" placeholder="搜索专业">
        </div>
        <div class="filter-item">
          <label>状态:</label>
          <select v-model="filters.status" @change="handleFilterChange">
            <option value="all">全部状态</option>
            <option v-for="status in evaluationStatuses" :key="status.value" :value="status.value">
              {{ status.label }}
            </option>
          </select>
        </div>
        <div class="filter-item">
          <label>部门:</label>
          <select v-model="filters.department" @change="handleFilterChange">
            <option v-for="option in departmentOptions" :key="option.value" :value="option.value">
              {{ option.label }}
            </option>
          </select>
        </div>
        <div class="filter-item">
          <button @click="exportData" class="export-button">导出数据</button>
        </div>
      </div>
    </div>

    <!-- 批量操作 -->
    <div class="batch-actions">
      <button @click="batchUpdateStatus('accepted')" class="batch-button accept">批量通过</button>
      <button @click="batchUpdateStatus('rejected')" class="batch-button reject">批量拒绝</button>
      <button @click="batchUpdateStatus('pending')" class="batch-button pending">批量待定</button>
    </div>

    <!-- 数据表格 -->
    <div class="table-container">
      <table class="recruit-table">
        <thead>
          <tr>
            <th><input type="checkbox" @change="selectAll" v-model="selectAllRecruits"></th>
            <th>姓名</th>
            <th>学号</th>
            <th>性别</th>
            <th>学位</th>
            <th>年级</th>
            <th>专业</th>
            <th>学院</th>
            <th>部门意愿</th>
            <th>状态</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="recruit in recruits" :key="recruit.uid" :class="{ selected: recruit.selected }">
            <td>
              <input type="checkbox" v-model="recruit.selected">
            </td>
            <td>{{ recruit.name }}</td>
            <td>{{ recruit.uid }}</td>
            <td>{{ recruit.render ? '女' : '男' }}</td>
            <td>{{ getDegreeLabel(recruit.degree) }}</td>
            <td>{{ recruit.grade }}级</td>
            <td>{{ recruit.major_name }}</td>
            <td>{{ recruit.college_name }}</td>
            <td>
              <div class="department-order">
                <span v-for="dept in getDepartmentOrder(recruit)" :key="dept.id" class="dept-tag">
                  {{ dept.name }}({{ dept.score }})
                </span>
              </div>
            </td>
            <td>
              <span class="status-tag" :style="getStatusStyle(recruit.evaluation_status)">
                {{ evaluationStatuses.find(s => s.value === recruit.evaluation_status)?.label || '待评价' }}
              </span>
            </td>
            <td>
              <div class="action-buttons">
                <button @click="showEvaluationModal(recruit)" class="action-btn evaluate">评价</button>
                <button @click="viewDetails(recruit)" class="action-btn view">详情</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 分页 -->
    <div class="pagination">
      <button @click="currentPage--" :disabled="currentPage <= 1">上一页</button>
      <span>第 {{ currentPage }} 页，共 {{ Math.ceil(total / pageSize) }} 页</span>
      <button @click="currentPage++" :disabled="currentPage >= Math.ceil(total / pageSize)">下一页</button>
    </div>

    <!-- 评价模态框 -->
    <div v-if="showModal" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <h3>评价纳新者</h3>
        <div class="evaluation-form">
          <div class="form-group">
            <label>姓名: {{ selectedRecruit?.name }}</label>
          </div>
          <div class="form-group">
            <label>学号: {{ selectedRecruit?.uid }}</label>
          </div>
          <div class="form-group">
            <label>评价状态:</label>
            <select v-model="evaluationForm.status">
              <option v-for="status in evaluationStatuses" :key="status.value" :value="status.value">
                {{ status.label }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label>评价意见:</label>
            <textarea v-model="evaluationForm.comment" placeholder="请输入评价意见..."></textarea>
          </div>
          <div class="modal-actions">
            <button @click="submitEvaluation" class="submit-btn">提交评价</button>
            <button @click="closeModal" class="cancel-btn">取消</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.admin-recruit-container {
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
}

.filter-section {
  background: #f5f5f5;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
}

.filter-row {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

.filter-row:last-child {
  margin-bottom: 0;
}

.filter-item {
  display: flex;
  flex-direction: column;
  min-width: 150px;
}

.filter-item label {
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.filter-item input,
.filter-item select {
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.export-button {
  background: #4caf50;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 1.5rem;
}

.batch-actions {
  margin-bottom: 1rem;
  display: flex;
  gap: 1rem;
}

.batch-button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  color: white;
}

.batch-button.accept {
  background: #4caf50;
}

.batch-button.reject {
  background: #f44336;
}

.batch-button.pending {
  background: #ff9800;
}

.table-container {
  overflow-x: auto;
}

.recruit-table {
  width: 100%;
  border-collapse: collapse;
  background: white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.recruit-table th,
.recruit-table td {
  padding: 0.75rem;
  text-align: left;
  border-bottom: 1px solid #eee;
}

.recruit-table th {
  background: #f8f9fa;
  font-weight: bold;
}

.recruit-table tr:hover {
  background: #f5f5f5;
}

.recruit-table tr.selected {
  background: #e3f2fd;
}

.department-order {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.dept-tag {
  background: #e3f2fd;
  color: #1976d2;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
}

.status-tag {
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: bold;
}

.action-buttons {
  display: flex;
  gap: 0.5rem;
}

.action-btn {
  padding: 0.25rem 0.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.8rem;
  color: white;
}

.action-btn.evaluate {
  background: #2196f3;
}

.action-btn.view {
  background: #9c27b0;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 2rem;
}

.pagination button {
  padding: 0.5rem 1rem;
  border: 1px solid #ddd;
  background: white;
  cursor: pointer;
  border-radius: 4px;
}

.pagination button:disabled {
  background: #f5f5f5;
  cursor: not-allowed;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  min-width: 400px;
  max-width: 600px;
}

.evaluation-form {
  margin-top: 1rem;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.form-group select,
.form-group textarea {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.form-group textarea {
  height: 100px;
  resize: vertical;
}

.modal-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 2rem;
}

.submit-btn {
  background: #4caf50;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
}

.cancel-btn {
  background: #f44336;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
}
</style>
