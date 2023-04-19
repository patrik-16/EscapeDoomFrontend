import React, {useState} from 'react';
import BackgroundImage from '../../assets/live-escape-game-1155620.jpg'
import {Button, Card, CardContent, Grid, Stack, TextField, Typography} from "@mui/material";
import {common} from "@mui/material/colors";

const StudentJoin = () => {

    const [roomPin, setRoomPin] = useState('')

    const handleUserInput = (e: any) => {
        setRoomPin(e.target.value)
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
                        <Stack spacing={2} alignItems="center">
                            <TextField
                                id="outlined-basic"
                                label="Room-PIN"
                                variant="outlined"
                                value={roomPin}
                                onChange={handleUserInput}
                                fullWidth
                            />
                            <Button sx={{height: 56}} variant="contained" fullWidth>JOIN</Button>
                        </Stack>
                    </CardContent>
                </Card>
            </Grid>
        </>
    );
};

export default StudentJoin;