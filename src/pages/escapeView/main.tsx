import React, {useRef, useState} from 'react';
import Editor from '@monaco-editor/react';
import {Box, Stack, Typography} from "@mui/material";
import Node, { ZoomNode } from './Nodes/Node';
import PropEscapeRoom from '../../data/EscapeRoomJson.json'

interface initialProps {
    initialValue: string
}

const EscapeView = ({initialValue} : initialProps) => {

    const [userCode, setUserCode] = useState('')

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
                    backgroundImage: `url(${PropEscapeRoom.escapeRoom.stage.scenes[0].bgImg})`,
                    backgroundSize: "cover",
                    backgroundRepeat: 'no-repeat'
                }}
                width={"100%"}
                
            >
                {
                    PropEscapeRoom.escapeRoom.stage.scenes[0].nodes.map((node, index) => (
                        <Node key={index} pos={node.pos} nodeInfos={node.nodeInfos} type={node.type as NodeType} />
                    ))
                }
            </Box>
        </Stack>
    )
};

export default EscapeView;