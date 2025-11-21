"use client";

import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle} from '@/components/ui/dialog';
import {Button} from '@/components/ui/button';
import {FC, useEffect, useState} from 'react';
import {Task, TaskPayload} from '@/types/task';
import {Input} from '@/components/ui/input';
import {Select, SelectTrigger, SelectValue, SelectContent, SelectItem} from "@/components/ui/select";
import { toast } from 'sonner';
import { taskAPI } from '@/lib/taskAPI';
import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

export interface TaskModalProps {
    open: boolean;
    initialValues?: Task | null;
    onOpenChange: (open: boolean) => void;
    onSuccess: () => void;
}

export const TaskModal: FC<TaskModalProps> = ({
    open,
    initialValues,
    onOpenChange,
    onSuccess,
}) => {
    const isEdit = !!initialValues;
    const [title, setTitle] = useState("");
    const [priority, setPriority] = useState<"low" | "medium" | "high">("medium");
    const [status, setStatus] = useState<"pending" | "in-progress" | "completed">("pending");
    const [dueDate, setDueDate] = useState<Date>(new Date());

    useEffect(() => {
        if(isEdit && initialValues) {
            setTitle(initialValues.title);
            setPriority(initialValues.priority);
            setStatus(initialValues.status);
            setDueDate(initialValues.dueDate);
        } else {
            setTitle("");
            setPriority("medium");
            setStatus("pending");
        }
    }, [initialValues, isEdit, open]);

    const handleSubmit = async () => {
        const payload: TaskPayload = {
            title,
            priority,
            status,
            dueDate,
        };

        try {
            if(isEdit && initialValues) {
                await taskAPI.update(initialValues._id, payload);
            } else {
                await taskAPI.create(payload);
            }
            onSuccess();
            onOpenChange(false);
        } catch(err) {
            toast.warning(err);
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle>
                        {!isEdit ? "Create Task" : "Edit Task"}
                    </DialogTitle>
                    <DialogDescription>
                        {!isEdit ? "Use form below to create new task" : "Update fields to change esiting task"}
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4">
                    <Input
                        placeholder="Task title"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />

                    <Select value={priority} onValueChange={(v: any) => setPriority(v)}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="low">Low</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="high">High</SelectItem>
                        </SelectContent>
                    </Select>

                    <Select value={status} onValueChange={(v: any) => setStatus(v)}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="in-progress">In progress</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                        </SelectContent>
                    </Select>

                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                className={cn(
                                    "w-full justify-start text-left font-normal",
                                    !dueDate && "text-muted-foreground"
                                )}
                            >
                                {dueDate ? format(dueDate, "PPP") : "Select a date"}
                            </Button>
                        </PopoverTrigger>

                        <PopoverContent className="p-0">
                            <Calendar
                                mode="single"
                                required
                                selected={dueDate || undefined}
                                onSelect={setDueDate}
                                initialFocus
                            />
                        </PopoverContent>
                    </Popover>

                    <Button onClick={handleSubmit} className="w-full">
                        {!isEdit ? "Create" : "Save Changes"}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};