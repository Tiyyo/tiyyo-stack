import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Chat from "./features/chat/index.tsx";
import Login from "./features/auth/Login.tsx";
import Register from "./features/auth/Register.tsx";
import Protected from "./components/Protected/Protected.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Protected>
        <App />
      </Protected>
    )
  },
  {
    path: "/signup",
    element: <Register />
  },
  {
    path: "/login",
    element: <Login />
  },
  { path: "/chat", element: <Chat /> }
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
