import "./App.css";
// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { RouterProvider } from "react-router-dom";
import router from "./routes";
import {  useSelector } from "react-redux";

function App() {
  const user = useSelector((state) => state.user.loggedInUser);

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}
export default App;
