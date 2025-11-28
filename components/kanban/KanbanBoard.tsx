"use client";

import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { KanbanColumn } from "./KanbanColumn";
import { Task } from "@/types/task";

export function KanbanBoard ({
    tasks,
    onTaskMove,
}: {
    tasks: Task[],
    onTaskMove: (taskId: string, newStatus: string, newIndex: number) => void;
}) {
    const grouped = {
        pending: tasks.filter((t) => t.status === 'pending'),
        in_progress: tasks.filter((t) => t.status === 'in-progress'),
        completed: tasks.filter((t) => t.status === 'completed'),
    };

    const handleDragEnd = (result: DropResult) => {
        if(!result.destination) return;

        const taskId = result.draggableId;
        const newStatus = result.destination.droppableId;
        const newIndex = result.destination.index;
        onTaskMove(taskId, newStatus, newIndex);
    };

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <div className="flex gap-6">
                <KanbanColumn title="Pending" droppableId="pending" tasks={grouped.pending} />
                <KanbanColumn
                    title="In Progress"
                    droppableId="in-progress"
                    tasks={grouped.in_progress}
                />
                <KanbanColumn title="Completed" droppableId="completed" tasks={grouped.completed} />
            </div>
        </DragDropContext>
    )
}