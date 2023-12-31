import { createContext, useContext, useEffect, useReducer } from "react";

export type Task = {
  id: string;
  text: string;
  isCompleted: boolean;
};

const initialState: Task[] = [];
const defaultDispatch: React.Dispatch<Action> = () => initialState;
const TaskStateContext = createContext(initialState);
const TaskDispatchContext = createContext(defaultDispatch);

type Props = {
  children: React.ReactNode;
};
type TaskState = typeof initialState;
type Action =
  | { type: "LOAD_TASKS"; payload: { tasks: Task[] } }
  | { type: "ADD_TASK"; payload: { text: string; id: string } }
  | { type: "EDIT_TASK"; payload: { text: string; id: string } }
  | { type: "COMPLETE_TASK"; payload: { isCompleted: boolean; id: string } }
  | { type: "DELETE_TASK"; payload: { id: string } };

export default function TaskProvider({ children }: Props) {
  const [tasks, dispatch] = useReducer(taskReducer, initialState);

  console.log(tasks);

  useEffect(() => {
    const storage = localStorage.getItem("tasks");
    if (storage) {
      const savedTasks: Task[] = JSON.parse(storage);
      if (savedTasks.length > 0) {
        dispatch({ type: "LOAD_TASKS", payload: { tasks: savedTasks } });
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <TaskStateContext.Provider value={tasks}>
      <TaskDispatchContext.Provider value={dispatch}>
        {children}
      </TaskDispatchContext.Provider>
    </TaskStateContext.Provider>
  );
}

export function useTaskState() {
  return useContext(TaskStateContext);
}

export function useTaskDispatch() {
  return useContext(TaskDispatchContext);
}

function createTask(id: string, text: string): Task {
  return { id, text, isCompleted: false };
}

function taskReducer(state: TaskState, action: Action) {
  console.log(action);
  switch (action.type) {
    case "LOAD_TASKS":
      return [...action.payload.tasks];

    case "ADD_TASK":
      return [createTask(action.payload.id, action.payload.text), ...state];

    case "EDIT_TASK":
      return state.map((task) =>
        task.id === action.payload.id
          ? { ...task, text: action.payload.text }
          : task
      );

    case "COMPLETE_TASK":
      const newState = state.map((task) =>
        task.id === action.payload.id
          ? { ...task, isCompleted: action.payload.isCompleted }
          : task
      );
      newState.sort((a, b) => +a.isCompleted - +b.isCompleted);
      return newState;

    case "DELETE_TASK":
      return state.filter((task) => task.id !== action.payload.id);

    default:
      console.warn(action);
      throw new Error("Unexpected action");
  }
}
