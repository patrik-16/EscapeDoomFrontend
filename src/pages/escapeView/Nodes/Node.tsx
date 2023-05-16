import { Settings, Input, Search, Visibility, SettingsInputHdmi } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { amber, blue, deepPurple } from "@mui/material/colors";

enum NodeType {
    Console,
    Data,
    Details,
    Zoom
}

export const NodeBuilder = ({pos, nodeInfos}: NodeInstance, iconElement: any, color: any, onClick?: () => void) => {
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
    return(
        <>
            {NodeBuilder({pos, nodeInfos}, <Settings />, amber[600])}
            {/* <IconButton 
                size="small" 
                color="warning" 
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
            </IconButton> */}
        </>
    )
}

export const DataNode = ({pos, nodeInfos}: NodeInstance) => {
    return(
        <IconButton 
            size="small" 
            color="warning" 
            sx={{
                position: "relative",
                left: pos.x,
                top: pos.y,
                width: 26,
                height: 26, 
                border: 2, 
                borderRadius: '50%'
            }}>
            <Input fontSize='small' />
    </IconButton>
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