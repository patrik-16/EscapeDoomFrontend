import React from 'react';
import TopAppBar from "./TopAppBar";
import RoomCard from "./RoomCard";
import {Divider, Grid, Stack, Typography} from "@mui/material";
import Box from "@mui/material/Box";

import BackgroundImage1 from '../../assets/live-escape-game-1155620.jpg'
import BackgroundImage2 from '../../assets/ankhesenamun-KitGM-GDgOI-unsplash.jpg'
import EscapeRooms from '../../data/EscapeRoomsProp.json'
//rsc

const backgroundImages = [BackgroundImage1, BackgroundImage2]
const LectureConsole = () => {
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
                        {EscapeRooms.escapeRooms.map((escroom, index) => (
                            <Grid item lg={6} sm={12}>
                                <RoomCard name={escroom.name} topic={escroom.topic} imgUrl={backgroundImages[index % 2]}
                                          time={escroom.time}/>
                            </Grid>
                        ))}
                    </Grid>
                </Stack>
            </Box>
        </div>
    );
};

export default LectureConsole;