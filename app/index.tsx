import Button from "@/components/UI/Button";
import { Colors } from "@/constants/colors";
import { router } from "expo-router";
import { Image, StyleSheet, Text, View } from "react-native";
export default function Index() {
  const handlePress =()=>{
    // router.dismissTo("/(tabs)")
    router.push("/(tabs)")
  }
  return (
    <View style={styles.mainView}>
      <View style={[styles.imageContainer, {borderColor: Colors.primary800}]}>
        <Image
          source={require('@/assets/images/icon.jpg')}
          style={styles.image}
        />
      </View>
      <Text style={[styles.headerTitle, { color: Colors.accent500 }]}>Welcome to GeoGallery</Text>
            <Button
      size="me"
      text="Enter"
      color={Colors.accent700}
      pressHandler={handlePress}
      textColor={Colors.gray700}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "#fff", // optional: for visibility
  },
  imageContainer: {
    width: 150,
    height: 150,
    borderRadius: 75, // half of width/height to make a circle
    overflow: "hidden",
    marginBottom: 20,
    borderWidth:5,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: "900",
    textAlign: "center",
    textShadowColor: 'black',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,


  },
});
