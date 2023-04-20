import {useState} from 'react'
import {useAppSelector, useAppDispatch} from './hooks/counterHook'
import {incremented, amountAdded} from './store/counter-slice'

import LectureConsole from "./pages/lectureConsole/main"

import {Route, Routes} from "react-router-dom";
import StudentJoin from "./pages/studenJoin/main";
import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";

function App() {
    const count = useAppSelector((state) => state.counter.value)
    const dispatch = useAppDispatch()

    const handleClick = () => {
        // increment by 1
        // dispatch(incremented())

        // increment by a fixed amount
        dispatch(amountAdded(3))
    }

    const darkTheme = createTheme({
        palette: {
            mode: "dark"
        }
    })

    return (
        <div className="App">
            <ThemeProvider theme={darkTheme}>
                <CssBaseline />
                <Routes>
                    <Route path="/" element={<LectureConsole/>}/>
                    <Route path="/join" element={<StudentJoin/>}/>
                </Routes>
            </ThemeProvider>
        </div>
    )
}

export default App
