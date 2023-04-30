import React, {useState} from 'react';
import BackgroundImage from '../../assets/live-escape-game-1155620.jpg'
import {Button, Card, CardContent, Grid, Stack, TextField, Typography} from "@mui/material";
import {common} from "@mui/material/colors";
import Box from "@mui/material/Box";
import {joinEscapeRoom} from "../../utils/ApiCallHandler";
import { useNavigate } from 'react-router-dom';

const StudentJoin = () => {

    const navigate = useNavigate()

    const [roomPin, setRoomPin] = useState('')
    const [playerName, setPlayerName] = useState('')

    const handleUserInput = (e: any) => {
        setRoomPin(e.target.value)
    }

    const sendID = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const response = joinEscapeRoom(roomPin)
        response.then(data => setPlayerName(data)).then(_ => console.log(playerName))

        if (playerName !== '') {
            navigate("/")
        }
    }

    return (
        <>
            <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                height="100vh"
                sx={{
                    backgroundImage: `url(${BackgroundImage})`,
                    backgroundColor: '#404040',
                    backgroundBlendMode: 'multiply',
                    backgroundSize: 'cover',
            }}
            >
                <Typography sx={{paddingBottom: 3}} color={common.white} variant="h2"> Escape Room </Typography>
                <Card sx={{minWidth: 550, paddingX: 3}}>
                    <CardContent>
                        <Stack spacing={2} alignItems="center" component="form" onSubmit={sendID} noValidate>
                            <TextField
                                id="outlined-basic"
                                label="Room-PIN"
                                variant="outlined"
                                value={roomPin}
                                onChange={handleUserInput}
                                fullWidth
                            />
                            <Button sx={{height: 56}} variant="contained" type="submit" fullWidth>JOIN</Button>
                        </Stack>
                    </CardContent>
                </Card>
            </Grid>
        </>
    );
};

export default StudentJoin;