import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import Spacer from './Spacer';
import { Input, Button, Text } from '@rneui/themed';
import { useAuth } from '../context/AuthContext';

type UserInfo = { email: string; password: string };

interface Props {
    onSubmit: (userInfo: UserInfo) => void;
    submitButtonTitle: string;
    headerTitle: string;
}

const AuthForm = ({ headerTitle, submitButtonTitle, onSubmit }: Props) => {
    const { signup, signin, errorMessage } = useAuth();

    const [userInfo, setUserInfo] = useState<UserInfo>({} as UserInfo);
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <View style={styles.container}>
            <Spacer>
                <Text h3>{headerTitle}</Text>
            </Spacer>
            <Spacer>
                <Input
                    value={userInfo.email}
                    onChangeText={e =>
                        setUserInfo(prev => ({ ...prev, email: e }))
                    }
                    label="Email"
                    placeholder="Your Email"
                    textContentType="emailAddress"
                    autoCapitalize="none"
                    autoCorrect={false}
                />
                <Spacer />
                <Input
                    value={userInfo.password}
                    onChangeText={e =>
                        setUserInfo(prev => ({ ...prev, password: e }))
                    }
                    label="Password"
                    secureTextEntry={!showPassword}
                    textAlign="left"
                    placeholder="Your Password"
                    rightIcon={
                        <Entypo
                            name={showPassword ? 'eye-with-line' : 'eye'}
                            onPress={togglePasswordVisibility}
                            size={24}
                            color="black"
                        />
                    }
                />
                {errorMessage && (
                    <Text style={styles.errorStyle}>{errorMessage}</Text>
                )}
            </Spacer>
            <Spacer>
                <Button
                    title={submitButtonTitle}
                    onPress={() => onSubmit(userInfo)}
                />
            </Spacer>
        </View>
    );
};

export default AuthForm;

const styles = StyleSheet.create({
    container: {
        marginTop: 100,
    },
    errorStyle: {
        color: 'red',
        marginLeft: 10,
        marginBottom: 10,
    },
});
