export type TaskPriority = "low" | "medium" | "high";
export type TaskStatus = "pending" | "in-progress" | "completed";

export interface Task {
    _id: string;
    title: string;
    priority: TaskPriority;
    status: TaskStatus;
    assignee: string;
    author: string;
    dueDate: Date;
}

export interface TaskPayload {
    title?: string;
    priority?: TaskPriority;
    status: TaskStatus;
    dueDate?: Date;
    assignee?: string;
}