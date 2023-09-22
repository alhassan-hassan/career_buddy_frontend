// libraries
import React from "react";
import ReactDOM from "react-dom/client";

// components
import App from "./App";
import ErrorBoundary from "@pages/errors/error_boundary/ErrorBoundary";

// styles
import "@scss/global.scss";

// contexts
import AuthProvider from "@contexts/AuthProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </AuthProvider>
  </React.StrictMode>
);
