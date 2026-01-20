import { useTheme } from "@/context/ThemeContext";
import { Text, View } from "react-native";

export default function Index() {
  const { theme } = useTheme();
  return (
    <View
      className={`flex-1 items-center justify-center ${theme === "dark" ? "bg-black" : "bg-white"}`}
    >
      <Text className="text-purple-950">
        Edit app/index.tsx to edit this screen.
      </Text>
    </View>
  );
}
