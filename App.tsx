import { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './src/screens/Home';
import TrackCreateScreen from './src/screens/TrackCreateScreen';
import SigninScreen from './src/screens/SigninScreen';
import SignupScreen from './src/screens/SignupScreen';
import AccountScreen from './src/screens/AccountScreen';
import TrackListScreen from './src/screens/TrackListScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import TrackDetailScreen from './src/screens/TrackDetailScreen';
import { AuthProvider, useAuth } from './src/context/AuthContext';
import Ionicons from '@expo/vector-icons/Ionicons';
import { View } from 'react-native';
import { Text } from '@rneui/themed';
import { LocationProvider } from './src/context/LocationContext';
import { TrackProvider } from './src/context/TrackContext';

const Tab = createBottomTabNavigator();

export type RootStackParamList = {
    Home: undefined;
    TrackCreateScreen: undefined;
    TrackDetailScreen: undefined;
    SignupScreen: undefined;
    SigninScreen: undefined;
    AccountScreen: undefined;
    TrackListScreen: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
    return (
        <TrackProvider>
            <LocationProvider>
                <AuthProvider>
                    <SafeAreaProvider>
                        <NavigationContainer>
                            <MainNavigation />
                        </NavigationContainer>
                    </SafeAreaProvider>
                </AuthProvider>
            </LocationProvider>
        </TrackProvider>
    );
}

const MainNavigation = () => {
    const { isSignedIn, isLocalSignein, trySignin } = useAuth();

    useEffect(() => {
        try {
            isLocalSignein();
        } catch (err) {
            console.log(err);
        }
    }, []);

    if (trySignin) {
        return (
            <View>
                <Text
                    h3
                    style={{
                        color: 'tomato',
                        marginTop: 200,
                        marginLeft: 100,
                    }}>
                    Trying to signin...
                </Text>
            </View>
        );
    }
    return (
        <>
            {!isSignedIn ? (
                <Stack.Navigator
                    screenOptions={{
                        contentStyle: { backgroundColor: 'white' },
                        headerShown: false,
                    }}>
                    <Stack.Screen
                        name="SignupScreen"
                        component={SignupScreen}
                    />
                    <Stack.Screen
                        name="SigninScreen"
                        component={SigninScreen}
                    />
                </Stack.Navigator>
            ) : (
                <Tab.Navigator
                    screenOptions={({ route }) => ({
                        tabBarIcon: ({ focused, color, size }) => {
                            let iconName:
                                | 'create-outline'
                                | 'list'
                                | 'settings';

                            if (route.name === 'TrackCreateScreen') {
                                iconName = 'create-outline';
                            } else if (route.name === 'TrackListScreen') {
                                iconName = 'list';
                            } else {
                                iconName = 'settings';
                            }

                            // You can return any component that you like here!
                            return (
                                <Ionicons
                                    name={iconName}
                                    size={size}
                                    color={color}
                                />
                            );
                        },
                        tabBarActiveTintColor: 'tomato',
                        tabBarInactiveTintColor: 'gray',
                        contentStyle: { backgroundColor: 'white' },
                        headerShown: false,
                    })}>
                    <Tab.Screen
                        name="TrackListScreen"
                        component={TrackListScreen}
                        options={{ title: 'Track List' }}
                    />
                    <Tab.Screen
                        name="TrackCreateScreen"
                        component={TrackCreateScreen}
                        options={{ title: 'New Track' }}
                    />
                    <Tab.Screen
                        name="AccountScreen"
                        component={AccountScreen}
                        options={{ title: 'Setting' }}
                    />
                </Tab.Navigator>
            )}
        </>
    );
};
