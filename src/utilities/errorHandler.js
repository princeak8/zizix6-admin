

export const handleError = (error) => {
    const { status, data } = error.response;
    let message = '';
    switch(status) {
        case 402 || 401: message = data.message; break;
        default: message = 'Oops! an error occured! its not your fault.. contact the administrator';
    }
    console.log('error message: ', data.message);
    console.log('error: ',error.response);

    return message;
}
