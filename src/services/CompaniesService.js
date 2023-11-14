import axios from "axios";
import { useEffect, useState } from "react";
import api from "../api";

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

export const CreateCompany = async (name, corporate_name, cnpj, town, state, address) => {
    const request = await api
        .post("/company", {
            name: name,
            corporate_name: corporate_name,
            CNPJ: cnpj,
            town_registration: town,
            state_registration: state,
            address: address,
        });

    return { data: request.data.data, status: request.data.status };
};