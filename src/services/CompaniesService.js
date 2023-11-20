import axios from "axios";
import { useEffect, useState } from "react";
import api from "../api";

export const CheckExistingCompany = () => {
    let company = localStorage.getItem(('company-data'));
    return (JSON.parse(company));
}

export const FindActiveCompanies = (page, filter, refreshState) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isEmpty, setIsEmpty] = useState(false);
    const [data, setData] = useState([]);
    const [pagination, setPagination] = useState([]);
    useEffect(() => {
        setIsLoading(true);
        api
            .get(`company?page=${page + 1}`)
            .then((response) => {
                response.data.data.info.length === 0 ? setIsEmpty(true) : setIsEmpty(false);
                setData(response.data.data.info);
                setPagination(response.data.data.paginate);
                setIsLoading(false);
            })
            .catch((error) => {
                setIsEmpty(true);
                setIsLoading(false);
            });
    }, [page, filter, refreshState]);

    return { data, pagination, isLoading, isEmpty };
};

export const FetchCompanies = () => {
    const [isLoading, setLoading] = useState(true);
    const [isEmpty, setEmpty] = useState(true);
    const [data, setData] = useState([]);
    const url = 'l/companies';

    useEffect(() => {
        api.get(url).then((response) => {
            setData(response.data.data);
            setEmpty(false)
        });

        setLoading(false);
    }, []);

    return { data, isLoading, isEmpty };
}

export const QueryCEP = async (cep) => {
    const url = `https://viacep.com.br/ws/${cep}/json/`;
    const request = await axios
        .get(url);

    return { data: request.data };
};

export const CreateCompany = async (form) => {
    const request = await api
        .post("/company", {
            name: form.name,
            corporate_name: form.corporate_name,
            CNPJ: form.cnpj,
            town_registration: form.town,
            state_registration: form.state,
            address: {
                cep: form.cep, street: form.street, district: form.district, city: form.city,
                house_number: form.houseNumber, complement: form.complement, references: form.references
            },
        });
    return { data: request.data.data, status: request.data.status };
};

export const DeleteCompany = async (id) => {
    const request = await api.delete(`company/${id}`);
    return { data: request.data, status: request.data.status };
};