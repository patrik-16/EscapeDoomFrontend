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
}

interface NodeInstance {
    pos: { x: number, y: number }
    nodeInfos: object
}