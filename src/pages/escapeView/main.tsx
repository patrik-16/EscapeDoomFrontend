import React, {useRef, useState} from 'react';
import Editor from '@monaco-editor/react';
import {Stack} from "@mui/material";

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
        </Stack>
    )
};

export default EscapeView;