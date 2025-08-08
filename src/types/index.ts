export interface Link {
  id: string;
  url: string;
  title: string;
  content?: string;
  summary?: string;
  error?: string;
  createdAt: number;
  updatedAt: number;
  userId?: string;
}

export interface UserSettings {
  apiKey: string;
  theme: 'light' | 'dark';
}

export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: number;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
