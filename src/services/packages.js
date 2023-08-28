import { get } from "@/utilities/api";

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
