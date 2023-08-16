import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useEffect } from 'react';
import { RootStackParamList } from '../../App';
import { NavigationProp, RouteProp } from '@react-navigation/native';
import { useTrack } from '../context/TrackContext';
import { ListItem } from '@rneui/themed';

type Props = {
    route?: RouteProp<RootStackParamList, 'TrackCreateScreen'>;
    navigation?: NavigationProp<RootStackParamList, 'TrackDetailScreen'>;
};
const TrackListScreen = ({ route, navigation }: Props) => {
    const { fetchTracks, tracks } = useTrack();

    useEffect(() => {
        const unsubscribe = navigation?.addListener('focus', fetchTracks);
        return unsubscribe;
    }, [navigation]);

    return (
        <SafeAreaView>
            <View style={{ margin: 15 }}>
                <Text
                    style={{
                        color: 'tomato',
                        marginVertical: 15,
                        fontSize: 20,
                    }}>
                    List of tracks
                </Text>
                <FlatList
                    data={tracks}
                    keyExtractor={item => item._id}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={() =>
                                navigation?.navigate('TrackDetailScreen', {
                                    _id: item._id,
                                })
                            }>
                            <ListItem>
                                <ListItem.Content>
                                    <ListItem.Title>{item.name}</ListItem.Title>
                                </ListItem.Content>
                                <ListItem.Chevron />
                            </ListItem>
                        </TouchableOpacity>
                    )}
                />
            </View>
        </SafeAreaView>
    );
};

export default TrackListScreen;

const styles = StyleSheet.create({});
