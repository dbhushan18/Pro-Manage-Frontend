import React, { useState, useEffect } from 'react';
import {  getTasksCounts } from '../../apis/tasks';
import styles from "../Analytics/Analytics.module.css"

const Analytics = () => {
    const [countData, setCountData] = useState({
        backlog: 0,
        todo: 0,
        completed: 0,
        inProgress: 0,
        lowPriority: 0,
        moderatePriority: 0,
        highPriority: 0,
        dueDateTasks: 0
    });

    const ownerId = localStorage.getItem("owner")

    const fetchTaskCounts = async () => {
        try {
            const taskCounts = await getTasksCounts(ownerId)
            setCountData(taskCounts);
        }
        catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        fetchTaskCounts();
    }, []);

    const maxCountLength = Math.max(
        String(countData.backlog).length,
        String(countData.todo).length,
        String(countData.inProgress).length,
        String(countData.completed).length,
        String(countData.lowPriority).length,
        String(countData.moderatePriority).length,
        String(countData.highPriority).length,
        String(countData.dueDateTasks).length
    );
    

    return (
        <div>
            <h2 id={styles.analytics_text}>Analytics</h2>
            <ul className={styles.analytics_items}>
                <div className={styles.count_boxes}>
                    <ul>
                        <li><span>Backlog Tasks</span> {String(countData.backlog).padStart(maxCountLength, '0')}</li>
                        <li><span>To-Do Tasks</span> {String(countData.todo).padStart(maxCountLength, '0')}</li>
                        <li><span>In-Progress Tasks</span> {String(countData.inProgress).padStart(maxCountLength, '0')}</li>
                        <li><span>Completed Tasks</span> {String(countData.completed).padStart(maxCountLength, '0')}</li>
                    </ul>
                </div>
                <div className={styles.count_boxes}>
                    <ul>
                        <li><span>Low Priority Tasks</span> {String(countData.lowPriority).padStart(maxCountLength, '0')}</li>
                        <li><span>Moderate Priority Tasks</span> {String(countData.moderatePriority).padStart(maxCountLength, '0')}</li>
                        <li><span>High Priority Tasks</span> {String(countData.highPriority).padStart(maxCountLength, '0')}</li>
                        <li><span>Due Date Tasks</span> {String(countData.dueDateTasks).padStart(maxCountLength, '0')}</li>
                    </ul>
                </div>
            </ul>
        </div>
    );
};

export default Analytics;
