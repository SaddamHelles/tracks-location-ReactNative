import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NavigationProp, RouteProp } from '@react-navigation/native';
import MapView, { Polyline, Circle } from 'react-native-maps';

import { RootStackParamList } from '../../App';
import { useTrack } from '../context/TrackContext';
import { Ionicons } from '@expo/vector-icons';
type Props = {
    route?: RouteProp<RootStackParamList>;
    navigation?: NavigationProp<RootStackParamList>;
};
const TrackDetailScreen = ({ route, navigation }: Props) => {
    const { tracks } = useTrack();
    const track = tracks?.find((t: any) => t._id === route?.params?._id);
    const initialCoords = track.locations[0].coords;
    return (
        <SafeAreaView>
            <TouchableOpacity
                style={{ backgroundColor: 'white' }}
                onPress={navigation?.goBack}>
                <View style={styles.goBack}>
                    <Ionicons name="arrow-back" size={20} color="black" />
                    <Text style={{ fontSize: 18 }}>Go back</Text>
                </View>
            </TouchableOpacity>
            <Text
                style={{
                    fontSize: 28,
                    marginVertical: 15,
                    marginLeft: 8,
                    color: 'tomato',
                }}>
                Name: {track.name}
            </Text>
            <MapView
                style={styles.map}
                initialRegion={{
                    ...initialCoords,
                    longitudeDelta: 0.01,
                    latitudeDelta: 0.01,
                }}>
                <Polyline
                    coordinates={track.locations.map((loc: any) => loc.coords)}
                />
            </MapView>
        </SafeAreaView>
    );
};

export default TrackDetailScreen;

const styles = StyleSheet.create({
    goBack: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        marginTop: 20,
        marginLeft: 10,
        marginBottom: 10,
        gap: 4,
    },
    map: {
        height: 350,
    },
});
