import * as Location from 'expo-location';

const tenMetersWithDegrees = 0.0001;

const getLocation = (increment: number) => {
    // await Location.requestForegroundPermissionsAsync();
    // const location = await Location.getCurrentPositionAsync({
    //     accuracy: Location.Accuracy.High,
    // });
    // const newLocation = await Location.getCurrentPositionAsync({
    //     accuracy: Location.Accuracy.High,
    // });

    return {
        timestamp: 10000000,
        coords: {
            speed: 0,
            heading: 0,
            accuracy: 5,
            altitudeAccuracy: 5,
            altitude: 5,
            longitude: 34.472077 + increment * tenMetersWithDegrees,
            latitude: 31.4928056 + increment * tenMetersWithDegrees,
        },
    };
};

let counter = 0;

const simulateLocationUpdates = () => {
    const intervalId = setInterval(() => {
        // const newLocation = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });

        Location.EventEmitter.emit('Expo.locationChanged', {
            watchId: Location._getCurrentWatchId(),
            location: getLocation(counter),
        });
        counter++;
    }, 1000);

    return () => clearInterval(intervalId);
};

export default simulateLocationUpdates;
