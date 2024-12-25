import { CheckButton } from "src/components";
import styles from "src/components/TaskItem.module.css";

import type { Task } from "src/api/tasks";

export interface TaskItemProps {
  task: Task;
}

export function TaskItem({ task }: TaskItemProps) {
  let containerClass = styles.textContainer;
  if (task.isChecked) {
    containerClass += " " + styles.checked;
  }

  return (
    <div className={styles.item}>
      <CheckButton checked={task.isChecked} />
      <div className={containerClass}>
        <span className={styles.title}>{task.title}</span>
        {task.description && <span>{task.description}</span>}
      </div>
    </div>
  );
}
