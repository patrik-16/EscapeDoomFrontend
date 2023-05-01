import React, {useEffect, useState} from 'react';
import TopAppBar from "./TopAppBar";
import RoomCard from "./RoomCard";
import {Divider, Grid, Stack, Typography} from "@mui/material";
import Box from "@mui/material/Box";

import BackgroundImage1 from '../../assets/live-escape-game-1155620.jpg'
import BackgroundImage2 from '../../assets/ankhesenamun-KitGM-GDgOI-unsplash.jpg'
import EscapeRooms from '../../data/EscapeRoomsProp.json'
import {getLectureToken} from "../../utils/TokenHandler";
import {useNavigate} from "react-router-dom";
//rsc

const backgroundImages = [BackgroundImage1, BackgroundImage2]
const LectureConsole = () => {

    const navigate = useNavigate()
    const [lectureData, setLectureData] = useState([])

    useEffect(() => {
        //FIXME: When token invalid or no escape rooms available... stop fetching
        if (lectureData.length != 0) {
            console.log(lectureData)
            return;
        }
        console.log(getLectureToken())
        if (getLectureToken() === null || getLectureToken() === undefined) {
            navigate("/login")
            return
        }

        const headers = new Headers()
        headers.append("Content-Type", "application/json")
        headers.append("Authorization", "Bearer " + getLectureToken())

        fetch("http://localhost:8080/api/v1/portal-escape-room/getAll", {
            method: 'GET',
            headers: headers
        })
            .then(r => r.json())
            .then(data => {
                setLectureData(data)
            })
    }, [lectureData])

    return (
        <div>
            <TopAppBar/>
            <Box width="70vw" margin="auto" mt={6}>
                <Stack gap={3}>
                    <Stack direction="row" alignItems="center">
                        <Typography fontSize="16" fontWeight="bold" mr={2}> Your Escape Rooms </Typography>
                        <Divider sx={{flexGrow: 1, borderBottomWidth: 3}} orientation="horizontal"/>
                    </Stack>                    
                    <Grid container spacing={{md: 6, lg: 12}}>
                        {lectureData.map(({name, topic, time, escapeRoomState, escaproom_id}, index) => (
                            <Grid key={index} item lg={6} sm={12}>
                                <RoomCard name={name} topic={topic} imgUrl={backgroundImages[index % 2]}
                                          time={time} escapeRoomState={escapeRoomState} id={escaproom_id}/>
                            </Grid>
                        ))}
                    </Grid>
                </Stack>
            </Box>
        </div>
    );
};

export default LectureConsole;