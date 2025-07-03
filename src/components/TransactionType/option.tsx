import { ColorValue, Pressable, PressableProps, Text } from "react-native";

import { colors } from "@/theme";
import { MaterialIcons } from "@expo/vector-icons";
import { styles } from "./styles";

type OptionProps = PressableProps & {
  isSelected: boolean;
  title: string;
  icon: keyof typeof MaterialIcons.glyphMap;
  selectedColor: ColorValue;
};

export function Option({
  isSelected,
  title,
  icon,
  selectedColor,
  ...rest
}: OptionProps) {
  return (
    <Pressable
      style={[styles.option, isSelected && { backgroundColor: selectedColor }]}
      {...rest}
    >
      <MaterialIcons name={icon} size={24} color={colors.gray[500]} />

      <Text
        style={[styles.title, isSelected && { color: colors.white }]}
      ></Text>
    </Pressable>
  );
}
