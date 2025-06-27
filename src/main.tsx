import { StrictMode } from "react";
import { RecoilRoot } from "recoil";

import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

import { store } from "./store/store.ts";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <RecoilRoot>
    <StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </StrictMode>
  </RecoilRoot>
);
