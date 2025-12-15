<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const showLanguageMenu = ref(false)
const showProfileMenu = ref(false)
const navRef = ref(null)

const toggleLanguage = () => {
    showLanguageMenu.value = !showLanguageMenu.value
    showProfileMenu.value = false
}

const toggleProfile = () => {
    showProfileMenu.value = !showProfileMenu.value
    showLanguageMenu.value = false
}

// Close menus when clicking outside
const handleClickOutside = (event) => {
    if (navRef.value && !navRef.value.contains(event.target)) {
        showLanguageMenu.value = false
        showProfileMenu.value = false
    }
}

onMounted(() => {
    document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <nav class="navbar" ref="navRef">
    <div class="container">
      <router-link to="/" class="brand">
        <img src="../assets/logo.png" alt="Logo" class="logo-img" />
        <span class="brand-text">rentals</span>
      </router-link>
      
      <div class="nav-actions">
        <!-- Language Button -->
        <div class="menu-container">
            <button class="nav-btn" aria-label="Language" @click.stop="toggleLanguage">
              <i class="ph ph-globe"></i>
            </button>
            
            <div v-if="showLanguageMenu" class="dropdown-menu language-menu">
                <div class="menu-item active">English (US)</div>
                <div class="menu-item">Español</div>
                <div class="menu-item">Français</div>
                <div class="menu-item">Deutsch</div>
            </div>
        </div>

        <!-- Profile Button -->
        <div class="menu-container">
            <button class="nav-btn profile-btn" aria-label="Profile" @click.stop="toggleProfile">
              <i class="ph ph-list"></i>
              <i class="ph-fill ph-user-circle"></i>
            </button>
            
            <div v-if="showProfileMenu" class="dropdown-menu profile-menu">
                <div class="menu-item bold">Sign up</div>
                <div class="menu-item">Log in</div>
                <div class="divider"></div>
                <div class="menu-item">Host your home</div>
                <div class="menu-item">Host an experience</div>
                <div class="menu-item">Help</div>
            </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  height: 80px;
  border-bottom: 1px solid var(--bg-secondary);
  display: flex;
  align-items: center;
  background: var(--bg-primary);
  position: relative;
  z-index: 50; /* Above everything */
}

.container {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.brand {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--primary);
  font-weight: 700;
  font-size: 24px;
}

.logo-img {
  height: 40px;
  width: auto;
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.menu-container {
    position: relative;
}

.nav-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px;
  border-radius: var(--radius-pill);
  background: transparent;
  color: var(--text-primary);
  transition: background-color 0.2s;
  font-size: 18px;
  cursor: pointer;
}

.nav-btn:hover {
  background-color: var(--bg-secondary);
}

.profile-btn {
  border: 1px solid var(--border-light);
  padding: 5px 5px 5px 12px;
  margin-left: 8px;
}

.profile-btn:hover {
  box-shadow: var(--shadow-sm);
  background-color: white;
}

/* Dropdowns */
.dropdown-menu {
    position: absolute;
    top: 100%;
    right: 0;
    margin-top: 8px;
    background: white;
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-md);
    border: 1px solid var(--border-light);
    padding: 8px 0;
    min-width: 240px;
    overflow: hidden;
}

.menu-item {
    padding: 12px 16px;
    font-size: 14px;
    color: var(--text-primary);
    cursor: pointer;
    transition: background-color 0.2s;
}

.menu-item:hover {
    background-color: var(--bg-secondary);
}

.menu-item.bold {
    font-weight: 600;
}

.menu-item.active {
    background-color: var(--bg-secondary);
    font-weight: 600;
}

.divider {
    height: 1px;
    background-color: var(--border-light);
    margin: 8px 0;
}
</style>
