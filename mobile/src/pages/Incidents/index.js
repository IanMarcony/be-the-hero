import React, { useState, useEffect } from "react";
import { View, Image, FlatList, Text, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import logoImg from "../../assets/logo.png";
import api from "../../services/api";
import styles from "./styles";

export default function Incidents() {
  const navigation = useNavigation();
  const [incidents, setIncidents] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  function navigateToDetail(incident) {
    navigation.navigate("Detail", { incident });
  }
  async function loadIncident() {
    if (loading) {
      return;
    }
    if (total > 0 && incidents.length === total) {
      return;
    }
    setLoading(true);
    const res = await api.get("incidents", {
      params: { page },
    });

    setIncidents([...incidents, ...res.data]);

    setTotal(res.headers["x-total-count"]);
    setPage(page + 1);
    setLoading(false);
  }
  useEffect(() => {
    loadIncident();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg} />
        <Text style={styles.headerText}>
          Total de <Text style={styles.headerTextBold}>{total} casos</Text>.
        </Text>
      </View>
      <Text style={styles.title}>Bem-vindo</Text>
      <Text style={styles.description}>
        Escolha um dos casos abaixo e salve o dia.
      </Text>
      <FlatList
        style={styles.incidentList}
        data={incidents}
        keyExtractor={(incident) => String(incident.ong_id)}
        onEndReached={loadIncident}
        onEndReachedThreshold={0.2}
        showsVerticalScrollIndicator={false}
        renderItem={({ item: incident }) => (
          <View style={styles.incident}>
            <Text style={styles.incidentProperty}>ONG:</Text>
            <Text style={styles.incidentValue}>{incident.name}</Text>
            <Text style={styles.incidentProperty}>Caso:</Text>
            <Text style={styles.incidentValue}>{incident.title}</Text>
            <Text style={styles.incidentProperty}>Descrição:</Text>
            <Text style={styles.incidentValue}>{incident.description}</Text>
            <Text style={styles.incidentProperty}>Valor:</Text>
            <Text style={styles.incidentValue}>
              {" "}
              {Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(incident.value)}
            </Text>

            <TouchableOpacity
              style={styles.detailsButton}
              onPress={() => navigateToDetail(incident)}
            >
              <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
              <Feather name="arrow-right" size={16} color="#E02041" />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}
