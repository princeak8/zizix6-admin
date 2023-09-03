import { get, post } from "@/utilities/api";

export const getServices = async() => {
    return await get('services');
}

export const save = async(data) => {
    return await post('services/save', data);
}

export const update = async(data) => {
    return await post('services/update', data);
}
