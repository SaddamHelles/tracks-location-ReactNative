import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import MapView, { Polyline, Circle } from 'react-native-maps';
import * as Location from 'expo-location';
import { Nullable } from '../utils/Nullable';
import simulateLocationUpdates from '../_mockLocation';
import { useLocation } from '../context/LocationContext';

type Coordinates = {
    latitude: number;
    longitude: number;
};
interface Props {
    onCheckAccessLoaction?: (msg: string) => void;
}

const Map = () => {
    const { currentLocation } = useLocation();
    const [errorMsg, setErrorMsg] = useState<Nullable<string>>(null);
    const [location, setLocation] =
        useState<Nullable<Location.LocationObject>>(null);

    // let points: Coordinates[] = [{ latitude: 37.33233, longitude: -122.03121 }];
    // for (let i = 0; i < 20; i++) {
    //     if (location) {
    //         if (i % 2 === 0) {
    //             points.push({
    //                 latitude: Number(location?.coords.latitude) + i * 0.001,
    //                 longitude: Number(location?.coords.longitude) + i * 0.001,
    //             });
    //         } else {
    //             points.push({
    //                 latitude: Number(location?.coords.latitude) + i * 0.002,
    //                 longitude: Number(location?.coords.longitude) + i * 0.001,
    //             });
    //         }
    //     }
    // }
    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');

                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            console.log('location: ', location);
            setLocation(location);
        })();

        const cleanupSimulatedLocationUpdates = simulateLocationUpdates();
        return () => {
            cleanupSimulatedLocationUpdates();
        };
    }, []);

    if (!currentLocation) {
        return <ActivityIndicator size={'large'} style={{ marginTop: 200 }} />;
    }
    return (
        <View>
            {location && (
                <MapView
                    initialRegion={{
                        // latitude: Number(currentLocation?.coords.latitude),
                        // longitude: Number(currentLocation?.coords.longitude),
                        ...currentLocation.coords,
                        latitudeDelta: 0.01,
                        longitudeDelta: 0.01,
                    }}
                    // region={{
                    //     ...currentLocation.coords,
                    //     latitudeDelta: 0.04,
                    //     longitudeDelta: 0.04,
                    // }}
                    scrollEnabled={true}
                    zoomEnabled
                    style={styles.map}>
                    {/* <Polyline coordinates={points} /> */}
                    <Circle
                        center={currentLocation.coords}
                        radius={30}
                        strokeColor="rgba(158,158,255,1.0)"
                        fillColor="rgba(158,158,255,0.3)"
                    />
                </MapView>
            )}
            {errorMsg && <Text style={{ color: 'red' }}>{errorMsg}</Text>}
        </View>
    );
};

export default Map;

const styles = StyleSheet.create({
    container: {
        // flex: 1,
    },
    map: {
        height: 350,
    },
});
