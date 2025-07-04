import { Alert, StatusBar, View } from "react-native";

import { Button } from "@/components/Button";
import { HomeHeader } from "@/components/HomeHeader";
import { List } from "@/components/List";
import { Loading } from "@/components/Loading";
import { Target, TargetProps } from "@/components/Target";
import { useTargetDatabase } from "@/database/useTargetDatabase";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";

const summary = {
  total: "R$ 2.680,00",
  input: { label: "Entradas", value: "R$ 6.184,90" },
  output: { label: "Saídas", value: "R$ 6.184,90" },
};

export default function Index() {
  const [isFetching, setFetching] = useState(true);
  const [targets, setTargets] = useState<TargetProps[]>([]);

  const targetDatabase = useTargetDatabase();

  const fetchTargets = async (): Promise<TargetProps[]> => {
    try {
      const response = await targetDatabase.listBySavedValue();

      return response.map((item) => ({
        id: String(item.id),
        name: item.name,
        current: String(item.current),
        percentage: item.percentage.toFixed(0) + "%",
        target: String(item.amount),
      }));
    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar as metas.");
      console.log(error);
      return [];
    }
  };

  const fetchData = async () => {
    const targetDataPromise = fetchTargets();

    const [targetData] = await Promise.all([targetDataPromise]);

    setTargets(targetData);
    setFetching(false);
  };

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );

  if (isFetching) {
    return <Loading />;
  }

  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" />
      <HomeHeader data={summary} />
      <List
        title="Metas"
        keyExtractor={(item) => item.id}
        data={targets}
        renderItem={({ item }) => (
          <Target
            data={item}
            onPress={() => router.navigate(`/in-progress/${item.id}`)}
          />
        )}
        emptyMessage="Nenhum meta. Toque em nova para criar."
        containerStyle={{ paddingHorizontal: 24 }}
      />
      <View style={{ padding: 24, paddingBottom: 32 }}>
        <Button title="Nova meta" onPress={() => router.navigate("/target")} />
      </View>
    </View>
  );
}
