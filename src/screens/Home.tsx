import React from 'react';
import { Text, View, Button, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TrackListScreen from './TrackListScreen';
import AccountScreen from './AccountScreen';
import TrackCreateScreen from './TrackCreateScreen';
interface Props {
    navigation: NativeStackNavigationProp<
        RootStackParamList,
        'TrackCreateScreen'
    >;
}

const Tab = createBottomTabNavigator();

const Home = ({ navigation }: Props) => {
    return (
        <>
            <View>
                <Text>Home Screen</Text>
            </View>
            <Tab.Navigator>
                <Tab.Screen
                    name="TrackListScreen"
                    component={TrackListScreen}
                />
                <Tab.Screen
                    name="TrackCreateScreen"
                    component={TrackCreateScreen}
                />
                <Tab.Screen name="AccountScreen" component={AccountScreen} />
            </Tab.Navigator>
        </>
    );
};

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
