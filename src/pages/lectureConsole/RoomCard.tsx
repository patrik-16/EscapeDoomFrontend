import React, {useState} from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {AccessTime, Circle, Close, OpenInBrowser, PlayArrow} from "@mui/icons-material";
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

    const [status, setStatus] = useState(escapeRoomState)
    const [open, setOpen] = useState(false)
    const handleClose = () => setOpen(false)

    const openEscapeRoomCall = usePost(`http://localhost:8080/api/v1/portal-escape-room/openEscapeRoom/${id}`)
    const startEscapeRoomCall = usePost(`http://localhost:8080/api/v1/portal-escape-room/startEscapeRoom/${id}`)
    const stopEscapeRoomCall = usePost(`http://localhost:8080/api/v1/portal-escape-room/stopEscapeRoom/${id}`)

    //TODO: Make this into reusable function
    const openRoom = async () => {
        const refetchResponse = (await openEscapeRoomCall.refetch())
        if (!refetchResponse.isError) {
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
            setStatus('STOPPED')
        } else {
            setOpen(true)
        }
    }

    const logger = () => {
        console.log(id)
    }

    return (
        <Card>
            <CardActionArea onClick={logger}>
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
                </CardContent>
            </CardActionArea>
            <CardActions sx={{justifyContent: "space-between"}}>
                <Circle sx={{color: stateColor(status)}}> </Circle>
                <Button onClick={openRoom} startIcon={<OpenInBrowser/>}> Open </Button>
                <Button onClick={startRoom} startIcon={<PlayArrow/>}> Start </Button>
                <Button onClick={stopRoom} startIcon={<Close/>}> Close </Button>
                <Button disabled sx={{marginLeft: "auto"}} startIcon={<AccessTime/>}> {formatTime(time)} </Button>
            </CardActions>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="info" sx={{width: '100%'}}>
                    Moving from {status} to the desired state not possible
                </Alert>
            </Snackbar>
        </Card>
    );
};

export default RoomCard;