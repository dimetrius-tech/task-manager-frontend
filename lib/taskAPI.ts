import { TaskFilters, TaskPayload } from '@/types/task';
import api from './api';

export const taskAPI = {
    tasks: async (filters: TaskFilters) => {
        const params = new URLSearchParams();
        filters.status.forEach((s) => params.append("status", s));
        filters.priority.forEach((p) => params.append("priority", p));
        if (typeof filters.myTasksOnly === "boolean" && filters.myTasksOnly) {
            params.append("myTasksOnly", String(filters.myTasksOnly));
        }
        return await api.get(`/tasks?${params.toString()}`, { requiresAuth: true })
    },
    create: async (payload: TaskPayload) => await api.post("/tasks", payload, { requiresAuth: true }),
    update: async (id: string, payload: TaskPayload) => await api.put(`/tasks/${id}`, payload, { requiresAuth: true }),
    delete: async (id: string) => await api.delete(`/tasks/${id}`, {requiresAuth: true})
}