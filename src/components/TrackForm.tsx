import { Button, Input } from '@rneui/themed';
import { SafeAreaView } from 'react-native';
import React from 'react';
import Spacer from './Spacer';

const TrackForm = () => {
    return (
        <SafeAreaView>
            <Input />
            <Spacer />
            <Button style={{ margin: 15 }} title="Start Recording" />
        </SafeAreaView>
    );
};

export default TrackForm;
