import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthState, User } from '../types';

interface AuthStore extends AuthState {
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
  setUser: (user: User | null, token: string | null) => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (email: string) => {
        try {
          set({ isLoading: true });
          
          // Simulate API call - in real app, this would be a POST request
          const response = await new Promise<{ user: User; token: string }>((resolve) => {
            setTimeout(() => {
              const mockUser: User = {
                id: crypto.randomUUID(),
                email,
                name: email.split('@')[0],
                createdAt: Date.now(),
              };
              const mockToken = btoa(JSON.stringify({ userId: mockUser.id, email: mockUser.email }));
              resolve({ user: mockUser, token: mockToken });
            }, 1000);
          });

          set({ 
            user: response.user, 
            token: response.token, 
            isAuthenticated: true,
            isLoading: false 
          });
          
          return true;
        } catch (error) {
          set({ isLoading: false });
          return false;
        }
      },

      register: async (email: string, password: string, name: string) => {
        try {
          set({ isLoading: true });
          
          // Simulate API call - in real app, this would be a POST request
          const response = await new Promise<{ user: User; token: string }>((resolve) => {
            setTimeout(() => {
              const mockUser: User = {
                id: crypto.randomUUID(),
                email,
                name,
                createdAt: Date.now(),
              };
              const mockToken = btoa(JSON.stringify({ userId: mockUser.id, email: mockUser.email }));
              resolve({ user: mockUser, token: mockToken });
            }, 1000);
          });

          set({ 
            user: response.user, 
            token: response.token, 
            isAuthenticated: true,
            isLoading: false 
          });
          
          return true;
        } catch (error) {
          set({ isLoading: false });
          return false;
        }
      },

      logout: () => {
        set({ 
          user: null, 
          token: null, 
          isAuthenticated: false 
        });
      },

      setUser: (user: User | null, token: string | null) => {
        set({ 
          user, 
          token, 
          isAuthenticated: !!user && !!token 
        });
      },

      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
