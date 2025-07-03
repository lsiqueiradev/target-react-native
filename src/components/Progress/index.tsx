import { Text, View } from "react-native";
import { styles } from "./styles";

type SavedValue = {
  current: string;
  target: string;
  percentage: number;
};

type ProgressProps = {
  data: SavedValue;
};

export function Progress({ data }: ProgressProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Valor Guardado</Text>
      <View style={styles.status}>
        <Text style={styles.value}>
          {data.current}

          <Text style={styles.target}> de {data.target}</Text>
        </Text>

        <Text style={styles.percentage}>{data.percentage.toFixed(2)}%</Text>
      </View>

      <View style={styles.progress}>
        <View
          style={[styles.currentProgress, { width: `${data.percentage}%` }]}
        />
      </View>
    </View>
  );
}
