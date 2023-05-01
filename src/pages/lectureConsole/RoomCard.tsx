import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {AccessTime, Circle, Close, OpenInBrowser, PlayArrow} from "@mui/icons-material";
import {CardActionArea, Icon, Stack} from "@mui/material";
import {formatTime} from "../../utils/TimeFormatter";
import { openEscapeRoom, startEscapeRoom, stopEscapeRoom } from '../../utils/ApiCallHandler';

interface Props {
    name: String,
    topic: String,
    imgUrl: String,
    time: number,
    escapeRoomState: string,
    id: number
}

const stateColor = (escapeRoomState: string) =>{
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

    const openRoom = (id: number) => {
        openEscapeRoom(id).then(msg => console.log(msg))
        setStatus('JOINABLE')
    }
    
    const startRoom = (id: number) => {
        startEscapeRoom(id).then(msg => console.log(msg))
        setStatus('PLAYING')
    }
    
    const stopRoom = (id: number) => {
        stopEscapeRoom(id).then(msg => console.log(msg))
        setStatus('STOPPED')
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
                <Button onClick={(e) => openRoom(id)} startIcon={<OpenInBrowser/>}> Open </Button>
                <Button onClick={(e) => startRoom(id)} startIcon={<PlayArrow/>}> Start </Button>
                <Button onClick={(e) => stopRoom(id)} startIcon={<Close/>}> Close </Button>
                <Button disabled sx={{marginLeft: "auto"}} startIcon={<AccessTime/>}> {formatTime(time)} </Button>
            </CardActions>
        </Card>
    );
};

export default RoomCard;