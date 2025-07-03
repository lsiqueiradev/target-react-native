import { PageHeader } from "@/components/PageHeader";
import { Progress } from "@/components/Progress";
import { useLocalSearchParams } from "expo-router";
import { View } from "react-native";

const details = {
  current: "R$ 500,80",
  target: "R$ 1.790,00",
  percentage: 25,
};

export default function InProgress() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return (
    <View style={{ flex: 1, padding: 25, gap: 32 }}>
      <PageHeader
        title="Apple Watch"
        rightButton={{
          icon: "edit",
          onPress: () => {},
        }}
      />

      <Progress data={details} />
    </View>
  );
}
