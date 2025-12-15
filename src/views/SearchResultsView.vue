<script setup>
import { ref, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { mockService } from '../services/mockService.js'
import NavBar from '../components/NavBar.vue'
import FilterBar from '../components/FilterBar.vue'
import ListingCard from '../components/ListingCard.vue'
import MapWidget from '../components/MapWidget.vue'

const route = useRoute()
const listings = ref([])
const loading = ref(false)

const fetchListings = async () => {
    loading.value = true
    try {
        const params = {
            ...route.query,
            // Add any other filter state params here
        }
        listings.value = await mockService.searchListings(params)
    } finally {
        loading.value = false
    }
}

// Initial fetch
onMounted(fetchListings)

// Watch for route changes to refetch (e.g. from HeroSearch or Filters)
watch(() => route.query, fetchListings)

// Handle filter events from FilterBar
const handleFilterUpdate = (filters) => {
    // Refetch with new filters mixed with existing query
    const params = {
        ...route.query,
        ...filters
    }
    // We update listings directly for smoother feel without changing URL for every chip toggle if preferred
    // or push to router. Let's direct fetch for speed.
    loading.value = true
    mockService.searchListings(params).then(res => {
        listings.value = res
        loading.value = false
    })
}

</script>

<template>
  <div class="search-view">
    <NavBar />
    <FilterBar @update="handleFilterUpdate" />
    
    <div class="content">
      <div class="listings-section">
        <div class="listings-header">
           <p class="count">{{ listings.length }} stays {{ route.query.location ? `in ${route.query.location}` : '' }}</p>
           <h1 class="page-title">Stays selected for you</h1>
        </div>

        <div v-if="loading" class="loading-state">
            Loading stays...
        </div>
        
        <div v-else-if="listings.length === 0" class="empty-state">
            <h3>No results found</h3>
            <p>Try adjusting your search filters.</p>
        </div>

        <div v-else class="listings-grid">
          <ListingCard 
            v-for="listing in listings" 
            :key="listing.id"
            :listing="listing"
          />
        </div>
      </div>
      
      <div class="map-section">
        <!-- Pass listings to map to show pins -->
        <MapWidget :listings="listings" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.search-view {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.content {
  flex: 1;
  display: flex;
  overflow: hidden;
}

.listings-section {
  flex: 1; 
  min-width: 0;
  overflow-y: auto;
  padding: 24px;
}

.map-section {
  flex: 0 0 45%; 
  display: none; 
}

@media (min-width: 900px) {
  .map-section {
    display: block;
  }
}

.listings-header {
  margin-bottom: 24px;
}

.count {
  font-size: 14px;
  color: var(--text-primary);
  margin-bottom: 8px;
}

.page-title {
  font-size: 24px;
  font-weight: 700;
}

.listings-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
}

.loading-state, .empty-state {
    padding: 40px;
    text-align: center;
    color: var(--text-secondary);
}
</style>
