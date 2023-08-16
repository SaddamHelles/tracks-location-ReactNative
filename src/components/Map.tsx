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
    const { currentLocation, locations } = useLocation();
    const [errorMsg, setErrorMsg] = useState<Nullable<string>>(null);
    const [location, setLocation] =
        useState<Nullable<Location.LocationObject>>(null);

    const initialLocation = {
        latitude: 31.4927667,
        longitude: 34.47203,
    };
    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');

                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
        })();

        const cleanupSimulatedLocationUpdates = simulateLocationUpdates();
        return () => {
            cleanupSimulatedLocationUpdates();
        };
    }, [currentLocation]);

    if (!currentLocation) {
        return <ActivityIndicator size={'large'} style={{ marginTop: 200 }} />;
    }
    return (
        <View>
            {location && (
                <MapView
                    initialRegion={{
                        ...initialLocation,
                        latitudeDelta: 0.01,
                        longitudeDelta: 0.01,
                    }}
                    region={{
                        ...currentLocation.coords,
                        latitudeDelta: 0.01,
                        longitudeDelta: 0.01,
                    }}
                    scrollEnabled={true}
                    zoomEnabled
                    style={styles.map}>
                    <Circle
                        center={currentLocation.coords}
                        radius={30}
                        strokeColor="rgba(158,158,255,1.0)"
                        fillColor="rgba(158,158,255,0.3)"
                    />
                    <Polyline
                        coordinates={locations.map(location => location.coords)}
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
