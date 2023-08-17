import styles from "./TaskList.module.css";
import {
  Task,
  useTaskDispatch,
  useTaskState,
} from "../../context/TaskProvider";
import { useState } from "react";

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

type TaskItemProps = { task: Task };

function TaskItem({ task }: TaskItemProps) {
  const [text, setText] = useState(task.text);
  const dispatch = useTaskDispatch();

  function handleBlur(event: React.FocusEvent<HTMLInputElement, Element>) {
    dispatch({
      type: "EDIT_TASK",
      payload: { text: event.target.value, id: task.id },
    });
  }

  return (
    <li>
      <input
        type="text"
        onBlur={handleBlur}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
    </li>
  );
}
