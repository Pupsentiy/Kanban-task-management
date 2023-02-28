import { BrowserRouter as Router } from "react-router-dom";

import Header from "./components/header/Header";
import InternalRoutes from "./routes/Routes";

function App() {
  return (
    <Router basename="/Kanban-task-management">
      <Header />
      <InternalRoutes />
    </Router>
  );
}

export default App;
