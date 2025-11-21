"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Edit, Trash2 } from "lucide-react";
import { Task } from "@/types/task";
import { TaskModal } from "@/components/tasks/TaskModal";
import { Button } from "@/components/ui/button";
import { taskAPI } from "@/lib/taskAPI";


export default function TaskPage() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTask, setEditingTask] = useState<Task | null>(null);

    const fetchTasks = async () => {
        const res = await taskAPI.tasks();
        setTasks(res.data);
    };
    const handleDelete = async (id: string) => {
        await taskAPI.delete(id);
        fetchTasks();
    }

    useEffect(() => {
        fetchTasks();
    }, []);

    const handleCreateNew = () => {
        setEditingTask(null);
        setIsModalOpen(true);
    };
    const handleEdit = (task: Task) => {
        setEditingTask(task);
        setIsModalOpen(true);
    };
    const handleModalSuccess = () => {
        fetchTasks();
    }
    return (
        <div className="p-10 space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">Your Tasks</h1>
                <Button onClick={handleCreateNew}>Create Task</Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {tasks.map((t) => (
                    <Card key={t._id} className="relative">
                        <div className="absolute top-3 right-3 flex gap-2">
                            <button
                                className="p-1 rounded-md hover:bg-muted transition"
                                onClick={() => handleEdit(t)}
                            >
                                <Edit size={18} />
                            </button>
                            <button
                                className="p-1 rounded-md hover:bg-muted transition"
                                onClick={() => handleDelete(t._id)}
                            >
                                <Trash2 size={18} className="text-red-500" />
                            </button>
                        </div>

                        <CardHeader>
                            <CardTitle>{t.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>Priority: {t.priority}</p>
                            <p>Status: {t.status}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <TaskModal
                open={isModalOpen}
                onOpenChange={setIsModalOpen}
                initialValues={editingTask}
                onSuccess={handleModalSuccess}
            />
        </div>
    )
}