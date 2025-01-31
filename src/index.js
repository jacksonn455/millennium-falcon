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
import { ErrorProvider, useError } from "./components/ErrorProvider";
import ErrorAlert from "./components/ErrorAlert";

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
`;

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { setLoading } = useLoading();
  const { showError } = useError();

  useEffect(() => {
    setAxiosLoadingInterceptor(setLoading, showError);
  }, [setLoading, showError]);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setIsLoggedIn(true);
      if (location.pathname === "/login") {
        navigate("/");
      }
    } else if (location.pathname !== "/login") {
      navigate("/login");
    }
  }, [navigate, location.pathname]);

  const handleLogin = async ({ email, password }) => {
    setLoading(true);
    try {
      const token = await login({ email, password });
      if (token) {
        localStorage.setItem("authToken", token);
        setIsLoggedIn(true);
        navigate("/");
      } else {
        showError("Erro ao fazer login. Tente novamente.");
      }
    } catch (error) {
      showError("Erro ao conectar com o servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <GlobalStyle />
      {location.pathname !== "/login" && <Header />}
      <Loader />
      <ErrorAlert />
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
        <ErrorProvider>
          <App />
        </ErrorProvider>
      </LoadingProvider>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();