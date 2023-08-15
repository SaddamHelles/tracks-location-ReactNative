import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import Spacer from './Spacer';
import { RootStackParamList } from '../../App';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useAuth } from '../context/AuthContext';

interface Props {
    onPress: () => void;
    title: string;
}
const Link = ({ title, onPress }: Props) => {
    const { onSwitchNavigation } = useAuth();

    const handleOnPressLink = () => {
        onSwitchNavigation();
        onPress();
    };
    return (
        <TouchableOpacity onPress={handleOnPressLink}>
            <Spacer>
                <Text style={styles.linkStyle}>{title}</Text>
            </Spacer>
        </TouchableOpacity>
    );
};

export default Link;

const styles = StyleSheet.create({
    linkStyle: {
        color: 'blue',
    },
});
