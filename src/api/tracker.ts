import axios from 'axios';

const trackerApi = axios.create({
    baseURL: 'https://dd25-158-140-91-104.ngrok.io',
    transformResponse: [
        data => {
            return JSON.parse(data);
        },
    ],
});

export default trackerApi;
