import "./App.css";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import OpenRoute from "./Components/OpenRoute";
import PrivateRoute from "./Components/PrivateRoute";
import Home from "./Components/Home";
import Navbar from "./Components/Navbar";

function App() {
  return (
    <>
      <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/signup" element={<OpenRoute><Signup /></OpenRoute>}/>
          <Route path="/signin" element={<OpenRoute><Signin /></OpenRoute>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
