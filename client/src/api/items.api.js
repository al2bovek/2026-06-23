import api from './axios.js';

export const ItemsApi = {
  list:   (params)     => api.get('/items', { params }).then((r) => r.data),
  get:    (id)         => api.get(`/items/${id}`).then((r) => r.data),
  create: (data)       => api.post('/items', data).then((r) => r.data),
  update: (id, data)   => api.patch(`/items/${id}`, data).then((r) => r.data),
  remove: (id)         => api.delete(`/items/${id}`).then((r) => r.data),
};