import { Box, Stack, Typography } from "@mui/material";
import { blue } from "@mui/material/colors";
import { formatDate } from "../../utils/TimeFormatter";

interface usrProps {
  rank: number,
  name: string,
  points: number,
  timestamp: Date
}

const userRanking = (name: string, points: number, timestamp: Date) => {
    return {name, points, timestamp}
}
const headers = ["#", "Name", "Points", "Timestamp"]

const date = new Date("2023-05-28T15:00:00")
const date2 = new Date(Date.parse("2023-05-28T16:00:00"))

const testEntries = [
  {name: "Maxl", points: 420, timeStamp: date},
  {name: "Schmomi", points: 69, timeStamp: date},
  {name: "Paxi", points: 69, timeStamp: date2}
]

const EscapeLeaderboard = () => {
    return (
      <Stack alignItems={"center"} mt={5} >
        <Box width={"90%"} maxWidth={"900px"}>
          <LeaderboardTitle />
          <LeaderboardHeaders />
          {
            // This sorts by points first, and if points are equal, sort by timestamp
            testEntries.sort((a, b) => a.points < b.points ? 1 : (a.points > b.points) ? -1 : (a.timeStamp > b.timeStamp) ? 1 : -1).map((user, index: number) => (
              <RankingEntry rank={index} name={user.name} points={user.points} timestamp={user.timeStamp}/>
            ))
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
            headers.map(header => (
              <Typography fontWeight={"bold"} fontSize={24} color={'#000'} width={"100%"}> {header} </Typography>
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