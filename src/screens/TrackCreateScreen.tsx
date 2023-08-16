import { StyleSheet, View } from 'react-native';
import { Text } from '@rneui/themed';
import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    useSafeAreaInsets,
} from 'react-native-safe-area-context';
import '../_mockLocation';
import Map from '../components/Map';
import { Nullable } from '../utils/Nullable';
import {
    watchPositionAsync,
    Accuracy,
    LocationSubscription,
} from 'expo-location';
import { useLocation } from '../context/LocationContext';
import simulateLocationUpdates from '../_mockLocation';
import { RootStackParamList } from '../../App';
import { NavigationProp, RouteProp } from '@react-navigation/native';
import TrackForm from '../components/TrackForm';

type Props = {
    route?: RouteProp<RootStackParamList, 'TrackCreateScreen'>;
    navigation?: NavigationProp<RootStackParamList, 'TrackCreateScreen'>;
};
// type Props = NativeStackScreenProps<RootStackParamList, 'TrackCreateScreen'>;

const CreateTrack = ({ navigation }: Props) => {
    const { addLocation, isRecording } = useLocation();
    const [errorMsg, setErrorMsg] = useState<Nullable<string>>(null);

    const insets = useSafeAreaInsets();

    useEffect(() => {
        let watchId: LocationSubscription;
        const startWatching = async () => {
            watchId = await watchPositionAsync(
                {
                    accuracy: Accuracy.BestForNavigation,
                    timeInterval: 1000,
                    distanceInterval: 20,
                },
                location => navigation?.isFocused && addLocation(location)
            );
        };

        startWatching();

        const cleanupSimulatedLocationUpdates = simulateLocationUpdates();
        return () => {
            if (watchId) {
                watchId.remove();
            }
            cleanupSimulatedLocationUpdates();
        };
    }, [isRecording]);
    return (
        <SafeAreaView>
            <Text h2>Create a Track</Text>
            <Map />
            <TrackForm />
        </SafeAreaView>
    );
};

export default CreateTrack;

const styles = StyleSheet.create({});
