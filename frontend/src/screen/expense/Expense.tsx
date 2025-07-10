import { styles } from "./ExpenseStyle";
import { ScrollView, Text, View, ToastAndroid, Platform } from "react-native";
import Title from "../../component/Title/Title";
import MoneyInput from "../../component/MoneyInput/MoneyInput";
import TextInput from "../../component/TextInput/TextInput";
import * as React from "react";
import { useEffect, useRef, useState } from "react";
import {
  formatarMoedaSemDecimal,
  getAnoAtual,
  getMesAtual,
  MESES,
} from "../../services/utils";
import Ionicons from "@expo/vector-icons/Ionicons";
import CategoryPicker from "../../component/CategoryPicker/CategoryPicker";
import SelectMesAnoInput from "../../component/SelectMesAnoInput/SelectMesAnoInput";
import Pressable from "../../component/Pressable/Pressable";
import DespesaCard from "../../component/DespesaCard/DespesaCard";
import { Picker } from "@react-native-picker/picker";
import IconeInput from "../../component/IconeInput/IconeInput";
import IconeModal from "../../component/IconeModal/IconeModal";
import {
  getDespesasPorMes,
  removerDespesa,
  salvarDespesa,
} from "../../services/despesaService";
import RemoverModal from "../../component/RemoverModal/RemoverModal";
import { PieChart } from "react-native-gifted-charts";

