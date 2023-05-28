import { Box, Stack, Typography } from "@mui/material";
import { blue } from "@mui/material/colors";
import { formatDate } from "../../utils/TimeFormatter";
import { useLocation, useSearchParams } from "react-router-dom";
import { useGet } from "../../hooks/useGet";
import { getLeaderboardScores } from "../../hooks/fetchLeaderboard";

interface usrProps {
  rank: number,
  name: string,
  points: number,
  timestamp: Date
}

const headers = ["#", "Name", "Points", "Timestamp"]

const date = new Date("2023-05-28T15:00:00")
const date2 = new Date(Date.parse("2023-05-28T16:00:00"))

const EscapeLeaderboard = () => {

    const location = useLocation();
    const roomID = location.pathname.split("/").at(-1)
    const playerScores = getLeaderboardScores(`${import.meta.env.VITE_GAME_BASE_URL}/leaderboard/${roomID}`)

    return (
      <Stack alignItems={"center"} mt={5} >
        <Box width={"90%"} maxWidth={"900px"}>
          <LeaderboardTitle />
          <LeaderboardHeaders />
          {
            // This sorts by points first, and if points are equal, sort by timestamp
            playerScores.data ? playerScores.data.sort((a, b) => a.score < b.score ? 1 : (a.score > b.score) ? -1 : 0/*(a.timeStamp > b.timeStamp) ? 1 : -1*/).map((user, index: number) => (
              <RankingEntry key={index} rank={index} name={user.playerName} points={user.score} timestamp={date/*user.timeStamp*/}/>
            )) : <></>
          }
        </Box>
      </Stack>
    );
}

const LeaderboardTitle = () => {
  return (
    <Stack sx={{backgroundColor: blue[400], borderRadius: "5px 5px 0px 0px"}} width={"100%"} height={"80px"} direction={"row"} justifyContent={"center"} alignItems={"center"}>
      <Typography align="center" fontSize={48}> LEADERBOARD </Typography>
    </Stack>
  )
}

const LeaderboardHeaders = () => {
  return (
    <Box width={"100%"} sx={{backgroundColor: '#fff'}}>
        <Stack ml={1} direction="row" height={"40px"} alignItems={"center"} p={1}>
          {
            headers.map((header, index) => (
              <Typography key={index} fontWeight={"bold"} fontSize={24} color={'#000'} width={"100%"}> {header} </Typography>
            ))
          }
        </Stack>
    </Box>
  )
}

const RankingEntry: React.FC<usrProps> = ({rank, name, points, timestamp}: usrProps) => {
  return (
    <Box width={"100%"}>
        <Stack direction="row" height={"60px"} alignItems={"center"} p={1}>
            <Typography fontSize={30} width={"100%"} ml={1}> {rank + 1}. </Typography>
            <Typography noWrap sx={{textOverflow: 'ellipsis'}} fontSize={24} width={"100%"}> {name} </Typography>
            <Typography fontSize={24} width={"100%"}> {points} </Typography>
            <Typography fontSize={24} width={"100%"}> { formatDate(timestamp) } </Typography>
        </Stack>
    </Box>
  )
}

export default EscapeLeaderboard;