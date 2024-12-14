import axios from 'axios';
import { sampleUsers, sampleGigs, sampleCourses } from './sampleData';
/* eslint-disable @typescript-eslint/no-explicit-any */
const api = axios.create({
  baseURL: 'https://fileish.com/artc/api',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = async (email: string, password: string) => {
  // Simulating API call
  await new Promise(resolve => setTimeout(resolve, 500));
  const user = sampleUsers.find(u => u.email === email && u.password === password);
  if (user) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = user;
    return { token: 'sample_token', user: userWithoutPassword };
  }
  throw new Error('Invalid credentials');
};

export const signup = async (name: string, email: string, password: string, accountType: string) => {
  // Simulating API call
  await new Promise(resolve => setTimeout(resolve, 500));
  const newUser = {
    id: (sampleUsers.length + 1).toString(),
    name,
    email,
    password,
    accountType,
    bio: '',
    company: '',
    avatar: `https://i.pravatar.cc/150?img=${sampleUsers.length + 1}`
  };
  sampleUsers.push(newUser);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password: _, ...userWithoutPassword } = newUser;
  return { token: 'sample_token', user: userWithoutPassword };
};

export const updateProfile = async (userId: string, data: any) => {
  // Simulating API call
  await new Promise(resolve => setTimeout(resolve, 500));
  const userIndex = sampleUsers.findIndex(u => u.id === userId);
  if (userIndex !== -1) {
    sampleUsers[userIndex] = { ...sampleUsers[userIndex], ...data };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = sampleUsers[userIndex];
    return userWithoutPassword;
  }
  throw new Error('User not found');
};

export const fetchGigs = async (search?: string) => {
  // Simulating API call
  await new Promise(resolve => setTimeout(resolve, 500));
  if (search) {
    return sampleGigs.filter(gig => 
      gig.title.toLowerCase().includes(search.toLowerCase()) || 
      gig.description.toLowerCase().includes(search.toLowerCase())
    );
  }
  return sampleGigs;
};

export const fetchCourses = async (search?: string) => {
  // Simulating API call
  await new Promise(resolve => setTimeout(resolve, 500));
  if (search) {
    return sampleCourses.filter(course => 
      course.title.toLowerCase().includes(search.toLowerCase()) || 
      course.description.toLowerCase().includes(search.toLowerCase())
    );
  }
  return sampleCourses;
};

export const createGig = async (data: any) => {
  // Simulating API call
  await new Promise(resolve => setTimeout(resolve, 500));
  const newGig = {
    id: (sampleGigs.length + 1).toString(),
    ...data,
    user: { id: data.userId, name: sampleUsers.find(u => u.id === data.userId)?.name || 'Unknown' }
  };
  sampleGigs.push(newGig);
  return newGig;
};

export const createCourse = async (data: any) => {
  // Simulating API call
  await new Promise(resolve => setTimeout(resolve, 500));
  const newCourse = {
    id: (sampleCourses.length + 1).toString(),
    ...data,
    user: { id: data.userId, name: sampleUsers.find(u => u.id === data.userId)?.name || 'Unknown' }
  };
  sampleCourses.push(newCourse);
  return newCourse;
};

export const checkSession = async () => {
  // Simulating API call
  await new Promise(resolve => setTimeout(resolve, 500));
  const userId = localStorage.getItem('userId');
  if (userId) {
    const user = sampleUsers.find(u => u.id === userId);
    if (user) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...userWithoutPassword } = user;
      return { user: userWithoutPassword };
    }
  }
  throw new Error('No active session');
};

export const fetchGigById = async (id: string) => {
  // Simulating API call
  await new Promise(resolve => setTimeout(resolve, 500));
  const gig = sampleGigs.find(g => g.id === id);
  if (!gig) throw new Error('Gig not found');
  return gig;
};

export const fetchCourseById = async (id: string) => {
  // Simulating API call
  await new Promise(resolve => setTimeout(resolve, 500));
  const course = sampleCourses.find(c => c.id === id);
  if (!course) throw new Error('Course not found');
  return course;
};

export default api;

