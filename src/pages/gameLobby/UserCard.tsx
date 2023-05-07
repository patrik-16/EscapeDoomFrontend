import { Card, CardContent, Typography } from "@mui/material";

interface Props {
    playerName: string
}

const UserCard = ({playerName}: Props) => {
    return (
    <>
    <Card>
        <CardContent>
            <Typography> {playerName} </Typography>
        </CardContent>
    </Card>
    </>
    );
}
 
export default UserCard;