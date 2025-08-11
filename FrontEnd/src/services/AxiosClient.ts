import axios from 'axios';

const axiosClient = axios.create({
    baseURL: 'http://localhost:8081',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Thêm interceptor để tự động gắn token vào mọi request
axiosClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    config.headers = config.headers ?? {};
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
});


export default axiosClient;
