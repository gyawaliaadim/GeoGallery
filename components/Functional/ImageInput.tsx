import { Colors } from '@/constants/colors';
import * as FileSystem from "expo-file-system";
import * as ImagePicker from 'expo-image-picker';
import React, { useEffect, useState } from 'react';
import { Alert, Image, StyleSheet, Text, View } from 'react-native';
import Button from '../UI/Button';
const ImageInput = ({ onPick, imageUriParam }: { onPick: (uriAddress: string) => void, imageUriParam: string | null}) => {
  const [uri, setUri] = useState<string | null>(null)
  useEffect(() => {
    if (imageUriParam) setUri(imageUriParam)
  }, [imageUriParam])



  const saveAndSend = async (imageUri: string) => {
    const fileName = imageUri.split("/").pop();
    const newPath = FileSystem.documentDirectory + (fileName ?? "image.jpg");
    console.log('hello')
    try {
      await FileSystem.moveAsync({
        from: imageUri,
        to: newPath,
      });
      setUri(newPath);
      onPick(newPath);
    } catch (err) {
      console.error("Saving image failed:", err);
      Alert.alert("Error", "Could not save the image.");
    }
  };
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });
    // console.log(result);
    if (!result.canceled) {
      setUri(result.assets[0].uri);
    }
    if (result.assets && result.assets[0].uri?.startsWith("file://")) {
      console.log('hello')
      await saveAndSend(result.assets[0].uri)
    }
  };

  const takePhoto = async () => {
    console.log("hello")
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission required", "Camera permission is needed!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
      aspect: [16, 9],

    });
    if (!result.canceled && result.assets && result.assets.length > 0) {
      const uriOutput = result.assets[0].uri;
      if (uriOutput && uriOutput.startsWith("file://")) {
        await saveAndSend(uriOutput);
      }
    }
  };

  return (
    <>
      <Text style={styles.title}>Store a Image</Text>
      {uri ? (
        <View style={styles.imageWrapper}>
          <Image
            key={uri}
            source={{ uri }}
            resizeMode="cover"
            style={styles.image}
          />
        </View>
      ) : (
        <View style={styles.imagePreview}>
          <Text style={styles.previewText}>No Photo picked yet</Text>
        </View>
      )}

      <View style={styles.actionsRow}>
        <Button
          size="me"
          text="Take a Photo"
          color={Colors.primary500}
          pressHandler={takePhoto}
        />
        <Button
          size="me"
          text="Choose Photo"
          color={Colors.primary500}
          pressHandler={pickImage}
        />
      </View>
    </>
  )
}

export default ImageInput;

const styles = StyleSheet.create({
  imageWrapper: {
    width: '100%',
    height: 300,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  imagePreview: {
    width: '100%',
    height: 300,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.primary200,
    backgroundColor: Colors.primary100,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  previewText: {
    fontSize: 14,
    color: Colors.primary700,
  },
  title: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.primary900,
    marginVertical: 20
  }
})
