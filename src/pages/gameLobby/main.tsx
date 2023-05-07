import { useEffect, useState } from "react";
import { Grid, Stack, Typography } from "@mui/material";
import { common } from "@mui/material/colors";
import { useNavigate, useParams } from "react-router-dom";
import UserCard from "./UserCard";
import { getSessionId } from "../../utils/GameSessionHandler";

const GameLobby = () => {
    
    const navigate = useNavigate()

    const [name, setName] = useState('')
    const [users, setUsers] = useState([])

    const { lobbyID } = useParams()

    useEffect(() => {
        const sessionId = getSessionId()
        const url = `http://localhost:8090/api/join/lobby/${sessionId}`
        const source = new EventSource(url)
        source.addEventListener("yourName", (e) => {
            const parsedData = e.data
            setName(parsedData)
        })

        source.addEventListener("allNames", (e) => {
            const parsedData = JSON.parse(e.data)
            setUsers(parsedData.players)
        })

        return () => {
            source.close()
        }
    }, [])

    return (
        <>
            <Typography sx={{paddingBottom: 3}} color={common.white} variant="h2"> Escape Room Lobby {lobbyID} </Typography>
            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                width="70vw"
                columnSpacing={3}
                rowSpacing={3}
            >
                { users.map((playerName, index) => (

                            <Grid key={index} xs={4} item >
                                <UserCard playerName={playerName}/>
                            </Grid>

                        ))
                }
            </Grid>
        </>
    );
}
 
export default GameLobby;