"use client";

import {useState} from 'react';
import { Button } from '../ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import {Checkbox}  from '../ui/checkbox';
import { Separator } from '../ui/separator';
import { TaskFilters, TaskPriority, TaskStatus } from '@/types/task';
import {Plus, SlidersHorizontal} from "lucide-react";
import { Switch } from '../ui/switch';

interface TasksActionBarProps {
    onCreateTask: () => void;
    filters: TaskFilters;
    onFilterChange: (filters: TaskFilters) => void;
    onClearFilters: () => void;
}

export function TasksActionBar({
    onCreateTask,
    filters,
    onFilterChange,
    onClearFilters,
}: TasksActionBarProps) {
    const [open, setOpen] = useState(false);

    const allStatuses: TaskStatus[] = ["pending", "in-progress", "completed"];
    const allPriorities: TaskPriority[] = ["low", "medium", "high"];

    const toggleStatus = (status: TaskStatus) => {
        const updated = filters.status.includes(status)
        ? filters.status.filter((s) => s !== status)
        : [...filters.status, status];

        onFilterChange({...filters, status: updated});
    };

    const togglePriority = (priority: TaskPriority) => {
        const updated = filters.priority.includes(priority)
        ? filters.priority.filter((p) => p !== priority)
        : [...filters.priority, priority];

        onFilterChange({...filters, priority: updated});
    };

    const toggleMyTasksOnly = (checked: boolean) => {
        onFilterChange({
            ...filters,
            myTasksOnly: checked
        });
    };

    return (
        <div className="flex items-center justify-between mb-6">
            {/* Left side: Title / could add search input here */}
            <h1 className="text-2xl font-semibold">Your Tasks</h1>

            {/* Right side buttons */}
            <div className="flex items-center gap-3">
                {/* Filter Button */}
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Button variant="outline" className="flex gap-2">
                            <SlidersHorizontal className="h-4 w-4" />
                        </Button>
                    </PopoverTrigger>

                    <PopoverContent className="w-64" align="end">
                        <div className="space-y-4 my-1">
                            <h4 className="text-sm font-semibold mb-2">My tasks only</h4>
                            <Switch
                                id="myTasksOnly"
                                checked={filters.myTasksOnly}
                                onCheckedChange={toggleMyTasksOnly}
                            />
                        </div>

                        <Separator />

                        <div className="space-y-4 my-1">
                            {/* Status Filters */}
                            <div>
                                <h4 className="text-sm font-semibold mb-2">Status</h4>
                                <div className="space-y-2">
                                    {allStatuses.map((status) => (
                                        <div key={status} className="flex items-center space-x-2">
                                            <Checkbox
                                                checked={filters.status.includes(status)}
                                                onCheckedChange={() => toggleStatus(status)}
                                            />
                                            <label className="text-sm capitalize">{status.replace("_", " ")}</label>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <Separator />

                            {/* Priority Filters */}
                            <div>
                                <h4 className="text-sm font-semibold mb-2">Priority</h4>
                                <div className="space-y-2">
                                    {allPriorities.map((priority) => (
                                        <div key={priority} className="flex items-center space-x-2">
                                            <Checkbox
                                                checked={filters.priority.includes(priority)}
                                                onCheckedChange={() => togglePriority(priority)}
                                            />
                                            <label className="text-sm capitalize">{priority}</label>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <Separator />

                            <Button
                                variant="destructive"
                                size="sm"
                                className="w-full"
                                onClick={onClearFilters}
                            >
                                Clear Filters
                            </Button>
                        </div>
                    </PopoverContent>
                </Popover>

                {/* Create Task button */}
                <Button onClick={onCreateTask} className="flex gap-2">
                    <Plus className="h-4 w-4" />
                    Create Task
                </Button>
            </div>
        </div>
    );
}
