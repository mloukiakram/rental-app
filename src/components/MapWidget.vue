<script setup>
import { onMounted, watch, ref, onBeforeUnmount } from 'vue'
import L from 'leaflet'

const props = defineProps({
    listings: {
        type: Array,
        default: () => []
    }
})

const mapContainer = ref(null)
let map = null
let markers = []

const initMap = () => {
    if (!mapContainer.value) return

    // Center on Madrid by default
    map = L.map(mapContainer.value).setView([40.4168, -3.7038], 13)

    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 20
    }).addTo(map)
    
    updateMarkers()
}

const updateMarkers = () => {
    // Clear existing markers
    markers.forEach(marker => map.removeLayer(marker))
    markers = []

    props.listings.forEach(listing => {
        // Create custom price marker
        const icon = L.divIcon({
            className: 'custom-pin-container',
            html: `<div class="price-pin">$${listing.price}</div>`
        })

        const marker = L.marker([listing.coordinates.lat, listing.coordinates.lng], { icon })
            .addTo(map)
            .bindPopup(`
                <div class="map-popup">
                    <img src="${listing.image}" style="width:100%; height:100px; object-fit:cover; border-radius:8px; margin-bottom:8px;">
                    <div><strong>${listing.title}</strong></div>
                    <div>$${listing.price} / night</div>
                </div>
            `)
        
        markers.push(marker)
    })

    // Adjust bounds if we have listings
    if (markers.length > 0) {
        const group = new L.featureGroup(markers)
        map.fitBounds(group.getBounds(), { padding: [50, 50] })
    }
}

watch(() => props.listings, () => {
    if (map) updateMarkers()
}, { deep: true })

onMounted(() => {
    initMap()
})

onBeforeUnmount(() => {
    if (map) {
        map.remove()
        map = null
    }
})
</script>

<template>
  <div ref="mapContainer" class="map-widget"></div>
</template>

<style>
/* Global styles for Leaflet custom markers */
.custom-pin-container {
    background: transparent;
    border: none;
}

.price-pin {
    background-color: white;
    padding: 4px 8px;
    border-radius: 24px;
    font-weight: 700;
    font-size: 14px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.18);
    display: inline-block;
    transition: transform 0.2s, background-color 0.2s, color 0.2s;
    text-align: center;
    white-space: nowrap;
    transform: translate(-50%, -50%); /* Center pin */
    cursor: pointer;
}

.price-pin:hover {
    transform: translate(-50%, -50%) scale(1.1);
    background-color: #222222; /* --text-primary */
    color: white;
    z-index: 100 !important;
}

.map-widget {
  width: 100%;
  height: 100%;
  z-index: 1; /* Ensure map is below fixed filtering bars usually */
}
</style>
