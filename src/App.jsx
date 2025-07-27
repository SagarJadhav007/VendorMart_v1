import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Dashboard from "./pages/Dashboard";
import Contact from "./pages/ContactUs";
import SupplierDirectory from "./pages/Supplier";
import Home from "./pages/Home"
import OrderManagement from "./pages/OrderManagement";

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
        <Route path="/order-management" element={<OrderManagement />} />
      </Routes>
      <Footer />
      </div>
    </Router>
  );
}

export default App;
