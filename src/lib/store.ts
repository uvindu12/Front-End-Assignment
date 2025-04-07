import { create } from "zustand"
import { persist } from "zustand/middleware"

interface AuthState {
  isAuthenticated: boolean
  user: string | null
  login: (email: string, remember: boolean) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      login: (email, remember) => {
        set({ isAuthenticated: true, user: email })
      },
      logout: () => {
        set({ isAuthenticated: false, user: null })
      },
    }),
    {
      name: "auth-storage",
      // Only persist if remember is true
      partialize: (state) => {
        // If the user is not authenticated, don't persist anything
        if (!state.isAuthenticated) {
          return {}
        }
        return {
          isAuthenticated: state.isAuthenticated,
          user: state.user,
        }
      },
    },
  ),
)

