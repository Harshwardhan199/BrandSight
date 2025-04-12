import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GetStarted from "./components/getStarted";
import Home from "./components/home";
import Login from "./components/login";
import SignUp from "./components/signup";

function App() {

  return (
    <Router>
      <Routes>
        <Route  path="/" element={<GetStarted />} />
        <Route  path="/home" element={<Home />} />
        <Route  path="/login" element={<Login />} />
        <Route  path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  )
}

export default App
