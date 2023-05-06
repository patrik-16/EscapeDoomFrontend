import React from 'react';
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface tokenData {
    token: string
}

export const usePost = (url: string, usrEmail?: string, usrPassword?: string) => {

    let body = {}
    if (usrEmail && usrPassword) {
        body = {
            "email": usrEmail,
            "password": usrPassword
        }
    }

    return useQuery({
        queryKey: ['postData'],
        queryFn: async () => {
            const { data } = await axios.post(url, body)
            return data as tokenData
        },
        enabled: false,
        retry: false,
        onSuccess(data) {

        },
        onError(err) {

        }
    })
};
