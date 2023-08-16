import { Button, Input } from '@rneui/themed';
import { SafeAreaView, View } from 'react-native';
import React from 'react';
import Spacer from './Spacer';
import { useLocation } from '../context/LocationContext';
import useSaveTrack from '../hooks/useSaveTrack';

const TrackForm = () => {
    const [saveTrack] = useSaveTrack();
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
            <View style={{ marginHorizontal: 10 }}>
                {isRecording ? (
                    <Button title="Stop" onPress={stopRecording} />
                ) : (
                    <Button title="Start Recording" onPress={startRecording} />
                )}

                {!isRecording && locations.length ? (
                    <>
                        <Spacer />
                        <Button title={'Save Recording'} onPress={saveTrack} />
                    </>
                ) : null}
            </View>
        </SafeAreaView>
    );
};

export default TrackForm;
