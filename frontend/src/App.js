import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AppRoutes from "./routes/AppRoutes";
function App() {
  return (
    <>
      <Router>
        <Navbar />
        <AppRoutes />
        <Footer />
      </Router>
    </>
  );
}

export default App;
