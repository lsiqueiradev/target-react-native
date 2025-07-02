import {
  Rubik_400Regular,
  Rubik_500Medium,
  Rubik_700Bold,
  useFonts,
} from "@expo-google-fonts/rubik";
import { Stack } from "expo-router";

import { Loading } from "@/components/Loading";
import { colors } from "@/theme/colors";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Rubik_700Bold,
    Rubik_400Regular,
    Rubik_500Medium,
  });

  if (!fontsLoaded) {
    return <Loading />;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: colors.white,
        },
      }}
    />
  );
}
