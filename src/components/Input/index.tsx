import { colors } from "@/theme";
import { Text, TextInput, TextInputProps, View } from "react-native";
import { styles } from "./styles";

type InputProps = TextInputProps & {
  label: string;
};

export function Input({ label, ...rest }: InputProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        placeholderTextColor={colors.gray[400]}
        {...rest}
      />
    </View>
  );
}
