import { LocationObject } from 'expo-location';
import React, {
    useState,
    PropsWithChildren,
    createContext,
    useContext,
} from 'react';
import trackerApi from '../api/tracker';
interface TrackProps {
    tracks: any;
    fetchTracks: () => void;
    createTrack: (name: string, locations: LocationObject[]) => void;
}
const TrackContext = createContext<TrackProps>({} as TrackProps);

export const TrackProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [tracks, setTracks] = useState();
    const fetchTracks = async () => {
        const { data } = await trackerApi.get('/tracks');
        setTracks(data);
    };
    const createTrack = async (name: string, locations: LocationObject[]) => {
        trackerApi.post('/tracks', { name, locations });
    };

    const trackValues = {
        fetchTracks,
        createTrack,
        tracks,
    };
    return (
        <TrackContext.Provider value={trackValues}>
            {children}
        </TrackContext.Provider>
    );
};

export const useTrack = (): TrackProps => {
    const context = useContext(TrackContext);
    if (!context) {
        throw new Error('useLocation must be used within an LocationProvider');
    }
    return context;
};
