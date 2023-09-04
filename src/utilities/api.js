import { useUserAuthStore } from '@/store/userAuth';
import axios from 'axios';
import { handleError } from './errorHandler';

    const baseUrl = import.meta.env.VITE_API_BASE_URL
    const userStore = useUserAuthStore();
    const { user } = useUserAuthStore();

    export const post = async(url, data) => {
        try{
            // console.log('base url:',import.meta.env.VITE);
            const localUser = (localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')) : null;
            const token = (localUser && localUser.token) ? localUser.token : null;
            
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };
            const response = await axios.post(baseUrl+url, data, config);
            if(response.data.token) {
                console.log('got here');
                user.accessToken = response.data.token;
                localStorage.setItem('user', JSON.stringify(user));
            }
            return {
                data: response.data.data,
                error: false,
                statusCode: 200,
            }
        }catch(err) {
            console.log("error", err);
            const errorMessage = (err.response) ? handleError(err) : "Oops! Something went wrong.. contact administrator";
            if(!err.response) console.log('error: ', err);
            return {
                data: null,
                error: true,
                statusCode: (err.response) ? err.response.status : 500,
                message: errorMessage
            }
        }
    }

    export const get = async(url) => {
        try{
            // console.log('base url:',import.meta.env.VITE);
            // const user = (localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')) : null;
            const localUser = (localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')) : null;
            console.log('store User:', user);
            console.log('local User: ', localUser);
            if(user == null) {
                user = localUser;
                userStore.loginSuccess(localUser);
            }
            const token = (user && user.token) ? user.token : null;
            // console.log('get token', token);
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };
            const response = await axios.get(baseUrl+url, config);
            if(response.data.token && response.data.token != null) {
                user.accessToken = response.data.token;
                localStorage.setItem('user', JSON.stringify(user));
            }
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

