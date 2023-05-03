import React from 'react';
import {useQuery} from "@tanstack/react-query";
import axios from "axios";

export const usePost = (url: string) => {
    return useQuery({
        queryKey: ['postData'],
        queryFn: async () => {
            const { data } = await axios.post(
                url
            )
            return data
        },
        onSuccess(data) {

        },
        onError(err) {

        }
    })
};
