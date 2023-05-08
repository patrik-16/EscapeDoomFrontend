import { useEffect, useState } from "react";
import { Backdrop, Box, CircularProgress, Divider, Grid, Grow, Paper, Stack, Typography } from "@mui/material";
import { common } from "@mui/material/colors";
import { useNavigate, useParams } from "react-router-dom";
import UserCard from "./UserCard";
import { getSessionId } from "../../utils/GameSessionHandler";

const GameLobby = () => {
    
    const navigate = useNavigate()

    const [name, setName] = useState('')
    const [users, setUsers] = useState([])
    const [countDown, setCountDown] = useState(5)
    const [isStarted, setIsStarted] = useState(false)

    const { lobbyID } = useParams()

    useEffect(() => {
        if (isStarted) {
            const interval = setInterval(() => {
                setCountDown(countDown - 1)
            }, 1000)
        }

        if (countDown == 0) {
            const sessionId = getSessionId()
            setIsStarted(false)
            setCountDown(5)
            navigate(`/game-session/${sessionId}`)
        }
    }, [countDown, isStarted])

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

        source.addEventListener("started", (e) => {
            setIsStarted(true)
        })

        return () => {
            source.close()
        }
    }, [])

    return (
        <>
            <Paper sx={{width: "50%", margin: "auto", padding: 2, marginY: 2}}>
                <Typography align="center" color={common.white} variant="h4"> Join at {window.location.host} with GamePin: </Typography>
                <Typography align="center" color={common.white} variant="h2"> {lobbyID} </Typography>
            </Paper>
            <Divider  />
            <Stack direction="row" justifyContent="space-between">
                <Stack marginLeft={10} direction="column">
                    <Typography fontSize={"2.5rem"} fontWeight="bold" align="center"> {users.length} </Typography>
                    <Typography fontSize={"1.5rem"} fontWeight="bold"> Players </Typography>
                </Stack>
                <Stack direction="row" alignItems="center">
                    <Typography fontSize={"1rem"} fontWeight="bold"> Waiting for players </Typography>
                    <CircularProgress size={30} thickness={5} sx={{margin: 2, marginRight: 10}} />
                </Stack>
            </Stack>
            <Grid
                container
                direction="row"
                alignItems="center"
                marginX="auto"
                width="70vw"
                columnSpacing={3}
                rowSpacing={3}
            >
                { users.map((playerName, index) => (

                            <Grid key={index} xs={4} item p={1}>
                                <UserCard playerName={playerName}/>
                            </Grid>

                        ))
                }
            </Grid>
            <Backdrop TransitionComponent={Grow} open={isStarted}> 
                <Stack>
                        <Typography fontSize="8rem"> Starting in </Typography>
                        <Typography align="center" fontSize="10rem"> {countDown} </Typography> 
                    </Stack>
            </Backdrop>
        </>
    );
}
 
export default GameLobby;