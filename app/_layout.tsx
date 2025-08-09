import MainView from "@/components/Functional/MainView";
import { init } from "@/util/database";
import { Stack } from "expo-router";
import { useEffect } from "react";
export default function RootLayout() {
  useEffect(() => {
    (async () => {
      try {
        await init();
        console.log("DB ready");
      } catch (err) {
        console.error("DB init failed", err);
      }
    })();
  }, []);


  return (
    <MainView>
      <Stack

        screenOptions={{
          contentStyle: { backgroundColor: 'transparent' },
          headerShown: false

        }}
      >
        <Stack.Screen
          name="index"
        />
      </Stack>
    </MainView>)
}
