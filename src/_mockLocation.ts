import * as Location from 'expo-location';

const tenMetersWithDegrees = 0.0001;

const getLocation = (increment: number) => {
    return {
        timestamp: 10000000,
        coords: {
            speed: 0,
            heading: 0,
            accuracy: 5,
            altitudeAccuracy: 5,
            altitude: 5,
            longitude: 35.2332 + increment * tenMetersWithDegrees,
            latitude: 31.9522 + increment * tenMetersWithDegrees,
        },
    };
};

let counter = 0;

const simulateLocationUpdates = () => {
    const intervalId = setInterval(() => {
        Location.EventEmitter.emit('Expo.locationChanged', {
            watchId: Location._getCurrentWatchId(),
            location: getLocation(counter),
        });
        counter++;
    }, 1000);

    return () => clearInterval(intervalId); // Cleanup function
};

export default simulateLocationUpdates;
