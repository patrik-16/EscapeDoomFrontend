import { Grid, Typography } from "@mui/material";
import BackgroundImage from '../../assets/live-escape-game-1155620.jpg'
import { common } from "@mui/material/colors";
import { useNavigate, useParams } from "react-router-dom";

const GameLobby = () => {
    
    const navigate = useNavigate()

    const { lobbyID } = useParams()
    console.log(lobbyID)

    return (
        <>
            <Grid
                container
                direction="column"
                // justifyContent="center"
                // alignItems="center"
                height="100vh"
            //     sx={{
            //         backgroundImage: `url(${BackgroundImage})`,
            //         backgroundColor: '#404040',
            //         backgroundBlendMode: 'multiply',
            //         backgroundSize: 'cover',
            // }}
            >
                <Typography sx={{paddingBottom: 3}} color={common.white} variant="h2"> Escape Room Lobby {lobbyID} </Typography>
            </Grid>
        </>
    );
}
 
export default GameLobby;