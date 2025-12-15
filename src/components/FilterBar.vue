<script setup>
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const emit = defineEmits(['update'])

// State for active boolean filters
const activeAmenities = ref(new Set())

// State for complex filters
const showTypeMenu = ref(false)
const showPriceMenu = ref(false)
const selectedType = ref('Any')
const selectedPrice = ref(Infinity) // Represents 'Any' max price

const toggleAmenity = (amenity) => {
    if (activeAmenities.value.has(amenity)) {
        activeAmenities.value.delete(amenity)
    } else {
        activeAmenities.value.add(amenity)
    }
    emitFilters()
}

const setType = (type) => {
    selectedType.value = type
    showTypeMenu.value = false
    emitFilters()
}

const setPrice = (price) => {
    selectedPrice.value = price
    showPriceMenu.value = false
    emitFilters()
}

const emitFilters = () => {
    // Map visual chips to API params
    const amenities = []
    if (activeAmenities.value.has('Wifi')) amenities.push('Wifi')
    if (activeAmenities.value.has('Pool')) amenities.push('Pool')
    
    emit('update', { 
        amenities,
        type: selectedType.value === 'Any' ? null : selectedType.value,
        priceMax: selectedPrice.value === Infinity ? null : selectedPrice.value
    })
}

// Helper to close menus (could use click-outside directive in real app)
const closeMenus = () => {
    showTypeMenu.value = false
    showPriceMenu.value = false
}
</script>

<template>
  <div class="filter-bar">
    <div class="search-summary" v-if="route.name === 'search'">
      <div class="search-pill">
        <span class="location">{{ route.query.location || 'Anywhere' }}</span>
        <span class="divider">•</span>
        <span class="dates">{{ route.query.checkIn ? `${route.query.checkIn} - ${route.query.checkOut}` : 'Any week' }}</span>
        <span class="divider">•</span>
        <span class="guests">{{ route.query.guests ? `${route.query.guests} guests` : 'Add guests' }}</span>
        <button class="search-icon-btn">
          <i class="ph-bold ph-magnifying-glass"></i>
        </button>
      </div>
    </div>
    
    <div class="filters">
      <button class="filter-btn">
        <i class="ph ph-sliders-horizontal"></i>
        Filters
      </button>

      <!-- Price Filter -->
      <div class="filter-container">
          <button 
            class="filter-chip" 
            :class="{ active: selectedPrice !== Infinity, open: showPriceMenu }"
            @click="showPriceMenu = !showPriceMenu; showTypeMenu = false"
          >
            {{ selectedPrice !== Infinity ? `Up to $${selectedPrice}` : 'Price' }}
            <i class="ph-bold ph-caret-down" v-if="showPriceMenu"></i>
          </button>
          
          <div v-if="showPriceMenu" class="dropdown-menu">
            <div class="menu-item" @click="setPrice(Infinity)">Any price</div>
            <div class="menu-item" @click="setPrice(100)">Up to $100</div>
            <div class="menu-item" @click="setPrice(200)">Up to $200</div>
            <div class="menu-item" @click="setPrice(300)">Up to $300</div>
            <div class="menu-item" @click="setPrice(400)">Up to $400</div>
            <div class="menu-item" @click="setPrice(500)">Up to $500</div>
          </div>
      </div>

      <!-- Type Filter -->
      <div class="filter-container">
          <button 
            class="filter-chip"
            :class="{ active: selectedType !== 'Any', open: showTypeMenu }"
             @click="showTypeMenu = !showTypeMenu; showPriceMenu = false"
          >
            {{ selectedType !== 'Any' ? selectedType : 'Type of place' }}
            <i class="ph-bold ph-caret-down" v-if="showTypeMenu"></i>
          </button>
          
          <div v-if="showTypeMenu" class="dropdown-menu">
            <div class="menu-item" @click="setType('Any')">Any type</div>
            <div class="menu-item" @click="setType('Apartment')">Apartment</div>
            <div class="menu-item" @click="setType('House')">House</div>
            <div class="menu-item" @click="setType('Villa')">Villa</div>
            <div class="menu-item" @click="setType('Loft')">Loft</div>
            <div class="menu-item" @click="setType('Cottage')">Cottage</div>
           </div>
      </div>

       <button 
        class="filter-chip"
        :class="{ active: activeAmenities.has('Wifi') }"
        @click="toggleAmenity('Wifi')"
      >
        Wifi
      </button>
       <button 
        class="filter-chip"
        :class="{ active: activeAmenities.has('Pool') }"
        @click="toggleAmenity('Pool')"
      >
        Pool
      </button>
    </div>
    
    <!-- Backdrop for menus -->
    <div v-if="showPriceMenu || showTypeMenu" class="menu-backdrop" @click="closeMenus"></div>
  </div>
</template>

<style scoped>
.filter-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  border-bottom: 1px solid var(--border-light);
  background: white;
  position: sticky;
  top: 0;
  z-index: 10;
  gap: 24px;
}

.search-summary {
  flex-shrink: 0;
}

.search-pill {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 8px 8px 16px;
  border: 1px solid var(--border-light);
  border-radius: var(--radius-pill);
  box-shadow: var(--shadow-sm);
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: box-shadow 0.2s;
  white-space: nowrap;
}

.search-pill:hover {
  box-shadow: var(--shadow-md);
}

.search-icon-btn {
  background-color: var(--primary);
  color: white;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.divider {
  color: var(--text-secondary);
}

.filters {
  display: flex;
  gap: 12px;
  overflow-x: auto;
  padding-bottom: 4px; /* Scrollbar space */
  scrollbar-width: none;
}

.filter-container {
    position: relative;
}

.filter-btn, .filter-chip {
  padding: 8px 16px;
  border: 1px solid var(--border-light);
  border-radius: var(--radius-pill);
  background: white;
  color: var(--text-primary);
  font-size: 14px;
  transition: all 0.2s;
  cursor: pointer;
  white-space: nowrap;
  display: flex;
  align-items: center;
  gap: 6px;
}

.filter-btn {
  display: flex;
  align-items: center;
  gap: 8px;
}

.filter-btn:hover, .filter-chip:hover {
  border-color: var(--text-primary);
}

.filter-chip.active, .filter-chip.open {
  background-color: var(--bg-secondary);
  border-color: var(--text-primary);
  border-width: 2px;
  padding: 7px 15px; 
}

/* Dropdown Styles */
.dropdown-menu {
    position: absolute;
    top: 100%;
    left: 0;
    margin-top: 8px;
    background: white;
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-lg);
    border: 1px solid var(--border-light);
    padding: 8px 0;
    min-width: 180px;
    z-index: 100;
}

.menu-item {
    padding: 10px 16px;
    font-size: 14px;
    cursor: pointer;
}

.menu-item:hover {
    background: var(--bg-secondary);
}

.menu-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 5;
    background: transparent;
}
</style>
