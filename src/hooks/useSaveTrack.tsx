import React from 'react';
import { useTrack } from '../context/TrackContext';
import { useLocation } from '../context/LocationContext';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../App';

export default () => {
    const { createTrack } = useTrack();
    const { locations, name, reset } = useLocation();
    const { goBack } = useNavigation();

    const saveTrack = async () => {
        await createTrack(name, locations);
        reset();
        goBack();
    };

    return [saveTrack];
};
