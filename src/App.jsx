import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Dashboard from "./pages/Dashboard";
import Contact from "./pages/ContactUs";

function App() {
  return (
    <Router>
      <div className="w-screen">
      <Header />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
      </div>
    </Router>
  );
}

export default App;
