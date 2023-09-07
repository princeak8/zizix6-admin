import { get } from "@/utilities/api";

export const getHomeData = async() => {
    return await get('home');
}
