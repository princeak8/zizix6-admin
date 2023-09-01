import { get, post } from "@/utilities/api";

export const getClients = async() => {
    return await get('clients');
}

export const saveClient = async(data) => {
    return await post('clients/save', data);
}
