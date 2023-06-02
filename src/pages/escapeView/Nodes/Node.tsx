import { Settings, Input, Search, Visibility, SettingsInputHdmi } from "@mui/icons-material";
import { Backdrop, Box, Button, Card, CardActions, CardContent, Divider, IconButton, Stack, Typography } from "@mui/material";
import { amber, blue, deepPurple, grey } from "@mui/material/colors";
import { useState } from "react";
import { NodeInstance, NodeInterface } from "./NodeInterface";

enum NodeType {
    Console,
    Data,
    Details,
    Zoom
}

const maxWidthConst = "40vw"
const minWidthConst = "600px"

//TODO: Make this into IconButtonBuilder
export const NodeBuilder = (
    {pos, nodeInfos}: NodeInstance, 
    iconElement: any, 
    color: any, 
    onClick?: () => void) => {
    return (
        <IconButton
        size="small"
        onClick={onClick}
        sx={{
            position: "relative",
            color: {color},
            left: pos.x,
            top: pos.y,
            width: 26,
            height: 26, 
            border: 2, 
            borderRadius: '50%'
        }}>
            {iconElement}
        </IconButton>
    )
}

export const ConsoleNode = ({pos, nodeInfos}: NodeInstance, codeSetter: React.Dispatch<React.SetStateAction<string>>) => {
    const [isOpen, setIsOpen] = useState(false)
    return(
        <>
            <IconButton 
                size="small"
                onClick={() => setIsOpen(true)} 
                sx={{
                    color: amber[600],
                    position: "relative",
                    left: pos.x,
                    top: pos.y,
                    width: 26,
                    height: 26, 
                    border: 2, 
                    borderRadius: '50%'
                }}>
                <Settings fontSize='small' />
            </IconButton>
            <Backdrop sx={{zIndex: (theme) => theme.zIndex.drawer + 1}} open={isOpen} onClick={() => setIsOpen(false)}>
                <Card sx={{ minWidth: minWidthConst, maxWidth: maxWidthConst }}>
                    <Box 
                        sx={{backgroundColor: amber[600]}} 
                        minHeight={50} 
                        pl={2}
                    >
                        <Typography
                            sx={{verticalAlign: "center"}} 
                            color={"black"}
                            fontWeight={"bold"}
                        >
                            {nodeInfos.title} 
                        </Typography>
                    </Box>
                    <CardContent>
                        <Typography color={"grey"}> Object Description </Typography>
                        <Typography mb={2}> {nodeInfos.desc} </Typography>

                        <Box sx={{backgroundColor: '#2c2c2c', p: 1, mb: 2}}>
                            <Typography fontWeight={"bold"} fontSize={14} mb={1}> Return </Typography>
                            <Typography> {nodeInfos.returnType} </Typography>
                            <Divider sx={{flexGrow: 1, borderBottomWidth: 2, my: 2}} orientation="horizontal"/>
                            <Typography fontWeight={"bold"} fontSize={14} mb={1}> Non-real example </Typography>
                            <Typography> {nodeInfos.exampleInput} </Typography>
                        </Box>
                        <Stack direction={"row"} justifyContent={"end"}>
                            <Button sx={{backgroundColor: amber[600]}} variant="contained" onClick={() => {codeSetter(nodeInfos.codeSnipped)}}> Connect </Button>
                        </Stack>
                    </CardContent>
                </Card>
            </Backdrop>
        </>
    )
}