export default function Expense() {
  /*
   * ------------------------------------------------------------------
   * variáveis useState()
   * ------------------------------------------------------------------
   */
  const [despesas, setDespesas] = useState([]);
  const [despesasGrafico, setDespesasGrafico] = useState([]);

  const [erro, setErro] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const [modalRemoverVisible, setModalRemoverVisible] = useState(false);
  const [despesaRemocaoId, setDespesaRemocaoId] = useState(0);
  const [despesaRemocaoDescricao, setDespesaRemocaoDescricao] = useState("");

  const [idDespesa, setIdDespesa] = useState(0);
  const [descricao, setDescricao] = useState("");
  const [categoria, setCategoria] = useState("casa");
  const [valor, setValor] = useState(0);
  const [mesCadastro, setMesCadastro] = useState(getMesAtual());
  const [anoCadastro, setAnoCadastro] = useState(getAnoAtual());

  // Lista de categorias com ícones correspondentes
  const categorias = [
    { name: "Casa", value: "casa", icon: "home-outline" },
    { name: "Mercado", value: "mercado", icon: "cart-outline" },
    { name: "Lazer", value: "lazer", icon: "game-controller-outline" },
    { name: "Transporte", value: "transporte", icon: "car-outline" },
    { name: "Saúde", value: "saude", icon: "medical-outline" },
    { name: "Educação", value: "educacao", icon: "school-outline" },
    { name: "Restaurantes", value: "restaurantes", icon: "restaurant-outline" },
    { name: "Vestuário", value: "vestuario", icon: "shirt-outline" },
    { name: "Utilidades", value: "utilidades", icon: "bulb-outline" },
    { name: "Viagem", value: "viagem", icon: "airplane-outline" },
    { name: "Seguros", value: "seguros", icon: "shield-checkmark-outline" },
    { name: "Presentes", value: "presentes", icon: "gift-outline" },
    { name: "Tecnologia", value: "tecnologia", icon: "hardware-chip-outline" },
    {
      name: "Cuidados Pessoais",
      value: "cuidados_pessoais",
      icon: "heart-outline",
    },
    { name: "Diversos", value: "diversos", icon: "list-outline" },
  ];

  const [mesConsulta, setMesConsulta] = useState(getMesAtual());
  const [anoConsulta, setAnoConsulta] = useState(getAnoAtual());

  const mesListaCadastro = MESES;
  const anoListaCadastro = ["2025", "2026"];

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
      const despesas = await getDespesasPorMes(
        Number(mesConsulta),
        Number(anoConsulta),
      );
      // Ensure all despesas have a categoria property
      const despesasComCategoria = despesas.map((despesa) => ({
        ...despesa,
        categoria: despesa.categoria || "diversos",
      }));
      setDespesas(despesasComCategoria);
      montarDadosDoGrafico(despesasComCategoria);
      setErro("");
    } catch (error) {
      setDespesas([]);
    }
  };

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
      setIdDespesa(0);
      setDescricao("");
      setCategoria("casa");
      setValor(0);
      setMesCadastro(getMesAtual());
      setAnoCadastro(getAnoAtual());
      return;
    }
    setIdDespesa(despesaObjeto.id);
    setDescricao(despesaObjeto.descricao);
    setCategoria(despesaObjeto.categoria || "casa");
    setValor(despesaObjeto.valor);
    setMesCadastro(despesaObjeto.mes.toString());
    setAnoCadastro(despesaObjeto.ano.toString());
  }

  function montarDespesaObjeto() {
    // Find the selected category to get its icon
    const selectedCategory = categorias.find((cat) => cat.value === categoria);
    return {
      id: idDespesa,
      descricao: descricao,
      categoria: categoria,
      valor: valor,
      mes: parseInt(mesCadastro),
      ano: parseInt(anoCadastro),
    };
  }

  function handleCancelar() {
    incorporarDespesaObjeto(null);
    setErro("");
  }

  function montarDadosDoGrafico(_despesas) {
    const dados = [];
    const dadosAgregadosPorCategoria = [];
    _despesas.forEach((despesa) => {
      const index = dadosAgregadosPorCategoria.findIndex(
        (item) => item.categoria === despesa.categoria,
      );
      if (index === -1) {
        // Find the category object to get the proper icon and name
        const categoriaObj = categorias.find(
          (c) => c.value === (despesa.categoria || "diversos"),
        );
        dadosAgregadosPorCategoria.push({
          categoria: despesa.categoria || "diversos",
          valor: despesa.valor,
          nome: categoriaObj?.name || "Diversos",
          icone: categoriaObj?.icon || "list",
        });
      } else {
        dadosAgregadosPorCategoria[index].valor += despesa.valor;
      }
    });

    dadosAgregadosPorCategoria.sort((a, b) => b.valor - a.valor);

    // Cores para o gráfico de pizza
    const cores = [
      "#FF6B6B",
      "#4ECDC4",
      "#45B7D1",
      "#96CEB4",
      "#FFEAA7",
      "#DDA0DD",
      "#98D8C8",
      "#F7DC6F",
      "#BB8FCE",
      "#85C1E9",
    ];

    dadosAgregadosPorCategoria.forEach((despesa, index) => {
      dados.push({
        value: despesa.valor,
        text: despesa.nome,
        color: cores[index % cores.length],
        textColor: "white",
        textSize: 12,
        // Add icon information for potential future enhancements
        icon: despesa.icone,
      });
    });

    setDespesasGrafico(dados);
  }

  /*
   * ------------------------------------------------------------------
   * funções de CRUD
   * salvar, remover, editar, etc
   * ------------------------------------------------------------------
   */
  const handleModalDeRemocao = (despesaObjeto) => {
    setDespesaRemocaoId(despesaObjeto.id);
    setDespesaRemocaoDescricao(despesaObjeto.descricao);
    setModalRemoverVisible(true);
  };

  const handleRemoverDespesa = async () => {
    setModalRemoverVisible(false);
    try {
      await removerDespesa(despesaRemocaoId);
      ToastAndroid.show("Despesa removida com sucesso", ToastAndroid.SHORT);
      mountPage();
    } catch (error) {
      console.log("Erro ao remover despesa", error);
    }
  };

  const handleEditarDespesa = (despesaObjeto) => {
    handleScrollToTop();
    setErro("");
    incorporarDespesaObjeto(despesaObjeto);
  };

  const handleSalvarDespesa = async () => {
    const despesaObjeto = montarDespesaObjeto();
    try {
      await salvarDespesa(despesaObjeto);
      ToastAndroid.show("Despesa salva com sucesso", ToastAndroid.SHORT);
      incorporarDespesaObjeto(null);
      mountPage();
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
    <ScrollView ref={scrollViewRef} style={styles.container}>
      <RemoverModal
        modalVisible={modalRemoverVisible}
        setModalVisible={setModalRemoverVisible}
        title={"Confirmar remoção"}
        name={
          "Tem certeza que deseja remover a despesa '" +
          despesaRemocaoDescricao +
          "'?"
        }
        removerAction={handleRemoverDespesa}
      />

      <View style={styles.subContainer}>
        <Title
          title={idDespesa === 0 ? "Cadastrar Despesa" : "Editar Despesa"}
        />

        <View style={styles.rowIconeDescricao}>
          <View style={styles.colDescricao}>
            <TextInput
              text={descricao}
              label={"Descrição"}
              onValueChange={setDescricao}
            />
          </View>
          <View style={styles.colDescricao}>
            <View style={{ marginTop: 0, paddingTop: 0 }}>
              <Text
                style={{
                  textAlign: "left",
                  width: "100%",
                  marginBottom: 4,
                  fontSize: 16,
                  color: "#333",
                  fontWeight: "normal",
                }}
              >
                Categoria
              </Text>
              <View
                style={{
                  borderWidth: 1,
                  borderColor: "#ddd",
                  borderRadius: 6,
                  backgroundColor: "#fff",
                  height: 46,
                  overflow: "hidden",
                  justifyContent: "center",
                }}
              >
                <Picker
                  selectedValue={categoria}
                  onValueChange={(itemValue) => setCategoria(itemValue)}
                  style={{
                    width: "100%",
                    height: 46,
                    marginTop: -5,
                    color: "#333",
                  }}
                  dropdownIconColor="#333"
                  mode="dropdown"
                >
                  {categorias.map((category) => (
                    <Picker.Item
                      key={category.value}
                      label={category.name}
                      value={category.value}
                    />
                  ))}
                </Picker>
              </View>
            </View>
          </View>
        </View>

        <MoneyInput value={valor} label={"Valor"} onValueChange={setValor} />
        <SelectMesAnoInput
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
          {idDespesa !== 0 ? (
            <View style={styles.botoesCadastrarUnidade}>
              <Pressable text={"Cancelar"} action={handleCancelar} />
            </View>
          ) : null}
          <View style={styles.botoesCadastrarUnidade}>
            <Pressable
              text={idDespesa === 0 ? "Cadastrar" : "Salvar edição"}
              action={handleSalvarDespesa}
            />
          </View>
        </View>
      </View>

      <View style={styles.subContainerHistorico}>
        <Title title={"Histórico"} />
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

        {/*https://gifted-charts.web.app/barchart*/}
        {despesasGrafico.length > 0 ? (
          <View style={styles.chartContainer}>
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
                  <View
                    style={{ justifyContent: "center", alignItems: "center" }}
                  >
                    <Text
                      style={{
                        fontSize: 14,
                        color: "black",
                        fontWeight: "bold",
                      }}
                    >
                      Total
                    </Text>
                    <Text style={{ fontSize: 12, color: "gray" }}>
                      {formatarMoedaSemDecimal(
                        despesasGrafico.reduce(
                          (sum, item) => sum + item.value,
                          0,
                        ),
                      )}
                    </Text>
                  </View>
                );
              }}
            />
          </View>
        ) : (
          <View
            style={{
              height: 250,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ color: "gray" }}>
              Não há dados para exibir no gráfico.
            </Text>
          </View>
        )}

        {despesas.length === 0 ? (
          <Title title={"Nenhuma despesa cadastrada"} />
        ) : (
          despesas.map((despesa, index) => (
            <DespesaCard
              key={index}
              descricao={despesa.descricao}
              valor={despesa.valor}
              removeAction={() => handleModalDeRemocao(despesa)}
              editAction={() => handleEditarDespesa(despesa)}
              mes={despesa.mes}
              ano={despesa.ano}
              categoria={despesa.categoria || "diversos"}
            />
          ))
        )}
      </View>
    </ScrollView>
  );
}
