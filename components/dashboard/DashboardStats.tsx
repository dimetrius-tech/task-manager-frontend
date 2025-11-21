import React from "react";
import { CheckCircle, AlertCircle, Calendar, ListTodo} from 'lucide-react';

interface StatCardProps {
    icon: React.ComponentType<{className?: string}>;
    label: string;
    value: number;
}

const StatCard: React.FC<StatCardProps> = ({icon: Icon, label, value}) => {
    return (
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex items-center gap-4">
            <div className="p-3 rounded-full bg-gray-100">
                <Icon className="w-6 h-6 text-gray-700" />
            </div>
            <div>
                <p className="text-gray-500 text-sm">{label}</p>
                <p className="text-2xl font-semibold text-gray-800">{value}</p>
            </div>
        </div>
    );
};

export interface DashboardStatsProps {
    totalTasks: number;
    tasksDueToday: number;
    overdueTasks: number;
    completedTasks: number;
};

const DashboardStats: React.FC<DashboardStatsProps> = ({
    totalTasks,
    tasksDueToday,
    overdueTasks,
    completedTasks,
}) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
            <StatCard icon={ListTodo} label="Total Tasks" value={totalTasks} />
            <StatCard icon={Calendar} label="Tasks Due Today" value={tasksDueToday} />
            <StatCard icon={AlertCircle} label="Overdue Tasks" value={overdueTasks} />
            <StatCard
                icon={CheckCircle}
                label="Completed Tasks"
                value={completedTasks}
            />
        </div>
    );
};

export default DashboardStats;