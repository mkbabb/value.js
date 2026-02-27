import { ref, computed, type Ref } from "vue";

const STORAGE_KEY = "palette-admin-token";

let _adminToken: Ref<string | null> | null = null;

function getAdminToken(): Ref<string | null> {
    if (!_adminToken) {
        try {
            _adminToken = ref<string | null>(localStorage.getItem(STORAGE_KEY));
        } catch {
            _adminToken = ref<string | null>(null);
        }
    }
    return _adminToken;
}

export function useAdminAuth() {
    const adminToken = getAdminToken();
    const isAuthenticated = computed(() => !!adminToken.value);

    function login(token: string) {
        adminToken.value = token;
        try {
            localStorage.setItem(STORAGE_KEY, token);
        } catch {
            // Safari private browsing
        }
    }

    function logout() {
        adminToken.value = null;
        try {
            localStorage.removeItem(STORAGE_KEY);
        } catch {
            // Safari private browsing
        }
    }

    function getToken(): string | null {
        return adminToken.value;
    }

    return { isAuthenticated, login, logout, getToken };
}
