import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Dashboard from "./pages/Dashboard";
import Contact from "./pages/ContactUs";
import SupplierDirectory from "./pages/Supplier";
import Home from "./pages/Home"

function App() {
  return (
    <Router>
      <div className="">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/products" element ={<SupplierDirectory/>}/>
      </Routes>
      <Footer />
      </div>
    </Router>
  );
}

export default App;
