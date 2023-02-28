import { BrowserRouter } from "react-router-dom";
import Header from "./components/header/Header";
import InternalRoutes from "./routes/Routes";

function App() {
  return (
    <BrowserRouter basename="/Kanban-task-management">
      <Header />
      <InternalRoutes />
    </BrowserRouter>
  );
}

export default App;
