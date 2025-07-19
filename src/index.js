import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import Home from "./routes/Home";
import Login from "./routes/Login";
import reportWebVitals from "./reportWebVitals";
import { createGlobalStyle } from "styled-components";
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";
import Header from "./components/Header";
import ProductRoutes from "./routes/Products";
import Anamneses from "./routes/Anamneses";
import Planner from "./routes/Planner";
import Sales from "./routes/Sales";
import { login } from "./services/login";
import ProtectedRoute from "./utils/auth";
import { LoadingProvider, useLoading } from "./components/LoadingProvider";
import Loader from "./components/Loader";
import { setAxiosLoadingInterceptor, isTokenExpired } from "./services/api";
import { ErrorProvider, useError } from "./components/ErrorProvider";
import ErrorAlert from "./components/ErrorAlert";
import NotFound from "./components/NotFound";
import Pacientes from "./routes/Pacientes";
import { refreshAccessToken, initializeAuth } from "./utils/auth";
import { logout } from "./services/auth";
import ConnectionMonitor from "./components/ConnectionMonitor";

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
  const [isInitialized, setIsInitialized] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { setLoading } = useLoading();
  const { showError } = useError();

  useEffect(() => {
    setAxiosLoadingInterceptor(setLoading, showError, navigate);
    // Inicializar auth
    initializeAuth();
  }, [setLoading, showError, navigate]);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const authToken = localStorage.getItem("authToken");
        const refreshToken = localStorage.getItem("refreshToken");

        if (!authToken || !refreshToken) {
          handleLogout();
          return;
        }

        const isAuthTokenExpired = isTokenExpired(authToken);
        const isRefreshTokenExpired = isTokenExpired(refreshToken);

        if (isRefreshTokenExpired) {
          handleLogout();
          return;
        }

        if (isAuthTokenExpired) {
          const newToken = await refreshAccessToken();
          if (newToken) {
            localStorage.setItem("authToken", newToken);
            setIsLoggedIn(true);
          } else {
            handleLogout();
          }
        } else {
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error("❌ Erro ao verificar autenticação:", error);
        handleLogout();
      } finally {
        setIsInitialized(true);
      }
    };

    checkAuth();
  }, []);

  const handleLogin = async ({ email, password }) => {
    setLoading(true);
    try {
      const { accessToken, refreshToken } = await login(
        { email, password },
        navigate
      );
      if (accessToken && refreshToken) {
        localStorage.setItem("authToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
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

  const handleLogout = () => {
    logout(navigate);
    setIsLoggedIn(false);
  };

  // Aguardar inicialização antes de renderizar
  if (!isInitialized) {
    return (
      <div>
        <GlobalStyle />
        <Loader />
      </div>
    );
  }

  return (
    <div>
      <GlobalStyle />
      <ConnectionMonitor />
      {location.pathname !== "/login" && <Header handleLogout={handleLogout} />}
      <Loader />
      <ErrorAlert />
      <Routes>
        <Route path="/login" element={<Login handleLogin={handleLogin} />} />
        <Route path="/" element={<ProtectedRoute element={<Home />} />} />
        <Route
          path="/anamneses"
          element={<ProtectedRoute element={<Anamneses />} />}
        />
        <Route
          path="/produtos"
          element={<ProtectedRoute element={<ProductRoutes />} />}
        />
        <Route
          path="/agenda"
          element={<ProtectedRoute element={<Planner />} />}
        />
        <Route
          path="/vendas"
          element={<ProtectedRoute element={<Sales />} />}
        />
        <Route
          path="/pacientes/:id"
          element={<ProtectedRoute element={<Pacientes />} />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter basename="/millennium-falcon">
    <LoadingProvider>
      <ErrorProvider>
        <App />
      </ErrorProvider>
    </LoadingProvider>
  </BrowserRouter>
);

reportWebVitals();
