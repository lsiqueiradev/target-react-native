import { Alert, View } from "react-native";

import { Button } from "@/components/Button";
import { CurrencyInput } from "@/components/CurrencyInput";
import { Input } from "@/components/Input";
import { PageHeader } from "@/components/PageHeader";
import { useTargetDatabase } from "@/database/useTargetDatabase";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";

export default function Target() {
  const [isProcessing, setProcessing] = useState(false);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState(0);

  const targetDatabase = useTargetDatabase();
  const { id } = useLocalSearchParams<{ id?: string }>();

  const handleSave = () => {
    if (!name.trim() || !amount || amount <= 0) {
      return Alert.alert("Atenção", "Preencha nome e valor");
    }

    setProcessing(true);

    if (id) {
      onUpdate();
    } else {
      onCreate();
    }
  };

  const onUpdate = async () => {
    try {
      await targetDatabase.update({
        id: Number(id),
        name,
        amount,
      });

      Alert.alert("Sucesso!", "Meta atualizada com sucesso!", [
        {
          text: "OK",
          onPress: () => router.back(),
        },
      ]);
    } catch (error) {
      console.log(error);
      Alert.alert("Erro", "Não foi possível atualizar a meta.");
    } finally {
      setProcessing(false);
    }
  };

  const onCreate = async () => {
    try {
      await targetDatabase.create({ name, amount });
      Alert.alert("Nova menta", "Meta criada com sucesso!", [
        {
          text: "Ok",
          onPress: () => router.back(),
        },
      ]);
    } catch (error) {
      console.log(error);
      Alert.alert("Erro", "Não foi possível criar a meta.");
    } finally {
      setProcessing(false);
    }
  };

  const fetchDetails = async (id: number) => {
    try {
      const response = await targetDatabase.show(id);
      setName(response?.name ?? "");
      setAmount(response?.amount ?? 0);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar os detalhes da meta.");
      console.log(error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchDetails(Number(id));
    }
  }, [id]);

  return (
    <View style={{ flex: 1, padding: 24 }}>
      <PageHeader
        title="Meta"
        subtitle="Economize para alcançar sua meta financeira."
        rightButton={{
          icon: "edit",
          onPress: () => {},
        }}
      />
      <View style={{ marginTop: 32, gap: 24 }}>
        <Input
          label="Nome da meta"
          placeholder="Ex: Viagem para praia, Apple Watch"
          value={name}
          onChangeText={setName}
        />

        <CurrencyInput
          label="Valor Alvo (R$)"
          value={amount}
          onChangeValue={(value) => setAmount(value ?? 0)}
        />
        <Button
          title="Salvar"
          onPress={handleSave}
          isProcessing={isProcessing}
        />
      </View>
    </View>
  );
}
