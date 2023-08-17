import { createContext, useContext, useReducer } from "react";

type Task = {
  id: number;
  text: string;
  isCompleted: boolean;
};

const initialState: Task[] = [];
let nextId = 0;
const defaultDispatch: React.Dispatch<Action> = () => initialState;
const TaskStateContext = createContext(initialState);
const TaskDispatchContext = createContext(defaultDispatch);

type Props = {
  children: React.ReactNode;
};
type TaskState = typeof initialState;
type Action = { type: "ADD_TASK"; payload: { text: string } };

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

function createTask(text: string): Task {
  return { id: nextId++, text, isCompleted: false };
}

function taskReducer(state: TaskState, action: Action) {
  console.log(action);
  switch (action.type) {
    case "ADD_TASK":
      return [...state, createTask(action.payload.text)];

    default:
      throw `Unexpected action ${action.type}`;
  }
}
