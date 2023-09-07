import { get, post } from "@/utilities/api";

export const save = async(data) => {
    console.log('get parent packages');
    return await post('package_service/save', data);
}

export const update = async(data) => {
    return await post('package_service/update', data);
}

export const expiring = async() => {
    return await get('package_service/expiring');
}

export const expired = async() => {
    return await get('package_service/expired');
}
