<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { mockService } from '../services/mockService.js'
import NavBar from '../components/NavBar.vue'

const route = useRoute()
const property = ref(null)
const reviews = ref([])
const loading = ref(true)
const bookingSuccess = ref(false)
const checkIn = ref('')
const checkOut = ref('')
const guests = ref(1)

onMounted(async () => {
    try {
        const [listingData, reviewsData] = await Promise.all([
            mockService.getListingById(route.params.id),
            mockService.getReviews(route.params.id)
        ])
        property.value = listingData
        reviews.value = reviewsData
    } catch (e) {
        console.error("Error loading property", e)
    } finally {
        loading.value = false
    }
})

const handleReserve = () => {
    bookingSuccess.value = true
    setTimeout(() => {
        bookingSuccess.value = false
        alert('Booking confirmed! Check your email for details.')
    }, 2000)
}

const alert = (msg) => window.alert(msg)
</script>

<template>
  <div class="property-view">
    <NavBar />

    <div v-if="loading" class="loading-state">
        Loading property details...
    </div>

    <main v-if="property" class="container">
      <!-- Title Header -->
      <section class="property-header">
        <h1>{{ property.title }}</h1>
        <div class="meta">
          <span class="rating">
            <i class="ph-fill ph-star"></i> {{ property.rating }}
          </span>
          <span class="dot">·</span>
          <span class="reviews">{{ property.reviews }} reviews</span>
          <span class="dot">·</span>
          <span class="location">{{ property.location }}</span>
        </div>
      </section>

      <!-- Image Gallery -->
      <section class="gallery-grid">
        <div class="main-image">
           <!-- Handle case where images might be missing in mock data, though our generator ensures them -->
          <img :src="property.images?.[0] || property.image" alt="Main view" />
        </div>
        <div class="sub-images">
          <img v-for="(img, index) in property.images?.slice(1, 5)" :key="index" :src="img" :alt="`View ${index + 2}`" />
        </div>
        <button class="show-all-btn" @click="alert('Gallery view coming soon!')">
            <i class="ph ph-squares-four"></i> Show all photos
        </button>
      </section>

      <div class="content-layout">
        <!-- Main Info -->
        <div class="property-info">
          <div class="host-info">
            <h2>{{ property.type }} hosted by {{ property.host }}</h2>
            <p>{{ property.guests }} guests · {{ property.bedrooms }} bedrooms · {{ property.beds }} beds · {{ property.baths }} baths</p>
          </div>
          
          <div class="divider"></div>
          
          <div class="features">
            <div class="feature-item">
               <i class="ph ph-door-open"></i>
               <div>
                 <h3>Self check-in</h3>
                 <p>Check yourself in with the keynote.</p>
               </div>
            </div>
             <div class="feature-item">
               <i class="ph ph-swimming-pool"></i>
               <div>
                 <h3>Great amenities</h3>
                 <p> Guests love the pool.</p>
               </div>
            </div>
          </div>

          <div class="divider"></div>

          <div class="description">
            <p>{{ property.description }}</p>
          </div>
          
          <div class="divider"></div>
          
          <div class="amenities">
            <h3>What this place offers</h3>
            <div class="amenity-grid">
               <div v-for="amenity in property.amenities" :key="amenity" class="amenity-item">
                   <i class="ph ph-check"></i> {{ amenity }}
               </div>
            </div>
          </div>
        </div>

        <!-- Booking Widget -->
        <div class="booking-sidebar">
          <div class="booking-card">
            <div class="card-header">
              <div class="price">
                <span class="amount">${{ property.price }}</span> <span class="unit">night</span>
              </div>
              <div class="rating-compact">
                 <i class="ph-fill ph-star"></i> {{ property.rating }} · {{ property.reviews }} reviews
              </div>
            </div>

            <div class="booking-form">
               <div class="dates">
                 <div class="date-input">
                   <label>CHECK-IN</label>
                   <input type="date" v-model="checkIn">
                 </div>
                 <div class="date-input border-left">
                   <label>CHECKOUT</label>
                   <input type="date" v-model="checkOut">
                 </div>
               </div>
               <div class="guests-input">
                 <label>GUESTS</label>
                 <input type="number" min="1" max="10" v-model="guests">
               </div>
            </div>

            <button class="reserve-btn" @click="handleReserve" :disabled="!checkIn || !checkOut">
                {{ bookingSuccess ? 'Confirmed!' : 'Reserve' }}
            </button>
            <p class="disclaimer">You won't be charged yet</p>
            
            <div class="price-breakdown">
              <div class="row">
                <span>${{ property.price }} x 5 nights</span>
                <span>${{ property.price * 5 }}</span>
              </div>
              <div class="row">
                <span>Cleaning fee</span>
                <span>$60</span>
              </div>
              <div class="row">
                <span>Service fee</span>
                <span>$80</span>
              </div>
              <div class="total-row">
                <span>Total</span>
                <span>${{ property.price * 5 + 140 }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
    
    <div v-else-if="!loading" class="error-state">
        <h2>Property not found</h2>
        <router-link to="/">Go back home</router-link>
    </div>
  </div>
</template>

<style scoped>
.property-view {
  min-height: 100vh;
  padding-bottom: 80px;
}

.container {
  max-width: 1120px;
  margin: 0 auto;
  padding: 24px 20px;
}

.loading-state, .error-state {
    padding: 100px;
    text-align: center;
    font-size: 20px;
}

.property-header {
  margin-bottom: 24px;
}

.property-header h1 {
  font-size: 26px;
  font-weight: 600;
  margin-bottom: 8px;
  color: var(--text-primary);
}

.meta {
  display: flex;
  align-items: center;
  font-size: 14px;
  color: var(--text-primary);
  font-weight: 500;
}

.meta i {
  color: var(--text-primary);
  margin-right: 4px;
}

.meta .location {
  color: var(--text-secondary);
  text-decoration: underline;
  margin-left: 4px;
}

.dot {
  margin: 0 8px;
}

/* Gallery */
.gallery-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 8px;
  border-radius: var(--radius-md);
  overflow: hidden;
  height: 480px; 
  margin-bottom: 48px;
  position: relative;
}

