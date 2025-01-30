import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import Home from "./routes/Home";
import Login from "./routes/Login";
import reportWebVitals from "./reportWebVitals";
import { createGlobalStyle } from "styled-components";
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Product from "./routes/Products";
import Anamneses from "./routes/Anamneses";
import Planner from "./routes/Planner";
import { login } from "./services/login";
import ProtectedRoute from "./utils/auth";
import { LoadingProvider, useLoading } from "./components/LoadingProvider";
import Loader from "./components/Loader";
import { setAxiosLoadingInterceptor } from "./services/api";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-x: hidden; 
    background-color: #f9f9f9; 
    line-height: 1.5; 
  }

  html, body {
    width: 100%; 
    height: 100%; 
    overflow-x: hidden; 
  }

  li {
    list-style: none;    
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  h1, h2, h3, h4, h5, h6 {
    margin: 0;
    font-weight: 600;
  }

  img {
    max-width: 100%; 
    height: auto;
    display: block;
  }

  
  @media (max-width: 768px) { 
    body {
      padding: 0;
    }

    h1 {
      font-size: 24px; 
    }

    h2, h3 {
      font-size: 20px;
    }

    h4, h5, h6 {
      font-size: 18px;
    }

    .container {
      padding: 10px;
      width: 100%; 
      overflow-x: hidden;
    }

    .header {
      display: flex;
      flex-direction: column;
      padding: 10px;
    }

    .button {
      font-size: 14px;
      padding: 10px 15px;
    }
  }

  @media (max-width: 480px) { 
    body {
      padding: 0;
    }

    * {
        margin: 0;
        box-sizing: border-box; 
      }

    h1 {
      font-size: 20px; 
    }

    h2, h3 {
      font-size: 18px;
    }

    h4, h5, h6 {
      font-size: 16px;
    }

    p {
      font-size: 14px;
    }

    .container {
      padding: 8px;
      width: 100%; 
      max-width: 100%; 
      overflow-x: hidden;
    }

    .header {
      padding: 8px;
      align-items: center; 
    }

    .logo {
      width: 100px; 
      margin: 0 auto;
    }

    .menu {
      display: block;
      padding: 10px 0;
      font-size: 14px; 
      text-align: center;
    }

    .button {
      font-size: 12px;
      padding: 10px 20px; 
      width: 100%; 
      max-width: 300px; 
      margin: 10px auto; 
      border-radius: 8px; 
    }

    img {
      max-width: 100%; 
      height: auto;
    }
  }
`;

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { setLoading } = useLoading();

  useEffect(() => {
    setAxiosLoadingInterceptor(setLoading);
  }, [setLoading]);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setIsLoggedIn(true);
      if (location.pathname === "/login") {
        navigate("/");
      }
    } else {
      if (location.pathname !== "/login") {
        navigate("/login");
      }
    }
  }, [navigate, location.pathname]);

  const handleLogin = async ({ email, password }) => {
    setLoading(true);
    const token = await login({ email, password });
    setLoading(false);

    if (token) {
      localStorage.setItem("authToken", token);
      setIsLoggedIn(true);
      navigate("/");
    } else {
      alert("Erro ao fazer login. Tente novamente.");
    }
  };

  return (
    <div>
      <GlobalStyle />
      {location.pathname !== "/login" && <Header />}
      <Loader />
      <Routes>
        <Route path="/login" element={<Login handleLogin={handleLogin} />} />
        <Route path="/" element={<ProtectedRoute element={<Home />} />} />
        <Route path="/anamneses" element={<ProtectedRoute element={<Anamneses />} />} />
        <Route path="/produtos" element={<ProtectedRoute element={<Product />} />} />
        <Route path="/agenda" element={<ProtectedRoute element={<Planner />} />} />
      </Routes>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter basename="/millennium-falcon">
      <LoadingProvider>
        <App />
      </LoadingProvider>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();