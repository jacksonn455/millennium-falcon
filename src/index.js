import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./routes/Home";
import reportWebVitals from "./reportWebVitals";
import { createGlobalStyle } from "styled-components";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Product from "./routes/Products";
import Anamneses from "./routes/Anamneses";
import Planner from "./routes/Planner";

const GlobalStyle = createGlobalStyle`
body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}
`;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <GlobalStyle />
    <Router>
      <Header />
      <Routes>
        <Route path="/anamneses" element={<Anamneses />} />
        <Route path="/produtos" element={<Product />} />
        <Route path="/agenda" element={<Planner />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

reportWebVitals();