import styles from "./TaskItem.module.css";
import { Task, useTaskDispatch } from "../../context/TaskProvider";
import { useState } from "react";

type TaskItemProps = { task: Task };

export default function TaskItem({ task }: TaskItemProps) {
  const [text, setText] = useState(task.text);
  const dispatch = useTaskDispatch();

  function handleEdit(event: React.FocusEvent<HTMLInputElement, Element>) {
    dispatch({
      type: "EDIT_TASK",
      payload: { text: event.target.value, id: task.id },
    });
  }

  function handleComplete(event: React.ChangeEvent<HTMLInputElement>) {
    dispatch({
      type: "COMPLETE_TASK",
      payload: { isCompleted: event.target.checked, id: task.id },
    });
  }

  function handleDelete() {
    dispatch({
      type: "DELETE_TASK",
      payload: { id: task.id },
    });
  }

  return (
    <li className={styles["task-item"]}>
      <input
        type="checkbox"
        name="completeCheckbox"
        onChange={handleComplete}
        checked={task.isCompleted}
      />
      <input
        type="text"
        onBlur={handleEdit}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={handleDelete}>X</button>
    </li>
  );
}
