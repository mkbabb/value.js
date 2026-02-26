import { ref, computed } from "vue";

const STORAGE_KEY = "palette-admin-token";

const adminToken = ref<string | null>(localStorage.getItem(STORAGE_KEY));

export function useAdminAuth() {
    const isAuthenticated = computed(() => !!adminToken.value);

    function login(token: string) {
        adminToken.value = token;
        localStorage.setItem(STORAGE_KEY, token);
    }

    function logout() {
        adminToken.value = null;
        localStorage.removeItem(STORAGE_KEY);
    }

    function getToken(): string | null {
        return adminToken.value;
    }

    return { isAuthenticated, login, logout, getToken };
}
