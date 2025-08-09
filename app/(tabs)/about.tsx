import { Colors } from '@/constants/colors';
import React from 'react';
import { Image, Linking, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function AboutScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>

      {/* Logo and App Name */}
      <View style={[styles.imageContainer, {borderColor: Colors.primary800}]}>
              <Image
                source={
                  require('@/assets/images/icon.jpg')
                // {
                //   uri: "file:///data/user/0/host.exp.exponent/cache/ExperienceData/%40anonymous%2FGeoGallery-180f82e6-3a52-4ca9-82c5-e16c1d1b5bc4/Camera/1d96089f-2108-4666-8c4b-b361536d29d5.jpg"
                // }
                }
                style={styles.image}
              />
            </View>
      <Text style={[styles.appName, {color: Colors.accent500}]}>GeoGallery</Text>

      {/* App Description */}
      <View style={styles.card}>
        <Text style={styles.sectionText}>
          GeoGallery lets you capture photos of places and pin them to exact map locations. So you can revisit your memories, share your adventures, and build your personal travel gallery!
        </Text>
      </View>

      {/* Developer Info */}
      <View style={styles.card}>
        <Text style={styles.label}>👨‍💻 Developed by:</Text>
        <Text style={styles.info}>Aadim Gyawali</Text>

        <View style={{ flex: 1, flexDirection:'row', justifyContent:"space-around" }}>
          <View>
            <Pressable onPress={() => Linking.openURL('https://github.com/gyawaliaadim')}>
              <Image source={require("@/assets/images/github.png")} style={styles.socialLogo} />
            </Pressable>
          </View>
          <View>
            <Pressable onPress={() => Linking.openURL('https://www.linkedin.com/in/aadimgyawali/')}>
              <Image source={require("@/assets/images/linkedin.png")} style={styles.socialLogo} />

            </Pressable>
          </View>
        </View>

      </View>
      {/* About Me */}
      <View style={styles.card}>
        <Text style={styles.label}>🧑 About Me:</Text>
        <Text style={styles.sectionText}>
          I'm a student and passionate coder building creative tools using web and mobile technologies. GeoGallery is one of my personal projects that combines my love for tech and travel.
        </Text>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: Colors.primary50,
  },
  content: {
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 16,
  },
  socialLogo:{
    width:50,
    height:50,
    
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
  logo: {
    width: 100,
    height: 100,  
    marginBottom: 12,
    borderRadius:20,
  },
  appName: {
        fontSize: 36,
    fontWeight: "900",
    textAlign: "center",
    textShadowColor: 'black',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    marginBottom:20,

  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    width: '100%',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 3,
  },
  sectionText: {
    fontSize: 15,
    color: Colors.gray700,
    lineHeight: 22,
  },
  label: {
    fontWeight: '600',
    textAlign:"center",
    color: Colors.gray700,
    marginTop: 12,
  },
  info: {
    textAlign:"center",
    color: Colors.gray700,
    marginBottom: 4,
  },
  link: {
    color: Colors.primary500,
    textDecorationLine: 'underline',
  },
});
