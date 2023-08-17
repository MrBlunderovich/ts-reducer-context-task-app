import { createContext, useContext, useReducer } from "react";

type Task = {
  id: number;
  text: string;
  isCompleted: boolean;
};

const initialState: Task[] = [];
const defaultDispatch: React.Dispatch<Action> = () => initialState;
const TaskStateContext = createContext(initialState);
const TaskDispatchContext = createContext(defaultDispatch);

type TaskProviderProps = {
  children: React.ReactNode;
};
type TaskState = typeof initialState;
type Action = { type: "ADD_TASK" };

export default function TaskProvider({ children }: TaskProviderProps) {
  const [tasks, dispatch] = useReducer(taskReducer, initialState);

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

function taskReducer(state: TaskState, action: Action) {
  switch (action.type) {
    case "ADD_TASK":
      return state;

    default:
      throw `Unexpected action ${action.type}`;
  }
}
