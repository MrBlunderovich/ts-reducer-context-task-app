import "./App.css";
import TaskProvider from "./context/TaskProvider";
import Header from "./components/Header/Header";
import TaskInput from "./components/TaskInput/TaskInput";

function App() {
  return (
    <TaskProvider>
      <Header>
        <TaskInput />
      </Header>
    </TaskProvider>
  );
}

export default App;
