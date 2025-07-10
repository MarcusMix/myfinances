import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { url, authRoutes, getToken } from "./apiBase";

// Configuração do Axios para debug
axios.interceptors.request.use((request) => {
  console.log("Requisição sendo enviada:", {
    url: request.url,
    method: request.method,
    headers: request.headers,
    data: request.data,
  });
  return request;
});

axios.interceptors.response.use(
  (response) => {
    console.log("Resposta recebida:", {
      status: response.status,
      headers: response.headers,
      data: response.data,
    });
    return response;
  },
  (error) => {
    if (error.code === "ERR_NETWORK") {
      console.log("Erro de conectividade. Verifique se:");
      console.log("1. O backend está rodando");
      console.log("2. O IP está correto:", url);
      console.log("3. O dispositivo está na mesma rede");
      console.log("4. Não há firewall bloqueando a conexão");
    }
    console.log("Erro na requisição:", {
      message: error.message,
      code: error.code,
      config: {
        url: error.config?.url,
        method: error.config?.method,
        headers: error.config?.headers,
        data: error.config?.data,
      },
    });
    return Promise.reject(error);
  },
);

// Teste de conectividade
const testConnection = async () => {
  try {
    console.log("Testando conexão com o servidor...");
    const response = await axios.get(url, { timeout: 5000 });
    console.log("Conexão bem sucedida:", response.data);
    return true;
  } catch (error) {
    console.log("Erro no teste de conexão:", {
      message: error.message,
      code: error.code,
      url: url,
    });
    return false;
  }
};

export const postUsuario = async (entidade) => {
  try {
    const response = await axios.post(`${url}/usuario`, entidade);
    return response.data;
  } catch (error) {
    if (error.response.status === 409) {
      throw new Error("Email já cadastrado");
    } else {
      throw new Error("Erro ao cadastrar usuário");
    }
  }
};

export const cadastrarUsuario = async (usuario) => {
  usuario.dt_nascimento = usuario.dt_nascimento.toISOString().split("T")[0];
  try {
    const reqUrl = `${url}/auth/usuario`;
    const response = await axios.post(reqUrl, usuario);
    return response.data;
  } catch (error) {
    console.log("Erro ao cadastrar usuário:", error);
    if (error.response?.status === 409) {
      throw new Error("Email já cadastrado");
    } else if (error.response?.status === 422) {
      throw new Error("Dados inválidos. Verifique os campos preenchidos.");
    } else if (error.response?.data?.detail) {
      throw new Error(error.response.data.detail);
    } else {
      throw new Error("Erro ao cadastrar usuário. Tente novamente.");
    }
  }
};

export const loginUsuario = async (usuario) => {
  try {
    console.log("URL da requisição:", `${url}${authRoutes.login}`);
    console.log("Dados enviados:", {
      username: usuario.email,
      password: "***",
    });

    // Criando FormData para enviar no formato que o OAuth2PasswordRequestForm espera
    const formData = new URLSearchParams();
    formData.append("username", usuario.email);
    formData.append("password", usuario.senha);

    const reqUrl = `${url}${authRoutes.login}`;
    console.log("URL completa:", reqUrl);
    console.log("FormData:", formData.toString());

    const response = await axios.post(reqUrl, formData.toString(), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
      timeout: 10000,
    });

    console.log("Resposta do servidor:", response.data);
    return response.data;
  } catch (error) {
    console.log("Erro detalhado na requisição:", {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
      headers: error.response?.headers,
      config: {
        url: error.config?.url,
        method: error.config?.method,
        headers: error.config?.headers,
        data: error.config?.data,
      },
    });

    if (error.code === "ERR_NETWORK") {
      console.log("Erro de conectividade. Verifique se:");
      console.log("1. O backend está rodando");
      console.log("2. O IP está correto:", url);
      console.log("3. O dispositivo está na mesma rede");
      console.log("4. Não há firewall bloqueando a conexão");
      throw new Error(
        "Erro de conexão com o servidor. Verifique sua conexão e tente novamente.",
      );
    }

    if (error.response?.status === 401) {
      throw new Error("Email ou senha inválidos");
    }

    throw error;
  }
};

export const logoutUsuario = async () => {
  try {
    const userToken = await getToken();
    const reqUrl = `${url}${authRoutes.logout}`;
    await axios.post(
      reqUrl,
      {},
      {
        headers: {
          Authorization: "Bearer " + userToken,
        },
      },
    );
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("token_type");
  } catch (error) {
    console.log("Erro ao fazer logout:", error);
  }
};

export const postUsuarioAsyncStorage = async (usuario) => {
  try {
    console.log("Salvando token no AsyncStorage:", usuario);
    await AsyncStorage.setItem("token", usuario.token);
    await AsyncStorage.setItem("token_type", usuario.token_type);
  } catch (error) {
    console.log("Erro ao salvar token no AsyncStorage:", error);
  }
};

export const getUsuarioAsyncStorage = async () => {
  try {
    const usuario = await AsyncStorage.getItem("usuario");
    return JSON.parse(usuario);
  } catch (error) {
    console.log("Erro ao buscar usuário no AsyncStorage:", error);
  }
};

export const getUsuarioLogado = async () => {
  try {
    const token = await getToken();
    const response = await axios.get(`${url}/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log("Erro ao buscar dados do usuário:", error);
    throw error;
  }
};
