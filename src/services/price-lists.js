import { get, post } from "@/utilities/api";

export const getPriceLists = async() => {
    return await get('price/list');
}

export const save = async(data) => {
    return await post('price/save', data);
}

export const update = async(data) => {
    return await post('price/update', data);
}
