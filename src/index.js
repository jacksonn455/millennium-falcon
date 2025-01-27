import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./routes/Home";
import reportWebVitals from "./reportWebVitals";
import { createGlobalStyle } from "styled-components";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
    overflow-x: hidden;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }

  li {
    list-style: none;    
  }

  @media (max-width: 768px) { /* Dispositivos menores que 768px (como tablets e smartphones) */
    body {
      padding: 0;
    }

    h1, h2, h3 {
      font-size: 18px; /* Reduz o tamanho das fontes */
    }

    .container {
      padding: 10px;
    }

    .header {
      display: flex;
      flex-direction: column;
      padding: 10px;
    }

    /* Ajustes em outros componentes específicos */
    .button {
      font-size: 14px;
      padding: 10px;
    }
  }

  @media (max-width: 480px) { /* Para smartphones como iPhone */
    body {
      padding: 0;
    }

    .container {
      padding: 5px;
    }

    .header {
      padding: 5px;
    }

    .logo {
      width: 120px; /* Ajuste do tamanho do logo */
    }

    /* Ajustes de padding e layout para facilitar a navegação em telas pequenas */
    .menu {
      display: block;
      padding: 10px;
    }

    .button {
      font-size: 12px;
      padding: 8px;
    }
  }
`;


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <GlobalStyle />
    <BrowserRouter basename="/millennium-falcon">
      <Header />
      <Routes>
        <Route path="/anamneses" element={<Anamneses />} />
        <Route path="/produtos" element={<Product />} />
        <Route path="/agenda" element={<Planner />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
