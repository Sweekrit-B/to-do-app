import { useEffect, useState } from "react";
import { getAllTasks } from "src/api/tasks";
import { TaskItem } from "src/components";
import styles from "src/components/TaskList.module.css";

import type { Task } from "src/api/tasks";

export interface TaskListProps {
  title: string;
}

export function TaskList({ title }: TaskListProps) {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    getAllTasks()
      .then((result) => {
        if (result.success) {
          setTasks(result.data);
        } else {
          alert(result.error);
        }
      })
      .catch((reason) => alert(reason));
  }, []);

  return (
    <div className={styles.outerDiv}>
      <span className={styles.listTitle}>{title}</span>
      <div className={styles.innerDiv}>
        {tasks.length === 0 ? (
          <p>No tasks yet. Add one above to get started.</p>
        ) : (
          tasks.map((task) => (
            <li key={task._id} style={{ listStyleType: "none" }}>
              <TaskItem task={task} />
            </li>
          ))
        )}
      </div>
    </div>
  );
}
