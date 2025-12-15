import { ref } from 'vue'

const user = ref(null)

export function useAuth() {
    const login = (name = 'Akram User') => {
        user.value = {
            name,
            avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80',
            email: 'user@example.com'
        }
    }

    const logout = () => {
        user.value = null
    }

    return {
        user,
        login,
        logout
    }
}
