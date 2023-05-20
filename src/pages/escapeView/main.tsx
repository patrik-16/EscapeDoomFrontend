import React, {useEffect, useRef, useState} from 'react';
import Editor from '@monaco-editor/react';
import {Box, Stack, Typography} from "@mui/material";
import Node, { ZoomNode } from './Nodes/Node';
import PropEscapeRoom from '../../data/EscapeRoomJson.json'
import { getSessionId } from '../../utils/GameSessionHandler';
import { useGet } from '../../hooks/useGet';

interface initialProps {
    initialValue: string
}

const EscapeView = ({initialValue} : initialProps) => {

    const [userCode, setUserCode] = useState('')
    const sessionID = getSessionId()
    const [sceneInfo, setSceneInfo] = useState(Object)

    const {data, isFetching, isError} = useGet(`http://localhost:8090/api/join/getStage/${sessionID}`)

    useEffect(() => {
        if (!isFetching && !isError) {
            //@ts-ignore
            setSceneInfo(data[0][0])
        }
    }, [data])

    useEffect(() => {
        if (Object.keys(sceneInfo).length !== 0) console.log(sceneInfo)
    }, [sceneInfo])

    const editorRef = useRef(null)

    const handleEditorDidMount = (editor: any, monaco: any) => {
        editorRef.current = editor
    }

    return (
        <Stack direction="row">
            <Editor
                height="100vh"
                width="30vw"
                defaultLanguage="javascript"
                defaultValue={initialValue}
                onMount={handleEditorDidMount}
                theme={"vs-dark"}
                options={{
                    wordWrap: 'on',
                    minimap: { enabled: false },
                    folding: false,
                    lineNumbersMinChars: 3,
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                }}
            />
            <Box
                sx={{
                    backgroundImage: `url(${sceneInfo.bgImg})`,
                    backgroundSize: "cover",
                    backgroundRepeat: 'no-repeat'
                }}
                width={"100%"}
                
            >
                {
                    sceneInfo.nodes ? (sceneInfo.nodes.map((node: NodeInterface, index: number) => ( 
                        <Node key={index} pos={node.pos} nodeInfos={node.nodeInfos} type={node.type as NodeType} />
                    ))) : <></>
                }
            </Box>
        </Stack>
    )
};

export default EscapeView;