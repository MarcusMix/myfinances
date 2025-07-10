/* exemplo de uso em SelectMesAnoInput.tsx e Limit.tsx */
export const MESES = [
  { name: "Janeiro", value: 1 },
  { name: "Fevereiro", value: 2 },
  { name: "Março", value: 3 },
  { name: "Abril", value: 4 },
  { name: "Maio", value: 5 },
  { name: "Junho", value: 6 },
  { name: "Julho", value: 7 },
  { name: "Agosto", value: 8 },
  { name: "Setembro", value: 9 },
  { name: "Outubro", value: 10 },
  { name: "Novembro", value: 11 },
  { name: "Dezembro", value: 12 },
];

export function formatarMoeda(value: number) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export function formatarMoedaSemDecimal(value: number) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 0,
  });
}

export const getMesAtual = () => {
  const data = new Date();
  return (data.getMonth() + 1).toString();
};

export function getAnoAtual() {
  return new Date().getFullYear().toString();
}

export function isMesAnoIgualOuPosteriorADataAtual(mes: number, ano: number) {
  const mesAtual = parseInt(getMesAtual());
  const anoAtual = parseInt(getAnoAtual());
  const dataAtual = new Date(anoAtual, mesAtual);
  const dataDespesa = new Date(ano, mes);
  return dataDespesa >= dataAtual;
}

export function formatarData(data: string | Date) {
  if (!data) return "";

  const dataObj = data instanceof Date ? data : new Date(data);

  if (isNaN(dataObj.getTime())) return "";

  const dia = dataObj.getDate().toString().padStart(2, "0");
  const mes = (dataObj.getMonth() + 1).toString().padStart(2, "0");
  const ano = dataObj.getFullYear();

  return `${dia}/${mes}/${ano}`;
}
