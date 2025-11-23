"use client";

import DashboardStats from "@/components/dashboard/DashboardStats";
import { useEffect, useState } from "react";
import { statsAPI } from "@/lib/statsAPI";

export default function Dashboard() {
    const [totalTasks, setTotalTasks] = useState(0);
    const [tasksDueToday, setTasksDueToday] = useState(0);
    const [overdueTasks, setOverdueTasks] = useState(0);
    const [completedTasks, setCompletedTasks] = useState(0);
    const fetchStats = async () => {
        const {data} = await statsAPI.totals();
        setTotalTasks(data.totalTasks);
        setTasksDueToday(data.tasksDueToday);
        setOverdueTasks(data.overdueTasks);
        setCompletedTasks(data.completedTasks);
    };
    useEffect(() => {
        fetchStats();
    }, []);

    return (
        <div className="p-6">
            <DashboardStats
                totalTasks={totalTasks}
                tasksDueToday={tasksDueToday}
                overdueTasks={overdueTasks}
                completedTasks={completedTasks}
            />
        </div>
    );
}