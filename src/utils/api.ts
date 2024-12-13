import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = async (email: string, password: string) => {
  const response = await api.post('/auth/login', { email, password });
  return response.data;
};

export const signup = async (name: string, email: string, password: string, accountType: string) => {
  const response = await api.post('/auth/signup', { name, email, password, accountType });
  return response.data;
};

export const updateProfile = async (userId: string, data: any) => {
  const response = await api.put(`/users/${userId}`, data);
  return response.data;
};

export const fetchGigs = async (search?: string) => {
  const response = await api.get('/gigs', { params: { search } });
  return response.data;
};

export const fetchCourses = async (search?: string) => {
  const response = await api.get('/courses', { params: { search } });
  return response.data;
};

export const createGig = async (data: any) => {
  const response = await api.post('/gigs', data);
  return response.data;
};

export const createCourse = async (data: any) => {
  const response = await api.post('/courses', data);
  return response.data;
};

export default api;

