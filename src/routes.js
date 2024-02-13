import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/home";
import Chat from "./pages/chats";
import Test from "./components/Test"
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/chat",
    element: <Chat />,
  },
  {
    path:'test',
    element:<Test/>
  }
]);

export default router;