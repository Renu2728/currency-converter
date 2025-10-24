import React from "react";
import "./App.css";
import ConvertSwap from "./components/ConvertSwap";

function App() {
  return (
    <div className="app-container">
      <h1 className="app-heading">Currency Converter</h1>
      <ConvertSwap />
    </div>
  );
}

export default App;
