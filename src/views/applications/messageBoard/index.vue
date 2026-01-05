<template>
  <div class="message-board">
    <h2>留言表单</h2>
    <form @submit.prevent="submitMessage" class="message-form">
      <div class="form-group">
        <label for="contact">邮箱或域名：</label>
        <input
          type="text"
          id="contact"
          v-model="formData.contact"
          placeholder="请输入邮箱或域名"
          required
          class="form-control"
        />
      </div>
      
      <div class="form-group">
        <label for="message">留言内容：</label>
        <textarea
          id="message"
          v-model="formData.message"
          placeholder="请输入您的留言"
          required
          class="form-control"
          rows="5"
        ></textarea>
      </div>
      
      <button type="submit" class="submit-btn" :disabled="!isFormValid">
        提交留言
      </button>
    </form>
    
    <div v-if="messages.length > 0" class="message-list">
      <h3>留言列表</h3>
      <div v-for="(msg, index) in messages" :key="index" class="message-item">
        <div class="contact-info">
          <strong>{{ msg.contact }}</strong>
        </div>
        <div class="message-content">{{ msg.message }}</div>
        <div class="message-time">{{ formatDate(msg.timestamp) }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, computed } from 'vue'

export default {
  name: 'MessageBoard',
  setup() {
    // 表单数据
    const formData = reactive({
      contact: '',
      message: ''
    })
    
    // 留言列表
    const messages = ref([])
    
    // 验证表单
    const isFormValid = computed(() => {
      return formData.contact.trim() !== '' && formData.message.trim() !== '' && isValidContact(formData.contact.trim())
    })
    
    // 验证邮箱或域名格式
    const isValidContact = (contact) => {
      // 邮箱正则表达式
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      // 域名正则表达式
      const domainRegex = /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](\.[a-zA-Z]{2,})+$/
      
      return emailRegex.test(contact) || domainRegex.test(contact)
    }
    
    // 提交留言
    const submitMessage = () => {
      if (!isFormValid.value) {
        alert('请输入有效的邮箱或域名以及留言内容')
        return
      }
      
      const newMessage = {
        contact: formData.contact.trim(),
        message: formData.message.trim(),
        timestamp: new Date()
      }
      
      messages.value.push(newMessage)
      
      // 清空表单
      formData.contact = ''
      formData.message = ''
      
      // 保存到 localStorage
      saveMessagesToStorage()
    }
    
    // 保存留言到 localStorage
    const saveMessagesToStorage = () => {
      localStorage.setItem('messageBoardMessages', JSON.stringify(messages.value))
    }
    
    // 从 localStorage 加载留言
    const loadMessagesFromStorage = () => {
      const savedMessages = localStorage.getItem('messageBoardMessages')
      if (savedMessages) {
        try {
          messages.value = JSON.parse(savedMessages)
        } catch (e) {
          console.error('加载留言数据失败:', e)
        }
      }
    }
    
    // 格式化日期
    const formatDate = (date) => {
      return new Intl.DateTimeFormat('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }).format(date)
    }
    
    // 组件挂载时加载留言
    loadMessagesFromStorage()
    
    return {
      formData,
      messages,
      isFormValid,
      submitMessage,
      formatDate
    }
  }
}
</script>

<style scoped>
.message-board {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.message-form {
  background: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 30px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #333;
}

.form-control {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  box-sizing: border-box;
}

.form-control:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
}

.submit-btn {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  width: 100%;
}

.submit-btn:hover:not(:disabled) {
  background-color: #0056b3;
}

.submit-btn:disabled {
  background-color: #6c757d;
  cursor: not-allowed;
}

.message-list {
  margin-top: 30px;
}

.message-list h3 {
  border-bottom: 2px solid #eee;
  padding-bottom: 10px;
  margin-bottom: 20px;
  color: #333;
}

.message-item {
  background: white;
  border: 1px solid #eee;
  border-radius: 6px;
  padding: 15px;
  margin-bottom: 15px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.contact-info {
  font-weight: bold;
  color: #007bff;
  margin-bottom: 5px;
}

.message-content {
  margin: 10px 0;
  color: #555;
  line-height: 1.5;
}

.message-time {
  font-size: 12px;
  color: #999;
  text-align: right;
  border-top: 1px solid #eee;
  padding-top: 10px;
}
</style>