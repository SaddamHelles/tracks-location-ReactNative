import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import React from 'react';
import {
    NativeStackNavigationProp,
    NativeStackScreenProps,
} from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import Link from '../components/Link';
import AuthForm from '../components/AuthForm';
import { useAuth } from '../context/AuthContext';

type Props = NativeStackScreenProps<RootStackParamList, 'SigninScreen'>;

const SignupScreen = ({ navigation }: Props) => {
    const { signin } = useAuth();

    return (
        <>
            <AuthForm
                submitButtonTitle="Sign In"
                headerTitle="Sign In to your account"
                onSubmit={signin}
            />
            <Link
                onPress={() => navigation?.navigate('SignupScreen')}
                title="Don't have an account? Go back to Sign up"
            />
        </>
    );
};

export default SignupScreen;

const styles = StyleSheet.create({});
