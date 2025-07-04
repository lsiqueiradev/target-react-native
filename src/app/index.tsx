import { Alert, StatusBar, View } from "react-native";

import { Button } from "@/components/Button";
import { HomeHeader, HomeHeaderProps } from "@/components/HomeHeader";
import { List } from "@/components/List";
import { Loading } from "@/components/Loading";
import { Target, TargetProps } from "@/components/Target";
import { useTargetDatabase } from "@/database/useTargetDatabase";
import { useTransactionsDatabase } from "@/database/useTransactionsDatabase";
import { numberToCurrency } from "@/utils/numberToCurrency";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";

export default function Index() {
  const [isFetching, setFetching] = useState(true);
  const [targets, setTargets] = useState<TargetProps[]>([]);
  const [summary, setSummary] = useState<HomeHeaderProps>({
    total: numberToCurrency(0),
    input: {
      label: "Entradas",
      value: numberToCurrency(0),
    },
    output: {
      label: "Saídas",
      value: numberToCurrency(0),
    },
  });

  const targetDatabase = useTargetDatabase();
  const transactionsDatabase = useTransactionsDatabase();

  const fetchTargets = async (): Promise<TargetProps[]> => {
    try {
      const response = await targetDatabase.listByClosestTarget();

      return response.map((item) => ({
        id: String(item.id),
        name: item.name,
        current: numberToCurrency(item.current),
        percentage: item.percentage.toFixed(0) + "%",
        target: numberToCurrency(item.amount),
      }));
    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar as metas.");
      console.log(error);
      return [];
    }
  };

  const fetchSummary = async (): Promise<HomeHeaderProps> => {
    try {
      const response = await transactionsDatabase.summary();

      return {
        total: numberToCurrency(
          (response?.input ?? 0) + (response?.output ?? 0)
        ),
        input: {
          label: "Entradas",
          value: numberToCurrency(response?.input ?? 0),
        },
        output: {
          label: "Saídas",
          value: numberToCurrency(response?.output ?? 0),
        },
      };
    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar o resumo.");
      console.log(error);
      return {
        total: numberToCurrency(0),
        input: {
          label: "Entradas",
          value: numberToCurrency(0),
        },
        output: {
          label: "Saídas",
          value: numberToCurrency(0),
        },
      };
    }
  };

  const fetchData = async () => {
    const targetDataPromise = fetchTargets();
    const summaryDataPromise = fetchSummary();

    const [targetData, summaryData] = await Promise.all([
      targetDataPromise,
      summaryDataPromise,
    ]);

    setTargets(targetData);
    setSummary(summaryData);
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
