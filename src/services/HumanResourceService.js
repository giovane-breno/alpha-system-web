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
                .get(`vacation?page=${page + 1}&company=${company?.id}&search=${filter}`)
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
                .get(`gratification?page=${page + 1}&company=${company?.id}&search=${filter}`)
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
                .get(`incident?page=${page + 1}&company=${company?.id}&search=${filter}`)
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
                .get(`benefit?page=${page + 1}&company=${company?.id}&search=${filter}`)
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
            .get(`benefit/t?page=${page + 1}&search=${filter}`)
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
            .get(`admin_role?page=${page + 1}&search=${filter}`)
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
            .get(`role?page=${page + 1}&search=${filter}`)
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
            .get(`division?page=${page + 1}&search=${filter}`)
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

export const FindIncident = async (id) => {
    const request = await api.get(`incident/${id}`);
    return { data: request.data.data, status: request.data.status };
};

export const UpdateIncident = async (id, form) => {
    const request = await api
        .put(`/incident/${id}`, {
            user_id: form.id,
            incident_reason: form.incident_reason,
            discounted_amount: form.discounted_amount,
            start_date: form.start_date,
            end_date: form.end_date,
        });
    return { data: request.data.data, status: request.data.status };
};

export const DeleteIncident = async (id) => {
    const request = await api.delete(`incident/${id}`);
    return { data: request.data, status: request.data.status };
};


export const FindGratification = async (id) => {
    const request = await api.get(`gratification/${id}`);
    return { data: request.data.data, status: request.data.status };
};

export const CreateGratification = async (header, form) => {
    const request = await api
        .post("/gratification", {
            user_id: header.worker.id,
            gratification_reason: form.reason,
            bonus: form.bonification,
            start_date: form.start_date,
            end_date: form.end_date,
        });
    return { data: request.data.data, status: request.data.status };
};

export const UpdateGratification = async (id, form) => {
    const request = await api
        .put(`/gratification/${id}`, {
            user_id: form.id,
            gratification_reason: form.gratification_reason,
            bonus: form.bonus,
            start_date: form.start_date,
            end_date: form.end_date,
        });
    return { data: request.data.data, status: request.data.status };
};

export const DeleteGratification = async (id) => {
    const request = await api.delete(`gratification/${id}`);
    return { data: request.data, status: request.data.status };
};

export const FindBenefit = async (id) => {
    const request = await api.get(`benefit/${id}`);
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

export const UpdateBenefit = async (id, form) => {
    const request = await api
        .put(`/benefit/${id}`, {
            user_id: id,
            benefit_id: form.benefit,

        });
    return { data: request.data.data, status: request.data.status };
};

export const DeleteBenefit = async (id) => {
    const request = await api.delete(`benefit/${id}`);
    return { data: request.data, status: request.data.status };
};

export const FindVacation = async (id) => {
    const request = await api.get(`vacation/${id}`);
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

export const UpdateVacation = async (id, form) => {
    const request = await api
        .put(`/vacation/${id}`, {
            user_id: id,
            start_date: form.start_date,
            end_date: form.end_date,
        });
    return { data: request.data.data, status: request.data.status };
};

export const DeleteVacation = async (id) => {
    const request = await api.delete(`vacation/${id}`);
    return { data: request.data, status: request.data.status };
};

export const FindBenefitType = async (id) => {
    const request = await api.get(`benefit/t/${id}`);
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

export const UpdateBenefitType = async (id, form) => {
    const request = await api
        .put(`/benefit/t/${id}`, {
            name: form.name,
            bonus: form.bonus,
        });
    return { data: request.data.data, status: request.data.status };
};

export const DeleteBenefitType = async (id) => {
    const request = await api.delete(`/benefit/t/${id}`);
    return { data: request.data, status: request.data.status };
};

export const FindDivision = async (id) => {
    const request = await api.get(`division/${id}`);
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

export const UpdateDivision = async (id, form) => {
    const request = await api
        .put(`/division/${id}`, {
            name: form.name,
            bonus: form.bonus,
        });
    return { data: request.data.data, status: request.data.status };
};

export const DeleteDivision = async (id) => {
    const request = await api.delete(`division/${id}`);
    return { data: request.data, status: request.data.status };
};

export const FindRole = async (id) => {
    const request = await api.get(`role/${id}`);
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

export const UpdateRole = async (id, form) => {
    const request = await api
        .put(`/role/${id}`, {
            name: form.name,
            base_salary: form.base_salary,
        });
    return { data: request.data.data, status: request.data.status };
};

export const DeleteRole = async (id) => {
    const request = await api.delete(`role/${id}`);
    return { data: request.data, status: request.data.status };
};

export const FindAdminRole = async (id) => {
    const request = await api.get(`admin_role/${id}`);
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

export const UpdateAdminRole = async (id, form) => {
    const abilitiesValues = form.abilities.map((ability) => ability.value);

    const request = await api
        .put(`/admin_role/${id}`, {
            name: form.name,
            abilities: JSON.stringify(abilitiesValues),
        });
    return { data: request.data.data, status: request.data.status };
};

export const DeleteAdminRole = async (id) => {
    const request = await api.delete(`admin_role/${id}`);
    return { data: request.data, status: request.data.status };
};

export const FindAdmin = async (id) => {
    const request = await api.get(`user/a/${id}`);
    return { data: request.data.data, status: request.data.status };
};

export const CreateAdmin = async (form) => {
    const request = await api
        .post("user/a/", {
            user_id: form.user_id?.id,
            admin_role_id: form.admin_role_id?.id,

        });
    return { data: request.data.data, status: request.data.status };
};

export const UpdateAdmin = async (id, form) => {
    const request = await api
        .put(`user/a/${id}`, {
            user_id: form.user_id,
            admin_role_id: form.role.id,
        });
    return { data: request.data.data, status: request.data.status };
};

export const DeleteAdmin = async (id) => {
    const request = await api.delete(`user/a/${id}`);
    return { data: request.data, status: request.data.status };
};