.main-image {
  height: 100%;
}

.sub-images {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 8px;
  height: 100%;
}

.gallery-grid img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: filter 0.2s;
  cursor: pointer;
}

.gallery-grid img:hover {
  filter: brightness(0.9);
}

.show-all-btn {
    position: absolute;
    bottom: 24px;
    right: 24px;
    background: white;
    border: 1px solid var(--text-primary);
    padding: 6px 16px;
    border-radius: var(--radius-sm);
    font-size: 14px;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 8px;
    box-shadow: var(--shadow-sm);
}

/* Content Layout */
.content-layout {
  display: grid;
  grid-template-columns: 1fr 370px; /* Sidebar width fixed */
  gap: 64px;
  position: relative;
}

.property-info {
  display: flex;
  flex-direction: column;
}

.host-info {
  padding-bottom: 24px;
}

.host-info h2 {
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 4px;
}

.host-info p {
  color: var(--text-secondary);
}

.divider {
  height: 1px;
  background-color: var(--border-light);
  margin: 32px 0;
}

.features {
    display: flex;
    flex-direction: column;
    gap: 24px;
}

.feature-item {
    display: flex;
    gap: 16px;
}

.feature-item i {
    font-size: 24px;
    color: var(--text-primary);
}

.feature-item h3 {
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 4px;
}

.feature-item p {
    color: var(--text-secondary);
    font-size: 14px;
}

.description {
    line-height: 1.6;
    color: var(--text-primary);
}

.amenity-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    margin-top: 16px;
}

.amenity-item {
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 16px;
}

/* Booking Widget */
.booking-sidebar {
    position: relative;
}

.booking-card {
    position: sticky;
    top: 120px; 
    border: 1px solid var(--border-light);
    border-radius: var(--radius-md);
    padding: 24px;
    box-shadow: var(--shadow-lg);
    background: white;
}

.card-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 24px;
}

.price .amount {
    font-size: 22px;
    font-weight: 600;
}

.rating-compact {
    font-size: 14px;
    display: flex;
    align-items: center;
    gap: 4px;
}

.booking-form {
    border: 1px solid var(--text-secondary);
    border-radius: var(--radius-sm);
    margin-bottom: 16px;
    overflow: hidden;
}

.dates {
    display: flex;
    border-bottom: 1px solid var(--text-secondary);
}

.date-input {
    flex: 1;
    padding: 10px 12px;
}

.date-input.border-left {
    border-left: 1px solid var(--text-secondary);
}

.date-input label, .guests-input label {
    font-size: 10px;
    font-weight: 700;
    display: block;
    margin-bottom: 2px;
}

.date-input input, .guests-input input {
    width: 100%;
    border: none;
    outline: none;
    font-size: 14px;
    color: var(--text-primary);
}

.guests-input {
    padding: 10px 12px;
}

.reserve-btn {
    width: 100%;
    background: var(--primary);
    color: white;
    padding: 14px;
    border-radius: var(--radius-sm);
    font-weight: 600;
    font-size: 16px;
    margin-bottom: 16px;
    transition: background-color 0.2s;
}

.reserve-btn:hover {
    background-color: var(--primary-hover);
}

.reserve-btn:disabled {
    background-color: #ccc;
    cursor: not-allowed;
}

.disclaimer {
    text-align: center;
    font-size: 14px;
    color: var(--text-secondary);
    margin-bottom: 24px;
}

.price-breakdown {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.row {
    display: flex;
    justify-content: space-between;
    color: var(--text-primary);
    text-decoration: underline;
    font-size: 16px;
}

.total-row {
    display: flex;
    justify-content: space-between;
    font-weight: 600;
    font-size: 16px;
    border-top: 1px solid var(--border-light);
    padding-top: 24px;
    margin-top: 12px;
}

@media (max-width: 900px) {
    .content-layout {
        grid-template-columns: 1fr;
    }
    
    .gallery-grid {
        height: 300px;
    }
}

/* Reviews */
.reviews-section h3 {
    margin-bottom: 24px;
    font-size: 20px;
}

.reviews-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 32px;
}

@media (max-width: 768px) {
    .reviews-grid {
        grid-template-columns: 1fr;
    }
}

.review-card {
    margin-bottom: 8px;
}

.review-header {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 12px;
}

.review-avatar {
    width: 40px;
    height: 40px;
    background: var(--text-primary);
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    font-size: 16px;
}

.review-meta {
    display: flex;
    flex-direction: column;
}

.review-user {
    font-weight: 600;
    font-size: 16px;
}

.review-date {
    font-size: 14px;
    color: var(--text-secondary);
}

.review-text {
    color: var(--text-primary);
    line-height: 1.5;
    font-size: 15px;
}
</style>
