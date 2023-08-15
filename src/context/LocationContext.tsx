import { LocationObject } from 'expo-location';
import { PropsWithChildren, createContext, useContext, useState } from 'react';
import { Nullable } from '../utils/Nullable';

interface LocationContextType {
    currentLocation: Nullable<LocationObject>;
    startRecording: () => void;
    stopRecording: () => void;
    addLocation: (location: LocationObject) => void;
}
const LocationContext = createContext<LocationContextType | undefined>(
    {} as LocationContextType
);

export const LocationProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [currentLocation, setCurrentLocation] =
        useState<Nullable<LocationObject>>(null);
    const startRecording = () => {};
    const stopRecording = () => {};
    const addLocation = (location: LocationObject) => {
        setCurrentLocation(location);
    };

    const locationContextValue = {
        startRecording,
        stopRecording,
        addLocation,
        currentLocation,
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
