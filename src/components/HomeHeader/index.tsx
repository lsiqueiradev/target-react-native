import { Text, View } from "react-native";

import { colors } from "@/theme";

import { LinearGradient } from "expo-linear-gradient";

import { Separator } from "../Separator";

import { Summary, SummaryProps } from "../Summary";
import { styles } from "./styles";

export type HomeHeaderProps = {
  total: string;
  input: SummaryProps;
  output: SummaryProps;
};

type Props = {
  data: HomeHeaderProps;
};

export function HomeHeader({ data }: Props) {
  return (
    <LinearGradient
      colors={[colors.blue[500], colors.blue[800]]}
      style={styles.container}
    >
      <View>
        <Text style={styles.label}>Total que você possui</Text>
        <Text style={styles.total}>{data.total}</Text>
      </View>
      <Separator color={colors.blue[400]} />

      <View style={styles.summary}>
        <Summary
          data={data.input}
          icon={{ color: colors.green[500], name: "arrow-upward" }}
        />

        <Summary
          data={data.output}
          icon={{ color: colors.red[400], name: "arrow-downward" }}
          isRight
        />
      </View>
    </LinearGradient>
  );
}
