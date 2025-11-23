import {Task} from '@/types/task';
import { Card } from '../ui/card';
import { Draggable } from '@hello-pangea/dnd';

export function KanbanCard({
        task,
        index
    }: {
        task: Task,
         index: number
    }) {
    return (
        <Draggable draggableId={task._id} index={index}>
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    <Card className="p-4 bg-white shadow-sm rounded-lg cursor-grab active:cursor-grabbing">
                        <h3 className="font-semibold">{task.title}</h3>
                        {task.dueDate && (
                            <p className="text-sm text-gray-500 mt-1">
                                Due: {new Date(task.dueDate).toLocaleDateString()}
                            </p>
                        )}
                    </Card>
                </div>
            )}
        </Draggable>
    )
}