import { LocationObject } from 'expo-location';
import { PropsWithChildren, createContext, useContext, useState } from 'react';
import { Nullable } from '../utils/Nullable';

interface LocationContextType {
    currentLocation: Nullable<LocationObject>;
    startRecording: () => void;
    stopRecording: () => void;
    addLocation: (location: LocationObject) => void;
    changeName: (name: string) => void;
    name: string;
    isRecording: boolean;
    locations: LocationObject[];
}
const LocationContext = createContext<LocationContextType | undefined>(
    {} as LocationContextType
);

export const LocationProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [isRecording, setIsRecording] = useState(false);
    const [name, setName] = useState('');
    const [locations, setLocations] = useState<LocationObject[]>([]);
    const [currentLocation, setCurrentLocation] =
        useState<Nullable<LocationObject>>(null);

    const startRecording = () => {
        setIsRecording(true);
    };

    const stopRecording = () => {
        setIsRecording(false);
    };

    const addLocation = (location: LocationObject) => {
        setCurrentLocation(location);
        console.log('isRecording: ', isRecording);
        if (isRecording) {
            console.log('locationnn: ', location);
            console.log('array of locations: ', locations.length);
            setLocations(prev => [...prev, location]);
        }
    };

    const changeName = (name: string) => {
        setName(name);
    };

    const locationContextValue = {
        startRecording,
        stopRecording,
        addLocation,
        currentLocation,
        changeName,
        name,
        isRecording,
        locations,
    };
    return (
        <LocationContext.Provider value={locationContextValue}>
            {children}
        </LocationContext.Provider>
    );
};

export const useLocation = (): LocationContextType => {
    const context = useContext(LocationContext);
    if (!context) {
        throw new Error('useLocation must be used within an LocationProvider');
    }
    return context;
};
