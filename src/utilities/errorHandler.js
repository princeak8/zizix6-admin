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

// TS function to ensure that an error caught i the try catch is an error and if Notification, give it a message

// function ensureError(value: unknown): Error {
//     if (value instanceof Error) return value
  
//     let stringified = '[Unable to stringify the thrown value]'
//     try {
//       stringified = JSON.stringify(value)
//     } catch {}
  
//     const error = new Error(`This value was thrown as is, not through an Error: ${stringified}`)
//     return error
//   }
