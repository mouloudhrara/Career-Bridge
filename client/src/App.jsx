import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./components/Signup";
import SignIn from "./components/Signin";

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar/>
          <main className="flex-grow pt-[56px]">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SignUp/>}/>
            <Route path="/login" element={<SignIn/>}/>
          </Routes>
        </main>
      <Footer/>
      </div>
    </Router>
  )
}

export default App;
