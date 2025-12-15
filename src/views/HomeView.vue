<script setup>
import NavBar from '../components/NavBar.vue'
import HeroSearch from '../components/HeroSearch.vue'
</script>

<template>
  <div class="home-view">
    <NavBar />
    
    <main class="hero-section">
      <div class="hero-content">
        <h1 class="hero-title">Find Your Next Getaway</h1>
        <p class="hero-subtitle">Discover unique homes and experiences matching your lifestyle.</p>
        
        <div class="search-container">
          <HeroSearch />
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
.home-view {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: var(--bg-primary);
}

.hero-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding-top: 140px; /* More space for background visibility */
  background-image: url('../assets/hero-bg.png');
  background-size: cover;
  background-position: center;
  position: relative;
  /* Blur/Fade effect at bottom */
  mask-image: linear-gradient(to bottom, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%);
  -webkit-mask-image: linear-gradient(to bottom, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%);
}

.hero-content {
  text-align: center;
  padding: 40px 20px;
  max-width: 1000px;
  margin: 0 auto;
  width: 100%;
  z-index: 1; /* Ensure content is above any overlays */
}

.hero-title {
  font-size: 56px;
  font-weight: 800;
  margin-bottom: 24px;
  color: white; /* White text on background */
  text-shadow: 0 2px 10px rgba(0,0,0,0.3);
  letter-spacing: -1px;
}

.hero-subtitle {
  font-size: 20px;
  color: white;
  margin-bottom: 64px;
  text-shadow: 0 1px 4px rgba(0,0,0,0.3);
  font-weight: 500;
}

.search-container {
  width: 100%;
}
</style>
