import axios from "axios";
import { useEffect, useState } from "react";
import api from "../api";


export const FindActiveVacation = (page, filter, refreshState, company) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isEmpty, setIsEmpty] = useState(false);
    const [data, setData] = useState([]);
    const [pagination, setPagination] = useState([]);
    useEffect(() => {
        setIsLoading(true);
        if (company) {
            api
                .get(`vacation?page=${page + 1}&company=${company?.id}`)
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
        }
    }, [page, filter, refreshState, company]);

    return { data, pagination, isLoading, isEmpty };
};

export const FindActiveGratification = (page, filter, refreshState, company) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isEmpty, setIsEmpty] = useState(false);
    const [data, setData] = useState([]);
    const [pagination, setPagination] = useState([]);
    useEffect(() => {
        setIsLoading(true);
        if (company) {
            api
                .get(`gratification?page=${page + 1}&company=${company?.id}`)
                .then((response) => {
                    console.log(response);
                    response.data.data.info.length === 0 ? setIsEmpty(true) : setIsEmpty(false);
                    setData(response.data.data.info);
                    setPagination(response.data.data.paginate);
                    setIsLoading(false);
                })
                .catch((error) => {
                    setIsEmpty(true);
                    setIsLoading(false);
                });
        }
    }, [page, filter, refreshState, company]);

    return { data, pagination, isLoading, isEmpty };
};

export const FindActiveIncident = (page, filter, refreshState, company) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isEmpty, setIsEmpty] = useState(false);
    const [data, setData] = useState([]);
    const [pagination, setPagination] = useState([]);
    useEffect(() => {
        setIsLoading(true);
        if (company) {
            api
                .get(`incident?page=${page + 1}&company=${company?.id}`)
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
        }
    }, [page, filter, refreshState, company]);

    return { data, pagination, isLoading, isEmpty };
};

export const FindActiveBenefit = (page, filter, refreshState, company) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isEmpty, setIsEmpty] = useState(false);
    const [data, setData] = useState([]);
    const [pagination, setPagination] = useState([]);
    useEffect(() => {
        setIsLoading(true);
        if (company) {
            api
                .get(`benefit?page=${page + 1}&company=${company?.id}`)
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
        }
    }, [page, filter, refreshState, company]);

    return { data, pagination, isLoading, isEmpty };
};

export const FindActiveBenefitType = (page, filter, refreshState) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isEmpty, setIsEmpty] = useState(false);
    const [data, setData] = useState([]);
    const [pagination, setPagination] = useState([]);
    useEffect(() => {
        setIsLoading(true);
        api
            .get(`benefit/t?page=${page + 1}`)
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

export const FindActiveAdminRole = (page, filter, refreshState) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isEmpty, setIsEmpty] = useState(false);
    const [data, setData] = useState([]);
    const [pagination, setPagination] = useState([]);
    useEffect(() => {
        setIsLoading(true);
        api
            .get(`admin_role?page=${page + 1}`)
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

export const FindActiveRole = (page, filter, refreshState) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isEmpty, setIsEmpty] = useState(false);
    const [data, setData] = useState([]);
    const [pagination, setPagination] = useState([]);
    useEffect(() => {
        setIsLoading(true);
        api
            .get(`role?page=${page + 1}`)
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

export const FindActiveDivision = (page, filter, refreshState) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isEmpty, setIsEmpty] = useState(false);
    const [data, setData] = useState([]);
    const [pagination, setPagination] = useState([]);
    useEffect(() => {
        setIsLoading(true);
        api
            .get(`division?page=${page + 1}`)
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

export const CreateIncident = async (header, form) => {
    const request = await api
        .post("/incident", {
            user_id: header.worker.id,
            incident_reason: form.reason,
            discounted_amount: form.discount,
            start_date: form.start_date,
            end_date: form.end_date,

        });
    return { data: request.data.data, status: request.data.status };
};

export const CreateGratification = async (header, form) => {
    const request = await api
        .post("/gratification", {
            user_id: header.worker.id,
            reason: form.gratification_reason,
            bonification: form.bonus,
            start_date: form.start_date,
            end_date: form.end_date,
        });
    return { data: request.data.data, status: request.data.status };
};

export const CreateBenefit = async (header, form) => {
    const request = await api
        .post("/benefit", {
            user_id: header.worker.id,
            benefit_id: form.benefit.id,
        });
    return { data: request.data.data, status: request.data.status };
};

export const CreateVacation = async (header, form) => {
    const request = await api
        .post("/vacation", {
            user_id: header.worker.id,
            start_date: form.start_date,
            end_date: form.end_date,
        });
    return { data: request.data.data, status: request.data.status };
};

export const CreateBenefitType = async (form) => {
    const request = await api
        .post("/benefit/t/", {
            name: form.name,
            bonus: form.bonus,

        });
    return { data: request.data.data, status: request.data.status };
};

export const CreateDivision = async (form) => {
    const request = await api
        .post("/division/", {
            name: form.name,
            bonus: form.bonus,

        });
    return { data: request.data.data, status: request.data.status };
};

export const CreateRole = async (form) => {
    const request = await api
        .post("/role/", {
            name: form.name,
            base_salary: form.base_salary,

        });
    return { data: request.data.data, status: request.data.status };
};

export const CreateAdminRole = async (form) => {
    const abilitiesValues = form.abilities.map((ability) => ability.value);

    const request = await api
        .post("/admin_role/", {
            name: form.name,
            abilities: JSON.stringify(abilitiesValues),

        });
    return { data: request.data.data, status: request.data.status };
};