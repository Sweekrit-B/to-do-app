import { useState } from "react";
import { Link } from "react-router-dom";
import { updateTask } from "src/api/tasks";
import { CheckButton } from "src/components";
import styles from "src/components/TaskItem.module.css";

import type { Task } from "src/api/tasks";

export interface TaskItemProps {
  task: Task;
}

export function TaskItem({ task: initialTask }: TaskItemProps) {
  // update the previous line and add the following
  const [task, setTask] = useState<Task>(initialTask);
  const [isLoading, setLoading] = useState<boolean>(false);

  const handleToggleCheck = async () => {
    setLoading(true);
    const updatedTask = { ...task, isChecked: !task.isChecked, assignee: task.assignee?._id };
    try {
      const result = await updateTask(updatedTask);
      if (result.success) {
        setTask(result.data);
      } else {
        alert(result.error);
      }
    } catch (reason) {
      alert(reason);
    } finally {
      setLoading(false);
    }
  };

  let containerClass = styles.textContainer;
  if (task.isChecked) {
    containerClass += " " + styles.checked;
  }

  const link = `/task/${task._id}`;

  return (
    <div className={styles.item}>
      <CheckButton checked={task.isChecked} onPress={handleToggleCheck} disabled={isLoading} />
      <div className={containerClass}>
        <span className={styles.title}>
          <Link to={link}>{task.title}</Link>
        </span>
        {task.description && <span>{task.description}</span>}
      </div>
    </div>
  );
}
