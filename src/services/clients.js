import { get, post } from "@/utilities/api";

export const getClients = async() => {
    return await get('clients');
}

export const getClient = async(id) => {
    return await get(`clients/${id}`);
}

export const saveClient = async(data) => {
    return await post('clients/save', data);
}
