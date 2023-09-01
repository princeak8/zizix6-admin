import { post } from "@/utilities/api";

export const save = async(data) => {
    console.log('get parent packages');
    return await post('package_service/save', data);
}
