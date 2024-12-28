import { useState } from "react";
//import { useEffect } from "react";
import { Link } from "react-router-dom";
import { updateTask } from "src/api/tasks";
//import { getUser } from "src/api/users";
import { CheckButton } from "src/components";
import styles from "src/components/TaskItem.module.css";

import type { Task } from "src/api/tasks";
//import type { User } from "src/api/users";

import { UserTag } from "./UserTag";

export interface TaskItemProps {
  task: Task;
}

export function TaskItem({ task: initialTask }: TaskItemProps) {
  // update the previous line and add the following
  const [task, setTask] = useState<Task>(initialTask);
  //const [user, setUser] = useState<User | undefined>(initialTask.assignee);
  const [isLoading, setLoading] = useState<boolean>(false);

  const handleToggleCheck = async () => {
    setLoading(true);
    //Sets the property assignee to the id of the assignee
    const updatedTask = { ...task, isChecked: !task.isChecked, assignee: task.assignee?._id };
    try {
      //the updateTask(updatedTask) function is called, which should call the populate function in the backend to convert the assignee to a User object
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

  /*
  useEffect(() => {
    if (task.assignee && !user) {
      setLoading(true);
      getUser(task.assignee?._id)
        .then((result) => {
          if (result.success) {
            setUser(result.data);
          } else {
            alert(result.error);
          }
        })
        .catch((reason) => alert(reason))
        .finally(() => setLoading(false));
    }
  }, [task.assignee, user]); */

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
      {task.assignee && <UserTag user={task.assignee} />}
    </div>
  );
}
