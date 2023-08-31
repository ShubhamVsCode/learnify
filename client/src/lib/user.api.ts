import AXIOSAPI from "./axios";

export async function registerUser(data: any) {
    return await AXIOSAPI.post("/user/register", data)
}
export async function loginUser(data: any) {
    return await AXIOSAPI.post("/user/login", data)
}