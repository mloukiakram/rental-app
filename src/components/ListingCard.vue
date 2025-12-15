<script setup>
defineProps({
  listing: {
    type: Object,
    required: true
  }
})

import { useRouter } from 'vue-router'
import { ref } from 'vue'

const router = useRouter()
const isFavorite = ref(false)

const toggleFavorite = () => {
    isFavorite.value = !isFavorite.value
}
</script>

<template>
  <div class="listing-card" @click="router.push({ name: 'property-details', params: { id: listing.id } })">
    <div class="image-container">
      <img :src="listing.image" :alt="listing.title" loading="lazy" />
      <button class="favorite-btn" @click.stop="toggleFavorite">
        <i :class="isFavorite ? 'ph-fill ph-heart' : 'ph ph-heart'" :style="{ color: isFavorite ? 'var(--primary)' : 'inherit' }"></i>
      </button>
    </div>
    
    <div class="details">
      <div class="header">
        <h3 class="title">{{ listing.title }}</h3>
        <div class="rating">
          <i class="ph-fill ph-star"></i>
          <span>{{ listing.rating }}</span>
        </div>
      </div>
      <p class="location">{{ listing.location }}</p>
      <div class="price">
        <span class="amount">${{ listing.price }}</span>
        <span class="unit"> night</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.listing-card {
  display: flex;
  flex-direction: column;
  gap: 12px;
  cursor: pointer;
}

.image-container {
  position: relative;
  aspect-ratio: 4/3;
  border-radius: var(--radius-md);
  overflow: hidden;
  background-color: var(--bg-secondary);
}

.image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}

.listing-card:hover .image-container img {
  transform: scale(1.05); /* Subtle zoom effect */
}

.favorite-btn {
  position: absolute;
  top: 12px;
  right: 12px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  transition: transform 0.2s;
}

.favorite-btn:hover {
  transform: scale(1.1);
}

.details {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.title {
  font-size: 16px;
  font-weight: 600;
  color: var(--text-primary);
}

.rating {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
}

.location {
  color: var(--text-secondary);
  font-size: 14px;
}

.price {
  margin-top: 4px;
  font-size: 16px;
}

.amount {
  font-weight: 700;
}

.unit {
  color: var(--text-secondary);
  font-weight: 400;
}
</style>
