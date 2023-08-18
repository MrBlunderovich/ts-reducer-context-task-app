import { createContext, useContext, useReducer } from "react";

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
  | { type: "ADD_TASK"; payload: { text: string; id: string } }
  | { type: "EDIT_TASK"; payload: { text: string; id: string } }
  | { type: "COMPLETE_TASK"; payload: { isCompleted: boolean; id: string } };

export default function TaskProvider({ children }: Props) {
  const [tasks, dispatch] = useReducer(taskReducer, initialState);

  console.log(tasks);

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
    case "ADD_TASK":
      return [...state, createTask(action.payload.id, action.payload.text)];

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

    default:
      throw new Error("Unexpected action");
  }
}
