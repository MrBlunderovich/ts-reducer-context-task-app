import { createContext, useContext, useReducer } from "react";

const TaskStateContext = createContext(null);
const TaskDispatchContext = createContext(null);

export default function TaskProvider({ children }) {
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

function taskReducer(state, action) {
  switch (action.type) {
    case "ADD_TASK":
      return state;

    default:
      throw `Unexpected action ${action.type}`;
  }
}
