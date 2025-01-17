import * as React from "react";
import * as ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

const rootElement = document.getElementById("root");
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  // Render your React component
  root.render(<App />);
} else {
  console.error("Root element not found");
}
