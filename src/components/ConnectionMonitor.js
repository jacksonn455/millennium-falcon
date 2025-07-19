import { useEffect } from 'react';
import { refreshAccessToken } from '../utils/auth';

const ConnectionMonitor = () => {
  useEffect(() => {
    let isPageVisible = true;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        isPageVisible = false;
      } else {
        // Usuário voltou à aba
        if (!isPageVisible) {
          console.log("🔄 Usuário voltou à aba, verificando conectividade...");
          isPageVisible = true;
          
          // Verificar se o token ainda é válido
          const token = localStorage.getItem("authToken");
          if (token) {
            // Tentar fazer uma requisição simples para verificar conectividade
            fetch('http://localhost:8000/health', {
              method: 'GET',
              headers: {
                'Authorization': `Bearer ${token}`
              }
            }).catch(() => {
              // Se falhar, tentar refresh do token
              refreshAccessToken();
            });
          }
        }
      }
    };

    const handleOnline = () => {
      console.log("✅ Conexão restaurada");
    };

    const handleOffline = () => {
      console.log("❌ Conexão perdida");
    };

    // Adicionar event listeners
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Cleanup
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return null; // Componente não renderiza nada
};

export default ConnectionMonitor; 