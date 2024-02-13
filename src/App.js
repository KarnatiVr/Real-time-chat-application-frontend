import './App.css';
// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import {  RouterProvider } from "react-router-dom";
import router from './routes';


function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
