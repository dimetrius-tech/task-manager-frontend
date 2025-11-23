import {Droppable} from '@hello-pangea/dnd';
import { KanbanCard } from './KanbanCard';
import { Task } from '@/types/task';

export function KanbanColumn({
    droppableId,
    title,
    tasks,
}: {
    droppableId: string;
    title: string;
    tasks: Task[];
}) {
    return (
        <div className="w-full p-4 bg-gray-50 rounded-xl border">
            <h2 className="font-bold mb-4">{title}</h2>

            <Droppable droppableId={droppableId}>
                {(provided) => (
                    <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className="flex flex-col gap-3 min-h-10"
                    >
                        {tasks.map((task, index) => (
                            <KanbanCard key={task._id} task={task} index={index} />
                        ))}

                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div> 
    );
}