import { Colors } from '@/constants/colors';
import * as Location from 'expo-location';
import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, View } from 'react-native';
import Button from '../UI/Button';

const LocationInput = ({ onFoundUser, lat, lng }:
    {onFoundUser: (latitude:string, longitude:string)=>void, 
    lat?:string, lng?:string}) => {
    const [manualMode, setManualMode] = useState(false);
    const [err, setErr] = useState<string | null>(null)
    const [location, setLocation] = useState({
        latitude: '',
        longitude: '',
    });
    useEffect(() => {
      if (lat && lng){
        setLocation({latitude: lat, longitude:lng})
      }
    }, [lat, lng])
    
     useEffect(() => {
    if (location.latitude && location.longitude) {
      onFoundUser(location.latitude, location.longitude);
    }
  }, [location]);

    const requestPermissions = async () => {
        const { status: fgStatus } = await Location.requestForegroundPermissionsAsync();
        if (fgStatus !== 'granted') {
            Alert.alert('Permission to access location was denied');
            return false;
        }

        const { status: bgStatus } = await Location.requestBackgroundPermissionsAsync();
        if (bgStatus !== 'granted') {
            Alert.alert('Background location permission was denied');
            return false;
        }

        return true;
    };

    const getCurrentLocation = async () => {
        try {
            const hasPermission = await requestPermissions();
            if (!hasPermission) return;

            const servicesEnabled = await Location.hasServicesEnabledAsync();
            if (!servicesEnabled) {
                Alert.alert('Location services are not enabled');
                return;
            }

            const locationPromise = Location.getLastKnownPositionAsync({});
            const timeoutPromise = new Promise<never>((_, reject) =>
                setTimeout(() => reject(Alert.alert("Oops!, Couldn't locate you.")), 5000)
            );

            const locationResponse = await Promise.race([locationPromise, timeoutPromise]);
            if (locationResponse) {

                setLocation({
                    latitude: (locationResponse?.coords.latitude).toString(),
                    longitude: (locationResponse?.coords.longitude).toString(),
                });
                setManualMode(true)
                

            }
        } catch (err: any) {
            Alert.alert(`Error getting location: ${err.message}`);
        }
    };

 

    return (
        <>
            <Text style={styles.title}>Locate yourself</Text>
            {/* Action Buttons */}
            <View style={styles.actionsRow}>
                <Button
                    size="me"
                    text="Locate User"
                    color={Colors.primary200}
                    textColor={Colors.primary900}
                    pressHandler={async ()  => {
                        setManualMode(false);
                        await getCurrentLocation();
                    }}
                />
                <Button
                    size="me"
                    text="Input Manually"
                    color={Colors.primary200}
                    textColor={Colors.primary900}
                    pressHandler={() => setManualMode(!manualMode)}
                />
            </View>

            {/* Manual Input Fields */}

            {manualMode && (
                <View style={styles.inputContainer}>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.label}>Latitude</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter latitude..."
                            value={location.latitude ? String(location.latitude) : ""}
                            onChangeText={(text) => {
                               
                                setLocation((prev) => ({ ...prev, latitude: text }))
                            }

                            }
                        />
                    </View>

                    <View style={{ flex: 1 }}>
                        <Text style={styles.label}>Longitude</Text>
                        <TextInput
                            placeholder="Enter longitude..."
                            style={styles.input}
                            value={location.longitude ? String(location.longitude) : ""}
                            onChangeText={(text) => {
                               
                                setLocation((prev) => ({ ...prev, longitude: text }))
                            }

                            }
                        />
                    </View>
                </View>

            )}

        </>
    );
};

export default LocationInput;

const styles = StyleSheet.create({
    previewText: {
        fontSize: 14,
        color: Colors.primary700,
    },
    actionsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 10,
        marginBottom: 12,
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
        color: Colors.primary900,
    },
    input: {
        borderWidth: 1,
        borderColor: Colors.primary200,
        backgroundColor: Colors.primary50,
        padding: 8,
        borderRadius: 8,
        fontSize: 14,
        marginBottom: 16,
        width: 200,
    },
    inputContainer: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row',
    },
    title: {
        textAlign: 'center',
        fontSize: 24,
        fontWeight: 'bold',
        color: Colors.primary900,
        marginVertical: 20,
    },
});
