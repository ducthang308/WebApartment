import axios from 'axios';

const axiosClient = axios.create({
    baseURL: 'http://localhost:8082',
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    config.headers = config.headers ?? {};
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
});



export default axiosClient;
