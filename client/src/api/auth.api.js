import api from './axios.js';

export const AuthApi = {
  register: (data) => api.post('/auth/register', data).then((r) => r.data),
  login:    (data) => api.post('/auth/login', data).then((r) => r.data),
  logout:   ()     => api.post('/auth/logout').then((r) => r.data),
  me:       ()     => api.get('/auth/me').then((r) => r.data),
  update:   (data) => api.patch('/auth/update', data).then((r) => r.data),
  remove:   ()     => api.delete('/auth/remove').then((r) => r.data),
};