import { get, post } from "@/utilities/api";

export const getHosts = async() => {
    return await get('hosts');
}

export const save = async(data) => {
    return await post('hosts/save', data);
}

export const update = async(data) => {
    return await post('hosts/update', data);
}
