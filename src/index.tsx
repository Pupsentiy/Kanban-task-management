import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import store from "./store/store";

import { GlobalStyle } from "./styles/index.styled";

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
    <Provider store={store}>
      <GlobalStyle />
      <App />
    </Provider>
);
