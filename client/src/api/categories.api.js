import api from './axios.js';

export const CategoriesApi = {
  list:   ()           => api.get('/categories').then((r) => r.data),
  get:    (id)         => api.get(`/categories/${id}`).then((r) => r.data),
  create: (data)       => api.post('/categories', data).then((r) => r.data),
  update: (id, data)   => api.patch(`/categories/${id}`, data).then((r) => r.data),
  remove: (id)         => api.delete(`/categories/${id}`).then((r) => r.data),
};