import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Form from "./pages/Form/Form.js"


// https://ssip2023-backends.onrender.com/ for apis

function App() {
  return (

    <BrowserRouter>
      <Routes>

      <Route index path="/" element={<Home/>}/>
      <Route path="/Login" element={<Login/>}/>
      <Route path="/SignUp"/>
      <Route path="/Form" element={<Form/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
