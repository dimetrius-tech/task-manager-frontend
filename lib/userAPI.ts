import api from "./api";

export const userAPI = {
    uploadAvatar: async (file: File) => {
        const formData = new FormData();
        formData.append("avatar", file);
        await api.post('/users/avatar', formData, {
            requiresAuth: true,
            headers: {
                "Content-Type": "multipart/form-data",
            }
        })
    },
    list: async () => await api.get('/users/list', {requiresAuth: true}),
    updateProfile: async (name: string, email: string) => await api.patch("/users/update-profile", { name, email }, { requiresAuth: true }),
    changePassword: async (oldPassword: string, newPassword: string) => await api.patch("/users/change-password", { oldPassword, newPassword }, { requiresAuth: true }),
    delete: async () => await api.delete('/users/delete', { requiresAuth: true })
}