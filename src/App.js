import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import NavigationBar from "./components/NavigationBar";
import LoginForm from "./components/LoginForm";
import Display from "./components/Display";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/dashboard" element={<NavigationBar />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
