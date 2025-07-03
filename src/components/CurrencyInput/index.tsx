import { Text, View } from "react-native";

import Input, {
  CurrencyInputProps as CurrencyTextInputProps,
} from "react-native-currency-input";

import { colors } from "@/theme";

import { styles } from "./styles";

type CurrencyInputProps = CurrencyTextInputProps & {
  label: string;
};

export function CurrencyInput({ label, ...rest }: CurrencyInputProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Input
        style={styles.input}
        placeholderTextColor={colors.gray[400]}
        prefix="R$ "
        delimiter="."
        separator=","
        precision={2}
        minValue={0}
        {...rest}
      />
    </View>
  );
}
