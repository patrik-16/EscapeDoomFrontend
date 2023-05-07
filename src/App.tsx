import React, {useState} from 'react'

import LectureConsole from "./pages/lectureConsole/main"
import {Route, Routes, RedirectFunction, Navigate, useParams} from "react-router-dom";
import StudentJoin from "./pages/studenJoin/main";
import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import Login from "./pages/login/main";
import EscapeView from "./pages/escapeView/main";
import GameLobby from './pages/gameLobby/main';

function App() {

    const darkTheme = createTheme({
        palette: {
            mode: "dark"
        }
    })

    return (
        <div className="App">
            <ThemeProvider theme={darkTheme}>
                <CssBaseline/>
                <Routes>
                    <Route path="/" element={<StudentJoin/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/LectureConsole" element={<LectureConsole/>}/>
                    <Route path="/game-lobby/:lobbyID" element={<GameLobby/>}/>
                    <Route path="/game-session" element={<EscapeView initialValue={"const a = 1"}/>}/>
                </Routes>
            </ThemeProvider>
        </div>
    )
}

export default App
