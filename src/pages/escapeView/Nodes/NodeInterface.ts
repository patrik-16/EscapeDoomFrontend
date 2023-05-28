enum NodeType {
    Console = 'Console',
    Data = 'Data',
    Details = 'Details',
    Zoom = 'Zoom'
}

interface NodeInterface {
    type: NodeType
    pos: { x: number, y: number }
    nodeInfos: object
    codeSetter: React.Dispatch<React.SetStateAction<string>>
}

interface NodeInstance {
    pos: { x: number, y: number }
    nodeInfos: any
}