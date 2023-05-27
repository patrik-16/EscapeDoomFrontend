import React, {useEffect, useRef, useState} from 'react';
import Editor from '@monaco-editor/react';
import {Box, Button, FormControl, MenuItem, Select, SelectChangeEvent, Stack, Typography, createTheme} from "@mui/material";
import Node from './Nodes/Node';
import { getSessionId } from '../../utils/GameSessionHandler';
import { useGet } from '../../hooks/useGet';
import { PlayArrow } from '@mui/icons-material';
import EditorContainer from './EditorContainer';
import { submitCode } from '../../hooks/submitCode';
import { getCode } from '../../hooks/getCode';
import LoadingButton from '@mui/lab/LoadingButton';
import type {} from '@mui/lab/themeAugmentation';

const EscapeView = () => {

    const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

    const [code, setCode] = useState(`private static int solve() {
    return 35 + 7; 
}
    `)

    const [language, setLangauge] = useState('java')
    const sessionID = getSessionId()
    const [sceneInfo, setSceneInfo] = useState(Object)
    const [codeExecResponse, setCodeExecResponse] = useState("")

    const [submitCodeBody, setSubmitCodeBody] = useState({
        "playerSessionId": sessionID,
        "language": "Java",
        "code": code,
        "codeRiddleID": 1,
        "dateTima": null
    })

    const getStage = useGet(`${import.meta.env.VITE_GAME_BASE_URL}/join/getStage/${sessionID}`)
    const submitCodeCall = submitCode(`${import.meta.env.VITE_GAME_BASE_URL}/join/submitCode`, submitCodeBody)
    //@ts-ignore
    const getCodeCall = getCode(`${import.meta.env.VITE_GAME_BASE_URL}/join/getCode/${sessionID}`)

    const handleCodeSubmission = async () => {
        await submitCodeCall.refetch()
        let respo = await getCodeCall.refetch()
        while(respo.data === "waiting") {
            await sleep(500)
            respo = await getCodeCall.refetch()
        }
        console.log(respo.data)
        setCodeExecResponse(respo.data)
    }

    const handleChange = (event: SelectChangeEvent) => {
        setLangauge(event.target.value as string)
    }

    const handleEditorChange = (value: any) => {
        setCode(value)
        setSubmitCodeBody({
            "playerSessionId": sessionID,
            "language": language.charAt(0).toUpperCase() + language.slice(1),
            "code": value,
            //@ts-ignore
            "codeRiddleID":  sceneInfo.codeRiddleID,
            "dateTima": null
        })
    }

    useEffect(() => {
        if (!getStage.isFetching && !getStage.isError) {
            try {
                //@ts-ignore
                setSceneInfo(JSON.parse(getStage.data)[0])
                //TODO NOT DYNAMIC
                // @ts-ignore
                setCode(JSON.parse(getStage.data)[0].nodes[0].nodeInfos.codeSnipped)
            }catch (e) {
                window.location.reload()
            }
        }
    }, [getStage.data])

    useEffect(() => {
        if (Object.keys(sceneInfo).length !== 0) console.log(sceneInfo)
    }, [sceneInfo])

    const editorRef = useRef(null)

    const handleEditorDidMount = (editor: any, monaco: any) => {
        editorRef.current = editor
    }

    return (
        <Stack direction="row" alignItems="center" height="100vh">
            <Stack direction="column" height="100vh">
                <EditorContainer>
                    <Stack direction="row" alignItems="center">
                        <Typography mx={2}> Code </Typography>
                        <FormControl variant="standard" size='small'>
                            <Select
                                labelId='languageSelect'
                                value={language}
                                label="Language"
                                onChange={handleChange}
                            > 
                                <MenuItem value="javascript" > Javascript </MenuItem>
                                <MenuItem value="java"> Java </MenuItem>
                                <MenuItem value="python"> Python </MenuItem>
                            </Select>
                        </FormControl>
                    </Stack>
                </EditorContainer>
                <EditorContainer sx={{flexGrow: 1, flexShrink: 1}}>
                    <Editor
                        height="100%"
                        width="30vw"
                        language={language}
                        //@ts-ignore
                        value={code}
                        onMount={handleEditorDidMount}
                        onChange={handleEditorChange}
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
                </EditorContainer>
                <EditorContainer>
                    <Stack direction="column">
                        <Typography position={{sx: 'relative', lg: 'absolute'}}> Actions </Typography>
                        <LoadingButton
                            sx={{
                                height: 60, 
                                width: 250, 
                                m: 1,
                                alignSelf: 'center'
                            }}
                            startIcon={<PlayArrow/>} 
                            variant='contained' 
                            loading={getCodeCall.data === "waiting"}
                            loadingPosition="start"
                            onClick={handleCodeSubmission}
                        >
                            <span> Execute </span> 
                        </LoadingButton>
                    </Stack>
                </EditorContainer>
                <EditorContainer sx={{marginBottom: 1}}>
                    <Stack direction="column"> 
                        <Typography> Console Output </Typography>
                        <Typography> {codeExecResponse} </Typography>
                    </Stack>
                </EditorContainer>
            </Stack>

            <Box
                sx={{
                    backgroundImage: `url(${sceneInfo.bgImg})`,
                    backgroundSize: "contain",
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                }}
                width={"100%"}
                height={"100%"}
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