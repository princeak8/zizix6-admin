import { useUserAuthStore } from "@/store/userAuth";
import { post } from "@/utilities/api";

    export const login = async(user) => {
        const { email, password} = user;
        const response = await post('auth/login', {email, password});
        if(!response.error) {
            if(response.data.token) {
                const {token, token_expires_in, user} = response.data;
                const data = {...user, token, expires: token_expires_in};
                localStorage.setItem('user', JSON.stringify(data));
                let userAuth = useUserAuthStore();
                userAuth.loginSuccess(data);
            }else{
                response.message = "An error occured";
                console.log('Token Error!: Token was not sent');
            }
        }
        return response;

        // return axios
        // .post(API_URL + 'login', {
        //     email: user.email,
        //     password: user.password
        // })
        // .then(response => {
        //     console.log('response', response);
        //     if (response.data.data.accessToken) {
        //         localStorage.setItem('user', JSON.stringify(response.data.data));
        //     }

        //     return response.data.data;
        // });
    }

    export const logout = () => {
        localStorage.removeItem('user');
    }

    export const register = async (user) => {
        return axios.post(API_URL + 'signup', {
        username: user.username,
        email: user.email,
        password: user.password
        });
    }

// export default new AuthService();
