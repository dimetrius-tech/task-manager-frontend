import { TaskPayload } from '@/types/task';
import api from './api';

export const taskAPI = {
    tasks: async () => await api.get('/tasks', { requiresAuth: true }),
    create: async (payload: TaskPayload) => await api.post("/tasks", payload, { requiresAuth: true }),
    update: async (id: string, payload: TaskPayload) => await api.put(`/tasks/${id}`, payload, { requiresAuth: true }),
    delete: async (id: string) => await api.delete(`/tasks/${id}`, {requiresAuth: true})
}