import "./App.css";
import TaskProvider from "./context/TaskProvider";
import Header from "./components/Header/Header";
import TaskInput from "./components/TaskInput/TaskInput";
import TaskList from "./components/TaskList/TaskList";

function App() {
  return (
    <TaskProvider>
      <Header>
        <TaskInput />
      </Header>
      <TaskList />
    </TaskProvider>
  );
}

export default App;
