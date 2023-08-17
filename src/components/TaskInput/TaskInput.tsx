import { useTaskDispatch } from "../../context/TaskProvider";
import styles from "./TaskInput.module.css";

export default function TaskInput() {
  const dispatch = useTaskDispatch();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const input = form.taskTextInput as HTMLFormElement;
    dispatch({ type: "ADD_TASK", payload: { text: input.value } });
    input.value = "";
    input.focus();
  }

  return (
    <div className={styles["task-input"]}>
      <form onSubmit={handleSubmit}>
        <label htmlFor="taskTextInput">New task:</label>
        <input type="text" name="taskTextInput" autoComplete="off" required />
        <button>+</button>
      </form>
    </div>
  );
}
