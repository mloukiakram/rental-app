<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const location = ref('')
const checkIn = ref('')
const checkOut = ref('')
const guests = ref('')

const handleSearch = () => {
  const query = {}
  if (location.value) query.location = location.value
  if (checkIn.value) query.checkIn = checkIn.value
  if (checkOut.value) query.checkOut = checkOut.value
  if (guests.value) query.guests = guests.value

  router.push({ name: 'search', query })
}
</script>

<template>
  <div class="hero-search">
    <div class="search-bar">
      <div class="input-group">
        <label>Location</label>
        <input 
          type="text" 
          placeholder="Where are you going?" 
          v-model="location"
          @keyup.enter="handleSearch"
        />
      </div>
      <div class="divider-container"><div class="divider"></div></div>
      <div class="input-group">
        <label>Check in</label>
        <input 
          type="date" 
          placeholder="Add dates" 
          v-model="checkIn"
          class="date-input"
        />
      </div>
      <div class="divider-container"><div class="divider"></div></div>
      <div class="input-group">
        <label>Check out</label>
        <input 
          type="date" 
          placeholder="Add dates" 
          v-model="checkOut"
          class="date-input"
        />
      </div>
      <div class="divider-container"><div class="divider"></div></div>
      <div class="input-group">
        <label>Guests</label>
        <input 
          type="number" 
          min="1" 
          max="16" 
          placeholder="Add guests" 
          v-model="guests" 
          @keyup.enter="handleSearch"
        />
      </div>
      <button class="search-btn" @click="handleSearch">
        <i class="ph-bold ph-magnifying-glass"></i>
        <span>Search</span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.hero-search {
  display: flex;
  justify-content: center;
  padding: 24px 0;
}

.search-bar {
  display: flex;
  align-items: center;
  background: white;
  border: 1px solid var(--border-light);
  border-radius: 1000px; /* Full pill */
  padding: 0; /* Remove padding to handle hover effects per item */
  box-shadow: 0 3px 12px rgba(0,0,0,0.08); /* Better shadow */
  max-width: 850px;
  width: 100%;
  height: 66px;
  position: relative;
}

.input-group {
  flex: 1;
  padding: 14px 24px; /* Move padding here */
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 1000px;
  transition: background-color 0.2s;
  cursor: pointer;
  position: relative;
}

.input-group:hover {
  background-color: #EBEBEB; /* Darker hover like Airbnb */
  z-index: 2; /* Bring above divider */
}

/* Hide divider when sibling is hovered */
.input-group:hover + .divider-container,
.divider-container:has(+ .input-group:hover) {
    opacity: 0;
}

.input-group label {
  font-size: 12px;
  font-weight: 800;
  margin-bottom: 2px;
  display: block;
  letter-spacing: 0.5px;
}

.input-group input {
  width: 100%;
  border: none;
  background: transparent;
  outline: none;
  font-size: 14px;
  color: var(--text-primary);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-family: inherit;
}

/* Fix for date input height consistency */
.date-input {
  min-width: 110px;
}

/* Custom separator trick */
.divider-container {
    width: 1px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: opacity 0.1s;
}

.divider {
  width: 1px;
  height: 32px;
  background-color: var(--border-light);
}

.search-btn {
  background-color: var(--primary);
  color: white;
  width: 48px; 
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px; /* Spacing from right edge */
  padding: 0;
  transition: all 0.3s ease;
  font-size: 16px;
  flex-shrink: 0;
  position: relative;
  z-index: 10;
}

/* Expand on hover effect simulation for user delight */
.search-btn:hover {
  width: 100px;
  border-radius: 30px;
  background-color: var(--primary-hover);
  padding: 0 16px;
  gap: 8px;
}

.search-btn:hover span {
  display: inline-block;
}

.search-btn span {
  display: none;
  font-weight: 600;
  white-space: nowrap;
}

.date-input {
    font-family: inherit;
    min-width: 110px;
}
</style>
