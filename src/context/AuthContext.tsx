import React, {
    createContext,
    useContext,
    useState,
    PropsWithChildren,
} from 'react';
import trackerApi from '../api/tracker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';

type UserInfo = { email: string; password: string };

interface AuthContextType {
    token: string | null;
    isSignedIn: boolean;
    errorMessage: string;
    trySignin: boolean;
    signup: (signupInfo: UserInfo) => void;
    signin: (signinInfo: UserInfo) => void;
    signout: () => void;
    onSwitchNavigation: () => void;
    isLocalSignein: () => void;
}

type AxiosProp = {
    token: string;
};
export const AuthContext = createContext<AuthContextType | undefined>(
    {} as AuthContextType
);

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [token, setToken] = useState<string | null>(null);
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [trySignin, setTrySignin] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const onSwitchNavigation = () => {
        setErrorMessage('');
        // Perform any necessary actions when switching to the main flow
        // setToken('someToken'); // Set the user token as needed
    };

    const signup = async (signupInfo: UserInfo) => {
        try {
            const { data, status } = await trackerApi.post<AxiosProp>(
                '/signup',
                signupInfo
            );
            setToken(data.token);
            await SecureStore.setItemAsync('token', data.token);
            if (status === 200) {
                setIsSignedIn(true);
            }
        } catch (err: any) {
            console.log('err: ', err);
            setErrorMessage('Something went wrong with signup');
        }
    };

    const signin = async (signinInfo: UserInfo) => {
        try {
            const { data, status } = await trackerApi.post<AxiosProp>(
                '/signin',
                signinInfo
            );
            setToken(data.token);
            await SecureStore.setItemAsync('token', data.token);
            if (status === 200) {
                setIsSignedIn(true);
            }
        } catch (err: any) {
            console.log('err: ', err);
            setErrorMessage('Something went wrong!');
        }
    };

    const signout = async () => {
        try {
            // const { data, status } = await trackerApi.get('./signout');
            await SecureStore.deleteItemAsync('token');
            setIsSignedIn(false);
            setToken(null);
            setErrorMessage('');
        } catch (err: any) {
            setErrorMessage('Something went wrong!');
        }
    };

    const isLocalSignein = async () => {
        try {
            setTrySignin(true);
            const hasToken = await SecureStore.getItemAsync('token');
            if (hasToken) setIsSignedIn(true);
            else setIsSignedIn(false);
        } catch (err) {
            console.log(err);
        } finally {
            setTrySignin(false);
        }
    };
    const contextValues = {
        isSignedIn,
        errorMessage,
        token,
        onSwitchNavigation,
        signup,
        signin,
        signout,
        isLocalSignein,
        trySignin,
    };
    return (
        <AuthContext.Provider value={contextValues}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
