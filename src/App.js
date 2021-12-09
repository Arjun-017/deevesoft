import "./App.css";
import Navbar from "./components/Navbar";
import Form from "./components/Form";
import Footer from "./components/Footer";
import React from "react";

function App() {
  return (
    <React.Fragment>
      <Navbar />
      <Form />
      <Footer />
    </React.Fragment>
  );
}

export default App;
