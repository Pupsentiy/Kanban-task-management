import { HashRouter } from "react-router-dom";

import Header from "./components/header/Header";
import InternalRoutes from "./routes/Routes";

function App() {
  return (
    <HashRouter >
      <Header />
      <InternalRoutes />
    </HashRouter>
  );
}

export default App;
