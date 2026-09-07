import { createBrowserRouter } from "react-router-dom";
import Journal from "./pages/Journal";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Journal,
  },
]);
