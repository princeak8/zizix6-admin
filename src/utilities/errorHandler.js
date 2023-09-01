import router from "@/router";
import { useUserAuthStore } from "@/store/userAuth";

export const handleError = (error) => {
    console.log('response', error);
    const { status, data } = error.response;
    let message = '';
    let userStore = useUserAuthStore();
    switch(status) {
        case 402: message = data.message; break;
        case 422: 
            Object.values(data.errors).forEach((validationError) => {
                message += validationError+'\n ';
            });
            break;
        case 401: 
            userStore.logout();
            router.push('/login');
        default: message = 'Oops! an error occured! its not your fault.. contact the administrator';
    }
    console.log('error message: ', data.message);
    console.log('error: ',error.response.data);

    return message;
}
