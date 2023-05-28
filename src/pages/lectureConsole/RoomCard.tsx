import React, {useState} from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {AccessTime, Circle, Close, OpenInBrowser, PlayArrow, Share} from "@mui/icons-material";
import {Alert, CardActionArea, Snackbar} from "@mui/material";
import {formatTime} from "../../utils/TimeFormatter";
import { usePost } from '../../hooks/usePost';

interface Props {
    name: String,
    topic: String,
    imgUrl: String,
    time: number,
    escapeRoomState: string,
    id: number
}

const stateColor = (escapeRoomState: string) => {
    switch (escapeRoomState) {
        case 'STOPPED':
            return '#ff0000'
        case 'JOINABLE':
            return '#ffff00'
        case 'PLAYING':
            return '#00ff00'
    }
}

const RoomCard = ({name, topic, imgUrl, time, escapeRoomState, id}: Props) => {

    //TODO CHANGE TO TIMER INPUT
    const fixedTime : number = 90;

    const [status, setStatus] = useState(escapeRoomState)
    const [open, setOpen] = useState(false)
    const [lobbyID, setLobbyID] = useState(0)
    
    const handleClose = () => setOpen(false)

    const openEscapeRoomCall = usePost(`${import.meta.env.VITE_LECTOR_BASE_URL}/portal-escape-room/openEscapeRoom/${id}`)
    const startEscapeRoomCall = usePost(`${import.meta.env.VITE_LECTOR_BASE_URL}/portal-escape-room/startEscapeRoom/${id}/${fixedTime}`)
    const stopEscapeRoomCall = usePost(`${import.meta.env.VITE_LECTOR_BASE_URL}/portal-escape-room/stopEscapeRoom/${id}`)

    //TODO: Make room calls into reusable function
    const openRoom = async () => {
        const refetchResponse = (await openEscapeRoomCall.refetch())
        if (!refetchResponse.isError) {
            setLobbyID(refetchResponse.data)
            console.log(refetchResponse)
            setStatus('JOINABLE')
        } else {
            setOpen(true)
        }
    }

    const startRoom = async () => {
        const refetchResponse = (await startEscapeRoomCall.refetch())
        if (!refetchResponse.isError) {
            console.log(refetchResponse)
            setStatus('PLAYING')
        } else {
            setOpen(true)
        }
    }

    const stopRoom = async () => {
        const refetchResponse = (await stopEscapeRoomCall.refetch())
        if (!refetchResponse.isError) {
            console.log(refetchResponse)
            setLobbyID(0)
            setStatus('STOPPED')
        } else {
            setOpen(true)
        }
    }

    return (
        <Card>
            <CardMedia
                sx={{height: {xs: 200, lg: 300}}}
                // @ts-ignore - Needed since I get an error even tho the image gets loaded ... ?_?
                image={imgUrl}
                title="Escape Room Picture"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {name}
                </Typography>
                <Typography gutterBottom sx={{fontSize: 14}} component="div">
                    {topic}
                </Typography>
                {lobbyID !== 0 ?
                    <Typography gutterBottom sx={{fontSize: 14}} component="div">
                        LobbyID: {lobbyID}
                    </Typography>
                    : ''
                }
            </CardContent>
            <CardActions sx={{justifyContent: "space-between"}}>
                <Circle sx={{color: stateColor(status)}}> </Circle>
                <Button onClick={openRoom} startIcon={<OpenInBrowser/>}> Open </Button>
                <Button onClick={startRoom} startIcon={<PlayArrow/>}> Start </Button>
                <Button onClick={stopRoom} startIcon={<Close/>}> Close </Button>
                <Button disabled sx={{marginLeft: "auto"}} startIcon={<AccessTime/>}> {formatTime(time)} </Button>
            </CardActions>

            {/* Snackbars */}

            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="info" sx={{width: '100%'}}>
                    Moving from {status} to the desired state not possible
                </Alert>
            </Snackbar>
        </Card>
    );
};

export default RoomCard;