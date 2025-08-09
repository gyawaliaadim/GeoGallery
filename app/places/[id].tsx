import Button from '@/components/UI/Button';
import { Colors } from '@/constants/colors';
import { PlaceType } from '@/types/placeType';
import { fetchPlaceDetails } from '@/util/database';
import { router, useLocalSearchParams, useNavigation } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
const PlaceDetails = () => {
      const { id } = useLocalSearchParams();
       const navigation = useNavigation();
       const [details, setDetails] = useState<PlaceType>()
  // useEffect(() => {
  //   navigation.setOptions({ title:"helo" });
  // }, [navigation])
  useEffect(() => {

    const runAsync = async () => {
      const response = await fetchPlaceDetails(Number(id))
      // const dataArray = Array.from(response);
      navigation.setOptions({title:response.title})
      setDetails(response)
    }
    runAsync();
  }, [])
    // const { id } = params;
  return (
    <>
    {details?
    <ScrollView
    
    >
       <View style={styles.imageWrapper}>
      <Image style={styles.image} 
      source={{ uri: details.imageUri }}
      resizeMode="cover" />
      </View>
                  <View style={{
              borderBottomColor: Colors.primary900,
              borderBottomWidth: StyleSheet.hairlineWidth,
            }} />
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>{details.address}</Text>
        </View>
        <View>
          <Text style={{textAlign:'center', fontSize:24, fontWeight:"bold", color: Colors.gray700}}>Location</Text>
          <View style={{flex:1, flexDirection:'row', gap:20}}>
          <Text style={{fontSize:20, color: Colors.primary900 }}>Longitude: {details.lat} </Text>
          <Text style={{fontSize:20, color:Colors.primary900}}>Latitude: {details.lng}</Text>
          </View>
        </View>
        
      </View>
    </ScrollView>:
    
    
    <><Text>Oops! Something went Wrong</Text>
    <Button
    pressHandler={()=>router.push('/')}
    size='me'
    color={Colors.accent700}
    text='Go Back'
    />
    </>}
    </>
  )
}

export default PlaceDetails

const styles = StyleSheet.create({
    imageWrapper: {
    width: '80%',
    height: 300,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    margin:"auto",
    marginTop:40,
  },
  fallback: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  locationContainer: {
    margin:20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addressContainer: {
    padding: 20,
  },
  address: {
    color: Colors.primary900,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 28,
  },
})