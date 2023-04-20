import React from 'react';
import TopAppBar from "./TopAppBar";
import RoomCard from "./RoomCard";
import {Divider, Stack, Typography} from "@mui/material";
import Box from "@mui/material/Box";

import BackgroundImage from '../../assets/live-escape-game-1155620.jpg'

//rsc

const LectureConsole = () => {
    return (
        <div>
            <TopAppBar/>
            <Box width="70vw" margin="auto">
                <Stack gap={3}>
                    <Stack direction="row" alignItems="center">
                        <Typography fontSize="16" fontWeight="bold" mr={2}> Your Escape Rooms </Typography>
                        <Divider sx={{flexGrow: 1, borderBottomWidth: 3}} orientation="horizontal"/>
                    </Stack>
                    <RoomCard name="Escape Room Name 1" time={90} topic="MAD - useState" imgUrl={BackgroundImage}/>
                </Stack>
            </Box>
        </div>
    );
};

export default LectureConsole;