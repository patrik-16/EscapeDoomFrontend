import { useQuery } from "@tanstack/react-query";
import { getLectureToken } from "../utils/TokenHandler";
import axios from "axios";

interface escapeRoomData {
    escaproom_id: number
    name: string
    topic: string
    time: number
    escapeRoomState: string
    userId: number
}

const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

export const useGet = () => {
    return useQuery({
        queryKey: ['getData'],
        retry: 1,
        queryFn: async () => {
            await sleep(1000)
            const { data } = await axios.get(
                'http://localhost:8080/api/v1/portal-escape-room/getAll', {
                headers: {
                    'Authorization': "Bearer " + getLectureToken(),
                }
            }
            )
            return data as [escapeRoomData]
        },
        staleTime: Infinity
    })
};