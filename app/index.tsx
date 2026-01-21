import { useTheme } from "@/context/ThemeContext";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React from "react";
import {
  Image,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../constants/colors";

export default function Index() {
  const { theme, setTheme } = useTheme();

  type Feature = {
    icon: string;
    text: string;
    description: string;
  };

  const features: Feature[] = [
    {
      icon: "⚡️",
      text: "Fast Performance",
      description:
        "Experience lightning-fast load times and smooth interactions.",
    },
    {
      icon: "🔒",
      text: "Secure",
      description: "Your data is protected with top-notch security measures.",
    },
    {
      icon: "🌐",
      text: "Cross-Platform",
      description: "Works seamlessly on all your devices.",
    },
    {
      icon: "🎨",
      text: "Customizable",
      description: "Tailor the app to your preferences.",
    },
  ];

  return (
    <SafeAreaView
      className={`flex-1 ${theme === "dark" ? "bg-gray-950" : "bg-gray-50"}`}
    >
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-5 pt-8 pb-28">
          {/* Hero Section */}
          <View className="items-center mb-10">
            <Image
              source={require("@/assets/images/landing.png")}
              style={{ width: 160, height: 160, marginBottom: 24 }}
              resizeMode="contain"
            />
            <Text
              className={`text-4xl font-bold text-center mb-2 ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}
            >
              PigaPicTCha
            </Text>
            <Text
              className={`text-base text-center leading-5 ${
                theme === "dark" ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Capture. Share. Create.
            </Text>
            <Text
              className={`text-sm text-center mt-1 ${
                theme === "dark" ? "text-gray-500" : "text-gray-500"
              }`}
            >
              Your moments, amplified
            </Text>
          </View>

          {/* Features Section */}
          <View className="mb-10">
            <Text
              className={`text-xl font-bold mb-4 ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}
            ></Text>
            <View className="w-full flex-row flex-wrap justify-between">
              {features.map((feature, index) => (
                <View
                  key={index}
                  className={`w-[49%] mb-3.5 p-5 rounded-xl border ${
                    theme === "dark"
                      ? "bg-gray-900 border-gray-800"
                      : "bg-white border-gray-200"
                  }`}
                >
                  <Text className="text-3xl mb-2">{feature.icon}</Text>
                  <Text
                    className={`font-semibold text-sm mb-1 ${
                      theme === "dark" ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {feature.text}
                  </Text>
                  <Text
                    className={`text-xs leading-4 ${
                      theme === "dark" ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {feature.description}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          {/* CTA Buttons */}
          <View className="gap-3.5 w-full">
            <TouchableOpacity
              className="h-16 w-full rounded-xl items-center justify-center active:opacity-90"
              style={{
                backgroundColor:
                  colors && colors[theme] ? colors[theme].primary : "#10B981",
              }}
              onPress={() => router.push("/signin")}
            >
              <Text className="text-white font-bold text-base">Sign In</Text>
            </TouchableOpacity>
            <LinearGradient
              colors={
                theme === "dark"
                  ? ["#8B5CF6", "#6366F1"]
                  : ["#A78BFA", "#818CF8"]
              }
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{ borderRadius: 12 }}
            >
              <TouchableOpacity
                className="h-16 w-full rounded-xl items-center justify-center active:opacity-90"
                onPress={() => router.push("/signup")}
              >
                <Text className="text-white font-bold text-base">
                  Create Account
                </Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </View>
      </ScrollView>

      {/* Floating Theme Toggle Button */}
      <Pressable
        onPress={() => setTheme(theme === "dark" ? "light" : "dark")}
        className={`absolute bottom-7 right-7 w-16 h-16 rounded-full items-center justify-center shadow-lg active:scale-95 ${
          theme === "dark" ? "bg-yellow-400" : "bg-purple-600"
        }`}
        style={{ elevation: 6 }}
      >
        <Text className="text-2xl">{theme === "dark" ? "☀️" : "🌙"}</Text>
      </Pressable>
    </SafeAreaView>
  );
}
