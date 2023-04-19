import {useState} from 'react'
import {useAppSelector, useAppDispatch} from './hooks/counterHook'
import {incremented, amountAdded} from './store/counter-slice'

import LectureConsole from "./pages/lectureConsole/main"

import {Route, Routes} from "react-router-dom";
import StudentJoin from "./pages/studenJoin/main";

function App() {
    const count = useAppSelector((state) => state.counter.value)
    const dispatch = useAppDispatch()

    const handleClick = () => {
        // increment by 1
        // dispatch(incremented())

        // increment by a fixed amount
        dispatch(amountAdded(3))
    }

    return (
        <div className="App">
            <Routes>
                <Route path="/" element={ <LectureConsole /> } />
                <Route path="/join" element={ <StudentJoin /> } />
            </Routes>
        </div>
    )
}

export default App
