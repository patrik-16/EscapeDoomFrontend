import { Settings, Input, Search, Visibility, SettingsInputHdmi } from "@mui/icons-material";
import { Backdrop, Box, Button, Card, CardActions, CardContent, CardHeader, Dialog, DialogTitle, Divider, IconButton, List, ListItem, Stack, Typography } from "@mui/material";
import { amber, blue, deepPurple } from "@mui/material/colors";
import { useState } from "react";

enum NodeType {
    Console,
    Data,
    Details,
    Zoom
}

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

export const ConsoleNode = ({pos, nodeInfos}: NodeInstance) => {
    const [isOpen, setIsOpen] = useState(false)

    return(
        <>
            {/* {NodeBuilder({pos, nodeInfos}, <Settings />, amber[600])} */}
            <IconButton 
                size="small" 
                color="warning"
                onClick={() => setIsOpen(true)} 
                sx={{
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
                <Card sx={{ minWidth: 600 }}>
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
                        <Typography color={"gray"}> Object Description </Typography>
                        <Typography mb={2}> {nodeInfos.desc} </Typography>

                        <Typography fontWeight={"bold"} fontSize={14} mb={1}> Return </Typography>
                        <Box display={"inline"} sx={{backgroundColor: amber[600]}}> 
                            <Box component={"code"} color={"black"}> password</Box> 
                        </Box>
                        <Typography display={"inline"}>: A number</Typography>
                        <Divider sx={{flexGrow: 1, borderBottomWidth: 2, my: 2}} orientation="horizontal"/>
                        <Typography fontWeight={"bold"} fontSize={14} mb={1}> Non-real example </Typography>
                        <ul>
                            <li> 1234 </li>
                        </ul>
                        <Stack direction={"row"} justifyContent={"end"}>
                            <Button sx={{backgroundColor: amber[600]}} variant="contained"> Connect </Button>
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
            onClick={() => setIsOpen(true)}
            sx={{
                position: "relative",
                left: pos.x,
                top: pos.y,
                width: 26,
                height: 26, 
                border: 2, 
                borderRadius: '50%'
            }}>
                <Input sx={{fontSize: 12}} fontSize='small' />
            </IconButton>
        </>
    )
}

export const DetailsNode = ({pos, nodeInfos}: NodeInstance) => {
    return (
        <IconButton 
            size="small" 
            color="info" 
            sx={{
                position: "relative",
                left: pos.x,
                top: pos.y,
                width: 26,
                height: 26, 
                border: 2, 
                borderRadius: '50%'
            }}>
            <Search fontSize='small' />
    </IconButton>
    )
}

export const ZoomNode = ({pos, nodeInfos}: NodeInstance) => {
    return (
        <IconButton 
            size="small" 
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

const renderNodeType = ({type, pos, nodeInfos}: NodeInterface) => {
    switch(type) {
        case "Console":
            return ConsoleNode({pos, nodeInfos}) //NodeBuilder({pos, nodeInfos}, <Settings/>, amber[600])
        case "Data":
            return NodeBuilder({pos, nodeInfos}, <SettingsInputHdmi/>, amber[800])
        case "Details":
            return NodeBuilder({pos, nodeInfos}, <Search/>, blue[600])
        case "Zoom": Visibility
            return NodeBuilder({pos, nodeInfos}, <Visibility/>, deepPurple[400])
        default:
            console.error(`Invalid Node Type: ${type}`)
            return <></>
    }
}

const Node = ({type, pos, nodeInfos}: NodeInterface) => {
    // console.log(type, pos, nodeInfos)
    return (
        renderNodeType({type, pos, nodeInfos})
    );
}
 
export default Node;