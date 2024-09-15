import { GraphQLSchema } from 'graphql/type';
import CodeMirror from '@uiw/react-codemirror';
import { graphql } from 'cm6-graphql';
import { Box } from '@mui/material';
import { useAppSelector } from '@/lib/hook';
import { useEffect, useState } from 'react';

interface IGraphQLEditorProps {
    schema: GraphQLSchema | null;
    handleChange: (value: string) => void;
}

function CodeMirrorGraphqlEditor(props: IGraphQLEditorProps) {
    const { schema, handleChange } = props;
    const query = useAppSelector((state) => state.request.query);
    const [localQuery, setLocalQuery] = useState(query);

    useEffect(() => {
        setLocalQuery(query);
    }, [query]);

    return (
        <Box sx={{ width: '100%', border: '1px solid #ccc' }}>
            <CodeMirror
                style={{ textAlign: 'left' }}
                value={localQuery}
                height="400px"
                width="auto"
                extensions={[graphql(schema)]}
                onChange={(value) => setLocalQuery(value)}
                onBlur={() => handleChange(localQuery)}
            />
        </Box>
    );
}

export default CodeMirrorGraphqlEditor;
