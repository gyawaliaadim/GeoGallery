import { Colors } from '@/constants/colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import { router, Stack, useLocalSearchParams } from "expo-router";
export default function Layout() {
  const { id } = useLocalSearchParams();
  // const { id } = params;
  console.log(id);
  return <Stack

    screenOptions={{
      contentStyle: {
        backgroundColor: "transparent"
      },
      headerTitleStyle: {
        color: "white"
      },
      headerStyle: {
        backgroundColor: "rgba(50, 50, 50, 1)",
      },
      headerRight() {
        return <Ionicons name="create" size={32} color={Colors.primary100}
          onPress={() => router.navigate({
            pathname: '/(modals)/addPlaces',
            params: { idParam: id }
          })} />
      }
    }}

  >
    <Stack.Screen
      name='[id]'
      options={{

      }}

    />

  </Stack>
    ;
}
