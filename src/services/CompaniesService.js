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