import { Box, Stack, Typography } from "@mui/material";
import { blue } from "@mui/material/colors";

interface usrProps {
  rank: number,
  name: string,
  points: number,
  timestamp: Date
}

const userRanking = (name: string, points: number, timestamp: Date) => {
    return {name, points, timestamp}
}

const date = new Date()

const testEntries = [
  {name: "Maxl", points: 420, timeStamp: date},
  {name: "Schmomi", points: 69, timeStamp: date},
  {name: "Paxi", points: 69, timeStamp: date}
]

const EscapeLeaderboard = () => {
    return (
      <Stack alignItems={"center"} mt={5} >
        <Box width={"90%"} maxWidth={"1000px"}>
          <LeaderboardTitle />
          <LeaderboardHeaders />
          {
            testEntries.map((user, index: number) => (
              <RankingEntry rank={index} name={user.name} points={user.points} timestamp={user.timeStamp}/>
            ))
          }
        </Box>
      </Stack>
    );
}

const LeaderboardTitle = () => {
  return (
    <Stack sx={{backgroundColor: blue[400], borderRadius: "10px 10px 0px 0px"}} width={"100%"} height={"80px"} direction={"row"} justifyContent={"center"} alignItems={"center"}>
      <Typography align="center" fontSize={24}> LEADERBOARD </Typography>
    </Stack>
  )
}

const LeaderboardHeaders = () => {
  return (
    <Box width={"100%"}>
        <Stack direction="row" height={"40px"} alignItems={"center"} p={1}>
            <Typography width={"100%"}> # </Typography>
            <Typography width={"100%"}> Name </Typography>
            <Typography width={"100%"}> Points </Typography>
            <Typography width={"100%"}> Timestamp </Typography>
        </Stack>
    </Box>
  )
}

const RankingEntry: React.FC<usrProps> = ({rank, name, points, timestamp}: usrProps) => {
  return (
    <Box width={"100%"} sx={{backgroundColor: '#555'}}>
        <Stack direction="row" height={"40px"} alignItems={"center"} p={1}>
            <Typography width={"100%"}> {rank + 1} </Typography>
            <Typography width={"100%"}> {name} </Typography>
            <Typography width={"100%"}> {points} </Typography>
            <Typography width={"100%"}> {timestamp.getHours()}:{timestamp.getMinutes()}</Typography>
        </Stack>
    </Box>
  )
}

export default EscapeLeaderboard;