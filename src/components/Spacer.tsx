import { StyleSheet, Text, View } from 'react-native';
import React, { PropsWithChildren } from 'react';

const Spacer: React.FC<PropsWithChildren> = ({ children }) => {
    return <View style={styles.spacer}>{children}</View>;
};

export default Spacer;

const styles = StyleSheet.create({
    spacer: {
        margin: 15,
    },
});
