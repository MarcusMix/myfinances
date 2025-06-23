import { styles } from './LimitStyle';
import { ScrollView, Text, View, ToastAndroid } from 'react-native';
import AppMoneyInput from "../../component/appMoneyInput/AppMoneyInput";
import * as React from "react";
import { useEffect, useState } from "react";
import AppSelectMesAnoInput from "../../component/appSelectMesAnoInput/AppSelectMesAnoInput";
import { getAnoAtual, getMesAtual, MESES } from '../../services/utils'
import AppTitle from "../../component/appTitle/AppTitle";
import AppPressable from "../../component/appPressable/AppPressable";
import AppLimiteCard from "../../component/appLimiteCard/AppLimiteCard";
import { getLimitesPorMes, removerLimite, salvarLimite } from "../../services/limiteService";
import AppRemoverModal from "../../component/appRemoverModal/AppRemoverModal";

export default function Limit() {

  /*
   * ------------------------------------------------------------------
   * variáveis useState()
   * ------------------------------------------------------------------
   */
  const [limiteConsulta, setLimiteConsulta] = useState(null)
  const [erro, setErro] = useState("")

  const [modalRemoverVisible, setModalRemoverVisible] = useState(false)
  const [limiteRemocaoId, setLimiteRemocaoId] = useState(0)
  const [limiteRemocaoMesAno, setLimiteRemocaoMesAno] = useState("")

  const [idLimite, setIdLimite] = useState(0)
  const [limiteCadastro, setLimiteCadastro] = useState(0)
  const [mesCadastro, setMesCadastro] = useState(getMesAtual())
  const [anoCadastro, setAnoCadastro] = useState(getAnoAtual())
  const mesListaCadastro = MESES
  const anoListaCadastro = ["2021", "2022", "2023", "2024", "2025"]

  const [mesConsulta, setMesConsulta] = useState(getMesAtual())
  const [anoConsulta, setAnoConsulta] = useState(getAnoAtual())
  const mesListaConsulta = MESES
  const anoListaConsulta = ["2021", "2022", "2023", "2024", "2025"]


  /*
   * ------------------------------------------------------------------
   * funções da página
   * montar a página, rolar, etc
   * ------------------------------------------------------------------
   */
  const mountPage = async () => {
    try {
      const limite = await getLimitesPorMes(Number(mesConsulta), Number(anoConsulta))
      setLimiteConsulta(limite && limite.length > 0 ? limite[0] : null)
      setErro("")
    } catch (error) {
      setLimiteConsulta(null)
      console.log("Erro ao buscar limite", error)
    }
  }

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
      setIdLimite(0)
      setLimiteCadastro(0)
      setMesCadastro(getMesAtual())
      setAnoCadastro(getAnoAtual())
    } else {
      setIdLimite(limiteObjeto.id)
      setLimiteCadastro(limiteObjeto.valor)
      setMesCadastro(limiteObjeto.mes.toString())
      setAnoCadastro(limiteObjeto.ano.toString())
    }
  }

  function montarLimiteObjeto() {
    const obj = {
      id: idLimite,
      valor: limiteCadastro,
      mes: parseInt(mesCadastro),
      ano: parseInt(anoCadastro)
    };
    console.log("Objeto de limite montado:", obj);
    return obj;
  }

  function handleCancelar() {
    incorporarLimiteObjeto(null)
    setErro("")
  }


  /*
   * ------------------------------------------------------------------
   * funções de CRUD
   * salvar, remover, editar, etc
   * ------------------------------------------------------------------
   */
  const handleModalDeRemocao = (limiteObjeto) => {
    setLimiteRemocaoId(limiteObjeto.id)
    setLimiteRemocaoMesAno(limiteObjeto.mes + "/" + limiteObjeto.ano)
    setModalRemoverVisible(true)
  }

  const handleRemoverLimite = async () => {
    setModalRemoverVisible(false)
    try {
      await removerLimite(limiteRemocaoId)
      ToastAndroid.show("Limite removido com sucesso", ToastAndroid.SHORT)
      mountPage()
    } catch (error) {
      setErro(error.message)
    }
  }
  const handleEditarLimite = (limiteObjeto) => {
    setErro("")
    incorporarLimiteObjeto(limiteObjeto)
  }
  const handleSalvarLimite = async () => {
    const limiteObjeto = montarLimiteObjeto()
    console.log("Salvando limite com objeto:", limiteObjeto);
    try {
      await salvarLimite(limiteObjeto)
      ToastAndroid.show("Limite salvo com sucesso", ToastAndroid.SHORT)
      incorporarLimiteObjeto(null)
      mountPage()
    } catch (error) {
      setErro(error.message)
    }
  }


  /*
   * ------------------------------------------------------------------
   * View
   * ------------------------------------------------------------------
   */
  return (

    <ScrollView style={styles.container}>

      <AppRemoverModal
        modalVisible={modalRemoverVisible}
        setModalVisible={setModalRemoverVisible}
        title={"Confirmar remoção"}
        name={"Tem certeza que deseja remover o limite de '" + limiteRemocaoMesAno + "'?"}
        removerAction={handleRemoverLimite}
      />


      <View style={styles.subContainer}>
        <AppTitle title={idLimite === 0 ? "Cadastrar Limite" : "Editar Limite"} />
        <AppMoneyInput value={limiteCadastro} label={"Limite"} onValueChange={setLimiteCadastro} />
        <AppSelectMesAnoInput
          label={"Período"}
          editable={true}
          mes={mesCadastro}
          mesLista={mesListaCadastro}
          onMesChange={setMesCadastro}
          ano={anoCadastro}
          anoLista={anoListaCadastro}
          onAnoChange={setAnoCadastro}
          bloquearDatasAnteriores={true}
        />
        {erro ? <Text style={styles.erro}>{erro}</Text> : null}
        <View style={styles.botoesCadastrar}>
          {idLimite !== 0 ?
            <View style={styles.botoesCadastrarUnidade}>
              <AppPressable
                text={"Cancelar"}
                action={handleCancelar}
              />
            </View> : null}
          <View style={styles.botoesCadastrarUnidade}>
            <AppPressable
              text={idLimite === 0 ? "Cadastrar" : "Salvar edição"}
              action={handleSalvarLimite}
            />
          </View>

        </View>
      </View>

      <View style={styles.subContainerConsultar}>
        <AppTitle title={"Consultar"} />
        <AppSelectMesAnoInput label={"Período"} editable={true} mes={mesConsulta} mesLista={mesListaConsulta} onMesChange={setMesConsulta} ano={anoConsulta} anoLista={anoListaConsulta} onAnoChange={setAnoConsulta} />
        {limiteConsulta == null ? <AppTitle title={"Sem limite cadastrado"} /> :
          <AppLimiteCard
            valor={limiteConsulta.valor}
            editAction={() => handleEditarLimite(limiteConsulta)}
            removeAction={() => handleModalDeRemocao(limiteConsulta)}
            mes={limiteConsulta.mes}
            ano={limiteConsulta.ano}
          />}
      </View>

    </ScrollView>
  )
}