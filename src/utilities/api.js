import { useUserAuthStore } from '@/store/userAuth';
import axios from 'axios';
import { handleError } from './errorHandler';

    const baseUrl = import.meta.env.VITE_API_BASE_URL
    const { user } = useUserAuthStore();

    export const post = async(url, data) => {
        try{
            // console.log('base url:',import.meta.env.VITE);
            // const user = (localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')) : null;
            const token = (user && user.accessToken) ? user.accessToken : null;
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };
            const response = await axios.post(baseUrl+url, data, config);
            user.accessToken = response.data.token;
            localStorage.setItem('user', JSON.stringify(user));
            return {
                data: response.data.data,
                error: false,
                statusCode: 200,
            }
        }catch(err) {
            const errorMessage = handleError(err);
            return {
                data: null,
                error: true,
                statusCode: error.response.status,
                message: errorMessage
            }
        }
    }

    export const get = async(url) => {
        try{
            // console.log('base url:',import.meta.env.VITE);
            const token = (user && user.token) ? user.token : null;
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };
            const response = await axios.get(baseUrl+url, config);
            user.accessToken = response.data.token;
            localStorage.setItem('user', JSON.stringify(user));
            return {
                data: response.data.data,
                error: false,
                statusCode: 200,
            }
        }catch(err) {
            const errorMessage = handleError(err);
            return {
                data: null,
                error: true,
                message: errorMessage
            }
        }
    }

