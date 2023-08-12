import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./features/auth/Login.tsx";
import Register from "./features/auth/Register.tsx";
import Protected from "./components/Routes/Protected.tsx";
import { AppContextProvider } from "./context/AppContext.tsx";
import { QueryClient, QueryClientProvider } from "react-query";
import RedirectToHome from "./components/Routes/RedirectToHome.tsx";
import ChatContainer from "./features/chat/index.tsx";

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
    element: (
      <RedirectToHome>
        <Login />
      </RedirectToHome>
    )
  },
  { path: "/chat", element: <ChatContainer /> }
]);

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: async ({ queryKey: [url] }) => {
        if (typeof url === "string") {
          try {
            const response = await fetch(
              import.meta.env.VITE_API_BASE_URL + "api/" + url,
              {
                method: "GET"
              }
            );
            const data = response.json();
            return data;
          } catch (error) {
            console.log(error);
          }
        }
        throw new Error("Invalid QueryKey");
      }
    }
  }
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppContextProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AppContextProvider>
  </React.StrictMode>
);
