import * as SecureStore from 'expo-secure-store';
import axios, { AxiosRequestConfig, AxiosError } from 'axios';

const trackerApi = axios.create({
    baseURL: 'https://9226-188-161-125-150.ngrok.io',
    headers: {
        Authorization: `Bearer ${SecureStore.getItemAsync('token')}`,
    },
    transformResponse: [
        data => {
            return JSON.parse(data);
        },
    ],
});

trackerApi.interceptors.request.use(
    async (config: any) => {
        try {
            const token = await SecureStore.getItemAsync('token');
            if (token) {
                config.headers['Authorization'] = `Bearer ${token}`;
            }
        } catch (error) {
            // Handle error if needed
        }
        return config;
    },
    (error: AxiosError) => {
        // Handle request error if needed
        return Promise.reject(error);
    }
);

export default trackerApi;
