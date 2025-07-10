import { styles } from "./LimitStyle";
import { ScrollView, Text, View, ToastAndroid } from "react-native";
import MoneyInput from "../../component/MoneyInput/MoneyInput";
import * as React from "react";
import { useEffect, useState } from "react";
import SelectMesAnoInput from "../../component/SelectMesAnoInput/SelectMesAnoInput";
import {
  getAnoAtual,
  getMesAtual,
  MESES,
  isMesAnoIgualOuPosteriorADataAtual,
} from "../../services/utils";
import Title from "../../component/Title/Title";
import Pressable from "../../component/Pressable/Pressable";
import LimiteCard from "../../component/LimiteCard/LimiteCard";
import {
  getLimitesPorMes,
  removerLimite,
  salvarLimite,
} from "../../services/limiteService";
import RemoverModal from "../../component/RemoverModal/RemoverModal";

export default function Limit() {
  /*
   * ------------------------------------------------------------------
   * variáveis useState()
   * ------------------------------------------------------------------
   */
  const [limiteConsulta, setLimiteConsulta] = useState(null);
  const [erro, setErro] = useState("");

  const [modalRemoverVisible, setModalRemoverVisible] = useState(false);
  const [limiteRemocaoId, setLimiteRemocaoId] = useState(0);
  const [limiteRemocaoMesAno, setLimiteRemocaoMesAno] = useState("");

  const [idLimite, setIdLimite] = useState(0);
  const [limiteCadastro, setLimiteCadastro] = useState(0);
  const [mesCadastro, setMesCadastro] = useState(getMesAtual());
  const [anoCadastro, setAnoCadastro] = useState(getAnoAtual());
  const mesListaCadastro = MESES;
  const anoListaCadastro = ["2025", "2026"];

  const [mesConsulta, setMesConsulta] = useState(getMesAtual());
  const [anoConsulta, setAnoConsulta] = useState(getAnoAtual());
  const mesListaConsulta = MESES;
  const anoListaConsulta = ["2025", "2026"];

  /*
   * ------------------------------------------------------------------
   * funções da página
   * montar a página, rolar, etc
   * ------------------------------------------------------------------
   */
  const mountPage = async () => {
    try {
      const limite = await getLimitesPorMes(
        Number(mesConsulta),
        Number(anoConsulta),
      );
      setLimiteConsulta(limite && limite.length > 0 ? limite[0] : null);
      setErro(""); // Limpar mensagem de erro ao montar a página
    } catch (error) {
      setLimiteConsulta(null);
      console.log("Erro ao buscar limite", error);
    }
  };

  useEffect(() => {
    mountPage();
  }, [mesConsulta, anoConsulta]);

  /*
   * ------------------------------------------------------------------
   * funções auxiliares
   * montar objetos, modificar funções de estado, etc
   * ------------------------------------------------------------------
   */
  function incorporarLimiteObjeto(limiteObjeto) {
    if (limiteObjeto == null) {
      setIdLimite(0);
      setLimiteCadastro(0);
      setMesCadastro(getMesAtual());
      setAnoCadastro(getAnoAtual());
    } else {
      setIdLimite(limiteObjeto.id);
      setLimiteCadastro(limiteObjeto.valor);
      setMesCadastro(limiteObjeto.mes.toString());
      setAnoCadastro(limiteObjeto.ano.toString());
    }
  }

  function montarLimiteObjeto() {
    const obj = {
      id: idLimite,
      valor: limiteCadastro,
      mes: parseInt(mesCadastro),
      ano: parseInt(anoCadastro),
    };
    console.log("Objeto de limite montado:", obj);
    return obj;
  }

  function handleCancelar() {
    incorporarLimiteObjeto(null);
    setErro(""); // Limpar mensagem de erro
    ToastAndroid.show("Operação cancelada", ToastAndroid.SHORT);
  }

  /*
   * ------------------------------------------------------------------
   * funções de CRUD
   * salvar, remover, editar, etc
   * ------------------------------------------------------------------
   */
  const handleModalDeRemocao = (limiteObjeto) => {
    setLimiteRemocaoId(limiteObjeto.id);
    setLimiteRemocaoMesAno(limiteObjeto.mes + "/" + limiteObjeto.ano);
    setModalRemoverVisible(true);
  };

  const handleRemoverLimite = async () => {
    setModalRemoverVisible(false);
    try {
      await removerLimite(limiteRemocaoId);
      ToastAndroid.show("Limite removido com sucesso", ToastAndroid.SHORT);
      mountPage();
    } catch (error) {
      setErro(error.message);
    }
  };
  const handleEditarLimite = (limiteObjeto) => {
    setErro("");
    incorporarLimiteObjeto(limiteObjeto);
  };
  const handleSalvarLimite = async () => {
    const limiteObjeto = montarLimiteObjeto();
    console.log("Salvando limite com objeto:", limiteObjeto);

    // Verificar se a data é válida (atual ou futura)
    const mesAtual = parseInt(getMesAtual());
    const anoAtual = parseInt(getAnoAtual());

    if (
      limiteObjeto.ano < anoAtual ||
      (limiteObjeto.ano === anoAtual && limiteObjeto.mes < mesAtual)
    ) {
      const mesAtualNome = MESES.find((m) => m.value === mesAtual)?.name;
      setErro(
        `Data inválida: não é possível cadastrar limites para datas anteriores a ${mesAtualNome}/${anoAtual}`,
      );
      return;
    }

    // Verificar se o valor do limite é válido
    if (limiteObjeto.valor <= 0) {
      setErro(`O valor do limite deve ser maior que zero`);
      return;
    }

    try {
      // Verificar se já existe um limite para o mês/ano selecionado
      const limitesExistentes = await getLimitesPorMes(
        limiteObjeto.mes,
        limiteObjeto.ano,
      );

      // Se já existir um limite e não estamos editando (id=0), utilizamos o id do limite existente
      if (
        limitesExistentes &&
        limitesExistentes.length > 0 &&
        limiteObjeto.id === 0
      ) {
        const limiteExistente = limitesExistentes[0];
        limiteObjeto.id = limiteExistente.id;

        // Mostrar mensagem informativa sobre a atualização
        const mesNome = MESES.find((m) => m.value === limiteObjeto.mes)?.name;
        ToastAndroid.show(
          `Atualizando limite existente de ${mesNome}/${limiteObjeto.ano}`,
          ToastAndroid.LONG,
        );

        // Registrar no console para debug
        console.log(
          `Atualizando limite existente: ${limiteExistente.valor} → ${limiteObjeto.valor}`,
        );
      }

      const resultado = await salvarLimite(limiteObjeto);

      // Mostrar mensagem apropriada baseada na operação (criação ou atualização)
      const mesNome = MESES.find((m) => m.value === limiteObjeto.mes)?.name;
      const mensagem =
        limiteObjeto.id === 0
          ? `Limite criado com sucesso para ${mesNome}/${limiteObjeto.ano}`
          : `Limite atualizado com sucesso para ${mesNome}/${limiteObjeto.ano}`;

      ToastAndroid.show(mensagem, ToastAndroid.SHORT);
      incorporarLimiteObjeto(null);
      mountPage();
      setErro(""); // Limpar mensagem de erro após sucesso
    } catch (error) {
      setErro(error.message);
    }
  };

  /*
   * ------------------------------------------------------------------
   * View
   * ------------------------------------------------------------------
   */
  return (
    <ScrollView style={styles.container}>
      <RemoverModal
        modalVisible={modalRemoverVisible}
        setModalVisible={setModalRemoverVisible}
        title={"Confirmar remoção"}
        name={
          "Tem certeza que deseja remover o limite de '" +
          limiteRemocaoMesAno +
          "'?"
        }
        removerAction={handleRemoverLimite}
      />
      <View style={styles.subContainer}>
        <Title title={idLimite === 0 ? "Cadastrar Limite" : "Editar Limite"} />
        <MoneyInput
          value={limiteCadastro}
          label={"Limite"}
          onValueChange={setLimiteCadastro}
        />
        <SelectMesAnoInput
          label={"Período"}
          editable={idLimite === 0} // Desabilitar edição de período durante edição
          mes={mesCadastro}
          mesLista={mesListaCadastro}
          onMesChange={(valor) => {
            setMesCadastro(valor);
            setErro(""); // Limpar erro quando o usuário muda a data
          }}
          ano={anoCadastro}
          anoLista={anoListaCadastro}
          onAnoChange={(valor) => {
            setAnoCadastro(valor);
            setErro(""); // Limpar erro quando o usuário muda a data
          }}
          bloquearDatasAnteriores={true}
        />
        {erro ? <Text style={styles.erro}>{erro}</Text> : null}
        <View style={styles.botoesCadastrar}>
          {idLimite !== 0 ? (
            <View style={styles.botoesCadastrarUnidade}>
              <Pressable text={"Cancelar"} action={handleCancelar} />
            </View>
          ) : null}
          <View style={styles.botoesCadastrarUnidade}>
            <Pressable
              text={idLimite === 0 ? "Cadastrar" : "Salvar edição"}
              action={handleSalvarLimite}
            />
          </View>
        </View>
      </View>

      <View style={styles.subContainerConsultar}>
        <Title title={"Consultar"} />
        <SelectMesAnoInput
          label={"Período"}
          editable={true}
          mes={mesConsulta}
          mesLista={mesListaConsulta}
          onMesChange={setMesConsulta}
          ano={anoConsulta}
          anoLista={anoListaConsulta}
          onAnoChange={setAnoConsulta}
        />
        {limiteConsulta == null ? (
          <Title title={"Sem limite cadastrado"} />
        ) : (
          <LimiteCard
            valor={limiteConsulta.valor}
            editAction={() => handleEditarLimite(limiteConsulta)}
            removeAction={() => handleModalDeRemocao(limiteConsulta)}
            mes={limiteConsulta.mes}
            ano={limiteConsulta.ano}
          />
        )}
      </View>
    </ScrollView>
  );
}
