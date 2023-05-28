import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";

const userRanking = (name: string, points: number, timestamp: Date) => {
    return {name, points, timestamp}
}

const dateFormatString = "HH:mm:ss"
const date = new Date()

const testEntries = [
    userRanking('Maxl', 420, date),
    userRanking('Schmomi', 69, date),
    userRanking('Paxi', 69, date),
]

const EscapeLeaderboard = () => {
    return (
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Points</TableCell>
            <TableCell>Timestamp</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {testEntries.map((user) => (
            <TableRow
              key={user.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row"> {user.name} </TableCell>
              <TableCell>{user.points}</TableCell>
              <TableCell>{user.timestamp.getHours()}:{user.timestamp.getMinutes()}:{user.timestamp.getSeconds()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    );
}

export default EscapeLeaderboard;