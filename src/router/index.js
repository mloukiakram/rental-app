import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SearchResultsView from '../views/SearchResultsView.vue'
import PropertyDetailsView from '../views/PropertyDetailsView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/search',
            name: 'search',
            component: SearchResultsView
        },
        {
            path: '/rooms/:id',
            name: 'property-details',
            component: PropertyDetailsView
        }
    ]
})

export default router
