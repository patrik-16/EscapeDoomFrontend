import {useQuery} from "@tanstack/react-query";
import {getLectureToken} from "../utils/TokenHandler";
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
        queryFn: async () => {
            await sleep(5000)
            const {data} = await axios.get(
                'http://localhost:8080/api/v1/portal-escape-room/getAll', {
                    headers: {
                        'Authorization': "Bearer " + getLectureToken(),
                        // 'Content-Type': "application/json"
                    }
                }
            )
            return data as [escapeRoomData]
        },
        staleTime: Infinity
    })
};