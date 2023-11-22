import axios from "axios";
import { useEffect, useState } from "react";
import api from "../api";

export const doWorkersPayment = async (id = null) => {
    var url = "/finance/payment/p/";
    id !== null &&
        (url = `/finance/payment/p/${id}`);

    const request = await api.get(url)
    return { data: request.data.data, status: request.data.status };
}

export const getWorkerDemonstrative = async (id, month = null) => {
    let url = `/finance/payment/${id}`;
    
    if (month !== null) {
        url += `?month=${month}`;
    }

    const request = await api.get(url)
    return { data: request.data.data.info, status: request.data.status };
}