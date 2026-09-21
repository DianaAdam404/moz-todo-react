import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

const DATA = [
  {
    id: "topic-0",
    subject: "Magyar",
    name: "A Nyugat első nemzedéke",
    completed: true,
  },
  {
    id: "topic-1",
    subject: "Történelem",
    name: "A reformkor",
    completed: false,
  },
  {
    id: "topic-2",
    subject: "Matematika",
    name: "Valószínűségszámítás",
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
