import React, { useState } from 'react';
import {
    NativeStackNavigationProp,
    NativeStackScreenProps,
} from '@react-navigation/native-stack';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { RootStackParamList } from '../../App';
import { AuthContext, useAuth } from '../context/AuthContext';
import Spacer from '../components/Spacer';
import Link from '../components/Link';
import AuthForm from '../components/AuthForm';

type Props = NativeStackScreenProps<RootStackParamList, 'SignupScreen'>;

const SignupScreen = ({ navigation, route }: Props) => {
    const { signup } = useAuth();

    const handleSignup = () => {};
    return (
        <>
            <AuthForm
                submitButtonTitle="Sign Up"
                headerTitle="Sign Up for Tracker"
                onSubmit={({ email, password }) => signup({ email, password })}
            />
            <Link
                onPress={() => navigation?.navigate('SigninScreen')}
                title="Already have an account? Sign in instead"
            />
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        marginBottom: 200,
    },
    errorStyle: {
        color: 'red',
        marginLeft: 10,
        marginBottom: 10,
    },
    linkStyle: {
        color: 'blue',
    },
});
export default SignupScreen;