export const DataNode = ({pos, nodeInfos}: NodeInstance) => {
    const [isOpen, setIsOpen] = useState(false)
    
    return(
        <>
            <IconButton 
            size="small" 
            color="warning"
            onClick={() => {
                setIsOpen(true)
            }}
            sx={{
                position: "relative",
                left: pos.x,
                top: pos.y,
                width: 26,
                height: 26, 
                border: 2, 
                borderRadius: '50%'
            }}>
                <Input fontSize="small"/>
            </IconButton>
            <Backdrop sx={{zIndex: (theme) => theme.zIndex.drawer + 1}} open={isOpen} onClick={() => setIsOpen(false)}>
                <Card sx={{ minWidth: minWidthConst, maxWidth: maxWidthConst }}>
                    <Box 
                        sx={{backgroundColor: amber[600]}} 
                        minHeight={50} 
                        pl={2}
                    >
                        <Typography
                            sx={{verticalAlign: "center"}} 
                            color={"black"}
                            fontWeight={"bold"}
                        >
                            {nodeInfos.title} 
                        </Typography>
                    </Box>
                    <CardContent>
                        <Typography color={"grey"}> Object output </Typography>
                        <Typography mb={2}> {nodeInfos.desc} </Typography>

                        <Box sx={{backgroundColor: '#2c2c2c', p: 1, mb: 2}}>
                            <Typography fontWeight={"bold"} fontSize={14} mb={1}> Parameter </Typography>
                            <Typography> {nodeInfos.parameterType} </Typography>
                            <Divider sx={{flexGrow: 1, borderBottomWidth: 2, my: 2}} orientation="horizontal"/>
                            <Typography fontWeight={"bold"} fontSize={14} mb={1}> Non-real example </Typography>
                            <Typography> {nodeInfos.exampleOutput} </Typography>
                        </Box>
                        <Stack direction={"row"} justifyContent={"end"}>
                            <Button sx={{backgroundColor: amber[600]}} variant="contained"> Connect </Button>
                        </Stack>
                    </CardContent>
                </Card>
            </Backdrop>
        </>
    )
}

export const DetailsNode = ({pos, nodeInfos}: NodeInstance) => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
        
        <IconButton 
            size="small"
            onClick={() => {setIsOpen(true)}}
            sx={{
                position: "relative",
                color: blue[600],
                left: pos.x,
                top: pos.y,
                width: 26,
                height: 26, 
                border: 2, 
                borderRadius: '50%'
            }}>
            <Search fontSize='small' />
        </IconButton>
    <Backdrop sx={{zIndex: (theme) => theme.zIndex.drawer + 1}} open={isOpen} onClick={() => setIsOpen(false)}>
        <Card sx={{ minWidth: minWidthConst, maxWidth: maxWidthConst }}>
            <Box 
                sx={{backgroundColor: amber[600]}} 
                minHeight={50} 
                pl={2}
            >
                <Typography
                    sx={{verticalAlign: "center"}} 
                    color={"black"}
                    fontWeight={"bold"}
                >
                    {nodeInfos.title} 
                </Typography>
            </Box>
            <CardContent>
                <Stack direction="row" height="400px" gap={2}>
                    <Box width="80%" height="100%" 
                    sx={{backgroundImage: `url(${nodeInfos.png})`, backgroundSize: "contain", backgroundRepeat: "no-repeat"}}/>
                    <Typography mb={2}> {nodeInfos.desc} </Typography>
                </Stack>
            </CardContent>
        </Card>
    </Backdrop>
    </>
    )
}

export const ZoomNode = ({pos, nodeInfos}: NodeInstance) => {
    return (
        <IconButton 
            size="small"
            onClick={() => {window.location.reload()}}
            sx={{
                position: "relative",
                left: pos.x,
                top: pos.y,
                color: deepPurple[400],
                width: 26,
                height: 26, 
                border: 2, 
                borderRadius: '50%'
            }}>
            <Visibility fontSize='small' />
    </IconButton>
    )
}

const renderNodeType = ({type, pos, nodeInfos, codeSetter}: NodeInterface) => {
    switch(type) {
        case "Console":
            return ConsoleNode({pos, nodeInfos}, codeSetter)
        case "Data":
            return DataNode({pos, nodeInfos})
        case "Details":
            return DetailsNode({pos, nodeInfos})
        case "Zoom":
            return ZoomNode({pos, nodeInfos})
        default:
            console.error(`Invalid Node Type: ${type}`)
            return <></>
    }
}

const Node: React.FC<NodeInterface> = ({type, pos, nodeInfos, codeSetter}: NodeInterface) => {
    return (
        renderNodeType({type, pos, nodeInfos, codeSetter})
    );
}
 
export default Node;