"use client";

import { useState } from "react";
import { Task, TaskFilters, TaskStatus } from "@/types/task";
import { TaskModal } from "@/components/tasks/TaskModal";
import { taskAPI } from "@/lib/taskAPI";
import { KanbanBoard } from "@/components/kanban/KanbanBoard";
import { TasksActionBar } from "@/components/tasks/TasksActionBar";
import { useTasks } from "@/hooks/useTasks";
import Loading from "@/components/ui/Loading";


export default function TaskPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTask, setEditingTask] = useState<Task | null>(null);
    const [filters, setFilters] = useState<TaskFilters>({
        status: [],
        priority: [],
        myTasksOnly: false,
    });
    const {tasks, isLoading, error, refetch} = useTasks({filters});

    const handleCreateNew = () => {
        setEditingTask(null);
        setIsModalOpen(true);
    };
    const handleModalSuccess = () => {
        refetch();
    }
    const onTaskMove = async (taskId: string, newStatus: string, newIndex: number) => {
        await taskAPI.update(taskId, {
            status: newStatus as TaskStatus
        });

        refetch();
    }
    return (
        <div className="p-10 space-y-6">
            <TasksActionBar
                onCreateTask={handleCreateNew}
                filters={filters}
                onFilterChange={setFilters}
                onClearFilters={() => setFilters({status: [], priority: []})}
            />
            {isLoading && <Loading message="Fetching tasks..." size={32} />}
            {error && <p className="text-red-500">{error}</p>}
            <KanbanBoard tasks={tasks} onTaskMove={onTaskMove} />
            <TaskModal
                open={isModalOpen}
                onOpenChange={setIsModalOpen}
                initialValues={editingTask}
                onSuccess={handleModalSuccess}
            />
        </div>
    )
}