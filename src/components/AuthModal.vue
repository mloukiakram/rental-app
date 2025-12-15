<script setup>
import { ref } from 'vue'
import { useAuth } from '../composables/useAuth'

const props = defineProps({
  isOpen: Boolean,
  mode: {
    type: String,
    default: 'login' // 'login' or 'signup'
  }
})

const emit = defineEmits(['close'])
const { login } = useAuth()

const email = ref('')
const password = ref('')
const isLoading = ref(false)

const handleAuth = () => {
  if (!email.value || !password.value) return
  
  isLoading.value = true
  setTimeout(() => {
    login(email.value.split('@')[0]) // Use part of email as name for demo
    isLoading.value = false
    email.value = ''
    password.value = ''
    emit('close')
  }, 1000)
}
</script>

<template>
  <div v-if="isOpen" class="modal-backdrop" @click="emit('close')">
    <div class="modal-content" @click.stop>
      <div class="modal-header">
        <button class="close-btn" @click="emit('close')">
          <i class="ph ph-x"></i>
        </button>
        <h3>{{ mode === 'login' ? 'Log in' : 'Sign up' }}</h3>
        <div class="spacer"></div>
      </div>
      
      <div class="modal-body">
        <h2 class="welcome-text">Welcome to Rentals</h2>
        
        <form @submit.prevent="handleAuth" class="auth-form">
          <div class="input-group">
            <input 
              v-model="email" 
              type="email" 
              placeholder="Email" 
              required
              class="top-input"
            />
            <input 
              v-model="password" 
              type="password" 
              placeholder="Password" 
              required
              class="bottom-input"
            />
          </div>
          
          <p class="helper-text">This is a simulation. Any email/password works.</p>
          
          <button type="submit" class="submit-btn" :disabled="isLoading">
            <span v-if="isLoading">Loading...</span>
            <span v-else>Continue</span>
          </button>
        </form>
        
        <div class="divider">or</div>
        
        <button class="social-btn">
          <i class="ph-bold ph-google-logo"></i>
          Continue with Google
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  width: 100%;
  max-width: 568px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 28px rgba(0,0,0,0.28);
  animation: slideUp 0.3s ease-out;
}

@keyframes slideUp {
  from { transform: translateY(50px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  height: 64px;
  border-bottom: 1px solid var(--border-light);
}

.modal-header h3 {
  font-weight: 700;
  font-size: 16px;
}

.close-btn {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-btn:hover {
  background: var(--bg-secondary);
}

.spacer {
  width: 32px;
}

.modal-body {
  padding: 24px;
}

.welcome-text {
  margin-bottom: 24px;
  font-size: 22px;
  font-weight: 600;
}

.input-group {
  display: flex;
  flex-direction: column;
}

.input-group input {
  padding: 16px;
  border: 1px solid #b0b0b0;
  font-size: 16px;
  outline: none;
}

.input-group input:focus {
  border-color: var(--text-primary);
  border-width: 2px;
  margin: -1px; /* mitigate layout shift */
  z-index: 2;
}

.top-input {
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  border-bottom: none;
}

.bottom-input {
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
}

.helper-text {
  font-size: 12px;
  color: var(--text-secondary);
  margin-top: 8px;
  margin-bottom: 24px;
}

.submit-btn {
  width: 100%;
  padding: 14px;
  background: var(--primary);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  background-image: linear-gradient(to right, #FF385C 0%, #E61E4D 50%, #D80565 100%);
}

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.divider {
  display: flex;
  align-items: center;
  text-align: center;
  margin: 24px 0;
  color: var(--text-secondary);
  font-size: 12px;
}

.divider::before, .divider::after {
  content: '';
  flex: 1;
  border-bottom: 1px solid var(--border-light);
}

.divider::before { margin-right: 16px; }
.divider::after { margin-left: 16px; }

.social-btn {
  width: 100%;
  padding: 14px;
  background: white;
  border: 1px solid var(--text-primary);
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  transition: background 0.1s;
}

.social-btn:hover {
  background: var(--bg-secondary);
}
</style>
