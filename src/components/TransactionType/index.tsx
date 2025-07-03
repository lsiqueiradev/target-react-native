import { colors } from "@/theme";
import { TransactionTypes } from "@/utils/TransactionTypes";
import { View } from "react-native";
import { Option } from "./option";
import { styles } from "./styles";

type TransactionTypeProps = {
  selected: TransactionTypes;
  onChange: (type: TransactionTypes) => void;
};

export function TransactionType({ selected, onChange }: TransactionTypeProps) {
  return (
    <View style={styles.container}>
      <Option
        icon="arrow-upward"
        title="Guardar"
        isSelected={selected === TransactionTypes.Input}
        selectedColor={colors.blue[500]}
        onPress={() => onChange(TransactionTypes.Input)}
      />
      <Option
        icon="arrow-downward"
        title="Resgatar"
        isSelected={selected === TransactionTypes.Output}
        selectedColor={colors.red[400]}
        onPress={() => onChange(TransactionTypes.Output)}
      />
    </View>
  );
}
