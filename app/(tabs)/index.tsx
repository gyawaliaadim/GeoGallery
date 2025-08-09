import { Colors } from '@/constants/colors'
import { PlaceType } from '@/types/placeType'
import { fetchPlaces } from '@/util/database'
import { router } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native'

const Home = () => {
  const [data, setData] = useState<PlaceType[]>([])

  useEffect(() => {

    const runAsync = async () => {
      const response = await fetchPlaces()
      const dataArray = Array.from(response);
      setData(dataArray)
    }
    runAsync();
  }, [])
    const PlaceItem = ({ item }: { item: PlaceType }) => {
      return (
  <Pressable
        style={({ pressed }) => [styles.item, pressed && styles.pressed]}
        onPress={()=>router.push({pathname:"/places/[id]",
          params:{id:item.id}
        }
        )}
      >
        <Image style={styles.image} source={{ uri: item.imageUri}} />
        <View style={styles.info}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.address}>{item.address}</Text>
        </View>
      </Pressable>
      );
    }
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      {data ?
        <FlatList
          data={data}
          style={{ margin:24 }}
          keyExtractor={item => item.id?.toString()}
          renderItem={({ item }) => <PlaceItem item={item} />}
        />
        // <></>
        :
        <Text
          style={styles.infoText}>No places here. Go add some from top right!</Text>
      }
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  infoText: {
    color: Colors.primary900,
    fontWeight: "bold",
    fontSize: 20,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderRadius: 16,
    marginVertical: 12,
    backgroundColor: Colors.accent500,
    elevation: 2,
    shadowColor: 'black',
    shadowOpacity: 0.15,
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 2,
  },
  pressed: {
    opacity: 0.9,
  },
  image: {
    flex: 1,
    borderBottomLeftRadius: 4,
    borderTopLeftRadius: 4,
    height: 100,
  },
  info: {
    flex: 2,
    padding: 12,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    color: Colors.gray700,
  },
  address: {
    fontSize: 12,
    color: Colors.gray700,
  },
});