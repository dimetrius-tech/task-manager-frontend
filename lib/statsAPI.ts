import api from './api';

export const statsAPI = {
    totals: async () => await api.get('/stats/tasks', { requiresAuth: true })
}