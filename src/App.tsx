import { Routes, Route } from "react-router";
import "./index.css";
import "./App.css";
import HomePage from "./pages/home-page/HomePage";
import TaskPage from "./pages/task/TaskPage";
//import FirstTask from "./pages/first-task/FirstTask";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/task/:taskId" element={<TaskPage />} />
    </Routes>

    //<FirstTask/>
  );
}

export default App;
