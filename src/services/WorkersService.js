import axios from "axios";
import { useEffect, useState } from "react";
import api from "../api";

export const FetchWorkers = (id) => {
    const [isLoading, setLoading] = useState(true);
    const [isEmpty, setEmpty] = useState(true);
    const [data, setData] = useState([]);
    const url = `l/workers?company=${id}`;



    useEffect(() => {
        api.get(url).then((response) => {
            setData(response.data.data);
            setEmpty(false)
        });

        setLoading(false);
    }, []);

    return { data, isLoading, isEmpty };
}

export const FindActiveWorkers = (page, filter, refreshState) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isEmpty, setIsEmpty] = useState(false);
    const [data, setData] = useState([]);
    const [pagination, setPagination] = useState([]);
    useEffect(() => {
        setIsLoading(true);
        api
            .get(`user?page=${page + 1}`)
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

export const FindActiveAdmins = (page, filter, refreshState) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isEmpty, setIsEmpty] = useState(false);
    const [data, setData] = useState([]);
    const [pagination, setPagination] = useState([]);
    useEffect(() => {
        setIsLoading(true);
        api
            .get(`user/a?page=${page + 1}`)
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

export const CreateWorker = async (name, socialName, cnpj, town, state, cep, street, district, city, houseNumber, complement, references) => {
    const request = await api
        .post("/user", {
            name: name,
            socialName: socialName,
            cnpj: cnpj,
            town: town,
            state: state,
            cep: cep,
            street: street,
            district: district,
            city: city,
            houseNumber: houseNumber,
            complement: complement,
            references: references
        });

    return { data: request.data.data, status: request.data.status };
};