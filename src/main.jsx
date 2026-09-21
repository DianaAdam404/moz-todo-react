import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

const DATA = [
  {
    id: "topic-0",
    subject: "Hungarian",
    name: "The first generation of Nyugat",
    completed: true,
  },
  {
    id: "topic-1",
    subject: "History",
    name: "The Reform Era",
    completed: false,
  },
  {
    id: "topic-2",
    subject: "Mathematics",
    name: "Probability",
    completed: false,
  },
  {
    id: "topic-3",
    subject: "Angol",
    name: "Travel and tourism",
    completed: false,
  },
];

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App tasks={DATA} />
  </StrictMode>,
);
