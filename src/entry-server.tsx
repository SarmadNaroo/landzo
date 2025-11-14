import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import registrationReducer from "./features/registration/registrationSlice";
import App from "./App";

export function render(url: string, template: string) {
  // Create a new store instance for each SSR request to avoid state leaking
  const store = configureStore({
    reducer: {
      registration: registrationReducer,
    },
  });

  const appHtml = renderToString(
    <React.StrictMode>
      <Provider store={store}>
        <StaticRouter location={url}>
          <App />
        </StaticRouter>
      </Provider>
    </React.StrictMode>
  );

  // Replace the placeholder with the rendered HTML
  return template.replace("<!--app-html-->", appHtml);
}
