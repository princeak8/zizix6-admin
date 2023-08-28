import { get } from "@/utilities/api";

export const getServices = async() => {
    return await get('services');
}
