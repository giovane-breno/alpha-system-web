import api from "src/api";

export const doLogin = async (form) => {
    const request = await api
        .post("/login", {
            username: form.username,
            password: form.password,
        });
    return { data: request.data.data, status: request.data.status };
};

export const CheckUser = async () => {
    const request = await api
        .get("/token");
    return { data: request.data.data, status: request.data.status };
}