import axios from 'axios';

axios.defaults.baseURL = 'https://webdev-api.loftschool.com';

const token = localStorage.getItem('token');

if(token) {
    axios.defaults.headers['Authorization'] = `Bearer ${token}`;
}

axios.interceptors.response.use(
    response => (response),
    error => {
        const originRequest = error.config;
    
        if (error.response.status === 401) {
            return axios.post("/refreshToken")
            .then(response => {
                const token = response.data.token;
                localStorage.setItem('token', token);
                axios.defaults.headers["Authorization"] = `Bearer ${token}`;
                originRequest.headers["Authorization"] = `Bearer ${token}`;
    
                return axios(originRequest);
            })
        }
    
        return Promise.reject(error);
    }
);

export default axios;