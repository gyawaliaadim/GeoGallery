import { Stack } from "expo-router";
import { StatusBar } from "react-native";

export default function RootLayout() {
  return (
    <>
      <StatusBar backgroundColor={"black"}
      barStyle={"dark-content"}
      />
      <Stack
        screenOptions={{
          title: "Add a new place",
          contentStyle: { backgroundColor: 'transparent' },
          headerTitleStyle: {
            color: "white"
          },
          headerStyle: {
            backgroundColor: "rgba(50, 50, 50, 1)",
          },
          headerTintColor: "white"

        }}
      >
        <Stack.Screen
          name="addPlaces"
          options={{
            presentation: "modal"
          }}
        />

      </Stack>
    </>
  );
}
