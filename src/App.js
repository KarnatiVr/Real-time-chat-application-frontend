import './App.css';
// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from './pages/home';
import Chat from './pages/chats';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
    {
    path: "/",
    element: <Home />,
  },
  {
    path: "/chat",
    element: <Chat />,
  }
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
