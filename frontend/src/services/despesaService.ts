import { isMesAnoIgualOuPosteriorADataAtual } from "./utils";
import { url, getToken } from "./apiBase";
import axios from "axios";

export const getDespesasPorMes = async (mes: number, ano: number) => {
  try {
    const response = await axios.get(`${url}/despesas`, {
      params: {
        mes: mes,
        ano: ano
      }
    });
    return response.data;
  } catch (error) {
    console.log('Erro ao buscar despesas:', error);
    throw error;
  }
};

export const getTotalMes = async (mes: number, ano: number) => {
  try {
    const response = await axios.get(`${url}/total`, {
      params: {
        mes: mes,
        ano: ano
      }
    });
    return response.data.TOTAL;
  } catch (error) {
    console.log('Erro ao buscar total:', error);
    throw error;
  }
};

export const salvarDespesa = async (despesa) => {
  try {
    const response = await axios.post(`${url}/despesas`, despesa);
    return response.data;
  } catch (error) {
    console.log('Erro ao salvar despesa:', error);
    throw error;
  }
};

export const removerDespesa = async (id: number) => {
  try {
    await axios.delete(`${url}/despesas/${id}`);
  } catch (error) {
    console.log('Erro ao remover despesa:', error);
    throw error;
  }
};

export const validarDespesa = (despesa) => {
  if (!despesa.descricao) {
    throw new Error("Descrição é obrigatória")
  }

  if (!despesa.valor) {
    throw new Error("Valor é obrigatório")
  }

  if (despesa.valor <= 0) {
    throw new Error("Valor deve ser maior que zero")
  }

  if (!despesa.mes) {
    throw new Error("Mês é obrigatório")
  }
  if (despesa.mes < 1 || despesa.mes > 12) {
    throw new Error("Mês inválido")
  }

  if (!despesa.ano) {
    throw new Error("Ano é obrigatório")
  }

  if (!isMesAnoIgualOuPosteriorADataAtual(despesa.mes, despesa.ano)) {
    throw new Error("Mês e ano devem ser iguais ou posteriores a data atual")
  }

}