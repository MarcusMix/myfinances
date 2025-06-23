import { styles } from './ExpenseStyle';
import { ScrollView, Text, View, ToastAndroid } from 'react-native';
import AppTitle from "../../component/appTitle/AppTitle";
import AppMoneyInput from "../../component/appMoneyInput/AppMoneyInput";
import AppTextInput from "../../component/appTextInput/AppTextInput";
import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { formatarMoedaSemDecimal, getAnoAtual, getMesAtual, ICONES, MESES } from "../../services/utils";
import AppSelectMesAnoInput from "../../component/appSelectMesAnoInput/AppSelectMesAnoInput";
import AppPressable from "../../component/appPressable/AppPressable";
import AppDespesaCard from "../../component/appDespesaCard/AppDespesaCard";
import AppIconeInput from "../../component/appIconeInput/AppIconeInput";
import AppIconeModal from "../../component/appIconeModal/AppIconeModal";
import { getDespesasPorMes, removerDespesa, salvarDespesa } from "../../services/despesaService";
import AppRemoverModal from "../../component/appRemoverModal/AppRemoverModal";
import { PieChart } from "react-native-gifted-charts";

export default function Expense() {

  /*
   * ------------------------------------------------------------------
   * variáveis useState()
   * ------------------------------------------------------------------
   */
  const [despesas, setDespesas] = useState([])
  const [despesasGrafico, setDespesasGrafico] = useState([])

  const [erro, setErro] = useState("")
  const [modalVisible, setModalVisible] = useState(false)

  const [modalRemoverVisible, setModalRemoverVisible] = useState(false)
  const [despesaRemocaoId, setDespesaRemocaoId] = useState(0)
  const [despesaRemocaoDescricao, setDespesaRemocaoDescricao] = useState("")

  const [idDespesa, setIdDespesa] = useState(0)
  const [icone, setIcone] = useState("receipt")
  const [descricao, setDescricao] = useState("")
  const [valor, setValor] = useState(0)
  const [mesCadastro, setMesCadastro] = useState(getMesAtual())
  const [anoCadastro, setAnoCadastro] = useState(getAnoAtual())

  const [mesConsulta, setMesConsulta] = useState(getMesAtual())
  const [anoConsulta, setAnoConsulta] = useState(getAnoAtual())

  const mesListaCadastro = MESES
  const anoListaCadastro = ["2024", "2025", "2026", "2027", "2028"]

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
      const despesas = await getDespesasPorMes(Number(mesConsulta), Number(anoConsulta))
      setDespesas(despesas)
      montarDadosDoGrafico(despesas)
      setErro("")
    } catch (error) {
      setDespesas([])
    }
  }

  useEffect(() => {
    mountPage();
  }, [mesConsulta, anoConsulta]);

  const scrollViewRef = useRef(null);
  const handleScrollToTop = () => {
    scrollViewRef.current?.scrollTo({ y: 0, animated: true });
  };


  /*
   * ------------------------------------------------------------------
   * funções auxiliares
   * montar objetos, modificar funções de estado, etc
   * ------------------------------------------------------------------
   */
  function incorporarDespesaObjeto(despesaObjeto) {
    if (despesaObjeto === null) {
      setIdDespesa(0)
      setIcone("receipt")
      setDescricao("")
      setValor(0)
      setMesCadastro(getMesAtual())
      setAnoCadastro(getAnoAtual())
      return
    }
    setIdDespesa(despesaObjeto.id)
    setIcone(despesaObjeto.icone)
    setDescricao(despesaObjeto.descricao)
    setValor(despesaObjeto.valor)
    setMesCadastro(despesaObjeto.mes.toString())
    setAnoCadastro(despesaObjeto.ano.toString())
  }

  function montarDespesaObjeto() {
    return {
      id: idDespesa,
      icone: icone,
      descricao: descricao,
      valor: valor,
      mes: parseInt(mesCadastro),
      ano: parseInt(anoCadastro)
    }
  }

  function handleCancelar() {
    incorporarDespesaObjeto(null)
    setErro("")
  }

  function montarDadosDoGrafico(_despesas) {
    const dados = []
    const dadosAgregadosPorIcone = []
    _despesas.forEach(despesa => {
      const index = dadosAgregadosPorIcone.findIndex(item => item.icone === despesa.icone)
      if (index === -1) {
        dadosAgregadosPorIcone.push({ icone: despesa.icone, valor: despesa.valor })
      } else {
        dadosAgregadosPorIcone[index].valor += despesa.valor
      }
    })

    dadosAgregadosPorIcone.sort((a, b) => b.valor - a.valor)

    // Cores para o gráfico de pizza
    const cores = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9']

    dadosAgregadosPorIcone.forEach((despesa, index) => {
      dados.push({
        value: despesa.valor,
        text: despesa.icone,
        color: cores[index % cores.length],
        textColor: 'white',
        textSize: 12,
      })
    })

    setDespesasGrafico(dados)
  }

  /*
   * ------------------------------------------------------------------
   * funções de CRUD
   * salvar, remover, editar, etc
   * ------------------------------------------------------------------
   */
  const handleModalDeRemocao = (despesaObjeto) => {
    setDespesaRemocaoId(despesaObjeto.id)
    setDespesaRemocaoDescricao(despesaObjeto.descricao)
    setModalRemoverVisible(true)
  }

  const handleRemoverDespesa = async () => {
    setModalRemoverVisible(false)
    try {
      await removerDespesa(despesaRemocaoId)
      ToastAndroid.show("Despesa removida com sucesso", ToastAndroid.SHORT)
      mountPage()
    } catch (error) {
      console.log("Erro ao remover despesa", error)
    }
  }

  const handleEditarDespesa = (despesaObjeto) => {
    handleScrollToTop()
    setErro("")
    incorporarDespesaObjeto(despesaObjeto);
  }

  const handleSalvarDespesa = async () => {
    const despesaObjeto = montarDespesaObjeto();
    try {
      await salvarDespesa(despesaObjeto)
      ToastAndroid.show("Despesa salva com sucesso", ToastAndroid.SHORT)
      incorporarDespesaObjeto(null)
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
    <ScrollView ref={scrollViewRef} style={styles.container}>
      {/* <AppIconeModal
        icone={[icone, setIcone]}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        title={"Escolha um ícone"}
        iconeLista={ICONES} /> */}

      <AppRemoverModal
        modalVisible={modalRemoverVisible}
        setModalVisible={setModalRemoverVisible}
        title={"Confirmar remoção"}
        name={"Tem certeza que deseja remover a despesa '" + despesaRemocaoDescricao + "'?"}
        removerAction={handleRemoverDespesa}
      />

      <View style={styles.subContainer}>

        <AppTitle title={idDespesa === 0 ? "Cadastrar Despesa" : "Editar Despesa"} />

        <View style={styles.rowIconeDescricao}>
          {/* <View style={styles.colIcone}>
            <AppIconeInput icone={icone} label={"Ícone"} onPress={() => setModalVisible(true)} />
          </View> */}
          <View style={styles.colDescricao}>
            <AppTextInput text={descricao} label={"Descrição"} onValueChange={setDescricao} />
          </View>
        </View>

        <AppMoneyInput value={valor} label={"Valor"} onValueChange={setValor} />
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
          {idDespesa !== 0 ?
            <View style={styles.botoesCadastrarUnidade}>
              <AppPressable
                text={"Cancelar"}
                action={handleCancelar}
              />
            </View> : null}
          <View style={styles.botoesCadastrarUnidade}>
            <AppPressable
              text={idDespesa === 0 ? "Cadastrar" : "Salvar edição"}
              action={handleSalvarDespesa}
            />
          </View>
        </View>

      </View>


      <View style={styles.subContainerHistorico}>
        <AppTitle title={"Histórico"} />
        <AppSelectMesAnoInput
          label={"Período"}
          editable={true}
          mes={mesConsulta}
          mesLista={mesListaConsulta}
          onMesChange={setMesConsulta}
          ano={anoConsulta}
          anoLista={anoListaConsulta}
          onAnoChange={setAnoConsulta}
        />

        {/*https://gifted-charts.web.app/barchart*/}
        {despesasGrafico.length > 0 ? (
          <PieChart
            data={despesasGrafico}
            donut
            showText
            textColor="black"
            textSize={12}
            radius={120}
            innerRadius={60}
            centerLabelComponent={() => {
              return (
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={{ fontSize: 14, color: 'black', fontWeight: 'bold' }}>
                    Total
                  </Text>
                  <Text style={{ fontSize: 12, color: 'gray' }}>
                    {formatarMoedaSemDecimal(despesasGrafico.reduce((sum, item) => sum + item.value, 0))}
                  </Text>
                </View>
              )
            }}
          />
        ) : (
          <View style={{ height: 250, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: 'gray' }}>Não há dados para exibir no gráfico.</Text>
          </View>
        )}

        {
          despesas.length === 0 ?
            <AppTitle title={"Nenhuma despesa cadastrada"} /> :
            despesas.map((despesa, index) =>
              <AppDespesaCard
                key={index}
                descricao={despesa.descricao}
                valor={despesa.valor}
                removeAction={() => handleModalDeRemocao(despesa)}
                editAction={() => handleEditarDespesa(despesa)}
                icone={despesa.icone}
                mes={despesa.mes}
                ano={despesa.ano}
              />
            )
        }
      </View>

    </ScrollView>
  )
}