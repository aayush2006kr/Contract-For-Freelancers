import api from "./axios";

export const registerUser = (userData) => {
    return api.post("/auth/register", userData);
};