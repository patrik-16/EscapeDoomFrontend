import React, {useState} from 'react';
import {Alert, Avatar, Button, Container, Snackbar, TextField, Typography} from "@mui/material";
import {LockOutlined} from "@mui/icons-material";
import Box from "@mui/material/Box";
import {useNavigate} from "react-router-dom";
import useToken from "../../utils/TokenHandler";

const Login = () => {
    const navigate = useNavigate()
    const [open, setOpen] = useState(false)
    const [token, setToken] = useToken()
    const handleClose = () => setOpen(false)

    function logIn (e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const data = new FormData(e.currentTarget)
        const email: string = data.get('email') as string
        const password: string = data.get('password') as string

        const headers = new Headers()
        headers.append("Content-Type", "application/json")

        fetch("http://localhost:8080/api/v1/auth/authenticate", {
            headers: headers,
            method: "POST",
            body: JSON.stringify({
                "email": email,
                "password": password
            })
        })
        .then(r => r.json())
        .then(data => {
        // @ts-ignore
            setToken(data.token)
            console.log(token)
            if (token !== null && token !== undefined) { navigate("/LectureConsole") }
        })
        .catch(err => {
            setOpen(true)
        })
    }

    return (
        <div>
            <Container maxWidth="xs">
                <Box
                    sx={{
                        mt: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}
                >
                    <Avatar sx={{m: 1}}>
                        <LockOutlined/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Log In!
                    </Typography>
                    <Box component="form" onSubmit={logIn} noValidate mt={1}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant={"contained"}
                            sx={{mt: 3, mb: 2}}
                        >
                            Log In
                        </Button>
                    </Box>
                </Box>
            </Container>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{width: '100%'}}>
                    The given account is not in our database
                </Alert>
            </Snackbar>

        </div>
    );
};

export default Login;