import { useEffect, useRef } from "react";
import { useTaskDispatch } from "../../context/TaskProvider";
import styles from "./TaskInput.module.css";
import { nanoid } from "nanoid";

export default function TaskInput() {
  const inputRef = useRef<HTMLInputElement>(null!);
  const dispatch = useTaskDispatch();

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const input = form.taskTextInput as HTMLFormElement;
    dispatch({
      type: "ADD_TASK",
      payload: { text: input.value, id: nanoid() },
    });
    input.value = "";
    input.focus();
  }

  return (
    <div className={styles["task-input"]}>
      <form onSubmit={handleSubmit}>
        <label htmlFor="taskTextInput">New task:</label>
        <input
          ref={inputRef}
          type="text"
          name="taskTextInput"
          autoComplete="off"
          required
        />
        <button className="material-icons-outlined icon-button">
          add_circle_outline
        </button>
      </form>
    </div>
  );
}
