import axios from "axios";
import { useEffect, useState } from "react";
import api from "../api";


export const GetUserCount = () => {
    const [data, setData] = useState(0);
    const url = `data/user`;
    try {
        useEffect(() => {

            api.get(url).then((response) => {
                setData(response.data.data);
            });
        }, []);
    } catch (error) {

    }



    return { data };
};

export const GetAdminCount = () => {
    const [data, setData] = useState(0);
    const url = `data/admin`;
    try {
        useEffect(() => {

            api.get(url).then((response) => {
                setData(response.data.data);
            });
        }, []);
    } catch (error) {

    }



    return { data };
};

export const GetDemonstrativeSum = () => {
    const [data, setData] = useState(0);
    const url = `data/demonstrative`;
    try {
        useEffect(() => {
            api.get(url).then((response) => {
                setData(response.data.data);
            });
        }, []);
    } catch (error) {

    }


    return { data };
};

export const GetSalarySum = () => {
    const [data, setData] = useState(0);
    const url = `data/salary`;
    try {
        useEffect(() => {

            api.get(url).then((response) => {
                setData(response.data.data);
            });
        }, []);
    } catch (error) {

    }



    return { data };
};

export const FetchWorkers = (company) => {
    const [isLoading, setLoading] = useState(true);
    const [isEmpty, setEmpty] = useState(true);
    const [data, setData] = useState([]);
    const url = `l/workers?company=${company?.id}`;

    useEffect(() => {
        if (company) {
            api.get(url).then((response) => {
                setData(response.data.data);
                setEmpty(false)
            });

            setLoading(false);
        }
    }, [company]);

    return { data, isLoading, isEmpty };
}

export const FindWorker = async (id) => {
    const request = await api.get(`user/${id}`);
    return { data: request.data.data, status: request.data.status };
};

export const FetchRoles = () => {
    const [data, setData] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [isEmpty, setEmpty] = useState(true);
    const url = `l/roles`;

    useEffect(() => {
        api.get(url).then((response) => {
            setData(response.data.data);
            setEmpty(false)
        });

        setLoading(false);
    }, []);

    return { data, isLoading, isEmpty };
}

export const FetchAdminRoles = () => {
    const [data, setData] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [isEmpty, setEmpty] = useState(true);
    const url = `l/roles/a`;

    useEffect(() => {
        api.get(url).then((response) => {
            setData(response.data.data);
            setEmpty(false)
        });

        setLoading(false);
    }, []);

    return { data, isLoading, isEmpty };
}

export const FetchDivisions = () => {
    const [data, setData] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [isEmpty, setEmpty] = useState(true);
    const url = `l/divisions`;

    useEffect(() => {
        api.get(url).then((response) => {
            setData(response.data.data);
            setEmpty(false)
        });

        setLoading(false);
    }, []);

    return { data, isLoading, isEmpty };
}

export const FetchBenefits = () => {
    const [data, setData] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [isEmpty, setEmpty] = useState(true);
    const url = `l/benefits`;

    useEffect(() => {
        api.get(url).then((response) => {
            setData(response.data.data);
            setEmpty(false)
        });

        setLoading(false);
    }, []);

    return { data, isLoading, isEmpty };
}

export const FindActiveWorkers = (page, filter, refreshState, company) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isEmpty, setIsEmpty] = useState(false);
    const [data, setData] = useState([]);
    const [pagination, setPagination] = useState([]);
    useEffect(() => {
        setIsLoading(true);
        if (company) {
            api
                .get(`user?page=${page + 1}&company=${company?.id}&search=${filter}`)
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

export const FindActiveAdmins = (page, filter, refreshState) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isEmpty, setIsEmpty] = useState(false);
    const [data, setData] = useState([]);
    const [pagination, setPagination] = useState([]);
    useEffect(() => {
        setIsLoading(true);
        api
            .get(`user/a?page=${page + 1}&search=${filter}`)
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

export const CreateWorker = async (form) => {
    const request = await api
        .post("/user", {
            name: form.name,
            email: form.email,
            gender: form.gender,
            born_at: form.bornAt,
            marital_status: form.marital,
            education_level: form.scholarity,
            cpf: form.cpf,
            ctps: form.ctps,
            pis: form.pis,
            company_id: form.company?.id,
            role_id: form.role?.id,
            division_id: form.division?.id,
            address: {
                cep: form.cep, street: form.street, district: form.district, city: form.city,
                house_number: form.houseNumber, complement: form.complement, references: form.references
            },
            phones: {
                phones_number: form.phones
            }



        });

    return { data: request.data.data, status: request.data.status };
};

export const UpdateWorker = async (id, form) => {
    const request = await api
        .put(`/user/${id}`, {
            name: form.name,
            email: form.email,
            gender: form.gender,
            born_at: form.born_at,
            marital_status: form.marital,
            education_level: form.scholarity,
            cpf: form.cpf,
            ctps: form.ctps,
            pis: form.pis,
            company_id: form.company?.id,
            role_id: form.role?.id,
            division_id: form.division?.id,
            address: {
                cep: form.cep, street: form.street, district: form.district, city: form.city,
                house_number: form.house_number, complement: form.complement, references: form.references
            },
            phones: {
                phones_number: form.phones
            }
        });

    return { data: request.data.data, status: request.data.status };
};

export const DeleteWorker = async (id) => {
    const request = await api.delete(`user/${id}`);
    return { data: request.data, status: request.data.status };
};