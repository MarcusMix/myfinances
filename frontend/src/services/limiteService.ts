import { isMesAnoIgualOuPosteriorADataAtual } from "./utils";
import { url, getToken } from "./apiBase";
import axios from "axios";

export const getLimitesPorMes = async (mes: number, ano: number) => {
  try {
    const response = await axios.get(`${url}/limites`, {
      params: {
        mes: mes,
        ano: ano
      }
    });
    return response.data;
  } catch (error) {
    console.log('Erro ao buscar limites:', error);
    throw error;
  }
};

export const getLimiteValorPorMes = async (mes, ano) => {
  const userToken = await getToken();
  const reqUrl = `${url}/limites?mes=${mes}&ano=${ano}`;
  try {
    const response = await axios.get(reqUrl, {
      headers: {
        Authorization: 'Bearear ' + userToken
      }
    });
    if (response.data.length > 0 && response.data[0] != null) {
      return response.data[0].valor;
    } else {
      return 0;
    }
  } catch (e) {
    console.log("Erro ao buscar limites", e)
  }
};

export const salvarLimite = async (limite) => {
  try {
    if (limite.id) {
      // Se o limite já tem um ID, é uma atualização
      const response = await axios.put(`${url}/limites/${limite.id}`, limite);
      return response.data;
    } else {
      // Se não tem ID, é uma nova criação
      const response = await axios.post(`${url}/limites`, limite);
      return response.data;
    }
  } catch (error) {
    console.log('Erro ao salvar limite:', error);
    throw error;
  }
};

export const removerLimite = async (id: number) => {
  try {
    await axios.delete(`${url}/limites/${id}`);
  } catch (error) {
    console.log('Erro ao remover limite:', error);
    throw error;
  }
};

export const validarLimite = async (limite) => {
  if (!limite.id) {
    const limiteResponse = await getLimitesPorMes(limite.mes, limite.ano)
    if (limiteResponse.length > 0 && limiteResponse[0] != null) {
      console.log("limiteResponse", limiteResponse)
      throw new Error("Já existe um limite para este mês e ano")
    }
  }

  if (!limite.valor) {
    throw new Error("Valor do limite é obrigatório")
  }

  if (!limite.mes) {
    throw new Error("Mês do limite é obrigatório")
  }

  if (limite.mes < 1 || limite.mes > 12) {
    throw new Error("Mês do limite inválido")
  }

  if (!limite.ano) {
    throw new Error("Ano do limite é obrigatório")
  }

  if (limite.valor <= 0) {
    throw new Error("Valor do limite deve ser maior que zero")
  }

  if (!isMesAnoIgualOuPosteriorADataAtual(limite.mes, limite.ano)) {
    throw new Error("Mês e ano do limite devem ser iguais ou posteriores à data atual")
  }
}