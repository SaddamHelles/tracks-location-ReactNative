import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

type Props = NativeStackScreenProps<RootStackParamList, 'TrackListScreen'>;

const TrackListScreen = () => {
    return (
        <SafeAreaView>
            <View style={{ margin: 15 }}>
                <Text>TrackListScreen</Text>
            </View>
        </SafeAreaView>
    );
};

export default TrackListScreen;

const styles = StyleSheet.create({});
