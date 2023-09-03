import { get, post } from "@/utilities/api";

export const getParentPackages = async() => {
    console.log('get parent packages');
    return await get('parent_packages');
}

export const getPackage = async(packageId) => {
    return await get(`package/${packageId}`);
}

export const getPackageWithServices = async(packageId) => {
    return await get(`package/${packageId}/services`);
}

export const saveParentPackage = async(data) => {
    return await post(`save_parent_package`, data);
}

export const savePackage = async(data) => {
    return await post(`save_package`, data);
}

export const updatePackage = async(data) => {
    return await post(`update_package`, data);
}
