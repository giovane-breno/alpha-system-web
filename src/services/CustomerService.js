import axios from "axios";
import { useEffect, useState } from "react";
import api from "../api";

export const FindActiveCustomer = (page, filter, refreshState) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isEmpty, setIsEmpty] = useState(false);
    const [data, setData] = useState([]);
    const [pagination, setPagination] = useState([]);
    useEffect(() => {
        setIsLoading(true);
        api
            .get(`customer?page=${page}`)
            .then((response) => {
                response.data.length === 0 ? setIsEmpty(true) : setIsEmpty(false);
                setData(response.data.data.info);
                setPagination(response.data.data.pagination);
                setIsLoading(false);
            })
            .catch((error) => {
                setIsEmpty(true);
                setIsLoading(false);
            });
    }, [page, filter, refreshState]);

    return { data, pagination, isLoading, isEmpty };
};

export const FetchCustomers = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isEmpty, setIsEmpty] = useState(false);
    const [data, setData] = useState([]);
    useEffect(() => {
        setIsLoading(true);
        api
            .get(`list/customers`)
            .then((response) => {
                if (!response.data.status === "error") setIsEmpty(true);

                setData(response.data.data);
                setIsLoading(false);
            })
            .catch((error) => {
                setIsEmpty(true);
                setIsLoading(false);
            });
    }, []);
    return { data, isLoading, isEmpty };
};

export const CreateCustomer = async (name, cpf, rg, email, phone, cep, street, district, city, birthAt, knowledge) => {
    const request = await api
        .post("/customer", {
            name: name,
            cpf: cpf,
            rg: rg,
            email: email,
            phone: phone,
            cep: cep,
            street: street,
            district: district,
            city: city,
            birth_at: birthAt,
            knowledge: knowledge
        });

    return { data: request.data.data, status: request.data.status };

};

export const UpdateCustomer = async (id, name, cpf, rg, email, phone, cep, street, district, city, birthAt, knowledge) => {
    const request = await api
        .put(`/customer/${id}`, {
            name: name,
            cpf: cpf,
            rg: rg,
            email: email,
            phone: phone,
            cep: cep,
            street: street,
            district: district,
            city: city,
            birth_at: birthAt,
            knowledge: knowledge
        })

    return { data: request.data.data, status: request.data.status };
};

export const FindCustomer = async (id) => {
    const request = await api.get(`customer/${id}`);
    return { data: request.data.data, status: request.data.status };
};

export const DeleteCustomer = async (id) => {
    const request = await api.delete(`customer/${id}`);
    return { data: request.data, status: request.data.status };
};

export const GetAdressfromAPI = async (cep) => {
    const request = await axios.get(`https://cep.awesomeapi.com.br/json/${cep}`)
    return { data: request.data };
};

export const AuthenticateCustomer = async (username, password, remember = false) => {
    const response = await api.post('/customer/login', {
        username: username,
        password: password,
    });

    localStorage.clear();
    localStorage.clear();

    if (remember) {
        localStorage.setItem("token", `${response.data.data.token}`);
    } else {
        localStorage.setItem("token", `${response.data.data.token}`);
    }


    return response;
};


export const GetCurrentCustomer = async () => {
    const request = await api.get('/customer/who-am-i')
    return { data: request.data.data, status: request.data.status };
}

export const FindCurrentCustomer = async () => {
    const request = await api.get('/c/customer')
    return { data: request.data.data, status: request.data.status };
}