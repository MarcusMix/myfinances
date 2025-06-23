import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export const url: string = "http://10.0.2.2:8090";

export const getToken = async () => {
  return await AsyncStorage.getItem("token");
};

export const authRoutes = {
  login: "/auth/login",
  logout: "/auth/logout",
};

// Configurando o interceptor para adicionar o token em todas as requisições
axios.interceptors.request.use(
  async (config) => {
    // Não adiciona o token nas rotas de autenticação
    if (config.url?.includes("/auth/login")) {
      return config;
    }

    const token = await getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
