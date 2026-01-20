import { useTheme } from "@/context/ThemeContext";
import { Pressable, Text, View } from "react-native";

export default function Index() {
  const { theme, setTheme, systemTheme } = useTheme();

  return (
    <View
      className={`flex-1 items-center justify-center ${theme === "dark" ? "bg-black" : "bg-white"}`}
    >
      <Text className={theme === "dark" ? "text-white" : "text-purple-950"}>
        Edit app/index.tsx to edit this screen.
      </Text>

      <Text
        className={`mt-4 text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}
      >
        System Theme: {systemTheme || "Not detected"}
      </Text>

      <View className="mt-6 gap-2">
        <Pressable
          onPress={() => setTheme("light")}
          className={`px-4 py-2 rounded ${theme === "light" ? "bg-purple-950" : "bg-gray-300"}`}
        >
          <Text className={theme === "light" ? "text-white" : "text-black"}>
            Light Theme
          </Text>
        </Pressable>

        <Pressable
          onPress={() => setTheme("dark")}
          className={`px-4 py-2 rounded ${theme === "dark" ? "bg-purple-950" : "bg-gray-300"}`}
        >
          <Text className={theme === "dark" ? "text-white" : "text-black"}>
            Dark Theme
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
