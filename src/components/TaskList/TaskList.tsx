import styles from "./TaskList.module.css";
import { useTaskState } from "../../context/TaskProvider";
import TaskItem from "../TaskItem/TaskItem";

export default function TaskList() {
  const tasks = useTaskState();

  return (
    <ul className={styles["task-list"]}>
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task}></TaskItem>
      ))}
    </ul>
  );
}
