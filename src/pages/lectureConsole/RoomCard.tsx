import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {AccessTime, Close, OpenInBrowser, PlayArrow} from "@mui/icons-material";
import {CardActionArea} from "@mui/material";
import {formatTime} from "../../utils/TimeFormatter";

interface Props {
    name: String,
    topic: String,
    imgUrl: String,
    time: number
}

const RoomCard = ({name, topic, imgUrl, time}: Props) => {

    return (
        <Card>
            <CardActionArea>
                <CardMedia
                    sx={{height: {xs: 200, lg: 300}}}
                    // @ts-ignore - Needed since I get an error even tho the image gets loaded ... ?_?
                    image={imgUrl}
                    title="green iguana"
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
            <CardActions>
                <Button startIcon={<PlayArrow/>}> Start </Button>
                <Button startIcon={<OpenInBrowser/>}> Open </Button>
                <Button startIcon={<Close/>}> Close </Button>
                <Button startIcon={<AccessTime/>}> {formatTime(time)} </Button>
            </CardActions>
        </Card>
    );
};

export default RoomCard;