"use client";

import { useCallback, useEffect, useState } from "react";
import { Task } from "@/types/task";
import { TaskFilters } from "@/types/task";
import { taskAPI} from "@/lib/taskAPI";

interface UseTasksOptions {
    userId?: string | null;
    filters: TaskFilters;
}

export function useTasks({filters}: UseTasksOptions) {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const refetch = useCallback(async () => {
        try {
            setIsLoading(true);
            const res = await taskAPI.tasks(filters);
            setTasks(res.data);
        } catch(err: any) {
            setError(err.message || "Failed to load tasks.")
        } finally {
            setIsLoading(false);
        }
    }, [filters]);

    useEffect(() => {
        refetch();
    }, [filters, refetch]);

    return {tasks, isLoading, error, refetch};
}