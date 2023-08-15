import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Button } from '@rneui/themed';
import Spacer from '../components/Spacer';
import { useAuth } from '../context/AuthContext';
import { SafeAreaView } from 'react-native-safe-area-context';

const AccountScreen = () => {
    const { signout } = useAuth();
    return (
        <SafeAreaView>
            <View style={{ margin: 15 }}>
                <Button title={'Sign Out'} onPress={signout} />
            </View>
        </SafeAreaView>
    );
};

export default AccountScreen;

const styles = StyleSheet.create({});
