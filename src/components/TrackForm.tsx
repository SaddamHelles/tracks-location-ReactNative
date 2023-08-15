import { Button, Input } from '@rneui/themed';
import { SafeAreaView } from 'react-native';
import React from 'react';
import Spacer from './Spacer';
import { useLocation } from '../context/LocationContext';

const TrackForm = () => {
    const {
        startRecording,
        stopRecording,
        changeName,
        name,
        isRecording,
        locations,
    } = useLocation();

    // console.log('Location lenght: ', locations.length);
    return (
        <SafeAreaView>
            <Spacer />
            <Input
                value={name}
                onChangeText={changeName}
                placeholder="Track Name"
            />
            {isRecording ? (
                <Button title="Stop" onPress={stopRecording} />
            ) : (
                <Button title="Start Recording" onPress={startRecording} />
            )}
        </SafeAreaView>
    );
};

export default TrackForm;
