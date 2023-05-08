import {Typography} from "@mui/material";

interface Props {
    playerName: string
}

const UserCard = ({playerName}: Props) => {
    return (
    <>  
        <Typography align="center" fontSize={24} fontWeight={"bold"}> {playerName} </Typography>
    </>
    );
}
 
export default UserCard;