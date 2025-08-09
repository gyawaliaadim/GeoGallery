import { Colors } from '@/constants/colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import { router, Tabs } from "expo-router";
import { StatusBar } from 'react-native';

export default function RootLayout() {
  return (
    <>
      <StatusBar backgroundColor={"black"} />
      <Tabs
      backBehavior='firstRoute'
        screenOptions={{
          
          sceneStyle: {
            backgroundColor: "transparent"
          },
          headerTitleStyle: {
            color: "white"
          },
          headerStyle: {
            backgroundColor: "rgba(50, 50, 50, 1)",
          },
          tabBarStyle: {
            backgroundColor: "rgba(50, 50, 50, 0.75)"
          },

          headerRight(props) {
            return (
              <Ionicons
                name="add"
                size={32}
                color={Colors.primary100}
                style={{
                  marginHorizontal:30
                }}
                onPress={() => router.push("/addPlaces")}
              />
            );
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            headerTitle: "Your Saved Places",
            title: "Home",
            tabBarLabelPosition: "below-icon",
            tabBarShowLabel: true,
            tabBarIcon: ({ focused, color, size }) =>
              focused ? <Ionicons name="home" size={size} color={color} /> : <Ionicons name="home-outline" size={size} color={color} />,

          }} />
        <Tabs.Screen
          name="about"
          options={{
            title: "About",
            tabBarLabelPosition: "below-icon",
            tabBarShowLabel: true,
            tabBarIcon: ({ focused, color, size }) =>
              focused ? <Ionicons name="information-circle" size={size} color={color} /> : <Ionicons name="information-circle-outline" size={size} color={color} />,
          }} />
      </Tabs>
    </>
  )
}
