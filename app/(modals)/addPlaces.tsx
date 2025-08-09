
// import * as ImagePicker from 'expo-image-picker';
import ImageInput from '@/components/Functional/ImageInput';
import LocationInput from '@/components/Functional/LocationInput';
import Button from '@/components/UI/Button';
import { Colors } from '@/constants/colors';
import { deletePlace, fetchPlaceDetails, insertPlace, updatePlace } from "@/util/database";
import { router, useLocalSearchParams, useNavigation } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';
export default function AddPlaceScreen() {
  const [title, setTitle] = useState('');
  const [uri, setUri] = useState<string | null>(null);
  const [location, setLocation] = useState({ latitude: "", longitude: "" });
  const [err, setErr] = useState<string | null>(null)
  const [address, setAddress] = useState<string | null>(null);
  const [id, setId] = useState<string | null>(null);
  const navigation = useNavigation();
  const { idParam } = useLocalSearchParams();
  console.log("id param ", idParam)
  useEffect(() => {

    const runAsync = async () => {

      const response = await fetchPlaceDetails(Number(idParam))
      // const dataArray = Array.from(response);
      console.log(response)
      navigation.setOptions({ title: response.title })
      setTitle(response.title)
      setAddress(response.address)
      setLocation({ latitude: response.lat.toString(), longitude: response.lng.toString() })
      setUri(response.imageUri)
      setId(response.id.toString())
      console.log(location)
    }
    runAsync();
  }, [])
  const validateInputs = () => {
    // URL Validation

    if (uri !== "" && !uri?.startsWith("file://")) {
      setErr("Please store a image!");
      return false;
    }

    // Title Validation
    if (title === "") {
      setErr("Title cannot be empty");
      return false;
    }
    if (title.length < 3) {
      setErr("Title must be at least 3 characters long");
      return false;
    }

    // Location Validation
    const lat = Number(location.latitude);
    const lon = Number(location.longitude);
    console.log(lat, lon, typeof lat)
    if (isNaN(lat) || isNaN(lon)) {
      setErr("Latitude and Longitude must be valid numbers");
      return false;
    }
    if (lat < -90 || lat > 90) {
      setErr("Latitude must be between -90 and 90");
      return false;
    }
    if (lon < -180 || lon > 180) {
      setErr("Longitude must be between -180 and 180");
      return false;
    }

    // If all validations pass
    setErr(null);
    return true;
  };

  const handleDelete = async () => {
    await deletePlace(Number(id))
    router.push('/(tabs)')
  }

  const handleSubmit = async () => {
    const validated = validateInputs()


    if (validated) {
      let place = {
        title: title,
        imageUri: uri ? uri : "",
        address: address,
        lat: parseFloat(location.latitude),
        lng: parseFloat(location.longitude)
      }

      if (id) {
        await updatePlace(Number(id), place)
        router.push('/(tabs)')
      }
      else {
        // console.log("inserting")
        await insertPlace(place)
        router.push('/(tabs)')
        console.log("inserting")
      }

      router.push('/(tabs)')
    }
  }



  const handleFoundUser = (latitude: string, longitude: string) => {
    setLocation({ latitude, longitude });
  };
  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      {/* Title Input */}
      <Text style={styles.label}>Title</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter a title..."
        value={title}
        onChangeText={setTitle}
      />
      <View style={{
        borderBottomColor: Colors.primary900,
        borderBottomWidth: StyleSheet.hairlineWidth,
      }} />
      <ImageInput
        onPick={(uriAddress) => {
          console.log(uriAddress)
          setUri(uriAddress)
        }}
        imageUriParam={uri}
      />
      <View style={{
        borderBottomColor: Colors.primary900,
        borderBottomWidth: StyleSheet.hairlineWidth,
      }} />
      <LocationInput
        onFoundUser={handleFoundUser}
        lat={location.latitude}
        lng={location.longitude}
      />
      {
        err ?
          <Text style={{ fontSize: 16, color: '#e32d3f', fontWeight: 'bold', textAlign: 'center' }}>{err}</Text> :
          <></>
      }
      <View style={{
        borderBottomColor: Colors.primary900,
        borderBottomWidth: StyleSheet.hairlineWidth,
      }} />
      <Text style={styles.title}>Address Name <Text style={{ color: 'red' }}>*</Text></Text>
      <TextInput
        style={styles.input}
        placeholder="Enter a title..."
        value={address ? address : ""}
        onChangeText={setAddress}
      />
      <View style={{
        borderBottomColor: Colors.primary900,
        borderBottomWidth: StyleSheet.hairlineWidth,
      }} />
      {/* Submit Button */}
      <Button
        size="la"
        text={id ? "Update Place" : "Add Place"}
        color={Colors.accent700}
        pressHandler={handleSubmit}
      />
      {
        id ?
          <Button
            size="la"
            text={"Delete Place"}
            color="#ff3030"
            pressHandler={handleDelete}
          /> : null
      }


    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 24,
    paddingBottom: 64,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: Colors.primary800,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.primary200,
    backgroundColor: Colors.primary50,
    padding: 8,
    borderRadius: 8,
    fontSize: 14,
    marginBottom: 16,
  },
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
  locationPreview: {
    height: 300,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.primary200,
    backgroundColor: Colors.primary100,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    marginBottom: 12,
  },
  previewText: {
    fontSize: 14,
    color: Colors.primary700,
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  title: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.primary900,
    marginVertical: 20
  }
})
