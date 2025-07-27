import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Dashboard from "./pages/Dashboard";
import Contact from "./pages/ContactUs";
import SupplierDirectory from "./pages/SupplierDirectory";
import Home from "./pages/Home"
import Registeration from "./pages/Registeration";
import OrderManagement from "./pages/OrderManagement";
import Login from "./Login";
import Shopping from "./pages/ShoppingCart"

function App() {
  return (
    <Router>
      <div className="w-screen">
      <Header />
      <Routes>
        <Route path="/cart" element={<Shopping />}/>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/register" element={<Registeration/>}/>
        <Route path="https://vendor-mart-orpin.vercel.app/login" element={<Login />} />
        <Route path="/products" element ={<SupplierDirectory/>}/> 
        <Route path="/order-management" element={<OrderManagement />} />
      </Routes>
      <Footer />
      </div>
    </Router>
  );
}

export default App;
