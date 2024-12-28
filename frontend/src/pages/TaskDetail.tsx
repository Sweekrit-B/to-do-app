import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import { Task, getTask } from "src/api/tasks";
import { Page } from "src/components";
import { Button } from "src/components/Button";
import { TaskForm } from "src/components/TaskForm";
import { UserTag } from "src/components/UserTag";
import styles from "src/pages/TaskDetail.module.css";
//import { updateTask } from "src/api/tasks";

export function TaskDetail() {
  const params = useParams();
  const id = params.id;
  const [task, setTasks] = useState<Task>();
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (id) {
      getTask(id)
        .then((result) => {
          if (result.success) {
            setTasks(result.data);
          } else {
            alert(result.error);
          }
        })
        .catch((reason) => alert(reason));
    } else {
      alert("No task ID provided");
    }
  }, [id]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSubmit = (updatedTask: Task) => {
    setTasks(updatedTask);
    setIsEditing(false);
  };

  if (!task) {
    return (
      <Page>
        <Helmet>
          <title>Task Detail | TSE Todos</title>
        </Helmet>
        <p>
          <Link to="/">Back to home</Link>
        </p>
        <div className={styles.taskTitle}>
          <h2>This task doesn&apos;t exist!</h2>
        </div>
      </Page>
    );
  }

  return (
    <Page>
      <Helmet>
        <title>Task Detail | TSE Todos</title>
      </Helmet>
      <p>
        <Link to="/">Back to home</Link>
      </p>

      {isEditing ? (
        <TaskForm mode="edit" task={task} onSubmit={handleSubmit} />
      ) : (
        <>
          <div className={styles.taskTitle}>
            <h2>{task.title}</h2>
            <Button label="Edit Task" onClick={handleEdit} />
          </div>
          <p>{task.description ? task.description : "(No description)"}</p>
          <div className={styles.properties}>
            <p>
              <b>Assignee</b>
            </p>
            <p>{task.assignee ? <UserTag user={task.assignee} /> : "No assignee"}</p>
          </div>
          <div className={styles.properties}>
            <p>
              <b>Status</b>
            </p>
            <p>{task.isChecked ? "Done" : "Not done"}</p>
          </div>
          <div className={styles.properties}>
            <p>
              <b>Date Created</b>
            </p>
            <p>
              {Intl.DateTimeFormat("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
                hour12: true,
              }).format(task.dateCreated)}
            </p>
          </div>
        </>
      )}
    </Page>
  );
}
